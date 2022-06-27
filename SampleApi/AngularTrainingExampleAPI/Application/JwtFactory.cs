using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace AngularTrainingExampleAPI.Application
{
    public static class JwtClaimIdentifiers
    {
       public const string Rol = "rol",
          Id = "id",
          DisplayName = "DisplayName",
          CompanyId = "CompanyId",
          FacilityId = "FacilityId",
          CompanyRegion = "CompanyRegion",
          CurrencyCode = "CurrencyCode",
          AccessLevel = "AccessLevel",
          AdminRegions = "AdminRegions",
          IsInternal = "IsInternal",
          VisibleCompanyIds = "VisibleCompanyIds",
          Permissions = "Permissions",
          IsAccessToken = "IsAccess",
          RememberMe = "RM";
    }

    public static class JwtClaims
    {
        public const string ApiAccess = "api_access";
    }

    public class JwtFactory : IJwtFactory
    {
        private readonly JwtIssuerOptions _jwtOptions;

        public JwtFactory(IOptions<JwtIssuerOptions> jwtOptions)
        {
            _jwtOptions = jwtOptions.Value;
            ThrowIfInvalidOptions(_jwtOptions);
        }

        /// <summary>
        /// Generates a new JWT token, with the given claims and for the given identity
        /// </summary>
        public WrappedToken GenerateEncodedToken(string id, string userName, IEnumerable<Claim> claims, DateTime? expirationTime = null)
        {
            var identity = GenerateClaimsIdentity(id, userName);
            var jwtExpiration = expirationTime.GetValueOrDefault(_jwtOptions.Expiration);

            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                _jwtOptions.Issuer,
                _jwtOptions.Audience,
                claims,
                _jwtOptions.NotBefore,
                jwtExpiration,
                _jwtOptions.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var expiresInSeconds = (int)Math.Ceiling(jwtExpiration.Subtract(DateTime.UtcNow).TotalSeconds);
            return new WrappedToken(identity.Claims.Single(c => c.Type == "id").Value, encodedJwt, expiresInSeconds);
        }

        public async Task<List<Claim>> GetStandardClaimsFromJwtOptions()
        {
            return new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, await _jwtOptions.JtiGenerator()),
                new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64),
            };
        }

        /// <summary>
        /// Checks if a user has any of the given permissions in the given JWT
        /// </summary>
        public bool ContainsAnyPermission(string jwt, IList<string> permissions)
        {
            JwtSecurityToken decodedJwt = new JwtSecurityTokenHandler().ReadJwtToken(jwt);
            var permissionClaims = decodedJwt.Claims.Where(x => x.Type == JwtClaimIdentifiers.Permissions);
            var normalisedPermissions = permissions.Select(p => p.ToUpper()).ToList();
            foreach (var permissionClaim in permissionClaims)
            {
                string decompressedPermissions;
                try
                {
                    decompressedPermissions = Decompress(permissionClaim.Value);
                }
                catch
                {
                    decompressedPermissions = permissionClaim.Value;
                }

                var deserializedPermissions = System.Text.Json.JsonSerializer.Deserialize<List<string>>(decompressedPermissions);
                if (normalisedPermissions.Any(deserializedPermissions.Contains))
                    return true;
            }
            return false;
        }

        /// <summary>
        /// Enhances a copy of the given token with the given additional claims, and returns the result
        /// </summary>
        public WrappedToken EnhanceEncodedToken(string jwt, string userId, IEnumerable<Claim> additionalClaims, DateTime? newExpiry = null)
        {
            // decode the token
            JwtSecurityToken decodedJwt = new JwtSecurityTokenHandler().ReadJwtToken(jwt);
            List<Claim> newClaims = decodedJwt.Claims.ToList();
            newClaims.AddRange(additionalClaims);
            var jwtExpiration = newExpiry.GetValueOrDefault(_jwtOptions.Expiration);

            // Construct the new enchanced token
            var newJwt = new JwtSecurityToken(_jwtOptions.Issuer,
                _jwtOptions.Audience,
                newClaims,
                _jwtOptions.NotBefore,
                jwtExpiration,
                _jwtOptions.SigningCredentials);

            string encodedJwt = new JwtSecurityTokenHandler().WriteToken(newJwt);
            int expiresInSeconds = (int)Math.Ceiling(jwtExpiration.Subtract(DateTime.UtcNow).TotalSeconds);
            return new WrappedToken(userId, encodedJwt, expiresInSeconds);
        }

        /// <summary>
        /// Decodes the claims from the given JWT
        /// </summary>
        public IReadOnlyCollection<Claim> DecodeClaims(string jwt)
        {
            try
            {
                JwtSecurityToken decodedJwt = new JwtSecurityTokenHandler().ReadJwtToken(jwt);
                return decodedJwt.Claims.ToList();
            }
            catch (ArgumentNullException)
            {
                Console.WriteLine("Attempted to decode an invalid JWT");
                return new List<Claim>();
            }
            catch (ArgumentException)
            {
                Console.WriteLine("Attempted to decode an invalid JWT");
                return new List<Claim>();
            }
        }

        private static ClaimsIdentity GenerateClaimsIdentity(string id, string userName)
        {
            return new ClaimsIdentity(new GenericIdentity(userName, "Token"), new[]
            {
                new Claim(JwtClaimIdentifiers.Id, id),
            });
        }

        /// <returns>Date converted to seconds since Unix epoch (Jan 1, 1970, midnight UTC).</returns>
        private static long ToUnixEpochDate(DateTime date)
            => (long)Math.Round((date.ToUniversalTime() -
                                 new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
                .TotalSeconds);

        private static void ThrowIfInvalidOptions(JwtIssuerOptions options)
        {
            if (options == null)
                throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtIssuerOptions.ValidFor));
            }

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.SigningCredentials));
            }

            if (options.JtiGenerator == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.JtiGenerator));
            }
        }

        /// <summary>
        /// String compression, taken from https://stackoverflow.com/questions/16606552/compress-and-decompress-string-in-c-sharp
        /// </summary>
        public static string Compress(string s)
        {
            var bytes = Encoding.Unicode.GetBytes(s);
            using (var msi = new MemoryStream(bytes))
            using (var mso = new MemoryStream())
            {
                using (var gs = new GZipStream(mso, CompressionMode.Compress))
                {
                    msi.CopyTo(gs);
                }
                return Convert.ToBase64String(mso.ToArray());
            }
        }

        /// <summary>
        /// String compression, taken from https://stackoverflow.com/questions/16606552/compress-and-decompress-string-in-c-sharp
        /// </summary>
        public static string Decompress(string s)
        {
            var bytes = Convert.FromBase64String(s);
            using (var msi = new MemoryStream(bytes))
            using (var mso = new MemoryStream())
            {
                using (var gs = new GZipStream(msi, CompressionMode.Decompress))
                {
                    gs.CopyTo(mso);
                }
                return Encoding.Unicode.GetString(mso.ToArray());
            }
        }

        public DateTimeOffset DecodeExpiry(string jwt)
        {
           var claims = DecodeClaims(jwt);
           var expiryClaim = claims?.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Exp);

           // If we have no claim, assume its expired
           if (expiryClaim == null)
              return DateTimeOffset.Now;

           // The EXP claim is in number of seconds since the epoch
           return DateTimeOffset.FromUnixTimeSeconds(long.Parse(expiryClaim.Value));
        }

        /// <summary>
        /// Decodes and returns the value of the given claim from the given token. If there isn't a value there, it will return null
        /// </summary>
        public string DecodeClaim(string jwt, string claim)
        {
           var claims = DecodeClaims(jwt);
           return claims?.FirstOrDefault(c => c.Type == claim)?.Value;
        }
    }
}

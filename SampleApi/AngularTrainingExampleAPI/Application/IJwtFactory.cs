using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AngularTrainingExampleAPI.Application
{
   public interface IJwtFactory
   {
      WrappedToken GenerateEncodedToken(string id, string userName, IEnumerable<Claim> claimsToAdd, DateTime? expirationTime = null);

      Task<List<Claim>> GetStandardClaimsFromJwtOptions();

      WrappedToken EnhanceEncodedToken(string jwt, string userId, IEnumerable<Claim> additionalClaims, DateTime? newExpiry = null);

      bool ContainsAnyPermission(string jwt, IList<string> permissions);

      IReadOnlyCollection<Claim> DecodeClaims(string jwt);

      DateTimeOffset DecodeExpiry(string jwt);

      string DecodeClaim(string jwt, string claim);
   }
}

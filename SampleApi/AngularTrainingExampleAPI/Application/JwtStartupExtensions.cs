using System;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace AngularTrainingExampleAPI.Application
{
   public static class JwtStartupExtensions
   {
       private static readonly TimeSpan CookieTimeout = TimeSpan.FromDays(14);
       private const string SecretKey = "f9a32479-4549-4cf2-ba47-daa00c3f2afe";
       private static SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

       public static void ConfigureJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
       {
         // jwt wire up
         // Get options from app settings
         var jwtAppSettingOptions = configuration.GetSection(nameof(JwtIssuerOptions));

         // Configure JwtIssuerOptions
         services.Configure<JwtIssuerOptions>(options =>
         {
            options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
            options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
            options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
         });

         TokenValidationParameters tokenValidationParameters = GetTokenValidationParameters(configuration);

         // Hook up the authentication mechanism. We want to use JWT bearer tokens as our claimsprinciple, and we want to make sure there's a cookie available, and if not redirect to a sign in location away from the current access point
         services.AddAuthentication(options =>
         {
            options.DefaultAuthenticateScheme = "Bearer";
            options.DefaultChallengeScheme = "BearerCookie";
         })
         .AddCookie("BearerCookie", o =>
         {
            // Configure the bearer token cookie
            o.ExpireTimeSpan = CookieTimeout;
            o.LoginPath = "/auth/signin";
            o.LogoutPath = "/auth/signin";
         }).AddJwtBearer(configureOptions =>
         {
            configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
            configureOptions.TokenValidationParameters = tokenValidationParameters;
            configureOptions.SaveToken = true;
            configureOptions.RequireHttpsMetadata = false;
         });
      }

      public static TokenValidationParameters GetTokenValidationParameters(IConfiguration configuration)
      {
         var jwtAppSettingOptions = configuration.GetSection(nameof(JwtIssuerOptions));

         return new TokenValidationParameters
         {
            ValidateIssuer = true,
            ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

            ValidateAudience = true,
            ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = _signingKey,

            RequireExpirationTime = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
         };

      }
   }
}

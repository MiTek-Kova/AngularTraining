using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AngularTrainingExampleAPI.Application;
using AngularTrainingExampleAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularTrainingExampleAPI.Controllers
{   
   [ApiController]
   [Route("[controller]")]
   [AllowAnonymous]
   public class AuthenticationController : ControllerBase
   {
      private IJwtFactory jwtFactory;
      public AuthenticationController(IJwtFactory jwtFactory)
      {
         this.jwtFactory = jwtFactory;
      }
      
      /// <summary>
      /// Perform a sign in request. If successful, a JWT bearer token is returned.
      /// This is more or less a stub of a method purely for demo purposes. It will return the user as signed in
      /// if it exists, and the password is "password"
      /// </summary>
      [HttpPost("SignIn")]
      [ProducesResponseType(StatusCodes.Status200OK)]
      [ProducesResponseType(StatusCodes.Status400BadRequest)]
      [ProducesResponseType(StatusCodes.Status401Unauthorized)]
      public ActionResult<SignInResponseDto> SignIn(SignInRequestDto signInRequest)
      {
         UserDto matchingUser = UserController.Users.Values.FirstOrDefault(u => u.username == signInRequest.username);

         if (matchingUser == null || signInRequest.password != UserController.Passwords[matchingUser.userId])
            return Unauthorized();
         
         return GenerateTokensForUser(matchingUser);
      }

      /// <summary>
      /// Provides an up to date Auth token, based on an ID/Refresh token
      /// </summary>
      [HttpPost("RefreshAccessToken")]
      [ProducesResponseType(StatusCodes.Status200OK)]
      [ProducesResponseType(StatusCodes.Status400BadRequest)]
      [ProducesResponseType(StatusCodes.Status401Unauthorized)]
      public ActionResult<SignInResponseDto> RefreshAccessToken(RefreshAccessTokenDto refreshRequest)
      {
         // Note: In a real system, the ID token would be stored in a DB and cross-checked here, and may have been revoked.
         var username = jwtFactory.DecodeClaim(refreshRequest.idToken, "id");
         UserDto matchingUser = UserController.Users.Values.FirstOrDefault(u => u.username == username);

         if (matchingUser == null)
            return Unauthorized();
         
         // Generate an Access and an ID token
         return GenerateTokensForUser(matchingUser);
      }
      
      /// <summary>
      /// Registers a user with the given details and signs in as that user.
      /// Note: Does not do any confirmation of email or anything like that
      /// </summary>
      [HttpPost("Register")]
      [ProducesResponseType(StatusCodes.Status200OK)]
      [ProducesResponseType(StatusCodes.Status400BadRequest)]
      [ProducesResponseType(StatusCodes.Status401Unauthorized)]
      public ActionResult<SignInResponseDto> Register(RegisterRequestDto registerRequest)
      {
         // Check if the user exists already
         if (UserController.Users.Any(u => u.Value.username == registerRequest.username))
            return BadRequest();

         int newId = UserController.Users.Any() ? UserController.Users.Keys.Max() + 1 : 1;
         UserDto newUser = new UserDto(newId, "", registerRequest.username, registerRequest.lastName,
            new Address("", "", ""), "active", Month.Jan);

         UserController.Users[newId] = newUser;
         UserController.Passwords[newId] = registerRequest.password;

         return GenerateTokensForUser(newUser);
      }
      
      private ActionResult<SignInResponseDto> GenerateTokensForUser(UserDto matchingUser)
      {
         // Generate an Access and an ID token
         var standardClaims = jwtFactory.GetStandardClaimsFromJwtOptions().Result;
         var claims = new List<Claim>()
         {
            new Claim("email", matchingUser.email),
            new Claim("name", matchingUser.username)
         };
         claims.AddRange(standardClaims);
         var accessToken = jwtFactory.GenerateEncodedToken(matchingUser.userId.ToString(), matchingUser.username, claims,
            DateTime.Now.AddHours(2));
         var idToken = jwtFactory.GenerateEncodedToken(matchingUser.userId.ToString(), matchingUser.username, standardClaims,
            DateTime.Now.AddDays(14));

         return new SignInResponseDto(matchingUser.userId, accessToken.Token, idToken.Token);
      }
   }
}
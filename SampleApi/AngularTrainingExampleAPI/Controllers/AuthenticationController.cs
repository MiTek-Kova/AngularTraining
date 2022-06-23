using System.Linq;
using AngularTrainingExampleAPI.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularTrainingExampleAPI.Controllers
{   
   [ApiController]
   [Route("[controller]")]
   public class AuthenticationController : ControllerBase
   {
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
         UserDto matchingUser = UserController.Users.Values.FirstOrDefault(u => u.email == signInRequest.email);

         if (signInRequest.password != "password" || matchingUser == null)
            return Unauthorized();
         
         return new SignInResponseDto(matchingUser.userId, "PretendAuthToken");
      }
   }
}
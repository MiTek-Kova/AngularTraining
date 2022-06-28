using System.Collections.Generic;
using System.Linq;
using AngularTrainingExampleAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularTrainingExampleAPI.Controllers
{
   [ApiController]
   [Route("[controller]")]
   [Authorize("Api")]
   public class UserController : ControllerBase
   {
      public static readonly Dictionary<int, UserDto> Users = new()
      {
         {1, new UserDto(1, "JSmith@Test.com", "John", "Smith", new Address("1 A road", "A town", "100"), "active", Month.Jan)},
         {2, new UserDto(2, "JDoe@Test.com", "Jane", "Doe", new Address("10 Another road", "Another town", "200"), "inactive", Month.Aug)},
         {3, new UserDto(3, "PMcPerson@Text.com", "Person", "McPerson", new Address("100 A street", "Another town", "300"), "active", Month.Dec)},
      };

      // In reality, we definitely -definitely- wouldn't store passwords this way
      public static readonly Dictionary<int, string> Passwords = new()
      {
         { 1, "password" },
         { 2, "password" },
         { 3, "password" },
      };
      
      /// <summary>
      /// Returns the details about a given user
      /// </summary>
      [HttpGet("GetUser")]
      [ProducesResponseType(StatusCodes.Status200OK)]
      [ProducesResponseType(StatusCodes.Status404NotFound)]
      public ActionResult<UserDto> GetUser(int id)
      {
         UserDto response;
         if (!Users.TryGetValue(id, out response))
            return NotFound();

         return response;
      }
      
      /// <summary>
      /// Updates an existing user. Will not create a new user
      /// </summary>
      [HttpPost("UpdateUser")]
      [ProducesResponseType(StatusCodes.Status200OK)]
      [ProducesResponseType(StatusCodes.Status400BadRequest)]
      [ProducesResponseType(StatusCodes.Status404NotFound)]
      public ActionResult UpdateUser(UserDto user)
      {
         if (user == null)
            return BadRequest();
         
         UserDto storedUser;
         if (!Users.TryGetValue(user.userId, out storedUser))
            return NotFound();

         Users[storedUser.userId] = user;
         return Ok();
      }
      
      /// <summary>
      /// Deletes a user
      /// </summary>
      [HttpDelete("DeleteUser")]
      [ProducesResponseType(StatusCodes.Status200OK)]
      [ProducesResponseType(StatusCodes.Status404NotFound)]
      public ActionResult DeleteUser(int userId)
      {
         bool removedUser = Users.Remove(userId);
         Passwords.Remove(userId);
         return removedUser 
            ? Ok() 
            : NotFound();
      }
      
      /// <summary>
      /// Create a new user
      /// </summary>
      [HttpPost("CreateUser")]
      [ProducesResponseType(StatusCodes.Status200OK)]
      [ProducesResponseType(StatusCodes.Status400BadRequest)]
      public ActionResult CreateUser(UserDto user)
      {
         if (user == null)
            return BadRequest();
         
         if (Users.TryGetValue(user.userId, out _))
            return BadRequest();

         Users[user.userId] = user;
         
         // Give them the default password
         Passwords.Add(user.userId, "password");
         
         return Ok();
      }
      
      /// <summary>
      /// Lists the users
      /// </summary>
      [HttpGet("GetUsers")]
      [ProducesResponseType(StatusCodes.Status200OK)]
      public ActionResult<List<UserDto>> GetUsers()
      {
         return Users.Values.ToList();
      }
   }
}
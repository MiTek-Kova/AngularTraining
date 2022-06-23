namespace AngularTrainingExampleAPI.DTOs
{
   public record UserDto(int userId, string email, string username, string lastName, Address address, string status, Month birthMonth);
}
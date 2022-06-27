namespace AngularTrainingExampleAPI.DTOs
{
   public record SignInResponseDto(int userId, string authToken, string idToken);
}
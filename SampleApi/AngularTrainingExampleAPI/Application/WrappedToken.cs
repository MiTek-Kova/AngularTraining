namespace AngularTrainingExampleAPI.Application
{
   public sealed class WrappedToken
   {
      public string Id { get; set; }
      public string Token { get; set; }
      public int ExpiresIn { get; set; }

      public WrappedToken(string id, string token, int expiresIn)
      {
         Id = id;
         Token = token;
         ExpiresIn = expiresIn;
      }

      public WrappedToken()
      {
      }
   }
}

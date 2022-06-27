using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularTrainingExampleAPI.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;

namespace AngularTrainingExampleAPI
{
   public class Startup
   {
      public Startup(IConfiguration configuration)
      {
         Configuration = configuration;
      }

      public IConfiguration Configuration { get; }

      // This method gets called by the runtime. Use this method to add services to the container.
      public void ConfigureServices(IServiceCollection services)
      {
         services.AddControllers();
         
         services.ConfigureJwtAuthentication(Configuration);

         services.AddSwaggerGen(c =>
         {
            c.SwaggerDoc("v1", new OpenApiInfo {Title = "AngularTrainingExampleAPI", Version = "v1"});
            c.AddSecurityDefinition("Bearer",new OpenApiSecurityScheme
            {
               Name = "Authorization",
               Type = SecuritySchemeType.ApiKey,
               Scheme = "Bearer",
               BearerFormat = "JWT",
               In = ParameterLocation.Header,
               Description = "JWT Authorization header using the Bearer scheme."
            });
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
               {
                  new OpenApiSecurityScheme
                  {
                     Reference = new OpenApiReference
                     {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                     }
                  },
                  new string[] {}
               }
            });
         });
         
         services.AddAuthorization(o =>
         {
            o.DefaultPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
            o.AddPolicy("Api", b =>
            {
               b.RequireAuthenticatedUser();
               b.AuthenticationSchemes = new List<string> { "Bearer" };
            });
         });
         
         services.AddScoped<IJwtFactory, JwtFactory>();
      }

      // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
      public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
      {
         if (env.IsDevelopment())
         {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AngularTrainingExampleAPI v1"));
         }

         app.UseCors(builder => builder.AllowAnyOrigin()); // Allow any origin for the demo app.
         
         app.UseHttpsRedirection();

         app.UseRouting();
         
         app.UseAuthentication();
         app.UseAuthorization();

         app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
      }
   }
}
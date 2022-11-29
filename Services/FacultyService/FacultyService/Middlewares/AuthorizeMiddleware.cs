using FacultyService.Interfaces;

namespace FacultyService.Middlewares
{
    public class AutorizeMiddleware
    {
        private readonly RequestDelegate _next;

        public AutorizeMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IJwtUtils jwtUtils)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            context.Items["User"] = jwtUtils.ValidateToken(token);

            await _next(context);
        }
    }
}

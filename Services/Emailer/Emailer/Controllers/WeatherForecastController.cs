using Emailer.Interfaces;
using Emailer.Models;
using Microsoft.AspNetCore.Mvc;

namespace Emailer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IEmailSender _emailSender;

        public WeatherForecastController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task Get()
        {
            var message = new Message(new string[] { "vzlobinkov@gmail.com" }, "Test email", "This is the content from our email.");
            await _emailSender.SendEmailAsync(message);
        }
    }
}
using Emailer.Interfaces;
using Emailer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Emailer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class EmailsController : ControllerBase
    {
        private readonly IEmailSender _emailSender;

        public EmailsController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        [HttpGet]
        public async Task Get()
        {
            var message = new Message(new string[] { "vzlobinkov@gmail.com" }, "Test email", "This is the content from our email.");
            await _emailSender.SendEmailAsync(message);
        }
    }
}
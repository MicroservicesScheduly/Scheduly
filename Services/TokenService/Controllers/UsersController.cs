using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using TokenService.Extentions;
using TokenService.Models;
using TokenService.Services;

namespace TokenService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userAccountService;

        public UsersController(UserService userAccountService)
        {
            _userAccountService = userAccountService;
        }

        /// <summary>
        /// Generating JWT token.
        /// </summary>
        /// <param name="model">The LoginModel</param>
        /// <returns></returns>
        /// <response code="200">Returns the JWT token</response>
        /// <response code="400">Password is incorrect. </response>
        /// <response code="404">The user not found. </response>
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorDetails))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
        public async Task<ActionResult<string>> Token(LoginRequest model)
        {
            var token = await _userAccountService.GetTokenAsync(model);

            return Ok(new { access_token = token });
        }

        /// <summary>
        /// Gets a list of all UserModel.
        /// </summary>
        /// <returns>The list of all UserModel. </returns>
        /// <response code="200">Returns the list of all UserModel.</response>
        [HttpGet]
        [Authorize(Roles = "admin, moderator")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserModel>))]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetAllAsync()
        {
            var users = await _userAccountService.GetAllAsync();

            return Ok(users);
        }

        /// <summary>
        /// Gets a list of all RoleModel.
        /// </summary>
        /// <returns>The list of all RoleModel. </returns>
        /// <response code="200">Returns the list of all RoleModel.</response>
        [HttpGet("roles")]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<RoleModel>))]
        public async Task<ActionResult<IEnumerable<RoleModel>>> GetAllRolesAsync()
        {
            var roles = await _userAccountService.GetAllRolesAsync();

            return Ok(roles);
        }

        /// <summary>
        /// Gets the UserModel by identifier.
        /// </summary>
        /// <returns>The UserModel. </returns>
        /// <response code="200">Returns the UserModel.</response>
        /// <response code="404">The user not found. </response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
        public async Task<ActionResult<UserModel>> GetById(int id)
        {
            var user = await _userAccountService.GetByIdAsync(id);

            return Ok(user);
        }

        /// <summary>
        /// Gets a list of UserModel by role.
        /// </summary>
        /// <param name="id">The role identifier.</param>
        /// <returns>The list of UserModel. </returns>
        /// <response code="200">Returns the list of UserModel.</response>
        /// <response code="404">The role not found. </response>
        [HttpGet("roles/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserModel>))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
        public async Task<ActionResult<UserModel>> GetByRole(int id)
        {
            var user = await _userAccountService.GetByRoleAsync(id);

            return Ok(user);
        }

        /// <summary>
        /// Changes the user role.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="roleId">The role identifier.</param>
        /// <returns></returns>
        /// <response code="204"></response>
        /// <response code="404">The role or the user not found. </response>
        [HttpPut("{userId}/role/{roleId}")]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
        public async Task<ActionResult> ChangeUserRole(int userId, int roleId)
        {
            await _userAccountService.ChangeRoleAsync(userId, roleId);

            return NoContent();
        }

        /// <summary>
        /// Registers a new user.
        /// </summary>
        /// <param name="model">The RegistrationModel.</param>
        /// <returns></returns>
        /// <response code="201">Returns the created UserModel. </response>
        /// <response code="400">The email is already used. </response>
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(UserModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorDetails))]
        public async Task<ActionResult<UserModel>> Register([FromBody] RegistrationModel model)
        {
            var user = await _userAccountService.RegisterAsync(model);

            return CreatedAtAction(nameof(Register), new { id = user.Id, }, user);
        }

        /// <summary>
        /// Deletes the user.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        /// <response code="204"></response>
        /// <response code="404">The user not found. </response>
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
        public async Task<ActionResult> DeleteUser(int id)
        {
            await _userAccountService.DeleteByIdAsync(id);

            return NoContent();
        }

        /// <summary>
        /// Updates the specified UserModel.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="model">The UserModel.</param>
        /// <returns></returns>
        /// <response code="204"></response>
        /// <response code="400">The nickaname is already taken. </response>
        /// <response code="400">The emails are different. </response>
        /// <response code="404">The user not found. </response>
        [HttpPut]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorDetails))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
        public async Task<ActionResult> Update(int id, [FromBody] UserModel model)
        {
            await _userAccountService.UpdateAsync(id, model);

            return NoContent();
        }
    }
}

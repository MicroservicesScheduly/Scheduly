using Microsoft.AspNetCore.Mvc;
using Business.Interfaces;
using System.Collections.Generic;
using Business.Models;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace SimpleService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TeachersController : ControllerBase
    {
        private ITeacherService _teacherService;

        public TeachersController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherModel>>> Get()
        {
            var teachers = await _teacherService.GetAllAsync();

            return Ok(teachers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherModel>> Get(int id)
        {
            var teacher = await _teacherService.GetByIdAsync(id);

            return Ok(teacher);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _teacherService.DeleteByIdAsync(id);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, TeacherModel model)
        {
            await _teacherService.UpdateAsync(id, model);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> Add(TeacherModel model)
        {
            var created = await _teacherService.AddAsync(model);

            return CreatedAtAction(nameof(Add), new { id = created.Id }, created);
        }
    }
}
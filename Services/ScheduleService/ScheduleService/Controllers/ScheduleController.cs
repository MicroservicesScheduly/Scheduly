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
    public class ScheduleController : ControllerBase
    {
        private IScheduleService _scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScheduleModel>>> Get()
        {
            var schedules = await _scheduleService.GetAllAsync();

            return Ok(schedules);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ScheduleModel>> Get(int id)
        {
            var schedule = await _scheduleService.GetByIdAsync(id);

            return Ok(schedule);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _scheduleService.DeleteByIdAsync(id);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, ScheduleModel model)
        {
            await _scheduleService.UpdateAsync(id, model);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> Add(ScheduleModel model)
        {
            var created = await _scheduleService.AddAsync(model);

            return CreatedAtAction(nameof(Add), new { id = created.Id }, created);
        }

        /* schedule discipline */
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScheduleDisciplineModel>>> GetDisciplines()
        {
            var scheduleDisciplines = await _scheduleService.GetAllDisciplinesAsync();

            return Ok(scheduleDisciplines);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ScheduleDisciplineModel>> GetDiscipline(int id)
        {
            var scheduleDiscipline = await _scheduleService.GetDisciplineByIdAsync(id);

            return Ok(scheduleDiscipline);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDiscipline(int id)
        {
            await _scheduleService.DeleteDisciplineByIdAsync(id);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDiscipline(int id, ScheduleDisciplineModel model)
        {
            await _scheduleService.UpdateDisciplineAsync(id, model);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> AddDiscipline(ScheduleDisciplineModel model)
        {
            var created = await _scheduleService.AddDisciplineAsync(model);

            return CreatedAtAction(nameof(Add), new { id = created.Id }, created);
        }
    }
}
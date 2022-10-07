using DisciplineService.Interfaces;
using DisciplineService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DisciplineService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DisciplinesController : ControllerBase
    {
        private readonly IDisciplineService _disciplineService;

        public DisciplinesController(IDisciplineService disciplineService)
        {
            _disciplineService = disciplineService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DisciplineModel>>> Get()
        {
            var disciplines = await _disciplineService.GetAllAsync();

            return Ok(disciplines);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DisciplineModel>> Get(int id)
        {
            var discipline = await _disciplineService.GetByIdAsync(id);

            return Ok(discipline);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _disciplineService.DeleteByIdAsync(id);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, DisciplineModel model)
        {
            await _disciplineService.UpdateAsync(id, model);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> Add(DisciplineModel model)
        {
            var created = await _disciplineService.AddAsync(model);

            return CreatedAtAction(nameof(Add), new { id = created.Id }, created);
        }
    }
}

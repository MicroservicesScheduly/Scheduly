using Microsoft.AspNetCore.Mvc;
using Business.Interfaces;
using System.Collections.Generic;
using Business.Models;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using SpecialtyService.Models;

namespace SimpleService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpecialtiesController : ControllerBase
    {
        private ISpecialtyService _specialtyService;
        private IFacultySpecialtyService _faultySpecialtyService;

        public SpecialtiesController(ISpecialtyService specialtyService, IFacultySpecialtyService faultySpecialtyService)
        {
            _specialtyService = specialtyService;
            _faultySpecialtyService = faultySpecialtyService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpecialtyModel>>> Get()
        {
            var faculties = await _specialtyService.GetAllAsync();

            return Ok(faculties);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SpecialtyModel>> Get(int id)
        {
            var specialty = await _specialtyService.GetByIdAsync(id);

            return Ok(specialty);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _specialtyService.DeleteByIdAsync(id);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, SpecialtyModel model)
        {
            await _specialtyService.UpdateAsync(id, model);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> Add(SpecialtyModel model)
        {
            var created = await _specialtyService.AddAsync(model);

            return CreatedAtAction(nameof(Add), new { id = created.Id }, created);
        }

        /* ------- faculty specialties ------- */

        [HttpGet("facultySpecialties")]
        public async Task<ActionResult<IEnumerable<FacultySpecialtyModel>>> GetAllFacultySpecialtiesAsync()
        {
            var facultySpecialties = await _faultySpecialtyService.GetAllAsync();

            return Ok(facultySpecialties);
        }

        [HttpGet("facultySpecialties/{id}")]
        public async Task<ActionResult<IEnumerable<SpecialtyModel>>> GetSpecialtiesByFacultyIdAsync(int id)
        {
            var facultySpecialties = await _faultySpecialtyService.GetSpecialtiesByFacultyIdAsync(id);

            return Ok(facultySpecialties);
        }

        [HttpPost("facultySpecialties")]
        public async Task<ActionResult> AddFacultySpecialty(FacultySpecialtyModel model)
        {
            var created = await _faultySpecialtyService.AddAsync(model);

            return CreatedAtAction(nameof(Add), new { id = created.Id }, created);
        }

        [HttpDelete("facultySpecialties/{id}")]
        public async Task<ActionResult> DeleteFacultySpecialty(int id)
        {
            await _faultySpecialtyService.DeleteByIdAsync(id);

            return NoContent();
        }
    }
}



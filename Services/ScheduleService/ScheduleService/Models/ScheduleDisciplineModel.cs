using ScheduleService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models
{
    public class ScheduleDisciplineModel : BaseModel
    {
        public int DisciplineId { get; set; }
        public int TeacherId { get; set; }
        public string? TeacherName { get; set; }
        public int Day { get; set; }
        public int Semester { get; set; }
        public int Lesson { get; set; }

        public int ScheduleId { get; set; }
    }
}

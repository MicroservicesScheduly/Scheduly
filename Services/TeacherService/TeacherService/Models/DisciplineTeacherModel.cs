using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models
{
    public class DisciplineTeacherModel : BaseModel
    {
        public int DisciplineId { get; set; }
        public int TeacherId { get; set; }
        public bool isLecturer { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_access.Entities
{
    public class DisciplineTeacher : BaseEntity
    {
        public int DisciplineId { get; set; }
        public int TeacherId { get; set; }
        public bool isLecturer { get; set; }

        public Teacher Teacher { get; set; }

    }
}

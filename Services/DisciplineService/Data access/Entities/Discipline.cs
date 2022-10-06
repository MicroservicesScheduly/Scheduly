using Data_access.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_access.Entities
{
    public class Discipline : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Course { get; set; }
        public CreditType CreditType { get; set; }
        public int Hours { get; set; }
        public bool IsSelective { get; set; }
    }
}

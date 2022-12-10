﻿using SimpleService.Entities;

namespace ScheduleService.Entities
{
    public class ScheduleDiscipline : BaseEntity
    {
        public int DisciplineId { get; set; }
        public int TeacherId { get; set; }
        public string? TeacherName { get; set; }
        public int Day { get; set; }
        public int Semester { get; set; }
        public int Lesson { get; set; }
        public bool IsLecture { get; set; }

        public int ScheduleId { get; set; }
    }
}

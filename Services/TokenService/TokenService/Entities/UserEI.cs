﻿namespace TokenService.Entities
{
    public class UserEI : BaseEntity
    {
        public int UserId { get; set; }
        public int EIId { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsAccepted { get; set; }
        public User? User { get; set; }
        public EI? EI { get; set; }
    }
}

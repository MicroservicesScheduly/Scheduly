using TokenService.Entities;

namespace TokenService.Interfaces
{
    public interface IEIRepository
    {
        Task<EI> AddAsync(EI entity);
        Task<UserEI> AddUserEIAsync(UserEI entity);
        Task<IEnumerable<EI>> GetAllAsync();
    }
}

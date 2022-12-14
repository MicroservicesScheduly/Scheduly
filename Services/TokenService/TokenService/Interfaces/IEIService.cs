using TokenService.Models;

namespace TokenService.Interfaces
{
    public interface IEIService
    {
        Task<EIModel> AddAsync(EIModel model);
        Task<UserEIModel> AddUserEIAsync(UserEIModel model);
        Task<IEnumerable<EIModel>> GetAllAsync();
    }
}

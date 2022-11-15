using TokenService.DbAccess;
using TokenService.Repositories;

namespace TokenService
{
    public class UnitOfWork
    {
        /// <summary>
        /// The forum database context
        /// </summary>
        private readonly UserDbContext _userDbContext;
        private UserRepository _userRepository;
        private CredentialsRepository _credentialsRepository;
        private RoleRepository _roleRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="UnitOfWork"/> class.
        /// </summary>
        /// <param name="userDbContext">The forum database context.</param>
        /// <param name="authDbContext">The authentication database context.</param>
        public UnitOfWork(UserDbContext userDbContext)
        {
            _userDbContext = userDbContext;
            _userRepository = new UserRepository(userDbContext);
            _credentialsRepository = new CredentialsRepository(userDbContext);
            _roleRepository = new RoleRepository(userDbContext);
        }
        public UserRepository UserRepository { get => _userRepository; }
        public CredentialsRepository CredentialsRepository { get => _credentialsRepository; }
        public RoleRepository RoleRepository { get => _roleRepository; }

        /// <summary>
        /// Saves asynchronously.
        /// </summary>
        public async Task SaveAsync()
        {
            await _userDbContext.SaveChangesAsync();
        }
    }
}

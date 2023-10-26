namespace SleepTrackerAPI.Repository
{
    public interface ISleepRepository : IGenericRepository<Sleep>
    {
        Task<List<Sleep>> GetAllSleepAsync();
        Task<Sleep> CreateSleepAsync(Sleep sleep);
        Task<Sleep> UpdateSleepAsync(Sleep sleep);
        bool DeleteSleepById(int id);
        Task<Sleep> GetSleepByIdAsync(int id);
    }
}

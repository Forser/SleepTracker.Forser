namespace SleepTrackerAPI.Repository
{
    public class SleepRepository : GenericRepository<Sleep>, ISleepRepository
    {
        private readonly SleepDbContext _context;

        public SleepRepository(SleepDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Sleep> CreateSleepAsync(Sleep sleep)
        {
            var result = _context.Sleeps.AddAsync(sleep);
            await _context.SaveChangesAsync();
            return result.Result.Entity;
        }

        public bool DeleteSleepById(int id)
        {
            Sleep sleep = _context.Sleeps.Find(id);

            if (sleep != null)
            {
                _context.Remove(sleep);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public async Task<List<Sleep>> GetAllSleepAsync()
        {
            return await _context.Sleeps.OrderByDescending(o => o.StartOfSleep).ToListAsync();
        }

        public async Task<Sleep> GetSleepByIdAsync(int id)
        {
            return await _context.Sleeps.Where(s => s.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Sleep> UpdateSleepAsync(Sleep sleep)
        {
            var result = await _context.Sleeps.FirstOrDefaultAsync(s => s.Id == sleep.Id);

            if (result != null)
            {
                result.StartOfSleep = sleep.StartOfSleep;
                result.EndOfSleep = sleep.EndOfSleep;
                result.TypeOfSleep = sleep.TypeOfSleep;

                await _context.SaveChangesAsync();

                return result;
            }

            return null;
        }
    }
}
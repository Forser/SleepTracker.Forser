using System.ComponentModel.DataAnnotations;

namespace SleepTrackerAPI.Models
{
    public class Sleep
    {
        [Key]
        public int Id { get; set; }
        public DateTime StartOfSleep { get; set; }
        public DateTime EndOfSleep { get; set; }
        public SleepType TypeOfSleep { get; set; } = SleepType.Sleep;
        public TimeSpan LengthOfSleep => EndOfSleep - StartOfSleep;
    }
}
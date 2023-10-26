using Microsoft.AspNetCore.Mvc;

namespace SleepTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SleepController : ControllerBase
    {
        private ISleepRepository _sleepRepository { get; set; }

        public SleepController(ISleepRepository sleepRepository)
        {
            _sleepRepository = sleepRepository;
        }

        [HttpGet("GetSleepRecords")]
        public async Task<IEnumerable<Sleep>> GetSleepRecords()
        {
            return await _sleepRepository.GetAllSleepAsync();
        }
        [HttpGet("GetSleepRecord/{id:int}")]
        public async Task<Sleep> GetSleepById(int id)
        {
            return await _sleepRepository.GetSleepByIdAsync(id);
        }
        [HttpPut("UpdateSleepRecord/{id:int}")]
        public async Task<ActionResult<Sleep>> UpdateSleepRecord(int id, Sleep sleep)
        {
            try
            {
                if (sleep == null)
                {
                    return BadRequest();
                }

                var sleepToUpdate = await _sleepRepository.GetSleepByIdAsync(id);

                if (sleepToUpdate == null)
                {
                    return NotFound($"Record with Id = {id} not found");
                }

                sleep.Id = id;
                return await _sleepRepository.UpdateSleepAsync(sleepToUpdate);
            }
            catch (Exception) 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating sleep record");
            }
        }
        [HttpDelete("DeleteSleepRecord/{id:int}")]
        public ActionResult DeleteSleepRecord(int id)
        {
            bool isDeleted = _sleepRepository.DeleteSleepById(id);

            if (isDeleted)
            {
                return RedirectToAction("GetSleepRecords");
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting the sleep record");
            }
        }
    }
}
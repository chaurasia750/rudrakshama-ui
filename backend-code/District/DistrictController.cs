using Microsoft.AspNetCore.Mvc;
using HautSphereApi.Services.Interfaces.Master;

namespace HautSphereApi.Controllers.Master
{
    [Route("api/[controller]")]
    [Route("master/district")]
    [ApiController]
    public class DistrictController : ControllerBase
    {
        private readonly IDistrictService _districtService;

        public DistrictController(IDistrictService districtService)
        {
            _districtService = districtService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var districts = await _districtService.GetAllAsync();
            return Ok(districts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var district = await _districtService.GetByIdAsync(id);
            if (district == null) return NotFound();
            return Ok(district);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateDistrictStatusRequest request)
        {
            var district = await _districtService.UpdateStatusAsync(id, request.Active);
            if (district == null) return NotFound();
            return Ok(district);
        }
    }

    public class UpdateDistrictStatusRequest
    {
        public bool Active { get; set; }
    }
}

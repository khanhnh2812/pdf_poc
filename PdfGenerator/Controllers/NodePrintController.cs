using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PdfGenerator.Extensions;
using PdfGenerator.Services.Meta;
using PdfGenerator.ViewModels;
using PuppeteerSharp;
using PuppeteerSharp.Media;

namespace PdfGenerator.Controllers
{
  [Route("/api/nodePrint")]
  public class NodePrintController : ControllerBase
  {
    private readonly IWorkerService _workerService;

    public NodePrintController(IWorkerService workerService)
    {
      _workerService = workerService ?? throw new ArgumentNullException(nameof(workerService));
    }

    [HttpGet]
    public async Task<IActionResult> Print()
    {
      var result = await _workerService.pdf();
      return File(result, "application/pdf", $"Invoice-1.pdf");
    }
  }
}
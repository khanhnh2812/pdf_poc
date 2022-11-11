using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using PdfGenerator.Services.Meta;
using System.Threading.Tasks;
using System.IO;
using System;

namespace PdfGenerator.Services
{
  public class WorkerService : IWorkerService
  {
    private readonly INodeServices _nodeServices;
    private readonly string _scriptFolder;

    public WorkerService([FromServices] INodeServices nodeServices) : this(nodeServices, ".")
    {

    }

    public WorkerService([FromServices] INodeServices nodeServices, string scriptFolder)
    {
      _nodeServices = nodeServices;
      _scriptFolder = scriptFolder;
    }

    public async Task<Byte[]> pdf(string code)
    {
      string path = Path.Combine(_scriptFolder, "./Scripts/pdf");
      var result = await _nodeServices.InvokeAsync<Byte[]>(path, code);
      return result;
    }
  }
}
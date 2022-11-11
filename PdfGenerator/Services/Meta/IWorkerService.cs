using System.Threading.Tasks;
using System;

namespace PdfGenerator.Services.Meta
{
  public interface IWorkerService
  {
    Task<Byte[]> pdf(string code);
  }
}
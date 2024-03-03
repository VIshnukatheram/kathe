using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace FG_STModels.BL.Service
{
    public class HttpService
    {

        public static async Task<Response<TResponse>> HttpPostCall<TRequest, TResponse>(TRequest requestBody, string apiUrl)
        {
            HttpClient _httpClient = new HttpClient();
            Response<TResponse> response = new();
            string apiKeyValue = Environment.GetEnvironmentVariable("APIKeyValue");
           

            string jsonContent = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            // Make the HTTP Post request

            // Create an HttpRequestMessage and set headers
            var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);
            request.Headers.Add("Ocp-Apim-Subscription-Key", apiKeyValue);
            request.Content = content;

            HttpResponseMessage responseMessage = await _httpClient.SendAsync(request);

            if (responseMessage.IsSuccessStatusCode)
            {
                // Handle the successful response
                //response.ResponseOutput = await responseMessage.Content.ReadAsAsync<TResponse>();

            }
            else
            {
                // Handle the error response
                string errorMessage = $"HTTP request failed with status code {responseMessage.StatusCode}";
                response.Error = errorMessage;

            }

            return response;
        }

        public static async Task<Response<TResponse>> HttpPostForFileUpload<TRequest, TResponse>(TRequest requestBody, string apiUrl, IFormFile file)
        {
            HttpClient _httpClient = new HttpClient();
            Response<TResponse> response = new();
            string apiKeyValue = Environment.GetEnvironmentVariable("APIKeyValue");
           

            // Make the HTTP Post request
            var fromData = new MultipartFormDataContent();

            // File Content

             var boundary = fromData.Headers.ContentType.Parameters
                              .FirstOrDefault(p => p.Name.Equals("boundary", StringComparison.OrdinalIgnoreCase))?.Value;
            var fileContent = new StreamContent(file.OpenReadStream());
            fromData.Headers.ContentType = MediaTypeHeaderValue.Parse($"multipart/form-data; boundary={boundary}");
            //fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse(file.ContentType);

            fromData.Add(fileContent, "file", file.FileName);

            // Body Content
            string jsonContent = JsonConvert.SerializeObject(requestBody);
            var bodyContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            fromData.Add(bodyContent, "request");

            // Create an HttpRequestMessage and set headers
            var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);
            request.Headers.Add("Ocp-Apim-Subscription-Key", "dc2821ba8f7a42e291c8e473aedafadb");
            request.Content = fromData;

            //var response = await _httpClient.PostAsync("<The API URI>", content, cancellationToken);
            HttpResponseMessage responseMessage = await _httpClient.SendAsync(request);

            if (responseMessage.IsSuccessStatusCode)
            {
                string SmsResponse = await responseMessage.Content.ReadAsStringAsync();
                // Handle the successful response
                //response.ResponseOutput = await responseMessage.Content.ReadAsAsync<TResponse>();
            }
            else
            {
                // Handle the error response
                string errorMessage = $"HTTP request failed with status code {responseMessage.StatusCode}";
                response.Error = errorMessage;
            }
            return response;
        }
    }

    public class Response<TResponse>
    {
        public string Error { get; set; }
        public TResponse ResponseOutput { get; set; }
    }
}
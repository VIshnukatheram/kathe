using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequestAPI.Services
{
    public class HttpService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<HttpService> _logger;

        public HttpService()
        {
            _httpClient = new HttpClient();
            //_logger = logger;
        }

        public async Task<Response<TResponse>> HttpPostCall<TRequest, TResponse>(TRequest requestBody, string apiUrl)
        {
            Response<TResponse> response = new();
            string apiKeyValue = Environment.GetEnvironmentVariable("APIKeyValue");
            //_logger.LogInformation("LA API Initiated", requestBody, apiUrl);

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
                response.ResponseOutput = await responseMessage.Content.ReadAsAsync<TResponse>();

            }
            else
            {
                // Handle the error response
                string errorMessage = $"HTTP request failed with status code {responseMessage.StatusCode}";
                response.Error = errorMessage;

            }
            //_logger.LogInformation("LA API Response", response, apiUrl);
            return response;
        }


    }

    public class Response<TResponse>
    {
        public string Error { get; set; }
        public TResponse ResponseOutput { get; set; }
    }
}

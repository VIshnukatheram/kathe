using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection.Metadata;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FISS_ServiceRequest.Services
{
    public class HttpService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<HttpService> _logger;

        public HttpService(ILogger<HttpService> logger)
        {
            _httpClient = new HttpClient();
            _logger = logger;
        }

        public async Task<Response<TResponse>> HttpPostCall<TRequest, TResponse>(TRequest requestBody, string apiUrl)
        {
            Response<TResponse> response = new();
            string apiKeyValue = Environment.GetEnvironmentVariable("APIKeyValue");
            string jsonContent = JsonConvert.SerializeObject(requestBody);

            _logger.LogInformation("LA API Initiated", jsonContent, apiUrl);
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
            string jsonResponse = JsonConvert.SerializeObject(response);
            _logger.LogInformation("LA API Response", jsonResponse, apiUrl);
            return response;
        }
        public async Task<Response<TResponse>> HttpPostCallLocal<TRequest, TResponse>(TRequest requestBody, string apiUrl)
        {
            Response<TResponse> response = new();
            string apiKeyValue = Environment.GetEnvironmentVariable("APIKeyValue");
            _logger.LogInformation("LA API Initiated", requestBody, apiUrl);

            string jsonContent = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            // Make the HTTP Post request

            // Create an HttpRequestMessage and set headers
            var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);
            //request.Properties.Add("code", "xuY5a9nEbOkmIaHpWLfoXn8Z6n8OfGHvekvWth77e33LAzFuvZ_xJg");
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
            _logger.LogInformation("LA API Response", response, apiUrl);


            return response;
        }
        public async Task<Response<TResponse>> HttpPostForFileUpload<TRequest, TResponse>(TRequest requestBody, string apiUrl, IFormFile file)
        {
            Response<TResponse> response = new();
            string apiKeyValue = Environment.GetEnvironmentVariable("APIKeyValue");
            _logger.LogInformation("LA API Initiated", requestBody, apiUrl);

            // Make the HTTP Post request
            var fromData = new MultipartFormDataContent();

            // File Content
            var fileContent = new StreamContent(file.OpenReadStream());
            fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse(file.ContentType);

            fromData.Add(fileContent, "file", file.FileName);

            // Body Content
            string jsonContent = JsonConvert.SerializeObject(requestBody);
            var bodyContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            fromData.Add(bodyContent, "request");

            // Create an HttpRequestMessage and set headers
            var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);
            request.Headers.Add("Ocp-Apim-Subscription-Key", apiKeyValue);
            request.Content = fromData;

            

            //var response = await _httpClient.PostAsync("<The API URI>", content, cancellationToken);


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
            _logger.LogInformation("LA API Response", response, apiUrl);
            return response;
        }
        public async Task<Response<TResponse>> HttpPostCallForMandate<TRequest, TResponse>(TRequest requestBody, string apiUrl)
        {
            Response<TResponse> response = new();
            string apiKeyValue = "b6e42053ff354023b6971ec30fcf0230";
            string jsonContent = JsonConvert.SerializeObject(requestBody);

            _logger.LogInformation("LA API Initiated", jsonContent, apiUrl);
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
            string jsonResponse = JsonConvert.SerializeObject(response);
            _logger.LogInformation("LA API Response", jsonResponse, apiUrl);
            return response;
        }

    }

    public class Response<TResponse>
    {
        public string Error { get; set; }
        public TResponse ResponseOutput { get; set; }
    }
}

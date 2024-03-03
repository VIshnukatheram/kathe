using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Reflection.Metadata;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FISS_CommunicationConfig.Services
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
            _logger.LogInformation("LA API Initiated", requestBody, apiUrl);

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
            _logger.LogInformation("LA API Response", response, apiUrl);
            return response;
        }


        public string HttpPostForShoter(string ppclink)
        {
            string apiUrl = "https://fgliserviceprod.fglife.in/FGLIURLShortner/urlshortener/v1/url";
            var formData = new MultipartFormDataContent();
            formData.Add(new StringContent(ppclink), "url");
            formData.Add(new StringContent("test"), "urltype");
            using (HttpClient httpClient = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);
                request.Headers.Add("Ocp-Apim-Subscription-Key", "13b5a241ece045b89556492068979de2");
                request.Content = formData;
                HttpResponseMessage responseMessage =  _httpClient.Send(request);
                if (responseMessage.IsSuccessStatusCode)
                {
                    var Response = responseMessage.Content.ReadAsStringAsync().Result;
                    var content = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(Response);
                    return content.shorturl;
                }
                else
                {
                    string errorMessage = $"HTTP request failed with status code {responseMessage.StatusCode}";
                    return "";
                }
            }
        }
    }

    public class Response<TResponse>
    {
        public string Error { get; set; }
        public TResponse ResponseOutput { get; set; }
    }
}

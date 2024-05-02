using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json.Linq;

namespace AgreeYaSolution.Models
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
            try
            {
                Response<TResponse> response = new();
                string jsonContent = JsonConvert.SerializeObject(requestBody);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);
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
                _logger.LogInformation("LA API Response", response, apiUrl);
                return response;
            }
            catch (Exception ex) {
                throw ex;
            }
        }
        public async Task<Response<TResponse>> HttpPutCall<TRequest, TResponse>(TRequest requestBody, string apiUrl,string token)
        {
            Response<TResponse> response = new Response<TResponse>(); 

            try
            {
                string jsonContent = JsonConvert.SerializeObject(requestBody);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                HttpResponseMessage responseMessage = await _httpClient.PutAsync(apiUrl, content);
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                if (responseMessage.IsSuccessStatusCode)
                {                 
                    //response.ResponseOutput = await responseMessage.Content.ReadAsStringAsync().Result;
                    //response.ResponseOutput = JsonConvert.DeserializeObject<TResponse>(responseData);
                }
                else
                {
                    // Handle the error response
                    string errorMessage = $"HTTP request failed with status code {responseMessage.StatusCode}";
                    response.Error = errorMessage;
                }
            }
            catch (Exception ex)
            {
                string errorMessage = $"An error occurred: {ex.Message}";
                response.Error = errorMessage;
            }

            return response;
        }
        public dynamic HttpGetCall(dynamic requestBody, string apiUrl,string token)
        {
            try
            {
                Response<dynamic> response = new();
                string jsonContent = JsonConvert.SerializeObject(requestBody);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                var request = new HttpRequestMessage(HttpMethod.Get, apiUrl);
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                request.Content = content;

                HttpResponseMessage responseMessage = _httpClient.Send(request);

                if (responseMessage.IsSuccessStatusCode)
                {
                    response.ResponseOutput = responseMessage.Content.ReadAsStringAsync().Result;
                }
                else
                {
                    string errorMessage = $"HTTP request failed with status code {responseMessage.StatusCode}";
                    response.Error = errorMessage;

                }
                _logger.LogInformation("LA API Response", response, apiUrl);
                return response;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Response<TResponse>> HttpDeleteCall<TRequest, TResponse>(TRequest requestBody, string apiUrl,string token)
        {
            try
            {
                Response<TResponse> response = new();

                HttpResponseMessage responseMessage = await _httpClient.DeleteAsync(apiUrl);
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

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
                _logger.LogInformation("LA API Response", response, apiUrl);
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public class Response<TResponse>
        {
            public string Error { get; set; }
            public TResponse ResponseOutput { get; set; }
        }
    }
}

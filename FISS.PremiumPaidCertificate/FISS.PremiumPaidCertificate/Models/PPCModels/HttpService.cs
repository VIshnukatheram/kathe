using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace FISS.PremiumPaidCertificate.Models.PPCModels
{
    public class HttpService
    {
        private readonly HttpClient _httpClient;

        public HttpService()
        {
            _httpClient = new HttpClient();

        }

        public async Task<FGPPCApiResponse> HttpPostCall<TRequest, TResponse>(TRequest requestBody, string apiUrl)
        {
            FGPPCApiResponse response = new();
            string apiKeyValue = Environment.GetEnvironmentVariable("APIKeyValue");

            string jsonContent = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            // Make the HTTP Post request

            // Create an HttpRequestMessage and set headers
            var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);
            request.Headers.Add("Ocp-Apim-Subscription-Key", apiKeyValue);
            request.Content = content;

            HttpResponseMessage responseMessage = await _httpClient.SendAsync(request);
            string SmsResponse = await responseMessage.Content.ReadAsStringAsync();
            JObject requestedId = JObject.Parse(SmsResponse);
            if (responseMessage.IsSuccessStatusCode)
            {
                // Handle the successful response
                string res = await responseMessage.Content.ReadAsStringAsync();
                response = await responseMessage.Content.ReadAsAsync<FGPPCApiResponse>();

            }
            else
            {
                // Handle the error respons
                string res = await responseMessage.Content.ReadAsStringAsync();
                response = await responseMessage.Content.ReadAsAsync<FGPPCApiResponse>();

            }
            return response;
        }
        public async Task<List<CommunicationResponse>> HttpCommPostCall<TRequest, TResponse>(TRequest requestBody, string apiUrl)
        {
            List<CommunicationResponse> response = new();
            string apiKeyValue = Environment.GetEnvironmentVariable("APIKeyValue");

            string jsonContent = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            // Make the HTTP Post request

            // Create an HttpRequestMessage and set headers
            var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);
            request.Headers.Add("Ocp-Apim-Subscription-Key", apiKeyValue);
            request.Content = content;

                   HttpResponseMessage responseMessage = await _httpClient.SendAsync(request);
            string SmsResponse = await responseMessage.Content.ReadAsStringAsync();
            if (responseMessage.IsSuccessStatusCode)
            {
                // Handle the successful response
                string res = await responseMessage.Content.ReadAsStringAsync();
                response = await responseMessage.Content.ReadAsAsync<List<CommunicationResponse>>();

            }
            else
            {
                // Handle the error respons
                string res = await responseMessage.Content.ReadAsStringAsync();
                response = await responseMessage.Content.ReadAsAsync<List<CommunicationResponse>>();

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

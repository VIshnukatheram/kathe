using Newtonsoft.Json;
using System.Runtime.CompilerServices;

namespace FG_STModels.Models.Shared
{
    public class WorkFlowConfigs
    {
        public List<WorkFlowConfig> WorkFlowConfig { get; set; } 
        public void LoadConfig(string RootFolder) {
            WorkFlowConfig = JsonConvert.DeserializeObject<WorkFlowConfigs>(
                File.ReadAllText(string.Format("{0}/Config/WorkFlowConfig.json", RootFolder))).
                WorkFlowConfig;
        }
    }
    public class WorkFlowConfig
    {
        public int Call_Typ { get; set; }
        public int Sub_Typ { get; set; }
        public string WorkFlowName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
using FISS_ServiceRequest.Models.Shared;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace FISS_ServiceRequest.Services
{
    public class WorkFlow
    {
        public void GraphWorkFlow()
        {
            var fileName = "PoC.graphml"; // Replace with your GraphML file name 5,1

            XmlDocument doc = new XmlDocument();
            doc.Load(fileName);

            string xmlString = doc.InnerXml;

            var serializer = new XmlSerializer(typeof(GraphMLTemplate));
            GraphMLTemplate graphmL;
            using (var reader = new StringReader(xmlString))
            {
                graphmL = (GraphMLTemplate)serializer.Deserialize(reader);
            }

            /// Get Graph Serilized Object
            string serviceReqId = "SR20230919-001";

            string position = "n0";// "START";
            foreach (var nodes in graphmL!.Graph.Nodes)
            {
                if (nodes.Id == position)    //nodes.Data.Any(x => x.Value == position
                {
                    ExecuteExpression(nodes, graphmL, position);
                }
            }
        }
        void ExecuteExpression(Node nodes, GraphMLTemplate graphML, string position)
        {

            List<Edge> edge = graphML!.Graph.Edges.Where(x => x.Source == nodes.Id).ToList();

            // Execute Status
            Data? status_update = nodes.Data.Find(x => graphML.Keys.Find(y => y.Id == x.Key)?.AttributeName == "CURRENT_PROCESS_STAGE");
            if (status_update != null)
                Console.WriteLine(status_update.Value);

            // Execute Function
            Data? function_data = nodes.Data.Find(x => graphML.Keys.Find(y => y.Id == x.Key)?.AttributeName == "FUNC_NAME");
            if (function_data != null)
            {
                Console.WriteLine(function_data.Value);
                //Data? paramerters = nodes.Data.Find(x => graphmL.Keys.Find(y => y.Id == x.Key)?.AttributeName == "PARAMS");



                //Type type = typeof(CommonService);
                //MethodInfo? method = type.GetMethod(function_data.Value);
                //CommonService c = new CommonService();

                //if (method != null)
                //{
                //    if (paramerters != null)
                //    {
                //        string[] param  = paramerters.Value.Split(',');

                //        string? result = method!.Invoke(c, param)!.ToString();
                //    }
                //    else
                //    {
                //        var result = method!.Invoke(c, null);

                //    }

                //}


            }


            // Execute Condition
            Data? condition_data = nodes.Data.Find(x => graphML.Keys.Find(y => y.Id == x.Key)?.AttributeName == "CONDITION");
            if (condition_data != null)
            {
                //var data = new DataSet() ;// dataTable.AsEnumerable().Where(f => f.Field<string>("SrvReqRefNo") == serviceReqId).FirstOrDefault();
                //if (data != null)
                //{
                //    data.Table.Columns["CurrentStatus"]!.Expression = condition_data.Value;

                //    edge.ForEach(x =>
                //    {
                //        if (x.Data.Exists(x => x.Value == data["CurrentStatus"].ToString()))
                //        {
                //            position = x.Target;
                //        }
                //    });

                //}

            }
            else
            {
                if (edge.Count > 0)
                {
                    position = edge.First().Target;
                }
            }


        }
    }
}

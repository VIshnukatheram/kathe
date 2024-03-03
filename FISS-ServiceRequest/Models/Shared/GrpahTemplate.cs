using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace FISS_ServiceRequest.Models.Shared
{
    internal class GrpahTemplate
    {
    }
    [XmlRoot("graphml", Namespace = "http://graphml.graphdrawing.org/xmlns")]
    public class GraphMLTemplate
    {
        [XmlElement("key")]
        public List<Key> Keys { get; set; }

        [XmlElement("graph")]
        public Graph Graph { get; set; }
    }

    public class Key
    {
        [XmlAttribute("id")]
        public string Id { get; set; }

        [XmlAttribute("for")]
        public string For { get; set; }

        [XmlAttribute("attr.name")]
        public string AttributeName { get; set; }

        [XmlAttribute("attr.type")]
        public string AttributeType { get; set; }

        [XmlElement("default")]
        public string Default { get; set; }
    }

    public class Graph
    {
        [XmlAttribute("edgedefault")]
        public string EdgeDefault { get; set; }

        [XmlElement("data")]
        public List<Data> Data { get; set; }

        [XmlElement("node")]
        public List<Node> Nodes { get; set; }

        [XmlElement("edge")]
        public List<Edge> Edges { get; set; }
    }

    public class Data
    {
        [XmlAttribute("key")]
        public string Key { get; set; }

        [XmlText]
        public string Value { get; set; }
    }

    public class Node
    {
        [XmlAttribute("id")]
        public string Id { get; set; }

        [XmlElement("data")]
        public List<Data> Data { get; set; }
    }

    public class Edge
    {
        [XmlAttribute("id")]
        public string Id { get; set; }

        [XmlAttribute("source")]
        public string Source { get; set; }

        [XmlAttribute("target")]
        public string Target { get; set; }

        [XmlElement("data")]
        public List<Data> Data { get; set; }
    }
}

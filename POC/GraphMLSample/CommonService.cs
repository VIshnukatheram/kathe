using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphMLSample
{
    public class CommonService
    {

        public DataTable GetDataTable() {

            // Create a DataTable
            DataTable serviceRequestTable = new DataTable("ServiceRequest");

            // Define the columns for the DataTable
            serviceRequestTable.Columns.Add("SrvReqID", typeof(long));
            serviceRequestTable.Columns.Add("SrvReqRefNo", typeof(string));
            serviceRequestTable.Columns.Add("Category", typeof(short));
            serviceRequestTable.Columns.Add("CallType", typeof(int));
            serviceRequestTable.Columns.Add("SubType", typeof(int));
            serviceRequestTable.Columns.Add("RequestSource", typeof(int));
            serviceRequestTable.Columns.Add("RequestMode", typeof(int));
            serviceRequestTable.Columns.Add("PolicyNo", typeof(int));
            serviceRequestTable.Columns.Add("CustomerId", typeof(int));
            serviceRequestTable.Columns.Add("ALL_DOCS_AVAILABLE", typeof(string));
            serviceRequestTable.Columns.Add("MAN_DOCS_AVAILABLE", typeof(int));
            serviceRequestTable.Columns.Add("CurrentStatus", typeof(string));
            serviceRequestTable.Columns.Add("CreatedOn", typeof(DateTime));
            serviceRequestTable.Columns.Add("CreatedByRef", typeof(string));
            serviceRequestTable.Columns.Add("ModifiedOn", typeof(DateTime));
            serviceRequestTable.Columns.Add("ModifiedByRef", typeof(string));
            serviceRequestTable.Columns.Add("AssignedTo", typeof(string));
            serviceRequestTable.Columns.Add("ReasonForChange", typeof(string));
            serviceRequestTable.Columns.Add("RequestDateTime", typeof(DateTime));
            serviceRequestTable.Columns.Add("ReasonDelayed", typeof(string));
            serviceRequestTable.Columns.Add("CustSignDateTime", typeof(DateTime));

            // Create a new row and populate it with sample data
            DataRow row = serviceRequestTable.NewRow();
            row["SrvReqID"] = 0;
            row["SrvReqRefNo"] = "SR20230919-001";
            row["Category"] = 1;
            row["CallType"] = 101;
            row["SubType"] = 201;
            row["RequestSource"] = 1;
            row["RequestMode"] = 2;
            row["PolicyNo"] = 789;
            row["CustomerId"] = 456;
            row["ALL_DOCS_AVAILABLE"] = 2;
            row["MAN_DOCS_AVAILABLE"] = 2;
            row["CurrentStatus"] = "START";
            row["CreatedOn"] = DateTime.Now;
            row["CreatedByRef"] = "User123";
            row["ModifiedOn"] = DateTime.Now;
            row["ModifiedByRef"] = "User456";
            row["AssignedTo"] = ""; // Assign a value if needed
            row["ReasonForChange"] = ""; // Assign a value if needed
            row["RequestDateTime"] = DateTime.Now; // Assign a specific DateTime if needed
            row["ReasonDelayed"] = ""; // Assign a value if needed
            row["CustSignDateTime"] = DateTime.Now; // Assign a specific DateTime if needed

            // Add the row to the DataTable
            serviceRequestTable.Rows.Add(row);

            // Now, you have a DataTable with one row of Service Request data.

            return serviceRequestTable; 
        }

        public string ALLOCATE_TASK(string SERVREQUEST_ID, string BOE_ID, string TEAM_ID)
        {
            string serviceRequestTable = SERVREQUEST_ID + BOE_ID + TEAM_ID;
            Console.WriteLine(serviceRequestTable);
            return serviceRequestTable;
        }

        public DataSet GraphFlow()
        {
            DataSet dataSet = new DataSet();

            dataSet.Tables.Add(GetServiceReq());
            dataSet.Tables.Add(GetCustomer());
            dataSet.Tables.Add(GetPolicy());

            return dataSet;

        }
        public DataTable GetServiceReq()
        {
            DataTable serviceRequestTable = new DataTable("ServRequest");

            // Add columns to the DataTable
            serviceRequestTable.Columns.Add("SrvReqID", typeof(long));
            serviceRequestTable.Columns.Add("SrvReqRefNo", typeof(string));
            serviceRequestTable.Columns.Add("Category", typeof(short));
            serviceRequestTable.Columns.Add("CallType", typeof(int));
            serviceRequestTable.Columns.Add("SubType", typeof(int));
            serviceRequestTable.Columns.Add("ReqSource", typeof(int));
            serviceRequestTable.Columns.Add("ReqMode", typeof(int));
            serviceRequestTable.Columns.Add("PolicyRef", typeof(int));
            serviceRequestTable.Columns.Add("CustomerRef", typeof(int));
            serviceRequestTable.Columns.Add("CustRole", typeof(int));
            serviceRequestTable.Columns.Add("BranchRef", typeof(int));
            serviceRequestTable.Columns.Add("CurrentStatus", typeof(int));
            serviceRequestTable.Columns.Add("CreatedOn", typeof(DateTime));
            serviceRequestTable.Columns.Add("CreatedByRef", typeof(string));
            serviceRequestTable.Columns.Add("ModifiedOn", typeof(DateTime));
            serviceRequestTable.Columns.Add("ModifiedByRef", typeof(string));
            serviceRequestTable.Columns.Add("Source", typeof(string));
            serviceRequestTable.Columns.Add("PrtSerReqID", typeof(long));

            return serviceRequestTable;
        }

        public DataTable GetCustomer()
        {
            DataTable customerTable = new DataTable("LA_Customer");

            // Add columns to the DataTable
            customerTable.Columns.Add("CustomerRef", typeof(int));
            customerTable.Columns.Add("LA_CustomerID", typeof(string));

            return customerTable;

        }

        public DataTable GetPolicy()
        {
            DataTable policyTable = new DataTable("LA_Policy");

            // Add columns to the DataTable
            policyTable.Columns.Add("PolicyRef", typeof(int));
            policyTable.Columns.Add("LA_PolicyNo", typeof(string));
            policyTable.Columns.Add("FG_ApplNo", typeof(string));

            return policyTable;

        }
        public void InvokeSMS()
        {
            Console.WriteLine("Invoke SMS Triggered");
        }

        //public void CLOSE_REQUEST()
        //{
        //    Console.WriteLine("CLOSE_REQUEST Triggered");
        //}
        public string CLOSE_REQUEST(string SERVREQUEST_ID)
        {
            string value = "CLOSE_REQUEST Triggered " + SERVREQUEST_ID;
            Console.WriteLine(value);
            return value;

        }
        public void VERIFY_DOCS_UPLOADED()
        {
            Console.WriteLine("VERIFY_DOCS_UPLOADED Triggered");
        }

    }
}

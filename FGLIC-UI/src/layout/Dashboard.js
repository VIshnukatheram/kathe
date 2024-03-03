import React, { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux';

import apiCalls from "../api/apiCalls";
import { Spin,message,Table,Space } from "antd";
import { useNavigate,useLocation  } from 'react-router-dom';
import moment from "moment";
import { connect } from "react-redux";

const Dashboard = (props) => {
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Access the state passed during navigation
  const { state } = location;
  const [showTotalPages,setShowTotalpages] = useState(null);
  const shouldLog = useRef(true);

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">

<a className="editIcon"> <i  onClick={() => handleAction(record)} className="bi bi-pencil-square"></i></a>

         {/* <Button
                        type="primary"
                        className="primary-btn panvalidate-btn"
                        onClick={() => handleAction(record.serviceNo)}
                      >
                        View
                      </Button> */}
        </Space>
      ),
    },
    {
      title: "Ticket No",
      dataIndex: "serviceNo",
      key: 'serviceNo',
    },
    {
      title: "Call Log Date",
      dataIndex: "date",
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => moment.utc(a.date).diff(moment.utc(b.date)),
      },
     render: (_, record) => (
      <Space size="middle">
      { moment.utc(record.date).local().format("DD/MM/YYYY hh:mm A")}
      </Space>
    ),
    },

    {
      title: "Policy/Application Number",
      dataIndex: "policyNo",
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => a.policyNo - b.policyNo,
      },
    },
    {
      title: "Request Type",
      dataIndex: "callTypeName"
    },
    {
      title: "Request SubType",
      dataIndex: "subTypeName"
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Customer Name",
      dataIndex: "proposerName"
    },
    {
      title: "Product",
      dataIndex: "plan"
    },
    // {
    //   title: "Customer Type",
    //   dataIndex: "CustomerType"
    // },
    // {
    //   title: "Ageing",
    //   dataIndex: "ageing"
    // },
    {
      title: "Logged By",
      dataIndex: "loggedBy",
    },
   
  ];

  const [data, setData] = useState([]);
         useEffect(() => {
          if(shouldLog.current){
            shouldLog.current = false;
            getSearchData();
          }
         }, []); 


     
         const getSearchData =  async () => {
           setIsLoading(true);
           let obj = {userId:'',role:'' }
           if(loggedUser?.role === 'posexecutive' || state?.role === 'posexecutive'){
           obj.userId='posuser3';
           obj.role='4'
         }
         else if(loggedUser?.role === 'posmanager'){
            obj.userId='posmanager'; 
           obj.role='5'
           }
           else if(loggedUser?.role === 'nbuser'){
            obj.userId='NbUser1';
           obj.role='11'
           }
           else if(loggedUser?.role === 'pauser'){
            obj.userId='pauser1';
           obj.role='15'
           }
           let response = apiCalls.getPOSData(obj);
           response.then((val)=>{
             if(val?.data){
               setData(val?.data);
               setShowTotalpages(val?.data?.length);
             }else{
               message.destroy();
               message.error({
                 content: val?.data?.responseHeader?.message||"Something went wrong please try again!",
                 className: "custom-msg",
                 duration: 2,
               });
             }
             setIsLoading(false);
           }).catch((err)=>{
             setIsLoading(false);
           })
         }

  const handleAction = (item) => {
    navigate("/policydetails",{ state: {serialNo:item?.serviceNo, isPOS:true,policyNo: item?.policyNo, dob: item?.dob}});
  };
  return (
    <>
    <Spin spinning={isLoading}>
      <div className="main-start">
        <div className="w-94">
          <div className="table-container dashboard">
          <Table
        columns={columns}
        dataSource={data}
        //bordered={true}
        x={true}
        pagination={{
          //pageSizeOptions: ["5", "10", "15", "15"],
          pageSize: 10,
          //showSizeChanger: true,
          defaultPageSize: 5,
         // size:"small",
           total: {showTotalPages},
          //showTotal: `Total ${showTotalPages} items`
        }}
      />
          </div>
        </div>
      </div>
      </Spin>
    </>
  );
};

const mapStateToProps = ({state,userProfileInfo }) => {
  return { data: state?.PolicyDetailsReducer?.policyDetailsObj,
    userProfileInfo}
}

export default connect(mapStateToProps)(Dashboard);

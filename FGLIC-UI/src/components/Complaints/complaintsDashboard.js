import React, { useState,useEffect,useRef } from 'react';
import { Card,Form,Select,Row,Col, Table,Spin, message, Space } from 'antd';
import apiCalls from "../../api/apiCalls";
import moment from 'moment';

const ComplaintsDashboard = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [isLoading,setIsLoading] = useState(false);
  const [data,setData] = useState([]);
  const [showTotalPages,setShowTotalpages] = useState(null);
  const [callTypeLU,setCallTypeLU] = useState([]);
  const [selectedCallType,setSelectedCallType] = useState("");
  const [selectedSubType,setSelectedSubType] = useState(null);
  const [selectedCaseType,setSelectedCaseType] = useState(null);
  const [subTypeLU,setSubTypeLU] = useState([]);
  const [masterData,setMasterData] = useState([]);
  //const [selectionType, setSelectionType] = useState('checkbox');
  const [countData,setCountData] = useState({});
  const [caseStatusLU,setCaseStatusLU] = useState([]);
  const [clientIDLU,setClientIDLU] = useState([]);
  const [usersListLU,setUsersListLU] = useState([]);
  const [selectionList,setSelectionList] = useState([]);
  const [selectedUserName,setSelectedUserName] = useState(null);
  const [userAssigned,setUserAssigned] = useState(false);
  const [tableKey, setTableKey] = useState(0); // Key to force remount
  const options = [
    {value: "chetan",label:"Chetan N"},
    {value: "john",label:"John"},
    {value: "vishnu",label:"Vishnu"},
  ]
  const defaultColumns = [
    {
      title: "Service Request No",
      dataIndex: "srvReqRefNo",
      key: 'srvReqRefNo',
    },
    {
      title: "Policy Number",
      dataIndex: "policyNo",
      key: 'policyNo',
      // showSorterTooltip: false,
      // sorter: {
      //   compare: (a, b) => a.policyNo - b.policyNo,
      // },
    },
    {
      title: "PO Name",
      dataIndex: "pO_Name",
      key: 'pO_Name',
    },
    {
      title: "LA Name",
      dataIndex: "lA_Name",
      key: 'lA_Name',
    },
    {
      title: "Call Type",
      dataIndex: "callType",
      key: 'callType',
    },
    {
      title: "Sub Type",
      dataIndex: "subType",
      key: 'subType',
    },
    {
      title: "Case Status",
      dataIndex: "currentStatus",
      key: 'currentStatus',
    },
    {
      title: "Payout Value",
      dataIndex: "payout_value",
      key: 'payout_value',
    },
    {
      title: "Client ID Type",
      dataIndex: "client_ID_Type",
      key: 'client_ID_Type',
    },
    
    {
      title: "Assign To",
      dataIndex: "userId",
      editable: true,
    //   render: (text, record) => (
    //     <Select
    //  // mode="multiple"
    //   allowClear
    //   style={{ width: "100%" }}
    //   placeholder="Please select"
    //   onChange={(item)=>handleChange(item,record)}
    // >
    //    {usersListLU?.map((users, idx) => (
    //                 <Option key={idx} value={users?.userId}>
    //                   {users?.userName}
    //                 </Option>
    //               ))}
    //               </Select>
    //   ),
    },
//     {
//       title: "Action",
//       dataIndex: "action",
//       render: (_, record) => (
//         <Space size="middle">

// <a className="editIcon"> <i  onClick={() => saveAssignTo(record)} className="bi bi-send"></i></a>

//          {/* <Button
//                         type="primary"
//                         className="primary-btn panvalidate-btn"
//                         onClick={() => handleAction(record.serviceNo)}
//                       >
//                         View
//                       </Button> */}
//         </Space>
//       ),
//     },
   
  ];
  const columns = defaultColumns?.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        //handleSave,
      }),
    };
  });
  const tableData = [
    {key: 0,srno:1, serviceNo: "DDMMYYYXXXX01", policyNo: "00110825", poName: "", laName: "",callType:"Contact Details Update",subType:"Mobile Number Update",caseStatus:"Resolved",payoutVlaue:"",clientIdType:"Corporate",assignTo:"Chetan"},
    {key: 1,srno:2,  serviceNo: "DDMMYYYXXXX02",policyNo: "00110826", poName: "", laName: "", callType:"Payment Related",subType:"Payment Link",caseStatus:"New Request",payoutVlaue:"",clientIdType:"Individual",assignTo:""},
    {key: 2,srno:3, serviceNo: "DDMMYYYXXXX03", policyNo: "00110827", poName: "", laName: "", callType:"Bank Details",subType:"Updation",caseStatus:"Pending",payoutVlaue:"",clientIdType:"Individual",assignTo:""},
    {key: 3,srno:4,  serviceNo: "DDMMYYYXXXX04",policyNo: "00110828", poName: "", laName: "", callType:"",subType:"",caseStatus:"",payoutVlaue:"",clientIdType:"",assignTo:""},
    {key: 4,srno:5,  serviceNo: "DDMMYYYXXXX05",policyNo: "00110829", poName: "", laName: "",callType:"",subType:"",caseStatus:"",payoutVlaue:"",clientIdType:"",assignTo:""},
  ]

  const shouldLog = useRef(true);
  useEffect(() => {
    if(shouldLog.current||userAssigned){
      shouldLog.current = false;
      getCTST();
      getAdminData();
      getGridData();
    }
  }, [userAssigned]); //eslint-disable-line react-hooks/exhaustive-deps

  // rowSelection object indicates the need for row selection
// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//   setSelectionList(selectedRows);
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
// };
const selectionType = {
  onChange: (selectedRowKeys, selectedRows) => {
    setSelectionList(selectedRows);
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

  const getCTST=() => {
    setIsLoading(true);
    let obj =
    {
      "MasterRequest": [
          "CALL_TYP","SUB_TYP","CASE_STATUS","CLIENTIDTYPE"
      ]
  }
    let CTST = apiCalls.ctst(obj);
    CTST.then((val)=>{
      setMasterData(val.data);
      let data = val.data?.filter((ele) => ele.key === "CALL_TYP");
      let transformedData = data[0]?.value.filter((ele)=> ele.mstID === 24).map((item) => ({
        ...item,
        label: item.mstDesc,
        value: item.mstID
      }));
      let caseStatus = val.data?.filter((ele) => ele.key === "CASE_STATUS");
      let caseStatusData = caseStatus[0]?.value.map((item) => ({
        ...item,
        label: item.mstDesc,
        value: item.mstID
      }));
      let clientIDs = val.data?.filter((ele) => ele.key === "CLIENTIDTYPE");
      let clientIDData = clientIDs[0]?.value.map((item) => ({
        ...item,
        label: item.mstDesc,
        value: item.mstID
      }));
      setCallTypeLU(transformedData);
      setCaseStatusLU(caseStatusData);
      setClientIDLU(clientIDData);
     // setIsLoading(false);
    }).catch((err)=>{
     // setIsLoading(false);
      message.destroy()
      message.error({
        content: err?.data?.responseBody?.errormessage,
        className: "custom-msg",
        duration: 2,
      });
    })

  }

  // const getUserdData = async () => {
  //   setIsLoading(true);
  //   let response = apiCalls.GetPOSExecRoles();
  //   response
  //     .then((val) => {
  //       if (val?.data) {
  //         setUsersListLU(val?.data);
  //       } else {
  //         message.destroy();
  //         message.error({
  //           content:
  //             val?.data?.responseHeader?.message ||
  //             "Something went wrong please try again!",
  //           className: "custom-msg",
  //           duration: 2,
  //         });
  //       }
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //     });
  // };

  const handleCallTypeChange = (value) => {
    setSelectedCallType(value);
    setSubTypeLU([]);
    setSelectedSubType(null);
    subTypeDropdown(value);
    form.setFieldsValue({subType: null})
    getGridData(value,null,selectedCaseType);
  };

  const subTypeDropdown =async (value)=>{
    let SUB_TYP = masterData?.filter((ele) => ele.key === "SUB_TYP");
    let data = SUB_TYP[0]?.value?.filter((ele) => ele?.mstParentID === value);
    let transformedData = data?.map((item) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID
    }));
    setSubTypeLU(transformedData);
  }

  const handleSubTypeChange = (e)=>{
    setSelectedSubType(e)
    getGridData(selectedCallType,e,selectedCaseType);
  }
  const handleCaseStatusChange =(e)=>{
    setSelectedCaseType(e);
    getGridData(selectedCallType,selectedSubType,e);
  }

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  const handleUserNameChange = (e)=>{
    setSelectedUserName(e);
  }
 
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const getAdminData = async () => {
      //setIsLoading(true);
      let response = apiCalls.GetSerReqStatus(13);
      response
        .then((val) => {
          if (val?.data) {
            setCountData(val?.data?.serReqStatus);
            if(val?.data?.posAdminRoles?.length>0){
              setUsersListLU(val?.data?.posAdminRoles);
            }
          } else {
            message.destroy();
            message.error({
              content:
                val?.data?.responseHeader?.message ||
                "Something went wrong please try again!",
              className: "custom-msg",
              duration: 2,
            });
          }
         // setIsLoading(false);
        })
        .catch((err) => {
          //setIsLoading(false);
        });
    };

    const getGridData = async (callType,subType,caseStatus) => {
      setIsLoading(true);
      let response = apiCalls.GetSerReqByFilters(callType,subType,caseStatus);
      response
        .then((val) => {
          if (val?.data) {
            const newData = val.data?.map((item, i) => ({
              ...item, // Spread the existing properties of the item
              key: i,  // Add a new property 'key' with the index value
            }));
            setData(newData);
          } else {
            message.destroy();
            message.error({
              content:
                val?.data?.responseHeader?.message ||
                "Something went wrong please try again!",
              className: "custom-msg",
              duration: 2,
            });
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    };


    const saveAssignTo = async () => {
      if(selectionList?.length === 0){
        message.destroy();
        message.warning("Please select atleast one record");
        return;
      }
      else if(!selectedUserName){
        message.destroy();
        message.warning("Please select user name");
        return;
      }
      let obj = {
          "SrvReqID": null,
          "UsrID": null,
          "RoleID": 0,
          "AllocatedOn": new Date(),
          "ClosedOn": null,
          "BranchID": null,
          "ReqSignedOn": null
        }
          let mappedObjects = selectionList.map((item, i) => ({
            ...obj, 
            "SrvReqID": item.srvReqID,
            "UsrID": selectedUserName,
            "ReqSignedOn": new Date(),
          }));
          setIsLoading(true);
      let response = apiCalls.saveAssignToPOS(mappedObjects);
      response
        .then((val) => {
          if (val?.data) {
            setUserAssigned(true);
          // window.location.reload();
        // After successful save, clear the selected rows
      setSelectionList([]);

      // Force remount of the Table component to clear the selection
      setTableKey((prevKey) => prevKey + 1);
          getCTST();
          getAdminData();
          getGridData();
           message.success("Users Assigned Successfully");
          } else {
            message.destroy();
            message.error({
              content:
                val?.data ||
                "Something went wrong please try again!",
              className: "custom-msg",
              duration: 3,
            });
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    };


  return (
    <>
      <div className='w-94'>
      <Spin spinning={isLoading}>
      {/* <Row gutter={[16,16]} className='admin-cards'>
        <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
          <Card className="resolved-card" bordered={false}>
            <p className="resolved-text">Resolved</p>
            <div>{countData?.resloved || 0}</div>
          </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
          <Card className="escalated-card" bordered={false}>
            <p className="resolved-text">Escalated</p>
            <div>{countData?.escalated || 0}</div>
          </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
          <Card className='pending-card' bordered={false}>
            <p className="resolved-text">Pending</p>
            <div>{countData?.pending || 0}</div>
          </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
          <Card className="newrequest-card" bordered={false}>
            <p className="resolved-text">New Request</p>
            <div>{countData?.new_Request || 0}</div>
          </Card>
          </Col>
        </Row> */}
        <Form
          form={form}
          name="wrap"
          labelCol={{
            flex: "35%",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          //onFinish={handleSubmit}
          autoComplete="off"
        >
          <Row gutter={[16,16]} className='dashboard-filters'>
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
              <Form.Item
                label="Call Type"
                name="callType"
                className="input-label mb-0"
              >
                <Select
                  showSearch
                  placeholder="Select a Call Type"
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={callTypeLU}
                  onChange={(e) => handleCallTypeChange(e)}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
              <Form.Item
                label="Sub Type"
                name="subType"
                className="input-label mb-0"
              >
                <Select
                  showSearch
                  placeholder="Select a Sub Type"
                  optionFilterProp="children"
                  onChange={(e) => handleSubTypeChange(e)}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={subTypeLU}
                />
              </Form.Item>
            </Col>
            {/* <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
              <Form.Item
                label="Case Status"
                name="caseStatus"
                className="input-label mb-0"
              >
                <Select
                  showSearch
                  placeholder="Select a Case Status"
                  optionFilterProp="children"
                  onChange={(e) => handleCaseStatusChange(e)}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={caseStatusLU}
          
                />
              </Form.Item>
            </Col> */}
            {/* <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
              <Form.Item
                label="Payout Value"
                name="payoutValue"
                className="input-label mb-0"
              >
                <Select
                  showSearch
                  placeholder="Select a Payout Value"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={[
                    {
                      value: "jack",
                      label: "> 0 <=3 lakhs",
                    },
                    {
                      value: "lucy",
                      label: "> 3 - <= 5 lakh",
                    },
                    {
                      value: "tom",
                      label: "> 5 - <=10 laksh",
                    },
                    {
                      value: "tom",
                      label: "> 10 lakhs",
                    },
                  ]}
                />
              </Form.Item>
            </Col> */}
            {/* <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
              <Form.Item
                label="Client ID Type"
                name="clientIdType"
                className="input-label mb-0"
              >
                <Select
                  showSearch
                  placeholder="Select a Client ID Type"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={clientIDLU}
           
                />
              </Form.Item>
            </Col> */}
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
              <Form.Item
                label="User Name"
                name="userName"
                className="input-label mb-0"
              >
                <Select
                  showSearch
                  placeholder="Select a User Name"
                  optionFilterProp="children"
                  onChange={(e)=>handleUserNameChange(e)}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  style={{ width: '100%' }}  // Set width to 100%
                >
                   {usersListLU?.map((users, idx) => (
                    <Option key={idx} value={users?.usrID}>
                      {users?.userName}
                    </Option>
                  ))}
                  </Select>
              </Form.Item>
    
            </Col>
            <Col xs={12} sm={12} md={1} lg={1} xxl={1}>
            <span className='assignto-icon'>
              <span className="editIcon c-pointer"> <i  onClick={() => saveAssignTo()} className="bi bi-send"></i></span>
              </span>
            </Col>
          </Row>
        </Form>
      
      <div className="main-start">
        <div className="w-94">
          <div className="table-container dashboard">
          <Table
           key={tableKey}
             rowSelection={{
              type: 'checkbox',
              ...selectionType,
            }}
          rowKey={(record) => record.key}
          hideSelectAll={false}
        columns={columns}
        dataSource={data}
        rowClassName={() => 'editable-row'}
        //bordered={true}
       // x={true}
        pagination={{
          //pageSizeOptions: ["5", "10", "15", "15"],
          pageSize: 5,
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
      </div>
    </>
  );
}

export default ComplaintsDashboard
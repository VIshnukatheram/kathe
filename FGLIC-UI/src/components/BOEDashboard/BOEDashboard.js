import React, { useEffect, useState } from "react";
import {  Spin, message,Row,Col,Form,DatePicker, Button,Input,Table, Space } from "antd";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from 'react-redux';

const BOEDashboard = (props) => {
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const { sharedData } = useData();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const dateFormat = "DD/MM/YYYY";
  const [record,setRecord] = useState();
  const [tableKey, setTableKey] = useState(0); // Key to force remount
  const [selectionList,setSelectionList] = useState([]);
  const [showTotalPages,setShowTotalpages] = useState(null);

  const defaultColumns = [
    {
      title: "ACTION",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
<a className="editIcon"> <i  onClick={() => handleAction(record)} className="bi bi-pencil-square"></i></a>
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
      title: "Call Type",
      dataIndex: "callTypeName",
      key: 'callTypeName',
    },
    {
      title: "Sub Type",
      dataIndex: "subTypeName",
      key: 'subTypeName',
    },
    {
      title: "Status",
      dataIndex: "status",
      key: 'status',
    },
    {
      title: "Mode",
      dataIndex: "",
      key: '',
    },
    {
      title: "Customer Name",
      dataIndex: "proposerName",
      key: 'proposerName',
    },
    {
      title: "Ageing",
      dataIndex: "payout_value",
      key: 'payout_value',
    },
    {
      title: "Logged by",
      dataIndex: "client_ID_Type",
      key: 'client_ID_Type',
    }
    
   
   
  ];

  
  useEffect(() => {
      getBoeData();
  }, [sharedData]);

  const handleDateChange =()=>{

  }

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

  const getBoeData =  async () => {
    setIsLoading(true);
    let obj = {userId:'boeadmin',role:1 };
    let response = apiCalls.getPOSData(obj);
    response.then((val)=>{
      if(val?.data){
        setData(val?.data);
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
  // const getPOSIndividualData=async()=>{
  //   //debugger;
  //   setIsLoading(true);
  //   const  val = await apiCalls.getPOSIndividualData();
  //   console.log(val)
  
  // }
  const handlePolicyLink = (item) => {
    let sentObj = {};
    sentObj.emailId = item?.emailID;
    sentObj.mobileNo = item?.mobileNo;
    sentObj.dob = item?.dob;
    props?.updateSentDetails(item);
    navigate("/policydetails", { state: item });
  };
  const handleAction=async(item)=>{
    setIsLoading(true);
    const  val = await apiCalls.getPOSIndividualData(item?.serviceNo);

    var obj ={
      applicationNo: item?.applicationNo,
      callTypeName : item?.callTypeName,
      subTypeName : item?.subTypeName,
      dob: item?.dob,
      policyNo: item?.policyNo,
      source: item?.source,
      tagName: item?.transectionData,
      isBOE:true,
      serialNo: item.serviceNo
    }
    if(val?.data?.srvReqRefNo){
      //debugger;
      setIsLoading(false);
     // setData(val?.data?.responseBody);
      navigate("/policydetails", { state: obj });
    }
    else{
      setIsLoading(false);
      message.destroy()
      message.error({
        content: val?.item?.responseBody?.errormessage || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
   
   // navigate(/emailmanagementview/${item?.emailResponseId}, { state: item });
  }
 
  // const selectionType = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     setSelectionList(selectedRows);
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  // };

  const renderTableData = () => {
    return data?.map((value, index) => {
      const formattedDate = moment.utc(value.date).local().format("DD/MM/YYYY hh:mm A");
      const rejectStatus = value.status === "CLOSED" ? "Closed with Requirements" : "PENDING";
      const {
        serviceNo,
        date,
        policyNo,
        applicationNo,
        callTypeName,
        subTypeName,
        poName,
        laName,
        policyStatus,
        proposerName,
        sumAssured,
        premiumAmt,
        agentName,
        pinCode,
        pan,
        mobileNo,
        role,
        caseType,
      } = value; 
      console.log(value.status)//destructuring
      return (
        <>
          <tr key={index}>
            <td><a className="editIcon"> <i  onClick={() => handleAction(value)} className="bi bi-pencil-square"></i></a></td>
            <td>{serviceNo}</td>
            <td>{formattedDate}</td>
            <td>{policyNo}</td>
            <td>{callTypeName}</td>
            <td>{subTypeName}</td>
            <td>{rejectStatus}</td>
            <td></td>
            <td>{proposerName}</td>
            <td>
              {sumAssured && (
                <NumberFormat
                  value={sumAssured}
                  decimalSeparator="."
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={8}
                />
              )}
            </td>
            <td>
              {premiumAmt && (
                <NumberFormat
                  value={premiumAmt}
                  decimalSeparator="."
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={8}
                />
              )}
            </td>
            <td>{agentName}</td>
            <td>{pinCode}</td>
            <td>{pan}</td>
          </tr>
        </>
      );
    });
  };

  const handleMovetoSearch =()=>{
    navigate("/advancesearch")
  }
  return (
    <>
      <div className="main-start">
        <div className="w-94">
          <div className="d-flex justify-content align-center">
          <h6 className="advance-title">BOE Dashboard</h6>
            <p>
            <Button
                  type="primary"
                  className="primary-btn"
                  onClick={()=>handleMovetoSearch()}
                >
                  Move to Search Screen
                </Button>{" "}
            </p>
          </div>
        <Row gutter={[24]} className="mb-16">
        <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
      <div className="count-box">
      <div className="count count-color">{125}</div>
        <div className="quotes">Total Logged Cases</div>
      </div>
    </Col>
            <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
            <div className="count-box">
            <div className="count count-color1">{25}</div>
        <div className="quotes">Open</div>
    </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
            <div className="count-box">
            <div className="count count-color2">{13}</div>
        <div className="quotes">Assigned to Me</div>
    </div>
            </Col>
             <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
            <div className="count-box">
            <div className="count count-color3">{235}</div>
        <div className="quotes">Closed</div>
    </div>
            </Col>
          </Row>


          <Row gutter={[16, 16]} className="mb-16">
        <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
        <div>
                <Form.Item
                  label={
                    <span>
                     From Date
                      <sup>*</sup>
                    </span>
                  }
                  name="FormDate"
                  className="inputs-label mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Select a From Date",
                    },
                  ]}
                >
                  <DatePicker
                    allowClear={false}
                    style={{ width: "100%" }}
                    className="cust-input"
                    format={dateFormat}
                    onChange={(e) => handleDateChange(e)}
                  />
                </Form.Item>
              </div>
    </Col>
            <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
            <div>
                <Form.Item
                  label={
                    <span>
                     To Date
                      <sup>*</sup>
                    </span>
                  }
                  name="ToDate"
                  className="inputs-label mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Select a To Date",
                    },
                  ]}
                >
                  <DatePicker
                    allowClear={false}
                    style={{ width: "100%" }}
                    className="cust-input"
                    format={dateFormat}
                    onChange={(e) => handleDateChange(e)}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
           
            <Form.Item
    name="policyno"
    label="Policy No"
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Enter Policy No",
      },
    ]}
  >
    <Input
      placeholder="Enter Policy No"
      className="cust-input"
      maxLength={100}
    />
  </Form.Item>
            </Col>
             <Col xs={12} sm={12} md={6} lg={6} xxl={6} className="mt-30">
           <div>
           <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                >
                  Search
                </Button>{" "}
           </div>
            </Col>
          </Row>
          <div className="advance-page mt-20">
            {/* <div>
              <h6 className="advance-title">Latest Details / Search Results</h6>
            </div> */}
           <div className="main-start">
        <div className="w-94">
          <div className="table-container dashboard">
          <Table
          //  key={tableKey}
          //    rowSelection={{
          //     ...selectionType,
          //   }}
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
          </div>
        </div>
      </div>
      <Spin spinning={isLoading} fullscreen />
    </>
  );
};

const mapStateToProps = ({ policyDetails }) => {
  return { policyDetails };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateSentDetails: (info) => {
      dispatch(sentDetailsObj(info));
    },
    dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BOEDashboard);
import React, { useEffect, useState } from "react";
import { Checkbox, Spin, message,Row,Col,Form,DatePicker, Button,Input } from "antd";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from 'react-redux';

const PAUserDashboard = (props) => {
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const { sharedData } = useData();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const dateFormat = "DD/MM/YYYY";
  const [record,setRecord] = useState();
  
  useEffect(() => {
      getBoeData();
  }, [sharedData]);

  const handleDateChange =()=>{

  }

  const getBoeData =  async () => {
    setIsLoading(true);
    let obj = {userId:'pauser1',role:15 };
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
      isPOS:true,
      serialNo: item.serviceNo
    }
    if(val?.data?.srvReqRefNo){
      setIsLoading(false);
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

  const renderTableData = () => {
    return data?.map((value, index) => {
      const formattedDate = moment.utc(value.date).local().format("DD/MM/YYYY hh:mm A");
      const {
        serviceNo,
        date,
        policyNo,
        applicationNo,
        callTypeName,
        subTypeName,
        status,
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
      } = value; //destructuring
      return (
        <>
          <tr key={index}>
            <td>{value?.callTypeName !== "Cheque Representation" ?<a className="editIcon"> <i  onClick={() => handleAction(value)} className="bi bi-pencil-square"></i></a>:""}</td>
            <td>{serviceNo}</td>
            <td>{formattedDate}</td>
            <td>{policyNo}</td>
            <td>{callTypeName}</td>
            <td>{subTypeName}</td>
            <td>{status}</td>
            <td>{}</td>
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
            {/* <td>{agentName}</td> */}
            {/* <td>{pinCode}</td> */}
            {/* <td>{pan}</td> */}
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
          <h6 className="advance-title">Payment Assistance Dashboard</h6>
            {/* <p>
            <Button
                  type="primary"
                  className="primary-btn"
                  onClick={()=>handleMovetoSearch()}
                >
                  Move to Search Screen
                </Button>{" "}
            </p> */}
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
            <div>
             
                <div className="table-container">
                  <table
                    className="responsive-table"
                    style={{ border: "1px solid #ddd" }}
                  >
                    <tbody>
                      <tr>
                        <th>Actions</th>
                        <th>Ticket No</th>
                        <th>Call Log Date</th>
                        <th>Policy No</th>
                        <th>Call Type</th>
                        <th>Sub Type</th>
                        <th>Status</th>
                        <th>Mode</th>
                        <th>Customer Name</th>
                        <th>Ageing</th>
                        <th>Logged By</th>
                      </tr>
                      {renderTableData()}
                      {data?.length === 0 && (
                        <tr>
                          <td colSpan="11">
                            <div className="text-center">
                              <span>No data avalable</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
)(PAUserDashboard);
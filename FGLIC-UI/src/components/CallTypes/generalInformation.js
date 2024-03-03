import React, { useState, useEffect, useRef } from "react";
import { GeneralInformationData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import apiCalls from "../../api/apiCalls";
import BellIcon from "../../assets/images/bell-concierge.png";
import {
  Button,
  Form,
  Spin,
  Tooltip,
  Checkbox,
  message,
  Row,
  Col,
} from "antd";
import moment from "moment";
import PopupAlert from "../popupAlert";
import ContactForm from "../../utils/ContactForm";
import { useSelector } from "react-redux";
import RaiseRequirementPopup from '../RaiseRequirementPopup';


const GeneralInformation = (props) => {
  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  const { selectedSubType, customerData, details } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [linksData, setLinksData] = useState(false);
  const [isGrievanceChecked,setIsGrievanceChecked] = useState(false);
  const [isMobileAppIOSChecked, setIsMobileAppIOSChecked] = useState(false);
  const [isMobileAppAndroidChecked, setIsMobileAppAndroidChecked] = useState(false);
  const [isCustomerPortalChecked,setIsCustomerPortalChecked] = useState(false);
  const [isMapMarkerChecked,setIsMapMarkerChecked] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const shouldLog = useRef(true);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);

  useEffect(()=>{
    form?.setFieldsValue({
      CareID: "care@futuregenerali.in",
      TollFreeNumber: "1800 102 2355",
      WhatsAppNumber: "8108198633",
      'mobileNo': customerData?.mobileNo,
      'whatsAppNo':  customerData?.mobileNo,
      'emailId': customerData?.emailID
    })
    if(shouldLog.current){
      shouldLog.current = false;
    getMasterLinks();
    }
  },[])

  const toggleInputField = (field) => {
    setShowEmailFields(true);
    switch (field) {
      case 'phone':
        setShowPhoneNumber(!showPhoneNumber);
        break;
      case 'email':
        setShowEmailAddress(!showEmailAddress);
        break;
      case 'whatsapp':
        setShowWhatsApp(!showWhatsApp);
        break;
      default:
        break;
    }
  };

  const getMasterLinks=async() => {
    setIsLoading(true);
    let obj =
    {
      "MasterRequest": [
          "CUST_PORTAL","GRIEVANCE_PROC_LNK","MOBILE_APP_ANDROID","MOBILE_APP_IOS"
      ]
  }
    let response = await apiCalls.ctst(obj);
    if(response?.data) {
      setLinksData(response.data);
      console.log(response.data);
      setIsLoading(false);
    }
    else {
      setIsLoading(false);
        message.destroy()
        message.error({
          content: response?.data?.responseBody?.errormessage || "Smoething went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
    }
  }
  const handleTextLink=(item)=>{
     if(item?.linkValue?.toLowerCase() === "view"){
      const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
      window.open(url, '_blank');
    }
  }
  // const handleCheckboxChange = (e, value) => {   //handle check box code
  //   let getValues = form.getFieldsValue();
  //   console.log(getValues);
  //   const fieldMappings = {
  //     1: { field: 'EMandGR', index: 1 },
  //     2: { field: 'MobileAppIOS', index: 3 },
  //     3: { field: 'MobileAppAndroid', index: 2 },
  //     4: { field: 'CustomerPortalLink', index: 0 },
  //     5: { field: 'MapMarker', index: 4, fallback: 'https://life.futuregenerali.in/branch-locator/' },
  //   };
  //   const { field, index, fallback } = fieldMappings[value];
  //   if (e.target.checked) {
  //     const fieldValue = linksData[index]?.value[0]?.mstDesc || fallback;
  //     form.setFieldsValue({ [field]: fieldValue });
  //   }else {
  //     form.setFieldsValue({ [field]: null });
  //   }
  // };

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const getTransactionData = (values) => {
    if (selectedSubType === "touchpointinformation") {
      return [
        { Status: "Create", TagName: "CareID", TagValue: values.CareID },
        { Status: "Create", TagName: "TollFreeNumber", TagValue: values.TollFreeNumber },
        // { Status: "Create", TagName: "NearestBranch", TagValue: values.NearestBranch },
        // { Status: "Create", TagName: "Address", TagValue: values.Address },
        { Status: "Create", TagName: "WhatsAppNumber", TagValue: values.WhatsAppNumber },
        { Status: "Create", TagName: "MobileAppAndroid", TagValue: isMobileAppAndroidChecked ? linksData[2]?.value[0]?.mstDesc : null},
        { Status: "Create", TagName: "MobileAppIOS", TagValue: isMobileAppIOSChecked ? linksData[3]?.value[0]?.mstDesc : null },
        { Status: "Create", TagName: "MapMarker", TagValue: isMapMarkerChecked ? 'https://life.futuregenerali.in/branch-locator/' : null },
        { Status: "Create", TagName: "CustomerPortalLink", TagValue: isCustomerPortalChecked ? linksData[0]?.value[0]?.mstDesc : null },
        { Status: "Create", TagName: "EMandGR", TagValue: isGrievanceChecked ? linksData[1]?.value[0]?.mstDesc : null },
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "TOUCHPOINT"
      },
      ];
    } else if(selectedSubType === "others") {
      return [
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
      ];
    }
      };
  const handleSubmit = (values)=>{
   if(selectedSubType==="touchpointinformation"&&!values?.MobileAppAndroid&&!values?.MobileAppIOS&&!values?.MapMarker&&
   !values?.CustomerPortalLink&&!values?.EMandGR){
    message.destroy();
    message.warning("Please select atleast one checkbox");
    return;
   }
   setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values.requestchannel, // Required
      Category: 1,
      ApplicationNo:
      details?.policyDetails?.policyDetailsObj?.identifiers?.applicationNo || customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetails?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: 456,
      "CustRole":values.custRole,
      policyStatus:
      details?.policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus,
      proposerName: details?.policyDetails?.policyDetailsObj?.identifiers?.po_Name,
      plan: details?.policyDetails?.policyDetailsObj?.planAndStatus?.planName,
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.name,
      ModifiedOn: new Date(),
      ModifiedByRef: "Test123",
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime: new Date(),
      CurrentStatus: 3,
      ReasonDelayed: values.resonfordelay,
      CustSignDateTime: values?.customersigningdate
      ? new Date(values?.customersigningdate)
      : new Date(),
      "TransactionData": getTransactionData(values),
      "Uploads": [
        
      ],
     CommunicationRequest: [
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 2,
          ReceipientTo: "fgtesting8@gmail.com",
          ReceipientCC: "fgtesting8@gmail.com",
          MobileNos: "",
          ScheduledTime: new Date(),
          CommBody: "",
          Attachments: null,
        },
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 1,
          ReceipientTo: "",
          ReceipientCC: "",
          MobileNos: 9892686867,
          ScheduledTime: new Date(),
          CommBody: "",
          Attachments: null,
        },
      ],
  }
  if(raiseRequirementOpen){
    let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
    obj.TransactionData.push({
      "Status": "Create",
      "TagName": "ReasonList_Key",
      "TagValue":  JSON.stringify(ids)
    })
      }
    let response = apiCalls.genericAPI(obj);
    response
      .then((val) => {
        if (val?.data) {
            setAlertTitle("Request Created Successfully");
            let successMessage = val?.data?.tat > 0 ? 
            `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat||0} days`
            : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
            setAlertData(successMessage);
            setNavigateTo("/advancesearch");
            setShowAlert(true);
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
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
  }

  const getRaiseRequirements = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: props?.selectedSubTypeId,
      Role:loginInfo?.userProfileInfo?.profileObj?.role==="boeadmin" ? 1:0
    };
    let response = apiCalls.getRaiseRequirements(obj);
    response
      .then((val) => {
        if (val?.data) {
          setRaiseRequerimentList(val?.data);
          setRequirementLoader(false);
        } else {
          setRequirementLoader(false);
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        setRequirementLoader(false);
      });
  };

 
  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    if(raiseRequirementOpen){
    handleSubmit(formData);
    }
  };

  const popupClose=()=>{
    setRaiseRequirementOpen(false)
  }
  return (
    <>
      <Spin spinning={isLoading}>
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
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <DetailsForm
            data={GeneralInformationData[selectedSubType]?.BOE_Details}
            subType={selectedSubType}
            handleTextLink={handleTextLink}
            linksData={linksData}
            toggleInputField={toggleInputField}
            showEmailAddress={showEmailAddress}
            showPhoneNumber={showPhoneNumber}
            showWhatsApp={showWhatsApp}
          ></DetailsForm>
           {showEmailFields&& selectedSubType==="touchpointinformation"&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
      
          {selectedSubType ==="touchpointinformation"&&<>
          <Row gutter={[16, 16]} className="reasons-list">
          <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <div className="touchpointinfo-icons">
              <Form.Item
                  label=""
                  name="EMandGR"
                  className="inputs-label mb-0"
                  valuePropName="checked"
                >
                   <span className="iconcheckbox-gap"> 
                   <Checkbox onChange={(e) => setIsGrievanceChecked(e.target.checked)} className="green-checkbox"/>
                   <Tooltip title="Escalation Mechanism and Grievance Redressal">
            <img
              src={BellIcon}
              alt=""
              className="bell-concierge"
              onClick={() => window.open(
                linksData[1]?.value[0]?.mstDesc ||
                "https://life.futuregenerali.in/customer-service/grievance-redressal-procedure/"
              )}
            ></img>
          </Tooltip>
          </span>
          </Form.Item>
          <Form.Item
                  label=""
                  name="MobileAppIOS"
                  className="inputs-label mb-0"
                  valuePropName="checked"
                >
     
                 <span className="iconcheckbox-gap"> 
                 <Checkbox onChange={(e) => setIsMobileAppIOSChecked(e.target.checked)} className="green-checkbox"/>
                 <Tooltip title="Apple App Download Link">
                  <i
                        className={`bi bi-apple fs-26`}
                        onClick={()=>window.open(linksData[3]?.value[0]?.mstDesc ||"https://play.google.com/store/apps/details?id=com.fgli&hl=en_IN&gl=US&pli=1")}
                  >   </i>
               
                  </Tooltip>
                
                  </span>
                  </Form.Item>
                  <Form.Item
                  label=""
                  name="MobileAppAndroid"
                  className="inputs-label mb-0"
                  valuePropName="checked"
                >
                  <span className="iconcheckbox-gap"> 
                  <Checkbox className="green-checkbox" onChange={(e) => setIsMobileAppAndroidChecked(e.target.checked)} />
                     <Tooltip title="Android App Download Link">
                  <i
                    className={`bi bi-android2 fs-26`}
                    onClick={()=>window.open(linksData[2]?.value[0]?.mstDesc ||"https://play.google.com/store/apps/details?id=com.fgli&hl=en_IN&gl=US&pli=1")}
                  ></i>
                  </Tooltip>
                  </span>
                  </Form.Item>
                  <Form.Item
                  label=""
                  name="CustomerPortalLink"
                  className="inputs-label mb-0"
                  valuePropName="checked"
                >

              <span className="iconcheckbox-gap"> 
                  <Checkbox className="green-checkbox" onChange={(e) => setIsCustomerPortalChecked(e.target.checked)} />
                     <Tooltip title="Customer Portal Link">
                      <i
                         className={`bi bi-globe2 fs-26`}
                         onClick={()=>window.open(linksData[0]?.value[0]?.mstDesc ||"https://customer.life.futuregenerali.in/WebAppln/Pages/Common/Login.aspx")}
                      ></i>
                      </Tooltip>
                      </span>
                      </Form.Item>
                      <Form.Item
                  label=""
                  name="MapMarker"
                  className="inputs-label mb-0"
                  valuePropName="checked"
                >

                      <span className="iconcheckbox-gap"> 
                      <Checkbox className="green-checkbox" onChange={(e) => setIsMapMarkerChecked(e.target.checked)} />
                      <Tooltip title="Map Marker">
                      <i
                         className={`bi bi-geo-alt-fill fs-26`}
                         onClick={()=>window.open(linksData[4]?.value[0]?.mstDesc ||"https://life.futuregenerali.in/branch-locator/")}
                      ></i>
                      </Tooltip>
                      </span>
                     
                {/* </span> */}
                  </Form.Item>
              </div>
            </Col>
          </Row>
          </>}
          {/* <DetailsForm
            data={Data[selectedSubType]?.Comments}
            subType={selectedSubType}
          ></DetailsForm> */}
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                >
                  Submit
                </Button>{" "}
                {
                  loginInfo?.userProfileInfo?.profileObj?.role==="boeadmin" &&
                  <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                }
              </div>
        </Form>
      </Spin>
      {showAlert && (
        <PopupAlert
        getAdvance={props?.getAdvance}
          alertData={alertData}
          title={alertTitle}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
      <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose}/>

    </>
  );
};
export default GeneralInformation;
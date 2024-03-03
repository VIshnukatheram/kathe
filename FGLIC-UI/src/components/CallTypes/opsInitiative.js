import React, { useState, useEffect, useRef } from "react";
import { OPSInitiativeData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import {
  Button,
  Form,
  Spin,
  Alert,
  Modal,
  Tooltip,
  Checkbox,
  message,
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import ContactForm from "../../utils/ContactForm";
import { connect,useSelector } from "react-redux";
import RaiseRequirementPopup from '../RaiseRequirementPopup';


const OPSInitiative = (props) => {
  const loginInfo = useSelector(state => state);

  const [form] = Form.useForm();
  const { selectedCallType, selectedSubType, customerData,details,setSelectedSubType,ProductRelatedForm,ProductRelatedPortalLU } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isShowConditionalFields,setIsShowCOnditionalFields] = useState(false);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
const [activeMobileIcons, setActiveMobileIcons] = useState([]);
const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
const [showPhoneNumber, setShowPhoneNumber] = useState(false);
const [showEmailAddress, setShowEmailAddress] = useState(false);
const [showWhatsApp, setShowWhatsApp] = useState(false);
const [showEmailFields,setShowEmailFields] = useState(false);
const [isMobileNo, setIsMobileNo] = useState(null);
const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
const [requirementModalLoader, setRequirementLoader] = useState(false);
const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
useEffect(()=>{
  hideCommunications();
  getClientEnquiry();
},[selectedSubType])

const hideCommunications=()=>{
  setActiveEmailIcons([]);
  setActiveMobileIcons([]);
  setActiveWhatsAppIcons([]);
  setShowPhoneNumber(false);
  setShowEmailAddress(false);
  setShowWhatsApp(false);
}

const getClientEnquiry = ()=>{
  setIsLoading(true);
      let obj = {
        clientNumber:  customerData?.poClientID
  };
  let response = apiCalls.getClientEnquiry(obj);
  response
    .then((val) => {
      if (val?.data) {
        //setClientEnquiryData(val?.data?.responseBody);
        const res = val?.data?.responseBody;
        setIsMobileNo(res?.rmblphone)
      form.setFieldsValue({
        'mobileNo': res?.rmblphone,
        'whatsAppNo':  res?.rmblphone,
        'emailId': res?.rinternet
      });

        setIsLoading(false);
      } else {
        setIsLoading(false);
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
      setIsLoading(false);
    });
}


const toggleInputField = (field, item, index) => {
  setShowEmailFields(true);
  switch (field) {
    case 'phone':
      setShowPhoneNumber(!showPhoneNumber);
      setActiveMobileIcons(prevIcons => {
        const newIcons = [...prevIcons];
        if (newIcons[index]) {
          // If the icon is already unchecked, remove its index from the array
          const indexToRemove = newIcons.indexOf(true);
          if (indexToRemove !== -1) {
            newIcons.splice(indexToRemove, 1);
          }
        } else {
          // If the icon is checked, update the array as before
          newIcons.fill(false); // Disable all email icons
          newIcons[index] = !newIcons[index]; // Enable the clicked email icon
        }
        return newIcons;
      });
      break;
    case 'email':
      setShowEmailAddress(!showEmailAddress);
      setActiveEmailIcons(prevIcons => {
        const newIcons = [...prevIcons];
        if (newIcons[index]) {
          // If the icon is already unchecked, remove its index from the array
          const indexToRemove = newIcons.indexOf(true);
          if (indexToRemove !== -1) {
            newIcons.splice(indexToRemove, 1);
          }
        } else {
          // If the icon is checked, update the array as before
          newIcons.fill(false); // Disable all email icons
          newIcons[index] = !newIcons[index]; // Enable the clicked email icon
        }
        return newIcons;
      });
      break;
    case 'whatsapp':
      setShowWhatsApp(!showWhatsApp);
      setActiveWhatsAppIcons(prevIcons => {
        const newIcons = [...prevIcons];
        if (newIcons[index]) {
          // If the icon is already unchecked, remove its index from the array
          const indexToRemove = newIcons.indexOf(true);
          if (indexToRemove !== -1) {
            newIcons.splice(indexToRemove, 1);
          }
        } else {
          // If the icon is checked, update the array as before
          newIcons.fill(false); // Disable all email icons
          newIcons[index] = !newIcons[index]; // Enable the clicked email icon
        }
        return newIcons;
      });
      break;
    default:
      break;
  }
};

  const handleDropdownChange=(e,item)=>{
    if(selectedSubType==="nblead"){
      OPSInitiativeData[selectedSubType]?.BOE_Details?.forEach(element => {
        if((element?.label?.includes("Prospect Name") || element?.label?.includes("Contact Number") ) && e==="yes"){
          element.hide= true;
          setIsShowCOnditionalFields(true);
        }
        else if((element?.label?.includes("Prospect Name") || element?.label?.includes("Contact Number") )  &&e==="no"){
          element.hide= false;
          setIsShowCOnditionalFields(false);
        }
      });
    }
  }
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const handleDateChange =()=>{}
  const getTransactionData = (values) => {
    if (selectedSubType === "nblead") {
      return [
        { Status: "Create", TagName: "ExistingCustomer", TagValue: values?.ExistingCustomer },
        { Status: "Create", TagName: "PolicyNumber", TagValue: values?.PolicyNumber },
        { Status: "Create", TagName: "ProspectName", TagValue: values?.ProspectName },
        { Status: "Create", TagName: "ContactNumber", TagValue: values?.ContactNumber },
        { Status: "Create", TagName: "EmailAddress", TagValue: values?.EmailAddress },
        { Status: "Create", TagName: "SourcePolicy", TagValue: values?.SourcePolicy },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        { Status: "Create", TagName: "SelfLead", TagValue: values?.options2 },
        { Status: "Create", TagName: "NBMobileNumber", TagValue: isMobileNo || ""},
        {Status: "Create", TagName: "FileType", TagValue: "NBLEAD"}
      ];
    } else if(selectedSubType === "fieldvisit") {
      return [
        { Status: "Create", TagName: "ReasonForFieldVisit", TagValue: values?.ReasonForFieldVisit },
        { Status: "Create", TagName: "ScheduledOn", TagValue: values?.ScheduledOn },
        { Status: "Create", TagName: "ConductedOn", TagValue: values?.ConductedOn },
        { Status: "Create", TagName: "ResultofFieldVisit", TagValue: values?.ResultofFieldVisit },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        // {Status: "Create", TagName: "FileType", TagValue: "WRONGCUSTOMERCONTACTED"}
      ];
    }
    else if(selectedSubType === "customerportalregistration") {
      return [
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
    else if(selectedSubType === "advisorportalregistration") {
      return [
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
    else if(selectedSubType === "whatsappregistration") {
      return [
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
  };
  const handleSubmit = (values) => {
    if(!showEmailFields&&(selectedSubType==="customerportalregistration"||selectedSubType==="advisorportalregistration"||selectedSubType==="whatsappregistration")){
      message.destroy()
      message.warning({
        content:
          "Please select atleast one communication.",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values?.requestchannel, // Required
      Category: 1,
      ApplicationNo:
      details?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: 456,
      "CustRole":values?.custRole,
      policyStatus:
      details?.policyDetailsObj?.planAndStatus?.policyStatus || customerData?.policyStatus,
      proposerName: details?.policyDetailsObj?.identifiers?.po_Name || customerData?.po_Name,
      plan: details?.policyDetailsObj?.planAndStatus?.planName || customerData?.planName,
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.name,
      ModifiedOn: new Date(),
      ModifiedByRef: "Test123",
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime: new Date(),
      ReasonDelayed: values?.resonfordelay,
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
  };
  const onBlurInput = (value,item)=>{

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
      <Spin spinning={isLoading} fullscreen />
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
           onBlurInput ={onBlurInput }
            data={OPSInitiativeData[selectedSubType]?.BOE_Details}
            subType={selectedSubType}
            handleDropdownChange ={handleDropdownChange }
            ProductRelatedPortalLU={ProductRelatedPortalLU}
            handleDateChange ={handleDateChange }
            toggleInputField={toggleInputField}
            // activeEmailIcons={activeEmailIcons}
            // activeMobileIcons={activeMobileIcons}
            // activeWhatsAppIcons={activeWhatsAppIcons}
            showEmailAddress={showEmailAddress}
            showPhoneNumber={showPhoneNumber} 
            showWhatsApp={showWhatsApp}
          ></DetailsForm>
            {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                >
                  Submit
                </Button>{" "}
                {( loginInfo?.userProfileInfo?.profileObj?.role==="boeadmin" ) && (
              <Button type="primary" className="primary-btn" onClick={()=>getRaiseRequirements()}>
                Raise Requirement
              </Button>
            )}
              </div>
        </Form>
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props.getAdvance}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
            <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose}/>
    </>
  );
};

export default OPSInitiative;

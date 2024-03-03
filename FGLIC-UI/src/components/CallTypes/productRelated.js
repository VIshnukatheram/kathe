import React, { useState, useEffect } from "react";
import { ProductRelatedData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import {
  Button,
  Form,
  Spin,
  message,
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import ContactForm from "../../utils/ContactForm";
import { useSelector } from "react-redux";
import RaiseRequirementPopup from '../RaiseRequirementPopup';


const ProductRelated = (props) => {
  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  const { selectedSubType, customerData,details,setSelectedSubType,typesForm,ProductRelatedPortalLU,customerQueryLU } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
const [showEmailAddress, setShowEmailAddress] = useState(false);
const [showWhatsApp, setShowWhatsApp] = useState(false)
const [showEmailFields, setShowEmailFields] = useState(false);
const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
const [requirementModalLoader, setRequirementLoader] = useState(false);
const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);

useEffect(()=>{
  form.setFieldsValue({
    'mobileNo': customerData?.mobileNo,
    'whatsAppNo':  customerData?.mobileNo,
    'emailId': customerData?.emailID
  });
},[])

  const handleDropdownChange=(e,item)=>{
    let selectDropDownValue = e === 1 ? "productkeyfeatures" : e ===2  ? "maturity" : e===3 ? "survivalfeatures" :e===4?"termsandconditions": e===5?"productcharges": 1;
    setSelectedSubType(selectDropDownValue);
    typesForm?.setFieldsValue({subType: e})
  }
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
 
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const getTransactionData = (values) => {
    if(selectedSubType==="productkeyfeatures"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PRODUCTKEYFEATURES" }
      ]
    }
    if(selectedSubType==="termsandconditions"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"TERMSANDCONDITION" }
      ]
    }
    return [
      {
        "Status": "Create",
        "TagName": "CustomerQueryTopic",
        "TagValue": values.CustomerQueryTopic
    },
    {
      "Status": "Create",
      "TagName": "CustomerQuery",
      "TagValue": values.CustomerQuery
  },
    ]
  }
  const handleSubmit = (values) => {
    if(!showEmailFields&&selectedSubType!=="prospectleaddistributorlead"){
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
      RequestChannel: values.requestchannel, // Required
      Category: 1,
      ApplicationNo:
      details?.policyDetails?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetails?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: 456,
      "CustRole":values.custRole,
      policyStatus:
      details?.policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus || customerData?.policyStatus,
      proposerName: details?.policyDetails?.policyDetailsObj?.identifiers?.po_Name || customerData?.po_Name,
      plan: details?.policyDetails?.policyDetailsObj?.planAndStatus?.planName || customerData?.planName,
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.name,
      ModifiedOn: new Date(),
      ModifiedByRef: "Test123",
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime: new Date(),
      ReasonDelayed: values.resonfordelay,
      CustSignDateTime: values?.customersigningdate
      ? new Date(values?.customersigningdate)
      : new Date(),
      "TransactionData":getTransactionData(values),
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
//     setRequirementLoader(true);
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
            data={ProductRelatedData[selectedSubType]?.BOE_Details}
            subType={selectedSubType}
            handleDropdownChange ={handleDropdownChange }
            ProductRelatedPortalLU={ProductRelatedPortalLU}
            customerQueryLU={customerQueryLU}
            toggleInputField={toggleInputField}
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

export default ProductRelated;

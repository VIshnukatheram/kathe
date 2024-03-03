import React, { useState, useEffect, useRef } from "react";
import { connect,useSelector } from "react-redux";
import { AnnuityData } from "../../mainconfig";
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
  Row,
  Col,
  Input
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import ContactForm from "../../utils/ContactForm";
import UploadIcon from "../../assets/images/upload.png";
import dayjs from "dayjs";
import CloseIcon from "../../assets/images/close-icon.png";
import OTPModal from "../../utils/OTPModal";
import ExistUpdateCheckBoxList from "../../utils/ExistUpdateCheckBoxList";

const Annuity = (props) => {
  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  const { selectedCallType, selectedSubType,selectedSubTypeId, customerData,details,setSelectedSubType,typesForm,ProductRelatedPortalLU,processNameLU,POSContactData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [paymentDetailsOpen,setPaymentDetailsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isShowPOSScreen,setIsShowPOSScreen] = useState(false);  //pos screen showing purpose
  const [isShowTransferFields,setIsShowTransferFields] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [isShowConditionalFields,setIsShowCOnditionalFields] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [isProcessLinks,setIsProcessLinks] = useState([]); 
  const [isDocLinks,setIsDocLinks] = useState([]);
  const [isSelectedProcessName,setIsSelectedProcessName] = useState("");
  const [isProcessNameLU,setIsProcessNameLU] = useState([]);
  const [MstDesc,setMstDesc] = useState('');
  const [checkedList, setCheckedList] = useState([]);
  const [isPaymentMethodSelection,setIsPaymentMethodSelection] = useState("");
  const [isShowRequestFormFields,setIsShowRequestFormFields] = useState(false);
  const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
  const [showResonDelayField,setShowReasonDelayField] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [otpValue, setOtpValue] = useState(null);
  const [sendOTPErrorMsg, setSendOTPErrorMsg] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [sendOTPLoader, setSendOTPLoader] = useState(false);
const [requirementModalLoader, setRequirementLoader] = useState(false);
const [validateBtnDisable, setValidateBtnDisable] = useState(false);
const [sendOTPTo,setSendOTPTo] = useState(null);
const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
const [serviceRequestId, setServiceRequestId] = useState(null);
const [paymentMethodList,setPaymentMethodList] = useState([]);
const [uploadFiles,setUploadFiles] = useState([]);
const [isSelectionMode,setIsSelectionMode] = useState(null);
const [isShowOTPModal,setIsShowOTPModal] = useState(false);
const [disableRequestForm,setDisableRequestForm] = useState(false);
const [disableOTP,setDisableOTP] = useState(true);
const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
const [clientEnquiryData,setClientEnquiryData] = useState([])
const [CNFBankAccNo, setCNFBankAccNo] = useState("");
const [BankAccNo, setBankAccNo] = useState("");
const [isCheckOTP, setIsCheckOTP] = useState(false);
const [isPaymentReprocessingData,setIsPaymentReprocessingData] = useState([]);
const [PayeeCode,setPayeeCode] = useState(null);

  const suffix = <img src={UploadIcon} alt="" />;


  const posReprocessingObj = {
    custRole:POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    Payout_Made_For: "",
    Payment_Mode: "",
    Payment_Date: "",
    Payment_Status:"",
    Cheque_Status: "",
    ChequePOD_No:"",
    Reason_For_Reprocessing:"",
    ValidateSignature: "",
    BranchComments: "",
    ValidatedBy: ""
  };
  
  const shouldLog = useRef(true);
useEffect(()=>{
  // if(shouldLog.current){
  //   shouldLog.current = false;
    getClientEnquiry();
    if(!customerData?.isPOS){
     // getPaymentReprocessing();
    }
    //getDropdownData();
//   getProcesLink();
//   getClientEnquiry();
//   getProcesDocLnk();
 // }
},[selectedSubType])

useEffect( ()=>{
  if(POSContactData && customerData?.isPOS&&selectedSubType){
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posReprocessingObj[element.tagName] = element.tagValue
    });
    setIsShowPOSScreen(true);
    setIsCheckOTP(posReprocessingObj?.ValidatedBy === "requestform" ? true: false);
    form.setFieldsValue({
      custRole: posReprocessingObj?.custRole,
      srvReqID: posReprocessingObj?.srvReqRefNo,
      Payout_Made_For: posReprocessingObj?.Payout_Made_For,
      Payment_Mode: posReprocessingObj?.Payment_Mode,
      Payment_Date: posReprocessingObj?.Payment_Date,
      Payment_Status: posReprocessingObj?.Payment_Status,
      Cheque_Status: posReprocessingObj?.Cheque_Status,
      ChequePOD_No: posReprocessingObj?.ChequePOD_No,
      Reason_For_Reprocessing: posReprocessingObj?.Reason_For_Reprocessing,
      BranchComments: posReprocessingObj?.Comments,
      ValidateSignature:posReprocessingObj?.ValidateSignature,
      CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      ReasonForDelay: POSContactData?.reasonDelayed,
      ReasonForChange_New: posReprocessingObj?.ReasonForChange_New
    });
    AnnuityData[selectedSubType]?.POS_RequestDetails?.forEach(element => {
      if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
        element.hide= false;
        setShowReasonDelayField(true);
      }
    });
  }
},[])


const getPaymentReprocessing = ()=>{
  let response = apiCalls.getPaymentReprocessing(customerData?.policyNo,selectedCallType,selectedSubTypeId);
  response
    .then((val) => {
      if (val?.data) {
        setIsPaymentReprocessingData(val?.data[0]);
        setPayeeCode(val?.data[0]?.payeeCode)

        form?.setFieldsValue({
          Payment_Mode: val?.data[0]?.payment_Mode,
          Payment_Date: val?.data[0]?.payment_Date,
          Payment_Status: val?.data[0]?.payment_Status,
          Cheque_Status: val?.data[0]?.cheque_Status,
          ChequePOD_No: val?.data[0]?.cheque_POD_No,
        })
      } else {
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

const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };

const handleChange = (value) => {
    handleEmpty();
    // If the checkbox is already checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
    }
  };

  const getIFSCBankDetails =async(ifscCode)=>{
    let response = await apiCalls.getIFSCBanks(ifscCode);
    if (response.statusText) {
          if (response?.data.length >0) {
            form.setFieldsValue({
              BankName: response?.data[0]?.bank
            })
          } else {
            message.error({
              content:
              response?.data?.responseBody?.errormessage ||
                "Invalid IFSC",
              className: "custom-msg",
              duration: 2,
            });
  
            form.setFieldsValue({
              BankIFSC: '',
              BankName:""
            })
            
          }
        }
  }

  const handleInputChange =(e,item)=>{
    if(item.label?.includes("IFSC")&&e.target.value){
      getIFSCBankDetails(e.target.value);
    }
  }

  const onBlurInput =(value,item)=>{
    const obj = form.getFieldsValue(value)

    if(item.name === "BankIFSC" && value){
      getIFSCBankDetails(value);
    }

    if(item.name === 'ConfirmBankAccountNumber'){
      setCNFBankAccNo(value)
     }else if(item.name === 'BankAccountNumber'){
       setBankAccNo(value)
     }
   
   
     if(item.name === 'ConfirmBankAccountNumber'){
  
      if(BankAccNo !== value ){
              message.destroy();
        message.error({
          content:
            "Bank Number Not matched",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({ConfirmBankAccountNumber: ''})
      }
      //  const lastFourDigits = obj.ConfirmBankAccountNumber.slice(-4);
      //  const maskedString = '*'.repeat(obj.ConfirmBankAccountNumber.length - 4) + lastFourDigits;
      //  form.setFieldsValue({ConfirmBankAccountNumber: maskedString});
     
    }else if(value?.length >= 4 &&  item.name === 'BankAccountNumber'){
     const lastFourDigits = obj.BankAccountNumber.slice(-4);
     const maskedString = '*'.repeat(obj.BankAccountNumber.length - 4) + lastFourDigits;
     form.setFieldsValue({BankAccountNumber: maskedString})
    }



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

  const getClientEnquiry = ()=>{
    setIsLoading(true);
    setDisableOTP(true);
        let obj = {
          clientNumber:  customerData?.poClientID
        
    };
    let response = apiCalls.getClientEnquiry(obj);
    response
      .then((val) => {
        if (val?.data) {
          setClientEnquiryData(val?.data?.responseBody);
          const res = val?.data?.responseBody;
          if(res?.rmblphone){
            setDisableOTP(false);
          }
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
  const getProcesDocLnk = () => {
    setIsDocLinks([]);
    let obj = {
      "Call_Typ" : null,
      "Sub_Typ" :null,
      "ProdType" : details?.policyDetailsObj?.planAndStatus?.productType,
      "ProdCode": details?.policyDetailsObj?.planAndStatus?.planCode,
       "ProdUIN": details?.policyDetailsObj?.planAndStatus?.productUIN,
  }
    let response = apiCalls.getProcesDocLnk(obj);
    response
      .then((val) => {
        if (val?.data) {
          setIsDocLinks(val?.data);
        } else {
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
       
      });
  };
  const getProcesLink = () => {
    setIsProcessLinks([]);
    let obj = {
      "Call_Typ" : 20,
      "Sub_Typ":1
}
    let response = apiCalls.getProcesLink(obj);
    response
      .then((val) => {
        if (val?.data) {
          setIsProcessLinks(val?.data);
          const filteredData = val?.data?.filter((ele) => ele.docType);
          const processedData = filteredData?.map((item) => ({
            ...item,
            label: item.docType,
            value: item.docType,
          }));
          //setIsProcessNameLU(processedData);
        } else {
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
       
      });
  };

 

  const handleDropdownChange=(e,item)=>{
    // if(processNameLU){
    //       let slectedId= processNameLU.find((ele)=>{
    //          if(ele.mstID === e){
    //           setMstDesc(ele.mstDesc);
    //          }
    //          return false
    //       }) 
    // }
    // let selectDropDownValue = e ||null;
  
    // setSelectedSubType("processname");
    // setIsSelectedProcessName(selectDropDownValue);
    // props?.setSelectedSubTypeId(selectDropDownValue);
    // typesForm?.setFieldsValue({subType: selectDropDownValue})
  }
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const date_diff_indays = function (date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  };
  const handleDateChange = (date, item) => {
    setShowReasonDelayField(false);
    if (item === "BranchReceivedDate") {
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue()
      let customerSignDate = moment(formFeilds?.CustomerSigningDate + 1).format("MM/DD/YYYY");
      let dateDiffence = date_diff_indays(selectDate,customerSignDate)
      if(!formFeilds?.CustomerSigningDate||dateDiffence > 0){
        message.destroy();
        message.error({
          content: "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({BranchReceivedDate: ""})
      return;
      } else {
        AnnuityData[selectedSubType]?.Request_Details?.forEach(element => {
          if(element?.label?.includes("Reason For Delayed Submission")&&selectDate < todayDate){
            element.hide= false;
            setShowReasonDelayField(true);
          }
          else if(element?.label?.includes("Reason For Delayed Submission")&&selectDate >= todayDate){
            element.hide= true;
            setShowReasonDelayField(false);
          }
        });
      }
    }
  };
  const getDocLink = () => {
    const filteredLinks = isDocLinks?.filter((item) => item.docType?.includes("Terms & Conditions"));
    // Assuming you want to return an array of links, you can use map
    const links = filteredLinks?.map((item) => item.link);
    return links?.length>0 ? links[0] : "";
}
const getProcessLink = () => {
  // const filteredLinks = isProcessLinks?.filter((item) => item.docType === isSelectedProcessName);
  const filteredLinks = isProcessLinks?.filter((item) => item.docType === MstDesc);
  
  const links = filteredLinks?.map((item) => item.link);
  return links?.length>0 ? links[0] : "";
}
  const getTransactionData = (values) => {
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue: "ProcessEmailer" },
        { Status: "Create", TagName: "ProcessName", TagValue: isSelectedProcessName || values.ProcessName },
        { Status: "Create", TagName: "DocLink", TagValue: getDocLink() || ""},
        { Status: "Create", TagName: "ProcessLink", TagValue: getProcessLink() || ""},
        { Status: "Create", TagName: "Payout_Made_For", TagValue: values.Payout_Made_For || ""},
        { Status: "Create", TagName: "Payment_Mode", TagValue: values.Payment_Mode || ""},
        { Status: "Create", TagName: "Payment_Date", TagValue: values.Payment_Date || ""},
        { Status: "Create", TagName: "Payment_Status", TagValue: values.Payment_Status || ""},
        { Status: "Create", TagName: "Cheque_Status", TagValue: values.Cheque_Status || ""},
        { Status: "Create", TagName: "ChequePOD_No", TagValue: values.ChequePOD_No || ""},
        { Status: "Create", TagName: "Reason_For_Reprocessing", TagValue: values.Reason_For_Reprocessing || ""},
        { Status: "Create", TagName: "NameAsMentionedInTheBank", TagValue: values.NameAsMentionedInTheBank || ""},
        { Status: "Create", TagName: "BankIFSC", TagValue: values.BankIFSC || ""},
        { Status: "Create", TagName: "BankAccountNumber", TagValue: values.BankAccountNumber || ""},
        { Status: "Create", TagName: "ConfirmBankAccountNumber", TagValue: values.ConfirmBankAccountNumber || ""},
        { Status: "Create", TagName: "BankName", TagValue: values.BankName || ""},
        { Status: "Create", TagName: "InitiatePennyDrop", TagValue: values.InitiatePennyDrop || ""},
        { Status: "Create", TagName: "ValidatedBy", TagValue: values?.ValidatedBy ? values?.ValidatedBy : 'form'},
        { Status: "Create", TagName: "ValidateSignature", TagValue: values.ValidateSignature || ""},
        { Status: "Create", TagName: "Reprocessing_by", TagValue: values.Reprocessing_by || checkedList?.includes("NEFT") ? "NEFT" : "Cheque" || ""},
        { Status: "Create", TagName: "Comments", TagValue: values.Comments || ""},
        { Status: "Create", TagName: "PayeeCode ", TagValue: isPaymentReprocessingData?.payeeCode || ""},

{
          "Status": "Create",
          "TagName": "ReasonFor_Representation",
          "TagValue": "No"
},
{
          "Status": "Create",
          "TagName": "AccType",
          "TagValue": "1"
},
{
          "Status": "Create",
          "TagName": "RCD",
          "TagValue":isPaymentReprocessingData?.rcd||"",
},
{
          "Status": "Create",
          "TagName": "APE",
          "TagValue": isPaymentReprocessingData?.ape||"",
},
{
          "Status": "Create",
          "TagName": "PayableAmount",
          "TagValue": isPaymentReprocessingData?.payableAmount||"",
}
,
{
          "Status": "Create",
          "TagName": "FundTransferAmount",
          "TagValue": isPaymentReprocessingData?.fundTransferAmount||"",
},
{
          "Status": "Create",
          "TagName": "TotalAmount",
          "TagValue": isPaymentReprocessingData?.totalAmount||"",
},
{
          "Status": "Create",
          "TagName": "FundTransferTo",
          "TagValue": isPaymentReprocessingData?.fundTransferTo||"",
},
{
          "Status": "Create",
          "TagName": "OldSerReq",
          "TagValue": isPaymentReprocessingData?.oldSerReq||"",
},
      ];
  };

  const getSelectedCommunications = () =>{
    let communicationObj = []
    if(showEmailAddress||showWhatsApp||showPhoneNumber){
      communicationObj.push(
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
      )
    }
    if(showWhatsApp||showPhoneNumber){
      communicationObj.push(
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
      )
    }
    return communicationObj;
  }
  const handleSubmit = (values) => {
    if(selectedSubType==="lifecertificatesubmitted"){
      setIsShowPOSScreen(!isShowPOSScreen);
      return;
    }
   else {
    if(!showEmailFields){
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
    if (POSContactData && customerData?.isPOS) {
      POSActionsOnContactDetails(values, "APPROVED");
    }
    else {
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values.requestchannel, // Required
      Category: 2,
      ApplicationNo:
      details?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: 456,
      "CustRole":values.custRole,
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
      RequestDateTime: values?.BranchReceivedDate
      ? new Date(values?.BranchReceivedDate)
      : new Date(),
      ReasonDelayed: values.ReasonDelayed,
      CustSignDateTime: values?.CustomerSigningDate
      ? new Date(values?.CustomerSigningDate)
      : new Date(),
      "TransactionData": getTransactionData(values),
      "Uploads": uploadFiles || [
        
      ],
      CommunicationRequest: getSelectedCommunications() || [],
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
          
          // message.success({
          //   content: "Contact Details Updated Successfully",
          //   className: "custom-msg",
          //   duration: 3,
          // });
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
  }
  };

  const handleRadioChange =(e,item)=>{
    setIsShowOTPModal(false);
    let selectionValue = e.target.value;
        if(item?.label?.includes("Initiate Request By")&& selectionValue==="requestform"){
        setIsShowRequestFormFields(true);
       }
       else if(item?.label?.includes("Initiate Request By")&& selectionValue==="otp"){
        setIsShowRequestFormFields(false);
       // setShowRaiseRequirementBtn(false);
       }
      //  else if(selectionValue === "no"&&item?.label?.includes("Validate Signature")){
      //   setShowRaiseRequirementBtn(true);
      // }
      // else if(selectionValue === "yes"&&item?.label?.includes("Validate Signature")){
      //   setShowRaiseRequirementBtn(false);
      // }
      if (e.target.value === "otp") {
        setIsShowOTPModal(true);
        setIsShowTransferFields(true);
        //setShowRequestFormFields(false);
        setValidateOTPSuccess(false);
      } else {
       // setShowRequestFormFields(true);
        setIsShowTransferFields(false);
        setValidateOTPSuccess(true);
      }
    
  
    }
    
  const POSActionsOnContactDetails = (values, status) => {
    
    let seletedRequerimentList = raiseRequerimentList
      ?.filter((e) => e.status === true)
      ?.map((e) => e.raiseReqId);
      if(seletedRequerimentList.length===0  && status === 'REJECTED'){
        setIsLoading(false);
        setRequirementLoader(false);
        message.destroy();
        message.error({
          content: "Please Select Documents to Reject",
          className: "custom-msg",
          duration: 3,
        });
      return;
      }
    let obj = {
      TransectionId: 1,
      SrvReqRefNo: POSContactData?.srvReqRefNo || serviceRequestId,
      Status: status,
      RequirementList: seletedRequerimentList,
      // "RequirementComments":requirementCmnt,
      Comments: values?.comment,
      TransactionPayload:  [
        {
          "Status": "Create",
          "TagName": "POSComments1",
        "TagValue":values?.comment
      }
      ],
    };
    setIsLoading(true);
    let response = apiCalls.POSActionsOnContactDetails(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle(status==="REJECTED"?"Requirement Raised":"Request Approved");
          setNavigateTo(
            (showRaiseRequirementBtn && "/advancesearch") || "/dashboard"
          );
          setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);
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
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false);
      });
  };

  const handleSendOTPClose = () => {
    form.setFieldsValue({ customerchoice: null });
    setIsModalOpen(false);
    setValidateBtnDisable(false);
    setOtpValue(null);
    setCounter(0);
  };
  const handleOTPChange = (e) => {
    setOtpValue(e.currentTarget.value);
  };
  const handleSendOTP = () => {
    setCounter(30);
    handleOTP();
    setValidateBtnDisable(true);
  };
  const handleOTP = (isValue) => {
    setSendOTPLoader(true);
    setSendOTPErrorMsg(false);
    setValidateOTPSuccess(false);
    if (isValue && !otpValue) {
      setSendOTPLoader(false);
      message.destroy();
      message.error({
        content: "Please Enter OTP value",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    const obj = {
      PolicyNo: customerData?.policyNo,
      // EmailId: customerData?.emailID,
      EmailId: "fgtesting8@gmail.com",
      //MobileNo: contactNewValue,
      MobileNo: "9892686867",
      OTP: isValue ? otpValue : 0,
      Body: '"CustomerName":"vishnu","Purpose":"claim intimation"',
    };
    // if(otpValue && otpValue.length !== 6){
    //              message.destroy()
    //       message.error({
    //         content: "Invalid OTP",
    //         className: "custom-msg",
    //         duration: 2,
    //       });
    //       setSendOTPLoader(false);
    // }else if(otpValue.length === 6){
    //   message.success({
    //             content: "Otp Validation successfully",
    //             className: "custom-msg",
    //             duration: 3,
    //           });
    //           setIsModalOpen(false);
    //         setOtpValue(null);
    //         setValidateOTPSuccess(true);
    //         setSendOTPLoader(false);
    // }
    let response = apiCalls.getSendOTP(obj);
    response
      .then((val) => {
        if (val?.data?.responseHeader?.issuccess) {
          setSendOTPLoader(false);
          if (otpValue) {
            message.destroy();
            setSendOTPErrorMsg(null);
            message.success({
              content: "Otp Validation successfully",
              className: "custom-msg",
              duration: 3,
            });
            setIsModalOpen(false);
            setOtpValue(null);
            setValidateOTPSuccess(true);
          }
        } else {
          setSendOTPLoader(false);
          message.destroy();
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
        setSendOTPLoader(false);
        setSendOTPErrorMsg();
      });
  };

  const handleEmpty =() =>{
    setShowPhoneNumber(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
  }

  const handleCheckBoxChange = (value) => {
    // If the checkbox is already checked, uncheck it
    if (paymentMethodList?.includes(value)) {
      setPaymentMethodList([]);
      setIsPaymentMethodSelection("");
    } else {
      // Otherwise, check it
      setPaymentMethodList([value]);
      setIsPaymentMethodSelection(value);
    }
  };

  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    setRequirementLoader(true);
    if((formData.customerchoice ===  "requestform" ) || (selectedSubType === "addresschange" ) || raiseRequirementOpen){
      handleSubmit();
    }else{
      POSActionsOnContactDetails(null, "REJECTED");
    }

  };

  const getRaiseRequirements = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: props?.selectedSubTypeId,
      Role:isShowPOSScreen?0:1
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
  }
    const handleTextLink=(item)=>{
        if(item.linkValue?.toLowerCase() === "view"){
          const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
          window.open(url, '_blank');
        }
      }
      const handleLabelLink=(item)=>{
        if(item.label === "Initiate Penny Drop"){
          InitiatePennyDropp();
        }
      }
    
      const getUploadFiles=(listOfUploadFiles)=>{
        const updatedUploadList = listOfUploadFiles?.map((obj) => {
          // Create a new object without the propertyToDelete property
          const { labelName, ...newObject } = obj;
          return newObject;
        });
        // Update the state with the new list
        setUploadFiles(updatedUploadList);
    
      }

    const handleLinkValue =()=>{
        setPaymentDetailsOpen(true);
      }
      
      const InitiatePennyDropp = () => {
        const values = form.getFieldsValue();
        if(!values.BankAccountNumber || !values.AccountHolderName || !values.BankIFSC){
          message.destroy();
          message.error({
            content:"Enter All Mandatory Feilds",
            className: "custom-msg",
            duration: 2,
          });
         return;
        }
        
        let obj = {
            "accountNumber": values?.BankAccountNumber,
            "accountHolderName":values.AccountHolderName,
            "ifsc": values.BankIFSC,
            "consent": "Y",
            "nameMatchType": "Entity",
            "useCombinedsolution":"Y",
            "allowartialMatch": true,
            "preset": "G",
            "suppressReorderPenalty":true,
            "clientData":{
              caseId:'123'
             }
        };
        let response = apiCalls.bankaccverification(obj);
        response
          .then((result) => {
            if (result?.data) {
              
             if(result?.data?.statusCode === 101){
              form.setFieldsValue({
                InitiatePennyDrop: result?.data?.result?.data?.source[0]?.data?.bankResponse
              })
             }else{
              form.setFieldsValue({
                InitiatePennyDrop: result?.data?.statusMessage
              })
             }
              //SUCCESSFUL TRANSACTION
            } else {
              setIsLoading(false);
              form.setFieldsValue({
                InitiatePennyDrop: 'Invalid Input',
             
              })
              message.error({
                content:
                result?.data?.responseBody?.errormessage ||
                  "Something went wrong please try again!",
                className: "custom-msg",
                duration: 2,
              });
            }
          })
          .catch((err) => {
            setIsLoading(false);
            form.setFieldsValue({
              InitiatePennyDrop: 'Invalid Input',
           
            })
          });
      };


    //commonly render all forms
    const renderDetailsForm = (formType) => {
        return (
          <DetailsForm
            data={AnnuityData[selectedSubType]?.[formType]}
            subType={selectedSubType}
            suffix={!isShowPOSScreen && suffix}
            form={form}
            handleRadioChange={handleRadioChange}
            handleDateChange={handleDateChange}
            handleTextLink ={handleTextLink}
            handleDropdownChange={handleDropdownChange}
            selectCheckBox={selectCheckBox}
            toggleInputField={toggleInputField}
            activeEmailIcons={activeEmailIcons}
            activeMobileIcons={activeMobileIcons}
            activeWhatsAppIcons={activeWhatsAppIcons}
            getUploadFiles={getUploadFiles}
            handleLabelLink ={handleLabelLink }
            disabledDate={disabledDate}
            onBlurInput={onBlurInput}
            disableRequestForm={disableRequestForm}
            disableOTP={disableOTP}
            handleInputChange={handleInputChange}
          ></DetailsForm>
        );
      };

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
             {!isShowPOSScreen&&<>
              <ExistUpdateCheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Existing Details', value: 'View Existing Details', name: 'ViewExistingDetails' },
                  { label: 'Update New Details', value: 'Update New Details', name: 'UpdateNewDetails' },
                  { label: 'Send COE Link', value: 'Send COE Link', name: 'SendCOELink' },
                ]}
              />
              {checkedList?.includes("View Existing Details")&&<>
              {renderDetailsForm("Existing_Details")}
              </>}
              {checkedList?.includes("Update New Details")&&<>
              {renderDetailsForm("Update_New_Details")}
              </>}
              {checkedList?.includes("Send COE Link")&&<>
              {renderDetailsForm("Share_CEO_Details")}
               {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
              </>}
            
          </>}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
            </>}
           
          

          {(checkedList?.length>0 || isShowPOSScreen) &&<>
          <div className="contact-details-btn">
          {/* {(!showRaiseRequirementBtn||isShowPOSScreen)&&<> */}
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            {/* </>} */}
            {checkedList?.includes("View Existing Details")&&<>
            <Button type="primary" className="primary-btn"
            >
             Reject Request
            </Button>
            </>}

            {(isShowPOSScreen) ? (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            ) : <>
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => getRaiseRequirements()}
            >
              Raise Requirement
            </Button>
          </> }
          </div>
          </>}
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

      <Modal
        title="Requirements"
        open={raiseRequirementOpen}
        destroyOnClose={true}
        width={1200}
        closeIcon={false}
        footer={null}
      >
        <Spin spinning={requirementModalLoader}>
          <div  >
            <Form onFinish={handleRequirementSubmit}>
              <div className="reuirement">

              
              <table className="responsive-table">
                <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Description</th>
                  <th className="z-index">Select</th>
                </tr></thead>
                <tbody>
                  {raiseRequerimentList?.map((item, ind) => (
                    <tr key={ind + 1}>
                      <td>{ind + 1}</td>

                      <td>{item.raiseReqDesc}</td>
                      <td>
                        {" "}
                        <Checkbox
                          type="checkbox"
                          onChange={(e) => (item.status = e.target.checked)}
                        />
                      </td>
                    </tr>
                  ))}
                  {raiseRequerimentList?.length === 0 && (
                    <tr>
                      <td colspan="13">
                        <div className="text-center">
                          <span>No data avalable</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
              {/* <div className="text-area mt-16">
             <Form.Item
                      // label={<span>{"Comment"} <sup>*</sup>
                      // </span>}
                      name="requirementCmnt"
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: true,
                          message: "Enter Comments",
                        },
                      ]}
                    >
                       <TextArea rows={2} value={requirementCmnt} placeholder="Comments" onChange={(e)=>setRequirementCmnt(e.currentTarget.value)}/>
                    </Form.Item>
                  </div> */}
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  //onClick={()=>handleRequirementSubmit()}
                >
                  Submit
                </Button>

                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => setRaiseRequirementOpen(false)}
                >
                  Close
                </Button>
              </div>
            </Form>
          </div>

          
        </Spin>
      </Modal>

      {isShowOTPModal &&<>
      <OTPModal customerData={customerData} isShowOTPModal={isShowOTPModal} setIsShowOTPModal={setIsShowOTPModal}
       sendOTPNumber={clientEnquiryData?.rmblphone} setDisableRequestForm={setDisableRequestForm} setValidateOTPSuccess={setValidateOTPSuccess}/>
      </>}
    </>
  );
};

export default Annuity;

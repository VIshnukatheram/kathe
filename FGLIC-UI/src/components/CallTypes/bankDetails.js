import React, { useState,useEffect } from "react";
import { connect,useSelector } from "react-redux";
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Form, Spin, Button, Modal, Tooltip, Input,Upload,Alert,Checkbox,message } from "antd";
import PopupAlert from "../popupAlert";
import { Data } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import CloseIcon from "../../assets/images/close-icon.png";
import { useNavigate } from "react-router-dom";

import apiCalls from "../../api/apiCalls";
import dayjs from "dayjs";
import ContactForm from "../../utils/ContactForm";


const BankDetails = (props) => {
  const loginInfo = useSelector(state => state);
    const {
        selectedSubType,
        requestModeLU,
        clientRoleLU,
        policyDetails,
        customerData,
        POSContactData,
        user,
        bankAccTypeLU,
        duDupeData,
        requestReceivedViaLU
         } = props;
    const suffix = <img src={UploadIcon} alt="" />;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isLoader,setIsLoader] = useState(false);
    const [selectionAssist,setSelectionAssist] = useState(null);
    const [customerChoiceSelection,setCustomerChoiceSelection] = useState(null);
    const [showAuthorizationLetter,setAuthorizationLetter] = useState(false);
    const [showResonDelayField,setShowReasonDelayField] = useState(false);
    const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
    const [raiseRequirementOpen,setRaiseRequirementOpen] = useState(false);
    const [otpModal,setOtpModal] = useState(false);
    const [showEmailFields,setShowEmailFields] = useState(false);
    const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
    const [bankDetailsData,setBankDetailsData] = useState({});
    const [sendOTPLoader, setSendOTPLoader] = useState(false);
    const [sendOTPErrorMsg, setSendOTPErrorMsg] = useState(null);
    const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
    const [otpValue, setOtpValue] = useState(null);
    const [validateBtnDisable, setValidateBtnDisable] = useState(false);
    const [counter, setCounter] = useState(0);
    const [sendOTPTo,setSendOTPTo] = useState(null);
    const [clientEnquiryData, setClientEnquiryData] = useState("");
    const [disableOTP,setDisableOTP] = useState(true);
    const [requirementModalLoader, setRequirementLoader] = useState(false);
    const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
    const [alertTitle, setAlertTitle] = useState("");
    const [navigateTo, setNavigateTo] = useState("");
    const [alertData, setAlertData] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [serviceRequestId, setServiceRequestId] = useState(null);
    const [deDupeModalOpen, setDeDupeModalOpen] = useState(false);
    const [addressProofModal, setAddressProofModal] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showEmailAddress, setShowEmailAddress] = useState(false);
    const [showWhatsApp, setShowWhatsApp] = useState(false);
    const [uploadFiles,setUploadFiles] = useState([]);
    const [CNFBankAccNo, setCNFBankAccNo] = useState("");
    const [BankAccNo, setBankAccNo] = useState("");
    const [showUploadFile, setShowUploadFile] = useState(null);
const [isUploadMultipleFiles,setIsMultipleFiles] = useState([]);
const [aadharUploadFiles,setAAdharUploadFiles] = useState([]);
const [passportUploadFiles,setPassportUploadFiles] = useState([]);
const [rationCardUploadFiles,setRationCardUploadFiles] = useState([]);
const [DrivingUploadFiles,setDrivingUploadFiles] = useState([]);
const [uploadMultipleFiles,setUploadMultipleFiles] = useState([]);
const [updateFields, setUpdateFields] = useState(false);
const [isDisableOTPInput,setIsDisableOTPInput] = useState(false);
const [disableRequestForm,setDisableRequestForm] = useState(false);
const [isShowBankDetails,setIsShowBankDetails] = useState(false);
const [isCounterEnable,setIsCounterEnable] = useState(false);

const [BankduDupeData,setBankDeDupeData] = useState([]);


const [fileList, setFileList] = useState([]);
    const posScreenObj = {
      custRole:POSContactData?.custRole,
      srvReqID: POSContactData?.srvReqID,
      reqMode:POSContactData?.reqMode,
      Bank_IFSC_New:'',
      Bank_Name_New:'',
      Acc_Type_New:'',
      Acc_HldrName_New:'',
      Acc_Number_New:'',
      PennyDrop:''
    };
  
    
    useEffect(() => {
      (counter > 0&&isCounterEnable) && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]); // eslint-disable-next-line arrow-body-style
  
    useEffect(() => {
      if (POSContactData && customerData?.isPOS) {
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          posScreenObj[element.tagName] = element.tagValue
        });


        if(POSContactData?.deDupPayload?.length > 0){
          for (let index in POSContactData?.deDupPayload){
           if(POSContactData?.deDupPayload[index]?.type ==='BANK') {
             setBankDeDupeData(POSContactData?.deDupPayload[index]?.deDupPayload);
           }
     
          }
         }



        setIsShowPOSScreen(true);
        form.setFieldsValue({
          custRole: POSContactData?.custRole,
          srvReqID: POSContactData?.srvReqRefNo,
          requestchannel: posScreenObj?.reqMode,
          Bank_IFSC_New: posScreenObj?.Bank_IFSC_New,
          Bank_Name_New: posScreenObj?.Bank_Name_New,
          Acc_Type_New: parseInt(posScreenObj?.Acc_Type_New),
          Acc_HldrName_New:posScreenObj?.Acc_HldrName_New,
          Acc_Number_New:posScreenObj?.Acc_Number_New,
          PennyDropResult:posScreenObj?.PennyDrop,
          assistFor: posScreenObj?.assistFor,
          ValidateSignature:posScreenObj?.ValidateSignature,
          CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
          BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
          resonfordelay: POSContactData?.reasonDelayed,
          BranchComments:posScreenObj?.Comments,
        });
        if(posScreenObj?.ValidatedBy==="otp"){
          Data[selectedSubType]?.POS_Details?.forEach(element => {
            if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||element?.label==="Signature Validated"){
              element.hide= true;
              setUpdateFields(true);
            }
          });
        }
        Data[selectedSubType]?.POS_Details?.forEach(element => {
          if((element?.label?.includes("Reason For Delayed Submission")&& POSContactData?.reasonDelayed)){
            element.hide= false;
            setShowReasonDelayField(true);
          }
        });

      }
      setDisableRequestForm(false);
    }, []); // eslint-disable-next-line arrow-body-style

    const toggleInputField = (field) => {
      setShowEmailFields(true);
      form.setFieldsValue({
        'mobileNo': clientEnquiryData?.rmblphone,
        'whatsAppNo':  clientEnquiryData?.rmblphone,
        'emailId': clientEnquiryData?.rinternet
      });

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
  
    const handleInputChange =(e,item)=>{
      if(item.label?.includes("IFSC")&&e.target.value){
        getIFSCBankDetails(e.target.value);
      }
    }

    const getIFSCBankDetails =async(ifscCode)=>{
      let response = await apiCalls.getIFSCBanks(ifscCode);
		if (response.statusText) {
          if (response?.data) {
            form.setFieldsValue({
              Bank_Name_New: response?.data[0]?.bank
            })
          } else {
            message.error({
              content:
              response?.data?.responseBody?.errormessage ||
                "Something went wrong please try again!",
              className: "custom-msg",
              duration: 2,
            });
          }
        }
    }

    const InitiatePennyDropp = () => {
      const values = form.getFieldsValue();
      if(!values.Acc_Number_New || !values.Acc_HldrName_New || !values.Bank_IFSC_New){
        message.destroy();
        message.error({
          content:"Enter All Mandatory Feilds",
          className: "custom-msg",
          duration: 2,
        });
       return;
      }
      
      let obj = {
          "accountNumber":BankAccNo,
          "accountHolderName":values.Acc_HldrName_New,
          "ifsc": values.Bank_IFSC_New,
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
              PennyDrop: result?.data?.result?.data?.source[0]?.data?.bankResponse
            })
           }else{
            form.setFieldsValue({
              PennyDrop: result?.data?.statusMessage
            })
           }
            //SUCCESSFUL TRANSACTION
          } else {
            setIsLoader(false);
            form.setFieldsValue({
              PennyDrop: 'Invalid Input',
           
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
          setIsLoader(false);
          form.setFieldsValue({
            PennyDrop: 'Invalid Input',
         
          })
        });
    };


    const handleRequirementSubmit = () => {
      const formData = form.getFieldValue();
      setRequirementLoader(true);
      if(formData.customerchoice ===  "requestform" || raiseRequirementOpen){
        saveRequest();
      }else{
        POSActionsOnContactDetails(null, "REJECTED");
      }
      
    };


    const POSActionsOnContactDetails = (values, status) => {
      setIsLoader(true);
      let seletedRequerimentList = raiseRequerimentList
        ?.filter((e) => e.status === true)
        ?.map((e) => e.raiseReqId);
        if(seletedRequerimentList.length===0  && status === 'REJECTED'){
          setIsLoader(false);
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
        TransactionPayload: [
          {
            "Status": "Create",
            "TagName": "POSComments1",
            "TagValue":values?.comment
        }
        ],
      };
      let response = apiCalls.POSActionsOnContactDetails(obj);
      response
        .then((val) => {
          if (val?.data) {
            setAlertTitle(status === 'REJECTED' ?  "Requirements Raised" : `${val?.data?.message}`);
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
          setIsLoader(false);
          setRequirementLoader(false);
        })
        .catch((err) => {
          setIsLoader(false);
          setRequirementLoader(false);
        });
    };

    const getClientEnquiry = (e)=>{
      setIsLoader(true);
      setDisableOTP(true);
      setSendOTPTo(null);
          let obj = {
            clientNumber: 
                e === 1
              ? customerData?.poClientID
              : customerData?.laClientID
      };
      let response = apiCalls.getClientEnquiry(obj);
      response
        .then((val) => {
          if (val?.data) {
            setClientEnquiryData(val?.data?.responseBody);
            const res = val?.data?.responseBody
          
            setSendOTPTo(res?.rmblphone);
            if(res?.rmblphone ){
              setDisableOTP(false);
            }
           
          

            setIsLoader(false);
          } else {
            setIsLoader(false);
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
          setIsLoader(false);
        });
    }


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
      let response = apiCalls.getSendOTP(obj);
      response
        .then((val) => {
          if (val?.data?.responseHeader?.issuccess) {
            setSendOTPLoader(false);
            if (otpValue) {
              message.destroy();
              setSendOTPErrorMsg(null);
              message.success({
                content: "OTP  VALIDATION SUCCESS",
                className: "custom-msg",
                duration: 3,
              });
              setOtpModal(false);
              setOtpValue(null);
              setValidateOTPSuccess(true);
              setDisableRequestForm(true);
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

    const handleOTPChange = (e) => {
      setOtpValue(e.currentTarget.value);
    };
    const handleSendOTP = () => {
      setCounter(30);
      handleOTP();
      setValidateBtnDisable(true);
      setIsDisableOTPInput(true);
      setIsCounterEnable(true);
    };
    const handleSendOTPClose = () => {
      form.setFieldsValue({ customerchoice: null });
      setOtpModal(false);
      setValidateBtnDisable(false);
      setOtpValue(null);
      setCounter(0);
      setIsDisableOTPInput(false);
      setIsCounterEnable(false);
    };

    const handleTextLink = (item) => {
      if(item.label?.includes("Upload Bank Account Proof")){
        setAddressProofModal(true);
      }
      setDeDupeModalOpen(false);
      if(item?.label?.includes("De-Dupe Match Details")){
        setDeDupeModalOpen(true);
      }
      else if(item.linkValue?.toLowerCase() === "view"){
        const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;
        window.open(url, '_blank');
      }
      
    };

  const handleRadioChange = (e) => {
    setOtpModal(false);
    setShowRaiseRequirementBtn(false);
    const formData = form.getFieldValue();
 if(formData?.custRole &&formData?.assistFor &&formData?.requestchannel){
  setIsShowBankDetails(true);
 }
    if(e.target.value==="query" || e.target.value==="request" ){
    setSelectionAssist(e.target.value);
    }
    else if(e.target.value==="otp" || e.target.value==="requestform" ){
     setCustomerChoiceSelection(e.target.value);
     if(e.target.value==="otp"){
      setOtpModal(true);
      setValidateOTPSuccess(false);
     }
     else {
      setValidateOTPSuccess(true);
     }
    }
    // else if(e.target.value === "no"){
    //   setShowRaiseRequirementBtn(true);
    // }
    }

 const handleDropdownChange = (e, item) => {
  setDisableRequestForm(false);
 const formData = form.getFieldValue();
 setAuthorizationLetter(false);
 if(formData?.custRole &&formData?.assistFor &&formData?.requestchannel){
  setIsShowBankDetails(true);
 }
 if (item?.name?.toLowerCase().includes("requestfor")) {
  //  setRequestForSelection(e);
 }

 if(formData.custRole && item?.name === 'custRole'){
   getClientEnquiry(formData.custRole);
   getBankDeatils(formData.custRole);
 }
 if(e&&item?.label?.includes("Request Received Via")){
     setAuthorizationLetter(e===1?"self":"thirdparty");
    }

//  if(formData.custRole && item?.name === 'custRole'){
//    getClientEnquiry(formData.custRole);
//  }

};
const onBlurInput = (e, item) => {
  const obj = form.getFieldsValue();
  if(item.name === 'reenteraccountNumber'){
   setCNFBankAccNo(e)
  }else if(item.name === 'Acc_Number_New'){
    setBankAccNo(e)
  }

  if(obj.reenteraccountNumber?.length >= 4 && item.name === 'reenteraccountNumber'){
    if(BankAccNo !== e ){
      message.destroy();
message.error({
  content:
    "Bank Number Not matched",
  className: "custom-msg",
  duration: 2,
});
form.setFieldsValue({reenteraccountNumber: ''})
}
  }else if(obj.Acc_Number_New?.length >= 4 &&  item.name === 'Acc_Number_New'){
    //debugger
  const lastFourDigits = obj.Acc_Number_New.slice(-4);
  const maskedString = '*'.repeat(obj.Acc_Number_New.length - 4) + lastFourDigits;
  form.setFieldsValue({Acc_Number_New: maskedString})
 }

  // if(item.name === 'reenteraccountNumber' || item.name === 'Acc_Number_New'){
  //    if(obj.reenteraccountNumber && obj.Acc_Number_New&& (acc1 !== acc2) ){
  //     message.destroy();
  //     message.error({
  //       content:
  //         "Bank Number Not matched",
  //       className: "custom-msg",
  //       duration: 2,
  //     });
  //     form.setFieldsValue({reenteraccountNumber: ''})

  //    }

 

  // }
}
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
    if (item === "branchreceivedate") {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue()
      let customerSignDate = moment(formFeilds?.customerSigningDate + 1).format("MM/DD/YYYY");
      let dateDiffence = date_diff_indays(selectDate,customerSignDate)
      if(!formFeilds?.customerSigningDate||dateDiffence > 0){
        message.destroy();
        message.error({
          content: "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
          branchreceiveddate: "",
          BranchReceivedDate: "",
          branchreceivedate:""
        })
      return;
      }
      // if (selectDate < todayDate) {
      //   setShowReasonDelayField(true);
      // }
      if(showAuthorizationLetter === "thirdparty"){
        Data[selectedSubType]?.ThirdParty_Fields?.forEach(element => {
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
      else {
        Data[selectedSubType]?.Date_Fields?.forEach(element => {
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
  const handleLabelLink  =(item)=>{
   //debugger
    if(item.label === "Initiate Penny Drop"){
      InitiatePennyDropp();
    }
  }
  const handleLinkValue  =(item)=>{
    //debugger
    setAddressProofModal(true);
   }

  
  const handleUploadLink = () => {
    //debugger
    setAddressProofModal(true);
  };
  const handleBack=()=>{
    navigate("/dashboard");
  }
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const getBankDeatils = (e) => {
    let obj = {
      policyNo: customerData?.policyNo,
      clientId : e === 1? customerData?.laClientID:customerData?.poClientID
     
    };
    let maskedString = ''
    let response = apiCalls.getBankDeatils(obj);
    response
      .then((val) => {
        if (val?.data[0]) {
          setBankDetailsData(val?.data[0]);
               //debugger
        if(val?.data[0]?.acc_Number?.length > 4){
          const lastFourDigits = val?.data[0]?.acc_Number?.slice(-4);
          maskedString = '*'.repeat(val?.data[0]?.acc_Number?.length - 4) + lastFourDigits;
        }else{
          maskedString = val?.data[0]?.acc_Number
        }
          

          form.setFieldsValue({
            Bank_IFSC_Old:val?.data[0]?.bank_IFSC,
            Bank_Name_Old:val?.data[0]?.bank_Name,
            Acc_Type_Old:val?.data[0]?.acc_Type,
            Acc_HldrName_Old:val?.data[0]?.acc_HldrName,
            RegistredOn_Old: val?.data[0]?.registredOn ?  dayjs(val?.data[0]?.registredOn) : val?.data[0]?.registredOn,
            Acc_Number_Old:maskedString,
          })
          setIsLoader(false);
        } 
        else {
          setIsLoader(false);
          form.setFieldsValue({
            Bank_IFSC_Old:val?.data[0]?.bank_IFSC,
            Bank_Name_Old:val?.data[0]?.bank_Name,
            Acc_Type_Old:val?.data[0]?.acc_Type,
            Acc_HldrName_Old:val?.data[0]?.acc_HldrName,
            RegistredOn_Old: val?.data[0]?.registredOn ?  dayjs(val?.data[0]?.registredOn) : val?.data[0]?.registredOn,
            Acc_Number_Old:maskedString,
          })
          // message.error({
          //   content:
          //     val?.data?.responseBody?.errormessage ||
          //     "Something went wrong please try again!",
          //   className: "custom-msg",
          //   duration: 2,
          // });
        }
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };


  const handleSubmit = (values) => {
    if (POSContactData && customerData?.isPOS) {
      POSActionsOnContactDetails(values, "APPROVED");
    } else {
      // if (
      //   values.customerchoice === "requestform" &&
      //   values.validatesignature === "no"
      // ) {
      //   getRaiseRequirements();
      // } else {
        saveRequest();
      //}
    }
  };

  const saveRequest = ()=>{
    setIsLoader(true);
    const values = form.getFieldsValue();
    const newFilesArray = [];
    if (uploadFiles?.length > 0 && uploadMultipleFiles?.length > 0) {
      newFilesArray.push(...uploadFiles, ...uploadMultipleFiles);
    }
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values.requestchannel, // Required
      Category: values.assistFor === "query"  ? 1 :2,
      ApplicationNo:
      policyDetails?.policyDetailsObj?.identifiers?.applicationNo,
      DOB: convertDate(customerData?.dob),
       PolicyNo: policyDetails?.policyDetailsObj?.identifiers?.policyNo, // Required
      //PolicyNo: '00110568', // Required
     CustomerId: values.custRole === 1? customerData?.laClientID:customerData?.poClientID,
    //  CustomerId: values.custRole === "1"
    //                 ? customerData?.poClientID
    //                 : customerData?.laClientID,
       "CustRole":values.custRole,
      policyStatus:
        policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus,
        proposerName: policyDetails?.policyDetailsObj?.identifiers?.po_Name,
        plan: policyDetails?.policyDetailsObj?.planAndStatus?.planName,
      // "BranchId": 7890,
      // "CurrentStatus": 3,
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.name,
      ModifiedOn: new Date(),
      ModifiedByRef: "Test123",
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime: values?.branchreceivedate
      ? new Date(values?.branchreceivedate)
      : new Date(),
      ReasonDelayed: values.resonfordelay || "",
      CustSignDateTime: values?.customersigningdate
      ? new Date(values?.customersigningdate)
      : new Date(),
      "TransactionData": [
        {
          "Status": "Create",
          "TagName": "ValidateSignature",
          "TagValue": values.validatesignature || ""
      },
          {
              "Status": "Create",
              "TagName": "Bank_Name_New",
              "TagValue": values.Bank_Name_New
          },
          {
              "Status": "Create",
              "TagName": "Bank_IFSC_New",
              "TagValue": values.Bank_IFSC_New
          },
          {
              "Status": "Create",
              "TagName": "Acc_HldrName_New",
              "TagValue": values.Acc_HldrName_New
          },
          {
              "Status": "Create",
              "TagName": "Acc_Type_New",
              "TagValue": values.Acc_Type_New
          },
           {
              "Status": "Create",
              "TagName": "Acc_Number_New",
              "TagValue":BankAccNo 
          },
          {
              "Status": "Create",
              "TagName": "RegistredOn_Old",
              "TagValue": values.RegistredOn_Old || ""
          },
           {
              "Status": "Create",
              "TagName": "Bank_Name_Old",
              "TagValue": values.Bank_Name_Old|| ""
          },
          {
              "Status": "Create",
              "TagName": "Bank_IFSC_Old",
              "TagValue": values.Bank_IFSC_Old || ""
          },
          {
              "Status": "Create",
              "TagName": "Acc_HldrName_Old",
              "TagValue": values.Acc_HldrName_Old || ""
          },
           {
              "Status": "Create",
              "TagName": "Acc_Number_Old",
              "TagValue": bankDetailsData?.Acc_Number_Old  || ""
          },
          {
              "Status": "Create",
              "TagName": "Acc_Type_Old",
              "TagValue": values.Acc_Type_Old || ""
          },{
            "Status": "Create",
            "TagName": "PennyDrop",
            "TagValue": values.PennyDrop || ""
          },{
            "Status": "Create",
            "TagName": "Req_Via",
            "TagValue": values.Req_Via || ""
          },
          {
            "Status": "Create",
            "TagName": "ValidatedBy",
            "TagValue": values.customerchoice ? values.customerchoice : 'form'
        },
        { Status: "Create", TagName: "custRole", TagValue: values?.custRole },
        { Status: "Create", TagName: "assistFor", TagValue: values?.assistFor },
        {Status: "Create",TagName: "Client_Id","TagValue":  values?.custRole === 1 ? customerData?.laClientID: customerData?.poClientID},
      ],
      Uploads: newFilesArray?.length>0 ? newFilesArray : uploadFiles,
     CommunicationRequest: [
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 2,
          ReceipientTo: "fgtesting8@gmail.com",
          ReceipientCC: "fgtesting8@gmail.com",
          // "ReceipientTo": customerData?.emailID,
          // "ReceipientCC": customerData?.emailID,
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
          // "MobileNos": customerData?.mobileNo,
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

  //  if(values.validatesignature === 'no'){
  //   let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
  //   obj.TransactionData.push({
  //     "Status": "Create",
  //     "TagName": "ReasonList_Key",
  //     "TagValue":  JSON.stringify(ids)
  // })
  //  }
    let response = apiCalls.genericAPI(obj);
    response
      .then((val) => {
        if (val?.data) {
            setServiceRequestId(val?.data?.srvReqRefNo);
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
        setIsLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
      });   
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
  const getMultpleUploadFiles=(listOfUploadFiles,label)=>{
    //debugger
    const updatedUploadList = listOfUploadFiles?.map((obj) => {
      // Create a new object without the propertyToDelete property
      const { labelName, ...newObject } = obj;
      return newObject;
    });
    // Update the state with the new list
    setUploadMultipleFiles(updatedUploadList);
    if(listOfUploadFiles.length >0 ){
      form.setFieldsValue({
        addressProof: `Documents Uploaded -  ${listOfUploadFiles.length }`,
      })
    }
 
   
    
    console.log(uploadFiles)
  }

  const handleRemove = (file) => {
    //debugger
    if(file?.labelName === "Copy of Aadhar Card"){
      setAAdharUploadFiles([]);
    }else if(file?.labelName === "Copy of Passport"){
      setPassportUploadFiles([]);
    }
    let updatedFiles = isUploadMultipleFiles?.filter((ele)=>{
               return ele?.labelName !== file.labelName
    });
    setIsMultipleFiles(updatedFiles)
    form.setFieldsValue({
      addressProof: `Documents Uploaded -  ${updatedFiles.length }`,
    })


  };





  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    customRequest: ({ file, onSuccess, index,item },label) => {
      //debugger
      let formData = new FormData();
      const ApplicationNo =  policyDetails?.policyDetailsObj?.identifiers?.applicationNo
      formData.append("File", file, ApplicationNo+'/'+file.name);
      let response = apiCalls.fileUpload(formData);
      response
      .then((val) => {
        if (val?.data) {
          
          let newDocumentObj= {
            "IndexName": "Bank Details Updation",
            "DocumentName":file?.name,
            "UserID": "1234",
            "UploadedBy": "Krishna",
            "UploadedOn":   new Date(),
            "DocumentSize": file?.size,
            "FileLocation": val?.data,
            "BlobFileName": file?.name,
            "FileExtnMime": file?.type,
            "labelName": label,
            "name": file.name,
          }
          if (newDocumentObj.labelName && isUploadMultipleFiles?.length > 0) {
            // Check if a file with the same labelName already exists
            const existingFileIndex = isUploadMultipleFiles.findIndex(
              (file) => file.labelName === newDocumentObj.labelName
            );
          
            // Remove the labelName property before updating or adding the object
            //delete newDocumentObj.labelName;
          
            if (existingFileIndex !== -1) {
              // If exists, replace the existing file object with the new one
              const updatedUploadFiles = [...isUploadMultipleFiles];
              updatedUploadFiles[existingFileIndex] = newDocumentObj;
              setIsMultipleFiles(updatedUploadFiles);
          
              // Send the updated files to getMultpleUploadFiles
              // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
              getMultpleUploadFiles(updatedUploadFiles,label);
            } else {
              // If doesn't exist, add the new file object to the list
              setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);
          
              // Send the updated files to getMultpleUploadFiles
              // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
              getMultpleUploadFiles([...isUploadMultipleFiles, newDocumentObj],label);
            }
          } else {
            // If labelName is not present or the array is empty, add the new file object to the list
            setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);
          
            // Send the updated files to getMultpleUploadFiles
            // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
             getMultpleUploadFiles([...isUploadMultipleFiles, newDocumentObj],label);
          }
          
          //getMultpleUploadFiles(documnetsObj);
          setShowUploadFile(index);
          //setUploadFiles(file);
          if(label?.includes("Copy of Aadhar Card")){
            // setAAdharUploadFiles(file);
            let AAdharUploadFiless = [];
            AAdharUploadFiless.push(newDocumentObj)
            setAAdharUploadFiles(AAdharUploadFiless);
            
          }
          else if(label?.includes("Copy of Passport")){
            let PassportUploadFiless = [];
            PassportUploadFiless.push(newDocumentObj)
            setPassportUploadFiles(PassportUploadFiless);
          }
          else if(label?.includes("Copy of Ration Card")){
            setRationCardUploadFiles(file);
          }
          else if(label?.includes("Copy of Driving License")){
            setDrivingUploadFiles(file);
          }
          message.success({
            content: "File Upload successfully",
            className: "custom-msg",
            duration: 3,
          });
          onSuccess();
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
     
    
    },
    beforeUpload:(file) => {
      setShowUploadFile(false);
      let fileType = {
        "image/png": true,
        "image/jpg": true,
        "image/jpeg": true,
        "image/PNG": true,
        "image/JPG": true,
        "image/JPEG": true,
        "application/pdf": true,
        "application/PDF": true,
      };
      let isFileName = file.name.split(".").length > 2 ? false : true;
      if (fileType[file.type] && isFileName) {
        return true;
      } else {
        message.error("File don't allow double extension")
        return Upload.LIST_IGNORE;
      }
    }
    }



    const handleAddressModalClose=()=>{
      setUploadFiles([]);
      setAddressProofModal(false)
    }
    const handleOk = () => {
      if(aadharUploadFiles?.length===0&&passportUploadFiles?.length===0&&rationCardUploadFiles?.length===0&&DrivingUploadFiles?.length===0){
        message.warning({
          content:
            "Please Upload atleast one file.",
          className: "custom-msg",
          duration: 2,
        });
      }else {
   // form.setFieldsValue({
      //   addressProof: uploadFiles[0].DocumentName
      // })
      setAddressProofModal(false)
      }
    };

    const disabledDate = (current) => {
      return current && current > dayjs().endOf("day"); // Can not select days before today and today
    };




    const handleEdit = (val)=>{
      debugger
  
      if(val==='edit'){
        Data[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.posEdit){
            element.disabled = false
          }
          
        })
        
      }else if(val==='close'){
        Data[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.posEdit){
            element.disabled = true
          }
        })
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          posScreenObj[element.tagName] = element.tagValue
        });
        form.setFieldsValue({
          Bank_IFSC_New: posScreenObj?.Bank_IFSC_New,
          Bank_Name_New: posScreenObj?.Bank_Name_New,
          Acc_Type_New: parseInt(posScreenObj?.Acc_Type_New),
          Acc_HldrName_New:posScreenObj?.Acc_HldrName_New,
          Acc_Number_New:posScreenObj?.Acc_Number_New,
          PennyDropResult:posScreenObj?.PennyDrop,
        })
      }
      
    }

  return (
    <>
      <Spin spinning={isLoader}>
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
                data={!isShowPOSScreen? Data[selectedSubType]?.BOE_Details: Data[selectedSubType]?.POS_Details}
                handleRadioChange={handleRadioChange}
                handleLabelLink ={handleLabelLink}
                requestModeLU={requestModeLU}
                handleEdit = {handleEdit}
                clientRoleLU={clientRoleLU}
                handleDropdownChange={handleDropdownChange}
                handleTextLink={handleTextLink}
                bankAccTypeLU={bankAccTypeLU}
              ></DetailsForm>
              {!isShowPOSScreen&& isShowBankDetails&&<>
              {selectionAssist&&<>
                <DetailsForm
                data={Data[selectedSubType]?.Existing_Bank_Details}
                handleDateChange={handleDateChange}
                onBlurInput = {onBlurInput}
                bankAccTypeLU={bankAccTypeLU}
                handleInputChange={handleInputChange}
                subType={selectedSubType}
              ></DetailsForm>
              </>}
              {selectionAssist==="query"&&<>
                <DetailsForm
                data={Data[selectedSubType]?.Query_Bank_Fields}
                toggleInputField={toggleInputField}
                showEmailAddress={showEmailAddress}
                showPhoneNumber={showPhoneNumber}
                showWhatsApp={showWhatsApp}
                onBlurInput = {onBlurInput}
              ></DetailsForm>
              </>}
              {showEmailFields&&selectionAssist==="query"&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
           {selectionAssist==="request"&&<>
              <DetailsForm
                data={Data[selectedSubType]?.Bank_Details}
                handleDropdownChange={handleDropdownChange}
                   onBlurInput = {onBlurInput}
                requestModeLU={requestModeLU}
                clientRoleLU={clientRoleLU}
              ></DetailsForm>
               <DetailsForm
                data={Data[selectedSubType]?.New_Bank_Details}
                handleDropdownChange={handleDropdownChange}
                handleRadioChange={handleRadioChange}
                onBlurInput = {onBlurInput}
                handleLabelLink ={handleLabelLink }
                handleLinkValue ={handleLinkValue }
                bankAccTypeLU={bankAccTypeLU}
                handleInputChange={handleInputChange}
                subType={selectedSubType}
                handleTextLink={handleTextLink }
                disableRequestForm={disableRequestForm}
              ></DetailsForm>
              {customerChoiceSelection==="otp"&&<>
              <DetailsForm
                data={Data[selectedSubType]?.Bank_Upload}
                handleRadioChange={handleRadioChange}
                handleDropdownChange={handleDropdownChange}
                handleUploadLink={handleUploadLink}
                showPOSScreen={isShowPOSScreen}
                handleLabelLink ={handleLabelLink }
                suffix={!isShowPOSScreen && suffix}
                form={form}
                handleTextLink={handleTextLink }
              ></DetailsForm>
              </>}
              {customerChoiceSelection==="requestform"&&<>
               {/* <DetailsForm
                data={Data[selectedSubType]?.RequestForm_Fields}
                handleRadioChange={handleRadioChange}
                getUploadFiles={getUploadFiles}
                handleDropdownChange={handleDropdownChange}
                handleUploadLink={handleUploadLink}
                showPOSScreen={isShowPOSScreen}
                suffix={!isShowPOSScreen && suffix}
                form={form}
                handleTextLink={handleTextLink }
              ></DetailsForm>*/}
              {showAuthorizationLetter === "thirdparty" &&<>
                <DetailsForm
                data={Data[selectedSubType]?.ThirdParty_Fields}
                handleDateChange={handleDateChange}
                handleRadioChange={handleRadioChange}
                handleDropdownChange={handleDropdownChange}
                requestReceivedViaLU={requestReceivedViaLU}
                suffix={!isShowPOSScreen && suffix}
                form={form}
                getUploadFiles={getUploadFiles}
              ></DetailsForm>
              </>}
              {showAuthorizationLetter !== "thirdparty" && 
              <DetailsForm
                data={Data[selectedSubType]?.Date_Fields}
                handleDateChange={handleDateChange}
                handleRadioChange={handleRadioChange}
                handleDropdownChange={handleDropdownChange}
                requestReceivedViaLU={requestReceivedViaLU}
                getUploadFiles={getUploadFiles}
                handleLabelLink ={handleLabelLink }
                handleUploadLink={handleUploadLink}
                showPOSScreen={isShowPOSScreen}
                suffix={!isShowPOSScreen && suffix}
                form={form}
                handleTextLink={handleTextLink }
                disabledDate={disabledDate}
              ></DetailsForm>}
              {showResonDelayField&&<>
              <DetailsForm
                data={Data[selectedSubType]?.ReasonSubmission}
                onBlurInput = {onBlurInput}
              ></DetailsForm>
              </>}
              </>}
              </>}
              </>}
              <div className="contact-details-btn">
                        <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                        disabled={!isShowPOSScreen && !validateOTPSuccess &&selectionAssist==="request"}
                      >
                        {!isShowPOSScreen
                          ? "Submit"
                          : "Approve"}
                      </Button>
                      {isShowPOSScreen ? (
                        <>
                          <Button
                            type="primary"
                            className="primary-btn"
                            onClick={() => getRaiseRequirements()}
                          >
                            Raise Requirement
                          </Button>
                        </>
                      ): <>
                      <Button
                        type="primary"
                        className="primary-btn"
                        onClick={() => getRaiseRequirements()}
                      >
                        Raise Requirement
                      </Button>
                    </> } 
                      </div>
        </Form>
      </Spin>
      <Modal
        title="OTP Verification"
        open={otpModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleSendOTPClose()}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        {sendOTPErrorMsg && (
          <Alert
            closable
            type="error"
            description={sendOTPErrorMsg}
            onClose={() => setSendOTPErrorMsg(null)}
            showIcon
          />
        )}
        <Spin spinning={sendOTPLoader}>
          <Input
            type="text"
            className="input-label"
            value={otpValue}
            placeholder="Enter Verification Code"
            maxLength={6}
            disabled={!isDisableOTPInput}
            onChange={(e) => {
              handleOTPChange(e);
            }}
          />
         {counter > 0 && isCounterEnable&&(
            <>
              <p className="time-count">Resend OTP in {counter} sec</p>
            </>
          )}
             {counter <= 0 && !isCounterEnable&&(
            <>
              <p className="resend-otp">
                OTP to be sent{" "}
                {/* {(
                  props?.details?.sentDetailsObj?.mobileNo ||
                  props?.customerData?.mobileNo
                )?.replace(/.(?=.{4})/g, "x")} */}
                 {sendOTPTo?.includes("@") ? sendOTPTo : sendOTPTo?.replace(/.(?=.{4})/g, "x")}
              </p>
            </>
          )}
          <div className="text-center modal-validate">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleSendOTP()}
              disabled={counter > 0&&isCounterEnable}
            >
              {(!validateBtnDisable && "Send OTP") || "Resend OTP"}
            </Button>
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => {
                handleOTP(true);
              }}
              disabled={!validateBtnDisable}
            >
              Validate
            </Button>
          </div>
        </Spin>
      </Modal>


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
                  {raiseRequerimentList && raiseRequerimentList?.map((item, ind) => (
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
                  onClick={()=>handleRequirementSubmit()}
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


      <Modal
        title=""
        open={deDupeModalOpen}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setDeDupeModalOpen(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container" style={{ marginTop: "20px" }}>
          <table className="responsive-table">
            <tr>
              <th>Policy Number</th>
              <th>Account Number</th>
              <th>Account Holder Name</th>
              <th>Customer Name</th>
            </tr>
            {BankduDupeData?.map((item,index) => (
            <tr key={index}>
            <td>{item?.LA_PolicyNo}</td>
              <td>{item?.Acc_Number}</td>
              <td>{item?.Acc_HldrName}</td>
              <td>{item?.CustomerName}</td>
            </tr>
          ))}
           {BankduDupeData?.length === 0  &&
               <tr>
                  <td colspan="3">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
          </table>
        </div>
      </Modal>
      <Modal
        title="List of Acceptable Bank Proofs"
        open={addressProofModal}
        destroyOnClose={true}
        width={1000}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleAddressModalClose()}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="reuirement">
        <table className="responsive-table">
            <tr>
              <th>Sr No</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Copy of cancelled cheques with pre-printed customer’s name and account number</td>
              <td>



              <Upload 
                      {...uploadProps} 
                      fileList={aadharUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Aadhar Card")}
                    //onChange={(info) => handleFileUpload(info, index)} 
                  //  onChange={(props) => handleUpload(props)}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {/* {aadharUploadFiles.name} */}
                        {/* {uploadFiles?.map((files, index) => (
                        files ? (
                       <div key={index}>
                            {files.DocumentName}
                            </div>
                        ) : null
                        ))} */}
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Copy of Bank  Passbook</td>
              <td>
              <Upload 
                   {...uploadProps} 
              fileList={passportUploadFiles}
                 
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Passport")}
                    //onChange={(info) => handleFileUpload(info, index)} 
                  //  onChange={(props) => handleUpload(props)}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {/* {passportUploadFiles.name} */}
              </td>
            </tr>
            {/* <tr>
              <td>3</td>
              <td>Copy of Ration Card</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Ration Card")}
                    
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {rationCardUploadFiles.name}
              </td>
            </tr> */}
            {/* <tr>
              <td>4</td>
              <td>Copy of Driving License</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Driving License")}
                    
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {DrivingUploadFiles.name}
              </td>
            </tr> */}
          </table>

          <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleOk()}
            >
              Ok
            </Button>
          </div>
        </div>
      </Modal>

      {showAlert && (
        <PopupAlert
          alertData={alertData}
          getAdvance={props.getAdvance}
          title={alertTitle}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}

    </>
  );
};

const mapStateToProps = ({ state, policyDetails, user }) => {
  return { data: state?.PolicyDetailsReducer?.policyDetailsObj, policyDetails };
};

export default connect(mapStateToProps)(BankDetails);


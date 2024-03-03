import React, { useState, useEffect, useRef } from "react";
import {useSelector } from "react-redux";
import { ChequeRepresentationData } from "../../mainconfig";
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
  Input
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import ContactForm from "../../utils/ContactForm";
import UploadIcon from "../../assets/images/upload.png";
import dayjs from "dayjs";
import CloseIcon from "../../assets/images/close-icon.png";

const ChequeRepresentation = (props) => {
  const [form] = Form.useForm();
  const loginInfo = useSelector(state => state);
  const { selectedCallType, selectedSubType, customerData,details,setSelectedSubType,typesForm,processNameLU,POSContactData } = props;
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
  const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
const [requirementModalLoader, setRequirementLoader] = useState(false);
const [validateBtnDisable, setValidateBtnDisable] = useState(false);
const [sendOTPTo,setSendOTPTo] = useState(null);
const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
const [serviceRequestId, setServiceRequestId] = useState(null);
const [paymentMethodList,setPaymentMethodList] = useState([]);
const [uploadFiles,setUploadFiles] = useState([]);
const [isSelectionMode,setIsSelectionMode] = useState(null);
const [isChequeNumber, setIsChequeNumber] = useState(null);
const [isShowChequeNoFields,setIsShowChequeNoFields] = useState(false);
const [latestPayment,setLatestPayment] = useState("");
  const suffix = <img src={UploadIcon} alt="" />;
  
  const shouldLog = useRef(true);
// useEffect(()=>{
  
//     //getPaymentDetails();
// },[selectedSubType])

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

  const onBlurInput =(value,item)=>{
    
    if(item.label === 'Cheque Number'){
      getPaymentDetails(value)
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

        let obj = {
          clientNumber:  customerData?.poClientID
        
    };
    let response = apiCalls.getClientEnquiry(obj);
    response
      .then((val) => {
        if (val?.data) {
          //setClientEnquiryData(val?.data?.responseBody);
          const res = val?.data?.responseBody;
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

  const getPaymentDetails = (chequeNo)=>{
    
    setIsLoading(true);
    setIsShowChequeNoFields(false);
    setShowAlert(false);
    let response = apiCalls.GetPaymentDetails(details?.policyDetailsObj?.identifiers?.applicationNo);
    response
      .then((val) => {
        if (val?.data) {
          // const sortedData = [...val?.data?.responseBody?.paymentDetails];
          // sortedData.sort((a, b) => {
          //   return new Date(b.paymentdate) - new Date(a.paymentdate);
          // });
          // const latestPayment = sortedData[0];
          // //setLatestPaymentDate(new Date(latestPayment.paymentdate));
          // const eightyDaysLater = convertDate(latestPayment.paymentdate);
          // eightyDaysLater.setDate(latestPayment.paymentdate.getDate() + 80);
          // //setEightiethDayDate(eightyDaysLater);
          //const latestPayment = val?.data?.responseBody?.paymentDetails[0];
          //setIsChequeNumber(latestPayment?.instrumentno)
            val?.data?.responseBody?.paymentDetails?.forEach(ele => {
              if(chequeNo===ele?.instrumentno&&ele?.paycode?.includes("Cheque")){
                setIsChequeNumber(true);
                setIsShowChequeNoFields(true);
                setLatestPayment(ele);
                const latestPayment = ele;
                if (latestPayment && latestPayment.paymentdate) {
                  // Assuming convertDate is a function that converts the date to a valid format
                  const paymentDate = new Date(convertDate2(latestPayment.paymentdate));
                  
                  // Adding 80 days to the payment date
                  paymentDate.setDate(paymentDate.getDate() + 80);
                  
                  // Formatting the result to DD/MM/YYYY format
                  const day = paymentDate.getDate().toString().padStart(2, '0');
                  const month = (paymentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-indexed
                  const year = paymentDate.getFullYear();
                  form.setFieldsValue({
                    ChequeExpiryDate: `${day}/${month}/${year}`
                  })
                }
                form.setFieldsValue({
                  //ChequeNumber: latestPayment?.instrumentno,
                  ReceiptNumber: latestPayment?.receiptno,
                  ChequeAmount: latestPayment?.paymentamount ? latestPayment?.paymentamount?.toLocaleString() : latestPayment?.paymentamount,
                  ChequeDate: convertDate(latestPayment?.instrumentdate),
                  ChequeBounceReason: latestPayment?.chequebounce,
                  ChequeDrawnOnBankName: latestPayment?.bankname,
                
                  //ChequeExpiryDate: latestPayment?.paymentdate? new Date(convertDate(latestPayment?.paymentdate)).getDate() + 80: "",
                });
              }
              else if(!ele?.paycode?.includes("Cheque")){
              setAlertData(`No Records Found`);
              setShowAlert(true);
              }
            })

            // if(isChequeNumber){
            //   //const latestPayment = ele;
            //   if (latestPayment && latestPayment.paymentdate) {
            //     // Assuming convertDate is a function that converts the date to a valid format
            //     const paymentDate = new Date(convertDate(latestPayment.paymentdate));
                
            //     // Adding 80 days to the payment date
            //     paymentDate.setDate(paymentDate.getDate() + 80);
                
            //     // Formatting the result to DD/MM/YYYY format
            //     const day = paymentDate.getDate().toString().padStart(2, '0');
            //     const month = (paymentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-indexed
            //     const year = paymentDate.getFullYear();
            //     form.setFieldsValue({
            //       ChequeExpiryDate: `${day}/${month}/${year}`
            //     })
            //   }
            //   form.setFieldsValue({
            //     //ChequeNumber: latestPayment?.instrumentno,
            //     ReceiptNumber: latestPayment?.receiptno,
            //     ChequeAmount: latestPayment?.paymentamount ? latestPayment?.paymentamount?.toLocaleString() : latestPayment?.paymentamount,
            //     ChequeDate: convertDate(latestPayment?.instrumentdate),
            //     ChequeBounceReason: latestPayment?.chequebounce,
            //     ChequeDrawnOnBankName: latestPayment?.bankname,
              
            //     //ChequeExpiryDate: latestPayment?.paymentdate? new Date(convertDate(latestPayment?.paymentdate)).getDate() + 80: "",
            //   });
            // }
            // else {
            //   setAlertData(`No Records Found`);
            //   setShowAlert(true);
            // }
       
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
    if(item?.label?.includes("Receipt Type")){
      let selectDropDownValue = e ||null;
      setSelectedSubType(e);
      props?.setSelectedSubTypeId(selectDropDownValue==="newbusiness"?1:2);
      typesForm?.setFieldsValue({subType: selectDropDownValue==="newbusiness"?"New Business":"Renewal"})
    }
  }

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const convertDate2 = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYDDMM").format("DD/MM/YYYY");
    return formattedDate;
  };
  const handleDateChange = (date, item) => {
    if (item === "branchreceivedate" || item.name === "branchreceivedate") {
      setShowReasonDelayField(false);
      const formFeilds = form.getFieldsValue()
      let customerSignDate = moment(formFeilds?.customersigningdate + 1).format("DD/MM/YYYY");
      let newDate = new Date();
      let todayDate = moment(newDate).format("DD/MM/YYYY");
      let selectDate = moment(date + 1).format("DD/MM/YYYY");
      
      if(selectDate < customerSignDate){
        message.destroy();
        message.error({
          content: "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
      return;
      }
        ChequeRepresentationData[selectedSubType]?.RequestForm_Fields?.forEach(element => {
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
        { Status: "Create", TagName: "ReceiptType", TagValue: values.ReceiptType || "" },
        { Status: "Create", TagName: "ReceiptNumber", TagValue: values.ReceiptNumber || "" },
        { Status: "Create", TagName: "ChequeBounceReason", TagValue: values.ChequeBounceReason || "" },
        { Status: "Create", TagName: "ChequeReceivedAtHO", TagValue: values.ChequeReceivedAtHO || "" },
        { Status: "Create", TagName: "ChequeNumber", TagValue: values.ChequeNumber || "" },
        { Status: "Create", TagName: "ChequeAmount", TagValue: values.ChequeAmount || "" },
        { Status: "Create", TagName: "ChequeDate", TagValue: values.ChequeDate || "" },
        { Status: "Create", TagName: "ChequeExpiryDate", TagValue: values.ChequeExpiryDate || "" },
        { Status: "Create", TagName: "ChequeDrawnOnBankName", TagValue: values.ChequeDrawnOnBankName || "" },
        { Status: "Create", TagName: "ChequeRepresentationRequestDate", TagValue: values.ChequeRepresentationRequestDate || "" },
        { Status: "Create", TagName: "ReasonFor_Representation", TagValue: values.ReasonFor_Representation || "" },
        { Status: "Create", TagName: "Comments", TagValue: values.Comments || "" },
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
    //setIsShowPOSScreen(!isShowPOSScreen);
    // if(!showEmailFields){
    //   message.destroy()
    //   message.warning({
    //     content:
    //       "Please select atleast one communication.",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }
    setIsLoading(true);
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
      RequestDateTime: new Date(),
      ReasonDelayed: values.resonfordelay,
      CustSignDateTime: values?.customersigningdate
      ? new Date(values?.customersigningdate)
      : new Date(),
      "TransactionData": getTransactionData(values),
      "Uploads": [
        
      ],
      CommunicationRequest: getSelectedCommunications() || [],
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
  };

  const handleRadioChange =(e,item)=>{
    let selectionValue = e.target.value;
      //  if(selectionValue === "no"&&item?.label?.includes("Validate Signature")){
      //   setShowRaiseRequirementBtn(true);
      // }
      // else if(selectionValue === "yes"&&item?.label?.includes("Validate Signature")){
      //   setShowRaiseRequirementBtn(false);
      // }
      if (e.target.value === "otp") {
        setCounter(0);
        setIsModalOpen(true);
        setIsShowTransferFields(true);
        setIsShowRequestFormFields(false);
        setValidateOTPSuccess(false);
      } else if(e.target.value === "requestform"){
        setCounter(0);
        setIsModalOpen(false);
        setIsShowRequestFormFields(true);
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
    if((formData.customerchoice ===  "requestform" ) || (selectedSubType === "addresschange" )){
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
      Role:isShowPOSScreen ? 0:1
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
            data={ChequeRepresentationData[selectedSubType]?.[formType]}
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
              {renderDetailsForm("BOE_Details")}
              {isShowChequeNoFields&&<>
                {renderDetailsForm("CheckNumber_Fields")}
              {isShowRequestFormFields&&<>
              {renderDetailsForm("RequestForm_Fields")}
              </>}
              {renderDetailsForm("Comments")}
              </>}
          </>}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
            {renderDetailsForm("POS_RequestDetails")}
            {renderDetailsForm("POS_Action")}
          </>}
         
           {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          
          {(isShowChequeNoFields||isShowPOSScreen)&&<>
          <div className="contact-details-btn">
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
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
            ):
            (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )
          }
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
        title="OTP Verification"
        open={isModalOpen}
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
            onChange={(e) => {
              handleOTPChange(e);
            }}
          />
          {counter > 0 && (
            <>
              <p className="time-count">Resend OTP in {counter} sec</p>
            </>
          )}
          {counter <= 0 && (
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
              disabled={counter > 0}
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
    </>
  );
};

export default ChequeRepresentation;

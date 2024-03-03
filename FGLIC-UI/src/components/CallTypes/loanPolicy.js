import React, { useState,useEffect } from "react";
import { Data } from "../../mainconfig";
import PopupAlert from "../popupAlert";
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import DetailsForm from "../../utils/DetailsForm";
import CloseIcon from "../../assets/images/close-icon.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
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
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";

import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";

const LoanPolicy = (props) => {
  dayjs.extend(customParseFormat);
  const loginInfo = useSelector(state => state);
  
  const [form] = Form.useForm();
  const CheckboxGroup = Checkbox.Group;
  const { selectedCallType, selectedSubType, customerData, details, policyDetails,POSContactData } = props;
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [existingLoanCheck, setExistingLoanCheck] = useState(false);
  const [eligibleLoanCheck, setEligibleLoanCheck] = useState(false);
  const [shareProcessCheck, setShareProcessCheck] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [collapsePOSDocuments,setCollapsePOSDocuments]  = useState(false);
  const [collapsePOSBankDetails,setCollapsePOSBankDetails] = useState(false);
  const [showReasonDelayField,setShowReasonDelayField] = useState(false);
  const [collapsePOSAction,setCollapsePOSAction] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
  const suffix = <img src={UploadIcon} alt="" />;
  const [isLoader, setIsLoader] = useState(false);
  const [loanEnquiryData, setLoanEnquiryData] = useState({});
  const [loanStatementData, setLoanStatementData] = useState({});
  const [AssigneeEnquiryData, setAssigneeEnquiryData] = useState({});
  const [ttpayamt, setTtpayamt] = useState();
  const [mostRecentDt, setMostRecentDt] = useState();
  const [checkedValue, setCheckedValue] = useState();
  const [surrenderEnquiry, setSurrenderEnquiryD] = useState({});
  const [totalSurrenderAmount,setTotalSurrenderAmount] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [takenLoans, settakenLoans] = useState();
  const [UpdateState, setUpdateState] = useState(false);
  const [raiseRequirementOpen,setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [PennyDropResponse,setPennyDropResponse] = useState({});
  const [isPOSManageScreen,setIsPOSManageScreen] = useState(false);
  const [clickedButton, setClickedButton] = useState("");
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [activecommuType, setActivecommuType] = useState()
  const [clientEnquiryData,setClientEnquiryData] = useState({})
  const [CNFBankAccNo, setCNFBankAccNo] = useState("");
  const [BankAccNo, setBankAccNo] = useState("");

  const [showBankDeDupeModal,setShowBankDeDupeModal] = useState(false);
  const [SignListModal,setSignListModal] = useState(false);
  const [negativeListModal,setNegativeModal] = useState(false);
const [MaxLoanElg, setMaxLoanElg] =  useState("");
    
  const [BankduDupeData,setBankDeDupeData] = useState([]);
  const [negativeList,setNegativeList] = useState([]);
  const [signatureDeDupeData,setSignatureDeDupeData] = useState([]);


  const [isProcessLinks,setIsProcessLinks] = useState([]); 
  const [isDocLinks,setIsDocLinks] = useState([]);
  const [isSelectedProcessName,setIsSelectedProcessName] = useState("");
  const [isLoanChecking,setIsLoanChecking] = useState(false);

  const [inputValues, setInputValues] = useState({
    isShowSMSInput: false,
    isShowWhatsAppInput: false,
    isShowEmailInput: false,
  });
  const [uploadFiles,setUploadFiles] = useState([]);
  const [isLoansAvailable,setIsLoansAvailable] = useState(null);
  
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);

  const posScreenObj = {
    ReasonForDelay:'',
    MaxLoanEligible:'',
    LoanValueRequested:'',
    NoOfTimesLoanTakenInThePolicy:'',
    BranchReceivedDate:'',
    CustomerSigningDate:'',
    // ReasonForDelay:POSContactData?.reasonDelayed,
    NameAsMentionedInTheBank:'',
    BankIFSC:'',
    BankAccountNumber:'',
    ConfirmBankAccountNumber:'',
    BankName:'',
    InitiatePennyDrop:'',
    validatesignature:'yes',
    PayableAmount:'',
    Comments:''
  }
  useEffect(()=>{


    if (POSContactData && customerData?.isPOS) {
      //setDeDupeData(POSContactData?.deDupPayload[0]?.deDupPayload);
      if(loggedUser?.role === 'posmanager'){
        setIsPOSManageScreen(true)
        // setIsShowPOSScreen(true)
        Data[selectedSubType]?.POS_Manger_Details?.forEach((item, index) => {
          if (POSContactData?.reasonDelayed  && item?.name ==="ResonForDelay") {
            item.hide = false;
            setShowReasonDelayField(true);
          }
        })
     }else{
      if(selectedSubType==="loanrequest")
      setIsShowPOSScreen(true);
     }


     if(POSContactData?.deDupPayload?.length > 0){
      for (let index in POSContactData?.deDupPayload){
       if(POSContactData?.deDupPayload[index]?.type ==='BANK') {
         setBankDeDupeData(POSContactData?.deDupPayload[index]?.deDupPayload);
       }
       if(POSContactData?.deDupPayload[index]?.type ==='NEGATIVELIST') {
         setNegativeList(POSContactData?.deDupPayload[index]?.deDupPayload)
       }
        if(POSContactData?.deDupPayload[index]?.type ==='SIGNATURE') {
         setSignatureDeDupeData(POSContactData?.deDupPayload[index]?.deDupPayload);
       }
      }
     }

      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        posScreenObj[element.tagName] = element.tagValue
      });

      Data[selectedSubType]?.POS_Details?.forEach((item, index) => {
        if (POSContactData?.reasonDelayed  && item?.name ==="ReasonForDelay") {
          item.hide = false;
          setShowReasonDelayField(true);
        }
        if (!posScreenObj?.CustomerSigningDate  && item?.name ==="CustomerSigningDate") {
          item.hide = true;
        }
      });


      form.setFieldsValue({
        MaxLoanEligible:posScreenObj.MaxLoanEligible,
        LoanValueRequested:posScreenObj?.PayableAmount,
        NoOfTimesLoanTakenInThePolicy:posScreenObj.NoOfTimesLoanTakenInThePolicy,
        BranchReceivedDate: posScreenObj?.BranchReceivedDate ? convertDate2(posScreenObj?.BranchReceivedDate) : '', 
        CustomerSigningDate: posScreenObj?.CustomerSigningDate ? convertDate2(posScreenObj?.CustomerSigningDate) : '', 
        ReasonForDelay: posScreenObj.ReasonForDelay,
        NameAsMentionedInTheBank:posScreenObj.NameAsMentionedInTheBank,
        BankIFSC:posScreenObj.BankIFSC,
        BankAccountNumber:posScreenObj.BankAccountNumber,
        ConfirmBankAccountNumber:posScreenObj.ConfirmBankAccountNumber,
        BankName:posScreenObj.BankName,
        InitiatePennyDrop:posScreenObj.InitiatePennyDrop,
        validatesignature:posScreenObj.validatesignature,
        ViewFinalPayableAmount:posScreenObj?.PayableAmount,
        ChangeInLast60Days:POSContactData?.personalChange,
        PolicyLoggedLast:POSContactData?.policyLogged,
        BranchRemarks:posScreenObj.Comments,
      })
    }else{
      if(selectedSubType ==='loanrequest'){
        LoanStatement();
        LoanEnquiry();
     
      }else if(!POSContactData){
        getProcesLink();
        getProcesDocLnk();
      }
 
    }

    // Data[selectedSubType]?.View_Documents?.forEach((item, index) => {
   
    //   if (new Date(formFeilds.BranchReceivedDate) < new Date()&&item?.name?.includes("ResonForDelay")) {
    //     item.hide = true;
    //   }
    // });

  },[])
  const formFeilds = form.getFieldsValue()
  const getUploadFiles=(listOfUploadFiles)=>{
    const updatedUploadList = listOfUploadFiles?.map((obj) => {
      // Create a new object without the propertyToDelete property
      const { labelName, ...newObject } = obj;
      return newObject;
    });
    // Update the state with the new list
    setUploadFiles(updatedUploadList);

  }



  const getExistPANNumber = async () => {
    setShowAlert(false);
    try {
      const response = await apiCalls.getExistPANNumber(customerData?.poClientID);
      if (response?.data) {
        const res = response?.data?.responseBody;
         if(res?.zpanidno){
          getCheckPANdetails(res?.zpanidno);
          // LoanStatement();
          form.setFieldsValue({
            PANNumber: res?.zpanidno
          })
         }else{
          setAlertData(`Kindly Update PAN Number`);
          setShowAlert(true);
          setNavigateTo("/advancesearch");
         }
      } else {
        handleError(response?.data?.responseBody?.errormessage || "Something went wrong, please try again!");
        setAlertData(`Kindly Update PAN Number`);
          setShowAlert(true);
          setNavigateTo("/advancesearch");
      }
    } catch (error) {
      handleError("Something went wrong, please try again!");
      setAlertData(`Kindly Update PAN Number`);
      setShowAlert(true);
      setNavigateTo("/advancesearch");
    }
  };


  const handleError = (errorMessage) => {
    message.error({
      content: errorMessage,
      className: "custom-msg",
      duration: 2,
    });
  };
  

  const getDocLink = () => {
    const filteredLinks = isDocLinks?.filter((item) => item.docType?.includes("Loan"));
    // Assuming you want to return an array of links, you can use map
    const links = filteredLinks?.map((item) => item.link);
    return links?.length>0 ? links[0] : "";
}
const getProcessLink = () => {
  const filteredLinks = isProcessLinks?.filter((item) => item.docType?.includes("Loan"));
  const links = filteredLinks?.map((item) => item.link);
  return links?.length>0 ? links[0] : "";
}

  const getProcesDocLnk = () => {
    setIsDocLinks([]);
    let obj = {
      "Call_Typ" : null,
      "Sub_Typ" :null,
      "ProdType" : policyDetails?.policyDetailsObj?.planAndStatus?.productType,
      "ProdCode": policyDetails?.policyDetailsObj?.planAndStatus?.planCode,
       "ProdUIN": policyDetails?.policyDetailsObj?.planAndStatus?.productUIN,
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
      "Call_Typ" : props?.selectedCallType,
      "Sub_Typ":props?.selectedSubTypeId
 
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




  const handleSubmit = (values, ) => {
   //POSApprove RaiseRequirement
   if (POSContactData && customerData?.isPOS) {
       if (clickedButton === "RaiseRequirement") {
        
         getRaiseRequirements()
         // POSActionsOnContactDetails(values, "REJECTED");
       } else if (clickedButton === "POSApprove") {
         POSActionsOnContactDetails(null, "APPROVED");
       }
   
   } else {
      if(clickedButton === "RaiseRequirement"){
        getRaiseRequirements();
        // saveRequest(values);
      }
    //  if (values.ValidateSignature === "no") {
    //    getRaiseRequirements();
    //  } else {
      // saveRequest(values);
     //}
   }
  
 
 
 }

 

  const saveRequest = (values) => {
    setShowAlert(false);
    setIsLoader(true);
    // if(selectedSubType==="loanrequest")setIsShowPOSScreen(!isShowPOSScreen);
    
    let obj = {
      "CallType": props?.selectedCallType,
      "SubType": props?.selectedSubTypeId,
      "Category": (selectedSubType ==='loanrequest' || checkedValue ==='shareprocess') ? 2:1,
      "RequestSource": 1,
      "RequestChannel": 3,
      "ApplicationNo":  policyDetails?.policyDetailsObj?.identifiers?.applicationNo,
      "PolicyNo": policyDetails?.policyDetailsObj?.identifiers?.policyNo,
      "CustomerId": customerData?.laClientID,
      "CustRole": 1,
      "proposerName":policyDetails?.policyDetailsObj?.identifiers?.po_Name,
      "policyStatus": policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus,
      "plan": policyDetails?.policyDetailsObj?.planAndStatus?.planName,
      "DOB": convertDate(customerData?.dob),
      "CreatedOn":  new Date(),
      "CreatedByRef": loginInfo?.userProfileInfo?.profileObj?.name,
      "ModifiedOn": new Date(),
      "ModifiedByRef": "Test123",
      "AssignedToRole": "",
      "AssignedByUser": 0,
      "ReasonForChange": "",
      "RequestDateTime": values?.BranchReceivedDate
      ? new Date(values?.BranchReceivedDate)
      : new Date(),
      "ReasonDelayed": values?.ReasonForDelay,
      "CustSignDateTime":values?.CustomerSigningDate
      ? new Date(values?.CustomerSigningDate)
      : new Date(),

      "TransactionData": [
      
      ],
      Uploads: uploadFiles,
      "CommunicationRequest": [
          {
              "SrvReqRefNo": "",
              "TemplateID": "",
              "CommType": 2, // Use the integer value corresponding to the CommType enum (1 for SMS, 2 for EMAIL, 3 for WHATSAPP)
              "ReceipientTo": "Venkatakrishna.b@nichebit.com",
              "ReceipientCC": "RecipientCCValue2",
              "MobileNos": "",
              "ScheduledTime": "2023-10-31T10:30:00", // Use a valid date-time format
              "CommBody": "", // Payment Link nothing to required
              "Attachments": null
          },
          // {
          //     "SrvReqRefNo": "",
          //     "TemplateID": "",
          //     "CommType": 1, // Use the integer value corresponding to the CommType enum (1 for SMS, 2 for EMAIL, 3 for WHATSAPP)
          //     "ReceipientTo": "Venkatakrishna.b@nichebit.com",
          //     "ReceipientCC": "RecipientCCValue2",
          //     "MobileNos": "8143814905",
          //     "ScheduledTime": "2023-10-31T10:30:00", // Use a valid date-time format
          //     "CommBody": "", // Payment Link nothing to required
          //     "Attachments": null
          // }
      ]
  }


  if(checkedValue ==='ExistingLoanDetails'){
    obj.TransactionData.push({
      "Status": "Create",
      "TagName": "EnquiryType",
      "TagValue": "ExistingLoanDetails"
  },
  {
      "Status": "Create",
      "TagName": "LoanDisbursed",
      "TagValue": formFeilds.LoanDisbursed
  },
  {
      "Status": "Create",
      "TagName": "LoanInterest",
      "TagValue": formFeilds.LoanInterest
  },
  {
      "Status": "Create",
      "TagName": "OriginalLoanAmount",
      "TagValue": formFeilds.OriginalLoanAmount
  },
  {
      "Status": "Create",
      "TagName": "TotalLoanInterest",
      "TagValue": formFeilds.TotalLoanInterest
  },
  {
      "Status": "Create",
      "TagName": "TotalLoanAmountRepaid",
      "TagValue": formFeilds.TotalLoanAmountRepaid
  },
  {
      "Status": "Create",
      "TagName": "LoanOutstanding",
      "TagValue": formFeilds.LoanOutstanding
  },
  {
      "Status": "Create",
      "TagName": "LastLoanRepaidDate",
      "TagValue": formFeilds.LastLoanRepaidDate
  },
  {
      "Status": "Create",
      "TagName": "PolicyAssignedTo",
      "TagValue": formFeilds.PolicyAssignedTo
  },
  {
      "Status": "Create",
      "TagName": "PolicyBondSubmitted",
      "TagValue": formFeilds.PolicyBondSubmitted
  })

  }else if(checkedValue ==='EligibleLoanDetails'){
    obj.TransactionData.push(     {
      "Status": "Create",
      "TagName": "EnquiryType",
      "TagValue": "EligibleLoanDetails"
  },
  {
      "Status": "Create",
      "TagName": "LoanApplicable",
      "TagValue": formFeilds.LoanApplicable
  },
  {
    "Status": "Create",
    "TagName": "LoanPercent",
    "TagValue": formFeilds.LoanPercent
},
  // {
  //     "Status": "Create",
  //     "TagName": "SurrenderValue",
  //     "TagValue": formFeilds.SurrenderValue
  // },
  {
      "Status": "Create",
      "TagName": "MaxLoanvalue",
      "TagValue": formFeilds.MaxLoanvalue
  },
  {
      "Status": "Create",
      "TagName": "LoanValueDate",
      "TagValue": formFeilds.LoanValueDate
  },
  {
      "Status": "Create",
      "TagName": "PayableAmount",
      "TagValue": formFeilds.LoanValueRequested
  },
  {
      "Status": "Create",
      "TagName": "NoOfTimesLoanTakenInThePolicy",
      "TagValue": formFeilds.NoOfTimesLoanTakenInThePolicy
  })
  }else if(checkedValue ==='shareprocess'){
    obj.TransactionData.push(
      {
        "Status": "Create",
        "TagName": "EnquiryType",
        "TagValue": "ShareProcess"
    },{
      "Status": "Create",
      "TagName": "Template",
      "TagValue": "LOANSTMTEMAILER"
  },
    {
      "Status": "Create",
      "TagName": "LoanFileType",
      "TagValue": activecommuType
  },
  { Status: "Create", TagName: "DocLink", TagValue: getDocLink() || ""},
        { Status: "Create", TagName: "ProcessLink", TagValue: getProcessLink() || ""},

     )
  }
  else if(selectedSubType ==='loanrequest'){
    obj.TransactionData.push(  
      
      {
        "Status": "Create",
        "TagName": "CKYCNumber",
        "TagValue": customerData?.CKYCNumber || ""
      },
      {
        "Status": "Create",
        "TagName": "POName",
        "TagValue": customerData?.poName || ""
      },
      {
        "Status": "Create",
        "TagName": "ProductType",
        "TagValue": policyDetails?.policyDetailsObj?.planAndStatus?.productType || ""

      },
      {
        "Status": "Create",
        "TagName": "RCD",
        "TagValue": convertDate(policyDetails?.policyDetailsObj?.saDetails?.rcd)
      },
      {
        "Status": "Create",
        "TagName": "APE",
        "TagValue": customerData?.premiumAmt || ""
      },  
      {
        "Status": "Create",
        "TagName": "MaxLoanEligible",
        "TagValue": formFeilds.MaxLoanEligible || ""
    },
    {
        "Status": "Create",
        "TagName": "PayableAmount",
        "TagValue": formFeilds.LoanValueRequested || ""
    },
    {
        "Status": "Create",
        "TagName": "NoOfTimesLoanTakenInThePolicy",
        "TagValue": formFeilds.NoOfTimesLoanTakenInThePolicy || ""
    },
    {
        "Status": "Create",
        "TagName": "PANNumber",
        "TagValue":formFeilds.PANNumber || ""
    },
    {
        "Status": "Create",
        "TagName": "CustomerSigningDate",
        "TagValue": formFeilds.CustomerSigningDate || ""
    },
    {
        "Status": "Create",
        "TagName": "BranchReceivedDate",
        "TagValue": formFeilds.BranchReceivedDate ? new Date(formFeilds.BranchReceivedDate):''
    },
    {
      "Status": "Create",
      "TagName": "ValidatedBy",
      "TagValue": 'form'
    },
    {
        "Status": "Create",
        "TagName": "ValidateSignature",
        "TagValue":formFeilds.ValidateSignature
    },
    {
        "Status": "Create",
        "TagName": "NameAsMentionedInTheBank",
        "TagValue": formFeilds.NameAsMentionedInTheBank
    },
    {
        "Status": "Create",
        "TagName": "BankIFSC",
        "TagValue": formFeilds.BankIFSC
    },
    {
        "Status": "Create",
        "TagName": "BankAccountNumber",
        "TagValue": BankAccNo
    },
    {
        "Status": "Create",
        "TagName": "ConfirmBankAccountNumber",
        "TagValue": CNFBankAccNo
    },
    {
        "Status": "Create",
        "TagName": "BankName",
        "TagValue": formFeilds.BankName
    }, {
      "Status": "Create",
      "TagName": "InitiatePennyDrop",
      "TagValue": formFeilds.InitiatePennyDrop
  },{
    "Status": "Create",
    "TagName": "ReasonForDelay",
    "TagValue": formFeilds.ReasonForDelay
},{
  "Status": "Create",
  "TagName": "Comments",
  "TagValue": formFeilds.Comments
}
    
    )
  }
  

  // if(formFeilds.ValidateSignature === 'no'){
    let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
  
    obj.TransactionData.push({
      "Status": "Create",
      "TagName": "ReasonList_Key",
      "TagValue":  JSON.stringify(ids)
    })
  // }



  let response = apiCalls.genericAPI(obj);
  response
    .then((val) => {
      if (val?.data) {
        setIsLoader(false);
        setAlertTitle(`Request Created Successfully`);
        let successMessage = val?.data?.tat > 0 ? 
            `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat||0} days`
            : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
            setAlertData(successMessage);
       setShowAlert(true);
       setNavigateTo("/advancesearch");
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



  };




  const getRaiseRequirements = () => {
    const formData = form.getFieldValue();
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: 1,
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
  
  
  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    setRequirementLoader(true);

    let seletedRequerimentList = raiseRequerimentList
    ?.filter((e) => e.status === true)
    ?.map((e) => e.raiseReqId);
    if(seletedRequerimentList.length===0 ){
      setIsLoader(false);
      setRequirementLoader(false);
      message.destroy();
      message.error({
        content: "Please Select Documents to Reject",
        className: "custom-msg",
        duration: 3,
      });

    }
    
     else{
      saveRequest(formData);
     }

    // if(formData.ValidateSignature === 'no'){
     
    // }else{
      // POSActionsOnContactDetails(null, "REJECTED");
    // }
    
  };


  const POSActionsOnContactDetails = (val, status) => {
    const values = form.getFieldsValue();
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
      SrvReqRefNo: POSContactData?.srvReqRefNo,
      Status: status,
      RequirementList: seletedRequerimentList,
      // "RequirementComments":requirementCmnt,
      Comments: values?.Comments,
      TransactionPayload: [],
    };
    if(loggedUser?.role === 'posexecutive'){
      obj.TransactionPayload.push(
        {
          "Status": "Create",
          "TagName": "PaymentMode",
          "TagValue": values.paymentMode
      },
        {
          "Status": "Create",
          "TagName": "ChangeInLast60Days",
          "TagValue": values.ChangeInLast60Days
      },
      {
        "Status": "Create",
        "TagName": "PolicyLoggedLast",
        "TagValue": values.PolicyLoggedLast
    
    },{
      
        "Status": "Create",
        "TagName": "ViewFinalPayableAmount",
        "TagValue": values.ViewFinalPayableAmount
      },
      {
        "Status": "Create",
        "TagName": "InitiatePennyDropPOS",
        "TagValue": values.InitiatePennyDropPOS
      },
        )
    }
    if(loggedUser?.role === 'posmanager'){
  
      obj.TransactionPayload.push(
        {
          "Status": "Create",
          "TagName": "STPFailedReason",
          "TagValue": values.STPFailedReason
      },
      {
        "Status": "Create",
        "TagName": "Decision",
        "TagValue": values.Decision
    },
    {
      "Status": "Create",
      "TagName": "SendEmailtoCompliance",
      "TagValue": values.SendEmailtoCompliance
    },
    {
      "Status": "Create",
      "TagName": "BranchRemarks",
      "TagValue": values.BranchRemarks
    },
    
      )
    }

    let response = apiCalls.POSActionsOnContactDetails(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle(`${val?.data?.message}`);
     
          setNavigateTo("/dashboard");
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



  const InitiatePennyDropp = () => {
    const values = form.getFieldsValue();
    if(!values.BankAccountNumber || !values.NameAsMentionedInTheBank || !values.BankIFSC ){
      message.destroy();
      message.error({
        content:"Enter All Mandatory Feilds",
        className: "custom-msg",
        duration: 2,
      });
     return;
    }
    setIsLoader(true);
    let obj = {
        "accountNumber":BankAccNo,
        "accountHolderName":values.NameAsMentionedInTheBank,
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
        setIsLoader(false);
        if (result?.data) {
          
         if(result?.data?.statusCode === 101){
          Data[selectedSubType]?.View_Bank_Details?.forEach((item, index) => {
  
            if (item?.name ==="BankAccountProof") {
              item.required = false;
            }
          });
          setPennyDropResponse(result?.data)
          form.setFieldsValue({
            InitiatePennyDrop: result?.data?.result?.data?.source[0]?.data?.bankResponse,
            InitiatePennyDropPOS: result?.data?.result?.data?.source[0]?.data?.bankResponse,
          
          })
         }else{

          Data[selectedSubType]?.View_Bank_Details?.forEach((item, index) => {
  
            if (item?.name ==="BankAccountProof") {
              item.required = true;
            }
          });

          form.setFieldsValue({
            InitiatePennyDrop: result?.data?.statusMessage,
            InitiatePennyDropPOS: result?.data?.statusMessage,
          })
         }
          //SUCCESSFUL TRANSACTION
        } else {
          Data[selectedSubType]?.View_Bank_Details?.forEach((item, index) => {
  
            if (item?.name ==="BankAccountProof") {
              item.required = true;
            }
          });
          setIsLoader(false);
          form.setFieldsValue({
            InitiatePennyDrop: 'Invalid Input',
            InitiatePennyDropPOS:'Invalid Input',
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
        Data[selectedSubType]?.View_Bank_Details?.forEach((item, index) => {
  
          if (item?.name ==="BankAccountProof") {
            item.required = true;
          }
        });

        form.setFieldsValue({
          InitiatePennyDrop: 'Invalid Input',
          InitiatePennyDropPOS:'Invalid Input',
        })

        setIsLoader(false);
      });
  };


  const convertDate = (inputDate) => {
    if(inputDate){
      const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
      return formattedDate;
    }
return ''
  };

  const convertDate2=(inputDate)=>{
    
   if(inputDate){
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
   }
      return ''
   

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
  
  
  const CKYCC = ()=>{
    let values = form.getFieldsValue();

    setIsLoading(true);
    //CKYCNumber

    let response = apiCalls.CKYC(values?.CKYCNumber);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorcode!=="1") {
         // setClientEnquiryData(val?.data?.responseBody);
          const res = val?.data?.responseBody;
   
            form.setFieldsValue({
              // Name_New:res?.nameoncard,
              // PANRevalidationResult: res?.description,
              CKYCResult: res?.description,
              // PanAadharSeeding: res?.aadhaarSeedingStatus,
            })
          
         
          setIsLoading(false);
        } else {
      
          setIsLoading(false);
          form.setFieldsValue({
    
            CKYCResult: val?.data?.responseBody?.errormessage
   
          })
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



  const getCheckPANdetails = (val)=>{


    setIsLoading(true);
    //CKYCNumber

    let response = apiCalls.getCheckPANdetails(val);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorcode!=="1") {
          Data[selectedSubType]?.View_Documents?.forEach((item, index) => {
  
            if(item?.name ==="uploadPAN") {
              item.required = false;
            }
          });
         // setClientEnquiryData(val?.data?.responseBody);
          const res = val?.data?.responseBody;
          Data[selectedSubType]?.BOE_Details?.forEach((item, index) => {
            if(item?.name ==="NameinPAN") {
              item.hide = false;
            }
          })
            form.setFieldsValue({
              // Name_New:res?.nameoncard,
              // PANRevalidationResult: res?.description,
              PANResult: res?.description,
              NameinPAN: res?.firstName + " " + res?.middleName + " " + res?.lastName
              // PanAadharSeeding: res?.aadhaarSeedingStatus,
            })
            
         
          setIsLoading(false);
        } else {
      
          Data[selectedSubType]?.View_Documents?.forEach((item, index) => {
            if(item?.name ==="uploadPAN") {
              item.required = true;
              item.hide = false;
            }
          });

          setIsLoading(false);
          form.setFieldsValue({
    
            PANResult: val?.data?.responseBody?.errormessage
   
          })
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


  const onBlurInput = (value,item)=>{
    const obj = form.getFieldsValue(value);
    if(item.name === "BankIFSC" && value){
      getIFSCBankDetails(value);
    }
    // if(item.name === "PANNumber" && value.length ===10){
    //   getCheckPANdetails()
    // }

    if(item.name === "CKYCNumber"&& value.length ===14){
      CKYCC()
    }


    if(item.name === 'LoanValueRequested'  ){
       if((value && formFeilds.MaxLoanEligible  && (Number(value) > Number(formFeilds.MaxLoanEligible) )) || (value && value <=0) ){
        message.destroy();
        message.error({
          content:
            "Loan Value Requested Should Not Exceed Available Loan value",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({LoanValueRequested: ''})
  
       }

    }


    
    if(item.name === 'ConfirmBankAccountNumber'){
      setCNFBankAccNo(value)
     }else if(item.name === 'BankAccountNumber'){
       setBankAccNo(value)
     }
   
     if(formFeilds.ConfirmBankAccountNumber?.length >= 4 && item.name === 'ConfirmBankAccountNumber'){

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

      //  const lastFourDigits = formFeilds.ConfirmBankAccountNumber.slice(-4);
      //  const maskedString = '*'.repeat(formFeilds.ConfirmBankAccountNumber.length - 4) + lastFourDigits;
      //  form.setFieldsValue({ConfirmBankAccountNumber: maskedString});
     
    }else if(value?.length >= 4 &&  item.name === 'BankAccountNumber'){
      const lastFourDigits = obj.BankAccountNumber.slice(-4);
      const maskedString = '*'.repeat(obj.BankAccountNumber.length - 4) + lastFourDigits;
      form.setFieldsValue({BankAccountNumber: maskedString})
     }
 



  //   if(item.name === 'ConfirmBankAccountNumber' || item.name === 'BankAccountNumber'){
  //     if(formFeilds.ConfirmBankAccountNumber && formFeilds.BankAccountNumber && (formFeilds.ConfirmBankAccountNumber !== formFeilds.BankAccountNumber) ){
  //      message.destroy();
  //      message.error({
  //        content:
  //          "Bank Number Not matched",
  //        className: "custom-msg",
  //        duration: 2,
  //      });
  //      form.setFieldsValue({ConfirmBankAccountNumber: ''})
 
  //     }

  //  }

  }



  const surrenderEnquiryData = () => {
    setIsLoader(true);
    let obj = {
    "RequestHeader": {
        "source": "POS",
        "carrierCode": "2",
        "branch": "PRA",
        "userId": "rpandya",
        "userRole": "10",
        "monthEndExtension": "N",
        "meDate": "30/09/2023"
    },
    "RequestBody": {
      "policyNo": customerData?.policyNo,
        "effectiveDate": moment(new Date(), 'YYYYMMDD').format('YYYYMMDD'),
        "letterprintflag": "N"
    
}
    };
    let response = apiCalls.surrenderEnquiryData(obj);
    response
      .then((val) => {
        if (val?.data) {
          setSurrenderEnquiryD(val?.data?.responseBody);

          if(val?.data?.responseBody?.errorcode === '1'){
            setTotalSurrenderAmount(0);
            form.setFieldsValue({ SurrenderValue: 0 });
                if(val?.data?.responseBody?.errormessage){
                  setAlertTitle(val?.data?.responseBody?.errormessage );
                }else{
                  setAlertTitle('Unable to fetch Surrender Value');
                }
           
            // setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);
    
              // setNavigateTo("/advancesearch");
            
          
           setShowAlert(true);

        
          }else{

            let amount = Number(val?.data?.responseBody?.totalsurrendervalue).toLocaleString('en-IN');
            form.setFieldsValue({ SurrenderValue: amount });
            setTotalSurrenderAmount(amount);
           //form.setFieldsValue({ TotalSurrenderValue: amount });
          }
       
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
  };


  const GetAssigneeEnquiry  =()=>{
    setIsLoader(true);
    let obj = {
      
      "requestHeader": {
        "source": "POS",
        "carrierCode": "2",
        "branch": "PRA",
        "userId": "rpandya",
        "userRole": "10",
        "partnerId": "MSPOS",
        "processId": "POS",
        "monthendExtension": "N",
        "monthendDate": "09/11/2023"
        },
        "requestBody": {
        "policyNumber": customerData?.policyNo,
        }
        
    
    
  }
  
    let response = apiCalls.GetAssigneeEnquiry(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAssigneeEnquiryData(val?.data?.responseBody);
            let res = val?.data?.responseBody;

          form.setFieldsValue({
     
            PolicyAssignedTo:res?.assigneeName,
    
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
        setIsLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
      });
  }

  const LoanStatement  =()=>{
    setShowAlert(false);
    setIsLoader(true);
    let obj = {
      
        "RequestHeader": {
            "source": "POS",
            "carrierCode": "2",
            "branch": "pra",
            "userId": "website",
            "userRole": "10",
            "monthEndExtension": "N",
            "MonthendDate": "30/09/2023"
        },
        "RequestBody": {
            "policyNo": policyDetails?.policyDetailsObj?.identifiers?.policyNo
        
    }
    
    
  }
  
    let response = apiCalls.LoanStatement(obj);
    response
      .then((val) => {
        if (val?.data) {
          if(val?.data?.responseBody?.errorCode ==='1' ){
            form.setFieldsValue({
              LoanApplicable:'No'
            })
            setIsLoanChecking(true);
            // handleError(val?.data?.responseBody?.errormessage);

            setAlertTitle(`${val?.data?.responseBody?.errormessage}`);
     
            // setNavigateTo("/advancesearch");

            setShowAlert(true);
            return
          }
          getExistPANNumber();
          setLoanStatementData(val?.data?.responseBody);
          settakenLoans(val?.data?.responseBody?.listDetails.length)
          const ttpayamtt = val?.data?.responseBody?.listDetails.reduce((accumulator, currentValue) => {
            return accumulator + Number(currentValue?.ttpayamt);
          }, 0);
          setTtpayamt(ttpayamt)
        

          const mostRecentDtt = val?.data?.responseBody?.listDetails.reduce((mostRecent, current) => {
            const currentDate = new Date(current?.zldate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
            const mostRecentDate = new Date(mostRecent?.zldate || 0);
          
            return currentDate > mostRecentDate ? current : mostRecent;
          }, {});
          
          setMostRecentDt(mostRecentDt);

          form.setFieldsValue({
            LastLoanRepaidDate:mostRecentDtt?.zldate ? moment(mostRecentDtt?.zldate, "YYYYMMDD").format("DD/MM/YYYY"):null,
            TotalLoanAmountRepaid:ttpayamtt,
            // NoOfTimesLoanTakenInThePolicy:val?.data?.responseBody?.listDetails.length,
            
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
        setIsLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
      });
  }

  const LoanEnquiry =()=>{
    setShowAlert(false);
    setIsLoader(true);
    let obj = {
      
        "RequestHeader": {
            "source": "POS",
            "carrierCode": "2",
            "branch": "pra",
            "userId": "F1135010",
            "userRole": "10",
            "monthEndExtension": "N",
            "MonthendDate": "30/09/2023"
        },
        "RequestBody": {
            "policyNo": policyDetails?.policyDetailsObj?.identifiers?.policyNo
            
        
    }
    
  }
  setIsLoanChecking(false);
    let response = apiCalls.LoanEnquiry(obj);
    response
      .then((val) => {
        if (val?.data) {
          
          if(val?.data?.responseBody?.errorCode ==='1' ){
            form.setFieldsValue({
              LoanApplicable:'No'
            })
            setIsLoanChecking(true);

            setAlertTitle(`${val?.data?.responseBody?.errormessage}`);


            setShowAlert(true);

            return
          }
             

          setLoanEnquiryData(val?.data?.responseBody.loanEnquiryDetails);
            
          const res = val?.data?.responseBody.loanEnquiryDetails;
          const totalPrincipal = val?.data.responseBody.existingLoanDetails.reduce((acc, loan) => acc + parseFloat(loan.hprincipal), 0);
          const TotalLoanInterest = val?.data.responseBody.existingLoanDetails.reduce((acc, loan) => acc + (parseFloat(loan.hacrint)+parseFloat(loan.hpndint)), 0);
          setIsLoansAvailable(totalPrincipal);
          setMaxLoanElg(res?.loanallow);
          form.setFieldsValue({
        
            PolicyBondSubmitted:'',
            MaxLoanEligible:res?.loanallow,
            NoOfTimesLoanTakenInThePolicy:res?.numloans,
            LoanApplicable: Number(res?.loanallow) > 0 ? 'Yes': 'No',
            LoanPercent: res?.intanny,
            MaxLoanvalue:res?.loanallow? Number(res?.loanallow).toLocaleString('en-IN'): "",
            LoanValueDate:moment(new Date(), "YYYYMMDD").format("DD/MM/YYYY"),
            
          })
          setIsLoanChecking(Number(res?.loanallow) > 0 ? false : true)
          
          if(Number(res?.loanallow) > 0){
            
            Data[selectedSubType]?.Eligible_Loan_Details?.forEach((item, index) => {
              if (item?.name?.includes("MaxLoanvalue")) {
                item.disabled = true;
                item.required = false;
              }
              if (!item?.name?.includes("LoanApplicable")) {
                
                item.hide = false;
              }

            });
          }
            if(+res?.numloans > 0){
               GetAssigneeEnquiry();
              form.setFieldsValue({
                  
                 LoanDisbursed:res?.effdate ? moment(res?.effdate, "YYYYMMDD").format("DD/MM/YYYY"):null,
                LoanInterest:res?.intanny,
              OriginalLoanAmount:totalPrincipal,
            TotalLoanInterest:TotalLoanInterest.toFixed(2),
                 LoanOutstanding:res?.hpleamt,

              })

            }
       
         

         
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

  const ExistingLoanDetails = async ()=>{
    setIsLoader(true);
     await LoanEnquiry();
     //await LoanStatement();
     //await GetAssigneeEnquiry();
     setIsLoader(false);
     
  }
  

  const handleTitleCheckBox = (e, item) => {
    setCheckedValue(item.name)
    if(item.name==='ExistingLoanDetails'){
      setShowEmailFields(false);
  
      ExistingLoanDetails()
      // form.setFieldsValue({
      //   LoanDisbursed:moment(loanEnquiryData?.effdate, "YYYYMMDD").format("DD/MM/YYYY"),
      //   LoanInterest:loanEnquiryData?.intanny,
      //   OriginalLoanAmount:loanEnquiryData?.hprincipal,
      //   TotalLoanInterest:Number(loanEnquiryData?.hacrint) + Number(loanEnquiryData?.hpndint),
      //   TotalLoanAmountRepaid:ttpayamt,
      //   LoanOutstanding:loanEnquiryData?.hpleamt,
      //    LastLoanRepaidDate:moment(mostRecentDt?.zldate, "YYYYMMDD").format("DD/MM/YYYY"),
      //   PolicyAssignedTo:AssigneeEnquiryData?.assigneeName,
      //   PolicyBondSubmitted:''
      // })
    }else if(item.name==='EligibleLoanDetails'){
      setShowEmailFields(false);
      LoanStatement();
      LoanEnquiry();
      getClientEnquiry()
      // surrenderEnquiryData();
      // form.setFieldsValue({
      //   LoanApplicable: Number(loanEnquiryData?.loanallow) > 0 ? 'Yes': 'No',
      //   SurrenderValue:totalSurrenderAmount,
      //   MaxLoanvalue:loanEnquiryData?.loanallow,
      //   LoanValueDate:moment(new Date(), "YYYYMMDD").format("DD/MM/YYYY"),
      //   LoanValueRequested:'',
      //   NoOfTimesLoanTakenInThePolicy:takenLoans
      // })

    }else if(item.name==='shareprocess'){
      getClientEnquiry();
      setShareProcessCheck(e.target.checked);
      setChecked(true);
      //LoanEnquiry();
    }

    const newValue = checked ? false : true;
    setChecked(newValue);
    handleCheckboxChange(item, newValue);
  };
  const handleLabelLink =(item)=>{
    if(item.label === "Initiate Penny Drop"){
      InitiatePennyDropp();
    }
    if(item.name === "InitiatePennyDropPOS" &&  formFeilds.InitiatePennyDrop === 'Invalid Input'){
      InitiatePennyDropp();
    }

  }

  const handleDropdownChange =(e,item)=>{

  }

  const handleCheckboxChange = (item, newValue) => {
    setExistingLoanCheck(false);
    setEligibleLoanCheck(false);
    setShareProcessCheck(false);
    // Your logic to handle checkbox change goes here
    // For example, you can update the state based on the item and newValue
    // Update existingLoanCheck, eligibleLoanCheck, shareProcessCheck accordingly
    if (item.label?.includes('View Existing loan Details')) {
      setExistingLoanCheck(true);
      setChecked(true);
    } else if (item.label?.includes('View Eligible Loan Details')) {
      setEligibleLoanCheck(true);
      setChecked(true);
    } else if (item.label?.includes('Share Statement / Link')) {
      setShareProcessCheck(true);
      setChecked(true);
    }
  };
  const handleRadioChange = (e,item) => {

    setShowRaiseRequirementBtn(false);
  //  if((item?.label?.includes("Validate Signature")||item?.label?.includes("Signature Validated"))&&e.target.value==="no"){
  //   setShowRaiseRequirementBtn(true);
  //  }
 


  };
  const toggleInputField = (field, item, index) => {
    setActivecommuType(item?.name)
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
  const handleTextLink = (item) => {
    if(item.name ===  "BankAccountDeDupe" ){
      setShowBankDeDupeModal(true);
    }else if(item.name ===  "negavativeList"){
      setNegativeModal(true)
    }else if(item.name ===  "SignatureChange"){
      setSignListModal(true)
    }


    if(item.name ===  "surrenderForm" || item.name === 'policyBond'|| item.name === 'policyOwnerIDProof'|| item.name === 'policyOwneraddressProof'
     || item.name === 'policyOwnerAccProof'
    || item.name === 'pancard'){
      const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;
    
      window.open(url, '_blank');
    }

  };
  // const handleTitleCheckBox = (e, item) => {
  //   setExistingLoanCheck(false);
  //   setEligibleLoanCheck(false);
  //   setShareProcessCheck(false);
  //   if (item?.label?.includes("View Existing loan Details")) {
  //     setExistingLoanCheck(e.target.checked);
  //   } else if (item?.label?.includes("View Eligible Loan Details")) {
  //     setEligibleLoanCheck(e.target.checked);
  //   } else if (item?.label?.includes("Share Process Communication")) {
  //     setShareProcessCheck(e.target.checked);
  //   }
  // };

  const handleProposerCollapse =(e,label)=>{
    if(label?.toLowerCase().includes("documents")){
      if(e?.length>0){
        setCollapsePOSDocuments(true);
      } 
      else{setCollapsePOSDocuments(false);}
    }
   
  else if(label?.toLowerCase().includes("bankdetails")){
    if(e?.length>0){
      setCollapsePOSBankDetails(true);
    }
    else{setCollapsePOSBankDetails(false);}
  }
  else if(label?.toLowerCase().includes("viewpos")){
    if(e?.length>0){
      setCollapsePOSAction(true);
    }
    else{setCollapsePOSAction(false);}
  }
  }
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
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
        Data[selectedSubType]?.View_Documents?.forEach(element => {
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
      setUpdateState(!UpdateState)
    }
  };


  const getClientEnquiry = ()=>{
    setIsLoader(true);

        let obj = {
          clientNumber:  customerData?.poClientID
        
    };
    let response = apiCalls.getClientEnquiry(obj);
    response
      .then((val) => {
        if (val?.data) {
          setClientEnquiryData(val?.data?.responseBody);
          const res = val?.data?.responseBody;
        
          setData({...data, 
          'mobileNo': res?.rmblphone,
          'whatsAppNo':  res?.rmblphone,
          'emailId': res?.rinternet
        })
        form.setFieldsValue({
          'mobileNo': res?.rmblphone,
          'whatsAppNo':  res?.rmblphone,
          'emailId': res?.rinternet
        });

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


  const handleEdit = (val)=>{
    debugger

    if(val==='edit'){
      Data[selectedSubType]?.POS_Details?.forEach((item, index) => {
        if(item?.posEdit){
          item.disabled = false
        } 
        
      })
      
    }else if(val==='close'){
      Data[selectedSubType]?.POS_Details?.forEach((item, index) => {
        if(item?.posEdit){
          item.disabled = true
        } 
      })
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        posScreenObj[element.tagName] = element.tagValue
      });
      form.setFieldsValue({
        NameAsMentionedInTheBank:posScreenObj.NameAsMentionedInTheBank,
        BankIFSC:posScreenObj.BankIFSC,
        BankAccountNumber:posScreenObj.BankAccountNumber,
        BankName:posScreenObj.BankName,
        // PennydropResult:posScreenObj.PennydropResult,
        NameReceivedinPennyDrop:posScreenObj.NameReceivedinPennyDrop,
      })
    }
    
  }


  return (
    <>
      <Spin spinning={isLoader}>
        <Form
          initialValues={data}
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
            data={isShowPOSScreen
              ? Data[selectedSubType]?.POS_Details
              : isPOSManageScreen ? Data[selectedSubType]?.POS_Manger_Details : Data[selectedSubType]?.BOE_Details}
            subType={selectedSubType}
            handleTitleCheckBox={handleTitleCheckBox}
            handleEdit = {handleEdit}
            existingLoanCheck={existingLoanCheck}
            eligibleLoanCheck={eligibleLoanCheck}
            shareProcessCheck={shareProcessCheck}
            checked={checked}
            handleRadioChange ={handleRadioChange}
            handleDropdownChange ={handleDropdownChange }
          ></DetailsForm>
          {existingLoanCheck && (
            <>
              <DetailsForm
                data={Data[selectedSubType]?.Existing_Loan_Details}
                subType={selectedSubType}
                handleTextLink={handleTextLink}
              ></DetailsForm>
            </>
          )}
          {eligibleLoanCheck && (
            <>
              <DetailsForm
                data={Data[selectedSubType]?.Eligible_Loan_Details}
                onBlurInput ={onBlurInput }
                subType={selectedSubType}
              ></DetailsForm>
              {!isLoanChecking&&<>

<DetailsForm
                data={Data[selectedSubType]?.Share_Loan_Process_Details}
                subType={selectedSubType}
                toggleInputField={toggleInputField}
                activeEmailIcons={activeEmailIcons}
                activeMobileIcons={activeMobileIcons}
                activeWhatsAppIcons={activeWhatsAppIcons}
              ></DetailsForm>
              </>}
            </>
          )}
          {shareProcessCheck && (
            <>
            {isLoansAvailable>0&&<>
              <DetailsForm
                data={Data[selectedSubType]?.Share_Process_Details}
                subType={selectedSubType}
                toggleInputField={toggleInputField}
                activeEmailIcons={activeEmailIcons}
                activeMobileIcons={activeMobileIcons}
                activeWhatsAppIcons={activeWhatsAppIcons}
              ></DetailsForm>
            </>}

            {/* {isLoansAvailable<=0&&<>
              <DetailsForm
                data={Data[selectedSubType]?.Share_Loan_Process_Details}
                subType={selectedSubType}
                toggleInputField={toggleInputField}
                activeEmailIcons={activeEmailIcons}
                activeMobileIcons={activeMobileIcons}
                activeWhatsAppIcons={activeWhatsAppIcons}
              ></DetailsForm>
            </>} */}

            </>
          )}
           {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          {selectedSubType === "loanrequest" && (
            <>
              <DetailsForm
                data={isShowPOSScreen ? Data[selectedSubType]?.POS_Documents_title: isPOSManageScreen ? Data[selectedSubType]?.POS_Manger_Documents_title :
                  Data[selectedSubType]?.View_Documents_title}
                handleProposerCollapse={handleProposerCollapse}
              ></DetailsForm>
              {collapsePOSDocuments && (
                  <>
                    <DetailsForm
                      data={isShowPOSScreen ? Data[selectedSubType]?.POS_View_Documents :
                        isPOSManageScreen ? Data[selectedSubType]?.POS_Manger_View_Documents :
                        Data[selectedSubType]?.View_Documents}
                      subType={selectedSubType}
                      handleProposerCollapse={handleProposerCollapse}
                      handleDateChange={handleDateChange}
                      handleRadioChange ={handleRadioChange}
                      handleTextLink={handleTextLink}
                      suffix={!isShowPOSScreen && suffix}
                      form={form}
                      onBlurInput ={onBlurInput}
                      getUploadFiles={getUploadFiles}
                      disabledDate={disabledDate}
                    ></DetailsForm>
                      {showReasonDelayField && (
                  <>
                   {/* {!isShowPOSScreen&& <DetailsForm
                      data={Data[selectedSubType]?.ReasonSubmission}
                      subType={selectedSubType}
                      onBlurInput = {onBlurInput}
                    ></DetailsForm>} */}
                  </>
                )}
                  </>
                )}
                <DetailsForm
                  data={
                    isPOSManageScreen ? Data[selectedSubType]?.View_BankDetails_title :
                    Data[selectedSubType]?.View_BankDetails_title}
                  handleProposerCollapse={handleProposerCollapse}
                ></DetailsForm>
                {collapsePOSBankDetails && (
                  <>
                    <DetailsForm
                      data={isShowPOSScreen ? Data[selectedSubType]?.POS_View_Bank_Details :
                        isPOSManageScreen ? Data[selectedSubType]?.POS_Manger_View_Bank_Details :
                        Data[selectedSubType]?.View_Bank_Details}
                        suffix={!isShowPOSScreen && suffix}
                        handleRadioChange ={handleRadioChange}
                      subType={selectedSubType}
                      handleProposerCollapse={handleProposerCollapse}
                      form={form}
                      onBlurInput ={onBlurInput}
                      handleLabelLink ={handleLabelLink }
                      getUploadFiles={getUploadFiles}
                    ></DetailsForm>
                  </>
                )}
                {(isShowPOSScreen || isPOSManageScreen )&&<>
                
                <DetailsForm
                  data={
                    isPOSManageScreen ? Data[selectedSubType]?.POS_Manger_POS_Action_title :
                    Data[selectedSubType]?.View_POS_Action_title}
                  handleProposerCollapse={handleProposerCollapse}
                ></DetailsForm>
                {collapsePOSAction && (
                  <>
                    <DetailsForm
                      data={
                        isPOSManageScreen ? Data[selectedSubType]?.POS_Manger_Action :
                        Data[selectedSubType]?.POS_Action}
                      subType={selectedSubType}
                      handleTitleCheckBox={handleTitleCheckBox}
                      handleDropdownChange={handleDropdownChange}
                      toggleInputField={toggleInputField}
                      activeEmailIcons={activeEmailIcons}
                      activeMobileIcons={activeMobileIcons}
                      activeWhatsAppIcons={activeWhatsAppIcons}
                      handleProposerCollapse={handleProposerCollapse}
                      handleTextLink={handleTextLink}
                      handleLabelLink ={handleLabelLink }
                    ></DetailsForm>
                  </>
                )}
                </>}
            </>
          )}
          

          {selectedSubType !== "loanrepayment" &&<>
          <div className="contact-details-btn">
           {/* {(checked || selectedSubType==="loanrequest")&&<>
            <Button type="primary" className="primary-btn" htmlType="submit">
              {isShowPOSScreen?"Approve":"Submit"}
            </Button>{" "}
           
            </>}
            {showRaiseRequirementBtn&&
             <Button type="primary" className="primary-btn">
             Raise Requirement
           </Button>} */}
                 {(isShowPOSScreen || isPOSManageScreen) ?
                      <Button type="primary" value="RaiseRequirement" 
                       htmlType="submit" onClick={() => setClickedButton("RaiseRequirement")}
                        className="primary-btn" >
                 
                Raise Requirement
              </Button> :  <Button type="primary" value="RaiseRequirement" 
                       htmlType="submit" onClick={() => setClickedButton("RaiseRequirement")}
                        className="primary-btn" >
                 
                Raise Requirement
              </Button>     }
           {(checked || selectedSubType==="loanrequest")&&<>
           <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                       onClick={() => setClickedButton("POSApprove")}
                      >
                        {!isShowPOSScreen 
                          ? "Submit"
                          : "Approve"}
                      </Button>

                      </>}

                

            {/* {selectedSubType==="loanrequest"&&isShowPOSScreen&&
            <Button type="primary" className="primary-btn">
            Pass JV
          </Button>
            } */}
          </div>
          </>}
          {selectedSubType === "loanrepayment" &&<>
          <DetailsForm
                      data={
                         Data[selectedSubType]?.POS_Details }
                      subType={selectedSubType}
                      handleTitleCheckBox={handleTitleCheckBox}
                      handleDropdownChange={handleDropdownChange}
                      toggleInputField={toggleInputField}
                      activeEmailIcons={activeEmailIcons}
                      activeMobileIcons={activeMobileIcons}
                      activeWhatsAppIcons={activeWhatsAppIcons}
                      handleProposerCollapse={handleProposerCollapse}
                      handleTextLink={handleTextLink}
                      handleLabelLink ={handleLabelLink }
                    ></DetailsForm>
          <div className="contact-details-btn">
                      <Button type="primary" value="Reassign" 
                       htmlType="submit"
                        className="primary-btn" >
                 
                 Reassign
              </Button>     
           <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                      >
                       Approve
                      </Button>
          </div>
          </>}
        
        </Form>
      </Spin>


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
        title="Signature Change"
        open={SignListModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setSignListModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
         <div className="table-container" style={{ marginTop: "0px" }}>
          <table className="responsive-table">
            <tr>
              <th>Service Req No </th>
              <th>Status</th>
              <th>Created On</th>
      
            </tr>
            {signatureDeDupeData?.map((item,index) => (
            <tr key={index}>
            <td>
              {item?.SrvReqRefNo}
            </td>
            <td>
            {item?.CurrentStatus}
            </td>
            <td>
             {moment(item?.CreatedOn, "YYYYMMDD").format("DD/MM/YYYY")}
            </td>
            

           
            </tr>
          ))}
           {signatureDeDupeData?.length === 0  &&
               <tr>
                  <td colspan="4">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
          </table>
        </div>
      </Modal>


      <Modal
        title="Negative List"
        open={negativeListModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setNegativeModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
         <div className="table-container" style={{ marginTop: "0px" }}>
          <table className="responsive-table">
            <tr>
              <th>Name</th>
              <th>Program
</th>
              <th>Type</th>
            
            </tr>
            {negativeList?.map((item,index) => (
            <tr key={index}>
            <td>
              {item?.name}
            </td>
            <td>
              {item?.program}
            </td>
            
              <td>{item?.type}</td>
             
            </tr>
          ))}
           {negativeList?.length === 0  &&
               <tr>
                  <td colspan="4">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
          </table>
        </div>
      </Modal>


      <Modal
        title="Bank De-Dupe Match Details"
        open={showBankDeDupeModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setShowBankDeDupeModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
         <div className="table-container" style={{ marginTop: "0px" }}>
          <table className="responsive-table">
            <tr>
              <th>Policy Number</th>
              <th>PO Name</th>
              <th>LA Name</th>
              <th>Bank Account Details</th>
            </tr>
            {BankduDupeData?.map((item,index) => (
            <tr key={index}>
            <td>
              {item?.LA_PolicyNo}
            </td>
            <td>
              {item?.PolBankDtlsID}
            </td>
            
              <td>{item?.LA_CustomerID}</td>
              <td>{item?.Acc_Number}</td>
            </tr>
          ))}
           {BankduDupeData?.length === 0  &&
               <tr>
                  <td colspan="4">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
          </table>
        </div>
      </Modal>
















      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props.getAdvance}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
    </>
  );
};


const mapStateToProps = ({ state, policyDetails, userProfileInfo }) => {
  return { data: state?.PolicyDetailsReducer?.policyDetailsObj, policyDetails};
};


export default connect(mapStateToProps)(LoanPolicy);
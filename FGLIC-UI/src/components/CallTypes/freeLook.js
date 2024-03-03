import React, { useState,useEffect } from "react";
import { Data } from "../../mainconfig";
import PopupAlert from "../popupAlert";
import { connect,useSelector } from "react-redux";
import DetailsForm from "../../utils/DetailsForm";
import NumberFormat from "react-number-format";

import apiCalls from "../../api/apiCalls";
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
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import CloseIcon from "../../assets/images/close-icon.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";


const FreeLook = (props) => {
  dayjs.extend(customParseFormat);

  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  const { selectedCallType, selectedSubType, customerData, setSelectedSubType,freeLookForm, policyDetails,POSContactData, selectedSubTypeId,SelectedSubTypeVal} = props;
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showResonDelayField,setShowReasonDelayField] = useState(false);
  const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  const [isFundTransferSelection,setIsFundTransferSelection] = useState("");
  const [isRequestForSelection,setIsRequestForSelection] = useState("");
  const [payoutDetailsOpen,setPayoutDetailsOpen] = useState(false);
  const [isPolicyFreelookSelection,setIsPolicyFreelookSelection] = useState("");
  const [isPolicyDispatchSelection,setIsPolictDispatchSelection] = useState("");
  const [isCustomerRetainedSelection,setIsCustomerRetainedSelection] = useState("");
  const suffix = <img src={UploadIcon} alt="" />;
  const [checkedList, setCheckedList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [raiseRequirementOpen,setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [PennyDropResponse,setPennyDropResponse] = useState({});
  const [isShowPOSManagerScreen,setIsShowPOSManagerScreen] = useState(false);
  const [clickedButton, setClickedButton] = useState("");
  const [activeCheckboxval, setActiveCheckboxval] = useState("");
  const [activecommuType, setActivecommuType] = useState();
  const [loanEnquiryData, setLoanEnquiryData] = useState({});
  const [uploadFiles,setUploadFiles] = useState([]);
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const [CNFBankAccNo, setCNFBankAccNo] = useState("");
  const [BankAccNo, setBankAccNo] = useState("");

  const [showBankDeDupeModal,setShowBankDeDupeModal] = useState(false);
  const [SignListModal,setSignListModal] = useState(false);
  const [negativeListModal,setNegativeModal] = useState(false);

  const [BankduDupeData,setBankDeDupeData] = useState([]);
  const [negativeList,setNegativeList] = useState([]);
  const [signatureDeDupeData,setSignatureDeDupeData] = useState([]);
  const [isDocLinks,setIsDocLinks] = useState([]);
  const [isProcessLink,setIsProcessLink] = useState(''); 
const [isDocLink,setIsDocLink] = useState('');

  const formFeilds = form.getFieldsValue();
  const posScreenObj = {
    FreeLookAmount:'',
    FundTransfer:"",
    RequestTime:"",
    ReasonForDelay:"",
    Comments:"",
    FundTransferTo:'',
    FundTransferAmount:"",
    RelationsToFTPolicy:"",
    NameOfFundTransferPolicyOwner:"",
    BalanceAmountForFreelook:"",
    NameAsMentionedInTheBank:'',
    BankIFSC:"",
    BankAccountNumber:"",
    BankName:"",
    InitiatePennyDrop:"",
    PANAadhaarLinked:'',
    ValidateSignature:'',
    CustomerSigningDate:'',
    BranchReceivedDate:'',
    PayableAmount:''
  }
  useEffect(()=>{
    if(loggedUser?.role === 'posmanager'){
      setIsShowPOSManagerScreen(true)
       setIsShowPOSScreen(false);
  
   }else if(loggedUser?.role === 'posexecutive'){
    setIsShowPOSScreen(true);
   }

    if (POSContactData && customerData?.isPOS) {

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
  
        if (!posScreenObj?.ReasonForDelay  && item?.name ==="ReasonForDelay") {
          item.hide = true;
        }
      });
      Data[selectedSubType]?.POS_Manager_Details?.forEach((item, index) => {
  
        if (!posScreenObj?.ReasonForDelay  && item?.name ==="ReasonForDelay") {
          item.hide = true;
        }
      });
      

      Data[selectedSubType]?.POS_FundTransfer_Fields?.forEach((item, index) => {
        if(item?.name ==="ReasonForDelay" && !posScreenObj?.ReasonForDelay){
          item.hide = true;
        }

        if (posScreenObj?.FundTransfer === 'no' ) {

           if(item?.name ==="FundTransferTo" || item?.name === "FundTransferAmount" || item?.name === "RelationsToFTPolicy" || 
            item?.name === "NameOfFundTransferPolicyOwner" || item?.name === "BalanceAmountForFreelook"){
            item.hide = true;
           }
          
        }
      });
      
      Data[selectedSubType]?.POS_Action_Fields?.forEach((item, index) => {
  
        if (posScreenObj?.FundTransfer === 'yes' ) {

           if(item?.name === "BankAccountDeDupe" || item?.name === "InitiatePennyDropPOS" ){
            item.hide = true;
           }
          
        }
      });

      form.setFieldsValue({
        FreeLookAmount:posScreenObj.PayableAmount,
        RequestTime:posScreenObj.RequestTime,
        ReasonForDelay:posScreenObj.ReasonForDelay,
        BranchRemarks:posScreenObj.Comments,
        FundTransferTo:posScreenObj.FundTransferTo,
        FundTransferAmount:posScreenObj.FundTransferAmount,
        RelationsToFTPolicy:posScreenObj.RelationsToFTPolicy,
        NameOfFundTransferPolicyOwner:posScreenObj.NameOfFundTransferPolicyOwner,
        BalanceAmountForFreelook:posScreenObj.BalanceAmountForFreelook,
        CustomerSigningDate:posScreenObj.CustomerSigningDate ?  convertDate(new Date(posScreenObj.CustomerSigningDate)):'',
        BranchReceivedDate:posScreenObj.BranchReceivedDate ?  convertDate(new Date(posScreenObj.BranchReceivedDate)):'',
        FreelookRequestFor: posScreenObj.FundTransfer === 'yes'? 'fundtransfer':'freelook',
        NameAsMentionedInTheBank:posScreenObj.NameAsMentionedInTheBank,
        BankIFSC:posScreenObj.BankIFSC,
        BankAccountNumber:posScreenObj.BankAccountNumber,
        BankName:posScreenObj.BankName,
        // PennydropResult:posScreenObj.PennydropResult,
        NameReceivedinPennyDrop:posScreenObj.NameReceivedinPennyDrop,
        PANAadhaarLinked:posScreenObj.PANAadhaarLinked,
        PennydropResult:posScreenObj.InitiatePennyDrop,
        ValidateSignature:posScreenObj.ValidateSignature,
        ChangeInLast60Days:POSContactData?.personalChange,
        PolicyLoggedLast:POSContactData?.policyLogged,
        ViewFinalPayableAmount:posScreenObj.PayableAmount,
      })
      setIsRequestForSelection(posScreenObj.FundTransfer === 'yes'? 'fundtransfer':'freelook');
    }else{
      if(policyDetails?.policyDetailsObj?.planAndStatus?.productType === 'UL'){
      Data[selectedSubType]?.FundTransfer_YesFields?.forEach((item, index) => {
  
        if (!item?.name ==="RequestTime") {
          item.hide = false;
        }
      });
      Data[selectedSubType]?.FundTransfer_NoFields?.forEach((item, index) => {
  
        if (!item?.name ==="RequestTime") {
          item.hide = false;
        }
      });
   
    }
    getProcesDocLnk();
    getProcesLink();
    }
    
    },[selectedSubType])



    const getProcesLink = () => {
      setIsProcessLink('');
      setIsDocLink('')
      let obj = {
        "Call_Typ" : selectedCallType,
        "Sub_Typ":selectedSubTypeId
    }
      let response = apiCalls.getProcesLink(obj);
      response
        .then((val) => {
          if (val?.data) {
          
            const filteredData = val?.data?.filter((ele) =>{
              if(ele.docType === "AcceptableDocs"){
                setIsDocLink(ele.link);
              }else if(ele.docType === SelectedSubTypeVal){
                setIsProcessLink(ele.link)
              }
              return ele.docType
            });
    
    
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


  const handleChange = (value) => {
    setActiveCheckboxval(value)
    // If the checkbox is already checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
      if(value?.includes("Register Request")){
        setSelectedSubType("registerfreelookrequest");
        freeLookForm?.setFieldsValue({subType: 1})
      }
    }
  };

  const handleRadioChange = (e,item) => {
  //   setShowRaiseRequirementBtn(false);
  //  if((item?.label?.includes("Validate Signature")||item?.label?.includes("Signature Validated"))&&e.target.value==="no"){
  //   setShowRaiseRequirementBtn(true);
  //  }
   if(item?.label?.includes("Is Customer Retained")){
    setIsCustomerRetainedSelection(e.target.value);
   }
  };
  const toggleInputField = (field, item, index) => {
    setActivecommuType(item?.name)
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
  const handleLabelLink =(item)=>{

    if(item.label === "Initiate Penny Drop"){
      InitiatePennyDropp();
    }
    if(item.name === "InitiatePennyDropPOS" &&  formFeilds.InitiatePennyDrop === 'Invalid Input'){
      InitiatePennyDropp();
    }
  }
  const handleTextLink = (item) => {
  if(item.name ===  "BankAccountDeDupe" ){
    setShowBankDeDupeModal(true);
  }else if(item.name ===  "negavativeList"){
    setNegativeModal(true)
  }else if(item.name ===  "SignatureChange"){
    setSignListModal(true)
  }


    if(item.name ===  "FreelookRequestForm" || item.name === 'PolicyBond'|| item.name === 'PolicyownerIDproof'|| item.name === 'PolicyOwnerBankAccountProof'
    || item.name === 'Outoffreelookapprovalemail'){
      const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;

      window.open(url, '_blank');
    }
    setPayoutDetailsOpen(false);
    if(item?.label?.includes("Freelook Amount")||item?.label?.includes("Freelook Payout")){
      setPayoutDetailsOpen(true);
    }
  };
  const onBlurInput = (value, item) => {
    //debugger
    const obj = form.getFieldsValue()

    if(item.name === "BankIFSC" && value){
      getIFSCBankDetails(value);
    }
    if(item.name === 'ConfirmBankAccountNumber'){
      setCNFBankAccNo(value)
     }else if(item.name === 'BankAccountNumber'){
       setBankAccNo(value)
     }
   
     if( item.name === 'ConfirmBankAccountNumber'){
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
     
    }else if(value?.length >= 4 &&  item.name === 'BankAccountNumber'){
     const lastFourDigits = value.slice(-4);
     const maskedString = '*'.repeat(value.length - 4) + lastFourDigits;
     form.setFieldsValue({BankAccountNumber: maskedString})
    }


 
    if(item?.name?.includes("FundTransferAmount")){
      let totalSurrenderAmount = policyDetails?.policyDetailsObj?.premiumDetails?.modelPremiumAmount;

      if(Number(value.replace(/,/g, '')) > Number(totalSurrenderAmount.replace(/,/g, ''))){
        form.setFieldsValue({
          FundTransferAmount:'',
          BalanceAmountForFreelook:''
        });
        message.error({
          content:
            "Fund Transfer Amount Should not exceed Total Fund",
          className: "custom-msg",
          duration: 2,
        });    
        return
      }
      const fundValue =String( Number(totalSurrenderAmount.replace(/,/g, ''))  -  Number(value.replace(/,/g, '')) );
      form.setFieldsValue({BalanceAmountForFreelook: fundValue})
      if(fundValue>0){
        //setShowBalanceFields(true);
      }else{
       // setShowBalanceFields(false);
      }
   
     }




    // if(item.name === 'reenteraccountNumber' || item.name === 'AccNumber_New'){
    //    if(obj.reenteraccountNumber && obj.AccNumber_New && (obj.reenteraccountNumber !== obj.AccNumber_New) ){
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
  const handleDropdownChange = (e, item) => {
    const label = item?.label;
    switch (true) {
      case label?.includes("Do you wish to opt for fund transfer"):
        setIsFundTransferSelection(e);
        break;
      case label?.includes("Request For"):
        setIsRequestForSelection(e);
        break;
      case label?.includes("Is Policy Within Freelook"):
        setIsPolicyFreelookSelection(e);
        break;
      case label?.includes("Policy Redispatch"):
        setIsPolictDispatchSelection(e);
        break;
      // case label?.includes("Is Customer Retained"):
      //   setIsCustomerRetainedSelection(e);
      //   break;
      default:
        // Handle default case if needed
        break;
    }

    if(item.name ==="PolicyRedispatch" && (e ==="yes" || e ==="no")){
      form.setFieldsValue({
        DispatchMode:"",
        REDispatchDate:'',
        REPODNo:'',
        REReceivedOn:'',
        REReceivedBy:'',
        WelcomeCallDate:'',
        WelcomeCallComments:''
      })
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
  
  const date_diff_indays = function (date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  };
  const handleDateChange =(date,item)=>{

    if (item === "BranchReceivedDate" || item.name === "BranchReceivedDate") {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue()
      let customerSignDate = moment(formFeilds?.CustomerSigningDate + 1).format("MM/DD/YYYY");
      let dateDiffence = date_diff_indays(selectDate,customerSignDate)
      if(!formFeilds?.CustomerSigningDate ||dateDiffence > 0){
        message.destroy();
        message.error({
          content: "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
          BranchReceivedDate: "",
     
        })
      return;
      }
      else {
      Data[selectedSubType]?.Checklist?.forEach(element => {
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


    if(item?.toLowerCase()==="branchreceiveddate"||item?.name==="branchreceiveddate"){
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format('DD/MM/YYYY');
      let selectDate = moment(date+1).format('DD/MM/YYYY');
      if(selectDate < todayDate){
        setShowReasonDelayField(true);
      }
    }
  }

  // const handleSubmit = () => {
  //   if(selectedSubType==="registerfreelookrequest"){
  //     setIsShowPOSScreen(!isShowPOSScreen);
  //   }
  // };

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };
  
  const handleEdit = (val)=>{
    debugger

    if(val==='edit'){
      Data[selectedSubType]?.POS_View_Bank_Details?.forEach((item, index) => {
        item.disabled = false
      })
      
    }else if(val==='close'){
      Data[selectedSubType]?.POS_View_Bank_Details?.forEach((item, index) => {
        item.disabled = true
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

  const handleSubmit = (values) => {
 
    //POSApprove RaiseRequirement
    if (POSContactData && customerData?.isPOS) {
        if (clickedButton === "RaiseRequirement") {
          getRaiseRequirements()
          // POSActionsOnContactDetails(values, "REJECTED");
        } else if (clickedButton === "POSApprove") {
          POSActionsOnContactDetails(null, "APPROVED");
        }
    
    } else {
      if (formFeilds.ValidateSignature === "no") {
        //getRaiseRequirements();
        saveRequest();
      } else {
        saveRequest();
      }
      
    }
   
  
  
  }


 
  
  const saveRequest = (values) => {
    setIsLoader(true);
    setShowAlert(false);
    // if(selectedSubType==="loanrequest")setIsShowPOSScreen(!isShowPOSScreen);

    let obj = {
      "CallType": props?.selectedCallType,
      "SubType": props?.selectedSubTypeId,
      "Category": selectedSubType ==='registerfreelookrequest' ? 2:1,
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
      "RequestDateTime": new Date(),
      "CustSignDateTime":values?.CustSignDateTime
      ? new Date(values?.CustSignDateTime)
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

if(selectedSubType ==='registerfreelookrequest' && formFeilds.FundTransfer === 'no'){
  obj.TransactionData.push(


    {
      "Status": "Create",
      "TagName": "POName",
      "TagValue": customerData?.poName
    },
    {
      "Status": "Create",
      "TagName": "ProductType",
      "TagValue": policyDetails?.policyDetailsObj?.planAndStatus?.productType

    },
    {
      "Status": "Create",
      "TagName": "RCD",
      "TagValue": convertDate(policyDetails?.policyDetailsObj?.saDetails?.rcd)
    },
    {
      "Status": "Create",
      "TagName": "APE",
      "TagValue": customerData?.premiumAmt
    },

    {
        "Status": "Create",
        "TagName": "FundTransfer",
        "TagValue": formFeilds.FundTransfer
    },
    {
      "Status": "Create",
      "TagName": "RequestTime",
      "TagValue": formFeilds.RequestTime
  },
    // {
    //     "Status": "Create",
    //     "TagName": "FreelookApprovalEmail",
    //     "TagValue": formFeilds.FreelookApprovalEmail
    // },
    {
        "Status": "Create",
        "TagName": "PANAadhaarLinked",
        "TagValue": formFeilds.PANAadhaarLinked
    },
    {
        "Status": "Create",
        "TagName": "CustomerSigningDate",
        "TagValue": formFeilds.CustomerSigningDate
    },
    {
        "Status": "Create",
        "TagName": "BranchReceivedDate",
        "TagValue": formFeilds.BranchReceivedDate
    },
    {
      "Status": "Create",
      "TagName": "ValidatedBy",
      "TagValue": "form"
},
    {
        "Status": "Create",
        "TagName": "ValidateSignature",
        "TagValue": formFeilds.ValidateSignature
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
    },
    {
        "Status": "Create",
        "TagName": "Comments",
        "TagValue": formFeilds.Comments
    },
    
    {
      "Status": "Create",
      "TagName": "InitiatePennyDrop",
      "TagValue": formFeilds.InitiatePennyDrop
  },{
    "Status": "Create",
    "TagName": "ReasonForDelay",
    "TagValue": formFeilds.ReasonForDelay
},{
            "Status": "Create",
            "TagName": "PayableAmount",
            "TagValue":policyDetails?.policyDetailsObj?.premiumDetails?.modelPremiumAmount?.replace(/,/g, '')
        },
        {
          "Status": "Create",
          "TagName": "TotalAmount",
          "TagValue":policyDetails?.policyDetailsObj?.premiumDetails?.modelPremiumAmount?.replace(/,/g, '')
      },
        
        {
          "Status": "Create",
          "TagName": "PennyDropResponse",
          "TagValue": JSON.stringify(PennyDropResponse) 
        },
        {
          "Status": "Create",
          "TagName": "FundTransferAmount",
          "TagValue":0
        },
     
  )
}else if(selectedSubType ==='registerfreelookrequest' && formFeilds.FundTransfer === 'yes'){
  obj.TransactionData.push( 
  {
        "Status": "Create",
        "TagName": "POName",
        "TagValue": customerData?.poName
      },
      {
        "Status": "Create",
        "TagName": "ProductType",
        "TagValue": policyDetails?.policyDetailsObj?.planAndStatus?.productType

      },
      {
        "Status": "Create",
        "TagName": "RCD",
        "TagValue":customerData?.premiumAmt 
      },
      {
        "Status": "Create",
        "TagName": "APE",
        "TagValue": convertDate(policyDetails?.policyDetailsObj?.saDetails?.rcd)
      },
    {
      "Status": "Create",
      "TagName": "FundTransfer",
      "TagValue": formFeilds.FundTransfer
    },
  {
    "Status": "Create",
    "TagName": "RequestTime",
    "TagValue": formFeilds.RequestTime
},
{
  "Status": "Create",
  "TagName": "ReasonForFreelook",
  "TagValue": formFeilds.ReasonForFreelook
},  

{
  "Status": "Create",
  "TagName": "FundTransferTo",
  "TagValue":formFeilds.FundTransferTo
},
{
  "Status": "Create",
  "TagName": "FundTransferAmount",
  "TagValue":formFeilds.FundTransferAmount?.replace(/,/g, '')
},
{
  "Status": "Create",
  "TagName": "RelationsToFTPolicy",
  "TagValue": formFeilds.RelationsToFTPolicy
},
{
  "Status": "Create",
  "TagName": "NameOfFundTransferPolicyOwner",
  "TagValue": formFeilds.NameOfFundTransferPolicyOwner
},
{
  "Status": "Create",
  "TagName": "BalanceAmountForFreelook",
  "TagValue": formFeilds.BalanceAmountForFreelook
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
},

{
  "Status": "Create",
  "TagName": "InitiatePennyDrop",
  "TagValue": formFeilds.InitiatePennyDrop
},
  // {
  //     "Status": "Create",
  //     "TagName": "FreelookApprovalEmail",
  //     "TagValue": formFeilds.FreelookApprovalEmail
  // },
  
  {
    "Status": "Create",
    "TagName": "PANAadhaarLinked",
    "TagValue": formFeilds.PANAadhaarLinked
},
{
  "Status": "Create",
  "TagName": "CustomerSigningDate",
  "TagValue":  formFeilds.CustomerSigningDate
},
{
  "Status": "Create",
  "TagName": "BranchReceivedDate",
  "TagValue":  formFeilds.BranchReceivedDate
},
{
  "Status": "Create",
  "TagName": "ValidateSignature",
  "TagValue":  formFeilds.ValidateSignature
},
{
  "Status": "Create",
  "TagName": "Comments",
  "TagValue":  formFeilds.Comments
}
,
  
  {
      "Status": "Create",
      "TagName": "ValidatedBy",
      "TagValue": "form"
  }
  ,{
    "Status": "Create",
    "TagName": "ReasonForDelay",
    "TagValue": formFeilds.ReasonForDelay
},{
  "Status": "Create",
  "TagName": "PayableAmount",
  "TagValue": formFeilds.BalanceAmountForFreelook?.replace(/,/g, '')
}, 
{
  "Status": "Create",
  "TagName": "TotalAmount",
  "TagValue":policyDetails?.policyDetailsObj?.premiumDetails?.modelPremiumAmount?.replace(/,/g, '')
},
{
  "Status": "Create",
  "TagName": "PennyDropResponse",
  "TagValue": JSON.stringify(PennyDropResponse) 
},
    )
}else if(selectedSubType === 'statusenquiry' && activeCheckboxval ==='Enquiry'){
  obj.TransactionData.push( 
    {
      "Status": "Create",
      "TagName": "FreelookPeriodEndedOn",
      "TagValue": formFeilds.FreelookPeriodEndedOn
  },
  {
      "Status": "Create",
      "TagName": "FreelookPeriod",
      "TagValue": formFeilds.FreelookPeriod
  },
  {
      "Status": "Create",
      "TagName": "DispatchDate",
      "TagValue": formFeilds.DispatchDate
  },
  {
      "Status": "Create",
      "TagName": "PODNo",
      "TagValue": formFeilds.PODNo
  },
  {
      "Status": "Create",
      "TagName": "ReceivedOn",
      "TagValue": formFeilds.ReceivedOn
  },
  {
      "Status": "Create",
      "TagName": "ReceivedBy",
      "TagValue": formFeilds.ReceivedBy
  },
  {
      "Status": "Create",
      "TagName": "RTOStatus",
      "TagValue": formFeilds.RTOStatus
  },
  {
      "Status": "Create",
      "TagName": "PolicyRedispatch",
      "TagValue":formFeilds.PolicyRedispatch
  },
 
  {
      "Status": "Create",
      "TagName": "DispatchMode",
      "TagValue": formFeilds.DispatchMode
  },
  {
      "Status": "Create",
      "TagName": "REDispatchDate",
      "TagValue":formFeilds.REDispatchDate
  },
  {
      "Status": "Create",
      "TagName": "REPODNo",
      "TagValue": formFeilds.REPODNo
  },
  {
      "Status": "Create",
      "TagName": "REReceivedOn",
      "TagValue": formFeilds.REReceivedOn
  },
  {
      "Status": "Create",
      "TagName": "REReceivedBy",
      "TagValue": formFeilds.REReceivedBy
  },
  {
      "Status": "Create",
      "TagName": "WelcomeCallDate",
      "TagValue": formFeilds.WelcomeCallDate
  },
  {
      "Status": "Create",
      "TagName": "WelcomeCallComments",
      "TagValue": formFeilds.WelcomeCallComments
  },
  {
      "Status": "Create",
      "TagName": "FreeLookFileType",
      "TagValue": activecommuType
  },
  {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
  )
}else if(selectedSubType === 'statusenquiry' && activeCheckboxval ==='Attempt Retention'){
  obj.TransactionData.push(
    {
      "Status": "Create",
      "TagName": "IsCustomerRetained",
      "TagValue": formFeilds.IsCustomerRetained
  },
  {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"},
  { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
  { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
  )

}

  // if(formFeilds.ValidateSignature === 'no'){
  //   let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
  
  //   obj.TransactionData.push({
  //     "Status": "Create",
  //     "TagName": "ReasonList_Key",
  //     "TagValue":  JSON.stringify(ids)
  //   })
  // }

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
  
        setIsLoader(false);
        setAlertTitle("Request Created Successfully");
        let successMessage = val?.data?.tat > 0 ? 
        `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat||0} days`
        : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
        setAlertData(successMessage);
        setNavigateTo("/advancesearch");

        // setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);
       setShowAlert(true);
      //  setNavigateTo("/advancesearch");
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
    return;
    }
    else{
      saveRequest();
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
    
    },
    {
      "Status": "Create",
      "TagName": "SignatureChange",
      "TagValue": values.SignatureChange
  
  },
    
    {
      
        "Status": "Create",
        "TagName": "ViewFinalPayableAmount",
        "TagValue": values.ViewFinalPayableAmount?.replace(/,/g, '')
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
    // {
    //   "Status": "Create",
    //   "TagName": "BranchRemarks",
    //   "TagValue": values.BranchRemarks
    // },
    
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
          setPennyDropResponse(result?.data)
          form.setFieldsValue({
            InitiatePennyDrop: result?.data?.result?.data?.source[0]?.data?.bankResponse,
            InitiatePennyDropPOS: result?.data?.result?.data?.source[0]?.data?.bankResponse,
          
          })
         }else{
          form.setFieldsValue({
            InitiatePennyDrop: result?.data?.statusMessage,
            InitiatePennyDropPOS: result?.data?.statusMessage,
          })
         }
          //SUCCESSFUL TRANSACTION
        } else {
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
        form.setFieldsValue({
          InitiatePennyDrop: 'Invalid Input',
          InitiatePennyDropPOS:'Invalid Input',
        })

        setIsLoader(false);
      });
  };


  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };


  const LoanEnquiry =()=>{
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
            "policyNo": policyDetails?.policyDetailsObj?.identifiers?.policyNo,
            
        
    }
    
  }
  
    let response = apiCalls.LoanEnquiry(obj);
    response
      .then((val) => {
        if (val?.data) {
          setLoanEnquiryData(val?.data?.responseBody.loanDetails[0]);
           
          const res = val?.data?.responseBody.loanDetails[0];

          form.setFieldsValue({
            LoanDisbursed:moment(res?.effdate, "YYYYMMDD").format("DD/MM/YYYY"),
            LoanInterest:res?.intanny,
            OriginalLoanAmount:res?.hprincipal,
            TotalLoanInterest:Number(res?.hacrint) + Number(res?.hpndint),
            LoanOutstanding:res?.hpleamt,
            PolicyBondSubmitted:'',
            MaxLoanEligible:res?.loanallow,

            LoanApplicable: Number(res?.loanallow) > 0 ? 'Yes': 'No',
            MaxLoanvalue:res?.loanallow,
            LoanValueDate:moment(new Date(), "YYYYMMDD").format("DD/MM/YYYY"),
            
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

  const getUploadFiles=(listOfUploadFiles)=>{
    const updatedUploadList = listOfUploadFiles?.map((obj) => {
      // Create a new object without the propertyToDelete property
      const { labelName, ...newObject } = obj;
      return newObject;
    });
    // Update the state with the new list
    setUploadFiles(updatedUploadList);

  }

  const productUSP = ()=>{
    let doc = isDocLinks?.filter((ele=>{
      return ele?.docType === "USP"
   
      
    }));
  
    const url = doc&&doc[0]?.link;
    //const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;
   if(url){
    window.open(url, '_blank');
   }else{
  
    message.destroy();
    message.error({
      content:
    
        "Product USP Not Available",
      className: "custom-msg",
      duration: 2,
    });
   }
  
  
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
            data={
              isShowPOSScreen
                ? Data[selectedSubType]?.POS_Details
                : isShowPOSManagerScreen ? Data[selectedSubType]?.POS_Manager_Details
                :
                  Data[selectedSubType]?.BOE_Details
            }
            subType={selectedSubType}
            handleDropdownChange={handleDropdownChange}
            handleRadioChange={handleRadioChange}
            handleTextLink ={handleTextLink }
          ></DetailsForm>
          {selectedSubType==="statusenquiry"&&<>
          {isPolicyFreelookSelection==="yes"&&<>
          <Row gutter={[16, 16]} className="reasons-list">
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Enquiry"
                  name="enquiry"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="Enquiry"
                    checked={checkedList.includes(
                      "Enquiry"
                    )}
                    onChange={() =>
                      handleChange("Enquiry")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Attempt Retention"
                  name="attemptRetention"
                >
                  <Checkbox
                    value="Attempt Retention"
                    checked={checkedList.includes(
                      "Attempt Retention"
                    )}
                    onChange={() =>
                      handleChange("Attempt Retention")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Register Request"
                  name="registerRequest"
                >
                  <Checkbox
                    value="Register Request"
                    checked={checkedList.includes(
                      "Register Request"
                    )}
                    onChange={() =>
                      handleChange("Register Request")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
            </Row>
            {checkedList?.includes(
                      "Enquiry"
                    ) && (
                <>
                  <DetailsForm
                    data={Data[selectedSubType]?.Enquiry_Fields}
                    subType={selectedSubType}
                    handleTextLink={handleTextLink}
                    handleDropdownChange ={handleDropdownChange }
                  ></DetailsForm>
             
                {isPolicyDispatchSelection==="yes"&&<>
                <DetailsForm
                data={Data[selectedSubType]?.Enquiry_YesFileds}
                subType={selectedSubType}
                handleDropdownChange={handleDropdownChange}
                handleRadioChange={handleRadioChange}
                form={form}
                suffix={!isShowPOSScreen&&suffix}
                handleTextLink={handleTextLink}
                handleDateChange={handleDateChange}
                toggleInputField={toggleInputField}
                showEmailAddress={showEmailAddress}
                showPhoneNumber={showPhoneNumber}
                showWhatsApp={showWhatsApp}
                getUploadFiles={getUploadFiles}
              ></DetailsForm>
                 {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
              </>}
              </>
              )}
              {checkedList?.includes(
                      "Attempt Retention"
                    )&& (
                <>
                   <Row>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
              <div className="surrender-links">
                <span
                  className="surrender-icons"
                  style={{ textDecoration: "underline"}}
                >
                  <Button className="surrender-btn">
                    <a rel="noopener" className='hyperlinkk' onClick={()=>productUSP()}>
                    
                      Product USP </a>
                  </Button>
                  {/* {!isUlip&&
                  <Button className="surrender-btn" onClick={() => loanQuotation(true)}>
                    Loan Available
                  </Button>
                    }
                  {isUlip&&
                  <Button className="surrender-btn" onClick={() => partialWithdrawalEnquiry()}>
                    PW Available
                  </Button>
                  } */}
                </span> 
              </div>
            </Col>
                </Row>

                   {isCustomerRetainedSelection !== "yes" && (
                  <>
                  <DetailsForm
                    data={Data[selectedSubType]?.customerChoice}
                    subType={selectedSubType}
                    handleRadioChange={handleRadioChange}
                  ></DetailsForm>
                  </>)}

                  
                  {isCustomerRetainedSelection==="yes"&&<>
                  <DetailsForm
                    data={Data[selectedSubType]?.CustomerRetained}
                    subType={selectedSubType}
                    form={form}
                    suffix={suffix}
                    getUploadFiles={getUploadFiles}
                    handleRadioChange={handleRadioChange}
                  ></DetailsForm>
                  </>}
                </>
              )}
           </>}
           {isPolicyFreelookSelection==="no"&&<>
           <DetailsForm
            data={Data[selectedSubType]?.Policy_Freelook_NoFields}
            subType={selectedSubType}
            handleDropdownChange={handleDropdownChange}
            handleRadioChange={handleRadioChange}
            form={form}
            suffix={!isShowPOSScreen&&suffix}
            handleTextLink={handleTextLink}
            handleDateChange={handleDateChange}
            getUploadFiles={getUploadFiles}
          ></DetailsForm>
          {isPolicyDispatchSelection==="yes"&&<>
            <DetailsForm
            data={Data[selectedSubType]?.Policy_Redispatch_YesFileds}
            subType={selectedSubType}
            handleDropdownChange={handleDropdownChange}
            handleRadioChange={handleRadioChange}
            form={form}
            suffix={!isShowPOSScreen&&suffix}
            handleTextLink={handleTextLink}
            handleDateChange={handleDateChange}
            getUploadFiles={getUploadFiles}
          ></DetailsForm>
          </>}
           </>}

           <div className="contact-details-btn">
            {/* {(!showRaiseRequirementBtn||isShowPOSScreen)&&(
              <> */}
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                >
                  {isShowPOSScreen ? "Approve" : "Submit"}
                </Button>{" "}
              {/* </>
            )} */}
            {(isShowPOSScreen || !isShowPOSScreen) && (
              <Button type="primary" className="primary-btn" onClick={()=>getRaiseRequirements()}>
                Raise Requirement
              </Button>
            )}
          </div>

          </>}

          {selectedSubType==="registerfreelookrequest"&&<>
           {isFundTransferSelection==="yes"&&!isShowPOSScreen&&<>
           <DetailsForm
            data={Data[selectedSubType]?.FundTransfer_YesFields}
            subType={selectedSubType}
            handleDropdownChange={handleDropdownChange}
            handleRadioChange={handleRadioChange}
            form={form}
            suffix={!isShowPOSScreen&&suffix}
            handleTextLink={handleTextLink}
            handleDateChange={handleDateChange}
            handleLabelLink ={handleLabelLink }
            onBlurInput ={onBlurInput }
            getUploadFiles={getUploadFiles}
            disabledDate={disabledDate}
          ></DetailsForm>
           </>}
           {isFundTransferSelection==="no"&&!isShowPOSScreen&&<>
           <DetailsForm
            data={Data[selectedSubType]?.FundTransfer_NoFields}
            subType={selectedSubType}
            handleDropdownChange={handleDropdownChange}
            handleRadioChange={handleRadioChange}
            form={form}
            suffix={!isShowPOSScreen&&suffix}
            handleTextLink={handleTextLink}
            handleDateChange={handleDateChange}
            handleLabelLink ={handleLabelLink}
            onBlurInput={onBlurInput}
            getUploadFiles={getUploadFiles}
            disabledDate={disabledDate}
          ></DetailsForm>
          </>}
          {showResonDelayField&&<>
              <DetailsForm
                data={Data[selectedSubType]?.ReasonSubmission}
                onBlurInput = {onBlurInput}
              ></DetailsForm>
              </>}

          {((isShowPOSScreen&&isRequestForSelection)||isShowPOSManagerScreen)&&<>
           {!isShowPOSManagerScreen&& <DetailsForm
            data={Data[selectedSubType]?.POS_FundTransfer_Fields}
            subType={selectedSubType}
            handleDropdownChange={handleDropdownChange}
            handleRadioChange={handleRadioChange}
            form={form}
            suffix={!isShowPOSScreen&&suffix}
            handleTextLink={handleTextLink}
            handleDateChange={handleDateChange}
            handleLabelLink ={handleLabelLink}
            onBlurInput={onBlurInput}
            getUploadFiles={getUploadFiles}
          ></DetailsForm>}


           {!isShowPOSManagerScreen&& <DetailsForm
            data={Data[selectedSubType]?.POS_View_Documents}
            subType={selectedSubType}
            handleDropdownChange={handleDropdownChange}
            handleRadioChange={handleRadioChange}
            form={form}
            suffix={!isShowPOSScreen&&suffix}
            handleTextLink={handleTextLink}
            handleDateChange={handleDateChange}
            handleLabelLink ={handleLabelLink}
            onBlurInput={onBlurInput}
            getUploadFiles={getUploadFiles}
          ></DetailsForm>}


           {(isRequestForSelection==="freelook"||isShowPOSManagerScreen) && <DetailsForm
            data={ 
              isShowPOSManagerScreen ?  Data[selectedSubType]?.POS_Manager_View_Bank_Details :Data[selectedSubType]?.POS_View_Bank_Details
            }
            subType={selectedSubType}
            handleEdit = {handleEdit}
            onBlurInput={onBlurInput}
            handleRadioChange={handleRadioChange}
          ></DetailsForm>}
           <DetailsForm
            data={
              isShowPOSManagerScreen ?  Data[selectedSubType]?.POS_Manager_Action : Data[selectedSubType]?.POS_Action_Fields
            }
            subType={selectedSubType}
            handleRadioChange={handleRadioChange}
            handleTextLink ={handleTextLink }
            handleLabelLink ={handleLabelLink }
            handleDropdownChange={handleDropdownChange}
          ></DetailsForm>
          </>}
           



           <div className="contact-details-btn">
            {/* {(!showRaiseRequirementBtn||isShowPOSScreen||isShowPOSManagerScreen)&&(
              <> */}
                <Button onClick={() => setClickedButton("POSApprove")}
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                >
                  {(isShowPOSScreen ||isShowPOSManagerScreen)? "Approve" : "Submit"}
                </Button>{" "}
              {/* </>
            )} */}
            {(isShowPOSScreen ||isShowPOSManagerScreen || !isShowPOSScreen) && (
              <Button type="primary"  htmlType="submit" className="primary-btn" onClick={() => getRaiseRequirements()}>
                Raise Requirement
              </Button>
            )}
          </div>
          </>}
        </Form>

        <Modal
        title="Freelook Details"
        open={payoutDetailsOpen}
        destroyOnClose={true}
        width={1000}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setPayoutDetailsOpen(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >

        <div className="table-container">
          <table className="responsive-table">
            {/* <tr>
              <th>Sr No</th>
              <th>Description</th>
            </tr> */}
            <tr>
              <td width={50}>Premium Amount</td>
              <td width={70}>  {(policyDetails?.policyDetailsObj?.premiumDetails?.modelPremiumAmount && (
                                  <NumberFormat
                                    value={
                                      policyDetails?.policyDetailsObj?.premiumDetails?.modelPremiumAmount
                                    }
                                    decimalSeparator="."
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                  />
                                )) ||
                                  "-"}</td>
             
            </tr>
            <tr>
              <td>Less: Stamp Duty</td>
              <td>{}
              </td>
             
            </tr>
            <tr>
              <td>Less: Medical Charges</td>
              <td>{}
              </td>
            </tr>
            <tr>
              <td>Add Interest, If Any</td>
              <td>{}
              </td>
            </tr>
            <tr>
              <td>Penal Interest, If Any</td>
              <td>{}
              </td>
            </tr>
            <tr>
              <td>Final Payable Amount</td>
              <td> {(policyDetails?.policyDetailsObj?.premiumDetails?.modelPremiumAmount && (
                                  <NumberFormat
                                    value={
                                      policyDetails?.policyDetailsObj?.premiumDetails?.modelPremiumAmount
                                    }
                                    decimalSeparator="."
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                  />
                                )) ||
                                  "-"}
              </td>
            </tr>
          </table>
        </div>
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
         
          <div className="contact-details-btn">
                <Button
                   type="primary"
                   className="primary-btn"
                   htmlType="submit"
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
          getAdvance={props.getAdvance}
          title={alertTitle}
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


export default connect(mapStateToProps)(FreeLook);


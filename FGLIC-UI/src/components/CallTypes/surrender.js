import React, { useState, useEffect  } from 'react'; 
import PopupAlert from "../popupAlert";

import { Data } from "../../mainconfig";
import { Button, Col, Form,Modal,Row,Tooltip,Spin,message, Checkbox} from "antd";
import DetailsForm from '../../utils/DetailsForm';
import UploadIcon from '../../assets/images/upload.png';
import CloseIcon from '../../assets/images/close-icon.png';
import moment from 'moment';
import apiCalls from "../../api/apiCalls";

import { json } from 'react-router-dom';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ContactForm from '../../utils/ContactForm';
import { connect,useSelector } from "react-redux";
const Surrender = (props) => {
  const loginInfo = useSelector(state => state);
  dayjs.extend(customParseFormat);

  const {
    changeSubType,
    policyDetails,
    selectedSubTypeId,
    selectedCallType,
    selectedSubType,
    POSContactData,
    customerData,
    setSelectedSubType,
    surrenderForm,

      } = props;
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);

  const [form] = Form.useForm();
  const [raiseRequirementOpen,setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [clickedButton, setClickedButton] = useState("");

  const [isShowPOSScreen,setIsShowPOSScreen] = useState(false);  //pos screen showing purpose
  const [totalFundsModal, setTotalFundModal] = useState(false);
  const [showResonDelayField,setShowReasonDelayField] = useState(false);
  const [surrenderApplicableModal,setSurrenderApplicableModal] = useState(false);
  const [data,setData] = useState({
    'mobileNo': '',
    'whatsAppNo':  '',
    'emailId':  '',
  });
  const [showEmailFields,setShowEmailFields] = useState(false);
  const [isCustomerRetained,setIsCustomerRetained] = useState("");
  const [showQueryFields,setShowQueryFields] = useState(false);
  const [showRetentionFields,setShowRetentionFields] = useState(false);
  const [showRequestFields,setShowRequestFields] = useState(false);
  const [showPOSRequestFields,setShowPOSRequestFields] = useState(false);
  const [collapsePOSDocuments,setCollapsePOSDocuments]  = useState(false);
  const [collapsePOSBankDetails,setCollapsePOSBankDetails] = useState(false);
  const [collapsePOSAction,setCollapsePOSAction] = useState(false);
  const [finalPayableAmtModal,setFinalPayableAmtModal] = useState(false);
  const [showPassJVBtn,setShowPassJVBtn] = useState(false);
  const [addCCEmail,setAddCCEmail] = useState(false);
  const [showTransferFields,setShowTransferFields] = useState(false);
  const [surrenderEnquiry, setSurrenderEnquiryD] = useState({});
  const [LoanQuotationData, setLoanQuotationData] = useState({});
  const [partialWithdrawalEnquiryd, setpartialWithdrawalEnquiryd] = useState({});
  const [loanAvailableModal, setloanAvailableModal] = useState(false);
  const [pwAvailableModal, setpwAvailableModal] = useState(false);

  const [NegativeListModal,setNegativeListModal] = useState(false);
  const [showBankDeDupeModal,setShowBankDeDupeModal] = useState(false);
  const [SignListModal,setSignListModal] = useState(false);
  const [negativeListModal,setNegativeModal] = useState(false);

  const [currentActiveLink,setCurrentActiveLink] = useState('');
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showPOSMangerScreen,setShowPOSMangerScreen] = useState(false);
  const [hideViewRequestDetails,setHideViewRequestDetails] = useState(false);
  const [hideViewBankDetails,setHideBankDetails] =  useState(false);
  const [posBankDetailsObj,setBankDetailsObj] = useState({})
  const [PennyDropResponse,setPennyDropResponse] = useState({})
  const [showBalanceFields,setShowBalanceFields] = useState(false);
  const [totalSurrenderAmount,setTotalSurrenderAmount] = useState(null);
  
  const [BankduDupeData,setBankDeDupeData] = useState([]);
  const [negativeList,setNegativeList] = useState([]);
  const [signatureDeDupeData,setSignatureDeDupeData] = useState([]);

  
  const [clientEnquiryData,setClientEnquiryData] = useState({})
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [uploadFiles,setUploadFiles] = useState([]);
    
  const [NameReceivedInPennyDrop,setNameReceivedInPennyDrop] = useState()
  const [FundValueData,setFundValueData] = useState([])
  const [isUlip, setIsUlip] = useState(false);
  const [CNFBankAccNo, setCNFBankAccNo] = useState("");
  const [BankAccNo, setBankAccNo] = useState("");

  const [isProcessLinks,setIsProcessLinks] = useState([]); 
  const [isDocLinks,setIsDocLinks] = useState([]);
  const [loanValue,setLoanValue]=useState('');
  // const planName = policyDetails?.policyDetailsObj?.planAndStatus?.planName.trim()
  // const href = `${'https://futuregeneralistoreage.blob.core.windows.net/surrender/'+planName+'.pdf'}`

  const assistFor={
    query:1,
    retention:4,
    request:2,
    rechecksurrenderpayout:2
  }
  const subTypeId = {
    surrenderquery:3,
    surrenderretention:5,
    surrenderrequest:1,
    rechecksurrenderpayout:4
  }
  const [isLoader, setIsLoader] = useState(false);
  const formFeilds = form.getFieldsValue()
  const suffix = <img src={UploadIcon} alt=""/>;
  const posScreenObj = {
    CustSignDateTime:POSContactData?.custSignDateTime,

    RequestFor:'',
    TotalSurrenderValue:'',
    FundTransfer:'',
    RequestTime:'',
    ReasonForDelay:'',

    ValidatedBy:'',
    NameAsMentionedInTheBank:'',
    ReasonForSurrender:'',
    BankIFSC:'',
    BankAccountNumber:'',
    ConfirmBankAccountNumber:'',
    BankName:'',
    InitiatePennyDrop:'',
    BranchReceivedDate:'',
    ValidateSignature:'',
    Comments:'',


    PennyDropResponse:'',
    FundTransferTo:'',
    FundTransferAmount:'',
    RelationsToFTPolicy:'',
    NameOfFundTransferPolicyOwner:'',
    BalanceAmountForSurrender:'',
    NameReceivedinPennyDrop:'',
    ViewFinalPayableAmount:'',
 
    PayableAmount:'',
    

    surrenderRequestDate:'',
    SurrenderValueDate:'',
    SurrenderValuePayable:'',
    SurrenderValuePaid:'',
    PaymentDate:'',
    ReasonForReEvaluation:'',
    decision:'',

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
  setIsLoader(false)
    let response = apiCalls.LoanEnquiry(obj);
    response
      .then((val) => {
        if (val?.data) {
          const res = val?.data?.responseBody.loanEnquiryDetails;
          setLoanValue(res?.hpleamt)
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
  
  useEffect(()=>{
    if (POSContactData && customerData?.isPOS) {
      loanQuotation(false);
      surrenderEnquiryData();
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
      if(loggedUser?.role === 'posmanager'){
         setShowPOSMangerScreen(true)
         setIsShowPOSScreen(true)
      }else{
        setIsShowPOSScreen(!isShowPOSScreen);
      }
      
      setBankDetailsObj(posScreenObj)
      if(posScreenObj.FundTransfer  === 'yes' && Number(posScreenObj.BalanceAmountForSurrender) <= 0){
        // show View Request Details is yes otherwise hide
         //setHideViewRequestDetails(true);
         setHideBankDetails(true)
        // setHideBankDetails(true);
      } 
    
      if(posScreenObj.FundTransfer  === 'no'){
         setHideViewRequestDetails(true)
         setHideBankDetails(false)
        // setHideBankDetails(false);
      }
      if(posScreenObj.FundTransfer  === 'yes'){
        setHideViewRequestDetails(false)
      }
      Data[selectedSubType]?.POS_Details?.forEach((item, index) => {
        if (policyDetails?.policyDetailsObj?.planAndStatus?.productType !=='UL' && item?.name?.includes("RequestTime")) {
          item.hide = true;
        }
        if (new Date(posScreenObj.BranchReceivedDate) < new Date()&&item?.name?.includes("ReasonForDelay")) {
          item.hide = true;
        }
      });
      setTotalSurrenderAmount(posScreenObj.TotalSurrenderValue);
      
    form.setFieldsValue({
      TotalSurrenderValue:posScreenObj.TotalSurrenderValue,
      RequestFor:posScreenObj.FundTransfer  === 'yes' ? 'Fund Transfer':'Full Surrender',
      BranchRemarks:posScreenObj.Comments,
      ReasonForDelay:posScreenObj.ReasonForDelay,
      RequestTime:posScreenObj.RequestTime,
     
      BankAccountNumber:posScreenObj.BankAccountNumber,
      FundTransferTo:posScreenObj.FundTransferTo,
      FundTransferAmount:posScreenObj.FundTransferAmount,
      RelationsToFTPolicy:posScreenObj.RelationsToFTPolicy,
      NameOfFundTransferPolicyOwner:posScreenObj.NameOfFundTransferPolicyOwner,
      BalanceAmountForSurrender:posScreenObj.BalanceAmountForSurrender,
      BranchReceivedDate:posScreenObj.BranchReceivedDate ? convertDate(new Date(posScreenObj.BranchReceivedDate)) : '',

       CustSignDateTime: posScreenObj.CustSignDateTime ? convertDate(new Date(posScreenObj.CustSignDateTime)):'' ,
       ViewFinalPayableAmount:posScreenObj.PayableAmount,
       NameReceivedinPennyDrop:posScreenObj.NameReceivedinPennyDrop,
       ChangeInLast60Days:POSContactData?.personalChange,
       PolicyLoggedLast:POSContactData?.policyLogged,

       surrenderRequestDate:posScreenObj.surrenderRequestDate,
       SurrenderValueDate:posScreenObj.SurrenderValueDate,
       SurrenderValuePayable:posScreenObj.SurrenderValuePayable,
       SurrenderValuePaid:posScreenObj.SurrenderValuePaid,
       PaymentDate:posScreenObj.PaymentDate,
       Surrenderpos:posScreenObj.ReasonForReEvaluation


    })

    }else{
      setShowQueryFields(false);
    setShowRetentionFields(false);
    setShowRequestFields(false);
      if(selectedSubType==='surrenderretention'){
        form.setFieldsValue({assistFor :'retention'})
        setShowRetentionFields(true);
        surrenderEnquiryData();
        getClientEnquiry();
        LoanEnquiry();
      }else if(selectedSubType==='surrenderquery'){
        form.setFieldsValue({assistFor :'query'})
        surrenderEnquiryData();
        getClientEnquiry();
        setShowQueryFields(true);
        getProcesLink();
        getProcesDocLnk();
        LoanEnquiry();
      }
      else if(selectedSubType==='surrenderrequest'){
        form.setFieldsValue({assistFor :'request'})
        setShowRequestFields(true);
        surrenderEnquiryData();
        getClientEnquiry();
        LoanEnquiry();
      }
      else if(selectedSubType==='rechecksurrenderpayout'){
        form.setFieldsValue({assistFor :'rechecksurrenderpayout'})
        TransectionPayouts();
        surrenderEnquiryData();
        getClientEnquiry();
        LoanEnquiry();

      }

      form.setFieldsValue({ValidateSignature:'yes'});

    }

    if(policyDetails?.policyDetailsObj?.planAndStatus?.productType === 'UL'){
      setIsUlip(true);
      getFundValue();
     
    }else{
      loanQuotation();
      Data[selectedSubType]?.POS_Manager_Details?.forEach((item, index) => {
        if (item?.name?.includes("RequestTime")) {
          item.hide = true;
        }
      });
      // Data[selectedSubType]?.Bank_Fields?.forEach((item, index) => {
      //   if (item?.name?.includes("RequestTime")) {
      //     item.hide = true;
      //   }
      // });
      Data[selectedSubType]?.FundTransfer_Fields?.forEach((item, index) => {
        if (item?.name?.includes("RequestTime")) {
          item.hide = true;
        }
      });
      
      Data[selectedSubType]?.Query_Process?.forEach((item, index) => {
        
        if (item?.name?.includes("generateFundStatement")) {
          item.hide = true;
        }
      });
   
      
    }

    // loanQuotation();
    // form.resetFields();
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setShowPhoneNumber(false);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
  },[selectedSubType]); // eslint-disable-next-line arrow-body-style


  const getUploadFiles=(listOfUploadFiles)=>{
    const updatedUploadList = listOfUploadFiles?.map((obj) => {
      // Create a new object without the propertyToDelete property
      const { labelName, ...newObject } = obj;
      return newObject;
    });
    // Update the state with the new list
    setUploadFiles(updatedUploadList);
    console.log(uploadFiles)
  }

  const toggleInputField = (field, item, index) => {
    setCurrentActiveLink(item.label)
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
  
  const TransectionPayouts= ()=>{
    
    setIsLoader(true);

        let obj = {
     
                "calltype": selectedCallType,
                "subtype": 1,
                "policy":customerData?.policyNo
      
        }
        
    let response = apiCalls.TransectionPayouts(obj);
    response
      .then((val) => {
        if (val?.data) {
          const res = val?.data;
          if( res?.fundTransfer === 'yes'){
            setShowTransferFields(true);
          }else{
            setShowTransferFields(false);
          }
       
          form.setFieldsValue({
            'surrenderRequestDate':convertDate(new Date(res?.requestDate)),
            'SurrenderValueDate':  convertDate(new Date(res?.valueDate)),
            'Surrenderpos': res?.fundTransfer === 'yes' ? 'fundtransfer' :'fullsurrender',
            'SurrenderValuePayable':+res?.amount + +res?.fundTransferAmount,
            'SurrenderValuePaid':'',
            'FundTransfer':res?.fundTransferAmount,
            'FundTransferPolicy':res?.fundTransderTo,
            'BalanceAmount':res?.amount,
            'PaymentDate':convertDate(new Date(res?.paymentDate)),

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
  

  const getFundValue = ()=>{
    setIsLoader(true);

        let obj = {
          "requestHeader": {
            "source": "POS",
                "carrierCode": "2",
                "branch": "PRA",
                "userId": "website",
                "userRole": "10",
                "partnerId": "MSPOS",
                "processId": "POS",
                "monthendExtension": "N",
                "monthendDate": "18/10/2023"
          },
          "requestBody": {
            "policyno": policyDetails?.policyDetailsObj?.identifiers?.policyNo
          }
        }
        
    let response = apiCalls.GetFundValue(obj);
    response
      .then((val) => {
        if (val?.data) {
          setFundValueData(val?.data?.responseBody?.fundValue);
          const res = val?.data?.responseBody;
        
       

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
          setPennyDropResponse(result?.data);
          setNameReceivedInPennyDrop(result?.data?.result?.data?.source[0]?.data?.accountName)
          form.setFieldsValue({
            InitiatePennyDrop: result?.data?.result?.data?.source[0]?.data?.bankResponse,
            InitiatePennyDropPOS: result?.data?.result?.data?.source[0]?.data?.bankResponse,
          
          })
         }else{
          setNameReceivedInPennyDrop(result?.data?.statusMessage)
          form.setFieldsValue({
            InitiatePennyDrop: result?.data?.statusMessage,
            InitiatePennyDropPOS: result?.data?.statusMessage,
          })
         }
          //SUCCESSFUL TRANSACTION
        } else {
          setIsLoader(false);
          setNameReceivedInPennyDrop('Invalid Input')
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
        setNameReceivedInPennyDrop('Invalid Input')
        form.setFieldsValue({
          InitiatePennyDrop: 'Invalid Input',
          InitiatePennyDropPOS:'Invalid Input',
        })

        setIsLoader(false);
      });
  };



  
  const getDocLink = () => {
    const filteredLinks = isDocLinks?.filter((item) => item.docType?.includes("Surrender"));
    // Assuming you want to return an array of links, you can use map
    const links = filteredLinks?.map((item) => item.link);
    return links?.length>0 ? links[0] : "";
}
const getProcessLink = () => {
  const filteredLinks = isProcessLinks?.filter((item) => item.docType?.includes("Surrender"));
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






const convertDate = (inputDate) => {
  const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
  return formattedDate;
};

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

const handleTextLink=(item)=>{
debugger
  if(item.name ===  "BankAccountDeDupe" ){
    setShowBankDeDupeModal(true);
  }else if(item.name ===  "negavativeList"){
    setNegativeModal(true)
  }else if(item.name ===  "SignatureChange"){
    setSignListModal(true)
  }
  if(item?.name?.toLowerCase().includes("surrendervaluepaid")){
    setTotalFundModal(true);
  }

if(item.name ===  "surrenderForm" || item.name === 'policyBond'|| item.name === 'policyOwnerIDProof'|| item.name === 'policyOwnerAccProof'){
  const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;

  window.open(url, '_blank');
  
}

 if(item.name === "ViewDetails"){
    const values = form.getFieldsValue();
     if(values.STPFailedReason ==='BankDe-Dupe'){
      setShowBankDeDupeModal(true);
     }else if(values.STPFailedReason ==='NegativeList'){
      setNegativeListModal(true);
     }else{
      message.destroy();
      message.error({
        content:
      
          "Select STP Failed Reason",
        className: "custom-msg",
        duration: 2,
      });
     }
 }
}


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
    SrvReqRefNo: POSContactData?.srvReqRefNo || serviceRequestId,
    Status: status,
    RequirementList: seletedRequerimentList,
    // "RequirementComments":requirementCmnt,
    Comments: values?.Comments,
    TransactionPayload: [],
  };

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
}
  )
}
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
  "TagName": "BankAccountDeDupe",
  "TagValue": values.BankAccountDeDupe

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
},{
  "Status": "Create",
  "TagName": "RequestFor",
  "TagValue": values.RequestFor
}
  )
}
setIsLoader(true);
  let response = apiCalls.POSActionsOnContactDetails(obj);
  response
    .then((val) => {
      if (val?.data) {
        setAlertTitle(`${val?.data?.message}`);
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


const getRaiseRequirements = () => {
  const formData = form.getFieldValue();
  setRaiseRequirementOpen(true);
  setRequirementLoader(true);
  let obj = {
    calltype: props?.selectedCallType,
    subtype: 3
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
    saveRequest(formData);
 }
  // }else{
  //   POSActionsOnContactDetails(null, "REJECTED");
  // }
  
};

const handleSubmit = (values) => {
   // if(selectedSubType==="surrenderrequest"){
  //   setIsShowPOSScreen(!isShowPOSScreen);
  // }

  


  //POSApprove RaiseRequirement
  if (POSContactData && customerData?.isPOS) {
      if (clickedButton === "RaiseRequirement") {
        getRaiseRequirements()
        // POSActionsOnContactDetails(values, "REJECTED");
      } else if (clickedButton === "POSApprove") {
        POSActionsOnContactDetails(null, "APPROVED");
      }
  
  } else {
    // if (values.ValidateSignature === "no") {
    //   getRaiseRequirements();
    // } else {
      saveRequest();
    //}
  }
 


}
const sum =(val1,  val2)=>{
  if(val1 && val2){
    let val = parseFloat(val1.replace(/,/g, ''))  - parseFloat(val2.replace(/,/g, ''))
    return val.toLocaleString('en-IN')
  }

}
const saveRequest= ()=>{
  setIsLoader(true);
  setShowAlert(false);
  const values = form.getFieldsValue();
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: subTypeId[selectedSubType], // Required
      Category: selectedSubType==='rechecksurrenderpayout' ? 2 : assistFor[values.assistFor],  //Assist For
      CustomerId: customerData?.laClientID,
      CustRole:1,
      RequestSource: 1, // Required
      RequestChannel: 3, // Required
      ApplicationNo:
      policyDetails?.policyDetailsObj?.identifiers?.applicationNo,
      PolicyNo: policyDetails?.policyDetailsObj?.identifiers?.policyNo, // Required
      proposerName: policyDetails?.policyDetailsObj?.identifiers?.po_Name,
      policyStatus:
      policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus,
      plan: policyDetails?.policyDetailsObj?.planAndStatus?.planName,
      DOB: convertDate(customerData?.dob),
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.name,
      ModifiedOn: new Date(),
      ModifiedByRef: "Test123",
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime: new Date(),
      CustSignDateTime: values?.CustSignDateTime
      ? new Date(values?.CustSignDateTime)
      : new Date(),

      "TransactionData": [

           
      ],
      // "Uploads": uploadFiles,
      Uploads: uploadFiles,
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



  if(currentActiveLink === 'Send Surrender Process'){
    obj.TransactionData.push(  {
      "Status": "Create",
      "TagName": "SurrenderFileType",
      "TagValue": "SURRENDERPROCESS"
    })
  }else if(currentActiveLink === 'Generate Fund Statement'){
    obj.TransactionData.push({
      "Status": "Create",
      "TagName": "SurrenderFileType",
      "TagValue": "UNITSTATEMENT"
    })
  }else if(currentActiveLink === 'Surrender Value Letter'){
    obj.TransactionData.push( {
      "Status": "Create",
      "TagName": "SurrenderFileType",
      "TagValue": "SURRENDERVALUE"
    })
  }


if(selectedSubType ==='surrenderquery'){
    obj.TransactionData.push(
      { Status: "Create", TagName: "DocLink", TagValue: getDocLink() || ""},
      { Status: "Create", TagName: "ProcessLink", TagValue: getProcessLink() || ""},
      {
      "Status": "Create",
      "TagName": "PayableAmount",
      "TagValue": values.TotalSurrenderValue?.replace(/,/g, '')
    },
    {
      "Status": "Create",
      "TagName": "ProductUIN",
      "TagValue": "1212"
    },
        {
      "Status": "Create",
      "TagName": "SurrenderDate",
      "TagValue":  values.SurrenderDate?values.SurrenderDate:new Date()
    })
  } else if(selectedSubType ==='surrenderretention'){

    obj.TransactionData.push(
      
      {
        "Status": "Create",
        "TagName": "PayableAmount",
        "TagValue": values.TotalSurrenderValue?.replace(/,/g, '')
      },
      {
        "Status": "Create",
        "TagName": "ProductUIN",
        "TagValue": "1212"
      },
          {
        "Status": "Create",
        "TagName": "SurrenderDate",
        "TagValue":  values.SurrenderDate?values.SurrenderDate:new Date()
      },
      {
			"Status": "Create",
			"TagName": "CustomerRetained",
			"TagValue": values.customerRetained // yes or no if yes all below transection data optional
		})
  }else if(selectedSubType ==='surrenderrequest' && values.FundTransfer === 'yes'){
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
        "TagName": "TotalAmount",
        "TagValue": values.TotalSurrenderValue?.replace(/,/g, '')
      },

    {
			"Status": "Create",
			"TagName": "FundTransfer",
			"TagValue": values.FundTransfer
		},
        {
          "Status": "Create",
          "TagName": "ValidatedBy",
          "TagValue": "form"
		},
        {
			"Status": "Create",
			"TagName": "RequestTime",
			"TagValue": values.RequestTime
		},
        {
			"Status": "Create",
			"TagName": "ReasonForSurrender",
			"TagValue": values.ReasonForSurrender
		},
        {
			"Status": "Create",
			"TagName": "FundTransferTo",
			"TagValue": values.FundTransferTo
		},
		{
			"Status": "Create",
			"TagName": "FundTransferAmount",
			"TagValue": values.FundTransferAmount?.replace(/,/g, '')
		},
        {
			"Status": "Create",
			"TagName": "RelationsToFTPolicy",
			"TagValue": values.RelationsToFTPolicy
		},
        {
			"Status": "Create",
			"TagName": "NameOfFundTransferPolicyOwner",
			"TagValue": values.NameOfFundTransferPolicyOwner
		},
		{
			"Status": "Create",
			"TagName": "BalanceAmountForSurrender",
			"TagValue": values.BalanceAmountForSurrender
		},
    {
			"Status": "Create",
			"TagName": "PayableAmount",
			"TagValue": values.BalanceAmountForSurrender?.replace(/,/g, '')
		},
    {
      "Status": "Create",
      "TagName": "NameAsMentionedInTheBank",
      "TagValue": values.NameAsMentionedInTheBank 
    },
        {
      "Status": "Create",
      "TagName": "BankIFSC",
      "TagValue": values.BankIFSC
    },
    {
      "Status": "Create",
      "TagName": "BankAccountNumber",
      "TagValue":  BankAccNo
    },
        {
      "Status": "Create",
      "TagName": "ConfirmBankAccountNumber",
      "TagValue":  CNFBankAccNo
    },
        {
      "Status": "Create",
      "TagName": "BankName",
      "TagValue": values.BankName
    },
    {
      "Status": "Create",
      "TagName": "InitiatePennyDrop",
      "TagValue": values.InitiatePennyDrop
    },
    {
      "Status": "Create",
      "TagName": "PennyDropResponse",
      "TagValue": JSON.stringify(PennyDropResponse) 
    },
		{
			"Status": "Create",
			"TagName": "BranchReceivedDate",
			"TagValue":  new Date(values.BranchReceivedDate)
		},
    {
      "Status": "Create",
      "TagName": "ReasonForDelay",
      "TagValue": values.ReasonForDelay
    },
		{
			"Status": "Create",
			"TagName": "ValidateSignature",
			"TagValue": values.ValidateSignature
		},
		{
			"Status": "Create",
			"TagName": "Comments",
			"TagValue":  values.Comments
		},{
			"Status": "Create",
			"TagName": "NameReceivedinPennyDrop",
			"TagValue":  NameReceivedInPennyDrop?NameReceivedInPennyDrop:''
		},
    
    
    );
  }else if(selectedSubType ==='surrenderrequest' && values.FundTransfer === 'no'){
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
       
        "TagValue":  customerData?.premiumAmt?.replace(/,/g, '')
      },

      {
        "Status": "Create",
        "TagName": "PayableAmount",
        "TagValue": values.TotalSurrenderValue?.replace(/,/g, '')
      },
      {
        "Status": "Create",
        "TagName": "FundTransferAmount",
        "TagValue": 0
      },
      {
        "Status": "Create",
        "TagName": "TotalAmount",
        "TagValue": values.TotalSurrenderValue?.replace(/,/g, '')
      },
      {
        "Status": "Create",
        "TagName": "FundTransfer",
        "TagValue":  values.FundTransfer
      },
          {
            "Status": "Create",
            "TagName": "ValidatedBy",
            "TagValue": "form"
      },
    
          {
        "Status": "Create",
        "TagName": "ReasonForSurrender",
        "TagValue":  values.ReasonForSurrender
      },
      {
        "Status": "Create",
        "TagName": "NameAsMentionedInTheBank",
        "TagValue": values.NameAsMentionedInTheBank 
      },
          {
        "Status": "Create",
        "TagName": "BankIFSC",
        "TagValue": values.BankIFSC
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
        "TagValue": values.BankName
      },
      {
        "Status": "Create",
        "TagName": "PennyDropResponse",
        "TagValue": JSON.stringify(PennyDropResponse) 
      },
      {
        "Status": "Create",
        "TagName": "InitiatePennyDrop",
        "TagValue": values.InitiatePennyDrop
      },
      {
        "Status": "Create",
        "TagName": "BranchReceivedDate",
        "TagValue": new Date(values.BranchReceivedDate)
      },
      {
        "Status": "Create",
        "TagName": "ReasonForDelay",
        "TagValue": values.ReasonForDelay
      },
      {
        "Status": "Create",
        "TagName": "ValidateSignature",
        "TagValue": values.ValidateSignature
      },
      {
        "Status": "Create",
        "TagName": "Comments",
        "TagValue": values.Comments
      }  
    )
  }else if(selectedSubType ==='rechecksurrenderpayout'){
    obj.TransactionData.push(	
      
      {
        "Status": "Create",
        "TagName": "surrenderRequestDate",
        "TagValue": values.surrenderRequestDate
    },
      {
        "Status": "Create",
        "TagName": "SurrenderValueDate",
        "TagValue": values.SurrenderValueDate
    },
    {
      "Status": "Create",
      "TagName": "RequestFor",
      "TagValue": values.Surrenderpos
  },
    {
      "Status": "Create",
      "TagName": "SurrenderValuePayable",
      "TagValue": values.SurrenderValuePayable
  }, 

  {
    "Status": "Create",
    "TagName": "SurrenderValuePaid",
    "TagValue": values.SurrenderValuePaid
}, 
  
  {
    "Status": "Create",
    "TagName": "FundTransfer",
      "TagValue": values.FundTransfer
},
{
  "Status": "Create",
  "TagName": "FundTransferPolicy",
    "TagValue": values.FundTransferPolicy
},
{
  "Status": "Create",
  "TagName": "BalanceAmount",
    "TagValue": values.BalanceAmount
},
{
  "Status": "Create",
  "TagName": "PaymentDate",
  "TagValue": values.PaymentDate
},
{
  "Status": "Create",
  "TagName": "ReasonForReEvaluation",
  "TagValue": values.ReasonForReEvaluation
},
{
  "Status": "Create",
  "TagName": "RequestorComments",
  "TagValue": values.RequestorComments
},
{
  "Status": "Create",
  "TagName": "SurrenderValuePaid",
  "TagValue": totalSurrenderAmount
},


    )

  }
// if(values.ValidateSignature === 'no'){
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
        if(selectedSubType ==='surrenderrequest' || selectedSubType ==='rechecksurrenderpayout' || (selectedSubType==="surrenderretention" && formFeilds?.customerRetained === 'yes')){
          setNavigateTo("/advancesearch");
        }
      
       setShowAlert(true);
       if(selectedSubType==="surrenderquery"){
        // setSelectedSubType('surrenderretention');
        // surrenderForm?.setFieldsValue({subType: 5})
        setShowQueryFields(false);
        setShowRequestFields(false);
        setShowRetentionFields(true);
        setNavigateTo("/advancesearch");
      }else if(selectedSubType==="surrenderretention" && formFeilds?.customerRetained === 'no'){
        setSelectedSubType('surrenderrequest');
        surrenderForm?.setFieldsValue({subType: 1})
        setShowQueryFields(false);
        setShowRetentionFields(false);
        setShowRequestFields(true);
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
            form.setFieldsValue({ TotalSurrenderValue: 0 });
                if(val?.data?.responseBody?.errormessage){
                  setAlertTitle(val?.data?.responseBody?.errormessage );
                }else{
                  setAlertTitle('Unable to fetch Surrender Value');
                }
           
            // setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);
    
              setNavigateTo("/advancesearch");
            
          
           setShowAlert(true);

           
          }else{
            let amount =0;
            if(policyDetails?.policyDetailsObj?.planAndStatus?.productType === 'UL'){
              amount = Number(val?.data?.responseBody?.estimtotal).toLocaleString('en-IN');
            }else{
              amount = Number(val?.data?.responseBody?.totalsurrendervalue).toLocaleString('en-IN');
            }
            
            setTotalSurrenderAmount(amount);
           form.setFieldsValue({ TotalSurrenderValue: amount });
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




  const partialWithdrawalEnquiry = () => {
    setIsLoader(true);
    let obj = {
      "requestHeader": {
       "source": "POS",
           "carrierCode": "2",
           "Branch": "PRA",
           "userId": "website",
           "userRole": "10",
           "partnerId": "MSPOS",
           "processId": "POS",
           "monthendExtension": "N",
           "monthendDate": "09/12/2023"
     },
     "requestBody": {
       "PolicyNumber": customerData?.policyNo,
     }
   }
   
    let response = apiCalls.getPartialWithdrawalEnquiry(obj);
    response
      .then((val) => {
        if (val?.data) {
          setpartialWithdrawalEnquiryd(val?.data?.responseBody);
          setpwAvailableModal(true);

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


  const loanQuotation =(vall)=>{
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
  //         "policyNo": customerData?.policyNo,
  //  "EffectiveDate": moment(new Date(), 'YYYYMMDD').format('YYYYMMDD'),
    "policyNo": customerData?.policyNo,
    "effectiveDate": moment(new Date(), 'YYYYMMDD').format('YYYYMMDD'),

    "LFLAG"  :"",
   "YNFLAG"  :"",
   "ZDOCRET"  :"" 
      }
  }
  
    let response = apiCalls.loanQuotationn(obj);
    response
      .then((val) => {
        if (val?.data?.responseBody?.loanallow) {
          setLoanQuotationData(val?.data?.responseBody);
          if(vall){
             setloanAvailableModal(true)
          }
         
        } else {
          setLoanQuotationData(val?.data);
          message.error({
            content:
            "No Loan Available" ,
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

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };
  
  const handleLabelLink = (item) =>{
  
    setTotalFundModal(false);
    setFinalPayableAmtModal(false);
    if(item?.name?.toLowerCase().includes("totalsurrendervalue")){
      setTotalFundModal(true);
    }
    else if(item?.name?.toLowerCase().includes("payableamount")){
      setFinalPayableAmtModal(true);
    }

    if(item.label === "Initiate Penny Drop"){
      InitiatePennyDropp();
    }
    if(item.name === "InitiatePennyDropPOS" &&  formFeilds.InitiatePennyDrop === 'Invalid Input'){
      InitiatePennyDropp();
    }
  }
  const onBlurInput = (value,item)=>{
 
    const obj = form.getFieldsValue()

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


    // if(item.name === 'ConfirmBankAccountNumber' || item.name === 'BankAccountNumber'){
    //    if(obj.ConfirmBankAccountNumber && obj.BankAccountNumber && (obj.ConfirmBankAccountNumber !== obj.BankAccountNumber) ){
    //     message.destroy();
    //     message.error({
    //       content:
    //         "Bank Number Not matched",
    //       className: "custom-msg",
    //       duration: 2,
    //     });
    //     form.setFieldsValue({ConfirmBankAccountNumber: ''})
  
    //    }
    // }




   if(item?.name?.includes("FundTransferAmount")){

    if(Number(value.replace(/,/g, '')) > Number(totalSurrenderAmount.replace(/,/g, ''))){
      form.setFieldsValue({
        FundTransferAmount:'',
        BalanceAmountForSurrender:''
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
    form.setFieldsValue({BalanceAmountForSurrender: fundValue})
    if(fundValue>0){
      setShowBalanceFields(true);
    }else{
      setShowBalanceFields(false);
    }
 
   }
  }


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
      let customerSignDate = moment(formFeilds?.CustSignDateTime + 1).format("MM/DD/YYYY");
      let dateDiffence = date_diff_indays(selectDate,customerSignDate)
      if(!formFeilds?.CustSignDateTime ||dateDiffence > 0){
        message.destroy();
        message.error({
          content: "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
  
          BranchReceivedDate:""
        })
      return;
      }

    }

    
    if(item?.toLowerCase()==="branchreceiveddate"||item?.name?.toLowerCase()==="branchreceiveddate"){
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("DD/MM/YYYY");
      let selectDate = moment(date + 1).format("DD/MM/YYYY");
      if (selectDate < todayDate) {
        setShowReasonDelayField(true);
      }
    }
  }
  const handleProposerCollapse =(e,label)=>{
    if(label?.toLowerCase().includes("viewdocuments")){
      if(e?.length>0){
        setCollapsePOSDocuments(true);
        setTimeout(()=>{
          form.setFieldsValue({

            ValidateSignature:posBankDetailsObj?.ValidateSignature
          })
        },0)

      } 
      else{setCollapsePOSDocuments(false);}
    }
    else if(label?.toLowerCase().includes("viewrequestdetails")){
    if(e?.length>0){
      setShowPOSRequestFields(true);
    }
    else{setShowPOSRequestFields(false);}
  }
  else if(label?.toLowerCase().includes("viewbankdetails")){
    if(e?.length>0){
      setCollapsePOSBankDetails(true);
      setTimeout(()=>{
        form.setFieldsValue({
          NameAsMentionedInTheBank:posBankDetailsObj?.NameAsMentionedInTheBank,
          BankIFSC:posBankDetailsObj?.BankIFSC,
          BankAccountNumber:posBankDetailsObj?.BankAccountNumber,
          BankName:posBankDetailsObj?.BankName,
          InitiatePennyDrop:posBankDetailsObj?.InitiatePennyDrop,
          NameReceivedinPennyDrop:posBankDetailsObj?.NameReceivedinPennyDrop,
          ValidateSignature:posBankDetailsObj?.ValidateSignature
        })
      },0)
    
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
  const handleRadioChange =(e,item)=>{
   setShowRaiseRequirementBtn(false);
   if(item?.label?.includes("Validate Signature") && e.target.value==="no"){
   //setShowRaiseRequirementBtn(true);
   }else{
     setIsCustomerRetained(e.target.value);
   }
  if(item?.name === "FundTransfer" && e.target.value==="yes"){
    form.setFieldsValue({
      ReasonForSurrender:"investmentpolicy"
    })
  }else{
    form.setFieldsValue({
      ReasonForSurrender:""
    })
  }
 }

  const handleDropdownChange =(e,item)=>{
    setShowPassJVBtn(false);
    setShowTransferFields(false);
    setShowBankDeDupeModal(false);
    if(e==="fundtransfer"&& item?.name?.toLowerCase()==="surrenderpos"){
      setShowPassJVBtn(true);
      setShowTransferFields(true);
    }
    // if(e==="bank"){
    //  setShowBankDeDupeModal(true);
    // }

    // if(e==='negative'){
    //   setNegativeListModal(true);
    // }
  }
  const handleTitleCheckBox = (e,item) => {
    
  }
  const onRadioGroupChange =(e,item)=>{
    let val = item || e.target.value;
    setShowQueryFields(false);
    setShowRetentionFields(false);
    setShowRequestFields(false);

    if(val?.includes("query")){
      setSelectedSubType('surrenderquery');
      surrenderForm?.setFieldsValue({subType: 3})
      setShowQueryFields(true);
    }
    else if(val?.includes("retention")){
      setSelectedSubType('surrenderretention');
      surrenderForm?.setFieldsValue({subType: 5})
   
      setShowRetentionFields(true);
    }
    else if(val?.includes("request")){
      setSelectedSubType('surrenderrequest');
      surrenderForm?.setFieldsValue({subType: 1})
      setShowRequestFields(true);
    }
  }
  const warning = () => {
    Modal.warning({
      content: 'Please select your preferred mode through which you wish to have the receipt',
    });
  };
  const handleLinkValue=(e)=>{
    setAddCCEmail(true);
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

  
 
  // const handleSubmit =(events)=>{
  //   setIsShowPOSScreen(!isShowPOSScreen);
  // }
  return (
    <>
     <Spin spinning={isLoader} fullscreen />
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
          data={
            !isShowPOSScreen
              ? Data[selectedSubType]?.BOE_Details
              : !showPOSMangerScreen ? Data[selectedSubType]?.POS_Details 
              : Data[selectedSubType]?.POS_Manager_Details
          }
          handleEdit = {handleEdit}
          subType={selectedSubType}
          handleTitleCheckBox={handleTitleCheckBox}
          handleDropdownChange={handleDropdownChange}
          handleLabelLink={handleLabelLink}
          onRadioGroupChange={onRadioGroupChange}
          handleProposerCollapse={handleProposerCollapse}
          handleDateChange ={handleDateChange }
          handleTextLink ={handleTextLink }
       
        ></DetailsForm>
        {(selectedSubType === "surrenderquery" || selectedSubType === "surrenderretention" ||selectedSubType === "surrenderrequest") && !isShowPOSScreen&& (
          <>
            {showQueryFields && !isShowPOSScreen && (
              <>
              {totalSurrenderAmount<=0&&
                <DetailsForm
                  data={Data[selectedSubType]?.Query_Fields}
                  subType={selectedSubType}
                  handleDateChange={handleDateChange}
                ></DetailsForm>}

              <DetailsForm
                  data={Data[selectedSubType]?.Query_Process}
                  subType={selectedSubType}
                  handleTitleCheckBox={handleTitleCheckBox}
                  handleDateChange={handleDateChange}
                  toggleInputField={toggleInputField}
                  activeEmailIcons={activeEmailIcons}
                  activeMobileIcons={activeMobileIcons}
                  activeWhatsAppIcons={activeWhatsAppIcons}
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
                </div>
              </>
            )}
            {showRetentionFields && selectedSubType==="surrenderretention" && !isShowPOSScreen && (
              <>
                {/* <DetailsForm
                  data={Data[selectedSubType]?.Retention_Fields}
                  subType={selectedSubType}
                ></DetailsForm> */}
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
                  {!isUlip&&
                  <Button className="surrender-btn" onClick={() => loanQuotation(true)}>
                    Loan Available
                  </Button>
                    }
                  {isUlip&&
                  <Button className="surrender-btn" onClick={() => partialWithdrawalEnquiry()}>
                    PW Available
                  </Button>
                  }
                </span> 

                
  

              </div>
            </Col>
                </Row>
                {isCustomerRetained !== "yes" && (
                  <>
                    <DetailsForm
                      data={Data[selectedSubType]?.customerChoice}
                      subType={selectedSubType}
                      handleRadioChange={handleRadioChange}
                    ></DetailsForm>
                  </>
                )}
                {isCustomerRetained === "yes" && (
                  <>
                    <DetailsForm
                      data={Data[selectedSubType]?.CustomerRetained}
                      subType={selectedSubType}
                      handleRadioChange={handleRadioChange}
                      suffix={!isShowPOSScreen && suffix}
                      form={form}
                      getUploadFiles={getUploadFiles}
                    ></DetailsForm>
                  </>
                )}
                {isCustomerRetained === "no" && (
                  <>
                    <DetailsForm
                      data={Data[selectedSubType]?.RetainedFields}
                      subType={selectedSubType}
                      handleRadioChange={handleRadioChange}
                      suffix={!isShowPOSScreen && suffix}
                      form={form}
                      getUploadFiles={getUploadFiles}
                      toggleInputField={toggleInputField}
                      activeEmailIcons={activeEmailIcons}
                      activeMobileIcons={activeMobileIcons}
                      activeWhatsAppIcons={activeWhatsAppIcons}
                    ></DetailsForm>
                   {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
                  </>
                )}
                <div className="contact-details-btn">
                  {isCustomerRetained === "yes" && (
                    <>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="primary-btn"
                      >
                        Surrender Retain
                      </Button>{" "}
                    </>
                  )}

                  {isCustomerRetained === "no" && (
                    <>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="primary-btn"
                      >
                        Submit
                      </Button>{" "}
                    </>
                  )}
                </div>
              </>
            )}

            {showRequestFields && !isShowPOSScreen && (
              <>
                <DetailsForm
                  data={Data[selectedSubType]?.Request_Fields}
                  subType={selectedSubType}
                  handleRadioChange={handleRadioChange}
                ></DetailsForm>
                {isCustomerRetained === "yes" && (
                  <>
                    <DetailsForm
                      data={Data[selectedSubType]?.FundTransfer_Fields}
                      subType={selectedSubType}
                      handleTitleCheckBox={handleTitleCheckBox}
                      handleDropdownChange={handleDropdownChange}
                      handleLabelLink={handleLabelLink}
                      onRadioGroupChange={onRadioGroupChange}
                      handleDateChange={handleDateChange}
                      handleRadioChange={handleRadioChange}
                      suffix={!isShowPOSScreen && suffix}
                      onBlurInput ={onBlurInput }
                      form={form}
                      getUploadFiles={getUploadFiles}
                    ></DetailsForm>
                     {showBalanceFields && <>
                  <DetailsForm
                      data={Data[selectedSubType]?.BalanceAmt_Fields}
                      subType={selectedSubType}
                      handleTitleCheckBox={handleTitleCheckBox}
                      handleDropdownChange={handleDropdownChange}
                      handleLabelLink={handleLabelLink}
                      onRadioGroupChange={onRadioGroupChange}
                      handleDateChange={handleDateChange}
                      handleRadioChange={handleRadioChange}
                      suffix={!isShowPOSScreen && suffix}
                      form={form}
                      getUploadFiles={getUploadFiles}
                      onBlurInput ={onBlurInput }
                      disabledDate={disabledDate}
                    ></DetailsForm>
                </>}
                {!showBalanceFields && <>
                  <DetailsForm
                      data={Data[selectedSubType]?.NoBalance_Fields}
                      subType={selectedSubType}
                      handleTitleCheckBox={handleTitleCheckBox}
                      handleDropdownChange={handleDropdownChange}
                      handleLabelLink={handleLabelLink}
                      onRadioGroupChange={onRadioGroupChange}
                      handleDateChange={handleDateChange}
                      handleRadioChange={handleRadioChange}
                      suffix={!isShowPOSScreen && suffix}
                      form={form}
                      getUploadFiles={getUploadFiles}
                      disabledDate={disabledDate}
                    ></DetailsForm>
                </>}
                  </>
                )}
               

                {isCustomerRetained === "no" && (
                  <>
                    <DetailsForm
                      data={Data[selectedSubType]?.Bank_Fields}
                      subType={selectedSubType}
                      handleTitleCheckBox={handleTitleCheckBox}
                      handleDropdownChange={handleDropdownChange}
                      handleLabelLink={handleLabelLink}
                      onRadioGroupChange={onRadioGroupChange}
                      handleDateChange={handleDateChange}
                      handleRadioChange={handleRadioChange}
                      suffix={!isShowPOSScreen && suffix}
                      onBlurInput = {onBlurInput}
                      disabledDate={disabledDate}
                      form={form}
                      getUploadFiles={getUploadFiles}
                    ></DetailsForm>
                  </>
                )}
                {showResonDelayField && (
                  <>
                    <DetailsForm
                      data={Data[selectedSubType]?.ReasonSubmission}
                      subType={selectedSubType}
                      onBlurInput = {onBlurInput}
                    ></DetailsForm>
                  </>
                )}
                <div className="contact-details-btn">
                <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                       
                      >
                        {!isShowPOSScreen
                          ? "Submit"
                          : "Approve"}
                      </Button>
                </div>
              </>
            )}
          </>
        )}

        {/* surrender POS Manger Code Start */}
        {selectedSubType === "surrenderrequest" && isShowPOSScreen&& (
          <>
          {!hideViewRequestDetails&&<>
          <DetailsForm
              data={Data[selectedSubType]?.View_POS_Request_title}
              handleProposerCollapse={handleProposerCollapse}
            ></DetailsForm>
             {showPOSRequestFields && (
                  <>
                    <DetailsForm
                      data={Data[selectedSubType]?.View_Request_Details}
                      subType={selectedSubType}
                      handleTitleCheckBox={handleTitleCheckBox}
                      handleDropdownChange={handleDropdownChange}
                      handleLabelLink={handleLabelLink}
                      onRadioGroupChange={onRadioGroupChange}
                      handleProposerCollapse={handleProposerCollapse}
                    ></DetailsForm>
                  </>
                )}
                </>}
            <DetailsForm
              data={Data[selectedSubType]?.View_Documents_title}
              handleProposerCollapse={handleProposerCollapse}
            ></DetailsForm>
            {collapsePOSDocuments && (
              <>
                <DetailsForm
                  data={Data[selectedSubType]?.View_Documents}
                  subType={selectedSubType}
                  handleTitleCheckBox={handleTitleCheckBox}
                  handleDropdownChange={handleDropdownChange}
                  handleLabelLink={handleLabelLink}
                  onRadioGroupChange={onRadioGroupChange}
                  handleProposerCollapse={handleProposerCollapse}
                  handleRadioChange ={handleRadioChange }
                  handleTextLink ={handleTextLink }
                ></DetailsForm>
              </>
            )}
             {!hideViewBankDetails&&<>
            <DetailsForm
              data={Data[selectedSubType]?.View_BankDetails_title}
              handleProposerCollapse={handleProposerCollapse}
            ></DetailsForm>
            {collapsePOSBankDetails && (
              <>
                <DetailsForm
                  data={Data[selectedSubType]?.View_Bank_Details}
                  subType={selectedSubType}
                  handleTitleCheckBox={handleTitleCheckBox}
                  handleDropdownChange={handleDropdownChange}
                  handleLabelLink={handleLabelLink}
                  onRadioGroupChange={onRadioGroupChange}
                  handleProposerCollapse={handleProposerCollapse}
                ></DetailsForm>
              </>
            )}
            </>}
            <DetailsForm
              data={showPOSMangerScreen?Data[selectedSubType]?.View_POS_Manager_Action_title:Data[selectedSubType]?.View_POS_Action_title}
              handleProposerCollapse={handleProposerCollapse}
            ></DetailsForm>
            {collapsePOSAction && (
              <>
                <DetailsForm
                  data={showPOSMangerScreen?Data[selectedSubType]?.POS_Manager_Action: Data[selectedSubType]?.POS_Action}
                  subType={selectedSubType}
                  handleTitleCheckBox={handleTitleCheckBox}
                  handleDropdownChange={handleDropdownChange}
                  handleLabelLink={handleLabelLink}
                  onRadioGroupChange={onRadioGroupChange}
                  handleProposerCollapse={handleProposerCollapse}
                  handleLinkValue={handleLinkValue}
                  handleTextLink ={handleTextLink }
                ></DetailsForm>
                {addCCEmail && (
                  <>
                    {" "}
                    <DetailsForm
                      data={Data[selectedSubType]?.Add_CC}
                      subType={selectedSubType}
                    ></DetailsForm>
                  </>
                )}
                <DetailsForm
                  data={Data[selectedSubType]?.Comments}
                  subType={selectedSubType}
                ></DetailsForm>
              </>
            )}
            <div className="contact-details-btn">
              <Button type="primary" value="RaiseRequirement"  htmlType="submit" onClick={() => setClickedButton("RaiseRequirement")} className="primary-btn" >
                Raise Requirement
              </Button>
              <Button type="primary" value="POSApprove"  onClick={() => setClickedButton("POSApprove")}  htmlType="submit" className="primary-btn"  >
                Approve
              </Button>
              

              {showPassJVBtn && (
                    <>
                      <Button type="primary" className="primary-btn">
                        Pass JV For FT
                      </Button>{" "}
                    </>
                  )}
                   {/* <Button type="primary" className="primary-btn" onClick={()=>setShowPOSMangerScreen(!showPOSMangerScreen)}>
                POS Manager Screen
              </Button>{" "} */}
            </div>
          </>
        )}
        {/* surrender POS Manger Code End */}

        {/* rechecksurrenderpayout code Start */}
        {selectedSubType === "rechecksurrenderpayout" && (
          <>
          {!isShowPOSScreen&&<>
          {showTransferFields&&
            <DetailsForm
              data={Data[selectedSubType]?.Fund_Transfer_Fields}
              subType={selectedSubType}
              handleTextLink ={handleTextLink}
            ></DetailsForm>}
            <DetailsForm
              data={Data[selectedSubType]?.Other_Fileds}
              subType={selectedSubType}
              handleDateChange={handleDateChange}
              handleDropdownChange={handleDropdownChange}
              handleTextLink ={handleTextLink}
            ></DetailsForm>
            </>}
            <div className="contact-details-btn">
              <Button type="primary"  onClick={() => setClickedButton("POSApprove")} htmlType="submit" className="primary-btn">
                Submit
              </Button>{" "}
            </div>
          </>
        )}
      </Form>
      {/* </Spin> */}
      
      <Modal
        title=""
        open={surrenderApplicableModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setSurrenderApplicableModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div>Policy cannot be surrendered as surrender is not applicable</div>
      </Modal>

      <Modal
        title={(isUlip)? "Total Fund Value" : "Total Surrender Value"}  
        open={totalFundsModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setTotalFundModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container">
        {!isUlip&&<>
          <table className="responsive-table">
            <tr>
              <td width={50}>Surrender Value Date</td>
              <td width={70}>{moment(new Date(), 'YYYYMMDD').format('DD/MM/YYYY')}</td>
            </tr>
            <tr>
              <td>Gross Surrender Value(+)</td>
              <td>{totalSurrenderAmount}</td>
            </tr>
            <tr>
              <td>Less loan(-)</td>
              <td>
              {/*
              {
                LoanQuotationData?.loanallow
                  ? Number(LoanQuotationData?.loanallow).toLocaleString('en-IN')
                  : '0'
              }
            */}

{
  loanValue?loanValue:''
}
               
                </td>
            </tr>
            <tr>
              <td>TDS(-)</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Net Surrender Value</td>
              <td>{sum(totalSurrenderAmount, LoanQuotationData?.loanallow ? LoanQuotationData?.loanallow : 0)}</td>
            </tr>
          </table>
          <div className="table-container">
          <table className="responsive-table" style={{ marginTop: "20px" }}>
            <tr>
              <td width={50}>Total Premium Paid</td>
              <td width={62}></td>
            </tr>
            <tr>
              <td>Loss Gain</td>
              <td></td>
            </tr>
          </table>
        </div>
          
          </>
        }

        {isUlip&&<>
          <table className="responsive-table text-center">
            <thead>
              <tr>
                <th>Fund Name</th>
                <th>NAV Date</th>
                <th>NAV</th>
                <th>Units Available</th>
                <th>Fund Value</th>
      
              </tr>
            </thead>
   
            {FundValueData?.map((item,index) => (
             <>  {item?.curuntval > 0 &&
            <tr key={index}>
            <td>
              {item?.vrtfund}
            </td>
            <td>{moment(item?.effectivedate, 'YYYYMMDD').format('DD/MM/YYYY')}
          
            </td>
            
              <td>{Number(item?.unitprice).toLocaleString('en-IN')}</td>
              <td>{Number(item?.curuntbal).toLocaleString('en-IN')} </td>
              <td>{Number(item?.curuntval).toLocaleString('en-IN')} </td>
            </tr>
             }</> 
            
          ))
          }
           {FundValueData?.length === 0  &&
               <tr>
                  <td colspan="5">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
          </table></>
        }



        </div>
     
      </Modal>
      <Modal
        title="Final Payable Amount"
        open={finalPayableAmtModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setFinalPayableAmtModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container">
          <table className="responsive-table">
            <tr>
              <td width={50}>Gross Surrender Value</td>
              <td width={70}>{totalSurrenderAmount}</td>
            </tr>
            <tr>
              <td>Less Loan (-)</td>
              <td>
                          {
              // LoanQuotationData?.numloans
              //   ? Number(LoanQuotationData?.numloans).toLocaleString('en-IN')
              //   : '0'
              
            }


                
                </td>
            </tr>
            <tr>
              <td>Less TDS (-)</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Penal Interest (+)</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Final Payable Amount</td>
              <td>{sum(surrenderEnquiry?.totalsurrendervalue ,LoanQuotationData?.numloans ? LoanQuotationData?.numloans  :0) }</td>
            </tr>
          </table>
        </div>
      </Modal>



      <Modal
        title=""
        open={loanAvailableModal}
        destroyOnClose={true}
        width={600}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setloanAvailableModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="">
       <h5> Available Loan Amount Rs  {Number(LoanQuotationData?.loanallow ?  LoanQuotationData?.loanallow : 0).toLocaleString('en-IN')}  </h5> 

        </div>
      </Modal>

      <Modal
        title=""
        open={pwAvailableModal}
        destroyOnClose={true}
        width={600}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setpwAvailableModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="">
       <h5>  PW Available {partialWithdrawalEnquiryd?.totalamt  } </h5> 

        </div>
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


export default connect(mapStateToProps)(Surrender);



import React, { useState, useEffect } from "react";
import { Form, Spin, Button,Checkbox,message,Modal,Tooltip } from "antd";
import { Data } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import apiCalls from "../../api/apiCalls";
import ContactForm from "../../utils/ContactForm";
import CloseIcon from '../../assets/images/close-icon.png';
import { connect,useSelector } from "react-redux";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const PartialWithdrawal = (props) => {
  dayjs.extend(customParseFormat);
const {selectedSubType,customerData,typesForm,setSelectedSubType, policyDetails,POSContactData} = props;
const suffix = <img src={UploadIcon} alt="" />;
const [form] = Form.useForm();
const [isLoading,setIsLoading] = useState(false);
const [showResonDelayField,setShowReasonDelayField] = useState(false);
const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
const [isShowPOSScreen_Manager, setIsShowPOSScreen_Manager] = useState(false);
const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
const [showEmailFields,setShowEmailFields] = useState(false);
const [showPhoneNumber, setShowPhoneNumber] = useState(false);
const [showEmailAddress, setShowEmailAddress] = useState(false);
const [showWhatsApp, setShowWhatsApp] = useState(false);
const [activeEmailIcons, setActiveEmailIcons] = useState([]);
const [activeMobileIcons, setActiveMobileIcons] = useState([]);
const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
const [requirementModalLoader, setRequirementLoader] = useState(false);
const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
const [uploadFiles,setUploadFiles] = useState([]);
const [isShowTransferFields,setIsShowTransferFields] = useState(false);
const [isShowWithdrawalApplicable,setIsShowWithdrawalApplicable] = useState(false);
const [totalFundsModal, setTotalFundModal] = useState(false);
const [finalPayableAmtModal,setFinalPayableAmtModal] = useState(false);
const [partialWithdrawalEnqD,setPartialWithdrawalEnqD] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const [alertTitle, setAlertTitle] = useState("");
const [navigateTo, setNavigateTo] = useState("");
const [alertData, setAlertData] = useState("");
const [CNFBankAccNo, setCNFBankAccNo] = useState("");
const [BankAccNo, setBankAccNo] = useState("");
const [clickedButton, setClickedButton] = useState("");
const [PennyDropResponse,setPennyDropResponse] = useState({});
const [TotalFundVal, setTotalFundVal] = useState();
const [fundValueData,setFundValueData] = useState([]);

const [isLoader, setIsLoader] = useState(false);
const formFeilds = form.getFieldsValue();
const loginInfo = useSelector(state => state);
const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
const posScreenObj = {
  TotalFundValue:'',
  SelectFund:"",
  PayableAmount:"",
  NameAsMentionedInTheBank:"",
  BankIFSC:"",
  BankAccountNumber:"",
  BankName:"",
  InitiatePennyDrop:"",
  ValidateSignature:'',
  Comments:'',
  FundTransfer:'',
  FundTransferTo:"",
  FundTransferAmount:'',
  RelationstoFTPolicy:'',
  NameofFundTransferPolicyOwner:'',
  EnteredAmount:''
}

useEffect(() => {


  if(selectedSubType === "partialwithdrawalstatusenquiry"){
    debugger
      // Assuming the past date is in the format dd-mm-yyyy
      const parseDate = (dateString) => {
        const year = parseInt(dateString.substring(0, 4), 10);
        const month = parseInt(dateString.substring(4, 6), 10) - 1; // Month is zero-based in JavaScript Dates
        const day = parseInt(dateString.substring(6, 8), 10);
        return new Date(year, month, day);
      };

      const pastDate = parseDate(policyDetails?.policyDetailsObj?.saDetails?.rcd);
      const today = new Date();

      // Calculate the difference in milliseconds
      const timeDifference = today - pastDate;

      // Convert milliseconds to days
      const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      // Calculate the difference in years
      const yearDifference = today?.getFullYear() - pastDate?.getFullYear();

      // Check if there are remaining days after subtracting complete years
      const remainingDays = dayDifference % 365;

      if(yearDifference  < 5){
        debugger

        if(policyDetails?.policyDetailsObj?.saDetails?.rcd){
          const parsedDate = new Date(
            parseInt(policyDetails?.policyDetailsObj?.saDetails?.rcd.substring(0, 4), 10),
            parseInt(policyDetails?.policyDetailsObj?.saDetails?.rcd.substring(4, 6), 10) - 1, // Month is zero-based in JavaScript Dates
            parseInt(policyDetails?.policyDetailsObj?.saDetails?.rcd.substring(6, 8), 10)
          );
          
          // Calculate the date 5 years after
          const date5YearsAfter = addYears(parsedDate, 5);
          
          // Format the result as "dd/mm/yyyy"
          const formattedDate = formatDate(date5YearsAfter);
          form.setFieldsValue({
            PartialWithdrawalcanbemadeafter : formattedDate
          })
        }

        setIsShowWithdrawalApplicable(false)
        form.setFieldsValue({
          options2 : 'no'
        })
      }else if(yearDifference  >= 5){
        debugger
        form.setFieldsValue({
          options2 : 'yes'
        })
        Data[selectedSubType]?.BOE_Details?.forEach((item, index) => {
           if(item.name === 'PartialWithdrawalcanbemadeafter'){
            item.hide = true
           }
        })
        setIsShowWithdrawalApplicable(true)

      }
      console.log(`Total difference: ${yearDifference} years and ${remainingDays} days.`);

  }
},[selectedSubType])
useEffect(() => {




  
  if (POSContactData && customerData?.isPOS) {
    if(loggedUser?.role === 'posmanager'){
      setIsShowPOSScreen_Manager(true)
    }else{
      setIsShowPOSScreen(true);
      setIsShowPOSScreen_Manager(false)
    }
   
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posScreenObj[element.tagName] = element.tagValue
    });

    

    form.setFieldsValue({
      TotalFundValue:posScreenObj.TotalFundValue,
      SelectFund:posScreenObj.SelectFund,
      EnteredAmount:posScreenObj.EnteredAmount,
      PayableAmount:posScreenObj.PayableAmount,
      NameAsMentionedInTheBank:posScreenObj.NameAsMentionedInTheBank,
      BankIFSC:posScreenObj.BankIFSC,
      BankAccountNumber:posScreenObj.BankAccountNumber,
      BankName:posScreenObj.BankName,
      InitiatePennyDrop:posScreenObj.InitiatePennyDrop,
      ViewFinalPayableAmount:posScreenObj.EnteredAmount,
      ValidateSignature:posScreenObj.ValidateSignature,
      Comments:posScreenObj.Comments,
      ChangeInLast60Days:POSContactData?.personalChange,
      PolicyLoggedLast:POSContactData?.policyLogged,
      FundTransfer:posScreenObj.FundTransfer,
      FundTransferTo:posScreenObj.FundTransferTo,
      FundTransferAmount:posScreenObj.FundTransferAmount,
      RelationstoFTPolicy:posScreenObj.RelationstoFTPolicy,
      NameofFundTransferPolicyOwner:posScreenObj.NameofFundTransferPolicyOwner,
      RequestFor:posScreenObj.FundTransfer === 'yes' ? 'Fund Transfer' : 'Partial Withdrawal',
      BalanceAmountForPartialWithdrawal : +posScreenObj.EnteredAmount - +posScreenObj.FundTransferAmount
    });

    Data[selectedSubType]?.POS_Details?.forEach((item, index) => {
      if (item?.fundTrnsfer === 'yes' && posScreenObj.FundTransfer === 'yes') {
        //debugger
        item.hide = false;
      }else if(item?.fundTrnsfer === 'yes' && posScreenObj.FundTransfer === 'no'){
        item.hide = true;
      }
    });


  }else{
   // getPartialWithdrawalEnquiry()
    GetPartSurrenderEnquiryy()
  }



},[]); 

const addYears = (date, years) => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};





const GetPartSurrenderEnquiryy = () => {
  //debugger
  setIsLoader(true);
  //debugger
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
      "policyNo": customerData?.policyNo,
  }

  }

  let response = apiCalls.GetPartSurrenderEnquiry(obj);
  response
    .then((val) => {
      //debugger
      if (val?.data) {
        if(val?.data?.responseBody?.errorcode === "1"){
        setIsLoader(false);
        setAlertTitle(`${val?.data?.responseBody?.values}`);
         setShowAlert(true);
         //setNavigateTo("/advancesearch");
        return
        }

        if(val?.data?.responseBody.errorcode=== '0'){
          if(parseFloat(val?.data?.responseBody?.actvalue) === 0){
            setAlertTitle(`Actual value is 0, PW Not Allowed`);
            setShowAlert(true);
             //setNavigateTo("/advancesearch");
          }
          setPartialWithdrawalEnqD(val?.data?.responseBody);
          setTotalFundVal(val?.data?.responseBody?.actvalue.toLocaleString('en-IN'))
          val = Number(parseFloat(val?.data?.responseBody?.actvalue)).toLocaleString('en-IN');

          form.setFieldsValue({
            MaxPartialWithdwral :val,
            MaxPartialWithdrawalpossible:val,
          });
          getFundValue()
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




const getPartialWithdrawalEnquiry= () => {
  //debugger
  setIsLoader(true);
  //debugger
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
        if(val?.data?.responseBody?.errorcode === "1"){
        setIsLoader(false);
        setAlertTitle(`${val?.data?.responseBody?.values}`);
         setShowAlert(true);
         //setNavigateTo("/advancesearch");
        return
        }

        if(val?.data?.responseBody.errorcode=== '0'){
          if(parseFloat(val?.data?.responseBody?.actvalue) === 0){
            setAlertTitle(`Actual value is 0, PW Not Allowed`);
            setShowAlert(true);
             //setNavigateTo("/advancesearch");
          }
          setPartialWithdrawalEnqD(val?.data?.responseBody);
          setTotalFundVal(val?.data?.responseBody?.actvalue.toLocaleString('en-IN'))
          val = parseFloat(val?.data?.responseBody?.actvalue)
          form.setFieldsValue({TotalFundValue :val});
          getFundValue()
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



const getFundValue = ()=>{
  //debugger
  setIsLoading(true);

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
          "policyno": customerData?.policyNo,
        }
      }
      
  let response = apiCalls.GetFundValue(obj);
  response
    .then((val) => {
      if (val?.data) {
   

        setFundValueData(val?.data?.responseBody?.fundValue);
        let totalval = val?.data?.responseBody?.fundValue?.reduce((ele, acc)=>{
          return +acc.curuntval + ele
        },0)
        let totalvall = Number(totalval).toLocaleString('en-IN');

        form.setFieldsValue({TotalFundValue :totalvall});
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


const handleError = (errorMessage) => {
  message.destroy();
  message.error({
    content: errorMessage || "Something went wrong please try again!",
    className: "custom-msg",
    duration: 2,
  });
};

const handleDropdownChange= (e,item)=>{
if(e==="yes"&&item?.label?.includes("Do you wish to Opt for Fund Transfer")){
  setIsShowTransferFields(true);
}
else if(e==="no"&&item?.label?.includes("Do you wish to Opt for Fund Transfer")){
  setIsShowTransferFields(false);
}
else if(e==="yes"&&item?.label?.includes("Partial Withdrawal Applicable")){
  setIsShowWithdrawalApplicable(true);
}
else if(e==="no"&&item?.label?.includes("Partial Withdrawal Applicable")){
  setIsShowWithdrawalApplicable(false);
}
}

const disabledDate = (current) => {
  return current && current > dayjs().endOf("day"); // Can not select days before today and today
};

const toggleInputField = (field, item, index) => {
  setShowEmailFields(true);
  form.setFieldsValue({
    'mobileNo': customerData?.mobileNo,
'whatsAppNo':  customerData?.mobileNo,
'emailId': customerData?.emailID
  });
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

const handleUploadLink=()=>{}
const handleTextLink =(item)=>{
  if(item.name ===  "RequestForm" || item.name === 'PolicyOwnerIDProof'|| item.name === 'PolicyOwnerAddressProof'|| item.name === 'PolicyBankAccountProof'){
    const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;
  
    window.open(url, '_blank');
    
  }

}

const handleRadioChange = (e,item) => {
  setShowRaiseRequirementBtn(false);
  // if(e.target.value === "no"&&item?.label?.includes("Validate Signature")){
  //   setShowRaiseRequirementBtn(true);
  // }
  }
  const onBlurInput=(value, item)=>{
    //debugger
    const obj = form.getFieldsValue()
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

    if(item?.name?.includes("PayableAmount")){
      let MaxPartialWithdwral =Number(obj?.MaxPartialWithdwral?.replace(/,/g, ''));  

      if(Number(value) > Number(MaxPartialWithdwral)){
        form.setFieldsValue({
          PayableAmount:'',
          FundTransferAmount:''
        });
        message.error({
          content:
            "Fund Transfer Amount Should not exceed Max Partial Withdwral",
          className: "custom-msg",
          duration: 2,
        });    
        return
      }
      // const fundValue =String( Number(MaxPartialWithdwral)  -  Number(value) );
      // form.setFieldsValue({FundTransferAmount: fundValue})
     }

     if(item?.name?.includes("FundTransferAmount")){
      let PayableAmount = Number(obj?.PayableAmount?.replace(/,/g, '')); 

      if(Number(value) > Number(PayableAmount)){
        form.setFieldsValue({

          FundTransferAmount:''
        });
        message.error({
          content:
            "Fund Transfer Amount Should not exceed Enter Amount",
          className: "custom-msg",
          duration: 2,
        });    
        return
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


  const handleDateChange = (date, item) => {

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
          content: "Branch Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
  
          BranchReceivedDate:""
        })
      return;
      }

    }


    if (item === "BranchReceivedDate") {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("DD/MM/YYYY");
      let selectDate = moment(date + 1).format("DD/MM/YYYY");
      if (selectDate < todayDate) {
        setShowReasonDelayField(true);
      }
    }
  };

  const handleInputChange =(e,item)=>{
    if(item.name?.includes("BankIFSC")&&e.target.value){
      getIFSCBankDetails(e.target.value);
    }
  }

  const getIFSCBankDetails =async(ifscCode)=>{
    let response = await apiCalls.getIFSCBanks(ifscCode);
  if (response.statusText) {
        if (response?.data) {
          form.setFieldsValue({
            BankName: response?.data[0]?.bank
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



       //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={Data[selectedSubType]?.[formType]}
        subType={selectedSubType}
         suffix={!isShowPOSScreen && suffix}
         handleUploadLink={handleUploadLink}
        form={form}
        handleRadioChange={handleRadioChange}
        handleDateChange={handleDateChange}
        handleDropdownChange={handleDropdownChange}
        toggleInputField={toggleInputField}
        activeEmailIcons={activeEmailIcons}
        activeMobileIcons={activeMobileIcons}
        activeWhatsAppIcons={activeWhatsAppIcons}
        getUploadFiles={getUploadFiles}
        handleLabelLink={handleLabelLink}
        onBlurInput={onBlurInput}
        disabledDate={disabledDate}
        handleTextLink ={handleTextLink }
        handleInputChange={handleInputChange}
        handleEdit = {handleEdit}
      ></DetailsForm>
    );
  };
  const handleLabelLink = (item) =>{
    setTotalFundModal(false);
    setFinalPayableAmtModal(false);
    if(item?.name?.toLowerCase().includes("totalfundvalue")){
      setTotalFundModal(true);
    }
    else if(item?.name?.toLowerCase().includes("payableamount")){
      setFinalPayableAmtModal(true);
    }

    if(item.label === "Initiate Penny Drop"){
      InitiatePennyDropp();
    }

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


  const handleSubmit = (values) => {
    //debugger
    // if(selectedSubType==="partialwithdrawalrequest"){
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
      if (formFeilds.ValidateSignature === "no") {
        // getRaiseRequirements();
        saveRequest();
      } else {
        saveRequest();
      }
    }



   

  };

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };

  const saveRequest = (values) => {
    setShowAlert(false);
    setIsLoader(true);
    // if(selectedSubType==="loanrequest")setIsShowPOSScreen(!isShowPOSScreen);

    let obj = {
      "CallType": props?.selectedCallType,
      "SubType": props?.selectedSubTypeId,
      "Category": selectedSubType ==='partialwithdrawalrequest' ? 2:1,
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

if(selectedSubType ==='partialwithdrawalrequest' && formFeilds.FundTransfer === 'no'){
  obj.TransactionData.push(
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
      "TagName": "TotalFundValue",
      "TagValue": formFeilds.TotalFundValue
  },
  {
    "Status": "Create",
    "TagName": "TotalAmount",
    "TagValue": formFeilds.TotalFundValue?.replace(/,/g, '')
},
{
  "Status": "Create",
  "TagName": "EnteredAmount",
  "TagValue": formFeilds.PayableAmount?? formFeilds.PayableAmount?.replace(/,/g, '')?? ''
},
  {
      "Status": "Create",
      "TagName": "SelectFund",
      "TagValue": formFeilds.SelectFund
  },
  {
      "Status": "Create",
      "TagName": "Amount",
      "TagValue": formFeilds.Amount
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
      "TagName": "ReasonForPartialWithdrawal",
      "TagValue": formFeilds.ReasonForPartialWithdrawal
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
      "TagValue": formFeilds.ConfirmBankAccountNumber
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
    "TagName": "PayableAmount",
    "TagValue":formFeilds.PayableAmount?.replace(/,/g, '')
},
  {
    "Status": "Create",
    "TagName": "FundTransferAmount",
    "TagValue": 0
},
{
  "Status": "Create",
  "TagName": "Comments",
  "TagValue": formFeilds.Comments
},
  )
}else if(selectedSubType ==='partialwithdrawalrequest' && formFeilds.FundTransfer === 'yes'){
  //debugger
  let EnteredAmount = Number(formFeilds?.PayableAmount); 
  let FundTransferAmount = Number(formFeilds?.FundTransferAmount); 

  let  payableAmountt  = EnteredAmount - FundTransferAmount
  obj.TransactionData.push( 
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
      "TagName": "TotalFundValue",
      "TagValue":formFeilds.TotalFundValue?? formFeilds.TotalFundValue?.replace(/,/g, '')?? ''
  },
  {
    "Status": "Create",
    "TagName": "TotalAmount",
    "TagValue": formFeilds.TotalFundValue?? formFeilds.TotalFundValue?.replace(/,/g, '')?? ''
},
  {
      "Status": "Create",
      "TagName": "SelectFund",
      "TagValue": formFeilds.SelectFund
  },
  
  {
    "Status": "Create",
    "TagName": "PayableAmount",
    "TagValue": payableAmountt
},
  {
      "Status": "Create",
      "TagName": "EnteredAmount",
      "TagValue": formFeilds.PayableAmount?? formFeilds.PayableAmount?.replace(/,/g, '')?? ''
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
      "TagName": "ReasonForPartialWithdrawal",
      "TagValue": formFeilds.ReasonForPartialWithdrawal
  },

  {
    "Status": "Create",
    "TagName": "FundTransferTo",
    "TagValue": formFeilds.FundTransferTo
},
{
    "Status": "Create",
    "TagName": "FundTransferAmount",
    "TagValue": formFeilds.FundTransferAmount ??  formFeilds.FundTransferAmount?.replace(/,/g, '')??  ''
},  
// {
//   "Status": "Create",
//   "TagName": "PayableAmount",
//   "TagValue": formFeilds.FundTransferAmount ? formFeilds.FundTransferAmount?.replace(/,/g, ''): ''
// }, 
{
  "Status": "Create",
  "TagName": "RelationstoFTPolicy",
  "TagValue": formFeilds.RelationstoFTPolicy
},
{
  "Status": "Create",
  "TagName": "NameofFundTransferPolicyOwner",
  "TagValue": formFeilds.NameofFundTransferPolicyOwner
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
      "TagValue": formFeilds.BankAccountNumber
  },
  {
      "Status": "Create",
      "TagName": "ConfirmBankAccountNumber",
      "TagValue": formFeilds.ConfirmBankAccountNumber
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
    "TagName": "Comments",
    "TagValue": formFeilds.Comments
},
  
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
      TransactionPayload: [
        {
          "Status": "Create",
          "TagName": "POSComments1",
        "TagValue":values?.Comments
      }
      ],
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
        "TagValue": values.ViewFinalPayableAmount? values.ViewFinalPayableAmount?.replace(/,/g, ''): ''
      },
      {
        "Status": "Create",
        "TagName": "InitiatePennyDropPOS",
        "TagValue": values.InitiatePennyDropPOS
      },
       {
      "Status": "Create",
      "TagName": "Comments",
      "TagValue": values.POScomment
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
          handleError(val?.data?.responseBody?.errormessage);
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


    if(raiseRequirementOpen){
      saveRequest();
    }else{
      POSActionsOnContactDetails(null, "REJECTED");
    }
    
  };

  const getUploadFiles=(listOfUploadFiles)=>{
    const updatedUploadList = listOfUploadFiles?.map((obj) => {
      // Create a new object without the propertyToDelete property
      const { labelName, ...newObject } = obj;
      return newObject;
    });
    // Update the state with the new list
    setUploadFiles(updatedUploadList);

  }
  const handleRegisterRequest =()=>{
    setSelectedSubType('partialwithdrawalrequest');
    typesForm?.setFieldsValue({subType: 1})
  }


   

  return (
    <>
      <Spin spinning={isLoading || isLoader} fullscreen/>
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
          {selectedSubType==="partialwithdrawalstatusenquiry"&&<>
          {!isShowPOSScreen && (
            <>
                {renderDetailsForm("BOE_Details")}
                {isShowWithdrawalApplicable&&<>{renderDetailsForm("WithdrawApplicableYes")}</>}
                {renderDetailsForm("ShareProcess")}
                {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
            </>}
            {isShowWithdrawalApplicable&&<>
            <div className="contact-details-btn">
           
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
                {/* <Button
                  type="primary"
                  className="primary-btn"
                  onClick={()=>handleRegisterRequest()}
                >
                  Register Request
                </Button> */}
          </div>
          </>
            }
             </>)}
             </>}
             {selectedSubType==="partialwithdrawalrequest"&&<>
          {!isShowPOSScreen && !isShowPOSScreen_Manager&& (
            <>
             {renderDetailsForm("BOE_Details")}
             {isShowTransferFields&& <>
             { renderDetailsForm("OPTForFundTransferYes")}
             </>}
             {renderDetailsForm("Upload_Fields")}
             {renderDetailsForm("Bank_Details")}
             {renderDetailsForm("Request_Fields")}
             {showResonDelayField&&<>{renderDetailsForm("ReasonSubmission")}</>}
             </>)}
             {isShowPOSScreen && !isShowPOSScreen_Manager &&(<>
             {renderDetailsForm("POS_Details")}
             {isShowTransferFields&&<>{renderDetailsForm("POS_View_FundTransfer_Details")}</>}
             {renderDetailsForm("POS_Action")}
             </>)}
             {isShowPOSScreen_Manager&&(<>
             {renderDetailsForm("POS_Details_Manager")}
             {<>{renderDetailsForm("POS_View_FundTransfer_Details_Manager")}</>}
             {renderDetailsForm("POS_Action_Manager")}
             </>)}
             <div className="contact-details-btn">
            {/* {!showRaiseRequirementBtn&&<> */}
            <Button type="primary" className="primary-btn" htmlType="submit"  onClick={() => setClickedButton("POSApprove")}  
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            {/* </>} */}

            {(isShowPOSScreen || !isShowPOSScreen) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn" htmlType="submit" 
                  onClick={() => setClickedButton("RaiseRequirement")}
                >
                  Raise Requirement
                </Button>
              </>
            )}
          </div>
             </>}

         
        
          
        </Form>

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
        title={"Total Fund Value"}  
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
          <table className="responsive-table text-center">
            <thead>
              <tr>
                <th>Fund Name</th>
                <th>NAV</th>
                <th>Units Available</th>
                <th>Fund Value</th>
      
              </tr>
            </thead>
            
            <tbody>
                  {fundValueData && fundValueData?.map((item, ind) => (
                    <tr key={ind + 1}>
            
                   <td>
                    {item?.vrtfund}
                   </td>
                  
                  <td>
                    {item?.curuntval}
                  </td>
                  <td>
                    {item?.unitprice}
                  </td>
                  <td>
                    {item?.curuntval}
                  </td>
                    
                    </tr>
                  ))}
                  {fundValueData?.length === 0 && (
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
              <td width={50}>Gross Value</td>
              <td width={70}></td>
            </tr>
            <tr>
              <td>Less Loan (-)</td>
              <td></td>
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
              <td></td>
            </tr>
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

export default PartialWithdrawal;
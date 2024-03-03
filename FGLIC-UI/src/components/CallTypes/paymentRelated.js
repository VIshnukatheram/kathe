import React, {useState,useEffect} from "react";
import {PaymentRelatedData} from '../../mainconfig';
import DetailsForm from '../../utils/DetailsForm';
import { Button, Form, Spin,Alert,Modal,Tooltip,Checkbox, message,Input,Row,Col} from 'antd';
import apiCalls from '../../api/apiCalls';
import CloseIcon from "../../assets/images/close-icon.png";
import PopupAlert from "../popupAlert";
import moment from 'moment';
import ContactForm from "../../utils/ContactForm";
import { useSelector } from "react-redux";
import UploadIcon from "../../assets/images/upload.png";
import dayjs from "dayjs";
import ExistUpdateCheckBoxList from "../../utils/ExistUpdateCheckBoxList";
import CheckBoxList from "../../utils/CheckBoxList";


const PaymentRelated = (props) => {

  const loginInfo = useSelector(state => state);

    const [form] = Form.useForm();
    const {
          selectedSubType,
          customerData,
          details,
          POSContactData,
          selectedSubTypeId,
          selectedCallType,
          SelectedSubTypeVal
        } = props;
    const [isShowPOSScreen,setIsShowPOSScreen] = useState(false);  //pos screen showing purpose
    const [isShowTransferFields,setIsShowTransferFields] = useState(false);
    const [showEmailFields,setShowEmailFields] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [data,setData] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [paymentDetailsOpen,setPaymentDetailsOpen] = useState(false);
    const [alertTitle,setAlertTitle]  = useState('');
    const [navigateTo,setNavigateTo]  = useState('');
    const [alertData,setAlertData]  = useState('');
    const [showAlert,setShowAlert]  = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showEmailAddress, setShowEmailAddress] = useState(false);
    const [showWhatsApp, setShowWhatsApp] = useState(false);
    const [activeEmailIcons, setActiveEmailIcons] = useState([]);
    const [activeMobileIcons, setActiveMobileIcons] = useState([]);
    const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
    const [selectCheckBox, setSelectCheckBox] = useState(false);
    const [uploadFiles,setUploadFiles] = useState([]);
    const [checkedList, setCheckedList] = useState([]);
    const [isPaymentMethodSelection,setIsPaymentMethodSelection] = useState("");
    const [isShowRequestFormFields,setIsShowRequestFormFields] = useState(false);
    const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
    const [showResonDelayField,setShowReasonDelayField] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [counter, setCounter] = useState(0);
    const [otpValue, setOtpValue] = useState(null);
    const [sendOTPErrorMsg, setSendOTPErrorMsg] = useState(null);
    const [sendOTPLoader, setSendOTPLoader] = useState(false);
    const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [validateBtnDisable, setValidateBtnDisable] = useState(false);
  const [sendOTPTo,setSendOTPTo] = useState(null);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [paymentMethodList,setPaymentMethodList] = useState([]);
  const [isSelectionMode,setIsSelectionMode] = useState(null);
  const [isUpdateModeLU,setIsUpdateModeLU] = useState([]);
  const [monthsDifference, setMonthsDifference] = useState(null);
  const [CNFBankAccNo, setCNFBankAccNo] = useState("");
  const [BankAccNo, setBankAccNo] = useState("");
  const [Frequency, setFrequency] = useState('')
  const [existModeAllowable,setExistModeAllowable] = useState({});
  const [existingModeChangeData,setExistingModeChangeData] = useState({});
  const [disableOTP,setDisableOTP] = useState(true);
  const [updateFields, setUpdateFields] = useState(false);
  const [isDisableOTPInput,setIsDisableOTPInput] = useState(false);
  const [disableRequestForm,setDisableRequestForm] = useState(false);
  const [isCounterEnable,setIsCounterEnable] = useState(false);
  const  [eCGRequestField,setECGRequestField] = useState("");
  const [isProcessLink,setIsProcessLink] = useState(''); 
const [isDocLink,setIsDocLink] = useState('');
const [rerenderComponent,setRerenderComponent] = useState(false);
const [PaymentMethod,setPaymentMethod] = useState(''); 
const [msgModal,setMsgModal] = useState(false);

    //const shouldLog = useRef(true);
    const suffix = <img src={UploadIcon} alt="" />;
const posNewmandateregistration = {
  PaymentMethod:'',
  NACHStatus:'',
  RegisteredOn:'',
  BankName:'',
  BankAccountNumber:'',
  BankIFSC:'',
  PreferredDebitDate:'',
  MaxDebitAmounat:'',
  NACHValidTill:'',
  LastThreeDebitDate:'',
  LastThreeDebitStatus:'',
  CardType:'',
  CardNumber:'',
  SIStatus:'',
}
    const posAdditionDeletionObj = {
      custRole:POSContactData?.custRole,
      srvReqID: POSContactData?.srvReqID,
      Mode_New: "",
      ModalPremium: "",
      ImpactOnCurrentPremium: "",
      Comments: "",
      ValidateSignature:"",
    };
    const paMandateCancellationObj={}
    
  useEffect(() => {
    (counter > 0&&isCounterEnable) && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter, data]); // eslint-disable-next-line arrow-body-style

    useEffect(() => {
      setIsPaymentMethodSelection("");
      setPaymentMethodList([]);
      setCheckedList([]);
      if(selectedSubType==="paymentlink"){
        //shouldLog.current = false;
        selectedSubType==="paymentlink" && getData();
      }
      else if(selectedSubType==="changeinmodefrequency"){
        getAllowableModeChangeOptionFetch();
        getClientEnquiry();
        // getMandatetagEnquiry();
        setDisableRequestForm(false);
      }
      getProcesLink()
      }, [selectedSubType]);

      useEffect(() => {
        if(POSContactData && customerData?.isPOS && selectedSubType==="newmandateregistration"){
          POSContactData?.serviceRequestTransectionData?.forEach(element => {
            posNewmandateregistration[element.tagName] = element.tagValue
          });

          setIsShowPOSScreen(true);
          form.setFieldsValue({
            PaymentMethod:posNewmandateregistration.PaymentMethod,
            NACHStatus:posNewmandateregistration.NACHStatus,
            RegisteredOn:posNewmandateregistration.RegisteredOn,
            BankName:posNewmandateregistration.BankName,
            BankAccountNumber:posNewmandateregistration.BankAccountNumber,
            BankIFSC:posNewmandateregistration.BankIFSC,
            PreferredDebitDate:posNewmandateregistration.PreferredDebitDate,
            MaxDebitAmounat:posNewmandateregistration.MaxDebitAmounat,
            NACHValidTill:posNewmandateregistration.NACHValidTill,
            LastThreeDebitDate:posNewmandateregistration.LastThreeDebitDate,
            LastThreeDebitStatus:posNewmandateregistration.LastThreeDebitStatus,
            CardType:posNewmandateregistration.CardType,
            CardNumber:posNewmandateregistration.CardNumber,
            SIStatus:posNewmandateregistration.SIStatus,
          })

          if(posNewmandateregistration?.PaymentMethod==="NACH"){
            PaymentRelatedData[selectedSubType]?.POS_Details?.forEach(element => {
              if(element?.name==="BankName"|| element?.name==="CardType" || element?.name==="CardNumber" 
              ||element?.name==="SIStatus"){
                element.hide= true;
                setUpdateFields(true);
              }
            });
          }
        }
        else if(POSContactData && customerData?.isPOS && (selectedSubType==="mandatecancellation"||selectedSubType==="holdecsmandate"||selectedSubType==="restartmandate")){
          POSContactData?.serviceRequestTransectionData?.forEach(element => {
            paMandateCancellationObj[element.tagName] = element.tagValue
          });

          setIsShowPOSScreen(true);
          setUpdateFields(false);
          form.setFieldsValue({
            PaymentMethod:paMandateCancellationObj?.PaymentMethod,
            NACHStatus:paMandateCancellationObj?.NACHStatus,
            RegisteredOn:paMandateCancellationObj?.RegisteredOn,
            BankName:paMandateCancellationObj?.BankName,
            BankAccountNumber:paMandateCancellationObj?.BankAccountNumber,
            BankIFSC:paMandateCancellationObj?.BankIFSC,
            PreferredDebitDate:paMandateCancellationObj?.PreferredDebitDate,
            MaxDebitAmounat:paMandateCancellationObj?.MaxDebitAmounat,
            NACHValidTill:paMandateCancellationObj?.NACHValidTill,
            //LastThreeDebitDate:posNewmandateregistration.LastThreeDebitDate,
            //LastThreeDebitStatus:posNewmandateregistration.LastThreeDebitStatus,
            DueDate:paMandateCancellationObj?.DueDate,
            FilesenttoBankdate:paMandateCancellationObj?.FilesenttoBankdate,
            HoldPossibleForCurrentDue:paMandateCancellationObj?.HoldPossibleForCurrentDue,
            Reason:paMandateCancellationObj?.Reason,
            RequestorComments: paMandateCancellationObj?.RequestorComments,
            ValidateSignature:paMandateCancellationObj?.ValidateSignature,
            CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
            BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
            ReasonForDelay: POSContactData?.reasonDelayed,
          })

          getMandatetagEnquiry();

          if(paMandateCancellationObj?.ValidatedBy==="requestform"){
            PaymentRelatedData[selectedSubType]?.POS_Details?.forEach(element => {
              if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||
              element?.label==="Signature Validated"){
                element.hide= false;
                setUpdateFields(true);
              }
            });
          }
          else if(paMandateCancellationObj?.ValidatedBy==="otp"){
            PaymentRelatedData[selectedSubType]?.POS_Details?.forEach(element => {
              if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||
              element?.label==="Signature Validated"){
                element.hide= true;
                setUpdateFields(true);
              }
            });
          }
            PaymentRelatedData[selectedSubType]?.POS_Details?.forEach(element => {
              if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
                element.hide= false;
                setShowReasonDelayField(true);
              }else {
                if(element?.label?.includes("Reason For Delayed Submission")&&!POSContactData?.reasonDelayed){
                  element.hide= true;
                  setShowReasonDelayField(true);
                }
              }
            });
          
        }
       
        if(POSContactData && customerData?.isPOS&&selectedSubType==="changeinmodefrequency"){
          POSContactData?.serviceRequestTransectionData?.forEach(element => {
            posAdditionDeletionObj[element.tagName] = element.tagValue
          });
          setIsShowPOSScreen(true);
          form.setFieldsValue({
            custRole: posAdditionDeletionObj?.custRole,
            srvReqID: posAdditionDeletionObj?.srvReqRefNo,
            Mode_New: posAdditionDeletionObj?.Mode_New,
            ModalPremium: posAdditionDeletionObj?.ModalPremium,
            ImpactOnCurrentPremium:  posAdditionDeletionObj?.ImpactOnCurrentPremium,
            Comments: posAdditionDeletionObj?.Comments,
            ValidateSignature:posAdditionDeletionObj?.ValidateSignature,
            CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
            BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
            ReasonForDelay: POSContactData?.reasonDelayed,
            MandateRegisterationStatus:POSContactData?.currentStatus,
            RequestIDNumber: POSContactData?.srvReqRefNo
          });
          if(posAdditionDeletionObj?.ValidatedBy==="otp"){
            PaymentRelatedData[selectedSubType]?.POS_Details?.forEach(element => {
              if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")){
                element.hide= true;
                setUpdateFields(true);
              }
            });
          }
        }

        if(POSContactData &&posAdditionDeletionObj){
          if(posAdditionDeletionObj.Mode_New === 'Monthly'){
            PaymentRelatedData[selectedSubType]?.POS_Details?.forEach((item, index) => {
              if (item?.name?.includes("MandateRegisterationStatus")) {
                item.hide = false;
              }
            });
          }
        }

        },[])


        
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



        const getClientEnquiry = ()=>{
          setIsLoading(true);
          setDisableOTP(true);
          setSendOTPTo(null);
              let obj = {
                clientNumber: customerData?.poClientID
                 
          };
          let response = apiCalls.getClientEnquiry(obj);
          response
            .then((val) => {
              if (val?.data) {
                const res = val?.data?.responseBody
                setSendOTPTo(res?.rmblphone);
                if(res?.rmblphone ){
                  setDisableOTP(false);
                }
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

        const getMandatetagEnquiry = ()=>{
          setIsLoading(true);
          setDisableOTP(true);
          setECGRequestField(null);
          let response = apiCalls.getMandatetagEnquiry(customerData?.policyNo);
          response
            .then((val) => {
              if (val?.data?.responseBody?.errorCode !== "1") {
                  const sortedData = [...val?.data?.responseBody?.bankDetailsList];
          sortedData.sort((a, b) => {
            return new Date(convertDate(b.effdate)) - new Date(convertDate(a.effdate));
          });
                //const res = val?.data?.responseBody
                const res = sortedData[0];
                const isECGRequestValue = res?.mandstat === "10" ? "Active" : "Mandate Tag Not Found";
                setECGRequestField(isECGRequestValue);
              form?.setFieldsValue({ECSRequest: isECGRequestValue})
              if(selectedSubType==="newmandateregistration"||selectedSubType==="holdecsmandate"||selectedSubType==="restartmandate"||selectedSubType==="mandatecancellation"){
                getMandateData(res?.mandref);
              }
               // setIsLoading(false);
              } else {
                const isECGRequestValue = val?.data?.responseBody?.errorMessage;
                setECGRequestField(isECGRequestValue);
              form?.setFieldsValue({ECSRequest: isECGRequestValue})
                setIsLoading(false);
              }
            })
            .catch((err) => {
              setIsLoading(false);
            });
        }

        const getMandateData = (mandref)=>{
          setIsLoading(true);
          setDisableOTP(true);
          setECGRequestField(null);
          let response = apiCalls.getMandateData(customerData?.poClientID||details?.policyDetailsObj?.identifiers?.po_ClientID,mandref);
          response
            .then((val) => {
              if (val?.data?.responseBody?.errorCode !== "1") {
                const res = val?.data?.responseBody
              form?.setFieldsValue({
                PaymentMethod: "NACH",
                NACHStatus:  res?.statdets,
                RegisteredOn: convertDate(res?.effdate),
                BankName: res?.bankkey,
                BankAccountNumber: res?.bankacckey,
                BankIFSC: "",
                PreferredDebitDate:res?.zddday,
                MaxDebitAmounat: res?.mandamt,
                NACHValidTill:""
              })
                setIsLoading(false);
              } else {
                const isECGRequestValue = val?.data?.responseBody?.errorMessage;
                setECGRequestField(isECGRequestValue);
              form?.setFieldsValue({ECSRequest: isECGRequestValue})
                setIsLoading(false);
              }
            })
            .catch((err) => {
              setIsLoading(false);
            });
        }


        const getServiceRequestCount = ()=>{
          let response = apiCalls.getServiceRequestCount(customerData?.policyNo,selectedCallType,selectedSubTypeId);
          response
            .then((val) => {
              if (val?.data) {
                form?.setFieldsValue({NumberOfTimesModeChanged: val?.data?.count})
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

      const toggleInputField = (field, item, index) => {
        if(selectedSubType==="paymentlink"){
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
        }
        else {
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
        }
      };

       //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={PaymentRelatedData[selectedSubType]?.[formType]}
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
        isUpdateModeLU = {isUpdateModeLU}
        disableRequestForm={disableRequestForm}
        handleInputChange={handleInputChange}
      ></DetailsForm>
    );
  };

  const getIFSCBankDetails =async(ifscCode)=>{
    let response = await apiCalls.getIFSCBanks(ifscCode);
  if (response.statusText) {
        if (response?.data.length >0) {
          form.setFieldsValue({
            NameAsMentionedInTheBank: response?.data[0]?.bank
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
            // BankIFSC: '',
            NameAsMentionedInTheBank:""
          })
          
        }
      }
  }
  const handleInputChange =(e,item)=>{
    if(item.label?.includes("IFSC")&&e.target.value&&e.target.value?.length===11){
      getIFSCBankDetails(e.target.value);
    }
  }

  const onBlurInput =(value,item)=>{
    const obj = form.getFieldsValue(value)

    // if(item.name === "BankIFSC" && value){
    //   getIFSCBankDetails(value);
    // }

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

    if(item.name === 'ReEnterCardNumber'){
      setCNFBankAccNo(value)
     }else if(item.name === 'CardNumber'){
       setBankAccNo(value)
     }
    if(item.name === 'ReEnterCardNumber'){

      if(BankAccNo !== value ){
              message.destroy();
        message.error({
          content:
            "Card Number Not matched",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({ReEnterCardNumber: ''})
      }
      //  const lastFourDigits = obj.ReEnterCardNumber.slice(-4);
      //  const maskedString = '*'.repeat(obj.ReEnterCardNumber.length - 4) + lastFourDigits;
      //  form.setFieldsValue({ReEnterCardNumber: maskedString});
     
    }else if(value?.length >= 4 &&  item.name === 'CardNumber'){
     const lastFourDigits = obj.CardNumber.slice(-4);
     const maskedString = '*'.repeat(obj.CardNumber.length - 4) + lastFourDigits;
     form.setFieldsValue({CardNumber: maskedString})
    }



  }

  const billFreq={
    '01':'Annual',
    '02' : 'Semi Annual',
    '04': 'Quarterly ',
    '12' : 'Monthly',
}

  const handleChange = (value) => {
    handleEmpty();
    // If the checkbox is already checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
      if(value?.includes("View Existing Policy Details")){
          form.setFieldsValue({
            Mode_Old: billFreq[details?.policyDetailsObj?.premiumDetails?.billFreq],
            ModalPremium: details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount,
            PTD: convertDate(details?.policyDetailsObj?.premiumDetails?.ptd),
            PolicyDuration: getYearsAndMonths(),
            PersistencyMonth: getMonthsOnly(),
            BillGeneratedDate:"",
            ModeChangeEffectiveDate:"",
            ECSRequest: getMandatetagEnquiry(),
            NumberOfTimesModeChanged: getServiceRequestCount()
          })
          getBillingFrequencyChangeQuotation(details?.policyDetailsObj?.premiumDetails?.billFreq,value);
      }
      else if(value?.includes("Update New Mode")){
        getBillingFrequencyChangeQuotation(details?.policyDetailsObj?.premiumDetails?.billFreq,value);
      }
      else if((value?.includes("View Current Mandate Details")&&selectedSubType==="newmandateregistration") ||
      (value?.includes("View Current Mandate Details")&&selectedSubType==="restartmandate") ||
      (value?.includes("View Current Mandate Details")&&selectedSubType==="holdecsmandate") ||
      (value?.includes("View Current Mandate Details")&&selectedSubType==="mandatecancellation")){
        getMandatetagEnquiry();
      }
    }
  };
  const calculateMonthDifference = (date1, date2) => {
    // Implement the logic to calculate the difference in months between date1 and date2
    // For example:
    return moment(date1).diff(moment(date2), 'months');
  };

  const getMonthsOnly = () => {
    const today = new Date(); // Current date
    const specificDateStr = convertDate(details?.policyDetailsObj?.saDetails?.rcd);
    if (specificDateStr) {
      const specificDate = moment(specificDateStr, 'DD/MM/YYYY').toDate();
      const difference = calculateMonthDifference(today, specificDate);
      setMonthsDifference(difference);
      return difference;
    } else {
      // Handle the case where specificDate is null or undefined
      console.error('Invalid date format');
      return null;
    }
  };


  const calculateDateDifference = (date1, date2) => {
    const momentDate1 = moment(date1);
    const momentDate2 = moment(date2);
    if (!momentDate1.isValid() || !momentDate2.isValid()) {
      console.error('Invalid date format');
      return { years: 0, months: 0 };
    }
    const years = momentDate1.diff(momentDate2, 'years');
    const months = momentDate1.diff(momentDate2, 'months') % 12;
  
    return { years, months };
  };
  
  const getYearsAndMonths = () => {
    const today = new Date(); // Current date
    const specificDateStr = convertDate(details?.policyDetailsObj?.saDetails?.rcd);
  
    if (specificDateStr) {
      // Convert specificDateStr to Date object
      const specificDate = moment(specificDateStr, 'DD/MM/YYYY').toDate();
  
      const { years, months } = calculateDateDifference(today, specificDate);
      return `${years > 0 ? years + ' years' : ''} ${months > 0 ? months + ' months' : ''}`;
    } else {
      console.error('Invalid date format');
      return "";
    }
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
    if((formData.customerchoice ===  "requestform" && formData.validatesignature === 'no') || (selectedSubType === "addresschange" && formData.validatesignature === 'no')){
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
      TransactionPayload:  [],
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
    setIsDisableOTPInput(false);
    setIsCounterEnable(false);
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
      EmailId: "fgtesting8@gmail.com",
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
              content: "Otp Validation successfully",
              className: "custom-msg",
              duration: 3,
            });
            setIsModalOpen(false);
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

  const getModeChangeOptions = (data) => {
    const frequencyOptions = ['Annual', 'Semi Annual', 'Quarterly', 'Monthly'];
    const selectedFrequencies = [];
    const updateSelectModeList = []
  
    for (let i = 1; i <= 4; i++) {
      if (data?.[`billfreQ${i}`] !== details?.policyDetailsObj?.premiumDetails?.billFreq) {
        selectedFrequencies.push(frequencyOptions[i - 1]);
        updateSelectModeList.push({
          label: frequencyOptions[i - 1],
          value: data?.[`billfreQ${i}`],
        });
      }
    }
  
    const bindValue = selectedFrequencies.join(', ');
    setIsUpdateModeLU(updateSelectModeList);
  
    return bindValue;
  };


  const getAllowableModeChangeOptionFetch = ()=>{
    setIsLoading(true);
        let obj = {
          planCodeNo:  details?.policyDetailsObj?.planAndStatus?.planCode
    };
    let response = apiCalls.getAllowableModeChangeOptionFetch(obj);
    response
      .then((val) => {
        if (val?.data) {
          const res = val?.data?.responseBody;
        form.setFieldsValue({
          'ModeChangeAllowed': "Yes",
          AllowableModeChangeOptions: getModeChangeOptions(res)
        });
        let existObj = {
          ModeChangeAllowed: "Yes",
          AllowableModeChangeOptions: getModeChangeOptions(res)
        }
        setExistModeAllowable(existObj);

          setIsLoading(false);
        } else {
          form.setFieldsValue({
            'ModeChangeAllowed': "No",
          });
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

  const getBillingFrequencyChangeQuotation = (selectMode,checkedValue)=>{
    form.setFieldsValue({
      ModalPremium:'',
      PremiumToBeCollected:""
    })
    setIsLoading(true);
        let obj = {
          mode: selectMode,
          policyNumber:  customerData?.policyNo
    };
    let response = apiCalls.getBillingFrequencyChangeQuotation(obj);
    response
      .then((val) => {
        if (val?.data) {
          const res = val?.data?.responseBody;
          if(res?.errorcode === '1'){
            setIsLoading(false);
            message.error({
              content:
                val?.data?.responseBody?.errormessage ||
                "Something went wrong please try again!",
              className: "custom-msg",
              duration: 2,
            });
                  return
          }

          setFrequency(res.frequency);
          const parsedDate = new Date(res?.billdate);
          const formattedDate = `${parsedDate.getDate()}/${parsedDate.getMonth() + 1}/${parsedDate.getFullYear()}`;
          if(checkedValue?.includes("View Existing Policy Details")){
            form.setFieldsValue({
              BillGeneratedDate:formattedDate?formattedDate:'',
             // ModalPremium: parseFloat(res?.nextinsamt)?.toLocaleString(),
             ModalPremium: (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT01))?.toLocaleString(),
              ImpactOnCurrentPremium: ((parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02)) -  (parseFloat(res?.instpramt) + parseFloat(res?.staxamT01)))?.toLocaleString(),
              PremiumToBeCollected: selectMode === "12" ? (((parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02))*2))?.toLocaleString() : (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02))?.toLocaleString()
            
            });
          }
          else if(checkedValue?.includes("Update New Mode")){
            form.setFieldsValue({
              Mode_Old: billFreq[details?.policyDetailsObj?.premiumDetails?.billFreq],
              //ModalPremium: res?.nextinsamt ? (parseFloat(+res?.nextinsamt))?.toLocaleString():'',
              ModalPremium: (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02))?.toLocaleString(),
              PTD: convertDate(details?.policyDetailsObj?.premiumDetails?.ptd),
              PolicyDuration: getYearsAndMonths(),
              PersistencyMonth: getMonthsOnly(),
              BillGeneratedDate:formattedDate?formattedDate:'',
              //ModalPremium: (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT01))?.toLocaleString(),
              ImpactOnCurrentPremium: ((parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02)) -  (parseFloat(res?.instpramt) + parseFloat(res?.staxamT01)))?.toLocaleString(),
              PremiumToBeCollected: selectMode === "12" ? (((parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02))*2))?.toLocaleString() : (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02))?.toLocaleString(),
              // PremiumToBeCollected: selectMode === "12" ?  (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02))?.toLocaleString()  : ((parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02)*2))?.toLocaleString(),
              AnnualOutgoaspercurrentmode: (parseFloat(details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount) * (parseInt(details?.policyDetailsObj?.premiumDetails?.billFreq)))?.toLocaleString(),
              AnnualOutgoasperNewMode: (((parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02))) * parseFloat(selectMode))?.toLocaleString(),
              Difference: ((((parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02))) * parseFloat(selectMode)) -
              (parseFloat(details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount) * (parseInt(details?.policyDetailsObj?.premiumDetails?.billFreq))))?.toLocaleString(),
            })
            let exitFieldsObj = {
              Mode_Old: billFreq[details?.policyDetailsObj?.premiumDetails?.billFreq],
              //ModalPremium: res?.nextinsamt ? (parseFloat(+res?.nextinsamt))?.toLocaleString():'',
             ModalPremium: (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02))?.toLocaleString(),
              PTD: convertDate(details?.policyDetailsObj?.premiumDetails?.ptd),
              PolicyDuration: getYearsAndMonths(),
              PersistencyMonth: getMonthsOnly(),
              BillGeneratedDate:formattedDate?formattedDate:'',
              //ModalPremium: (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT01))?.toLocaleString(),
              ImpactOnCurrentPremium: ((parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02)) -  (parseFloat(res?.instpramt) + parseFloat(res?.staxamT01)))?.toLocaleString(),
              PremiumToBeCollected: selectMode === "12" ? (((parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02))*2))?.toLocaleString() : (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02))?.toLocaleString()
            }
            setExistingModeChangeData(exitFieldsObj);
    
          }
          setIsLoading(false);
        } else {
          form.setFieldsValue({
            'ModeChangeAllowed': "No",
          });
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
    if (item === "branchreceiveddate") {
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
        form.setFieldsValue({branchreceiveddate: ""})
      return;
      } else {
        PaymentRelatedData[selectedSubType]?.Request_Details?.forEach(element => {
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
  
  const handleDropdownChange=(e,item)=>{
    if(item.name==="PaymentMethod" && e === 'NACH'){
      setPaymentMethod(e)
      PaymentRelatedData[selectedSubType]?.NACH_Details?.forEach(element => {
        if(element?.name==="NACHStatus" || element?.name==="BankAccountNumber" || element?.name==="BankIFSC" || element?.name==="NACHValidTill"){
          element.hide= false;
        }

        if(element?.name=== "BankName" || element?.name=== "CardType" || element?.name=== "CardNumber" || element?.name=== "SIStatus"){
          element.hide= true;
        }

      });

    }else if (item.name==="PaymentMethod"&& e === 'SI'){
        setPaymentMethod(e)
      PaymentRelatedData[selectedSubType]?.NACH_Details?.forEach(element => {
        if(element?.name==="NACHStatus" || element?.name==="BankAccountNumber" || element?.name==="BankIFSC" || element?.name==="NACHValidTill"){
          element.hide= true;
        }
        if(element?.name==="BankName" || element?.name==="CardType"|| element?.name==="CardNumber"|| element?.name==="SIStatus"){
          element.hide= false;
        }
      });
  
    }
    setRerenderComponent(!rerenderComponent);
    setDisableRequestForm(false);
  if(item.label?.includes("Select New Mode")){
    setMsgModal(false)
    setIsSelectionMode(e);
    getBillingFrequencyChangeQuotation(e,checkedList);
    if(e==="12"){
      setMsgModal(true);
    }
  }
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

    const getData = () => {
        const obj = {
      'outofRevival': "",
      'totalBaseAmount': "",
      'interestAmount': "",
      'amountInSuspense': "",
      'totalPremiumDue': "",
       'mobileNo': props?.details?.sentDetailsObj?.mobileNo || props?.customerData?.mobileNo,
       'whatsAppNo': props?.details?.sentDetailsObj?.mobileNo || props?.customerData?.mobileNo,
       'emailId': props?.details?.sentDetailsObj?.emailID || props?.customerData?.emailID,
       'basePremium' :'',
       'riderPremium':0,
       'GST':'',
       'interestIfany':'',
       'waiverOfInterest':0,
       'suspense':'',
       'totalPremium': ''
    }
      setIsLoading(true);
      let payload={
        "requestHeader": {
          "source": "POS",
          "carrierCode": "2",
          "branch": "PRA",
          "userId": "rpandya",
          "userRole": "10",
          "partnerId": "MSPOS",
          "processId": "POS",
          "monthendExtension": "N",
          "monthendDate": "16/10/2024"
        },
        "requestbody": {
          "policyNo": customerData?.policyNo,
          "effectiveDate": moment(new Date(), 'YYYYMMDD').format('YYYYMMDD'),
          "action": "A"
        }
      }

 
      let response = apiCalls.getPremiumEnquiryData(payload);
      response.then((val)=>{
        setIsLoading(false);
        if(val?.data?.responseBody?.errorcode === '1'){
          obj.totalPremiumDue = 0;
          setData(obj);
          form.setFieldsValue({...obj});
        }else if(val?.data?.responseHeader?.issuccess === false){
          message.error({
            content: val?.data?.responseHeader?.message || "Something went wrong please try again!",
            className: "custom-msg",
            duration: 3,
          });
         }
        else {
          let value = val?.data?.responseBody;
          obj.totalBaseAmount =  (parseFloat(value?.osbal) + parseFloat(value?.newamnt));
          obj.interestAmount = parseFloat(value?.hrifeecnt) - parseFloat(value?.zwvrifee);
          obj.amountInSuspense = parseFloat(value?.cntsusp);
          //obj.totalPremiumDue = ((obj.totalBaseAmount + obj.interestAmount) - obj.amountInSuspense).toString();
          obj.basePremium = parseFloat(value?.zsprm);
          obj.GST = parseFloat(value?.totaltax);
          obj.interestIfany = parseFloat(value?.hrifeecnt);
          obj.suspense =  parseFloat(value?.cntsusp);
          obj.totalPremiumDue = obj.totalPremiumDue < 0 ? 0 : ((obj.basePremium+ parseFloat(obj.riderPremium) +  obj.GST +  obj.interestIfany) - (obj.waiverOfInterest+ obj.suspense)).toString()
          obj.totalPremium =  ((obj.basePremium+ parseFloat(obj.riderPremium) +  obj.GST +  obj.interestIfany) - (obj.waiverOfInterest+ obj.suspense))
          obj.totalPremiumDue = obj.totalPremiumDue < 0 ? 0 : obj.totalPremiumDue;
          obj.totalPremium = obj.totalPremium < 0 ? 0 : obj.totalPremium;
          setData(obj);
          form.setFieldsValue({...obj});
        } 
        
      }).catch((err)=>{
        setIsLoading(false);
      })
    }

    const handleLinkValue =()=>{
      setPaymentDetailsOpen(true);
    }
    
    const convertDate = (inputDate) => {
      const formattedDate = moment(inputDate, 'YYYYMMDD').format('DD/MM/YYYY');
      return formattedDate;
    };

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




    const handleRadioChange =(e,item)=>{
      let selectionValue = e.target.value;
      // setIsShowRequestFormFields(false);
      // setShowRaiseRequirementBtn(false);
      if(selectedSubType==="changeinmodefrequency"||selectedSubType==="holdecsmandate"||selectedSubType==="mandatecancellation"||selectedSubType==="restartmandate"||selectedSubType==="redebitstop"){
        //  if(item?.label?.includes("Choose Payment Method")){
        //   setIsPaymentMethodSelection(selectionValue);
        //  }
          if(item?.label?.includes("Customer Choice")&& selectionValue==="requestform"){
          setIsShowRequestFormFields(true);
         }
         else if(item?.label?.includes("Customer Choice")&& selectionValue==="otp"){
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
          setCounter(0);
          setIsModalOpen(true);
          setIsShowTransferFields(true);
          //setShowRequestFormFields(false);
          setValidateOTPSuccess(false);
        } else {
          setCounter(0);
          setIsModalOpen(false);
         // setShowRequestFormFields(true);
          setIsShowTransferFields(false);
          setValidateOTPSuccess(true);
        }
      }
      else if(selectedSubType==="paymentlink"){
        if(selectionValue===1){
          setIsShowTransferFields(true);
        }else{
          setIsShowTransferFields(false);
        }
      }
      }

      
    const getTransactionData = (values) => {
      
      if (selectedSubType === "paymentlink") {
        return [
          {
            "Status": "Create",
            "TagName": "Template",
            "TagValue": "PAYMENTLINK"
          },
          {
            "Status": "Create",
            "TagName": "TotalPremiumDue",
            "TagValue": values.totalPremiumDue
          }
        ];
      } 
      else if(selectedSubType==="changeinmodefrequency"&&checkedList?.includes("View Existing Policy Details")){
        return [
          {
            "Status": "Create",
            "TagName": "ModeChangeAllowed",
            "TagValue": values?.ModeChangeAllowed ||  ""
        },
        {
            "Status": "Create",
            "TagName": "AllowableModeChangeOptions",
            "TagValue": values?.AllowableModeChangeOptions ||  ""
        },
        {
            "Status": "Create",
            "TagName": "ActionType",
            "TagValue": "ViewExistingPolicyDetails"
        },
        {
            "Status": "Create",
            "TagName": "Mode_New",
            "TagValue": values?.Mode_New ||  ""
        },
        {
            "Status": "Create",
            "TagName": "ModalPremium",
            "TagValue": values?.ModalPremium ||  ""
        },
        {
            "Status": "Create",
            "TagName": "PTD",
            "TagValue": values?.PTD ||  ""
        },
        {
            "Status": "Create",
            "TagName": "PolicyDuration",
            "TagValue": values?.PolicyDuration ||  ""
        },
        {
            "Status": "Create",
            "TagName": "PersistencyMonth",
            "TagValue": values?.PersistencyMonth ||  ""
        },
        {
            "Status": "Create",
            "TagName": "BillGeneratedDate",
            "TagValue": values?.BillGeneratedDate ||  ""
        },
        {
            "Status": "Create",
            "TagName": "ModeChangeEffectiveDate",
            "TagValue": values?.ModeChangeEffectiveDate ||  ""
        },
        {
          "Status": "Create",
          "TagName": "ECSRequest",
          "TagValue": values?.ECSRequest || eCGRequestField || ""
      },
        {
            "Status": "Create",
            "TagName": "NumberOfTimesModeChanged",
            "TagValue": values?.NumberOfTimesModeChanged ||  ""
        },
        {
          "Status": "Create",
          "TagName": "Mode_Old",
          "TagValue":  billFreq[details?.policyDetailsObj?.premiumDetails?.billFreq] 
      }
        ]
      }
      else if(selectedSubType==="changeinmodefrequency"&&checkedList?.includes("Update New Mode")){
        let arr = [
          {
            "Status": "Create",
            "TagName": "ModeChangeAllowed",
            "TagValue": values?.ModeChangeAllowed  || ""
        },
        {
            "Status": "Create",
            "TagName": "AllowableModeChangeOptions",
            "TagValue": values?.AllowableModeChangeOptions || ""
        },
        {
            "Status": "Create",
            "TagName": "ActionType",
            "TagValue": "UpdateNewMode"
        },
        {
            "Status": "Create",
            "TagName": "Mode_New",
            "TagValue":  values?.Mode_New  ? billFreq[values?.Mode_New]:''
        },
        {
            "Status": "Create",
            "TagName": "ModalPremium",
            "TagValue": values?.ModalPremium || ""
        },
        {
            "Status": "Create",
            "TagName": "ImpactOnCurrentPremium",
            "TagValue": values?.ImpactOnCurrentPremium ||  ""
        },
        {
            "Status": "Create",
            "TagName": "PremiumToBeCollected",
            "TagValue":  values?.PremiumToBeCollected || ""
        },
        {
          "Status": "Create",
          "TagName": "AnnualOutgoaspercurrentmode",
          "TagValue":  values?.AnnualOutgoaspercurrentmode || ""
      },
      {
        "Status": "Create",
        "TagName": "AnnualOutgoasperNewMode",
        "TagValue":  values?.AnnualOutgoasperNewMode || ""
    },
    {
      "Status": "Create",
      "TagName": "Difference",
      "TagValue":  values?.Difference || ""
  },
        {
            "Status": "Create",
            "TagName": "PaymentMethod",
            "TagValue":  values?.PaymentMethod || ""
        },
        {
            "Status": "Create",
            "TagName": "BankIFSC",
            "TagValue":  values?.BankIFSC || ""
        },
        {
            "Status": "Create",
            "TagName": "NameAsMentionedInTheBank",
            "TagValue": values?.NameAsMentionedInTheBank ||  ""
        },
        {
            "Status": "Create",
            "TagName": "BankAccountNumber",
            "TagValue": values?.BankAccountNumber || ""
        },
        {
            "Status": "Create",
            "TagName": "ConfirmBankAccountNumber",
            "TagValue": values?.ConfirmBankAccountNumber ||""
        },
        // Nach Ended
        // SI Started
        {
            "Status": "Create",
            "TagName": "CardNumber",
            "TagValue": values?.CardNumber ||""
        },
        {
            "Status": "Create",
            "TagName": "ReEnterCardNumber",
            "TagValue": values?.ReEnterCardNumber ||""
        },
        {
            "Status": "Create",
            "TagName": "CardType",
            "TagValue": values?.CardType ||""
        },
        // Ended SI
        {
            "Status": "Create",
            "TagName": "BankName",
            "TagValue": values?.BankName ||""
        },
        {
            "Status": "Create",
            "TagName": "InitiatePennyDrop",
            "TagValue": values?.InitiatePennyDrop ||""
        },
        {
            "Status": "Create",
            "TagName": "PreferredDebitDate",
            "TagValue": values?.PreferredDebitDate ||""
        },
        {
            "Status": "Create",
            "TagName": "ValidatedBy",
            "TagValue": values.customerchoice ? values.customerchoice : 'form'
        },
        {
            "Status": "Create",
            "TagName": "ValidateSignature",
            "TagValue": values?.ValidateSignature ||"yes"
        },
        {
            "Status": "Create",
            "TagName": "CustomerSigningDate",
            "TagValue": values?.CustomerSigningDate ||""
        },
        {
            "Status": "Create",
            "TagName": "BranchReceivedDate",
            "TagValue": values?.BranchReceivedDate ||""
        },
        {
            "Status": "Create",
            "TagName": "Comments",
            "TagValue": values?.Comments ||""
        },
        {
          "Status": "Create",
          "TagName": "Mode_Old",
          "TagValue":  billFreq[details?.policyDetailsObj?.premiumDetails?.billFreq] || ""
      },
      {
        "Status": "Create",
        "TagName": "NACH",
        "TagValue":  isPaymentMethodSelection === 'NACH' ? 'Yes' : 'No'
    },
        ]
       if(isPaymentMethodSelection === 'NACH'){
        arr.push(
          { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
          { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink}
        )
       }else{
        arr = arr.filter((ele)=>{
          return ele.TagName !== 'DocLink' || ele.TagName !=="ProcessLink"
        })
       }
        
        return arr
      }

      else if(selectedSubType==="changeinmodefrequency"&&checkedList?.includes("Share Signature Update Process")){
        let arr = [
          {Status: "Create", TagName: "FileType", TagValue: "PROCESSENQUIRY"},
      ]
        return arr
      }
      
      
      else if(selectedSubType==='newmandateregistration' && PaymentMethod ==='SI'){
        let arr = [
          {
            "Status": "Create",
            "TagName": "PaymentMethod",
              "TagValue": values?.PaymentMethod ||""
        },
        {
            "Status": "Create",
            "TagName": "RegisteredOn",
              "TagValue": values?.RegisteredOn ||""
        },
        {
            "Status": "Create",
            "TagName": "BankName",
            "TagValue": values?.BankName ||""
        },
        
        
        {
            "Status": "Create",
            "TagName": "PreferredDebitDate",
            "TagValue": values?.PreferredDebitDate ||""
        },
        {
            "Status": "Create",
            "TagName": "MaxDebitAmounat",
            "TagValue": values?.MaxDebitAmounat ||""
        }
		,
        
        {
            "Status": "Create",
            "TagName": "LastThreeDebitDate",
            "TagValue": values?.LastThreeDebitDate ||""
        }
		,
        {
            "Status": "Create",
            "TagName": "LastThreeDebitStatus",
            "TagValue": values?.LastThreeDebitStatus ||""
        },
        {
            "Status": "Create",
            "TagName": "CardType",
            "TagValue": values?.CardType ||""
        }
		,
        {
            "Status": "Create",
            "TagName": "CardNumber",
            "TagValue": values?.CardNumber ||""
        }
		,
        {
            "Status": "Create",
            "TagName": "SIStatus",
            "TagValue": values?.SIStatus ||""
        }
        ]
     
        return arr
      }
      else if((selectedSubType==='newmandateregistration'||selectedSubType==="holdecsmandate"||selectedSubType==="restartmandate"||selectedSubType==="mandatecancellation"||selectedSubType==="redebitstop")&&checkedList?.includes("View Current Mandate Details")){
        return [
          {
            "Status": "Create",
            "TagName": "PaymentMethod",
              "TagValue": values?.PaymentMethod ||""
        },
        {
            "Status": "Create",
            "TagName": "NACHStatus",
              "TagValue": values?.NACHStatus ||""
        },
        {
            "Status": "Create",
            "TagName": "RegisteredOn",
              "TagValue": values?.RegisteredOn ||""
        },
        {
            "Status": "Create",
            "TagName": "BankName",
            "TagValue": values?.BankName ||""
        },
        {
            "Status": "Create",
            "TagName": "BankAccountNumber",
            "TagValue": values?.BankAccountNumber ||""
        },
        {
            "Status": "Create",
            "TagName": "BankIFSC",
              "TagValue": values?.BankIFSC ||""
        },
        {
            "Status": "Create",
            "TagName": "PreferredDebitDate",
            "TagValue": values?.PreferredDebitDate ||""
        },
        {
            "Status": "Create",
            "TagName": "MaxDebitAmounat",
            "TagValue": values?.MaxDebitAmounat ||""
        }
		,
        {
            "Status": "Create",
            "TagName": "NACHValidTill",
            "TagValue": values?.NACHValidTill ||""
        },
        {Status: "Create", TagName: "Template", TagValue: "PROCESSEMAILER"},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink || "" },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink || ""}
    //     {
    //         "Status": "Create",
    //         "TagName": "LastThreeDebitDate",
    //         "TagValue": values?.LastThreeDebitDate ||""
    //     }
		// ,
    //     {
    //         "Status": "Create",
    //         "TagName": "LastThreeDebitStatus",
    //         "TagValue": values?.LastThreeDebitStatus ||""
    //     }
        ]
      }
      else if(selectedSubType==="mandatecancellation"&&checkedList?.includes("Cancel Mandate")){
           return [
            {
              "Status": "Create",
              "TagName": "DueDate",
              "TagValue": values?.DueDate|| ""
          }
      ,
      {
        "Status": "Create",
        "TagName": "FilesenttoBankdate",
        "TagValue": values?.FilesenttoBankdate|| ""
    }
,
    {
        "Status": "Create",
        "TagName": "Reason",
        "TagValue": values?.Reason|| ""
    },
          {
              "Status": "Create",
              "TagName": "HoldPossibleForCurrentDue",
              "TagValue": values?.HoldPossibleForCurrentDue|| ""
          }
      ,
          {
              "Status": "Create",
              "TagName": "RequestorComments",
              "TagValue": values?.RequestorComments|| ""
          },
          {
            "Status": "Create",
            "TagName": "ValidatedBy",
            "TagValue": values?.customerchoice || ""
        }
    ,
        {
            "Status": "Create",
            "TagName": "ValidateSignature",
            "TagValue": values?.ValidateSignature || ""
        }
           ]
      }
      else if(selectedSubType==="holdecsmandate"&&checkedList?.includes("Register Hold Request")){
        return [
         {
           "Status": "Create",
           "TagName": "DueDate",
           "TagValue": values?.DueDate|| ""
       }
   ,
   {
     "Status": "Create",
     "TagName": "FilesenttoBankdate",
     "TagValue": values?.FilesenttoBankdate|| ""
 }
,
 {
     "Status": "Create",
     "TagName": "Reason",
     "TagValue": values?.Reason|| ""
 },
       {
           "Status": "Create",
           "TagName": "HoldPossibleForCurrentDue",
           "TagValue": values?.HoldPossibleForCurrentDue|| ""
       }
   ,
       {
           "Status": "Create",
           "TagName": "RequestorComments",
           "TagValue": values?.RequestorComments|| ""
       },
       {
         "Status": "Create",
         "TagName": "ValidatedBy",
         "TagValue": values?.customerchoice || ""
     }
 ,
     {
         "Status": "Create",
         "TagName": "ValidateSignature",
         "TagValue": values?.ValidateSignature || ""
     }
        ]
   }
   else if(selectedSubType==="restartmandate"&&checkedList?.includes("Request For Re-Start")){
    return [
     {
       "Status": "Create",
       "TagName": "DueDate",
       "TagValue": values?.DueDate|| ""
   }
,
{
 "Status": "Create",
 "TagName": "FilesenttoBankdate",
 "TagValue": values?.FilesenttoBankdate|| ""
}
,
{
 "Status": "Create",
 "TagName": "Reason",
 "TagValue": values?.Reason|| ""
},
   {
       "Status": "Create",
       "TagName": "HoldPossibleForCurrentDue",
       "TagValue": values?.HoldPossibleForCurrentDue|| ""
   }
,
   {
       "Status": "Create",
       "TagName": "RequestorComments",
       "TagValue": values?.RequestorComments|| ""
   },
   {
     "Status": "Create",
     "TagName": "ValidatedBy",
     "TagValue": values?.customerchoice || ""
 }
,
 {
     "Status": "Create",
     "TagName": "ValidateSignature",
     "TagValue": values?.ValidateSignature || ""
 }
    ]
}

      else if(selectedSubType==='newmandateregistration'&&checkedList?.includes("New Mandate Registeration")){
        return [
          {Status: "Create", TagName: "Template", TagValue: "PROCESSEMAILER"},
          { Status: "Create", TagName: "DocLink", TagValue:isDocLink || "" },
          { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink || ""}
        ]
      }
    };



      const handleSubmit =(values)=>{
        if(values?.totalPremiumDue <= 0&&selectedSubType==="paymentlink") {
          message.destroy();
            message.error({
              content: "No Total Premium Due",
              className: "custom-msg",
              duration: 3,
            });
              return;
             }
          if(!showEmailFields&&(selectedSubType==="paymentlink"||checkedList?.includes("Send Mode Change Link")||
          (isPaymentMethodSelection?.toLocaleLowerCase()==="nach"&&isSelectionMode==="12") ||
          (selectedSubType==="newmandateregistration"&&checkedList?.includes("New Mandate Registeration")))){
            message.destroy();
            message.error({
              content: "Please Select Communication Type",
              className: "custom-msg",
              duration: 3,
            });
         

           return
          }
          if (POSContactData && customerData?.isPOS) {
            POSActionsOnContactDetails(values, "APPROVED");
          } else if (selectedSubType === "paymentlink" || selectedSubType==='changeinmodefrequency'|| selectedSubType==='newmandateregistration'||
          selectedSubType==="holdecsmandate"||selectedSubType==="restartmandate"||selectedSubType==="mandatecancellation") {
            // if((values.validatesignature === 'no'||values.ValidateSignature === 'no')){
            //   getRaiseRequirements();
            // }else{
              saveRequest(values);
           // }
        };
      }

      function getCategory(selectedSubType, checkedList) {
        const isUpdateNewModeSelected = selectedSubType === "changeinmodefrequency" && checkedList?.includes("Update New Mode");
        const isNewMandateRegistrationSelected = selectedSubType === "newmandateregistration" && checkedList?.includes("New Mandate Registeration");
        const isMandateCancellationSelected =  selectedSubType === "mandatecancellation" && checkedList?.includes("Cancel Mandate")
        const isHoldECSDebitSelected =  selectedSubType === "holdecsmandate" && checkedList?.includes("Register Hold Request")
        const isMandateRestartelected =  selectedSubType === "restartmandate" && checkedList?.includes("Request For Re-Start")
       // const isNewMandateRegistartionSelected =  selectedSubType === "newmandateregistration" && checkedList?.includes("New Mandate Registeration")

        if (isUpdateNewModeSelected || (!isNewMandateRegistrationSelected && checkedList?.includes("New Mandate Registeration")) ||
        isMandateCancellationSelected|| isHoldECSDebitSelected||isMandateRestartelected) {
          return 2;
        } else if (isNewMandateRegistrationSelected) {
          return 3;
        } else {
          return 1;
        }
      }
          
      const saveRequest =(values)=>{
             setIsLoading(true);
             const obj = {
              CallType: props?.selectedCallType, // Required
              SubType: props?.selectedSubTypeId, // Required
              RequestSource: 1, // Required
              RequestChannel: values.requestchannel, // Required
              Category: getCategory(selectedSubType, checkedList),
              ApplicationNo:
              details?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
              DOB: convertDate(customerData?.dob),
              PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
              CustomerId: values.GSTINToBeUpdateFor=== 1?  customerData?.laClientID:customerData?.poClientID,
              CustRole: values.custRole,
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
              RequestChannel: 3,
              ReasonForChange: "",
              RequestDateTime:  values?.branchreceiveddate
              ? new Date(values?.branchreceiveddate)
              : new Date(),
              ReasonDelayed: values?.resonfordelay || values?.ReasonForDelay,
              CustSignDateTime: values?.CustomerSigningDate
                ? new Date(values?.CustomerSigningDate)
                : new Date(),
                TransactionData: getTransactionData(values) || [],
              "CommunicationRequest":[ 
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
            Uploads: uploadFiles || [],
            }
            // if(showEmailAddress){
            //   obj.CommunicationRequest.push({
            //       "SrvReqRefNo": "",
            //       "TemplateID": "1",
            //       "CommType": '2', 
            //       "ReceipientTo": 'fgtesting8@gmail.com',
            //       "ReceipientCC": "fgtesting8@gmail.com",
            //       // "ReceipientTo": customerData?.emailID,
            //       // "ReceipientCC": customerData?.emailID,
            //       "MobileNos":"",
            //       "ScheduledTime": new Date(), 
            //       "CommBody":"\"PaymentLink\":\"{0}\"",
            //       "Attachments": null
            //   })
            // }

            // if(showWhatsApp||showPhoneNumber){
            //   obj.CommunicationRequest.push(
            //     {
            //       "SrvReqRefNo": "",
            //       "TemplateID": "",
            //       "CommType": '1',
            //       "ReceipientTo": '',
            //       "ReceipientCC": "",
            //        "MobileNos": 9892686867,
            //       // "MobileNos": customerData?.mobileNo,
            //       "ScheduledTime": new Date(),
            //       "CommBody":"\"PaymentLink\":\"{0}\"",
            //       "Attachments": null
            //   }
            //   )
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
         response.then((val)=>{
          // let value = val?.data?.responseBody;
          setServiceRequestId(val?.data?.srvReqRefNo);
          setAlertTitle(selectedSubType==="paymentlink"?`Payment Link Sent Successfully`: "Request Created Successfully");
          let successMessage = val?.data?.tat > 0 ? 
          `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat||0} days`
          : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          setAlertData(successMessage);
          setNavigateTo('/advancesearch');
           setShowAlert(true);
           setIsLoading(false);
         }).catch((err)=>{
          setIsLoading(false);
         }) 
      }
      const handleButtonClick =() =>{

      }

  return (
    <>
    {/* <div style={{ position: 'relative' }}>
      {isLoading && <div className="overlay" />}
      <Spin spinning={isLoading} /> */}
   <Spin spinning={isLoading} fullscreen></Spin>
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
          {/* Payment Link SubType Code Start */}
          {selectedSubType==="paymentlink"&&<>
          <div>
            {errorMsg && ( //Error Message Shown
              <Alert
                closable
                type="error"
                description={errorMsg}
                onClose={() => setErrorMsg(null)}
                showIcon
              />
            )}
            <DetailsForm
              data={
                !isShowPOSScreen
                  ? PaymentRelatedData[selectedSubType]?.BOE_Details
                  : PaymentRelatedData[selectedSubType]?.POS_Details ||
                    PaymentRelatedData[selectedSubType]?.BOE_Details
              }
              subType={selectedSubType}
              handleRadioChange={handleRadioChange}
              handleLinkValue={handleLinkValue}
              toggleInputField={toggleInputField}
              showEmailAddress={showEmailAddress}
              showPhoneNumber={showPhoneNumber}
              showWhatsApp={showWhatsApp}
            ></DetailsForm>
          </div>

          {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}


          {isShowTransferFields && (
            <>
              <div
                className={
                  props?.fullWidth
                    ? "generate-full seeding-section"
                    : "generate-btn seeding-section"
                }
              >
                {!isShowPOSScreen && (
                  <>
                    {PaymentRelatedData[selectedSubType]?.Buttons?.map((button, index) => (
                      <Button
                        type="primary"
                        className="primary-btn"
                        key={index}
                        onClick={() => {
                          handleButtonClick(button);
                        }}
                      >
                        {button.label}
                      </Button>
                    ))}
                  </>
                )}
                {isShowPOSScreen && (
                  <>
                    {PaymentRelatedData[selectedSubType]?.POS_Buttons?.map(
                      (button, index) => (
                        <Button
                          type="primary"
                          className="primary-btn"
                          key={index}
                          onClick={() => {
                            handleButtonClick(button);
                          }}
                        >
                          {button.label}
                        </Button>
                      )
                    )}
                  </>
                )}
              </div>
            </>
          )}
          <div className="contact-details-btn">
            <Button type="primary" htmlType="submit" className="primary-btn">
              Submit
            </Button>{" "}
            {isShowPOSScreen && (
              <>
                <Button type="primary" className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )}
          </div>
          </>}
          {/* Payment Link SubType Code End */}

         {/* CHANGE IN MODE SubType Code Start */}
          {selectedSubType==="changeinmodefrequency"&&<>
          {!isShowPOSScreen&&<>
              {renderDetailsForm("BOE_Details")}
              <ExistUpdateCheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Existing Policy Details', value: 'View Existing Policy Details', name: 'ViewExistingPolicyDetails' },
                  { label: 'Update New Mode', value: 'Update New Mode', name: 'Update New Mode' },
                  { label: 'Share Process Communication', value: 'Share Process Communication', name: 'Share Process Communication' },
                ]}
              />
              {checkedList?.includes("View Existing Policy Details")&&<>
              {renderDetailsForm("Existing_ModeFreq_Details")}
              </>}
              {checkedList?.includes("Update New Mode")&&<>
              {renderDetailsForm("Update_ModeFreq_Details")}
              <Row gutter={[16, 16]} className="reasons-list">
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xxl={12}
                className="loan-checkboxes"
              >
                <Form.Item
                  label={
                    <span>
                      {"NACH"}
                      {isSelectionMode === "12"&& <sup>*</sup>}
                    </span>
                  }
                  name="nach"
                  className="checkbox-gap"
                  rules={[
                    {
                      required:(isSelectionMode === "12"&&paymentMethodList?.length===0) ?  true : false,
                      message:  (isSelectionMode === "12"&&paymentMethodList?.length===0) && "select a checkbox",
                    },
                  ]}
                >
                  <Checkbox
                    value="NACH"
                    checked={paymentMethodList?.includes(
                      "NACH"
                    )}
                    onChange={() =>
                      handleCheckBoxChange("NACH")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              {/* <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xxl={12}
                className="loan-checkboxes"
              >
                <Form.Item
                  label={
                    <span>
                      {"Standing Instructions"}
                      {isSelectionMode === "12"&& <sup>*</sup>}
                    </span>
                  }
                  name="standinginstructions"
                  rules={[
                    {
                      required:(isSelectionMode === "12"&&paymentMethodList?.length===0) ?  true : false,
                      message:  (isSelectionMode === "12"&&paymentMethodList?.length===0) && "select a checkbox",
                    },
                  ]}
                >
                  <Checkbox
                    value="Standing Instructions"
                    checked={paymentMethodList?.includes(
                      "Standing Instructions"
                    )}
                    onChange={() =>
                      handleCheckBoxChange("Standing Instructions")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col> */}
            </Row>
              {isPaymentMethodSelection?.toLocaleLowerCase()==="nach"&&isSelectionMode!=="12"&&<>
              {/* {renderDetailsForm("NACH_Details")} */}
              {renderDetailsForm("Send_ModeChange_Link")}
              {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
              </>}
              {isPaymentMethodSelection?.toLocaleLowerCase()==="nach"&&isSelectionMode==="12"&&<>
              {/* {renderDetailsForm("Monthly_MAND_NACH_Details")} */}
              {renderDetailsForm("Send_ModeChange_Link")}
              {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
              </>}
              {/* {isPaymentMethodSelection?.toLocaleLowerCase()==="standing instructions"&&isSelectionMode!=="12"&&<>
              {renderDetailsForm("SI_Details")}
              </>}
              {isPaymentMethodSelection?.toLocaleLowerCase()==="standing instructions"&&isSelectionMode==="12"&&<>
              {renderDetailsForm("Monthly_MAND_SI_Details")}
              </>} */}
              {renderDetailsForm("Customer_Choice_Details")}
              {isShowRequestFormFields&&<>
              {renderDetailsForm("Request_Details")}
              </>}
              {renderDetailsForm("Comments")}
              </>}
          </>}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
          </>}

          {checkedList?.includes("Share Process Communication")&&<>
              {renderDetailsForm("Send_ModeChange_Link")}
              {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
              </>}

          <div className="contact-details-btn">
          {(checkedList?.length>0||isShowPOSScreen)&&<>
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            </>}

            {(isShowPOSScreen) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )}
          </div>
          </>}
            {/*CHANGE IN MODE SubType Code End */}

            
         {/* NEW MANDATE REGISTRATION SubType Code Start */}
          {selectedSubType==="newmandateregistration"&&<>
        
          {!isShowPOSScreen&&<>
              <ExistUpdateCheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Current Mandate Details', value: 'View Current Mandate Details', name: 'ViewExistingMandateDetails' },
                  { label: 'New Mandate Registeration', value: 'New Mandate Registeration', name: 'New Mandate Registeration' },
                  // { label: 'Send Mode Change Link', value: 'Send Mode Change Link', name: 'Send Mode Change Link' },
                ]}
              />
              {checkedList?.includes("View Current Mandate Details")&&<>
              {renderDetailsForm("Existing_Details")}
            

         
          {!isShowPOSScreen&&<>
            {renderDetailsForm("NACH_Details")}
          </>}

          

              {/* {isPaymentMethodSelection?.toLocaleLowerCase()==="nach"&&<>
            
              </>} */}
              {/* {isPaymentMethodSelection?.toLocaleLowerCase()==="standing instructions"&&<>
              {renderDetailsForm("SI_Details")}
              </>} */}
              {renderDetailsForm("Customer_Choice_Details")}
              {isShowRequestFormFields&&<>
              {renderDetailsForm("Request_Details")}
              </>}
              {renderDetailsForm("Comments")}
              </>}
          </>}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
          </>}

          {checkedList?.includes("New Mandate Registeration")&&<>
              {renderDetailsForm("Send_ModeChange_Link")}
              {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
              </>}

          <div className="contact-details-btn">
          {(checkedList?.length>0||isShowPOSScreen)&&<>
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            </>}

            {/* {(isShowPOSScreen||showRaiseRequirementBtn) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )} */}
          </div>



          </>}
            {/*NEW MANDATE REGISTRATION SubType Code End */}


             {/*Hold ECS Debit SubType Code Start */}
          {selectedSubType==="holdecsmandate" && <>
          {!isShowPOSScreen && (
            <>
              <CheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Current Mandate Details', value: 'View Current Mandate Details', name: 'ViewExistingAgentCodeDetails' },
                  { label: 'Register Hold Request', value: 'Register Hold Request', name: 'UpdateAgentCodeDetails' },
                ]}
              />
              {checkedList?.includes('View Current Mandate Details') && 
              <>
               {renderDetailsForm('BOE_Details')}
               {renderDetailsForm('NACH_Details')}
               </>}
              {checkedList?.includes('Register Hold Request') && <>
              {renderDetailsForm('Register_HOLD_Request')}
              {renderDetailsForm('Customer_Choice_Details')}
              {isShowRequestFormFields&&<>
                {renderDetailsForm('Request_Details')}
              </>}
              {renderDetailsForm('Comments')}
              </>}
             
            </>
          )}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
          </>}
          <div className="contact-details-btn">
            {(checkedList?.length>0||isShowPOSScreen)&&<>
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            </>}

            {(isShowPOSScreen) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                 onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )}
          </div>
          </>} 
           {/*Hold ECS Debit SubType Code End */}

             {/*Mandate Cancellation SubType Code Start */}
          {selectedSubType==="mandatecancellation" && <>
          {!isShowPOSScreen && (
            <>
              <CheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Current Mandate Details', value: 'View Current Mandate Details', name: 'ViewExistingAgentCodeDetails' },
                  { label: 'Cancel Mandate', value: 'Cancel Mandate', name: 'CancelMandate' },
                ]}
              />
              {checkedList?.includes('View Current Mandate Details') && 
              <>
               {renderDetailsForm('BOE_Details')}
               {renderDetailsForm('NACH_Details')}
               </>}
              {checkedList?.includes('Cancel Mandate') && <>
               {renderDetailsForm('Register_HOLD_Request')}
               {renderDetailsForm('Customer_Choice_Details')}
              {isShowRequestFormFields&&<>
                {renderDetailsForm('Request_Details')}
              </>}
              {renderDetailsForm('Comments')}
               </>}
             
            </>
          )}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
          </>}
          <div className="contact-details-btn">
            {(checkedList?.length>0||isShowPOSScreen)&&<>
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            </>}

            {(isShowPOSScreen) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                 onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )}
          </div>
          </>} 
           {/*Mandate Cancellation SubType Code End */}


             {/*Re-Start mandate SubType Code Start */}
          {selectedSubType==="restartmandate" && <>
          {!isShowPOSScreen && (
            <>
              <CheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Current Mandate Details', value: 'View Current Mandate Details', name: 'ViewExistingAgentCodeDetails' },
                  { label: 'Request For Re-Start', value: 'Request For Re-Start', name: 'RequestForReStart' },
                ]}
              />
              {checkedList?.includes('View Current Mandate Details') && 
              <>
               {renderDetailsForm('BOE_Details')}
               {renderDetailsForm('NACH_Details')}
               </>}
              {checkedList?.includes('Request For Re-Start') && <>
               {renderDetailsForm('Register_HOLD_Request')}
               {renderDetailsForm('Customer_Choice_Details')}
              {isShowRequestFormFields&&<>
                {renderDetailsForm('Request_Details')}
              </>}
              {renderDetailsForm('Comments')}
               </>}
              
          
            </>
          )}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
          </>}
          <div className="contact-details-btn">
            {(checkedList?.length>0||isShowPOSScreen)&&<>
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            </>}

            {(isShowPOSScreen) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                 onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )}
          </div>
          </>} 
           {/*Mandate Cancellation SubType Code End */}

            {/*Re-Debit Stop SubType Code Start */}
          {selectedSubType==="redebitstop" && <>
          {!isShowPOSScreen && (
            <>
              <CheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Current Mandate Details', value: 'View Current Mandate Details', name: 'ViewExistingAgentCodeDetails' },
                  { label: 'Request Re-Debit Stop', value: 'Request Re-Debit Stop', name: 'RequestRe-DebitStop' },
                ]}
              />
              {checkedList?.includes('View Current Mandate Details') && 
              <>
               {renderDetailsForm('BOE_Details')}
               {renderDetailsForm('NACH_Details')}
               </>}
              {checkedList?.includes('Request Re-Debit Stop') && <>
               {renderDetailsForm('Request_ReDebit_Details')}
               {renderDetailsForm('Customer_Choice_Details')}
              {isShowRequestFormFields&&<>
                {renderDetailsForm('Request_Details')}
              </>}
              {renderDetailsForm('Comments')}
               </>}
             
            </>
          )}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
          </>}
          <div className="contact-details-btn">
            {(checkedList?.length>0||isShowPOSScreen)&&<>
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
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
            ):  <>
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
           {/*Re-Debit Stop SubType Code End */}



        </Form>
        {/* </div> */}
      {/* </Spin> */}
      {showAlert &&
        <PopupAlert alertData= {alertData} title={alertTitle} navigate={navigateTo} setShowAlert={setShowAlert}           getAdvance={props.getAdvance}
        ></PopupAlert>
      }

      <Modal
        title="Payment Details"
        open={paymentDetailsOpen}
        destroyOnClose={true}
        width={1000}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setPaymentDetailsOpen(false)}>
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
              <td width={50}>Base Premium</td>
              <td width={70}>{data.basePremium?.toLocaleString()}</td>
             
            </tr>
            <tr>
              <td>(+) Rider Premium</td>
              <td>{data.riderPremium?.toLocaleString()}
              </td>
             
            </tr>
            <tr>
              <td>(+) GST</td>
              <td>{data.GST?.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>(+) Interest, If any</td>
              <td>{data.interestIfany?.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>(-) Waiver Of Interest</td>
              <td>{data.waiverOfInterest?.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>(-) Suspense</td>
              <td>{data.suspense?.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>Total Premium Due</td>
              <td>{data.totalPremium?.toLocaleString()}
              </td>
            </tr>
          </table>

          {/* <div className="contact-details-btn">
            <Button type="primary" className="primary-btn" onClick={()=>handleOk()}>
              Ok
            </Button>
            <Button type="primary" className="primary-btn" onClick={()=>setRaiseRequirementOpen(false)}>
              Cancel
            </Button>
          </div> */}
        </div>
      </Modal>

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


      <Modal
        title=""
        open={msgModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setMsgModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div>First debit will be 2 times the new modal premium</div>
          <div className="text-center modal-validate">
            <Button
              type="primary"
              className="primary-btn"
             onClick={()=>setMsgModal(false)}
            >
              OK
            </Button>
          </div>
      </Modal>
    </>
  );
};
export default PaymentRelated;

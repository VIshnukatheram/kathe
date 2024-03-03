import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Spin, Button,Row,Col,Checkbox,message,Modal,Upload,Tooltip } from "antd";
import { ContractAlterationData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import CheckBoxList from "../../utils/CheckBoxList";
import apiCalls from "../../api/apiCalls";
import {getGSTINEnquiry} from "../../api/contractAlterationApiCalls";
import PopupAlert from "../popupAlert";
import CloseIcon from "../../assets/images/close-icon.png";
import dayjs from "dayjs";
import OTPModal from "../../utils/OTPModal";
import { format, parse } from 'date-fns';

const ContractAlteration = (props) => {
const loginInfo = useSelector(state => state);
const {selectedCallType,selectedSubType,clientRoleLU,panUpdateLU,customerData,details,POSContactData,selectedSubTypeId
,  SelectedSubTypeVal,requestModeLU} = props;
const suffix = <img src={UploadIcon} alt="" />;
const [form] = Form.useForm();
const [isLoading,setIsLoading] = useState(false);
const [showResonDelayField,setShowReasonDelayField] = useState(false);
const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
const [selectCheckBox, setSelectCheckBox] = useState(false);
const [showNewSignatureFields,setShowNewSignatureFields] = useState(false);
const [showSiganatureProcess,setShowSignatureProcess] = useState(false);
const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
const [showEmailFields,setShowEmailFields] = useState(false);
const [showPhoneNumber, setShowPhoneNumber] = useState(false);
const [showEmailAddress, setShowEmailAddress] = useState(false);
const [showWhatsApp, setShowWhatsApp] = useState(false);
const [checkedList, setCheckedList] = useState([]);
const [activeEmailIcons, setActiveEmailIcons] = useState([]);
const [activeMobileIcons, setActiveMobileIcons] = useState([]);
const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
const [alertTitle, setAlertTitle] = useState("");
const [alertData, setAlertData] = useState("");
const [navigateTo, setNavigateTo] = useState("");
const [showAlert, setShowAlert] = useState(false);
const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
const [requirementModalLoader, setRequirementLoader] = useState(false);
const [serviceRequestId, setServiceRequestId] = useState(null);
const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
const [uploadFiles,setUploadFiles] = useState([]);
const [cltType,setCltType] = useState("");
const [showUploadFile, setShowUploadFile] = useState(null);
const [isUploadMultipleFiles,setIsMultipleFiles] = useState([]);
const [aadharUploadFiles,setAAdharUploadFiles] = useState([]);
const [passportUploadFiles,setPassportUploadFiles] = useState([]);
const [rationCardUploadFiles,setRationCardUploadFiles] = useState([]);
const [DrivingUploadFiles,setDrivingUploadFiles] = useState([]);
const [uploadMultipleFiles,setUploadMultipleFiles] = useState([]);
const [addressProofModal, setAddressProofModal] = useState(false);
const [pancardUploadFiles,setPancardUploadFiles] = useState([]);
const [isShowDOBRequestForms,setIsShowDOBRequestForms] = useState(false);
const [isTermExistingObj,setIsTermExistingObj] = useState({})
const [isPlanExistingObj,setIsPlanExistingObj] = useState({})
const [isPremiumExistingObj,setIsPremiumExistingObj] = useState({})
const [isSumAssuredExistingObj,setIsSumAssuredExistingObj] = useState({})
const [isAgentApplicationNo,setIsAgentApplicationNo] = useState(null);
const [ClientEnquiry, setClientEnquiry]= useState({});
const [issAgentExistingObj,setIsAgentExistingObj] = useState({})
const [isPANExistingObj,setIsPANExistingObj] = useState({})
const [isProcessLink,setIsProcessLink] = useState(''); 
const [isDocLink,setIsDocLink] = useState('');
const [CNFBankAccNo, setCNFBankAccNo] = useState("");
const [BankAccNo, setBankAccNo] = useState("");
const [isShowOTPModal,setIsShowOTPModal] = useState(false);
const [disableRequestForm,setDisableRequestForm] = useState(false);
const [isShowRequestDetails,setIsShowRequestDetails] = useState(false);
const [updateFields, setUpdateFields] = useState(false);
const [disableOTP,setDisableOTP] = useState(true);
const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
const [isExistingGSTNo,setIsExistingGSTNo] = useState(null);
const [isDisablePANApproveBtn,setIsDisablePANApproveBtn] = useState(false);
const [hideSubmitBtn,setHideSubmitBtn] = useState(true);

const posGSTScreenObj = {
  custRole:POSContactData?.custRole,
  srvReqID: POSContactData?.srvReqID,
  GSTINToBeUpdateFor:"",
  ExistingGSTINNumber:'',
  NewGSTINNumber:'',
  UploadGSTINCertificate:'',
};
const posPANScreenObj = {
  custRole:POSContactData?.custRole,
  srvReqID: POSContactData?.srvReqID,
  PanValidation:"",
  PanAadharSeeding:'',
  Last2YearsITRFilling:'',
  NewPanNo: "",
  resonfordelay:"",
  validatesignature:"",
  NameinPAN:"",
  NameMatch:""
};
const posAgentCodeScreenObj = {
  custRole:POSContactData?.custRole,
  srvReqID: POSContactData?.srvReqID,
  AgentCode_New:"",
  AgentName_New:'',
  Reasonforagentcodechange:'',
  Comments:"",
  AgentSignaturVerificationResult: "",
  Agnet_Application_Number: ""
};
const posChangeinNameObj={
  custRole:POSContactData?.custRole,
  srvReqID: POSContactData?.srvReqID,
  Update_New:"",
  FirstName_New:'',
  MiddleName_New:'',
  LastName_New:"",
  Comments:"",
  Validate_Signature: "",
  RefertoNBStageDocument:"",
}
const posChangeinSignatureObj = {
  custRole:POSContactData?.custRole,
  srvReqID: POSContactData?.srvReqID,
  PanValidation:"",
  PanAadharSeeding:'',
  Last2YearsITRFilling:'',
  Comments:"",
  ValidateSignature:"",
};

const posChangeinPlanObj = {
  custRole:POSContactData?.custRole,
  srvReqID: POSContactData?.srvReqID,
  PlanName_Old: "",
  NewPlan_New: "",
  Comments: "",
  ValidateSignature:"",
  ReasonForChange_New:""
};
const posChangeinTermObj = {
  custRole:POSContactData?.custRole,
  srvReqID: POSContactData?.srvReqID,
  PlanName_Old: "",
  PolicyTerm_Old: "",
  CurrentPremium_Old: "",
  NewTerm_New:"",
  Comments: "",
  ValidateSignature:"",
  ReasonForChange_New:""
};
const posChangeinPremiumObj = {
  custRole:POSContactData?.custRole,
  srvReqID: POSContactData?.srvReqID,
  PlanName_Old: "",
  CurrentPremium_Old: "",
  NewPremium_New: "",
  ReasonForChange_New: "",
  Comments: "",
  ValidateSignature:"",
  ReasonForChange_New:""
};
const posChangeinSumAssuredObj = {
  custRole:POSContactData?.custRole,
  srvReqID: POSContactData?.srvReqID,
  SumAssured_Old: "",
  CurrentPremium_Old: "",
  SumAssured_New: "",
  ReasonForChange_New: "",
  Comments: "",
  ValidateSignature:"",
  ReasonForChange_New:""
};
const posAdditionDeletionObj = {
  custRole:POSContactData?.custRole,
  srvReqID: POSContactData?.srvReqID,
  RiderName: "",
  RequestFor: "",
  Comments: "",
  ValidateSignature:"",
};

const posChangeInDobScreenObj = {
  custRole:"",
  srvReqID: POSContactData?.srvReqID,
  Comments:'',
  NewDateofBirth: "",
  RefertoNBStageDocument: "",
  CustomerSigningDate: "",
  BranchReceivedDate: "",
  ReasonForDelay: "",
  ValidateSignature: "",
  InitiateRequestBy:''
};

const changeinownershipObj = {
  custRole:POSContactData?.custRole,
  srvReqID: POSContactData?.srvReqID,
  ProposerName_New:'',
  ProposerDOB_New:'',
  AddressLine1_New:'',
  AddressLine2_New:'',
  AddressLine3_New:'',
  City_New:'',
  State_New:'',
  PINCode:'',
  MobileNumber_New:'',
  ProposerEmailID_New:'',
  RelationtoLifeAssured:'',
  PANNumber:'',
  PANResult:'',
  CKYCNumber:'',
  CustomerSigningDate:'',
  BranchReceivedDate:'',
  ReasonForDelay:'',
  ValidateSignature:'',
  BankIFSC:'',
  BankName:'',
  AccountType:'',
  NameAsMentionedInTheBank:'',
  BankAccountNumber:'',
  InitiatePennyDrop:'',
  DeDupeCheck:'',
  Comments:'',
  ReasonForOwnershipChange:"",
  // NameinPANN: "",
  // PANValidationStatus: "",
  // NameMatch: "",

};

const formFeilds = form.getFieldsValue()

useEffect(()=>{
  setShowAlert(false);
  if(selectedSubType==="gstinupdate" && details?.policyDetailsObj?.planAndStatus?.customerType?.toLowerCase()!=="corporate"){

    setAlertTitle(`${"GSTIN Number cannot be updated for this policy !."}`);
            setNavigateTo("/advancesearch");
            setShowAlert(true);
            return;
  }
  setCheckedList([]);
  getProcesLink();
  form.resetFields();
},[selectedSubType]); // eslint-disable-next-line arrow-body-style


useEffect(() => {
  if(selectedSubType === 'changeinownership' && !POSContactData){
    if(customerData?.laName === customerData?.poName ){
      setAlertTitle("Change In Ownership Not Allowed");
      setNavigateTo("/advancesearch") 
      setShowAlert(true);
      return
    }
  }
    
  if(selectedSubType === 'changeinownership' ){

    getClientEnquiry()
  }
 if( selectedSubType ==='changeindob'){
  setDisableOTP(false)
 }
  !isShowPOSScreen && getBindEsistValues(checkedList[0]);
  if(POSContactData && customerData?.isPOS&&(selectedSubType==="additionofrider"||selectedSubType==="deletionofrider")){
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posAdditionDeletionObj[element.tagName] = element.tagValue
    });
    setIsShowPOSScreen(true);
    form.setFieldsValue({
      custRole: posAdditionDeletionObj?.custRole,
      srvReqID: posAdditionDeletionObj?.srvReqRefNo,
      RiderName: posAdditionDeletionObj?.RiderName,
      RequestFor: posAdditionDeletionObj?.RequestFor,
      BranchComments: posAdditionDeletionObj?.Comments,
      ValidateSignature:posAdditionDeletionObj?.ValidateSignature,
      CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      ReasonForDelay: POSContactData?.reasonDelayed,
      
    });
    ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
      if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
        element.hide= false;
        setShowReasonDelayField(true);
      }
    });
  }
  if(POSContactData && customerData?.isPOS&&selectedSubType==="changeinplan"){
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posChangeinPlanObj[element.tagName] = element.tagValue
    });
    setIsShowPOSScreen(true);
    form.setFieldsValue({
      custRole: posChangeinPlanObj?.custRole,
      srvReqID: posChangeinPlanObj?.srvReqRefNo,
      PlanName_Old: posChangeinPlanObj?.PlanName_Old,
      NewPlan_New: posChangeinPlanObj?.NewPlan_New,
      BranchComments: posChangeinPlanObj?.Comments,
      ValidateSignature:posChangeinPlanObj?.ValidateSignature,
      ReasonForChange_New: posChangeinPlanObj?.ReasonForChange_New,
      CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      ReasonForDelay: POSContactData?.reasonDelayed,
      
    });
    ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
      if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
        element.hide= false;
        setShowReasonDelayField(true);
      }
    });
  }
  else  if(POSContactData && customerData?.isPOS&&selectedSubType==="changeinterm"){
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posChangeinTermObj[element.tagName] = element.tagValue
    });
    setIsShowPOSScreen(true);
    form.setFieldsValue({
      custRole: posChangeinTermObj?.custRole,
      srvReqID: posChangeinTermObj?.srvReqRefNo,
      PlanName_Old: posChangeinTermObj?.PlanName_Old,
      PolicyTerm_Old: posChangeinTermObj?.PolicyTerm_Old,
      CurrentPremium_Old: posChangeinTermObj?.CurrentPremium_Old,
      NewTerm_New: posChangeinTermObj?.NewTerm_New,
      BranchComments: posChangeinTermObj?.Comments,
      ValidateSignature:posChangeinTermObj?.ValidateSignature,
      CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      ReasonForDelay: POSContactData?.reasonDelayed,
      ReasonForChange_New: posChangeinTermObj?.ReasonForChange_New
    });
    ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
      if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
        element.hide= false;
        setShowReasonDelayField(true);
      }
    });
  }
  else  if(POSContactData && customerData?.isPOS&&selectedSubType==="changeinpremium"){
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posChangeinPremiumObj[element.tagName] = element.tagValue
    });
    setIsShowPOSScreen(true);
    form.setFieldsValue({
      custRole: posChangeinPremiumObj?.custRole,
      srvReqID: posChangeinPremiumObj?.srvReqRefNo,
      PlanName_Old: posChangeinPremiumObj?.PlanName_Old,
      CurrentPremium_Old: posChangeinPremiumObj?.CurrentPremium_Old,
      NewPremium_New: posChangeinPremiumObj?.NewPremium_New,
      ReasonForChange_New: posChangeinPremiumObj?.ReasonForChange_New,
      BranchComments: posChangeinPremiumObj?.Comments,
      ValidateSignature:posChangeinPremiumObj?.ValidateSignature,
      CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      ReasonForDelay: POSContactData?.reasonDelayed,
      
    });
    ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
      if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
        element.hide= false;
        setShowReasonDelayField(true);
      }
    });
  }
  else  if(POSContactData && customerData?.isPOS&&selectedSubType==="changeinsumassured"){
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posChangeinSumAssuredObj[element.tagName] = element.tagValue
    });
    setIsShowPOSScreen(true);
    form.setFieldsValue({
      custRole: posChangeinSumAssuredObj?.custRole,
      srvReqID: posChangeinSumAssuredObj?.srvReqRefNo,
      SumAssured_Old: posChangeinSumAssuredObj?.SumAssured_Old,
      CurrentPremium_Old: posChangeinSumAssuredObj?.CurrentPremium_Old,
      SumAssured_New: posChangeinSumAssuredObj?.SumAssured_New,
      ReasonForChange_New: posChangeinSumAssuredObj?.ReasonForChange_New,
      BranchComments: posChangeinSumAssuredObj?.Comments,
      ValidateSignature:posChangeinSumAssuredObj?.ValidateSignature,
      CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      ReasonForDelay: POSContactData?.reasonDelayed,
      
    });
    ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
      if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
        element.hide= false;
        setShowReasonDelayField(true);
      }
    });
  }
  else if (POSContactData && customerData?.isPOS&&selectedSubType==="gstinupdate") {
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posGSTScreenObj[element.tagName] = element.tagValue
    });
    setIsShowPOSScreen(true);
    form.setFieldsValue({
      custRole: posGSTScreenObj?.custRole,
      srvReqID: POSContactData?.srvReqRefNo,
      GSTINToBeUpdateFor:parseInt(posGSTScreenObj?.GSTINToBeUpdateFor),
      ExistingGSTINNumber:posGSTScreenObj?.ExistingGSTINNumber,
      NewGSTINNumber:posGSTScreenObj?.NewGSTINNumber,
      UploadGSTINCertificate:posGSTScreenObj?.UploadGSTINCertificate,
      BranchComments: posGSTScreenObj?.Comments,
      ValidateSignature:posGSTScreenObj?.ValidateSignature,
      CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      ReasonForDelay: POSContactData?.reasonDelayed,
    });

  }
  else if (POSContactData && customerData?.isPOS&&selectedSubType==="panupdate") {
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posPANScreenObj[element.tagName] = element.tagValue
    });
    setIsShowPOSScreen(true);
    form.setFieldsValue({
      custRole: posPANScreenObj?.custRole,
      srvReqID: POSContactData?.srvReqRefNo,
      PanValidation:posPANScreenObj?.PanValidation,
      NameinPAN: posPANScreenObj?.NameinPAN,
      NameMatch: posPANScreenObj?.NameMatch,
      // PanAadharSeeding:posPANScreenObj?.PanAadharSeeding,
      // Last2YearsITRFilling:posPANScreenObj?.Last2YearsITRFilling,
      NewPanNo: posPANScreenObj?.NewPanNo,
      ValidateSignature:posPANScreenObj?.validatesignature,
      CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      resonfordelay: POSContactData?.ReasonForDelay,
    });
    setIsDisablePANApproveBtn(posPANScreenObj?.PanValidation?.includes("Existing and Valid PAN")?false:true)
    if(posPANScreenObj?.ValidatedBy==="otp"){
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
        if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||element?.label==="Signature Validated"){
          element.hide= true;
          setUpdateFields(true);
        }
      });
    }
    ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
      if((element?.label?.includes("Reason For Delayed Submission")&& posPANScreenObj?.resonfordelay)){
        element.hide= false;
        setShowReasonDelayField(true);
      }
    });
  }
  else if (POSContactData && customerData?.isPOS&&selectedSubType==="agentcodecorrection") {
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posAgentCodeScreenObj[element.tagName] = element.tagValue
    });
    setIsShowPOSScreen(true);
    form.setFieldsValue({
      custRole: posAgentCodeScreenObj?.custRole,
      srvReqID: posAgentCodeScreenObj?.srvReqRefNo,
      AgentCode_New:posAgentCodeScreenObj?.AgentCode_New,
      AgentName_New:posAgentCodeScreenObj?.AgentName_New,
      Reasonforagentcodechange:posAgentCodeScreenObj?.Reasonforagentcodechange,
      BranchComments:posAgentCodeScreenObj?.Comments,
      AgentSignaturVerificationResult: posAgentCodeScreenObj?.AgentSignaturVerificationResult,
      Agnet_Application_Number: posAgentCodeScreenObj?.Agnet_Application_Number
    });
    setIsAgentApplicationNo(posAgentCodeScreenObj?.Agnet_Application_Number);
  }
  else if (POSContactData && customerData?.isPOS&&selectedSubType==="changeinname") {
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posChangeinNameObj[element.tagName] = element.tagValue
    });
    setIsShowPOSScreen(true);
    form.setFieldsValue({
      custRole: posChangeinNameObj?.custRole,
      srvReqID: posChangeinNameObj?.srvReqRefNo,
      RequestFor:posChangeinNameObj?.Update_New == 2 ? "Proposer" : "Life Assured",
      Salutation_New:posChangeinNameObj?.Salutation_New,
      FirstName_New:posChangeinNameObj?.FirstName_New,
      MiddleName_New:posChangeinNameObj?.MiddleName_New,
      LastName_New:posChangeinNameObj?.LastName_New,
      Comments:posChangeinNameObj?.Comments,
      RefertoNBStageDocument:posChangeinNameObj?.Stage_Document,
      ValidateSignature:posChangeinNameObj?.Validate_Signature,
      CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      resonfordelay: POSContactData?.reasonDelayed,
    });
    ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
      if((element?.label?.includes("Name Change Proof")||element?.label?.includes("ID Proof")||element?.label?.includes("View Address Proof"))&& posChangeinNameObj?.Stage_Document==="yes"){
        element.hide= false;
        setShowReasonDelayField(true);
      }
    });

    ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
      if(element?.label?.includes("Reason For Delayed Submission")&& POSContactData?.resonfordelay){
        element.hide= false;
        setShowReasonDelayField(true);
      }
    });

  }
  else if(POSContactData && customerData?.isPOS&&selectedSubType==="changeinsignature") {
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posChangeinSignatureObj[element.tagName] = element.tagValue
    });
    setIsShowPOSScreen(true);
    form.setFieldsValue({
      custRole: posChangeinSignatureObj?.custRole,
      srvReqID: posChangeinSignatureObj?.srvReqRefNo,
      CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      resonfordelay: POSContactData?.reasonDelayed,
      ValidateSignature: posChangeinSignatureObj?.ValidateSignature,
      BranchComments: posChangeinSignatureObj?.Comments
    });
    ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
      if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
        element.hide= false;
        setShowReasonDelayField(true);
      }
    });
  }
  else if(POSContactData && customerData?.isPOS&&selectedSubType==="changeinownership") {
        setIsShowPOSScreen(true);
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      changeinownershipObj[element.tagName] = element.tagValue
    });
    form.setFieldsValue({
      custRole: changeinownershipObj?.custRole,
      srvReqID: changeinownershipObj?.srvReqRefNo,
      CustomerSigningDate:changeinownershipObj?.CustomerSigningDate?convertDate(changeinownershipObj?.CustomerSigningDate):changeinownershipObj?.CustomerSigningDate,
      BranchReceivedDate: changeinownershipObj?.BranchReceivedDate?convertDate(changeinownershipObj?.BranchReceivedDate):changeinownershipObj?.BranchReceivedDate,
      ProposerName_New: changeinownershipObj?.ProposerName_New,
      AddressLine1_New: changeinownershipObj?.AddressLine1_New,
      AddressLine2_New: changeinownershipObj?.AddressLine2_New,
      AddressLine3_New: changeinownershipObj?.AddressLine3_New,
      City_New : changeinownershipObj?.City_New,
      State_New: changeinownershipObj?.State_New,
      PINCode: changeinownershipObj?.PINCode,
      MobileNumber_New: changeinownershipObj?.MobileNumber_New,
      ProposerEmailID_New: changeinownershipObj?.ProposerEmailID_New,
      ReasonForOwnershipChange: changeinownershipObj?.ReasonForOwnershipChange,
      ProposerDOB_New : changeinownershipObj?.ProposerDOB_New?convertDate(changeinownershipObj?.ProposerDOB_New):changeinownershipObj?.ProposerDOB_New,
      
      PANNumber: changeinownershipObj?.PANNumber,
      PANResult: changeinownershipObj?.PANResult,
      CKYCNumber: changeinownershipObj?.CKYCNumber,
      ReasonForDelay: changeinownershipObj?.Comments,
      BankIFSC: changeinownershipObj?.BankIFSC,
      BankName: changeinownershipObj?.BankName,
      AccountType: changeinownershipObj?.AccountType,
      NameAsMentionedInTheBank: changeinownershipObj?.NameAsMentionedInTheBank,
      BankAccountNumber: changeinownershipObj?.BankAccountNumber,
      InitiatePennyDrop: changeinownershipObj?.InitiatePennyDrop,
      RelationtoLifeAssured:changeinownershipObj?.RelationtoLifeAssured,
      ProposerDOB: changeinownershipObj?.ProposerDOB,
      ValidateSignature:changeinownershipObj?.ValidateSignature,
      // NameinPANN: changeinownershipObj?.NameinPANN,
      // PANValidationStatus: changeinownershipObj?.PANValidationStatus,
      // NameMatch: changeinownershipObj?.NameMatch,
    });
    ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
      if(element?.label?.includes("ReasonForDelay")&&(POSContactData?.ReasonForDelay||POSContactData?.reasonfordelay)){
        element.hide= false;
        setShowReasonDelayField(true);
      }
    });
  }else if (POSContactData && customerData?.isPOS&&selectedSubType==="changeindob") {
    setIsShowPOSScreen(true);
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posChangeInDobScreenObj[element.tagName] = element.tagValue
    });
    form.setFieldsValue({
      custRole:posChangeInDobScreenObj.custRole ===  '1' ? 'Life Assured' : 'Proposer',
      NewDateofBirth:posChangeInDobScreenObj.NewDateofBirth,
      RefertoNBStageDocument:posChangeInDobScreenObj.RefertoNBStageDocument,

      CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,

      ValidateSignature:posChangeInDobScreenObj.ValidateSignature,
      ReasonForDelayy:posChangeInDobScreenObj.ReasonForDelay,
      BranchComments:posChangeInDobScreenObj.Comments
    })
    ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
      if((element.name === 'CustomerSigningDate' || element.name === 'BranchReceivedDate')  && posChangeInDobScreenObj.InitiateRequestBy !=='otp'){
        element.hide= false;
      }
      if(element.name === 'ValidateSignature' &&posChangeInDobScreenObj?.ValidateSignature ){
        element.hide= false;
      }
      if(element.name === 'BranchComments' &&posChangeInDobScreenObj?.Comments ){
        element.hide= false;
      }
      debugger
      if(element?.name === 'ReasonForDelayy' &&posChangeInDobScreenObj?.ReasonForDelay){
        
        element.hide= false;
      
      }
    });

  }
}, []); // eslint-disable-next-line arrow-body-style



const disabledDate = (current) => {
  return current && current > dayjs().endOf("day"); // Can not select days before today and today
};


const convertDateee = (inputDate) => {
  if (inputDate.length === 8) {
    const parsedDate = parse(inputDate, 'yyyyMMdd', new Date());
    const formattedDate = format(parsedDate, 'dd/MM/yyyy');
   return formattedDate;
  }
};

const calculateAge = (birthDateString) => {
  const today = new Date();
  const birthDate = new Date(
    parseInt(birthDateString.substring(0, 4)),
    parseInt(birthDateString.substring(4, 6)) - 1,
    parseInt(birthDateString.substring(6, 8))
  );

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const handleChange = (value) => {
  
  setShowRaiseRequirementBtn(false);
  hideCommunications();
  form.resetFields();
  // If the checkbox is allready checked, uncheck it
  if (checkedList.includes(value)) {
    setCheckedList([]);
  } else {
    // Otherwise, check it
    setCheckedList([value]);
    getBindEsistValues(value);
  }

  form.setFieldsValue({
    ClientId_Old: ClientEnquiry?.clntnum,
    AddressLine1_Old: ClientEnquiry?.cltaddR01,
    AddressLine2_Old: ClientEnquiry?.cltaddR02,
    AddressLine3_Old: ClientEnquiry?.cltaddR03,
    City_Old: ClientEnquiry?.cltaddR04,

    PINCode_Old: ClientEnquiry?.cltpcode,
    State_Old:ClientEnquiry?.cltaddR05,
    ProposerDOB_Old:ClientEnquiry?.clTdob ? convertDate(ClientEnquiry?.clTdob) : '', 
    MobileNumber_Old:ClientEnquiry?.rmblphone,
    ProposerEmailID_Old:ClientEnquiry?.rinternet,
    ProposerName_Old:customerData?.poName
  });

  if(selectedSubType ==='changeindob'){
    form.setFieldsValue({
      ClientRole_Existing:customerData?.role,
      ExistingDateofBirth_Existing:convertDateee(customerData?.dob),
      Age_Existing:calculateAge(customerData?.dob)

    })
  }
};




const hideCommunications=()=>{
  setActiveEmailIcons([]);
  setActiveMobileIcons([]);
  setActiveWhatsAppIcons([]);
  setShowPhoneNumber(false);
  setShowEmailAddress(false);
  setShowWhatsApp(false);
}





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

const getBindEsistValues =(value)=>{
  if(selectedSubType==="agentcodecorrection"){
    // getAgentEnquiry();
    form.setFieldsValue({
     AgentCode_Old: "",
     AgentName_Old: details?.policyDetailsObj?.salesDetails?.agentName,
     Channel_Old: details?.policyDetailsObj?.salesDetails?.channel,
     AgentBranch_Old:details?.policyDetailsObj?.identifiers?.branchName,
   })
   setIsAgentExistingObj({
    AgentCode_Old: "",
    AgentName_Old: details?.policyDetailsObj?.salesDetails?.agentName,
    Channel_Old: details?.policyDetailsObj?.salesDetails?.channel,
    AgentBranch_Old:details?.policyDetailsObj?.identifiers?.branchName,
   })
    }
  else if(selectedSubType==="changeinterm"){
    form.setFieldsValue({
      PlanName_Old: details?.policyDetailsObj?.planAndStatus?.planName,
      PolicyTerm_Old: details?.policyDetailsObj?.saDetails?.pt,
      CurrentPremium_Old: details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount
    })
    setIsTermExistingObj({
      PlanName_Old: details?.policyDetailsObj?.planAndStatus?.planName,
      PolicyTerm_Old: details?.policyDetailsObj?.saDetails?.pt,
      CurrentPremium_Old: details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount
    })
  }
  else if(selectedSubType==="changeinplan"){
    form.setFieldsValue({
      PlanName_Old: details?.policyDetailsObj?.planAndStatus?.planName,
      PolicyTerm_Old: details?.policyDetailsObj?.saDetails?.pt,
      CurrentPremium_Old: details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount
    })
    setIsPlanExistingObj({
      PlanName_Old: details?.policyDetailsObj?.planAndStatus?.planName,
      PolicyTerm_Old: details?.policyDetailsObj?.saDetails?.pt,
      CurrentPremium_Old: details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount
    })
  }
  else if(selectedSubType==="changeinpremium"){
    form.setFieldsValue({
      PlanName_Old: details?.policyDetailsObj?.planAndStatus?.planName,
      PolicyPremium_Old: details?.policyDetailsObj?.saDetails?.pt,
      CurrentPremium_Old: details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount
    })
    setIsPremiumExistingObj({
      PlanName_Old: details?.policyDetailsObj?.planAndStatus?.planName,
      PolicyPremium_Old: details?.policyDetailsObj?.saDetails?.pt,
      CurrentPremium_Old: details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount
    })
  }
  else if(selectedSubType==="changeinsumassured"){
    form.setFieldsValue({
      SumAssured_Old:  details?.policyDetailsObj?.saDetails?.sumAssured,
      CurrentPremium_Old: details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount,
    })
    
    setIsSumAssuredExistingObj({SumAssured_Old:  details?.policyDetailsObj?.saDetails?.sumAssured,
      CurrentPremium_Old: details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount})
  }
  else if(selectedSubType==="gstinupdate"&&(value?.includes("View Existing GSTIN")||value?.includes("Update New GSTIN"))){
     getGSTNumberData(customerData?.poClientID);
   }
}

const getGSTNumberData = async (clientNumber)=>{
  setIsLoading(true);
  const  val = await getGSTINEnquiry(clientNumber);
    if(val?.data){
      setIsLoading(false);
      form.setFieldsValue({
        ExistingGSTINNumber: val?.data?.responseBody?.zgstidno
      })
      setIsExistingGSTNo(val?.data?.responseBody?.zgstidno)
    }else{
      message.destroy();
      message.error({
        content: val?.data?.responseHeader?.message||"Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
}
const getClientEnquiry = async (e) => {
  try {
    setIsLoading(true);
    setDisableOTP(true);
    const clientNumber = e === 1 ? customerData?.laClientID : customerData?.poClientID;
    const obj = { clientNumber };
    const response = await apiCalls.getClientEnquiry(obj);
    if (response?.data) {
      const res = response?.data?.responseBody;
      setClientEnquiry(res);
      if (selectedSubType === "changeinname") {
        setCltType(res?.clttype);
         setClientEnquiry(res);
        form.setFieldsValue({
          Salutation_Old: res?.salutl,
          FirstName_Old: res?.lgivname,
          MiddleName_Old: res?.initials,
          LastName_Old: res?.lsurname,
        });
      } else if (selectedSubType === "panupdate") {
        if(res?.rmblphone){
          setDisableOTP(false);
        }
          const exitPANNumber = await getExistPANNumber(clientNumber);
          form.setFieldsValue({
            Name_Old: `${res?.lsurname} ${res?.initials} ${res?.lgivname}`,
            DOB_Old: res?.clTdob ? convertDate(res?.clTdob) : res?.clTdob,
            ExistingPanNo: exitPANNumber,
            Name_New: `${res?.lsurname} ${res?.initials} ${res?.lgivname}`,
            DOB_New: res?.clTdob ? convertDate(res?.clTdob) : res?.clTdob,
          });
          setIsPANExistingObj({
            PanUpdateFor_Old: e,
            Name_Old: `${res?.lsurname} ${res?.initials} ${res?.lgivname}`,
            DOB_Old: res?.clTdob ? convertDate(res?.clTdob) : res?.clTdob,
            ExistingPanNo: exitPANNumber,
          })
      } 
      else if(selectedSubType === 'changeinownership'){
        //
        form.setFieldsValue({
          ClientId_Old: res?.clntnum,

          AddressLine1_Old: res?.cltaddR01,
          AddressLine2_Old: res?.cltaddR02,
          AddressLine3_Old: res?.cltaddR03,
          City_New: res?.cltaddR04,

          PINCode_Old: res?.cltpcode,
          State_New:res?.cltaddR05,
          ProposerDOB_Old:res?.clTdob ? convertDatee(res?.clTdob) : '', 
          MobileNumber_Old:res?.rmblphone,
          ProposerEmailID_Old:res?.rinternet,
          ProposerName_Old:customerData?.poName
        });
      }

   
      


      setIsLoading(false);
    } else {
      setIsLoading(false);
      handleError(response?.data?.responseBody?.errormessage || "Something went wrong, please try again!");
    }
  } catch (error) {
    setIsLoading(false);
    handleError("Something went wrong, please try again!");
  }
};

const getExistPANNumber = async (clientNo) => {
  try {
    const response = await apiCalls.getExistPANNumber(clientNo);
    if (response?.data) {
      const res = response?.data?.responseBody;
      return res?.zpanidno;
    } else {
      handleError(response?.data?.responseBody?.errormessage || "Something went wrong, please try again!");
    }
  } catch (error) {
    handleError("Something went wrong, please try again!");
  }
};

const handleError = (errorMessage) => {
  message.error({
    content: errorMessage,
    className: "custom-msg",
    duration: 2,
  });
};


const handleInputChange =(e,item)=>{
  if(item.label?.includes("IFSC")&&e.target.value){
    getIFSCBankDetails(e.target.value);
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

const InitiatePennyDropp = () => {
  const values = form.getFieldsValue();
  if(!values?.BankAccountNumber || !values?.NameAsMentionedInTheBank || !values?.BankIFSC){
    message.destroy();
    message.error({
      content:"Enter All Mandatory Feilds",
      className: "custom-msg",
      duration: 2,
    });
   return;
  }
  
  let obj = {
      "accountNumber":values?.BankAccountNumber,
      "accountHolderName":values?.NameAsMentionedInTheBank,
      "ifsc": values?.BankIFSC,
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
          InitiatePennyDrop: result?.data?.responseBody?.errormessage
       
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
        InitiatePennyDrop: err?.response?.statusText
      })
      message.error({
        content:
        err?.response?.statusText||
          "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
      
      setIsLoading(false);
      // form.setFieldsValue({
      //   PennyDrop: 'Invalid Input',
     
      // })
    });
};


 


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
            PANResult: res?.description,
            // PanAadharSeeding: res?.aadhaarSeedingStatus,
          })
        
       
        setIsLoading(false);
      } else {
    
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


const CheckPANdetails = ()=>{

  let values = form.getFieldsValue();

  setIsLoading(true);
  //CKYCNumber

  let response = apiCalls.getCheckPANdetails(values?.PANNumber||values?.NewPanNo||values?.ReEnterPanNo_New);
  response
    .then((val) => {
      if (val?.data?.responseBody?.errorcode!=="1") {
       // setClientEnquiryData(val?.data?.responseBody);
        const res = val?.data?.responseBody;
        if(isShowPOSScreen){
          setIsDisablePANApproveBtn(res?.description?.includes("Existing and Valid PAN")?false:true)
        }

        if(POSContactData&&customerData?.isPOS){
          form.setFieldsValue({
            // Name_New:res?.nameoncard,
            // PANRevalidationResult: res?.description,
            PANRevalidationResult: res?.description,
            NameinPANN: res?.firstName + ' ' + res?.middleName +  ' ' + res?.lastName,
            // PanAadharSeeding: res?.aadhaarSeedingStatus,
            PANResult: res?.description,
          })
        }else{
          form.setFieldsValue({
            // Name_New:res?.nameoncard,
            // PANRevalidationResult: res?.description,
            PANResult: res?.description,
            PanValidation: res?.description,
            NameinPAN: res?.firstName + ' ' + res?.middleName +  ' ' + res?.lastName,
            // PanAadharSeeding: res?.aadhaarSeedingStatus,
          })
        }
         
        
       
        setIsLoading(false);
      } else {
    
        setIsLoading(false);
        form.setFieldsValue({
          PanValidation: val?.data?.responseBody?.errormessage,
          PANResult: val?.data?.responseBody?.errormessage,
          PANRevalidationResult:  val?.data?.responseBody?.errormessage,
          NameinPANN: val?.data?.responseBody?.errormessage,
 
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

const searchLocationn = (e) => {
  setIsLoading(true);

  let response = apiCalls.searchLocation(e);
  response
    .then((val) => {
      setIsLoading(false);
      if (val?.data) {
        //
        form.setFieldsValue({
          City_New:val?.data?.village?.city?.cityName,
          State_New:val?.data?.village?.city?.district?.state?.name,
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
};

const getAgentEnquiry = (e)=>{
  setIsLoading(true);
  let response = apiCalls.getAgentEnquiry(e);
  response
    .then((val) => {
      if (val?.data) {
       // setClientEnquiryData(val?.data?.responseBody);

        const res = val?.data?.responseBody;
          form.setFieldsValue({
          //AgentCode_New:res?.agnum,
          AgentName_New: res?.cltname,
          Channel_New: res?.cltname,
          AgentBranch_New:res?.aradesc,
        })
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
const handleAgentCode=(e,item)=>{
  if(e){
    getAgentEnquiry(e);
  }
}
const handleDropdownChange= (e,item)=>{
if(item?.label?.includes("GSTIN Updated For")&&checkedList?.includes("View Existing GSTIN")){
 let clientNumber= e === 1? customerData?.laClientID:customerData?.poClientID
  getGSTNumberData(clientNumber);
}
else if((selectedSubType==="changeinname" && item.name === "Update_New") ||  selectedSubType==="changeinname"&&(checkedList?.includes("View Existing Details")||checkedList?.includes("Update New Details"))
&&(item?.label?.includes("Update New Details Of")||item?.label?.includes("View Existing Details Of"))){
  getClientEnquiry(e);
 }
 else if(selectedSubType==="panupdate"&&(checkedList?.includes("View Existing PAN Details")||checkedList?.includes("Update New PAN Number"))){
  //getCheckPANdetails(e);
  getClientEnquiry(e);
 } 
//  else if(selectedSubType==="agentcodecorrection"&&checkedList?.includes("View Existing Agent Code Details")){
//   getAgentEnquiry(e);
//  }
}

const handleLinkValue  =(item)=>{
  //
  setAddressProofModal(true);
 }



const handleTextLink=(item)=>{
  if(item.label?.includes("Signature Proof")){
    setAddressProofModal(true);
  }
  else if(item.label?.includes("Agent Signature Verification")){
    const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${isAgentApplicationNo}`;
    window.open(url, '_blank');
  }
  else if(item.linkValue?.toLowerCase() === "view"){
    const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
    window.open(url, '_blank');
  }
}

const handleTitleCheckBox = (e,item) => {
  setSelectCheckBox(false)
  setShowNewSignatureFields(false);
  setShowSignatureProcess(false);
  if(item?.label?.includes("Update New Signaure")){
    setSelectCheckBox(item.name);
    setShowNewSignatureFields(true);
  }
  else if(item?.label?.includes("Share Signature Update Process")){
    setShowSignatureProcess(true);
    setSelectCheckBox(item.name);
  }
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

const handleRadioChange = (e,item) => {
  
  // LifeAsiaUpdated
if(item.name=== "LifeAsiaUpdated" && e.target.value === 'yes'){
  setHideSubmitBtn(true)
}else if(item.name=== "LifeAsiaUpdated" && e.target.value === 'no'){
  setHideSubmitBtn(false)
}

  
  if(item.name === "Stage_Document" && e.target.value === 'yes'){

    ContractAlterationData[selectedSubType]?.Update_New_Details?.forEach(element => {
      if(element?.name === 'UploadNameChangeProof' || element?.name === 'UploadIDProof' ){
        element.hide = true;
        element.required = false;
      }
    });
    setShowReasonDelayField(!showResonDelayField)
  }else if(item.name === "Stage_Document" && e.target.value === 'no'){
    ContractAlterationData[selectedSubType]?.Update_New_Details?.forEach(element => {
      if(element?.name === 'UploadNameChangeProof' || element?.name === 'UploadIDProof' ){
        element.hide = false;
        element.required = true;
      }
    });
    setShowReasonDelayField(!showResonDelayField)
  }
  setIsShowOTPModal(false);
  setShowRaiseRequirementBtn(false);
   setIsShowDOBRequestForms(false);

   if(e.target.value === "requestform" ||item.name ==='ValidateSignature'){
    setIsShowDOBRequestForms(true);
   }
  // if(e.target.value === "no"&&item?.label?.includes("Validate Signature")&&selectedSubType!=="gstinupdate"){
  //   setShowRaiseRequirementBtn(true);
  // }
   if((selectedSubType==="changeindobnomineeappointee")&&e.target.value === "requestform"){
    setIsShowDOBRequestForms(true);
  }
  else if(e.target.value === "otp"){
    setIsShowOTPModal(true);
    setIsShowRequestDetails(false);
    setIsShowRequestDetails(false);
  }
  else if(e.target.value === "requestform"){
   setIsShowRequestDetails(true);
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
    if (item === "BranchReceivedDate"||item==="branchreceivedate") {
      setShowReasonDelayField(false);
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
        form.setFieldsValue({
          branchreceiveddate: "",
          BranchReceivedDate: "",
          branchreceivedate:""
        })
      return;
      }
      if((selectedSubType==="additionofrider"||selectedSubType==="deletionofrider")){
        ContractAlterationData[selectedSubType]?.BOE_Details?.forEach(element => {
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
      else if(selectedSubType==="changeinsignature"){
        ContractAlterationData[selectedSubType]?.Update_New_Signature_Fields?.forEach(element => {
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
      else if(selectedSubType==="gstinupdate"){
        ContractAlterationData[selectedSubType]?.Update_GSTIN_Details?.forEach(element => {
          if(element?.label?.includes("Reason For Delayed Submission")&&selectDate < todayDate){
            element.hide= false;
            setShowReasonDelayField(true);
          }
          else if(element?.label?.includes("Reason For Delayed Submission")&&selectDate >= todayDate){
            element.hide= true;
            setShowReasonDelayField(false);
          }
        });
      } else if(selectedSubType==="changeinownership"){
        ContractAlterationData[selectedSubType]?.Update_NEW_Owner_Details?.forEach(element => {
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
      else if(selectedSubType==="panupdate"){
        ContractAlterationData[selectedSubType]?.RequestForm_Fields?.forEach(element => {
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

      else if(selectedSubType==="changeindob"){
        ContractAlterationData[selectedSubType]?.RequestForm_Fields?.forEach(element => {
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
        

        ContractAlterationData[selectedSubType]?.Update_New_Details?.forEach(element => {
          if(element?.label?.includes("Reason For Delayed Submission")&&selectDate < todayDate){
            element.hide= false;
            setShowReasonDelayField(true);
          }
          else if(element?.label?.includes("Reason For Delayed Submission")&&selectDate >= todayDate){
            element.hide= true;
            setShowReasonDelayField(false);
          }
        });

        ContractAlterationData[selectedSubType]?.Upload_Fields?.forEach(element => {
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

  const handleEdit = (val)=>{
    

    if(val==='edit'){
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.posEdit){
            element.disabled = false
          }
      });


    }else if(val==='close'){
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
        if(element?.posEdit){
          element.disabled = true
        }
    });

    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      changeinownershipObj[element.tagName] = element.tagValue
    });

      form.setFieldsValue({
        BankIFSC: changeinownershipObj?.BankIFSC,
        BankName: changeinownershipObj?.BankName,
        AccountType: changeinownershipObj?.AccountType,
        NameAsMentionedInTheBank: changeinownershipObj?.NameAsMentionedInTheBank,
        BankAccountNumber: changeinownershipObj?.BankAccountNumber,
        InitiatePennyDrop: changeinownershipObj?.InitiatePennyDrop,
      })
    }
    
  }

       //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={ContractAlterationData[selectedSubType]?.[formType]}
        subType={selectedSubType}
         suffix={!isShowPOSScreen && suffix}
         handleUploadLink={handleUploadLink}
        form={form}
        handleRadioChange={handleRadioChange}
        handleDateChange={handleDateChange}
        handleTextLink ={handleTextLink}
        handleLinkValue = {handleLinkValue}
        handleTitleCheckBox={handleTitleCheckBox}
        clientRoleLU={clientRoleLU}
        handleDropdownChange={handleDropdownChange}
        selectCheckBox={selectCheckBox}
        toggleInputField={toggleInputField}
        activeEmailIcons={activeEmailIcons}
        activeMobileIcons={activeMobileIcons}
        activeWhatsAppIcons={activeWhatsAppIcons}
        panUpdateLU={panUpdateLU}
        handleAgentCode={handleAgentCode}
        getUploadFiles={getUploadFiles}
        handleLabelLink ={handleLabelLink }
        disabledDate={disabledDate}
        onBlurInput ={onBlurInput }
        handleInputChange={handleInputChange}
        requestModeLU={requestModeLU}
        disableRequestForm={disableRequestForm}
        disableOTP={disableOTP}
        handleEdit = {handleEdit}
      ></DetailsForm>
    );
  };
  const  onBlurInput =(value,item)=>{
    const obj = form.getFieldsValue(value)
    if(item.name === "BankIFSC" && value){
      getIFSCBankDetails(value);
    }
    if(item.name ==="PINCode"){
      form.setFieldsValue({
        City_New:'',
        State_New:'',
      })
     }

    if(item.name ==="PINCode" && value && value?.length ===6){
      searchLocationn(value)
    }

   if(item?.label?.includes("Agent Application Number")){
    setIsAgentApplicationNo(value);
   }

   if((item.name === "PANNumber"||item?.name?.toLowerCase()==="newpanno"||item?.name?.toLowerCase()==="reenterpanno_new") && value.length ===10){
    CheckPANdetails()
  }

  if(item.name === "CKYCNumber"&& value.length ===14){
    CKYCC()
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
  const handleLabelLink =(item)=>{
    if(item.label === "Initiate Penny Drop"){
      InitiatePennyDropp();
    }
   

  }
 
  const convertDate = (inputDate) => {
    if(inputDate){
      const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
      return formattedDate;
    }else{
      return ''
    }
 
  };

  const convertDatee= (inputDate) => {
    if(inputDate){
      const formattedDate = moment(new Date(inputDate), "YYYYMMDD").format("DD/MM/YYYY");
      return formattedDate;
    }else{
      return ''
    }
 
  };

  const getTransactionData = (values) => {
    if (selectedSubType === "gstinupdate") {
      return [
        // { Status: "Create", TagName: "GSTINToBeUpdateFor", TagValue: values?.GSTINToBeUpdateFor },
        { Status: "Create", TagName: "ExistingGSTINNumber", TagValue: values?.ExistingGSTINNumber || isExistingGSTNo },
        { Status: "Create", TagName: "NewGSTINNumber", TagValue: values?.NewGSTINNumber || ""},
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments || ""},
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature || ""},
        {Status: "Create",TagName: "Client_Id","TagValue":  values?.GSTINToBeUpdateFor === 1 ? customerData?.laClientID: customerData?.poClientID},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"}
      ];
    } 
    else if (selectedSubType === "panupdate") {
      return [
        { Status: "Create", TagName: "PanUpdateFor_Old", TagValue: values?.PanUpdateFor_Old || isPANExistingObj?.PanUpdateFor_Old  },
        { Status: "Create", TagName: "Name_Old", TagValue: values?.Name_Old || isPANExistingObj?.Name_Old },
        { Status: "Create", TagName: "DOB_Old", TagValue: values?.DOB_Old || isPANExistingObj?.DOB_Old },
        { Status: "Create", TagName: "PanUpdateFor_New", TagValue: values?.PanUpdateFor_New || ""},
        { Status: "Create", TagName: "Name_New", TagValue: values?.Name_New || ""},
        { Status: "Create", TagName: "DOB_New", TagValue: values?.DOB_New || ""},
        { Status: "Create", TagName: "ExistingPanNo", TagValue: values?.ExistingPanNo || isPANExistingObj?.ExistingPanNo},
        { Status: "Create", TagName: "NewPanNo", TagValue: values?.NewPanNo || ""},
        { Status: "Create", TagName: "NameinPAN", TagValue: values?.NameinPAN || ""},
        { Status: "Create", TagName: "NameMatch", TagValue: values?.NameMatch || ""},
        { Status: "Create", TagName: "PanValidation", TagValue: values?.PanValidation || ""},
        { Status: "Create", TagName: "PanAadharSeeding", TagValue: values?.PanAadharSeeding || ""},
        { Status: "Create", TagName: "Last2YearsITRFilling", TagValue: values?.Last2YearsITRFilling || ""},
       
        
        {
          "Status": "Create",
          "TagName": "NameMatchFlag",
          "TagValue":"Yes"
},
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments || ""},
        {
          "Status": "Create",
          "TagName": "ValidatedBy",
          "TagValue": values?.customerchoice ? values?.customerchoice : 'form'
      },
        {Status: "Create",TagName: "Client_Id","TagValue":  values?.PanUpdateFor_New === 1 ? customerData?.laClientID: customerData?.poClientID},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSENQUIRY"}
      ];
    } 
    else if (selectedSubType === "changeinname") {
      return [
        { Status: "Create", TagName: "Update_New", TagValue: values?.Update_New },
        { Status: "Create", TagName: "Salutation_Old", TagValue: ClientEnquiry?.salutl },
        { Status: "Create", TagName: "FirstName_Old", TagValue: ClientEnquiry?.lgivname },
        { Status: "Create", TagName: "MiddleName_Old", TagValue: ClientEnquiry?.initials },
        { Status: "Create", TagName: "LastName_Old", TagValue: ClientEnquiry?.lsurname },
        { Status: "Create", TagName: "Update_New", TagValue: values?.Update_New },
        { Status: "Create", TagName: "Salutation_New", TagValue: values?.Salutation_New },
        { Status: "Create", TagName: "FirstName_New", TagValue: values?.FirstName_New },
        { Status: "Create", TagName: "MiddleName_New", TagValue: values?.MiddleName_New },
        { Status: "Create", TagName: "LastName_New", TagValue: values?.LastName_New },
        { Status: "Create", TagName: "Stage_Document", TagValue: values?.Stage_Document },
        { Status: "Create", TagName: "Validate_Signature", TagValue: values?.Validate_Signature },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        { Status: "Create", TagName: "clttype", TagValue: cltType},
        { Status: "Create", TagName: "ReasonForDelay", TagValue: values?.ReasonForDelay },
        {Status: "Create",TagName: "Client_Id","TagValue":  values?.Update_New === 1 ? customerData?.laClientID: customerData?.poClientID}
      ];
    } 
    else if (selectedSubType === "agentcodecorrection") {
      return [
        { Status: "Create", TagName: "AgentCode_Old", TagValue: values?.AgentCode_Old || issAgentExistingObj?.AgentCode_Old},
        { Status: "Create", TagName: "AgentName_Old", TagValue: values?.AgentName_Old || issAgentExistingObj?.AgentCode_Old},
        { Status: "Create", TagName: "Channel_Old", TagValue: values?.Channel_Old || issAgentExistingObj?.AgentCode_Old},
        { Status: "Create", TagName: "AgentBranch_Old", TagValue: values?.AgentBranch_Old || issAgentExistingObj?.AgentCode_Old},
        { Status: "Create", TagName: "Reasonforagentcodechange", TagValue: values?.Reasonforagentcodechange || ""},
        { Status: "Create", TagName: "CurrentCDF", TagValue: values?.CurrentCDF || ""},
        { Status: "Create", TagName: "AgentCode_New", TagValue: values?.AgentCode_New }|| "",
        { Status: "Create", TagName: "AgentName_New", TagValue: values?.AgentName_New || ""},
        { Status: "Create", TagName: "Channel_New", TagValue: values?.Channel_New || ""},
        { Status: "Create", TagName: "AgentBranch_New", TagValue: values?.AgentBranch_New || ""},
        { Status: "Create", TagName: "AgentBranch_New", TagValue: values?.AgentBranch_New || ""},
        { Status: "Create", TagName: "Agnet_Application_Number", TagValue: values?.Agnet_Application_Number || ""},
        { Status: "Create", TagName: "AgentSignaturVerificationResult", TagValue: values?.AgentSignaturVerificationResult || ""},
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments || ""},
        {Status: "Create",TagName: "Client_Id","TagValue":  values?.AgentCode_New === 1 ? customerData?.laClientID: customerData?.poClientID}
      ];
    } 
    else if (selectedSubType === "changeinsignature") {
      return [
        { Status: "Create", TagName: "custRole", TagValue: values?.custRole },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature },
        {Status: "Create",TagName: "Client_Id","TagValue":  values?.custRole === 1 ? customerData?.laClientID: customerData?.poClientID},
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSENQUIRY"},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
      ];
    }
    else if (selectedSubType === "changeinterm") {
      return [
        { Status: "Create", TagName: "PlanName_Old", TagValue: values?.PlanName_Old || isTermExistingObj?.PlanName_Old },
        { Status: "Create", TagName: "PolicyTerm_Old", TagValue: values?.PolicyTerm_Old || isTermExistingObj?.PolicyTerm_Old },
        { Status: "Create", TagName: "CurrentPremium_Old", TagValue: values?.CurrentPremium_Old || isTermExistingObj?.CurrentPremium_Old},
        { Status: "Create", TagName: "NewTerm_New", TagValue: values?.NewTerm_New },
        { Status: "Create", TagName: "ReasonForChange_New", TagValue: values?.ReasonForChange_New },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"}
      ];
    } 
    else if (selectedSubType === "changeinsumassured") {
      return [
        { Status: "Create", TagName: "SumAssured_Old", TagValue: values?.SumAssured_Old || isSumAssuredExistingObj?.SumAssured_Old },
        { Status: "Create", TagName: "CurrentPremium_Old", TagValue: values?.CurrentPremium_Old || isSumAssuredExistingObj?.CurrentPremium_Old },
        { Status: "Create", TagName: "SumAssured_New", TagValue: values?.SumAssured_New },
        { Status: "Create", TagName: "ReasonForChange_New", TagValue: values?.ReasonForChange_New },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
      ];
    } 
    else if (selectedSubType === "changeinplan") {
      return [
        { Status: "Create", TagName: "PlanName_Old", TagValue: values?.PlanName_Old || isPlanExistingObj?.PlanName_Old },
        { Status: "Create", TagName: "CurrentPremium_Old", TagValue: values?.CurrentPremium_Old || isPlanExistingObj?.CurrentPremium_Old },
        { Status: "Create", TagName: "NewPlan_New", TagValue: values?.NewPlan_New || "" },
        { Status: "Create", TagName: "ReasonForChange_New", TagValue: values?.ReasonForChange_New },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
      ];
    } 
    else if (selectedSubType === "changeinpremium") {
      return [
        { Status: "Create", TagName: "PlanName_Old", TagValue: values?.PlanName_Old || isPremiumExistingObj?.PlanName_Old },
        { Status: "Create", TagName: "CurrentPremium_Old", TagValue: values?.CurrentPremium_Old || isPremiumExistingObj?.CurrentPremium_Old},
        { Status: "Create", TagName: "NewPremium_New", TagValue: values?.NewPremium_New || "" },
        { Status: "Create", TagName: "ReasonForChange_New", TagValue: values?.ReasonForChange_New },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
      ];
    } 
    else if ((selectedSubType==="additionofrider"||selectedSubType==="deletionofrider")) {
      return [
        { Status: "Create", TagName: "RiderName", TagValue: values?.RiderName},
        { Status: "Create", TagName: "RequestFor", TagValue: values?.RequestFor },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
      ];
    }
    else if ((selectedSubType ==='changeindob')) {
      return [
        { Status: "Create", TagName: "ClientRole_Existing", TagValue: values?.ClientRole_Existing},
        { Status: "Create", TagName: "ExistingDateofBirth_Existing", TagValue: values?.ExistingDateofBirth_Existing },
        { Status: "Create", TagName: "Age_Existing", TagValue: values?.Age_Existing },


        { Status: "Create", TagName: "custRole", TagValue: values?.custRole},
        { Status: "Create", TagName: "NewDateofBirth", TagValue: values?.NewDateofBirth ? convertDatee(values?.NewDateofBirth):'',},
        { Status: "Create", TagName: "Age", TagValue: values?.Age },
        { Status: "Create", TagName: "RefertoNBStageDocument", TagValue: values?.RefertoNBStageDocument},
        { Status: "Create", TagName: "InitiateRequestBy", TagValue: values?.InitiateRequestBy },
 
        
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature },
        { Status: "Create", TagName: "ReasonForDelay", TagValue: values?.ReasonForDelay },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
    

    else if(checkedList[0] === 'Update New Owner Details' && selectedSubType === 'changeinownership') {
      return [
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
      {"tagName":"ProposerName_New","tagValue": values?.ProposerName_New,"status":"Create"},
      {"tagName":"ProposerDOB_New","tagValue":  values?.ProposerDOB_New ? convertDatee(values?.ProposerDOB_New):'',"status":"Create"},
      {"tagName":"AddressLine1_New","tagValue": values?.AddressLine1_New,"status":"Create"},
      {"tagName":"AddressLine2_New","tagValue": values?.AddressLine2_New,"status":"Create"},
      {"tagName":"AddressLine3_New","tagValue": values?.AddressLine3_New,"status":"Create"},
      {"tagName":"PINCode","tagValue": values?.PINCode,"status":"Create"},
      {"tagName":"City_New","tagValue": values?.City_New,"status":"Create"},
      {"tagName":"State_New","tagValue": values?.State_New,"status":"Create"},

      {"tagName":"ProposerName_Old","tagValue":ClientEnquiry?.poName,"status":"Create"},
      {"tagName":"ProposerDOB_Old","tagValue": ClientEnquiry?.clTdob ? convertDate(ClientEnquiry?.clTdob ):'',"status":"Create"},
      {"tagName":"AddressLine1_Old","tagValue": ClientEnquiry?.cltaddR01,"status":"Create"},
      {"tagName":"AddressLine2_Old","tagValue": ClientEnquiry?.cltaddR02,"status":"Create"},
      {"tagName":"AddressLine3_Old","tagValue": ClientEnquiry?.cltaddR03,"status":"Create"},
      {"tagName":"City_Old","tagValue": ClientEnquiry?.cltaddR04,"status":"Create"},
      {"tagName":"State_Old","tagValue": ClientEnquiry?.cltaddR05,"status":"Create"},
      // {"tagName":"City_New","tagValue": ClientEnquiry?.cltaddR04,"status":"Create"},
      // {"tagName":"State_New","tagValue": ClientEnquiry?.cltaddR05,"status":"Create"},
      {"tagName":"MobileNumber_Old","tagValue": ClientEnquiry?.rmblphone,"status":"Create"},
      {"tagName":"ProposerEmailID_Old","tagValue": ClientEnquiry?.rinternet,"status":"Create"},
      {"tagName":"MobileNumber_Old","tagValue": values?.MobileNumber_Old,"status":"Create"},
      {"tagName":"ProposerEmailID_Old","tagValue": values?.ProposerEmailID_Old,"status":"Create"},
      {"tagName":"MobileNumber_New","tagValue": values?.MobileNumber_New,"status":"Create"},
      {"tagName":"ProposerEmailID_New","tagValue": values?.ProposerEmailID_New,"status":"Create"},
      {"tagName":"RelationtoLifeAssured","tagValue": values?.RelationtoLifeAssured,"status":"Create"},
      {"tagName":"PANNumber","tagValue": values?.PANNumber,"status":"Create"},
      {"tagName":"PANResult","tagValue": values?.PANResult,"status":"Create"},
      {"tagName":"CKYCNumber","tagValue": values?.CKYCNumber,"status":"Create"},
      {"tagName":"ReasonForOwnershipChange","tagValue": values?.ReasonForOwnershipChange,"status":"Create"},
      
      {"tagName":"BankName","tagValue": values?.BankName,"status":"Create"},
      {"tagName":"BankIFSC","tagValue": values?.BankIFSC,"status":"Create"},
      {"tagName":"NameAsMentionedInTheBank","tagValue": values?.NameAsMentionedInTheBank,"status":"Create"},
      {"tagName":"BankAccountNumber","tagValue": values?.BankAccountNumber,"status":"Create"},
      {"tagName":"AccountType","tagValue":values?.AccountType,"status":"Create"},
      {"tagName":"InitiatePennyDrop","tagValue":values?.InitiatePennyDrop,"status":"Create"},
      

      {"tagName":"CustomerSigningDate","tagValue": values?.CustomerSigningDate ? new Date(values?.CustomerSigningDate):'',"status":"Create"},
      {"tagName":"BranchReceivedDate","tagValue": values?.BranchReceivedDate ? new Date(values?.BranchReceivedDate) : '',"status":"Create"},
      {"tagName":"ValidateSignature","tagValue": values?.ValidateSignature,"status":"Create"},
      {"tagName":"Comments","tagValue": values?.Comments,"status":"Create"},
 ]
    }
  };
  const getSelectedCommunications = () =>{
    let communicationObj = []
    if(showEmailAddress||!showEmailAddress){
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
    if((showWhatsApp||showPhoneNumber)||(!showWhatsApp||!showPhoneNumber)){
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

  const getPOSTransactionData = (values) => {
    if (selectedSubType === "gstinupdate") {
      return [
        // { Status: "Update", TagName: "GSTINToBeUpdateFor", TagValue: values?.GSTINToBeUpdateFor},
        { Status: "Update", TagName: "ExistingGSTINNumber", TagValue: values?.ExistingGSTINNumber},
        { Status: "Update", TagName: "NewGSTINNumber", TagValue: values?.NewGSTINNumber },
        { Status: "Update", TagName: "Comments", TagValue: values?.Comments },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature || ""},
      ];
    } 
    else if (selectedSubType === "panupdate") {
      return [
        { Status: "Update", TagName: "PanValidation", TagValue: values?.PanValidation },
        { Status: "Update", TagName: "PANCardCopy", TagValue: values?.PANCardCopy },
        { Status: "Update", TagName: "ReEnterPanNo_New", TagValue: values?.ReEnterPanNo_New },
        { Status: "Update", TagName: "PANRevalidationResult", TagValue: values?.PANRevalidationResult },
        { Status: "Update", TagName: "NameinPAN", TagValue: values?.NameinPAN },
        // { Status: "Update", TagName: "PanAadharSeeding", TagValue: values?.PanAadharSeeding },
        // { Status: "Update", TagName: "Last2YearsITRFilling", TagValue: values?.Last2YearsITRFilling },
        {
          "Status": "Update",
          "TagName": "NameMatchFlag",
          "TagValue":"Yes"
},
        { Status: "Update", TagName: "Comments", TagValue: values?.Comments },
      ];
    } 
    else if (selectedSubType === "changeinname") {
      return [
        { Status: "Update", TagName: "RequestFor", TagValue: values?.RequestFor },
        { Status: "Update", TagName: "Salutation_New", TagValue: values?.Salutation_New },
        { Status: "Update", TagName: "FirstName_New", TagValue: values?.FirstName_New },
        { Status: "Update", TagName: "MiddleName_New", TagValue: values?.MiddleName_New },
        { Status: "Update", TagName: "LastName_New", TagValue: values?.LastName_New },
        { Status: "Update", TagName: "NameDeDupematch", TagValue: values?.NameDeDupematch },
        { Status: "Update", TagName: "ValidateSignature", TagValue: values?.ValidateSignature },
        { Status: "Update", TagName: "CustSignDateTime", TagValue: values?.CustomerSigningDate },
        { Status: "Update", TagName: "resonfordelay", TagValue: values?.resonfordelay },
        { Status: "Update", TagName: "Comments", TagValue: values?.Comments },
      ];
    } 
    else if (selectedSubType === "agentcodecorrection") {
      return [
        { Status: "Update", TagName: "AgentCode_New", TagValue: values?.AgentCode_New },
        { Status: "Update", TagName: "AgentName_New", TagValue: values?.AgentName_New },
        { Status: "Update", TagName: "Reasonforagentcodechange", TagValue: values?.Reasonforagentcodechange },
        { Status: "Update", TagName: "MatchSouringCodeUnderNewCDFandOldCDF", TagValue: values?.MatchSouringCodeUnderNewCDFandOldCDF },
        { Status: "Update", TagName: "AgentSignaturVerificationResult", TagValue: values?.AgentSignaturVerificationResult },
        { Status: "Update", TagName: "Matchnewcodeandoldcoderelationship", TagValue: values?.Matchnewcodeandoldcoderelationship },
        { Status: "Update", TagName: "Comments", TagValue: values?.Comments },
      ];
    } 
    else if (selectedSubType === "changeinsignature") {
      return [
        { Status: "Create", TagName: "custRole", TagValue: values?.custRole },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature },
        {Status: "Create",TagName: "Client_Id","TagValue":  values?.custRole === 1 ? customerData?.laClientID: customerData?.poClientID},
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
    else if (selectedSubType === "changeinsignature") {
      return [
        { Status: "Create", TagName: "custRole", TagValue: values?.custRole },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature },
        {Status: "Create",TagName: "Client_Id","TagValue":  values?.custRole === 1 ? customerData?.laClientID: customerData?.poClientID},
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }  
  };

  const handleSubmit = (values) => {
    if((selectedSubType==="changeindobnomineeappointee")){
      setIsShowPOSScreen(!isShowPOSScreen);
      return;
    }
    if((checkedList?.includes("Share Process Communication"))&&!isShowPOSScreen&&!showEmailFields){
      message.destroy();
      message.error({
        content:
          "Please select atleast one communication.",
        className: "custom-msg",
        duration: 2,
      });
     }
    else{
      if (POSContactData && customerData?.isPOS) {
        POSActionsOnContactDetails(values, "APPROVED");
      } else if (selectedSubType === "changeinname" || selectedSubType==='agentcodecorrection' || selectedSubType==="gstinupdate"
      || selectedSubType === "panupdate" || selectedSubType === "changeinsignature" || selectedSubType==="changeinterm" ||
        selectedSubType==="changeinplan" || selectedSubType==="changeinsumassured"||selectedSubType==="changeinpremium" ||
        (selectedSubType==="additionofrider"||selectedSubType==="deletionofrider") || selectedSubType==="changeinownership" || selectedSubType==="changeindob")  {
        if(((values?.validatesignature === 'no'||values?.ValidateSignature === 'no' || values?.Validate_Signature === 'no')&&(selectedSubType!=="gstinupdate"))){
          // getRaiseRequirements();
          saveRequest(values)
        }else{
          saveRequest(values);
        }
    };
    }
  };

  const saveRequest =(values)=>{
        setIsLoading(true);
    setShowAlert(false);
    const newFilesArray = [];
    if (uploadFiles?.length > 0 && uploadMultipleFiles?.length > 0) {
      newFilesArray.push(...uploadFiles, ...uploadMultipleFiles);
    }
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values?.requestchannel, // Required
      Category: (checkedList?.includes("View Existing GSTIN") ||checkedList?.includes("View Existing PAN Details") ||
      checkedList?.includes("View Existing Details") || checkedList?.includes("View Existing Agent Code Details")) ||
      checkedList?.some(item => item.includes("View Existing"))
      ? 1
       : (checkedList?.includes("Update New GSTIN") ||  checkedList?.includes("Update New PAN Number") || 
       checkedList?.includes("Update New Details") || checkedList?.includes("Update Agent Code Details") ||
       checkedList?.includes("Update New Signaure") || showNewSignatureFields ||
       checkedList?.some(item => item.includes("Update New")) || (selectedSubType==="additionofrider"||selectedSubType==="deletionofrider") || selectedSubType==="changeinsignature"||
       selectedSubType==="changeinterm"||selectedSubType==="changeinplan" || selectedSubType==="changeinpremium"||selectedSubType==="changeinsumassured") 
       ? 2 : 3,
      ApplicationNo:
      details?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: values?.GSTINToBeUpdateFor=== 1?  customerData?.laClientID:customerData?.poClientID,
      CustRole: values?.custRole,
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
      RequestDateTime:values?.BranchReceivedDate
      ? new Date(values?.BranchReceivedDate)
      : new Date(),
      ReasonDelayed: values?.ReasonForDelay || values?.resonfordelay,
      CustSignDateTime: values?.CustomerSigningDate
        ? new Date(values?.CustomerSigningDate)
        : new Date(),
        TransactionData: getTransactionData(values),
        Uploads: newFilesArray?.length>0 ? newFilesArray : uploadFiles,
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
    };

    if(raiseRequirementOpen){
      let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
      obj.TransactionData.push({
        "Status": "Create",
        "TagName": "ReasonList_Key",
        "TagValue":  JSON.stringify(ids)
      })
        }

    // if(values?.Validate_Signature === 'no'){
    //   let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
    
    //   obj.TransactionData.push({
    //     "Status": "Create",
    //     "TagName": "ReasonList_Key",
    //     "TagValue":  JSON.stringify(ids)
    //   })
    // }
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
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
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
      Comments: values?.comment,
      TransactionPayload: getPOSTransactionData(values) || [
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
        setIsLoading(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoading(false);
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
    if(raiseRequirementOpen){
      saveRequest(formData);
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

  const handleRemove = (file) => {
    //
    if(file?.labelName === "Copy of Passport"){
      setPassportUploadFiles([]);
    }else if(file?.labelName === "Copy of PAN Card"){
      setPancardUploadFiles([]);
    }
    let updatedFiles = isUploadMultipleFiles?.filter((ele)=>{
               return ele?.labelName !== file.labelName
    });
    setIsMultipleFiles(updatedFiles)
    form.setFieldsValue({
      addressProof: `Documents Uploaded -  ${updatedFiles.length }`,
    })


  };


  const getMultpleUploadFiles=(listOfUploadFiles,label)=>{
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

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    customRequest: ({ file, onSuccess, index,item },label) => {
      let formData = new FormData();
      const ApplicationNo =  details?.policyDetailsObj?.identifiers?.applicationNo
      formData.append("File", file, ApplicationNo+'/'+file.name);
      let response = apiCalls.fileUpload(formData);
      response
      .then((val) => {
        if (val?.data) {
          
          let newDocumentObj= {
            "IndexName": "Signature",
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
            setAAdharUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of Passport")){
            setPassportUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of Ration Card")){
            setRationCardUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of Driving License")){
            setDrivingUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of PAN Card")){
            setPancardUploadFiles([{...newDocumentObj}])
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

  return (
    <>
      <Spin spinning={isLoading} fullscreen/>
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
           {/*Change In Name SubType Code Start */} 
          {selectedSubType==="changeinname"&&<>
          {!isShowPOSScreen && (
            <>
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
                  label="View Existing Details"
                  name="viewExistingdetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing Details"
                    checked={checkedList.includes(
                      "View Existing Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing Details")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xxl={12}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Update New Details"
                  name="UpdateNewDetails"
                >
                  <Checkbox
                    value="Update New Details"
                    checked={checkedList.includes(
                      "Update New Details"
                    )}
                    onChange={() =>
                      handleChange("Update New Details")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
            </Row>
             </>)}
             {checkedList?.includes(
                      "View Existing Details"
                    )&&<>
                      {renderDetailsForm(isShowPOSScreen?"POS_Details":"Existing_Details")}
             </>}
             {checkedList?.includes(
                      "Update New Details"
                    )&&<>
                     {renderDetailsForm(isShowPOSScreen?"POS_Details":"Update_New_Details")}
                     {showResonDelayField&&<>
              <DetailsForm
                data={ContractAlterationData[selectedSubType]?.ReasonSubmission}
              ></DetailsForm>
              </>}
             </>}
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

            {/* {(!isShowPOSScreen&&showRaiseRequirementBtn) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit" 
                 //onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )} */}
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
           {/*Change In Name SubType Code End */} 

          {/*Change In Signature SubType Code Start */} 
            {selectedSubType==="changeinsignature"&&<>
             {renderDetailsForm(isShowPOSScreen?"POS_Details":"BOE_Details")}
          {!isShowPOSScreen && (
            <>
              {showNewSignatureFields && (
                <>
                 {renderDetailsForm("Update_New_Signature_Fields")}
                </>
              )}
              {showSiganatureProcess && (
                <>
                    {renderDetailsForm("Signature_Process_Fields")}
                     {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          
                </>
              )}
              <DetailsForm
                data={ContractAlterationData[selectedSubType]?.Comments}
                callType={selectedCallType}
                subType={selectedSubType}
              ></DetailsForm>
            </>
          )}
          <div className="contact-details-btn">
            {/* {!showRaiseRequirementBtn&&<> */}
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            {/* </>} */}

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
          {/*Change In Signature SubType Code End */} 

          {/*PAN Update SubType Code Start */} 
          {selectedSubType==="panupdate"&&<>
          {!isShowPOSScreen && (
            <>
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
                  label="View Existing PAN Details"
                  name="viewExistingloandetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing PAN Details"
                    checked={checkedList.includes(
                      "View Existing PAN Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing PAN Details")
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
                  label="Update New PAN"
                  name="vieweligibleloan"
                >
                  <Checkbox
                    value="Update New PAN Number"
                    checked={checkedList.includes(
                      "Update New PAN Number"
                    )}
                    onChange={() =>
                      handleChange("Update New PAN Number")
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
                  label="Share Process Communication"
                  name="shareprocess"
                >
                  <Checkbox
                    value="Share Process Communication"
                    checked={checkedList.includes(
                      "Share Process Communication"
                    )}
                    onChange={() =>
                      handleChange("Share Process Communication")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
            </Row>
            {checkedList?.includes(
                      "View Existing PAN Details"
                    ) && (
                <>
                 {renderDetailsForm("Existing_PAN_Details")}
                </>
              )}
              {checkedList?.includes(
                      "Update New PAN Number"
                    )&& (
                <>
                {renderDetailsForm("Update_PAN_Details")}
                {isShowRequestDetails&&<>
                  {renderDetailsForm("RequestForm_Fields")}
                </>}
                </>
              )}
              {checkedList?.includes(
                      "Share Process Communication"
                    ) && (
                <>
                {renderDetailsForm("Share_Process_Details")}
                {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          <DetailsForm
                data={ContractAlterationData[selectedSubType]?.Comments}
                subType={selectedSubType}
              ></DetailsForm>
                </>
              )}
              
            </>)}
          {isShowPOSScreen&&<>
              {renderDetailsForm("POS_Details")}
              </>}
                <div className="contact-details-btn">
            {(checkedList?.length>0||isShowPOSScreen)&&<>
            <Button type="primary" className="primary-btn" htmlType="submit" 
            disabled={isDisablePANApproveBtn&&isShowPOSScreen}
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
           {/*PAN Update SubType Code End */} 

          {/*GST In Update SubType Code Start */} 
          {selectedSubType==="gstinupdate"&&<>
          {!isShowPOSScreen && (
            <>
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
                  label="View Existing GSTIN"
                  name="viewExistingloandetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing GSTIN"
                    checked={checkedList.includes(
                      "View Existing GSTIN"
                    )}
                    onChange={() =>
                      handleChange("View Existing GSTIN")
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
                  label="Update New GSTIN"
                  name="vieweligibleloan"
                >
                  <Checkbox
                    value="Update New GSTIN"
                    checked={checkedList.includes(
                      "Update New GSTIN"
                    )}
                    onChange={() =>
                      handleChange("Update New GSTIN")
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
                {/* <Form.Item
                  label="Share Process Communication"
                  name="shareprocess"
                >
                  <Checkbox
                    value="Share Process Communication"
                    checked={checkedList.includes(
                      "Share Process Communication"
                    )}
                    onChange={() =>
                      handleChange("Share Process Communication")
                    }
                  ></Checkbox>
                </Form.Item> */}
              </Col>
            </Row>
            {checkedList?.includes(
                      "View Existing GSTIN"
                    ) && (
                <>
                 {renderDetailsForm("Existing_GSTIN_Details")}
                </>
              )}
              {checkedList?.includes(
                      "Update New GSTIN"
                    )&& (
                <>
                {renderDetailsForm("Update_GSTIN_Details")}
                </>
              )}
              {checkedList?.includes(
                      "Share Process Communication"
                    ) && (
                <>
                {renderDetailsForm("Share_GSTIN_Process")}
                {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          <DetailsForm
                data={ContractAlterationData[selectedSubType]?.Comments}
                subType={selectedSubType}
              ></DetailsForm>
                </>
              )}
              
            </>)}
            {isShowPOSScreen&&<>
              {renderDetailsForm("POS_Details")}
              </>}
              <div className="contact-details-btn">
            {(checkedList?.length>0 || isShowPOSScreen)&&<>
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
          {/*GST In Update SubType Code End */} 
       
         {/*Agent Code Correction SubType Code Start */}
          {selectedSubType==="agentcodecorrection" && <>
          {!isShowPOSScreen && (
            <>
              <CheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Existing Agent Code Details', value: 'View Existing Agent Code Details', name: 'ViewExistingAgentCodeDetails' },
                  { label: 'Update Agent Code Details', value: 'Update Agent Code Details', name: 'UpdateAgentCodeDetails' },
                ]}
              />
              {checkedList?.includes('View Existing Agent Code Details') && renderDetailsForm('Existing_AgentCode_Details')}
              {checkedList?.includes('Update Agent Code Details') && renderDetailsForm('Update_AgentCode_Details')}
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
           {/*Agent Code Correction SubType Code End */}

          {/* change in OwnerShip SubType Code Start */}
          {selectedSubType==="changeinownership"&&<>
          {!isShowPOSScreen && (
            <>
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
                  label="View Existing Owner Details"
                  name="ViewExistingOwnerDetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing Owner Details"
                    checked={checkedList.includes(
                      "View Existing Owner Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing Owner Details")
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
                  label="Update New Owner Details"
                  name="UpdateNewOwnerDetails"
                >
                  <Checkbox
                    value="Update New Owner Details"
                    checked={checkedList.includes(
                      "Update New Owner Details"
                    )}
                    onChange={() =>
                      handleChange("Update New Owner Details")
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
                  label="Share Process Communication"
                  name="ShareProcessCommunication"
                >
                  <Checkbox
                    value="Share Process Communication"
                    checked={checkedList.includes(
                      "Share Process Communication"
                    )}
                    onChange={() =>
                      handleChange("Share Process Communication")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
            </Row>
             </>)}
             {checkedList?.includes(
                      "View Existing Owner Details"
                    )&&<>
                      {renderDetailsForm("Existing_Owner_Details")}
             </>}
             {checkedList?.includes(
                      "Update New Owner Details"
                    )&&<>
                     {renderDetailsForm("Update_NEW_Owner_Details")}
                     {showResonDelayField&&<>
                {renderDetailsForm("ReasonSubmission")}
              </>}
              {renderDetailsForm("Comments")}
             </>}
             {checkedList?.includes(
                      "Share Process Communication"
                    )&&<>
                      {renderDetailsForm("Share_Process_Communication")}
                      {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
             </>}
             {isShowPOSScreen&&<>
              {renderDetailsForm("POS_Details")}
             </>}

             <div className="contact-details-btn">
            {/* {!showRaiseRequirementBtn&&<> */}
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            {/* </>} */}

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
          {/* change in OwnerShip SubType Code End */}

             {/* change in Terms SubType Code Start */}
        {selectedSubType==="changeinterm"&&<>     
          {!isShowPOSScreen && (
            <>
              {/* <Row gutter={[16, 16]} className="reasons-list">
              <Col
                 xs={24}
                 sm={24}
                 md={8}
                 lg={8}
                 xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="View Existing Term Details"
                  name="ViewExistingTermDetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing Term Details"
                    checked={checkedList.includes(
                      "View Existing Term Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing Term Details")
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
                  label="Update New Term Details"
                  name="UpdateNewTermDetails"
                >
                  <Checkbox
                    value="Update New Term Details"
                    checked={checkedList.includes(
                      "Update New Term Details"
                    )}
                    onChange={() =>
                      handleChange("Update New Term Details")
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
                  label="Share Process Communication"
                  name="ShareProcessCommunication"
                >
                  <Checkbox
                    value="Share Process Communication"
                    checked={checkedList.includes(
                      "Share Process Communication"
                    )}
                    onChange={() =>
                      handleChange("Share Process Communication")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
            </Row> */}
            {/* {checkedList?.includes(
                      "View Existing Term Details"
                    ) && (
                <> */}
                 {/* {renderDetailsForm("Existing_Term_Details")} */}
                {/* </>
              )} */}
              {/* {checkedList?.includes(
                      "Update New Term Details"
                    )&& (
                <> */}
                {renderDetailsForm("Update_Term_Details")}
                {renderDetailsForm("Upload_Fields")}
                {/* </>
              )} */}

              
{/* {checkedList?.includes(
                      "Share Process Communication"
                    )&&<>
                      {renderDetailsForm("Share_Process_Communication")}
                      {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
             </>} */}
            </>)}
            {isShowPOSScreen&&<>
              {renderDetailsForm("POS_Details")}
              </>}
              <div className="contact-details-btn">
            {/* {!showRaiseRequirementBtn&&<> */}
            { hideSubmitBtn &&
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen 
                ? "Submit"
                : "Approve"}
            </Button>
 }
            {/* </>} */}

            {/* {(!isShowPOSScreen&&showRaiseRequirementBtn) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit" 
                 //onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )} */}
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
            {/* change in Terms SubType Code End */}

             {/* change in Plan SubType Code Start */}
        {selectedSubType==="changeinplan"&&<>     
          {!isShowPOSScreen && (
            <>
              {/* <Row gutter={[16, 16]} className="reasons-list">
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="View Existing Plan Details"
                  name="ViewExistingPlanDetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing Plan Details"
                    checked={checkedList.includes(
                      "View Existing Plan Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing Plan Details")
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
                  label="Update New Plan Details"
                  name="UpdateNewPlanDetails"
                >
                  <Checkbox
                    value="Update New Plan Details"
                    checked={checkedList.includes(
                      "Update New Plan Details"
                    )}
                    onChange={() =>
                      handleChange("Update New Plan Details")
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
                  label="Share Process Communication"
                  name="ShareProcessCommunication"
                >
                  <Checkbox
                    value="Share Process Communication"
                    checked={checkedList.includes(
                      "Share Process Communication"
                    )}
                    onChange={() =>
                      handleChange("Share Process Communication")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
            </Row> */}
            {/* {checkedList?.includes(
                      "View Existing Plan Details"
                    ) && (
                <>
                 {renderDetailsForm("Existing_Plan_Details")}
                </>
              )} */}
              {/* {checkedList?.includes(
                      "Update New Plan Details"
                    )&& (
                <> */}
                {renderDetailsForm("Update_Plan_Details")}
                {renderDetailsForm("Upload_Fields")}
               {/* </>
              )}  */}

{/* {checkedList?.includes(
                      "Share Process Communication"
                    )&&<>
                      {renderDetailsForm("Share_Process_Communication")}
                      {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
             </>} */}
              
            </>)}
            {isShowPOSScreen&&<>
              {renderDetailsForm("POS_Details")}
              </>}
              <div className="contact-details-btn">
            {/* {!showRaiseRequirementBtn&&<> */}
            {hideSubmitBtn && 
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            }
            {/* </>} */}

            {/* {(!isShowPOSScreen&&showRaiseRequirementBtn) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit" 
                >
                  Raise Requirement
                </Button>
              </>
            )} */}
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
            {/* change in Plan SubType Code End */}


                 {/* change in Premium SubType Code Start */}
        {selectedSubType==="changeinpremium"&&<>     
          {!isShowPOSScreen && (
            <>
              {/* <Row gutter={[16, 16]} className="reasons-list">
              <Col
                 xs={24}
                 sm={24}
                 md={8}
                 lg={8}
                 xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="View Existing Premium Details"
                  name="ViewExistingPremiumDetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing Premium Details"
                    checked={checkedList.includes(
                      "View Existing Premium Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing Premium Details")
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
                  label="Update New Premium Details"
                  name="UpdateNewPremiumDetails"
                >
                  <Checkbox
                    value="Update New Premium Details"
                    checked={checkedList.includes(
                      "Update New Premium Details"
                    )}
                    onChange={() =>
                      handleChange("Update New Premium Details")
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
                  label="Share Process Communication"
                  name="ShareProcessCommunication"
                >
                  <Checkbox
                    value="Share Process Communication"
                    checked={checkedList.includes(
                      "Share Process Communication"
                    )}
                    onChange={() =>
                      handleChange("Share Process Communication")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
            </Row> */}
            {/* {checkedList?.includes(
                      "View Existing Premium Details"
                    ) && (
                <>
                 {renderDetailsForm("Existing_Premium_Details")}
                </>
              )} */}
              {/* {checkedList?.includes(
                      "Update New Premium Details"
                    )&& (
                <> */}
                {renderDetailsForm("Update_Premium_Details")}
                {renderDetailsForm("Upload_Fields")}
                {/* </>
              )} */}
              {/* {checkedList?.includes(
                      "Share Process Communication"
                    )&&<>
                      {renderDetailsForm("Share_Process_Communication")}
                      {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
             </>} */}
            </>)}
            {isShowPOSScreen&&<>
              {renderDetailsForm("POS_Details")}
              </>}
              <div className="contact-details-btn">
            {/* {!showRaiseRequirementBtn&&<> */}
            {hideSubmitBtn && 
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            }
            {/* </>} */}


            {/* {(!isShowPOSScreen&&showRaiseRequirementBtn) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit" 
                >
                  Raise Requirement
                </Button>
              </>
            )} */}
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
            {/* change in Plan SubType Code End */}

              {/* change in Sum assured SubType Code Start */}
        {selectedSubType==="changeinsumassured"&&<>     
          {!isShowPOSScreen && (
            <>
              {/* <Row gutter={[16, 16]} className="reasons-list">
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="View Existing Sum Assured Details"
                  name="ViewExistingSumAssuredDetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing Sum Assured Details"
                    checked={checkedList.includes(
                      "View Existing Sum Assured Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing Sum Assured Details")
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
                  label="Update New Sum Assured Details"
                  name="UpdateNewSumAssuredDetails"
                >
                  <Checkbox
                    value="Update New Sum Assured Details"
                    checked={checkedList.includes(
                      "Update New Sum Assured Details"
                    )}
                    onChange={() =>
                      handleChange("Update New Sum Assured Details")
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
                  label="Share Process Communication"
                  name="ShareProcessCommunication"
                >
                  <Checkbox
                    value="Share Process Communication"
                    checked={checkedList.includes(
                      "Share Process Communication"
                    )}
                    onChange={() =>
                      handleChange("Share Process Communication")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
            </Row> */}
            {/* {checkedList?.includes(
                      "View Existing Sum Assured Details"
                    ) && (
                <>
                 {renderDetailsForm("Existing_SumAssured_Details")}
                </>
              )} */}
              {/* {checkedList?.includes(
                      "Update New Sum Assured Details"
                    )&& (
                <> */}
                {renderDetailsForm("Update_SumAssured_Details")}
                {renderDetailsForm("Upload_Fields")}
                {/* </>
              )} */}
              {/* {checkedList?.includes(
                      "Share Process Communication"
                    )&&<>
                      {renderDetailsForm("Share_Process_Communication")}
                      {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
             </>} */}
            </>)}
            {isShowPOSScreen&&<>
              {renderDetailsForm("POS_Details")}
              </>}
              <div className="contact-details-btn">
            {/* {!showRaiseRequirementBtn&&<> */}
            {hideSubmitBtn && 
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            }
            {/* </>} */}

            {/* {(!isShowPOSScreen&&showRaiseRequirementBtn) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit" 
                >
                  Raise Requirement
                </Button>
              </>
            )} */}
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
            {/* change in Sum Assured SubType Code End */}

           {/* change in DOB SubType Code Start */}
            {(selectedSubType==="changeindob"||selectedSubType==="changeindobnomineeappointee")&&<>     
          {!isShowPOSScreen && (
            <>
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
                  label="View Existing DOB Details"
                  name="ViewExistingDOBDetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing DOB Details"
                    checked={checkedList.includes(
                      "View Existing DOB Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing DOB Details")
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
                  label="Update New DOB Details"
                  name="UpdateNewDOBDetails"
                >
                  <Checkbox
                    value="Update New DOB Details"
                    checked={checkedList.includes(
                      "Update New DOB Details"
                    )}
                    onChange={() =>
                      handleChange("Update New DOB Details")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              {/* <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Share Process Details"
                  name="shareprocess"
                >
                  <Checkbox
                    value="Share Process Details"
                    checked={checkedList.includes(
                      "Share Process Details"
                    )}
                    onChange={() =>
                      handleChange("Share Process Details")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col> */}
            </Row>
            {checkedList?.includes(
                      "View Existing DOB Details"
                    ) && (
                <>
                 {renderDetailsForm("Existing_DOB_Details")}
                </>
              )}
              {checkedList?.includes(
                      "Update New DOB Details"
                    )&& (
                <>
                {renderDetailsForm("Update_DOB_Details")}
                {isShowDOBRequestForms&&<>
                {renderDetailsForm("RequestForm_Fields")}
                {showResonDelayField&&<>
                {renderDetailsForm("ReasonSubmission")}
              </>}
              </>}
                {renderDetailsForm("Comments")}
                </>
              )}
              {checkedList?.includes(
                      "Share Process Details"
                    ) && (
                <>
                {renderDetailsForm("Share_Process_Document")}
                {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          <DetailsForm
                data={ContractAlterationData[selectedSubType]?.Comments}
                subType={selectedSubType}
              ></DetailsForm>
                </>
              )}
              
            </>)}
            {isShowPOSScreen&&<>
              {renderDetailsForm("POS_Details")}
              </>}
              <div className="contact-details-btn">
            {/* {!showRaiseRequirementBtn&&<> */}
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            {/* </>} */}

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
           {/* change in DOB SubType Code End */}

               {/* change in Addition/Deletion Of Rider SubType Code Start */}
        {(selectedSubType==="additionofrider"||selectedSubType==="deletionofrider")&&<>     
            {renderDetailsForm(isShowPOSScreen? "POS_Details": "BOE_Details")}
            
          <div className="contact-details-btn">
            {/* {!showRaiseRequirementBtn&&<> */}
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            {/* </>} */}

            {/* {(!isShowPOSScreen&&showRaiseRequirementBtn) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit" 
                // onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )} */}
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
            {/* change Addition/Deletion Of Rider SubType Code End */}

              {/*Policy continuation SubType Code Start */}
        {selectedSubType==="policycontinuation"&&<>     
          {!isShowPOSScreen && (
            <>
                {renderDetailsForm("BOE_Details")}
            </>)}
            {isShowPOSScreen&&<>
              {renderDetailsForm("POS_Details")}
              </>}
              <div className="contact-details-btn">
            { hideSubmitBtn &&
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen 
                ? "Submit"
                : "Approve"}
            </Button>
 }
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
            ): <>
            <Button
              type="primary"
              className="primary-btn"
             onClick={() => getRaiseRequirements()}
            >
              Raise Requirement
            </Button>
          </>}
          </div>
          </>}  
            {/*Policy continuation SubType Code End */}
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

      <Modal
        title="List of Acceptable Proofs"
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
            {/* <tr>
              <td>1</td>
              <td>Copy of Aadhar Card - Masked</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Aadhar Card")}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {aadharUploadFiles.name}
              </td>
            </tr> */}
            <tr>
              <td>1</td>
              <td>Copy of Passport</td>
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
                        {passportUploadFiles.name}
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Copy of PAN Card</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={pancardUploadFiles}
                      onRemove={handleRemove}

                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of PAN Card")}
                    //onChange={(info) => handleFileUpload(info, index)} 
                  //  onChange={(props) => handleUpload(props)}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {pancardUploadFiles.name}
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
                    //onChange={(info) => handleFileUpload(info, index)} 
                  //  onChange={(props) => handleUpload(props)}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {rationCardUploadFiles.name}
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Copy of Driving License</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Driving License")}
                    //onChange={(info) => handleFileUpload(info, index)} 
                  //  onChange={(props) => handleUpload(props)}
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

      {isShowOTPModal &&<>
      <OTPModal customerData={customerData} isShowOTPModal={isShowOTPModal} setIsShowOTPModal={setIsShowOTPModal}
       sendOTPNumber={ClientEnquiry?.rmblphone} setDisableRequestForm={setDisableRequestForm} setValidateOTPSuccess={setValidateOTPSuccess}/>
      </>}
    </>
  );
};

export default ContractAlteration;
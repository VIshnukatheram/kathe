import React, { useEffect, useState } from "react";
import {useSelector } from "react-redux";

import { AssignmentData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import {
  Button,
  Form,
  Spin,
  message,
  Row,
  Col,
  Modal,
  Checkbox,
  Input,
  DatePicker,
  Select,
  Upload,
  Tooltip
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import dayjs from "dayjs";
import CloseIcon from "../../assets/images/close-icon.png";
import RaiseRequirementPopup from '../RaiseRequirementPopup';

const Assignment = (props) => {
  const loginInfo = useSelector((state) => state);
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const { selectedSubType, customerData, details,POSContactData,SelectedSubTypeVal,selectedCallType,selectedSubTypeId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const suffix = <img src={UploadIcon} alt="" />;
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [medicalTestsCompleteModal, setMedicalTestsCompleteModal] =useState(false);
  const [medicalTestsPendingModal,setMedicalTestsPendingModal] =useState(false);
  const [isPreferDate,setIsPreferDate] = useState(null);
  const [isSelectedDate, setIsSelectedDate] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [uploadFiles,setUploadFiles] = useState([]);
  const [showExistClientId,setShowExistClientId] = useState(false);
  const [isProcessLink,setIsProcessLink] = useState(''); 
const [isDocLink,setIsDocLink] = useState('');
const [existingNomineeData, setExistingNomineeData] = useState([]);
const [relationShipLU,setRelationShipLU] = useState([]);
const [isExistingAppointeeData,setIsExistingAppointeeData] = useState({});
const [posExistingNomineeData,setPosExistingNomineeData] = useState([]);
const [posUpdateNomineeData,setPosUpdateNomineeData] = useState([]);
const [isAllowNomineeUpdation,setIsAllowNomineeUpdation] = useState(false);
const [isShowNomineeSections,setIsShowNomineeSections] = useState(false);
const [isMinorDOB,setIsMinorDOB] = useState(false);
const [isDOBIndex,setIsDOBIndex] = useState(null);
const [totalShare, setTotalShare] = useState(0);
const [nomineeEnquiryData,setNomineeEnquiryData] = useState([]);
const [isPANStatus,setIsPANStatus] = useState(false);
const [addressProofModal, setAddressProofModal] = useState(false);
const [idProofModal, setIdProofModal] = useState(false);
const [showUploadFile, setShowUploadFile] = useState(null);
const [aadharUploadFiles,setAAdharUploadFiles] = useState([]);
const [passportUploadFiles,setPassportUploadFiles] = useState([]);
const [rationCardUploadFiles,setRationCardUploadFiles] = useState([]);
const [DrivingUploadFiles,setDrivingUploadFiles] = useState([]);
const [voterIDUploadFiles,setVoterIDUploadFiles] = useState([]);
const [jobCardFiles,setJobCardFiles] = useState([]);
const [PANCardUploadFiles,setPANCardUploadFiles] = useState([]);
const [uploadMultipleFiles,setUploadMultipleFiles] = useState([]);
const [isUploadMultipleFiles,setIsMultipleFiles] = useState([]);
const [isSelectUploadLabel,setIsSelectUploadLabel] = useState(null);
const [aadharIDUploadFiles,setAAdharIDUploadFiles] = useState([]);
const [passportIDUploadFiles,setPassportIDUploadFiles] = useState([]);
const [rationCardIDUploadFiles,setRationCardIDUploadFiles] = useState([]);
const [DrivingIDUploadFiles,setDrivingIDUploadFiles] = useState([]);
const [voterIDProofUploadFiles,setVoterIDProofUploadFiles] = useState([]);
const [jobCardIDProofFiles,setJobCardIDProofFiles] = useState([]);
const [updateNomineeData, setUpdateNomineeData] = useState([
  {id:1, NomineeName_New: "", NomineeDOB_New: null, RealtionshipWithPolicyowner_New: null, Share_New: 0, Role_New:"nominee",isMinor:false},
]);

  const absoluteAssignmentObj = {
    custRole:POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    AssignorName: "",
    AssigneeName: "",
    AssignmentCondition_New: "",
    AssigneeCKYCNumber: "",
    PolicyBondSubmitted:"",
    Comments: "",
    ValidateSignature:"",
    AssigneeDOB:"",
    AddressLine1:"",
    AddressLine2:"",
    AddressLine3:"",
    PINCode_Old:"",
    City_Old:"",
    State_Old:"",
    ExistingClient:"",
    PANNumber:'',
    NameinPAN: "",
  PANValidationStatus: "",
  NameMatch: "",
  };
  const posChangeinNomineeObj = {
    custRole:POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    Client_Id: null
  }


  
  const searchLocationn = (e) => {
    setIsLoading(true);

    let response = apiCalls.searchLocation(e);
    response
      .then((val) => {
        setIsLoading(false);
        if (val?.data) {
          form.setFieldsValue({
            City_Old:val?.data?.village?.city?.cityName,
            State_Old:val?.data?.village?.city?.district?.state?.name,
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


  useEffect(()=>{
    setCheckedList([]);
    handleEmpty();
    setIsShowNomineeSections(false);
    form.setFieldsValue({
        NominationChangeAllowed: details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned === 'Y' ? "Yes" : "No"
    })
    if(!details?.policyDetailsObj?.saDetails?.Assignment){
      setIsShowNomineeSections(true);
      setIsAllowNomineeUpdation(true);
    }
    else {
      setIsShowNomineeSections(true);
      setIsAllowNomineeUpdation(false);
    }
  },[selectedSubType]) // eslint-disable-next-line arrow-body-style

  useEffect(()=>{
    setCheckedList([]);
    getProcesLink();
    if(!isShowPOSScreen&&!customerData?.isPOS){
      form.setFieldsValue({
        PolicyOwnerName_Old: details?.policyDetailsObj?.identifiers?.po_Name,
        PolicyOwnerClientID_Old: details?.policyDetailsObj?.identifiers?.po_ClientID,
       })
    }
      if(POSContactData && customerData?.isPOS&&selectedSubType==="absoluteassignment"){
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          absoluteAssignmentObj[element.tagName] = element.tagValue
        });
        setIsShowPOSScreen(true);
        form.setFieldsValue({
          ExistingClient: absoluteAssignmentObj?.ExistingClient,
          custRole: absoluteAssignmentObj?.custRole,
          srvReqID: absoluteAssignmentObj?.srvReqRefNo,
          AssignorName: details?.policyDetailsObj?.identifiers?.po_Name,
          AssigneeName: absoluteAssignmentObj?.PolicyOwnerName_New,
          AssignmentCondition_New: absoluteAssignmentObj?.AssignmentCondition_New,
          AssigneeCKYCNo: absoluteAssignmentObj?.AssigneeCKYCNumber,
          PolicyBondSubmitted: absoluteAssignmentObj?.PolicyBondSubmitted,
          // Comments: absoluteAssignmentObj?.Comments,
          ValidateSignature:absoluteAssignmentObj?.ValidateSignature,
          CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
          BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
          ReasonForDelay: POSContactData?.reasonDelayed,
          RequestorComments:absoluteAssignmentObj?.Comments,
          AssigneeDOB:absoluteAssignmentObj?.AssigneeDOB?convertDate(absoluteAssignmentObj?.AssigneeDOB):absoluteAssignmentObj?.AssigneeDOB,
          AddressLine1:absoluteAssignmentObj?.AddressLine1,
          AddressLine2:absoluteAssignmentObj?.AddressLine2,
          AddressLine3:absoluteAssignmentObj?.AddressLine3,
          PINCode_Old:absoluteAssignmentObj?.PINCode_Old,
          City_Old:absoluteAssignmentObj?.City_Old,
          State_Old:absoluteAssignmentObj?.State_Old,
          PANNumber: absoluteAssignmentObj?.PANNumber,
          NameinPANN: absoluteAssignmentObj?.NameinPAN,
          PANValidationStatus: absoluteAssignmentObj?.PANValidationStatus,
          NameMatch: absoluteAssignmentObj?.NameMatch,

        });
        AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
          if(absoluteAssignmentObj?.ExistingClient === 'no'){
            if(element?.name === 'AssigneeDOB' || element?.name === 'AddressLine1'||  element?.name === 'AddressLine2' || element?.name === 'AddressLine3'||
              element?.name === 'PINCode_Old' || element?.name === 'City_Old' || element?.name === 'State_Old' ){
                element.hide= false;
            }
          }else{
            if(element?.name === 'AssigneeDOB' || element?.name === 'AddressLine1'||  element?.name === 'AddressLine2' || element?.name === 'AddressLine3'||
            element?.name === 'PINCode_Old' || element?.name === 'City_Old' || element?.name === 'State_Old' ){
              element.hide= true;
          }
          }
          if(element?.label?.includes("Reason For Delayed Submission")&& POSContactData?.reasonDelayed){
            element.hide= false;
           
          }
        });
        setShowReasonDelayField(true);
      }
      if (POSContactData && customerData?.isPOS&&selectedSubType==="reassignment") {
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          posChangeinNomineeObj[element.tagName] = element.tagValue
        });
        setIsShowPOSScreen(true);
        // Filter new data
    const oldData = POSContactData?.serviceRequestTransectionData?.filter(item => item.status === 'Create' && item.tagName?.includes('Old'));
      // Consolidate data into an array of objects
      const consolidatedData = oldData.reduce((acc, item) => {
        const match = item.tagName?.match(/_(Old_\d+)$/);
        if (match) {
          const index = match[1]; // Extract the dynamic index (e.g., New_1, New_2)
          const fieldName = item.tagName.replace(`_${index}`, '');
          const currentIndex = acc.findIndex((el) => el.index === index);
          
          if (currentIndex === -1) {
            // If the index doesn't exist in the accumulator, create a new object
            acc.push({ index, [fieldName]: item.tagValue });
          } else {
            // If the index exists, update the existing object
            acc[currentIndex][fieldName] = item.tagValue;
          }
        }
        return acc;
      }, []);
       setPosExistingNomineeData(consolidatedData);
  
    const newData = POSContactData?.serviceRequestTransectionData?.filter(item => item.status === 'Create' && item.tagName?.includes('New'));
      // Consolidate data into an array of objects
      const consolidatedNewData = newData.reduce((acc, item) => {
        const match = item.tagName?.match(/_(New_\d+)$/);
        if (match) {
          const index = match[1]; // Extract the dynamic index (e.g., New_1, New_2)
          const fieldName = item.tagName.replace(`_${index}`, '');
          const currentIndex = acc.findIndex((el) => el.index === index);
          
          if (currentIndex === -1) {
            // If the index doesn't exist in the accumulator, create a new object
            acc.push({ index, [fieldName]: item.tagValue });
          } else {
            // If the index exists, update the existing object
            acc[currentIndex][fieldName] = item.tagValue;
          }
        }
        return acc;
      }, []);
      getRelationsData(null,null,consolidatedNewData,posChangeinNomineeObj?.Client_Id); //for relationship owner full name  bind purpose
     // setPosUpdateNomineeData(consolidatedNewData);  //for relationship owner full name  bind purpose
      }
 
  },[]); // eslint-disable-next-line arrow-body-style

  const handleChange = (value) => {
    handleEmpty();
    // If the checkbox is already checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
      if(value?.includes("View Existing Assignment Details")||value?.includes("Initiate Re-Assignment")||
      value?.includes("View Existing Appointee")||value?.includes("Update New Appointee")){
        getNomineeEnquiry(value);
        if(value?.includes("Initiate Re-Assignment")||value?.includes("Update New Appointee")){
          getRelationsData(null,value,null,props?.details?.policyDetailsObj?.identifiers?.po_ClientID)
        }
      }
    }
  };

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

  const handleEmpty =() =>{
    setShowRaiseRequirementBtn(false);
    setShowPhoneNumber(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
    setShowEmailFields(false);
  }

  const handleDropdownChange=(e,item)=>{
    if(item?.name==="AssignmentCondition_New" && (e === 'loan'|| e === 'financialinstitute')){
      AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
        if(element?.name ==="UploadLoanSanctionLetter"){
          element.hide= false
        }
      })
    }
     if(item?.name==="AssignmentCondition_New" && (e === 'loveaffection')){
      AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
        if(element?.name ==="UploadLoanSanctionLetter"){
          element.hide= true
        }
      })
    }

    if(e === "no"&&item?.label?.includes("Existing Client")){
      AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
        if(element?.label === "Enter Client ID"){
          element.hide= true;
         
        }
        if(element?.name ==="ProposerDOB" || element?.name ==="AddressLine1" || element?.name ==="AddressLine2" ||
        element?.name ==="AddressLine3"  ||
        element?.name ==="PINCode_Old" || element?.name === "City_Old" ||  element?.name === "State_Old"  ){
          element.hide= false;
        }
      });
      //setShowExistClientId(false);
    }else if(e === "yes"&&item?.label?.includes("Existing Client")){
      AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
        if(element?.label === "Enter Client ID"){
          element.hide= false;
        }
        if(element?.name ==="ProposerDOB" || element?.name ==="AddressLine1" || element?.name ==="AddressLine2" ||
        element?.name ==="AddressLine3"  ||
        element?.name ==="PINCode_Old" || element?.name === "City_Old" ||  element?.name === "State_Old"  ){
          element.hide= true;
        }
       
      });
      //setShowExistClientId(true);
    }

    setShowExistClientId(!showExistClientId);
  }
  const handleLinkValue  =(item)=>{
    setIsMultipleFiles([]);
    setIsSelectUploadLabel(item?.label);
    if(item?.label?.includes("Upload ID Proof")){
      setIdProofModal(true);
    }
    else if(item?.label?.includes("Upload Address Proof")){
      setAddressProofModal(true);
    }
   }

  const handleUploadLink = () => {
    setAddressProofModal(true);
  };
  const handleAddressModalClose=()=>{
    setUploadFiles([]);
    setAddressProofModal(false)
    setIdProofModal(false);
  }

  const handleRadioChange = (e,item) => {
    // if(e.target.value === "no"&&item?.label?.includes("Validate Signature")){
    //   setShowRaiseRequirementBtn(true);
    // }else if(e.target.value === "yes"&&item?.label?.includes("Validate Signature")){
    //   setShowRaiseRequirementBtn(false);
    // }
    }
    const handleTextLink=(item)=>{
      if(item?.label?.includes("Upload Address Proof")){
        setAddressProofModal(true);
      }
      else if(item?.label?.includes("Upload ID Proof")){
        setIdProofModal(true);
      }
       if(item?.linkValue?.toLowerCase() === "view"){
        const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
        window.open(url, '_blank');
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
    if (item === "branchreceiveddate" || item?.name === "branchreceiveddate") {
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
          branchreceiveddate: "",
         
        })
      return;
      }

      else {
        AssignmentData[selectedSubType]?.Checklist?.forEach(element => {
        if(element?.label?.includes("Reason For Delayed Submission")&&selectDate < todayDate){
          element.hide= false;
          setShowReasonDelayField(true);
        }
        else if(element?.label?.includes("Reason For Delayed Submission")&&selectDate >= todayDate){
          element.hide= true;
          setShowReasonDelayField(false);
        }
      });



  //   if (item === "branchreceiveddate") {
  //     setShowReasonDelayField(false);
  //     let newDate = new Date();
  //     let todayDate = moment(newDate).format("DD/MM/YYYY");
  //     let selectDate = moment(date + 1).format("DD/MM/YYYY");
  //     // if (selectDate < todayDate) {
  //     //   setShowReasonDelayField(true);
  //     // }
  //     AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
  //       if(element?.label?.includes("Reason For Delayed Submission")&&selectDate < todayDate){
  //         element.hide= false;
  //         setShowReasonDelayField(true);
  //       }
  //       else if(element?.label?.includes("Reason For Delayed Submission")&&selectDate >= todayDate){
  //         element.hide= true;
  //         setShowReasonDelayField(false);
  //       }
  //   })
  // };
}
    }
  }
  const disabledTime = (now,item) => {
    const currentHour = now.hour();
    const currentMinute = now.minute();
    const currentSecond = now.second();
    let newDate = new Date();
      let todayDate = moment(newDate).format("DD/MM/YYYY");
    // Example: Disable hours before the current hour
    const disabledHours = () => {
      const hours = [];
      if(isPreferDate === todayDate){
        for (let i = 0; i < currentHour; i++) {
          hours.push(i);
        }
      }
      else if(item?.featureTime&&isSelectedDate>=todayDate) {
        for (let i = currentHour + 1; i < 24; i++) {
          hours.push(i);
        }
      }
     
      return hours;
    };

    // Example: Disable minutes before the current minute for the current hour
    const disabledMinutes = (selectedHour) => {
      if (selectedHour === currentHour) {
        const minutes = [];
        if(isPreferDate === todayDate){
        for (let i = 0; i < currentMinute; i++) {
          minutes.push(i);
        }
      }
      else if(item?.featureTime&&isSelectedDate>=todayDate) {
        for (let i = currentMinute + 1; i < 60; i++) {
          minutes.push(i);
        }
      }
        return minutes;
      }
      return [];
    };

    // Example: Disable seconds for the current hour and minute
    const disabledSeconds = (selectedHour, selectedMinute) => {
      if (selectedHour === currentHour && selectedMinute === currentMinute) {
        const seconds = [];
        if(isPreferDate === todayDate){
        for (let i = 0; i < currentSecond; i++) {
          seconds.push(i);
        }
      }
      else if(item?.featureTime&&isSelectedDate>=todayDate) {
        for (let i = currentSecond + 1; i < 60; i++) {
          seconds.push(i);
        }
      }
        return seconds;
      }
      return [];
    };

    return {
      disabledHours,
      disabledMinutes,
      disabledSeconds,
    };
  }

  const CKYCC = ()=>{
    
    let values = form.getFieldsValue();
    setIsLoading(true);
    let response = apiCalls.CKYC(values?.AssigneeCKYCNumber);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorcode!=="1") {
          const res = val?.data?.responseBody;
            form.setFieldsValue({
              CKYCResult: res?.description,
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

  const getCheckPANdetails = ()=>{
    let values = form.getFieldsValue();
    setIsLoading(true);
    setIsPANStatus(false);
    //CKYCNumber
    let response = apiCalls.getCheckPANdetails(values?.PANNumber);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorcode!=="1") {
          const res = val?.data?.responseBody;
            form.setFieldsValue({
              PANValidationStatus: res?.description,
              NameinPAN: res?.firstName + ' ' + res?.middleName +  ' ' + res?.lastName,
            })
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsPANStatus(true);
          form.setFieldsValue({
            PANValidationStatus: val?.data?.responseBody?.errormessage
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
    
    if(item.name ==="PINCode_Old"){
      form.setFieldsValue({
        City_Old:'',
        State_Old:'',
      })
     }
   
      

    if(item.name ==="PINCode_Old" && value && value.length ===6){
      searchLocationn(value)
    }

    const obj = form.getFieldsValue(value)
    if(item.name === "PANNumber" && value.length ===10){
      getCheckPANdetails()
    }
    if(item.name === "AssigneeCKYCNumber"&& value.length ===14){
      CKYCC()
    }
  }

      //commonly render all forms
      const renderDetailsForm = (formType) => {
        return (
          <DetailsForm
            data={AssignmentData[selectedSubType]?.[formType]}
            subType={selectedSubType}
             suffix={!isShowPOSScreen && suffix}
            form={form}
            handleRadioChange={handleRadioChange}
            handleDateChange={handleDateChange}
            handleDropdownChange={handleDropdownChange}
            toggleInputField={toggleInputField}
            activeEmailIcons={activeEmailIcons}
            activeMobileIcons={activeMobileIcons}
            activeWhatsAppIcons={activeWhatsAppIcons}
            handleTextLink ={handleTextLink }
            disabledTime={disabledTime}
            disabledDate={disabledDate}
            onBlurInput ={onBlurInput }
            getUploadFiles ={getUploadFiles }
            handleLinkValue ={handleLinkValue}
            handleUploadLink={handleUploadLink}
          ></DetailsForm>
        );
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

 
      const convertDate = (inputDate) => {
        if(inputDate){
          const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
          return formattedDate;
        }else{
          return ''
        }
     
      };
      const disabledDate = (current) => {
        return current && current > dayjs().endOf("day"); // Can not select days before today and today
      };

      const handleRemove = (file) => { 
        let updatedFiles = isUploadMultipleFiles?.filter((ele)=>{
                   return ele?.labelName !== file.labelName
        });
        setIsMultipleFiles(updatedFiles)
        if(isSelectUploadLabel==="Upload ID Proof"){
          if(file?.labelName === "Copy of Aadhar Card"){
            setAAdharIDUploadFiles([]);
          }else if(file?.labelName === "Copy of Passport"){
            setPassportIDUploadFiles([]);
          }else if(file?.labelName === "PAN Card"){
            setPANCardUploadFiles([]);
          }else if(file?.labelName === "Copy of Driving License"){
            setDrivingIDUploadFiles([]);
          }else if(file?.labelName === "Copy of Voter ID"){
            setVoterIDProofUploadFiles([]);
          }else if(file?.labelName === "Job Card Issued by NREGA"){
            setJobCardIDProofFiles([]);
          }
          form.setFieldsValue({
            UploadIDProof: `Documents Uploaded -  ${updatedFiles?.length }`,
          })
        }
        else {
          if(file?.labelName === "Copy of Aadhar Card"){
            setAAdharUploadFiles([]);
          }else if(file?.labelName === "Copy of Passport"){
            setPassportUploadFiles([]);
          }else if(file?.labelName === "Utility Bill which is not more than 2 months"){
            setRationCardUploadFiles([]);
          }else if(file?.labelName === "Copy of Driving License"){
            setDrivingUploadFiles([]);
          }else if(file?.labelName === "Copy of Voter ID"){
            setVoterIDUploadFiles([]);
          }else if(file?.labelName === "Job Card Issued by NREGA"){
            setJobCardFiles([]);
          }
          form.setFieldsValue({
            addressProof: `Documents Uploaded -  ${updatedFiles?.length }`,
          })
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
    
      const getMultpleUploadFiles=(listOfUploadFiles,label)=>{
        
        const updatedUploadList = listOfUploadFiles?.map((obj) => {
          // Create a new object without the propertyToDelete property
          const { labelName, ...newObject } = obj;
          return newObject;
        });
        // Update the state with the new list
        setUploadMultipleFiles(updatedUploadList);
        if(listOfUploadFiles?.length >0 ){
          if(isSelectUploadLabel==="Upload ID Proof"){
            form.setFieldsValue({
              UploadIDProof: `Documents Uploaded -  ${listOfUploadFiles?.length }`,
            })
          }
          else {
            form.setFieldsValue({
              addressProof: `Documents Uploaded -  ${listOfUploadFiles?.length }`,
            })
          }
        }
     
      }
      const handleOk = () => {
        if(aadharUploadFiles?.length===0&&passportUploadFiles?.length===0&&rationCardUploadFiles?.length===0&&DrivingUploadFiles?.length===0&&
          PANCardUploadFiles?.length===0&&voterIDProofUploadFiles?.length===0&&jobCardIDProofFiles?.length===0&&
          aadharIDUploadFiles?.length===0&&passportIDUploadFiles?.length===0&&DrivingIDUploadFiles?.length===0){
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
        setIdProofModal(false);
        }
      };
      
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
                "IndexName": "Address Proof",
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
                const existingFileIndex = isUploadMultipleFiles?.findIndex(
                  (file) => file.labelName === newDocumentObj?.labelName
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
              
              if(isSelectUploadLabel==="Upload Address Proof"){
              //setUploadFiles(file);
              if(label?.includes("Copy of Aadhar Card")){
                setAAdharUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("Copy of Passport")){
                setPassportUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("Utility Bill which is not more than 2 months")){
                setRationCardUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("Copy of Driving License")){
                setDrivingUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("Copy of Voter ID")){
                setVoterIDUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("Job Card Issued by NREGA")){
                setJobCardFiles([{...newDocumentObj}]);
              }
            }
            if(isSelectUploadLabel==="Upload ID Proof"){
              if(label?.includes("Copy of Aadhar Card")){
                setAAdharIDUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("Copy of Passport")){
                setPassportIDUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("PAN Card")){
                setPANCardUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("Copy of Driving License")){
                setDrivingIDUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("Copy of Voter ID")){
                setVoterIDProofUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("Job Card Issued by NREGA")){
                setJobCardIDProofFiles([{...newDocumentObj}]);
              }
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

      const getTransactionData = (values) => {
        if (selectedSubType === "absoluteassignment") {
          return [
            { Status: "Create", TagName: "PolicyOwnerName_Old", TagValue: values.PolicyOwnerName_Old ||details?.policyDetailsObj?.identifiers?.po_Name },
            { Status: "Create", TagName: "PolicyOwnerClientID_Old", TagValue: values.PolicyOwnerClientID_Old || details?.policyDetailsObj?.identifiers?.po_ClientID},
            { Status: "Create", TagName: "AssignmentCondition_Old", TagValue: values.AssignmentCondition_Old ||""},
            { Status: "Create", TagName: "PolicyOwnerName_New", TagValue: values.PolicyOwnerName_New || "" },
            { Status: "Create", TagName: "Clientdob", TagValue: convertDate(customerData?.dob) || "" },
            { Status: "Create", TagName: "ExistingClient", TagValue: values.ExistingClient || "" },

            { Status: "Create", TagName: "AssigneeDOB", TagValue: convertDate(new Date(values.AssigneeDOB)) || "" },  
            { Status: "Create", TagName: "AddressLine1", TagValue: values.AddressLine1 || ""},
            { Status: "Create", TagName: "AddressLine2", TagValue: values.AddressLine2 || ""},
            { Status: "Create", TagName: "AddressLine3", TagValue: values.AddressLine3 || ""},
            { Status: "Create", TagName: "PINCode_Old", TagValue: values.PINCode_Old|| "" },
            { Status: "Create", TagName: "City_Old", TagValue: values.City_Old || "" },
            { Status: "Create", TagName: "State_Old", TagValue: values.State_Old || "" },


            { Status: "Create", TagName: "PolicyOwnerClientID_New", TagValue: values.PolicyOwnerClientID_New || "" },
            { Status: "Create", TagName: "AssignmentCondition_New", TagValue: values.AssignmentCondition_New || ""},
            { Status: "Create", TagName: "PANNumber", TagValue: values.PANNumber || ""},
            { Status: "Create", TagName: "PANValidationStatus", TagValue: values.PANValidationStatus || ""},
            { Status: "Create", TagName: "NameMatch", TagValue: values.NameMatch || ""},
            { Status: "Create", TagName: "s", TagValue: values.NameinPAN || ""},
            { Status: "Create", TagName: "AssigneeCKYCNumber", TagValue: values.AssigneeCKYCNumber|| "" },
            { Status: "Create", TagName: "CKYCResult", TagValue: values.CKYCResult || "" },
            { Status: "Create", TagName: "PolicyBondSubmitted", TagValue: values.PolicyBondSubmitted || ""},
            { Status: "Create", TagName: "ValidateSignature", TagValue: values.ValidateSignature|| "" },
            { Status: "Create", TagName: "Comments", TagValue: values.Comments|| "" },
            {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
            {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"},
            { Status: "Create", TagName: "DocLink", TagValue:isProcessLink },
            { Status: "Create", TagName: "ProcessLink", TagValue: isDocLink},
          ];
        }
        if (selectedSubType === "reassignment") {
          let newArray =
          [
            { Status: "Create", TagName: "AssigneeName", TagValue: values.AssigneeName || "" },
            { Status: "Create", TagName: "AssignmentCondition_New", TagValue: values.AssignmentCondition_New || "" },
            { Status: "Create", TagName: "PolicyOwnerClientID_Old", TagValue: values.PolicyOwnerClientID_Old || "" },
            { Status: "Create", TagName: "PastOwnerName", TagValue: values.PastOwnerName || "" },
            { Status: "Create", TagName: "PastOwnerClientID", TagValue: values.PastOwnerClientID || "" },
            { Status: "Create", TagName: "PANNumber", TagValue: values.PANNumber || "" },
            { Status: "Create", TagName: "CKYCNunber", TagValue: values.CKYCNunber || "" },
            { Status: "Create", TagName: "ValidateSignature", TagValue: values.ValidateSignature || ""},
            { Status: "Create", TagName: "Comments", TagValue: values.Comments || ""},
            {Status: "Create",TagName: "Client_Id","TagValue":  values.GSTINToBeUpdateFor === "1" ? customerData?.laClientID: customerData?.poClientID}
          ];
          let ExistingDataList = [];
          if(existingNomineeData?.length>0){
            const oldProperties = [
              "NomineeName_Old",
              "NomineeDOB_Old",
              "Share_Old",
              "RealtionshipWithPolicyowner_Old",
              "Role_Old"
            ];
            // Iterate over each record in the updateNomineeData array
            existingNomineeData?.forEach((record, recordIndex) => {
              // Iterate over properties and create objects for each record
              oldProperties.forEach((property, propertyIndex) => {
                if (record[property]) {
                  let obj = {
                    Status: "Create",
                    TagName: `${property}_${recordIndex + 1}`,
                    TagValue: record[property]
                  };
            
                  ExistingDataList.push(obj);
                }
              });
            });
          }
          const properties = [
            "NomineeName_New",
            "NomineeDOB_New",
            "Share_New",
            "RealtionshipWithPolicyowner_New",
            "Role_New"
          ];
          
          // Initialize an array to store the updated data
          let updatedDataList = [];
          
          // Iterate over each record in the updateNomineeData array
          updateNomineeData?.forEach((record, recordIndex) => {
            // Iterate over properties and create objects for each record
            properties.forEach((property, propertyIndex) => {
              if (record[property]) {
                let obj = {
                  Status: "Create",
                  TagName: `${property}_${recordIndex + 1}`,
                  TagValue: property?.includes("NomineeDOB_New") ? moment(record[property] + 1).format("DD/MM/YYYY") : record[property]
                };
          
                updatedDataList.push(obj);
              }
            });
          });
          // Use the spread operator to concatenate the newArray to the updatedDataList
          updatedDataList = [...updatedDataList, ...ExistingDataList,...newArray];
          // Now updatedDataList contains separate objects for each property in each record
          return updatedDataList;
          
          
        }
      };

      const handleSubmit = (values) => {
        if(checkedList?.includes("Share Process Communication")&&!isShowPOSScreen&&!showEmailFields){
          message.destroy();
          message.error({
            content:
              "Please select atleast one communication.",
            className: "custom-msg",
            duration: 2,
          });
         }
       else {
         //POSApprove RaiseRequirement
         if (POSContactData && customerData?.isPOS) {
          POSActionsOnContactDetails(null, "APPROVED");
    } else {
      // if (values.ValidateSignature === "no") {
      //   getRaiseRequirements();
      // } else {
        saveRequest(values);
      //}
    }
       }
      }

  const saveRequest =(values)=>{
    setIsLoading(true);
    setShowAlert(false);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values.requestchannel, // Required
      Category: checkedList?.includes("View Existing Assignment Details")
      ? 1
       : (checkedList?.includes("Update New Assignment Details") ||  checkedList?.includes("Initiate Re-Assignment"))
       ? 2 : 3,
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
      ReasonForChange: "",
      RequestDateTime:values?.branchreceiveddate
      ? new Date(values?.branchreceiveddate)
      : new Date(),
      ReasonDelayed: values.ReasonForDelay || values.resonfordelay,
      CustSignDateTime: values?.customersigningdate
        ? new Date(values?.customersigningdate)
        : new Date(),
        TransactionData: getTransactionData(values) || [],
        Uploads: uploadFiles,
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

    // if(values.Validate_Signature === 'no'){
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
    setIsLoading(true);
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
      TransactionPayload: [],
    };
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
        setIsLoading(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false);
      });
  };

  const getRelationsData = async (val,checkItem,consolidatedNewData,clientNumber) => {
    setIsLoading(true);
    try {
      const response = await apiCalls.getRelationsData(val?.bnysel||clientNumber);
      if (response?.data) {
        const res = response?.data;
        if(checkItem?.includes("Initiate Re-Assignment")){
          let transformedData = res?.map((item) => ({
           ...item,
           label: item.longdesc,
           value: item.descitem
         }));
         setRelationShipLU(transformedData);
         }
        if (checkItem?.includes("View Existing Assignment Details")||
        checkItem?.includes("Initiate Re-Assignment")||checkItem?.includes("Update New Appointee")) {
          let matchingItem = res?.find((item) => item?.descitem === val?.bnyrln);
          let relationValue = matchingItem ? matchingItem.longdesc : null;
          return relationValue;
        }
       else if (
          consolidatedNewData?.length > 0 &&
          selectedSubType === "reassignment"
        ) {
          // Create a copy of the consolidatedNewData array
          const updatedData = [...consolidatedNewData];
        
          consolidatedNewData?.forEach((relatns, index) => {
            // Find the matching item in the res array based on descitem
            const matchingItem = res?.find((item) => item?.descitem === relatns?.RealtionshipWithPolicyowner);
        
            // Update RealtionshipWithPolicyowner field if a matching item is found
            if (matchingItem) {
              updatedData[index].RealtionshipWithPolicyowner = matchingItem.longdesc;
            }
          });
        
          // Set the updated data in the state
          setPosUpdateNomineeData(updatedData);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  
  const getNomineeEnquiry = async (checkItem) => {
    setIsLoading(true);
    try {
      const response = await apiCalls.getNomineeEnquiry(customerData?.policyNo);
      
      if (response?.data?.responseBody?.errorcode==0) {
        const res = response?.data?.responseBody;
        const nomineeArray = [];
  
        if (res?.nomineeEnquiry?.length > 0) {
          for (const val of res?.nomineeEnquiry) {
            if (val) {
              const dob = await getClientEnquiry(val.bnysel);
              const relationShip = await getRelationsData(val,checkItem);
              if(selectedSubType==="reassignment"){
                const nomineeObj = {
                  NomineeName_Old: val.clientName ? val.clientName?.trim() : val.clientName,
                  NomineeDOB_Old: dob,
                  RealtionshipWithPolicyowner_Old: relationShip,
                  Share_Old: val?.bnypc,
                  Role_Old: val?.bnyrln === "AP" ? "Appointee" : "Nominee"
                };
                nomineeArray.push(nomineeObj);
              }
            }
          }
          setExistingNomineeData(nomineeArray);
        }
  
        setNomineeEnquiryData(response?.data?.responseBody);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  
  const getClientEnquiry = async (clientNo) => {
    let obj ={
      clientNumber: clientNo
    }
    try {
      const response = await apiCalls.getClientEnquiry(obj);
      if (response?.data) {
        const res = response?.data?.responseBody;
        return res?.clTdob ? convertDate(res.clTdob) : res?.clTdob;
      } else {
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (error) {
      // Handle error
    }
  };


  const handleNomineeNameChange = (index, value) => {
    
    const updatedData = [...updateNomineeData];
    updatedData[index].NomineeName_New = value;
    setUpdateNomineeData(updatedData);
  };
  const handleRelationshipChange = (index, value) => {
    
    const updatedData = [...updateNomineeData];
    updatedData[index].RealtionshipWithPolicyowner_New = value;
    setUpdateNomineeData(updatedData);
  };
  const handleRoleChange = (index, value,row) => {
    
    const updatedData = [...updateNomineeData];
    updatedData[index].Role_New = value;
    if(value === "appointee"){
      updatedData[index].Share_New = 0;
      form.setFieldsValue({
        updateNomineeData: {
          [row.id]: {
            Share_New: 0,
          },
        },
      });
  
      const newTotalShare = updatedData.reduce((sum, nominee) =>
      sum + parseFloat(nominee.Share_New) || 0, 0);
     setTotalShare(newTotalShare);
    }
    // else if(value==="nominee"&&isMinorDOB){
    //   message.error({
    //     content:
    //       "Please Select Appointee only",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }
    // else if(value === "appointee"&&!isMinorDOB){
    //   message.error({
    //     content:
    //       "Please Select Nominee only",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }
    setUpdateNomineeData(updatedData);
  };
  const handleShareChange = (index, newShare) => {
    
    const updatedNomineeData = [...updateNomineeData];
    updatedNomineeData[index].Share_New = newShare;
    
    // Recalculate the total share
    const newTotalShare = updatedNomineeData.reduce((sum, nominee) =>
     sum + parseFloat(nominee.Share_New) || 0, 0);
    setTotalShare(newTotalShare);

    // Update the state
    setUpdateNomineeData(updatedNomineeData);
  };

  const handleDobChange = (newDob,index) => {
    
    const updatedNomineeData = [...updateNomineeData];
    updatedNomineeData[index].NomineeDOB_New = newDob;
    // if(index!==0){
    //   isMinor(updatedNomineeData[index].NomineeDOB_New,updatedNomineeData)
    // }else{
      //setUpdateNomineeData(updatedNomineeData);
    //}

    updatedNomineeData[index].NomineeDOB_New && isMinor(updatedNomineeData,index)
  };

  const isMinor = (nomineeData,index) => {
    const currentDate = new Date();
    const birthDate = new Date(nomineeData[index].NomineeDOB_New);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if(age < 18 || (age === 18 && monthDiff < 0&&isDOBIndex!==index)){
      nomineeData[index].isMinor= true;
      setIsMinorDOB(true);
      setIsDOBIndex(index);
      // message.warning({
      //   content:
      //     "Please select DOB is before 18 years",
      //   className: "custom-msg",
      //   duration: 2,
      // });
    }
    else if(age > 18&&isDOBIndex===index){
      nomineeData[index].isMinor= false;
      setIsMinorDOB(false);
      setIsDOBIndex(null);
    }
    setUpdateNomineeData(nomineeData);
    // else{
    //   setUpdateNomineeData(data);
    // }

   // return age < 18 || (age === 18 && monthDiff < 0);
  };


  const handleAddRow = () => {
    
    // Check if the total share is less than 100 before adding a new row
    if (totalShare < 100||isMinorDOB) {
      const newId = updateNomineeData.length + 1;
      const newRow = { id: newId, NomineeName_New: "", NomineeDOB_New: "", RealtionshipWithPolicyowner_New: null, Share_New: null, Role_New: null,isMinor: false };
  
      // Update the state with the new row
      setUpdateNomineeData([...updateNomineeData, newRow]);
    } else {
      // Display an alert or handle the case where total share is already 100
      message.warning({
        content:
          "Total Share fullfilled. Can't add new nominee.",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const handleDeleteRow = (id, index) => {
    ;
    if (updateNomineeData.length > 1) {
      form.setFieldsValue({
        updateNomineeData: {
          [id]: {
            NomineeName_New: "",
            NomineeDOB_New: "",
            RealtionshipWithPolicyowner_New: null,
            Share_New: 0,
            Role_New: null,
            isMinor: false
          },
        },
      });
      const updatedupdateNomineeData = updateNomineeData.filter((row) => row.id !== id);
      const newTotalShare = updatedupdateNomineeData.reduce((sum, nominee) =>
        sum + parseFloat(nominee.Share_New) || 0, 0);
  
      setTotalShare(newTotalShare);
      setUpdateNomineeData(updatedupdateNomineeData);
    // Reset the form instance to reflect the changes
    form.resetFields([`updateNomineeData[${index}].NomineeName_New`, `updateNomineeData[${index}].NomineeDOB_New`, `updateNomineeData[${index}].RealtionshipWithPolicyowner_New`, `updateNomineeData[${index}].Share_New`, `updateNomineeData[${index}].Role_New`]);
    
    }
  };
  const popupClose=()=>{
    setRaiseRequirementOpen(false)
  }
 
  return (
    <>
      <Spin spinning={isLoading}>
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
            {/* Absolute Assignment SubType Code Start */}
            {selectedSubType==="absoluteassignment"&&<>
             {!isShowPOSScreen&&<>
                <Row gutter={[16, 16]} className="reasons-list">
                  {
                    details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned === 'Y' &&
                 
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="View Existing Assignment Details"
                  name="ViewExistingAssignmentDetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing Assignment Details"
                    checked={checkedList.includes(
                      "View Existing Assignment Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing Assignment Details")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              }
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Update New Assignment Details"
                  name="UpdateNewAssignmentDetails"
                >
                  <Checkbox
                    value="Update New Assignment Details"
                    checked={checkedList.includes(
                      "Update New Assignment Details"
                    )}
                    onChange={() =>
                      handleChange("Update New Assignment Details")
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
            {checkedList?.includes(
                      "View Existing Assignment Details"
                    )&&<>
                      {renderDetailsForm("Existing_Details")}
             </>}
             {checkedList?.includes(
                      "Update New Assignment Details"
                    )&&<>
                     {renderDetailsForm("Update_Details")}
                     {showResonDelayField&&<>
                {renderDetailsForm("ReasonSubmission")}
              </>}
              {renderDetailsForm("Comments")}
             </>}
             {checkedList?.includes(
                      "Share Process Communication"
                    )&&<>
                      {renderDetailsForm("Send_Medical_Reports")}
                      {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          </>}
             </>}
             {isShowPOSScreen&&<>
                {renderDetailsForm("POS_Details")}
                {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
             </>}
             <div className="contact-details-btn">
              {/* {checkedList?.includes("Update New Assignment Details")&&!isShowPOSScreen&&<>
             <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                >
                 Validate PAN
                </Button>{" "}
                </>} */}
                {(checkedList?.length>0 || isShowPOSScreen) &&<>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                  disabled={isPANStatus&&!isShowPOSScreen}
                >
                  {isShowPOSScreen?"Approve":"Submit"}
                </Button>
                </>}
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
            {/*  {(isShowPOSScreen) && ( */}
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                 onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
           {/* )} */}
              </div>
            </>}
             {/* Absolute Assignment SubType Code End */}


              {/*Re Assignment SubType Code Start */}
            {selectedSubType==="reassignment"&& (
            <>
            {!isShowPOSScreen&& <>
            
           {isShowNomineeSections&&<>
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
                  label="View Existing Assignment Details"
                  name="viewExistingloandetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing Assignment Details"
                    checked={checkedList.includes(
                      "View Existing Assignment Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing Assignment Details")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              {isAllowNomineeUpdation&&<>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xxl={12}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Initiate Re-Assignment"
                  name="vieweligibleloan"
                >
                  <Checkbox
                    value="Initiate Re-Assignment"
                    checked={checkedList.includes(
                      "Initiate Re-Assignment"
                    )}
                    onChange={() =>
                      handleChange("Initiate Re-Assignment")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              </>}
              {/* <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Share Nominee Change Process"
                  name="shareprocess"
                >
                  <Checkbox
                    value="Share Nominee Change Process"
                    checked={checkedList.includes(
                      "Share Nominee Change Process"
                    )}
                    onChange={() =>
                      handleChange("Share Nominee Change Process")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col> */}
            </Row>
            </>}
             </>}
              {(checkedList?.includes(
                      "View Existing Assignment Details"
                    )||isShowPOSScreen) && (
                <>
                    {renderDetailsForm("Existing_Details")}
                
                   {/* <div className="mb-16">
                   <h4 className="subtype-headings fs-16 fw-500">
                   View Existing Assignment Details
                      </h4>{"  "}
                  <div className="table-container email-table">
                    <table className="responsive-table">
                      <thead>
                        <tr>
                          <th>Nominee Name</th>
                          <th>Nominee DOB</th>
                          <th>Relationship with Policy Owner</th>
                          <th>% Share</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isShowPOSScreen&&<>
                      {existingNomineeData?.map((row,index) => (
                          <tr  key={index}>
                            <td>{row.NomineeName_Old} </td>
                            <td>{row.NomineeDOB_Old ? convertDate(row.NomineeDOB_Old) : row.NomineeDOB_Old} </td>
                            <td>
                              {row.RealtionshipWithPolicyowner_Old} 
                              </td>
                            <td>{row.Share_Old} </td>
                            <td>{row.Role_Old} </td>
                          </tr>
                        ))}
                      
                        {existingNomineeData?.length === 0 && (
                          <tr>
                            <td colSpan="5">
                              <div className="text-center">
                                <span>No data avalable</span>
                              </div>
                            </td>
                          </tr>
                        )}
                        </>}
                        {isShowPOSScreen&&<>
                          {posExistingNomineeData?.map((row, index) => (
            <tr key={index}>
             <td>{row.NomineeName}</td>
              <td>{row.NomineeDOB}</td>
              <td>{row.RealtionshipWithPolicyowner}</td>
              <td>{row.Share}</td>
              <td>{row.Role}</td>
            </tr>
          ))}
          {posExistingNomineeData?.length === 0 && (
            <tr>
              <td colSpan="5">
                <div className="text-center">
                  <span>No data available</span>
                </div>
              </td>
            </tr>
          )}
                        </>}
                      </tbody>
                    </table>
                  </div>
               
               </div> */}
                </>
              )}
              {(checkedList?.includes(
                      "Initiate Re-Assignment"
                    )||isShowPOSScreen)&& (
                <>
                 {renderDetailsForm("PastOwner_Details")}
                    <div className="mb-16">
                      <div className="d-flex">
                    <h4 className="subtype-headings fs-16 fw-500">
                     {isShowPOSScreen? "New Nominee Details": "  Initiate Re-Assignment"}
                      </h4>{"  "}
                      {!isShowPOSScreen&&
                      <span className="d-flex justify-center" style={{paddingLeft:"10px"}}><i class="bi bi-plus-circle-fill c-pointer text-color fs-18" onClick={() => handleAddRow()}></i></span>
                        }
                      </div>
                  
                  <div className="table-container email-table">
                    <table className="responsive-table">
                      <thead>
                        <tr>
                          {/* <th></th> */}
                          <th>Nominee Name</th>
                          <th>Nominee DOB</th>
                          <th>Relationship with Policy Owner</th>
                          <th>% Share</th>
                          <th>Role</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isShowPOSScreen&&<>
                      {updateNomineeData.map((row,index) => (
                          <tr key={row.id} className="nominee-input">
                           <td>
  <Form.Item
    name={['updateNomineeData', row.id, 'NomineeName_New']}
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Enter Nominee Name",
      },
    ]}
  >
    <Input
      placeholder="Enter Nominee Name"
      className="cust-input"
      value={row.NomineeName_New}
      maxLength={100}
      onChange={(e) => handleNomineeNameChange(index, e.target.value)}
    />
  </Form.Item>
</td>
                            <td className="date-picker">
                            <Form.Item
    name={['updateNomineeData', row.id, 'NomineeDOB_New']}
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Select a DOB",
      },
    ]}
  >
                            <DatePicker
                            allowClear={false}
                    style={{ width: "100%" }}
                    className="cust-input"
                    placeholder="Select a DOB"
                    format={dateFormat}
                    value={row.NomineeDOB_New}
                    onChange={(e) => handleDobChange(e, index)}
                  />
                  </Form.Item>
                            </td>
                            <td>
                            <Form.Item
    name={['updateNomineeData', row.id, 'RealtionshipWithPolicyowner_New']}
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Select a RelationShip",
      },
    ]}
  >
                            <Select
                               className={`inputs-label cust-input select-width`}
                                placeholder="Select a RelationShip"
                                options={relationShipLU}
                                value={row.RealtionshipWithPolicyowner_New}
                                onChange={(value) => handleRelationshipChange(index, value,row)}
                              />
                              </Form.Item>
                              </td>
                            <td>
                            <Form.Item
    name={['updateNomineeData', row.id, 'Share_New']}
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Enter a Share",
      },
    ]}
  >
                            <Input
                  className="cust-input"
                  value={row.Share_New}
                  placeholder="Enter a Share"
                  maxLength={20}
                  onChange={(e) => handleShareChange(index, e.target.value,row)}
                />
                </Form.Item>
                              </td>
                            <td>
                            {/* <Select
                                 className={`inputs-label cust-input select-width`}
                                placeholder="Select a Role"
                                defaultValue= {index === 0 && "nominee"}
                                disabled={index === 0}
                                value={row.Role_New}
                                options={[
                                  {
                                    value: "nominee",
                                    label: "Nominee",
                                  },
                                  {
                                    value: "appointee",
                                    label: "Appointee",
                                  },
                                ]}
                                onChange={(value) => handleRoleChange(index, value)}
                              /> */}
                            <Form.Item
  name={['updateNomineeData', row.id, 'Role_New']}
  className="inputs-label mb-0"
  rules={[
    {
      required: index !== 0,  // Make it required only if index is not 0
      message: 'Select a Role',
      validator: (_, value) => {
        if (index === 0 && !value) {
          return Promise.resolve();  // Allow empty value for the first record
        }
        if (index === 0 && value !== 'nominee') {
          return Promise.reject('The first record must have "nominee" as the Role');
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <Select
    className={`inputs-label cust-input select-width`}
    placeholder="Select a Role"
    defaultValue={index === 0&&row.Role_New} // Use row.Role_New if available, otherwise default to "nominee"
    disabled={index === 0}
    options={[
      {
        value: "nominee",
        label: "Nominee",
      },
      {
        value: "appointee",
        label: "Appointee",
      },
    ]}
    onChange={(value) => handleRoleChange(index, value,row)}
  />
</Form.Item>

                              </td>
                            <td>
                              {index !== 0 &&<>
                              <i
                                class="bi bi-trash3-fill"
                                onClick={() => handleDeleteRow(row.id,index)}
                                style={{ color: "#b3201f", cursor: "pointer" }}
                              ></i>
                              </>}
                            </td>
                          </tr>
                        ))}
                        {updateNomineeData?.length === 0 && (
                          <tr>
                            <td colSpan="5">
                              <div className="text-center">
                                <span>No data avalable</span>
                              </div>
                            </td>
                          </tr>
                        )}
                        </>}
                      
                          {isShowPOSScreen&&<>
                          {posUpdateNomineeData?.map((row, index) => (
            <tr key={index}>
             <td>{row.NomineeName}</td>
              <td>{row.NomineeDOB}</td>
              <td>{row.RealtionshipWithPolicyowner}</td>
              <td>{row.Share}</td>
              <td>{row.Role}</td>
              {/* Similarly, add other fields as needed */}
            </tr>
          ))}
          {posUpdateNomineeData?.length === 0 && (
            <tr>
              <td colSpan="5">
                <div className="text-center">
                  <span>No data available</span>
                </div>
              </td>
            </tr>
          )}
                        </>}
                      </tbody>
                    </table>
                  </div>
               
               </div>
                </>
              )}
              {checkedList?.includes(
                      "Share Nominee Change Process"
                    ) && (
                <>
                  <DetailsForm
                    data={AssignmentData[selectedSubType]?.Share_Nominee_process}
                    subType={selectedSubType}
                    toggleInputField={toggleInputField}
                    activeEmailIcons={activeEmailIcons}
                    activeMobileIcons={activeMobileIcons}
                    activeWhatsAppIcons={activeWhatsAppIcons}
                  ></DetailsForm>
                {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          <DetailsForm
                data={AssignmentData[selectedSubType]?.Comments}
                subType={selectedSubType}
              ></DetailsForm>
                </>
              )}
              {checkedList?.includes(
                      "Initiate Re-Assignment"
                    )&& <>
              {!isShowPOSScreen &&<>
               <DetailsForm
                data={AssignmentData[selectedSubType]?.Request_Details}
                disabledDate={disabledDate}
                subType={selectedSubType}
                handleDateChange={handleDateChange}
                form={form}
                suffix={!isShowPOSScreen && suffix}
                handleRadioChange={handleRadioChange}
                getUploadFiles={getUploadFiles}
              ></DetailsForm>
              {showResonDelayField && (
                <>
                  <DetailsForm
                    data={AssignmentData[selectedSubType]?.ReasonSubmission}
                    subType={selectedSubType}
                  ></DetailsForm>
                </>
              )}
              </>}
              {isShowPOSScreen&&<>
                <DetailsForm
                data={AssignmentData[selectedSubType]?.POS_Details}
                subType={selectedSubType}
                form={form}
                handleRadioChange={handleRadioChange}
                getUploadFiles={getUploadFiles}
              ></DetailsForm>
              </>}
              </>}
              {(checkedList?.length>0||isShowPOSScreen)&&<>
              <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  disabled={totalShare!=100&&checkedList?.includes("Initiate Re-Assignment")}
                >
                  {isShowPOSScreen ? "Approve" : "Submit"}
                </Button>{" "}
             
            {/* {(showRaiseRequirementBtn) && (
              <Button type="primary" className="primary-btn"
              htmlType="submit"
              // onClick={() => getRaiseRequirements()}
              disabled={totalShare!=100&&checkedList?.includes("Initiate Re-Assignment")}
              >
                Raise Requirement
              </Button>
            )} */}
     

            {isShowPOSScreen ?   <Button type="primary" className="primary-btn"
            onClick={() => getRaiseRequirements()}
           disabled={totalShare!=100&&checkedList?.includes("Initiate Re-Assignment")}
           >
             Raise Requirement
           </Button> :   <Button type="primary" className="primary-btn"
           onClick={() => getRaiseRequirements()}
          disabled={totalShare!=100&&checkedList?.includes("Initiate Re-Assignment")}
          >
            Raise Requirement
          </Button>}
            
     
          </div>
          </>}
            </>
          )}
           {/*Re Assignment SubType Code End */}
           
           

        </Form>
      </Spin>
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
        title="View List of Medical Tests Completed"
        open={medicalTestsCompleteModal}
        destroyOnClose={true}
        width={800}
        closeIcon={false}
        footer={null}
      >
        <Spin spinning={""}>
          <div  >
            <Form >
              <div className="reuirement">
              <table className="responsive-table">
                <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Medical Tests Completed</th>
                </tr></thead>
                <tbody>
                 <tr>
                    <td>1</td>
                    <td>Blood Reports</td>
                 </tr>
                 <tr>
                    <td>2</td>
                    <td>ECG</td>
                 </tr>
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
                  onClick={() => setMedicalTestsCompleteModal(false)}
                >
                  Close
                </Button>
              </div>
            </Form>
          </div>

          
        </Spin>
      </Modal>
      <Modal
        title="View Medical Tests Outstanding"
        open={medicalTestsPendingModal}
        destroyOnClose={true}
        width={800}
        closeIcon={false}
        footer={null}
      >
        <Spin spinning={""}>
          <div  >
            <Form >
              <div className="reuirement">
              <table className="responsive-table">
                <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Medical Tests Pending</th>
                </tr></thead>
                <tbody>
                 <tr>
                    <td>1</td>
                    <td>Blood Reports</td>
                 </tr>
                 <tr>
                    <td>2</td>
                    <td>ECG</td>
                 </tr>
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
                  onClick={() => setMedicalTestsPendingModal(false)}
                >
                  Close
                </Button>
              </div>
            </Form>
          </div>

          
        </Spin>
      </Modal>
   <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose}/>
      <Modal
        title="List of Acceptable Address Proofs"
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
              <td>Copy of Aadhar Card - Masked</td>
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

<td>Utility Bill which is not more than 2 months</td>
<td>
<Upload 
        {...uploadProps} 
        fileList={rationCardUploadFiles}
        onRemove={handleRemove}
        accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
      customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Utility Bill which is not more than 2 months")}
      //onChange={(info) => handleFileUpload(info, index)} 
    //  onChange={(props) => handleUpload(props)}
      action={
        "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
      }
        >
           {suffix}
          </Upload>
          {/* {rationCardUploadFiles.name} */}
</td>
            </tr>
            <tr>
            <td>3</td>
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
                        {/* {passportUploadFiles.name} */}
              </td>
            
            </tr>
            <tr>
              <td>4</td>
              <td>Copy of Driving License</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={DrivingUploadFiles}
                      onRemove={handleRemove}
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
                        {/* {DrivingUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Copy of Voter ID</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={voterIDUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Voter ID")}
                    //onChange={(info) => handleFileUpload(info, index)} 
                  //  onChange={(props) => handleUpload(props)}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {/* {DrivingUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>Job Card Issued by NREGA</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={jobCardFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Job Card Issued by NREGA")}
                    //onChange={(info) => handleFileUpload(info, index)} 
                  //  onChange={(props) => handleUpload(props)}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {/* {DrivingUploadFiles.name} */}
              </td>
            </tr>
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
  
      <Modal
        title="List of Acceptable ID Proofs"
        open={idProofModal}
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
              <td>Copy of Aadhar Card - Masked</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={aadharIDUploadFiles}
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
              <td>PAN Card</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={PANCardUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "PAN Card")}
                    //onChange={(info) => handleFileUpload(info, index)} 
                  //  onChange={(props) => handleUpload(props)}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {/* {PANCardUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Copy of Passport</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={passportIDUploadFiles}
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
                        {/* {passportIDUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Copy of Driving License</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={DrivingIDUploadFiles}
                      onRemove={handleRemove}
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
                        {/* {DrivingIDUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Copy of Voter ID</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={voterIDProofUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Voter ID")}
                    //onChange={(info) => handleFileUpload(info, index)} 
                  //  onChange={(props) => handleUpload(props)}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {/* {DrivingUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>Job Card Issued by NREGA</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={jobCardIDProofFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Job Card Issued by NREGA")}
                    //onChange={(info) => handleFileUpload(info, index)} 
                  //  onChange={(props) => handleUpload(props)}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {/* {DrivingUploadFiles.name} */}
              </td>
            </tr>
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
    </>
  );
};

export default Assignment;

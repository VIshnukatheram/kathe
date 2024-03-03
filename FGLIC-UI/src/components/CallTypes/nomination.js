import React, { useState,useEffect } from "react";
import { Data } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import { useSelector } from "react-redux";
import apiCalls from "../../api/apiCalls";
import {
  Button,
  Form,
  Spin,
  Modal,
  Checkbox,
  message,
  Row,
  Col,
  Select,
  Input,
  DatePicker
} from "antd";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";

const Nomination = (props) => {
  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const {
    selectedSubType,
    customerData,
    POSContactData,
    details
     } = props;
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showResonDelayField,setShowReasonDelayField] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  const suffix = <img src={UploadIcon} alt="" />;
  const [checkedList, setCheckedList] = useState([]);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [nomineeEnquiryData,setNomineeEnquiryData] = useState([]);
  const [totalShare, setTotalShare] = useState(0);
  const [uploadFiles,setUploadFiles] = useState([]);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [raiseRequirementOpen,setRaiseRequirementOpen] = useState(false);
  const [existingNomineeData, setExistingNomineeData] = useState([]);
  const [relationShipLU,setRelationShipLU] = useState([]);
  const [isExistingAppointeeData,setIsExistingAppointeeData] = useState({});
  const [posExistingNomineeData,setPosExistingNomineeData] = useState([]);
  const [posUpdateNomineeData,setPosUpdateNomineeData] = useState([]);
  const [isAllowNomineeUpdation,setIsAllowNomineeUpdation] = useState(false);
  const [isShowNomineeSections,setIsShowNomineeSections] = useState(false);
  const [isMinorDOB,setIsMinorDOB] = useState(false);
  const [isDOBIndex,setIsDOBIndex] = useState(null);
  const [isProcessLink,setIsProcessLink] = useState(''); 
  const [isDocLink,setIsDocLink] = useState('');

  const [updateNomineeData, setUpdateNomineeData] = useState([
    {id:1, NomineeName_New: "", NomineeDOB_New: null, RealtionshipWithPolicyowner_New: null, Share_New: 0, Role_New:"nominee",isMinor:false},
  ]);
  const posChangeinNomineeObj = {
    custRole:POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    Client_Id: null
  }
  const posChangeinAppointeeObj = {
    custRole:POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    AppointeName_Old:"",
    AppointeDOB_Old:'',
    AppointeShare_Old:'',
    AppointeRealtionshipWithPolicyowner_Old:"",
    AppointeName_New:"",
    AppointeDOB_New:'',
    AppointeShare_New:'',
    AppointeRealtionshipWithPolicyowner_New:"",
    ValidateSignature:"",
    Comments:""
  };
  useEffect(() => {
    if (POSContactData && customerData?.isPOS&&selectedSubType==="changeinnominee") {
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        posChangeinNomineeObj[element.tagName] = element.tagValue
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posChangeinNomineeObj?.custRole,
        srvReqID: posChangeinNomineeObj?.srvReqRefNo,
        ValidateSignature:posChangeinNomineeObj?.ValidateSignature,
        CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        BranchComments: posChangeinNomineeObj?.Comments
      });
      Data[selectedSubType]?.POS_Details?.forEach(element => {
        if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
          element.hide= false;
          setShowReasonDelayField(true);
        }
      });
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
    else if (POSContactData && customerData?.isPOS&&selectedSubType==="changeinappointee") {
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        posChangeinAppointeeObj[element.tagName] = element.tagValue
      });
      setIsShowPOSScreen(true);
      getRelationsData(null,null,null,posChangeinAppointeeObj?.Client_Id)
      form.setFieldsValue({
        custRole: posChangeinAppointeeObj?.custRole,
        srvReqID: posChangeinAppointeeObj?.srvReqRefNo,
        AppointeName_Old:posChangeinAppointeeObj?.AppointeName_Old,
        AppointeDOB_Old:posChangeinAppointeeObj?.AppointeDOB_Old,
        AppointeShare_Old:posChangeinAppointeeObj?.AppointeShare_Old,
        AppointeRealtionshipWithPolicyowner_Old:posChangeinAppointeeObj?.AppointeRealtionshipWithPolicyowner_Old,
        AppointeName_New:posChangeinAppointeeObj?.AppointeName_New,
        AppointeDOB_New:posChangeinAppointeeObj?.AppointeDOB_New ,
        AppointeShare_New:posChangeinAppointeeObj?.AppointeShare_New,
       // AppointeRealtionshipWithPolicyowner_New:  posChangeinAppointeeObj?.AppointeRealtionshipWithPolicyowner_New,
        ValidateSignature:posChangeinAppointeeObj?.ValidateSignature,
        Comments:posChangeinAppointeeObj?.Comments
      });
    }
  }, []); // eslint-disable-next-line arrow-body-style

  useEffect(()=>{
    setCheckedList([]);
    getProcesLink();
    hideCommunications();
    setIsShowNomineeSections(false);
    setShowRaiseRequirementBtn(false);
    form.setFieldsValue({
        NominationChangeAllowed: details?.policyDetailsObj?.saDetails?.Assignment ? "No" : "Yes"
    })
    if(!details?.policyDetailsObj?.saDetails?.Assignment){
      setIsShowNomineeSections(true);
      setIsAllowNomineeUpdation(true);
    }
    else {
      setIsShowNomineeSections(true);
      setIsAllowNomineeUpdation(false);
    }
  },[selectedSubType])

  const hideCommunications=()=>{
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setShowPhoneNumber(false);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
  }

  const handleChange = (value) => {
    // If the checkbox is already checked, uncheck it
    setShowRaiseRequirementBtn(false);
    hideCommunications();
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
      if(value?.includes("View Existing Nominee Details")||value?.includes("Update New Nominee Details")||
      value?.includes("View Existing Appointee")||value?.includes("Update New Appointee")){
        getNomineeEnquiry(value);
        if(value?.includes("Update New Nominee Details")||value?.includes("Update New Appointee")){
          getRelationsData(null,value,null,props?.details?.policyDetailsObj?.identifiers?.po_ClientID)
        }
      }
      else if(value?.includes("Share Process Information")){
        form.setFieldsValue({
          'mobileNo': customerData?.mobileNo,
      'whatsAppNo':  customerData?.mobileNo,
      'emailId': customerData?.emailID
        });
      }
    }
  };

  const getProcesLink = () => {
    setIsProcessLink('');
    setIsDocLink('')
    let obj = {
      "Call_Typ" : props?.selectedCallType,
      "Sub_Typ": props?.selectedSubTypeId
  }
    let response = apiCalls.getProcesLink(obj);
    response
      .then((val) => {
        if (val?.data) {
        
          const filteredData = val?.data?.filter((ele) =>{
            if(ele.docType === "AcceptableDocs"){
              setIsDocLink(ele.link);
            }else if(ele.docType === props?.SelectedSubTypeVal || ele.docType ==="Change in Nominee"){
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
      // form.setFieldsValue({
      //   [`updateNomineeData[${index}].NomineeName_New`]: "",
      //   [`updateNomineeData[${index}].NomineeDOB_New`]: "",
      //   [`updateNomineeData[${index}].RealtionshipWithPolicyowner_New`]: "",
      //   [`updateNomineeData[${index}].Share_New`]: "",
      //   [`updateNomineeData[${index}].Role_New`]: "",
      // });
  
      const updatedupdateNomineeData = updateNomineeData.filter((row) => row.id !== id);
  
      const newTotalShare = updatedupdateNomineeData.reduce((sum, nominee) =>
        sum + parseFloat(nominee.Share_New) || 0, 0);
  
      setTotalShare(newTotalShare);
      setUpdateNomineeData(updatedupdateNomineeData);
    // Reset the form instance to reflect the changes
    form.resetFields([`updateNomineeData[${index}].NomineeName_New`, `updateNomineeData[${index}].NomineeDOB_New`, `updateNomineeData[${index}].RealtionshipWithPolicyowner_New`, `updateNomineeData[${index}].Share_New`, `updateNomineeData[${index}].Role_New`]);
    
    }
  };
  

  const handleTitleCheckBox = (e, item) => {
    const newValue = checked ? false : true;
    setChecked(newValue);
  };

  const handleRadioChange = (e,item) => {
    setShowRaiseRequirementBtn(false);
  //  if((item?.label?.includes("Validate Signature")||item?.label?.includes("Signature Validated"))&&e.target.value==="no"){
  //   setShowRaiseRequirementBtn(true);
  //  }
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
  const getUploadFiles=(listOfUploadFiles)=>{
    const updatedUploadList = listOfUploadFiles?.map((obj) => {
      // Create a new object without the propertyToDelete property
      const { labelName, ...newObject } = obj;
      return newObject;
    });
    // Update the state with the new list
    setUploadFiles(updatedUploadList);

  }
  

  // const getNomineeCreation = (e)=>{
  //   setIsLoading(true);
  //   setIsAllowNomineeUpdation(false);
  //   let response = apiCalls.getNomineeCreation(customerData?.policyNo);
  //   response
  //     .then((val) => {
  //       if (val?.data) {
  //         const res = val?.data?.responseBody;
  //         setIsLoading(false);
  //         setIsAllowNomineeUpdation(true);
  //       } else {
  //         setIsLoading(false);
  //         message.error({
  //           content:
  //             val?.data?.responseBody?.errormessage ||
  //             "Something went wrong please try again!",
  //           className: "custom-msg",
  //           duration: 2,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //     });
  // }

  const getRelationsData = async (val,checkItem,consolidatedNewData,clientNumber) => {
    setIsLoading(true);
    try {
      const response = await apiCalls.getRelationsData(val?.bnysel||clientNumber);
      if (response?.data) {
        const res = response?.data;
        if(checkItem?.includes("Update New Nominee Details")||checkItem?.includes("Update New Appointee")){
          let transformedData = res?.map((item) => ({
           ...item,
           label: item.longdesc,
           value: item.descitem
         }));
         setRelationShipLU(transformedData);
         }
        if (checkItem?.includes("View Existing Nominee Details") || checkItem?.includes("View Existing Appointee")||
        checkItem?.includes("Update New Nominee Details")||checkItem?.includes("Update New Appointee")) {
          let matchingItem = res?.find((item) => item?.descitem === val?.bnyrln);
          let relationValue = matchingItem ? matchingItem.longdesc : null;
          return relationValue;
        }
       else if (
          consolidatedNewData?.length > 0 &&
          selectedSubType === "changeinnominee"
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
        else if (clientNumber && selectedSubType === "changeinappointee") {
          // Use the optional chaining operator (?.) to access properties safely and prevent errors if res is null or undefined
          let matchingItem = res?.find((item) => item?.descitem === posChangeinAppointeeObj?.AppointeRealtionshipWithPolicyowner_New);
          
          // Set the value of posChangeinAppointeeObj.AppointeRealtionshipWithPolicyowner_New based on the matchingItem
          let posAppointeeRelationShipOwner = matchingItem ? matchingItem.longdesc : null;
           form.setFieldsValue({
            AppointeRealtionshipWithPolicyowner_New: posAppointeeRelationShipOwner,
          });
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
              if(selectedSubType==="changeinnominee"){
                const dob = await getClientEnquiry(val.bnysel);
                const relationShip = await getRelationsData(val,checkItem);
                const nomineeObj = {
                  NomineeName_Old: val.clientName ? val.clientName?.trim() : val.clientName,
                  NomineeDOB_Old: dob,
                  RealtionshipWithPolicyowner_Old: relationShip,
                  Share_Old: val?.bnypc,
                  Role_Old: val?.bnyrln === "AP" ? "Appointee" : "Nominee"
                };
    
                nomineeArray.push(nomineeObj);
              }
              else if(selectedSubType==="changeinappointee"&&val?.bnyrln === "AP"){
                const dob = await getClientEnquiry(val.bnysel);
                const relationShip = await getRelationsData(val,checkItem);
                  form.setFieldsValue({
                    AppointeName_Old:val?.bnyrln === "AP" ? val.clientName : "",
                    AppointeDOB_Old:dob,
                    AppointeShare_Old:val?.bnypc,
                    AppointeRealtionshipWithPolicyowner_Old:relationShip,
                  })
                  if(checkItem?.includes("Update New Appointee")){
                    let appointeeObj ={
                      AppointeName_Old:val.clientName,
                      AppointeDOB_Old:dob,
                      AppointeShare_Old:val?.bnypc,
                      AppointeRealtionshipWithPolicyowner_Old:relationShip,
                    }
                    setIsExistingAppointeeData(appointeeObj);
                  }
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
  
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, 'YYYYMMDD').format('DD/MM/YYYY');
    return formattedDate;
  };
  
  const handleTextLink=(item)=>{
    if(item?.linkValue?.toLowerCase() === "view"){
     const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
     window.open(url, '_blank');
   }
 }
  const handleDropdownChange=(e,item)=>{
    //setIsShowNomineeSections(false);
    // if(item?.label?.includes("Nomination Change Allowed")){
    //   getNomineeCreation();
    //   setIsShowNomineeSections(true);
    //   setIsAllowNomineeUpdation(true);
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
    //debugger
    if (item === "BranchReceivedDate" || item.name === "branchreceivedate") {
     setShowReasonDelayField(false);
     let newDate = new Date();
     let todayDate = moment(newDate).format("MM/DD/YYYY");
     let selectDate = moment(date + 1).format("MM/DD/YYYY");
     const formFeilds = form.getFieldsValue()
     let customerSignDate = moment(formFeilds?.customersigning + 1).format("MM/DD/YYYY");
     let dateDiffence = date_diff_indays(selectDate,customerSignDate)
     if(!formFeilds?.customersigning ||dateDiffence > 0){
       message.destroy();
       message.error({
         content: "Request Received Date can't be before the customer signing date.",
         className: "custom-msg",
         duration: 3,
       });
       form.setFieldsValue({
         branchreceiveddate: "",
         BranchReceivedDate:""
       })
     return;
     }
    //  if(requestForSelection === "landmarkaddition"&&selectDate < todayDate){
    //   setShowReasonDelayField(true);
    //  }
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
 };

    //commonly render all forms
    const renderDetailsForm = (formType) => {
      return (
        <DetailsForm
          data={Data[selectedSubType]?.[formType]}
          subType={selectedSubType}
           suffix={!isShowPOSScreen && suffix}
          form={form}
          handleRadioChange={handleRadioChange}
          handleDateChange={handleDateChange}
          handleTextLink ={handleTextLink}
          handleTitleCheckBox={handleTitleCheckBox}
          handleDropdownChange={handleDropdownChange}
          toggleInputField={toggleInputField}
          activeEmailIcons={activeEmailIcons}
          activeMobileIcons={activeMobileIcons}
          activeWhatsAppIcons={activeWhatsAppIcons}
          appointeerelationShipLU={relationShipLU}
          getUploadFiles={getUploadFiles}
          disabledDate={disabledDate}
        ></DetailsForm>
      );
    };

    const getTransactionData = (values) => {
      if (selectedSubType === "changeinnominee") {
        let newArray =
        [
          { Status: "Create", TagName: "outofrevival", TagValue: values.outofrevival || "" },
          { Status: "Create", TagName: "ValidateSignature", TagValue: values.ValidateSignature || ""},
          { Status: "Create", TagName: "Comments", TagValue: values.Comments || ""},
          {Status: "Create",TagName: "Client_Id","TagValue":  values.GSTINToBeUpdateFor === "1" ? customerData?.laClientID: customerData?.poClientID},
          { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
          { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
          {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"}
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
      else if(selectedSubType==="changeinappointee"){
        return [
          { Status: "Create", TagName: "AppointeName_Old", TagValue: values.AppointeName_Old || isExistingAppointeeData?.AppointeName_Old || ""},
          { Status: "Create", TagName: "AppointeDOB_Old", TagValue: (values.AppointeDOB_Old && convertDate(values.AppointeDOB_Old))|| isExistingAppointeeData?.AppointeDOB_Old || ""},
          { Status: "Create", TagName: "AppointeShare_Old", TagValue: values.AppointeShare_Old || isExistingAppointeeData?.AppointeShare_Old|| ""},
          { Status: "Create", TagName: "AppointeRealtionshipWithPolicyowner_Old", TagValue: values.AppointeRealtionshipWithPolicyowner_Old|| isExistingAppointeeData?.AppointeRealtionshipWithPolicyowner_Old || ""},
          { Status: "Create", TagName: "AppointeName_New", TagValue: values.AppointeName_New|| "" },
          { Status: "Create", TagName: "AppointeDOB_New", TagValue: values.AppointeDOB_New? moment(values.AppointeDOB_New +1).format("DD/MM/YYYY") :values.AppointeDOB_New  || ""},
          { Status: "Create", TagName: "AppointeShare_New", TagValue: values.AppointeShare_New || ""},
          { Status: "Create", TagName: "AppointeRealtionshipWithPolicyowner_New", TagValue: values.AppointeRealtionshipWithPolicyowner_New || ""},
          { Status: "Create", TagName: "ValidateSignature", TagValue: values.ValidateSignature|| "" },
          { Status: "Create", TagName: "Comments", TagValue: values.Comments || ""},
          {Status: "Create",TagName: "Client_Id","TagValue":  values.PanUpdateFor_New === "1" ? customerData?.laClientID: customerData?.poClientID},
          { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
          { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
          {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"}
        ];
      } 
    };
    const hasAppointee = (nomineeData)=> {
      // Check if any item in the current level has Role_New !== 'appointee'
      if (nomineeData.some((row) => row?.Role_New !== 'appointee')) {
        return true;
      }
    
      // Check each nested level
      for (const row of nomineeData) {
        if (row?.nestedNomineeData && hasAppointee(row.nestedNomineeData)) {
          return true;
        }
      }
    
      return false;
    }

    const getDOBAppointeeCheck = () => {
      return updateNomineeData?.some((item, index) => {
        if (item) {
          const currentDate = new Date();
          const birthDate = new Date(item?.NomineeDOB_New);
          const age = currentDate.getFullYear() - birthDate.getFullYear();
          const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    
          if ((age < 18 || (age === 18 && monthDiff < 0)) && updateNomineeData[index].Role_New === "appointee") {
            return true;
          }
        }
        return false; // Return false for cases where the condition is not met
      });
    };

    const isApointeeRequired = () => {
      if (isMinorDOB && updateNomineeData?.every((row) => row?.Role_New !== 'appointee')) {
        return true;
      } 
      // else if (!isMinorDOB && updateNomineeData?.some((row) => row?.Role_New === 'appointee')) {
      //   return true;
      // }
      return false;
    };

    const isValidAppointeeCheck = () => {
      // Assuming updateNomineeData is an array
      const hasValidAppointee = updateNomineeData?.some((item) => item.Role_New==="appointee" &&item.isMinor);
      
      return hasValidAppointee;
    }

    const handleError = (errorMessage) => {
      message.destroy();
      message.error({
        content: errorMessage || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    };

  const handleSubmit = (values) => {
    //debugger

   if(selectedSubType==="changeinnominee"){
    let appointeeshare = updateNomineeData.some((ele)=>{
      return ele.Role_New === "appointee" && +ele.Share_New >0
    });
      if(appointeeshare){
        handleError("Appointee Share Should Not be More Than 0");
        return
      }
      
    if(checkedList?.includes("Update New Nominee Details")){
    if (isApointeeRequired()&&!isShowPOSScreen) {
      handleError("Appointee is mandatory for minor nominee.");
      return;
    }
    if(isValidAppointeeCheck()&&!isShowPOSScreen){
      handleError("Appointee is mandatory for minor nominee.");
       return;
    }
    // if (!isMinorDOB && updateNomineeData?.some((row) => row?.Role_New === 'appointee')) {
    //   handleError("Appointee is allowed only for minor DOB.");
    //   return;
    // }
    if (totalShare !== 100&&!isShowPOSScreen) {
      handleError("Total Share is allowed maximum 100.");
      return;
    }
    if (getDOBAppointeeCheck()&&!isShowPOSScreen) {
      handleError("Appointee and Minor DOB not allowed in the same record.")
      return;
    }
  }
     if(checkedList?.includes("Share Nominee Change Process")&&!isShowPOSScreen&&!showEmailFields){
      handleError("Please select atleast one communication.");
      return;
     }
     else {
     // Check if at least one row is filled before submitting
      if (isShowPOSScreen||updateNomineeData?.some((row) => row?.NomineeName_New?.trim() !== '')||checkedList?.includes("Share Nominee Change Process")||
      checkedList?.includes("View Existing Nominee Details")) {
      if (POSContactData && customerData?.isPOS) {
        POSActionsOnContactDetails(values, "APPROVED");
      } else {
        // if (
        //   values.ValidateSignature === "no"
        // ) {
        //   getRaiseRequirements();
        // } else {
          saveRequest();
        //}
      }
    } else {
      handleError("At least one row must be filled before submitting.");
    }
  }



   }
   else if(selectedSubType === "changeinappointee"){
    if(checkedList?.includes("Update New Appointee")){
    if(values?.AppointeDOB_New){
      const currentDate = new Date();
      const birthDate = new Date(values?.AppointeDOB_New);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = currentDate.getMonth() - birthDate.getMonth();
      if(age < 18 || (age === 18 && monthDiff < 0)){
        handleError("Nominated Appointee cannot be minor");
        return;
      }
    }
    // if(parseFloat(values?.AppointeShare_New) !== 100){
    //   handleError("Please Enter share value is 100.");
    //   return;
    // }
  }
    if(checkedList?.includes("Share Process Information")&&!isShowPOSScreen&&!showEmailFields){
      handleError("Please select atleast one communication.");
      return;
     }
     else {
    if (POSContactData && customerData?.isPOS) {
      POSActionsOnContactDetails(values, "APPROVED");
    } 
    //  else if((values.ValidateSignature === 'no')){
    //     getRaiseRequirements();
    //   }else{
        saveRequest(values);
      //}
   }
  }
  };

  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    setRequirementLoader(true);
    if(formData.ValidateSignature === 'no'){
      saveRequest();
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
        if (typeof val?.data !== 'string') {
          setRaiseRequerimentList(val?.data);
          setRequirementLoader(false);
        } else {
          setRequirementLoader(false);
          handleError(typeof val?.data === 'string' && val?.data ||
          val?.data?.responseBody?.errormessage ||
          "Something went wrong please try again!");
        }
      })
      .catch((err) => {
        setRequirementLoader(false);
      });
  };



  const POSActionsOnContactDetails = (values, status) => {
    let seletedRequerimentList = raiseRequerimentList
      ?.filter((e) => e.status === true)
      ?.map((e) => e.raiseReqId);
      if(seletedRequerimentList.length===0  && status === 'REJECTED'){
        setIsLoading(false);
        setRequirementLoader(false);
        handleError("Please Select Documents to Reject.");
      return;
      }
 

    let obj = {
      TransectionId: 1,
      SrvReqRefNo: POSContactData?.srvReqRefNo,
      Status: status,
      RequirementList: seletedRequerimentList,
      // "RequirementComments":requirementCmnt,
      Comments: values?.comment,
      TransactionPayload: [],
    };
    setIsLoading(true);
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
          handleError(val?.data?.responseBody?.errormessage ||
            "Something went wrong please try again!",);
        }
        setIsLoading(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false);
      });
  };

  const saveRequest = ()=>{
    setIsLoading(true);
    const values = form.getFieldsValue();
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values.requestchannel, // Required
      Category: (checkedList?.includes("Update New Nominee Details") ||checkedList?.includes("Update New Appointee") ||
       raiseRequirementOpen ) ? 2 :1,
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
      // "BranchId": 7890,
      // "CurrentStatus": 3,
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.name,
      ModifiedOn: new Date(),
      ModifiedByRef: "Test123",
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime: new Date(),
      ReasonDelayed: values?.resonfordelay||values?.ReasonForDelay,
      CustSignDateTime: values?.CustomerSigningDate
      ? new Date(values?.CustomerSigningDate)
      : new Date(),
      TransactionData: getTransactionData(values)||[],
      Uploads:  uploadFiles,
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

  //  if(values.ValidateSignature === 'no'){
    let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
    obj.TransactionData.push({
      "Status": "Create",
      "TagName": "ReasonList_Key",
      "TagValue":  JSON.stringify(ids)
  })
  //  }

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
            if(raiseRequirementOpen){
              setRaiseRequirementOpen(false);
              setRequirementLoader(false);
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
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });   
  }
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };
  return (
    <>
      <Spin spinning={isLoading} fullscreen />
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
          {selectedSubType==="changeinnominee"&& (
            <>
            {!isShowPOSScreen&& <>
             <DetailsForm
             data={
               !isShowPOSScreen
                 ? Data[selectedSubType]?.BOE_Details
                 : Data[selectedSubType]?.POS_Details ||
                   Data[selectedSubType]?.BOE_Details
             }
             subType={selectedSubType}
             handleDropdownChange={handleDropdownChange}
             handleRadioChange={handleRadioChange}
           ></DetailsForm>
           {isShowNomineeSections&&<>
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
                  label="View Existing Nominee Details"
                  name="viewExistingloandetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing Nominee Details"
                    checked={checkedList.includes(
                      "View Existing Nominee Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing Nominee Details")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              {isAllowNomineeUpdation&&<>
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Update New Nominee Details"
                  name="vieweligibleloan"
                >
                  <Checkbox
                    value="Update New Nominee Details"
                    checked={checkedList.includes(
                      "Update New Nominee Details"
                    )}
                    onChange={() =>
                      handleChange("Update New Nominee Details")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              </>}
              <Col
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
              </Col>
            </Row>
            </>}
             </>}
            
              {(checkedList?.includes(
                      "View Existing Nominee Details"
                    )||isShowPOSScreen) && (
                <>
                   <div className="mb-16">
                   <h4 className="subtype-headings fs-16 fw-500">
                   View Existing Nominee Details
                      </h4>{"  "}
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
                        </tr>
                      </thead>
                      <tbody>
                        {!isShowPOSScreen&&<>
                      {existingNomineeData?.map((row,index) => (
                          <tr  key={index}>
                            {/* <td>{row.id}</td> */}
                            <td>{row.NomineeName_Old} </td>
                            <td>{row.NomineeDOB_Old ? convertDate(row.NomineeDOB_Old) : row.NomineeDOB_Old} </td>
                            <td>
                              {row.RealtionshipWithPolicyowner_Old} 
                              {/* <Select
                                className="inputs-label cust-input"
                                placeholder="Select a Role"
                                options={relationShipLU}
                              /> */}
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
              {/* Similarly, add other fields as needed */}
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
               
               </div> </>
              )}
              {(checkedList?.includes(
                      "Update New Nominee Details"
                    )||isShowPOSScreen)&& (
                <>
                  {/* <DetailsForm
                    data={Data[selectedSubType]?.New_Nominee_Details}
                    subType={selectedSubType}
                    handleDateChange={handleDateChange}

                  ></DetailsForm> */}
                    <div className="mb-16">
                      <div className="d-flex">
                    <h4 className="subtype-headings fs-16 fw-500">
                     {isShowPOSScreen? "New Nominee Details": "  Update New Nominee Details"}
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
                         {!isShowPOSScreen&&<> <th>Action</th></>}
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
                    data={Data[selectedSubType]?.Share_Nominee_process}
                    subType={selectedSubType}
                    toggleInputField={toggleInputField}
                    activeEmailIcons={activeEmailIcons}
                    activeMobileIcons={activeMobileIcons}
                    activeWhatsAppIcons={activeWhatsAppIcons}
                  ></DetailsForm>
                {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          {/* <DetailsForm
                data={Data[selectedSubType]?.Comments}
                subType={selectedSubType}
              ></DetailsForm> */}
                </>
              )}
              {checkedList?.includes(
                      "Update New Nominee Details"
                    )&& <>
              {!isShowPOSScreen &&<>
               <DetailsForm
                data={Data[selectedSubType]?.Request_Details}
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
                    data={Data[selectedSubType]?.ReasonSubmission}
                    subType={selectedSubType}
                  ></DetailsForm>
                </>
              )}
              </>}
              {isShowPOSScreen&&<>
                <DetailsForm
                data={Data[selectedSubType]?.POS_Details}
                subType={selectedSubType}
                form={form}
                handleRadioChange={handleRadioChange}
                getUploadFiles={getUploadFiles}
              ></DetailsForm>
              </>}
              </>}
              {isShowPOSScreen&&<>
                <DetailsForm
                data={Data[selectedSubType]?.POS_Details}
                subType={selectedSubType}
                form={form}
                handleRadioChange={handleRadioChange}
                getUploadFiles={getUploadFiles}
                handleTextLink={handleTextLink}
              ></DetailsForm>
              </>}
            </>
          )}

          {selectedSubType==="changeinappointee"&&<>
          {!isShowPOSScreen&&<>
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
                  label="View Existing Appointee"
                  name="View Existing Appointee"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing Appointee"
                    checked={checkedList.includes(
                      "View Existing Appointee"
                    )}
                    onChange={() =>
                      handleChange("View Existing Appointee")
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
                  label="Update New Appointee"
                  name="UpdateNewAppointee"
                >
                  <Checkbox
                    value="Update New Appointee"
                    checked={checkedList.includes(
                      "Update New Appointee"
                    )}
                    onChange={() =>
                      handleChange("Update New Appointee")
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
                  label="Share Process Information"
                  name="shareprocess"
                >
                  <Checkbox
                    value="Share Process Information"
                    checked={checkedList.includes(
                      "Share Process Information"
                    )}
                    onChange={() =>
                      handleChange("Share Process Information")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
            </Row>
            {checkedList?.includes("View Existing Appointee")&&(<>
              {renderDetailsForm("Existing_Appointee_Details")}
            </>)}
            {checkedList?.includes("Update New Appointee")&&(<>
              {renderDetailsForm("New_Appointee_Details")}
              {renderDetailsForm("Request_Details")}
              {showResonDelayField&&<>
                {renderDetailsForm("ReasonSubmission")}
              </>}
            </>)}
            {checkedList?.includes("Share Process Information")&&(<>
              {renderDetailsForm("Share_Appointee_process")}
              {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
            </>)}
            </>}
            {isShowPOSScreen&&<>
              {renderDetailsForm("POS_Details")}
            </>}
          </>}

          {(checkedList?.length>0||isShowPOSScreen)&&<>
              <div className="contact-details-btn">
            {/* {(!showRaiseRequirementBtn||isShowPOSScreen)&&(
              <> */}
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  disabled={totalShare!=100&&checkedList?.includes("Update New Nominee Details")}
                >
                  {isShowPOSScreen ? "Approve" : "Submit"}
                </Button>{" "}
              {/* </>
            )} */}
            {/* {(showRaiseRequirementBtn) && (
              <Button type="primary" className="primary-btn"
              htmlType="submit"
              disabled={totalShare!=100&&checkedList?.includes("Update New Nominee Details")}
              >
                Raise Requirement
              </Button>
            )} */}
             {(isShowPOSScreen) ? (
              <Button type="primary" className="primary-btn"
               onClick={() => getRaiseRequirements()}
              disabled={totalShare!=100&&checkedList?.includes("Update New Nominee Details")}
              >
                Raise Requirement
              </Button>
            ) :  <Button type="primary" className="primary-btn"
            onClick={() => getRaiseRequirements()}
           disabled={totalShare!=100&&checkedList?.includes("Update New Nominee Details")}
           >
             Raise Requirement
           </Button>}
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
                  {raiseRequerimentList?.length>0 && raiseRequerimentList?.map((item, ind) => (
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

export default Nomination;

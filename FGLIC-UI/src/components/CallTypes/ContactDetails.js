import React, { useState, useEffect, } from "react";
import PopupAlert from "../popupAlert";
import { connect,useSelector } from "react-redux";
import { Data } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import UploadIcon from "../../assets/images/upload.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Button,
  Form,
  Modal,
  Input,
  Tooltip,
  Alert,
  Spin,
  message,
  Checkbox,
  Upload,
} from "antd";
import moment from "moment";
import CloseIcon from "../../assets/images/close-icon.png";
import apiCalls from "../../api/apiCalls";
import OTPModal from "../../utils/OTPModal";

const ContactDetails = (props) => {
  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  dayjs.extend(customParseFormat);
  const {
    selectedCallType,
    selectedSubType,
    requestModeLU,
    clientRoleLU,
    policyDetails,
    customerData,
    POSContactData,
  } = props;
  const suffix = <img src={UploadIcon} alt="" />;
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
  const [showRequestFormFields, setShowRequestFormFields] = useState(false);
  const [data, setData] = useState({});
  const [duDupeData,setDeDupeData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [deDupeModalOpen, setDeDupeModalOpen] = useState(false);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requestForSelection, setRequestForSelection] = useState(false);
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [addressProofModal, setAddressProofModal] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [clientEnquiryData, setClientEnquiryData] = useState("");
  const [disableOTP,setDisableOTP] = useState(true);
  const [uploadFiles,setUploadFiles] = useState([]);
  const [showUploadFile, setShowUploadFile] = useState(null);
  const [isUploadMultipleFiles,setIsMultipleFiles] = useState([]);
  const [aadharUploadFiles,setAAdharUploadFiles] = useState([]);
  const [passportUploadFiles,setPassportUploadFiles] = useState([]);
  const [rationCardUploadFiles,setRationCardUploadFiles] = useState([]);
  const [DrivingUploadFiles,setDrivingUploadFiles] = useState([]);
  const [uploadMultipleFiles,setUploadMultipleFiles] = useState([]);
  const [updateFields, setUpdateFields] = useState(false);
  const [isOldLandMark,setIsOldLandMark] = useState("");
  const [disableRequestForm,setDisableRequestForm] = useState(false);
  const [isShowOTPModal,setIsShowOTPModal] = useState(false);
  const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);

  
  const requestForLU = [
    { label: "Address Change", value: 1 },
    { label: "Land Mark Addition", value: 2 },
  ];
  const boeScreenObj = {

  }
  const posScreenObj = {
    custRole: '',
    srvReqID: POSContactData?.srvReqID,
    Mobile_Old: '',
    Mobile_New: '',
    srvReqRefNo:'',
    Email_Old:'',
    Email_New:'',
    AlternateNo_Old:'',
    AlternateNo_New:'',
    WorkNo_Old:'',
    WorkNo_New:'',
    Comments:'',

    Old_Address:'',
    New_Line1:'',
    New_Line2:'',
    New_LandMark:'',
    New_Pincode:'',
    New_City:'',
    New_State:'',
    Request_for:'',
    ValidateSignature:'',
  };

  useEffect(() => {
    if(customerData?.isBOE){
      ;
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        boeScreenObj[element.tagName] = element.tagValue
      });
      setIsShowPOSScreen(false);
      setRequestForSelection(parseInt(boeScreenObj?.Request_for)===1?"addresschange":"landmarkaddition");
      form.setFieldsValue({
        custRole:parseInt(boeScreenObj?.custRole),
        requestchannel: POSContactData?.reqMode,
        Request_for: parseInt(boeScreenObj?.Request_for),
        existingdetails: boeScreenObj?.existingdetails,
        lin1: boeScreenObj?.lin1,
        Old_Address: boeScreenObj?.Old_Address,
        existingdetails:  boeScreenObj?.existingdetails,
        instantAadhar: boeScreenObj?.instantAadhar,
        New_Line1: boeScreenObj?.New_Line1,
        New_Line2: boeScreenObj?.New_Line2,
        New_LandMark: boeScreenObj?.New_LandMark,
        New_Pincode: boeScreenObj?.New_Pincode,
        New_City:  boeScreenObj?.New_City,
        New_State: boeScreenObj?.New_State,
        ValidateSignature: boeScreenObj?.ValidateSignature,
       // customersigningdate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
       // branchreceivedate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
        resonfordelay:  POSContactData?.reasonDelayed,
        BOEComments: boeScreenObj?.Comments,
        POSComments: boeScreenObj?.Comments,
      })
      // if(boeScreenObj?.custRole){
      //   getClientEnquiry(boeScreenObj?.custRole);
      // }
      Data[selectedSubType]?.Checklist?.forEach(element => {
        if(element?.label==="Requestor  Comments"){
          element.hide = true
        }
      })

    }
    else if (POSContactData && customerData?.isPOS) {
     
      setDeDupeData(POSContactData?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody?.ClientDetails);
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          posScreenObj[element.tagName] = element.tagValue
        });
      setIsShowPOSScreen(true);
      if(posScreenObj?.Request_for === '1' ){
        setRequestForSelection("addresschange")
      }
      setData(posScreenObj);
      if(posScreenObj?.ValidatedBy==="otp"){
        Data[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.label==="Request Form"){
            element.hide= true;
            setUpdateFields(true);
          }
        });
      }

      Data[selectedSubType]?.POS_Details?.forEach(element => {
        
        if(element?.name==="ValidateSignature" && posScreenObj?.ValidateSignature === null){
          element.hide = true
        }
      })

      form.setFieldsValue({
        custRole: parseInt(posScreenObj?.custRole),
        srvReqID: POSContactData?.srvReqRefNo,
        Mobile_Old: posScreenObj?.Mobile_Old,
        Mobile_New: posScreenObj?.Mobile_New,
        Email_Old: posScreenObj?.Email_Old,
        Email_New: posScreenObj?.Email_New,
        AlternateNo_Old:posScreenObj?.AlternateNo_Old,
        AlternateNo_New:posScreenObj?.AlternateNo_New,
        WorkNo_Old:posScreenObj?.WorkNo_Old,
        WorkNo_New:posScreenObj?.WorkNo_New,
        BranchComments: posScreenObj?.Comments,
        Old_Address:posScreenObj?.Old_Address,
        New_Line1:posScreenObj?.New_Line1,
        New_Line2:posScreenObj?.New_Line2,
        New_LandMark:posScreenObj?.New_LandMark,
        New_Pincode:posScreenObj?.New_Pincode,
        New_City:posScreenObj?.New_City,
        New_State:posScreenObj?.New_State,
        Add_Land_Mark_New:posScreenObj?.Add_Land_Mark_New,
        ValidateSignature:posScreenObj?.ValidateSignature,
      });
    } else {
      if(policyDetails?.policyDetailsObj?.identifiers?.la_Name===policyDetails?.policyDetailsObj?.identifiers?.po_Name){
         form.setFieldsValue({
          custRole: 2
         })
         Data[selectedSubType]?.BOE_Details?.forEach(element => {
          if(element?.name==="custRole"){
            element.disabled= true;
            setUpdateFields(true);
          }
        });
        getClientEnquiry(2);
      }
      else {
        Data[selectedSubType]?.BOE_Details?.forEach(element => {
          if(element?.name==="custRole"){
            element.disabled= false;
            setUpdateFields(true);
          }
        });
        form.resetFields();
      }
      setIsShowPOSScreen(false);
      setShowRequestFormFields(false);
      setDisableRequestForm(false);
    }
  }, [selectedSubType]); // eslint-disable-next-line arrow-body-style

  const handleAddLandMarkText =(e)=>{
    if(e){
      setDisableOTP(false);
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
    console.log(uploadFiles)
  }

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
 
  }


  const handleRemove = (file) => {
    if(file?.labelName === "Copy of Aadhar Card"){
      setAAdharUploadFiles([]);
    }else if(file?.labelName === "Copy of Passport"){
      setPassportUploadFiles([]);
    }else if(file?.labelName === "Copy of Ration Card"){
      setRationCardUploadFiles([]);
    }else if(file?.labelName === "Copy of Driving License"){
      setDrivingUploadFiles([]);
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
      let formData = new FormData();
      const ApplicationNo =  policyDetails?.policyDetailsObj?.identifiers?.applicationNo
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

  const handleSubmit = (values) => {
    if (POSContactData && customerData?.isPOS) {
      POSActionsOnContactDetails(values, "APPROVED");
    } else if (selectedSubType === "mobilenumberupdate" || selectedSubType === "emailupdate" 
    || selectedSubType === "alternatenumberupdate" || selectedSubType === "worknumberupdate" || selectedSubType === "addresschange") {
      // if((values.customerchoice ===  "requestform" && values.validatesignature === 'no') || (selectedSubType === "addresschange" && values.validatesignature === 'no')){
      //   getRaiseRequirements();
      // }else{
        saveRequest();
      //}
 
  };
}
const getInternal = (values) => {
    POSActionsOnContactDetails(values, "INTERNAL");
}


  const saveRequest = ()=>{
    
     setIsLoader(true);
    const values = form.getFieldsValue();
    const newFilesArray = [];
    if (uploadFiles?.length > 0 && uploadMultipleFiles?.length > 0) {
      newFilesArray.push(...uploadFiles, ...uploadMultipleFiles);
    }
    const obj = {
      SrvReqID: POSContactData?.srvReqID||0,
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values.requestchannel, // Required
      ApplicationNo:
        policyDetails?.policyDetailsObj?.identifiers?.applicationNo,
      PolicyNo: policyDetails?.policyDetailsObj?.identifiers?.policyNo, // Required
      proposerName: policyDetails?.policyDetailsObj?.identifiers?.po_Name,
      policyStatus:
        policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus,
      plan: policyDetails?.policyDetailsObj?.planAndStatus?.planName,
      DOB: convertDate(customerData?.dob),
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.name, // Required
      ModifiedOn: new Date(),
      ModifiedByRef: "Test123",
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      Category:2,
      ReasonForChange: "",
      RequestDateTime: new Date(),
      ReasonDelayed: values.resonfordelay,
      CustSignDateTime: values?.customersigningdate
        ? new Date(values?.customersigningdate)
        : new Date(),

        "TransactionData": [
          {
            "Status": "Create",
            "TagName": "ValidateSignature",
            "TagValue": values.ValidateSignature
        },

          {
              "Status": "Create",
              "TagName": "ValidatedBy",
              "TagValue": values.customerchoice ? values.customerchoice : 'form'
          },
        
          {
              "Status": "Create",
              "TagName": "custRole",
              "TagValue": values.custRole,
          },
          {
            "Status": "Create",
            "TagName": "Comments",
            "TagValue": values?.Comments||"",
        },
          {
              "Status": "Create",
              "TagName": "Client_Id",
              "TagValue":  values.custRole === 1
                    ? customerData?.laClientID
                    : customerData?.poClientID,
          }
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
    };

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


    if(selectedSubType === 'mobilenumberupdate'){
      obj.TransactionData.push({
        "Status": "Create",
        "TagName": "Mobile_Old",
        "TagValue": values.Mobile_Old
    },
    {
        "Status": "Create",
        "TagName": "Mobile_New",
        "TagValue": values.Mobile_New,
    })
     
  }else if(selectedSubType === 'emailupdate'){
    obj.TransactionData.push({
      "Status": "Create",
      "TagName": "Email_Old",
      "TagValue": values.Email_Old
  },
  {
      "Status": "Create",
      "TagName": "Email_New",
      "TagValue": values.Email_New,
  })
    
  }else if(selectedSubType === 'addresschange'){
    obj.TransactionData.push(
      {
        "Status": "Create",
        "TagName": "Request_for",
        "TagValue": values.Request_for
    },
      {
        "Status": "Create",
        "TagName": "Old_Address",
        "TagValue": values.Old_Address
    },
  {
      "Status": "Create",
      "TagName": "New_Line1",
      "TagValue": values.New_Line1
  },
  {
      "Status": "Create",
      "TagName": "New_Line2",
      "TagValue": values.New_Line2
  },
  {
    "Status": "Create",
    "TagName": "LandMark",
    "TagValue": requestForSelection === "landmarkaddition" ? isOldLandMark : ""
},
  {
      "Status": "Create",
      "TagName": "New_LandMark",
      "TagValue": values.New_LandMark
  },
  {
      "Status": "Create",
      "TagName": "New_Pincode",
      "TagValue": values.New_Pincode
  },
   {
      "Status": "Create",
      "TagName": "New_City",
      "TagValue": values.New_City
  },
   {
      "Status": "Create",
      "TagName": "New_State",
      "TagValue": values.New_State
  },{
    "Status":"Create",
    "TagName":"Add_Land_Mark_New",
    "TagValue":values.Add_Land_Mark_New
},

)

  }else if(selectedSubType === 'alternatenumberupdate'){
    obj.TransactionData.push({
      "Status": "Create",
      "TagName": "AlternateNo_Old",
      "TagValue": values.AlternateNo_Old
  },
  {
      "Status": "Create",
      "TagName": "AlternateNo_New",
      "TagValue": values.AlternateNo_New,
  })
  }
  else if(selectedSubType === 'worknumberupdate'){
    obj.TransactionData.push({
      "Status": "Create",
      "TagName": "WorkNo_Old",
      "TagValue": values.WorkNo_Old
  },
  {
      "Status": "Create",
      "TagName": "WorkNo_New",
      "TagValue": values.WorkNo_New,
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
        //  setNavigateTo("/advancesearch");
          setShowAlert(true);
          setIsLoader(false);
          setRequirementLoader(false);
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
  const getClientEnquiry = (e)=>{
    setIsLoader(true);
    setDisableOTP(true);
        let obj = {
          clientNumber: 
              e === 1
            ? customerData?.laClientID
            : customerData?.poClientID
    };
    let response = apiCalls.getClientEnquiry(obj);
    response
      .then((val) => {
        if (val?.data) {
          setClientEnquiryData(val?.data?.responseBody);
          const res = val?.data?.responseBody
          if(res?.rmblphone ){
            setDisableOTP(false);
          }
          if(selectedSubType === 'mobilenumberupdate'){
              form.setFieldsValue({  Mobile_Old :  res?.rmblphone})
          }else if(selectedSubType === 'emailupdate'){
            form.setFieldsValue({  Email_Old : res?.rinternet });
          }else if(selectedSubType === 'addresschange'){
            setIsOldLandMark(res?.cltaddR03);
       const address =[
        res?.cltaddR01,
        res?.cltaddR02,
        res?.cltaddR03,
        res?.cltaddR04,
        res?.cltaddR05,
        res?.cltpcode,
        res?.ctrycode,
      ].filter(Boolean).join(', ');

            form.setFieldsValue({
              Old_Address: address
    
            });
          }else if(selectedSubType === 'alternatenumberupdate'){
            form.setFieldsValue({  AlternateNo_Old : res?.cltphonE01 })
          }
          else if(selectedSubType === 'worknumberupdate'){
            form.setFieldsValue({  WorkNo_Old : res?.cltphonE02 })
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

  const POSActionsOnContactDetails = (values, status) => {
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
      Comments: values?.Comments,
      TransactionPayload: [
        {
          "Status": "Create",
          "TagName": "POSComments1",
          "TagValue":values?.Comments
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

  

  const searchLocationn = (e) => {
    setIsLoader(true);

    let response = apiCalls.searchLocation(e);
    response
      .then((val) => {
        setIsLoader(false);
        if (val?.data) {
          
          form.setFieldsValue({
            New_City:val?.data?.village?.city?.cityName,
            New_State:val?.data?.village?.city?.district?.state?.name,
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
        setIsLoader(false);
      });
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
  };

  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    setRequirementLoader(true);
    if((formData.customerchoice ===  "requestform" ) || (selectedSubType === "addresschange" ) || (selectedSubType )){
      saveRequest();
    }else{
      POSActionsOnContactDetails(null, "REJECTED");
    }
  };

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
     if (item === "branchreceivedate" || item.name === "branchreceivedate") {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue()
      let customerSignDate = moment(formFeilds?.customersigningdate + 1).format("MM/DD/YYYY");
      let dateDiffence = date_diff_indays(selectDate,customerSignDate)
      if(!formFeilds?.customersigningdate ||dateDiffence > 0){
        message.destroy();
        message.error({
          content: "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
          branchreceiveddate: "",
          branchreceivedate:""
        })
      return;
      }
      if(requestForSelection === "landmarkaddition"&&selectDate < todayDate){
       setShowReasonDelayField(true);
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
  };

  const handleRadioChange = (e) => {
    setIsShowOTPModal(false);
    
    setShowRaiseRequirementBtn(false);
    if (e.target.value === "otp") {
      setIsShowOTPModal(true);
      setShowRequestFormFields(false);
      setValidateOTPSuccess(false);
    } else {
      setShowRequestFormFields(true);
      setValidateOTPSuccess(true);
    }
    // if (e.target.value === "no") {
    //   setShowRaiseRequirementBtn(true);
    // }
  };

  const handleTitleCheckBox = (e) => {
    setSelectCheckBox(e.target.checked);
  };

  const handleDropdownChange = (e, item) => {
     setDisableRequestForm(false);
     const formData = form.getFieldValue();
    if (item?.name?.toLowerCase().includes("request_for")) {
      setRequestForSelection(e===1?"addresschange":"landmarkaddition");
    }
    if(formData.custRole && item?.name === 'custRole'){
      getClientEnquiry(formData.custRole);
    }

  };
  const handleTextLink = (item) => {
    if(item.label?.includes("Upload Address Proof")){
      setAddressProofModal(true);
    }
    if(item.name === "requestform" || item.linkValue?.toLowerCase() === "view"){
      const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;
      // Open the URL in a new tab
      window.open(url, '_blank');
    }
    if(item.name === "DedupeMatch"){
      setDeDupeModalOpen(true);
    }



  };
  const handleUploadLink = () => {
    setAddressProofModal(true);
  };
  const handleAddressModalClose=()=>{
    setUploadFiles([]);
    setAddressProofModal(false)
  }

  const handleLinkValue  =(item)=>{
    
    setAddressProofModal(true);
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
  
  const onBlurInput = (e, item) => {
     
     if(item.name ==="New_Pincode"){
      form.setFieldsValue({
        New_City:'',
        New_State:'',
      })
     }
   
      

    if(item.name ==="New_Pincode" && e && e.length ===6){
      searchLocationn(e)
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
          {Data[selectedSubType]?.Change_Fields && !isShowPOSScreen && (
            <>
              <DetailsForm
                data={Data[selectedSubType]?.Change_Fields}
                handleDropdownChange={handleDropdownChange}
                requestModeLU={requestModeLU}
                clientRoleLU={clientRoleLU}
                requestForLU={requestForLU}
               
              ></DetailsForm>
            </>
          )}
          {selectedSubType === "addresschange" &&
            requestForSelection === "landmarkaddition" && (
              <>
                <DetailsForm
                  data={
                     Data[requestForSelection]?.BOE_Details
                  }
                  handleRadioChange={handleRadioChange}
                  clientRoleLU={clientRoleLU}
                  handleAddLandMarkText={handleAddLandMarkText}
                  disableOTP={disableOTP}
                  onBlurInput = {onBlurInput}
                  disableRequestForm={disableRequestForm}
                ></DetailsForm>
                {!Data[requestForSelection]?.hideChecklist &&
                  !isShowPOSScreen &&
                  showRequestFormFields && (
                    <>
                      <div>
                        <div>
                          <DetailsForm
                            data={
                                  Data[requestForSelection]?.Checklist
                            }
                            callType={selectedCallType}
                            subType={selectedSubType}
                            suffix={!isShowPOSScreen && suffix}
                            handleDateChange={handleDateChange}
                            disabledDate={disabledDate}
                            handleUploadLink={handleUploadLink}
                            handleRadioChange={handleRadioChange}
                            handleLinkValue ={handleLinkValue}
                            form={form}
                            getUploadFiles={getUploadFiles}
                          ></DetailsForm>
                        </div>
                      </div>
                    </>
                  )}
                {showResonDelayField &&
                  !isShowPOSScreen &&
                  showRequestFormFields && (
                    <>
                      <DetailsForm
                        data={Data[requestForSelection]?.ReasonSubmission}
                        callType={selectedCallType}
                        subType={selectedSubType}
                        suffix={!isShowPOSScreen && suffix}
                        form={form}
                        getUploadFiles={getUploadFiles}
                      ></DetailsForm>
                    </>
                  )}
                   <DetailsForm
                        data={Data[selectedSubType]?.Comments}
                        callType={selectedCallType}
                        subType={selectedSubType}
                      ></DetailsForm>

                {/*Checklist Code End*/}
                {!Data[requestForSelection]?.Details_Buttons &&
                  !Data[requestForSelection]?.hideSubmitBtns && (
                    <>
                      <div className="contact-details-btn">
                       
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                        >
                          Submit
                        </Button>{" "}
                        {/* {showRaiseRequirementBtn && (
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
                      </div>
                    </>
                  )}
              </>
            )}
          {((selectedSubType === "addresschange" &&
            requestForSelection === "addresschange") ||
            selectedSubType !== "addresschange") && (
            <>
              <div>
                <DetailsForm
                  data={
                    !isShowPOSScreen
                      ? Data[selectedSubType]?.BOE_Details
                      : Data[selectedSubType]?.POS_Details ||
                        Data[selectedSubType]?.BOE_Details
                  }
                  subType={selectedSubType}
                  handleRadioChange={handleRadioChange}
                  requestModeLU={requestModeLU}
                  clientRoleLU={clientRoleLU}
                  handleDropdownChange={handleDropdownChange}
                  handleTextLink={handleTextLink}
                  handleLinkValue ={handleLinkValue}
                  handleTitleCheckBox={handleTitleCheckBox}
                  selectCheckBox={selectCheckBox}
                  disableOTP={disableOTP}
                  onBlurInput = {onBlurInput}
                  disableRequestForm={disableRequestForm}
                ></DetailsForm>
              </div>

              {/*Checklist Code Start*/}
              {!Data[selectedSubType]?.hideChecklist &&
                !isShowPOSScreen &&
                (requestForSelection === "addresschange" ||
                  showRequestFormFields) && (
                  <>
                    <div>
                      <div>
                        <DetailsForm
                          data={
                            isShowPOSScreen
                              ? Data[selectedSubType]?.POS_Checklist ||
                                Data[selectedSubType]?.Checklist
                              : Data[selectedSubType]?.Checklist
                          }
                          callType={selectedCallType}
                          subType={selectedSubType}
                          suffix={!isShowPOSScreen && suffix}
                          handleDateChange={handleDateChange}
                          disabledDate={disabledDate}
                          handleUploadLink={handleUploadLink}
                          handleRadioChange={handleRadioChange}
                          handleLinkValue ={handleLinkValue}
                          form={form}
                          getUploadFiles={getUploadFiles}
                          handleTextLink={handleTextLink }
                          
                        ></DetailsForm>
                      </div>
                    </div>
                  </>
                )}
                 {!isShowPOSScreen&&<>
                 <DetailsForm
                        data={Data[selectedSubType]?.Comments}
                        callType={selectedCallType}
                        subType={selectedSubType}
                      ></DetailsForm>
                      </>}
                      {customerData?.isBOE&&<>
                 <DetailsForm
                        data={Data[selectedSubType]?.BOE_Comments}
                        callType={selectedCallType}
                        subType={selectedSubType}
                      ></DetailsForm>
                      </>}

              {/*Checklist Code End*/}
              {!Data[selectedSubType]?.Details_Buttons &&
                !Data[selectedSubType]?.hideSubmitBtns && (
                  <>
                    <div className="contact-details-btn">
                      {/* {isShowPOSScreen && (
                        <>
                          <Button type="primary" className="primary-btn">
                            Back
                          </Button>
                        </>
                      )} */}
                      {/* {!showRaiseRequirementBtn&&<> */}
                      <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                        disabled={!isShowPOSScreen && !validateOTPSuccess&&requestForSelection!=="addresschange"}
                      >
                        {!isShowPOSScreen
                          ? "Submit"
                          : "Approve"}
                      </Button>{" "}
                       {
                        isShowPOSScreen ? <Button
                        type="primary"
                        className="primary-btn"
                        onClick={() => getRaiseRequirements()}
                      >
                        Raise Requirement
                      </Button> : 
                      <Button
                      type="primary"
                      className="primary-btn"
                      onClick={() => getRaiseRequirements()}
                    >
                      Raise Requirement
                    </Button>
                       }
                      {isShowPOSScreen &&(
                        <>
                          <Button
                            type="primary"
                            className="primary-btn"
                            onClick={() => getInternal()}
                          >
                       Internal Requirement                   
                           </Button>
                        </>
                      )}                     
                    </div>                    
                  </>
                )}
            </>
          )}
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
              <th>Role</th>
              <th>Number Updated Against</th>
            </tr>
            {duDupeData?.map((item,index) => (
            <tr key={index}>
            <td>{item.PolicyNumber}</td>
              <td>{item.Role}</td>
              <td>{item.EntityType}</td>
            </tr>
          ))}
           {duDupeData?.length === 0  &&
               <tr>
                  <td colspan="3">
               
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
              <td>3</td>
              <td>Copy of Ration Card</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={rationCardUploadFiles}
                      onRemove={handleRemove}
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
                        {/* {rationCardUploadFiles.name} */}
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
       sendOTPNumber={clientEnquiryData?.rmblphone} setDisableRequestForm={setDisableRequestForm} setValidateOTPSuccess={setValidateOTPSuccess}/>
      </>}
    </>
  );
};

const mapStateToProps = ({ state, policyDetails }) => {
  return { data: state?.PolicyDetailsReducer?.policyDetailsObj, policyDetails };
};

export default connect(mapStateToProps)(ContactDetails);

import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

import { Form, Spin, Button, Row, Col, Checkbox, message,Tooltip,Modal } from "antd";
import { PolicyBondData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import CheckBoxList from "../../utils/CheckBoxList";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import RaiseRequirementPopup from "../RaiseRequirementPopup";
import CloseIcon from "../../assets/images/close-icon.png";

const PolicyBond = (props) => {
  const loginInfo = useSelector((state) => state);
  //const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const {
    selectedCallType,
    selectedSubType,
    clientRoleLU,
    setSelectedSubType,
    typesForm,
    details,
    customerData,
    selectedSubTypeId,
    SelectedSubTypeVal,
    POSContactData
  } = props;
  const suffix = <img src={UploadIcon} alt="" />;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [showNewSignatureFields, setShowNewSignatureFields] = useState(false);
  const [showSiganatureProcess, setShowSignatureProcess] = useState(false);
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [isRTOSelection, setIsRTOSelection] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [isProcessLink,setIsProcessLink] = useState(''); 
  const [isDocLink,setIsDocLink] = useState('');
  const [isShowStampPaperCharges,setIsShowStampPaperCharges] = useState(false);

  const NBDuplicateObj ={}
  const NBPolicyBondHardCopyObj= {}

  useEffect(() => {
    setShowEmailFields(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setCheckedList([]);
    getProcesLink();
    if(selectedSubType==="sendsoftcopy"){
      form.setFieldsValue({
        'mobileNo': customerData?.mobileNo,
        'whatsAppNo':   customerData?.mobileNo,
        'emailId':  customerData?.emailID
      });

    }
  }, [selectedSubType]);

  useEffect(() => {
    if(POSContactData && customerData?.isPOS && selectedSubType==="duplicatebond"){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        NBDuplicateObj[element.tagName] = element.tagValue
      });

      setIsShowPOSScreen(true);
      form.setFieldsValue({
        StampDutyChargesReceived:NBDuplicateObj?.StampDutyChargesReceived,
        RequestorComments: NBDuplicateObj?.RequestorComments,
        ValidateSignature:NBDuplicateObj?.ValidateSignature,
        CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
      })
     
      PolicyBondData[selectedSubType]?.POS_Details?.forEach(element => {
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
    else if(POSContactData && customerData?.isPOS && selectedSubType==="policybondhardcopynotreceived"){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        NBPolicyBondHardCopyObj[element.tagName] = element.tagValue
      });

      setIsShowPOSScreen(true);
      form.setFieldsValue({
        DispatchType:NBPolicyBondHardCopyObj?.DispatchType,
        DispatchTo: NBPolicyBondHardCopyObj?.DispatchTo,
        ReasonForReprint:NBPolicyBondHardCopyObj?.ReasonForReprint,
        RequestorComments: NBPolicyBondHardCopyObj?.RequestorComments,
        ValidateSignature:NBPolicyBondHardCopyObj?.ValidateSignature,
        CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
      })
     
      PolicyBondData[selectedSubType]?.NBUser_Details?.forEach(element => {
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

    },[])

  const handleChange = (value) => {
    setShowPhoneNumber(false);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    // If the checkbox is already checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
    }
    if (value?.includes("Send Soft Copy")) {
      setSelectedSubType("sendsoftcopy");
      typesForm?.setFieldsValue({ subType: 2 });
    }
  };

  const handleDropdownChange = (e, item) => {
    if (item?.label?.includes("RTO Status")) {
      setIsRTOSelection(e);
    }
  };
  const handleTextLink = (item) => {
    if(item?.label?.includes("View Stamp Duty Charges")){
      setIsShowStampPaperCharges(true);
    }
    if (item?.linkValue?.toLowerCase() === "view") {
      const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
      window.open(url, "_blank");
    }
  };

  const handleTitleCheckBox = (e, item) => {
    setSelectCheckBox(false);
    setShowNewSignatureFields(false);
    setShowSignatureProcess(false);
    if (item?.label?.includes("Update New Signaure")) {
      setSelectCheckBox(item.name);
      setShowNewSignatureFields(true);
    } else if (item?.label?.includes("Share Signature Update Process")) {
      setShowSignatureProcess(true);
      setSelectCheckBox(item.name);
    }
  };
  const toggleInputField = (field, item, index) => {
    setShowEmailFields(true);
    switch (field) {
      case "phone":
        setShowPhoneNumber(!showPhoneNumber);
        setActiveMobileIcons((prevIcons) => {
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
      case "email":
        setShowEmailAddress(!showEmailAddress);
        setActiveEmailIcons((prevIcons) => {
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
      case "whatsapp":
        setShowWhatsApp(!showWhatsApp);
        setActiveWhatsAppIcons((prevIcons) => {
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
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };

  const handleUploadLink = () => {};

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

  const handleRadioChange = (e, item) => {
    setShowRaiseRequirementBtn(false);
    // if(selectedSubType==="changeinmodefrequency"){
    //    if(e.target.value === "otp"){
    //     setIsShowOTPModal(true);
    //     setIsShowRequestDetails(false);
    //   }
    //   else if(e.target.value === "requestform"){
    //    setIsShowRequestDetails(true);
    //   }
    // }
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
    if (item === "branchreceiveddate" || item === "RequestDateTime"||item==="BranchReceivedDate") {
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue();
      let customerSignDate = moment(formFeilds?.CustomerSigningDate + 1).format(
        "MM/DD/YYYY"
      );
      let dateDiffence = date_diff_indays(selectDate, customerSignDate);
      if (!formFeilds?.CustomerSigningDate || dateDiffence > 0) {
        message.destroy();
        message.error({
          content:
            "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({ 
          branchreceiveddate: "",
          BranchReceivedDate: ""
        });
        return;
      } else {
        if(selectedSubType==="duplicatebond"){
        PolicyBondData[selectedSubType]?.RequestDuplicatePolicyBondFields?.forEach((element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate < todayDate
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          } else if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate >= todayDate
          ) {
            element.hide = true;
            setShowReasonDelayField(false);
          }
        });
      }
        else if(selectedSubType==="policybondhardcopynotreceived"){
        PolicyBondData[selectedSubType]?.Register_Request_Fields?.forEach((element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate < todayDate
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          } else if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate >= todayDate
          ) {
            element.hide = true;
            setShowReasonDelayField(false);
          }
        });
      }
      else if(selectedSubType==="uploadpolicybonddeliveryconfirmation"){
        PolicyBondData[selectedSubType]?.BOE_Details?.forEach((element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate < todayDate
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          } else if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate >= todayDate
          ) {
            element.hide = true;
            setShowReasonDelayField(false);
          }
        });
      }
      }
    }
  };
  const getUploadFiles = (listOfUploadFiles) => {
    const updatedUploadList = listOfUploadFiles?.map((obj) => {
      // Create a new object without the propertyToDelete property
      const { labelName, ...newObject } = obj;
      return newObject;
    });
    // Update the state with the new list
    setUploadFiles(updatedUploadList);
  };
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };
  const handleLabelLink =()=>{

  }
  //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={PolicyBondData[selectedSubType]?.[formType]}
        subType={selectedSubType}
        suffix={!isShowPOSScreen && suffix}
        handleUploadLink={handleUploadLink}
        form={form}
        handleRadioChange={handleRadioChange}
        handleDateChange={handleDateChange}
        handleTextLink={handleTextLink}
        handleTitleCheckBox={handleTitleCheckBox}
        clientRoleLU={clientRoleLU}
        handleDropdownChange={handleDropdownChange}
        selectCheckBox={selectCheckBox}
        toggleInputField={toggleInputField}
        activeEmailIcons={activeEmailIcons}
        activeMobileIcons={activeMobileIcons}
        activeWhatsAppIcons={activeWhatsAppIcons}
        getUploadFiles={getUploadFiles}
        disabledDate={disabledDate}
        handleLabelLink={handleLabelLink}
      ></DetailsForm>
    );
  };

  const getTransactionData = (values) => {
    if (selectedSubType === "policybondhardcopynotreceived") {
      return [
        {
          Status: "Create",
          TagName: "WelcomeCallDispositon",
          TagValue: values?.WelcomeCallDispositon||"",
        },
        {
          Status: "Create",
          TagName: "PODNo",
          TagValue: values?.PODNo||"",
        },

        {
          Status: "Create",
          TagName: "ReceivedBy",
          TagValue: values?.ReceivedBy||"",
        },
        {
          Status: "Create",
          TagName: "ReceivedOn",
          TagValue: values?.ReceivedOn||"",
        },
        {
          Status: "Create",
          TagName: "DispatchDate",
          TagValue: values?.DispatchDate||"",
        },
        {
          Status: "Create",
          TagName: "CustomerAddress",
          TagValue: values?.CustomerAddress||"",
        },
        {
          Status: "Create",
          TagName: "DispatchMode",
          TagValue: values?.DispatchMode||"",
        },
        {
          Status: "Create",
          TagName: "RTOStatus",
          TagValue: values?.RTOStatus||"",
        },
        {
          Status: "Create",
          TagName: "PhysicalDispatchType",
          TagValue: values?.PhysicalDispatchType||"",
        },
        {
          Status: "Create",
          TagName: "DispatchTo",
          TagValue: values?.DispatchTo||"",
        },
        {
          Status: "Create",
          TagName: "ReasonForReprint",
          TagValue: values?.ReasonForReprint||"",
        },

        {
          Status: "Create",
          TagName: "RequestorComments",
          TagValue: values?.RequestorComments||"",
        },
      ];
    } else if (selectedSubType === "uploadpolicybonddeliveryconfirmation") {
      return [
        { Status: "Create", TagName: "SentToBranch", TagValue: values?.SentToBranch ||"" },
        { Status: "Create", TagName: "BranchName", TagValue: values?.BranchName || ""},
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"}
      ];
    }
    else if (selectedSubType === "duplicatebond") {
      return [
        { Status: "Create", TagName: "DispatchDate", TagValue: values?.DispatchDate ||"" },
        { Status: "Create", TagName: "DispatchMode", TagValue: values?.DispatchMode || ""},
        { Status: "Create", TagName: "PODNo", TagValue: values?.PODNo ||"" },
        { Status: "Create", TagName: "ReceivedOn", TagValue: values?.ReceivedOn || ""},
        { Status: "Create", TagName: "ReceivedBy", TagValue: values?.ReceivedBy ||"" },
        { Status: "Create", TagName: "Address", TagValue: values?.Address || ""},
        { Status: "Create", TagName: "WelcomeCallDispositon", TagValue: values?.WelcomeCallDispositon ||"" },
        { Status: "Create", TagName: "RTOStatus", TagValue: values?.RTOStatus || ""},
        { Status: "Create", TagName: "RTOReason", TagValue: values?.RTOReason ||"" },
        { Status: "Create", TagName: "PolicyRedispatch", TagValue: values?.PolicyRedispatch || ""},
        { Status: "Create", TagName: "RedispatchMode", TagValue: values?.RedispatchMode ||"" },
        { Status: "Create", TagName: "RedispatchDate", TagValue: values?.RedispatchDate || ""},
        { Status: "Create", TagName: "RePODNo", TagValue: values?.RePODNo ||"" },
        { Status: "Create", TagName: "ReReceivedBy", TagValue: values?.ReReceivedBy ||"" },
        { Status: "Create", TagName: "SentToBranch", TagValue: values?.SentToBranch ||"" },
        { Status: "Create", TagName: "BranchName", TagValue: values?.BranchName ||"" },
        { Status: "Create", TagName: "ViewStampDutyCharges", TagValue: values?.ViewStampDutyCharges ||"" },
        { Status: "Create", TagName: "StampDutyChargesReceived", TagValue: values?.StampDutyChargesReceived ||"" },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature ||"" },
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"}
      ];
    }
    else if (selectedSubType === "sendsoftcopy") {
      return [
        {Status: "Create", TagName: "FileType", TagValue: "POLICYBOND"}
      ];
    }
  };

  const handleSubmit = (values) => {
    if (!showEmailFields && selectedSubType === "sendsoftcopy") {
      message.destroy();
      message.warning({
        content: "Please select atleast one communication.",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values.requestchannel, // Required
      Category: ((selectedSubType==="duplicatebond"&&checkedList?.includes("View Dispatch Details"))||selectedSubType==="uploadpolicybonddeliveryconfirmation") ||
      (selectedSubType==="policybondhardcopynotreceived"&&checkedList?.includes("View Dispatch Details")) ? 1 : 
      ((selectedSubType==="duplicatebond"&&checkedList?.includes("Request Duplicate Policy Bond")) || 
      (selectedSubType==="policybondhardcopynotreceived"&&checkedList?.includes("Register Request"))) ? 2 : 3,
      ApplicationNo:
        details?.policyDetailsObj?.identifiers?.applicationNo ||
        customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo:
        details?.policyDetailsObj?.identifiers?.policyNo ||
        customerData?.policyNo, // Required
      CustomerId: 456,
      CustRole: values.custRole,
      policyStatus:
        details?.policyDetailsObj?.planAndStatus?.policyStatus ||
        customerData?.policyStatus,
      proposerName:
        details?.policyDetailsObj?.identifiers?.po_Name ||
        customerData?.po_Name,
      plan:
        details?.policyDetailsObj?.planAndStatus?.planName ||
        customerData?.planName,
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.name,
      ModifiedOn: new Date(),
      ModifiedByRef: "Test123",
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime: values?.BranchReceivedDate
      ? new Date(values?.BranchReceivedDate)
      : new Date(),
      ReasonDelayed: values?.ReasonForDelay,
      CustSignDateTime: values?.CustomerSigningDate
        ? new Date(values?.CustomerSigningDate)
        : new Date(),
      TransactionData: getTransactionData(values) || [],
      Uploads: uploadFiles || [],
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

    let response = apiCalls.genericAPI(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle("Request Created Successfully");
          let successMessage =
            val?.data?.tat > 0
              ? `Ticket ID Number ${
                  val?.data?.srvReqRefNo
                }. Your request will be processed in ${
                  val?.data?.tat || 0
                } days`
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
  const getRaiseRequirements = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: props?.selectedSubTypeId,
      Role: loginInfo?.userProfileInfo?.profileObj?.role === "boeadmin" ? 1 : 0,
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
    //     setRequirementLoader(true);
     if(raiseRequirementOpen){
          handleSubmit(formData);
        }
  };
  const popupClose = () => {
    setRaiseRequirementOpen(false);
  };

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
          {selectedSubType === "policybondhardcopynotreceived" && (
            <>
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
                        label="View Dispatch Details"
                        name="ViewDispatchDetails"
                        className="checkbox-gap"
                      >
                        <Checkbox
                          value="View Dispatch Details"
                          checked={checkedList.includes(
                            "View Dispatch Details"
                          )}
                          onChange={() => handleChange("View Dispatch Details")}
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
                      <Form.Item label="Send Soft Copy" name="SendSoftCopy">
                        <Checkbox
                          value="Send Soft Copy"
                          checked={checkedList.includes("Send Soft Copy")}
                          onChange={() => handleChange("Send Soft Copy")}
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
                        name="RegisterRequest"
                      >
                        <Checkbox
                          value="Register Request"
                          checked={checkedList?.includes("Register Request")}
                          onChange={() => handleChange("Register Request")}
                        ></Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                  {checkedList?.includes("View Dispatch Details") && (
                    <>
                      {renderDetailsForm("View_Dispatch_Details")}
                      {isRTOSelection === "yes" && (
                        <>{renderDetailsForm("RTO_StatusFields")}</>
                      )}
                    </>
                  )}
                  {checkedList?.includes("Register Request") && (
                    <>
                      {renderDetailsForm("Register_Request_Fields")}
                      {/* {showResonDelayField && (
                        <>{renderDetailsForm("ReasonSubmission")}</>
                      )} */}
                      {renderDetailsForm("Comments")}
                    </>
                  )}
                  {checkedList?.includes("Send Soft Copy") && (
                    <>
                      {renderDetailsForm("Send_SoftCopy_Fileds")}
                      {showEmailFields && (
                        <>
                          <ContactForm
                            showEmailAddress={showEmailAddress}
                            showPhoneNumber={showPhoneNumber}
                            showWhatsApp={showWhatsApp}
                          />
                        </>
                      )}
                      <DetailsForm
                        data={PolicyBondData[selectedSubType]?.Comments}
                        subType={selectedSubType}
                      ></DetailsForm>
                    </>
                  )}
                </>
              )}
              {isShowPOSScreen && <>{renderDetailsForm("NBUser_Details")}</>}
              {(checkedList?.length > 0 || isShowPOSScreen) && (
                <>
                  <div className="contact-details-btn">
                    {/* {!showRaiseRequirementBtn && (
              <> */}
                    <Button
                      type="primary"
                      className="primary-btn"
                      htmlType="submit"
                    >
                      {!isShowPOSScreen ? "Submit" : "Approve"}
                    </Button>
                    {/* </>
            )} */}

                    {(isShowPOSScreen || !isShowPOSScreen) && (
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
                </>
              )}
            </>
          )}

          {selectedSubType === "sendsoftcopy" && (
            <>
              {renderDetailsForm("Send_SoftCopy_Fileds")}
              {showEmailFields && (
                <>
                  <ContactForm
                    showEmailAddress={showEmailAddress}
                    showPhoneNumber={showPhoneNumber}
                    showWhatsApp={showWhatsApp}
                  />
                </>
              )}
              <div className="contact-details-btn">
                {/* {!showRaiseRequirementBtn && (
              <> */}
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                >
                  {!isShowPOSScreen ? "Submit" : "Approve"}
                </Button>
                {/* </>
            )} */}

                {/* {(isShowPOSScreen || !isShowPOSScreen) && (
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
            </>
          )}

          {selectedSubType === "uploadpolicybonddeliveryconfirmation" && (
            <>
              {renderDetailsForm("BOE_Details")}
              {showResonDelayField && (
                <>{renderDetailsForm("ReasonSubmission")}</>
              )}
              {renderDetailsForm("Comments")}
              <div className="contact-details-btn">
                {selectedSubType === "panupdate" && (
                  <>
                    <Button type="primary" className="primary-btn">
                      Validate
                    </Button>
                  </>
                )}
                {/* {!showRaiseRequirementBtn && (
              <> */}
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                >
                  {!isShowPOSScreen ? "Submit" : "Approve"}
                </Button>
                {/* </>
            )} */}

                {(isShowPOSScreen || !isShowPOSScreen) && (
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
            </>
          )}

          {/*Duplicate Bond SubType Code Start */}
          {selectedSubType === "duplicatebond" && (
            <>
              {!isShowPOSScreen && (
                <>
                  <CheckBoxList
                    checkedList={checkedList}
                    handleChange={handleChange}
                    options={[
                      {
                        label: "View Dispatch Details",
                        value: "View Dispatch Details",
                        name: "ViewExistingAgentCodeDetails",
                      },
                      {
                        label: "Request Duplicate Policy Bond",
                        value: "Request Duplicate Policy Bond",
                        name: "UpdateAgentCodeDetails",
                      },
                    ]}
                  />
                  {checkedList?.includes("View Dispatch Details") && (
                    <>
                      {renderDetailsForm("BOE_Details")}
                      {renderDetailsForm("RTOYesStatusFields")}
                    </>
                  )}
                  {checkedList?.includes("Request Duplicate Policy Bond") &&
                    renderDetailsForm("RequestDuplicatePolicyBondFields")}
                </>
              )}
              {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
              {(checkedList?.length > 0 || isShowPOSScreen) && (
                  <>
              <div className="contact-details-btn">
              
                    <Button
                      type="primary"
                      className="primary-btn"
                      htmlType="submit"
                    >
                      {!isShowPOSScreen ? "Submit" : "Approve"}
                    </Button>
                {(isShowPOSScreen || !isShowPOSScreen) && (
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
              </>
              )}
            </>
          )}
          {/*Duplicate Bond SubType Code End */}
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
      <RaiseRequirementPopup
        raiseRequerimentList={raiseRequerimentList}
        raiseRequirementOpen={raiseRequirementOpen}
        requirementModalLoader={requirementModalLoader}
        handleRequirementSubmit={handleRequirementSubmit}
        popupClose={popupClose}
      />
       <Modal
        title="Stamp paper charges"
        open={isShowStampPaperCharges}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setIsShowStampPaperCharges(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container" style={{ marginTop: "20px" }}>
          <table className="responsive-table">
            <tr>
              <th>State Names</th>
              <th>Stamp Paper Rs.</th>
            </tr>
            <tr>
              <td>All States except (Maharashtra, Bihar & West Bengal)</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Maharashtra</td>
              <td>500</td>
            </tr>
            <tr>
              <td>Bihar</td>
              <td>200</td>
            </tr>
            <tr>
              <td>West Bengal</td>
              <td>50</td>
            </tr>
           {/* {BankduDupeData?.length === 0  &&
               <tr>
                  <td colspan="3">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>} */}
          </table>
        </div>
      </Modal>
    </>
  );
};

export default PolicyBond;

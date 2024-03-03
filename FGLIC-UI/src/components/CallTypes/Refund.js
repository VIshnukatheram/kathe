import React, { useEffect, useState } from "react";
import { connect,useSelector } from "react-redux";

import { Form, Spin, Button, Row, Col, Checkbox,message,Modal } from "antd";
import { RefundData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import CheckBoxList from "../../utils/CheckBoxList";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import OTPModal from "../../utils/OTPModal";

const Refund = (props) => {
  const loginInfo = useSelector(state => state);

  const { selectedCallType, selectedSubType, clientRoleLU,setSelectedSubType,typesForm,details,customerData,POSContactData } = props;
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
  const [isRTOSelection,setIsRTOSelection] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [uploadFiles,setUploadFiles] = useState([]);
  const [isShowOTPModal,setIsShowOTPModal] = useState(false);
  const [isShowRequestDetails,setIsShowRequestDetails] = useState(false);
  const [ClientEnquiry, setClientEnquiry]= useState({});
  const [disableOTP,setDisableOTP] = useState(false);
  const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
  const [disableRequestForm,setDisableRequestForm] = useState(false);
  const [updateFields, setUpdateFields] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);

  const paMandateCancellationObj={}
  useEffect(()=>{
    setShowEmailFields(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    getClientEnquiry();
    setDisableRequestForm(false);
    form.resetFields();
  },[selectedSubType]);

  useEffect(() => {
     if(POSContactData && customerData?.isPOS && (selectedSubType==="autopaybouncecharges")){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        paMandateCancellationObj[element.tagName] = element.tagValue
      });

      setIsShowPOSScreen(true);
      setUpdateFields(false);
      form.setFieldsValue({
        DueDate:paMandateCancellationObj?.DueDate,
        DebitDate:paMandateCancellationObj?.DebitDate,
        DebitAmount:paMandateCancellationObj?.DebitAmount,
        DebitStatus:paMandateCancellationObj?.DebitStatus,
        DebitStatusReceivedOn:paMandateCancellationObj?.DebitStatusReceivedOn,
        PaymentDebitType:paMandateCancellationObj?.PaymentDebitType,
        BounceCharges:paMandateCancellationObj?.BounceCharges,
        RequestorComments: paMandateCancellationObj?.RequestorComments,
        ValidateSignature:paMandateCancellationObj?.ValidateSignature,
        CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
      })
      if(paMandateCancellationObj?.ValidatedBy==="requestform"){
        RefundData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||
          element?.label==="Signature Validated"){
            element.hide= false;
            setUpdateFields(true);
          }
        });
      }
      else if(paMandateCancellationObj?.ValidatedBy==="otp"){
        RefundData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||
          element?.label==="Signature Validated"){
            element.hide= true;
            setUpdateFields(true);
          }
        });
      }
        RefundData[selectedSubType]?.POS_Details?.forEach(element => {
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

  const getClientEnquiry = async () => {
    try {
      setIsLoading(true);
      //setDisableOTP(true);
      const clientNumber= customerData?.poClientID;
      const obj = { clientNumber };
      const response = await apiCalls.getClientEnquiry(obj);
      if (response?.data) {
        const res = response?.data?.responseBody;
        setClientEnquiry(res);
        // if(res?.rmblphone){
        //     setDisableOTP(false);
        //   }
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
  const handleError = (errorMessage) => {
    message.error({
      content: errorMessage,
      className: "custom-msg",
      duration: 2,
    });
  };

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
    if(value?.includes("Send Soft Copy")){
        setSelectedSubType("sendsoftcopy");
        typesForm?.setFieldsValue({subType: 2})
    }
  };

  const handleDropdownChange = (e,item) => {
    if(item?.label?.includes("RTO Status")){
        setIsRTOSelection(e);
    }
  };
  const handleTextLink=(item)=>{
    if(item?.linkValue?.toLowerCase() === "view"){
     const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
     window.open(url, '_blank');
   }
 }

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

  const handleRadioChange = (e, item) => {
    setShowRaiseRequirementBtn(false);
    setIsShowOTPModal(false)
    if(selectedSubType==="autopaybouncecharges"){
         if(e.target.value === "otp"){
            setIsShowOTPModal(true);
            setIsShowRequestDetails(false);
          }
          else if(e.target.value === "requestform"){
           setIsShowRequestDetails(true);
          }
      //  else if(selectionValue === "no"&&item?.label?.includes("Validate Signature")){
      //   setShowRaiseRequirementBtn(true);
      // }
      // else if(selectionValue === "yes"&&item?.label?.includes("Validate Signature")){
      //   setShowRaiseRequirementBtn(false);
      // }
    }
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
    if (item === "branchreceiveddate"||item==="RequestDateTime") {
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
        RefundData[selectedSubType]?.Request_Details?.forEach(element => {
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
  const getUploadFiles=(listOfUploadFiles)=>{
    const updatedUploadList = listOfUploadFiles?.map((obj) => {
      // Create a new object without the propertyToDelete property
      const { labelName, ...newObject } = obj;
      return newObject;
    });
    // Update the state with the new list
    setUploadFiles(updatedUploadList);

  }
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };
  //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={RefundData[selectedSubType]?.[formType]}
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
        disableRequestForm={disableRequestForm}
        disableOTP={disableOTP}
        onBlurInput={onBlurInput}
      ></DetailsForm>
    );
  };

  const onBlurInput =()=>{

  }


  const getTransactionData = (values) => {
    if (selectedSubType === "autopaybouncecharges") {
      return [
        { Status: "Create", TagName: "DueDate", TagValue: values?.DueDate || "" },
        { Status: "Create", TagName: "DebitDate", TagValue: values?.DebitDate || "" },
        { Status: "Create", TagName: "DebitAmount", TagValue: values?.DebitAmount || ""},
        { Status: "Create", TagName: "DebitStatus", TagValue: values?.DebitStatus || "" },
        { Status: "Create", TagName: "DebitStatusReceivedOn", TagValue: values?.DebitStatusReceivedOn || ""},
        { Status: "Create", TagName: "PaymentDebitType", TagValue: values?.PaymentDebitType || ""},
        { Status: "Create", TagName: "BounceCharges", TagValue: values?.BounceCharges || ""},
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature || ""},
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        {
          "Status": "Create",
          "TagName": "ValidatedBy",
          "TagValue": values.customerchoice ? values.customerchoice : 'form'
      },
      ];
    } 
  };

  const handleSubmit = (values) => {
    // if(selectedSubType==="autopaybouncecharges") {
    //     setIsShowPOSScreen(!isShowPOSScreen);
    //     return;
    // } 
    // if(!showEmailFields&&selectedSubType==="sendsoftcopy"){
    //   message.destroy()
    //   message.warning({
    //     content:
    //       "Please select atleast one communication.",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values?.requestchannel, // Required
      Category: 2,
      ApplicationNo:
      details?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: 456,
      "CustRole":values?.custRole,
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
      RequestDateTime:  values?.branchreceiveddate
      ? new Date(values?.branchreceiveddate)
      : new Date(),
      ReasonDelayed: values?.ReasonForDelay,
      CustSignDateTime: values?.CustomerSigningDate
      ? new Date(values?.CustomerSigningDate)
      : new Date(),
      "TransactionData": getTransactionData(values),
      "Uploads": uploadFiles || [
        
      ],
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
  }
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

  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    setRequirementLoader(true);
    if((formData.customerchoice ===  "requestform" ) || (selectedSubType === "addresschange" )){
      handleSubmit();
    }else{
      POSActionsOnContactDetails(null, "REJECTED");
    }

  };

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
      
          {selectedSubType==="autopaybouncecharges"&&<>
          {!isShowPOSScreen&&<>
            {renderDetailsForm("BOE_Details")}
            {renderDetailsForm("Customer_Choice_Details")}
            {isShowRequestDetails&&<>
            {renderDetailsForm("Request_Details")}
            </>}
            {renderDetailsForm("Comments")}
          </>}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
          </>}
         
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
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
          </div>
          </>}
       
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

{isShowOTPModal &&<>
      <OTPModal customerData={customerData} isShowOTPModal={isShowOTPModal} setIsShowOTPModal={setIsShowOTPModal}
       sendOTPNumber={ClientEnquiry?.rmblphone} setDisableRequestForm={setDisableRequestForm} setValidateOTPSuccess={setValidateOTPSuccess}/>
      </>}

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
    </>
  );
};

export default Refund;

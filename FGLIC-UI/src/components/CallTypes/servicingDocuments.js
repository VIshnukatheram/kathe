import React, { useState, useEffect } from 'react'; 
import { Data } from "../../mainconfig";
import { Button, Form,Modal, Spin, message } from "antd";
import ChecklistDetails from '../../utils/ChecklistDetails';
import DetailsForm from '../../utils/DetailsForm';
import apiCalls from '../../api/apiCalls';
import PopupAlert from '../popupAlert';
import ContactForm from '../../utils/ContactForm';
import moment from 'moment';
import { connect,useSelector } from "react-redux";
import dayjs from "dayjs";
import RaiseRequirementPopup from '../RaiseRequirementPopup';


const ServicingDocuments = (props) => { 
  const loginInfo = useSelector(state => state);
    const [form] = Form.useForm();
    const { selectedCallType, selectedSubType,sisLU,details,customerData } = props;
    const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
    const [isShowTransferFields, setIsShowTransferFields] = useState(false);
    const [data,setData] = useState({
      'mobileNo':  props?.customerData?.mobileNo,
      'whatsAppNo':  props?.customerData?.mobileNo,
      'emailId':  props?.customerData?.emailID,
    });
    const [showEmailFields,setShowEmailFields] = useState(false);
    const [showDateRangeFields,setDateRangeFields] = useState(false);
    const [showPaymentCheckBox,setShowPaymentsCheckBox] = useState(false);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [alertTitle,setAlertTitle]  = useState('');
  const [navigateTo,setNavigateTo]  = useState('');
  const [alertData,setAlertData]  = useState('');
  const [showAlert,setShowAlert]  = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
const [showEmailAddress, setShowEmailAddress] = useState(false);
const [showWhatsApp, setShowWhatsApp] = useState(false)
const [serviceRequestId, setServiceRequestId] = useState(null);
const [isRcdDate,setIsRcdDate] = useState(null);
const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
const [requirementModalLoader, setRequirementLoader] = useState(false);
const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
    const [inputValues, setInputValues] = useState({
      isShowSMSInput: false,
      isShowWhatsAppInput: false,
      isShowEmailInput: false,
    });

    useEffect(()=>{
      form.resetFields();
      setShowPhoneNumber(false);
      setShowEmailAddress(false);
      setShowWhatsApp(false);
      getClientEnquiry()
    },[selectedSubType]); // eslint-disable-next-line arrow-body-style

    const getClientEnquiry = ()=>{
      setIsLoading(true);
          let obj = {
            clientNumber:  customerData?.poClientID
      };
      let response = apiCalls.getClientEnquiry(obj);
      response
        .then((val) => {
          if (val?.data) {
            //setClientEnquiryData(val?.data?.responseBody);
            const res = val?.data?.responseBody;
          form.setFieldsValue({
            'mobileNo': res?.rmblphone,
            'whatsAppNo':  res?.rmblphone,
            'emailId': res?.rinternet
          });
  
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
   
    const handleCancel =()=>{setIsModalOpen(false)}
    const handleDateChange  =(e,item)=>{
      if(selectedSubType==="unitstatement"&&item?.lable?.includes("From Date")){

      }
    }
    const handleButtonClick =()=>{}
    const handleDropdownChange =()=>{}
    const handleTitleCheckBox = (e,item) => {
      if(item?.name?.toLowerCase() === "isdaterange"){
        setDateRangeFields(e.target.checked);
        setShowPaymentsCheckBox(false);
      }
      else {
        setShowPaymentsCheckBox(e.target.checked);
        setDateRangeFields(false);
      }
      
    }
    const toggleInputField = (field) => {
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
    const warning = () => {
      Modal.warning({
        content: 'Please select your preferred mode through which you wish to have the receipt',
      });
    };

    const getTransactionData = (values) => {
      if (selectedSubType === "sis") {
        return [
          {
            "Status": "Create",
            "TagName": "Template",
            "TagValue": "SENDDOCS"
        },
         // { Status: "Create", TagName: "sisDocumentType", TagValue: values.sisDocumentType },
         {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        ];
      } 
      else if(selectedSubType === "forms"){
        return [
          {
            "Status": "Create",
            "TagName": "Template",
            "TagValue": "SENDDOCS"
        },
          { Status: "Create", TagName: "sisDocumentType", TagValue: values.sisDocumentType },
          {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        ];
      }

      else if(selectedSubType === "premiumpaidcertificate"){
        return [
          { Status: "Create", TagName: "Template", TagValue: "SENDDOCS" },
          { Status: "Create", TagName: "Year", TagValue: values.premiumpaidcertificate },
          {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        ];
      }
      else if(selectedSubType === "unitstatement"){
        return [
          {
            "Status": "Create",
            "TagName": "Template",
            "TagValue": "SENDDOCS"
        },
          { Status: "Create", TagName: "FromDate", TagValue: values.FromDate ? moment(values.FromDate +1).format("DD/MM/YYYY") :values.FromDate  },
          { Status: "Create", TagName: "ToDate", TagValue: values.ToDate  ? moment(values.ToDate +1).format("DD/MM/YYYY") :values.ToDate  },
          {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        ];
      }
      else  if (selectedSubType === "discontinouancenotice" || selectedSubType === "firstpremiumreceipt") {
        return [
          {
            "Status": "Create",
            "TagName": "Template",
            "TagValue": "SENDDOCS"
        },
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        ];
      } 
      else if(selectedSubType === "renewalpremiumreceipt"){
        return [
        {
          "Status": "Create",
          "TagName": "IsDateRange",
          "TagValue": showDateRangeFields ? true : false
      },
      {
          "Status": "Create",
          "TagName": "FromDate",
          "TagValue": values.FromDate ? new Date(values.FromDate):""
      },
      {
          "Status": "Create",
          "TagName": "ToDate",
          "TagValue": values.ToDate  ? new Date(values.ToDate) :""
      },
      {
          "Status": "Create",
          "TagName": "Template",
          "TagValue": "SENDDOCS"
      },
      {
          "Status": "Create",
          "TagName": "Client_Id",
          "TagValue": customerData?.poClientID
      }

        ];
      }

    };
    const convertDate = (inputDate) => {
      const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
      return formattedDate;
    };
    const handleSubmit =(values)=>{
      // if(selectedSubType?.includes("renewalpremiumreceipt")&&showPaymentCheckBox){
      //   //setIsModalOpen(true);
      //   warning();
      // }
       if(selectedSubType?.includes("premiumpaidcertificate")){
        

      //   const selectedCommTyp = Object.keys(inputValues).filter((ele)=>{
      //     return inputValues[ele] === true;
      // });
            
        if(!showEmailFields){
          setIsLoading(false);

          message.destroy();
          message.error({
            content: "Please Select Communication Type",
            className: "custom-msg",
            duration: 3,
          });
       
  
         return
        }


        const obj = {
          CallType: props?.selectedCallType, // Required
          SubType: props?.selectedSubTypeId, // Required
          RequestSource: 1, // Required
          RequestChannel: values.requestchannel, // Required
          Category: 2,
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
          RequestDateTime: new Date(),
          ReasonDelayed: values.resonfordelay,
          CustSignDateTime: values?.customersigningdate
            ? new Date(values?.customersigningdate)
            : new Date(),
            TransactionData: getTransactionData(values),
          "CommunicationRequest":[ 
          
        ],
        Uploads: [],
      }

      if(showEmailAddress){
        obj.CommunicationRequest.push(
          {
            "SrvReqRefNo": "",
            "TemplateID": "7",
            "CommType": 2, // Use the integer value corresponding to the CommType enum (1 for SMS, 2 for EMAIL, 3 for WHATSAPP)
            "ReceipientTo": "fgtesting8@gmail.com",
            "ReceipientCC": "fgtesting8@gmail.com",
            "MobileNos": "",
            "ScheduledTime": "2023-10-31T10:30:00", // Use a valid date-time format
            "CommBody": "",
            "Attachments": null
        }
        )
      }

      if(showPhoneNumber || showWhatsApp){
        obj.CommunicationRequest.push(
          {
            "SrvReqRefNo": "",
            "TemplateID": "5",
            "CommType": 1, // Use the integer value corresponding to the CommType enum (1 for SMS, 2 for EMAIL, 3 for WHATSAPP)
            "ReceipientTo": "",
            "ReceipientCC": "",
            "MobileNos": "9892686867",
            "ScheduledTime": "2023-10-31T10:30:00", // Use a valid date-time format
            "CommBody": "",
            "Attachments": null
        }
        )
      }
      setIsLoading(true);
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
        if (val?.data) {
            setAlertTitle('Request Created Successfully');
            setAlertData( `${'Ticket No ' + val?.data?.srvReqRefNo}`);
            setNavigateTo('/advancesearch')
            setShowAlert(true);
            setIsLoading(false);
        } else {
          message.error({
            content: val?.data?.responseBody?.errormessage || "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
          setIsLoading(false);
        }
      }).catch((err)=>{
        setIsLoading(false);
      })
      }
      else{
        if(!showEmailFields&&(selectedSubType==="sis"||selectedSubType==="forms" || selectedSubType=== 'firstpremiumreceipt'||selectedSubType=== 'unitstatement'||
        selectedSubType==="discontinouancenotice" || selectedSubType==="renewalpremiumreceipt")){
          message.destroy()
          message.warning({
            content:
              "Please select atleast one communication.",
            className: "custom-msg",
            duration: 2,
          });
          return;
        }
        else if(selectedSubType==="unitstatement"){
          if (values?.FromDate > values?.ToDate) {
            message.destroy();
            message.warning({
              content: "To Date should not be less than the From Date.",
              className: "custom-msg",
              duration: 2,
            });
            return;
          }
        }
          else if(selectedSubType==="renewalpremiumreceipt"){
            if (values?.FromDate > new Date()) {
              message.destroy();
              message.warning({
                content: "From date Cannot be future date. Should be present date and past dates. It should be less than today’s date.",
                className: "custom-msg",
                duration: 2,
              });
              return;
            }
            
            else if (handleFromDateValidate(values)) {
              // const rcdDate = new Date(convertDate(details?.policyDetailsObj?.saDetails?.rcd));
              // const selectDate = new Date(dayjs(values.FromDate));
              // const hoursDifference = convertDateToHours(new Date(dayjs(values.FromDate)) - rcdDate);
              // console.log("date1:", new Date(dayjs(values.FromDate)))
              // console.log("date2:", (moment(values.FromDate)))
              // if (selectDate <= rcdDate) {
              message.destroy();
              message.warning({
                content: "From date should be equal to or more than RCD.",
                className: "custom-msg",
                duration: 2,
              });
              return;
           // }
            }
            else if (values?.FromDate > values?.ToDate) {
              message.destroy();
              message.warning({
                content: "“To Date” cannot be future date, should be present date and past date.",
                className: "custom-msg",
                duration: 2,
              });
              return;
            }
            else if (handleToDateChange(values?.ToDate,values?.FromDate)) {
              message.destroy();
              message.warning({
                content: "Receipt range allowed of max 3 months.",
                className: "custom-msg",
                duration: 2,
              });
              return;
            }
           // Assuming convertDate returns a Date object
          // const rcdDate = convertDate(
          //   details?.policyDetailsObj?.saDetails?.rcd
          // );
          // const fromDatePlusOne = moment(values?.FromDate)
          //   .add(1, "day")
          //   .toDate();

          // if (rcdDate > fromDatePlusOne) {
          //   message.destroy();
          //   message.warning({
          //     content: "From Date should not be less than the RCD Date.",
          //     className: "custom-msg",
          //     duration: 2,
          //   });
          //   return;
          // }
        }

        setIsLoading(true);
        const obj = {
          CallType: props?.selectedCallType, // Required
          SubType: props?.selectedSubTypeId, // Required
          RequestSource: 1, // Required
          RequestChannel: values?.requestchannel || 3, // Required
          Category: 2,
          ApplicationNo:
          details?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
          DOB: convertDate(customerData?.dob),
          PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
          CustomerId: values.GSTINToBeUpdateFor=== 1?  customerData?.laClientID:customerData?.poClientID,
          CustRole: values.custRole,
          policyStatus:
          details?.policyDetailsObj?.planAndStatus?.policyStatus || customerData?.policyStatus,
          proposerName: details?.policyDetailsObj?.identifiers?.po_Name || customerData?.poName,
          plan: details?.policyDetailsObj?.planAndStatus?.planName,
          CreatedOn: new Date(),
          CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.name,
          ModifiedOn: new Date(),
          ModifiedByRef: "Test123",
          AssignedToRole: "", //POS
          AssignedByUser: 0,
          ReasonForChange: "",
          RequestDateTime: new Date(),
          ReasonDelayed: values.resonfordelay,
          CustSignDateTime: values?.customersigningdate
            ? new Date(values?.customersigningdate)
            : new Date(),
            TransactionData: getTransactionData(values),
            Uploads: [],
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
      }
    }

    // const convertDateToHours = (date) => {
    //   return Math.abs(new Date(date) - new Date()) / 36e5; // Convert milliseconds to hours
    // };

    const handleFromDateValidate =(values)=>{
      const rcdDate = new Date(convertDate(details?.policyDetailsObj?.saDetails?.rcd));
      const selectDate = new Date(dayjs(values.FromDate));
     // const hoursDifference = convertDateToHours(new Date(dayjs(values.FromDate)) - rcdDate);
      if (selectDate <= rcdDate) {
        return true;
      }
      else{
        return false;
      }
    }

    const handleToDateChange = (toDate,fromDate) => {
      const selectedToDate = new Date(dayjs(toDate));
     // setToDate(selectedToDate);
  
      // Validate that toDate is not allowed after 3 months from fromDate
      const threeMonthsLater = new Date(dayjs(fromDate));
     // const threeMonthsLater = new Date(fromDate);
      threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
  
      if (selectedToDate > threeMonthsLater) {
        return true;
        //setError('To date must be within 3 months from the selected from date.');
      } else {
        return false;
        //setError('');
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
    };

    const handleRequirementSubmit = () => {
      const formData = form.getFieldValue();
  //     setRequirementLoader(true);
   if(raiseRequirementOpen){
        handleSubmit(formData);
      }
  
    };
    const popupClose=()=>{
      setRaiseRequirementOpen(false)
    }

    return (
      <>
       <Spin spinning={isLoading}>
        <Form
          // initialValues={data}
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
          <div>
            <DetailsForm
              data={
                !isShowPOSScreen
                  ? Data[selectedSubType]?.BOE_Details
                  : Data[selectedSubType]?.POS_Details ||
                    (selectedSubType === "changeinsignature"
                      ? []
                      : Data[selectedSubType]?.BOE_Details)
              }
              subType={selectedSubType}
              handleTitleCheckBox={handleTitleCheckBox}
              toggleInputField={toggleInputField}
              showEmailAddress={showEmailAddress}
              showPhoneNumber={showPhoneNumber}
              showWhatsApp={showWhatsApp}
              handleDropdownChange ={handleDropdownChange }
              showDateRangeFields={showDateRangeFields}
              showPaymentCheckBox={showPaymentCheckBox}
              handleDateChange ={handleDateChange}
              sisLU={sisLU}
            ></DetailsForm>
          </div>
          {showDateRangeFields && (
            <>
              <DetailsForm
                data={
                  Data[selectedSubType]?.Receipt_Range_Fields
                }
                subType={selectedSubType}
                handleDateChange ={handleDateChange}
              ></DetailsForm>
            </>
          )}
          {selectedSubType?.indexOf("renewal")>-1&&<>
          <DetailsForm
                data={
                  Data[selectedSubType]?.Send_Fields
                }
                subType={selectedSubType}
                toggleInputField={toggleInputField}
                    showEmailAddress={showEmailAddress}
                    showPhoneNumber={showPhoneNumber}
                    showWhatsApp={showWhatsApp}
              ></DetailsForm>
          </>}
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
                    {Data[selectedSubType]?.Buttons?.map((button, index) => (
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
                    {Data[selectedSubType]?.POS_Buttons?.map(
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

          {/*Checklist Code Start*/}
          {!Data[selectedSubType]?.hideChecklist &&
            !isShowPOSScreen &&
            !isShowTransferFields && (
              <>
                <div style={{ marginTop: "26px" }}>
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
                      form={form}
                      //   suffix={!isShowPOSScreen && suffix}
                      //   disabledDate={disabledDate}
                    ></DetailsForm>
                  </div>
                </div>
              </>
            )}

          {/*Checklist Code End*/}
          {!Data[selectedSubType]?.Details_Buttons &&
            !Data[selectedSubType]?.hideSubmitBtns && (
              <>
                <div className="contact-details-btn">
                  {/* {!isShowPOSScreen && (
                    <>
                      <Button type="primary" className="primary-btn">
                        Close
                      </Button>
                    </>
                  )} */}
                  {isShowPOSScreen && (
                    <>
                      <Button type="primary" className="primary-btn">
                        Back
                      </Button>
                    </>
                  )}
                  <Button
                    type="primary"
                    className="primary-btn"
                    htmlType="submit"
                    //onClick={() => handleSubmit()}
                    disabled={selectedSubType?.includes("renewal") &&!showDateRangeFields&&!showPaymentCheckBox}
                  >
                    {!isShowPOSScreen ? "Submit" : "Approve"}
                    
                  </Button>{" "}
                  {isShowPOSScreen ? (
                    <>
                      <Button type="primary" className="primary-btn" onClick={() => getRaiseRequirements()}>
                        Raise Requirement
                      </Button>
                    </>
                  ) :  <>
                  <Button type="primary" className="primary-btn" onClick={() => getRaiseRequirements()}>
                    Raise Requirement
                  </Button>
                </>}
                </div>
              </>
            )}
        </Form>
        </Spin>
        {showAlert &&
        <PopupAlert alertData= {alertData} title={alertTitle} navigate={navigateTo} setShowAlert={setShowAlert} getAdvance={props.getAdvance}
        > </PopupAlert>
      }

      <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose}/>

        {/* <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <p>Please select your preferred mode through which you wish to have the receipt</p>
      </Modal> */}
      {/* {isModalOpen && <>
       {warning}
      </>} */}
      </>
    ); 
} 
export default ServicingDocuments;
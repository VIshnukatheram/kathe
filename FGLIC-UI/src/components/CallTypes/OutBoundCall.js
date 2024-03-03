import React, { useState, useEffect } from "react";
import { OutBoundCallData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import {
  Button,
  Form,
  Spin,
  message,
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSelector } from "react-redux";
import RaiseRequirementPopup from '../RaiseRequirementPopup';


const OutBoundCall = (props) => {
  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  dayjs.extend(customParseFormat);
  const {selectedSubType, customerData,details,callRelatedActionLU } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isPreferDate,setIsPreferDate] = useState(null);
  const [isSelectedDate, setIsSelectedDate] = useState(null);
  const [isDNDFlag,setIsDNDFlag] = useState(false);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);

  useEffect(()=>{
    form.resetFields();
     form.setFieldsValue({
      MobileNumber: customerData?.mobileNo,
      EmailAddress:customerData?.emailID
     })
     if(selectedSubType==="privacydonotcall"){
      getDoNotDisturbAPI();
     }
  },[selectedSubType])

  const disabledDate = (current,item) => {
    if(item?.pastDate){
      const todayStartOfDay = dayjs().startOf("day");
     return current ? current <= todayStartOfDay : true;// Can not select days before today and today
    }
    else {
      return current && current > dayjs().endOf("day"); // Can not select days after today and today
    }
    
  };

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

  const getRaiseRequirements = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: props?.selectedSubTypeId,
      Role:loginInfo?.userProfileInfo?.profileObj?.role==="boeadmin" ? 1:0
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

  const handleDateChange=(date, item)=>{
    if(item?.toLowerCase() == "preferescallbackdate"){
      let selectDate = moment(date + 1).format("DD/MM/YYYY");
      setIsPreferDate(selectDate)
    }else{
      let selectDate = moment(date + 1).format("DD/MM/YYYY");
      setIsSelectedDate(selectDate);
    }
  }
  const handleDropdownChange=()=>{}
  
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const onBlurInput=()=>{}

  const getTransactionData = (values) => {
    if (selectedSubType === "wrongcustomercontacted") {
      return [
        { Status: "Create", TagName: "Reasonforcalling", TagValue: values?.Reasonforcalling },
        { Status: "Create", TagName: "CallDate", TagValue: values?.CallDate },
        { Status: "Create", TagName: "CallTime", TagValue: values?.CallTime },
        { Status: "Create", TagName: "Spokewith", TagValue: values?.Spokewith },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {Status: "Create", TagName: "FileType", TagValue: "WRONGCUSTOMERCONTACTED"}
      ];
    } else if(selectedSubType === "privacydonotcall") {
      return [
        { Status: "Create", TagName: "MobileNumber", TagValue: values?.MobileNumber },
        { Status: "Create", TagName: "EmailAddress", TagValue: values?.EmailAddress },
        { Status: "Create", TagName: "AutoPayStatus", TagValue: values?.AutoPayStatus },
        { Status: "Create", TagName: "NoOfCallMadeInLastMonth", TagValue: values?.Noofcallsmadeinlast30days || "" },
        { Status: "Create", TagName: "DNDFlag", TagValue: values?.DNDFlag },
        { Status: "Create", TagName: "Action", TagValue: values?.Action === 1 ? true : false },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
    else if(selectedSubType === "callback") {
      return [
        { Status: "Create", TagName: "ResoanForCalling", TagValue: values?.ResoanForCalling },
        { Status: "Create", TagName: "SpokeWith", TagValue: values?.SpokeWith },
        { Status: "Create", TagName: "CallDate", TagValue: values?.CallDate },
        { Status: "Create", TagName: "CallTime", TagValue: values?.CallTime },
        { Status: "Create", TagName: "PreferedCallBackDate", TagValue: values?.PreferedCallBackDate },
        { Status: "Create", TagName: "PreferedCallBackTime", TagValue: values?.PreferedCallBackTime },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
    else if(selectedSubType === "newbussinesscallverificationdone") {
      return [
        { Status: "Create", TagName: "SpokeWith", TagValue: values?.SpokeWith },
        { Status: "Create", TagName: "CallDate", TagValue: values?.CallDate },
        { Status: "Create", TagName: "CallTime", TagValue: values?.CallTime },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
    else if(selectedSubType === "systemdowntime") {
      return [
        { Status: "Create", TagName: "SpokeWith", TagValue: values?.SpokeWith },
        { Status: "Create", TagName: "ReasonForCall", TagValue: values?.ReasonForCall },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
    else if(selectedSubType === "verificationnotcompleted") {
      return [
        { Status: "Create", TagName: "ReasonForCall", TagValue: values?.ReasonForCall },
        { Status: "Create", TagName: "CallDate", TagValue: values?.CallDate },
        { Status: "Create", TagName: "CallTime", TagValue: values?.CallTime },
        { Status: "Create", TagName: "SpokeWith", TagValue: values?.SpokeWith },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
    else if(selectedSubType === "groupinsurancecall") {
      return [
        { Status: "Create", TagName: "SpokeWith", TagValue: values?.SpokeWith },
        { Status: "Create", TagName: "CallTime", TagValue: values?.CallTime },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
    else if(selectedSubType === "generalinsurancecall") {
      return [
        { Status: "Create", TagName: "SendNonLifeCotactDetails", TagValue: values?.SendNonLifeCotactDetails },
        { Status: "Create", TagName: "MobileNumber", TagValue: values?.MobileNumber },
        { Status: "Create", TagName: "EmailID", TagValue: values?.EmailID },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
    else if(selectedSubType === "blankcallghostcall") {
      return [
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
    else if(selectedSubType === "calldrop") {
      return [
        { Status: "Create", TagName: "ReasonForCall", TagValue: values?.ReasonForCall },
        { Status: "Create", TagName: "CallDate", TagValue: values?.CallDate },
        { Status: "Create", TagName: "CallTime", TagValue: values?.CallTime },
        { Status: "Create", TagName: "SpokeWith", TagValue: values?.SpokeWith },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
      ];
    }
  };

  const getDoNotDisturbAPI = async () => {
    setIsDNDFlag(false);
    try {
      const response = await apiCalls.getDoNotDisturbAPI(customerData?.policyNo,customerData?.mobileNo);
      if (response?.data) {
        const res = response?.data;
        setIsDNDFlag(res?.dndStatus);
        form.setFieldsValue({
          DNDFlag: res?.dndStatus === true ? 'Enabled': 'Disabled',
          NoOfCallMadeInLastMonth: res?.noOfTimeCallMadeInLastMonth
        })
        
      } else {
        handleError(response?.data?.errormessage || "Something went wrong, please try again!");
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

  const handleSubmit = (values) => {
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values?.requestchannel, // Required
      Category: selectedSubType === "privacydonotcall" ? 2 : 1,
      ApplicationNo:
      details?.policyDetails?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetails?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: 456,
      CustRole: values?.custRole,
      policyStatus:
      details?.policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus || customerData?.policyStatus,
      proposerName: details?.policyDetails?.policyDetailsObj?.identifiers?.po_Name || customerData?.po_Name,
      plan: details?.policyDetails?.policyDetailsObj?.planAndStatus?.planName || customerData?.planName,
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.name,
      ModifiedOn: new Date(),
      ModifiedByRef: "Test123",
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime: new Date(),
      ReasonDelayed: values?.resonfordelay,
      CustSignDateTime: values?.customersigningdate
        ? new Date(values?.customersigningdate)
        : new Date(),
        TransactionData: getTransactionData(values),
      Uploads: [
      
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
          <DetailsForm
            data={OutBoundCallData[selectedSubType]?.BOE_Details}
            subType={selectedSubType}
            handleDropdownChange ={handleDropdownChange }
            handleDateChange={handleDateChange}
            callRelatedActionLU={callRelatedActionLU}
            disabledDate={disabledDate}
            disabledTime={disabledTime}
            onBlurInput={onBlurInput}
          ></DetailsForm>
          {(selectedSubType !== "privacydonotcall"||!isDNDFlag || loginInfo?.userProfileInfo?.profileObj?.role==="boeadmin")&&<>
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                >
                  Submit
                </Button>{" "}
                <Button type="primary" className="primary-btn" onClick={()=>getRaiseRequirements()}>
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
         <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose}/>
    </>
  );
};

export default OutBoundCall;

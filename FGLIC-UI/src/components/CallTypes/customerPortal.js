import React, { useState, useEffect } from "react";
import { CustomerPortalData } from "../../mainconfig";
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
import {useSelector } from "react-redux";
import RaiseRequirementPopup from '../RaiseRequirementPopup';

const CustomerPortal = (props) => {
  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  const {selectedSubType, customerData,details,customerPortalForm,setSelectedSubType,selectedSubTypeId,cursorPortalLU} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);


  



  useEffect(()=>{
    form?.resetFields();
  },[])
  
  const handleDateChange=()=>{}
  const handleDropdownChange=(e,item)=>{
    let selectDropDownValue = null;
    switch (e) {
      case 1:
        selectDropDownValue = "transactionnotperformedbycustomer";
        break;
      case 2:
        selectDropDownValue = "registrationissue";
        break;
      case 3:
        selectDropDownValue = "postloginissue";
        break;
      case 4:
        selectDropDownValue = "statementdownloadissue";
        break;
      case 5:
        selectDropDownValue = "loginregistrationissue";
        break;
      default:
        break;
    }
    setSelectedSubType(selectDropDownValue);
    customerPortalForm?.setFieldsValue({subType: e})
  }
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const handleSubmit = (values) => {
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values.requestchannel, // Required
      Category: 1,
      ApplicationNo:
      details?.policyDetails?.policyDetailsObj?.identifiers?.applicationNo || customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetails?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: 456,
      "CustRole":values.custRole,
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
      ReasonDelayed: values.resonfordelay,
      CustSignDateTime: values?.customersigningdate
      ? new Date(values?.customersigningdate)
      : new Date(),
      "TransactionData": [
        {
          "Status": "Create",
          "TagName": "Selectportalissue",
          "TagValue": values.Selectportalissue
      },
      {
        "Status": "Create",
        "TagName": "currentcontactNo",
        "TagValue": values.currentcontactNo
    },
    {
      "Status": "Create",
      "TagName": "UpdatecontactNo",
      "TagValue": values.UpdatecontactNo
  },
  {
    "Status": "Create",
    "TagName": "TranInfoReceivedThrough",
    "TagValue": values.TranInfoReceivedThrough
},
{
  "Status": "Create",
  "TagName": "Comments",
  "TagValue": values.Comments
},
      ],
      "Uploads": [
        
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

  const onBlurInput = (value,item)=>{

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
            data={CustomerPortalData[selectedSubType]?.BOE_Details}
            subType={selectedSubType}
            handleDropdownChange={handleDropdownChange}
            handleDateChange={handleDateChange}
            cursorPortalLU={cursorPortalLU}
            onBlurInput ={onBlurInput }
          ></DetailsForm>
          
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                >
                  Submit
                </Button>{" "}

                {
                  loginInfo?.userProfileInfo?.profileObj?.role==="boeadmin" &&
                  <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                }
              </div>
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

export default CustomerPortal;

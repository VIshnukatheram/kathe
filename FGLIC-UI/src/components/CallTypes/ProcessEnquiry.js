import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ProcessEnquiryData } from "../../mainconfig";
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
import ContactForm from "../../utils/ContactForm";
import RaiseRequirementPopup from '../RaiseRequirementPopup';


const ProcessEnquiry = (props) => {
  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  const {  selectedSubType, customerData,details,setSelectedSubType,typesForm,ProductRelatedPortalLU,processNameLU } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [isProcessLinks,setIsProcessLinks] = useState([]); 
  const [isDocLinks,setIsDocLinks] = useState([]);
  const [isSelectedProcessName,setIsSelectedProcessName] = useState("");
  const [isProcessNameLU,setIsProcessNameLU] = useState([]);
  const [MstDesc,setMstDesc] = useState('');
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  
  const shouldLog = useRef(true);
useEffect(()=>{
  if(shouldLog.current){
    shouldLog.current = false;
    //getDropdownData();
  getProcesLink();
  getClientEnquiry();
  // getProcesDocLnk();
  }
},[])

  const toggleInputField = (field, item, index) => {
    setShowEmailFields(true);
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
  // const getDropdownData = () => {
  //   setIsDocLinks([]);
  //   let obj = {
  //     "Call_Typ" : 20,
  //     "Sub_Typ" :1,
  //     "ProdType" : details?.policyDetailsObj?.planAndStatus?.productType,
  //     "ProdCode": details?.policyDetailsObj?.planAndStatus?.planCode,
  //      "ProdUIN": details?.policyDetailsObj?.planAndStatus?.productUIN,
  // }
  //   let response = apiCalls.getDocMaster(obj);
  //   response
  //     .then((val) => {
  //       if (val?.data) {
  //         const filteredData = val?.data?.filter((ele) => ele.docType);
  //         const processedData = filteredData?.map((item) => ({
  //           ...item,
  //           label: item.docType,
  //           value: item.docType,
  //         }));
  //         setIsProcessNameLU(processedData);
  //       } else {
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
       
  //     });
  // };

  const getProcesDocLnk = () => {
    setIsDocLinks([]);
    let obj = {
      "Call_Typ" : null,
      "Sub_Typ" :null,
      "ProdType" : details?.policyDetailsObj?.planAndStatus?.productType,
      "ProdCode": details?.policyDetailsObj?.planAndStatus?.planCode,
       "ProdUIN": details?.policyDetailsObj?.planAndStatus?.productUIN,
  }
    let response = apiCalls.getProcesDocLnk(obj);
    response
      .then((val) => {
        if (val?.data) {
          setIsDocLinks(val?.data);
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
  const getProcesLink = () => {
    setIsProcessLinks([]);
    let obj = {
      "Call_Typ" : 20,
      "Sub_Typ":1
}
    let response = apiCalls.getProcesLink(obj);
    response
      .then((val) => {
        if (val?.data) {
          setIsProcessLinks(val?.data);
          const filteredData = val?.data?.filter((ele) =>{
            if(ele.docType === "AcceptableDocs"){
              setIsDocLinks(ele);
            }
            return ele.docType
          });

          

          const processedData = filteredData?.map((item) => ({
            ...item,
            label: item.docType,
            value: item.docType,
          }));
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

  // const getSubTypeValue =()=>{
  //   let dropDownValue = null;
  //    switch (isSelectedProcessName) {
  //     case "Bank Detail Updation":
  //       dropDownValue = 1;
  //       break;
  //     case "Nomination":
  //       dropDownValue = 2;
  //       break;
  //     case "Surrender":
  //       dropDownValue = 3;
  //       break;
  //     case "Freelook":
  //       dropDownValue = 4;
  //       break;
  //     case "Payment Related":
  //       dropDownValue = 5;
  //       break;
  //       case "Revival":
  //         dropDownValue = 6;
  //         break;
  //       case "Foreclosure":
  //         dropDownValue = 7;
  //         break;
  //       case "Maturity Claim - Non Pension":
  //         dropDownValue = 8;
  //         break;
  //       case "Loan":
  //         dropDownValue = 9;
  //         break;
  //       case "Claims":
  //         dropDownValue = 10;
  //         break;
  //         case "Survival Benefit":
  //           dropDownValue = 11;
  //           break;
  //         case "Refund":
  //           dropDownValue = 12;
  //           break;
  //         case "Duplicate Policy Bond":
  //           dropDownValue = 13;
  //           break;
  //         case "Partial Withdrawal":
  //           dropDownValue = 14;
  //           break;
  //         case "Switch / Top up / Premium Redirection Query":
  //           dropDownValue = 15;
  //           break;
  //           case "Maturity Claim - Pension":
  //             dropDownValue = 16;
  //           break;
  //           case "Assignment":
  //             dropDownValue = 17;
  //           break;
  //           case "Claims Reconsideration":
  //             dropDownValue = 18;
  //           break;
  //           case "Process Name":
  //             dropDownValue = 19;
  //           break;
  //     default:
  //       break;
  //   }
  //   return dropDownValue;
  // }

  const handleDropdownChange=(e,item)=>{
    if(processNameLU){
          let slectedId= processNameLU.find((ele)=>{
             if(ele.mstID === e){
              setMstDesc(ele.mstDesc);
             }
             return false
          }) 
    }
    let selectDropDownValue = e ||null;
    // switch (e) {
    //   case 1:
    //     selectDropDownValue = "Bank Detail Updation";
    //     break;
    //   case 2:
    //     selectDropDownValue = "Nomination";
    //     break;
    //   case 3:
    //     selectDropDownValue = "Surrender";
    //     break;
    //   case 4:
    //     selectDropDownValue = "Freelook";
    //     break;
    //   case 5:
    //     selectDropDownValue = "Payment Related";
    //     break;
    //     case 6:
    //       selectDropDownValue = "Revival";
    //       break;
    //     case 7:
    //       selectDropDownValue = "Foreclosure";
    //       break;
    //     case 8:
    //       selectDropDownValue = "Maturity Claim - Non Pension";
    //       break;
    //     case 9:
    //       selectDropDownValue = "Loan";
    //       break;
    //     case 10:
    //       selectDropDownValue = "Claims";
    //       break;
    //       case 11:
    //         selectDropDownValue = "Survival Benefit";
    //         break;
    //       case 12:
    //         selectDropDownValue = "Refund";
    //         break;
    //       case 13:
    //         selectDropDownValue = "Duplicate Policy Bond";
    //         break;
    //       case 14:
    //         selectDropDownValue = "Partial Withdrawal";
    //         break;
    //       case 15:
    //         selectDropDownValue = "Switch / Top up / Premium Redirection Query";
    //         break;
    //         case 16:
    //         selectDropDownValue = "Maturity Claim - Pension";
    //         break;
    //         case 17:
    //         selectDropDownValue = "Assignment";
    //         break;
    //         case 18:
    //         selectDropDownValue = "Claims Reconsideration";
    //         break;
    //         case 19:
    //         selectDropDownValue = "Process Name";
    //         break;
    //   default:
    //     break;
    // }
    // setSelectedSubType("processname");
    setIsSelectedProcessName(selectDropDownValue);
    props?.setSelectedSubTypeId(selectDropDownValue);
    typesForm?.setFieldsValue({subType: selectDropDownValue})
  }
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const handleDateChange =()=>{}
  const getDocLink = () => {
    //const filteredLinks = isDocLinks?.filter((item) => item.docType?.includes("Terms & Conditions"));
    // Assuming you want to return an array of links, you can use map
    // const links = isDocLinks?.map((item) => item.link);
    // return links?.length>0 ? links[0] : "";
    return isDocLinks? isDocLinks.link : ''
}
const getProcessLink = () => {
  // const filteredLinks = isProcessLinks?.filter((item) => item.docType === isSelectedProcessName);
  const filteredLinks = isProcessLinks?.filter((item) => item.docType === MstDesc);
  
  const links = filteredLinks?.map((item) => item.link);
  return links?.length>0 ? links[0] : "";
}


  const getTransactionData = (values) => {
    // let selectedtype = processNameLU[values.ProcessName].mstDesc
    if(selectedSubType==="bankdetailupdation"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
      ]
    }
    if(selectedSubType==="nomination"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
      ]
    }
    if(selectedSubType==="surrender"){
      console.log("siiiii---")
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
      ]
    }
    if(selectedSubType==="freelook"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
      ]
    }
    if(selectedSubType==="revival"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
      ]
    }
    if(selectedSubType==="loan"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
      ]
    }
    if(selectedSubType==="duplicatepolicybond"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
      ]
    }
    if(selectedSubType==="claims"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"CLAIM" }
      ]
    }
    if(selectedSubType==="partialwithdrawal"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
      ]
    }
    if(selectedSubType==="switchtopuppremiumredirectionquery"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
      ]
    }
    if(selectedSubType==="assignment"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
      ]
    }
    if(selectedSubType==="claimsreconsideration"){
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue:"CLAIM" }
      ]
    }
    
      return [
         
      //   { Status: "Create", TagName: "ProcessFileType", TagValue: 
      //   ["Nomination", "Surrender",  "Partial Withdrawal","Loan", "Freelook",
      //   "Switch / Top up / Premium Redirection Query", "Revival", "Bank Detail Updation", "Foreclosure", 
      //   "Duplicate Policy Bond", "Ownership Change"].includes(selectedtype)?
      //   'PROCESSENQUIRY':'ProcessEmailer'
      //  },
        { Status: "Create", TagName: "ProcessName", TagValue: isSelectedProcessName || values.ProcessName },
        { Status: "Create", TagName: "DocLink", TagValue: getDocLink() || ""},
        { Status: "Create", TagName: "ProcessLink", TagValue: getProcessLink() || ""},
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
      ];
     

      // if (selectedSubType === "gstinupdate") {
      //   return [
      //     { Status: "Create", TagName: "ProcessFileType", TagValue: "ProcessEmailer" },
      //     { Status: "Create", TagName: "ProcessName", TagValue: isSelectedProcessName || values.ProcessName },
      //     { Status: "Create", TagName: "DocLink", TagValue: getDocLink() || ""},
      //     { Status: "Create", TagName: "ProcessLink", TagValue: getProcessLink() || ""},
      //     { Status: "Create", TagName: "Comments", TagValue: values.Comments },
      //   ];
      // }
  };
  const getSelectedCommunications = () =>{
    let communicationObj = []
    if(showEmailAddress||showWhatsApp||showPhoneNumber){
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
    if(showWhatsApp||showPhoneNumber){
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
  const handleSubmit = (values) => {
    if(!showEmailFields){
      message.destroy()
      message.warning({
        content:
          "Please select atleast one communication.",
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
      Category: 1,
      ApplicationNo:
      details?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: 456,
      "CustRole":values.custRole,
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
      RequestDateTime: new Date(),
      ReasonDelayed: values.resonfordelay,
      CustSignDateTime: values?.customersigningdate
      ? new Date(values?.customersigningdate)
      : new Date(),
      "TransactionData": getTransactionData(values),
      "Uploads": [
        
      ],
      CommunicationRequest: getSelectedCommunications() || [],
    //  CommunicationRequest: [
    //     {
    //       SrvReqRefNo: "",
    //       TemplateID: "",
    //       CommType: 2,
    //       ReceipientTo: "fgtesting8@gmail.com",
    //       ReceipientCC: "fgtesting8@gmail.com",
    //       MobileNos: "",
    //       ScheduledTime: new Date(),
    //       CommBody: "",
    //       Attachments: null,
    //     },
    //     {
    //       SrvReqRefNo: "",
    //       TemplateID: "",
    //       CommType: 1,
    //       ReceipientTo: "",
    //       ReceipientCC: "",
    //       MobileNos: 9892686867,
    //       ScheduledTime: new Date(),
    //       CommBody: "",
    //       Attachments: null,
    //     },
    //   ],
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

  return (
    <>
      <Spin spinning={isLoading} fullscreen />
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
            data={ProcessEnquiryData[selectedSubType]?.BOE_Details}
            subType={selectedSubType}
            handleDropdownChange ={handleDropdownChange }
            ProductRelatedPortalLU={ProductRelatedPortalLU}
            handleDateChange ={handleDateChange }
            toggleInputField={toggleInputField}
            showEmailAddress={showEmailAddress}
             showPhoneNumber={showPhoneNumber} 
             showWhatsApp={showWhatsApp}
            isProcessNameLU={processNameLU}
          ></DetailsForm>
           {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                >
                  Submit
                </Button>{" "}
                {( loginInfo?.userProfileInfo?.profileObj?.role==="boeadmin" ) && (
              <Button type="primary" className="primary-btn" onClick={()=>getRaiseRequirements()}>
                Raise Requirement
              </Button>
            )}
              </div>
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
            <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose}/>
    </>
  );
};

export default ProcessEnquiry;

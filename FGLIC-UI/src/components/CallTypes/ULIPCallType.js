import React, { useState, useEffect } from "react";
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
  DatePicker,
  Switch, Alert,
} from "antd";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import CloseIcon from "../../assets/images/close-icon.png";

const ULIPCallType = (props) => {
  const loginInfo = useSelector((state) => state);
  const [form] = Form.useForm();

  const { selectedSubType, customerData, POSContactData, details } = props;
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const suffix = <img src={UploadIcon} alt="" />;
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [existingSwitchData, setExistingSwitchData] = useState([]);
  const [relationShipLU, setRelationShipLU] = useState([]);
  const [isExistingPremiumRedirectionData, setIsExistingPremiumRedirectionData] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [totalValue, setTotalValue] = useState(null);
  const [isShowRequestForms, setIsShowRequestForms] = useState(false);
  const [fundValueData, setFundValueData] = useState([]);
  const [ToFundVal, setToFundVal] = useState([]);
  const [ToFundVal_Premium, setToFundVal_Premium] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validateBtnDisable, setValidateBtnDisable] = useState(false);
  const [counter, setCounter] = useState(0);
  const [otpValue, setOtpValue] = useState(null);
  const [sendOTPErrorMsg, setSendOTPErrorMsg] = useState(null);
  const [sendOTPLoader, setSendOTPLoader] = useState(false);
  const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
  const [isDisableOTPInput, setIsDisableOTPInput] = useState(false);
  const [disableRequestForm, setDisableRequestForm] = useState(false);
  const [sendOTPTo, setSendOTPTo] = useState(null);

  const [PremiumRedirection, setPremiumRedirection] = useState([]);

  const fromFundObj = {

  }
  const [updateSwitchData, setUpdateSwitchData] = useState([
    // {
    //   id: 1,
    //   SourceFund_New: "",
    //   Percentage_New: null,
    //   Value_New: null,
    //   TargetFund_New: null,
    // },
  ]);
  const fundNamesLU = [
    { id: 1, label: "Future Secure Fund", desc: "FutureSecureFund", value: 1 },
    { id: 2, label: "Future Income Fund", desc: "FutureIncomeFund", value: 2 },
    { id: 3, label: "Future Balance Fund", desc: "FutureBalanceFund", value: 3 },
    { id: 4, label: "Future Apex Fund", desc: "FutureApexFund", value: 4 },
    { id: 5, label: "Future Opportunity Fund", desc: "FutureOpportunityFund", value: 5 },
    { id: 6, label: "Future Maximise Fund", desc: "FutureMaximiseFund", value: 6 },
    { id: 7, label: "Future Midcap Fund", desc: "FutureMidcapFund", value: 7 },
  ]

  useEffect(() => {
    if (details?.policyDetailsObj?.planAndStatus?.productType !== "UL") {
      setAlertTitle("FundSwitch, Premium Redirection Not Allowed For NON Ulip Policy's");
      setNavigateTo("/advancesearch");
      setShowAlert(true);
    }
    if (selectedSubType === 'premiumredirection') {
      getPlanFundDetails()
      //GetCurrentFundAllocationn();
    } else {
      getFundValue();
      getPlanFundDetails()
    }


  }, [selectedSubType]); // eslint-disable-next-line arrow-body-style


  useEffect(() => {
    if (form && fundValueData) {
      const initialValues = {};
      fundValueData.forEach((row, index) => {
        initialValues[`fundValueData[${index}].ToPercentage_New`] = row.ToPercentage_New;
        initialValues[`fundValueData[${index}].isChecked`] = row.isChecked;
      });
      form.setFieldsValue(initialValues);
    }

  }, [form, fundValueData]);


  useEffect(() => {
    hideCommunications();
    setDisableRequestForm(false);
    setDisableRequestForm(false);
  }, []);

  const handleSwitchChange = (checked) => {
    setIsChecked(checked);
  };

  const hideCommunications = () => {
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setShowPhoneNumber(false);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
  };

  const getSubTypeValue = (selectedVal) => {
    let dropDownValue = null;
    switch (selectedVal) {
      case 1:
        dropDownValue = "Future Secure Fund";
        break;
      case 2:
        dropDownValue = "Future Income Fund";
        break;
      case 3:
        dropDownValue = "Future Balance Fund";
        break;
      case 4:
        dropDownValue = "Future Apex Fund";
        break;
      case 5:
        dropDownValue = "Future Opportunity Fund";
        break;
      case 6:
        dropDownValue = "Future Maximise Fund";
        break;
      case 7:
        dropDownValue = "Future Midcap Fund";
        break;
      default:
        break;
    }
    return dropDownValue;
  }

  const getFundValue = () => {
    setIsLoading(true);

    let obj = {
      "requestHeader": {
        "source": "POS",
        "carrierCode": "2",
        "branch": "PRA",
        "userId": "website",
        "userRole": "10",
        "partnerId": "MSPOS",
        "processId": "POS",
        "monthendExtension": "N",
        "monthendDate": "18/10/2023"
      },
      "requestBody": {
        "policyno": details?.policyDetailsObj?.identifiers?.policyNo
      }
    }

    let response = apiCalls.GetFundValue(obj);
    response
      .then((val) => {
        if (val?.data) {
          //const res = val?.data?.responseBody;
          const res = val?.data?.responseBody?.fundValue.map((ele) => {
            // Add the new property to each object
            ele.ToPercentage_New = '';
            ele.isChecked = false;
            ele.disabled = true;
            return ele;
          });

          // Now use the 'res' array in your application
          console.log(res);
          setFundValueData(res);
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


  const handleAddRow = () => {
    let { fromFund, percentage, toFund } = form.getFieldsValue();
    if (fromFund === toFund) {
      handleError("'From Fund' and 'To Fund' must have different values. Please select distinct funds for each field.");
      return;
    }
    if (fromFund && toFund && percentage) {
      // Check if the total share is less than 100 before adding a new row
      const newId = updateSwitchData.length + 1;
      const newRow = {
        id: newId,
        SourceFund_New: getSubTypeValue(fromFund),
        Percentage_New: percentage,
        Value_New: 0,
        TargetFund_New: getSubTypeValue(toFund),
      };
      form.setFieldsValue({
        fromFund: null,
        toFund: null,
        percentage: null
      })
      // Update the state with the new row
      setUpdateSwitchData([...updateSwitchData, newRow]);
    }
    else {
      handleError("From Fund, To Fund and Percentage Fields are Mandatory.");
    }

  };

  useEffect(() => {
    let total = 0;
    updateSwitchData?.forEach((row) => {
      total += parseFloat(row.Value) || 0;
    });
    setTotalValue(total);
  }, [updateSwitchData, isShowPOSScreen]);

  const handleKeyPress = (e) => {
    // Allow only numbers (0-9)
    const isValidInput = /^[0-9]+$/.test(e.key);

    if (!isValidInput) {
      e.preventDefault();
    }

  };
  const percentageCheck = (e, index) => {
    
    const updatedData = [...fundValueData];

    setFundValueData(updatedData);
    if (Number(e.target.value) > 100) {


      updatedData[index] = { ...updatedData[index], ToPercentage_New: '' };
      setFundValueData(updatedData);
      message.destroy();
      message.error({
        content:
          "Percentage, Should Not more than 100",
        className: "custom-msg",
        duration: 2,
      });
    } else {
      updatedData[index] = { ...updatedData[index], ToPercentage_New: e.target.value };
    }
  }




  const handleBlur_Premium = (e, index) => {
    
    const sum = ToFundVal_Premium.reduce((accumulator, currentValue) => accumulator + +currentValue.ToPercentage_New, 0);
    const updatedData = [...ToFundVal_Premium];
    if (sum > 100) {
      updatedData[index] = { ...updatedData[index], ToPercentage_New: '' };
      setToFundVal_Premium(updatedData);
      message.error({
        content:
          "Total Percentage, Should Not more than 100",
        className: "custom-msg",
        duration: 2,
      });
    }
  }

  const handleBlur = (e, index) => {
    
    const sum = ToFundVal.reduce((accumulator, currentValue) => accumulator + +currentValue.ToPercentage_New, 0);
    const updatedData = [...ToFundVal];
    if (sum > 100) {
      updatedData[index] = { ...updatedData[index], ToPercentage_New: '' };
      setToFundVal(updatedData);
      message.error({
        content:
          "Total Percentage, Should Not more than 100",
        className: "custom-msg",
        duration: 2,
      });
    }

  }

  const percentageCheck2 = (e, index) => {

    const updatedData = [...ToFundVal];

    // setToFundVal(updatedData);
    if (Number(e.target.value) > 100) {


      updatedData[index] = { ...updatedData[index], ToPercentage_New: '' };
      setToFundVal(updatedData);
      message.destroy();
      message.error({
        content:
          "Percentage, Should Not more than 100",
        className: "custom-msg",
        duration: 2,
      });
    } else {
      updatedData[index] = { ...updatedData[index], ToPercentage_New: e.target.value };
      setToFundVal(updatedData);
    }

  }

  const percentageCheck_Premium = (e, index) => {

    const updatedData = [...ToFundVal_Premium];

    // setToFundVal(updatedData);
    if (Number(e.target.value) > 100) {


      updatedData[index] = { ...updatedData[index], ToPercentage_New: '' };
      setToFundVal_Premium(updatedData);
      message.destroy();
      message.error({
        content:
          "Percentage, Should Not more than 100",
        className: "custom-msg",
        duration: 2,
      });
    } else {
      updatedData[index] = { ...updatedData[index], ToPercentage_New: e.target.value };
      setToFundVal_Premium(updatedData);
    }

  }


  const handleCheckboxChange3 = (e, index) => {
    // let checkedVal = ToFundVal[index].fund_Code;

    // let isSelectedSame = fundValueData.some((ele)=>{
    //    if(ele.vrtfund === checkedVal && ele.isChecked){
    //     return true
    //    }
    //    return false
    // });
    // if(isSelectedSame){
    //   message.destroy();
    //   message.error({
    //     content:
    //       "Fun Switch Not applicable to same fund",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return 
    // }


    //   let fromFundSelected = fundValueData.some((ele)=>{
    //     if(ele.isChecked){
    //      return true
    //     }
    //     return false
    //  });
    //  if(!fromFundSelected){
    //    message.destroy();
    //    message.error({
    //      content:
    //        "Select From Funds",
    //      className: "custom-msg",
    //      duration: 2,
    //    });
    //    return 
    //  }

    
    const newValue = e.target.checked;
    const updatedData = [...ToFundVal_Premium];
    updatedData[index] = { ...updatedData[index], isChecked: newValue };
    if (!e.target.checked) {
      updatedData[index] = { ...updatedData[index], ToPercentage_New: '' };
      updatedData[index] = { ...updatedData[index], disabled: true };
    }
    if (e.target.checked) {
      updatedData[index] = { ...updatedData[index], disabled: false };
    }
    setToFundVal_Premium(updatedData);
  };

  const handleCheckboxChange2 = (e, index) => {
    let checkedVal = ToFundVal[index].fund_Code;

    let isSelectedSame = fundValueData.some((ele) => {
      if (ele.vrtfund === checkedVal && ele.isChecked) {
        return true
      }
      return false
    });
    if (isSelectedSame) {
      message.destroy();
      message.error({
        content:
          "Fun Switch Not applicable to same fund",
        className: "custom-msg",
        duration: 2,
      });
      return
    }


    let fromFundSelected = fundValueData.some((ele) => {
      if (ele.isChecked) {
        return true
      }
      return false
    });
    if (!fromFundSelected) {
      message.destroy();
      message.error({
        content:
          "Select From Funds",
        className: "custom-msg",
        duration: 2,
      });
      return
    }

    
    const newValue = e.target.checked;
    const updatedData = [...ToFundVal];
    updatedData[index] = { ...updatedData[index], isChecked: newValue };
    if (!e.target.checked) {
      updatedData[index] = { ...updatedData[index], ToPercentage_New: '' };
      updatedData[index] = { ...updatedData[index], disabled: true };
    }
    if (e.target.checked) {
      updatedData[index] = { ...updatedData[index], disabled: false };
    }
    setToFundVal(updatedData);
  };


  const handleCheckboxChange = (e, index) => {
    const newValue = e.target.checked;
    const updatedData = [...fundValueData];
    updatedData[index] = { ...updatedData[index], isChecked: newValue };
    if (!e.target.checked) {
      updatedData[index] = { ...updatedData[index], ToPercentage_New: '' };
      updatedData[index] = { ...updatedData[index], disabled: true };
    }
    if (e.target.checked) {
      updatedData[index] = { ...updatedData[index], disabled: false };
    }
    setFundValueData(updatedData);
  };

  const handleDeleteRow = (id, index) => {
    if (updateSwitchData.length > 0) {
      form.setFieldsValue({
        updateSwitchData: {
          [id]: {
            SourceFund_New: "",
            Percentage_New: null,
            Value_New: null,
            TargetFund_New: null,
          },
        },
      });
      const updatedupdateSwitchData = updateSwitchData.filter(
        (row) => row.id !== id
      );
      setUpdateSwitchData(updatedupdateSwitchData);
      // Reset the form instance to reflect the changes
      form.resetFields([
        `updateSwitchData[${index}].SourceFund_New`,
        `updateSwitchData[${index}].Percentage_New`,
        `updateSwitchData[${index}].Value_New`,
        `updateSwitchData[${index}].TargetFund_New`,
      ]);
    }
  };

  const handleTitleCheckBox = (e, item) => {
    const newValue = checked ? false : true;
    setChecked(newValue);
  };

  const handleRadioChange = (e, item) => {

    if (e.target.value === "otp") {
      setCounter(0);
      setIsModalOpen(true);
      setValidateOTPSuccess(false);
    } else {
      setCounter(0);
      setIsModalOpen(false);
      setValidateOTPSuccess(true);
    }


    // if (
    //   (item?.label?.includes("Validate Signature") ||
    //     item?.label?.includes("Signature Validated")) &&
    //   e.target.value === "no"
    // ) {
    //   setShowRaiseRequirementBtn(true);
    // } else if (
    //   (item?.label?.includes("Validate Signature") ||
    //     item?.label?.includes("Signature Validated")) &&
    //   e.target.value === "yes"
    // ) {
    //   setShowRaiseRequirementBtn(false);
    // }
    if (
      item?.label?.includes("Initiate Request By") &&
      e.target.value === "requestform"
    ) {
      setIsShowRequestForms(true);
    } else if (
      item?.label?.includes("Initiate Request By") &&
      e.target.value === "otp"
    ) {
      setIsShowRequestForms(false);
    }
  };

  const toggleInputField = (field, item, index) => {
    setShowEmailFields(true);
    form.setFieldsValue({
      mobileNo: customerData?.mobileNo,
      whatsAppNo: customerData?.mobileNo,
      emailId: customerData?.emailID,
    });
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
  const getUploadFiles = (listOfUploadFiles) => {
    const updatedUploadList = listOfUploadFiles?.map((obj) => {
      // Create a new object without the propertyToDelete property
      const { labelName, ...newObject } = obj;
      return newObject;
    });
    // Update the state with the new list
    setUploadFiles(updatedUploadList);
  };

  const getClientEnquiry = async (clientNo) => {
    let obj = {
      clientNumber: clientNo,
    };
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
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };

  const handleTextLink = () => { };
  const handleDropdownChange = (e, item) => {
    setDisableRequestForm(false);
  };

  const handleDateChange = (date, item) => {
    
    if (
      item?.toLowerCase() === "branchreceiveddate" ||
      item?.name === "branchreceiveddate"
    ) {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("DD/MM/YYYY");
      let selectDate = moment(date + 1).format("DD/MM/YYYY");
      // if (selectDate < todayDate) {
      //   setShowReasonDelayField(true);
      // }
      Data[selectedSubType]?.Request_Details?.forEach((item, index) => {
        if (selectDate < todayDate && item?.name?.includes("ReasonForDelay")) {
          item.hide = false;
          setShowReasonDelayField(true);
        }
        else if (selectDate >= todayDate && item?.name?.includes("ReasonForDelay")) {
          item.hide = true;
          setShowReasonDelayField(false);
        }
      });
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
        handleTextLink={handleTextLink}
        handleTitleCheckBox={handleTitleCheckBox}
        handleDropdownChange={handleDropdownChange}
        toggleInputField={toggleInputField}
        activeEmailIcons={activeEmailIcons}
        activeMobileIcons={activeMobileIcons}
        activeWhatsAppIcons={activeWhatsAppIcons}
        getUploadFiles={getUploadFiles}
        disabledDate={disabledDate}
        disableRequestForm={disableRequestForm}
      ></DetailsForm>
    );
  };

  const hasAppointee = (SwitchData) => {
    // Check if any item in the current level has Role_New !== 'appointee'
    if (SwitchData.some((row) => row?.Role_New !== "appointee")) {
      return true;
    }

    // Check each nested level
    for (const row of SwitchData) {
      if (row?.nestedSwitchData && hasAppointee(row.nestedSwitchData)) {
        return true;
      }
    }

    return false;
  };




  const GetCurrentFundAllocationn = async (ToFundVal = []) => {
    try {
      const response = await apiCalls.GetCurrentFundAllocation();
      if (response?.data) {
        if (response?.data?.responseBody?.errorcode === '0') {
          const units = response?.data?.responseBody?.unitDetails?.filter(x => x.uniT_ALLOC_FUND != '') ?? [];
          let fundsWithName = units.map(x => {return {...x,uniT_ALLOC_FUND : ToFundVal.find(y => y.fund_Code == x.uniT_ALLOC_FUND)?.fund_Name ?? x.uniT_ALLOC_FUND}})
          setPremiumRedirection(fundsWithName);
        }
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


  const getDOBAppointeeCheck = () => {
    return updateSwitchData?.some((item, index) => {
      if (item) {
        const currentDate = new Date();
        const birthDate = new Date(item?.NomineeDOB_New);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();

        if (
          (age < 18 || (age === 18 && monthDiff < 0)) &&
          updateSwitchData[index].Role_New === "appointee"
        ) {
          return true;
        }
      }
      return false; // Return false for cases where the condition is not met
    });
  };

  const handleError = (errorMessage) => {
    message.destroy();
    message.error({
      content: errorMessage || "Something went wrong please try again!",
      className: "custom-msg",
      duration: 2,
    });
  };

  const handleSubmit = (values) => {

    if (isChecked === false) {
      saveRequest();
      return
    }
    if (selectedSubType === "switch") {
      const fromFund = fundValueData.some((ele) => {
        return +ele.ToPercentage_New > 0
      });

      if (!fromFund) {
        message.error({
          content:
            "Enter From Fund Values",
          className: "custom-msg",
          duration: 2,
        });
        return
      }

      const sum = ToFundVal.reduce((accumulator, currentValue) => accumulator + +currentValue.ToPercentage_New, 0);

      if (sum < 100) {
        message.error({
          content:
            "To Fund Percentage, Should Be equal to 100%",
          className: "custom-msg",
          duration: 2,
        });
        return
      }
    } else if (selectedSubType === "premiumredirection") {
      
      const sum = ToFundVal_Premium.reduce((accumulator, currentValue) => accumulator + +currentValue.ToPercentage_New, 0);

      if (sum < 100) {
        message.error({
          content:
            "To Fund Percentage, Should Be equal to 100%",
          className: "custom-msg",
          duration: 2,
        });
        return
      }
    }





    setShowAlert(false)
    
    if (selectedSubType === "switch") {
      if (POSContactData && customerData?.isPOS) {
        POSActionsOnContactDetails(values, "APPROVED");
      } else {
        // if (values.ValidateSignature === "no") {
        //   getRaiseRequirements();
        // } else {
        saveRequest();
        // }
      }
    } else if (selectedSubType === "premiumredirection") {
      if (POSContactData && customerData?.isPOS) {
        POSActionsOnContactDetails(values, "APPROVED");
      }
      // else if (values.ValidateSignature === "no") {
      //   getRaiseRequirements();
      // } 
      else {
        saveRequest(values);
      }
    }
  };

  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    setRequirementLoader(true);
    if (raiseRequirementOpen) {
      saveRequest();
    } else {
      POSActionsOnContactDetails(null, "REJECTED");
    }
  };

  const getRaiseRequirements = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: props?.selectedSubTypeId,
    };
    let response = apiCalls.getRaiseRequirements(obj);
    response
      .then((val) => {
        if (typeof val?.data !== "string") {
          setRaiseRequerimentList(val?.data);
          setRequirementLoader(false);
        } else {
          setRequirementLoader(false);
          handleError(
            (typeof val?.data === "string" && val?.data) ||
            val?.data?.responseBody?.errormessage ||
            "Something went wrong please try again!"
          );
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
    if (seletedRequerimentList.length === 0 && status === "REJECTED") {
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
          handleError(
            val?.data?.responseBody?.errormessage ||
            "Something went wrong please try again!"
          );
        }
        setIsLoading(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false);
      });
  };


  const getPlanFundDetails = () => {
    
    let obj = {
      Plan_Code: 'U27'
    };
    let response = apiCalls.getPlanFund(obj);
    response
      .then((val) => {

        const res = val?.data?.map((ele) => {
          // Add the new property to each object
          ele.ToPercentage_New = '';
          ele.isChecked = false;
          ele.disabled = true;
          return ele;
        });

        setToFundVal(res);
        setToFundVal_Premium(res)

        if (selectedSubType === 'premiumredirection') {
          GetCurrentFundAllocationn(res);
        }
      })
      .catch((err) => {
        setRequirementLoader(false);
      });
  };



  const saveRequest = () => {
    ;
    // let isChecked = fundValueData.some(item => item.isChecked === true && !item.ToPercentage_New);
    // if(!isChecked){
    //   message.error({
    //     content:
    //       "Please Select Fund Values",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return
    // }

    const values = form.getFieldsValue();
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: 1, // Required
      RequestChannel: values.requestchannel, // Required
      Category: 2,
      ApplicationNo:
        details?.policyDetailsObj?.identifiers?.applicationNo ||
        customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo:
        details?.policyDetailsObj?.identifiers?.policyNo ||
        customerData?.policyNo, // Required
      CustomerId:
        values.GSTINToBeUpdateFor === 1
          ? customerData?.laClientID
          : customerData?.poClientID,
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
      ReasonDelayed: values.resonfordelay,
      CustSignDateTime: values?.customersigningdate
        ? new Date(values?.customersigningdate)
        : new Date(),
      TransactionData: [],
      Uploads: uploadFiles || [],
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

    if (values.ValidateSignature === "no") {
      let ids = raiseRequerimentList
        ?.filter((e) => e.status === true)
        ?.map((e) => e.raiseReqId);
      obj.TransactionData.push({
        Status: "Create",
        TagName: "ReasonList_Key",
        TagValue: JSON.stringify(ids),
      });
    }

    obj.TransactionData.push(

      {
        "Status": "Create",
        "TagName": "CustomerSigningDate",
        "TagValue": values.CustomerSigningDate
      },
      {
        "Status": "Create",
        "TagName": "BranchReceivedDate",
        "TagValue": values.BranchReceivedDate
      },
      {
        "Status": "Create",
        "TagName": "ValidatedBy",
        "TagValue": values.customerchoice

      },
      {
        "Status": "Create",
        "TagName": "ValidateSignature",
        "TagValue": values.ValidateSignature
      }, {
      "Status": "Create",
      "TagName": "ReasonDelayed",
      "TagValue": values.ReasonDelayed
    },


    )


    if (selectedSubType === "switch") {




      fundValueData.forEach((ele, index) => {
        index++

        obj.TransactionData.push(

          {
            "Status": "Create",
            "TagName": `FundFrom_${index}`,
            "TagValue": ele.vrtfund
          },
          {
            "Status": "Create",
            "TagName": `PercentFrom_${index}`,
            "TagValue": ele.ToPercentage_New ? ele.ToPercentage_New : 0
          },

          {
            "Status": "Create",
            "TagName": `FundTo_${index}`,
            "TagValue": ele.vrtfund
          },
          {
            "Status": "Create",
            "TagName": `PercentTo_${index}`,
            "TagValue": 0
          }

        )

      })
      let indd = 0;

      ToFundVal.forEach((ele, index) => {

        const Check = obj.TransactionData.some((elee) => {
          return ele.fund_Code === elee.TagValue
        });


        
        if (ele.isChecked && ele.ToPercentage_New) {

          indd++
          let updatedIndex = fundValueData.length + indd
          if (!Check) {
            obj.TransactionData.push(
              {
                "Status": "Create",
                "TagName": `FundFrom_${updatedIndex}`,
                "TagValue": ele.fund_Code
              },
              {
                "Status": "Create",
                "TagName": `PercentFrom_${updatedIndex}`,
                "TagValue": 0
              }
            )
          }

          obj.TransactionData.push(

            {
              "Status": "Create",
              "TagName": `FundTo_${updatedIndex}`,
              "TagValue": ele.fund_Code
            },
            {
              "Status": "Create",
              "TagName": `PercentTo_${updatedIndex}`,
              "TagValue": ele.ToPercentage_New
            }

          )
        }
      })


    } else if (selectedSubType === "premiumredirection") {
      let indd = 0;

      ToFundVal_Premium.forEach((ele, index) => {

        if (ele.isChecked && ele.ToPercentage_New) {

          indd++
          let updatedIndex = indd

          //  obj.TransactionData.push(
          //       {
          //         "Status": "Create",
          //         "TagName": `FundFrom_${updatedIndex}`,
          //         "TagValue": ele.fund_Code
          //     },
          //     {
          //       "Status": "Create",
          //       "TagName": `PercentFrom_${updatedIndex}`,
          //       "TagValue": 0
          //   }
          //   )


          obj.TransactionData.push(

            {
              "Status": "Create",
              "TagName": `FundName_${updatedIndex}`,
              "TagValue": ele.fund_Code
            },
            {
              "Status": "Create",
              "TagName": `FundPercentage_${updatedIndex}`,
              "TagValue": ele.ToPercentage_New
            }

          )
        }
      })


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
            `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat || 0} days`
            : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          setAlertData(successMessage);
          setNavigateTo("/advancesearch");
          setShowAlert(true);
          if (raiseRequirementOpen) {
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
  };
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };


  const handleOTP = (isValue) => {
    setSendOTPLoader(true);
    setSendOTPErrorMsg(false);
    setValidateOTPSuccess(false);
    if (isValue && !otpValue) {
      setSendOTPLoader(false);
      message.destroy();
      message.error({
        content: "Please Enter OTP value",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }

    const obj = {
      PolicyNo: customerData?.policyNo,
      // EmailId: customerData?.emailID,
      EmailId: "fgtesting8@gmail.com",
      //MobileNo: contactNewValue,
      MobileNo: "9892686867",
      OTP: isValue ? otpValue : 0,
      Body: '"CustomerName":"vishnu","Purpose":"claim intimation"',
    };
    // if(otpValue && otpValue.length !== 6){
    //              message.destroy()
    //       message.error({
    //         content: "Invalid OTP",
    //         className: "custom-msg",
    //         duration: 2,
    //       });
    //       setSendOTPLoader(false);
    // }else if(otpValue.length === 6){
    //   message.success({
    //             content: "Otp Validation successfully",
    //             className: "custom-msg",
    //             duration: 3,
    //           });
    //           setIsModalOpen(false);
    //         setOtpValue(null);
    //         setValidateOTPSuccess(true);
    //         setSendOTPLoader(false);
    // }
    let response = apiCalls.getSendOTP(obj);
    response
      .then((val) => {
        if (val?.data?.responseHeader?.issuccess) {
          setSendOTPLoader(false);
          if (otpValue) {
            message.destroy();
            setSendOTPErrorMsg(null);
            message.success({
              content: "Otp Validation successfully",
              className: "custom-msg",
              duration: 3,
            });
            setIsModalOpen(false);
            setOtpValue(null);
            setValidateOTPSuccess(true);
            setDisableRequestForm(true);
          }
        } else {
          setSendOTPLoader(false);
          message.destroy();
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
        setSendOTPLoader(false);
        setSendOTPErrorMsg();
      });
  };



  const handleOTPChange = (e) => {
    setOtpValue(e.currentTarget.value);
  };
  const handleSendOTP = () => {
    setCounter(30);
    handleOTP();
    setValidateBtnDisable(true);
    setIsDisableOTPInput(true);
  };

  const handleSendOTPClose = () => {
    form.setFieldsValue({ customerchoice: null });
    setIsModalOpen(false);
    setValidateBtnDisable(false);
    setIsDisableOTPInput(false);
    setOtpValue(null);
    setCounter(0);
  };


  return (
    <>
      <Spin spinning={isLoading} fullscreen />
      <Form
        initialValues={data}

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
        form={form}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        {/* Switch Sub Type Code Start */}
        {selectedSubType === "switch" && (
          <>
            {!isShowPOSScreen && (
              <>
                {renderDetailsForm(
                  isShowPOSScreen ? "POS_Details" : "BOE_Details"
                )}
              </>
            )}
            <div className="mb-16">
              <div className="table-container email-table">
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>Fund Name</th>
                      <th>NAV Date</th>
                      <th>Fund Category</th>
                      <th>NAV</th>
                      <th>Units</th>
                      <th>Fund Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isShowPOSScreen && (
                      <>
                        {fundValueData?.map((row, index) => (
                          <tr key={index}>
                            <td>{row.fndshrtdsc} </td>
                            <td>
                              {row.effectivedate
                                ? convertDate(row.effectivedate)
                                : row.effectivedate}{" "}
                            </td>
                            <td>{row.fundtype}</td>
                            <td>{row.curuntbal} </td>
                            <td>{row.unitprice} </td>
                            <td>{row.curuntval}</td>
                          </tr>
                        ))}

                        {fundValueData?.length === 0 && (
                          <tr>
                            <td colSpan="6">
                              <div className="text-center">
                                <span>No data avalable</span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-16">
              <div className="nlp-details">
                <p className="text-color">Do you want to do Fund Switch ?</p>
                <p className="spam-email">
                  <Switch
                    checked={isChecked}
                    onChange={handleSwitchChange}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                </p>
              </div>
            </div>

            {isChecked && (
              <>
                {/* <Row gutter={[16, 16]} className="mb-16">
                  <Col className="m-10" xs={24} sm={24} md={7} lg={7} xxl={7}>
                    <Form.Item
                      label="From Fund"
                      name="fromFund"
                      className="inputs-label mb-0"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Select a From Fund",
                      //   },
                      //   // { whitwspace: true },
                      // ]}
                    >
                      <Select
                        className="cust-input calltype-select"
                        maxLength={100}
                        placeholder="Select a From Fund"
                        options={fundNamesLU}
                        //onChange={(e) => handleCallTypeChange(e)}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col className="m-10" xs={24} sm={24} md={7} lg={7} xxl={7}>
                    <Form.Item
                      label="To Fund"
                      name="toFund"
                      className="inputs-label mb-0 subtype right-colsize"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Select a To Fund",
                      //   },
                      //   // { whitwspace: true },
                      // ]}
                    >
                      <Select
                        className="cust-input calltype-select"
                        maxLength={100}
                        placeholder="Select a To Fund"
                        options={fundNamesLU}
                        // onChange={(e) => handleSubTypeChange(e)}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col className="m-10" xs={24} sm={24} md={7} lg={7} xxl={7}>
                    <Form.Item
                      label="Percentage"
                      name="percentage"
                      className="inputs-label mb-0"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Enter a Percentage",
                      //   },
                      //   // { whitwspace: true },
                      // ]}
                    >
                      <Input placeholder="Enter a percentage" />
                    </Form.Item>
                  </Col>
                  <Col className="m-10" xs={24} sm={24} md={3} lg={3} xxl={3}>
                    <Button
                      className="fundswitchadd-btn"
                      //htmlType="submit"
                      onClick={() => handleAddRow()}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>

                <div className="mb-16">
                  <div className="table-container email-table">
                    <table className="responsive-table">
                      <thead>
                        <tr>
                         
                          <th>Source Fund</th>
                          <th>%</th>
                          <th>Value(₹)</th>
                          <th>Target Fund</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isShowPOSScreen && (
                          <>
                            {updateSwitchData.map((row, index) => (
                              <tr key={row.id} className="nominee-input">
                                <td>{row.SourceFund_New}</td>
                                <td>{row.Percentage_New}</td>
                                <td>{row.Value_New}</td>
                                <td>{row.TargetFund_New}</td>
                                <td>
                                  <i
                                    class="bi bi-trash3-fill"
                                    onClick={() =>
                                      handleDeleteRow(row.id, index)
                                    }
                                    style={{
                                      color: "#b3201f",
                                      cursor: "pointer",
                                    }}
                                  ></i>
                                </td>
                              </tr>
                            ))}
                            {updateSwitchData?.length === 0 && (
                              <tr>
                                <td colSpan="5">
                                  <div className="text-center">
                                    <span>No data avalable</span>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        )}
                      </tbody>
                      {updateSwitchData?.length > 0 && (
                        <>
                          <tfoot className="fundswitch-tfooter">
                            <tr>
                              <td>Total Switch Amount:</td>
                              <td></td>
                              <td>₹ {totalValue}</td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tfoot>
                        </>
                      )}
                    </table>
                  </div>
                </div> */}

                <Row gutter={[16, 16]} className="mb-16">
                  <Col
                    className="m-10"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xxl={12}
                  >
                    <div className="mb-16">
                      <h4 className="subtype-headings fs-16 fw-500 text-center"> From Fund </h4>
                      <div className="table-container email-table">


                        {/* <pre>{JSON.stringify(fundValueData)}</pre> */}
                        <table className="responsive-table">
                          <thead>
                            {/* <tr>
                                <th colspan="3">From Fund</th>
                              </tr> */}
                            <tr>
                              <th></th>
                              <th>Fund Name</th>
                              <th>(%)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {!isShowPOSScreen && (
                              <>
                                {fundValueData?.map((row, index) => (
                                  <tr key={row.id} className="nominee-input">
                                    <td>
                                      <Form.Item
                                        name={`fundValueData[${index}].isChecked`}
                                        className="inputs-label mb-0"

                                      >

                                        <Checkbox checked={row.isChecked} onChange={(e) => handleCheckboxChange(e, index)} />
                                      </Form.Item>
                                    </td>
                                    <td>{row.vrtfund}</td>
                                    <td>
                                      <Form.Item
                                        name={`fundValueData[${index}].ToPercentage_New`}
                                        className="inputs-label mb-0"

                                      >
                                        <Input
                                          placeholder="Enter a Percenatge"
                                          className="cust-input"
                                          disabled={row.disabled}
                                          value={row.ToPercentage_New}
                                          maxLength={3}
                                          onKeyPress={handleKeyPress}
                                          onChange={(e) => percentageCheck(e, index)}
                                        />
                                      </Form.Item>
                                    </td>

                                  </tr>
                                ))}
                                {fundValueData?.length === 0 && (
                                  <tr>
                                    <td colSpan="3">
                                      <div className="text-center">
                                        <span>No data avalable</span>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </>
                            )}
                          </tbody>
                        </table>

                      </div>
                    </div>
                  </Col>
                  <Col
                    className="m-10"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xxl={12}
                  >
                    <div className="mb-16">
                      <h4 className="subtype-headings fs-16 fw-500 text-center"> To Fund </h4>
                      <div className="table-container email-table">
                        <table className="responsive-table">
                          <thead>
                            <tr className="trr" >
                              <th></th>
                              <th>Fund Name</th>
                              <th>(%)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ToFundVal?.map((row, index) => (
                              <tr key={row.id} className="nominee-input">
                                <td>
                                  <Form.Item

                                    className="inputs-label mb-0"

                                  >

                                    <Checkbox checked={row.isChecked} onChange={(e) => handleCheckboxChange2(e, index)} />
                                  </Form.Item>
                                </td>
                                <td>{row.fund_Name}</td>
                                <td>
                                  <Form.Item

                                    className="inputs-label mb-0"

                                  >
                                    <Input
                                      placeholder="Enter a Percenatge"
                                      className="cust-input"
                                      disabled={row.disabled}
                                      value={row.ToPercentage_New}
                                      maxLength={3}
                                      onKeyPress={handleKeyPress}
                                      onChange={(e) => percentageCheck2(e, index)}
                                      onBlur={(e) => handleBlur(e, index)} // Add this onBlur event
                                    />
                                  </Form.Item>
                                </td>

                              </tr>
                            ))}
                            {ToFundVal?.length === 0 && (
                              <tr>
                                <td colSpan="3">
                                  <div className="text-center">
                                    <span>No data avalable</span>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Col>
                </Row>
                {renderDetailsForm("Initiate_RequestBY")}
                {isShowRequestForms && (
                  <>{renderDetailsForm("Request_Details")}</>
                )}
              </>
            )}
          </>
        )}
        {/* Switch Sub Type Code End */}

        {/* Premium Redirection Code Start */}
        {selectedSubType === "premiumredirection" && (
          <>
            {!isShowPOSScreen && (
              <>
                {renderDetailsForm(
                  isShowPOSScreen ? "POS_Details" : "BOE_Details"
                )}
              </>
            )}
            <div className="mb-16">
              <div className="table-container email-table" style={{ "max-height": "200px", "overflow": "auto" }}>
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>Fund Name</th>
                      <th>Existing Allocation %</th>
                      {/* <th>Unit DEALLOC PERC AMT</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {!isShowPOSScreen && (
                      <>
                        {PremiumRedirection?.map((row, index) => (
                          <tr key={index}>
                            <td>{row.uniT_ALLOC_FUND} </td>

                            <td>{row.uniT_ALLOC_PERC_AMT}</td>
                            {/* <td>{row.uniT_DEALLOC_PERC_AMT} </td> */}

                          </tr>
                        ))}

                        {PremiumRedirection?.length === 0 && (
                          <tr>
                            <td colSpan="6">
                              <div className="text-center">
                                <span>No data avalable</span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-16">
              <div className="nlp-details">
                <p className="text-color">
                  Do You Wish to do Premium Redirection ?
                </p>
                <p className="spam-email">
                  <Switch
                    checked={isChecked}
                    onChange={handleSwitchChange}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                </p>
              </div>
            </div>

            {isChecked && (
              <>
                <div className="mb-16">
                  <div className="d-flex">
                    <h4 className="subtype-headings fs-16 fw-500">
                      {isShowPOSScreen
                        ? "Update New Details"
                        : "Update New Details"}
                    </h4>
                    {"  "}
                    {/* {!isShowPOSScreen&&
                      <span className="d-flex justify-center" style={{paddingLeft:"10px"}}><i class="bi bi-plus-circle-fill c-pointer text-color fs-18" onClick={() => handleAddRow()}></i></span>
                        } */}
                  </div>
                  {/* <div className="table-container email-table">     //commeneted due to new structure implementation
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>Fund Name</th>
                      <th>Fund Category</th>
                      <th>Premium Allocation</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isShowPOSScreen && (
                      <>
                        {updateSwitchData.map((row, index) => (
                          <tr key={row.id} className="nominee-input">
                            <td>{row.FundName_New}</td>
                            <td>{row.FundCategory_New}</td>
                            <td>{row.PremiumAllocation_New}</td>
                            <td> 
                            <i
                                class="bi bi-trash3-fill"
                                onClick={() => handleDeleteRow(row.id,index)}
                                style={{ color: "#b3201f", cursor: "pointer" }}
                              ></i>
                            </td>
                          </tr>
                        ))}
                        {updateSwitchData?.length === 0 && (
                          <tr>
                            <td colSpan="5">
                              <div className="text-center">
                                <span>No data avalable</span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                  {updateSwitchData?.length > 0 && (
                    <>
                      <tfoot className="fundswitch-tfooter">
                        <tr>
                          <td>Total:</td>
                          <td></td>
                          <td>₹{" "}{totalValue}</td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </>
                  )}
                </table>
              </div> */}

                  <Row gutter={[16, 16]} className="mb-16">
                    <Col
                      className="m-10"
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xxl={12}
                    >
                      <div className="mb-16">
                        <h4 className="subtype-headings fs-16 fw-500 text-center"> Current Fund Allocation</h4>
                        <div className="table-container email-table" style={{ "max-height": "300px", "overflow": "auto" }}>
                          <table className="responsive-table">
                            <thead>
                              {/* <tr>
                                <th colspan="3">From Fund</th>
                              </tr> */}
                              <tr>
                                {/* <th></th> */}
                                <th>Fund Name</th>
                                <th>(%)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!isShowPOSScreen && (
                                <>
                                  {PremiumRedirection?.map((row, index) => (
                                    <tr key={row.id} className="nominee-input">
                                      {/* <td>
                                          <Form.Item
                                              name={`PremiumRedirection[${index}].isChecked`}
                                              className="inputs-label mb-0"
                                          
                                            >

                                            <Checkbox checked={row.isChecked} onChange={(e) => handleCheckboxChange(e, index)}  />
                                            </Form.Item>
                                          </td> */}
                                      <td>{row.uniT_ALLOC_FUND}</td>
                                      <td>{row.uniT_ALLOC_PERC_AMT} </td>
                                    </tr>
                                  ))}
                                  {PremiumRedirection?.length === 0 && (
                                    <tr>
                                      <td colSpan="3">
                                        <div className="text-center">
                                          <span>No data avalable</span>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Col>
                    <Col
                      className="m-10"
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xxl={12}
                    >
                      <div className="mb-16">
                        <h4 className="subtype-headings fs-16 fw-500 text-center"> Desired Fund Allocation </h4>
                        <div className="table-container email-table" style={{ "max-height": "300px", "overflow": "auto" }}>
                          <table className="responsive-table">
                            <thead>
                              <tr className="trr" >
                                <th></th>
                                <th>Fund Name</th>
                                <th>(%)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ToFundVal_Premium?.map((row, index) => (
                                <tr key={row.id} className="nominee-input">
                                  <td>
                                    <Form.Item

                                      className="inputs-label mb-0"

                                    >

                                      <Checkbox checked={row.isChecked} onChange={(e) => handleCheckboxChange3(e, index)} />
                                    </Form.Item>
                                  </td>
                                  <td>{row.fund_Name}</td>
                                  <td>
                                    <Form.Item

                                      className="inputs-label mb-0"

                                    >
                                      <Input
                                        placeholder="Enter a Percenatge"
                                        className="cust-input"
                                        disabled={row.disabled}
                                        value={row.ToPercentage_New}
                                        maxLength={3}
                                        onKeyPress={handleKeyPress}
                                        onChange={(e) => percentageCheck_Premium(e, index)}
                                        onBlur={(e) => handleBlur_Premium(e, index)} // Add this onBlur event
                                      />
                                    </Form.Item>
                                  </td>

                                </tr>
                              ))}
                              {ToFundVal_Premium?.length === 0 && (
                                <tr>
                                  <td colSpan="3">
                                    <div className="text-center">
                                      <span>No data avalable</span>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                {renderDetailsForm("Initiate_RequestBY")}
                {isShowRequestForms && (
                  <>{renderDetailsForm("Request_Details")}</>
                )}
              </>
            )}
          </>
        )}
        {/* Premium Redirection Code End */}

        <div className="contact-details-btn">
          {/* {(!showRaiseRequirementBtn || isShowPOSScreen) && (
            <> */}
          <Button type="primary" className="primary-btn" htmlType="submit">
            {isShowPOSScreen ? "Approve" : "Submit"}
          </Button>
          {/* </>
          )} */}
          {isShowPOSScreen && (
            <Button
              type="primary"
              className="primary-btn"
              htmlType="submit"
            // onClick={() => getRaiseRequirements()}
            >
              Raise Requirement
            </Button>
          )}
        </div>
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
          <div>
            <Form onFinish={handleRequirementSubmit}>
              <div className="reuirement">
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Description</th>
                      <th className="z-index">Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raiseRequerimentList?.length > 0 &&
                      raiseRequerimentList?.map((item, ind) => (
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
                  onClick={() => handleRequirementSubmit()}
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
        title="OTP Verification"
        open={isModalOpen}
        destroyOnClose={true}
        closeIcon={

          <span onClick={() => handleSendOTPClose()}>
            <img src={CloseIcon} alt=""></img>
          </span>

        }
        footer={null}
      >
        {sendOTPErrorMsg && (
          <Alert
            closable
            type="error"
            description={sendOTPErrorMsg}
            onClose={() => setSendOTPErrorMsg(null)}
            showIcon
          />
        )}
        <Spin spinning={sendOTPLoader}>
          <Input
            type="text"
            className="input-label"
            value={otpValue}
            placeholder="Enter Verification Code"
            maxLength={6}
            disabled={!isDisableOTPInput}
            onChange={(e) => {
              handleOTPChange(e);
            }}
          />
          {counter > 0 && (
            <>
              <p className="time-count">Resend OTP in {counter} sec</p>
            </>
          )}
          {counter <= 0 && (
            <>
              <p className="resend-otp">
                OTP to be sent{" "}
                {/* {(
                  props?.details?.sentDetailsObj?.mobileNo ||
                  props?.customerData?.mobileNo
                )?.replace(/.(?=.{4})/g, "x")} */}
                {sendOTPTo?.includes("@") ? sendOTPTo : sendOTPTo?.replace(/.(?=.{4})/g, "x")}
              </p>
            </>
          )}
          <div className="text-center modal-validate">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleSendOTP()}
              disabled={counter > 0}
            >
              {(!validateBtnDisable && "Send OTP") || "Resend OTP"}
            </Button>
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => {
                handleOTP(true);
              }}
              disabled={!validateBtnDisable}
            >
              Validate
            </Button>
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

export default ULIPCallType;

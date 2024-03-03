import React, { useState ,useEffect } from "react";
import PopupAlert from "../popupAlert";
import { useParams } from 'react-router-dom';
import { Button, Checkbox, Select, Tooltip,Row, Col, Radio, Switch,Tabs, Divider,Card, Form,Input, Upload,message, List, Modal, Spin  } from "antd";
import moment from "moment";
import { useNavigate, useLocation  } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import TypesComponent from "../CallTypes/TypesComponent";
import CustomerDetails from "../customerDetails";
import apiCalls from "../../api/apiCalls";
import { useDispatch,useSelector } from 'react-redux';


const EmailManagementView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
    const { TabPane } = Tabs;
    const { Option } = Select;
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    
  const selectionData = useSelector(state => state);
   // Use the useLocation hook to get the current location object
   const location = useLocation();
   // Access the state passed during navigation
   const { state } = location;
  const [isLoading,setIsLoading] = useState(false);
  const [isShowNLPNextscreen, setIsShowNLPNextScreen] = useState(false);
  const formattedDateTime = moment.utc(new Date()).local().format("DD/MM/YYYY hh:mm A");
  const [checkboxes, setCheckboxes] = useState(Array(10).fill(false));
  const [isChecked, setIsChecked] = useState(false);
  const [isLOBChecked, setIsLOBChecked] = useState(false);
  const [isSpamEMS, setIsSpamEMS] = useState(false);
  

  const [showUploadFile, setShowUploadFile] = useState(null);
const [uploadFiles,setUploadFiles] = useState([]);
const [fileList, setFileList] = useState([]);
const [previewVisible, setPreviewVisible] = useState(false);
const [previewFile, setPreviewFile] = useState(null);
const [isShowCallTypes,setIsShowCallTypes] = useState(false);
const [isSubmitClicked,setIsSubmitClicked] = useState(false);
const [searchPolicyData,setSearchPolicyData] = useState({});
const [leftCheckboxes,setLeftCheckboxes] = useState([]);

const [startingScreen,setIsStartingScreen] = useState(true);
const [finalScreen,setIsFinalScreen] = useState(false);
const [emailResponse,setEmailResponse] = useState('');
const [ResForCustomer,setResForCustomer] = useState(false);
const [EmailFromCustomer,setEmailFromCustomer] = useState('');

const [masterData,setMasterData] = useState([]);
const [callTypeLU,setCallTypeLU] = useState([]);
const [subTypeLU, setSubTypeLU] = useState(null);

const [selectedCallType,setSelectedCallType] = useState("");
const [selectedSubTypeId,setSelectedSubTypeId] = useState(null);
const [selectedSubType,setSelectedSubType] = useState(null);

const [alertTitle, setAlertTitle] = useState("");
const [navigateTo, setNavigateTo] = useState("");
const [alertData, setAlertData] = useState("");
const [showAlert, setShowAlert] = useState(false);

const [ResponseForCustomer,setResponseForCustomer] = useState('');
const [EmailResponseDtls,setEmailResponseDtls] = useState('');


const [RegisteredID, setRegisteredID]= useState(false);
const [SelectedPolocies, setSelectedPolocies] = useState([]);
const [mailToSnrLdr, setMailToSnrLdr]= useState(false);
const [IsSenderBlckLst, setIsSenderBlckLst]= useState(false);

const [receivedDateTime, setReceivedDateTime]= useState(false);
const [HideSubmitBtn, setHideSubmitBtn]= useState(true);

const [to, setTo]= useState('');

const [tableNLPData,setTableNLPData] = useState([
  // {
  //   id: 1,
  //   isCheck: false,
  //   callType: "Surrender",
  //   subType: "Surrender Query",
  //   request: "Query",
  //   policyNo:"",
  //   isAddedDynamic: false
  // },
  // {
  //   id: 2,
  //   isCheck: false,
  //   callType: "Payment Related",
  //   subType: "Payment Link",
  //   request: "Request",
  //   policyNo:"",
  //   isAddedDynamic: false
  // },
  // {
  //   id: 3,
  //   isCheck: false,
  //   callType: "Contact Details Update",
  //   subType: "Email Update",
  //   request: "Request",
  //   policyNo:"",
  //   isAddedDynamic: false
  // },
  // {
  //   id: 4,
  //   isCheck: false,
  //   callType: "Contact Details Update",
  //   subType: "Mobile Number Update",
  //   request: "Request",
  //   policyNo:"",
  //   isAddedDynamic: false
  // },
  // {
  //   id: 5,
  //   isCheck: false,
  //   callType: "Servicing Documents",
  //   subType: "Premium Paid Certificate",
  //   request: "Request",
  //   policyNo:"",
  //   isAddedDynamic: false
  // },
  // {
  //   id: 6,
  //   isCheck: false,
  //   callType: "Loan",
  //   subType: "Loan Query",
  //   request: "Query",
  //   policyNo:"",
  //   isAddedDynamic: false
  // },
  // {
  //   id: 7,
  //   isCheck: false,
  //   callType: "Nomination",
  //   subType: "Change in Nominee",
  //   request: "Query",
  //   policyNo:"",
  //   isAddedDynamic: false
  // },
]);


useEffect(()=>{
  getCTST();
  getEmailResponseDtls(id);
  // getEmailDedupe();

},[])


const [leftTableData,setLeftTableData] = useState([
  // {id:1, policyNo:"00110825",value: '00110825', label:'00110825', customerName:"Chetan N", role:"LA",isCheck:false},
  // {id:2, policyNo:"00110826", value: '00110826', label:'00110826', customerName:"Vishnu", role:"Proposer",isCheck:false},
]);
const searchObj ={
  requestheader: {
    "source": "POS",
    "policyNo": "",
    "applicationNo": ""
  
},
requestBody: {
  mobileNo: "",
    emailID: "",
    pan: "",
    customerID: "",
    firstName: "",
    middleName: "",
    lastName: ""
}
}

  const beforeUpload = file => {
    // Add your custom validation logic here
    return true;
  };

  const handleChange1 = ({ fileList }) => {
    setFileList(fileList);
  };


  const getEmailDedupe = (val) => {
    setIsLoading(true);
    //debugger
    let obj = {
       "emailAddress":"ashish.t@futuregenerali.in"
      //"emailAddress":val
    }
    let response = apiCalls.getEmailDedupeAPI(obj);

    response
    .then((val) => {
      //debugger
      if (val?.data?.responseBody?.clientDetails) {
   
          let transformedData = val?.data?.responseBody?.clientDetails?.map((item) => ({
            ...item,
            policyNo:item.policyNumber,
            value:item.policyNumber,
            customerName:item.clientName,
            label: item.policyNumber,
            isCheck:false
          }));
          setLeftTableData(transformedData)
        
        
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
      // setIsLoader(false);
    });

  }
  

  



  const handleRemove = file => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
  };
  // const handleRemove = file => {
  //   // Show a confirmation modal before removing the file
  //   Modal.confirm({
  //     title: 'Confirm Deletion',
  //     content: `Are you sure you want to delete ${file.name}?`,
  //     onOk: () => {
  //       const newFileList = fileList.filter(item => item.uid !== file.uid);
  //       setFileList(newFileList);
  //     },
  //   });
  // };

  const handleDownload = file => {
    // Create a download link and trigger the click event
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(file.originFileObj);
    downloadLink.download = file.name;
    downloadLink.click();
  };

  const handlePreview = file => {
    // Add logic to preview the file (e.g., open a modal or navigate to a preview page)
    console.log('Preview:', file);
    //window.open(file.url || file.thumbUrl, '_blank');
    // const reader = new FileReader();  // download code
    // reader.onloadend = () => {
    //   window.open(reader.result, '_blank');
    // };
    // reader.readAsDataURL(file.originFileObj);

    // Check if the file type is an image or a PDF
    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      // Display images and PDFs directly in the browser
      //window.open(URL.createObjectURL(file.originFileObj), '_blank');
      // Display images and PDFs directly in the browser
      setPreviewFile(file);
      setPreviewVisible(true);
    } else {
      // For other file types, open a new window with a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(file.originFileObj);
      downloadLink.download = file.name;
      downloadLink.click();
    }
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    // Add your custom upload logic here (e.g., using Axios or Fetch)
    // onSuccess should be called when the upload is successful
    // onError should be called when there is an error during upload
    onSuccess();
  };

  const uploadButton = (
    <Button icon={<i
      class="bi bi-paperclip text-color c-pointer fs-20"
      style={{ width: "20px" }}
    ></i>}></Button>
  );

  const handleCheckboxChange = (e, index) => {
    //debugger
    const newValue = e.target.checked;
    const updatedData = [...tableNLPData];
    updatedData[index] = { ...updatedData[index], isCheck: newValue };

    setTableNLPData(updatedData);
  }

  const handlePolicyNumberSelect= (index, value) => {
    const updatedData = [...tableNLPData];
    updatedData[index] = { ...updatedData[index], policyNo: value };
    setTableNLPData(updatedData);
  }

  const handleServiceRequest = (index, value) => {
    //debugger
    const updatedData = [...tableNLPData];
    updatedData[index] = { ...updatedData[index], serviceRequestNumber: value };
    setTableNLPData(updatedData);
    // const newPolicyNumbers = [...policyNumbers];
    // newPolicyNumbers[index] = value.trim(); // Trim the value before updating the state
    // setPolicyNumbers(newPolicyNumbers);
  };
  const handlePolicyNumberChange = (index, value) => {
    //debugger
    const updatedData = [...tableNLPData];
    updatedData[index] = { ...updatedData[index], policyNo: value };
    setTableNLPData(updatedData);
    // const newPolicyNumbers = [...policyNumbers];
    // newPolicyNumbers[index] = value.trim(); // Trim the value before updating the state
    // setPolicyNumbers(newPolicyNumbers);
  };

  const backbutton = () => {
    //debugger
    setIsFinalScreen(false); 
    setIsShowNLPNextScreen(true);
  if(ResForCustomer){
     navigate("/emailmanagement");
  }
  }
  const sentTemplate = (value) => {
   if(value === 'unregistered'){
   
    setResponseForCustomer(`<p>Dear Sender,<br /><br />Kindly send email from your registered mailbox for further processing of your request.<br />Please note we will not be able to service any request from unregistered mail box.</p>
    <br/> <p>Regards,<br />Team FG</p>`);

   }else if(value === 'acknowledge' ) {
    setResponseForCustomer(`<p>Dear Sender,</p>
    <p><br />We acknowledge your mail for policy number &lt;asdasd&gt;. <br />Please note you will receive a separate mail(s) for request raised by you.</p>
    <p><br />Regards,<br />Team FG</p>`)
   }
   else if(value === 'closure' ) {
    setResponseForCustomer(`<p>Dear Sender,</p>
    <p><br />You are hereby informed that your request cannot be processed due to below reasons</p>
    <p><br />Regards,<br />Team FG</p>`)
   }
  }


  const [value, setValue] = useState("Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" 
  );
  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
  const ccMailLU = [
    // { label: 'chetan_26@yahoo.com', value: 'chetan_26@yahoo.com' },
    // { label: 'jayanth.ch@nichebi.com', value: 'jayanth.ch@nichebi.com' },
    // { label: 'Ezytek003@FGILI.onmicrosoft.com', value: 'Ezytek003@FGILI.onmicrosoft.com' },
   
    // { label: 'vishnu@gmail.com', value: 'vishnu@gmail.com' },
    // { label: 'jayaraj@gmail.com', value: 'jayaraj@gmail.com' },
    ];

  const module={
    toolbar: toolbarOptions,
  }
  const valuesData =(
    <> 
    <div>
    <div>
    <span style={{ fontSize: '18px' }}>Quill Rich Text Editor</span>
  </div>
  <div>
    <br />
  </div>
  <div>
    Quill is a free,
    <a href="https://github.com/quilljs/quill/">open source</a> WYSIWYG editor built for the modern web. With its
    <a href="http://quilljs.com/docs/modules/">extensible architecture</a> and a
    <a href="http://quilljs.com/docs/api/">expressive API</a> you can completely customize it to fulfill your needs. Some built-in features include:
  </div>
  <div>
    <br />
  </div>
  <ul>
    <li>Fast and lightweight</li>
    <li>Semantic markup</li>
    <li>Standardized HTML between browsers</li>
    <li>Cross-browser support including Chrome, Firefox, Safari, and IE 9+</li>
  </ul>
  <div>
    <br />
  </div>
  <div>
    <span style={{ fontSize: '18px' }}>Downloads</span>
  </div>
  <div>
    <br />
  </div>
  <ul>
    <li>
      <a href="https://quilljs.com">Quill.js</a>, the free, open source WYSIWYG editor
    </li>
    <li>
      <a href="https://zenoamaro.github.io/react-quill">React-quill</a>, a React component that wraps Quill.js
    </li>
  </ul>
  </div>
    </>
    )
  
  const [tableData, setTableData] = useState([
    // {id:1, isCheck: false, callType: "Surrender", subType: "Surrender Query", request: "Query"},
    // Add your initial rows as needed
  ]);

  const handlePreviewCancel = () => setPreviewVisible(false);

  const handleAddRow = () => {

     let newRow =  {
        id: tableNLPData.length + 1,
        isCheck: true,
        callType: ``,
        subType: ``,
        request: `Query ${tableNLPData.length + 1}`,
        policyNo:"",
        callTypeDesc: ``,
	      subTypeDesc: ``,
        isAddedDynamic: true,
        serviceRequestNumber:''
    }
    setTableNLPData([...tableNLPData, newRow])
    // const newRow = {
    //   id: tableData.length + 1,
    //   callType: `Row ${tableData.length + 1}`,
    //   subType: `Value ${tableData.length + 1}`,
    //   request: `Query ${tableData.length + 1}`,
    // };
    // setTableData([...tableData, newRow]);
  };

  const handleDeleteRow = (id) => {


    const updatedTableData = tableNLPData.filter((row) => row.id !== id);
    setTableNLPData(updatedTableData);
  };

const [policyNumbers, setPolicyNumbers] = useState(Array(tableNLPData?.length).fill('')); // Assuming an array to store Policy Numbers


  // Function to handle checkbox click
  const handleCheckboxClick = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };
  const handleLeftCheckboxClick = (index, env) => {
    setResForCustomer(false);
    const leftTableDataa = [...leftTableData];
    leftTableDataa[index].isCheck = env.target.checked
    setLeftTableData(leftTableDataa);
    let isChecked = leftTableDataa.some((ele) =>ele.isCheck)
    setRegisteredID(isChecked);

    const selectedPolics = leftTableDataa.filter((ele) =>ele.isCheck);
    setSelectedPolocies(selectedPolics)
    // const newCheckboxes = [...leftCheckboxes];
    // newCheckboxes[index] = !newCheckboxes[index];
    // setLeftCheckboxes(newCheckboxes);

  };
  const handleSwitchChange = (checked) => {
    setIsChecked(checked);
    setIsSpamEMS(checked);
  };
  const handleLOBSwitchChange = (checked) => {
    setIsLOBChecked(checked);
  };

  const filterOption = (input, option) =>
(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const transformData = (data, key) => {
    const filteredData = data?.filter((ele) => ele.key === key);
    return filteredData[0]?.value?.map((item) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID,
    }));
  };

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate).format("YYYY-MM-DD HH:mm");
    return formattedDate;
  };

  const subTypeDropdown =async (value,subType,allData)=>{
    let SUB_TYP = masterData?.length>0 ? masterData?.filter((ele) => ele.key === "SUB_TYP") : allData?.filter((ele) => ele.key === "SUB_TYP");
    let data = SUB_TYP[0]?.value?.filter((ele) => ele?.mstParentID === value);
    let transformedData = data?.map((item) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID
    }));
    setSubTypeLU(transformedData);
  }

  const handleCallTypeChange = (value, index) => {
    //debugger
    callTypeLU.find((ele)=>{
      if(ele.mstID === value){

        const updatedData = [...tableNLPData];
        updatedData[index] = { ...updatedData[index], callTypeDesc: ele.mstDesc, callType:value

        };
    
        setTableNLPData(updatedData);
      }
    })
   

      setSelectedCallType(value);
      form.setFieldsValue({subType: null})
      setSubTypeLU(null);
      setSelectedSubType(null);
      subTypeDropdown(value);
    };
    const handleSubTypeChange = (value,getSubLU) => {

      subTypeLU.find((ele)=>{
        if(ele.mstID === value){
  
          const updatedData = [...tableNLPData];
          updatedData[getSubLU] = { ...updatedData[getSubLU], subTypeDesc: ele.mstDesc, subType:value
          };
      
          setTableNLPData(updatedData);
        }
      })


      setSelectedSubTypeId(value);
      let subTypeData = subTypeLU?.length>0 ? subTypeLU : getSubLU;
      subTypeData?.map((key, index) => {
        if(key.mstID===value){
          const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
          setSelectedSubType(modifiedDesc);
        }
      });
    };


  
  const getCTST=async() => {
    
    setIsLoading(true);
    let obj =
    {
      "MasterRequest": [
          "CALL_TYP","SUB_TYP"
      ]
  }
    let response =await apiCalls.ctst(obj);
    if(Array.isArray(response?.data)){
      setMasterData(response.data);
      // Use the function for each set of data
      const transformedData = transformData(response.data, "CALL_TYP");
      setCallTypeLU(transformedData);
      setIsLoading(false);
    }
   else {
      setIsLoading(false);
      message.destroy()
      message.error({
        content: "Something went to wrong!",
        className: "custom-msg",
        duration: 2,
      });
    }
  }

  const handleNext = () => {

 const isChecked = leftTableData.filter((ele)=>{ return ele.isCheck === true})
    if(   isLOBChecked === false && isSpamEMS=== false &&  isChecked.length <= 0){
          setIsShowNLPNextScreen(false);
      setIsStartingScreen(true);
      setIsFinalScreen(false);
      setResForCustomer(true)
      setTableData([]);
    }else if(isLOBChecked === false && isSpamEMS=== false &&  isChecked.length > 0){
      setIsShowNLPNextScreen(true);
      setIsStartingScreen(false)
      setTableData([]);
    }
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleSubmit = (values) => {
    console.log('Received values:', values);
    // Handle form submission logic here
  };
  const getSearchData = async (sharedData) => {
    // setIsShowCallTypes(false)
    let response = apiCalls.getSearchData(sharedData);
    response
      .then((val) => {
        if (val?.data?.responseHeader?.issuccess) {
         setSearchPolicyData(val?.data?.responseBody?.searchDetails);
        // dispatch(someAction('some payload'));
        setIsLoading(false);
        setIsShowCallTypes(true);
        } else {
          message.destroy();
          message.error({
            content:
              val?.data?.responseHeader?.message ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
      });
  };


  const sendEmailSMTP = () => {
    setIsLoading(true);
    setShowAlert(false);
    const values = form.getFieldsValue();
    //debugger
    let obj={
      "ReceipientTo":values?.from ,
      "ReceipientCC":values?.cc ,
      "Subject":values?.subject ? values?.subject:'',
      "MailContent": ResponseForCustomer
    }

    let response = apiCalls.SendEmailSMTP(obj);
    response
      .then((val) => {
        if (val?.data) {
          //debugger
          if (val?.data?.sendStatus) {
            setAlertData(`${"Email Sent Successfully " }`);
            setShowAlert(true);
          }else{
            setAlertData(`${"Failed to send Email" }`);
            setShowAlert(true);
          }
         

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

    //debugger
  }


const saveEmail = ()=>{
  setIsLoading(true);
  setShowAlert(false);
  let emailClassify  = EmailResponseDtls?.emailClassify[0];

  const values = form.getFieldsValue();
  //debugger
debugger
      let selectedCTST = tableNLPData.map((item) => {

        if(item.policyNo && item.callType && item.subType){
          return {
            EmailResponseId: item.EmailResponseId,
            CallType: item.callType ? item.callType : '',
            SubType: item.subType ?item.subType :"",
            DecisionBy: "UserID",
            SrvReqID: item.SrvReqID? item.SrvReqID:"",
            ConfidenceScr: item.ConfidenceScr?item.ConfidenceScr :"",
            SrvReqRefNo: item.SrvReqRefNo? item.SrvReqRefNo:"",
            serviceRequestNumber:item.serviceRequestNumber?item.serviceRequestNumber :"",
            LA_PolicyNo:item.policyNo,
          }
        }else{
          return false
        }
     
      });
      let obj ={
                  "emailResponseId": emailClassify?.emailResponseId,
                  "id": emailClassify?.id,
                  "receivedDateTime": emailClassify?.receivedDateTime,
                  "hasAttachments": emailClassify?.hasAttachments,
                  "internetMessageId": emailClassify?.internetMessageId,
                  "subject": values?.subject,
                  "bodyPreview": emailClassify?.bodyPreview,
                  "importance": emailClassify?.importance,
                  "conversationId": emailClassify?.conversationId,
                  "isRead": emailClassify?.isRead,
                  "isHtml": emailClassify?.isHtml,
                  "body": emailClassify?.body,
                  "from": values?.from,
                  "toRecipients":emailClassify?.to,
                  "ccRecipients": values?.cc ,
                  // "toRecipients":values?.to ?  values?.to.join(', ') : '',
                  // "ccRecipients": values?.cc ?  values?.cc.join(', ') : '',
                  "bccRecipients":emailClassify?.bccRecipients,
                  "replyTo":emailClassify?.replyTo,
                  "isMailSrcLifeLOB": emailClassify?.isMailSrcLifeLOB,
                  "regdMailID": emailClassify?.regdMailID,
                  "mailsReceived": emailClassify?.mailsReceived,
                  "cntOfToRecipients": emailClassify?.cntOfToRecipients,
                  "cntOfCcRecipients":emailClassify?.cntOfCcRecipients,
                  "cntOfBccRecipients": emailClassify?.cntOfBccRecipients,
                  "prntEmailID": emailClassify?.prntEmailID,
                  "mailToSnrLdr": emailClassify?.mailToSnrLdr,
                  "custName":emailClassify?.custName,
                  "isNLPRespGen": emailClassify?.isNLPRespGen,
                  "lifeOrNonLife":emailClassify?.lifeOrNonLife,
                  "reqSrc": emailClassify?.reqSrc,
                  "status": emailClassify?.status,
                  "source": emailClassify?.source,
                  "policyNo": emailClassify?.policyNo,
                  "applicationNo": emailClassify?.applicationNo,
                  "dob":emailClassify?.dob,
                  "isSpamEMS": emailClassify?.isSpamEMS,
                  "isSpamNLP": emailClassify?.isSpamNLP,
                  "dmlStatus": emailClassify?.dmlStatus,
                  "assignedTo": emailClassify?.assignedTo,
                  "emailAgeing": emailClassify?.emailAgeing,
                  "emailAgeingHrs": emailClassify?.emailAgeingHrs,
                  "repeatCount": emailClassify?.repeatCount,
                  "addressedToMultipleIDs": emailClassify?.addressedToMultipleIDs,
                  "mergedMail": emailClassify?.mergedMail,
                  "isSenderBlckLst": emailClassify?.isSenderBlckLst,
                  "urn": emailClassify?.urn,
                  "emailClassCTSTs": selectedCTST,
                  "emailClassAttmnts": emailClassify?.emailClassAttmnts,

                  // "emailClassAttmnts":[
                  //     {
                  //         "EmailResponseId":0,
                  //         "FileName":"myfile.txt",
                  //         "FileExtnMime":"application/pdf",
                  //         "FileSizeKB":12312
                  //     }
                  // ],
                  // "emailClassCTSTs":[
                  //     {
                  //         "EmailResponseId":0,
                  //         "CallType":0,
                  //         "SubType":0,
                  //         "DecisionBy":"UserID",
                  //         "SrvReqID": 0,
                  //         "ConfidenceScr":0,
                  //         "SrvReqRefNo":""            
                  //     }
                  // ]
              }

              let response = apiCalls.SaveEmailResponseDtls(obj);
              response
                .then((val) => {
                  setEmailResponseDtls(val?.data);
                  if (val?.data?.dmlStatus === 1) {
                    setAlertData(`${"Service Request Saved " }`);
                    setResForCustomer(true)
                    // setNavigateTo("/emailmanagement");
                    setShowAlert(true);
                    setIsLoading(false);
                    setHideSubmitBtn(false);
                  } else {
                    setAlertData(`${"Service Request Failed " }`);
                    setResForCustomer(true)
                    // setNavigateTo("/emailmanagement");
                    setShowAlert(true);
                    setIsLoading(false);
                  }
                })
                .catch((err) => {
                });



      }

  const getEmailResponseDtls = async (id) => {
    //debugger
          let obj = {
            "EmailResponseId": Number(id)
          }
    let response = apiCalls.GetEmailResponseDtls(obj);
    response
      .then((val) => {
        setEmailResponseDtls(val?.data);
        if (val?.data?.emailClassify[0]) {
          let res = val?.data?.emailClassify[0];

          getEmailDedupe(res?.from);
          setMailToSnrLdr(res?.mailToSnrLdr);
          setIsSenderBlckLst(res?.isSenderBlckLst);
          setEmailResponse(val?.data?.emailClassify[0]);
          setReceivedDateTime(res?.receivedDateTime)
          setTo(res?.toRecipients)
     
        let dt =  res?.emailClassCTSTs?.map((ele,index)=>{
            return {...ele, 
              id : index,
              isCheck: false,
              policyNo:"",
              isAddedDynamic: false,
              serviceRequestNumber:''
            }

         })
         setTableNLPData(dt);

        setIsLoading(false);
        let toRecipients = res?.from ? res?.from : '';
        let ccRecipients = res?.ccRecipients ? res?.ccRecipients: '';
        //debugger
     
          form.setFieldsValue({
            from:toRecipients,
            cc:ccRecipients,
             subject:res?.subject,
             ReceivedDateTime:res.receivedDateTime

          
          })
    
          setEmailFromCustomer(res.body)
        // form2.setFieldsValue({
        //   isSpamEMS:res.isSpamEMS,
        //   isMailSrcLifeLOB:res.isMailSrcLifeLOB
        //   isSpamEMS:false,
        //   isMailSrcLifeLOB:true
        // })
  
        // setResponseForCustomer(res.body)
        // setIsShowCallTypes(true);
        } else {
          message.destroy();
          message.error({
            content:
              val?.data?.responseHeader?.message ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
      });
  };


  


  const isAtLeastOneCheckboxSelected = () => {
    return checkboxes.some((isChecked) => isChecked);
  };

  const isPolicyNumbersValid = () => {
    console.log('Policy Numbers:', policyNumbers);
    return policyNumbers.some((policyNumber) => policyNumber.trim() !== '');
  };

  const handleSubmitRespond=()=>{
 
 debugger

   const selectedIndices = tableNLPData.filter((ele)=>{
    return ele.isCheck 
   });

  // Check if at least one checkbox is selected
  if (selectedIndices.length > 0) {
    // Check if there is a non-empty policy number for each selected checkbox
    const isValid = selectedIndices.filter((ele) =>{ 
      return ele.policyNo === '' || ele.policyNo ===undefined
    });


    if (isValid.length === 0) {
      // Perform your submit logic here
      // setIsShowNLPNextScreen(false);
      // setIsStartingScreen(false);
      // setIsFinalScreen(true)
    } else {
    
        message.destroy();
        message.warning({
          content:
            "Please provide valid Policy Numbers for all selected checkboxes.",
          className: "custom-msg",
          duration: 2,
        });
      return
    }
    
  }
  else{
  
      // Display a validation message
      message.destroy();
      message.warning({
        content: "Please Provide Policy Details.",
        className: "custom-msg",
        duration: 2,
      });
      return
  }
  saveEmail()
}
  const handleArroeClick=(policyNo)=>{
    setIsLoading(true);
    const value = policyNo?.trim();
    if(!isNaN(+value)){
     searchObj.requestheader.policyNo = value;
     searchObj.requestBody.mobileNo = value;
     searchObj.requestBody.emailID = value;
     searchObj.requestBody.customerID = value;
    }
    else {
     searchObj.requestheader.applicationNo = value;
     searchObj.requestBody.pan = value;
     searchObj.requestBody.firstName = value;
     searchObj.requestBody.middleName = value;
     searchObj.requestBody.lastName = value;
    }
    getSearchData(searchObj);
  
  }


  return (
    <>
    <Spin spinning={isLoading} fullscreen />
      <div className="emailmanagement-view">
        <Row gutter={[16, 16]}>
        <Col
            xs={24}
            sm={24}
            md={9}
            lg={9}
            xxl={9}
            className="rightsection-view"
          >
            {/* <Card hoverable={true} className="rightsection-view"> */}
              <h5 className="text-center pb-8 border-bottom ">NLP Response</h5>
            {startingScreen && (
              <>
                <div className="nlp-section">
                <Form form={form2}>
                  <div className="nlp-details">
                    <p>Is this a Spam Email</p>
                    <p className="text-center">
                     Yes
                    </p>
                    <p className="spam-email text-right">


<Form.Item
           
                  name="isSpamEMS"
                  className="inputs-label mb-0"
                >

                {/* <Radio.Group  buttonStyle="solid">
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>

                </Radio.Group> */}
             

             <Switch
                      checked={isSpamEMS}
                      onChange={handleSwitchChange}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />


                </Form.Item>
                 
                    </p>
                  </div>
                  <div className="nlp-details">
                    <p>Is Email Addressed to Life LOB</p>
                    <p className="text-center">
                      Yes
                    </p>
                    <p className="life-lob text-right">
                    <Form.Item
                          name="isMailSrcLifeLOB"
                          className="inputs-label mb-0"
                        >
                  
                    {/* <Radio.Group  buttonStyle="solid">
                      <Radio.Button value={true}>Yes</Radio.Button>
                      <Radio.Button value={false}>No</Radio.Button>

                    </Radio.Group> */}

<Switch
                      checked={isLOBChecked}
                      onChange={handleLOBSwitchChange}
                      checkedChildren="Non Life"
                      unCheckedChildren="Life"
                    />

                    </Form.Item>
             
                    </p>
                  </div>
                  </Form>
                </div>
                <div className="table-container email-table mb-16 policy-table">
                  <table className="responsive-table " >
                    <thead>
                      <tr>
                        <th>Policy No</th>
                        <th>Customer Name</th>
                        <th>Role</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {leftTableData?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.policyNo}</td>
                          <td>{item.customerName}</td>
                          <td>{item.role}</td>
                          <td>
                            <Checkbox
                              checked={item.isCheck}
                              onChange={(event) => {handleLeftCheckboxClick(index, event);}}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="float-right nlp-btn">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="primary-btn"
                    onClick={() => handleNext()}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
            {isShowNLPNextscreen && (
              <>
                <div className="table-container email-table mt-8">
                  <table className="responsive-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Call Type</th>
                        <th>Sub Type</th>
                        <th>Policy No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableNLPData?.map((item, index) => (
                         <> {item.isAddedDynamic=== false &&
                        <tr key={index}>
                          <td>
                            <Checkbox
                             checked={item.isCheck}
                              onChange={(e) => handleCheckboxChange(e, index)}
                              disabled={isSubmitClicked}
                            />
                          </td>
                          <td><Tooltip title={`Q/R/C: ${item.request}`}>{item.callTypeDesc}</Tooltip></td>
                          <td>{item.subTypeDesc}</td>
                          <td><div className="d-flex align-center">


                                            <Select
                          
                        
                          className="cust-input calltype-select"
                          maxLength={100}
                          placeholder="Select Policy Number"
                          options={SelectedPolocies}
                          name="policyNo" 
                          onChange={(e) => handlePolicyNumberSelect(index,e)}
                        ></Select>

                            {/* <Input type="text" placeholder="Policy Number" disabled={isSubmitClicked&&checkboxes[index]}
                              value={item.policyNo}
                              onChange={(e) => handlePolicyNumberChange(index, e.target.value)}
                              /> */}
                          {isSubmitClicked&&checkboxes[index]&&<>
                          {/* <Tooltip title="Click here"> */}
                          <i class="bi bi-arrow-right-circle-fill text-color c-pointer" onClick={()=>handleArroeClick(policyNumbers[index])}></i>
                          {/* </Tooltip> */}
                          </>}
                          </div></td>
                        </tr> }
                        
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                {!isSubmitClicked&&<>
                <div className="nlp-section">
                   <Button
                    type="primary"
                    htmlType="submit"
                    className="primary-btn mb-10"
                    onClick={() => handleAddRow()}
                  >
                    More CT ST? Click here
                  </Button>
                  
                  <div className="table-container email-table tbl-res">
                    <table className="responsive-table">
                      <thead>
                        <tr>
                          {/* <th></th> */}
                          <th>Call Type</th>
                          <th>Sub Type</th>
                          {/* <th>Q / R / C</th> */}
                          <th>Policy No</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>

                  
                        

                        {tableNLPData.map((row, index) => (
                           <> {row.isAddedDynamic=== true &&
                          <tr key={row.id}>
                            {/* <td>{row.id}</td> */}
                            <td>
                              {" "}
                              <Select
                                className="inputs-label cust-input"
                                placeholder="Select a Call Type"
                               
                                options={ callTypeLU}
                                filterOption={filterOption}
                                onChange={(value) => {handleCallTypeChange(value,index );}}
                              />
                            </td>
                            <td>
                              <Select
                                className="inputs-label cust-input"
                                placeholder="Select a Sub Type"
                                options={subTypeLU}
                                filterOption={filterOption}
                                onChange={(value) => {handleSubTypeChange(value, index);
                                
                                }}
                              />
                            </td>
                            {/* <td>
                              <Select
                                className="inputs-label cust-input"
                                placeholder="Select Request"
                                options={[
                                  {
                                    value: "query",
                                    label: "Query",
                                  },
                                  {
                                    value: "request",
                                    label: "Request",
                                  },
                                  {
                                    value: "complaint",
                                    label: "Complaint",
                                  },
                                ]}
                              />
                            </td> */}
                            <td>
                              
                              {/* <Input type="text" placeholder="Enter Policy No" value={row.policyNo}
                              onChange={(e) => handlePolicyNumberChange(index, e.target.value)} />
                               */}

                                  <Select
                          
                        
                          className="cust-input calltype-select"
                          maxLength={100}
                          placeholder="Select Policy Number"
                          options={SelectedPolocies}
                          name="policyNo" 
                          onChange={(e) => handlePolicyNumberChange(index,e)}
                        ></Select>
                              
                              </td>
                            <td>
                              <i
                                class="bi bi-trash3-fill"
                                onClick={() => handleDeleteRow(row.id)}
                                style={{ color: "#b3201f", cursor: "pointer" }}
                              ></i>
                            </td>
                          </tr>
                           }</>
                        ))}
                        {tableNLPData?.length === 0 && (
                          <tr>
                            <td colSpan="5">
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
                </>}

                <div className="contact-details-btn">
                  <Button
                    type="primary"
                    className="primary-btn"
                    onClick={() => {setIsStartingScreen(true); setIsShowNLPNextScreen(false)}}
                  >
                    Back
                  </Button>
                  { HideSubmitBtn &&
  <Button type="primary" className="primary-btn" onClick={()=>{handleSubmitRespond()}}>
  Submit & Respond
</Button>
                  }
                
                </div>
              </>
            )}

              {finalScreen && (
              <>
                <div className="table-container email-table mt-8">
                  <table className="responsive-table">
                    <thead>
                      <tr>
                        {/* <th></th> */}
                        <th>Call Type - Sub Type (Policy No)</th>
                        {/* <th>Sub Type</th> */}
                        <th>Service Request Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableNLPData?.map((item, index) => (
                         <> {item.isCheck=== true &&
                        <tr key={index}>
                          {/* <td>
                            <Checkbox
                             checked={item.isCheck}
                              onChange={(e) => handleCheckboxChange(e, index)}
                              disabled={isSubmitClicked}
                            />
                          </td> */}
                          <td><Tooltip title={`Q/R/C: ${item.request}`}>{item.callTypeDesc} - {item.subTypeDesc} ({item.policyNo})</Tooltip></td>
                          {/* <td>{item.subTypeDesc}</td> */}
                          <td><div className="d-flex align-center">
                            <Input type="text" placeholder="Service Request Number" disabled={isSubmitClicked&&checkboxes[index]}
                              value={item.serviceRequestNumber}
                              onChange={(e) => handleServiceRequest(index, e.target.value)}
                              />
                          {isSubmitClicked&&checkboxes[index]&&<>
                          {/* <Tooltip title="Click here"> */}
                          <i class="bi bi-arrow-right-circle-fill text-color c-pointer" onClick={()=>handleArroeClick(policyNumbers[index])}></i>
                          {/* </Tooltip> */}
                          </>}
                          </div></td>
                        </tr> }
                        
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
     

                <div className="contact-details-btn">
                  <Button
                    type="primary"
                    className="primary-btn"
                    onClick={() => { backbutton() }}
                  >
                    Back
                  </Button>
                  {!ResForCustomer &&
                  <Button type="primary" className="primary-btn" onClick={()=>{saveEmail()}}>
                    Submit & Respond
                  </Button>
        }
                </div>
              </>
            )}


            {/* </Card> */}
          </Col>
          <Col
            xs={24}
            sm={24}
            md={15}
            lg={15}
            xxl={15}
            className="leftsection-view"
          >
            {isShowCallTypes&&searchPolicyData?.length>0&&<>
            {/* <TypesComponent isEmailManagement={true}></TypesComponent> */}
            <CustomerDetails isEmailManagement={true} searchPolicyData={searchPolicyData[0]}></CustomerDetails>
            </>}
            {!isShowCallTypes&&<>
            {/* <Card hoverable={true} className="leftsection-view"> */}
            <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-8">
            <div className="d-flex align-center mb-16" style={{gap: "20px"}}>
              <p className="paragraph-mb">Registered ID: {RegisteredID ?  <i class="bi bi-check2 email-yesicon"></i> : <i class="bi bi-x cross-icon"></i>  }</p>
              <p className="paragraph-mb">Sent To SLT:{mailToSnrLdr ? <i class="bi bi-check2 email-yesicon"></i> : <i class="bi bi-x cross-icon"></i>}  </p>
              <p className="paragraph-mb">Debarred Sender:{IsSenderBlckLst ? <i class="bi bi-check2 email-yesicon"></i> : <i class="bi bi-x cross-icon"></i>}  </p>
            </div>
            </Col>
            {/* <div className="d-flex justify-content">
                <p>Chetan Naik</p>
                <p>{"<naikchetan_26@yahoo.com>"}</p>
                <p>{formattedDateTime}</p>
             
            </div> */}
             {/* <p className="custom-word-spacing">
                From: {"Chetan Naik <naikchetan_26@yahoo.com>"} 
                {formattedDateTime}
              </p> */}
    
            <Form
          form={form}
          name="wrap"
          labelCol={{
            flex: "10%",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          onFinish={sendEmailSMTP}
          autoComplete="off"
        >


            <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-8">
            <Form.Item
        label="From"
        name="from"
        className="inputs-label  mb-0"
        rules={[{ required: true, message: 'Please enter the recipient(s)!' }]}
      >

<Input type="text" placeholder="Subject" value={state?.torecipients}/>

         {/* <Select
         className="send-mails"
      mode="multiple"
      allowClear
      style={{
        width: '100%',
      }}
      placeholder="Recipients"
     defaultValue={state?.torecipients}
      onChange={handleChange}
      options={ccMailLU}
    /> */}
        </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-8">
                <Form.Item label="Cc" name="cc" className="inputs-label mb-0">
                  
<Input type="text" placeholder="Cc" value={state?.ccrecipients}/>
                {/* <Select
      mode="multiple"
      allowClear
      style={{
        width: '100%',
      }}
      placeholder="CC"
     defaultValue={state?.ccrecipients}
      onChange={handleChange}
      options={ccMailLU}
    /> */}
      </Form.Item>
                </Col>
                {/* <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-16">
                <Form.Item label="Bcc" name="bcc" className="inputs-label mb-0">
                <Select
      mode="multiple"
      allowClear
      style={{
        width: '100%',
      }}
      placeholder="BCC"
      onChange={handleChange}
      options={ccMailLU}
    />
      </Form.Item>
                </Col> */}
                <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-8">
                <Form.Item
        label="Subject"
        name="subject"
        className="inputs-label mb-0"
        rules={[{ required: true, message: 'Please enter the subject!' }]}
      >
        <Input type="text" placeholder="Subject" value={state?.subject}/>
      </Form.Item>
                </Col>





                <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-8">
          <Form.Item
             label="Attachments"
             name="Attachments"
             className="inputs-label mb-0"
            //  rules={[{ required: true, message: 'Please enter the subject!' }]}
          >
          <p>
                 {/* <Upload  {...uploadProps}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                      fileList={uploadFiles}
                      >
                 <i
                  class="bi bi-paperclip text-color c-pointer fs-20"
                  style={{ width: "20px" }}
                ></i>
               </Upload> */}
            
            <Upload
            multiple={true}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange1}
        onRemove={handleRemove}
        customRequest={customRequest}
        onPreview={handlePreview}
        showUploadList={false}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      {fileList.length > 0 && (
      <List
        style={{ marginTop: 16 }}
        itemLayout="horizontal"
        dataSource={fileList}
        renderItem={file => (
          <List.Item
            actions={[
              // <Button type="link" onClick={() => handlePreview(file)}>
              //   Preview
              // </Button>,
                <Button type="link" onClick={() => handleDownload(file)}>
                <DownloadOutlined /> Download
              </Button>,
                <Button type="link" danger onClick={() => handleRemove(file)}>
                <DeleteOutlined /> Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={file.name}
              description={`File Size: ${(file.size / 1024).toFixed(2)} KB`}
            />
          </List.Item>
        )}
      />
      )}
              </p>
          </Form.Item>
          </Col>
           
            {/* <div className="fw-800">
              <h6>Subject: Request For Premium Paid Certificate</h6>
            </div> */}
            {/* <Divider></Divider> */}
          {/* <Tabs>
          <TabPane tab={"Mail From Customer"} key="1">
  <ReactQuill className="quill-container" modules={module} theme="snow" value={value} />
              
          </TabPane>
          <TabPane tab={"Response For Customer"} key="2">
          <div className="sent-template mb-16">
          <Form.Item
                  label= "Sent Template"
                  name="sentTemplate"
                  className="inputs-label mb-0"
                >
                  <Select
                    className="cust-input"
                    maxLength={100}
                    placeholder="Select a Sent Template"
                    options={[
                        {
                          value: "acknowledge",
                          label: "Acknowledge",
                        },
                        {
                            value: "closure",
                            label: "Closure",
                          },
                      ]}
                  ></Select>
                </Form.Item>
          </div>
              <ReactQuill className="quill-container" modules={module} theme="snow" value={value} />
        
          <div className="float-right nlp-btn">
              <Button type="primary" htmlType="submit" className="primary-btn">
                Send
              </Button>
            </div>

          </TabPane>
          </Tabs> */}
           

            {ResForCustomer&&<>
           <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-16">
        
          <div> 
          <h6 className="fw-700">Response For Customer</h6> 
          <div className="sent-template mb-16">
          <Form.Item
                  label= "Sent Template"
                  name="sentTemplate"
                  className="inputs-label mb-0"
                >
                  <Select
                    onChange={(value) => {
                      sentTemplate(value)
                    }}

                    className="cust-input"
                    maxLength={100}
                    placeholder="Select a Sent Template"
                    options={[
                        {
                          value: "acknowledge",
                          label: "Acknowledge",
                        },
                        {
                            value: "closure",
                            label: "Closure",
                          },
                          {
                            value: "unregistered",
                            label: "UnRegistered Mail",
                          },
                      ]}
                  ></Select>
                </Form.Item>
          </div>
          <ReactQuill className="quill-container" modules={module} theme="snow" value={ResponseForCustomer} />
          {/* <Form.Item
                  label= ""
                  name="ResponseForCustomer"
                  className="inputs-label mb-0"
                  rules={[{ required: true, message: 'Response For Customer  Required' }]}
                >
              
              </Form.Item> */}
            </div>
            </Col>
            </>}
         <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-16">
        <div> 
          <h6 className="">Email From Customer @ {convertDate(receivedDateTime)} in {to}
          </h6>
          <ReactQuill className="quill-container" theme="snow" value={EmailFromCustomer} readOnly={true}/>    
          </div>
          
          </Col>
          {ResForCustomer&&<>
          <div className="float-right nlp-btn">
              <Button type="primary" htmlType="submit" className="primary-btn"  >
                Send
              </Button>
            </div> 
            </>} 
         
    </Form>
          
            {/* </Card> */}
            </>}
          </Col>
        
        </Row>
      </div>
       {/* Modal for image and PDF preview */}
       <Modal
        open={previewVisible}
        title={previewFile?.name}
        onCancel={handlePreviewCancel}
        footer={null}
      >
        {previewFile && (
          <img
            alt={previewFile.name}
            style={{ width: '100%' }}
            src={URL.createObjectURL(previewFile.originFileObj)}
          />
        )}
      </Modal>
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
    </>
    
  );
};

export default EmailManagementView;

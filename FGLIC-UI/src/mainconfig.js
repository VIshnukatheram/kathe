const Data = {
      mobilenumberupdate: 
      {
        BOE_Details: [
          { name: "custRole",label: "Mobile Number to be Updated For ?", inputType: "dropdown",required: true,disabled:false,validationmsg: "Select Mobile Number to be Updated For ",placeholder:"Select" },
          { name: "requestchannel",label: "Request Mode",inputType: "dropdown",required: true,validationmsg: "Select Request Mode",placeholder:"Request Mode" },
          { name: "Mobile_Old",label: "Existing Mobile",inputType: "text",required: false,disabled:true,validationmsg: "Existing Mobie Missing",maxlength:10,minlength:10, message:'Enter 10 Digits',placeholder:"Existing Mobile" },
          { name: "Mobile_New",label: "New Mobile",inputType: "phonenumber",pattern:'numbersOnly',required: true,validationmsg: "Enter New Mobile",maxlength:10,minlength:10, message:'Enter 10 Digits',placeholder:"New Mobile" },
          { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,disabled:false,validationmsg: "Select Customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
        ],
        POS_Details :[
          { name: "custRole",label: "Mobile Number to be Updated For ?",inputType: "dropdown",required: true,disabled:true,validationmsg: "",placeholder:"Select" },
          { name: "srvReqID",label: "Request ID No",inputType: "text",required: false,validationmsg: "Enter Request ID No",disabled:true,placeholder:"Request ID No" },
          { name: "Mobile_Old",label: "Existing Mobile",inputType: "text",required: false,disabled:true,validationmsg: "Existing Mobile Missing",maxlength:10,minlength:10, message:'Enter 10 Digits',placeholder:"Existing Mobile" },
          { name: "Mobile_New",label: "New Mobile",inputType: "phonenumber",pattern:'numbersOnly',required: true,validationmsg: "Enter New Mobile",maxlength:10,minlength:10, message:'Enter 10 Digits',placeholder:"New Mobile" },
          { name: "DedupeMatch",label: "Dedupe Match Details",inputType: "link",linkValue:"Link" },
          {name:"requestform",indexName:"Minor Alteration",label:"Request Form",inputType:"link",hide:false,linkValue:"View",required:false,validationmsg:"",placeholder:"Request Form"},
          { name: "ValidateSignature",label: "Validate Signature",class:'disabled',inputType: "radio",required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
          { name: "BranchComments",label: "Requestor Comments",inputType: "text",required: false,disabled:true,validationmsg: "Requestor Comments",placeholder:"Requestor Comments" },
          { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comments" },
        ],
        Checklist : [
          {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
          { name: "customersigningdate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
          { name: "branchreceivedate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
          { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
          { name: "ValidateSignature",label: "Validate Signature",hide:false, inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        ],
        Comments:[
          { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comments" },
        ]
      },
   
    emailupdate: {
      BOE_Details: [
        { name: "custRole",label: "Email Id to be Updated For?",inputType: "dropdown",required: true,validationmsg: "Select Email Id to be Updated For",placeholder:"Select" },
        { name: "requestchannel",label: "Request Mode",inputType: "dropdown",required: true,validationmsg: "Select Request Mode",placeholder:"Request Mode" },
        { name: "Email_Old",label: "Existing Email", disabled:true, inputType: "text",required: false,validationmsg: "Existing Email is missing",placeholder:"Existing Email" },
        { name: "Email_New",label: "New Email",inputType: "email",required: true,validationmsg: "Enter New Email",placeholder:"New Email" },
        { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,validationmsg: "Select customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
      ],
     
      POS_Details :[
        { name: "custRole",label: "Email Id to be Updated For?",inputType: "dropdown",required: true,disabled:true,validationmsg: "",placeholder:"Select" },
        { name: "srvReqID",label: "Request ID No",inputType: "text",required: false,validationmsg: "",placeholder:"Request ID No" },
        { name: "Email_Old",label: "Existing Email",inputType: "text", disabled:true,required: false,validationmsg: "",placeholder:"Existing Email" },
        { name: "Email_New",label: "New Email",inputType: "email", required: true,validationmsg: "Enter New Email",placeholder:"New Email" },
        { name: "DedupeMatch",label: "Dedupe Match Details",inputType: "link",linkValue:"Link",required: false,validationmsg: "",placeholder:"Request Form" },
        {name:"requestform",indexName:"Minor Alteration",label:"Request Form",inputType:"link",linkValue:"View",required:true,validationmsg:"",placeholder:"Request Form"},
        { name: "ValidateSignature",label: "Validate Signature",class:'disabled',hide:false,disabled:true,inputType: "radio",required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Commnets",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comments" },
      ],
    
      Buttons : [
        { label: 'Send OTP' },
      ],
      Checklist : [
        {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
        { name: "customersigningdate", label: "Customer Signing Date", inputType: "nofuturedates",placeholder: "Select a date",required:true,validationmsg:"Select Customer Signing Date", },
        { name: "branchreceivedate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
      ReasonSubmission:[
        { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
      ]
    },
    alternatenumberupdate: {
      BOE_Details: [
        { name: "custRole",label: "Alternate Number to be Updated For ?",inputType: "dropdown",required: true,validationmsg: "Select Alternate Number to be Updated For",placeholder:"Select" },
        { name: "requestchannel",label: "Request Mode",inputType: "dropdown",required: true,validationmsg: "Select Request Mode",placeholder:"Request Mode" },
        { name: "AlternateNo_Old",label: "Existing Alternate Number",inputType: "text",required: false,disabled:true,maxlength:10,minlength:10, message:'Enter 10 Digits',validationmsg: "Existing Alternate Number Missing",placeholder:"Existing Alternate Number" },
        { name: "AlternateNo_New",label: "New Alternate Number",inputType: "phonenumber",pattern:'numbersOnly',required: true,maxlength:10,minlength:10, message:'Enter 10 Digits',validationmsg: "Enter New Alternate Number",placeholder:"New Alternate Number" },
        { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,validationmsg: "Select customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
      ],
     
      POS_Details :[
        { name: "custRole",label: "Alternate Number to be Updated For ?",inputType: "dropdown",required: true,disabled:true,validationmsg: "Select Alternate Number to be Updated For",placeholder:"Select" },
        { name: "srvReqID",label: "Request ID No",inputType: "text",required: true,validationmsg: "Enter Request ID No",placeholder:"Request ID No" },
        { name: "AlternateNo_Old",label: "Existing Alternate Number",inputType: "text",required: false,disabled:true,maxlength:10,minlength:10, message:'Enter 10 Digits',validationmsg: "Existing Alternate Number Missing",placeholder:"Existing Alternate Number" },
        { name: "AlternateNo_New",label: "New Alternate Number",inputType: "phonenumber",pattern:'numbersOnly',required: true,maxlength:10,minlength:10, message:'Enter 10 Digits',validationmsg: "Enter New Alternate Number",placeholder:"New Alternate Number" },
        { name: "DedupeMatch",label: "Dedupe Match Details",inputType: "link",linkValue:"Link",required: false,validationmsg: "",placeholder:"Request Form" },
        {name:"requestform", indexName:"Minor Alteration", label:"Request Form",inputType:"link",linkValue:"View",required:true,validationmsg:"",placeholder:"Request Form"},
        { name: "ValidateSignature",label: "Validate Signature",hide:false,class:'disabled',inputType: "radio",required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Commnets",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "",placeholder:"Comment Box" },
      ],
      Buttons : [
        { label: 'Send OTP' },
      ],
      Checklist : [
        {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"",placeholder:"Request Form"},
        { name: "customersigningdate", label: "Customer Signing Date", inputType: "nofuturedates",placeholder: "Select a date", required:true,validationmsg:"Select Customer Signing Date",},
        { name: "branchreceivedate", label: "Request Received Date", inputType: "nofuturedates",placeholder: "Select a date", required:true,validationmsg:"Select Request Received Date",},
        { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
      ReasonSubmission:[
        { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
      ]
    },
    worknumberupdate: {
      BOE_Details: [
        { name: "custRole",label: "Work Number to be Updated For ?",inputType: "dropdown",required: true,validationmsg: "Select",placeholder:"Select" },
        { name: "requestchannel",label: "Request Mode",inputType: "dropdown",required: true,validationmsg: "Select Request Mode",placeholder:"Request Mode" },
        { name: "WorkNo_Old",label: "Existing Work Number",inputType: "text",required: false,disabled:true,maxlength:10,minlength:10, message:'Enter 10 Digits',validationmsg: "",placeholder:"Existing Work Number" },
        { name: "WorkNo_New",label: "New Work Number",inputType: "phonenumber",pattern:'numbersOnly',required: true,maxlength:10,minlength:10, message:'Enter 10 Digits',validationmsg: "Enter New Work Number",placeholder:"New Work Number" },
        { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,validationmsg: "Select Customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
      ],
     
      POS_Details :[
        { name: "custRole",label: "Work Number to be Updated For ?",inputType: "dropdown",required: false,disabled:true,validationmsg: "",placeholder:"Select" },
        { name: "srvReqID",label: "Request ID No",inputType: "text",required: true,validationmsg: "",placeholder:"Request ID No" },
        { name: "WorkNo_Old",label: "Existing Work Number",inputType: "text",required: false,disabled:true,maxlength:10,minlength:10, message:'Enter 10 Digits',validationmsg: "",placeholder:"Existing Work Number" },
        { name: "WorkNo_New",label: "New Work Number",inputType: "phonenumber",pattern:'numbersOnly',required: true,maxlength:10,minlength:10, message:'Enter 10 Digits',validationmsg: "Enter New Work Number",placeholder:"New Work Number" },
        { name: "DedupeMatch",label: "Dedupe Match Details",inputType: "link",linkValue:"Link",required: false,validationmsg: "",placeholder:"Request Form" },
        {name:"requestform",indexName:"Minor Alteration",label:"Request Form",inputType:"link",linkValue:"View",required:true,validationmsg:"",placeholder:"Request Form"},
        { name: "ValidateSignature",label: "Validate Signature",hide:false,class:'disabled',inputType: "radio",required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Commnets",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
    
      Buttons : [
        { label: 'Send OTP' },
      ],
      Checklist : [
        {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
        { name: "customersigningdate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "branchreceivedate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
        { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
      ReasonSubmission:[
        { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",required: true,validationmsg: "Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
      ]
    },
    addresschange: {
      Change_Fields:[
        { name: "custRole",label: "Address Details to be Updated For ?",inputType: "dropdown",required: true,validationmsg: "Select Address Details",placeholder:"Select" },
        { name: "requestchannel",label: "Request Mode",inputType: "dropdown",required: true,validationmsg: "Select Request Mode",placeholder:"Select a Request Mode" },
        { name: "Request_for",label: "Request For",inputType: "dropdown",required: true,validationmsg: "Select Request For",placeholder:"Select a RequestFor" },
      ],
      BOE_Details: [
        { name: "existingdetails",label: "Current Address",inputType: "title"},
        { name: "lin1",label: "Line1",inputType: "texts" },
        { name: "Old_Address",label: "",inputType: "textbox",required: true,disabled:true,validationmsg: "Current Address Missing",placeholder:"Current Address" },
        { name: "existingdetails",label: "New Address",inputType: "title" },
        { name: "instantAadhar",label: "Instant Update Via Aadhar",inputType: "texts"},
        { name: "New_Line1",label: "Line1",inputType: "text",required: true,validationmsg: "Enter Line1",placeholder:"Line1" },
        { name: "New_Line2",label: "Line2",inputType: "text",required: true,validationmsg: "Enter Line2",placeholder:"Line2" },
        { name: "New_LandMark",label: "Land Mark",inputType: "text",required: true,validationmsg: "Enter Land Mark",placeholder:"Land Mark" },
        { name: "New_Pincode",label: "Pin Code",inputType: "number", pattern:'numbersOnly', maxlength:6,minlength:6, message:'Enter 6 Digits',required: true,validationmsg: "Enter Pin Code",placeholder:"Pin Code" },
        { name: "New_City",label: "City",inputType: "text", pattern:'alphabatesOnly', required: false,validationmsg: "Enter City",placeholder:"City" },
        { name: "New_State",label: "State",inputType: "text",pattern:'alphabatesOnly', required: false,validationmsg: "Enter State",placeholder:"State" },
      ],
      POS_Details :[
        { name: "custRole",label: "Address Details to be Updated For ?",inputType: "dropdown",required: true,disabled:true,validationmsg: "Select Address Details",placeholder:"Select" },
        { name: "srvReqID",label: "Request ID No",inputType: "text",required: true,disabled:true,validationmsg: "Enter Request ID No" },
        { name: "existingdetails",label: "Current Address",inputType: "title" },
        { name: "lin1",label: "",inputType: "texts" },
        { name: "Old_Address",label: "",inputType: "textbox",disabled:true, required: true,validationmsg: "Current Address Missing",placeholder:"Current Address" },
        { name: "existingdetails",label: "New Address",inputType: "title" },
        { name: "instantAadhar",label: "Instant Update Via Aadhar",inputType: "texts" },
        { name: "New_Line1",label: "Line1",inputType: "text",required: true,validationmsg: "Enter Line1",placeholder:"Line1" },
        { name: "New_Line2",label: "Line2",inputType: "text",required: true,validationmsg: "Enter Line2",placeholder:"Line2" },
        { name: "New_LandMark",label: "Land Mark",inputType: "text",required: true,validationmsg: "Enter Land Mark",placeholder:"Land Mark" },
        { name: "New_Pincode",label: "Pin Code",inputType: "text",required: true,validationmsg: "Enter Pin Code",maxlength:6,placeholder:"Pin Code" },
        { name: "New_City",label: "City",inputType: "text",required: true,validationmsg: "Enter City",placeholder:"City" },
        { name: "New_State",label: "State",inputType: "text",required: true,validationmsg: "Enter State",placeholder:"State" },
        {name:"requestform",indexName:"Address Proof",label:"Request Form",inputType:"link",linkValue:"View",placeholder:"Request Form"},
        { name: "addressProof", label: "Address Proof", linkValue:"View",inputType: "link",placeholder: "Address proof" },
        { name: "ValidateSignature",label: "Validate Signature",hide:false,class:'disabled',inputType: "radio",required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "BranchComments",label: "Requestor Comments",inputType: "textarea", disabled:true, maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
        // { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Valid Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no", },
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      
      ],
    
      Buttons : [
        { label: 'Aadhar Check' },
        { label: 'Send OTP' },
      ],
      Request_Details : [
        { name: "reasonforchange", label: "Reason For Change / Update", inputType: "text",required: true,validationmsg: "Enter Reason For Change / Update", placeholder: "Reason for change/update" },
        { name: "requestsource", label: "Request Source", inputType: "dropdown",required: true,validationmsg: "Select Request Source",placeholder: "Request Source" },
        { name: "requestdate", label: "Request Date & Time", inputType: "date",required: true,validationmsg: "Select Request Date & Time",placeholder: "" },
        { name: "customersigning", label: "Customer Signing Date & Time", inputType: "nofuturedates",required: true,validationmsg: "Select Customer Signing Date & Time",placeholder: "", },
        { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",required: true,validationmsg: "Select Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
        { name: "requestmode", label: "Request Mode", inputType: "dropdown",required: true,validationmsg: "Enter Line1",placeholder: "Request Mode" },
      ],
      Checklist : [
        {name:"requestform",indexName:"Address Proof",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
        //  { name: "addressProof", label: "Upload Address Proof", linkValue:"List of Acceptable Address Proofs",inputType: "link",required:false,validationmsg:"Upload Address Proof",placeholder: "Address proof" },
       
        {name: 'addressProof',label: 'Upload Address Proof',inputType: "text", linkValue:"List of Acceptable Address Proofs", required: true,validationmsg: "",disabled:false,placeholder:"Documents Uploaded - 0", indexName:"Bank Details Updation", icon:'upload'},


        { name: "customersigningdate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "branchreceivedate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
        { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,hide:false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      ReasonSubmission:[
        { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission",required: true,validationmsg: "Enter Reason for Delayed Submission", },
      ],
      BOE_Comments:[
        { name: "BOEComments",label: "BOE  Comments" ,inputType: "textarea",disabled:true, maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
        { name: "POSComments",label: "POS Comments" ,inputType: "textarea", disabled:true,maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
        { name: "Commentss",label: "Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },]
    },
    landmarkaddition: {
        Change_Fields:[
          { name: "custRole",label: "Address Details to be Updated For ?",inputType: "dropdown",required: true,validationmsg: "",placeholder:"Select" },
          { name: "requestFor",label: "Request For",inputType: "dropdown",required: true,validationmsg: "Select Request For",placeholder:"Select a RequestFor" },
          { name: "requestchannel",label: "Request Mode",inputType: "dropdown",required: true,validationmsg: "Select Request Mode",placeholder:"Select a Request Mode" },
        ],
        BOE_Details: [
          { name: "New_LandMark",label: "Add Land Mark",inputType: "text",isLandMark: true,required: true,validationmsg: "",placeholder:"Add Land Mark" },
          { name: "customerchoice",label: "Customer Choice",inputType: "texts" },
          { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,validationmsg: "Select Customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
         
        ],
        POS_Details :[
          { name: "custRole",label: "Address Details to be Updated For ?",inputType: "dropdown",required: true,validationmsg: "Select Address Details",placeholder:"Select" },
          { name: "srvReqID",label: "Request ID No",inputType: "text",required: true,validationmsg: "Enter Request ID No" },
          { name: "existingdetails",label: "Current Address",inputType: "title" },
          { name: "lin1",label: "Line1",inputType: "texts" },
          { name: "existingAddress",label: "",inputType: "textbox",required: true,validationmsg: "Current Address Missing",placeholder:"Current Address" },
          { name: "existingdetails",label: "New Address",inputType: "title" },
          { name: "instantAadhar",label: "Instant Update Via Aadhar",inputType: "texts"},
          { name: "newlin1",label: "Line1",inputType: "text",required: true,validationmsg: "Enter Line1",placeholder:"Line1" },
          { name: "newlin2",label: "Line2",inputType: "text",required: true,validationmsg: "Enter Line2",placeholder:"Line2" },
          { name: "newlin3",label: "Land Mark",inputType: "text",required: true,validationmsg: "Enter Land Mark",placeholder:"Land Mark" },
          { name: "newpincode",label: "Pin Code",inputType: "text",required: true,validationmsg: "Enter Pin Code",placeholder:"Pin Code" },
          { name: "newcity",label: "City",inputType: "text",required: true,validationmsg: "Enter City",placeholder:"City" },
          { name: "newstate",label: "State",inputType: "text",required: true,validationmsg: "Enter State",placeholder:"State" },
          {name:"requestform",indexName:"Minor Alteration",label:"Request Form",inputType:"link",linkValue:"View",required:false,validationmsg:"",placeholder:"Request Form"},
          { name: "addressProof", label: "Address Proof", linkValue:"View",inputType: "link",placeholder: "Address proof" },
          { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:1,secondRadioValue:2, },
          { name: "addressProof", label: "Address Proof",inputType: "texts"},
          { name: "requestmode",label: "",inputType: "textarea", maxlength:500,required: true,validationmsg: "",placeholder:"Comment Box" },
        ],
      
        Buttons : [
          { label: 'Aadhar Check' },
          { label: 'Send OTP' },
        ],
        Request_Details : [
          { name: "reasonforchange", label: "Reason For Change / Update", inputType: "text",required:true,validationmsg:"Select Reason For Change", placeholder: "Reason for change/update" },
          { name: "requestsource", label: "Request Source", inputType: "dropdown",required:true,validationmsg:"Select Request Source",placeholder: "Request Source" },
          { name: "requestdate", label: "Request Date & Time", inputType: "date",required:true,validationmsg:"Select Request Date",placeholder: "" },
          { name: "customersigning", label: "Customer Signing Date & Time", inputType: "date",required:true,validationmsg:"Select Customer Signing Date ",placeholder: "", },
          { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",required:true,validationmsg:"Select Reason For Delay",placeholder: "Reason for Delayed Submission" },
          { name: "requestmode", label: "Request Mode", inputType: "dropdown",required:true,validationmsg:"Select Request Mode",placeholder: "Request Mode" },
        ],
        Checklist : [
          {name:"requestform",indexName:"Bank Details Updation",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
          { name: "customersigningdate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
          { name: "branchreceivedate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
          { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
          { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        ],
        ReasonSubmission:[
          { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",required:true,validationmsg:"Enter Reason For Submission",placeholder: "Reason for Delayed Submission" },
        ]
    },
    bankdetailsupdation: {
      BOE_Details:[
        { name: "assistFor",label: "Assist For",inputType: "radio",required: true,validationmsg: "Select Assist For",title:"Query",secondTitle:"Request",radioValue:"query",secondRadioValue:"request" },
        { name: "requestchannel",label: "Request Mode",inputType: "dropdown",required: true,validationmsg: "Select Request Mode",placeholder:"Request Mode" },
        { name: "custRole",label: "Bank Details For ?",inputType: "dropdown",required: true,validationmsg: "Select Bank Details For",placeholder:"Select" },
      ],
      Existing_Bank_Details: [
        {name:"existBankDetails",label:"Existing Bank Details",inputType:"title"},
        // { name:"",label:"",inputType:"texts"},
        { name: "Bank_IFSC_Old",label: "IFSC",inputType: "text",required: false,disabled:true, validationmsg: "",placeholder:"IFSC" },
        { name: "Bank_Name_Old",label: "Bank Name",inputType: "text",required: false,disabled:true, validationmsg: "",placeholder:"Bank Name" },
        { name: "Acc_Type_Old",label: "Account Type",inputType: "dropdown",required: false,disabled:true, validationmsg: "",placeholder:"Account Type" },
        { name: "Acc_HldrName_Old",label: "Account Holder Name",inputType: "text",required: false,disabled:true, validationmsg: "",placeholder:"Account Holder Name" },
        { name: "Acc_Number_Old",label: "Account Number",inputType: "number", pattern:'numbersOnly', required: false,disabled:true, validationmsg: "",placeholder:"Account Number" },
        // { name: "RegistredOn_Old",label: "Registered On",inputType: "date",required: false,disabled:true, validationmsg: "",placeholder:"Registered On" },
      ],
      Query_Bank_Fields: [
        { name: "sendBankUpdateProcess",label: "Send Bank Update Process",inputType: "icons",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
        // { name: "sendBankUpdateForm",label: "Send Bank Update Form",inputType: "icons",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
        // { name: "sendListOfBankProofs",label: "Send List of Acceptable Bank Proofs",inputType: "icons",required: false,validationmsg: "", placeholder: "Loan Available"},
      ],
      Bank_Details:[
        // { name: "custRole",label: "Bank Details to be Updated For ?",inputType: "dropdown",required: false,validationmsg: "Select",placeholder:"Select" },
        // { name: "requestchannel",label: "Request Mode",inputType: "dropdown",required: false,validationmsg: "Select Request Mode",placeholder:"Request Mode" },
      ],
      New_Bank_Details: [
        { name:"newBankDetails",label:"Update New Bank Details",inputType:"title"},
        // { name:"",label:"",inputType:"texts"},
        { name: "Bank_IFSC_New",label: "IFSC",inputType: "ifsccodenumber",required: true,minlength:11,maxlength:11,validationmsg: "Enter IFSC",placeholder:"IFSC" },
        { name: "Bank_Name_New",label: "Bank Name",inputType: "text",required: true,validationmsg: "Enter Bank Name",placeholder:"Bank Name" },
        { name: "Acc_Type_New",label: "Account Type",inputType: "dropdown",required: true,validationmsg: "Select Account Type",placeholder:"Account Type" },
        { name: "Acc_HldrName_New",label: "Account Holder Name",inputType: "text",required: true,validationmsg: "Enter Account Holder Name",placeholder:"Account Holder Name" },
        { name: "Acc_Number_New",label: "Account Number",inputType: "number",pattern:'numbersOnly', required: true,validationmsg: "Enter Account Number",placeholder:"Account Number" },
        { name: "reenteraccountNumber",label: "Re-enter Bank Account Number",inputType: "number", pattern:'numbersOnly', required: true,validationmsg: "Re-enter Bank Account No",placeholder:"Re-enter Bank Account Number" },
        { name: "PennyDrop",label: "Initiate Penny Drop",inputType: "text", disabled:false, hyperLink:true,required: true,validationmsg: "Enter Initiate Penny Drop",placeholder:"Initiate Penny Drop" },
        
        {name: 'addressProof',label: 'Bank Account Proof',inputType: "text", linkValue:"List of Acceptable Bank Proof", required: true,validationmsg: "",disabled:false,placeholder:"Documents Uploaded - 0", indexName:"Bank Details Updation", icon:'upload'},
        
      //  { name: "addressProof",label: "Upload Bank Account Proof", linkValue:"List of Acceptable Bank Acc Proof",inputType: "link",required:true,validationmsg:"Upload Bank Account Proof",placeholder: "Bank Account proof",indexName:"Bank Details Updation" },
        { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,validationmsg: "Select customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
      ],
      RequestForm_Fields: [
        {name:"requestform",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form",indexName:"Bank Details Updation"},
        // { name: "addressProof", label: "Upload Bank Account Proof", linkValue:"List of Acceptable Bank Acc Proof",inputType: "link",required:true,validationmsg:"Upload Bank Account Proof",placeholder: "Bank Account proof",indexName:"Bank Details Updation" },
       
      ],
      // Bank_Upload:[
      //   { name: "addressProof",label: "Upload Bank Account Proof", linkValue:"List of Acceptable Bank Acc Proof",inputType: "link",required:true,validationmsg:"Upload Bank Account Proof",placeholder: "Bank Account proof",indexName:"Bank Details Updation" },
      // ],
      Authorization_Letter:[
        {name:"authorizationLetter",label:"Upload Authorization Letter",inputType:"upload",required:true,validationmsg:"Upload Authorization Letter",placeholder:"Upload Authorization Letter",indexName:"Bank Details Updation"},
      ],
      Date_Fields:[
        {name:"requestform",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form",indexName:"Bank Details Updation"},
        { name: "customerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "Req_Via",label: "Request Received Via",inputType: "dropdown",required: true,validationmsg: "Select Request Mode",placeholder:"Request Received Via" },
        { name: "branchreceivedate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
        { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      ThirdParty_Fields:[
        {name:"authorizationLetter",label:"Upload Authorization Letter",inputType:"upload",required:true,validationmsg:"Upload Authorization Letter",placeholder:"Upload Authorization Letter",indexName:"Bank Details Updation"},
        { name: "Req_Via",label: "Request Received Via",inputType: "dropdown",required: true,validationmsg: "Select Request Received Via",placeholder:"Request Received Via" },
        { name: "customerSigningDate", label: "Customer Signing Date", inputType: "date",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "branchreceivedate", label: "Request Received Date", inputType: "date",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
        { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      // ReasonSubmission:[
      //   { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",required:true,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
      // ],
      POS_Details: [
        { name: "assistFor",label: "Assist For",inputType: "radio",disabled: true,validationmsg: "Select Assist For",title:"Query",secondTitle:"Request",radioValue:"query",secondRadioValue:"request" },
        { name: "custRole",label: "Bank Details For ?", disabled:true, inputType: "dropdown",required: false,validationmsg: "Select",placeholder:"Select" },
        { name: "requestchannel",label: "Request Mode", disabled:true, inputType: "dropdown",required: false,validationmsg: "Select Request Mode",placeholder:"Request Mode" },
        { name: "srvReqID", label: "Request ID No",  disabled:true, inputType: "text",placeholder: "Request ID No" },
        // {name:"existBankDetails",label:"View Existing Bank Details",inputType:"title"},
        // { name:"",label:"",inputType:"texts"},
        // { name: "ifscCode",label: "IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"IFSC" },
        // { name: "bankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
        // { name: "accounttype",label: "Account Type",inputType: "text",required: false,validationmsg: "",placeholder:"Account Type" },
        // { name: "accountHolderName",label: "Account Holder Name",inputType: "text",required: false,validationmsg: "",placeholder:"Account Holder Name" },
        // { name: "accountNumber",label: "Account Number",inputType: "text",required: false,validationmsg: "",placeholder:"Account Number" },
        // { name: "registeredOn", label: "Registered On", inputType: "text",placeholder: "Registered On" },
        { name:"newBankDetails",label:"View New Bank Details",inputType:"title", icon:'edit'},
        // { name:"",label:"",inputType:"texts"},
        { name: "Bank_IFSC_New",label: "IFSC",inputType: "text",required: true,validationmsg: "Enter IFSC",placeholder:"IFSC",posEdit:true, disabled:true },
        { name: "Bank_Name_New",label: "Bank Name",inputType: "text",required: true,validationmsg: "Enter Bank Name",placeholder:"Bank Name", posEdit:true, disabled:true },
        { name: "Acc_Type_New",label: "Account Type",inputType: "dropdown",required: true,validationmsg: "Select Account Type",placeholder:"Account Type", posEdit:true, disabled:true },
        { name: "Acc_HldrName_New",label: "Account Holder Name",inputType: "text",required: true,validationmsg: "Enter Account Holder Name",placeholder:"Account Holder Name", posEdit:true, disabled:true },
        { name: "Acc_Number_New",label: "Account Number",inputType: "text",required: true,validationmsg: "Enter Account Number",placeholder:"Account Number", posEdit:true, disabled:true },
        { name: "PennyDropResult", label: "Penny Drop Result", inputType: "text",required: true,disabled:true, validationmsg: "Enter Penny Drop Result",placeholder: "Penny Drop Result", posEdit:true, disabled:true },
        {name:"requestform",label:"Request Form",inputType:"link",linkValue:"View",required:false,validationmsg:"Request Form",placeholder:"Request Form"},
        { name: "addressProof", label: "Bank Account Proof",inputType: "link",linkValue:"View",placeholder: "Bank Account proof" },
        {name:"authorizationLetter",label:"Authorization Letter",inputType: "link",linkValue:"View",required:false,validationmsg:"Request Form",placeholder:"Authorization Letter"},
        { name: "dedupeCheck",label: "De-Dupe Match Details",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"De-Dupe Check" },
        // { name: "validatesignature",label: "Signature Validated",inputType: "radio",required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "PennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "Initiate Penny Drop",placeholder:"Initiate Penny Drop" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,hide:false,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,hide:false,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
      { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,required:false,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",disabled:true,required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      // { name: "BranchComments",label: "Requestor Comments",inputType: "text",disabled: true,validationmsg: "Comments",placeholder:"Branch Comment" },
      { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ]
    },
    revivalquotation:{
      Out_Of_Revival:[
        { name: "outOfRevival", label: "Out Of Revival", inputType: "dropdown",required:true,validationmsg:"Select Out Of Revival",placeholder: "Out Of Revival" },
      ],
      Out_Of_Revival_Yes_Fields:[
        {name: 'totalPremiumDue',label: 'Total Premium Due',inputType: "text", hyperLink:true, required: false,validationmsg: "Total Premium Due",placeholder:"Total Premium Due" },
        { name: "overduePeriod",label: "Overdue period",inputType: "text",required: false,validationmsg: "Enter Overdue period",placeholder:"Overdue period" },
        { name: "InterestWaiverCampaign",label: "Interest Waiver Campaign ",inputType: "text",required: false,validationmsg: "",placeholder:"Interest Waiver Campaign " },
        { name: "InterestWaiverCampaignAmount",label: "Interest Waiver Campaign Amount",inputType: "text",required: false,validationmsg: "",placeholder:"Interest Waiver Campaign Amount" },
        { name: "PremiumHoliday",label: "Premium Holiday",inputType: "text",required: false,validationmsg: "",placeholder:"Premium Holiday" },
        { name: "AmountPayableafterinterestwaiver",label: "Amount Payable after interest waiver",inputType: "text",required: false,validationmsg: "",placeholder:"Amount Payable after interest waiver" },
        // { name: "ViewRevivalRequirements",label: "View Revival Requirements",inputType: "text",hyperLink:true,required: false,validationmsg: "",placeholder:"View Revival Requirements" },
        // {name:"",label:"",inputType:"texts"},
        {name: 'SendRevivalQuotation',label: 'Send Revival Quotation and Payment Link',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" },
        // {name: 'SendRevivalLink',label: 'Send Revival Link',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" },
      ],
      POS_Details:[
        { name: "outOfRevival", label: "DGH Required", inputType: "dropdown",required:true,validationmsg:"Select Out Of Revival",placeholder: "DGH Required" },
        { name: "paymentVia", label: "Payment Via", inputType: "dropdown",required:true,validationmsg:"Select Payment Via",placeholder: "Payment Via" },
      ],
      Cash_Details:[
        { name: "amount",label: "Amount",inputType: "text",required: false,validationmsg: "",placeholder:"Amount" },
        { name: "receiptNumber",label: "Receipt Number",inputType: "text",required: false,validationmsg: "",placeholder:"Receipt Number" },
        {name:"uploadDGHForm",label:"Upload DGH Form",inputType:"upload",required:true,validationmsg:"Upload DGH Form",placeholder:"Upload DGH Form"},
        {name:"uploadIncomeProof",label:"Upload Income Proof",inputType:"upload",required:true,validationmsg:"Upload Income Proof",placeholder:"Upload Income Proof"},
      ],
      Cheque_Details:[
        { name: "amount",label: "Amount",inputType: "text",required: false,validationmsg: "",placeholder:"Amount" },
        { name: "receiptNumber",label: "Receipt Number",inputType: "text",required: false,validationmsg: "",placeholder:"Receipt Number" },
        { name: "chequeNumber ",label: "Cheque Number ",inputType: "text",required: false,validationmsg: "",placeholder:"Cheque Number " },
        { name: "ChequeDate ",label: "Cheque Date",inputType: "text",required: false,validationmsg: "",placeholder:"DD/MM/YYYY" },
        { name: "BankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
        {name:"uploadDGHForm",label:"Upload DGH Form",inputType:"upload",required:true,validationmsg:"Upload DGH Form",placeholder:"Upload DGH Form",indexName:"Revival DGH"},
        {name:"uploadIncomeProof",label:"Upload Income Proof",inputType:"upload",required:true,validationmsg:"Upload Income Proof",placeholder:"Upload Income Proof",indexName:"Revival DGH"},
      ],
      Online_Details:[
        {name: 'SendRevivalLink',label: 'Send Revival Link',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" },
        {name:"uploadDGHForm",label:"Upload DGH Form",inputType:"upload",required:true,validationmsg:"Upload DGH Form",placeholder:"Upload DGH Form",indexName:"Revival DGH"},
        {name:"uploadIncomeProof",label:"Upload Income Proof",inputType:"upload",required:true,validationmsg:"Upload Income Proof",placeholder:"Upload Income Proof",indexName:"Revival DGH"},
      ]

},
    loanamountenquiry:{
          BOE_Details:[
            {name:"ExistingLoanDetails",label:"View Existing loan Details",inputType:"titlecheckbox",loan:true,required:true,validationmsg:""},
            {name:"EligibleLoanDetails",label:"View Eligible Loan Details",inputType:"titlecheckbox",loan:true,required:true,validationmsg:""},
            {name:"shareprocess",label:"Share Statement / Link",inputType:"titlecheckbox",loan:true,required:true,validationmsg:""},
          ],
          Existing_Loan_Details:[
            { name: "LoanDisbursed",label: "Loan Disbursed on",inputType: "text",disabled:true,required: false,validationmsg: "Enter Loan Disbursed on",placeholder:"Loan Disbursed on"},
            { name: "LoanInterest",label: "Loan Interest %",inputType: "text",disabled:true,required: false,validationmsg: "Enter Loan Interest %",placeholder:"Loan Interest %"},
            { name: "OriginalLoanAmount",label: "Original Loan Amount",inputType: "text",disabled:true,required: false,validationmsg: "Enter Original Loan Amount",placeholder:"Original Loan Amount"},
            { name: "TotalLoanInterest",label: "Total Loan Interest",inputType: "text",disabled:true,required: false,validationmsg: "Enter Total Loan Interest",placeholder:"Total Loan Interest"},
            { name: "TotalLoanAmountRepaid",label: "Total Loan Amount Repaid",inputType: "text",disabled:true,required: false,validationmsg: "Enter Total Loan Amount Repaid",placeholder:"Total Loan Amount Repaid"},
            { name: "LoanOutstanding",label: "Loan Outstanding",inputType: "text",disabled:true,required: false,validationmsg: "Enter Loan Outstanding",placeholder:"Loan Outstanding"},
            { name: "LastLoanRepaidDate",label: "Last Loan Repaid Date",inputType: "text",disabled:true,required: false,validationmsg: "Enter Last Loan Repaid Date",placeholder:"Last Loan Repaid Date"},
            { name: "PolicyAssignedTo",label: "Policy Assigned To",inputType: "text",disabled:true,required: false,validationmsg: "Enter Policy Assigned To",placeholder:"Policy Assigned To"},
            // { name: "PolicyBondSubmitted",label: "Policy Bond Submitted",inputType: "text",required: false,validationmsg: "Enter Policy Bond Submitted",placeholder:"Policy Bond Submitted"},
            // { name: "DispatchDetails",label: "View Dispatch Details",inputType: "link",linkValue:"Details",required: false,validationmsg: "Enter View Dispatch Details",placeholder:"View Dispatch Details"},
          ],
          Eligible_Loan_Details:[
            { name: "LoanApplicable",label: "Loan Applicable",inputType: "text",disabled:true,required: false,validationmsg: "Enter Loan Applicable",placeholder:"Loan Applicable"},
            { name: "LoanPercent",label: "Loan %",inputType: "text",disabled:true,required: false,hide:true, validationmsg: "Enter Loan %",placeholder:"Loan %"},
            // { name: "SurrenderValue",label: "Surrender Value",inputType: "text",disabled:true,required: true,validationmsg: "Enter Surrender Value",placeholder:"Surrender Value"},
            { name: "MaxLoanvalue",label: "Max Loan value",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Enter Max Loan value",placeholder:"Max Loan value"},
            { name: "LoanValueDate",label: "Loan Value Date",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Enter Loan Value Date",placeholder:"Loan Value Date"},
            // { name: "LoanValueRequested",label: "Loan Value Requested",inputType: "number", pattern: 'numbersOnly', required: true,validationmsg: "Enter Loan Value Requested",placeholder:"Loan Value Requested"},
            { name: "NoOfTimesLoanTakenInThePolicy",label: "No of times loan taken in the policy",hide:true,inputType: "text",disabled:true,required: false,validationmsg: "Enter Loan Taken",placeholder:"No of times loan taken in the policy"},
          ],
     

          Share_Process_Details:[
            // {name: 'SENDLOANPROCESS',label: 'Send Loan Process',inputType: "icons",required: false,validationmsg: "",},
            // {name: 'SENDFORMS',label: 'Send Forms',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" },
            // {name: 'PROOFSORDOCUMENTSREQURIED',label: 'Proofs / Documents requried  ',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" },
            {name: 'SENTLOANREPAYMENTLINK',label: 'Send Loan Repayment Link',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" },
            {name: 'LOANSTATEMENT',label: 'Send Loan Statement',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" }
          ],
          Share_Loan_Process_Details:[
            {name: 'SENDLOANPROCESS',label: 'Send Loan Process',inputType: "icons",required: false,validationmsg: "",},
          ]
    },

    // ****************************************************** Loan Request *********************************************//
    loanrequest:{
      BOE_Details:[
        { name: "MaxLoanEligible",label: "Max Loan Eligible",inputType: "text",required: true,disabled:true,validationmsg: "Enter Max Loan Eligible",placeholder:"Max Loan Eligible"},
        { name: "LoanValueRequested",label: "Loan Value requested",inputType: "decimal", pattern: 'numbersOnly',required: true,validationmsg: "Enter Loan Value requested",placeholder:"Loan Value requested"},
        { name: "NoOfTimesLoanTakenInThePolicy",label: "No of times loan taken in the policy",disabled:true,inputType: "text",required: false,validationmsg: "Enter No of Tokens",placeholder:"No of times loan taken in the policy"},
        { name: "PANNumber",label: "PAN",inputType: "text",required: false, disabled:true, maxlength:10,minlength:10, pattern:'charactersOnly',validationmsg: "PAN Number",placeholder:"PAN Number"},
        { name: "PANResult",label: "PAN Validation Result",inputType: "text",disabled:true,  required: false,validationmsg: "PAN Number",placeholder:"PANResult"},
        { name: "NameinPAN",label: "Name as per PAN",inputType: "text",disabled:true, required: false,validationmsg: "PAN Number",placeholder:"PAN Name"},
        { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       // { name: "CKYCNumber",label: "CKYC Number",inputType: "text",required: false,  disabled:true, maxlength:14,minlength:14, pattern:'charactersOnly', validationmsg: "CKYCNumber must be at least 14 characters",placeholder:"CKYC Number"},
       // { name: "CKYCResult",label: "CKYC Validation Result",inputType: "text", disabled:true, required: false,validationmsg: "PAN Number",placeholder:"CKYCResult"},
        // { name: "Address",label: "Address",inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Address",placeholder:"Address" },
        { name: "viewRequestDetails",label: "Bank Details",inputType: "title"},
        { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
        { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
        { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
        { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
        { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
        // { name: "pennyDropResult",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder:"Penny Drop Result" },
        { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
        { name: "NameOnAccount",label: "Name as per Penny Drop",inputType: "text",required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
        // { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        // {name:"BankAccountProof",label:"Upload Bank Account Proof",inputType: "upload",required:false,validationmsg:"",placeholder:"Upload Bank Account Proof",indexName:"Loan Request"},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "",placeholder:"Comments" },

      ],
      View_Documents_title: [
        { name: "uploadDocuments",label: "Upload Documents",inputType: "accordian"},
      ],
      View_Documents: [
        {name:"surrenderForm", label:"Upload Request Form",inputType: "upload",required:false,validationmsg:"",placeholder:"Upload Request Form",indexName:"Loan Request"},
        {name:"policyBond",label:"Upload Policy Bond/Indemnity",inputType: "upload",required:false,validationmsg:"",placeholder:"Upload Policy Bond/Indemnity",indexName:"Loan Request"},
        {name:"policyOwnerIDProof",label:"Upload Policy Owner ID Proof",inputType: "upload",required:false,validationmsg:"",placeholder:"Upload Policy Owner ID Proof",indexName:"Loan Request"},
        {name:"policyOwneraddressProof",label:"Upload Policy Owner Address Proof",inputType: "upload",required:false,validationmsg:"",placeholder:"Upload Policy Owner Address Proof",indexName:"Loan Request"},
        {name:"uploadPAN",label:"Upload PAN Card",inputType: "upload",hide:true,required:false,validationmsg:"",placeholder:"Upload PAN Card",indexName:"Loan Request"},
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",hide:true,required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"",placeholder: "Reason For Delayed Submission ", },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
      // View_BankDetails_title: [
      //   { name: "updateBankDetails",label: "View Bank Details ",inputType: "accordian"},
      // ],
      View_Bank_Details: [
        { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
        { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
        { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
        { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
        { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
        // { name: "pennyDropResult",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder:"Penny Drop Result" },
        { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
        { name: "NameOnAccount",label: "Name as per Penny Drop",inputType: "text",required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
        { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        {name:"BankAccountProof",label:"Upload Bank Account Proof",inputType: "upload",required:false,validationmsg:"",placeholder:"Upload Bank Account Proof",indexName:"Loan Request"},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "",placeholder:"Comments" },
      ],
      ReasonSubmission:[
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",required:false,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
      ],
      POS_Details:[
        { name: "MaxLoanEligible",label: "Max Loan Eligible",inputType: "text",disabled:true,required: false,validationmsg: "Enter Max Loan Eligible",placeholder:"Max Loan Eligible"},
        { name: "LoanValueRequested",label: "Loan Value requested",inputType: "text",disabled:true,required: false,validationmsg: "Enter Loan Value requested",placeholder:"Loan Value requested"},
        { name: "NoOfTimesLoanTakenInThePolicy",label: "No of times loan taken in the policy",disabled:true,inputType: "text",required: false,validationmsg: "Enter Loan Taken",placeholder:"No of times loan taken in the policy"},
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",hide:false, disabled:true,required:false,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",hide:false,disabled:true,required:false,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", disabled:true,hide:true,inputType: "text",required:false,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delay" },
     //   { name: "BranchRemarks", label: "Authorizer Comments",disabled:true, inputType: "text",required:false,placeholder: "Requestor Comments" },
    //  { name: "texts",label: "",inputType: "texts", hide:true},
     { name: "viewRequestDetails",label: "Documents",inputType: "title" },
    //  { name: "texts",label: "",inputType: "texts", hide:true},
     {name:"surrenderForm",indexName:'Loan Request',label:"Uploaded Documents",inputType: "link",linkValue:"View",required:false,validationmsg:"",placeholder:"Upload Surrender Form"},
     {name: "validatesignature",label: "Signature Validated",inputType: "radio",disabled:true,required: false,validationmsg: "Signature Validated",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},

     { name: "viewRequestDetails",label: "Bank Details",inputType: "title",   icon:'edit' },
    //  { name: "texts",label: "",inputType: "texts", hide:true},
     { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C", posEdit:true, disabled:true},
     { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC", posEdit:true,  disabled:true},
     { name: "BankAccountNumber",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number", posEdit:true, disabled:true},
     { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Confirm Bank Account Number", posEdit:true, disabled:true},
     { name: "BankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name", posEdit:true, disabled:true },
     { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder:"Penny Drop Result", posEdit:true, disabled:true },


    ],
      // POS_Documents_title: [
      //   { name: "uploadDocuments",label: "View Documents",inputType: "accordian"},
      // ],
      // POS_View_Documents:[
      //   {name:"surrenderForm",indexName:'Loan Request',label:"Uploaded Documents",inputType: "link",linkValue:"View",required:false,validationmsg:"",placeholder:"Upload Surrender Form"},

      //   {name:"surrenderForm",indexName:'Loan Request',label:"Upload Loan Form",inputType: "link",linkValue:"View",required:false,validationmsg:"",placeholder:"Upload Surrender Form"},
      //   {name:"policyBond",indexName:'Loan Request',label:"Upload Policy Bond/Indemnity",inputType: "link",linkValue:"View",required:false,validationmsg:"",placeholder:"Upload Policy Bond/Indemnity"},
      //   {name:"policyOwnerIDProof",indexName:'Loan Request',label:"Upload Policy Owner ID Proof",inputType: "link",linkValue:"View",required:false,validationmsg:"",placeholder:"Upload Policy Owner ID Proof"},
      //   {name:"policyOwneraddressProof",indexName:'Loan Request',label:"Upload Policy Owner Address Proof",inputType:"link",linkValue:"View",required:false,validationmsg:"",placeholder:"Upload Policy Owner Address Proof"},
      //   {name:"policyOwnerAccProof",indexName:'Loan Request',label:"Upload Bank Account Proof",inputType: "link",linkValue:"View",required:false,validationmsg:"",placeholder:"Upload Bank Account Proof"},
      //   {name:"pancard",label:"Upload PAN Card",inputType: "link",linkValue:"View",required:false,validationmsg:"",placeholder:"Upload PAN Card"},
      //   {name: "validatesignature",label: "Signature Validated",inputType: "radio",required: false,validationmsg: "Signature Validated",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      // ],
      // POS_View_Bank_Details: [
      //   { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      //   { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
      //   { name: "BankAccountNumber",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number"},
      //   { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      //   { name: "BankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
      //   { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder:"Penny Drop Result" },
      // ],
      View_POS_Action_title: [
        { name: "viewPOS",label: "POS Action",inputType: "accordian"},
      ],
      POS_Action: [
        { name: "paymentMode",label: "Payment Mode",inputType: "dropdown",required: true,validationmsg: "",placeholder:"Payment Mode" },
        { name: "ChangeInLast60Days",label: "Any personal details change in last 60 days",disabled:true,inputType: "dropdown",required: true,validationmsg: "",placeholder:"Any personal details change in last 60 days" },
        { name: "PolicyLoggedLast",label: "If any policy logged in the last 6 months",disabled:true,inputType: "dropdown",required: true,validationmsg: "",placeholder:"If any policy logged in the last 6 months" },
        { name: "ViewFinalPayableAmount",label: "View Final Payable Amount",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"View Final Payable Amount" },
       
        { name: "InitiatePennyDropPOS",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "",placeholder:"Initiate Penny Drop" },
        { name: "BankAccountDeDupe",label: "Bank account de-dupe",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"Bank account de-dupe" },
       // { name: "negavativeList",label: "Negative List",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"" },
        { name: "SignatureChange",label: "Signature Change",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"" },
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],

      POS_Manger_Details:[
        { name: "MaxLoanEligible",label: "Max Loan Eligible",inputType: "text",disabled:true,required: false,validationmsg: "Enter Max Loan Eligible",placeholder:"Max Loan Eligible"},
        { name: "LoanValueRequested",label: "Loan Value requested",inputType: "text",disabled:true,required: false,validationmsg: "Enter Loan Value requested",placeholder:"Loan Value requested"},
        { name: "NoOfTimesLoanTakenInThePolicy",label: "No of times loan taken in the policy",inputType: "text",disabled:true,required: false,validationmsg: "Enter Loan Taken",placeholder:"No of times loan taken in the policy"},
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",hide:false, disabled:true,required:false,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "ResonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,disabled:true,required:false,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delay" },
        { name: "BranchRemarks", label: "Branch Remarks", inputType: "text",disabled:true,required: false,placeholder: "Branch Remarks" },
      

        { name: "viewRequestDetails",label: "Documents",inputType: "title" },
        // { name: "texts",label: "",inputType: "texts", hide:true},
        {name:"surrenderForm",indexName:'Loan Request',label:"Uploaded Documents",inputType: "link",linkValue:"View",required:false,validationmsg:"",placeholder:"Upload Surrender Form"},
        {name: "validatesignature",label: "Signature Validated",inputType: "radio",disabled:true,required: false,validationmsg: "Signature Validated",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
 
   
        { name: "viewRequestDetails",label: "Bank Details",inputType: "title"},
        // { name: "texts",label: "",inputType: "texts", hide:true},
        { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C", posEdit:true, disabled:true},
        { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC", posEdit:true,  disabled:true},
        { name: "BankAccountNumber",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number", posEdit:true, disabled:true},
        { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Confirm Bank Account Number", posEdit:true, disabled:true},
        { name: "BankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name", posEdit:true, disabled:true },
        { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder:"Penny Drop Result", posEdit:true, disabled:true },
   
      
      ],
      // POS_Manger_Documents_title: [
      //   { name: "uploadDocuments",label: "View Documents",inputType: "accordian"},
      // ],
      // POS_Manger_View_Documents:[
      //   {name:"surrenderForm",indexName:'Loan Request',label:"Uploaded Documents",inputType: "link",linkValue:"View",required:false,validationmsg:"",placeholder:"Upload Surrender Form"},
        
      //   {name: "validatesignature",label: "Signature Validated",inputType: "radio",disabled:true,required: false,validationmsg: "Signature Validated",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      // ],
      // POS_Manger_View_Bank_Details: [
      //   { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      //   { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
      //   { name: "BankAccountNumber",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number"},
      //   { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      //   { name: "BankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
      //   { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder:"Penny Drop Result" },
        
      // ],
      POS_Manger_POS_Action_title: [
        { name: "viewPOS",label: "POS Manager Action",inputType: "accordian"},
      ],
      POS_Manger_Action: [
       
        { name: "BankAccountDeDupe",label: "Bank account de-dupe",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"Bank account de-dupe" },
       // { name: "negavativeList",label: "Negative List",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"" },
        { name: "SignatureChange",label: "Signature Change",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"" },
        // { name: "STPFailedReason",label: "STP Failed Reason",inputType: "text",required: true,validationmsg: "",placeholder:"Any personal details change in last 60 days" },
        // { name: "Decision",label: "Decision",inputType: "dropdown",required: true,validationmsg: "",placeholder:"Decision" },
       // { name: "SendEmailtoCompliance",label: "Send Email to Compliance",inputType: "text",hyperLinks:"Add CC",required: false,validationmsg: "",placeholder:"Send Email to Compliance" },
       
      ]
      
    },

    loanrepayment:{
      POS_Details:[
        { name: "ReceiptedBy",label: "Receipted By",inputType: "text",required: false,disabled:true,validationmsg: "Receipted By",placeholder:"Receipted By"},
        { name: "ReceiptedBranch",label: "Receipted Branch",inputType: "text", required: false,disabled:true,validationmsg: "Receipted Branch",placeholder:"Receipted Branch"},
        { name: "LoanAmount",label: "Loan Amount",inputType: "text",required: false,disabled:true,validationmsg: "Loan Amount",placeholder:"Loan Amount"},
        { name: "LoanInterest",label: "Loan Interest",inputType: "text",required: false,disabled:true,validationmsg: "Loan Interest",placeholder:"Loan Interest"},
        { name: "TotalOutstandingLoan",label: "Total Outstanding Loan",inputType: "text",required: false,disabled:true,validationmsg: "Total Outstanding Loan",placeholder:"Total Outstanding Loan"},
        { name: "RepaymentAmount",label: "Repayment Amount",inputType: "text", required:false,disabled:true,validationmsg: "Repayment Amount",placeholder:"Repayment Amount"},
        { name: "DateofRepayment",label: "Date of Repayment",inputType: "text",required: false,disabled:true,validationmsg: "Date of Repayment",placeholder:"Date of Repayment"},
        { name: "ModeofRepayment",label: "Mode of Repayment",inputType: "text",required: false,disabled:true, validationmsg: "Mode of Repayment",placeholder:"Mode of Repayment"},
        { name: "UTRChequeNumber",label: "UTR/Cheque Number",inputType: "text", required:false,disabled:true,validationmsg: "UTR/Cheque Number",placeholder:"UTR/Cheque Number"},
        { name: "ReceiptNumber",label: "Receipt Number",inputType: "text",required: false,disabled:true,validationmsg: "Receipt Number",placeholder:"Receipt Number"},
        { name: "PaymentStatus",label: "Payment Status",inputType: "text",required: false,disabled:true, validationmsg: "Payment Status",placeholder:"Payment Status"},
        // {name:"texts", lable:"", inputType: "texts"},
        { name: "POSAction",label: "POS Action",inputType: "title" },
        // {name:"texts", lable:"", inputType: "texts"},
        { name: "CompleteRepaymentDone",label: "Complete Repayment Done",inputType: "radio",required: true,validationmsg: "Complete Repayment Done",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "PolicyBondwithFGI",label: "Policy Bond with FGI",inputType: "radio",required: true,validationmsg: "Policy Bond with FGI",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],

    },

 

    surrenderquery:{
      BOE_Details: [
        { name: "TotalSurrenderValue",label: "Total Fund / Surrender Value",inputType: "text",hyperLink: true,required: true,validationmsg: "", placeholder: "Total Surrender Value"},
        { name: "assistFor",label: "Assist For",inputType: "radios",required: false,validationmsg: "Select Assist For ",
        options : [
          // { label: 'Query', value: 'query' },
          { label: 'Retention', value: 'retention' },
          { label: 'Request', value: 'request' },
        ]
      }
      ],
      Query_Fields: [
        { name: "SurrenderDate",label: "Policy can be Surrendered After",inputType: "date",required: true,validationmsg: "",placeholder:"Policy can be Surrendered After" },
      ],
      Query_Process:[
        // { name: "sendSurrenderProcess",label: "Send Surrender Process",inputType: "icons",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
        { name: "generateFundStatement",hide:false, label: "Generate Fund Statement",inputType: "icons",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
        { name: "sendRequestForm",label: "Surrender Value Letter",inputType: "icons",required: false,validationmsg: "", placeholder: "Loan Available"},
      ],
      // Retention_Fields: [
      //   {name: "validatesignature",label: "",inputType: "producticons" },
      // ],
      // customerChoice:[ {name: "customerRetained",label: "Is Customer Retained",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",radioValue:"yes",secondRadioValue:"no", }],
      // CustomerRetained:[
      //   {name: "customerRetained",label: "Is Customer Retained",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no", },
      //   {name:"surrenderLetter",label:"Upload Retention Letter",inputType:"upload",required:false,validationmsg:"",placeholder:"Upload Retention Letter"},
      // ],
      // Request_Fields: [
      //    {name: "fundValues",label: "Do you Wish to opt for Fund Transfer",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",radioValue:"yes",secondRadioValue:"no", }
      // ],
      // FundTransfer_Fields: [
      //   { name: "requestTime",label: "Request Time",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Request Time" },
      //   { name: "reasonforsurrender", label: "Reason For Surrender", inputType: "dropdown",placeholder: "Reason for Surrender" },
      //   { name: "fundTransferTo",label: "Fund Transfer To",inputType: "text",required: false,validationmsg: "",placeholder:"Fund Transfer To" },
      //   {name:"ftAmount",label:"Fund Transfer Amount",inputType:"text",required:false,validationmsg:"",placeholder:"Fund Transfer Amount"},
      //   {name:"relationFtPolicy",label:"Relations to FT Policy",inputType:"text",required:false,validationmsg:"",placeholder:"Relations to FT Policy"},
      //   {name:"ftamtowner",label:"Name of Fund Transfer Policy Owner",inputType:"text",required:false,validationmsg:"",placeholder:"Name of Fund Transfer Policy Owner"},
      //   {name:"balanceAmt",label:"Balance Amount for Surrender",inputType:"text",required:false,validationmsg:"",placeholder:"Balance Amount for Surrender"},
      //   {name:"surrenderForm",label:"Upload Surrender Form",inputType:"upload",required:false,validationmsg:"",placeholder:"Surrender Form"},
      //   {name:"policyBond",label:"Upload Policy Bond/Indemnity",inputType:"upload",required:false,validationmsg:"",placeholder:"Policy Bond/Indemnity"},
      //   {name:"policyOwnerIDProof",label:"Upload Policy Owner ID Proof",inputType:"upload",required:false,validationmsg:"",placeholder:"Policy Owner ID Proof"},
      //   {name:"policyOwnerAccProof",label:"Upload Policy Owner bank Account Proof",inputType:"upload",required:false,validationmsg:"",placeholder:"Policy Owner bank Account Proof"},
      //   { name: "customersigningdate", label: "Customer Signing Date", inputType: "date",placeholder: "Select a date", },
      //   { name: "branchreceivedate", label: "Request Received Date", inputType: "date",placeholder: "Select a date", },
      //   { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      //   { name: "comment",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "",placeholder:"Comments" },
      // ],
      // Bank_Fields:[
      //   { name: "reasonforsurrender", label: "Reason For Surrender", inputType: "dropdown",placeholder: "Reason for Surrender" },
      //   {name:"surrenderForm",label:"Upload Surrender Form",inputType:"upload",required:false,validationmsg:"",placeholder:"Surrender Form"},
      //   {name:"policyBond",label:"Upload Policy Bond/Indemnity",inputType:"upload",required:false,validationmsg:"",placeholder:"Policy Bond/Indemnity"},
      //   {name:"policyOwnerIDProof",label:"Upload Policy Owner ID Proof",inputType:"upload",required:false,validationmsg:"",placeholder:"Policy Owner ID Proof"},
      //   {name:"policyOwnerAccProof",label:"Upload Policy Owner bank Account Proof",inputType:"upload",required:false,validationmsg:"",placeholder:"Policy Owner bank Account Proof"},
      //   { name: "customersigningdate", label: "Customer Signing Date", inputType: "date",placeholder: "Select a date", },
      //   { name: "branchreceivedate", label: "Request Received Date", inputType: "date",placeholder: "Select a date", },
      //   { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      //   { name: "nameAsBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      //   { name: "bankIFSC",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
      //   { name: "bankAccountNo",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number"},
      //   {name:"confirmBankAccNo",label:"Confirm Bank Account Number",inputType:"text",required:false,validationmsg:"",placeholder:"Confirm Bank Account Number"},
      //   { name: "bankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
      //   { name: "pennyDropResult",label: "Initiate Penny Drop",inputType: "text",hyperLink: true,required: false,validationmsg: "",placeholder:"Initiate Penny Drop" },
      //   { name: "comment",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "",placeholder:"Comments" },
      // ],
      // ReasonSubmission:[
      //   { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
      // ],
      // RetainedFields:[
      //   { name: "sendSurrenderProcess",label: "Send Surrender Process",inputType: "icons",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
      //   { name: "generateFundStatement",label: "Generate Fund Statement",inputType: "icons",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
      //   { name: "sendRequestForm",label: "Surrender Value Letter",inputType: "icons",required: false,validationmsg: "", placeholder: "Loan Available"},
       
      // ],
      // POS_Details: [
      //   { name: "totalfundSurrenderValue",label: "Total Fund / Surrender Value",inputType: "text",hyperLink: true,required: false,validationmsg: "", placeholder: "Total Surrender Value"},
      //   { name: "surrenderPOS",label: "Request For",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Request Time" },
      //   { name: "requestTime",label: "Request Time",inputType: "text",required: false,validationmsg: "",placeholder:"Request Time" },
      //   { name: "reasonfordelay", label: "Reason For Delay", inputType: "text",placeholder: "Reason for delay" },
      //   { name: "branchRemarks",label: "Branch Remarks",inputType: "text",required: false,validationmsg: "",placeholder:"Branch Remarks" },
      //   { name: "viewRequestDetails",label: "View Request Details",inputType: "texts"},
      //   { name: "viewRequestDetails",label: "View Request Details",inputType: "accordian"},
      // ],
      // View_Request_Details: [
      //   { name: "fundTransferTo",label: "Fund Transfer To",inputType: "text",required: false,validationmsg: "",showRqstField:false,placeholder:"Fund Transfer To" },
      //   {name:"ftAmount",label:"Fund Transfer Amount",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Fund Transfer Amount"},
      //   {name:"relationFtPolicy",label:"Relations to FT Policy",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Relations to FT Policy"},
      //   {name:"ftamtowner",label:"Name of Fund Transfer Policy Owner",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Name of Fund Transfer Policy Owner"},
      //   {name:"balanceAmt",label:"Balance Amount for Surrender",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Balance Amount for Surrender"},
      // ],
      // View_Documents_title: [
      //   { name: "viewDocuments",label: "View Documents",inputType: "accordian"},
      // ],
      // View_Documents: [
      //   {name:"surrenderForm",label:"View Surrender Form",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Surrender Form"},
      //   {name:"policyBond",label:"View Policy Bond/Indemnity",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Policy Bond/Indemnity"},
      //   {name:"policyOwnerIDProof",label:"View Policy Owner ID Proof",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Policy Owner ID Proof"},
      //   {name:"policyOwnerAccProof",label:"View Policy Owner bank Account Proof",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Policy Owner bank Account Proof"},
      //   { name: "validatesignature",label: "Signature Validated",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      // ],
      // View_BankDetails_title: [
      //   { name: "viewBankDetails",label: "View Bank Details",inputType: "accordian"},
      // ],
      // View_Bank_Details: [
      //   { name: "nameAsBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      //   { name: "bankIFSC",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
      //   { name: "bankAccountNo",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number"},
      //   { name: "bankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
      //   { name: "pennyDropResult",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder:"Penny Drop Result" },
      //   { name: "namepennyDrop",label: "Name Received in Penny Drop",inputType: "text",required: false,validationmsg: "",placeholder:"Name Received in Penny Drop" },
      // ],
      // View_POS_Action_title: [
      //   { name: "viewPOS",label: "POS Action",inputType: "accordian"},
      // ],
      // POS_Action: [
      //   { name: "personalDetails",label: "Any personal details change in last 60 days",inputType: "text",required: false,validationmsg: "",placeholder:"Any personal details change in last 60 days" },
      //   { name: "policyLogged",label: "If any policy logged in the last 6 months",inputType: "text",required: false,validationmsg: "",placeholder:"If any policy logged in the last 6 months" },
      //   { name: "bankdedupe",label: "Bank account de-dupe",inputType: "text",required: false,validationmsg: "",placeholder:"Bank account de-dupe" },
      //   { name: "signatureChange",label: "Signature Change",inputType: "text",required: false,validationmsg: "",placeholder:"Signature Change" },
      //   { name: "payableAmount",label: "View Final Payable Amount",inputType: "text",hyperLink:true,required: false,validationmsg: "",placeholder:"View Final Payable Amount" },
      //   { name: "initiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "",placeholder:"Initiate Penny Drop" },
      // ]
    },
    surrenderretention:{
      BOE_Details: [
        { name: "TotalSurrenderValue",label: "Total Fund / Surrender Value",inputType: "text",hyperLink: true,required: true,validationmsg: "", placeholder: "Total Surrender Value"},
        { name: "assistFor",label: "Assist For",inputType: "radios",required: true,validationmsg: "",
        options : [
          // { label: 'Query', value: 'query' },
          { label: 'Retention', value: 'retention' },
          { label: 'Request', value: 'request' },
        ]
      }
      ],
      // Query_Fields: [
      //   { name: "SurrenderDate",label: "Policy can be Surrendered After",inputType: "date",required: true,validationmsg: "",placeholder:"Policy can be Surrendered After" },
      //   { name: "sendSurrenderProcess",label: "Send Surrender Process",inputType: "icons",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
      //   { name: "generateFundStatement",label: "Generate Fund Statement",inputType: "icons",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
      //   { name: "sendRequestForm",label: "Surrender Value Letter",inputType: "icons",required: false,validationmsg: "", placeholder: "Loan Available"},
      // ],
      Retention_Fields: [
        {name: "validatesignature",label: "",inputType: "producticons" },
      ],
      customerChoice:[ {name: "customerRetained",label: "Is Customer Retained",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",radioValue:"yes",secondRadioValue:"no", }],
      CustomerRetained:[
        {name: "customerRetained",label: "Is Customer Retained",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no", },
        {name:"surrenderLetter",label:"Upload Retention Letter",inputType:"upload",required:false,validationmsg:"",placeholder:"Upload Retention Letter",indexName:"Surrender Form"},
        { name: "comment",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comments" },
      ],
      // Request_Fields: [
      //    {name: "fundValues",label: "Do you Wish to opt for Fund Transfer",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",radioValue:"yes",secondRadioValue:"no", }
      // ],
      // FundTransfer_Fields: [
      //   { name: "requestTime",label: "Request Time",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Request Time" },
      //   { name: "reasonforsurrender", label: "Reason For Surrender", inputType: "dropdown",placeholder: "Reason for Surrender" },
      //   { name: "fundTransferTo",label: "Fund Transfer To",inputType: "text",required: false,validationmsg: "",placeholder:"Fund Transfer To" },
      //   {name:"ftAmount",label:"Fund Transfer Amount",inputType:"text",required:false,validationmsg:"",placeholder:"Fund Transfer Amount"},
      //   {name:"relationFtPolicy",label:"Relations to FT Policy",inputType:"text",required:false,validationmsg:"",placeholder:"Relations to FT Policy"},
      //   {name:"ftamtowner",label:"Name of Fund Transfer Policy Owner",inputType:"text",required:false,validationmsg:"",placeholder:"Name of Fund Transfer Policy Owner"},
      //   {name:"balanceAmt",label:"Balance Amount for Surrender",inputType:"text",required:false,validationmsg:"",placeholder:"Balance Amount for Surrender"},
      //   {name:"surrenderForm",label:"Upload Surrender Form",inputType:"upload",required:false,validationmsg:"",placeholder:"Surrender Form"},
      //   {name:"policyBond",label:"Upload Policy Bond/Indemnity",inputType:"upload",required:false,validationmsg:"",placeholder:"Policy Bond/Indemnity"},
      //   {name:"policyOwnerIDProof",label:"Upload Policy Owner ID Proof",inputType:"upload",required:false,validationmsg:"",placeholder:"Policy Owner ID Proof"},
      //   {name:"policyOwnerAccProof",label:"Upload Policy Owner bank Account Proof",inputType:"upload",required:false,validationmsg:"",placeholder:"Policy Owner bank Account Proof"},
      //   { name: "customersigningdate", label: "Customer Signing Date", inputType: "date",placeholder: "Select a date", },
      //   { name: "branchreceivedate", label: "Request Received Date", inputType: "date",placeholder: "Select a date", },
      //   { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      //   { name: "comment",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "",placeholder:"Comments" },
      // ],
      // Bank_Fields:[
      //   { name: "reasonforsurrender", label: "Reason For Surrender", inputType: "dropdown",placeholder: "Reason for Surrender" },
      //   {name:"surrenderForm",label:"Upload Surrender Form",inputType:"upload",required:false,validationmsg:"",placeholder:"Surrender Form"},
      //   {name:"policyBond",label:"Upload Policy Bond/Indemnity",inputType:"upload",required:false,validationmsg:"",placeholder:"Policy Bond/Indemnity"},
      //   {name:"policyOwnerIDProof",label:"Upload Policy Owner ID Proof",inputType:"upload",required:false,validationmsg:"",placeholder:"Policy Owner ID Proof"},
      //   {name:"policyOwnerAccProof",label:"Upload Policy Owner bank Account Proof",inputType:"upload",required:false,validationmsg:"",placeholder:"Policy Owner bank Account Proof"},
      //   { name: "customersigningdate", label: "Customer Signing Date", inputType: "date",placeholder: "Select a date", },
      //   { name: "branchreceivedate", label: "Request Received Date", inputType: "date",placeholder: "Select a date", },
      //   { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      //   { name: "nameAsBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      //   { name: "bankIFSC",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
      //   { name: "bankAccountNo",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number"},
      //   {name:"confirmBankAccNo",label:"Confirm Bank Account Number",inputType:"text",required:false,validationmsg:"",placeholder:"Confirm Bank Account Number"},
      //   { name: "bankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
      //   { name: "pennyDropResult",label: "Initiate Penny Drop",inputType: "text",hyperLink: true,required: false,validationmsg: "",placeholder:"Initiate Penny Drop" },
      //   { name: "comment",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "",placeholder:"Comments" },
      // ],
      // ReasonSubmission:[
      //   { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
      // ],
      RetainedFields:[
        // { name: "sendSurrenderProcess",label: "Send Surrender Process",inputType: "icons",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
        // { name: "generateFundStatement",label: "Generate Fund Statement",inputType: "icons",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
        // { name: "sendRequestForm",label: "Surrender Value Letter",inputType: "icons",required: false,validationmsg: "", placeholder: "Loan Available"},
       
      ],
      // POS_Details: [
      //   { name: "totalfundSurrenderValue",label: "Total Fund / Surrender Value",inputType: "text",hyperLink: true,required: false,validationmsg: "", placeholder: "Total Surrender Value"},
      //   { name: "surrenderPOS",label: "Request For",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Request Time" },
      //   { name: "requestTime",label: "Request Time",inputType: "text",required: false,validationmsg: "",placeholder:"Request Time" },
      //   { name: "reasonfordelay", label: "Reason For Delay", inputType: "text",placeholder: "Reason for delay" },
      //   { name: "branchRemarks",label: "Branch Remarks",inputType: "text",required: false,validationmsg: "",placeholder:"Branch Remarks" },
      //   { name: "viewRequestDetails",label: "View Request Details",inputType: "texts"},
      //   { name: "viewRequestDetails",label: "View Request Details",inputType: "accordian"},
      // ],
      // View_Request_Details: [
      //   { name: "fundTransferTo",label: "Fund Transfer To",inputType: "text",required: false,validationmsg: "",showRqstField:false,placeholder:"Fund Transfer To" },
      //   {name:"ftAmount",label:"Fund Transfer Amount",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Fund Transfer Amount"},
      //   {name:"relationFtPolicy",label:"Relations to FT Policy",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Relations to FT Policy"},
      //   {name:"ftamtowner",label:"Name of Fund Transfer Policy Owner",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Name of Fund Transfer Policy Owner"},
      //   {name:"balanceAmt",label:"Balance Amount for Surrender",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Balance Amount for Surrender"},
      // ],
      // View_Documents_title: [
      //   { name: "viewDocuments",label: "View Documents",inputType: "accordian"},
      // ],
      // View_Documents: [
      //   {name:"surrenderForm",label:"View Surrender Form",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Surrender Form"},
      //   {name:"policyBond",label:"View Policy Bond/Indemnity",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Policy Bond/Indemnity"},
      //   {name:"policyOwnerIDProof",label:"View Policy Owner ID Proof",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Policy Owner ID Proof"},
      //   {name:"policyOwnerAccProof",label:"View Policy Owner bank Account Proof",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Policy Owner bank Account Proof"},
      //   { name: "validatesignature",label: "Signature Validated",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      // ],
      // View_BankDetails_title: [
      //   { name: "viewBankDetails",label: "View Bank Details",inputType: "accordian"},
      // ],
      // View_Bank_Details: [
      //   { name: "nameAsBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      //   { name: "bankIFSC",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
      //   { name: "bankAccountNo",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number"},
      //   { name: "bankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
      //   { name: "pennyDropResult",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder:"Penny Drop Result" },
      //   { name: "namepennyDrop",label: "Name Received in Penny Drop",inputType: "text",required: false,validationmsg: "",placeholder:"Name Received in Penny Drop" },
      // ],
      // View_POS_Action_title: [
      //   { name: "viewPOS",label: "POS Action",inputType: "accordian"},
      // ],
      // POS_Action: [
      //   { name: "personalDetails",label: "Any personal details change in last 60 days",inputType: "text",required: false,validationmsg: "",placeholder:"Any personal details change in last 60 days" },
      //   { name: "policyLogged",label: "If any policy logged in the last 6 months",inputType: "text",required: false,validationmsg: "",placeholder:"If any policy logged in the last 6 months" },
      //   { name: "bankdedupe",label: "Bank account de-dupe",inputType: "text",required: false,validationmsg: "",placeholder:"Bank account de-dupe" },
      //   { name: "signatureChange",label: "Signature Change",inputType: "text",required: false,validationmsg: "",placeholder:"Signature Change" },
      //   { name: "payableAmount",label: "View Final Payable Amount",inputType: "text",hyperLink:true,required: false,validationmsg: "",placeholder:"View Final Payable Amount" },
      //   { name: "initiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "",placeholder:"Initiate Penny Drop" },
      // ]
    },
    surrenderrequest:{
      BOE_Details: [
        { name: "TotalSurrenderValue",label: "Total Fund / Surrender Value",inputType: "text",hyperLink: true,required: true,disabled:true, validationmsg: "", placeholder: "Total Surrender Value"},
        { name: "assistFor",label: "Assist For",inputType: "radios",required: true,validationmsg: "",
        options : [
          // { label: 'Query', value: 'query' },
          { label: 'Retention', value: 'retention' },
          { label: 'Request', value: 'request' },
        ]
      }
      ], 
      Request_Fields: [
        {name: "FundTransfer",label: "Do you Wish to opt for Fund Transfer",inputType: "radio",required: true,validationmsg: "Select Fund Transfer",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",radioValue:"yes",secondRadioValue:"no", }
     ],
     FundTransfer_Fields: [
       { name: "RequestTime",hide:false,label: "Request Time",inputType: "dropdown",required: true,validationmsg: "",placeholder:"Request Time" },
       { name: "ReasonForSurrender", label: "Reason For Surrender", required: true,inputType: "dropdown",placeholder: "Reason for Surrender" },
       { name: "FundTransferTo",label: "Fund Transfer To",inputType: "text",required: true,validationmsg: "",placeholder:"Fund Transfer To" },
       {name:"FundTransferAmount",label:"Fund Transfer Amount",inputType:"number", pattern:'numbersOnly', required:true,validationmsg:"",placeholder:"Fund Transfer Amount"},
       {name:"RelationsToFTPolicy",label:"Relations to FT Policy",inputType:"text",required:true,validationmsg:"",placeholder:"Relations to FT Policy"},
       {name:"NameOfFundTransferPolicyOwner",label:"Name of Fund Transfer Policy Owner",inputType:"text",required:true,validationmsg:"",placeholder:"Name of Fund Transfer Policy Owner"},
       {name:"BalanceAmountForSurrender",label:"Balance Amount for Surrender",inputType:"number",  pattern:'numbersOnly', required:true,validationmsg:"",placeholder:"Balance Amount for Surrender"},
     ],
     BalanceAmt_Fields: [
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
       { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "", placeholder:"Bank IFSC",  pattern:'charactersOnly', },
       { name: "BankAccountNumber",label: "Bank Account Number",inputType: "number", pattern:'numbersOnly',required: true,validationmsg: "", placeholder: "Bank Account Number"},
       {name:"ConfirmBankAccountNumber",label:"Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly',required:true,validationmsg:"",placeholder:"Confirm Bank Account Number"},
       { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
       { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink: true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       {name:"surrenderForm",indexName:'Surrender ',label:"Upload Surrender Form",inputType:"upload",required:true,validationmsg:"",placeholder:"Surrender Form"},
       {name:"policyBond",indexName:'Surrender ',label:"Upload Policy Bond/Indemnity",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Bond/Indemnity"},
       {name:"policyOwnerIDProof",indexName:'Surrender ',label:"Upload Policy Owner ID Proof",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Owner ID Proof"},
       {name:"policyOwnerAccProof",indexName:'Surrender ',label:"Upload Policy Owner bank Account Proof",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Owner bank Account Proof"},
       { name: "CustSignDateTime", label: "Customer Signing Date", required: true,inputType: "nofuturedates",placeholder: "Select a date", },
       { name: "BranchReceivedDate", label: "Request Received Date",required: true, inputType: "nofuturedates",placeholder: "Select a date", },
       { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "",placeholder:"Comments" },
     ],
     NoBalance_Fields: [
      {name:"surrenderForm",indexName:'Surrender ',label:"Upload Surrender Form",inputType:"upload",required:true,validationmsg:"",placeholder:"Surrender Form"},
      {name:"policyBond",indexName:'Surrender ',label:"Upload Policy Bond/Indemnity",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Bond/Indemnity"},
      {name:"policyOwnerIDProof",indexName:'Surrender ',label:"Upload Policy Owner ID Proof",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Owner ID Proof"},
      {name:"policyOwnerAccProof",indexName:'Surrender ',label:"Upload Policy Owner bank Account Proof",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Owner bank Account Proof"},
      { name: "CustSignDateTime", label: "Customer Signing Date", required: true,inputType: "nofuturedates",placeholder: "Select a date", },
      { name: "BranchReceivedDate", label: "Request Received Date",required: true, inputType: "nofuturedates",placeholder: "Select a date", },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "",placeholder:"Comments" },
     ],
     Bank_Fields:[
       { name: "ReasonForSurrender", label: "Reason For Surrender", inputType: "dropdown",placeholder: "Reason for Surrender" },
       {name:"surrenderForm",indexName:'Surrender ',label:"Upload Surrender Form",inputType:"upload",required:true,validationmsg:"",placeholder:"Surrender Form"},
       {name:"policyBond",indexName:'Surrender ',label:"Upload Policy Bond/Indemnity",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Bond/Indemnity"},
       {name:"policyOwnerIDProof",indexName:'Surrender ',label:"Upload Policy Owner ID Proof",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Owner ID Proof"},
       {name:"policyOwnerAccProof",indexName:'Surrender ',label:"Upload Policy Owner bank Account Proof",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Owner bank Account Proof"},
       { name: "CustSignDateTime", label: "Customer Signing Date", inputType: "nofuturedates",placeholder: "Select a date", },
       { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",placeholder: "Select a date", },
       { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
       { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
       { name: "BankAccountNumber",label: "Bank Account Number",inputType: "number",required: true,validationmsg: "", pattern:'numbersOnly', placeholder: "Bank Account Number"},
       {name:"ConfirmBankAccountNumber",label:"Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required:true,validationmsg:"",placeholder:"Confirm Bank Account Number"},
       { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
       { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink: true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "",placeholder:"Comments" },
     ],
     ReasonSubmission:[
       { name: "ReasonForDelay", label: "Reason For Delayed Submission",required: true, inputType: "text",placeholder: "" },
     ],
     RetainedFields:[
       { name: "sendSurrenderProcess",label: "Send Surrender Process",inputType: "icons",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
       { name: "generateFundStatement",label: "Generate Fund Statement",inputType: "icons",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
       { name: "sendRequestForm",label: "Surrender Value Letter",inputType: "icons",required: false,validationmsg: "", placeholder: "Loan Available"},
      
     ],
     POS_Details: [
        { name: "TotalSurrenderValue",label: "Total Fund / Surrender Value", disabled:true, inputType: "text",hyperLink: true,required: false,validationmsg: "", placeholder: "Total Surrender Value"},
        // { name: "RequestFor",label: "Request For",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Request Time" },
        { name: "RequestFor",label: "Request For",inputType: "text",disabled:true, required: false,validationmsg: "",placeholder:"Request For" },
        { name: "RequestTime",hide:false,label: "Request Time",inputType: "text",disabled:true,hide:false, required: false,validationmsg: "",placeholder:"Request Time" },
        { name: "ReasonForDelay", label: "Reason For Delay", disabled:true, inputType: "text",hide:false,placeholder: "Reason for delay" },
        { name: "BranchRemarks",label: "Branch Remarks", disabled:true,inputType: "text",required: false,validationmsg: "",placeholder:"Branch Remarks" },
       

        // { name: "texts",label: "",inputType: "texts", hide:true},
        { name: "viewRequestDetails",label: "Documents",inputType: "title" },
        // { name: "texts",label: "",inputType: "texts", hide:true},
        {name:"surrenderForm",label:"Uploaded Documents",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Surrender Form"},
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio", disabled:true, required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "viewRequestDetails",label: "Bank Details",inputType: "title", icon:'edit' },
        // { name: "texts",label: "",inputType: "texts", hide:true},

        { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C", posEdit:true, disabled:true },
        { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",placeholder:"Bank IFSC", posEdit:true, disabled:true },
        { name: "BankAccountNumber",label: "Bank Account Number",inputType: "text",required: true,validationmsg: "", placeholder: "Bank Account Number", posEdit:true, disabled:true },
        { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name", posEdit:true, disabled:true  },
        { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",required: true,validationmsg: "",placeholder:"Penny Drop Result", posEdit:true, disabled:true  },

      ],
      View_POS_Request_title: [
        { name: "viewRequestDetails",label: "View Request Details",inputType: "accordian"},
      ],
      View_Request_Details: [
        { name: "FundTransferTo",label: "Fund Transfer To",inputType: "text",required: false,validationmsg: "",showRqstField:false,placeholder:"Fund Transfer To" },
        {name:"FundTransferAmount",label:"Fund Transfer Amount",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Fund Transfer Amount"},
        {name:"RelationsToFTPolicy",label:"Relations to FT Policy",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Relations to FT Policy"},
        {name:"NameOfFundTransferPolicyOwner",label:"Name of Fund Transfer Policy Owner",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Name of Fund Transfer Policy Owner"},
        {name:"BalanceAmountForSurrender",label:"Balance Amount for Surrender",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Balance Amount for Surrender"},
      ],
       View_POS_Action_title: [
        { name: "viewPOS",label: "POS Action",inputType: "accordian"},
      ],
      POS_Action: [
        { name: "paymentMode",label: "Payment Mode",inputType: "dropdown",required: true,validationmsg: "",placeholder:"Payment Mode" },
   
        { name: "ChangeInLast60Days",label: "Any personal details change in last 60 days",inputType: "dropdown",disabled:true,required: false,validationmsg: "",placeholder:"Any personal details change in last 60 days" },
        { name: "PolicyLoggedLast",label: "If any policy logged in the last 6 months",inputType: "dropdown",disabled:true,required: false,validationmsg: "",placeholder:"If any policy logged in the last 6 months" },
        { name: "ViewFinalPayableAmount",label: "View Final Payable Amount",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"View Final Payable Amount" },
       
        { name: "InitiatePennyDropPOS",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "",placeholder:"Initiate Penny Drop" },
        
        { name: "BankAccountDeDupe",label: "Bank account de-dupe",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"Bank account de-dupe" },
        // { name: "negavativeList",label: "Negative List",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"" },
        { name: "SignatureChange",label: "Signature Change",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"" },
        
      //  { name: "SignatureChange",label: "Signature Change",inputType: "text",required: true,validationmsg: "",placeholder:"Signature Change" },
         { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      POS_Manager_Details: [
        { name: "TotalSurrenderValue",label: "Total Fund / Surrender Value",disabled:true, inputType: "text",hyperLink: true,required: true,validationmsg: "", placeholder: "Total Surrender Value"},
        { name: "RequestTime", hide:false, label: "Request Time",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Request Time" },
        { name: "CustSignDateTime", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
        // { name: "ReasonForDelay", label: "Reason For Delay", inputType: "text",required:false, placeholder: "Reason for delay" },
        { name: "BranchRemarks",label: "Branch Remarks",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Branch Remarks" },
   
        { name: "viewRequestDetails",label: "Documents",inputType: "title" },
        // { name: "texts",label: "",inputType: "texts", hide:true},
        {name:"surrenderForm",label:"Uploaded Documents",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Surrender Form"},
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio", disabled:true, required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "viewRequestDetails",label: "Bank Details",inputType: "title" },
        // { name: "texts",label: "",inputType: "texts", hide:true},

        { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C", posEdit:true, disabled:true },
        { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",placeholder:"Bank IFSC", posEdit:true, disabled:true },
        { name: "BankAccountNumber",label: "Bank Account Number",inputType: "text",required: true,validationmsg: "", placeholder: "Bank Account Number", posEdit:true, disabled:true },
        { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name", posEdit:true, disabled:true  },
        { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",required: true,validationmsg: "",placeholder:"Penny Drop Result", posEdit:true, disabled:true  },
      ],
      // View_Documents_title: [
      //   { name: "viewDocuments",label: "View Documents",inputType: "accordian"},
      // ],
      // View_Documents: [
      //  {name:"surrenderForm",label:"Uploaded Documents",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Surrender Form"},

      //   {name:"surrenderForm",label:"View Surrender Form",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Surrender Form"},
      //   {name:"policyBond",label:"View Policy Bond/Indemnity",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Policy Bond/Indemnity"},
      //   {name:"policyOwnerIDProof",label:"View Policy Owner ID Proof",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Policy Owner ID Proof"},
      //   {name:"policyOwnerAccProof",label:"View Bank Account Proof",linkValue:"View",inputType: "link",required:false,validationmsg:"",placeholder:"View Bank Account Proof"},
      //   { name: "ValidateSignature",label: "Signature Validated",inputType: "radio", disabled:true, required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      // ],
      // View_BankDetails_title: [
      //   { name: "viewBankDetails",label: "View Bank Details",inputType: "accordian"},
      // ],
      // View_Bank_Details: [
      //   { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      //   { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",placeholder:"Bank IFSC" },
      //   { name: "BankAccountNumber",label: "Bank Account Number",inputType: "text",required: true,validationmsg: "", placeholder: "Bank Account Number"},
      //   { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      //   { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",required: true,validationmsg: "",placeholder:"Penny Drop Result" },
      //    ],
      View_POS_Manager_Action_title: [
        { name: "viewPOS",label: "POS Manager Action",inputType: "accordian"},
      ],
      POS_Manager_Action: [
       
        
        { name: "BankAccountDeDupe",label: "Bank account de-dupe",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"Bank account de-dupe" },
        // { name: "negavativeList",label: "Negative List",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"" },
        { name: "SignatureChange",label: "Signature Change",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"" },
        // { name: "STPFailedReason",label: "STP Failed Reason",inputType: "dropdown",required: true,validationmsg: "",placeholder:"STP Failed Reason" },
        // { name: "ViewDetails",label: "View Details",inputType: "link",linkValue:"View",required: true,validationmsg: "",placeholder:"If any policy logged in the last 6 months" },
        // { name: "Decision",label: "Decision",inputType: "dropdown",required: true,validationmsg: "",placeholder:"Decision" },
        // { name: "SendEmailtoCompliance",label: "Send Email to Compliance",inputType: "text",hyperLinks:"Add CC",required: false,validationmsg: "",placeholder:"Send Email to Compliance" },
        // { name: "comment",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      Add_CC:[
        { name: "payableAmount",label: "",inputType: "texts",required: false,validationmsg: "",placeholder:"Send Email to Compliance" },
        { name: "sendEmail",label: "",inputType: "text",hyperLinks:"Send",required: false,validationmsg: "",placeholder:"Enter CC Email" },
      ],
      // Comments:[
      //   { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      // ]
    },
    rechecksurrenderpayout:{
          BOE_Details:[
            { name: "surrenderRequestDate", label: "Surrender Request Date", inputType: "text",required:false,validationmsg:"Select Surrender Request Date",placeholder: "Select a date", },
            { name: "SurrenderValueDate", label: "Surrender Value Date", inputType: "text",required:false,validationmsg:"Select Surrender Value Date",placeholder: "Select a date", },
            { name: "Surrenderpos", label: "Request For",disabled:true, inputType: "dropdown",required:false,validationmsg:"Select Request For",placeholder: "Request For", },
            { name: "SurrenderValuePayable",label: "Surrender Value Payable",inputType: "text",required: false,validationmsg: "",placeholder:"Surrender Value Payable" },
            { name: "SurrenderValuePaid",label: "Surrender Value Paid",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"Surrender Value Paid" },
          ],
          Fund_Transfer_Fields:[
            { name: "FundTransfer",label: "Fund Transfer",inputType: "text",required: false,validationmsg: "Fund Transfer",placeholder:"Fund Transfer" },
            { name: "FundTransferPolicy",label: "Fund transfer Policy / Application ",inputType: "text",required: false,validationmsg: "",placeholder:"Fund transfer Policy / Application " },
            { name: "BalanceAmount",label: "Balance Amount for Surrender",inputType: "text",required: false,validationmsg: "",placeholder:"Balance Amount for Surrender" },
          ],
          Other_Fileds:[
            { name: "PaymentDate", label: "Payment Date", inputType: "text",required:false,validationmsg:"Select Payment Date",placeholder: "Select a date", },
            { name: "ReasonForReEvaluation", label: "Reason for re-evaluation", inputType: "text",required:false,validationmsg:"Reason for re-evaluation",placeholder: "Reason for re-evaluation", },
            { name: "RequestorComments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
          ],
          POS_Details:[
            { name: "surrenderRequestDate", label: "Surrender Request Date", inputType: "text",required:false,validationmsg:"Select Surrender Request Date",placeholder: "DD/MM/YYYY", disabled:true },
            { name: "SurrenderValueDate", label: "Surrender Value Date", inputType: "text",required:false,validationmsg:"Select Surrender Value Date",placeholder: "Select a date", disabled:true },
            { name: "SurrenderValuePayable",label: "Surrender Value Payable",inputType: "text",required: false,validationmsg: "",placeholder:"Surrender Value Payable",disabled:true  },
            { name: "SurrenderValuePaid",label: "Surrender Value Paid",inputType: "text",required: false,validationmsg: "",placeholder:"Surrender Value Paid",disabled:true },
            { name: "PaymentDate", label: "Payment Date", inputType: "text",required:false,validationmsg:"Select Payment Date",placeholder: "DD/MM/YYYY",disabled:true },
            { name: "Surrenderpos", label: "Reason For Surrender", inputType: "text",required:false,validationmsg:"Select Reason For Surrender",placeholder: "Reason For Surrender",disabled:true},
            { name: "decision",label: "Decision",inputType: "dropdown",required: true,validationmsg: "Decision Required",placeholder:"Decision"},
          ]
    },
  
    
    changeinnominee:{
      BOE_Details: [
        { name: "NominationChangeAllowed",label: "Nomination Change Allowed ", inputType: "text",required: true,disabled:true,validationmsg: "Select Nomination Change Allowed ",placeholder:"Select" },
      ],
      Existing_Nominee_Details: [
        { name: "ExistingNomineeDetails",label: "View Existing Nominee Details",inputType: "title" },
        // {name:"texts", lable:"", inputType: "texts"},
        { name: "NomineeName",label: "Nominee Name",inputType: "text",required: true,validationmsg: "Enter Nominee Name",placeholder:"Nominee Name" },
        { name: "NomineeDOB",label: "Nominee DOB",inputType: "text",required: true,validationmsg: "Nominee DOB",placeholder:"DD/MM/YYYY" },
        { name: "RelationshipwithLifeAssured",label: "Relationship with Life Assured",inputType: "text",required: true,validationmsg: "Relationship with Life Assured",placeholder:"Relationship with Life Assured" },
        { name: "Share",label: "% Share",inputType: "text",required: true,validationmsg: "% Share",placeholder:"% Share" },
        { name: "AppointeeName",label: "Appointee Name",inputType: "text",required: true,validationmsg: "Enter Appointee Name",placeholder:"Appointee Name" },
        { name: "AppointeeDOB",label: "Appointee DOB",inputType: "text",required: true,validationmsg: "Appointee DOB",placeholder:"Appointee DOB" },
        { name: "RelationshipwithLifeAssured",label: "Relationship with Life Assured",inputType: "text",required: true,validationmsg: "Relationship with Life Assured",placeholder:"Relationship with Life Assured" },
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
      ],
      New_Nominee_Details:[
        { name: "NewNomineeDetails",label: "Update New Nominee Details",inputType: "title" },
        // {name:"texts", lable:"", inputType: "texts"},
        { name: "NomineeName",label: "Nominee Name",inputType: "text",required: true,validationmsg: "Enter Nominee Name",placeholder:"Nominee Name" },
        { name: "NomineeDOB",label: "Nominee DOB",inputType: "date",required: true,validationmsg: "Nominee DOB",placeholder:"Nominee DOB" },
        { name: "RelationshipwithLifeAssured",label: "Relationship with Life Assured",inputType: "text",required: true,validationmsg: "Relationship with Life Assured",placeholder:"Relationship with Life Assured" },
        { name: "Share",label: "% Share",inputType: "text",required: true,validationmsg: "% Share",placeholder:"% Share" },
        { name: "AppointeeName",label: "Appointee Name",inputType: "text",required: true,validationmsg: "Enter Appointee Name",placeholder:"Appointee Name" },
        { name: "AppointeeDOB",label: "Appointee DOB",inputType: "text",required: true,validationmsg: "Appointee DOB",placeholder:"Appointee DOB" },
        { name: "RelationshipwithLifeAssured",label: "Relationship with Life Assured",inputType: "text",required: true,validationmsg: "Relationship with Life Assured",placeholder:"Relationship with Life Assured" },
        
      ],
      Share_Nominee_process:[
        {name: 'ShareNomineeChangeProcess',label: 'Share Nominee Change Process',inputType: "icons",required: false,validationmsg: "Share Nominee Change Process",placeholder:"Send Via" },
        // {name: 'ShareNomineeRequestForm',label: 'Share Nominee Request Form',inputType: "icons",required: false,validationmsg: "Share Nominee Request Form",placeholder:"Send Via" },
        // {name: 'ShareListofProofs',label: 'Share List of Proofs',inputType: "icons",required: false,validationmsg: "Share List of Proofs",placeholder:"Send Via" },
      ],
      Request_Details:[
        {name:"requestform",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form",indexName:"Change or Correction in the Nominee"},
        {name:"NomineeIDProof",label:"Nominee ID Proof",inputType:"upload",required:true,validationmsg:"Nominee ID Proof",placeholder:"Nominee ID Proof",indexName:"Change or Correction in the Nominee"},
        { name: "customersigning", label: "Customer Signing Date & Time", inputType: "nofuturedates",required: true,validationmsg: "Select Customer Signing Date & Time",placeholder: "", },
          { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required: true,validationmsg: "Select Request Received Date",placeholder: "Request Received Date" },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required: true,validationmsg: "Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
      ],
      // ReasonSubmission:[
      //   { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
      // ],
      Comments:[
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      POS_Details:[
        // { name: "ExistingNomineeDetails",label: "View Existing Nominee Details",inputType: "title" },
        // {name:"texts", lable:"", inputType: "texts"},
        // { name: "NomineeName",label: "Nominee Name",inputType: "text",required: false,validationmsg: "Enter Nominee Name",placeholder:"Nominee Name" },
        // { name: "NomineeDOB",label: "Nominee DOB",inputType: "text",required: false,validationmsg: "Nominee DOB",placeholder:"DD/MM/YYYY" },
        // { name: "RelationshipwithLifeAssured",label: "Relationship with Life Assured",inputType: "text",required: false,validationmsg: "Relationship with Life Assured",placeholder:"Relationship with Life Assured" },
        // { name: "Share",label: "% Share",inputType: "text",required: false,validationmsg: "% Share",placeholder:"% Share" },
        // { name: "AppointeeName",label: "Appointee Name",inputType: "text",required: false,validationmsg: "Enter Appointee Name",placeholder:"Appointee Name" },
        // { name: "AppointeeDOB",label: "Appointee DOB",inputType: "text",required: false,validationmsg: "Appointee DOB",placeholder:"Appointee DOB" },
        // { name: "RelationshipwithLifeAssured",label: "Relationship with Life Assured",inputType: "text",required: false,validationmsg: "Relationship with Life Assured",placeholder:"Relationship with Life Assured" },
        // {name:"texts", lable:"", inputType: "texts"},
        // { name: "NewNomineeDetails",label: "Update New Nominee Details",inputType: "title" },
        // {name:"texts", lable:"", inputType: "texts"},
        // { name: "NomineeName",label: "Nominee Name",inputType: "text",required: true,validationmsg: "Enter Nominee Name",placeholder:"Nominee Name" },
        // { name: "NomineeDOB",label: "Nominee DOB",inputType: "text",required: true,validationmsg: "Nominee DOB",placeholder:"DD/MM/YYYY" },
        // { name: "RelationshipwithLifeAssured",label: "Relationship with Life Assured",inputType: "text",required: true,validationmsg: "Relationship with Life Assured",placeholder:"Relationship with Life Assured" },
        // { name: "Share",label: "% Share",inputType: "text",required: true,validationmsg: "% Share",placeholder:"% Share" },
        // { name: "AppointeeName",label: "Appointee Name",inputType: "text",required: true,validationmsg: "Enter Appointee Name",placeholder:"Appointee Name" },
        // { name: "AppointeeDOB",label: "Appointee DOB",inputType: "text",required: true,validationmsg: "Appointee DOB",placeholder:"Appointee DOB" },
        // { name: "RelationshipwithLifeAssured",label: "Relationship with Life Assured",inputType: "text",required: true,validationmsg: "Relationship with Life Assured",placeholder:"Relationship with Life Assured" },
        {name:"requestform",label:"Request Form",inputType:"link",linkValue:"View",required:false,validationmsg:"Request Form",placeholder:"Request Form"},
        {name:"NomineeIDProof",label:"Nominee ID Proof",inputType:"link",linkValue:"View",required:false,validationmsg:"Nominee ID Proof",placeholder:"Nominee ID Proof"},
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",required:false,disabled:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",required:false,disabled:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,disabled:true,placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",required: false,disabled:true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "BranchComments",label: "Requestor Comments",inputType: "text",disabled:true,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
        { name: "Comments",label: " Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      
      ],
    },
    changeinappointee:{
        Existing_Appointee_Details: [
          { name: "AppointeName_Old",label: "Appointee Name",inputType: "text",required: true,disabled:true,validationmsg: "Enter Appointee Name",placeholder:"Appointee Name" },
          { name: "AppointeDOB_Old",label: "Appointee DOB",inputType: "text",required: true,disabled:true,validationmsg: "Appointee DOB",placeholder:"DD/MM/YYYY" },
          // { name: "AppointeShare_Old",label: "% Share",inputType: "text",required: true,disabled:true,validationmsg: "% Share",placeholder:"% Share" },
          // { name: "AppointeRealtionshipWithPolicyowner_Old",label: "Relationship with Policy Owner",inputType: "text",disabled:true,required: true,validationmsg: "Relationship with Policy Owner",placeholder:"Relationship with Policy Owner" },
        
        ],
        New_Appointee_Details:[
          { name: "AppointeName_New",label: "Appointee Name",inputType: "text",required: true,validationmsg: "Enter Appointee Name",placeholder:"Appointee Name" },
          { name: "AppointeDOB_New",label: "Appointee DOB",inputType: "date",required: true,validationmsg: "Appointee DOB",placeholder:"DD/MM/YYYY" },
          // { name: "AppointeShare_New",label: "% Share",inputType: "text",required: true,validationmsg: "% Share",placeholder:"% Share" },
          { name: "AppointeRealtionshipWithPolicyowner_New",label: "Relationship with Policy Owner",inputType: "dropdown",required: false,validationmsg: "Relationship with Policy Owner",placeholder:"Select a Relationship with Policy Owner" },
        ],
        Request_Details:[
          {name:"requestform",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form",indexName:"Appointee"},
          {name:"IDProof",label:"ID Proof",inputType:"upload",required:true,validationmsg:"ID Proof",placeholder:"ID Proof",indexName:"Appointee"},
          { name: "customersigning", label: "Customer Signing Date & Time", inputType: "nofuturedates",required: true,validationmsg: "Select Customer Signing Date & Time",placeholder: "", },
          { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required: true,validationmsg: "Select Request Received Date",placeholder: "Request Received Date" },
          { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
          { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
        ],
        ReasonSubmission:[
          { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
        ],
        Comments:[
          { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
        ],
        Share_Appointee_process:[
          {name: 'ShareNomineeChangeProcess',label: 'Send Appointee Change Process',inputType: "icons",required: false,validationmsg: "Send Appointee Change Process",placeholder:"Send Via" },
        ],
        POS_Details:[
          { name: "ExistingAppoineeDetails",label: "Existing Appointee Details",inputType: "title",required: false,validationmsg: "Existing Appoinee Details",placeholder:"Existing Appoinee Details" },
          { name: "Share",label: "",inputType: "texts"},
          { name: "AppointeName_Old",label: "Appointee Name",inputType: "text",required: false,disabled:true,validationmsg: "Enter Appointee Name",placeholder:"Appointee Name" },
          { name: "AppointeDOB_Old",label: "Appointee DOB",inputType: "text",required: false,disabled:true,validationmsg: "Appointee DOB",placeholder:"DD/MM/YYYY" },
          // { name: "AppointeShare_Old",label: "% Share",inputType: "text",required: false,disabled:true,validationmsg: "% Share",placeholder:"% Share" },
          { name: "AppointeRealtionshipWithPolicyowner_Old",label: "Relationship with Policy Owner",inputType: "text",disabled:true,required: false,validationmsg: "Relationship with Policy Owner",placeholder:"Relationship with Policy Owner" },
          { name: "Share",label: "",inputType: "texts"},
          { name: "NewAppointeeDetails",label: "New Appointee Details",inputType: "title",required: false,validationmsg: "Existing Appoinee Details",placeholder:"Existing Appoinee Details" },
          { name: "Share",label: "",inputType: "texts"},
          { name: "AppointeName_New",label: "Appointee Name",inputType: "text",required: false,validationmsg: "Enter Appointee Name",placeholder:"Appointee Name" },
          { name: "AppointeDOB_New",label: "Appointee DOB",inputType: "text",required: false,validationmsg: "Appointee DOB",placeholder:"DD/MM/YYYY" },
          // { name: "AppointeShare_New",label: "% Share",inputType: "text",required: false,validationmsg: "% Share",placeholder:"% Share" },
          { name: "AppointeRealtionshipWithPolicyowner_New",label: "Relationship with Policy Owner",inputType: "text",required: false,validationmsg: "Relationship with Policy Owner",placeholder:"Relationship with Policy Owner" },
          {name:"requestform",label:"Request Form",inputType:"link",linkValue:"View",required:false,validationmsg:"Request Form",placeholder:"Request Form"},
          {name:"IDProof",label:"ID Proof",inputType:"link",linkValue:"View",required:false,validationmsg:"ID Proof",placeholder:"ID Proof"},
          { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
          { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
        ]
    },
   
    statusenquiry:{
     BOE_Details:[
      { name: "IsPolicyWithinFreelook",label: "Is Policy Within Freelook", inputType: "dropdown",required: true,validationmsg: "Select Is Policy Within Freelook ",placeholder:"Select" },
     ],
     Policy_Freelook_NoFields:[
      { name: "FreelookPeriodEndedOn",label: "Freelook Period Ended On",inputType: "text",required: true,validationmsg: "Enter Freelook Period Ended On",placeholder:"Freelook Period Ended On" },
      { name: "FreelookPeriod",label: "Freelook Period",inputType: "text",required: true,validationmsg: "Enter Freelook Period",placeholder:"Freelook Period" },
      { name: "DispatchDate",label: "Dispatch Date",inputType: "text",required: true,validationmsg: "Enter Dispatch Date",placeholder:"DD/MM/YYYY" },
      { name: "PODNo",label: "POD No:",inputType: "text",required: true,validationmsg: "Enter POD No",placeholder:"POD No" },
      { name: "ReceivedOn",label: "Received On",inputType: "text",required: true,validationmsg: "Enter Received On",placeholder:"Received On" },
      { name: "ReceivedBy",label: "Received By",inputType: "text",required: true,validationmsg: "Enter Received By",placeholder:"Received By" },
      { name: "RTOStatus",label: "RTO Status",inputType: "text",required: true,validationmsg: "Enter RTO Status",placeholder:"RTO Status" },
      { name: "PolicyRedispatch",label: "Policy Redispatch",inputType: "dropdown",required: true,validationmsg: "Enter Policy Redispatch",placeholder:"Policy Redispatch" },
    ],
    Policy_Redispatch_YesFileds:[
      { name: "DispatchMode",label: "Dispatch Mode",inputType: "text",required: true,validationmsg: "Enter Dispatch Mode",placeholder:"Dispatch Mode" },
      { name: "REDispatchDate",label: "Dispatch Date",inputType: "text",required: true,validationmsg: "Enter Dispatch Date",placeholder:"Dispatch Date" },
      { name: "REPODNo",label: "POD No:",inputType: "text",required: true,validationmsg: "Enter POD No",placeholder:"POD No" },
      { name: "REReceivedOn",label: "Received On",inputType: "text",required: true,validationmsg: "Enter Received On",placeholder:"Received On" },
      { name: "REReceivedBy",label: "Received By",inputType: "text",required: true,validationmsg: "Enter Received By",placeholder:"Received By" },

    ],
    Policy_Freelook_YesFields:[

    ],
    Enquiry_Fields:[
      { name: "FreelookPeriodEndedOn",label: "Freelook Period Ended On",inputType: "text",required: true,validationmsg: "Enter Freelook Period Ended On",placeholder:"Freelook Period Ended On" },
      { name: "FreelookPeriod",label: "Freelook Period",inputType: "text",required: true,validationmsg: "Enter Freelook Period",placeholder:"Freelook Period" },
      { name: "DispatchDate",label: "Dispatch Date",inputType: "text",required: true,validationmsg: "Enter Dispatch Date",placeholder:"DD/MM/YYYY" },
      { name: "PODNo",label: "POD No:",inputType: "text",required: true,validationmsg: "Enter POD No",placeholder:"POD No" },
      { name: "ReceivedOn",label: "Received On",inputType: "text",required: true,validationmsg: "Enter Received On",placeholder:"Received On" },
      { name: "ReceivedBy",label: "Received By",inputType: "text",required: true,validationmsg: "Enter Received By",placeholder:"Received By" },
      { name: "RTOStatus",label: "RTO Status",inputType: "text",required: true,validationmsg: "Enter RTO Status",placeholder:"RTO Status" },
      { name: "PolicyRedispatch",label: "Policy Redispatch",inputType: "dropdown",required: true,validationmsg: "Enter Policy Redispatch",placeholder:"Policy Redispatch" },
    ],
    Enquiry_YesFileds:[
      { name: "DispatchMode",label: "Dispatch Mode",inputType: "text",required: true,validationmsg: "Enter Dispatch Mode",placeholder:"Dispatch Mode" },
      { name: "REDispatchDate",label: "Dispatch Date",inputType: "text",required: true,validationmsg: "Enter Dispatch Date",placeholder:"Dispatch Date" },
      { name: "REPODNo",label: "POD No:",inputType: "text",required: true,validationmsg: "Enter POD No",placeholder:"POD No" },
      { name: "REReceivedOn",label: "Received On",inputType: "text",required: true,validationmsg: "Enter Received On",placeholder:"Received On" },
      { name: "REReceivedBy",label: "Received By",inputType: "text",required: true,validationmsg: "Enter Received By",placeholder:"Received By" },
      { name: "WelcomeCallDate",label: "Welcome Call Date",inputType: "text",required: true,validationmsg: "Enter Welcome Call Date",placeholder:"Welcome Call Date" },
      { name: "WelcomeCallComments",label: "Welcome Call Comments",inputType: "text",required: true,validationmsg: "Enter Welcome Call Comments",placeholder:"Welcome Call Comments" },
      { name: "ViewFreelookPayout",label: "View Freelook Payout",inputType: "link",linkValue:"View",required: true,validationmsg: "View Freelook Payout",placeholder:"View Freelook Payout" },
      { name: "SENDFREELOOKPROCESS",label: "Share Process",inputType: "icons",required: true,validationmsg: "Select Atleast One Communication" },
      { name: "SENDFREELOOKPROCESS",label: "Share Freelook Request FC",inputType: "icons",required: true,validationmsg: "Select Atleast One Communication" },
      { name: "SENDFREELOOKPROCESS",label: "Proofs/Documnets Required",inputType: "icons",required: true,validationmsg: "Select Atleast One Communication" },
    ],
    // Retained_Fields:[
    //   { name: "ProductUSP",label: "Product USP",inputType: "text",hyperLink:true,required: true,validationmsg: "ProductUSP",placeholder:"ProductUSP" },
    //   { name: "IsCustomerRetained",label: "Is Customer Retained",inputType: "dropdown",required: true,validationmsg: "Is Customer Retained",placeholder:"Select Is Customer Retained"}
    // ],
    // CustomerRetained_Fields:[
    //   { name: "UploadRetentionLetter",label: "Upload Retention Letter",inputType: "upload",hyperLink:true,required: true,validationmsg: "Upload Retention Letter",placeholder:"Upload Retention Letter",indexName:"CSD_Freelook" },
    // ]
    customerChoice:[ {name: "customerRetained",label: "Is Customer Retained",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",radioValue:"yes",secondRadioValue:"no", }],
    CustomerRetained:[
      {name: "customerRetained",label: "Is Customer Retained",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no", },
      {name:"surrenderLetter",label:"Upload Retention Letter",inputType:"upload",required:false,validationmsg:"",placeholder:"Upload Retention Letter",indexName:"Surrender Form"},
      { name: "comment",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comments" },
    ],
    },

    registerfreelookrequest:{
      BOE_Details:[
        { name: "FundTransfer",label: "Do you wish to opt for fund transfer", inputType: "dropdown",required: true,validationmsg: "Select Do you wish to opt for fund transfer",placeholder:"Select" },
      ],
      FundTransfer_YesFields:[
        { name: "ViewFreelookAmount",label: "View Freelook Amount",inputType: "link",linkValue:"View",required: false,validationmsg: "View Freelook Amount",placeholder:"View Freelook Amount" },
        { name: "RequestTime",label: "Request Time",inputType: "dropdown",hide:true,required: true,validationmsg: "Select Request Time",placeholder:"Select Request Time"},
        { name: "ReasonForFreelook",label: "Reason For Freelook",inputType: "dropdown",required: true,validationmsg: "Select Reason For Freelook",placeholder:"Reason For Freelook" },
        { name: "FundTransferTo",label: "Fund Transfer To",inputType: "text",required: true,validationmsg: "Fund Transfer To",placeholder:"Fund Transfer To" },
        { name: "FundTransferAmount",label: "Fund Transfer Amount",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter Fund Transfer Amount",placeholder:"Fund Transfer Amount" },
        { name: "RelationsToFTPolicy",label: "Relations to FT policy",inputType: "text",required: true,validationmsg: "Enter Relations to FT policy",placeholder:"Relations to FT policy" },
        { name: "NameOfFundTransferPolicyOwner",label: "Name of Fund Transfer Policy Owner",inputType: "text",required: true,validationmsg: "Enter Name of Fund Transfer Policy Owner",placeholder:"Name of Fund Transfer Policy Owner" },
        { name: "BalanceAmountForFreelook",label: "Balance Amount for Freelook",inputType: "text",required: true,validationmsg: "Enter Balance Amount for Freelook",placeholder:"Balance Amount for Freelook" },
        { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "Enter Name as Mentioned in The Bank A/C",placeholder:"Name as Mentioned in The Bank A/C" },
        { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "Enter bank IFSC",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
        { name: "BankAccountNumber",label: "Bank Account Number",inputType: "number",required: true,validationmsg: "Enter Bank ACC No", pattern:'numbersOnly', placeholder: "Bank Account Number"},
        {name:"ConfirmBankAccountNumber",label:"Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required:true,validationmsg:"Enter Confirm Bank ACC No",placeholder:"Confirm Bank Account Number"},
        { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "Enter Bank Name",placeholder:"Bank Name" },
        { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink: true,required: true,validationmsg: "Enter Initiate Penny Drop",placeholder:"Initiate Penny Drop" },
        
        { name: "FreelookRequestForm",indexName:'Free Look Cancellation', label: "Freelook Request Form",inputType: "upload",required: false,validationmsg: "Freelook Request Form",placeholder:"Freelook Request Form" },
        { name: "PolicyBond/Indemnity",indexName:'Free Look Cancellation',label: "Policy Bond/Indemnity",inputType: "upload",required: false,validationmsg: "Policy Bond/Indemnity",placeholder:"Policy Bond/Indemnity" },
        { name: "PolicyownerIDproof",indexName:'Free Look Cancellation',label: "Policy Owner ID proof",inputType: "upload",required: false,validationmsg: "Policy Owner ID proof",placeholder:"Policy Owner ID proof" },
        { name: "PolicyOwnerBankAccountProof",indexName:'Free Look Cancellation',label: "Policy Owner Bank Account Proof",inputType: "upload",required: false,validationmsg: "Policy Owner Bank Account Proof",placeholder:"Policy Owner Bank Account Proof" },
        
        { name: "FreelookApprovalEmail",indexName:'Free Look Cancellation',label: "Out of Freelook Approval Email",inputType: "upload",required: false,validationmsg: "Out of Freelook Approval Email",placeholder:"Out of Freelook Approval Email" },
        
        // { name: "FreelookApprovalEmail",label: "Out of Freelook Approval Email",inputType: "text",required: true,validationmsg: "Out of Freelook Approval Email",placeholder:"Out of Freelook Approval Email" },
        { name: "PANAadhaarLinked",label: "PAN Aadhaar Linked",inputType: "dropdown",required: true,validationmsg: "Select PAN Aadhaar Linked",placeholder:"PAN Aadhaar Linked" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required: true,validationmsg: "Customer Signing Date",placeholder: "Select a date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required: true,validationmsg: "Request Received Date",placeholder: "Select a date", },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      ReasonSubmission:[
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text", hide : false, placeholder: "Reason for Delayed Submission" },
      ],
      Comments:[
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      FundTransfer_NoFields:[
        { name: "FreelookRequestForm",indexName:'Free Look Cancellation',label: "Freelook Request Form",inputType: "upload",required: false,validationmsg: "Freelook Request Form",placeholder:"Freelook Request Form" },
        { name: "PolicyBond/Indemnity",indexName:'Free Look Cancellation',label: "Policy Bond/Indemnity",inputType: "upload",required: false,validationmsg: "Policy Bond/Indemnity",placeholder:"Policy Bond/Indemnity" },
        { name: "PolicyownerIDproof",indexName:'Free Look Cancellation',label: "Policy Owner ID proof",inputType: "upload",required: false,validationmsg: "Policy Owner ID proof",placeholder:"Policy Owner ID proof" },
        { name: "PolicyOwnerBankAccountProof",indexName:'Free Look Cancellation',label: "Policy Owner Bank Account Proof",inputType: "upload",required: false,validationmsg: "Policy Owner Bank Account Proof",placeholder:"Policy Owner Bank Account Proof" },
        { name: "RequestTime",label: "Request Time",inputType: "dropdown",hide:true,required: true,validationmsg: "Select Request Time",placeholder:"Select Request Time"},
        { name: "FreelookApprovalEmail",indexName:'Free Look Cancellation',label: "Out of Freelook Approval Email",inputType: "upload",required: false,validationmsg: "Out of Freelook Approval Email",placeholder:"Out of Freelook Approval Email" },
        { name: "PANAadhaarLinked",label: "PAN Aadhaar Linked",inputType: "dropdown",required: true,validationmsg: "Select PAN Aadhaar Linked",placeholder:"PAN Aadhaar Linked" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required: true,validationmsg: "Customer Signing Date",placeholder: "Select a date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required: true,validationmsg: "Request Received Date",placeholder: "Select a date", },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "FreeLookAmount",label: "View Freelook Amount",inputType: "link",linkValue:"View",required: false,validationmsg: "View Freelook Amount",placeholder:"View Freelook Amount" },
        { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "Enter Name as Mentioned in The Bank A/C",placeholder:"Name as Mentioned in The Bank A/C" },
        { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "Enter bank IFSC",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
        { name: "BankAccountNumber",label: "Bank Account Number",inputType: "number",required: true,validationmsg: "Enter Bank ACC No", pattern:'numbersOnly', placeholder: "Bank Account Number"},
        {name:"ConfirmBankAccountNumber",label:"Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required:true,validationmsg:"Enter Confirm Bank ACC No",placeholder:"Confirm Bank Account Number"},
        { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "Enter Bank Name",placeholder:"Bank Name" },
        { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink: true,required: true,validationmsg: "Enter Initiate Penny Drop",placeholder:"Initiate Penny Drop" },
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comments" },
      ],
      POS_Details:[
        { name: "FreeLookAmount",label: "Freelook Amount",inputType: "text",required: false, disabled:true,validationmsg: "Freelook Amount",placeholder:"Freelook Amount" },
        { name: "FreelookRequestFor",label: "Request For",inputType: "dropdown",required: false, disabled:true,validationmsg: "Request For",placeholder:"Request For" },
        // { name: "RequestTime",label: "Request Time",inputType: "text",required: true,validationmsg: "Request Time",placeholder:"Request Time" },
        ],
      POS_FundTransfer_Fields:[
        { name: "FundTransferTo",label: "Fund Transfer To",inputType: "text",hide:false,  required: false, disabled:true, validationmsg: "Fund Transfer To",placeholder:"Fund Transfer To" },
        { name: "FundTransferAmount",label: "Fund Transfer Amount",hide:false,inputType: "text",required: false, disabled:true,validationmsg: "Enter Fund Transfer Amount",placeholder:"Fund Transfer Amount" },
        { name: "RelationsToFTPolicy",label: "Relations to FT policy",hide:false,inputType: "text",required: false, disabled:true,validationmsg: "Enter Relations to FT policy",placeholder:"Relations to FT policy" },
        { name: "NameOfFundTransferPolicyOwner",label: "Name of Fund Transfer Policy Owner",hide:false,inputType: "text",required: false, disabled:true,validationmsg: "Enter Name of Fund Transfer Policy Owner",placeholder:"Name of Fund Transfer Policy Owner" },
        { name: "BalanceAmountForFreelook",label: "Balance Amount for Freelook",hide:false,inputType: "text",required: false, disabled:true,validationmsg: "Enter Balance Amount for Freelook",placeholder:"Balance Amount for Freelook" },
        { name: "ReasonForDelay",label: "Reason For Delay",  hide : false,inputType: "text",required: false, disabled:true,validationmsg: "Reason For Delay",placeholder:"Reason For Delay" },
        { name: "BranchRemarks",label: "Branch Remarks",inputType: "text",required: false, disabled:true,validationmsg: "Branch Remarks",placeholder:"Branch Remarks" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: false, disabled:true,validationmsg: "",  class:'disabled',title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        
        // {name:"texts",label:"",inputType:"texts"},
       // { name: "FreelookRequestForm",label: "Freelook Request Form",inputType: "link",linkValue:"View",required: false,validationmsg: "Freelook Request Form",placeholder:"Freelook Request Form" },
        // { name: "PolicyBond",label: "Policy Bond/Indemnity",inputType: "link",linkValue:"View",required: false,validationmsg: "Policy Bond/Indemnity",placeholder:"Policy Bond/Indemnity" },
        // { name: "PolicyownerIDproof",label: "Policy Owner ID proof",inputType: "link",linkValue:"View",required: false,validationmsg: "Policy Owner ID proof",placeholder:"Policy Owner ID proof" },
        // { name: "PolicyOwnerBankAccountProof",label: "Policy Owner Bank Account Proof",linkValue:"View",inputType: "link",required: false,validationmsg: "Policy Owner Bank Account Proof",placeholder:"Policy Owner Bank Account Proof" },
        // { name: "Outoffreelookapprovalemail",label: "Out of Freelook Approval Email",linkValue:"View",inputType: "link",required: false,validationmsg: "Out of Freelook Approval Email",placeholder:"Out of Freelook Approval Email" },
        
        
      ],
      POS_View_Documents:[

       {name:"ViewDocuments",label:"View Documents",inputType:"title"},
      {name:"texts",label:"",inputType:"texts"},
      { name: "FreelookRequestForm",label: "Uploaded Documents",inputType: "link",linkValue:"View",required: false,validationmsg: "Freelook Request Form",placeholder:"Freelook Request Form" },
      { name: "PANAadhaarLinked",label: "PAN Aadhaar Linked",inputType: "dropdown",disabled:true,required: false,validationmsg: "Select PAN Aadhaar Linked",placeholder:"PAN Aadhaar Linked" },
    ],

      POS_View_Bank_Details:[
        {name:"ViewDocuments",label:"View Bank Details",inputType:"title", icon:'edit'},
        {name:"texts",label:"",inputType:"texts"},
        { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C", disabled:true },
        { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" , disabled:true},
        { name: "BankAccountNumber",label: "Bank Account Number",inputType: "number",required: false,validationmsg: "", pattern:'numbersOnly', placeholder: "Bank Account Number", disabled:true},
        { name: "BankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name", disabled:true },
        { name: "PennydropResult",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder: "Penny Drop Result", disabled:true},
      
      ],
      POS_Action_Fields:[
        {name:"ViewDocuments",label:"POS Action",inputType:"title"},
        {name:"texts",label:"",inputType:"texts"},
        { name: "paymentMode",label: "Payment Mode",inputType: "dropdown",required: true,validationmsg: "",placeholder:"Payment Mode" },
        { name: "ChangeInLast60Days",label: "Any personal details change in last 60 days",inputType: "dropdown",disabled:true,required: false,validationmsg: "",placeholder:"Any personal details change in last 60 days" },
        { name: "PolicyLoggedLast",label: "If any policy logged in the last 6 months",inputType: "dropdown",disabled:true,required: false,validationmsg: "",placeholder:"If any policy logged in the last 6 months" },
        
        { name: "ViewFinalPayableAmount",label: "View Final Payable Amount",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"View Final Payable Amount" },
        { name: "InitiatePennyDropPOS",label: "Initiate Penny Drop", hide:false, inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       
        { name: "BankAccountDeDupe",label: "Bank account de-dupe",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"Bank account de-dupe" },
        // { name: "negavativeList",label: "Negative List",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"" },
        { name: "SignatureChange",label: "Signature Change",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"" },
        
         { name: "POSComments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comments" },
      ],
      POS_Manager_Details:[
        { name: "FreeLookAmount",label: "Freelook Amount",inputType: "text",required: false,disabled:true, validationmsg: "Freelook Amount",placeholder:"Freelook Amount" },
        // { name: "RequestTime",label: "Request Time",inputType: "text",required: true,validationmsg: "Request Time",placeholder:"Request Time" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",required: false,disabled:true,validationmsg: "Customer Signing Date",placeholder: "Select a date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",required: false,disabled:true,validationmsg: "Request Received Date",placeholder: "Select a date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", hide:false, inputType: "text",placeholder: "Reason for Delayed Submission" },
        { name: "BranchRemarks",label: "Branch Remarks",inputType: "text",required: false,disabled:true,validationmsg: "Branch Remarks",placeholder:"Branch Remarks"},
        // {name:"texts",label:"",inputType:"texts"},
     
        {name:"ViewDocuments",label:"View Documents",inputType:"title"},
        {name:"texts",label:"",inputType:"texts"},
        { name: "FreelookRequestForm",label: "Uploaded Documents",inputType: "link",linkValue:"View",required: false,validationmsg: "Freelook Request Form",placeholder:"Freelook Request Form" },
        // { name: "FreelookRequestForm",label: "Freelook Request Form",inputType: "link",linkValue:"View",required: false,validationmsg: "Freelook Request Form",placeholder:"Freelook Request Form" },
        // { name: "PolicyBondIndemnity",label: "Policy Bond/Indemnity",inputType: "link",linkValue:"View",required: false,validationmsg: "Policy Bond/Indemnity",placeholder:"Policy Bond/Indemnity" },
        // { name: "PolicyownerIDproof",label: "Policy owner ID proof",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"Bank account de-dupe" },
        // { name: "Policyownerbankaccount proof",label: "Policy owner bank account proof",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"Policy owner bank account proof" },
        // { name: "Outoffreelookapprovalemail",label: "Out of freelook approval email",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"Out of freelook approval email" },
        
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",required: false,disabled:true, validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
      POS_Manager_View_Bank_Details:[
        {name:"ViewDocuments",label:"View Bank Details",inputType:"title"},
        {name:"texts",label:"",inputType:"texts"},
        { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",disabled:true,inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
        { name: "BankIFSC",label: "Bank IFSC",inputType: "text",disabled:true,required: false,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
        { name: "BankAccountNumber",label: "Bank Account Number",disabled:true,inputType: "number",required: false,validationmsg: "", pattern:'numbersOnly', placeholder: "Bank Account Number"},
        { name: "BankName",label: "Bank Name",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Bank Name" },
        { name: "PennydropResult",label: "Penny Drop Result",disabled:true,inputType: "text",required: false,validationmsg: "",placeholder: "Penny Drop Result"},
        // { name: "NameReceivedinPennyDrop",label: "Name Received in Penny Drop",inputType: "text",required: false,validationmsg: "",placeholder: "Name Received in Penny Drop"},
        
      ],
      POS_Manager_Action: [
        {name:"POSManagerAction",label:"POS Manager Action",inputType:"title"},
        {name:"texts",label:"",inputType:"texts"},
        { name: "BankAccountDeDupe",label: "Bank account de-dupe",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"Bank account de-dupe" },
        // { name: "negavativeList",label: "Negative List",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"" },
        { name: "SignatureChange",label: "Signature Change",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"" },
        // { name: "STPFailedReason",label: "STP Failed Reason",inputType: "dropdown",required: true,validationmsg: "",placeholder:"STP Failed Reason" },
        // { name: "ViewDetails",label: "View Details",inputType: "link",linkValue:"View",required: true,validationmsg: "",placeholder:"If any policy logged in the last 6 months" },
        // { name: "Decision",label: "Decision",inputType: "dropdown",required: true,validationmsg: "",placeholder:"Decision" },
        // { name: "SendEmailtoCompliance",label: "Send Email to Compliance",inputType: "text",hyperLinks:"Add CC",required: false,validationmsg: "",placeholder:"Send Email to Compliance" },
        // { name: "comment",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      Add_CC:[
        { name: "payableAmount",label: "",inputType: "texts",required: false,validationmsg: "",placeholder:"Send Email to Compliance" },
        { name: "sendEmail",label: "",inputType: "text",hyperLinks:"Send",required: false,validationmsg: "",placeholder:"Enter CC Email" },
      ],
      Comments:[
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ]

    },

    
      rideraddition: {
        // isShowLeftRightCol: true,
        isShowBOE: true,
        isPOSScreen: false,
        BOE_Details:[
          { name: "existingrider",label: "Existing Rider",inputType: "text",required: false,validationmsg: "",placeholder: "Existing Rider" },
          { name: "ridersumassured",label: "Rider Sum Assured",inputType: "text",required: false,validationmsg: "",placeholder: "Rider Sum Assured" },
          { name: "newterm",label: "Addition / Deletion Allowed",inputType: "text",required: false,validationmsg: "",placeholder: "Addition / Deletion Allowed" },
          { name: "selectride",label: "Select Rider",inputType: "texts",required: false,validationmsg: "",placeholder: "Select Rider" },
          { name: "selectride",label: "Select Rider",inputType: "dropdown",required: false,validationmsg: "",placeholder: "Select Rider" },
          { name: "sumassured",label: "Sum Assured",inputType: "text",required: false,validationmsg: "",placeholder: "Sum Assured" },
          { name: "termchanegprocess",label: "Send Rider Addition / Deletion Process",inputType: "radios",required: false,validationmsg: "",placeholder: "Send Rider Addition / Deletion Process" },
          { name: "riderrequestform",label: "Send Rider Addition/Deletion Request Form",inputType: "radios",required: false,validationmsg: "",placeholder: "Send Rider Addition/Deletion Request Form" },
        ],
        Request_Details : [
          { name: "reasonforchange", label: "Reason For Change / Update", inputType: "dropdown", placeholder: "Reason for change/update" },
          { name: "requestsource", label: "Request Source", inputType: "dropdown",placeholder: "Request Source" },
          { name: "requestdate", label: "Request Date & Time", inputType: "date",placeholder: "" },
          { name: "customersigning", label: "Customer Signing Date & Time", inputType: "date",placeholder: "", },
          { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
        ],
        Checklist : [
          {name: "validatesignature",label: "Validate Signature",inputType: "radio",required: false,validationmsg: "",placeholder:"Out of Revival" },
          {name:"requestform",label:"Request Form",inputType:"upload",required:true,validationmsg:"",placeholder:"Request Form"},
          {name:"requestform",label:"Supporting Document",inputType:"upload",required:true,validationmsg:"",placeholder:"Supporting Document"},
        
        ]
      },
      statusenquiryss: {
        // isShowLeftRightCol: true,
        isShowBOE: true,
        isPOSScreen: false,
        hideRequestDetails: true,
        hideChecklist: true,
        isHideRequirementBtn: true,
        BOE_Details: [
          { name: "panupdate",label: "Partial Withdrawal Applicable",inputType: "text",required: false,validationmsg: "",placeholder:"Partial Withdrawal Applicable" },
          { name: "name",label: "Partial Withdrawal Can Be Made After",inputType: "text",required: false,validationmsg: "",placeholder:"DD/MM/YYYY" },
          { name: "dob",label: "Total Fund Value (1)",inputType: "text",hyperLink: true,required: false,validationmsg: "",placeholder:"Total Fund Value" },
          { name: "panno",label: "Max Partial Withdrawal Possible",inputType: "text",required: false,validationmsg: "",placeholder:"Max Partial Withdrawal Possible" },
          { name: "panvalidation",label: "Partial Withdrawal Value Date",inputType: "text",required: false,validationmsg: "", placeholder: "DD/MM/YYYY" },
          { name: "panaadharseeding",label: "Partial Withdrawal Amt Requested",inputType: "text",required: false,validationmsg: "",placeholder: "Partial Withdrawal Amt Requested"},
          { name: "uploadpan",label: "TDS Amount",inputType: "text",required: false,validationmsg: "",placeholder:"TDS Amount" },
          { name: "fillingcheck",label: "TDS %",inputType: "text",required: false,validationmsg: "",placeholder:"TDS %" },
          {name:"generalfunletter",label:"General Fund Value Letter",inputType:"radios",required:true,validationmsg:""},
          {name:"withdrawalprocess",label:"Send Partial Withdrawal Process",inputType:"radios",required:true,validationmsg:""},
        ],
      },
   
    lifecertificatesubmitted: {
      isShowBOE: true,
      isPOSScreen: true,
      hidePolicyDetails: true,
      BOE_Details: [
        {name:"existingdetails",label:"COE Validate From",inputType:"text",required:true,validationmsg:"",placeholder:"COE Validate From"},
        {name:"coevalidatefrom",label:"COE Validate To",inputType:"text",required:true,validationmsg:"",placeholder:"COE Validate To"},
        {name:"annuitymode",label:"Annuity Mode",inputType:"text",required:true,validationmsg:"",placeholder:"Appointee DOB"},
        { name: "annuityamt",label: "Annuity Amt",inputType: "text",required: false,validationmsg: "",placeholder:"Relationship with PO" },
        {name:"annuityplan",label:"Annuity Plan",inputType:"text",required:true,validationmsg:"",placeholder:"COE Validate From"},
        {name:"certifyingauthorityname",label:"Certifying Authority Name",inputType:"text",required:true,validationmsg:"",placeholder:"Certifying Authority Name"},
        {name:"certifyingdesigantion",label:"Certifying Designation",inputType:"text",required:true,validationmsg:"",placeholder:"Certifying Designation"},
        { name: "certifyingauthorityaddress",label: "Certifying Authority Address",inputType: "text",required: false,validationmsg: "",placeholder:"Certifying Authority Address" },
        {name:"certifyingdate",label:"Certifying date",inputType:"text",required:true,validationmsg:"",placeholder:"Certifying date"},
        { name: "sendcoelink",label: "Send COE Link",inputType: "radios",required: false,validationmsg: "",placeholder:"Send COE Link" },
        {name:"coelinksendon",label:"COE Link Send On",inputType:"date",required:true,validationmsg:"",placeholder:"COE Link Send On"},
        {name:"coelinksendthrough",label:"COE Link Send Through",inputType:"text",required:true,validationmsg:"",placeholder:"COE Link Send Through"},
        { name: "coelinkvalidtill",label: "COE Link Valid Till",inputType: "date",required: false,validationmsg: "",placeholder:"COE Link Valid Till" },
        {name:"coeresponsereceived",label:"COE Response Received On",inputType:"date",required:true,validationmsg:"",placeholder:"COE Response Received On"},
        {name:"kycno",label:"KYC No",inputType:"text",required:true,validationmsg:"",placeholder:"KYC No"},
      ],
      POS_Details : [
        { name: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
        { name: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
        { name: "annuitantname",label: "Annuitant Name",inputType: "text",required: false,validationmsg: "", placeholder: "Annuitant Name"},
        { name: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
        { name: "coevalidatefrom",label: "COE Validate From",inputType: "text",required: false,validationmsg: "",placeholder:"COE Validate From" },
        { name: "coevalidateto",label: "COE Validate To",inputType: "text",required: false,validationmsg: "",placeholder:"COE Validate To" },
        { name: "annuitantmode",label: "Annuitant Mode",inputType: "text",required: false,validationmsg: "", placeholder: "Annuitant Mode"},
        { name: "annuitantamt",label: "Annuitant Amt",inputType: "text",required: false,validationmsg: "",placeholder:"Annuitant Amt" },
        {name:"annuitantplan",label:"Annuitant Plan",inputType:"text",required:true,validationmsg:"",placeholder:"Annuitant Plan"},
        {name:"kycno",label:"KYC No",inputType:"text",required:true,validationmsg:"",placeholder:"KYC No"},
      
      ],
       Buttons : [
        { label: 'KYC Check', isShowPOS: false },
      ],
      POS_Buttons: [
          { label: 'KYC Check', isShowPOS: false },
        ],
      Request_Details : [
        { name: "requestdate", label: "Request Date & Time", inputType: "date",placeholder: "" },
        { name: "customersigning", label: "Customer Signing Date & Time", inputType: "date",placeholder: "", },
        { name: "requestsource", label: "Request Source", inputType: "dropdown",placeholder: "Request Source" },
        { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
      ],
      Checklist : [
        {name: "validatesignature",label: "Validate Signature",inputType: "radio",required: false,validationmsg: "",placeholder:"Out of Revival" },
        {name: "validatesignature",label: "COE Form",inputType: "upload",required: false,validationmsg: "",placeholder:"COE Form" }
      
      ],
      POS_Checklist : [
        {name: "validatesignature",label: "Validate Signature",inputType: "radio",required: false,validationmsg: "",placeholder:"Out of Revival" },
        {name: "validatesignature",label: "COE Form",inputType: "upload",required: false,validationmsg: "",placeholder:"COE Form" },
        {name:"callrecord",label:"Access The Customer Call Recording",inputType:"link",linkValue:"link",required:true,validationmsg:"",placeholder: "Access The Customer Call Recording",callType:"annuity"},
      ]
    },

  freelookrequest:{
    hideRequestDetails: true,
    isPOSScreen:true,
    Details : [
      { name: "policyno",label: "Dispatch mode",inputType: "text",required: false,validationmsg: "",placeholder:"Dispatch mode" },
      { name: "policystatus",label: "Policy Issuance",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Issuance" },
      { name: "annuitantname",label: "Dispatch Date",inputType: "text",required: false,validationmsg: "", placeholder: "Dispatch Date"},
      { name: "annuitantname",label: "FLC Period Ends On",inputType: "text",required: false,validationmsg: "", placeholder: "FLC Period Ends On"},
      { name: "plan",label: "POD No",inputType: "text",required: false,validationmsg: "",placeholder:"POD No" },
      { name: "coevalidatefrom",label: "FLC Period",inputType: "text",required: false,validationmsg: "",placeholder:"FLC Period" },
      { name: "coevalidateto",label: "Received On",inputType: "text",required: false,validationmsg: "",placeholder:"Received On" },
      {name:"kycno",label:"Received By",inputType:"text",required:true,validationmsg:"",placeholder:"Received By"},
      { name: "annuitantmode",label: "Retention Tools",inputType: "link",linkValue:"link",required: false,validationmsg: "", placeholder: "Retention Tools"},
      { name: "annuitantamt",label: "FAQs",inputType: "link",linkValue:"link",required: false,validationmsg: "",placeholder:"FAQs" },
      { name: "coevalidatefrom",label: "RTO Status",inputType: "text",required: false,validationmsg: "",placeholder:"RTO Status" },
      { name: "coevalidateto",label: "Medical Cost",inputType: "text",required: false,validationmsg: "",placeholder:"Medical Cost" },
      { name: "annuitantmode",label: "Policy Redispatch",inputType: "text",required: false,validationmsg: "", placeholder: "Policy Redispatch"},
      {name:"kycno",label:"KYC No",inputType:"text",required:true,validationmsg:"",placeholder:"KYC No"},
      { name: "annuitantamt",label: "Dispatch Mode",inputType: "text",required: false,validationmsg: "",placeholder:"Dispatch Mode" },
      { name: "coevalidateto",label: "SB Payout",inputType: "text",required: false,validationmsg: "",placeholder:"SB Payout" },
      { name: "annuitantmode",label: "Dispatch Date",inputType: "text",required: false,validationmsg: "", placeholder: "Dispatch Date"},
      {name:"kycno",label:"Welcome Call Date",inputType:"text",required:true,validationmsg:"",placeholder:"Welcome Call Date"},
      { name: "annuitantamt",label: "POD No",inputType: "text",required: false,validationmsg: "",placeholder:"POD No" },
      { name: "welcomecallcomment",label: "Welcome Call Comments",inputType: "text",required: false,validationmsg: "",placeholder:"Welcome Call Comments" },
      { name: "annuitantamt",label: "Received On",inputType: "text",required: false,validationmsg: "",placeholder:"Received On" },
      { name: "coevalidateto",label: "Free-Look Reason",inputType: "text",required: false,validationmsg: "",placeholder:"Free-Look Reason" },
      { name: "receivedby",label: "Received By",inputType: "text",required: false,validationmsg: "", placeholder: "Received By"},
    ],
    Details_Checklist: [
      {name:"uploadpod",label:"Upload POD",inputType:"upload",required:true,validationmsg:"",placeholder:"Upload POD"},
      {name:"retentionletter",label:"Upload Retention Letter",inputType:"upload",required:true,validationmsg:"",placeholder:"Upload Retention Letter"},
      {name:"signingdate",label:"Customer Signing Date & Time",inputType:"date",required:true,validationmsg:"",placeholder:"Customer Signing Date & Time"},
    ],
    Details_Buttons: [
        {label: "Close"},
        {label: "Register Freelook" },
      ],
    BOE_Details :[
      { name: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
      { name: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
      { name: "annuitantname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
      { name: "annuitantname",label: "LA Name",inputType: "text",required: false,validationmsg: "", placeholder: "LA Name"},
      { name: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
      { name: "coevalidatefrom",label: "Premium",inputType: "text",required: false,validationmsg: "",placeholder:"Premium" },
      { name: "kycno",label: "KYC No",inputType: "text",required: false,validationmsg: "",placeholder:"KYC No" },
      { name: "dispatchmode",label: "Dispatch mode",inputType: "text",required: false,validationmsg: "",placeholder:"Dispatch mode" },
      { name: "policystatus",label: "Policy Issuance",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Issuance" },
      { name: "annuitantname",label: "Dispatch Date",inputType: "text",required: false,validationmsg: "", placeholder: "Dispatch Date"},
      { name: "annuitantname",label: "FLC Period Ends On",inputType: "text",required: false,validationmsg: "", placeholder: "FLC Period Ends On"},
      { name: "plan",label: "POD No",inputType: "text",required: false,validationmsg: "",placeholder:"POD No" },
      { name: "coevalidatefrom",label: "FLC Period",inputType: "text",required: false,validationmsg: "",placeholder:"FLC Period" },
      { name: "coevalidateto",label: "Received On",inputType: "text",required: false,validationmsg: "",placeholder:"Received On" },
      { name: "annuitantmode",label: "Retention Tools",inputType: "link",linkValue:"link",required: false,validationmsg: "", placeholder: "Retention Tools"},
      { name: "annuitantamt",label: "FAQs",inputType: "link",linkValue:"link",required: false,validationmsg: "",placeholder:"FAQs" },
      {name:"receivedby",label:"Received By",inputType:"text",required:true,validationmsg:"",placeholder:"Received By"},
      { name: "coevalidatefrom",label: "RTO Status",inputType: "text",required: false,validationmsg: "",placeholder:"RTO Status" },
      { name: "coevalidateto",label: "Medical Cost",inputType: "text",required: false,validationmsg: "",placeholder:"Medical Cost" },
      { name: "annuitantmode",label: "Policy Redispatch",inputType: "text",required: false,validationmsg: "", placeholder: "Policy Redispatch"},
      {name:"kycno",label:"KYC No",inputType:"text",required:true,validationmsg:"",placeholder:"KYC No"},
      { name: "annuitantamt",label: "Dispatch Mode",inputType: "text",required: false,validationmsg: "",placeholder:"Dispatch Mode" },
      { name: "coevalidateto",label: "SB Payout",inputType: "text",required: false,validationmsg: "",placeholder:"SB Payout" },
      { name: "annuitantmode",label: "Dispatch Date",inputType: "date",required: false,validationmsg: "", placeholder: "Dispatch Date"},
      {name:"welcomecalldate",label:"Welcome Call Date",inputType:"date",required:true,validationmsg:"",placeholder:"Welcome Call Date"},
      { name: "annuitantamt",label: "POD No",inputType: "text",required: false,validationmsg: "",placeholder:"POD No" },
      { name: "welcomecallcomment",label: "Welcome Call Comments",inputType: "text",required: false,validationmsg: "",placeholder:"Welcome Call Comments" },
      { name: "annuitantamt",label: "Received On",inputType: "text",required: false,validationmsg: "",placeholder:"Received On" },
      { name: "coevalidateto",label: "Free-Look Reason",inputType: "text",required: false,validationmsg: "",placeholder:"Free-Look Reason" },
      { name: "annuitantmode",label: "Received By",inputType: "text",required: false,validationmsg: "", placeholder: "Received By"},
      { name: "annuitantamt",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "bankifsc",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
      { name: "annuitantamt",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
      { name: "coevalidateto",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Account Number" },
      { name: "annuitantmode",label: "Confirm Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "annuitantmode",label: "Confirm Bank Account Number",inputType: "texts",required: false,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "fundtransfer",label: "Fund Transfer To",inputType: "radio",required: false,validationmsg: "", placeholder: "Confirm Bank Account Number"},
    ],
    Buttons : [
      { label: 'Penny Drop' },
      { label: 'KYC Check' },
    ],
    POS_Buttons: [
      { label: 'Penny Drop' },
      { label: 'KYC Check' },
      { label: 'Pass JV For FT' },
      ],
      Transfer_Fields:[
        { name: "fundtransfers",label: "Fund Transfer To",inputType: "text",required: false,validationmsg: "",placeholder:"Fund Transfer To" },
        {name:"ftamount",label:"Fund Transfer Amount",inputType:"text",required:true,validationmsg:"",placeholder:"Fund Transfer Amount"},
        {name:"ftpolicy",label:"Relations to FT Policy",inputType:"dropdown",required:true,validationmsg:"",placeholder:"Relations to FT Policy"},
        {name:"ftamtowner",label:"Name of Fund Transfer Policy Owner",inputType:"text",required:true,validationmsg:"",placeholder:"Name of Fund Transfer Policy Owner"},
      ],
     Checklist : [
      {name:"validatesignature",label:"Validate Signature",inputType:"radio",required:true,validationmsg:""},
      {name:"aadharupdateprocess",label:"Upload Customer Photo",inputType:"upload",required:true,validationmsg:"",placeholder:"Upload Customer Photo"},
      {name:"aadharupdateprocess",label:"Upload Customer Video",inputType:"upload",required:true,validationmsg:"",placeholder:"Upload Customer Video"},
      {name:"aadharupdateprocess",label:"FLC Form",inputType:"upload",required:true,validationmsg:"",placeholder:"FLC Form"},
      {name:"aadharupdateprocess",label:"Policy Bond / Idemnity",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Bond / Idemnity"},
      {name:"aadharupdateprocess",label:"Policy Owner ID Proof",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Owner ID Proof"},
      {name:"aadharupdateprocess",label:"Policy Owner Address proof",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Owner Address proof"},
      {name:"aadharupdateprocess",label:"Policy Owner Bank Account Proof",inputType:"upload",required:true,validationmsg:"",placeholder:"Policy Owner Bank Account Proof"},
      // {name:"aadharupdateprocess",label:"Retention Attempt",inputType:"radio",required:true,validationmsg:""},
      {name:"aadharupdateprocess",label:"PAN Aadhar Linked",inputType:"upload",required:true,validationmsg:"",placeholder:"PAN Aadhar Linked"},
      {name:"aadharupdateprocess",label:"Upload Out Freelook Email",inputType:"upload",required:true,validationmsg:"",placeholder:"Upload Out Freelook Email"},
    ]
},
renewalpremiumreceipt: {
  isShowBOE: true,
  hideChecklist:true,
  hideRequestDetails: true,
  isHideRequirementBtn: true,
  showEmailFields: true,
  BOE_Details:[
    {name:"lastPaymentReceipt",label:"Last Payment Receipt",inputType:"titlecheckbox",required:true,validationmsg:""},
    {name: "annuitantname",label: "Renewal Premium Receipt",inputType: "texts",required: false,validationmsg: "", placeholder: "FT Details"},
    {name: "IsDateRange",label: "Date Range",inputType: "titlecheckbox",required: false,validationmsg: "", placeholder: "FT Details"},
    {name: "annuitantname",label: "Receipt Range",inputType: "texts",required: false,validationmsg: "", placeholder: "date"},
  ],
   Receipt_Range_Fields: [
    { name: "FromDate",label: "From",inputType: "date",required: true,validationmsg: "Select a From Date", placeholder: "date"},
    { name: "ToDate",label: "To",inputType: "date",required: true,validationmsg: "Select a To Date", placeholder: "date"},
   ],
   Send_Fields: [
    {name: 'sendpaymentlink2',label: 'Share Renewal Premium Receipt',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" }
   ],
  RENEWAL_LAST5_OPEN_TICKETS :[
    {title: "Sr No", field:"srno"},
    {title: "Id No", field: "idno"},
    {title: "Payment Receipt Date", field: "paymentreceiptdate"},
    {title: "Amount", field: "amount"},
    {title: "Payment Mode", field: "paymentmode"},
    {title: "", field: ""},
  ],
  Table_Data : [
    {srno:1, idno: "100", paymentreceiptdate: "10/09/2023", amount: "2,000", paymentmode: "Cash ",},
    {srno:2,  idno: "100",paymentreceiptdate: "11/09/2023", amount: "4,000", paymentmode: "Cash ", },
    {srno:3, idno: "100", paymentreceiptdate: "12/09/2023", amount: "6,000", paymentmode: "Digital", },
    {srno:4,  idno: "100",paymentreceiptdate: "13/09/2023", amount: "8,000", paymentmode: "Cash", },
    {srno:5,  idno: "100",paymentreceiptdate: "14/09/2023", amount: "10,000", paymentmode: "Digital",},
  ],
},
premiumpaidcertificate: {
  isShowBOE: true,
  isPOSScreen: false,
  hideRequestDetails: true,
  hideChecklist: true,
  isHideRequirementBtn: true,
  showEmailFields: true,
  BOE_Details:[
    {name: 'premiumpaidcertificate',label: 'PPC for the Year',inputType: "dropdown",required: true,validationmsg: "Select PPC for the Year",placeholder:"PPC for the Year" },
    {name: 'shareppc',label: 'Share PPC',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" }
  ]
 
},
discontinuancenotice: {
  BOE_Details:[
    {name: 'documenttype',label: 'Document Name',inputType: "dropdown",required: false,validationmsg: "",placeholder:"Document Name" },
    {name: 'premiumpaidcertificate',label: 'Discontinuance Notice',inputType: "text",required: false,validationmsg: "",placeholder:"Premium Paid Certificate" },
    // {name: 'sendvia',label: 'Send Via',inputType: "radios",required: false,validationmsg: "",placeholder:"Send Via" }
    {name: 'sendpaymentlink2',label: 'Share payment link',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" }
  ],
},
forms:{
  BOE_Details:[
    {name: 'sisDocumentType',label: 'Document Name',inputType: "dropdown",required: true,validationmsg: "Select a Documnet Name",placeholder:"Document Name" },
    // {name: 'sis',label: 'SIS',inputType: "text",required: false,validationmsg: "",placeholder:"SIS" },
    {name: 'sendVia',label: 'Send Via',inputType: "icons",required: true,validationmsg: "",placeholder:"Send Via" }
  ],
},
sis: {
  BOE_Details:[
    //{name: 'sisDocumentType',label: 'Document Name',inputType: "dropdown",required: false,validationmsg: "",placeholder:"Document Name" },
    // {name: 'sis',label: 'SIS',inputType: "text",required: false,validationmsg: "",placeholder:"SIS" },
    {name: 'sendVia',label: 'Send Via',inputType: "icons",required: true,validationmsg: "",placeholder:"Send Via" }
  ],

   Buttons : [
    { label: 'Send', isShowPOS: false },
  ],
},
firstpremiumreceipt: {
  BOE_Details:[
    {name: 'sendVia',label: 'Send Via',inputType: "icons",required: true,validationmsg: "",placeholder:"Send Via" }
  ]
},
unitstatement:{
  BOE_Details:[
    { name: "FromDate",label: "From Date",inputType: "date",required: true,validationmsg: "Select a From Date", placeholder: "From Date"},
    { name: "ToDate",label: "To Date",inputType: "date",required: true,validationmsg: "Select a To Date", placeholder: "Select Date"},
    {name: 'sendVia',label: 'Send Via',inputType: "icons",required: true,validationmsg: "",placeholder:"Send Via" }
  ]
},
discontinouancenotice: {
  BOE_Details:[
    {name: 'sendVia',label: 'Send Via',inputType: "icons",required: true,validationmsg: "",placeholder:"Send Via" }
  ],
},

bonus: {
  isShowBOE: true,
  isPOSScreen: false,
  hideRequestDetails: true,
  hideChecklist: true,
  isHideRequirementBtn: true,
  hideSubmitBtns: true,
  showEmailFields: true,
  BOE_Details:[
    {name: 'documenttype',label: 'Document Name',inputType: "dropdown",required: false,validationmsg: "",placeholder:"Document Name" },
    {name: 'bonusletter',label: 'Bonus Letter',inputType: "date",required: false,validationmsg: "",placeholder:"Bonus Letter" },
    // {name: 'sendvia',label: 'Send Via',inputType: "radios",required: false,validationmsg: "",placeholder:"Send Via" }
    {name: 'sendpaymentlink2',label: 'Share Bonus Letter',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" }
  ],

  Buttons : [
    { label: 'Send', isShowPOS: false },
  ],
}, 
partialwithdrawalstatusenquiry:{
  BOE_Details:[
    {name: 'options2',label: 'Partial Withdrawal Applicable',inputType: "dropdown",required: false,validationmsg: "Partial Withdrawal Applicable",placeholder:"Partial Withdrawal Applicable", disabled:true, hide:false },
    {name: 'PartialWithdrawalcanbemadeafter',label: 'Partial Withdrawal can be made after',inputType: "text",required: false,validationmsg: "Partial Withdrawal can be made after",placeholder:"Partial Withdrawal can be made after", disabled:true, hide:false },
  ],
  WithdrawApplicableYes:[
    { name: "TotalFundValue",label: "Total Fund Value",inputType: "text",hyperLink: true,
    required: false,validationmsg: "Total Fund Value",placeholder:"Total Fund Value", disabled:true },
    { name: "MaxPartialWithdrawalpossible",label: "Max Partial Withdrawal possible",inputType: "text",required: false,validationmsg: "Max Partial Withdrawal possible",placeholder:"Max Partial Withdrawal possible" , disabled:true},
    // { name: "PartialWithdrawalValueDate",label: "Partial Withdrawal Value Date",inputType: "text",required: false,validationmsg: "Partial Withdrawal Value Date",placeholder:"Partial Withdrawal Value Date" },
  ],
  ShareProcess:[
    {name: 'sendpaymentlink2',label: 'Share Process Information',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" },
    {name: 'sendpaymentlink2',label: 'Share Fund Statement',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" }
  ]
},
partialwithdrawalrequest:{
  BOE_Details:[
    { name: "TotalFundValue",label: "Total Fund Value",inputType: "text",hyperLink: true,
    required: false,validationmsg: "Total Fund Value",placeholder:"Total Fund Value", disabled:true },
    // {name: 'SelectFund',label: 'Select Fund',inputType: "dropdown",required: false,validationmsg: "Select Fund",placeholder:"Select Fund" },
    {name: 'MaxPartialWithdwral',label: 'Max Partial Withdwral',inputType:"number", pattern:'numbersOnly',required: false,validationmsg: "Enter Amount",placeholder:"Enter Amount",disabled:true },

    {name: 'PayableAmount',label: 'Enter Amount',inputType:"number", pattern:'numbersOnly',required: false,validationmsg: "Enter Amount",placeholder:"Enter Amount" },
    {name: 'FundTransfer',label: 'Do you wish to Opt for Fund Transfer',inputType: "dropdown",required: true,validationmsg: "Do you wish to Opt for Fund Transfer",placeholder:"Do you wish to Opt for Fund Transfer" },
    {name: 'RequestTime',label: 'Request Time',inputType: "dropdown",required: false,validationmsg: "Request Time",placeholder:"Request Time" },
    {name: 'ReasonForPartialWithdrawal',label: 'Reason For Partial Withdrawal',inputType: "dropdown",required: false,validationmsg: "Reason For Partial Withdrawal",placeholder:"Reason For Partial Withdrawal" },
  ],
  OPTForFundTransferYes:[
    {name: 'FundTransferTo',label: 'Fund Transfer To',inputType: "text",required: true,validationmsg: "Fund Transfer To",placeholder:"Fund Transfer To" },
    {name: 'FundTransferAmount',label: 'Fund Transfer Amount',inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Fund Transfer Amount",placeholder:"Fund Transfer Amount" },
    {name: 'RelationstoFTPolicy',label: 'Relations to FT Policy',inputType: "text",required: true,validationmsg: "Relations to FT Policy",placeholder:"Relations to FT Policy" },
    {name: 'NameofFundTransferPolicyOwner',label: 'Name of Fund Transfer Policy Owner',inputType: "text",required: true,validationmsg: "Name of Fund Transfer Policy Owner",placeholder:"Name of Fund Transfer Policy Owner" },
  ],
  Upload_Fields:[
    {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
    {name:"UploadPolicyOwnerIDProof",indexName:"Minor Alteration",label:"Upload Policy Owner ID Proof",inputType:"upload",required:true,validationmsg:"Upload Policy Owner ID Proof",placeholder:"Upload Policy Owner ID Proof"},
    {name:"UploadPolicyOwnerAddressProof",indexName:"Minor Alteration",label:"Upload Policy Owner Address Proof",inputType:"upload",required:true,validationmsg:"Upload Policy Owner Address Proof",placeholder:"Upload Policy Owner Address Proof"},
    {name:"UploadPolicyBankAccountProof",indexName:"Minor Alteration",label:"Upload Policy Bank Account Proof",inputType:"upload",required:true,validationmsg:"Upload Policy Bank Account Proof",placeholder:"Upload Policy Bank Account Proof"},
  ],
  Bank_Details: [
    { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "Name as Mentioned in The Bank A/C",placeholder:"Name as Mentioned in The Bank A/C" },
    { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "Bank IFSC",placeholder:"Bank IFSC" },
    { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "Bank Account Number", placeholder: "Bank Account Number"},
    { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "Confirm Bank Account Number", placeholder: "Confirm Bank Account Number"},
    { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "Bank Name",placeholder:"Bank Name" },
    { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "Initiate Penny Drop",placeholder:"Initiate Penny Drop" },
  ],
  Request_Fields: [
    { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
    { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
    { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "",placeholder:"Comments" },
  ],
  ReasonSubmission:[
    { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",required:false,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
  ],
  POS_Details:[
    { name: "TotalFundValue",label: "Total Fund Value",inputType: "text",required: false,disabled:true, validationmsg: "Total Fund Value",placeholder:"Total Fund Value" },
    { name: "RequestFor",label: "Request For",inputType: "text",required: false,validationmsg: "Request For",placeholder:"Request For", disabled:true },
    // { name: "SelectFund",label: "Fund Selected",inputType: "text",required: false,validationmsg: "Fund Selected",placeholder:"Fund Selected" },
    { name: "EnteredAmount",label: "Amount For Partial Withdrawal",disabled:true, inputType: "text",required: false,validationmsg: "Amount For Partial Withdrawal",placeholder:"Amount For Partial Withdrawal" },
    { name: "Comments",label: "Branch Remarks",inputType: "text",required: false,validationmsg: "Branch Remarks",placeholder:"Branch Remarks", disabled:true },
    { name: "viewRequestDetails",label: "View Request Details",inputType: "title",  hide:true, fundTrnsfer:'yes'},
    { name: "texts",label: "",inputType: "texts", hide:true, fundTrnsfer:'yes'},
    { name: "FundTransferTo",label: "Fund Transfer To",inputType: "text",required: false,validationmsg: "",showRqstField:false,placeholder:"Fund Transfer To" ,  hide:true, fundTrnsfer:'yes'},
    {name:"FundTransferAmount",label:"Fund Transfer Amount",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Fund Transfer Amount",  hide:true, fundTrnsfer:'yes'},
    {name:"RelationstoFTPolicy",label:"Relations to FT Policy",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Relations to FT Policy",  hide:true, fundTrnsfer:'yes'},
    {name:"NameofFundTransferPolicyOwner",label:"Name of Fund Transfer Policy Owner",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Name of Fund Transfer Policy Owner",  hide:true, fundTrnsfer:'yes'},
    {name:"BalanceAmountForPartialWithdrawal",label:"Balance Amount for Partial Withdrawal",inputType:"text",required:false,validationmsg:"",showRqstField:false,placeholder:"Balance Amount for Surrender",  hide:true, fundTrnsfer:'yes'},

    
    
    // { name: "texts",label: "",inputType: "texts"},
    // { name: "texts",label: "",inputType: "texts"},
    { name: "ViewDocumnets",label: "View Documents",inputType: "title"},
    // { name: "texts",label: "",inputType: "texts"},
    { name: "Uploaded Documents",label: "Uploaded Documents",inputType: "link",linkValue:"View"},
    {name: "ValidateSignature",label: "Signature Validated",inputType: "radio", class:'disabled', required: false,validationmsg: "Signature Validated",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    // { name: "RequestForm",label: "Request Form",inputType: "link",linkValue:"View"},
    // { name: "PolicyOwnerIDProof",label: "Policy Owner ID Proof",inputType: "link",linkValue:"View" },
    // { name: "PolicyOwnerAddressProof",label: "Policy Owner Address Proof",inputType: "link",linkValue:"View"},
    // { name: "PolicyBankAccountProof",label: "Policy Bank Account Proof",inputType: "link",linkValue:"View"},



    { name: "ViewBankDetails",label: "View Bank Details",inputType: "title", icon:'edit'},
    // { name: "texts",label: "",inputType: "texts"},
    { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C", posEdit:true, disabled:true },
    { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" , disabled:true , posEdit:true, },
    { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: false,validationmsg: "", placeholder: "Bank Account Number", disabled:true , posEdit:true, },
    { name: "BankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" , disabled:true , posEdit:true, },
    { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "Penny Drop Result",placeholder:"Penny Drop Result" , disabled:true, posEdit:true,  },
  ],

  POS_View_FundTransfer_Details:[
    { name: "ViewFundTransferDetails",label: "View Fund Transfer Details",inputType: "title"},
    // { name: "texts",label: "",inputType: "texts"},
    {name: 'RequestTime',label: 'Request Time',inputType: "text",required: false,validationmsg: "Request Time",placeholder:"Request Time" },
    {name: 'ReasonForPartialWithdrawal',label: 'Reason For Partial Withdrawal',inputType: "text",required: false,validationmsg: "Reason For Partial Withdrawal",placeholder:"Reason For Partial Withdrawal" },
    {name: 'FundTransferTo',label: 'Fund Transfer To',inputType: "text",required: false,validationmsg: "Fund Transfer To",placeholder:"Fund Transfer To" },
    {name: 'FundTransferAmount',label: 'Fund Transfer Amount',inputType: "text",required: false,validationmsg: "Fund Transfer Amount",placeholder:"Fund Transfer Amount" },
    {name: 'RelationstoFTPolicy',label: 'Relations to FT Policy',inputType: "text",required: false,validationmsg: "Relations to FT Policy",placeholder:"Relations to FT Policy" },
    {name: 'NameofFundTransferPolicyOwner',label: 'Name of Fund Transfer Policy Owner',inputType: "text",required: false,validationmsg: "Name of Fund Transfer Policy Owner",placeholder:"Name of Fund Transfer Policy Owner" },

  ],
  POS_Action: [
    { name: "viewPOS",label: "POS Action",inputType: "title"},
    // { name: "texts",label: "",inputType: "texts"},

    { name: "paymentMode",label: "Payment Mode",inputType: "dropdown",required: true,validationmsg: "",placeholder:"Payment Mode" },
    { name: "ChangeInLast60Days",label: "Any personal details change in last 60 days",inputType: "dropdown",required: true,validationmsg: "",placeholder:"Any personal details change in last 60 days", disabled:true },
    { name: "PolicyLoggedLast",label: "If any policy logged in the last 6 months",inputType: "dropdown",required: true,validationmsg: "",placeholder:"If any policy logged in the last 6 months", disabled:true },
    
    { name: "ViewFinalPayableAmount",label: "View Final Payable Amount",inputType: "text",required: false,validationmsg: "",placeholder:"View Final Payable Amount" },
    { name: "InitiatePennyDropPOS",label: "Initiate Penny Drop", hide:false, inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
    { name: "POScomment",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comments" },


    // { name: "ChangeInLast60Days",label: "Any personal details change in last 60 days",inputType: "text",required: true,validationmsg: "",placeholder:"Any personal details change in last 60 days" },
    // { name: "PolicyLoggedLast",label: "If any policy logged in the last 6 months",inputType: "text",required: true,validationmsg: "",placeholder:"If any policy logged in the last 6 months" },
    // { name: "BankAccountDeDupe",label: "Bank account de-dupe",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"Bank account de-dupe" },
    // { name: "SignatureChange",label: "Signature Change",inputType: "text",required: true,validationmsg: "",placeholder:"Signature Change" },
    // { name: "ViewFinalPayableAmount",label: "View Final Payable Amount",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"View Final Payable Amount" },
    // { name: "InitiatePennyDropPOS",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "",placeholder:"Initiate Penny Drop" },
    
  ],



  POS_Details_Manager:[
    { name: "TotalFundValue",label: "Total Fund Value",inputType: "text",required: false,validationmsg: "Total Fund Value",placeholder:"Total Fund Value" },
    { name: "RequestTime",label: "Request Time",inputType: "text",required: false,validationmsg: "Request Time",placeholder:"Request Time" },
    { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
    { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
    { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",required:false,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
    { name: "BranchRemarks",label: "Branch Remarks",inputType: "text",required: false,validationmsg: "Branch Remarks",placeholder:"Branch Remarks" },
    { name: "ViewDocumnets",label: "View Documnets",inputType: "title"},
    // { name: "texts",label: "",inputType: "texts"},
    { name: "Uploaded Documents",label: "Uploaded Documents",inputType: "link",linkValue:"View"},
    {name: "ValidateSignature",label: "Signature Validated",inputType: "radio", class:'disabled', required: false,validationmsg: "Signature Validated",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    // { name: "SurrenderForm",label: "Surrender Form",inputType: "link",linkValue:"View"},
    // { name: "PolicyBond",label: "Policy Bond / Indemnity",inputType: "link",linkValue:"View"},
    // { name: "PolicyBond",label: "Policy Owner Id Proof",inputType: "link",linkValue:"View"},
    // { name: "PolicyBond",label: "Bank Account Proof",inputType: "link",linkValue:"View"},
    {name: "validatesignature",label: "Signature Validated",inputType: "radio",required: false,validationmsg: "Signature Validated",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
  ],
  POS_View_FundTransfer_Details_Manager:[
    { name: "ViewFundTransferDetails",label: "View Bank Details",inputType: "title"},
    // { name: "texts",label: "",inputType: "texts"},
    {name: 'RequestTime',label: 'Request Time',inputType: "text",required: false,validationmsg: "Request Time",placeholder:"Request Time" },
    {name: 'ReasonForPartialWithdrawal',label: 'Reason For Partial Withdrawal',inputType: "text",required: false,validationmsg: "Reason For Partial Withdrawal",placeholder:"Reason For Partial Withdrawal" },
    {name: 'FundTransferTo',label: 'Fund Transfer To',inputType: "text",required: false,validationmsg: "Fund Transfer To",placeholder:"Fund Transfer To" },
    {name: 'FundTransferAmount',label: 'Fund Transfer Amount',inputType: "text",required: false,validationmsg: "Fund Transfer Amount",placeholder:"Fund Transfer Amount" },
    {name: 'RelationstoFTPolicy',label: 'Relations to FT Policy',inputType: "text",required: false,validationmsg: "Relations to FT Policy",placeholder:"Relations to FT Policy" },
    {name: 'NameofFundTransferPolicyOwner',label: 'Name of Fund Transfer Policy Owner',inputType: "text",required: false,validationmsg: "Name of Fund Transfer Policy Owner",placeholder:"Name of Fund Transfer Policy Owner" },

  ],


  POS_Action_Manager: [
    { name: "viewPOS",label: "POS Manager Action",inputType: "title"},
    {name:"texts",label:"",inputType:"texts"},
    { name: "STPFailedReason",label: "STP Failed Reason",inputType: "dropdown",required: true,validationmsg: "",placeholder:"STP Failed Reason" },
    { name: "ViewDetails",label: "View Details",inputType: "link",linkValue:"View",required: false,validationmsg: "",placeholder:"If any policy logged in the last 6 months" },
    { name: "Decision",label: "Decision",inputType: "dropdown",required: true,validationmsg: "",placeholder:"Decision" },
    { name: "SendEmailtoCompliance",label: "Send Email to Compliance",inputType: "text",hyperLinks:"Add CC",required: false,validationmsg: "",placeholder:"Send Email to Compliance" },
    // { name: "comment",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
  ],
  Add_CC:[
    { name: "payableAmount",label: "",inputType: "texts",required: false,validationmsg: "",placeholder:"Send Email to Compliance" },
    { name: "sendEmail",label: "",inputType: "text",hyperLinks:"Send",required: false,validationmsg: "",placeholder:"Enter CC Email" },
  ],
  Comments:[
    { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
  ]

},











revivalwithdgh: {
  isShowBOE: true,
  isPOSScreen: false,
  BOE_Details:[
    { name: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
    { name: "nameofthelifeassured",label: "Name of the life Assured",inputType: "text",required: false,validationmsg: "",placeholder:"Name of the Life Assured" },
    { name: "gender",label: "Gender",inputType: "text",required: false,validationmsg: "", placeholder: "Gender"},
    { name: "maritualstatus",label: "Maritual Status",inputType: "radio",required: false,validationmsg: "", title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    { name: "occupation",label: "Occupation",inputType: "text",required: false,validationmsg: "",placeholder:"Occupation" },
    { name: "nameofemployerbusinessowned",label: "Name of Employer/Business Owned",inputType: "text",required: false,validationmsg: "",placeholder:"Name of Employer/Business Owned" },
    { name: "annualincome",label: "Annual Income",inputType: "text",required: false,validationmsg: "",placeholder:"Annual Income" },
    { name: "natureofduties",label: "Nature of Duties",inputType: "text",required: false,validationmsg: "",placeholder:"Nature of Duties" },
    { name: "nationality",label: "Nationality",inputType: "text",required: false,validationmsg: "",placeholder:"Nationality" },
    { name: "ifnotindianstatethecountryofresidence",label: "IF not Indian state the country of residence",inputType: "text",required: false,validationmsg: "", placeholder: "IF not Indian state the country of residence"},
    { name: "mobileno",label: "Mobile No",inputType: "text",required: false,validationmsg: "", placeholder: "Mobile No"},
    { name: "contactno",label: "Contact No",inputType: "text",required: false,validationmsg: "", placeholder: "Conatact No"},
    { name: "emailid",label: "Email ID",inputType: "text",required: false,validationmsg: "", placeholder: "Email ID"},
    { name: "healthrecordoflifeassured",label: "Health Record of Life Assured ",inputType: "texts",required: false,validationmsg: "", placeholder: "Email ID"},
    { name: "healthrecordoflifeassured",label: "Health Record of Life Assured ",inputType: "title",required: false,validationmsg: "", placeholder: "Email ID"},
    { name: "healthrecordoflifeassured",label: "Health Record of Life Assured ",inputType: "texts",required: false,validationmsg: "", placeholder: "Email ID"},
    { name: "height",label: "Height",inputType: "text",required: false,validationmsg: "", placeholder: "Height"},
    { name: "weight",label: "Weight",inputType: "text",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "inthepast6monthshasthelabodyweight",label: "In the past 6 months,has the LA's body weight",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "ifyespleasestatecauseofachangeinweight",label: "If Yes,Please State Cause of a Change in Weight",inputType: "text",required: false,validationmsg: "", placeholder: "Mention the cause"},
    { name: "hasthelaeversufferedfromoravebeendiagnosedwithanyofthefollowingconditionsifyespleasetickthe releventboxbelow",label: "Has the LA ever suffered from or have been diagnosed with any of the following conditions?if yes ,please tick the relevent box below",inputType: "title",required: false,validationmsg: "", placeholder: "Mention the cause"},
    { name: "hypertensionhighbloodpressure",label: "HyperTension/High Blood Pressure",inputType: "texts",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "hypertensionhighbloodpressure",label: "HyperTension/High Blood Pressure",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "anyotherheardiseasesproblems",label: "Any Other Heart Dieseases/Problems",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "chestpain",label: "Chest Pain",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "hivinfectionaids",label: "HIV infecton/AIDS",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "diabeticshighbloodsugar",label: "Diabetics/High Blood Sugar",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "highcholestrol",label: "High Cholestrol",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "anxietydisorederstress",label: "Anxiety/Disorder Stress",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "dieseaseofreproductiveorgans",label: "Disease of Reproductive Organs",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "kidneyrenalproblems",label: "Kidney/Renal Problems",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
 
    { name: "strokeparalysis",label: "Stroke/Paralysis",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "disorderofanyglands",label: "Disorder of Any Glands (eg: Tyroid)",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "musculoskeletalorjointdisorders",label: "Musculoskeletal or Joint Disorders",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "digestivedisorders",label: "Digestive Disordees(eg:ulcer,colitis)",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "skindisorders",label: "Skin Disorders",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "ailmentinjury",label: "Ailment/Injury",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "eyesearsnosethroatdisorder",label: "Eyes/Ear/Nose/Throat Disorder",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "cystofanykindtumorgrowthcancer",label: "Cyst of Any Kind/Tumour Growth/Cancer",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "asthamatuburculoisoranyotherlungdis",label: "Asthama/Tuburculosis or any other lung dis",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "jaundicehepatisborcorotherliverprc",label: "Jaundice /Hepatitis B or  C or other Liver Prc",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "absensefromworkformaorethan7days",label: "Absense From work for more than 7 days",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "anyblooddisordereganemiathalassen",label: "Any Blood Disorder (eg:Anemia/Thalassen)",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "anyotherdiseasesconditions",label: "Any Other Diseases/Conditions",inputType: "text",required: false,validationmsg: "", placeholder: "Any other Diseases/Conditions"}, 
    { name: "generalquestions",label: "General Questions",inputType: "title",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "strokeparalysis",label: "Stroke/Paralysis",inputType: "texts",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "lahasintentiontotravelabroad",label: "LA has intention to travel Abroad",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},  
    { name: "anyproposalforinsuranceonlaeverbefore",label: "Any Proposal for Insurance LA ever before",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "laisapotentiallyexposedperson",label: "LA is a potentially exposed person",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "ifyespleaseprovidedetails",label: "If Yes,please provide details",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "lifestyle",label: "Life Style",inputType: "title",required: false,validationmsg: "", placeholder: "Weight"}, 
    { name: "lifestyle",label: "Life Style",inputType: "texts",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "doeslaconsumeanyalcoholicdrink",label: "Does LA consume any alcoholic drink.if yes,indicate quantity consumed(glass/peg per week)",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "glass/peginbeerandwineandhardliquor",label: "Beer____glass/peg Wine ____glass/peg Hard Liquor ____glass/peg",inputType:"text",required: false,validationmsg: "", placeholder: "glass /peg"},
    { name: "doesthelasmokecigeratteorconsumetobaccoinanyform",label: "Does the LA smoke cigeratte or consume tobacco in any form.if Yes,indicate quantity consumed per day",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "cigerattenumbertobaccomg",label: "Cigerattes ____number Tobacco ____mg ",inputType: "text",required: false,validationmsg: "", placeholder: "number and mg"},
    { name: "doeslaconsumenarcoticsoranyotherdrugnotpriscribedbyphysician",label: "Does LA Consume norcotics or any other drug not priscribed by physician.Does the LA engage or have you any prospect or intention of engaging in avitation other than as a ",inputType: "radio",required: false,validationmsg: "", placeholder: "Weight"},
    { name: "ifyesnamewhen",label: "if  Yes,Name___ When________",inputType: "text",required: false,validationmsg: "", placeholder: "Weight"},
   
  ],
    

  Buttons : [
    { label: 'Send OTP'},
  ],
  Checklist:[
    { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: false,validationmsg: "",placeholder:"Validate Signature"},
    { name: "validatesignature",label: "Request Form",inputType: "upload",required: false,validationmsg: "",placeholder:"Request Form"},
    { name: "dghcopy",label: "DGH Copy",inputType: "upload",required: false,validationmsg: "", placeholder: "DGH Copy"},
    { name: "covidquestionaire",label: "Covid Questionaire",inputType: "upload",required: false,validationmsg: "", placeholder: "Covid Questionaire"},
    { name: "policyowner",label: "Policy Owner ID Proof",inputType: "upload",required: false,validationmsg: "",placeholder:"Policy Owner ID Proof" },
  ]
},
revivalquotation1: {
  isShowBOE: true,
  isPOSScreen: false,
  hideChecklist: true,
  hideRequestDetails: true,
  isHideRequirementBtn: true,
  BOE_Details:[
    { name: "policyno",label: "Out of Revival",inputType: "text",required: false,validationmsg: "",placeholder:"Out of Revival" },
    { name: "policystatus",label: "Total Base Premium + Tax",inputType: "text",required: false,validationmsg: "",placeholder:"Total Base Premium + Tax" },
    { name: "annuitantname",label: "Interest Amount",inputType: "text",required: false,validationmsg: "", placeholder: "Interest Amount"},
    { name: "annuitantname",label: "Amt in Suspense (Debit/Credit)",inputType: "text",required: false,validationmsg: "", placeholder: "Amt in Suspense (Debit/Credit)"},
    { name: "plan",label: "Total Premium Due",inputType: "text",required: false,validationmsg: "",placeholder:"Total Premium Due" },
    { name: "policyno",label: "Interest Waiver & Amt",inputType: "text",required: false,validationmsg: "",placeholder:"Interest Waiver & Amt" },
    { name: "policystatus",label: "OverDue Period",inputType: "text",required: false,validationmsg: "",placeholder:"OverDue Period" },
    { name: "annuitantname",label: "DGH Required",inputType: "text",required: false,validationmsg: "", placeholder: "DGH Required"},
    { name: "annuitantname",label: "Premium Holiday",inputType: "text",required: false,validationmsg: "", placeholder: "Premium Holiday"},
    { name: "annuitantname",label: "Interest Waiver",inputType: "link",linkValue:"Email Link",required: false,validationmsg: "", placeholder: "Interest Waiver"},
    { name: "plan",label: "Renewal Pick Up Request",inputType: "title",required: false,validationmsg: "",placeholder:"Renewal Pick Up Request" },
    { name: "policyno",label: "Address",inputType: "texts",required: false,validationmsg: "",placeholder:"Address" },
    { name: "btns",label: "",inputType: "radiobtns",required: false,validationmsg: "",placeholder:"Address" },
    { name: "policyno",label: "Address",inputType: "texts",required: false,validationmsg: "",placeholder:"Address" },
    { name: "policyno",label: "Address",inputType: "text",required: false,validationmsg: "",placeholder:"Address" },
    { name: "policystatus",label: "Date & Time",inputType: "text",required: false,validationmsg: "",placeholder:"DD/MM/YYYY" },
    { name: "annuitantname",label: "Send Revival Quotation",inputType: "radios",required: false,validationmsg: "", placeholder: "DGH Required"},
    { name: "annuitantname",label: "Send Payment/Revival Link",inputType: "radios",required: false,validationmsg: "", placeholder: "Premium Holiday"},
    { name: "annuitantname",label: "Send Revival Requirements",inputType: "radios",required: false,validationmsg: "", placeholder: "Premium Holiday"},
  ],

}, 
revivalstatusenquiry: {
  isShowBOE: true,
  isPOSScreen: false,
  hideChecklist: true,
  hideRequestDetails: true,
  isHideRequirementBtn: true,
  BOE_Details:[
    { name: "policyno",label: "Out of Revival",inputType: "text",required: false,validationmsg: "",placeholder:"Out of Revival" },
    { name: "policystatus",label: "Auto Pay",inputType: "text",required: false,validationmsg: "",placeholder:"Auto Pay" },
    { name: "annuitantname",label: "Base Prem",inputType: "text",required: false,validationmsg: "", placeholder: "Base Prem"},
    { name: "annuitantname",label: "GST",inputType: "text",required: false,validationmsg: "", placeholder: "GST"},
    { name: "plan",label: "Interest Amt",inputType: "text",required: false,validationmsg: "",placeholder:"Interest Amt" },
    { name: "policyno",label: "Amt in Suspense (debit/credit)",inputType: "text",required: false,validationmsg: "",placeholder:"Amt in Suspense (debit/credit)" },
    { name: "policystatus",label: "Total Premium Due",inputType: "text",required: false,validationmsg: "",placeholder:"Total Premium Due" },
    { name: "annuitantname",label: "Interest Waiver",inputType: "text",required: false,validationmsg: "", placeholder: "Interest Waiver"},
    { name: "annuitantname",label: "Overdue Period",inputType: "text",required: false,validationmsg: "", placeholder: "Overdue Period"},
    { name: "annuitantname",label: "DGH Required",inputType: "text",required: false,validationmsg: "", placeholder: "DGH Required"},
    { name: "plan",label: "Premium Holiday",inputType: "text",required: false,validationmsg: "",placeholder:"Premium Holiday" },
    { name: "policystatus",label: "Balance No of Years to Pay",inputType: "text",required: false,validationmsg: "",placeholder:"Balance No of Years to Pay" },
    { name: "policyno",label: "No of Years Premium Paid",inputType: "text",required: false,validationmsg: "",placeholder:"No of Years Premium Paid" },
    { name: "policyno",label: "",inputType: "link", linkValue:"Last 5 Payment Details",required: false,validationmsg: "",placeholder:"Last 5 Payment Details" },
    { name: "policystatus",label: "Interest Waiver",inputType: "link",linkValue:"Email Link",required: false,validationmsg: "",placeholder:"Interest Waiver" },
    { name: "annuitantname",label: "Send Payment/Revival Link",inputType: "radios",required: false,validationmsg: "", placeholder: "Send Payment/Revival Link"},
    { name: "annuitantname",label: "Send Revival Quotation",inputType: "radios",required: false,validationmsg: "", placeholder: "Send Revival Quotation"},
    { name: "annuitantname",label: "Send Revival Requirements",inputType: "radios",required: false,validationmsg: "", placeholder: "Send Revival Requirements"},
    { name: "policystatus",label: "One Time Transaction",inputType: "titlecheckbox",required: false,validationmsg: "",placeholder:"Total Premium Due" },
    { name: "annuitantname",label: "Interest Waiver",inputType: "texts",required: false,validationmsg: "", placeholder: "Interest Waiver"},
    // { name: "annuitantname",label: "Address",inputType: "text",required: false,validationmsg: "", placeholder: "Address"},
    // { name: "annuitantname",label: "Date & time",inputType: "text",required: false,validationmsg: "", placeholder: "DD/MM/YYYY"},
    
  ],
 OneTimeTransaction: [
    { name: "annuitantname",label: "Re-debit Amount",inputType: "text",required: false,validationmsg: "", placeholder: "Re-debit Amount"},
    { name: "annuitantname",label: "Re-debit Date",inputType: "date",required: false,validationmsg: "", placeholder: "DD/MM/YYYY"},
  ],

  Buttons : [
    { label: 'Send OTP'},
  ],

}, 
medicalreportsrequired:{
  BOE_Details:[
    // { name: "UWDecision",label: "UW Decision",inputType: "text",required: false,validationmsg: "UW Decision",placeholder:"UW Decision" },
    // {name:"texts",label:"",inputType:"texts"},
    { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,hide:false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
    { name: "UploadApprovalEmail",label: "Upload Approval Email",inputType: "upload",required: true,hide:false, validationmsg: "Upload Approval Email",placeholder:"Upload Approval Email" },
    { name: "CustomerSigningDate",label: "Customer Signing Date",inputType: "nofuturedates",hide:false, required: true,validationmsg: "Customer Signing Date",placeholder:"Customer Signing Date" },
    { name: "branchreceiveddate",label: "Request Received Date",inputType: "nofuturedates",hide:false, required: true,validationmsg: "Request Received Date",placeholder:"Request Received Date" },
  ],
  ReasonSubmission:[
    { name: "ReasonForDelay", label: "Reason For Delayed Submission",required: true, inputType: "text",placeholder: "Reason for Delayed Submission" },
  ],
  Comments:[
    { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
  ],  
  POS_Details:[
    // { name: "UWDecision",label: "UW Decision",inputType: "text",required: false,validationmsg: "UW Decision",placeholder:"UW Decision" },
    { name: "BranchComments",label: "Requestor Comments",inputType: "text",required: false,validationmsg: "Requestor Comments",placeholder:"Requestor Comments" },
    { name: "UploadRequestForm",label: "View Request Form",inputType: "link",linkValue:"View",required: false,validationmsg: "View Request Form",placeholder:"View Request Form" },
    { name: "UploadApprovalEmail",label: "View Approval Email",inputType: "link",linkValue:"View",required: false,validationmsg: "View Approval Email",placeholder:"View Approval Email" },
    { name: "CustomerSigningDate",label: "Customer Signing Date",inputType: "text",disabled:true,required: false,validationmsg: "Customer Signing Date",placeholder:"DD/MM/YYYY" },
    { name: "BranchReceivedDate",label: "Request Received Date",inputType: "text",disabled:true,required: false,validationmsg: "Request Received Date",placeholder:"DD/MM/YYYY" },
    { name: "ReasonForDelay", label: "Reason For Delayed Submission",hide:true,required: true, inputType: "text",placeholder: "Reason for Delayed Submission" },
  ],
  Send_Medical_Reports:[
    {name: 'sendVia',label: 'Send Medical Reports',inputType: "icons" }
  ]
},
fixappointment:{
  BOE_Details:[
    { name: "Medical_test",label: "Medical Test Raised",inputType: "text",required: false,validationmsg: "Medical Test Raised",placeholder:"Medical Test Raised" },
    { name: "Home_medical",label: "Home Medical",inputType: "dropdown",required: true,validationmsg: "Home Medical",placeholder:"Home Medical" },
    { name: "Preferred_Date",label: "Prefered Date",inputType: "nofuturedates",pastDate:true,required: true,validationmsg: "Prefered Call Back Date",placeholder:"Prefered Call Back Date" },
    { name: "Preferred_Time",label: "Prefered Time",inputType: "time",required: true,validationmsg: "Prefered Call Back Time",placeholder:"Prefered Call Back Time" },
    // { name: "PinCode",label: "Pin Code",inputType: "number", pattern:'numbersOnly', maxlength:6,minlength:6, message:'Enter 6 Digits',required: true,validationmsg: "Enter Pin Code",maxlength:6,placeholder:"Pin Code" },
    // { name: "City",label: "City",inputType: "text", pattern:'alphabatesOnly', required: true,validationmsg: "Enter City",placeholder:"City" },
    // { name: "State",label: "State",inputType: "text",pattern:'alphabatesOnly', required: true,validationmsg: "Enter State",placeholder:"State" },
    // { name: "Address",label: "Address",inputType: "text",required: true,validationmsg: "Address",placeholder:"Address" },
    // { name: "LandMark",label: "LandMark",inputType: "text",required: true,validationmsg: "LandMark",placeholder:"LandMark" },
    { name: "Comments",label: "Requestor  Comments" ,inputType: "text",required: true,validationmsg: "Comments",placeholder:"Comments" },
  ],
  POS_Details:[
    { name: "Medical_test",label: "Medical Test Raised",inputType: "text",required: false,validationmsg: "Medical Test Raised",placeholder:"Medical Test Raised" },
    { name: "Home_medical",label: "Home Medical",inputType: "text",required: true,validationmsg: "Home Medical",placeholder:"Home Medical" },
    { name: "Preferred_Date",label: "Prefered Date",inputType: "text",required: true,validationmsg: "Prefered Call Back Date",placeholder:"Prefered Call Back Date" },
    { name: "Preferred_Time",label: "Prefered Time",inputType: "text",required: true,validationmsg: "Prefered Call Back Time",placeholder:"Prefered Call Back Time" },
    // { name: "PinCode",label: "Pin Code",inputType: "number", pattern:'numbersOnly', maxlength:6,minlength:6, message:'Enter 6 Digits',required: true,validationmsg: "Enter Pin Code",maxlength:6,placeholder:"Pin Code" },
    // { name: "City",label: "City",inputType: "text", pattern:'alphabatesOnly', required: true,validationmsg: "Enter City",placeholder:"City" },
    // { name: "State",label: "State",inputType: "text",pattern:'alphabatesOnly', required: true,validationmsg: "Enter State",placeholder:"State" },
    // { name: "Address",label: "Address",inputType: "text",required: true,validationmsg: "Address",placeholder:"Address" },
    // { name: "LandMark",label: "LandMark",inputType: "text",required: true,validationmsg: "LandMark",placeholder:"LandMark" },
    { name: "Comments",label: "Authorizer Comments" ,inputType: "text",required: true,validationmsg: "Comments",placeholder:"Comments" },
  ],
},

switch:{
  BOE_Details:[
    // { name: "FundSwitchApplicable",label: "Fund Switch Applicable",inputType: "text",required: true,validationmsg: "Fund Switch Applicable", placeholder: "Fund Switch Applicable"},
    // { name: "FreeSwitchesAvailable",label: "Free Switches Available",inputType: "text",required: true,validationmsg: "Free Switches Available", placeholder: "Free Switches Available"},
    { name: "ViewExistingDetails",label: "Existing Details",inputType: "title"},
  ],
  View_Existing_Details_title:[
    { name: "ViewExistingDetails",label: "Existing Details",inputType: "title"},
  ],
  Initiate_RequestBY:[
    { name: "customerchoice",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "Select ValidatedBy",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
  ],
  Request_Details:[
    { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
    { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
    { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
    { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",hide:true,placeholder: "Reason for Delayed Submission" },
    { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
  ],
},
premiumredirection:{
  BOE_Details:[
    // { name: "PremiumRedirectionAvailable",label: "Premium Redirection Available",inputType: "text",required: false,validationmsg: "Premium Redirection Available", placeholder: "Premium Redirection Available"},
    // { name: "NoofPremiumRedirection Available",label: "No of Premium Redirection Available",inputType: "text",required: false,validationmsg: "No of Premium Redirection Available", placeholder: "No of Premium Redirection Available"},
    { name: "ExistingDetails",label: "Existing Details",inputType: "title"},
  ],
  Initiate_RequestBY:[
    { name: "customerchoice",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "Select ValidatedBy",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
  ],
  Request_Details:[
    { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
    { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
    { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
    { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",hide:true,placeholder: "Reason for Delayed Submission" },
    { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
  ],
},



}

const GeneralInformationData={
  touchpointinformation:{
    BOE_Details:[
    { name: "CareID",label: "Care ID",inputType: "text",required: true,disabled:true,validationmsg: "Enter Care ID",placeholder:"Care ID" },
     { name: "TollFreeNumber",label: "Toll Free Number",inputType: "text",required: true,disabled:true,validationmsg: "Enter Toll Free Number",placeholder:"Toll Free Number" },
    // { name: "NearestBranch",label: "Nearest Branch",inputType: "text",required: true,validationmsg: "Enter Pim Code",placeholder:"Nearest Branch" },
    //{ name: "Address",label: "Address",inputType: "text",required: true,validationmsg: "Enter Address",placeholder:"Address" },
    { name: "WhatsAppNumber",label: "WhatsApp Number",inputType: "text",required: true,validationmsg: "Enter WhatsApp Number",placeholder:"WhatsApp Number" },
    // { name: "mobileApp",label: "Mobile App Download Link",inputType: "link",required: true,disabled:true,linkValue:"https://play.google.com/store/apps/details?id=com.fgli&hl=en_IN&gl=US&pli=1",validationmsg: "Enter Mobile App Download Link",placeholder:"Mobile App Download Link" },
    // { name: "customerPortalLink",label: "Customer Portal Link",inputType: "link",required: true,disabled:true,linkValue:"https://customer.life.futuregenerali.in/WebAppln/Pages/Common/Login.aspx",validationmsg: "Enter Customer Portal Link",placeholder:"Customer Portal Link" },
    // { name: "escalation",label: "Escalation Mechanism and Grievance Redressal",inputType: "link",required: true,disabled:true,linkValue:"https://life.futuregenerali.in/customer-service/grievance-redressal-procedure/",validationmsg: "Enter Escalation Mechanism and Grievance Redressal",placeholder:"Escalation Mechanism and Grievance Redressal" },
    // {name:"Send", label:"",inputType:"touchicons"},
    {name:"Send", label:"Send Via",inputType:"icons"},
    // {name:"Send", label:"Send",inputType:"texts"},
    // { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
  ],
  Comments:[
    { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
  ]
  },
  others:{
       BOE_Details:[   { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },]
  },
}

const PaymentReProcessingData={
  unclaimedamountpayout:{
    BOE_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      {name:"texts",label:"",inputType:"texts"},
      { name: "InitiateReprocessingby",label: "Initiate Reprocessing by",inputType: "title",required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
    ],
    NEFT_Bank_Details: [
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
      { name: "UploadChequeCopy",label: "Upload Cheque Copy",inputType: "upload",required: true,validationmsg: "Upload Cheque Copy",placeholder:"Upload Cheque Copy" },
    ],
    Initiate_RequestBY:[
      { name: "ValidatedBy",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
    ],
    Request_Details:[
      { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",required: true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",disabled:true,inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "sInitiatePennyDrop",label: "Penny Drop Result",inputType: "text",disabled:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
       { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
    POS_RequestDetails:[
      { name: "ViewCheckCopy",label: "View Cheque Copy",inputType: "link",linkValue:"View",required: false,validationmsg: "View Cheque Copy",placeholder:"View Cheque Copy" },
      { name: "UploadRequestForm",label: "Upload Request Form",inputType:  "link",linkValue:"View",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Action:[
      { name: "POSAction ", label: "POS Action ", inputType: "title",placeholder: "Reason for Delayed Submission" },
      {name:"texts",label:"",inputType:"texts"},
      { name: "posInitiatePennyDrop", label: "Initiate Penny Drop",inputType: "text",hyperLink:true,placeholder: "Initiate Penny Drop" },
      { name: "BankDedupeCheck", label: "Bank Dedupe Check", inputType: "text",hyperLink:true,placeholder: "Bank Dedupe Check" },
      { name: "Comments", label: "Authorizer Comments" , inputType: "textarea", maxlength:500,placeholder: "Comments Box" },
    ]
  },
  newbusinessrefund:{
    BOE_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      {name:"texts",label:"",inputType:"texts"},
      { name: "InitiateReprocessingby",label: "Initiate Reprocessing by",inputType: "title",required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
    ],
    NEFT_Bank_Details: [
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
      { name: "UploadChequeCopy",label: "Upload Cheque Copy",inputType: "upload",required: false,validationmsg: "Upload Cheque Copy",placeholder:"Upload Cheque Copy" },
    ],
    Initiate_RequestBY:[
      { name: "ValidatedBy",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
    ],
    Request_Details:[
      { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",required: true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",disabled:true,inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",disabled:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
       { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
    POS_RequestDetails:[
      { name: "ViewCheckCopy",label: "View Cheque Copy",inputType: "link",linkValue:"View",required: false,validationmsg: "View Cheque Copy",placeholder:"View Cheque Copy" },
      { name: "UploadRequestForm",label: "Upload Request Form",inputType:  "link",linkValue:"View",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Action:[
      { name: "POSAction ", label: "POS Action ", inputType: "title",placeholder: "Reason for Delayed Submission" },
      {name:"texts",label:"",inputType:"texts"},
      { name: "posInitiatePennyDrop", label: "Initiate Penny Drop",inputType: "text",hyperLink:true,placeholder: "Initiate Penny Drop" },
      { name: "BankDedupeCheck", label: "Bank Dedupe Check", inputType: "text",hyperLink:true,placeholder: "Bank Dedupe Check" },
      { name: "Comments", label: "Authorizer Comments" , inputType: "textarea", maxlength:500,placeholder: "Comments Box" },
    ]
  },
  postissuancerefund:{
    BOE_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      {name:"texts",label:"",inputType:"texts"},
      { name: "InitiateReprocessingby",label: "Initiate Reprocessing by",inputType: "title",required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
    ],
    NEFT_Bank_Details: [
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
      { name: "UploadChequeCopy",label: "Upload Cheque Copy",inputType: "upload",required: false,validationmsg: "Upload Cheque Copy",placeholder:"Upload Cheque Copy" },
    ],
    Initiate_RequestBY:[
      { name: "ValidatedBy",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
    ],
    Request_Details:[
      { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",required: true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",disabled:true,inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",disabled:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
       { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
    POS_RequestDetails:[
      { name: "ViewCheckCopy",label: "View Cheque Copy",inputType: "link",linkValue:"View",required: false,validationmsg: "View Cheque Copy",placeholder:"View Cheque Copy" },
      { name: "UploadRequestForm",label: "Upload Request Form",inputType:  "link",linkValue:"View",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Action:[
      { name: "POSAction ", label: "POS Action ", inputType: "title",placeholder: "Reason for Delayed Submission" },
      {name:"texts",label:"",inputType:"texts"},
      { name: "posInitiatePennyDrop", label: "Initiate Penny Drop",inputType: "text",hyperLink:true,placeholder: "Initiate Penny Drop" },
      { name: "BankDedupeCheck", label: "Bank Dedupe Check", inputType: "text",hyperLink:true,placeholder: "Bank Dedupe Check" },
      { name: "Comments", label: "Authorizer Comments" , inputType: "textarea", maxlength:500,placeholder: "Comments Box" },
    ]
  },
  survivalbenefit:{
    BOE_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      {name:"texts",label:"",inputType:"texts"},
      { name: "InitiateReprocessingby",label: "Initiate Reprocessing by",inputType: "title",required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
    ],
    NEFT_Bank_Details: [
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
      { name: "UploadChequeCopy",label: "Upload Cheque Copy",inputType: "upload",required: false,validationmsg: "Upload Cheque Copy",placeholder:"Upload Cheque Copy" },
    ],
    Initiate_RequestBY:[
      { name: "ValidatedBy",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
    ],
    Request_Details:[
      { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",required: true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",disabled:true,inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",disabled:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
       { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
    POS_RequestDetails:[
      { name: "ViewCheckCopy",label: "View Cheque Copy",inputType: "link",linkValue:"View",required: false,validationmsg: "View Cheque Copy",placeholder:"View Cheque Copy" },
      { name: "UploadRequestForm",label: "Upload Request Form",inputType:  "link",linkValue:"View",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Action:[
      { name: "POSAction ", label: "POS Action ", inputType: "title" },
      {name:"texts",label:"",inputType:"texts"},
      { name: "posInitiatePennyDrop", label: "Initiate Penny Drop",inputType: "text",hyperLink:true,placeholder: "Initiate Penny Drop" },
      { name: "BankDedupeCheck", label: "Bank Dedupe Check", inputType: "text",hyperLink:true,placeholder: "Bank Dedupe Check" },
      { name: "Comments", label: "Authorizer Comments" , inputType: "textarea", maxlength:500,placeholder: "Comments Box" },
    ]
  },
  foreclosure:{
    BOE_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      {name:"texts",label:"",inputType:"texts"},
      { name: "InitiateReprocessingby",label: "Initiate Reprocessing by",inputType: "title",required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
    ],
    NEFT_Bank_Details: [
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
      { name: "UploadChequeCopy",label: "Upload Cheque Copy",inputType: "upload",required: false,validationmsg: "Upload Cheque Copy",placeholder:"Upload Cheque Copy" },
    ],
    Initiate_RequestBY:[
      { name: "ValidatedBy",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
    ],
    Request_Details:[
      { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",required: true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",disabled:true,inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",disabled:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
       { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
    POS_RequestDetails:[
      { name: "ViewCheckCopy",label: "View Cheque Copy",inputType: "link",linkValue:"View",required: false,validationmsg: "View Cheque Copy",placeholder:"View Cheque Copy" },
      { name: "UploadRequestForm",label: "Upload Request Form",inputType:  "link",linkValue:"View",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Action:[
      { name: "POSAction ", label: "POS Action ", inputType: "title",placeholder: "Reason for Delayed Submission" },
      {name:"texts",label:"",inputType:"texts"},
      { name: "posInitiatePennyDrop", label: "Initiate Penny Drop",inputType: "text",hyperLink:true,placeholder: "Initiate Penny Drop" },
      { name: "BankDedupeCheck", label: "Bank Dedupe Check", inputType: "text",hyperLink:true,placeholder: "Bank Dedupe Check" },
      { name: "Comments", label: "Authorizer Comments" , inputType: "textarea", maxlength:500,placeholder: "Comments Box" },
    ]
  },
  maturity:{
    BOE_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      {name:"texts",label:"",inputType:"texts"},
      { name: "InitiateReprocessingby",label: "Initiate Reprocessing by",inputType: "title",required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
    ],
    NEFT_Bank_Details: [
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
      { name: "UploadChequeCopy",label: "Upload Cheque Copy",inputType: "upload",required: false,validationmsg: "Upload Cheque Copy",placeholder:"Upload Cheque Copy" },
    ],
    Initiate_RequestBY:[
      { name: "ValidatedBy",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
    ],
    Request_Details:[
      { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",disabled:true,inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",disabled:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
       { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
    POS_RequestDetails:[
      { name: "ViewCheckCopy",label: "View Cheque Copy",inputType: "link",linkValue:"View",required: false,validationmsg: "View Cheque Copy",placeholder:"View Cheque Copy" },
      { name: "UploadRequestForm",label: "Upload Request Form",inputType:  "link",linkValue:"View",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Action:[
      { name: "POSAction ", label: "POS Action ", inputType: "title",placeholder: "Reason for Delayed Submission" },
      {name:"texts",label:"",inputType:"texts"},
      { name: "posInitiatePennyDrop", label: "Initiate Penny Drop",inputType: "text",hyperLink:true,placeholder: "Initiate Penny Drop" },
      { name: "BankDedupeCheck", label: "Bank Dedupe Check", inputType: "text",hyperLink:true,placeholder: "Bank Dedupe Check" },
      { name: "Comments", label: "Authorizer Comments" , inputType: "textarea", maxlength:500,placeholder: "Comments Box" },
    ]
  },
  surrender:{
    BOE_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      {name:"texts",label:"",inputType:"texts"},
      { name: "InitiateReprocessingby",label: "Initiate Reprocessing by",inputType: "title",required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
    ],
    NEFT_Bank_Details: [
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
      { name: "UploadChequeCopy",label: "Upload Cheque Copy",inputType: "upload",required: false,validationmsg: "Upload Cheque Copy",placeholder:"Upload Cheque Copy" },
    ],
    Initiate_RequestBY:[
      { name: "ValidatedBy",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
    ],
    Request_Details:[
      { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",disabled:true,inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",disabled:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
       { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
    POS_RequestDetails:[
      { name: "ViewCheckCopy",label: "View Cheque Copy",inputType: "link",linkValue:"View",required: false,validationmsg: "View Cheque Copy",placeholder:"View Cheque Copy" },
      { name: "UploadRequestForm",label: "Upload Request Form",inputType:  "link",linkValue:"View",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Action:[
      { name: "POSAction ", label: "POS Action ", inputType: "title",placeholder: "Reason for Delayed Submission" },
      {name:"texts",label:"",inputType:"texts"},
      { name: "posInitiatePennyDrop", label: "Initiate Penny Drop",inputType: "text",hyperLink:true,placeholder: "Initiate Penny Drop" },
      { name: "BankDedupeCheck", label: "Bank Dedupe Check", inputType: "text",hyperLink:true,placeholder: "Bank Dedupe Check" },
      { name: "Comments", label: "Authorizer Comments" , inputType: "textarea", maxlength:500,placeholder: "Comments Box" },
    ]
  },
  annuity:{
    BOE_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      {name:"texts",label:"",inputType:"texts"},
      { name: "InitiateReprocessingby",label: "Initiate Reprocessing by",inputType: "title",required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
    ],
    NEFT_Bank_Details: [
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
      { name: "UploadChequeCopy",label: "Upload Cheque Copy",inputType: "upload",required: false,validationmsg: "Upload Cheque Copy",placeholder:"Upload Cheque Copy" },
    ],
    Initiate_RequestBY:[
      { name: "ValidatedBy",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
    ],
    Request_Details:[
      { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",required: true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",disabled:true,inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",disabled:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
       { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
    POS_RequestDetails:[
      { name: "ViewCheckCopy",label: "View Cheque Copy",inputType: "link",linkValue:"View",required: false,validationmsg: "View Cheque Copy",placeholder:"View Cheque Copy" },
      { name: "UploadRequestForm",label: "Upload Request Form",inputType:  "link",linkValue:"View",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Action:[
      { name: "POSAction ", label: "POS Action ", inputType: "title",placeholder: "Reason for Delayed Submission" },
      {name:"texts",label:"",inputType:"texts"},
      { name: "posInitiatePennyDrop", label: "Initiate Penny Drop",inputType: "text",hyperLink:true,placeholder: "Initiate Penny Drop" },
      { name: "BankDedupeCheck", label: "Bank Dedupe Check", inputType: "text",hyperLink:true,placeholder: "Bank Dedupe Check" },
      { name: "Comments", label: "Authorizer Comments" , inputType: "textarea", maxlength:500,placeholder: "Comments Box" },
    ]
  },
  claims:{
    BOE_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      {name:"texts",label:"",inputType:"texts"},
      { name: "InitiateReprocessingby",label: "Initiate Reprocessing by",inputType: "title",required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
    ],
    NEFT_Bank_Details: [
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
      { name: "UploadChequeCopy",label: "Upload Cheque Copy",inputType: "upload",required: false,validationmsg: "Upload Cheque Copy",placeholder:"Upload Cheque Copy" },
    ],
    Initiate_RequestBY:[
      { name: "ValidatedBy",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
    ],
    Request_Details:[
      { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",required: true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",disabled:true,inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",disabled:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
       { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
    POS_RequestDetails:[
      { name: "ViewCheckCopy",label: "View Cheque Copy",inputType: "link",linkValue:"View",required: false,validationmsg: "View Cheque Copy",placeholder:"View Cheque Copy" },
      { name: "UploadRequestForm",label: "Upload Request Form",inputType:  "link",linkValue:"View",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Action:[
      { name: "POSAction ", label: "POS Action ", inputType: "title",placeholder: "Reason for Delayed Submission" },
      {name:"texts",label:"",inputType:"texts"},
      { name: "posInitiatePennyDrop", label: "Initiate Penny Drop",inputType: "text",hyperLink:true,placeholder: "Initiate Penny Drop" },
      { name: "BankDedupeCheck", label: "Bank Dedupe Check", inputType: "text",hyperLink:true,placeholder: "Bank Dedupe Check" },
      { name: "Comments", label: "Authorizer Comments" , inputType: "textarea", maxlength:500,placeholder: "Comments Box" },
    ]
  },
  loan:{
    BOE_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      {name:"texts",label:"",inputType:"texts"},
      { name: "InitiateReprocessingby",label: "Initiate Reprocessing by",inputType: "title",required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
    ],
    NEFT_Bank_Details: [
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
      { name: "UploadChequeCopy",label: "Upload Cheque Copy",inputType: "upload",required: false,validationmsg: "Upload Cheque Copy",placeholder:"Upload Cheque Copy" },
    ],
    Initiate_RequestBY:[
      { name: "ValidatedBy",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
    ],
    Request_Details:[
      { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",required: true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",disabled:true,inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",disabled:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
       { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
    POS_RequestDetails:[
      { name: "ViewCheckCopy",label: "View Cheque Copy",inputType: "link",linkValue:"View",required: false,validationmsg: "View Cheque Copy",placeholder:"View Cheque Copy" },
      { name: "UploadRequestForm",label: "Upload Request Form",inputType:  "link",linkValue:"View",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Action:[
      { name: "POSAction ", label: "POS Action ", inputType: "title",placeholder: "Reason for Delayed Submission" },
      {name:"texts",label:"",inputType:"texts"},
      { name: "posInitiatePennyDrop", label: "Initiate Penny Drop",inputType: "text",hyperLink:true,placeholder: "Initiate Penny Drop" },
      { name: "BankDedupeCheck", label: "Bank Dedupe Check", inputType: "text",hyperLink:true,placeholder: "Bank Dedupe Check" },
      { name: "Comments", label: "Authorizer Comments" , inputType: "textarea", maxlength:500,placeholder: "Comments Box" },
    ]
  },
  partialwithdrawal:{
    BOE_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      {name:"texts",label:"",inputType:"texts"},
      { name: "InitiateReprocessingby",label: "Initiate Reprocessing by",inputType: "title",required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
    ],
    NEFT_Bank_Details: [
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Confirm Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
      { name: "UploadChequeCopy",label: "Upload Cheque Copy",inputType: "upload",required: false,validationmsg: "Upload Cheque Copy",placeholder:"Upload Cheque Copy" },
    ],
    Initiate_RequestBY:[
      { name: "ValidatedBy",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
    ],
    Request_Details:[
      { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",required: true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Details:[
      { name: "Payout_Made_For",label: "Payout Made For",inputType: "text",disabled:true,required: false,validationmsg: "Payout Made For", placeholder: "Payout Made For"},
      { name: "Payment_Mode",label: "Payment Mode",inputType: "text",disabled:true,required: false,validationmsg: "Payment Mode", placeholder: "Payment Mode"},
      { name: "Payment_Date",label: "Payment Date",inputType: "text",disabled:true,required: false,validationmsg: "Payment Date", placeholder: "Payment Date"},
      { name: "Payment_Status",label: "Payment Status",inputType: "text",disabled:true,required: false,validationmsg: "Payment Status", placeholder: "Payment Status"},
      { name: "Cheque_Status",label: "Cheque Status",inputType: "text",disabled:true,required: false,validationmsg: "Cheque Status", placeholder: "Cheque Status"},
      { name: "ChequePOD_No",label: "Cheque POD No",inputType: "text",disabled:true,required: false,validationmsg: "Cheque POD No", placeholder: "Cheque POD No"},
      { name: "Reason_For_Reprocessing",label:"Reason For Reprocessing",disabled:true,inputType: "text",required: false,validationmsg: "Reason For Reprocessing", placeholder: "Reason For Reprocessing"},
      
      { name: "NameAsMentionedInTheBank",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: true,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
      { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly', required: true,validationmsg: "", placeholder: "Bank Account Number"},
      { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "",placeholder:"Bank Name" },
      { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",disabled:true,required: true,validationmsg: "",placeholder:"Initiate Penny Drop" },
       { name: "pennyDropResult",label: "Name as per Penny Drop",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder:"Name as per Penny Drop" },
       { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
    POS_RequestDetails:[
      { name: "ViewCheckCopy",label: "View Cheque Copy",inputType: "link",linkValue:"View",required: false,validationmsg: "View Cheque Copy",placeholder:"View Cheque Copy" },
      { name: "UploadRequestForm",label: "Upload Request Form",inputType:  "link",linkValue:"View",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    POS_Action:[
      { name: "POSAction ", label: "POS Action ", inputType: "title",placeholder: "Reason for Delayed Submission" },
      {name:"texts",label:"",inputType:"texts"},
      { name: "posInitiatePennyDrop", label: "Initiate Penny Drop",inputType: "text",hyperLink:true,placeholder: "Initiate Penny Drop" },
      { name: "BankDedupeCheck", label: "Bank Dedupe Check", inputType: "text",hyperLink:true,placeholder: "Bank Dedupe Check" },
      { name: "Comments", label: "Authorizer Comments" , inputType: "textarea", maxlength:500,placeholder: "Comments Box" },
    ]
  },
}

const PartialComplaintData={
  unfairbusinesspractices:{
    BOE_Details:[
      { name: "ComplaintForm",label: "Complaint Form",inputType: "dropdown",required: true,validationmsg: "Select a Complaint Form", placeholder: "Select a Complaint Form"},
      { name: "ComplaintDescription",label: "Complaint Description",inputType: "complaintbox",required: true,validationmsg: "Enter a Complaint Description", placeholder: "Complaint Description"},
      { name: "UploadLetter",label: "Upload Letter",inputType: "upload",required: true,validationmsg: "Upload Letter",placeholder:"UploadLetter" },
    ],
  },
  proposalprocessing:{
    BOE_Details:[
      { name: "ComplaintForm",label: "Complaint Form",inputType: "dropdown",required: true,validationmsg: "Select a Complaint Form", placeholder: "Select a Complaint Form"},
      { name: "ComplaintDescription",label: "Complaint Description",inputType: "complaintbox",required: true,validationmsg: "Enter a Complaint Description", placeholder: "Complaint Description"},
      { name: "UploadLetter",label: "Upload Letter",inputType: "upload",required: true,validationmsg: "Upload Letter",placeholder:"UploadLetter" },
    ],
  },
  policyservicing:{
    BOE_Details:[
      { name: "ComplaintForm",label: "Complaint Form",inputType: "dropdown",required: true,validationmsg: "Select a Complaint Form", placeholder: "Select a Complaint Form"},
      { name: "ComplaintDescription",label: "Complaint Description",inputType: "complaintbox",required: true,validationmsg: "Enter a Complaint Description", placeholder: "Complaint Description"},
      { name: "UploadLetter",label: "Upload Letter",inputType: "upload",required: true,validationmsg: "Upload Letter",placeholder:"UploadLetter" },
    ],
  },
  survivalclaim:{
    BOE_Details:[
      { name: "ComplaintForm",label: "Complaint Form",inputType: "dropdown",required: true,validationmsg: "Select a Complaint Form", placeholder: "Select a Complaint Form"},
      { name: "ComplaintDescription",label: "Complaint Description",inputType: "complaintbox",required: true,validationmsg: "Enter a Complaint Description", placeholder: "Complaint Description"},
      { name: "UploadLetter",label: "Upload Letter",inputType: "upload",required: true,validationmsg: "Upload Letter",placeholder:"UploadLetter" },
    ],
  },
  
  deathclaim:{
    BOE_Details:[
      { name: "ComplaintForm",label: "Complaint Form",inputType: "dropdown",required: true,validationmsg: "Select a Complaint Form", placeholder: "Select a Complaint Form"},
      { name: "ComplaintDescription",label: "Complaint Description",inputType: "complaintbox",required: true,validationmsg: "Enter a Complaint Description", placeholder: "Complaint Description"},
      { name: "UploadLetter",label: "Upload Letter",inputType: "upload",required: true,validationmsg: "Upload Letter",placeholder:"UploadLetter" },
    ],
  },
  uliprelated:{
    BOE_Details:[
      { name: "ComplaintForm",label: "Complaint Form",inputType: "dropdown",required: true,validationmsg: "Select a Complaint Form", placeholder: "Select a Complaint Form"},
      { name: "ComplaintDescription",label: "Complaint Description",inputType: "complaintbox",required: true,validationmsg: "Enter a Complaint Description", placeholder: "Complaint Description"},
      { name: "UploadLetter",label: "Upload Letter",inputType: "upload",required: true,validationmsg: "Upload Letter",placeholder:"UploadLetter" },
    ],
  },
  others:{
    BOE_Details:[
      { name: "ComplaintForm",label: "Complaint Form",inputType: "dropdown",required: true,validationmsg: "Select a Complaint Form", placeholder: "Select a Complaint Form"},
      { name: "ComplaintDescription",label: "Complaint Description",inputType: "complaintbox",required: true,validationmsg: "Enter a Complaint Description", placeholder: "Complaint Description"},
      { name: "UploadLetter",label: "Upload Letter",inputType: "upload",required: true,validationmsg: "Upload Letter",placeholder:"UploadLetter" },
    ],
  },
  complaintreopen:{
    BOE_Details:[
      { name: "ComplaintForm",label: "Complaint Form",inputType: "dropdown",required: true,validationmsg: "Select a Complaint Form", placeholder: "Select a Complaint Form"},
      { name: "ComplaintDescription",label: "Complaint Description",inputType: "complaintbox",required: true,validationmsg: "Enter a Complaint Description", placeholder: "Complaint Description"},
      { name: "UploadLetter",label: "Upload Letter",inputType: "upload",required: true,validationmsg: "Upload Letter",placeholder:"UploadLetter" },
    ],
  },
}

const ProductRelatedData = {
  productkeyfeatures:{
    BOE_Details:[
     { name: "CustomerQueryTopic",label: "Customer Query Topic",inputType: "dropdown",required: true,validationmsg: "Customer Query Topic",placeholder:"Customer Query Topic" },
     { name: "CustomerQuery",label: "Customer Query",inputType: "text",required: true,validationmsg: "Enter Customer Query",placeholder:"Customer Query" },
     { name: "SendProductInformation",label: "Send Product Information",inputType: "icons",required: true,validationmsg: "Send Product Information" },
  ]
  },
  maturity:{
    BOE_Details:[
     { name: "CustomerQueryTopic",label: "Customer Query Topic",inputType: "dropdown",required: true,validationmsg: "Customer Query Topic",placeholder:"Customer Query Topic" },
     { name: "CustomerQuery",label: "Customer Query",inputType: "text",required: true,validationmsg: "Enter Customer Query",placeholder:"Customer Query" },
     { name: "SendProductInformation",label: "Send Product Information",inputType: "icons",required: true,validationmsg: "Send Product Information" },
  ]
  },
  productcharges:{
    BOE_Details:[
     { name: "CustomerQueryTopic",label: "Customer Query Topic",inputType: "dropdown",required: true,validationmsg: "Customer Query Topic",placeholder:"Customer Query Topic" },
     { name: "CustomerQuery",label: "Customer Query",inputType: "text",required: true,validationmsg: "Enter Customer Query",placeholder:"Customer Query" },
     { name: "SendProductInformation",label: "Send Product Information",inputType: "icons",required: true,validationmsg: "Send Product Information" },
  ]
  },
  survivalfeatures:{
    BOE_Details:[
     { name: "CustomerQueryTopic",label: "Customer Query Topic",inputType: "dropdown",required: true,validationmsg: "Customer Query Topic",placeholder:"Customer Query Topic" },
     { name: "CustomerQuery",label: "Customer Query",inputType: "text",required: true,validationmsg: "Enter Customer Query",placeholder:"Customer Query" },
     { name: "SendProductInformation",label: "Send Product Information",inputType: "icons",required: true,validationmsg: "Send Product Information" },
  ]
  },
  termsandconditions:{
    BOE_Details:[
     { name: "CustomerQueryTopic",label: "Customer Query Topic",inputType: "dropdown",required: true,validationmsg: "Customer Query Topic",placeholder:"Customer Query Topic" },
     { name: "CustomerQuery",label: "Customer Query",inputType: "text",required: true,validationmsg: "Enter Customer Query",placeholder:"Customer Query" },
     { name: "SendProductInformation",label: "Send Product Information",inputType: "icons",required: true,validationmsg: "Send Product Information" },
  ]
  },
  prospectleaddistributorlead:{
    BOE_Details:[
     { name: "CustomerName",label: "Customer Name",inputType: "text",required: true,validationmsg: "Customer Name",placeholder:"Customer Name" },
     { name: "ExistingPolicyNo",label: "Existing Policy No",inputType: "text",required: true,validationmsg: "Existing Policy No",placeholder:"Existing Policy No" },
     { name: "LeadType",label: "Lead Type",inputType: "dropdown",required: true,validationmsg: "Lead Type" },
     { name: "ContactNumber",label: "Contact Number",inputType: "text",required: true,validationmsg: "Contact Number",placeholder:"Contact Number" },
     { name: "CallDate",label: "Call Date",inputType: "date",required: true,validationmsg: "Call Date",placeholder:"Call Date" },
     { name: "CallTime",label: "Call Time",inputType: "time",required: true,validationmsg: "Call Time" },
     { name: "Address",label: "Address",inputType: "text",required: true,validationmsg: "Address" },
     { name: "Email",label: "Email",inputType: "text",required: true,validationmsg: "Email" },
  ]
  },
}

const PolicyBondData={
  policybondhardcopynotreceived:{
    View_Dispatch_Details:[
     { name: "WelcomeCallDispositon",label: "Welcome Call Dispositon",inputType: "text",disabled:true,required: false,validationmsg: "Welcome Call Dispositon",placeholder: "Welcome Call Dispositon" },
     { name: "CustomerAddress",label: "Customer's Address",inputType: "text",disabled:true,required: false,validationmsg: "Customer's Address",placeholder: "Customer's Address" },
     { name: "DispatchDate",label: "Dispatch Date",inputType: "text",disabled:true,required: false,validationmsg: "Dispatch Date",placeholder: "Dispatch Date" },
     { name: "DispatchMode",label: "Dispatch Mode",inputType: "text",disabled:true,required: false,validationmsg: "Dispatch Mode",placeholder: "Dispatch Mode" },
     { name: "PODNo",label: "POD No:",inputType: "text",required: false,disabled:true,validationmsg: "POD No",placeholder: "POD No" },
     { name: "ReceivedOn",label: "Received On",inputType: "text",disabled:true,required: false,validationmsg: "Received On",placeholder: "Received On" },
     { name: "ReceivedBy",label: "Received By",inputType: "text",disabled:true,required: false,validationmsg: "Received By",placeholder: "Received By" },
     { name: "RTOStatus",label: "RTO Status",inputType: "text",disabled:true,required: false,validationmsg: "RTO Status",placeholder: "RTO Status" },
    ],
    RTO_StatusFields:[
     { name: "RTOReason",label: "RTO Reason",inputType: "text",disabled:true,required: false,validationmsg: "RTO Reason",placeholder: "RTO Reason" },
     { name: "PolicyRedispatch",label: "Policy Redispatch",inputType: "text",disabled:true,required: false,validationmsg: "Policy Redispatch",placeholder: "Policy Redispatch" },
     { name: "DispatchDate",label: "Dispatch Date",inputType: "text",disabled:true,required: false,validationmsg: "Dispatch Date",placeholder: "Dispatch Date" },
     { name: "DispatchMode",label: "Dispatch Mode",inputType: "text",disabled:true,required: false,validationmsg: "Dispatch Mode",placeholder: "Dispatch Mode" },
     { name: "PODNo",label: "POD No:",inputType: "text",disabled:true,required: false,validationmsg: "POD No",placeholder: "POD No" },
     { name: "ReceivedOn",label: "Received On",inputType: "text",disabled:true,required: false,validationmsg: "Received On",placeholder: "Received On" },
     { name: "ReceivedBy",label: "Received By",inputType: "text",disabled:true,required: false,validationmsg: "Received By",placeholder: "Received By" },
     { name: "SenttoBranch",label: "Sent to Branch",inputType: "text",disabled:true,required: false,validationmsg: "Sent to Branch",placeholder: "Sent to Branch" },
     { name: "BranchName",label: "Branch Name",inputType: "text",disabled:true,required: false,validationmsg: "Branch Name",placeholder: "Branch Name" },
    ],
    Send_SoftCopy_Fileds:[
     { name: "ShareSoftCopyofPolicyDocument",label: "Share Soft Copy of Policy Document",inputType: "icons",required: false,validationmsg: "Select Share Soft Copy Policy Documnet" },
    ],
    Register_Request_Fields:[
     { name: "PhysicalDispatchType",label: "Physical Dispatch Type",inputType: "dropdown",required: true,validationmsg: "Physical Dispatch Type",placeholder: "Physical Dispatch Type" },
     { name: "DispatchTo",label: "Dispatch To",inputType: "dropdown",required: true,validationmsg: "Dispatch To",placeholder: "Dispatch To" },
     { name: "ReasonForReprint",label: "Reason For Reprint",inputType: "text",required: true,validationmsg: "Reason For Reprint",placeholder: "Reason For Reprint" },
     { name:"RequestForm",label:"Request Form",inputType:"upload",required:true,validationmsg:"Request Form",placeholder:"Request Form"},
     { name: "CustomerSigningDate", label: "Customer Signing Date & Time", inputType: "date",required: true,validationmsg: "Select Customer Signing Date & Time",placeholder: "", },
     { name: "BranchReceivedDate", label: "Request Received Date", inputType: "date",required: true,validationmsg: "Select Branch Signing Date",placeholder: "Branch Signing Date" },
     { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,placeholder: "Reason for Delayed Submission" },
     { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
   ],
   ReasonSubmission:[
   ],
   Comments:[
     { name: "RequestorComments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
   ],
   POS_Details:[
     { name: "DispatchType",label: "Physical Dispatch Type",inputType: "dropdown",required: false,validationmsg: "Dispatch Type",placeholder: "Dispatch Type" },
     { name: "PolicyBondAvailable",label: "Policy Bond Available",inputType: "dropdown",required: false,validationmsg: "Policy Bond Available",placeholder: "Policy Bond Available" },
     { name: "ReDispatchTo",label: "Re Dispatch To",inputType: "text",required: false,validationmsg: "Re Dispatch To",placeholder: "Re Dispatch To" },
     { name: "BranchName",label: "Branch Name",inputType: "text",required: false,validationmsg: "Branch Name",placeholder: "Branch Name" },
     { name: "ReasonForReprint",label: "Reason For Reprint",inputType: "text",required: false,validationmsg: "Reason For Reprint",placeholder: "Reason For Reprint" },
     { name:"ChildTicketStatus",label:"Child Ticket Status",inputType:"text",required:false,validationmsg:"Child Ticket Status",placeholder:"Child Ticket Status"},
     { name: "CustomerLetter", label: "Customer Letter", inputType: "link",linkValue:"View",placeholder: "Customer Letter" },
     { name: "customersigning", label: "Customer Signing Date & Time", inputType: "text",required: false,validationmsg: "Select Customer Signing Date & Time",placeholder: "DD/MM/YYYY", },
     { name: "BranchReceivedDate", label: "Request Received Date", inputType: "date",required: false,validationmsg: "Select Branch Signing Date",placeholder: "Branch Signing Date" },
     { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
     { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
   ],
   NBUser_Details:[
    { name: "DispatchType",label: "Physical Dispatch Type",inputType: "dropdown",disabled:true,required: false,validationmsg: "Dispatch Type",placeholder: "Dispatch Type" },
    { name: "DispatchTo",label: "Dispatch To",inputType: "text",disabled:true,required: false,validationmsg: "Re Dispatch To",placeholder: "Re Dispatch To" },
    //{ name: "BranchName",label: "Branch Name",inputType: "text",disabled:true,required: false,validationmsg: "Branch Name",placeholder: "Branch Name" },
    { name: "ReasonForReprint",label: "Reason For Reprint",inputType: "text",disabled:true,required: false,validationmsg: "Reason For Reprint",placeholder: "Reason For Reprint" },
   // { name:"ChildTicketStatus",label:"Child Ticket Status",inputType:"text",required:false,validationmsg:"Child Ticket Status",placeholder:"Child Ticket Status"},
    { name: "RequestForm", label: "View Request Form", inputType: "link",linkValue:"View",disabled:true,placeholder: "Customer Letter" },
    { name: "CustomerSigningDate", label: "Customer Signing Date & Time", inputType: "text",disabled:true,required: false,validationmsg: "Select Customer Signing Date & Time",placeholder: "DD/MM/YYYY", },
    { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required: false,validationmsg: "Select Branch Signing Date",placeholder: "Branch Signing Date" },
    { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,disabled:true,placeholder: "Reason for Delayed Submission" },
    { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    { name: "PolicyBondAvailable",label: "Policy Bond Available",inputType: "dropdown",disabled:false,required: false,validationmsg: "Policy Bond Available",placeholder: "Policy Bond Available" },
    { name: "RequestorComments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,disabled:true,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
    { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
  ]
 },
 sendsoftcopy:{
   Send_SoftCopy_Fileds:[
     { name: "ShareSoftCopyofPolicyDocument",label: "Share Soft Copy of Policy Document",inputType: "icons",required: false,validationmsg: "Select Share Soft Copy Policy Documnet" },
    ],
   },
 uploadpolicybonddeliveryconfirmation:{
   BOE_Details:[
     { name: "SentToBranch",label: "Sent to Branch",inputType: "text",required: true,disabled:false,validationmsg: "Sent to Branch",placeholder: "Sent to Branch" },
     { name: "BranchName",label: "Branch Name",inputType: "text",required: true,disabled:false,validationmsg: "Branch Name",placeholder: "Branch Name" },
     { name: "Confirmation Letter",label: "Upload Confirmation Letter",inputType: "upload",required: true,validationmsg: "Upload Confirmation Letter",placeholder: "Upload Confirmation Letter",indexName: "Delivery Acknowledgement" },
     { name: "CustomerSigningDate", label: "Customer Signing Date & Time", inputType: "nofuturedates",required: true,validationmsg: "Select Customer Signing Date & Time",placeholder: "Customer Signing Date & Time", },
     { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required: true,validationmsg: "Select Request Date & Time",placeholder: "Request Date & Time" },
     //{ name: "RequestSource",label: "Request Source",inputType: "text",required: false,validationmsg: "Request Source",placeholder: "Request Source" },
     { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,placeholder: "Reason for Delayed Submission" },
     { name: "RequestorComments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
   ],
  
 },
 duplicatebond:{
  BOE_Details: [
    { name: "DispatchDate",label: "Dispatch Date",inputType: "text",required: false,validationmsg: "Dispatch date",disabled:true,placeholder:"Dispatch date" },
    { name: "DispatchMode",label: "Dispatch Mode",inputType: "text",required: false,validationmsg: "Dispatch Mode",disabled:true,placeholder:"Dispatch Mode" },
    { name: "PODNo",label: "POD No:",inputType: "text",required: false,validationmsg: "POD No:",disabled:true,placeholder:"POD No:" },
    { name: "ReceivedOn",label: "Received On",inputType: "text",required: false,validationmsg: "Received On",disabled:true,placeholder:"Received On" },
    { name: "ReceivedBy",label: "Received By",inputType: "text",required: false,validationmsg: "Received By",disabled:true,placeholder:"Received By" },
    { name: "Address",label: "View Address",inputType: "text",required: false,validationmsg: "View Address",disabled:true,placeholder:"View Address" },
    { name: "WelcomeCallDispositon",label: "Welcome Call Dispositon",inputType: "text",required: false,validationmsg: "Welcome call dispositon",disabled:true,placeholder:"Welcome call dispositon" },
    { name: "RTOStatus",label: "RTO Status",inputType: "text",required: false,validationmsg: "RTO Status",disabled:true,placeholder:"RTO Status" },
  ],
  RTOYesStatusFields:[
    { name: "RTOReason",label: "RTO Reason",inputType: "text",required: false,validationmsg: "RTO Reason",disabled:true,placeholder:"RTO Reason" },
    { name: "PolicyRedispatch",label: "Policy Redispatch",inputType: "text",required: false,validationmsg: "Policy Redispatch",disabled:true,placeholder:"Policy Redispatch" },
    { name: "RedispatchMode",label: "Re-dispatch Mode",inputType: "text",required: false,validationmsg: "Re-dispatch Mode",disabled:true,placeholder:"Re-dispatch Mode" },
    { name: "RedispatchDate",label: "Re-dispatch Date",inputType: "text",required: false,validationmsg: "Re-dispatch Date",disabled:true,placeholder:"Re-dispatch Date" },
    { name: "RePODNo",label: "POD No",inputType: "text",required: false,validationmsg: "POD No",disabled:true,placeholder:"POD No" },
    { name: "ReReceivedBy",label: "Received By",inputType: "text",required: false,validationmsg: "Received By",disabled:true,placeholder:"Received By" },
    { name: "SentToBranch",label: "Sent to Branch",inputType: "text",required: false,validationmsg: "Sent to Branch",disabled:true,placeholder:"Sent to Branch" },
    { name: "BranchName",label: "Branch Name",inputType: "text",required: false,validationmsg: "Branch Name",disabled:true,placeholder:"Branch Name" },
  ],
  RequestDuplicatePolicyBondFields:[
    { name: "ViewStampDutyCharges",label: "View Stamp Duty Charges",inputType: "link",hyperLink:true,linkValue:"Charges",required: false,validationmsg: "View Stamp Duty Charges",placeholder:"View Stamp Duty Charges" },
    { name: "StampDutyChargesReceived",label: "Stamp Duty Charges Received",inputType: "dropdown",required: true,validationmsg: "Stamp Duty Charges Received",placeholder:"Stamp Duty Charges Received" },
    { name: "UploadIndemnityBond",label: "Upload Indemnity Bond",inputType: "upload",required: true,validationmsg: "Upload Indemnity Bond",placeholder:"Upload Indemnity Bond" },
    { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
    { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
    { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
    { name: "ReasonDelayed", label: "Reason For Delayed Submission", inputType: "text",required: true,hide:true,placeholder: "Reason for Delayed Submission" },
    { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    { name: "RequestorComments",label: "Requestor Comments",inputType: "text",required: false,disabled:false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
  ],
  POS_Details:[
    { name: "StampDutyChargesReceived",label: "Stamp Duty Charges Received",inputType: "text",required: false,disabled:true,validationmsg: "Stamp Duty Charges Received",placeholder:"Stamp Duty Charges Received" },
    { name: "UploadIndemnityBond",label: "View Indemnity Bond",inputType: "link",linkValue:"View",required: false,disabled:true,validationmsg: "Indemnity Bond",placeholder:"Indemnity Bond" },
    { name: "ViewRequestForm",label: "View Request Form",inputType: "link",linkValue:"View"},
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,disabled:true,placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",required: false,disabled:true,validationmsg: "Select a Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "RequestorComments",label: "Requestor Comments",inputType: "text",disabled:true,required: false,validationmsg: "Requestor Comments",placeholder:"Requestor Comments" },
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
  ]
 }
}

const OPSInitiativeData={
  nblead:{
    BOE_Details:[
     { name: "options2",label: "Self Lead",inputType: "dropdown",required: true,validationmsg: "Select Self Lead",placeholder:"Self Lead" },
    //  { name: "PolicyNumber ",label: "Policy Number",inputType: "text",required: true,hide:true,validationmsg: "Enter Policy Number",placeholder:"Policy Number" },
     { name: "ProspectName",label: "Prospect Name",inputType: "text", hide:true, required: true,validationmsg: "Enter Prospect Name",placeholder:"Prospect Name" },
     { name: "ContactNumber",label: "Contact Number",
     inputType: "number", hide:true, pattern:'numbersOnly',required: true, maxlength:10,minlength:10, message:'Enter 10 Digits',validationmsg: "Enter Contact Number",placeholder:"Contact Number" },
    //  { name: "EmailAddress",label: "Email Address",inputType: "email",required: true,validationmsg: "Enter Email Address",placeholder:"Email Address" },
    //  { name: "SourcePolicy",label: "Source Policy",inputType: "text",required: true,validationmsg: "Enter Source Policy",placeholder:"Source Policy" },
    { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
  ]
},
fieldvisit:{
BOE_Details:[
 { name: "ReasonForFieldVisit",label: "Reason For Field Visit",inputType: "text",required: true,validationmsg: "Reason For Field Visit",placeholder:"Reason For Field Visit" },
//  { name: "ScheduledOn",label: "Scheduled On",inputType: "date",required: true,validationmsg: "Enter Scheduled On",placeholder:"Scheduled On" },
 { name: "ConductedOn",label: "Conducted On",inputType: "date",required: true,validationmsg: "Select a Conducted On",placeholder:"ConductedOn" },
//  { name: "ResultofFieldVisit",label: "Result For Field Visit",inputType: "text",required: true,validationmsg: "Enter Result For Field Visit",placeholder:"Result For Field Visit" },
{ name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
]
},
customerportalregistration:{
  BOE_Details:[
    { name: "SendCustomerPortalRegisterationlink",label: "Send Customer Portal Registeration link",inputType: "icons",required: true,validationmsg: "Send Customer Portal Registeration link" },
    { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
  ]
  
},
advisorportalregistration:{
BOE_Details:[
  { name: "SendAdvisorPortalRegistration",label: "Send Advisor Portal Registration",inputType: "icons",required: true,validationmsg: "Send Advisor Portal Registration" },
  { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
]

},
whatsappregistration:{
BOE_Details:[
  { name: "SendWhatsAppRegisterationlink",label: "Send Whats App Registeration link",inputType: "icons",required: true,validationmsg: "Send Whats App Registeration link" },
  { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
]

},
}

const CallRelatedData={
  donotcall:{
    BOE_Details:[
     { name: "MobileNumber",label: "Mobile Number",inputType: "text",disabled:true,required: false,validationmsg: "Enter Mobile Number",placeholder:"Mobile Number" },
     { name: "EmailAddress",label: "Email Address",inputType: "text",disabled:true,required: false,validationmsg: "Enter Email Address",placeholder:"Email Address" },
     { name: "AutoPayStatus",label: "Auto Debit Enabled",inputType: "text",required: false,disabled:true,validationmsg: "Enter Auto Pay Status",placeholder:"Auto Pay Status" },
    //  { name: "NoOfCallMadeInLastMonth",label: "No of Call Made in Last 30 Days",inputType: "text",disabled:true,required: false,validationmsg: "Enter No of Call Made in Last 30 Days",placeholder:"No of Call Made in Last 30 Days" },
     { name: "DNDFlag",label: "DND Flag",inputType: "text",required: false,validationmsg: "Enter DND Flag",disabled:true,placeholder:"DND Flag" },
     { name: "Action",label: "Action",inputType: "dropdown",required: false,validationmsg: "Select Action",placeholder:"Select Action" },
     { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" }
   ]
 },
//  wrongcustomercontacted:{
//       BOE_Details:[
//       //  { name: "Reasonforcalling",label: "Reason For Calling",inputType: "text",required: true,validationmsg: "Enter Reason For Calling",placeholder:"Reason For Calling" },
//       //  { name: "CallDate ",label: "Call Date",inputType: "nofuturedates",required: true,validationmsg: "Enter Call Date",placeholder:"Call Date" },
//       //  { name: "CallTime ",label: "Call Time",inputType: "time",featureTime:true,required: true,validationmsg: "Enter Call Time",placeholder:"Call Time" },
//       //  { name: "Spokewith",label: "Spoke With",inputType: "text",required: true,validationmsg: "Enter Spoke With",placeholder:"Spoke With" },
//        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
//      ]
//  },
//  callbackbusy:{
//    BOE_Details:[
//     { name: "ResoanForCalling",label: "Reason For Calling",inputType: "text",required: true,validationmsg: "Enter Reason For Calling",placeholder:"Reason For Calling" },
//     { name: "SpokeWith",label: "Spoke With",inputType: "text",required: true,validationmsg: "Enter Spoke With",placeholder:"Spoke With" },
//     { name: "CallDate",label: "Call Date",inputType: "nofuturedates",required: true,validationmsg: "Enter Call Date",placeholder:"Call Date" },
//     { name: "CallTime",label: "Call Time",inputType: "time",required: true,featureTime:true,validationmsg: "Enter Call Time",placeholder:"Call Time" },
//    //  { name: "PreferedCallBackDate",label: "Call Back Reason",inputType: "text",required: true,validationmsg: "Call Back Reason",placeholder:"Call Back Reason" },
//     { name: "PreferesCallBackDate",label: "Prefered Call Back Date",inputType: "nofuturedates",pastDate:true,required: true,validationmsg: "Prefered Call Back Date",placeholder:"Prefered Call Back Date" },
//     { name: "PreferedCallBackTime",label: "Prefered Call Back Time",inputType: "time",required: true,validationmsg: "Prefered Call Back Time",placeholder:"Prefered Call Back Time" },
//    //  {name:"texts",label:"",inputType:"texts"},
//     { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
//   ]
// },
newbussinesscallverificationdone:{
BOE_Details:[
 { name: "SpokeWith",label: "Spoke With",inputType: "text",required: true,validationmsg: "Enter Spoke With",placeholder:"Spoke With" },
 { name: "CallDate",label: "Call Date",inputType: "nofuturedates",required: true,validationmsg: "Enter Call Date",placeholder:"Call Date" },
 { name: "CallTime",label: "Call Time",inputType: "time",featureTime:true,required: true,validationmsg: "Enter Call Time",placeholder:"Call Time" },
 {name:"texts",label:"",inputType:"texts"},
 { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
]
},
systemdowntime:{
BOE_Details:[
 { name: "SpokeWith",label: "Spoke With",inputType: "text",required: true,validationmsg: "Enter Spoke With",placeholder:"Spoke With" },
 { name: "ReasonForCall",label: "Reason For Calling",inputType: "text",required: true,validationmsg: "Enter Reason For Calling",placeholder:"Reason For Calling" },
 { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
]
},
verificationnotcompleted:{
 BOE_Details:[
   { name: "ReasonForCall",label: "Reason For Calling",inputType: "text",required: true,validationmsg: "Enter Reason For Calling",placeholder:"Reason For Calling" },
   { name: "CallDate",label: "Call Date",inputType: "nofuturedates",required: true,validationmsg: "Enter Call Date",placeholder:"Call Date" },
   { name: "CallTime",label: "Call Time",inputType: "time",featureTime:true,required: true,validationmsg: "Enter Call Time",placeholder:"Call Time" },
   { name: "SpokeWith",label: "Spoke With",inputType: "text",required: true,validationmsg: "Enter Spoke With",placeholder:"Spoke With" },
   { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
 ]
},
groupinsurancecall:{
BOE_Details:[
 { name: "SpokeWith",label: "Spoke With",inputType: "text",required: true,validationmsg: "Enter Spoke With",placeholder:"Spoke With" },
 { name: "CallTime ",label: "Call Time",inputType: "texts",required: true,featureTime:true,validationmsg: "Enter Call Time",placeholder:"Call Time" },
 { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
]
},
generalinsurancecall:{
BOE_Details:[
//  { name: "MobileNumber ",label: "Enter Mobile Number",inputType: "phonenumber", pattern:'numbersOnly', required: true, maxlength:10,minlength:10, message:'Enter 10 Digits',validationmsg: "Enter Mobile Number",placeholder:"Enter Mobile Number" },
//  { name: "EmailID ",label: "Enter Email ID",inputType: "email",required: true,validationmsg: "Enter Email ID",placeholder:"Enter Email ID" },
 { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
]
},
blankcallghostcall:{
  BOE_Details:[
   { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
  ]
},
calldrop:{
BOE_Details:[
//  { name: "ReasonForCall",label: "Reason For Calling",inputType: "text",required: true,validationmsg: "Enter Reason For Calling",placeholder:"Reason For Calling" },
//  { name: "CallDate",label: "Call Date",inputType: "nofuturedates",required: true,validationmsg: "Enter Call Date",placeholder:"Call Date" },
//  { name: "CallTime",label: "Call Time",inputType: "time",required: true,featureTime:true,validationmsg: "Enter Call Time",placeholder:"Call Time" },
//  { name: "SpokeWith",label: "Spoke With",inputType: "text",required: true,validationmsg: "Enter Spoke With",placeholder:"Spoke With" },
 { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
]
},
}

const ProcessEnquiryData={
  processname:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
    
  },
  surrender:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  freelook:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  paymentrelated:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  revival:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  bankdetailupdation:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  foreclosure:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  maturityclaimnonpension:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  loan:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  claims:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  survivalbenefit:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  nomination:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  refund:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  duplicatepolicybond:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  partialwithdrawal:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  switchtopuppremiumredirectionquery:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  maturityclaimpension:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  assignment:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
  claimsreconsideration:{
    BOE_Details:[
      { name: "ProcessName",label: "Select Process Name",inputType: "dropdown",required: true,validationmsg: "Select Process Name",placeholder:"Select Process Name" },
      { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons",required: true,validationmsg: "Share Process Document" },
    ]
  },
}

const CustomerPortalData={
  loginregistrationissue:{
    BOE_Details:[
      { name: "Selectportalissue",label: "Select Portal Issue",inputType: "dropdown",required: true,validationmsg: "Select Portal Issue",placeholder:"Select Portal Issue" },
      { name: "currentcontactNo",label: "Current Contact Number",maxlength:10,minlength:10, message:'Enter 10 Digits', inputType: "phonenumber", pattern:'numbersOnly',required: true,validationmsg: "Current Contact Number",placeholder:"Current Contact Number" },
      { name: "TranInfoReceivedThrough",label: "Transaction Information Received Through",inputType: "text",required: true,validationmsg: "Enter Transaction Information Received Through",placeholder:"Transaction Information Received Through" },
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
    ]
  },
  postloginissue:{
    BOE_Details:[
      { name: "Selectportalissue",label: "Select Portal Issue",inputType: "dropdown",required: true,validationmsg: "Select Portal Issue",placeholder:"Select Portal Issue" },
      { name: "currentcontactNo",label: "Current Contact Number",maxlength:10,minlength:10, message:'Enter 10 Digits', inputType: "phonenumber", pattern:'numbersOnly',required: true,validationmsg: "Current Contact Number",placeholder:"Current Contact Number" },
      { name: "TranInfoReceivedThrough",label: "Transaction Information Received Through",inputType: "text",required: true,validationmsg: "Enter Transaction Information Received Through",placeholder:"Transaction Information Received Through" },
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
    ]
  },
  registrationissue:{
    BOE_Details:[
      { name: "Selectportalissue",label: "Select Portal Issue",inputType: "dropdown",required: true,validationmsg: "Select Portal Issue",placeholder:"Select Portal Issue" },
      { name: "currentcontactNo",label: "Current Contact Number",maxlength:10,minlength:10, message:'Enter 10 Digits', inputType: "phonenumber", pattern:'numbersOnly',required: true,validationmsg: "Current Contact Number",placeholder:"Current Contact Number" },
      { name: "TranInfoReceivedThrough",label: "Transaction Information Received Through",inputType: "text",required: true,validationmsg: "Enter Transaction Information Received Through",placeholder:"Transaction Information Received Through" },
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
    ]
  },
  statementdownloadissue:{
    BOE_Details:[
      { name: "Selectportalissue",label: "Select Portal Issue",inputType: "dropdown",required: true,validationmsg: "Select Portal Issue",placeholder:"Select Portal Issue" },
      { name: "currentcontactNo",label: "Current Contact Number",maxlength:10,minlength:10, message:'Enter 10 Digits', inputType: "phonenumber", pattern:'numbersOnly',required: true,validationmsg: "Current Contact Number",placeholder:"Current Contact Number" },
      { name: "TranInfoReceivedThrough",label: "Transaction Information Received Through",inputType: "text",required: true,validationmsg: "Enter Transaction Information Received Through",placeholder:"Transaction Information Received Through" },
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
    ]
  },
  transactionnotperformedbycustomer:{
    BOE_Details:[
      { name: "Selectportalissue",label: "Select Portal Issue",inputType: "dropdown",required: true,validationmsg: "Select Portal Issue",placeholder:"Select Portal Issue" },
      { name: "currentcontactNo",label: "Current Contact Number",maxlength:10,minlength:10, message:'Enter 10 Digits', inputType: "phonenumber", pattern:'numbersOnly',required: true,validationmsg: "Current Contact Number",placeholder:"Current Contact Number" },
      { name: "TranInfoReceivedThrough",label: "Transaction Information Received Through",inputType: "text",required: true,validationmsg: "Enter Transaction Information Received Through",placeholder:"Transaction Information Received Through" },
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
    ]
  },
}

const WebsiteData={
  navigation:{
    BOE_Details:[
      { name: "websitePortalIssue",label: "Select Portal Issue",inputType: "dropdown",required: true,validationmsg: "Select Portal Issue",placeholder:"Select Portal Issue" },
      { name: "currentcontactNo",label: "Current Contact Number",maxlength:10,minlength:10, message:'Enter 10 Digits', inputType: "phonenumber", pattern:'numbersOnly',required: true,validationmsg: "Current Contact Number",placeholder:"Current Contact Number" },
      // { name: "UpdatecontactNo",label: "Update Contact number",maxlength:10,minlength:10, message:'Enter 10 Digits', inputType: "number", pattern:'numbersOnly',required: true,validationmsg: "Update Contact number",placeholder:"Update Contact number" },
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
    ]
  },
  generalquery:{
    BOE_Details:[
      { name: "websitePortalIssue",label: "Select Portal Issue",inputType: "dropdown",required: true,validationmsg: "Select Portal Issue",placeholder:"Select Portal Issue" },
      { name: "currentcontactNo",label: "Current Contact Number",maxlength:10,minlength:10, message:'Enter 10 Digits', inputType: "phonenumber", pattern:'numbersOnly',required: true,validationmsg: "Current Contact Number",placeholder:"Current Contact Number" },
      // { name: "UpdatecontactNo",label: "Update Contact number",maxlength:10,minlength:10, message:'Enter 10 Digits', inputType: "number", pattern:'numbersOnly',required: true,validationmsg: "Update Contact number",placeholder:"Update Contact number" },
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
    ]
  },
  notresponsive:{
    BOE_Details:[
      { name: "websitePortalIssue",label: "Select Portal Issue",inputType: "dropdown",required: true,validationmsg: "Select Portal Issue",placeholder:"Select Portal Issue" },
      { name: "currentcontactNo",label: "Current Contact Number",maxlength:10,minlength:10, message:'Enter 10 Digits', inputType: "phonenumber", pattern:'numbersOnly',required: true,validationmsg: "Current Contact Number",placeholder:"Current Contact Number" },
      // { name: "UpdatecontactNo",label: "Update Contact number",maxlength:10,minlength:10, message:'Enter 10 Digits', inputType: "number", pattern:'numbersOnly',required: true,validationmsg: "Update Contact number",placeholder:"Update Contact number" },
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
    ]
  },
}

const AssignmentData={
  absoluteassignment:{
    Existing_Details:[
      { name: "PolicyOwnerName_Old",label: "Policy Owner Name",inputType: "text",disabled:true,required: false,validationmsg: "Policy Owner Name",placeholder:"Policy Owner Name" },
      { name: "PolicyOwnerClientID_Old",label: "Policy Owner Client ID",inputType: "text",disabled:true,required: false,validationmsg: "Policy Owner Client ID",placeholder:"Policy Owner Client ID" },
      { name: "AssignmentCondition_Old",label: "Assignment Condition",inputType: "text",disabled:true,required: false,validationmsg: "Assignment Condition",placeholder:"Assignment Condition" },
    ],
    Update_Details:[
      { name: "ExistingClient",label: "Existing Client",inputType: "dropdown",required: true,validationmsg: "Existing Client",placeholder:"Existing Client" },
      { name: "PolicyOwnerClientID_New",label: "Enter Client ID",inputType: "text",maxlength:8,minlength:8,hide: true,required: true,validationmsg: "Enter Client ID",placeholder:"Enter Client ID" },
      { name: "PolicyOwnerName_New",label: "Assignee Name",inputType: "text",required: true,validationmsg: "Assignee Name",placeholder:"Assignee Name" },
      { name: "AssigneeDOB",label: "Assignee DOB",inputType: "nofuturedates",required: true,disabled:false,hide:true, validationmsg: "Assignee DOB",placeholder:"DD/MM/YYYY" },
      { name: "AddressLine1",label: "Address Line 1",inputType: "text",required: true,disabled:false,hide:true, validationmsg: "Address Line 1",placeholder:"Address Line 1" },
      { name: "AddressLine2",label: "Address Line 2",inputType: "text",required: true,disabled:false,hide:true, validationmsg: "Address Line 2",placeholder:"Address Line 2" },
      { name: "AddressLine3",label: "Address Line 3",inputType: "text",required: true,disabled:false,hide:true, validationmsg: "Address Line 3",placeholder:"Address Line 3" },
      { name: "PINCode_Old",label: "Pin Code",inputType: "number", pattern:'numbersOnly', maxlength:6,minlength:6, message:'Enter 6 Digits',required: true,validationmsg: "Enter Pin Code",placeholder:"Pin Code" },
      { name: "City_Old",label: "City",inputType: "text",required: true,disabled:false,hide:true, validationmsg: "City",placeholder:"City" },
      { name: "State_Old",label: "State",inputType: "text",required: true,ddisabled:false,hide:true, validationmsg: "State",placeholder:"State" },
      { name: "AssignmentCondition_New",label: "Assignment Condition",inputType: "dropdown",required: true,validationmsg: "Assignment Condition",placeholder:"Assignment Condition" },
      { name: "PANNumber",label: "PAN ",inputType: "text",maxlength:10,minlength:10,pattern:'charactersOnly',required: true,validationmsg: "PAN Number",placeholder:"PAN Number" },
      { name: "PANValidationStatus",label: "PAN Validation Status",inputType: "text",disabled:true,required: false,validationmsg: "PAN Validation Status",placeholder:"PAN Validation Status" },
      { name: "NameinPAN",label: "Name as per PAN",inputType: "text",disabled:true, required: false,validationmsg: "PAN Number",placeholder:"PAN Name"},
      { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      // { name: "AssigneeCKYCNumber",label: "Enter Assignee CKYC Number",inputType: "text",maxlength:14,minlength:14,pattern:'charactersOnly',required: false,validationmsg: "CKYCNumber must be at least 14 characters",placeholder:"Enter Assignee CKYC Number" },
      // { name: "CKYCResult",label: "CKYC Validation Result",inputType: "text", disabled:true,placeholder:"CKYCResult"},
      { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
     // { name: "UploadIDProof",label: "Upload ID Proof",inputType: "upload",required: true,validationmsg: "Upload ID Proof",placeholder:"Upload ID Proof" },
      {name: 'UploadIDProof',label: 'Upload ID Proof',inputType: "text", linkValue:"List of Acceptable ID Proofs", required: true,validationmsg: "",disabled:false,placeholder:"Documents Uploaded - 0", indexName:"Bank Details Updation", icon:'upload'},
      {name: 'addressProof',label: 'Upload Address Proof',inputType: "text", linkValue:"List of Acceptable Address Proofs", required: true,validationmsg: "",disabled:false,placeholder:"Documents Uploaded - 0", indexName:"Bank Details Updation", icon:'upload'},
      { name: "UploadLoanSanctionLetter",label: "Upload Loan Sanction Letter",inputType: "upload",hide:true,required: true,validationmsg: "Upload Loan Sanction Letter",placeholder:"Upload Loan Sanction Letter" },
      { name: "UploadNOC",label: "Upload NOC",inputType: "upload",required: true,validationmsg: "Upload NOC",placeholder:"Upload NOC" },
      { name: "PolicyBondSubmitted",label: "Policy Bond Submitted",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "branchreceiveddate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonForDelay", label: "Reason For Delayed Submission", hide: true, inputType: "text",required:true,validationmsg:"Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
     
    ],
    Send_Medical_Reports:[
      {name: 'sendVia',label: 'Share Assignment Process',inputType: "icons" }
    ],
    POS_Details:[
      { name: "ExistingClient",label: "Existing Client",inputType: "dropdown",disabled:true, required: true,validationmsg: "Existing Client",placeholder:"Existing Client" },
      // { name: "AssignorName",label: "Assignor Name",inputType: "text",disabled:true,required: false,validationmsg: "Assignor Name",placeholder:"Assignor Name" },
      { name: "AssigneeName",label: "Assignee Name",inputType: "text",disabled:true,required: false,validationmsg: "Assignee Name",placeholder:"Assignee Name" },
     
      { name: "AssigneeDOB",label: "Assignee DOB",inputType: "text",required: false,disabled:true,hide:true, validationmsg: "Assignee DOB",placeholder:"DD/MM/YYYY" },
      { name: "AddressLine1",label: "Address Line 1",inputType: "text",required: false,disabled:true,hide:true, validationmsg: "Address Line 1",placeholder:"Address Line 1" },
      { name: "AddressLine2",label: "Address Line 2",inputType: "text",required: false,disabled:true,hide:true, validationmsg: "Address Line 2",placeholder:"Address Line 2" },
      { name: "AddressLine3",label: "Address Line 3",inputType: "text",required: false,disabled:true,hide:true, validationmsg: "Address Line 3",placeholder:"Address Line 3" },
      { name: "PINCode_Old",label: "Pin Code",inputType: "text",required: false,disabled:true,hide:true, validationmsg: "Pin Code",placeholder:"Pin Code" },
      { name: "City_Old",label: "City",inputType: "text",required: false,disabled:true,hide:true, validationmsg: "City",placeholder:"City" },
      { name: "State_Old",label: "State",inputType: "text",required: false,disabled:true,hide:true, validationmsg: "State",placeholder:"State" },
     
      { name: "AssignmentCondition_New",label: "Assignment Condition",inputType: "dropdown",disabled:true,required: false,validationmsg: "Assignment Condition",placeholder:"Assignment Condition" },
      { name: "PANNumber",label: "PAN ",inputType: "text",disabled:true,maxlength:10,minlength:10,pattern:'charactersOnly',required: false,validationmsg: "PAN Number",placeholder:"PAN Number" },
      { name: "PANValidationStatus",label: "PAN Validation Status",inputType: "text",disabled:true,required: false,validationmsg: "PAN Validation Status",placeholder:"PAN Validation Status" },
      { name: "NameinPANN",label: "Name as per PAN",inputType: "text",disabled:true, required: false,validationmsg: "PAN Number",placeholder:"PAN Name"},
      { name: "NameMatch",label: "Name Match",inputType: "radio",disabled:true,required: false,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      // { name: "AssigneeCKYCNo",label: "Assignee CKYC No",inputType: "text",disabled:true,required: false,validationmsg: "Assignee CKYC No",placeholder:"Assignee CKYC No" },
      { name: "RequestForm",label: "View Request Form",inputType: "link",linkValue:"View",required: false,validationmsg: "View Request Form",placeholder:"View Request Form" },
      { name: "IDProof",label: "ID Proof",inputType: "link",linkValue:"View",required: false,validationmsg: "ID Proof",placeholder:"ID Proof" },
      { name: "Address Proof",label: "Address Proof",inputType: "link",linkValue:"View",required: false,validationmsg: "Address Proof",placeholder:"Address Proof" },
      { name: "LoanSanctionLetter",label: "Loan Sanction Letter",inputType: "link",linkValue:"View",required: false,validationmsg: "Loan Sanction Letter",placeholder:"Loan Sanction Letter" },
      { name: "NOC",label: "NOC",inputType: "link",linkValue:"View",required: false,validationmsg: "NOC",placeholder:"NOC" },
      { name: "PolicyBondSubmitted",label: "Policy Bond Submitted",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      // { name: "OFACBannedListCheck",label: "OFAC/Banned List Check",inputType: "link",linkValue:"View",required: false,validationmsg: "OFAC/Banned List Check",placeholder:"OFAC/Banned List Check" },
      { name: "CustomerSigningDate",label: "Customer Signing Date",inputType: "text",disabled:true,required: false,validationmsg: "Customer Signing Date",placeholder:"DD/MM/YYYY" },
      { name: "BranchReceivedDate",label: "Request Received Date",inputType: "text",disabled:true,required: false,validationmsg: "Request Received Date",placeholder:"DD/MM/YYYY" },
      { name: "ReasonForDelay", label: "Reason For Delayed Submission", hide: true, disabled:true,inputType: "text",placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Signature Validated",inputType: "radio", disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "RequestorComments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,disabled:true, validationmsg: "Enter Comments",placeholder:"Comment Box" },
      { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
    ]
  },
  reassignment:{
      // BOE_Details: [
      //   { name: "NominationChangeAllowed",label: "Nomination Change Allowed ", inputType: "text",required: true,disabled:true,validationmsg: "Select Nomination Change Allowed ",placeholder:"Select" },
      // ],
      Existing_Details:[
        { name: "AssigneeName",label: "Assignee Name",inputType: "text",disabled:true,required: false,validationmsg: "Assignee Name",placeholder:"Assignee Name" },
        { name: "AssignmentCondition_New",label: "Assignment Condition",inputType: "dropdown",disabled:true,required: false,validationmsg: "Assignment Condition",placeholder:"Assignment Condition" },
        { name: "PolicyOwnerClientID_Old",label: "Policy Owner Client ID",inputType: "text",disabled:true,required: false,validationmsg: "Policy Owner Client ID",placeholder:"Policy Owner Client ID" },
      ],
      PastOwner_Details:[
        { name: "PastOwnerDetails",label: "Past Owner Details",inputType: "title"},
        // {name:"texts", lable:"", inputType: "texts"},
        { name: "PastOwnerName",label: "Past Owner Name",inputType: "text",disabled:true,required: false,validationmsg: "Past Owner Name",placeholder:"Past Owner Name" },
        { name: "PastOwnerClientID",label: "Past Owner Client ID",inputType: "text",disabled:true,required: false,validationmsg: "Past Owner Client ID",placeholder:"Past Owner Client ID" },
        { name: "PANNumber",label: "PAN Number",inputType: "text",disabled:true,required: false,validationmsg: "PAN Number",placeholder:"PAN Number" },
        { name: "CKYCNunber",label: "CKYC Number",inputType: "text",disabled:true,required: false,validationmsg: "CKYC Number",placeholder:"CKYC Number" },
      ],
      Share_Nominee_process:[
        {name: 'ShareNomineeChangeProcess',label: 'Share Nominee Change Process',inputType: "icons",required: false,validationmsg: "Share Nominee Change Process",placeholder:"Send Via" },
       
      ],
      Request_Details:[
        {name:"requestform",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form",indexName:"Change or Correction in the Nominee"},
        {name:"NocLetter",label:"NOC Letter",inputType:"upload",required:true,validationmsg:"NOC Letter",placeholder:"NOC Letter",indexName:"Change or Correction in the Nominee"},
        {name:"NomineeIDProof",label:"Nominee ID Proof",inputType:"upload",required:true,validationmsg:"Nominee ID Proof",placeholder:"Nominee ID Proof",indexName:"Change or Correction in the Nominee"},
        { name: "customersigning", label: "Customer Signing Date & Time", inputType: "nofuturedates",required: true,validationmsg: "Select Customer Signing Date & Time",placeholder: "", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required: true,validationmsg: "Select Request Received Date",placeholder: "Request Received Date" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
      ],
      ReasonSubmission:[
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
      ],
      Comments:[
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      POS_Details:[
        {name:"requestform",label:"Request Form",inputType:"link",linkValue:"View",required:true,validationmsg:"Request Form",placeholder:"Request Form"},
        {name:"NomineeIDProof",label:"Nominee ID Proof",inputType:"link",linkValue:"View",required:true,validationmsg:"Nominee ID Proof",placeholder:"Nominee ID Proof"},
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      
      ],
    },
}

const PaymentRelatedData={
  changeinmodefrequency: {
    BOE_Details:[
     { name: "ModeChangeAllowed",label: "Mode Change Allowed",inputType: "text",required: false,disabled:true,validationmsg: "Mode Change Allowed",placeholder:"Mode Change Allowed" }, 
     { name: "AllowableModeChangeOptions",label: "Allowable Mode Change Options",inputType: "text",disabled:true,required: false,validationmsg: "Allowable Mode Change Options",placeholder:"Allowable Mode Change Options" }, 
    ],
     Existing_ModeFreq_Details:[ 
      //  { name: "Mode_Old",label: "Mode",inputType: "text",required: false,disabled:true,validationmsg: "Mode",placeholder:"Mode" },
      //  { name: "ModalPremium",label: "Modal Premium",inputType: "text",required: false,disabled:true,validationmsg: "Modal Premium",placeholder:"Modal Premium" },
      //  { name: "PTD",label: "PTD",inputType: "text",required: false,validationmsg: "PTD",disabled:true, placeholder: "PTD"},
      //  { name: "PolicyDuration",label: "Policy Duration",inputType: "text",required: false,disabled:true,validationmsg: "Policy Duration", placeholder: "Policy Duration"},
      //  { name: "PersistencyMonth",label: "Persistency Month",inputType: "text",required: false,disabled:true,validationmsg: "Persistency Month",placeholder:"Persistency Month" },
      // { name: "BillGeneratedDate",label: "Bill Generated Date",inputType: "text",required: false,disabled:true,validationmsg: "Bill Generated Date",placeholder:"Bill Generated Date" },
      //  { name: "ModeChangeEffectiveDate",label: "Mode Change Effective Date",inputType: "text",required: false,disabled:true,validationmsg: "Mode Change Effective Date",placeholder:"Mode Change Effective Date" },
       { name: "ECSRequest",label: "Auto Debit Enabled",inputType: "text",required: false,validationmsg: "Auto Debit Enabled",disabled:true, placeholder: "Auto Debit Enabled"},
     //  {name:"NumberOfTimesModeChanged",label:"Number Of Times Mode Changed",inputType:"text",required:false,disabled:true,validationmsg:"Number Of Times Mode Changed",placeholder:"Number Of Times Mode Changed"},
     ],
      
     Update_ModeFreq_Details: [
             { name: "Mode_New",label: "Select New Mode",inputType: "dropdown",required: true,validationmsg: "Select New Mode",placeholder:"Select New Mode" },
             { name: "ModalPremium",label: "New Modal Premium",inputType: "text",disabled:true,required: false,validationmsg: "New Modal Premium",placeholder:"New Modal Premium" },
            //  { name: "ImpactOnCurrentPremium",label: "Impact on Current premium",inputType: "text",disabled:true,required: false,validationmsg: "", placeholder: "Impact on Current premium"},
            //  { name: "PremiumToBeCollected",label: "Premium to be collected",inputType: "text",disabled:true,required: false,validationmsg: "Premium to be collected", placeholder: "Premium to be collected"},
            //  { name: "PaymentMethod",label: "Choose Payment Method",inputType: "title",disabled:true,required: false,validationmsg: "",title:"NACH",secondTitle:"SI",radioValue:"nach",secondRadioValue:"si",},
            { name: "AnnualOutgoaspercurrentmode",label: "Annual Outgo as per current mode",inputType: "text",disabled:true,required: false,validationmsg: "Select New Mode",placeholder:"Annual Outgo as per current mode" },
            { name: "AnnualOutgoasperNewMode",label: "Annual Outgo as per New Mode",inputType: "text",disabled:true,required: false,validationmsg: "Annual Outgo as per New Mode",placeholder:"Annual Outgo as per New Mode" },
            { name: "Difference",label: "Difference",inputType: "text",disabled:true,required: false,validationmsg: "Difference",placeholder:"Difference" },
           ],
           Send_ModeChange_Link:[
            { name: "SendModeChangeLink",label: "Send  NACH Link",inputType: "icons"},
          ],
     NACH_Details:[
       { name: "BankIFSC",label: "IFSC",inputType: "text",required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
       { name: "NameAsMentionedInTheBank",label: "Bank Name",inputType: "text",required: false,validationmsg: "Bank Name", placeholder: "Bank Name"},
       { name: "AccountHolderName",label: "Account Holder Name",inputType: "text",required: false,validationmsg: "Account Holder Name", placeholder: "Account Holder Name"},
       { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Bank Account Number", placeholder: "Bank Account Number"},
       { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Confirm Bank Account Number", placeholder: "Confirm Bank Account Number"},
       { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
       { name: "PreferredDebitDate",label: "Preferred Debit Date",inputType: "dropdown",required: false,validationmsg: "Preferred Debit Date", placeholder: "Preferred Debit Date"},
       { name: "UploadBankAccountProof",label: "Upload Bank Account Proof",inputType: "upload",required: false,validationmsg: "Upload Bank Account Proof", placeholder: "Upload Bank Account Proof"},
     ],
     SI_Details:[
       { name: "CardNumber",label: "Card Number",inputType: "text",required: false,minlength:16,maxlength:16,pattern:'numbersOnly',validationmsg: "Card Number", placeholder: "Card Number"},
       { name: "ReEnterCardNumber",label: "Re-enter Card Number",inputType: "text",minlength:16,maxlength:16,pattern:'numbersOnly',required: false,validationmsg: "Re-enter Card Number", placeholder: "Re-enter Card Number"},
       { name: "BankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "Bank Name", placeholder: "Bank Name"},
       { name: "CardType",label: "Card Type",inputType: "dropdown",required: false,validationmsg: "Card Type", placeholder: "Card Type"},
       { name: "PreferredDebitDate",label: "Preferred Debit Date",inputType: "dropdown",required: false,validationmsg: "Preferred Debit Date", placeholder: "Preferred Debit Date"},
       { name: "ExpiryDate",label: "Expiry Date",inputType: "text",required: false,validationmsg: "Expiry Date", placeholder: "Expiry Date"},
       // { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
     ],
     Monthly_MAND_NACH_Details:[
       { name: "BankIFSC",label: "IFSC",inputType: "text",required: true,validationmsg: "Enter a IFSC", placeholder: "IFSC"},
       { name: "NameAsMentionedInTheBank",label: "Bank Name",inputType: "text",required: true,validationmsg: "Enter a Bank Name", placeholder: "Bank Name"},
       { name: "AccountHolderName",label: "Account Holder Name",inputType: "text",required: true,validationmsg: "Enter a Account Holder Name", placeholder: "Account Holder Name"},
       { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Bank Account Number", placeholder: "Bank Account Number"},
       { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Confirm Bank Account Number", placeholder: "Confirm Bank Account Number"},
       { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: true,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
       { name: "PreferredDebitDate",label: "Preferred Debit Date",inputType: "dropdown",required: true,validationmsg: "Preferred Debit Date", placeholder: "Preferred Debit Date"},
       { name: "UploadBankAccountProof",label: "Upload Bank Account Proof",inputType: "upload",required: true,validationmsg: "Upload Bank Account Proof", placeholder: "Upload Bank Account Proof"},
     ],
     Monthly_MAND_SI_Details:[
       { name: "CardNumber",label: "Card Number",inputType: "text",required: true,minlength:16,maxlength:16,pattern:'numbersOnly',validationmsg: "Enter a Card Number", placeholder: "Card Number"},
       { name: "ReEnterCardNumber",label: "Re-enter Card Number",inputType: "text",minlength:16,maxlength:16,pattern:'numbersOnly',required: true,validationmsg: "Enter a Re-enter Card Number", placeholder: "Re-enter Card Number"},
       { name: "BankName",label: "Bank Name",inputType: "text",required: true,validationmsg: "Enter a Bank Name", placeholder: "Bank Name"},
       { name: "CardType",label: "Card Type",inputType: "dropdown",required: true,validationmsg: "Card Type", placeholder: "Card Type"},
       { name: "PreferredDebitDate",label: "Preferred Debit Date",inputType: "dropdown",required: true,validationmsg: "Preferred Debit Date", placeholder: "Preferred Debit Date"},
       { name: "ExpiryDate",label: "Expiry Date",inputType: "text",required: true,validationmsg: "Expiry Date", placeholder: "Expiry Date"},
       // { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
     ],
     Customer_Choice_Details:[
       { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,validationmsg: "Select Customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
     ],
     Request_Details:[
       {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
       { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
       { name: "branchreceiveddate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
       { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:false,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
       { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       
     ],
     Comments:[
       { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
     ],
     
     POS_Details:[
       { name: "Mode_New",label: "New Mode Selected",inputType: "text",required: false,disabled:true,validationmsg: "New Mode Selected", placeholder: "New Mode Selected"},
       { name: "ModalPremium",label: "New Modal Premium",inputType: "text",required: false,disabled:true,validationmsg: "New Modal Premium", placeholder: "New Modal Premium"},
      //  { name: "ImpactOnCurrentPremium",label: "Impact on Current Premium",inputType: "text",disabled:true,required: false,validationmsg: "Impact on Current Premium", placeholder: "Impact on Current Premium"},
       { name: "MandateRegisterationStatus",label: "Mandate Registeration Status",inputType: "text", hide: true,disabled:true,required: false,validationmsg: "Mandate Registeration Status", placeholder: "Mandate Registeration Status"},
       { name: "RequestIDNumber",label: "Request ID Number",inputType: "text",disabled:true,placeholder: "Request ID Number"},
      //  { name: "texts",label: "",inputType: "texts"},
       { name: "RequestForm",label: "Request Form",inputType: "link",linkValue:"View",hide:false,required: false,validationmsg: "Request Form", placeholder: "Request Form"},
       { name: "CustomerSigningDate",label: "Customer Signing Date",inputType: "text",hide:false,disabled:true,required: false,validationmsg: "Customer Signing Date", placeholder: "DD/MM/YYYY"},
       { name: "BranchReceivedDate",label: "Request Received Date",inputType: "text",hide:false,disabled:true,required: false,validationmsg: "Request Received Date", placeholder: "DD/MM/YYYY"},
       { name: "ReasonForDelay",label: "Reason For Delayed Submission",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Reason For Delayed Submission", placeholder: "Reason For Delayed Submission"},
       { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",disabled:true,required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       { name: "Comments",label: "Requestor Comments",inputType: "text",required: false,disabled:true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
       { name: "POSComments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,disabled:false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
     ]
   },
   paymentlink: {
     isShowBOE: true,
     isPOSScreen: false,
     hideRequestDetails: true,
     hideChecklist: true,
     isHideRequirementBtn: true,
     showEmailFields: true,
     BOE_Details: [
       {name: 'totalPremiumDue',label: 'Total Premium Due',inputType: "text", linkValue:"Click for details", required: false,validationmsg: "Total Premium Due is Missing",disabled:true,placeholder:"Total Premium Due" },
       {name: 'interestamt',label: 'Interest Amount',inputType: "texts",required: false,validationmsg: "",disabled:true,placeholder:"Interest Amount" },
       {name: 'sendpaymentlink2',label: 'Share payment link',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" }
     ],
   },
  newmandateregistration: {
    // Existing_Details: [
    //   { name: "PaymentMethod",label: "Choose Payment Method",inputType: "title",disabled:true,required: false,validationmsg: "",title:"NACH",secondTitle:"SI",radioValue:"nach",secondRadioValue:"si",},
    // ],
   
NACH_Details:[
{ name: "PaymentMethod",label: "Payment Method",inputType: "dropdown",disabled:true,required: false,validationmsg: "Payment Method", placeholder: "Payment Method"},


{ name: "NACHStatus",label: "NACH Status",hide:false, inputType: "text",disabled:true,required: false,validationmsg: "", placeholder:"NACH Status" },
{ name: "RegisteredOn",label: "Registered on",inputType: "text",hide:false,disabled:true,required: false,validationmsg: "Registered on", placeholder: "Registered on"},
{ name: "BankName",label: "Bank Name",hide:false,inputType: "text",disabled:true,required: false,validationmsg: "Bank Name", placeholder: "Bank Name"},
{ name: "BankAccountNumber",label: "Bank Account Number",hide:false,disabled:true,inputType:"number", pattern:'numbersOnly',required: false,validationmsg: "Enter a Bank Account Number", placeholder: "Bank Account Number"},
{ name: "BankIFSC",label: "Bank IFSC",inputType: "text",hide:false,disabled:true,required: false,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
{ name: "PreferredDebitDate",label: "Preferred Debit Day",hide:false,inputType: "dropdown",disabled:true,required: false,validationmsg: "Preferred Debit Day", placeholder: "Preferred Debit Day"},
{ name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",hide:false,disabled:true, required: false,validationmsg: "", placeholder:"Max debit amt" },
{ name: "NACHValidTill",label: "NACH valid till",hide:false,inputType: "text",disabled:true,required: false,validationmsg: "NACH valid till", placeholder: "NACH valid till"},


// { name: "LastThreeDebitDate",label: "Last 3 debit date",hide:false, inputType: "text",required: true,validationmsg: "", placeholder:"Last 3 debit date" },
// { name: "LastThreeDebitStatus",label: "Last 3 debit status",hide:false,inputType: "text",required: false,validationmsg: "Last 3 debit status", placeholder: "Last 3 debit status"},

// // { name: "BankName",label: "Bank Name",inputType: "text",hide:false,required: false,validationmsg: "Bank Name", placeholder: "Bank Name"},
// { name: "CardType",label: "Card Type",inputType: "dropdown",hide:false,required: false,validationmsg: "Card Type", placeholder: "Card Type"},
// { name: "CardNumber",label: "Card Number",inputType: "text",hide:false,required: false,validationmsg: "Card Number", placeholder: "Card Number"},
// { name: "SIStatus",label: "SI Status",inputType: "text",hide:false,required: true,validationmsg: "", placeholder:"SI Status" },
],
SI_Details:[


// { name: "Registeredon",label: "Registered on",inputType: "text",required: false,validationmsg: "Registered on", placeholder: "Registered on"},

// { name: "PreferredDebitDate",label: "Preferred Debit Date",inputType: "dropdown",required: false,validationmsg: "Preferred Debit Date", placeholder: "Preferred Debit Date"},
// { name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",required: true,validationmsg: "", placeholder:"Max debit amt" },
// { name: "SI valid till",label: "SI valid till",inputType: "text",required: false,validationmsg: "SI valid till", placeholder: "SI valid till"},
// { name: "Last 3 debit date",label: "Last 3 debit date",inputType: "text",required: true,validationmsg: "", placeholder:"Last 3 debit date" },
// { name: "Last 3 debit status",label: "Last 3 debit status",inputType: "text",required: false,validationmsg: "Last 3 debit status", placeholder: "Last 3 debit status"},
],
Send_ModeChange_Link:[
  { name: "SendModeChangeLink",label: "Send New Mandate Registration Link",inputType: "icons"},
],



POS_Details:[
  { name: "PaymentMethod",label: "Payment Method",inputType: "dropdown",required: false,validationmsg: "Payment Method", placeholder: "Payment Method"},
  
  
  { name: "NACHStatus",label: "NACH Status",hide:false, inputType: "text",required: true,validationmsg: "", placeholder:"NACH Status" },
  { name: "RegisteredOn",label: "Registered on",inputType: "text",hide:false,required: false,validationmsg: "Registered on", placeholder: "Registered on"},
  { name: "BankName",label: "Bank Name",hide:false,inputType: "text",required: false,validationmsg: "Bank Name", placeholder: "Bank Name"},
  { name: "BankAccountNumber",label: "Bank Account Number",hide:false,inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Bank Account Number", placeholder: "Bank Account Number"},
  { name: "BankIFSC",label: "Bank IFSC",inputType: "text",hide:false,required: true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
  { name: "PreferredDebitDate",label: "Preferred Debit Day",hide:false,inputType: "dropdown",required: false,validationmsg: "Preferred Debit Day", placeholder: "Preferred Debit Day"},
  { name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",hide:false, required: true,validationmsg: "", placeholder:"Max debit amt" },
  { name: "NACHValidTill",label: "NACH valid till",hide:false,inputType: "text",required: false,validationmsg: "NACH valid till", placeholder: "NACH valid till"},
  
  
  // { name: "LastThreeDebitDate",label: "Last 3 debit date",hide:false, inputType: "text",required: true,validationmsg: "", placeholder:"Last 3 debit date" },
  // { name: "LastThreeDebitStatus",label: "Last 3 debit status",hide:false,inputType: "text",required: false,validationmsg: "Last 3 debit status", placeholder: "Last 3 debit status"},
  
  // // { name: "BankName",label: "Bank Name",inputType: "text",hide:false,required: false,validationmsg: "Bank Name", placeholder: "Bank Name"},
  // { name: "CardType",label: "Card Type",inputType: "dropdown",hide:false,required: false,validationmsg: "Card Type", placeholder: "Card Type"},
  // { name: "CardNumber",label: "Card Number",inputType: "text",hide:false,required: false,validationmsg: "Card Number", placeholder: "Card Number"},
  // { name: "SIStatus",label: "SI Status",inputType: "text",hide:false,required: true,validationmsg: "", placeholder:"SI Status" },
  ],
  },
  holdecsmandate: {
    BOE_Details:[
      { name: "PaymentMethod",label: "Payment Method",inputType: "text",required: false,disabled:true,validationmsg: "",  placeholder:"Payment Method" },
    ],
    Send_ModeChange_Link:[
            { name: "SendModeChangeLink",label: "Send  NACH Link",inputType: "icons"},
          ],
     NACH_Details:[
      { name: "NACHStatus",label: "NACH Status",inputType: "text",required: false,disabled:true,validationmsg: "NACH Status",  placeholder:"NACH Status" },
      { name: "RegisteredOn",label: "Registered on",inputType: "text",required: false,disabled:true,validationmsg: "Registered on",  placeholder:"Registered on" },
      { name: "BankName",label: "Bank Name",inputType: "text",required: false,disabled:true,validationmsg: "Bank Name", placeholder: "Bank Name"},
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number", pattern:'numbersOnly',required: false,disabled:true,validationmsg: "Enter a Bank Account Number", placeholder: "Bank Account Number"},
      { name: "BankIFSC",label: "IFSC",inputType: "text",required: false,disabled:true,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
      //  { name: "AccountHolderName",label: "Account Holder Name",inputType: "text",required: false,validationmsg: "Account Holder Name", placeholder: "Account Holder Name"},
      //  { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Confirm Bank Account Number", placeholder: "Confirm Bank Account Number"},
      //  { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
       { name: "PreferredDebitDate",label: "Preferred Debit Day",inputType: "text",required: false,disabled:true,validationmsg: "Preferred Debit Day", placeholder: "Preferred Debit Day"},
       { name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",required: false,disabled:true,validationmsg: "Max debit amt", placeholder:"Max debit amt" },
       { name: "NACHValidTill",label: "NACH valid till",inputType: "text",required: false,disabled:true,validationmsg: "NACH valid till",   placeholder:"NACH valid till" },
      //  { name: "Last3debitdate",label: "Last 3 debit date",inputType: "text",required: false,disabled:true,validationmsg: "Last 3 debit date",  placeholder:"Last 3 debit date" },
      //  { name: "Last3debitstatus",label: "Last 3 debit status",inputType: "text",required: false,disabled:true,validationmsg: "Last 3 debit status", placeholder:"Last 3 debit status" },
      ],
     SI_Details:[
      { name: "BankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "Bank Name", placeholder: "Bank Name"},
      { name: "CardType",label: "Card Type",inputType: "dropdown",required: false,validationmsg: "Card Type", placeholder: "Card Type"},
       { name: "CardNumber",label: "Card Number",inputType: "text",required: false,minlength:16,maxlength:16,pattern:'numbersOnly',validationmsg: "Card Number", placeholder: "Card Number"},
    //   { name: "ReEnterCardNumber",label: "Re-enter Card Number",inputType: "text",minlength:16,maxlength:16,pattern:'numbersOnly',required: false,validationmsg: "Re-enter Card Number", placeholder: "Re-enter Card Number"},
    { name: "Registeredon",label: "Registered on",inputType: "text",required: true,validationmsg: "Registered on",  placeholder:"Registered on" },
    { name: "SIStatus",label: "SI Status",inputType: "text",required: true,validationmsg: "SI Status",  placeholder:"SI Status" },
    { name: "PreferredDebitDate",label: "Preferred Debit Day",inputType: "dropdown",required: false,validationmsg: "Preferred Debit Day", placeholder: "Preferred Debit Day"},
       { name: "ExpiryDate",label: "Expiry Date",inputType: "text",required: false,validationmsg: "Expiry Date", placeholder: "Expiry Date"},
       // { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
       { name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",required: true,validationmsg: "Max debit amt", placeholder:"Max debit amt" },
       { name: "SIvalidtill",label: "SI valid till",inputType: "text",required: true,validationmsg: "SI valid till",   placeholder:"SI valid till" },
      //  { name: "Last3debitdate",label: "Last 3 debit date",inputType: "text",required: true,validationmsg: "Last 3 debit date",  placeholder:"Last 3 debit date" },
      //  { name: "Last3debitstatus",label: "Last 3 debit status",inputType: "text",required: true,validationmsg: "Last 3 debit status", placeholder:"Last 3 debit status" },
      ],
      Register_HOLD_Request: [
        { name: "DueDate",label: "Due Date",inputType: "text",required: false,disabled:true,validationmsg: "Due Date", placeholder:"Due Date" },
        { name: "FilesenttoBankdate",label: "File sent to Bank date",inputType: "text",required: false,disabled:true,validationmsg: "File sent to Bank date",   placeholder:"File sent to Bank date" },
        { name: "HoldPossibleForCurrentDue",label: "Hold possible for current due",inputType: "text",required: false,disabled:true,validationmsg: "Hold possible for current due",  placeholder:"Hold possible for current due" },
        { name: "Reason",label: "Reason",inputType: "text",required: true,validationmsg: "Reason", placeholder:"Reason" },
      ],
     Customer_Choice_Details:[
       { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,validationmsg: "Select Customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
     ],
     Request_Details:[
       {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
       { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
       { name: "branchreceiveddate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
       { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
       { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       
     ],
     Comments:[
       { name: "RequestorComments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
     ],
     
     POS_Details:[
      {name:"name",label:"View Current Mandate Details",inputType:"title"},
      {name:"name",label:"View Current Mandate Details",inputType:"texts"},
      { name: "NACHStatus",label: "NACH Status",inputType: "text",required: false,disabled:true,validationmsg: "NACH Status",  placeholder:"NACH Status" },
      { name: "RegisteredOn",label: "Registered on",inputType: "text",required: false,disabled:true,validationmsg: "Registered on",  placeholder:"Registered on" },
      { name: "BankName",label: "Bank Name",inputType: "text",required: false,disabled:true,validationmsg: "Bank Name", placeholder: "Bank Name"},
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number",disabled:true, pattern:'numbersOnly',required: false,validationmsg: "Enter a Bank Account Number", placeholder: "Bank Account Number"},
      { name: "BankIFSC",label: "IFSC",inputType: "text",required: false,validationmsg: "", disabled:true, pattern:'charactersOnly', placeholder:"Bank IFSC" },
      //  { name: "AccountHolderName",label: "Account Holder Name",inputType: "text",required: false,validationmsg: "Account Holder Name", placeholder: "Account Holder Name"},
      //  { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Confirm Bank Account Number", placeholder: "Confirm Bank Account Number"},
      //  { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
       { name: "PreferredDebitDate",label: "Preferred Debit Day",inputType: "text",disabled:true,required: false,validationmsg: "Preferred Debit Day", placeholder: "Preferred Debit Day"},
       { name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",disabled:true,required: false,validationmsg: "Max debit amt", placeholder:"Max debit amt" },
       { name: "NACHValidTill",label: "NACH valid till",inputType: "text",disabled:true,required: false,validationmsg: "NACH valid till",   placeholder:"NACH valid till" },
      //  { name: "Last3debitdate",label: "Last 3 debit date",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit date",  placeholder:"Last 3 debit date" },
      //  { name: "Last3debitstatus",label: "Last 3 debit status",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit status", placeholder:"Last 3 debit status" },
       { name: "DueDate",label: "Due Date",inputType: "text",required: false,disabled:true,validationmsg: "Due Date", placeholder:"Due Date" },
       { name: "FilesenttoBankdate",label: "File sent to Bank date",inputType: "text",disabled:true,required: false,validationmsg: "File sent to Bank date",   placeholder:"File sent to Bank date" },
       { name: "HoldPossibleForCurrentDue",label: "Cancel Possible for current due",inputType: "text",disabled:true,required: false,validationmsg: "Cancel Possible for current due",  placeholder:"Cancel Possible for current due" },
       { name: "Reason",label: "Reason For Cancellation",inputType: "text",disabled:true,required: false,validationmsg: "Reason For Cancellation", placeholder:"Reason For Cancellation" },
       { name: "RequestForm",label: "Request Form",inputType: "link",linkValue:"View",hide:true,required: false,validationmsg: "Request Form", placeholder: "Request Form"},
       { name: "CustomerSigningDate",label: "Customer Signing Date",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Customer Signing Date", placeholder: "DD/MM/YYYY"},
       { name: "BranchReceivedDate",label: "Request Received Date",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Request Received Date", placeholder: "DD/MM/YYYY"},
       { name: "ReasonForDelay",label: "Reason For Delayed Submission",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Reason For Delayed Submission", placeholder: "Reason For Delayed Submission"},
       { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",hide:true,disabled:true,required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       { name: "RequestorComments",label: "Requestor Comments",inputType: "text",required: false,hide:true,disabled:true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
       { name: "POSComments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,disabled:false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
     ]
   },
   mandatecancellation: {
    BOE_Details:[
      { name: "PaymentMethod",label: "Payment Method",inputType: "text",required: false,disabled:true,validationmsg: "",  placeholder:"Payment Method" },
    ],
     NACH_Details:[
      { name: "NACHStatus",label: "NACH Status",inputType: "text",required: false,disabled:true,validationmsg: "NACH Status",  placeholder:"NACH Status" },
      { name: "RegisteredOn",label: "Registered on",inputType: "text",required: false,disabled:true,validationmsg: "Registered on",  placeholder:"Registered on" },
      { name: "BankName",label: "Bank Name",inputType: "text",required: false,disabled:true,validationmsg: "Bank Name", placeholder: "Bank Name"},
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number",disabled:true, pattern:'numbersOnly',required: false,validationmsg: "Enter a Bank Account Number", placeholder: "Bank Account Number"},
      { name: "BankIFSC",label: "IFSC",inputType: "text",required: false,validationmsg: "", disabled:true, pattern:'charactersOnly', placeholder:"Bank IFSC" },
      //  { name: "AccountHolderName",label: "Account Holder Name",inputType: "text",required: false,validationmsg: "Account Holder Name", placeholder: "Account Holder Name"},
      //  { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Confirm Bank Account Number", placeholder: "Confirm Bank Account Number"},
      //  { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
       { name: "PreferredDebitDate",label: "Preferred Debit Day",inputType: "text",disabled:true,required: false,validationmsg: "Preferred Debit Date", placeholder: "Preferred Debit Day"},
       { name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",disabled:true,required: false,validationmsg: "Max debit amt", placeholder:"Max debit amt" },
       { name: "NACHValidTill",label: "NACH valid till",inputType: "text",disabled:true,required: false,validationmsg: "NACH valid till",   placeholder:"NACH valid till" },
      //  { name: "Last3debitdate",label: "Last 3 debit date",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit date",  placeholder:"Last 3 debit date" },
      //  { name: "Last3debitstatus",label: "Last 3 debit status",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit status", placeholder:"Last 3 debit status" },
      ],
    
      Register_HOLD_Request: [
        { name: "DueDate",label: "Due Date",inputType: "text",required: false,disabled:true,validationmsg: "Due Date", placeholder:"Due Date" },
        { name: "FilesenttoBankdate",label: "File sent to Bank date",inputType: "text",disabled:true,required: false,validationmsg: "File sent to Bank date",   placeholder:"File sent to Bank date" },
        { name: "HoldPossibleForCurrentDue",label: "Cancel Possible for current due",inputType: "text",disabled:true,required: false,validationmsg: "Cancel Possible for current due",  placeholder:"Cancel Possible for current due" },
        { name: "Reason",label: "Reason For Cancellation",inputType: "text",disabled:false,required: true,validationmsg: "Reason For Cancellation", placeholder:"Reason For Cancellation" },
      ],
     Customer_Choice_Details:[
       { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,validationmsg: "Select Customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
     ],
     Request_Details:[
       {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
       { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
       { name: "branchreceiveddate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
       { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:false,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
       { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       
     ],
     Comments:[
       { name: "RequestorComments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
     ],
     
     POS_Details:[
      {name:"name",label:"View Current Mandate Details",inputType:"title"},
      {name:"name",label:"",inputType:"texts"},
      { name: "NACHStatus",label: "NACH Status",inputType: "text",required: false,disabled:true,validationmsg: "NACH Status",  placeholder:"NACH Status" },
      { name: "RegisteredOn",label: "Registered on",inputType: "text",required: false,disabled:true,validationmsg: "Registered on",  placeholder:"Registered on" },
      { name: "BankName",label: "Bank Name",inputType: "text",required: false,disabled:true,validationmsg: "Bank Name", placeholder: "Bank Name"},
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number",disabled:true, pattern:'numbersOnly',required: false,validationmsg: "Enter a Bank Account Number", placeholder: "Bank Account Number"},
      { name: "BankIFSC",label: "IFSC",inputType: "text",required: false,validationmsg: "", disabled:true, pattern:'charactersOnly', placeholder:"Bank IFSC" },
      //  { name: "AccountHolderName",label: "Account Holder Name",inputType: "text",required: false,validationmsg: "Account Holder Name", placeholder: "Account Holder Name"},
      //  { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Confirm Bank Account Number", placeholder: "Confirm Bank Account Number"},
      //  { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
       { name: "PreferredDebitDate",label: "Preferred Debit Day",inputType: "text",disabled:true,required: false,validationmsg: "Preferred Debit Day", placeholder: "Preferred Debit Day"},
       { name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",disabled:true,required: false,validationmsg: "Max debit amt", placeholder:"Max debit amt" },
       { name: "NACHValidTill",label: "NACH valid till",inputType: "text",disabled:true,required: false,validationmsg: "NACH valid till",   placeholder:"NACH valid till" },
      //  { name: "Last3debitdate",label: "Last 3 debit date",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit date",  placeholder:"Last 3 debit date" },
      //  { name: "Last3debitstatus",label: "Last 3 debit status",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit status", placeholder:"Last 3 debit status" },
       { name: "DueDate",label: "Due Date",inputType: "text",required: false,disabled:true,validationmsg: "Due Date", placeholder:"Due Date" },
       { name: "FilesenttoBankdate",label: "File sent to Bank date",inputType: "text",disabled:true,required: false,validationmsg: "File sent to Bank date",   placeholder:"File sent to Bank date" },
       { name: "HoldPossibleForCurrentDue",label: "Cancel Possible for current due",inputType: "text",disabled:true,required: false,validationmsg: "Cancel Possible for current due",  placeholder:"Cancel Possible for current due" },
       { name: "Reason",label: "Reason For Cancellation",inputType: "text",disabled:true,required: false,validationmsg: "Reason For Cancellation", placeholder:"Reason For Cancellation" },
       { name: "RequestForm",label: "Request Form",inputType: "link",linkValue:"View",hide:true,required: false,validationmsg: "Request Form", placeholder: "Request Form"},
       { name: "CustomerSigningDate",label: "Customer Signing Date",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Customer Signing Date", placeholder: "DD/MM/YYYY"},
       { name: "BranchReceivedDate",label: "Request Received Date",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Request Received Date", placeholder: "DD/MM/YYYY"},
       { name: "ReasonForDelay",label: "Reason For Delayed Submission",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Reason For Delayed Submission", placeholder: "Reason For Delayed Submission"},
       { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",disabled:true,hide:true,required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       { name: "RequestorComments",label: "Requestor Comments",inputType: "text",required: false,disabled:true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
       { name: "POSComments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,disabled:false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
     ]
   },
   restartmandate: {
    BOE_Details:[
      { name: "PaymentMethod",label: "Payment Method",inputType: "text",required: false,disabled:true,validationmsg: "",  placeholder:"Payment Method" },
    ],
     NACH_Details:[
      { name: "NACHStatus",label: "NACH Status",inputType: "text",required: false,disabled:true,validationmsg: "NACH Status",  placeholder:"NACH Status" },
      { name: "RegisteredOn",label: "Registered on",inputType: "text",required: false,disabled:true,validationmsg: "Registered on",  placeholder:"Registered on" },
      { name: "BankName",label: "Bank Name",inputType: "text",required: false,disabled:true,validationmsg: "Bank Name", placeholder: "Bank Name"},
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number",disabled:true, pattern:'numbersOnly',required: false,validationmsg: "Enter a Bank Account Number", placeholder: "Bank Account Number"},
      { name: "BankIFSC",label: "IFSC",inputType: "text",required: false,validationmsg: "", disabled:true, pattern:'charactersOnly', placeholder:"Bank IFSC" },
      //  { name: "AccountHolderName",label: "Account Holder Name",inputType: "text",required: false,validationmsg: "Account Holder Name", placeholder: "Account Holder Name"},
      //  { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Confirm Bank Account Number", placeholder: "Confirm Bank Account Number"},
      //  { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
       { name: "PreferredDebitDate",label: "Preferred Debit Day",inputType: "text",disabled:true,required: false,validationmsg: "Preferred Debit Day", placeholder: "Preferred Debit Day"},
       { name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",disabled:true,required: false,validationmsg: "Max debit amt", placeholder:"Max debit amt" },
       { name: "NACHValidTill",label: "NACH valid till",inputType: "text",disabled:true,required: false,validationmsg: "NACH valid till",   placeholder:"NACH valid till" },
      //  { name: "Last3debitdate",label: "Last 3 debit date",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit date",  placeholder:"Last 3 debit date" },
      //  { name: "Last3debitstatus",label: "Last 3 debit status",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit status", placeholder:"Last 3 debit status" },
      ],
     SI_Details:[
      { name: "NameAsMentionedInTheBank",label: "Bank Name",inputType: "text",required: false,validationmsg: "Bank Name", placeholder: "Bank Name"},
      { name: "CardType",label: "Card Type",inputType: "dropdown",required: false,validationmsg: "Card Type", placeholder: "Card Type"},
       { name: "CardNumber",label: "Card Number",inputType: "text",required: false,minlength:16,maxlength:16,pattern:'numbersOnly',validationmsg: "Card Number", placeholder: "Card Number"},
    //   { name: "ReEnterCardNumber",label: "Re-enter Card Number",inputType: "text",minlength:16,maxlength:16,pattern:'numbersOnly',required: false,validationmsg: "Re-enter Card Number", placeholder: "Re-enter Card Number"},
    { name: "Registeredon",label: "Registered on",inputType: "text",required: false,validationmsg: "Registered on",  placeholder:"Registered on" },
    { name: "SIStatus",label: "SI Status",inputType: "text",required: false,validationmsg: "SI Status",  placeholder:"SI Status" },
    { name: "PreferredDebitDate",label: "Preferred Debit Day",inputType: "dropdown",required: false,validationmsg: "Preferred Debit Day", placeholder: "Preferred Debit Day"},
       { name: "ExpiryDate",label: "Expiry Date",inputType: "text",required: false,validationmsg: "Expiry Date", placeholder: "Expiry Date"},
       // { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
       { name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",required: false,validationmsg: "Max debit amt", placeholder:"Max debit amt" },
       { name: "SIvalidtill",label: "SI valid till",inputType: "text",required: false,validationmsg: "SI valid till",   placeholder:"SI valid till" },
      //  { name: "Last3debitdate",label: "Last 3 debit date",inputType: "text",required: false,validationmsg: "Last 3 debit date",  placeholder:"Last 3 debit date" },
      //  { name: "Last3debitstatus",label: "Last 3 debit status",inputType: "text",required: false,validationmsg: "Last 3 debit status", placeholder:"Last 3 debit status" },
      ],
      Register_HOLD_Request: [
        { name: "DueDate",label: "Due Date",inputType: "text",required: false,disabled:true,validationmsg: "Due Date", placeholder:"Due Date" },
        { name: "HoldPossibleForCurrentDue",label: "Activation Possible for Current Due",inputType: "text",disabled:true,required: false,validationmsg: "Activation Possible for Current Due",   placeholder:"Activation Possible for Current Due" },
        { name: "Reason",label: "Reason For Re-Start",inputType: "text",disabled:false,required: true,validationmsg: "Reason For Re-Start", placeholder:"Reason For Re-Start" },
      ],
     Customer_Choice_Details:[
       { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,validationmsg: "Select Customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
     ],
     Request_Details:[
       {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
       { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
       { name: "branchreceiveddate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
       { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
       { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       
     ],
     Comments:[
       { name: "RequestorComments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
     ],
     
     POS_Details:[
      {name:"name",label:"View Current Mandate Details",inputType:"title"},
      {name:"name",label:"",inputType:"texts"},
      { name: "NACHStatus",label: "NACH Status",inputType: "text",required: false,disabled:true,validationmsg: "NACH Status",  placeholder:"NACH Status" },
      { name: "RegisteredOn",label: "Registered on",inputType: "text",required: false,disabled:true,validationmsg: "Registered on",  placeholder:"Registered on" },
      { name: "BankName",label: "Bank Name",inputType: "text",required: false,disabled:true,validationmsg: "Bank Name", placeholder: "Bank Name"},
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number",disabled:true, pattern:'numbersOnly',required: false,validationmsg: "Enter a Bank Account Number", placeholder: "Bank Account Number"},
      { name: "BankIFSC",label: "IFSC",inputType: "text",required: false,validationmsg: "", disabled:true, pattern:'charactersOnly', placeholder:"Bank IFSC" },
      //  { name: "AccountHolderName",label: "Account Holder Name",inputType: "text",required: false,validationmsg: "Account Holder Name", placeholder: "Account Holder Name"},
      //  { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Confirm Bank Account Number", placeholder: "Confirm Bank Account Number"},
      //  { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
       { name: "PreferredDebitDate",label: "Preferred Debit Day",inputType: "text",disabled:true,required: false,validationmsg: "Preferred Debit Day", placeholder: "Preferred Debit Day"},
       { name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",disabled:true,required: false,validationmsg: "Max debit amt", placeholder:"Max debit amt" },
       { name: "NACHValidTill",label: "NACH valid till",inputType: "text",disabled:true,required: false,validationmsg: "NACH valid till",   placeholder:"NACH valid till" },
      //  { name: "Last3debitdate",label: "Last 3 debit date",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit date",  placeholder:"Last 3 debit date" },
      //  { name: "Last3debitstatus",label: "Last 3 debit status",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit status", placeholder:"Last 3 debit status" },
       { name: "DueDate",label: "Due Date",inputType: "text",required: false,disabled:true,validationmsg: "Due Date", placeholder:"Due Date" },
       { name: "HoldPossibleForCurrentDue",label: "Activation Possible for Current Due",inputType: "text",disabled:true,required: false,validationmsg: "Activation Possible for Current Due",   placeholder:"Activation Possible for Current Due" },
        { name: "Reason",label: "Reason For Re-Start",inputType: "text",disabled:true,required: false,validationmsg: "Reason For Re-Start", placeholder:"Reason For Re-Start" },
       { name: "RequestForm",label: "Request Form",inputType: "link",linkValue:"View",hide:true,required: false,validationmsg: "Request Form", placeholder: "Request Form"},
       { name: "CustomerSigningDate",label: "Customer Signing Date",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Customer Signing Date", placeholder: "DD/MM/YYYY"},
       { name: "BranchReceivedDate",label: "Request Received Date",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Request Received Date", placeholder: "DD/MM/YYYY"},
       { name: "ReasonForDelay",label: "Reason For Delayed Submission",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Reason For Delayed Submission", placeholder: "Reason For Delayed Submission"},
       { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",disabled:true,hide:true,required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       { name: "RequestorComments",label: "Requestor Comments",inputType: "text",required: false,disabled:true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
       { name: "POSComments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,disabled:false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
     ]
   },
   redebitstop: {
    BOE_Details:[
      { name: "PaymentMethod",label: "Payment Method",inputType: "text",required: false,disabled:true,validationmsg: "",  placeholder:"Payment Method" },
    ],
     NACH_Details:[
      { name: "NACHStatus",label: "NACH Status",inputType: "text",required: false,disabled:true,validationmsg: "NACH Status",  placeholder:"NACH Status" },
      { name: "RegisteredOn",label: "Registered on",inputType: "text",required: false,disabled:true,validationmsg: "Registered on",  placeholder:"Registered on" },
      { name: "BankName",label: "Bank Name",inputType: "text",required: false,disabled:true,validationmsg: "Bank Name", placeholder: "Bank Name"},
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number",disabled:true, pattern:'numbersOnly',required: false,validationmsg: "Enter a Bank Account Number", placeholder: "Bank Account Number"},
      { name: "BankIFSC",label: "IFSC",inputType: "text",required: false,validationmsg: "", disabled:true, pattern:'charactersOnly', placeholder:"Bank IFSC" },
      //  { name: "AccountHolderName",label: "Account Holder Name",inputType: "text",required: false,validationmsg: "Account Holder Name", placeholder: "Account Holder Name"},
      //  { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Confirm Bank Account Number", placeholder: "Confirm Bank Account Number"},
      //  { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
       { name: "PreferredDebitDate",label: "Preferred Debit Day",inputType: "text",disabled:true,required: false,validationmsg: "Preferred Debit Day", placeholder: "Preferred Debit Day"},
       { name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",disabled:true,required: false,validationmsg: "Max debit amt", placeholder:"Max debit amt" },
       { name: "NACHValidTill",label: "NACH valid till",inputType: "text",disabled:true,required: false,validationmsg: "NACH valid till",   placeholder:"NACH valid till" },
      //  { name: "Last3debitdate",label: "Last 3 debit date",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit date",  placeholder:"Last 3 debit date" },
      //  { name: "Last3debitstatus",label: "Last 3 debit status",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit status", placeholder:"Last 3 debit status" },
      ],
      Request_ReDebit_Details: [
        { name: "ReDebitDate",label: "Re-Debit Date",inputType: "text",required: false,disabled:true,validationmsg: "Re-Debit Date", placeholder:"Re-Debit Date" },
        { name: "ReDebitAmt",label: "Re-Debit Amount",inputType: "text",required: false,disabled:true,validationmsg: "Re-Debit Amount", placeholder:"Re-Debit Amount" },
        { name: "FilesenttoBankdate",label: "File sent to Bank date",inputType: "text",disabled:true,required: false,validationmsg: "File sent to Bank date",   placeholder:"File sent to Bank date" },
        { name: "StopReDebitAllow",label: "Stop Re-Debit Allowed",inputType: "text",disabled:true,required: false,validationmsg: "Stop Re-Debit Allowed",  placeholder:"Stop Re-Debit Allowed" },
        { name: "Reason",label: "Reason For Not Allowing",inputType: "text",disabled:true,required: false,validationmsg: "Reason For Not Allowing", placeholder:"Reason For Not Allowing" },
        { name: "ReasontoStopReDebit",label: "Reason to Stop Re-Debit",inputType: "text",disabled:false,required: false,validationmsg: "Reason to Stop Re-Debit", placeholder:"Reason to Stop Re-Debit" },
      ],
     Customer_Choice_Details:[
       { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,validationmsg: "Select Customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
     ],
     Request_Details:[
       {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
       { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
       { name: "branchreceiveddate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
       { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:false,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
       { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       
     ],
     Comments:[
       { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
     ],
     
     POS_Details:[
      {name:"name",label:"View Current Mandate Details",inputType:"title"},
      { name: "NACHStatus",label: "NACH Status",inputType: "text",required: false,disabled:true,validationmsg: "NACH Status",  placeholder:"NACH Status" },
      { name: "Registeredon",label: "Registered on",inputType: "text",required: false,disabled:true,validationmsg: "Registered on",  placeholder:"Registered on" },
      { name: "NameAsMentionedInTheBank",label: "Bank Name",inputType: "text",required: false,disabled:true,validationmsg: "Bank Name", placeholder: "Bank Name"},
      { name: "BankAccountNumber",label: "Bank Account Number",inputType:"number",disabled:true, pattern:'numbersOnly',required: false,validationmsg: "Enter a Bank Account Number", placeholder: "Bank Account Number"},
      { name: "BankIFSC",label: "IFSC",inputType: "text",required: true,validationmsg: "", disabled:true, pattern:'charactersOnly', placeholder:"Bank IFSC" },
      //  { name: "AccountHolderName",label: "Account Holder Name",inputType: "text",required: false,validationmsg: "Account Holder Name", placeholder: "Account Holder Name"},
      //  { name: "ConfirmBankAccountNumber",label: "Confirm Bank Account Number",inputType:"number", pattern:'numbersOnly',required: true,validationmsg: "Enter a Confirm Bank Account Number", placeholder: "Confirm Bank Account Number"},
      //  { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop", placeholder: "Initiate Penny Drop"},
       { name: "PreferredDebitDate",label: "Preferred Debit Day",inputType: "text",disabled:true,required: false,validationmsg: "Preferred Debit Day", placeholder: "Preferred Debit Day"},
       { name: "MaxDebitAmounat",label: "Max debit amt",inputType: "text",disabled:true,required: false,validationmsg: "Max debit amt", placeholder:"Max debit amt" },
       { name: "NACHValidTill",label: "NACH valid till",inputType: "text",disabled:true,required: false,validationmsg: "NACH valid till",   placeholder:"NACH valid till" },
      //  { name: "Last3debitdate",label: "Last 3 debit date",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit date",  placeholder:"Last 3 debit date" },
      //  { name: "Last3debitstatus",label: "Last 3 debit status",inputType: "text",disabled:true,required: false,validationmsg: "Last 3 debit status", placeholder:"Last 3 debit status" },
      { name: "ReDebitDate",label: "Re-Debit Date",inputType: "text",required: false,disabled:true,validationmsg: "Re-Debit Date", placeholder:"Re-Debit Date" },
      { name: "ReDebitAmt",label: "Re-Debit Amount",inputType: "text",required: false,disabled:true,validationmsg: "Re-Debit Amount", placeholder:"Re-Debit Amount" },
      { name: "FilesenttoBankdate",label: "File sent to Bank date",inputType: "text",disabled:true,required: false,validationmsg: "File sent to Bank date",   placeholder:"File sent to Bank date" },
      { name: "CancelPossibleforcurrentdue",label: "Stop Re-Debit Allowed",inputType: "text",disabled:true,required: false,validationmsg: "Stop Re-Debit Allowed",  placeholder:"Stop Re-Debit Allowed" },
      { name: "Reason",label: "Reason For Not Allowing",inputType: "text",disabled:true,required: false,validationmsg: "Reason For Not Allowing", placeholder:"Reason For Not Allowing" },
      { name: "ReasontoStopReDebit",label: "Reason to Stop Re-Debit",inputType: "text",disabled:true,required: false,validationmsg: "Reason to Stop Re-Debit", placeholder:"Reason to Stop Re-Debit" },
       { name: "RequestForm",label: "Request Form",inputType: "link",linkValue:"View",hide:false,required: false,validationmsg: "Request Form", placeholder: "Request Form"},
       { name: "CustomerSigningDate",label: "Customer Signing Date",inputType: "text",hide:false,disabled:true,required: false,validationmsg: "Customer Signing Date", placeholder: "DD/MM/YYYY"},
       { name: "BranchReceivedDate",label: "Request Received Date",inputType: "text",hide:false,disabled:true,required: false,validationmsg: "Request Received Date", placeholder: "DD/MM/YYYY"},
       { name: "ReasonForDelay",label: "Reason For Delayed Submission",inputType: "text",hide:true,disabled:true,required: false,validationmsg: "Reason For Delayed Submission", placeholder: "Reason For Delayed Submission"},
       { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",disabled:true,required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       { name: "Comments",label: "Requestor Comments",inputType: "text",required: false,disabled:true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
       { name: "POSComments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,disabled:false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
     ]
   },
}

const ChequeRepresentationData={
  renewal:{
    BOE_Details:[
      { name: "ReceiptType",label: "Receipt Type",inputType: "dropdown",required: true,validationmsg: "Receipt Type",placeholder:"Receipt Type"},
      { name: "ChequeNumber",label: "Cheque Number",inputType: "text", required:true,pattern:"numbersOnly",disabled:false,validationmsg: "Cheque Number",placeholder:"Cheque Number"},
    ],
    CheckNumber_Fields:[
      { name: "ChequeBounceReason",label: "Cheque Bounce Reason",inputType: "text",required: false,disabled:true,validationmsg: "Cheque Bounce Reason",placeholder:"Cheque Bounce Reason"},
      { name: "ChequeReceivedAtHO",label: "Cheque Received at HO",inputType: "dropdown",required: true,validationmsg: "Cheque Received at HO",placeholder:"Cheque Received at HO"},
    { name: "ReceiptNumber",label: "Receipt Number",inputType: "text",disabled:true, required: true,validationmsg: "Receipt Number",placeholder:"Receipt Number"},
      // { name: "Cheque Details",label: "Cheque Details",inputType: "title"},
      // {name:"texts", lable:"", inputType: "texts"},
      { name: "ChequeAmount",label: "Cheque Amount",inputType: "text",required: true,disabled:true,validationmsg: "Cheque Amount",placeholder:"Cheque Amount"},
      { name: "ChequeDate",label: "Cheque Date",inputType: "text",required: true,disabled:true, validationmsg: "Cheque Date",placeholder:"Cheque Date"},
      { name: "ChequeExpiryDate",label: "Cheque Expiry Date",inputType: "text", required:true,disabled:true,validationmsg: "Cheque Expiry Date",placeholder:"Cheque Expiry Date"},
      { name: "ChequeDrawnOnBankName",label: "Cheque Drawn On Bank Name",inputType: "text",required: true,disabled:true,validationmsg: "Cheque Drawn On Bank Name",placeholder:"Cheque Drawn On Bank Name"},
      { name: "ChequeRepresentationRequestDate",label: "Cheque Representation Request Date",inputType: "date",required: true,disabled:false, validationmsg: "Cheque Representation request date",placeholder:"Cheque Representation request date"},
      { name: "ReasonFor_Representation",label: "Reason For Representation",inputType: "text", required:true,validationmsg: "Reason For Representation",placeholder:"Reason For Representation"},
      { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,disabled:false,validationmsg: "Select Customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
    ],
    RequestForm_Fields : [
      {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
      { name: "customersigningdate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
      { name: "branchreceivedate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
      { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
      { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    Comments:[
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comments" },
    ]
  },
  newbusiness:{
    BOE_Details:[
      { name: "ReceiptType",label: "Receipt Type",inputType: "dropdown",required: true,validationmsg: "Receipt Type",placeholder:"Receipt Type"},
      { name: "ChequeNumber",label: "Cheque Number",inputType: "text", required:true,pattern:"numbersOnly",disabled:false,validationmsg: "Cheque Number",placeholder:"Cheque Number"},
    ],
    CheckNumber_Fields:[
      { name: "ChequeBounceReason",label: "Cheque Bounce Reason",inputType: "text",required: false,disabled:true,validationmsg: "Cheque Bounce Reason",placeholder:"Cheque Bounce Reason"},
      { name: "ChequeReceivedAtHO",label: "Cheque Received at HO",inputType: "dropdown",required: true,validationmsg: "Cheque Received at HO",placeholder:"Cheque Received at HO"},
    { name: "ReceiptNumber",label: "Receipt Number",inputType: "text",disabled:true, required: true,validationmsg: "Receipt Number",placeholder:"Receipt Number"},
      // { name: "Cheque Details",label: "Cheque Details",inputType: "title"},
      // {name:"texts", lable:"", inputType: "texts"},
      { name: "ChequeAmount",label: "Cheque Amount",inputType: "text",required: true,disabled:true,validationmsg: "Cheque Amount",placeholder:"Cheque Amount"},
      { name: "ChequeDate",label: "Cheque Date",inputType: "text",required: true,disabled:true, validationmsg: "Cheque Date",placeholder:"Cheque Date"},
      { name: "ChequeExpiryDate",label: "Cheque Expiry Date",inputType: "text", required:true,disabled:true,validationmsg: "Cheque Expiry Date",placeholder:"Cheque Expiry Date"},
      { name: "ChequeDrawnOnBankName",label: "Cheque Drawn On Bank Name",inputType: "text",required: true,disabled:true,validationmsg: "Cheque Drawn On Bank Name",placeholder:"Cheque Drawn On Bank Name"},
      { name: "ChequeRepresentationRequestDate",label: "Cheque Representation Request Date",inputType: "date",required: true,disabled:false, validationmsg: "Cheque Representation request date",placeholder:"Cheque Representation request date"},
      { name: "ReasonFor_Representation",label: "Reason For Representation",inputType: "text", required:true,validationmsg: "Reason For Representation",placeholder:"Reason For Representation"},
      { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,disabled:false,validationmsg: "Select Customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
    ],
    RequestForm_Fields : [
      {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
      { name: "customersigningdate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
      { name: "branchreceivedate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
      { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
      { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    Comments:[
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comments" },
    ]
  }
 
  
}

const ContractAlterationData={
  changeinname:{
    Existing_Details:[
      { name: "Update_New",label: "View Existing Details Of ?",inputType: "dropdown",required: true,validationmsg: "View Existing Details Of ?",placeholder:"Select View Existing Details Of ?"},
      { name: "Salutation_Old",label: "Salutation ",inputType: "text",required: false,disabled:true,validationmsg: "Salutation Missing",placeholder:"Salutation"},
      { name: "FirstName_Old",label: "First Name",inputType: "text",required: false,disabled:true,validationmsg: "First Name Missing",placeholder:"Enter First Name"},
      { name: "MiddleName_Old",label: "Middle Name",inputType: "text",required: false,disabled:true,validationmsg: "Middle Name Missinig",placeholder:"Enter Middle Name"},
      { name: "LastName_Old",label: "Last Name",inputType: "text",required: false,disabled:true,validationmsg: "Last Name Missing",placeholder:"Enter Last Name"},
    
    ],
    Update_New_Details:[
      { name: "Update_New",label: "Update Details For ?",inputType: "dropdown",required: true,validationmsg: "Update Details For ?",placeholder:"Select Update Details For ?"},
      { name: "Update_New",label: "Update New Details Of ?",inputType: "dropdown",hide:true,required: true,validationmsg: "Select a Update New Details Of",placeholder:"Select Update New Details Of"},
      { name: "Salutation_New",label: "Salutation ",inputType: "dropdown",required: true,validationmsg: "Select a Salutation",placeholder:"Salutation"},
      { name: "FirstName_New",label: "First Name",inputType: "text",required: true,validationmsg: "Enter First Name",placeholder:"Enter First Name"},
      { name: "MiddleName_New",label: "Middle Name",inputType: "text",required: true,validationmsg: "Enter Middle Name",placeholder:"Enter Middle Name"},
      { name: "LastName_New",label: "Last Name",inputType: "text",required: true,validationmsg: "Enter Last Name",placeholder:"Enter Last Name"},
      { name: "Stage_Document",label: "Error at NB Stage",inputType: "radio",required: true,validationmsg: "Select a Error at NB Stage",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "RequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form",indexName:"Changeor Correction in the Name"  },
      
      { name: "UploadNameChangeProof",label: "Upload Name Change Proof",inputType: "upload",hide:false,required: false,validationmsg: "Upload Name Change Proof",placeholder:"Upload Name Change Proof",indexName:"Changeor Correction in the Name"  },
      { name: "UploadIDProof",label: "Upload ID Proof",inputType: "upload",required: false,hide:false,validationmsg: "Upload ID Proof",placeholder:"Upload ID Proof",indexName:"Changeor Correction in the Name" },
      { name: "Validate_Signature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select a Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required: true,validationmsg: "Customer Signing Date",placeholder: "Select a date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required: true,validationmsg: "Request Received Date",placeholder: "Select a date", },
      { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comments" },
    ],
    // ReasonSubmission:[
    //   { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text", hide : false, placeholder: "Reason for Delayed Submission" },
    // ],
    POS_Details:[
      { name: "ViewNewNameDetails",label: "View New Name Details",inputType: "title",required: false,},
      {name:"texts",label:"",inputType:"texts"},
      { name: "RefertoNBStageDocument",label: "Error at NB Stage",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "RequestFor",label: "Request For",inputType: "text",disabled:true,required: false,validationmsg: "Request For",placeholder:"Request For" },
      { name: "Salutation_New",label: "Salutation ",inputType: "text",required: false,disabled:true,validationmsg: "Salutation ",placeholder:"Salutation"},
      { name: "FirstName_New",label: "First Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter First Name"},
      { name: "MiddleName_New",label: "Middle Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Middle Name"},
      { name: "LastName_New",label: "Last Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Last Name"},
      
      { name: "UploadedDocuments",label: "Uploaded Documents",inputType: "link",linkValue:"View",required: false,},

      // { name: "NameChangeProof",label: "Name Change Proof",inputType: "link",linkValue:"View",required: false,hide:true,validationmsg: "Name Change Proof",placeholder:"Name Change Proof" },
      // { name: "IDProof",label: "ID Proof",inputType: "link",linkValue:"View",required: false,hide:true,validationmsg: "Upload ID Proof",placeholder:"Upload ID Proof" },
      // { name: "UploadAddressProof",label: "View Address Proof",inputType: "link",linkValue:"View",hide:true,required: false,validationmsg: "Upload Address Proof",placeholder:"Upload Address Proof" },
      // { name: "NameDeDupematch",label: "Name De-Dupe match",inputType: "link",linkValue:"View",required: false,},
      
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: false,disabled: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required: false,validationmsg: "Customer Signing Date",placeholder: "Select a date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required: false,validationmsg: "Request Received Date",placeholder: "Select a date", },
      { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,placeholder: "Reason for Delayed Submission" },
      { name: "Comments",label: "Requestor Comments",inputType: "text",required: false,disabled:true,validationmsg: "Enter Comments",placeholder:"Requestor Comments" },
      { name: "Comment",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comments" },
    ]
  }, 
  panupdate:{
     Existing_PAN_Details: [
      { name: "PanUpdateFor_Old",label: "View PAN For",inputType: "dropdown",required: false,validationmsg: "View PAN For",placeholder:"View PAN For"},
      //{ name: "Name_Old",label: "Name",inputType: "text",required: false,disabled:true,validationmsg: "Name",placeholder:"Name"},
      { name: "DOB_Old",label: "DOB",inputType: "text",required: false,disabled:true,validationmsg: "DOB",placeholder:"DOB"},
      { name: "ExistingPanNo",label: "Existing PAN",inputType: "text",disabled:true,required: false,validationmsg: "Existing PAN",placeholder:"Existing PAN"},
     ],
     Update_PAN_Details:[
      { name: "PanUpdateFor_New",label: "Update PAN Number For",inputType: "dropdown",required: true,validationmsg: "Update PAN Number Of",placeholder:"Update PAN Number Of"},
      { name: "Name_New",label: "Name",inputType: "text",disabled:true,required: false,validationmsg: "Name",placeholder:"Name"},
      { name: "DOB_New",label: "DOB",inputType: "text",disabled:true,required: false,validationmsg: "DOB",placeholder:"DOB"},
      { name: "NewPanNo",label: "Enter PAN",inputType: "pannumber",required: true,maxlength:10,minlength:10,pattern:'charactersOnly', message:'Enter 10 Digits',validationmsg: "Enter PAN Number",placeholder:"Enter PAN Number"},
      { name: "PanValidation",label: "PAN Validation Result",inputType: "text",required: false,disabled:true,validationmsg: "PAN Validation Result",placeholder:"PAN Validation Result"},
      { name: "NameinPAN",label: "Name as per PAN",inputType: "text",disabled:true,placeholder:"Name as per PAN"},
      { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      // { name: "PanAadharSeeding",label: "PAN Aadhar Seeding Status",inputType: "text",required: false,validationmsg: "PAN Aadhar Seeding Status",placeholder:"PAN Aadhar Seeding Status"},
      // { name: "Last2YearsITRFilling",label: "Last 2 year ITR filing check ",inputType: "text",required: true,validationmsg: "Last 2 year ITR filing check ",placeholder:"Last 2 year ITR filing check"},
      { name: "UploadPANCard",label: "Upload PAN Card",inputType: "upload",required: true,validationmsg: "Upload PAN Card",placeholder:"Upload PAN Card",indexName:"Pan Card" },
      // { name: "RequestForm",label: "Request Form",inputType: "upload",required: true,validationmsg: "Request Form",placeholder:"Request Form",indexName:"Pan Card"  },
      { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,disabled:false,validationmsg: "Select Customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
    ],
    RequestForm_Fields : [
      {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
      { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
      { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comments" },
    ],
     Share_Process_Details:[
      {name: 'PANupdateProcess ',label: 'PAN Update Process',inputType: "icons",required: false,validationmsg: "Select a PAN update Process",placeholder:"PAN update Process " },
      // {name: 'PANUpdateForm',label: 'PAN Update Form',inputType: "icons",required: false,validationmsg: "Select a PAN Update Form",placeholder:"PAN update Form" }
     ],
     POS_Details:[
      { name: "NewPanNo",label: "PAN",inputType: "text",disabled:true,placeholder:"PAN Number"},
      { name: "PanValidation",label: "PAN Validation Result",inputType: "text",disabled:true,placeholder:"PAN Validation Result"},
      { name: "NameinPAN",label: "Name as per PAN",inputType: "text",disabled:true,placeholder:"Name as per PAN"},
      { name: "NameMatch",label: "Name Match",inputType: "radio",required: true,disabled:true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "PANCardCopy",label: "PAN Card Copy",inputType: "link",linkValue:"View",required: false,validationmsg: "PAN Card Copy",placeholder:"PAN Card Copy" },
      { name: "RequestForm",label: "Request Form",inputType: "link",linkValue:"View",required: false,validationmsg: "Request Form",placeholder:"Request Form" },
      { name: "ReEnterPanNo_New",label: "Re-Enter PAN ",inputType: "pannumber",required: true,maxlength:10,minlength:10,pattern:'charactersOnly', message:'Enter 10 Digits',placeholder:"Re-Enter PAN No"},
      
      { name: "PANRevalidationResult",label: "PAN Revalidation Result",inputType: "text",required: false,validationmsg: "PAN Revalidation Result",placeholder:"PAN Revalidation Result"},
      { name: "NameinPANN",label: "Name as per PAN",inputType: "text",disabled:true,placeholder:"Name as per PAN"},
      { name: "POSNameMatch",label: "Name Match",inputType: "radio",required: true,validationmsg: "Select Name Match",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      // { name: "PanAadharSeeding",label: "PAN Aadhar Seeding Result",inputType: "text",required: false,validationmsg: "PAN Aadhar Seeding Result",placeholder:"PAN Aadhar Seeding Result"},
      // { name: "Last2YearsITRFilling",label: "Last 2 year ITR filing check",inputType: "text",required: false,validationmsg: "Last 2 year ITR filing check ",placeholder:"Last 2 year ITR filing check "},
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,hide:false,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,hide:false,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
      { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,required:false,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
      { name: "validatesignature",label: "Signature Validated",inputType: "radio",disabled:true,required: false,hide:true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ]
  },
  gstinupdate:{
    Existing_GSTIN_Details:[
      // { name: "GSTINToBeUpdateFor",label: "GSTIN Updated For",inputType: "text",value:"Proposer",required: true,validationmsg: "GSTIN Updated For",placeholder:"GSTIN Updated For"},
      { name: "ExistingGSTINNumber",label: "GSTIN Number",inputType: "text",required: true,disabled:true,validationmsg: "GSTIN Number is missing",placeholder:"GSTIN Number"},
    ],
    Update_GSTIN_Details:[
      // { name: "GSTINToBeUpdateFor",label: "GSTIN Updated For",inputType: "dropdown",required: true,validationmsg: "GSTIN Updated For",placeholder:"GSTIN Updated For"},
      { name: "NewGSTINNumber",label: "GSTIN Number",inputType: "gstinnumber",required: true,minlength:15,maxlength:15,validationmsg: "GSTIN Number",placeholder:"GSTIN Number"},
      { name: "requestchannel",label: "Request Mode",inputType: "dropdown",required: true,validationmsg: "Select Request Mode",placeholder:"Request Mode" },
      { name: "UploadGSTINCertificate",label: "Upload GSTIN Certificate",inputType: "upload",required: true,validationmsg: "Upload GSTIN Certificate",placeholder:"Upload GSTIN Certificate",indexName:"Minor Alteration"},
      {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
      { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
    ],
    // Share_GSTIN_Process:[
    //   { name: "SendGSTINChangeProcess",label: "Send GSTIN Change Process",inputType: "icons",required: true,validationmsg: "Send GSTIN Change Process"},
    // ],
    POS_Details:[
      { name: "ExistingGSTINNumber",label: "Existing GSTIN Number",inputType: "text",required: false,disabled:true,validationmsg: "Existing GSTIN Number",placeholder:"Existing GSTIN Number"},
      { name: "NewGSTINNumber",label: "New GSTIN Number",inputType: "text",required: true,disabled:true,validationmsg: "New GSTIN Number",placeholder:"New GSTIN Number"},
      { name: "UploadGSTINCertificate",label: "View GSTIN Certificate",inputType: "link",linkValue:"View",required: false,validationmsg: "view GSTIN Certificate",placeholder:"Upload GSTIN Certificate"},
      { name: "ViewRequestForm",label: "View Request Form",inputType: "link",linkValue:"View"},
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,hide:false,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,hide:false,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
      { name: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,required:false,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",disabled:true,required: false,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "BranchComments",label: "Requestor Comments",inputType: "text",disabled: true,validationmsg: "Comments",placeholder:"Branch Comment" },
      { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
    ]
  },
    changeinownership:{
        Existing_Owner_Details:[
          { name: "ClientId_Old",label: "Existing Client Code",inputType: "text",required: false,disabled:true, validationmsg: "Existing Client Code",placeholder:"Existing Client Code" },
          { name: "ProposerName_Old",label: "Proposer Name",inputType: "text",required: false,disabled:true,validationmsg: "Proposer Name",placeholder:"Proposer Name" },
          { name: "ProposerDOB_Old",label: "Proposer DOB",inputType: "text",required: false,disabled:true,validationmsg: "Proposer DOB",placeholder:"DD/MM/YYYY" },
          { name: "AddressLine1_Old",label: "Address Line 1",inputType: "text",required: false,disabled:true,validationmsg: "Address Line 1",placeholder:"Address Line 1" },
          { name: "AddressLine2_Old",label: "Address Line 2",inputType: "text",required: false,disabled:true,validationmsg: "Address Line 2",placeholder:"Address Line 2" },
          { name: "AddressLine3_Old",label: "Address Line 3",inputType: "text",required: false,disabled:true,validationmsg: "Address Line 3",placeholder:"Address Line 3" },
          { name: "PINCode_Old",label: "Pin Code",inputType: "text",required: false,disabled:true,validationmsg: "Pin Code",placeholder:"Pin Code" },
          { name: "City_Old",label: "City",inputType: "text",required: false,disabled:true,validationmsg: "City",placeholder:"City" },
          { name: "State_Old",label: "State",inputType: "text",required: false,disabled:true,validationmsg: "State",placeholder:"State" },
          { name: "MobileNumber_Old",label: "Proposer Mobile Number ",disabled:true,inputType: "text",required: false,validationmsg: "Proposer Mobile Number ",placeholder:"Proposer Mobile Number " },
          { name: "ProposerEmailID_Old",label: "Proposer Email ID",disabled:true,inputType: "text",required: false,validationmsg: "Proposer Email ID",placeholder:"Proposer Email ID" },
          { name: "RelationtoLifeAssured",label: "Relation to Life Assured",inputType: "text",required: false,validationmsg: "Relation to Life Assured",placeholder:"Relation to Life Assured" },
        ],
        Update_NEW_Owner_Details:[
          { name: "ProposerName_New",label: "New Proposer Name",inputType: "text",required: true,validationmsg: "New Proposer Name",placeholder:"New Proposer Name" },
          { name: "ProposerDOB_New",label: "New Proposer DOB",inputType: "nofuturedates",required: true,validationmsg: "New Proposer DOB",placeholder:"New Proposer DOB" },
          { name: "AddressLine1_New",label: "Address Line 1",inputType: "text",required: true,validationmsg: "Address Line 1",placeholder:"Address Line 1" },
          { name: "AddressLine2_New",label: "Address Line 2",inputType: "text",required: true,validationmsg: "Address Line 2",placeholder:"Address Line 2" },
          { name: "AddressLine3_New",label: "Address Line 3",inputType: "text",required: true,validationmsg: "Address Line 3",placeholder:"Address Line 3" },
          { name: "PINCode",label: "Pin Code",inputType: "number", pattern:'numbersOnly', maxlength:6,minlength:6, required: true,validationmsg: "Pin Code",placeholder:"Pin Code" },
          { name: "City_New",label: "City",inputType: "text",required: false,validationmsg: "City",placeholder:"City" },
          { name: "State_New",label: "State",inputType: "text",required: false,validationmsg: "State",placeholder:"State" },
          
          { name: "MobileNumber_New",label: "New Proposer Mobile Number ",pattern:'numbersOnly', inputType: "phonenumber",required: true,maxlength:10,minlength:10, message:'Enter 10 Digits', validationmsg: "New Proposer Mobile Number ",placeholder:"New Proposer Mobile Number " },

    
          { name: "ProposerEmailID_New",label: "New Proposer Email ID",inputType: "email",required: true,validationmsg: "New Proposer Email ID",placeholder:"New Proposer Email ID" },
          { name: "RelationtoLifeAssured",label: "Relation to Life Assured",inputType: "dropdown",required: false,validationmsg: "Relation to Life Assured ",placeholder:"Relation to Life Assured" },
         
          { name: "PANNumber",label: "PAN Number",inputType: "text",required: true,maxlength:10,minlength:10, pattern:'charactersOnly',validationmsg: "PAN Number",placeholder:"PAN Number"},
          { name: "PANResult",label: "PAN Validation Result",inputType: "text",disabled:true,  required: false,validationmsg: "PAN Number",placeholder:"PANResult"},
          { name: "NameinPANN",label: "Name as per PAN",inputType: "text",disabled:true,  required: false,validationmsg: "Name as per PAN",placeholder:"Name as per PAN"},
         // { name: "CKYCNumber",label: "CKYC Number",inputType: "text",required: true,  maxlength:14,minlength:14, pattern:'charactersOnly', validationmsg: "CKYCNumber must be at least 14 characters",placeholder:"CKYC Number" },
          // { name: "CKYCResult",label: "CKYC Validation Result",inputType: "text", disabled:true, required: false,validationmsg: "PAN Number",placeholder:"CKYCResult"},
       
          { name: "ReasonForOwnershipChange",label: "Reason For Ownership Change",inputType: "dropdown",required: false,validationmsg: "Reason For Ownership Change",placeholder:"Reason For Ownership Change" },
          
          // {name:"texts", label:"",inputType:"texts"},
          { name: "EnterBankAccountDetails",label: "Enter Bank Account Details",inputType: "title",required: false,validationmsg: "Enter Bank Account Details",placeholder:"Enter Bank Account Details" },
          // {name:"texts", label:"",inputType:"texts"}, 

          { name: "BankIFSC",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",  pattern:'charactersOnly', placeholder:"Bank IFSC" },
          { name: "BankName",label: "Bank Name",inputType: "text",required: false,validationmsg: "Bank Name",placeholder:"Bank Name" },
        
          { name: "AccountType",label: "Account Type",inputType: "dropdown",required: false,validationmsg: "Account Type",placeholder:"Account Type" },
          { name: "NameAsMentionedInTheBank",label: "Account Holder Name",inputType: "text",required: false,validationmsg: "Account Holder Name",placeholder:"Account Holder Name" },
          { name: "BankAccountNumber",label: "Bank Account Number",inputType: "number",required: false,validationmsg: "", pattern:'numbersOnly', placeholder: "Bank Account Number"},
          { name: "ConfirmBankAccountNumber",label: "Re-enter Bank Account Number",inputType: "number", pattern:'numbersOnly', required: false,validationmsg: "Re-enter Bank Account Number",placeholder:"Re-enter Bank Account Number" },
         
          { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,required: false,validationmsg: "Initiate Penny Drop",placeholder:"Initiate Penny Drop" },
          { name: "DeDupeCheck",label: "De-Dupe Check",inputType: "link",hyperLink:true,linkValue:"Link",required: false,validationmsg: "De-Dupe Check",placeholder:"De-Dupe Check" },
          { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
          { name: "UploadDeathCertificateOfOldProposer",label: "Upload Death Certificate Of Old Proposer",inputType: "upload",required: false,validationmsg: "Upload Death Certificate Of Old Proposer",placeholder:"Upload Death Certificate Of Old Proposer" },
          { name: "UploadLegalHeirCertificate",label: "Upload Legal Heir Certificate",inputType: "upload",required: false,validationmsg: "Upload Legal Heir Certificate",placeholder:"Upload Legal Heir Certificate" },
          { name: "UploadPANCard",label: "Upload PAN Card",inputType: "upload",required: false,validationmsg: "Upload PAN Card",placeholder:"Upload PAN Card" },
          { name: "UploadBankAccountProof",label: "Upload Bank Account Proof",inputType: "upload",required: false,validationmsg: "Upload Bank Account Proof",placeholder:"Upload Bank Account Proof" },
          { name: "UploadIDProof",label: "Upload ID Proof",inputType: "upload",required: false,validationmsg: "Upload ID Proof",placeholder:"Upload ID Proof" },
          { name: "UploadAddressProof",label: "Upload Address Proof",inputType: "upload",required: false,validationmsg: "Upload Address Proof",placeholder:"Upload Address Proof" },
          { name: "CustomerSigningDate",label: "Customer Signing Date",inputType: "nofuturedates",required: true,validationmsg: "Customer Signing Date",placeholder:"Customer Signing Date" },
          { name: "BranchReceivedDate",label: "Request Received Date",inputType: "nofuturedates",required: true,validationmsg: "Request Received Date",placeholder:"Request Received Date" },
          { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",disabled:false,hide:true,required:false,validationmsg:"Enter Reason For Delayed",placeholder: "Reason for Delayed Submission" },
          { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        ],
        ReasonSubmission:[
          // { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
        ],
        Comments:[
          { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
        ],  
        Share_Process_Communication:[
          { name: "ShareProcessCommunication",label: "Share Process Communication",inputType: "icons",required: false,validationmsg: "Select Share Soft Copy Policy Documnet" },
         ], 
        POS_Details:[
          { name: "ReasonForOwnershipChange",label: "Reason For Ownership Change",inputType: "text",required: false,disabled:true,validationmsg: "Reason For Ownership Change",placeholder:"Reason For Ownership Change" },
          { name: "ProposerName_New",label: "New Proposer Name",inputType: "text",disabled:true,required: false,validationmsg: "New Proposer Name",placeholder:"New Proposer Name" },
          { name: "ProposerDOB_New",label: "New Proposer DOB",inputType: "text",disabled:true,required: false,validationmsg: "New Proposer DOB",placeholder:"New Proposer DOB" },
          { name: "AddressLine1_New",label: "Address Line 1",inputType: "text",disabled:true,required: false,validationmsg: "Address Line 1",placeholder:"Address Line 1" },
          { name: "AddressLine2_New",label: "Address Line 2",inputType: "text",disabled:true,required: false,validationmsg: "Address Line 2",placeholder:"Address Line 2" },
          { name: "AddressLine3_New",label: "Address Line 3",inputType: "text",disabled:true,required: false,validationmsg: "Address Line 3",placeholder:"Address Line 3" },
          { name: "City_New",label: "City",inputType: "text",required: false,disabled:true,validationmsg: "City",placeholder:"City" },
          { name: "State_New",label: "State",inputType: "text",required: false,disabled:true,validationmsg: "State",placeholder:"State" },
          { name: "PINCode",label: "Pin Code",inputType: "text",required: false,disabled:true,validationmsg: "Pin Code",placeholder:"Pin Code" },
          { name: "MobileNumber_New",label: "New Proposer Mobile Number ",inputType: "text",disabled:true,required: false,validationmsg: "New Proposer Mobile Number ",placeholder:"New Proposer Mobile Number " },
          { name: "ProposerEmailID_New",label: "New Proposer Email ID",inputType: "text",disabled:true,required: false,validationmsg: "New Proposer Email ID",placeholder:"New Proposer Email ID" },
          { name: "RelationtoLifeAssured",label: "Relation to Life Assured",inputType: "text",disabled:true,required: false,validationmsg: "Relation to Life Assured ",placeholder:"Relation to Life Assured" },
          { name: "PANNumber",label: "PAN Number",inputType: "text",pattern:'charactersOnly',disabled:true,required: false,validationmsg: "PAN Number",placeholder:"PAN Number" },
          { name: "PANResult",label: "PAN Validation Result",inputType: "text",disabled:true,required: false,validationmsg: "PAN Validation Result",placeholder:"PAN Validation Result" },
          //{ name: "CKYCNumber",label: "CKYC Number",inputType: "text",pattern:'charactersOnly',disabled:true,required: false,validationmsg: "CKYC Number",placeholder:"CKYC Number" },
          { name: "CustomerSigningDate",label: "Customer Signing Date",inputType: "text",disabled:true,required: false,validationmsg: "Customer Signing Date",placeholder:"Customer Signing Date" },
          { name: "BranchReceivedDate",label: "Request Received Date",inputType: "text",disabled:true,required: false,validationmsg: "Request Received Date",placeholder:"Request Received Date" },
          { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,disabled:true,placeholder: "Reason for Delayed Submission" },
          { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
         
          //  {name:"texts", label:"",inputType:"texts"}, 
          { name: "EnterBankAccountDetails",label: "Bank Account Details",inputType: "title", icon:'edit', required: false,validationmsg: "Enter Bank Account Details",placeholder:"Enter Bank Account Details" },
          // {name:"texts", label:"",inputType:"texts"},

          { name: "BankIFSC",label: "IFSC",inputType: "text",disabled:true,posEdit:true,required: false,validationmsg: "IFSC",placeholder:"IFSC" },
          { name: "BankName",label: "Bank Name",inputType: "text",disabled:true,posEdit:true,required: false,validationmsg: "Bank Name",placeholder:"Bank Name" },
          { name: "AccountType",label: "Account Type",inputType: "dropdown",disabled:true,posEdit:true,required: false,validationmsg: "Account Type",placeholder:"Account Type" },
          { name: "NameAsMentionedInTheBank",label: "Account Holder Name",inputType: "text",posEdit:true,disabled:true,required: false,validationmsg: "Account Holder Name",placeholder:"Account Holder Name" },
          { name: "BankAccountNumber",label: "Account Number",inputType: "text",disabled:true,posEdit:true,required: false,validationmsg: "Account Number",placeholder:"Account Number" },
          { name: "InitiatePennyDrop",label: "Penny Drop Result",inputType: "text",disabled:true,posEdit:true,hyperLink:true,required: false,validationmsg: "Penny Drop Result",placeholder:"Penny Drop Result" },
          { name: "InitiatePennyDrop",label: "Initiate Penny Drop",inputType: "text",hyperLink:true,posEdit:true,required: false,validationmsg: "Initiate Penny Drop",placeholder:"Initiate Penny Drop" },
         
          // { name: "DeDupeCheck",label: "De-Dupe Check",inputType: "text",required: false,validationmsg: "De-Dupe Check",placeholder:"De-Dupe Check" },
          // {name:"texts", label:"",inputType:"texts"},
          { name: "ViewDocumnets",label: "View Documnets",inputType: "title"},
          // {name:"texts", label:"",inputType:"texts"},
          { name: "RequestForm",label: "Request Form",inputType: "link",linkValue:"View",required: false,validationmsg: "Request Form",placeholder:"Request Form" },
          { name: "DeathCertificateOfOldProposer",label: "Death Certificate Of Old Proposer",inputType: "link",linkValue:"View",required: false,validationmsg: "Death Certificate Of Old Proposer",placeholder:"Death Certificate Of Old Proposer" },
          { name: "LegalHeirCertificate",label: "Legal Heir Certificate",inputType: "link",linkValue:"View",required: false,validationmsg: "Legal Heir Certificate",placeholder:"PAN Card" },
          { name: "PANCard",label: "PAN Card",inputType: "link",linkValue:"View",required: false,validationmsg: "PAN Card",placeholder:"PAN Card" },
          { name: "BankAccountProof",label: "Bank Account Proof",inputType: "link",linkValue:"View",required: false,validationmsg: "Bank Account Proof",placeholder:"Bank Account Proof" },
          { name: "IDProof",label: "ID Proof",inputType:"link",linkValue:"View",required: false,validationmsg: "ID Proof",placeholder:"ID Proof" },
          { name: "AddressProof",label: "Address Proof",inputType: "link",linkValue:"View",required: false,validationmsg: "Address Proof",placeholder:"Address Proof" },
          // {name:"texts", label:"",inputType:"texts"}, 
          { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter a Comments",placeholder:"Comment Box" },
        ]
    },
    changeinterm:{
      Existing_Term_Details:[
        { name: "PlanName_Old",label: "Plan Name",inputType: "text",disabled:true,required: true,validationmsg: "Plan Name is Missing",placeholder:"Plan Name" },
        { name: "PolicyTerm_Old",label: "Policy Term",inputType: "text",disabled:true,required: true,validationmsg: "Policy Term is Missing",placeholder:"Policy Term" },
        { name: "CurrentPremium_Old",label: "Current Premium",inputType: "text",disabled:true,required: true,validationmsg: "Current Premium is Missing",placeholder:"Current Premium" },
        // { name: "Change Allowed",label: "Change Allowed",inputType: "text",required: false,validationmsg: "Change Allowed",placeholder:"Change Allowed" },
        // { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      Update_Term_Details:[
        // { name: "PlanName",label: "Plan Name",inputType: "text",required: false,validationmsg: "Plan Name",placeholder:"Plan Name" },
        { name: "NewTerm_New",label: "New Term",inputType: "text",required: true,validationmsg: "Enter a New Term",placeholder:"New Term" },
        // { name: "NewPremium",label: "New Premium",inputType: "text",required: false,validationmsg: "New Premium",placeholder:"New Premium" },
        { name: "ReasonForChange_New",label: "Reason For Change",inputType: "text",required: true,validationmsg: "Enter a Reason For Change",placeholder:"Reason For Change" },
      ],
      Upload_Fields:[
        { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form",indexName:"Minor Alteration", },
        { name: "UploadSupportingDocument",label: "Upload Supporting Document",inputType: "upload",required: false,validationmsg: "Upload Supporting Document",placeholder:"Upload Supporting Document",indexName:"Minor Alteration", },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
    
      Share_Process_Communication:[
        { name: "ShareProcessCommunication",label: "Share Process Communication",inputType: "icons",required: false,validationmsg: "Select Share Soft Copy Policy Documnet" },
       ], 
       POS_Details:[
        // { name: "PlanName_Old",label: "Plan Name",inputType: "text",disabled:true,required: false,validationmsg: "Plan Name",placeholder:"Plan Name" },
        { name: "NewTerm_New",label: "New Term",inputType: "text",required: true,validationmsg: "Enter a New Term",placeholder:"New Term" },
        // { name: "NewPremium",label: "New Premium",inputType: "text",required: false,validationmsg: "New Premium",placeholder:"New Premium" },
        { name: "ReasonForChange_New",label: "Reason For Change",inputType: "text",disabled:true,required: false,validationmsg: "Reason For Change",placeholder:"Reason For Change" },
        // { name: "ViewBranchComments",label: "View Requestor Comments",inputType: "text",required: false,validationmsg: "View Requestor Comments",placeholder:"View Requestor Comments" },
        { name: "ViewRequestForm",label: "View Request Form",inputType: "link",linkValue:"View"},
        { name: "ViewSupportingDocument",label: "View Supporting Document",inputType: "link",linkValue:"View" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", hide: true, disabled:true,inputType: "text",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "BranchComments",label: "Requestor Comments",inputType: "text",required: true,disabled:true,validationmsg: "Requestor Comments",placeholder:"Requestor Comments" },
        { name: "LifeAsiaUpdated",label: "Life Asia Updated",inputType: "radio",required: true,validationmsg: "required",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter a Comments",placeholder:"Comment Box" },
      ]
    },
    changeinsumassured:{
      Existing_SumAssured_Details:[
        { name: "SumAssured_Old",label: "Sum Assured",inputType: "text",disabled:true,required: true,validationmsg: "Existing Sum Assured is Missing",placeholder:"Existing Sum Assured" },
        { name: "CurrentPremium_Old",label: "Current Premium",inputType: "text",disabled:true,required: true,validationmsg: "Current Premium is Missing",placeholder:"Current Premium" },
        // { name: "Change Allowed",label: "Change Allowed",inputType: "text",required: false,validationmsg: "Change Allowed",placeholder:"Change Allowed" },
      ],
      Update_SumAssured_Details:[
        { name: "SumAssured_New",label: "New Sum Assured",inputType: "text",required: true,validationmsg: "Enter a New Sum Assured",placeholder:"New Sum Assured" },
        // { name: "NewPremium",label: "New Premium",inputType: "text",required: false,validationmsg: "New Premium",placeholder:"New Premium" },
        { name: "ReasonForChange_New",label: "Reason For Change in Sum Assured",inputType: "text",required: true,validationmsg: "Enter a Reason For Change in Sum Assured",placeholder:"Reason For Change in Sum Assured" },
      ],
      Upload_Fields:[
        { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form",indexName:"Minor Alteration", },
        { name: "UploadSupportingDocument",label: "Upload Supporting Document",inputType: "upload",required: false,validationmsg: "Upload Supporting Document",placeholder:"Upload Supporting Document",indexName:"Minor Alteration", },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select a Validate Siganture",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
     
      Share_Process_Communication:[
        { name: "ShareProcessCommunication",label: "Share Process Communication",inputType: "icons",required: false,validationmsg: "Select Share Soft Copy Policy Documnet" },
       ], 
       POS_Details:[
        { name: "SumAssured_New",label: "New Sum Assured",inputType: "text",disabled:true,required: false,validationmsg: "Update New Sum Assured",placeholder:"New Sum Assured" },
        // { name: "NewPremium",label: "New Premium",inputType: "text",required: false,validationmsg: "New Premium",placeholder:"New Premium" },
        { name: "ReasonForChange_New",label: "Reason For Change in Sum Assured",inputType: "text",disabled:true,required: false,validationmsg: "Reason For Change in Sum Assured",placeholder:"Reason For Change in Sum Assured" },
        // { name: "ViewBranchComments",label: "View Requestor Comments",inputType: "text",required: false,validationmsg: "View Requestor Comments",placeholder:"View Requestor Comments" },
        { name: "ViewRequestForm",label: "View Request Form",inputType: "link",linkValue:"View"},
        { name: "ViewSupportingDocument",label: "View Supporting Document",inputType: "link",linkValue:"View" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,disabled:true,placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",required: false,disabled:true,validationmsg: "Select a Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "BranchComments",label: "Requestor Comments",inputType: "text",disabled:true,required: true,validationmsg: "Requestor Comments",placeholder:"Requestor Comments" },
        { name: "LifeAsiaUpdated",label: "Life Asia Updated",inputType: "radio",required: true,validationmsg: "required",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ]
    },
    changeinplan:{
      Existing_Plan_Details:[
        { name: "PlanName_Old",label: "Plan Name",inputType: "text",disabled:true,required: true,validationmsg: "Plan Name is Missing",placeholder:"Plan Name" },
        // { name: "PolicyPlan_Old",label: "Policy Plan",inputType: "text",disabled:true,required: false,validationmsg: "Policy Plan",placeholder:"Policy Plan" },
        { name: "CurrentPremium_Old",label: "Current Premium",inputType: "text",disabled:true,required: true,validationmsg: "Current Premium is Missing",placeholder:"Current Premium" },
        // { name: "Change Allowed",label: "Change Allowed",inputType: "text",required: false,validationmsg: "Change Allowed",placeholder:"Change Allowed" },
        // { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      Update_Plan_Details:[
        // { name: "PlanName",label: "Plan Name",inputType: "text",required: false,validationmsg: "Plan Name",placeholder:"Plan Name" },
        { name: "NewPlan_New",label: "New Plan",inputType: "text",required: true,validationmsg: "New Plan",placeholder:"New Plan" },
        // { name: "NewPremium",label: "New Premium",inputType: "text",required: false,validationmsg: "New Premium",placeholder:"New Premium" },
        { name: "ReasonForChange_New",label: "Reason For Change",inputType: "text",required: true,validationmsg: "Reason For Change",placeholder:"Reason For Change" },
      ],
      Upload_Fields:[
        { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form",indexName:"Minor Alteration", },
        { name: "UploadSupportingDocument",label: "Upload Supporting Document",inputType: "upload",required: false,validationmsg: "Upload Supporting Document",placeholder:"Upload Supporting Document",indexName:"Minor Alteration", },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select a Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
     
      Share_Process_Communication:[
        { name: "ShareProcessCommunication",label: "Share Process Communication",inputType: "icons",required: false,validationmsg: "Select Share Soft Copy Policy Documnet" },
       ], 
       
    
       POS_Details:[
        // { name: "PlanName_Old",label: "Plan Name",inputType: "text",disabled:true,required: false,validationmsg: "Plan Name",placeholder:"Plan Name" },
        { name: "NewPlan_New",label: "New Plan",inputType: "text",required: true,validationmsg: "Enter a New Plan",placeholder:"New Plan" },
        // { name: "NewPremium",label: "New Premium",inputType: "text",required: false,validationmsg: "New Premium",placeholder:"New Premium" },
        { name: "ReasonForChange_New",label: "Reason For Change",inputType: "text",disabled:true,required: false,validationmsg: "Reason For Change",placeholder:"Reason For Change" },
        // { name: "ViewBranchComments",label: "View Requestor Comments",inputType: "text",required: false,validationmsg: "View Requestor Comments",placeholder:"View Requestor Comments" },
        { name: "ViewRequestForm",label: "View Request Form",inputType: "link",linkValue:"View"},
        { name: "ViewSupportingDocument",label: "View Supporting Document",inputType: "link",linkValue:"View" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", hide: true,disabled:true, inputType: "text",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "BranchComments",label: "Requestor Comments",inputType: "text",required: true,disabled:true,validationmsg: "Requestor Comments",placeholder:"Requestor Comments" },
        { name: "LifeAsiaUpdated",label: "Life Asia Updated",inputType: "radio",required: true,validationmsg: "required",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter a Comments",placeholder:"Comment Box" },
      ]
    },
    changeinpremium:{
      Existing_Premium_Details:[
        { name: "PlanName_Old",label: "Plan Name",inputType: "text",disabled:true,required: true,validationmsg: "Plan Name is Missing",placeholder:"Plan Name" },
        // { name: "PolicyPlan_Old",label: "Policy Plan",inputType: "text",disabled:true,required: false,validationmsg: "Policy Plan",placeholder:"Policy Plan" },
        { name: "CurrentPremium_Old",label: "Current Premium",inputType: "text",disabled:true,required: true,validationmsg: "Current Premium is Missing",placeholder:"Current Premium" },
        // { name: "Change Allowed",label: "Change Allowed",inputType: "text",required: false,validationmsg: "Change Allowed",placeholder:"Change Allowed" },
        // { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      Update_Premium_Details:[
        // { name: "PlanName",label: "Plan Name",inputType: "text",required: false,validationmsg: "Plan Name",placeholder:"Plan Name" },
        { name: "NewPremium_New",label: "New Premium",inputType: "text",required: true,validationmsg: "New Premium",placeholder:"New Premium" },
        // { name: "NewPremium",label: "New Premium",inputType: "text",required: false,validationmsg: "New Premium",placeholder:"New Premium" },
        { name: "ReasonForChange_New",label: "Reason For Change",inputType: "text",required: true,validationmsg: "Reason For Change",placeholder:"Reason For Change" },
      ],
      Upload_Fields:[
        { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form",indexName:"Minor Alteration", },
        { name: "UploadSupportingDocument",label: "Upload Supporting Document",inputType: "upload",required: false,validationmsg: "Upload Supporting Document",placeholder:"Upload Supporting Document",indexName:"Minor Alteration", },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select a Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
           
      Share_Process_Communication:[
        { name: "ShareProcessCommunication",label: "Share Process Communication",inputType: "icons",required: false,validationmsg: "Select Share Soft Copy Policy Documnet" },
       ], 
       POS_Details:[
        // { name: "PlanName_Old",label: "Plan Name",inputType: "text",disabled:true,required: false,validationmsg: "Plan Name",placeholder:"Plan Name" },
        { name: "NewPremium_New",label: "New Premium",inputType: "text",required: true,validationmsg: "Enter a New Premium",placeholder:"New Premium" },
        // { name: "NewPremium",label: "New Premium",inputType: "text",required: false,validationmsg: "New Premium",placeholder:"New Premium" },
        { name: "ReasonForChange_New",label: "Reason For Change",inputType: "text",disabled:true,required: false,validationmsg: "Reason For Change",placeholder:"Reason For Change" },
        // { name: "ViewBranchComments",label: "View Requestor Comments",inputType: "text",required: false,validationmsg: "View Requestor Comments",placeholder:"View Requestor Comments" },
        { name: "ViewRequestForm",label: "View Request Form",inputType: "link",linkValue:"View"},
        { name: "ViewSupportingDocument",label: "View Supporting Document",inputType: "link",linkValue:"View" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", hide: true, disabled:true,inputType: "text",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",disabled:true,required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "BranchComments",label: "Requestor Comments",inputType: "text",required: true,disabled:true,validationmsg: "Requestor Comments",placeholder:"Requestor Comments" },
        { name: "LifeAsiaUpdated",label: "Life Asia Updated",inputType: "radio",required: true,validationmsg: "required",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ]
    },
    changeindob:{
      Existing_DOB_Details:[
        { name: "ClientRole_Existing",label: "Client Role",disabled:true, inputType: "text",required: true,validationmsg: "Client Role",placeholder:"Client Role" },
        { name: "ExistingDateofBirth_Existing",label: "Existing Date of Birth",disabled:true, inputType: "text",required: true,validationmsg: "Existing Date of Birth",placeholder:"Existing Date of Birth" },
        { name: "Age_Existing",label: "Age",inputType: "text",required: true,disabled:true, validationmsg: "Age",placeholder:"Age" },
      ],
      Update_DOB_Details:[
        { name: "custRole",label: "Client Role",inputType: "dropdown",required: true,validationmsg: "Client Role",placeholder:"Client Role" },
        { name: "NewDateofBirth",label: "New Date of Birth",inputType: "nofuturedates",required: true,validationmsg: "New Date of Birth",placeholder:"New Date of Birth" },
        { name: "Age",label: "Age",inputType: "text",required: true,validationmsg: "Age",placeholder:"Age" },
        { name: "RefertoNBStageDocument",label: "Error at NB Stage",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "InitiateRequestBy",label: "Initiate Request By",inputType: "radio",required: true,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
      ],
      RequestForm_Fields:[
        { name: "UploadDOBProof",label: "Upload DOB Proof",inputType: "upload",required: true,validationmsg: "Upload DOB Proof",placeholder:"Upload DOB Proof" },
        { name: "UploadIdProof",label: "Upload Id Proof",inputType: "upload",required: true,validationmsg: "Upload Id Proof",placeholder:"Upload Id Proof" },
        { name: "UploadAddressProof",label: "Upload Address Proof",inputType: "upload",required: true,validationmsg: "Upload Address Proof",placeholder:"Upload Address Proof" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Branch Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission", hide:true, required: true,},
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        
        // { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
      ],
      // ReasonSubmission:[
      //   { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
      // ],
      Comments:[
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],  
      Share_Process_Document:[
        { name: "ShareProcessDocument",label: "Share Process Document",inputType: "icons" },
       ], 
      POS_Details:[
        { name: "custRole",label: "Client Role",inputType: "text",required: false,validationmsg: "Client Role",placeholder:"Client Role", disabled:true},
        { name: "NewDateofBirth",label: "New Date of Birth",inputType: "text",required: false,validationmsg: "New Date of Birth",placeholder:"DD/MM/YYYY" , disabled:true},
        { name: "ViewDocuments",label: "Documents",inputType: "title" },
        // { name: "texts",label: "",inputType: "texts"},
        { name: "ViewRequestForm",label: "Uploaded Documents",inputType: "link",linkValue:"View",required: false,validationmsg: "View Request Form",placeholder:"View Request Form" },
        { name: "RefertoNBStageDocument",label: "Error at NB Stage",inputType: "radio",class:'disabled',required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
       
        // { name: "ViewSupportingDocument",label: "View Supporting Document",inputType:"link",linkValue:"View",required: false,validationmsg: "View Supporting Document",placeholder:"View Supporting Document" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text", disabled:true, required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", hide:true},
        { name: "BranchReceivedDate", label: "Branch Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date",hide:true },
        { name: "ReasonForDelayy", label: "Reason For Delayed Submission",disabled:true, inputType: "text",placeholder: "Reason for Delayed Submission", hide:true },
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",class:'disabled',required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",hide:true },
        { name: "BranchComments",label: "Requestor Comments",inputType: "text",required: false,disabled:true,validationmsg: "Requestor Comments",placeholder:"Requestor Comments", hide:true  },
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ]
    },
    changeindobnomineeappointee:{
      Existing_DOB_Details:[
        { name: "ClientRole",label: "Client Role",inputType: "text",required: false,validationmsg: "Client Role",placeholder:"Client Role" },
        { name: "ExistingDateofBirth",label: "Existing Date of Birth",inputType: "text",required: false,validationmsg: "Existing Date of Birth",placeholder:"Existing Date of Birth" },
        { name: "Age",label: "Age",inputType: "text",required: false,validationmsg: "Age",placeholder:"Age" },
      ],
      Update_DOB_Details:[
        { name: "custRole",label: "Client Role",inputType: "dropdown",required: false,validationmsg: "Client Role",placeholder:"Client Role" },
        { name: "NewDateofBirth",label: "New Date of Birth",inputType: "date",required: false,validationmsg: "New Date of Birth",placeholder:"New Date of Birth" },
        { name: "Age",label: "Age",inputType: "text",required: false,validationmsg: "Age",placeholder:"Age" },
        { name: "RefertoNBStageDocument",label: "Error at NB Stage",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "InitiateRequestBy",label: "Initiate Request By",inputType: "radio",required: false,validationmsg: "",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",},
      ],
      RequestForm_Fields:[
        { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: false,validationmsg: "Upload Request Form",placeholder:"Upload Request Form" },
        { name: "UploadSupportingDocument",label: "Upload Supporting Document",inputType: "upload",required: false,validationmsg: "Upload Supporting Document",placeholder:"Upload Supporting Document" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedate",required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedate",required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ],
      ReasonSubmission:[
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
      ],
      Comments:[
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],  
      Share_Process_Document:[
        { name: "ShareProcessDocument",label: "Send Change in DOB Process",inputType: "icons" },
       ], 
       POS_Details:[
        { name: "custRole",label: "Client Role",inputType: "dropdown",required: false,validationmsg: "Client Role",placeholder:"Client Role" },
        { name: "NewDateofBirth",label: "New Date of Birth",inputType: "text",required: false,validationmsg: "New Date of Birth",placeholder:"DD/MM/YYYY" },
        { name: "ViewDocuments",label: "View Documents",inputType: "title" },
        // { name: "texts",label: "",inputType: "texts"},
        { name: "RefertoNBStageDocument",label: "Error at NB Stage",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "ViewRequestForm",label: "View Request Form",inputType: "link",linkValue:"View",required: false,validationmsg: "View Request Form",placeholder:"View Request Form" },
        { name: "ViewSupportingDocument",label: "View Supporting Document",inputType:"link",linkValue:"View",required: false,validationmsg: "View Supporting Document",placeholder:"View Supporting Document" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      ]
    },
    additionofrider:{
      BOE_Details:[
        // { name: "RequestFor",label: "Request For",inputType: "radio",required: true,validationmsg: "Select a RequestFor",title:"Addition",secondTitle:"Deletion",radioValue:"addition",secondRadioValue:"deletion",},
        { name: "RiderName",label: "Rider Name",inputType: "text",required: true,validationmsg: "Rider Name",placeholder:"Rider Name" },
        { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form",indexName:"Minor Alteration", },
        { name: "UploadSupportingDocument",label: "Upload Supporting Document",inputType: "upload",required: false,validationmsg: "Upload Supporting Document",placeholder:"Upload Supporting Document",indexName:"Minor Alteration", },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select a Validate Siganture",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      POS_Details:[
        // { name: "RequestFor",label: "Request For",inputType: "radio",required: true,disabled:true,validationmsg: "Select a RequestFor",title:"Addition",secondTitle:"Deletion",radioValue:"addition",secondRadioValue:"deletion",},
        { name: "RiderName",label: "Rider Name",inputType: "text",disabled:true,required: true,validationmsg: "Rider Name",placeholder:"Rider Name" },
        { name: "ViewRequestForm",label: "View Request Form",inputType: "link",linkValue:"View"},
        { name: "ViewSupportingDocument",label: "View Supporting Document",inputType: "link",linkValue:"View" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,disabled:true,placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",required: false,disabled:true,validationmsg: "Select a Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "BranchComments",label: "Requestor Comments",inputType: "text",disabled:true,required: false,validationmsg: "Requestor Comments",placeholder:"Requestor Comments" },
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ]
    },
    deletionofrider:{
      BOE_Details:[
        // { name: "RequestFor",label: "Request For",inputType: "radio",required: true,validationmsg: "Select a RequestFor",title:"Addition",secondTitle:"Deletion",radioValue:"addition",secondRadioValue:"deletion",},
        { name: "RiderName",label: "Rider Name",inputType: "text",required: true,validationmsg: "Rider Name",placeholder:"Rider Name" },
        { name: "UploadRequestForm",label: "Upload Request Form",inputType: "upload",required: true,validationmsg: "Upload Request Form",placeholder:"Upload Request Form",indexName:"Minor Alteration", },
        { name: "UploadSupportingDocument",label: "Upload Supporting Document",inputType: "upload",required: false,validationmsg: "Upload Supporting Document",placeholder:"Upload Supporting Document",indexName:"Minor Alteration", },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select a Validate Siganture",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      POS_Details:[
        // { name: "RequestFor",label: "Request For",inputType: "radio",required: true,disabled:true,validationmsg: "Select a RequestFor",title:"Addition",secondTitle:"Deletion",radioValue:"addition",secondRadioValue:"deletion",},
        { name: "RiderName",label: "Rider Name",inputType: "text",disabled:true,required: true,validationmsg: "Rider Name",placeholder:"Rider Name" },
        { name: "ViewRequestForm",label: "View Request Form",inputType: "link",linkValue:"View"},
        { name: "ViewSupportingDocument",label: "View Supporting Document",inputType: "link",linkValue:"View" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,disabled:true,placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Signature Validated",inputType: "radio",required: false,disabled:true,validationmsg: "Select a Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "BranchComments",label: "Requestor Comments",inputType: "text",disabled:true,required: false,validationmsg: "Requestor Comments",placeholder:"Requestor Comments" },
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ]
    },
    changeinsignature:{
      BOE_Details: [
        { name: "custRole",label: "Signature to be Changed For ?", inputType: "dropdown",required: true,validationmsg: "Select Signature to be Changed For ",placeholder:"Select" },
        { name: "ExistingSignature",label: "Existing Signature",inputType: "link",linkValue: "View",required: false,validationmsg: "Select Existing Signature",placeholder:"Existing Signature" },
        { name: "UpdateNewSignaure",label: "Update New Signaure",inputType: "titlecheckbox",required: false,validationmsg: "Update New Signaure",placeholder:"Update New Signaure" },
        { name: "ShareSignatureUpdateProcess",label: "Share Signature Update Process",inputType: "titlecheckbox",required: true,validationmsg: "Share Signature Update Process",placeholder:"Share Signature Update Process" },
      ],
      Update_New_Signature_Fields: [
        {name:"requestform",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form",indexName:"Signature"},
        //{ name: "SignatureProof",label: "Signature Proof",inputType: "link", linkValue:"List of valid proof to display",required: false,validationmsg: "Upload Signature Proof",placeholder:"Signature Proof" },

        {name: 'addressProof',label: 'Signature Proof',inputType: "text", linkValue:"List of valid proof to display", required: true,validationmsg: "",disabled:false,placeholder:"Documents Uploaded - 0", indexName:"Bank Details Updation", icon:'upload'},
        
        { name: "SpecimenSignature",label: "Specimen Signature",inputType: "upload",required: true,validationmsg: "Specimen Signature",placeholder:"Specimen Signature",indexName:"Signature"},
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required: true,validationmsg: "Customer Signing Date",placeholder: "Select a date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required: true,validationmsg: "Request Received Date",placeholder: "Select a date", },
        { name: "resonfordelay", label: "Reason For Delayed Submission", hide:true,inputType: "text",placeholder: "Reason for Delayed Submission",required: true,validationmsg: "Reason for Delayed Submission", },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      Signature_Process_Fields:[
        {name: 'SignatureUpdateProcess',label: 'Signature Update Process',inputType: "icons",required: false,validationmsg: "",placeholder:"Send Via" },
      ],
      POS_Details:[
        { name: "OldSignatureSpecimen",label: "Old Signature Specimen",inputType: "link",linkValue:"View",required: false,validationmsg: "Old Signature Specimen",placeholder:"Old Signature Specimen" },
        { name: "RequestForm",label: "Request Form",inputType: "link",linkValue:"View",required: false,validationmsg: "Request Form",placeholder:"Request Form" },
        { name: "NewSignatureSpecimen",label: "New Signature Specimen",inputType: "link",linkValue:"View",required: false,validationmsg: "New Signature Specimen",placeholder:"New Signature Specimen" },
        { name: "SignatureProof",label: "Signature Proof",inputType: "link",linkValue:"View",required: false,validationmsg: "Signature Proof",placeholder:"Signature Proof" },
        { name: "CustomerSigningDate", label: "Customer Signing Date", disabled:true,inputType: "text",placeholder: "DD/MM/YYYY", },
        { name: "BranchReceivedDate", label: "Request Received Date", disabled:true,inputType: "text",placeholder: "DD/MM/YYYY", },
        { name: "resonfordelay", label: "Reason For Delayed Submission", hide:true, disabled:true, inputType: "text",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio", class:'disabled', required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "BranchComments",label: "Requestor Comments",inputType: "text",disabled:true,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ]
    },
    agentcodecorrection:{
      Existing_AgentCode_Details:[
        { name: "AgentCode_Old",label: "Existing Agent Code",inputType: "text",disabled:true,required: true,validationmsg: "Existing Agent Code",placeholder: "Existing Agent Code" },
        // { name: "AgentName_Old",label: "Current Agent Name",inputType: "text",disabled:true,required: false,validationmsg: "Current Agent Name",placeholder: "Current Agent Name" },
        //   { name: "Channel_Old",label: "Current Channel",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder: "Current Channel" },
        // { name: "AgentBranch_Old",label: "Current Agent Branch",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder: "Current Agent Branch" },
        // { name: "CurrentCDF",label: "Current CDF",inputType: "link",linkValue:"View",required: false,validationmsg: "Current CDF",placeholder: "Current CDF" },
      ],
      Update_AgentCode_Details:[
        { name: "AgentCode_New",label: "New Agent Code",inputType: "agentcode",required: false,validationmsg: "Enter New Agent Code",placeholder: "New Agent Code" },
        { name: "AgentName_New",label: "Agent Name",inputType: "text",required: true,disabled:true,validationmsg: "Agent Name",placeholder: "Agent Name" },
        // { name: "Channel_New",label: "New Channel",inputType: "text",required: true,validationmsg: "Enter New Channel",placeholder: "New Channel" },
        // { name: "AgentBranch_New",label: "New Agent Branch",inputType: "text",required: true,validationmsg: "Enter New Agent Branch",placeholder: "New Agent Branch" },
        { name: "Reasonforagentcodechange",label: "Reason for Agent Code Change",inputType: "text",required: true,validationmsg: "Reason for Agent Code Change",placeholder: "Reason for Agent Code Change" },
        {name:"Agnet_Application_Number",label:"Agent Application Number",inputType:"number", pattern:'numbersOnly',maxlength:10,minlength:10, required:true,validationmsg:"Agent Application Number",placeholder:"Agent Application Number"},
        { name: "Agent_Signature_Verification",label: "Agent Signature Verification",inputType: "link",linkValue:"View",required: false,validationmsg: "Agent Signature Verification",placeholder: "Agent Signature Verification" },
        { name: "AgentSignaturVerificationResult",label: "Agent Signature Verification Result",inputType: "radio", required: true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "UploadCDF",label: "CDF",inputType: "upload",required: true,validationmsg: "Upload CDF",placeholder: "Upload CDF",indexName: "Agent Confidential Report" },
        { name: "ApprovalMail ",label: "Approval Mails",inputType: "upload",required: true,validationmsg: "Approval Mails",placeholder: "Approval Mails",indexName: "Agent Confidential Report" },
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
      ],
      POS_Details:[
        { name: "AgentCode_New",label: "New Agent Code",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder: "New Agent Code" },
        { name: "AgentName_New",label: "Agent Name",inputType: "text",disabled:true,required: false,validationmsg: "",placeholder: "Agent Name" },
        { name: "Reasonforagentcodechange",label: "Reason for Agent Code Change",disabled:true,inputType: "text",required: false,validationmsg: "",placeholder: "Reason for Agent Code Change" },
        { name: "BranchComments",label: "Requestor Comments",inputType: "text",required: false,disabled:true,validationmsg: "Enter Comments",placeholder:"Comment Box" },
       { name: "CDF",label: "Old CDF",inputType: "link",linkValue:"View",required: false,validationmsg: "Old CDF",placeholder: "Old CDF" },
       { name: "CDF",label: "New CDF",inputType: "link",linkValue:"View",required: false,validationmsg: "New CDF",placeholder: "New CDF" },
       { name: "Agent_Signature_Verification",label: "Agent Signature Verification",inputType: "link",linkValue:"View",required: false,validationmsg: "Agent Signature Verification",placeholder: "Agent Signature Verification" },
       { name: "ApprovalMail",label: "Approval Mail",inputType: "link",linkValue:"View",required: false,validationmsg: "Approval Mail",placeholder: "Approval Mail" },
       //{ name: "AgentSignaturVerificationResult",label: "Signature Verification Result",inputType: "text",required: false,validationmsg: "Signature Verification Result",placeholder: "Signature Verification Result" },
       { name: "AgentSignaturVerificationResult",label: "Agent Signature Verification Result",inputType: "radio", required: true,disabled:true,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "MatchSouringCodeUnderNewCDFandOldCDF",label: "Sourcing Code Matches New CDF",inputType: "radio", disabled:false, required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      //  { name: "Matchnewcodeandoldcoderelationship",label: "Match new code and old code relationship",inputType: "radio", disabled:true, required: false,validationmsg: "",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" }
    ]
    },
    policycontinuation:{
      BOE_Details:[
        { name: "options2",label: "Policy Continuance",inputType: "dropdown",required: true,validationmsg: "Policy Continuance",placeholder:"Policy Continuance" },
        { name: "PolicyContinuanceavaliabletill",label: "Policy Continuance avaliable till",inputType: "text",disabled:true,required: false,validationmsg: "Policy Continuance avaliable till",placeholder:"Policy Continuance avaliable till" },
        { name: "RequestForm",label: "Request Form",inputType: "upload",required: false,validationmsg: "Request Form",placeholder:"Request Form",indexName:"Minor Alteration", },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:true,validationmsg:"Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select a Validate Siganture",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ],
      POS_Details:[
        { name: "options2",label: "Policy Continuance",inputType: "text",disabled:true,required: true,validationmsg: "Policy Continuance",placeholder:"Policy Continuance" },
        { name: "PolicyContinuanceavaliabletill",label: "Policy Continuance avaliable till",inputType: "text",disabled:true,required: false,validationmsg: "Policy Continuance avaliable till",placeholder:"Policy Continuance avaliable till" },
        { name: "RequestForm",label: "Request Form",inputType: "link",linkValue:"View",disabled:true,required: false,validationmsg: "Request Form",placeholder:"Request Form",indexName:"Minor Alteration", },
        { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
        { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
        { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,required:true,validationmsg:"Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
        { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "Select a Validate Siganture",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea",disabled:true, maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
        { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      ]
    },
  }
    const OutBoundCallData={
     wrongcustomercontacted:{
          BOE_Details:[
          //  { name: "Reasonforcalling",label: "Reason For Calling",inputType: "text",required: true,validationmsg: "Enter Reason For Calling",placeholder:"Reason For Calling" },
           { name: "CallDate",label: "Call Date",inputType: "nofuturedates",required: true,validationmsg: "Enter Call Date",placeholder:"Call Date" },
           { name: "CallTime",label: "Call Time",inputType: "time",featureTime:true,required: true,validationmsg: "Enter Call Time",placeholder:"Call Time" },
          //  { name: "Spokewith",label: "Spoke With",inputType: "text",required: true,validationmsg: "Enter Spoke With",placeholder:"Spoke With" },
           { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
         ]
     },
     callback:{
       BOE_Details:[
        { name: "ResoanForCalling",label: "Reason For Calling",inputType: "text",required: true,validationmsg: "Enter Reason For Calling",placeholder:"Reason For Calling" },
        { name: "SpokeWith",label: "Spoke With",inputType: "text",required: false,validationmsg: "Enter Spoke With",placeholder:"Spoke With" },
        // { name: "CallDate",label: "Call Date",inputType: "nofuturedates",required: true,validationmsg: "Enter Call Date",placeholder:"Call Date" },
        // { name: "CallTime",label: "Call Time",inputType: "time",required: true,featureTime:true,validationmsg: "Enter Call Time",placeholder:"Call Time" },
       //  { name: "PreferedCallBackDate",label: "Call Back Reason",inputType: "text",required: true,validationmsg: "Call Back Reason",placeholder:"Call Back Reason" },
        { name: "PreferesCallBackDate",label: "Prefered Call Back Date",inputType: "nofuturedates",pastDate:true,required: true,validationmsg: "Prefered Call Back Date",placeholder:"Prefered Call Back Date" },
        { name: "PreferedCallBackTime",label: "Prefered Call Back Time",inputType: "time",required: true,validationmsg: "Prefered Call Back Time",placeholder:"Prefered Call Back Time" },
       //  {name:"texts",label:"",inputType:"texts"},
        { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
      ]
    },
}

const RefundData={
  autopaybouncecharges:{
    BOE_Details:[
      { name: "DueDate",label: "Due Date",inputType: "text",required: false,disabled:true,validationmsg: "Due Date",placeholder:"Due Date" },
      { name: "DebitDate",label: "Debit Date",inputType: "text",required: false,disabled:true,validationmsg: "Debit Date",placeholder:"Debit Date" },
      { name: "DebitAmount",label: "Debit Amount",inputType: "text",required: false,disabled:true,validationmsg: "Debit Amount",placeholder:"Debit Amount" },
      { name: "DebitStatus",label: "Debit Status",inputType: "text",required: false,disabled:true,validationmsg: "Debit Status",placeholder:"Debit Status" },
      { name: "DebitStatusReceivedOn",label: "Debit Status Received on",inputType: "text",required: false,disabled:true,validationmsg: "Debit Status Received on",placeholder:"Debit Status Received on" },
      { name: "PaymentDebitType",label: "Payment Debit Type",inputType: "text",required: false,disabled:true,validationmsg: "Debit Type",placeholder:"Debit Type" },
      { name: "BounceCharges",label: "Bounce Charges",inputType:"number",pattern:"numbersOnly",required: false,validationmsg: "Bounce Charges",placeholder:"Bounce Charges" },
     // {name:"UploadSupportingDocument",indexName:"Minor Alteration",label:"Upload Supporting Document",inputType:"upload",required:true,validationmsg:"Upload Supporting Document",placeholder:"Upload Supporting Document"},
    ],
    Customer_Choice_Details:[
      { name: "customerchoice",label: "Customer Choice",inputType: "radio",required: true,validationmsg: "Select Customer Choice",title:"OTP",secondTitle:"Request Form",radioValue:"otp",secondRadioValue:"requestform",placeholder:"Customer Choice" },
    ],
    Request_Details:[
      {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
      { name: "branchreceiveddate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
      { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:false,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    ],
    Comments:[
      { name: "RequestorComments",label: "Requestor Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
    ],
    POS_Details:[
      { name: "DueDate",label: "Due Date",inputType: "text",required: false,disabled:true,validationmsg: "Due Date",placeholder:"Due Date" },
      { name: "DebitDate",label: "Debit Date",inputType: "text",required: false,disabled:true,validationmsg: "Debit Date",placeholder:"Debit Date" },
      { name: "DebitAmount",label: "Debit Amount",inputType: "text",required: false,disabled:true,validationmsg: "Debit Amount",placeholder:"Debit Amount" },
      { name: "DebitStatus",label: "Debit Status",inputType: "text",required: false,disabled:true,validationmsg: "Debit Status",placeholder:"Debit Status" },
      { name: "DebitStatusReceivedOn",label: "Debit Status Received on",inputType: "text",required: false,disabled:true,validationmsg: "Debit Status Received on",placeholder:"Debit Status Received on" },
      { name: "PaymentDebitType",label: "Payment Debit Type",inputType: "text",required: false,disabled:true,validationmsg: "Debit Type",placeholder:"Debit Type" },
      { name: "BounceCharges",label: "Bounce Charges",inputType: "text",required: false,validationmsg: "Bounce Charges",placeholder:"Bounce Charges" },
    //  {name:"UploadSupportingDocument",indexName:"Minor Alteration",label:"Upload Supporting Document",inputType:"link",linkValue:"View",required:true,validationmsg:"Upload Supporting Document",placeholder:"Upload Supporting Document"},
      { name: "RequestForm",label: "Request Form",inputType: "link",linkValue:"View",hide:true,disabled:true,required: false,validationmsg: "Request Form",placeholder:"Request Form",indexName:"Minor Alteration", },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",hide:true,disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",hide:true,disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,disabled:true,hide:true,required:true,validationmsg:"Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",hide:true,disabled:true,required: false,validationmsg: "Select a Validate Siganture",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "RequestorComments",label: "Requestor Comments" ,inputType: "textarea",disabled:true, maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
    ],
  }
}

const AnnuityData={
  lifecertificatesubmitted:{
  Existing_Details:[
    { name: "LastCOEUpdateDate",label: "Last COE Update Date",inputType: "text",required: false,disabled:true,validationmsg: "Last COE Update Date",placeholder:"Last COE Update Date" },
    { name: "COEValidFrom",label: "COE Valid From",inputType: "text",required: false,disabled:true,validationmsg: "COE Valid From",placeholder:"COE Valid From" },
    { name: "COEValidTo",label: "COE Valid To",inputType: "text",required: false,disabled:true,validationmsg: "COE Valid To",placeholder:"COE Valid To" },
    { name: "AnnuityMode",label: "Annuity Mode",inputType: "text",required: false,disabled:true,validationmsg: "Annuity Mode",placeholder:"Annuity Mode" },
    { name: "AnnuityAmount",label: "Annuity Amount",inputType: "text",required: false,disabled:true,validationmsg: "Annuity Amount",placeholder:"Annuity Amount" },
    { name: "AnnuityPlan",label: "Annuity Plan",inputType:"text",required: false,disabled:true,validationmsg: "Annuity Plan",placeholder:"Annuity Plan" },
  ],
  Update_New_Details:[
    { name: "CertifyingAuthorityName",label: "Certifying Authority Name",inputType: "text",required: false,validationmsg: "Certifying Authority Name",placeholder:"Certifying Authority Name" },
    { name: "CertifyingDesignation",label: "Certifying Designation",inputType: "text",required: false,validationmsg: "Certifying Designation",placeholder:"Certifying Designation" },
    { name: "CertifyingAuthorityAddress",label: "Certifying Authority Address",inputType: "text",required: false,validationmsg: "Certifying Authority Address",placeholder:"Certifying Authority Address" },
    { name: "CertifyingDate",label: "Certifying Date",inputType: "date",required: false,validationmsg: "Certifying Date",placeholder:"Certifying Date" },
    { name: "COEValidFrom",label: "COE Valid From",inputType: "date",required: false,validationmsg: "COE Valid From",placeholder:"COE Valid From" },
    { name: "COEValidTo",label: "COE Valid To",inputType: "date",required: false,validationmsg: "COE Valid To",placeholder:"COE Valid To" },
    {name:"requestform",indexName:"Minor Alteration",label:"Upload Request Form",inputType:"upload",required:true,validationmsg:"Upload Request Form",placeholder:"Request Form"},
    { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "nofuturedates",required:true,validationmsg:"Select Customer Signing Date",placeholder: "Select a date", },
    { name: "branchreceiveddate", label: "Request Received Date", inputType: "nofuturedates",required:true,validationmsg:"Select Request Received Date",placeholder: "Select a date", },
    { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",hide:true,required:false,validationmsg:"Enter Reason For Delay",placeholder: "Reason for Delayed Submission" },
    { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",required: true,validationmsg: "Select Validate Signature",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
    { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea", maxlength:500,required: true,validationmsg: "Enter Comments",placeholder:"Comment Box" }
  ],
  Share_CEO_Details:[
    {name: 'SendCOELink',label: 'Send COE Link',inputType: "icons",required: false,validationmsg: "Send COE Link",placeholder:"Send COE Link" },
   ],
    POS_Details:[
      {name:"View Updated Details",label:"View Updated Details",inputType:"title"},
      {name:"name",label:"",inputType:"texts"},
      { name: "CertifyingAuthorityName",label: "Certifying Authority Name",inputType: "text",required: false,disabled:true,validationmsg: "Certifying Authority Name",placeholder:"Certifying Authority Name" },
      { name: "CertifyingDesignation",label: "Certifying Designation",inputType: "text",required: false,disabled:true,validationmsg: "Certifying Designation",placeholder:"Certifying Designation" },
      { name: "CertifyingAuthorityAddress",label: "Certifying Authority Address",inputType: "text",required: false,disabled:true,validationmsg: "Certifying Authority Address",placeholder:"Certifying Authority Address" },
      { name: "CertifyingDate",label: "Certifying Date",inputType: "text",required: false,disabled:true,validationmsg: "Certifying Date",placeholder:"Certifying Date" },
      { name: "COEValidFrom",label: "COE Valid From",inputType: "text",required: false,disabled:true,validationmsg: "COE Valid From",placeholder:"COE Valid From" },
      { name: "COEValidTo",label: "COE Valid To",inputType: "text",required: false,disabled:true,validationmsg: "COE Valid To",placeholder:"COE Valid To" },
      { name: "AnnuityMode",label: "Annuity Mode",inputType: "text",required: false,disabled:true,validationmsg: "Annuity Mode",placeholder:"Annuity Mode" },
      { name: "AnnuityAmount",label: "Annuity Amount",inputType: "text",required: false,disabled:true,validationmsg: "Annuity Amount",placeholder:"Annuity Amount" },
      { name: "AnnuityPlan",label: "Annuity Plan",inputType:"text",required: false,disabled:true,validationmsg: "Annuity Plan",placeholder:"Annuity Plan" },
      { name: "RequestForm",label: "Request Form",inputType: "link",linkValue:"View",disabled:true,required: false,validationmsg: "Request Form",placeholder:"Request Form",indexName:"Minor Alteration", },
      { name: "CustomerSigningDate", label: "Customer Signing Date", inputType: "text",disabled:true,required:false,validationmsg:"Customer Signing Date",placeholder: "Customer Signing Date", },
      { name: "BranchReceivedDate", label: "Request Received Date", inputType: "text",disabled:true,required:false,validationmsg:"Request Received Date",placeholder: "Request Received Date", },
      { name: "ReasonForDelay", label: "Reason For Delayed Submission", inputType: "text",disabled:true,hide:true,required:true,validationmsg:"Reason For Delayed Submission",placeholder: "Reason for Delayed Submission" },
      { name: "ValidateSignature",label: "Validate Signature",inputType: "radio",disabled:true,required: false,validationmsg: "Select a Validate Siganture",title:"Yes",secondTitle:"No",radioValue:"yes",secondRadioValue:"no",},
      { name: "Comments",label: "Requestor  Comments" ,inputType: "textarea",disabled:true, maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
      { name: "Comments",label: "Authorizer Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Comment Box" },
    ],
  }
}

export {Data,GeneralInformationData,PaymentReProcessingData,PartialComplaintData,ProductRelatedData,PolicyBondData,OPSInitiativeData,CallRelatedData,ProcessEnquiryData,CustomerPortalData,WebsiteData,AssignmentData,PaymentRelatedData,ChequeRepresentationData,ContractAlterationData,OutBoundCallData,RefundData,AnnuityData};


export const CALL_TyPES = [
  // { value: 'surrenderretain', label: 'Surrender Retain' },
  // { value: 'renewal', label: 'Renewal' },
  // { value: 'senddocuments', label: 'Send Documnets' },
  {value: 'contactdetailsupdate', label: 'Contact Details Update'},
  {value: 'contractalteration', label: 'Contract Alteration'},
  {value: 'partialwithdrawalrequest',label: 'Partial Withdrawal Request'},
  {value: 'surrender',label: 'Surrender'},
  {value: 'nomination', label: 'Nomination'},
  {value: 'annuity', label: 'Annuity'},
  {value: 'loanpolicy', label: 'Loan Policy'},
  {value: 'paymentrelated', label: 'Payment Related'},
  {value: 'freelook', label: 'Freelook'},
  {value: 'bankdetails', label: 'Bank Details'},
  {value: 'servicingdocuments', label: 'Servicing Documents'},
  {value: 'revival', label: 'Revival'},
];
export const SUB_TYPES = [
  // { value: 'TBD', label: 'List TBD' },
  // { value: 'renewalinfo', label: 'Renewal Info' },
  { value: 'contactNumberUpdate', label: 'Contact Number Update'},
  { value: 'emailupdate', label: 'Email Update'},
  { value: 'alternatenumberupdate', label: 'Alternate Number Update'},
  { value: 'worknumberupdate', label: 'Work Number Update'},
  {value: 'addresschange', label: 'Address Change'},


];
export const PAN_SUBTYPES = [
  {value: 'panupdate',label:"PAN Update"},
  {value: 'aadharupdate', label:'Aadhar Update'},
  {value: 'changeinname', label:'Change in Name'},
  {value: 'changeinsignature', label: 'Change in Signature'},
  {value: 'changeindob', label: 'Change in DOB -LA/Proposer'},
  {value: 'changeindobnominee', label: 'Change in DOB -Nominee/Appointee'},
  {value: 'changeinownership',label: 'Change in Ownership'},
  {value: 'gstinupdate', label: 'GSTIN Update'},
  {value: 'agentcodecorrection', label: 'Agent Code Correction'},
  {value: 'changeinterm', label: 'Change in Term'},
  {value: 'changeinplan',label: 'Change in Plan'},
  {value: 'changeinsumassured', label: 'Change in Sum Assured'},
  {value: 'rideraddition', label: 'Rider Addition/Deletion'},
]
export const WITHDRAWAL_SUBTYPES = [
  {value: 'statusenquiry', label: 'Status Enquiry'},
  {value: 'partialwithdrawalrequest',label: 'Partial Withdrawal Request'},

]
export const SURRENDER_SUBTYPES = [
  {value: 'surrenderretained', label: 'Surrender Retained'},
  {value: "surrenderrequest", label: 'Surrender Request'},
  {value: "surrendervalue", label: 'Surrender Value'},
  {value: "rechecksurrenderpayout", label: 'Recheck Surrender Payout'},
]
export const SURRENDERREQUEST_SUBTYPES = [
  {value: "surrenderrequest", label: 'Surrender Request'},
]
export const NOMINEE_SUBTYPES = [
  {value: 'changeinnominee', label: 'Change in Nominee'},
  {value: 'changeinappointee', label: 'Change in Appointee'},
]
export const ANNUITY_SUBTYPES = [
  {value: 'lifecertificatesubmitted', label: 'Life Certificate Submitted'},
]
export const LOAN_SUBTYPES = [
  {value: 'loanrequest', label: 'Loan Request'},
]
export const PAYMENT_SUBTYPES = [
  {value: 'changeinmode', label: 'Change in Mode / Frequency'},
  {value: 'paymentlink', label: 'Payment Link'},
]
export const FREELOOK_SUBTYPES = [
  {value: 'freelookrequest', label: 'Register Freelook Request'},
]
export const BANKDETAILS_SUBTYPES = [
  {value: 'updation', label: 'Updation'},
]
export const SERVICING_SUBTYPES = [
  {value: 'renewalpremiumreceipt', label: 'Renewal Premium Receipt'},
  {value: 'premiumpaidcertificate', label: 'Premium Paid Certificate'},
  {value: 'discontinuancenotice', label: 'Discontinuance Notice'},
  {value: 'sis', label: 'SIS'},
  {value: 'bonus', label: 'Bonus'},
]
export const REVIVAL_SUBTYPES = [
  {value: 'revivalwithdgh', label: 'Revival With DGH'},
  {value: 'revivalquotation', label: 'Revival Quotation'},
  {value: 'revivalstatusenquiry', label: 'Status Enquiry'},
]

export const Alternate_Number_Update = [
  { value: "existingdetails",label: "Existing Details",inputType: "title",required: false,validationmsg: "" },
  { value: "alternatenumber",label: "Alternate Number",inputType: "text",required: false,validationmsg: "" },
]
export const NEW_ALTERNATE_NUMBER = [
  { value: "newdetails",label: "New Details",inputType: "title",required: false,validationmsg: "" },
  { value: "newalternatenumber",label: "Alternate Number",inputType: "text",required: false,validationmsg: "" },
]
export const Work_Number_Update = [
  { value: "existingdetails",label: "Existing Details",inputType: "title",required: false,validationmsg: "" },
  { value: "worknumber",label: "Work Number",inputType: "text",required: false,validationmsg: "" },
]
export const NEW_WORK_NUMBER = [
  { value: "newdetails",label: "New Details",inputType: "title",required: false,validationmsg: "" },
  { value: "newworknumber",label: "Work Number",inputType: "text",required: false,validationmsg: "" },
]
export const Email_Update = [
  { value: "existingdetails",label: "Existing Details",inputType: "title",required: false,validationmsg: "" },
  { value: "emailid",label: "Email ID",inputType: "text",required: false,validationmsg: "" },
]
export const NEW_EMAIL_NUMBER = [
  { value: "newdetails",label: "New Details",inputType: "title",required: false,validationmsg: "" },
  { value: "newemailid",label: "Email ID",inputType: "text",required: false,validationmsg: "" },
 
]
export const Contact_Number = [
  { value: "existingdetails",label: "Existing Details",inputType: "title",required: false,validationmsg: "" },
  { value: "mobileno",label: "Mobile Number",inputType: "text",required: false,validationmsg: "",placeholder:"Enter  Mobile Number" },
]
export const NEW_CONTACT_NUMBER = [
  { value: "newdetails",label: "New Details",inputType: "title",required: false,validationmsg: "" },
  { value: "newmobileno",label: "Mobile Number",inputType: "text",required: false,validationmsg: "",placeholder:"Enter  Mobile Number" },
]

export const PAN_UPDATE = [
  { value: "panupdate",label: "PAN Update For",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Select PAN Update" },
  { value: "name",label: "Name",inputType: "text",required: false,validationmsg: "",placeholder:"Name" },
  { value: "dob",label: "DOB",inputType: "text",required: false,validationmsg: "",placeholder:"DD/MM/YYYY" },
  { value: "panno",label: "PAN No",inputType: "text",required: false,validationmsg: "",placeholder:"Enter  PAN No" },
  { value: "panvalidation",label: "PAN Validation",inputType: "text",required: false,validationmsg: "" },
  { value: "panaadharseeding",label: "PAN Aadhar Seeding",inputType: "text",required: false,validationmsg: "" },
  { value: "uploadpan",label: "Upload PAN",inputType: "upload",required: false,validationmsg: "",placeholder:"Upload PAN" },
  { value: "fillingcheck",label: "Last 2 Year ITR Filling Check",inputType: "text",required: false,validationmsg: "",placeholder:"Last 2 Year ITR FIlling" },
  {name:"panupdateprocess",label:"PAN Update Process",inputType:"radios",isRequired:true,validationMsg:""},
  {name:"panupdateform",label:"PAN Update Form",inputType:"radios",isRequired:true,validationMsg:""},
]
export const AADHAR_UPDATE = [
  { value: "aadharupdate",label: "Aadhar Update For",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Select Aadhar Update" },
  { value: "name",label: "Name",inputType: "text",required: false,validationmsg: "", placeholder:"Name" },
  { value: "dob",label: "DOB",inputType: "text",required: false,validationmsg: "",placeholder:"DD/MM/YYYY" },
  { value: "panno",label: "Aadhar No",inputType: "text",required: false,validationmsg: "",placeholder:"Enter  Aadhar No" },
  // { value: "otp",label: "Enter OTP",inputType: "text",required: false,validationmsg: "" },
  { value: "aadharvalidation",label: "Aadhar Validation Result",inputType: "text",required: false,validationmsg: "" },
  { value: "uploadaadhar",label: "Upload Aadhar Card",inputType: "upload",required: false,validationmsg: "",placeholder:"Upload PAN" },
  {name:"aadharupdateprocess",label:"Aadhar Update Process",inputType:"radios",isRequired:true,validationMsg:""},
]
export const POS_SCREEN_PAN = [
  { value: "panupdate",label: "PAN Update For",inputType: "dropdown",required: false,validationmsg: "",placeholder:"PAN Update For" },
  { value: "clientid",label: "Client ID",inputType: "text",required: false,validationmsg: "",placeholder:"Client ID" },
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "poname",label: "PO Name",inputType: "text",required: false,validationmsg: "",placeholder:"PO Name" },
  { value: "laname",label: "LA Name",inputType: "text",required: false,validationmsg: "",placeholder:"LA Name" },
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  {name:"premium",label:"Premium",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Premium"},
  {name:"panvalidation",label:"Pan Validation Result Details",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Pan Validation Result Details"},
  {name:"panrevalidation",label:"PAN Revalidation Result",inputType:"text",isRequired:true,validationMsg:"",placeholder:"PAN Revalidation Result"},
  {name:"panaadharseedingresult",label:"Pan Aadhar Seeding Result",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Pan Aadhar Seeding Result"},
  { value: "fillingcheck",label: "Last 2 Year ITR Filling Check",inputType: "text",required: false,validationmsg: "",placeholder:"Last 2 Year ITR FIlling" },
  { value: "reenterpan",label: "Re-enter PAN No",inputType: "text",required: false,validationmsg: "",placeholder:"Re-enter PAN No" },
]
export const POS_SCREEN_AADHAR = [
  { value: "aadharupdate",label: "Aadhar Update For",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Aadhar Update For" },
  { value: "name",label: "Name",inputType: "text",required: false,validationmsg: "", placeholder:"Name" },
  { value: "dob",label: "DOB",inputType: "text",required: false,validationmsg: "",placeholder:"DD/MM/YYYY" },
  { value: "aadharno",label: "Aadhar No",inputType: "text",required: false,validationmsg: "",placeholder:"Aadhar No" },
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "poname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "laname",label: "LA Name",inputType: "text",required: false,validationmsg: "",placeholder: "LA Name" },
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  {name:"premium",label:"Premium",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Premium"},
  { value: "aadharvalidation",label: "Aadhar Validation Result",inputType: "text",required: false,validationmsg: "", placeholder:"Aadhar Validation Result" },
  {name:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},
  // { value: "branchcomments",label: "Branch Comments",inputType: "text",required: false,validationmsg: "",placeholder:"Branch Comments" },
]

export const CHANGE_IN_NAME = [
  { value: "existingdetails",label: "Existing Details",inputType: "title",required: false,validationmsg: "" },
  { value: "requestfor",label: "Request For",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Select Request For"},
  { value: "exictingtitle",label: "Title",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Title"},
  { value: "firstname",label: "First Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter First Name"},
  { value: "middlename",label: "Middle Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Middle Name"},
  { value: "lastname",label: "Last Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Last Name"},
]

export const NEW_NAME_CHANGE = [
  { value: "newdetails",label: "New Details",inputType: "title",required: false,validationmsg: "" },
  { value: "newrequestfor",label: "Request For",inputType: "texts",required: false,validationmsg: "",placeholder:"Select Request For"},
  { value: "newtitle",label: "Title",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Title"},
  { value: "newfirstname",label: "First Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter First Name"},
  { value: "newmiddlename",label: "Middle Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Middle Name"},
  { value: "newlastname",label: "Last Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Last Name"},

]

export const POS_NAME_CHANGE = [
  { value: "existingdetails",label: "Existing Details",inputType: "title",required: false,validationmsg: "" },
  { value: "requestfor",label: "Request For",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Select Request For"},
  { value: "exictingtitle",label: "Title",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Title"},
  { value: "firstname",label: "First Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter First Name"},
  { value: "middlename",label: "Middle Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Middle Name"},
  { value: "lastname",label: "Last Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Last Name"},
  
]
export const NEW_POS_NAME_CHANGE = [
 
  { value: "newdetails",label: "New Details",inputType: "title",required: false,validationmsg: "" },
  { value: "newtitle",label: "Title",inputType: "texts",required: false,validationmsg: "",placeholder:"Enter Title"},
  // { value: "requestfor",label: "Request For",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Select Request For"},
  { value: "newtitle",label: "Title",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Title"},
  { value: "newfirstname",label: "First Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter First Name"},
  { value: "newmiddlename",label: "Middle Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Middle Name"},
  { value: "newlastname",label: "Last Name",inputType: "text",required: false,validationmsg: "",placeholder:"Enter Last Name"},

]
export const POS_POLICY= [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "poname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "laname",label: "LA Name",inputType: "text",required: false,validationmsg: "",placeholder: "LA Name" },
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  {name:"premium",label:"Premium",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Premium"},
  {name:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},
]
export const ADDRESSCHANGE_POS= [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "poname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "laname",label: "LA Name",inputType: "text",required: false,validationmsg: "",placeholder: "LA Name" },
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  {name:"premium",label:"Premium",inputType:"texts",isRequired:true,validationMsg:"",placeholder:"Premium"},
]

export const SIGNATURE_CHANGE = [ 
  {name:"signaturechangeprocess",label:"Signature Change Process",inputType:"radios",isRequired:true,validationMsg:""},
]

export const POS_SIGNATURE =[
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "poname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "laname",label: "LA Name",inputType: "text",required: false,validationmsg: "",placeholder: "LA Name" },
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  {name:"premium",label:"Premium",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Premium"},
  {name:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},
]

export const CHANGE_DOB = [
  { value: "clientrole",label: "Client Role",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Client Role" },
  { value: "name",label: "Name",inputType: "texts",required: false,validationmsg: "",placeholder:"Name" },
  { value: "dob",label: "DOB",inputType: "text",required: false,validationmsg: "",placeholder:"DD/MM/YYYY" },
  { value: "newdob",label: "New DOB",inputType: "date",required: false,validationmsg: "", placeholder: "New DOB"},
  { value: "newage",label: "New Age",inputType: "text",required: false,validationmsg: "",placeholder: "New Age" },
  { value: "increase",label: "Increase/Decrease in Premium Amt(+)or(-)",inputType: "text",required: false,validationmsg: "",placeholder: "Amount" },
  { value: "dobchangeprocess",label: "DOB Change Process",inputType: "radios",required: false,validationmsg: "",placeholder: "DOB change process" },
  { value: "dobchangeform",label: "DOB Change Form",inputType: "radios",required: false,validationmsg: "",placeholder: "DOB change process" },
  { value: "dobchangeproof",label: "List Of Accepted DOB Change Proof ",inputType: "radios",required: false,validationmsg: "",placeholder: "DOB change process" },
]
export const CHANGE_DOB_NOMINEE = [
  { value: "dobchangefor",label: "DOB Change For",inputType: "dropdown",required: false,validationmsg: "",placeholder:"DOB Change For" },
  { value: "name",label: "Name",inputType: "text",required: false,validationmsg: "",placeholder:"Name" },
  { value: "dob",label: "DOB",inputType: "text",required: false,validationmsg: "",placeholder:"DD/MM/YYYY" },
  { value: "newdob",label: "New DOB",inputType: "date",required: false,validationmsg: "", placeholder: "New DOB"},
  { value: "newage",label: "New Age",inputType: "text",required: false,validationmsg: "",placeholder: "New Age" },
  { value: "newage",label: "New Age",inputType: "texts",required: false,validationmsg: "",placeholder: "New Age" },
  { value: "dobchangeprocess",label: "DOB Change Process",inputType: "radios",required: false,validationmsg: "",placeholder: "DOB change process" },
  { value: "dobchangeform",label: "DOB Change Form",inputType: "radios",required: false,validationmsg: "",placeholder: "DOB change process" },
]

export const CHANGE_OWNERSHIP = [
  { value: "clientrole",label: "Existing Ownership Details",inputType: "title",required: false,validationmsg: "",placeholder:"Existing Ownership Details" },
  { value: "clientrole",label: "Client Role",inputType: "text",required: false,validationmsg: "",placeholder:"Client Role" },
  { value: "existingclientcode",label: "Client Code",inputType: "text",required: false,validationmsg: "",placeholder:"Client Code" },
  { value: "donewproposername",label: "Proposer name",inputType: "text",required: false,validationmsg: "",placeholder:"Proposer name" },
  { value: "newproposerdob",label: "Proposer DOB",inputType: "text",required: false,validationmsg: "", placeholder: "DD/MM/YYYY"},
  { value: "newproposeraddress",label: "Proposer Address",inputType: "accordian",required: false,validationmsg: "",placeholder: "Line1" },
  { value: "reason",label: "Pin Code",inputType: "text",required: false,validationmsg: "",placeholder: "Pin Code" },
  { value: "newproposermobileno",label: "Proposer Mobile Number",inputType: "text",required: false,validationmsg: "",placeholder: "Proposer Mobile Number" },
  { value: "lifeassured",label: "Relation to Life Assured",inputType: "text",required: false,validationmsg: "",placeholder: "Relation to Life Assured" },
  { value: "panno",label: "PAN No",inputType: "text",required: false,validationmsg: "",placeholder: "PAN No" },
  { value: "panvalidation",label: "PAN Validation Result",inputType: "text",required: false,validationmsg: "",placeholder: "PAN Validation Result" },
  { value: "panaadharseeding",label: "PAN Aadhar Seeding",inputType: "text",required: false,validationmsg: "",placeholder: "PAN Aadhar Seeding" },
  { value: "reason",label: "KYC No",inputType: "text",required: false,validationmsg: "",placeholder: "KYC No" },
  { value: "newproposeraddress",label: "New Proposer Address",inputType: "texts",required: false,validationmsg: "",placeholder: "Proposer Address" },
 
]
export const PROPOSER_CHANGE_OWNERSHIP = [
  { value: "clientrole",label: "Existing Ownership Details",inputType: "title",required: false,validationmsg: "",placeholder:"Existing Ownership Details" },
  { value: "clientrole",label: "Client Role",inputType: "text",required: false,validationmsg: "",placeholder:"Client Role" },
  { value: "existingclientcode",label: "Client Code",inputType: "text",required: false,validationmsg: "",placeholder:"Client Code" },
  { value: "donewproposername",label: "Proposer name",inputType: "text",required: false,validationmsg: "",placeholder:"Proposer name" },
  { value: "newproposerdob",label: "Proposer DOB",inputType: "text",required: false,validationmsg: "", placeholder: "DD/MM/YYYY"},
  { value: "newproposeraddress",label: "Proposer Address",inputType: "accordian",required: false,validationmsg: "",placeholder: "Line1" },
  { value: "reason",label: "Line2",inputType: "text",required: false,validationmsg: "",placeholder: "Line2" },
  { value: "reason",label: "Line3",inputType: "text",required: false,validationmsg: "",placeholder: "Line3" },
  { value: "reason",label: "City",inputType: "text",required: false,validationmsg: "",placeholder: "City" },
  { value: "reason",label: "State",inputType: "text",required: false,validationmsg: "",placeholder: "State" },
  { value: "reason",label: "Pin Code",inputType: "text",required: false,validationmsg: "",placeholder: "Pin Code" },
  { value: "newproposermobileno",label: "Proposer Mobile Number",inputType: "text",required: false,validationmsg: "",placeholder: "Proposer Mobile Number" },
  { value: "lifeassured",label: "Relation to Life Assured",inputType: "text",required: false,validationmsg: "",placeholder: "Relation to Life Assured" },
  { value: "panno",label: "PAN No",inputType: "text",required: false,validationmsg: "",placeholder: "PAN No" },
  { value: "panvalidation",label: "PAN Validation Result",inputType: "text",required: false,validationmsg: "",placeholder: "PAN Validation Result" },
  { value: "panaadharseeding",label: "PAN Aadhar Seeding",inputType: "text",required: false,validationmsg: "",placeholder: "PAN Aadhar Seeding" },
  { value: "reason",label: "KYC No",inputType: "text",required: false,validationmsg: "",placeholder: "KYC No" },
  { value: "newproposeraddress",label: "New Proposer Address",inputType: "texts",required: false,validationmsg: "",placeholder: "Proposer Address" },
 
]
export const NEW_CHANGE_OWNERSHIP = [
  { value: "clientrole",label: "Update New Ownership Details",inputType: "title",required: false,validationmsg: "",placeholder:"Client Role" },
  { value: "clientrole",label: "Client Role",inputType: "text",required: false,validationmsg: "",placeholder:"Client Role" },
  { value: "existingclientcode",label: "Client Code",inputType: "text",required: false,validationmsg: "",placeholder:"Client Code" },
  { value: "donewproposername",label: "New Proposer name",inputType: "text",required: false,validationmsg: "",placeholder:"New Proposer name" },
  { value: "newproposerdob",label: "New Proposer DOB",inputType: "date",required: false,validationmsg: "", placeholder: "New Proposer DOB"},
  { value: "newproposeraddress",label: "New Proposer Address",inputType: "accordian",required: false,validationmsg: "",placeholder: "Line1" },
  { value: "newproposermobileno",label: "New Proposer Mobile Number",inputType: "text",required: false,validationmsg: "",placeholder: "New Proposer Mobile Number" },
  { value: "lifeassured",label: "Relation to Life Assured",inputType: "dropdown",required: false,validationmsg: "",placeholder: "Relation to Life Assured" },
  { value: "panno",label: "PAN No",inputType: "text",required: false,validationmsg: "",placeholder: "PAN No" },
  { value: "panvalidation",label: "PAN Validation Result",inputType: "text",required: false,validationmsg: "",placeholder: "PAN Validation Result" },
  { value: "panaadharseeding",label: "PAN Aadhar Seeding",inputType: "text",required: false,validationmsg: "",placeholder: "PAN Aadhar Seeding" },
  { value: "reason",label: "KYC No",inputType: "text",required: false,validationmsg: "",placeholder: "KYC No" },
  { value: "reason",label: "Reason for Ownership Change",inputType: "dropdown",required: false,validationmsg: "",placeholder: "Reason for Ownership Change" },
]
export const PROPOSER_NEW_CHANGE_OWNERSHIP = [
  { value: "clientrole",label: "Update New Ownership Details",inputType: "title",required: false,validationmsg: "",placeholder:"Client Role" },
  { value: "clientrole",label: "Client Role",inputType: "text",required: false,validationmsg: "",placeholder:"Client Role" },
  { value: "existingclientcode",label: "Client Code",inputType: "text",required: false,validationmsg: "",placeholder:"Client Code" },
  { value: "donewproposername",label: "New Proposer name",inputType: "text",required: false,validationmsg: "",placeholder:"New Proposer name" },
  { value: "newproposerdob",label: "New Proposer DOB",inputType: "date",required: false,validationmsg: "", placeholder: "New Proposer DOB"},
  { value: "newproposeraddress",label: "New Proposer Address",inputType: "accordian",required: false,validationmsg: "",placeholder: "Line1" },
  // { value: "reason",label: "Line1",inputType: "text",required: false,validationmsg: "",placeholder: "Line1" },
  { value: "reason",label: "Line2",inputType: "text",required: false,validationmsg: "",placeholder: "Line2" },
  { value: "reason",label: "Line3",inputType: "text",required: false,validationmsg: "",placeholder: "Line3" },
  { value: "reason",label: "City",inputType: "text",required: false,validationmsg: "",placeholder: "City" },
  { value: "reason",label: "State",inputType: "text",required: false,validationmsg: "",placeholder: "State" },
  { value: "reason",label: "Pin Code",inputType: "text",required: false,validationmsg: "",placeholder: "Pin Code" },
  { value: "newproposermobileno",label: "New Proposer Mobile Number",inputType: "text",required: false,validationmsg: "",placeholder: "New Proposer Mobile Number" },
  { value: "lifeassured",label: "Relation to Life Assured",inputType: "dropdown",required: false,validationmsg: "",placeholder: "Relation to Life Assured" },
  { value: "panno",label: "PAN No",inputType: "text",required: false,validationmsg: "",placeholder: "PAN No" },
  { value: "panvalidation",label: "PAN Validation Result",inputType: "text",required: false,validationmsg: "",placeholder: "PAN Validation Result" },
  { value: "panaadharseeding",label: "PAN Aadhar Seeding",inputType: "text",required: false,validationmsg: "",placeholder: "PAN Aadhar Seeding" },
  { value: "reason",label: "KYC No",inputType: "text",required: false,validationmsg: "",placeholder: "KYC No" },
  { value: "reason",label: "Reason for Ownership Change",inputType: "dropdown",required: false,validationmsg: "",placeholder: "Reason for Ownership Change" },
]
export const OWNERSHIP_PROCESS = [
  { value: "sendownership",label: "Send Ownership Change Process",inputType: "radios",required: false,validationmsg: "",placeholder: "Send ownership change process" },
  { value: "ownershipform",label: "Ownership Change Form",inputType: "radios",required: false,validationmsg: "",placeholder: "Ownership Change Form" },
]
export const NEW_ADDRESS = [
  { value: "reason",label: "New Address",inputType: "title",required: false,validationmsg: "",placeholder: "Line1" },
  { value: "reason",label: "Line1",inputType: "texts",required: false,validationmsg: "",placeholder: "Line1" },
  { value: "reason",label: "Line1",inputType: "text",required: false,validationmsg: "",placeholder: "Line1" },
  { value: "reason",label: "Line2",inputType: "text",required: false,validationmsg: "",placeholder: "Line2" },
  { value: "reason",label: "Line3",inputType: "text",required: false,validationmsg: "",placeholder: "Line3" },
  { value: "reason",label: "City",inputType: "text",required: false,validationmsg: "",placeholder: "City" },
  { value: "reason",label: "State",inputType: "text",required: false,validationmsg: "",placeholder: "State" },
  { value: "reason",label: "Pin Code",inputType: "text",required: false,validationmsg: "",placeholder: "Pin Code" },
]
export const POS_CHANGE_OWNERSHIP = [
  { value: "clientrole",label: "Client Role",inputType: "text",required: false,validationmsg: "",placeholder:"Client Role" },
  { value: "existingclientcode",label: "Existing Client Code",inputType: "text",required: false,validationmsg: "",placeholder:"Existing Client Code" },
  { value: "donewproposername",label: "New Proposer name",inputType: "text",required: false,validationmsg: "",placeholder:"New Proposer name" },
  { value: "newproposerdob",label: "New Proposer DOB",inputType: "text",required: false,validationmsg: "", placeholder: "New Proposer DOB"},
  { value: "newproposermobileno",label: "New Proposer Mobile Number",inputType: "text",required: false,validationmsg: "",placeholder: "New Proposer Mobile Number" },
  { value: "newproposeremail",label: "New Proposer Email",inputType: "text",required: false,validationmsg: "",placeholder: "New Proposer Email" },
  { value: "lifeassured",label: "Relation to Life Assured",inputType: "dropdown",required: false,validationmsg: "",placeholder: "Relation to Life Assured" },
  { value: "panno",label: "PAN No",inputType: "text",required: false,validationmsg: "",placeholder: "PAN No" },
  { value: "panvalidation",label: "PAN Validation Result",inputType: "text",required: false,validationmsg: "",placeholder: "PAN Validation Result" },
  { value: "panaadharseeding",label: "PAN Aadhar Seeding",inputType: "text",required: false,validationmsg: "",placeholder: "PAN Aadhar Seeding" },
  { value: "reason",label: "Reason for Ownership Change",inputType: "text",required: false,validationmsg: "",placeholder: "Reason for Ownership Change" },
  { value: "pennydropresult",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder: "Penny Drop Result" },
  // { value: "newproposeraddress",label: "New Proposer Address",inputType: "text",required: false,validationmsg: "",placeholder: "New Proposer Address" },
  { value: "newproposeraddress",label: "New Proposer Address",inputType: "icon",required: false,validationmsg: "",placeholder: "New Proposer Address" },

]
export const Proposer_Address = [
  { value: "reason",label: "Line1",inputType: "texts",required: false,validationmsg: "",placeholder: "Line1" },
  { value: "reason",label: "Line1",inputType: "text",required: false,validationmsg: "",placeholder: "Line1" },
  { value: "reason",label: "Line2",inputType: "text",required: false,validationmsg: "",placeholder: "Line2" },
  { value: "reason",label: "Line3",inputType: "text",required: false,validationmsg: "",placeholder: "Line3" },
  { value: "reason",label: "City",inputType: "text",required: false,validationmsg: "",placeholder: "City" },
  { value: "reason",label: "State",inputType: "text",required: false,validationmsg: "",placeholder: "State" },
  { value: "reason",label: "Pin Code",inputType: "text",required: false,validationmsg: "",placeholder: "Pin Code" },
]

export const GSTIN_UPDATE = [
  { value: "gstinupdate",label: "GSTIN Update For",inputType: "dropdown",required: false,validationmsg: "",placeholder: "GSTIN Update For" },
  { value: "gstinupdate",label: "GSTIN Update For",inputType: "texts",required: false,validationmsg: "",placeholder: "GSTIN Update For" },
  { value: "existinggstin",label: "Existing GSTIN",inputType: "text",required: false,validationmsg: "",placeholder: "Existing GSTIN" },
  { value: "newgstin",label: "New GSTIN",inputType: "text",required: false,validationmsg: "",placeholder: "New GSTIN" },
  { value: "kycno",label: "KYC NO",inputType: "text",required: false,validationmsg: "",placeholder: "KYC NO" },
  {name:"gstchangeprocess",label:"GSTIN Change Process",inputType:"radios",isRequired:true,validationMsg:""},
]

export const POS_GSTIN_UPDATE = [
  { value: "gstinupdate",label: "GSTIN Update For",inputType: "text",required: false,validationmsg: "",placeholder: "GSTIN Update For" },
  { value: "existgstin",label: "Existing GSTIN",inputType: "texts",required: false,validationmsg: "",placeholder: "Existing GSTIN" },
  { value: "existgstin",label: "Existing GSTIN",inputType: "text",required: false,validationmsg: "",placeholder: "Existing GSTIN" },
  { value: "newgstin",label: "New GSTIN",inputType: "text",required: false,validationmsg: "",placeholder: "New GSTIN" },
]

export const AGENT_CODE_CORRECTION = [
  { value: "currentagentcode",label: "Existing Agent Code",inputType: "text",required: false,validationmsg: "",placeholder: "Existing Agent Code" },
  { value: "currentchannel",label: "Current Channel",inputType: "text",required: false,validationmsg: "",placeholder: "Current Channel" },
  { value: "oldagentbranch",label: "Old Agent Branch",inputType: "text",required: false,validationmsg: "",placeholder: "Old Agent Branch" },
  { value: "reasonforagentcode",label: "Reason for Agent Code Change",inputType: "text",required: false,validationmsg: "",placeholder: "Reason for Agent Code Change" },
]
export const NEW_AGENT_CODE_CORRECTION = [
  { value: "newagentcode",label: "New Agent Code",inputType: "text",required: false,validationmsg: "",placeholder: "New Agent Code" },
  { value: "newchannel",label: "New Channel",inputType: "text",required: false,validationmsg: "",placeholder: "New Channel" },
  { value: "newagentbranch",label: "New Agent Branch",inputType: "text",required: false,validationmsg: "",placeholder: "New Agent Branch" },
  { value: "correctionprocess",label: "Agent Code Correction Process",inputType: "radios",required: false,validationmsg: "",placeholder: "Agent Code Correction Process" },
]
export const OLD_POS_AGENT_CORRECTION = [
  { value: "currentagentcode",label: "Existing Agent Code",inputType: "text",required: false,validationmsg: "",placeholder: "Existing Agent Code" },
  { value: "currentchannel",label: "Current Channel",inputType: "text",required: false,validationmsg: "",placeholder: "Current Channel" },
  { value: "reasonforagentcode",label: "Reason for Agent Code Change",inputType: "text",required: false,validationmsg: "",placeholder: "Reason for Agent Code Change" },
]
export const POS_AGENT_CORRECTION = [
  { value: "newagentcode",label: "New Agent Code",inputType: "text",required: false,validationmsg: "",placeholder: "New Agent Code" },
  { value: "newchannel",label: "New Channel",inputType: "text",required: false,validationmsg: "",placeholder: "New Channel" },
]
export const TERM_CHANGE = [
  { value: "existingterm",label: "Existing Term",inputType: "text",required: false,validationmsg: "",placeholder: "Existing Term" },
  { value: "newterm",label: "Change Allowed",inputType: "text",required: false,validationmsg: "",placeholder: "Change Allowed" },
  { value: "newterm",label: "New Term",inputType: "text",required: false,validationmsg: "",placeholder: "New Term" },
  { value: "newterm",label: "New Term",inputType: "texts",required: false,validationmsg: "",placeholder: "New Term" },
  { value: "termchanegprocess",label: "Term Change Process",inputType: "radios",required: false,validationmsg: "",placeholder: "Term Change Process" },
  { value: "termrequestform",label: "Send Change of Term Request Form",inputType: "radios",required: false,validationmsg: "",placeholder: " Send Change of Term Request Form" },
]
export const PLAN_CHANGE = [
  { value: "existingplan",label: "Existing Plan Name",inputType: "text",required: false,validationmsg: "",placeholder: "Existing Plan Name" },
  { value: "newterm",label: "Change Allowed",inputType: "text",required: false,validationmsg: "",placeholder: "Change Allowed" },
  { value: "newplanname",label: "New Plan Name",inputType: "dropdown",required: false,validationmsg: "",placeholder: "New Plan Name" },
  { value: "newplanname",label: "New Plan Name",inputType: "texts",required: false,validationmsg: "",placeholder: "New Plan Name" },
  { value: "planchanegprocess",label: "Plan Change Process",inputType: "radios",required: false,validationmsg: "",placeholder: "Plan Change Processs" },
  { value: "planrequestform",label: "Send Change of Plan Request Form",inputType: "radios",required: false,validationmsg: "",placeholder: "Send Change of Plan Request Form" },
]
export const RIDER_ADDITION = [
  { value: "existingrider",label: "Existing Rider",inputType: "text",required: false,validationmsg: "",placeholder: "Existing Rider" },
  { value: "ridersumassured",label: "Rider Sum Assured",inputType: "text",required: false,validationmsg: "",placeholder: "Rider Sum Assured" },
  { value: "newterm",label: "Addition / Deletion Allowed",inputType: "text",required: false,validationmsg: "",placeholder: "Addition / Deletion Allowed" },
  { value: "selectride",label: "Select Rider",inputType: "texts",required: false,validationmsg: "",placeholder: "Select Rider" },
  { value: "selectride",label: "Select Rider",inputType: "dropdown",required: false,validationmsg: "",placeholder: "Select Rider" },
  { value: "sumassured",label: "Sum Assured",inputType: "text",required: false,validationmsg: "",placeholder: "Sum Assured" },
  { value: "termchanegprocess",label: "Send Rider Addition / Deletion Process",inputType: "radios",required: false,validationmsg: "",placeholder: "Send Rider Addition / Deletion Process" },
  { value: "riderrequestform",label: "Send Rider Addition/Deletion Request Form",inputType: "radios",required: false,validationmsg: "",placeholder: "Send Rider Addition/Deletion Request Form" },
]
export const SUM_ASSURED = [
  { value: "existingsumassured",label: "Existing Sum Assured",inputType: "text",required: false,validationmsg: "",placeholder: "Existing Sum Assured" },
  { value: "changeallowed",label: "Change Allowed",inputType: "text",required: false,validationmsg: "",placeholder: "Change Allowed" },
  { value: "newsumassured",label: "New Sum Assured",inputType: "text",required: false,validationmsg: "",placeholder: "New Sum Assured" },
  { value: "newsumassured",label: "New Sum Assured",inputType: "texts",required: false,validationmsg: "",placeholder: "New Sum Assured" },
  { value: "sumassuredprocess",label: "Send Change Sum Assured Process",inputType: "radios",required: false,validationmsg: "",placeholder: "Send Change Sum Assured Processs" },
  { value: "assuredrequestform",label: "Send Change of Sum Assured Request Form",inputType: "radios",required: false,validationmsg: "",placeholder: "Send Change of Sum Assured Request Form" },
]

export const STATUS_ENQUIRY = [
  { value: "panupdate",label: "Partial Withdrawal Applicable",inputType: "text",required: false,validationmsg: "",placeholder:"Partial Withdrawal Applicable" },
  { value: "name",label: "Partial Withdrawal Can Be Made After",inputType: "text",required: false,validationmsg: "",placeholder:"DD/MM/YYYY" },
  { value: "dob",label: "Total Fund Value (1)",inputType: "text",hyperLink: true,required: false,validationmsg: "",placeholder:"Total Fund Value" },
  { value: "panno",label: "Max Partial Withdrawal Possible",inputType: "text",required: false,validationmsg: "",placeholder:"Max Partial Withdrawal Possible" },
  { value: "panvalidation",label: "Partial Withdrawal Value Date",inputType: "text",required: false,validationmsg: "", placeholder: "DD/MM/YYYY" },
  { value: "panaadharseeding",label: "Partial Withdrawal Amt Requested",inputType: "text",required: false,validationmsg: "",placeholder: "Partial Withdrawal Amt Requested"},
  { value: "uploadpan",label: "TDS Amount",inputType: "text",required: false,validationmsg: "",placeholder:"TDS Amount" },
  { value: "fillingcheck",label: "TDS %",inputType: "text",required: false,validationmsg: "",placeholder:"TDS %" },

  {value:"generalfunletter",label:"General Fund Value Letter",inputType:"radios",isRequired:true,validationMsg:""},
  {value:"withdrawalprocess",label:"Send Partial Withdrawal Process",inputType:"radios",isRequired:true,validationMsg:""},
]
export const WITHDRAWAL_POLICY = [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "poname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "laname",label: "LA Name",inputType: "text",required: false,validationmsg: "",placeholder: "LA Name" },
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  {name:"premium",label:"Premium",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Premium"},
  { value: "plan",label: "Max Partial Withdrawal Possible",inputType: "text",required: false,validationmsg: "",placeholder:"Max Partial Withdrawal Possible" },
  {name:"premium",label:"Partial Withdrawal Requested",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Partial Withdrawal Requested"},
  {name:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},
]
export const PARTIAL_WITHDRAWAL_REQUEST = [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "poname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "laname",label: "LA Name",inputType: "text",required: false,validationmsg: "",placeholder: "LA Name" },
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  {name:"premium",label:"Premium",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Premium"},
  { value: "plan",label: "Max Partial Withdrawal Possible",inputType: "text",required: false,validationmsg: "",placeholder:"Max Partial Withdrawal Possible" },
  {name:"premium",label:"Partial Withdrawal Requested",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Partial Withdrawal Requested"},
  {name:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},
  { value: "",label: "",inputType: "texts",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "bankdetails",label: "Bank Details",inputType: "title",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "",label: "",inputType: "texts",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "bankname",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name As Mentiones in The Bank A/C" },
  { value: "bankifsc",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
  { value: "accnumber",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Account Number" },
  { value: "bankname",label: "Bank Name",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Name" },
  { value: "pennydropresult",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder: "Penny Drop Result"},
  { value: "pennydropresult",label: "Penny Drop Result",inputType: "texts",required: false,validationmsg: "",placeholder: "Penny Drop Result"},
  { value: "fundtransfer",label: "Fund Transfer",inputType: "radio",required: false,validationmsg: "",placeholder:"Fund Transfer To" },
  { value: "pennydropresult",label: "Penny Drop Result",inputType: "texts",required: false,validationmsg: "",placeholder: "Penny Drop Result"},
 
]
export const POS_PARTIAL_WITHDRAWAL_REQUEST = [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "poname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "laname",label: "LA Name",inputType: "text",required: false,validationmsg: "",placeholder: "LA Name" },
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  {name:"premium",label:"Premium",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Premium"},
  { value: "plan",label: "Max Partial Withdrawal Possible",inputType: "text",required: false,validationmsg: "",placeholder:"Max Partial Withdrawal Possible" },
  {name:"premium",label:"Partial Withdrawal Requested",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Partial Withdrawal Requested"},
  {name:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},
  { value: "bankifsc",label: "Last 06 Months Personal Details Change",inputType: "text",required: false,validationmsg: "",placeholder:"Last 06 Months Personal Details Change" },
  { value: "pennydropresult",label: "Signature Change",inputType: "text",required: false,validationmsg: "",placeholder: "Signature Change"},

  { value: "",label: "",inputType: "texts",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "bankdetails",label: "Bank Details",inputType: "title",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "",label: "",inputType: "texts",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "bankname",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name As Mentiones in The Bank A/C" },
  { value: "bankname",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "bankifsc",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
  { value: "accnumber",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Account Number" },
  { value: "pennydropresult",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder: "Penny Drop Result"},
  { value: "bankname",label: "Bank Account De-dupe",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Account De-dupe" },
  { value: "accnumber",label: "Policy Bond / Indemnity Submitted",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Bond / Indemnity Submitted" },
  { value: "pennydropresult",label: "Penny Drop Result",inputType: "texts",required: false,validationmsg: "",placeholder: "Penny Drop Result"},
  { value: "fundtransfer",label: "Fund Transfer",inputType: "radio",required: false,validationmsg: "",placeholder:"Fund Transfer To" },
  { value: "pennydropresult",label: "Penny Drop Result",inputType: "texts",required: false,validationmsg: "",placeholder: "Penny Drop Result"},
 
]
export const WITHDRWAL_FUNDS=[
  { value: "fundtransfers",label: "Fund Transfer To",inputType: "text",required: false,validationmsg: "",placeholder:"Fund Transfer To" },
  { value: "ftamt",label: "FT Amount",inputType: "text",required: false,validationmsg: "",placeholder:"FT Amount" },
  {name:"relationftpolicy",label:"Relations To FT Policy",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Relations To FT Policy"},
  {name:"policyowner",label:"Name of FT Policy Owner",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Name of FT Policy Owner"},
]
export const SURRENDER_POLICYS = [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "poname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "laname",label: "LA Name",inputType: "text",required: false,validationmsg: "",placeholder: "LA Name" },
  { value: "Assgnment",label: "Assignment",inputType: "text",required: false,validationmsg: "",placeholder: "Assignment" },
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  { value: "surrenderamt",label: "Surrender Amount Requested",inputType: "text",required: false,validationmsg: "",placeholder:"Surrender Amount Requested" },
  {name:"premium",label:"Premium",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Premium"},
  {name:"Employeeresigned",label:"Employee Resigned",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Employee Resigned"},
  {name:"tdsamt",label:"TDS Amount",inputType:"text",isRequired:true,validationMsg:"",placeholder:"TDS Amount"},

  { value: "bankdetails",label: "Bank Details",inputType: "title",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "",label: "",inputType: "texts",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "bankacc",label: "Name as mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "bankaccno",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "",placeholder: "LA Name" },
  { value: "bankifsc",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder: "Assignment" },
  { value: "pennydropresult",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder: "Penny Drop Result"},
  { value: "bankname",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Surrender Amount Requested" },
  {name:"ekyc",label:"EKYC/CKYC",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Premium"},
  {name:"itrcheck",label:"ITR Check",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Employee Resigned"},
  {name:"tdsamt",label:"TDS Amount",inputType:"text",isRequired:true,validationMsg:"",placeholder:"TDS Amount"},
  {name:"grosssurrendervalue",label:"Gross Surrender Value",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Gross Surrender Value",showPOSOnly:true},
  {name:"lessloan",label:"Less Loan(Principle + Interest)",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Less Loan",showPOSOnly:true},
  {name:"specialsurrendervalue",label:"Special Surrender Value(If any)",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Special Surrender Value(If any)",showPOSOnly:true},
  {name:"branchremarks",label:"Branch Remarks",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Branch Remarks",showPOSOnly:true},
  { value: "ftdetails",label: "FT Details",inputType: "radio",required: false,validationmsg: "",placeholder:"FT Details" },
]
export const SURRENDER_FT_DETAILS = [
  { value: "fundtransfers",label: "Fund Transfer To",inputType: "text",required: false,validationmsg: "",placeholder:"Fund Transfer To" },
  {name:"ftamount",label:"FT Amount",inputType:"text",isRequired:true,validationMsg:"",placeholder:"FT Amount"},
  {name:"ftpolicy",label:"Relations to FT Policy",inputType:"dropdown",isRequired:true,validationMsg:"",placeholder:"Relations to FT Policy"},
  {name:"ftamtowner",label:"Name of FT Amount Owner",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Name of FT Amount Owner"},
]
export const EXISTING_NOMINATION_DETAILS = [
  { value: "nominationchangeallow",label: "Nomination Change Allowed",inputType: "text",required: false,validationmsg: "",placeholder:"Nomination Change Allowed" },
  { value: "nominationchangeallow",label: "Nomination Change Allowed",inputType: "texs",required: false,validationmsg: "",placeholder:"Nomination Change Allowed" },
  {name:"existingdetails",label:"Existing Details",inputType:"title",isRequired:true,validationMsg:"",placeholder:"Existing Details"},
  {name:"nomineename",label:"Nominee Name",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Nominee Name"},
  {name:"nomineedob",label:"Nominee DOB",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Nominee DOB"},
  { value: "relationshippo",label: "Relationship with PO",inputType: "text",required: false,validationmsg: "",placeholder:"Relationship with PO" },
  {name:"percentageshare",label:"Percentage Share",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Percentage Share"},
  {name:"appointeename",label:"Appointee Name",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Appointee Name"},
  {name:"appointeedob",label:"Appointee DOB",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Appointee DOB"},
  { value: "relationshippo",label: "Relationship with PO",inputType: "text",required: false,validationmsg: "",placeholder:"Relationship with PO" },
]
export const NEW_NOMINATION_DETAILS = [
  { value: "nominationchangeallow",label: "Nomination Change Allowed",inputType: "texts",required: false,validationmsg: "",placeholder:"Nomination Change Allowed" },
  {name:"existingdetails",label:"New Details",inputType:"title",isRequired:true,validationMsg:"",placeholder:"New Details"},
  {name:"nomineename",label:"Nominee Name",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Nominee Name"},
  {name:"nomineedob",label:"Nominee DOB",inputType:"date",isRequired:true,validationMsg:"",placeholder:"Nominee DOB"},
  { value: "relationshippo",label: "Relationship with PO",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Relationship with PO" },
  {name:"percentageshare",label:"Percentage Share",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Percentage Share"},
  {name:"appointeename",label:"Appointee Name",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Appointee Name"},
  {name:"appointeedob",label:"Appointee DOB",inputType:"date",isRequired:true,validationMsg:"",placeholder:"Appointee DOB"},
  { value: "relationshippo",label: "Relationship with PO",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Relationship with PO" },
]
export const NOMINEE_POS_POLICY= [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  {name:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},
]
export const EXISTING_APPOINTEE_DETAILS = [
  {name:"existingdetails",label:"Existing Details",inputType:"title",isRequired:true,validationMsg:"",placeholder:"Existing Details"},
  {name:"nomineename",label:"Appointee Name",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Appointee Name"},
  {name:"nomineedob",label:"Appointee DOB",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Appointee DOB"},
  { value: "relationshippo",label: "Relationship with PO",inputType: "text",required: false,validationmsg: "",placeholder:"Relationship with PO" },
]
export const NEW_APPOINTEE_DETAILS = [
  {name:"existingdetails",label:"New Details",inputType:"title",isRequired:true,validationMsg:"",placeholder:"New Details"},
  {name:"nomineename",label:"Appointee Name",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Appointee Name"},
  {name:"nomineedob",label:"Appointee DOB",inputType:"date",isRequired:true,validationMsg:"",placeholder:"Appointee DOB"},
  { value: "relationshippo",label: "Relationship with PO",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Relationship with PO" },
]
export const LIFE_CERTIFICATE = [
  {name:"existingdetails",label:"COE Validate From",inputType:"text",isRequired:true,validationMsg:"",placeholder:"COE Validate From"},
  {name:"coevalidatefrom",label:"COE Validate To",inputType:"text",isRequired:true,validationMsg:"",placeholder:"COE Validate To"},
  {name:"annuitymode",label:"Annuity Mode",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Appointee DOB"},
  { value: "annuityamt",label: "Annuity Amt",inputType: "text",required: false,validationmsg: "",placeholder:"Relationship with PO" },
  {name:"annuityplan",label:"Annuity Plan",inputType:"text",isRequired:true,validationMsg:"",placeholder:"COE Validate From"},
  {name:"certifyingauthorityname",label:"Certifying Authority Name",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Certifying Authority Name"},
  {name:"certifyingdesigantion",label:"Certifying Designation",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Certifying Designation"},
  { value: "certifyingauthorityaddress",label: "Certifying Authority Address",inputType: "text",required: false,validationmsg: "",placeholder:"Certifying Authority Address" },
  {name:"certifyingdate",label:"Certifying date",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Certifying date"},
  { value: "sendcoelink",label: "Send COE Link",inputType: "radios",required: false,validationmsg: "",placeholder:"Send COE Link" },
  {name:"coelinksendon",label:"COE Link Send On",inputType:"date",isRequired:true,validationMsg:"",placeholder:"COE Link Send On"},
  {name:"coelinksendthrough",label:"COE Link Send Through",inputType:"text",isRequired:true,validationMsg:"",placeholder:"COE Link Send Through"},
  { value: "coelinkvalidtill",label: "COE Link Valid Till",inputType: "date",required: false,validationmsg: "",placeholder:"COE Link Valid Till" },
  {name:"coeresponsereceived",label:"COE Response Received On",inputType:"date",isRequired:true,validationMsg:"",placeholder:"COE Response Received On"},
  {name:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},
]
export const POS_LIFE_CERTIFICATE = [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "annuitantname",label: "Annuitant Name",inputType: "text",required: false,validationmsg: "", placeholder: "Annuitant Name"},
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  { value: "coevalidatefrom",label: "COE Validate From",inputType: "text",required: false,validationmsg: "",placeholder:"COE Validate From" },
  { value: "coevalidateto",label: "COE Validate To",inputType: "text",required: false,validationmsg: "",placeholder:"COE Validate To" },
  { value: "annuitantmode",label: "Annuitant Mode",inputType: "text",required: false,validationmsg: "", placeholder: "Annuitant Mode"},
  { value: "annuitantamt",label: "Annuitant Amt",inputType: "text",required: false,validationmsg: "",placeholder:"Annuitant Amt" },
  {name:"annuitantplan",label:"Annuitant Plan",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Annuitant Plan"},
  {name:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},

]
export const Existing_LOAN_REQUEST = [
  {name:"existingloan",label:"Existing Loan",inputType:"title",isRequired:true,validationMsg:"",placeholder:"Existing Loan"},
  {name:"existingdetails",label:"Loan Disbursed On",inputType:"text",isRequired:true,validationMsg:"",placeholder:"DD/MM/YYYY"},
  {name:"coevalidatefrom",label:"Loan Interest %",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Loan Interest %"},
  {name:"annuitymode",label:"Origional Loan Amount",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Origional Loan Amount"},
  { value: "annuityamt",label: "Total Loan Interest",inputType: "text",required: false,validationmsg: "",placeholder:"Total Loan Interest" },
  {name:"annuityplan",label:"Total Loan Amount Repaid",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Total Loan Amount Repaid"},
  {name:"certifyingauthorityname",label:"Loan Outstanding",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Loan Outstanding"},
  {name:"certifyingdesigantion",label:"Last Loan Repaid Date",inputType:"text",isRequired:true,validationMsg:"",placeholder:"DD/MM/YYYY"},
  {name:"certifyingdate",label:"Policy Assigned To",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Policy Assigned To"},
  { value: "sendcoelink",label: "Policy Bond Submitted",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Bond Submitted" },
  {name:"coelinksendon",label:"Policy Bond Dispatch Details",inputType:"link", textvalue:"Dispatch Details",isRequired:true,validationMsg:"",placeholder:"Policy Bond Dispatch Details"},
  
]
export const NEW_LOAN_REQUEST = [
  {name:"newloan",label:"New Loan",inputType:"title",isRequired:true,validationMsg:"",placeholder:"COE Validate From"},
  {name:"existingdetails",label:"Loan Applicable",inputType:"dropdown",isRequired:true,validationMsg:"",placeholder:"Loan Applicable"},
  {name:"coevalidatefrom",label:"Loan Can be Availed After",inputType:"date",isRequired:true,validationMsg:"",placeholder:"DD/MM/YYYY"},
  {name:"annuitymode",label:"Surrender Value",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Surrender Value"},
  { value: "annuityamt",label: "Max Loan Value",inputType: "text",required: false,validationmsg: "",placeholder:"Max Loan Value" },
  {name:"annuityplan",label:"Loan Value Date",inputType:"date",isRequired:true,validationMsg:"",placeholder:"DD/MM/YYYY"},
  {name:"certifyingauthorityname",label:"Loan Value Requested",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Loan Value Requested"},
  {name:"certifyingdesigantion",label:"No of Times Loan Taken in The Policy",inputType:"text",isRequired:true,validationMsg:"",placeholder:"No of Times Loan Taken in The Policy"},
 
  
]
export const LOAN_PROCESS =[
  { value: "certifyingauthorityaddress",label: "Send Loan Re-payment Link",inputType: "radios",required: false,validationmsg: "",placeholder:"Send Loan Re-payment Link" },
  {name:"certifyingdate",label:"Generate Fund Value Letter",inputType:"radios",isRequired:true,validationMsg:"",placeholder:"Generate Fund Value Letter"},
  { value: "sendcoelink",label: "Loan Statement",inputType: "radios",required: false,validationmsg: "",placeholder:"Loan Statement" },
]

export const Existing_LOAN_REQUEST_DETAILS = [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "annuitantname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "annuitantname",label: "LA Name",inputType: "text",required: false,validationmsg: "", placeholder: "LA Name"},
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  { value: "coevalidatefrom",label: "Premium",inputType: "text",required: false,validationmsg: "",placeholder:"Premium" },
  { value: "coevalidateto",label: "MAX Loan Eligible",inputType: "text",required: false,validationmsg: "",placeholder:"MAX Loan Eligible" },
  { value: "annuitantmode",label: "Loan Value Requested",inputType: "text",required: false,validationmsg: "", placeholder: "Loan Value Requested"},
  {value:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},
  { value: "annuitantamt",label: "No of Times Loan Taken in The Policy",inputType: "text",required: false,validationmsg: "",placeholder:"No of Times Loan Taken in The Policy" },
  { value: "annuitantamt",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder:"Penny Drop Result" },
  { value: "annuitantamt",label: "PAN No",inputType: "text",required: false,validationmsg: "",placeholder:"PAN No" },
  { value: "coevalidateto",label: "PAN Validate Result",inputType: "text",required: false,validationmsg: "",placeholder:"PAN Validate Result" },
  { value: "coevalidateto",label: "Bank Name",inputType: "texts",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "coevalidateto",label: "Bank Details",inputType: "title",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "coevalidateto",label: "Bank Name",inputType: "texts",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "coevalidatefrom",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
  { value: "coevalidateto",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "coevalidateto",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
  { value: "annuitantmode",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number"},
  {value:"kycno",label:"Confirm Bank Account Number",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Confirm Bank Account Number"},
  { value: "coevalidateto",label: "Bank Name",inputType: "texts",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "ftdetails",label: "FT Details",inputType: "radio",required: false,validationmsg: "",placeholder:"FT Details" },
]
export const POS_LOAN_REQUEST_DETAILS = [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "annuitantname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "annuitantname",label: "LA Name",inputType: "text",required: false,validationmsg: "", placeholder: "LA Name"},
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  { value: "coevalidatefrom",label: "Premium",inputType: "text",required: false,validationmsg: "",placeholder:"Premium" },
  { value: "coevalidateto",label: "MAX Loan Eligible",inputType: "text",required: false,validationmsg: "",placeholder:"MAX Loan Eligible" },
  { value: "annuitantmode",label: "Loan Value Requested",inputType: "text",required: false,validationmsg: "", placeholder: "Annuitant Mode"},
  {value:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},
  { value: "annuitantamt",label: "No of Times Loan Taken in The Policy",inputType: "text",required: false,validationmsg: "",placeholder:"No of Times Loan Taken in The Policy" },
  { value: "annuitantamt",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder:"Penny Drop Result" },
  { value: "annuitantamt",label: "PAN No",inputType: "text",required: false,validationmsg: "",placeholder:"PAN No" },
  { value: "coevalidateto",label: "PAN Validate Result",inputType: "text",required: false,validationmsg: "",placeholder:"PAN Validate Result" },
  { value: "coevalidateto",label: "Bank Name",inputType: "texts",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "coevalidateto",label: "Bank Details",inputType: "title",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "coevalidateto",label: "Bank Name",inputType: "texts",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "coevalidatefrom",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
  { value: "coevalidateto",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "coevalidateto",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
  { value: "annuitantmode",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number"},
  {value:"kycno",label:"KYC No",inputType:"Confirm Bank Account Number",isRequired:true,validationMsg:"",placeholder:"Confirm Bank Account Number"},
  { value: "coevalidateto",label: "EKYC / CKYC",inputType: "text",required: false,validationmsg: "",placeholder:"EKYC / CKYC" },
  { value: "annuitantmode",label: "Last 6months Personal Details Change",inputType: "text",required: false,validationmsg: "", placeholder: "Last 6months Personal Details"},
  {value:"kycno",label:"Bank Account De-dupe",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Bank Account De-dupe"},
  { value: "coevalidateto",label: "Bank Name",inputType: "texts",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "ftdetails",label: "FT Transfer To",inputType: "radio",required: false,validationmsg: "",placeholder:"FT Details" },
]
export const POS_LOAN_FT_DETAILS = [
  { value: "fundtransfers",label: "Fund Transfer To",inputType: "text",required: false,validationmsg: "",placeholder:"Fund Transfer To" },
  { value: "annuitantamt",label: "FT Amount",inputType: "text",required: false,validationmsg: "",placeholder:"FT Amount" },
  { value: "annuitantamt",label: "Relations To FT Policy",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Relations To FT Policy" },
  { value: "ftdetailss",label: "Name of FT Policy Owner",inputType: "text",required: false,validationmsg: "",placeholder:"Name of FT Policy Owner" },
]
export const LOAN_REQUEST_CHECKLIST = [
  {name:"validatesignature",label:"Validate Signature",inputType:"radio",isRequired:true,validationMsg:""},
  {name:"requestForm",label:"Customer Photo",inputType:"upload",isRequired:true,validationMsg:"",placeholder: "Customer Photo",subType:"loanrequest"},
  {name:"addressProof",label:"Customer Video",inputType:"upload",isRequired:true,validationMsg:"",placeholder: "Customer Video",subType:"loanrequest"},
  { value: "uploadpan",label: "Loan Form",inputType: "upload",isRequired: false,validationmsg: "",placeholder:"Loan Form",subType:"loanrequest" },
  {name:"aadharcopy",label:"Policy Bond / Indemnity",inputType:"upload",isRequired:true,validationMsg:"",placeholder: "Policy Bond / Indemnity",subType:"loanrequest"},
  {name:"idproof",label:"Policy Owner ID Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Policy Owner ID Proof",subType:"loanrequest"},
  // {name:"namechangeproof",label:"Policy Owner Address Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Policy Owner Address Proof",subType:"loanrequest"},
  {name:"validatesignatureproof",label:"Policy owner Bank Account Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Policy owner Bank Account Proof",subType:"loanrequest"},
  {name:"specimensignature",label:"Authorization Letter",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Authorization Letter",subType:"loanrequest"},
]
export const MODE_CHANGE = [
  { value: "modechange",label: "Mode Change Allowed",inputType: "text",required: false,validationmsg: "",placeholder:"Mode Change Allowed" },
  { value: "modechangeoptions",label: "Allowable Mode Change Option/s",inputType: "text",required: false,validationmsg: "",placeholder:"Allowable Mode Change Option/s" },
]
export const POLICY_MODE_DETAILS = [
  { value: "policyno",label: "Existing Mode Details",inputType: "title",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policyno",label: "Mode",inputType: "text",required: false,validationmsg: "",placeholder:"Mode" },
  { value: "policystatus",label: "Modal Premium(with tax)",inputType: "text",required: false,validationmsg: "",placeholder:"Modal Premium(with tax)" },
  { value: "annuitantname",label: "Next Due Date",inputType: "text",required: false,validationmsg: "", placeholder: "Next Due Date"},
  { value: "annuitantname",label: "Policy Duration",inputType: "text",required: false,validationmsg: "", placeholder: "LA Name"},
  { value: "plan",label: "Persistency Month",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  { value: "coevalidatefrom",label: "Bill Generated Date",inputType: "text",required: false,validationmsg: "",placeholder:"Premium" },
  { value: "coevalidateto",label: "Mode Change Effective Date",inputType: "text",required: false,validationmsg: "",placeholder:"MAX Loan Eligible" },
  { value: "annuitantmode",label: "ECS Request",inputType: "text",required: false,validationmsg: "", placeholder: "ECS Request"},
  {value:"kycno",label:"Number Of Times Mode Changed",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Number Of Times Mode Changed"},
]
export const POS_POLICY_MODE_DETAILS = [
  { value: "policyno",label: "Existing Mode Details",inputType: "title",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policyno",label: "Policy Number",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Number" },
  { value: "poname",label: "PO Name",inputType: "text",required: false,validationmsg: "",placeholder:"PO Name" },
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  { value: "policystatus",label: "Modal Premium(with tax)",inputType: "text",required: false,validationmsg: "",placeholder:"Modal Premium(with tax)" },
  // { value: "annuitantname",label: "Next Due Date",inputType: "text",required: false,validationmsg: "", placeholder: "Next Due Date"},
  { value: "annuitantname",label: "Policy Duration",inputType: "text",required: false,validationmsg: "", placeholder: "LA Name"},
  { value: "plan",label: "Persistency Month",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  { value: "coevalidatefrom",label: "Bill Generated Date",inputType: "text",required: false,validationmsg: "",placeholder:"Premium" },
  // { value: "coevalidateto",label: "Mode Change Effective Date",inputType: "text",required: false,validationmsg: "",placeholder:"MAX Loan Eligible" },
  { value: "annuitantmode",label: "ECS Request",inputType: "text",required: false,validationmsg: "", placeholder: "ECS Request"},
  // {value:"kycno",label:"Number Of Times Mode Changed",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Number Of Times Mode Changed"},

  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "laname",label: "LA Name",inputType: "text",required: false,validationmsg: "",placeholder:"LA Name" },
  { value: "mode",label: "Mode",inputType: "text",required: false,validationmsg: "", placeholder: "Mode"},
  { value: "nextduedate",label: "Next Due Date",inputType: "text",required: false,validationmsg: "", placeholder: "Next Due Date"},
  { value: "persistencymonth",label: "Persistency Month",inputType: "text",required: false,validationmsg: "", placeholder: "Persistency Month"},
  { value: "modechangeeffectivedate",label: "Mode Change Effective Date",inputType: "text",required: false,validationmsg: "", placeholder: "Mode Change Effective Date"},
  { value: "numberoftimesmodechanged",label: "Number Of Times Mode Changed ",inputType: "text",required: false,validationmsg: "", placeholder: "Number Of Times Mode Changed"},
 

  //  { value: "ecs/nach/sistatus",label: "ECS/NACH/SI Status",inputType: "text",required: false,validationmsg: "", placeholder: "ECS/NACH/SI"},
]
export const EXISTING_MODE_DETAILS = [
  { value: "policyno",label: "New Mode Details",inputType: "title",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "newmodeselected",label: "New Mode Selected",inputType: "text",required: false,validationmsg: "",placeholder:"New Mode Selected" },
  { value: "newmodelpremium",label: "New Modal Premium",inputType: "text",required: false,validationmsg: "",placeholder:"New Modal Premium" },
  { value: "impactoncurrentpremium",label: "Impact on Current Premium",inputType: "text",required: false,validationmsg: "", placeholder: "Impact on Currrent Premium"},
  { value: "Mode Change Approval",label: "Mode Change Approval",inputType: "link",textvalue:"Email Link",required: false,validationmsg: "", placeholder: "Mode Change Approval"},
  //  {value:"kycno",label:"Number Of Times Mode Changed",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Number Of Times Mode Changed"},
   { value: "sendmode",label: "Send Mode Change Link",inputType: "radios",required: false,validationmsg: "" },
]
export const POS_EXISTING_MODE_DETAILS = [
  
  { value: "newdetails",label: "New Mode Details",inputType: "title",required: false,validationmsg: "",placeholder:"New Mode Details" },
  // { value: "newdetails",label: "New Details",inputType: "text",required: false,validationmsg: "",placeholder:"New Details" },
  { value: "newmodeselected",label: "New Mode Selected",inputType: "text",required: false,validationmsg: "",placeholder:"New Mode Selected" },
  { value: "newmodalpremium",label: "New Modal Premium",inputType: "text",required: false,validationmsg: "",placeholder:"New Modal Premium" },
 { value: "impactoncurrent",label: "Impact on Current premium",inputType: "text",required: false,validationmsg: "", placeholder: "Impact on Current premium"},

   { value: "ecs/nach/sistatus",label: "ECS/NACH/SI Status",inputType: "text",required: false,validationmsg: "", placeholder: "ECS/NACH/SI"},
 
]

//  export const NEW_MODE_DETAILS = [
//   { value: "newdetails",label: "New Mode Details",inputType: "title",required: false,validationmsg: "",placeholder:"New Mode Details" },
//   { value: "newdetails",label: "New Details",inputType: "texts",required: false,validationmsg: "",placeholder:"New Details" },
//   { value: "newmodeselected",label: "New Mode Selected",inputType: "text",required: false,validationmsg: "",placeholder:"New Mode Selected" },
//   { value: "newmodalpremium",label: "New Modal Premium",inputType: "text",required: false,validationmsg: "",placeholder:"New Modal Premium" },
//  { value: "impactoncurrent",label: "Impact on Current premium",inputType: "text",required: false,validationmsg: "", placeholder: "Impact on Current premium"},

//    { value: "ecs/nach/sistatus",label: "ECS/NACH/SI Status",inputType: "text",required: false,validationmsg: "", placeholder: "ECS/NACH/SI"},
//   // { value: "sendmode",label: "Send Mode Change Link",inputType: "radios",required: false,validationmsg: "" },
//  ]
export const REGISTER_FREELOOK = [
  { value: "policyno",label: "Dispatch mode",inputType: "text",required: false,validationmsg: "",placeholder:"Dispatch mode" },
  { value: "policystatus",label: "Policy Issuance",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Issuance" },
  { value: "annuitantname",label: "Dispatch Date",inputType: "text",required: false,validationmsg: "", placeholder: "Dispatch Date"},
  { value: "annuitantname",label: "FLC Period Ends On",inputType: "text",required: false,validationmsg: "", placeholder: "FLC Period Ends On"},
  { value: "plan",label: "POD No",inputType: "text",required: false,validationmsg: "",placeholder:"POD No" },
  { value: "coevalidatefrom",label: "FLC Period",inputType: "text",required: false,validationmsg: "",placeholder:"FLC Period" },
  { value: "coevalidateto",label: "Received On",inputType: "text",required: false,validationmsg: "",placeholder:"Received On" },
  {value:"kycno",label:"Received By",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Received By"},
  { value: "annuitantmode",label: "Retention Tools",inputType: "link",textvalue:"link",required: false,validationmsg: "", placeholder: "Retention Tools"},
  { value: "annuitantamt",label: "FAQs",inputType: "link",textvalue:"link",required: false,validationmsg: "",placeholder:"FAQs" },
  { value: "coevalidatefrom",label: "RTO Status",inputType: "text",required: false,validationmsg: "",placeholder:"RTO Status" },
  { value: "coevalidateto",label: "Medical Cost",inputType: "text",required: false,validationmsg: "",placeholder:"Medical Cost" },
  { value: "annuitantmode",label: "Policy Redispatch",inputType: "text",required: false,validationmsg: "", placeholder: "Policy Redispatch"},
  {value:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},
  { value: "annuitantamt",label: "Dispatch Mode",inputType: "text",required: false,validationmsg: "",placeholder:"Dispatch Mode" },
  { value: "coevalidateto",label: "SB Payout",inputType: "text",required: false,validationmsg: "",placeholder:"SB Payout" },
  { value: "annuitantmode",label: "Dispatch Date",inputType: "text",required: false,validationmsg: "", placeholder: "Dispatch Date"},
  {value:"kycno",label:"Welcome Call Date",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Welcome Call Date"},
  { value: "annuitantamt",label: "POD No",inputType: "text",required: false,validationmsg: "",placeholder:"POD No" },
  { value: "ftdetails",label: "Welcome Call Comments",inputType: "text",required: false,validationmsg: "",placeholder:"Welcome Call Comments" },
  { value: "annuitantamt",label: "Received On",inputType: "text",required: false,validationmsg: "",placeholder:"Received On" },
  { value: "coevalidateto",label: "Free-Look Reason",inputType: "text",required: false,validationmsg: "",placeholder:"Free-Look Reason" },
  { value: "annuitantmode",label: "Received By",inputType: "text",required: false,validationmsg: "", placeholder: "Received By"},
]
export const FREELOOK_BOE = [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "annuitantname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "annuitantname",label: "LA Name",inputType: "text",required: false,validationmsg: "", placeholder: "LA Name"},
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  { value: "coevalidatefrom",label: "Premium",inputType: "text",required: false,validationmsg: "",placeholder:"Premium" },
  { value: "policyno",label: "KYC No",inputType: "text",required: false,validationmsg: "",placeholder:"KYC No" },
  { value: "policyno",label: "Dispatch mode",inputType: "text",required: false,validationmsg: "",placeholder:"Dispatch mode" },
  { value: "policystatus",label: "Policy Issuance",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Issuance" },
  { value: "annuitantname",label: "Dispatch Date",inputType: "text",required: false,validationmsg: "", placeholder: "Dispatch Date"},
  { value: "annuitantname",label: "FLC Period Ends On",inputType: "text",required: false,validationmsg: "", placeholder: "FLC Period Ends On"},
  { value: "plan",label: "POD No",inputType: "text",required: false,validationmsg: "",placeholder:"POD No" },
  { value: "coevalidatefrom",label: "FLC Period",inputType: "text",required: false,validationmsg: "",placeholder:"FLC Period" },
  { value: "coevalidateto",label: "Received On",inputType: "text",required: false,validationmsg: "",placeholder:"Received On" },
  { value: "annuitantmode",label: "Retention Tools",inputType: "link",textvalue:"link",required: false,validationmsg: "", placeholder: "Retention Tools"},
  { value: "annuitantamt",label: "FAQs",inputType: "link",textvalue:"link",required: false,validationmsg: "",placeholder:"FAQs" },
  {value:"kycno",label:"Received By",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Received By"},
  { value: "coevalidatefrom",label: "RTO Status",inputType: "text",required: false,validationmsg: "",placeholder:"RTO Status" },
  { value: "coevalidateto",label: "Medical Cost",inputType: "text",required: false,validationmsg: "",placeholder:"Medical Cost" },
  { value: "annuitantmode",label: "Policy Redispatch",inputType: "text",required: false,validationmsg: "", placeholder: "Policy Redispatch"},
  {value:"kycno",label:"KYC No",inputType:"text",isRequired:true,validationMsg:"",placeholder:"KYC No"},
  { value: "annuitantamt",label: "Dispatch Mode",inputType: "text",required: false,validationmsg: "",placeholder:"Dispatch Mode" },
  { value: "coevalidateto",label: "SB Payout",inputType: "text",required: false,validationmsg: "",placeholder:"SB Payout" },
  { value: "annuitantmode",label: "Dispatch Date",inputType: "date",required: false,validationmsg: "", placeholder: "Dispatch Date"},
  {value:"kycno",label:"Welcome Call Date",inputType:"date",isRequired:true,validationMsg:"",placeholder:"Welcome Call Date"},
  { value: "annuitantamt",label: "POD No",inputType: "text",required: false,validationmsg: "",placeholder:"POD No" },
  { value: "ftdetails",label: "Welcome Call Comments",inputType: "text",required: false,validationmsg: "",placeholder:"Welcome Call Comments" },
  { value: "annuitantamt",label: "Received On",inputType: "text",required: false,validationmsg: "",placeholder:"Received On" },
  { value: "coevalidateto",label: "Free-Look Reason",inputType: "text",required: false,validationmsg: "",placeholder:"Free-Look Reason" },
  { value: "annuitantmode",label: "Received By",inputType: "text",required: false,validationmsg: "", placeholder: "Received By"},
  { value: "annuitantamt",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
  { value: "ftdetails",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
  { value: "annuitantamt",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "coevalidateto",label: "Bank account Number",inputType: "text",required: false,validationmsg: "",placeholder:"Bank account Number" },
  { value: "annuitantmode",label: "Confirm Bank Account NUmber",inputType: "text",required: false,validationmsg: "", placeholder: "Confirm Bank Account NUmber"},
  { value: "annuitantmode",label: "Confirm Bank Account NUmber",inputType: "texts",required: false,validationmsg: "", placeholder: "Confirm Bank Account NUmber"},
  { value: "fundtransfer",label: "Fund Transfer To",inputType: "radio",required: false,validationmsg: "", placeholder: "Confirm Bank Account NUmber"},
]
export const FREELOOK_FT_DETAILS = [
  { value: "fundtransfers",label: "Fund Transfer To",inputType: "text",required: false,validationmsg: "",placeholder:"Fund Transfer To" },
  {name:"ftamount",label:"FT Amount",inputType:"text",isRequired:true,validationMsg:"",placeholder:"FT Amount"},
  {name:"ftpolicy",label:"Relations to FT Policy",inputType:"dropdown",isRequired:true,validationMsg:"",placeholder:"Relations to FT Policy"},

  {name:"ftamtowner",label:"Name of FT Amount Owner",inputType:"text",isRequired:true,validationMsg:"",placeholder:"Name of FT Amount Owner"},
]
export const BANK_UPDATION_BOE = [
  { value: "policyno",label: "Existing Bank Details",inputType: "title",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "annuitantname",label: "A/C Holders Name",inputType: "text",required: false,validationmsg: "", placeholder: "A/C Holders Name"},
  { value: "policyno",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "policystatus",label: "IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"IFSC" },
  { value: "plan",label: "Bank Account No",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Account No" },
  { value: "coevalidatefrom",label: "Type Of Account",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Type Of Account" },
  { value: "annuitantname",label: "Registered On",inputType: "text",required: false,validationmsg: "", placeholder: "Registered On"},
]
export const NEW_BANK_UPDATION_BOE = [
  { value: "policyno",label: "Update New Bank Details",inputType: "title",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "annuitantname",label: "A/C Holders Name",inputType: "text",required: false,validationmsg: "", placeholder: "A/C Holders Name"},
  { value: "policyno",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "policystatus",label: "IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"IFSC" },
  { value: "plan",label: "Bank Account No(masked)",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Account No" },
  { value: "plan",label: "Re-enter Bank Account No",inputType: "text",required: false,validationmsg: "",placeholder:"Re-enter Bank Account No" },
  { value: "coevalidatefrom",label: "Type Of Account",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Type Of Account" },
  { value: "coevalidatefrom",label: "Bank Account de-dupe",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Account de-dupe" },
  { value: "plan",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder:"Penny Drop Result" },
]
export const BANK_UPDATION_POS = [
  { value: "policyno",label: "policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "annuitantname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "annuitantname",label: "LA Name",inputType: "text",required: false,validationmsg: "", placeholder: "LA Name"},
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  { value: "coevalidatefrom",label: "Premium",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Premium" },
  { value: "policyno",label: "KYC No",inputType: "text",required: false,validationmsg: "",placeholder:"KYC No" },
  { value: "policyno",label: "Name as Mentioned in the Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in the Bank A/C" },
  { value: "policystatus",label: "Bank Name",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Name" },
  { value: "annuitantname",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "", placeholder: "Bank IFSC"},
  { value: "annuitantname",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number"},
  { value: "plan",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "",placeholder:"Penny Drop Result" },
  { value: "coevalidatefrom",label: "Bank Account de-dupe",inputType: "text",required: false,validationmsg: "",placeholder:"Bank Account de-dupe" },
]
export const UNIT_STATEMENT_BOE = [
  {value: 'policystatus',label: 'Policy Status',inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  {value: 'outofrevival',label: 'Out of Revival',inputType: "text",required: false,validationmsg: "",placeholder:"Out of Revival" },
  {value: 'basepremium',label: 'Base Premium',inputType: "text",required: false,validationmsg: "",placeholder:"Base Premium" },
  {value: 'gst',label: 'GST',inputType: "text",required: false,validationmsg: "",placeholder:"GST" },
  {value: 'premiumpaidcertificate',label: 'Payment Amount',inputType: "text",required: false,validationmsg: "",placeholder:"Payment Amount" },
  {value: 'btn',label: 'Enable Split Link',inputType: "button",required: false,validationmsg: "",placeholder:"Link 1" },
  {value: 'link1',label: 'Link 1',inputType: "text",required: false,validationmsg: "",placeholder:"Link 1" },
  {value: 'link1',label: 'Link 1',inputType: "texts",required: false,validationmsg: "",placeholder:"Link 1" },
  {value: 'link2',label: 'Link 2',inputType: "text",required: false,validationmsg: "",placeholder:"Link 2" },
  {value: 'link1',label: 'Link 1',inputType: "texts",required: false,validationmsg: "",placeholder:"Link 1" },
  {value: 'link3',label: 'Link 3',inputType: "text",required: false,validationmsg: "",placeholder:"Link 3" },
  {value: 'sendpaymentlink',label: 'Send Payment Link',inputType: "radios",required: false,validationmsg: "",placeholder:"Send Via" }
]
export const PREMIUM_PAID_BOE = [
  {value: 'documenttype',label: 'Document Name',inputType: "title",required: false,validationmsg: "",placeholder:"Document Name" },
  {value: 'documenttype',label: 'Document Name',inputType: "texts",required: false,validationmsg: "",placeholder:"Document Name" },
  {value: 'premiumpaidcertificate',label: 'Premium Paid Certificate',inputType: "dropdown",required: false,validationmsg: "",placeholder:"Select Year" },
  {value: 'sendvia',label: 'Send Via',inputType: "radios",required: false,validationmsg: "",placeholder:"Send Via" }
]
export const DISCONTINUANCE_BOE = [
  {value: 'documenttype',label: 'Document Name',inputType: "dropdown",required: false,validationmsg: "",placeholder:"Document Name" },
  {value: 'premiumpaidcertificate',label: 'Discontinuance Notice',inputType: "text",required: false,validationmsg: "",placeholder:"Premium Paid Certificate" },
  {value: 'sendvia',label: 'Send Via',inputType: "radios",required: false,validationmsg: "",placeholder:"Send Via" }
]
export const SIS_BOE = [
  {value: 'documenttype',label: 'Document Name',inputType: "dropdown",required: false,validationmsg: "",placeholder:"Document Name" },
  {value: 'sis',label: 'SIS',inputType: "text",required: false,validationmsg: "",placeholder:"Premium Paid Certificate" },
  {value: 'sendvia',label: 'Send Via',inputType: "radios",required: false,validationmsg: "",placeholder:"Send Via" }
]
export const BONUS_LETTER_BOE = [
  {value: 'documenttype',label: 'Document Name',inputType: "dropdown",required: false,validationmsg: "",placeholder:"Document Name" },
  {value: 'bonus letter',label: 'Bonus Letter',inputType: "date",required: false,validationmsg: "",placeholder:"Premium Paid Certificate" },
  {value: 'sendvia',label: 'Send Via',inputType: "radios",required: false,validationmsg: "",placeholder:"Send Via" }
]
export const REVIVAL = [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "annuitantname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "annuitantname",label: "LA Name",inputType: "text",required: false,validationmsg: "", placeholder: "LA Name"},
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  { value: "coevalidatefrom",label: "Premium",inputType: "dropdown",required: false,validationmsg: "",placeholder:"Premium" },
  { value: "policyno",label: "Total Premium Due",inputType: "text",required: false,validationmsg: "",placeholder:"Total Premium Due" },
  { value: "policyno",label: "Interest Waiver & Amt",inputType: "text",required: false,validationmsg: "",placeholder:"Interest Waiver & Amt" },
  { value: "policystatus",label: "OverDue Period",inputType: "text",required: false,validationmsg: "",placeholder:"OverDue Period" },
  { value: "annuitantname",label: "DGH Required",inputType: "text",required: false,validationmsg: "", placeholder: "DGH Required"},
  { value: "annuitantname",label: "Premium Holiday",inputType: "text",required: false,validationmsg: "", placeholder: "Premium Holiday"},
]
export const REVIVAL_CHECKLIST = [
  { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: false,validationmsg: "",placeholder:"Validate Signature",subType:"revivalwithdgh"},
  { name: "validatesignature",label: "Request Form",inputType: "upload",required: false,validationmsg: "",placeholder:"Request Form",subType:"revivalwithdgh"},
  { value: "dghcopy",label: "DGH Copy",inputType: "upload",required: false,validationmsg: "", placeholder: "DGH Copy"},
  { value: "covidquestionaire",label: "Covid Questionaire",inputType: "upload",required: false,validationmsg: "", placeholder: "Covid Questionaire"},
  { value: "policyowner",label: "Policy Owner ID Proof",inputType: "upload",required: false,validationmsg: "",placeholder:"Policy Owner ID Proof" },
]
export const REVIVAL_QUOTATION = [
  { value: "policyno",label: "Out of Revival",inputType: "text",required: false,validationmsg: "",placeholder:"Out of Revival" },
  { value: "policystatus",label: "Total Base Premium + Tax",inputType: "text",required: false,validationmsg: "",placeholder:"Total Base Premium + Tax" },
  { value: "annuitantname",label: "Interest Amount",inputType: "text",required: false,validationmsg: "", placeholder: "Interest Amount"},
  { value: "annuitantname",label: "Amt in Suspense (Debit/Credit)",inputType: "text",required: false,validationmsg: "", placeholder: "Amt in Suspense (Debit/Credit)"},
  { value: "plan",label: "Total Premium Due",inputType: "text",required: false,validationmsg: "",placeholder:"Total Premium Due" },
  { value: "policyno",label: "Interest Waiver & Amt",inputType: "text",required: false,validationmsg: "",placeholder:"Interest Waiver & Amt" },
  { value: "policystatus",label: "OverDue Period",inputType: "text",required: false,validationmsg: "",placeholder:"OverDue Period" },
  { value: "annuitantname",label: "DGH Required",inputType: "text",required: false,validationmsg: "", placeholder: "DGH Required"},
  { value: "annuitantname",label: "Premium Holiday",inputType: "text",required: false,validationmsg: "", placeholder: "Premium Holiday"},
  { value: "annuitantname",label: "Interest Waiver",inputType: "link",textvalue:"Email Link",required: false,validationmsg: "", placeholder: "Interest Waiver"},
  { value: "plan",label: "Renewal Pick Up Request",inputType: "title",required: false,validationmsg: "",placeholder:"Renewal Pick Up Request" },
  { value: "policyno",label: "Address",inputType: "texts",required: false,validationmsg: "",placeholder:"Address" },
  { value: "policyno",label: "Address",inputType: "text",required: false,validationmsg: "",placeholder:"Address" },
  { value: "policystatus",label: "Date & Time",inputType: "text",required: false,validationmsg: "",placeholder:"DD/MM/YYYY" },
  { value: "annuitantname",label: "Send Revival Quotation",inputType: "radios",required: false,validationmsg: "", placeholder: "DGH Required"},
  { value: "annuitantname",label: "Send Payment/Revival Link",inputType: "radios",required: false,validationmsg: "", placeholder: "Premium Holiday"},
  { value: "annuitantname",label: "Send Revival Requirements",inputType: "radios",required: false,validationmsg: "", placeholder: "Premium Holiday"},
]
export const REVIVAL_STATUSENQUIRY = [
  { value: "policyno",label: "Out of Revival",inputType: "text",required: false,validationmsg: "",placeholder:"Out of Revival" },
  { value: "policystatus",label: "Auto Pay",inputType: "text",required: false,validationmsg: "",placeholder:"Auto Pay" },
  { value: "annuitantname",label: "Base Prem",inputType: "text",required: false,validationmsg: "", placeholder: "Base Prem"},
  { value: "annuitantname",label: "GST",inputType: "text",required: false,validationmsg: "", placeholder: "GST"},
  { value: "plan",label: "Interest Amt",inputType: "text",required: false,validationmsg: "",placeholder:"Interest Amt" },
  { value: "policyno",label: "Amt in Suspense (debit/credit)",inputType: "text",required: false,validationmsg: "",placeholder:"Amt in Suspense (debit/credit)" },
  { value: "policystatus",label: "Total Premium Due",inputType: "text",required: false,validationmsg: "",placeholder:"Total Premium Due" },
  { value: "annuitantname",label: "Interest Waiver",inputType: "text",required: false,validationmsg: "", placeholder: "Interest Waiver"},
  { value: "annuitantname",label: "Overdue Period",inputType: "text",required: false,validationmsg: "", placeholder: "Overdue Period"},
  { value: "annuitantname",label: "DGH Required",inputType: "text",required: false,validationmsg: "", placeholder: "DGH Required"},
  { value: "plan",label: "Premium Holiday",inputType: "text",required: false,validationmsg: "",placeholder:"Premium Holiday" },
  { value: "policystatus",label: "Balance No of Years to Pay",inputType: "text",required: false,validationmsg: "",placeholder:"Balance No of Years to Pay" },
  { value: "policyno",label: "No of Years Premium Paid",inputType: "text",required: false,validationmsg: "",placeholder:"No of Years Premium Paid" },
  { value: "policyno",label: "",inputType: "link", textvalue:"Last 5 Payment Details",required: false,validationmsg: "",placeholder:"Last 5 Payment Details" },
  { value: "policystatus",label: "Interest Waiver",inputType: "link",textvalue:"Email Link",required: false,validationmsg: "",placeholder:"Interest Waiver" },
  { value: "annuitantname",label: "Send Payment/Revival Link",inputType: "radios",required: false,validationmsg: "", placeholder: "Send Payment/Revival Link"},
  { value: "annuitantname",label: "Send Revival Quotation",inputType: "radios",required: false,validationmsg: "", placeholder: "Send Revival Quotation"},
  { value: "annuitantname",label: "Send Revival Requirements",inputType: "radios",required: false,validationmsg: "", placeholder: "Send Revival Requirements"},
  { value: "policystatus",label: "One Time Transaction",inputType: "titlecheckbox",required: false,validationmsg: "",placeholder:"Total Premium Due" },
  { value: "annuitantname",label: "Interest Waiver",inputType: "texts",required: false,validationmsg: "", placeholder: "Interest Waiver"},
  // { value: "annuitantname",label: "Address",inputType: "text",required: false,validationmsg: "", placeholder: "Address"},
  // { value: "annuitantname",label: "Date & time",inputType: "text",required: false,validationmsg: "", placeholder: "DD/MM/YYYY"},
  
]
export const ONETIMETRANSACTION = [
  { value: "annuitantname",label: "Re-debit Amount",inputType: "text",required: false,validationmsg: "", placeholder: "Re-debit Amount"},
  { value: "annuitantname",label: "Re-debit Date",inputType: "date",required: false,validationmsg: "", placeholder: "DD/MM/YYYY"},
]
export const SURRENDER_DETAILS = [
  { value: "policyno",label: "Out of Revival",inputType: "text",required: false,validationmsg: "",placeholder:"Out of Revival" },
  { value: "policystatus",label: "Surrender Applicable",inputType: "text",required: false,validationmsg: "",placeholder:"Surrender Applicable" },
  { value: "annuitantname",label: "Policy Can be Surrendered After",inputType: "text",required: false,validationmsg: "", placeholder: "DD/MM/YYYY"},
  { value: "annuitantname",label: "Total Surender Value",inputType: "text",required: false,validationmsg: "", placeholder: "Total Surender Value"},
  { value: "plan",label: "Total Premium Paid",inputType: "text",required: false,validationmsg: "",placeholder:"Total Premium Paid" },
  { value: "coevalidatefrom",label: "Gross Surrender Value",inputType: "text",required: false,validationmsg: "",placeholder:"Gross Surrender Value" },
  { value: "policyno",label: "Less Loan(Principle + Interest)",inputType: "text",required: false,validationmsg: "",placeholder:"Less Loan(Principle + Interest)" },
  { value: "policyno",label: "Net Surrender Value",inputType: "text",required: false,validationmsg: "",placeholder:"Net Surrender Value" },
  { value: "policystatus",label: "Surrender Value Date",inputType: "text",required: false,validationmsg: "",placeholder:"DD/MM/YYYY" },
  { value: "annuitantname",label: "Policy Net Loss/Gain",inputType: "text",required: false,validationmsg: "", placeholder: "Policy Net Loss/Gain"},
  { value: "annuitantname",label: "TDS Amount",inputType: "text",required: false,validationmsg: "", placeholder: "TDS Amount"},
  { value: "policyno",label: "TDS %",inputType: "text",required: false,validationmsg: "",placeholder:"TDS %" },
  { value: "policystatus",label: "Last Renewal Call Disposition",inputType: "text",required: false,validationmsg: "",placeholder:"Last Renewal Call Disposition" },
  { value: "annuitantname",label: "Previously Retained Count",inputType: "text",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
  { value: "annuitantname",label: "Loan Available",inputType: "text",required: false,validationmsg: "", placeholder: "Loan Available"},
  { value: "annuitantname",label: "Send Surrender Process",inputType: "radios",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
  { value: "annuitantname",label: "Send Surrender Request Form",inputType: "radios",required: false,validationmsg: "", placeholder: "Loan Available"},
  { value: "annuitantname",label: "Generate Fund Statement",inputType: "radios",required: false,validationmsg: "", placeholder: "Previously Retained Count"},
  { value: "annuitantname",label: "Send Surrender Value Letter",inputType: "radios",required: false,validationmsg: "", placeholder: "Loan Available"},
  { value: "annuitantname",label: "Product USP Link",inputType: "button",required: false,validationmsg: "", placeholder: "Loan Available"},
]
export const SURRENDER_DETAILS_CHECKLIST = [
  { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: false,validationmsg: "",placeholder:"Out of Revival",subType:"surrenderrequest" },
  { value: "policystatus",label: "Retention Letter",inputType: "upload",required: false,validationmsg: "",placeholder:"Retention Letter" },
]
export const SURRENDER_BOE = [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "annuitantname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "annuitantname",label: "LA Name",inputType: "text",required: false,validationmsg: "", placeholder: "LA Name"},
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  { value: "coevalidatefrom",label: "Premium",inputType: "text",required: false,validationmsg: "",placeholder:"Premium" },
  { value: "policystatus",label: "KYC No",inputType: "text",required: false,validationmsg: "",placeholder:"KYC No" },
  { value: "policyno",label: "Surrender value",inputType: "text",required: false,validationmsg: "",placeholder:"Surrender value" },
  { value: "annuitantname",label: "Assignment",inputType: "text",required: false,validationmsg: "", placeholder: "Assignment"},
  { value: "annuitantname",label: "Assignment Type",inputType: "text",required: false,validationmsg: "", placeholder: "Assignment Type"},
  { value: "plan",label: "Early Surrender Flag",inputType: "text",required: false,validationmsg: "",placeholder:"Early Surrender Flag" },
  { value: "coevalidatefrom",label: "Surrender Amount Requested",inputType: "text",required: false,validationmsg: "",placeholder:"Surrender Amount Requested" },
  { value: "policyno",label: "TDS Amount",inputType: "text",required: false,validationmsg: "",placeholder:"TDS Amount" },
  { value: "policyno",label: "TDS %",inputType: "text",required: false,validationmsg: "",placeholder:"TDS %" },
  { value: "policyno",label: "Bank Details",inputType: "title",required: false,validationmsg: "",placeholder:"TDS Amount" },
  { value: "policyno",label: "TDS Amount",inputType: "texts",required: false,validationmsg: "",placeholder:"TDS Amount" },
  { value: "policyno",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
  { value: "policystatus",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
  { value: "annuitantname",label: "Bank Name",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Name"},
  { value: "annuitantname",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number"},
  { value: "annuitantname",label: "Type Of Account",inputType: "dropdown",required: false,validationmsg: "", placeholder: "Select Type Of Account"},
  { value: "annuitantname",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "", placeholder: "Penny Drop Result"},
  { value: "fundtransfer",label: "Fund Transfer",inputType: "radio",required: false,validationmsg: "", placeholder: "Fund Transfer To"},
]
export const SURRENDER_POS = [
  { value: "policyno",label: "Policy No",inputType: "text",required: false,validationmsg: "",placeholder:"Policy No" },
  { value: "policystatus",label: "Policy Status",inputType: "text",required: false,validationmsg: "",placeholder:"Policy Status" },
  { value: "annuitantname",label: "PO Name",inputType: "text",required: false,validationmsg: "", placeholder: "PO Name"},
  { value: "annuitantname",label: "LA Name",inputType: "text",required: false,validationmsg: "", placeholder: "LA Name"},
  { value: "plan",label: "Plan",inputType: "text",required: false,validationmsg: "",placeholder:"Plan" },
  { value: "coevalidatefrom",label: "Premium",inputType: "text",required: false,validationmsg: "",placeholder:"Premium" },
  { value: "policystatus",label: "KYC No",inputType: "text",required: false,validationmsg: "",placeholder:"KYC No" },
  { value: "policyno",label: "Surrender value",inputType: "text",required: false,validationmsg: "",placeholder:"Surrender value" },
  { value: "annuitantname",label: "Assignment",inputType: "text",required: false,validationmsg: "", placeholder: "Assignment"},
  { value: "annuitantname",label: "Assignment Type",inputType: "text",required: false,validationmsg: "", placeholder: "Assignment Type"},
  { value: "plan",label: "Early Surrender Flag",inputType: "text",required: false,validationmsg: "",placeholder:"Early Surrender Flag" },
  { value: "coevalidatefrom",label: "Surrender Amount Requested",inputType: "text",required: false,validationmsg: "",placeholder:"Surrender Amount Requested" },
  { value: "policyno",label: "TDS Amount",inputType: "text",required: false,validationmsg: "",placeholder:"TDS Amount" },
  { value: "policyno",label: "TDS %",inputType: "text",required: false,validationmsg: "",placeholder:"TDS %" },
  { value: "annuitantname",label: "Gross Surrender Value",inputType: "text",required: false,validationmsg: "", placeholder: "Gross Surrender Value"},
  { value: "plan",label: "Less Loan (Principle + Interest)",inputType: "text",required: false,validationmsg: "",placeholder:"Less Loan (Principle + Interest)" },
  { value: "coevalidatefrom",label: "Special Surrender Value (If any)",inputType: "text",required: false,validationmsg: "",placeholder:"Special Surrender Value (If any)" },
  { value: "policyno",label: "Net Surrender Value",inputType: "text",required: false,validationmsg: "",placeholder:"Net Surrender Value" },
  { value: "policyno",label: "Last 06 months personal details change",inputType: "text",required: false,validationmsg: "",placeholder:"Last 06 months personal details change" },
  { value: "policyno",label: "TDS Amount",inputType: "texts",required: false,validationmsg: "",placeholder:"TDS Amount" },
  { value: "policyno",label: "Bank Details",inputType: "title",required: false,validationmsg: "",placeholder:"TDS Amount" },
  { value: "policyno",label: "TDS Amount",inputType: "texts",required: false,validationmsg: "",placeholder:"TDS Amount" },
  { value: "policyno",label: "Name as Mentioned in The Bank A/C",inputType: "text",required: false,validationmsg: "",placeholder:"Name as Mentioned in The Bank A/C" },
  { value: "policystatus",label: "Bank IFSC",inputType: "text",required: false,validationmsg: "",placeholder:"Bank IFSC" },
  { value: "annuitantname",label: "Bank Name",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Name"},
  { value: "annuitantname",label: "Bank Account Number",inputType: "text",required: false,validationmsg: "", placeholder: "Bank Account Number"},
  { value: "annuitantname",label: "Type Of Account",inputType: "dropdown",required: false,validationmsg: "", placeholder: "Select Type Of Account"},
  { value: "annuitantname",label: "Penny Drop Result",inputType: "text",required: false,validationmsg: "", placeholder: "Penny Drop Result"},
  { value: "fundtransfer",label: "Fund Transfer",inputType: "radio",required: false,validationmsg: "", placeholder: "Fund Transfer To"},
]
export const SURRENDER_CHECKLIST = [
  { name: "validatesignature",label: "Validate Signature",inputType: "radio",required: false,validationmsg: "",placeholder:"Out of Revival",subType:"surrenderrequest" },
  {name:"validatesignature",label:"Retention attempt",inputType:"radio",isRequired:true,validationMsg:"",placeholder:"Retention attempt",callType:"surrender",subType:"surrenderrequest"},
  { name: "validatesignature",label: "PAN Aadhar Linked",inputType: "radio",required: false,validationmsg: "",placeholder:"Out of Revival",subType:"surrenderrequest" },
  { name: "validatesignature",label: "Penal Interest Applicable",inputType: "radio",required: false,validationmsg: "",placeholder:"Out of Revival",subType:"surrenderrequest" },
  { name: "prior3pm",label: "Request Time",inputType: "radio",required: false,validationmsg: "",placeholder:"Penal Interest Applicable",callType:"partialwithdrawalrequest",subType:"surrenderrequest" },
  {name:"customerphoto",label:"Customer Photo",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Customer Photo",callType:"surrender",subType:"surrenderrequest"},
  {name:"customervideo",label:"Customer Video",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Customer Video",callType:"surrender",subType:"surrenderrequest"},
  {name:"surrender",label:"Surrender Form",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Surrender Form",callType:"surrender",subType:"surrenderrequest"},
  {name:"indemnity",label:"Policy Bond / Indemnity",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Policy Bond / Indemnity",callType:"surrender",subType:"surrenderrequest"},
  {name:"owneraddressproof",label:"Policy Owner ID proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Policy Owner ID proof",callType:"surrender",subType:"surrenderrequest"},
  {name:"ownerbankproof",label:"Policy Owner Bank Account Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Policy Owner Bank Account Proof",callType:"surrender",subType:"surrenderrequest"},
]
export const RENEWAL_PREMIUM_RECEIPT=[
  { value: "annuitantname",label: "Renewal Premium Receipt",inputType: "title",required: false,validationmsg: "", placeholder: "FT Details"},
  { value: "annuitantname",label: "",inputType: "texts",required: false,validationmsg: "", placeholder: "FT Details"},
  { value: "annuitantname",label: "From",inputType: "date",required: false,validationmsg: "", placeholder: "FT Details"},
  { value: "fundtransfer",label: "To",inputType: "date",required: false,validationmsg: "", placeholder: "Fund Transfer To"},
  { value: "sendvia",label: "Send Via",inputType: "radios",required: false,validationmsg: "", placeholder: "Fund Transfer To"},
]
export const RENEWAL_LAST5_OPEN_TICKETS = [
  {title: "Sr No", field:"srno"},
  {title: "Id No", field: "idno"},
  {title: "Payment Receipt Date", field: "paymentreceiptdate"},
  {title: "Amount", field: "amount"},
  {title: "Payment Mode", field: "paymentmode"},
  {title: "", field: ""},
]
export const RENEWAL_TABLE_DATA = [
  {srno:1, idno: "100", paymentreceiptdate: "10/09/2023", amount: "2,000", paymentmode: "Cash ",},
  {srno:2,  idno: "100",paymentreceiptdate: "11/09/2023", amount: "4,000", paymentmode: "Cash ", },
  {srno:3, idno: "100", paymentreceiptdate: "12/09/2023", amount: "6,000", paymentmode: "Digital", },
  {srno:4,  idno: "100",paymentreceiptdate: "13/09/2023", amount: "8,000", paymentmode: "Cash", },
  {srno:5,  idno: "100",paymentreceiptdate: "14/09/2023", amount: "10,000", paymentmode: "Digital",},
]
export const SURRENDER_RETAIN = [
  { value: "outofrevival", label: "out of revival", type: "radio" },
  {
    value: "surrenderapplicable",
    label: "surrender applicable",
    type: "radio",
    required: false,
    validationmsg: ""
  },
  {
    value: "policycanbesurrenderedafter",
    label: "policy can be surrendered after",
    type: "date",
    required: false,
    validationmsg: ""
  },
  {
    value: "totalfund",
    label: "Total Fund/ Surrender Value(1)",
    type: "number",
    minlength: 3,
    maxlength: 10,
    required: true,
    validationmsg: "please enter value!"
  },
  {
    value: "prviouslyretainedcount",
    label: "prviously retained count",
    type: "number",
    maxlength: 10,
    required: false,
    validationmsg: ""
  },
  {
    value: "lastretainedthrough",
    label: "Last Reatined Through",
    type: "number",
    maxlength: 10,
    required: false,
    validationmsg: ""
  },
  {
    value: "policycompletionperiod",
    label: "Policy Completion Period",
    type: "number",
    minlength: 3,
    maxlength: 10,
    required: true,
    validationmsg: "please enter value!"
  },
  {
    value: "sendsurrenderprocess",
    label: "Send surrender process",
    type: "checkbox",
    required: false,
    validationmsg: null
  },
  {
    value: "generatefundvalueletter",
    label: "Generate Fund Value letter",
    type: "checkbox",
    required: false,
    validationmsg: null
  },
 
];
export const SURRENDER_POLICY=[
  { value: "totalpremiumpaid", label: "Total Premium paid", type: "number" },
  { value: "grosssurrendervalue", label: "Gross Surrender value", type: "number" },
  { value: "netsurrendervalue", label: "Net Surrender Value", type: "number" },
  { value: "surrendervaluedate", label: "Surrender Value date", type: "date" },
  { value: "policynet", label: "Policy net Loss/Gain", type: "number" },
  { value: "tgsamount", label: "TGS Amount", type: "number" },
]
export const RENEWAL = [
  { date:"DD/MM/YYYY", ticketnumber:"Transaction 01", calltype: "Call Type", subtype1: "Sub Type 1", subtype2:"Sub Type 2", status:"Status", types: "Q/R/C", createdby:"Created By", source:"Source", tnt:"TNT" },
  { date:"DD/MM/YYYY", ticketnumber:"Transaction 01", calltype: "Call Type", subtype1: "Sub Type 1", subtype2:"Sub Type 2", status:"Status", types: "Q/R/C", createdby:"Created By", source:"Source", tnt:"TNT" },
  { date:"DD/MM/YYYY", ticketnumber:"Transaction 01", calltype: "Call Type", subtype1: "Sub Type 1", subtype2:"Sub Type 2", status:"Status", types: "Q/R/C", createdby:"Created By", source:"Source", tnt:"TNT" },
  { date:"DD/MM/YYYY", ticketnumber:"Transaction 01", calltype: "Call Type", subtype1: "Sub Type 1", subtype2:"Sub Type 2", status:"Status", types: "Q/R/C", createdby:"Created By", source:"Source", tnt:"TNT" },
  { date:"DD/MM/YYYY", ticketnumber:"Transaction 01", calltype: "Call Type", subtype1: "Sub Type 1", subtype2:"Sub Type 2", status:"Status", types: "Q/R/C", createdby:"Created By", source:"Source", tnt:"TNT" },
];
export const LAST5_OPEN_TICKETS = [
  {title: "Ticket Open Date", field:"date"},
  {title: "Ticket No", field: "serviceNo"},
  {title: "Call Type", field: "callTypeName"},
  {title: "Sub Type", field: "subTypeName"},
  {title: "Status", field: "status"},
  {title: "Q/R/C", field: "category"},
  {title: "Closure Date", field: "closedDate"},
  {title: "Created By", field: "createdBy"},
  {title: "Source", field: "source"},
  {title: "Ageing", field: "currentTAT"},
  {title: "TAT", field: "tat"}

]
export const OPENTICKETS_DATA = [
  {id:1, date: "10/09/2023", ticketNo: "Q20230915001", callType: "Contract Alteration ", subType: "PAN Update", status: "Request Raised and Moved to POS", q:"Request",createdBy:"ChetanN",source:"Branch",tat: "2"},
  {id:2, date: "11/09/2023", ticketNo: "Q20230915002", callType: "Contract Alteration ", subType: "Aadhar Update", status: "Request Raised and Moved to POS", q:"Request",createdBy:"SachinT",source:"Customer Service",tat: "3"},
  {id:3, date: "12/09/2023", ticketNo: "Q20230915003", callType: "Contract Alteration ", subType: "Change in DOB  - LA/Proposer", status: "Request Raised and Moved to POS", q:"Request",createdBy:"VirajK",source:"Branch",tat: "5"},
  {id:4, date: "13/09/2023", ticketNo: "Q20230915004", callType: "Freelook", subType: "Register Freelook Request", status: "Request Raised and Moved to POS", q:"Request",createdBy:"KundanT",source:"Branch",tat: "10"},
  {id:5, date: "14/09/2023", ticketNo: "Q20230915005", callType: "Bank Details", subType: "Updation", status: "Request Raised and Moved to POS", q:"Request",createdBy:"JayM",source:"Customer Service",tat: "9"},
]
export const PAYMENT_TRANSACTIONS = [
  {title: "Payment Date", field: "paymentDate"},
  {title: "Transaction Number", field: "transactionNumber"},
  {title: "Receipt Number", field: "receiptNumber"},
  {title: "Payment Mode", field: "paymentMode"},
  {title: "Payment Amount", field: "paymentAmount"},
  {title: "Status", field: "status"},
  {title: "Cancel Reason", field: "cancelReason"},
  {title: "Created By", field: "createdBy"},
]
export const PAYMENT_TRANSACTIONS_DATA = [
  {id:1, paymentDate: "10/09/2023", transactionNumber: "XXXXXX245", receiptNumber: "XXXXXX245", paymentMode: "cash", paymentAmount:"10,000", status: "",cancelReason: "NA",createdBy:"ChetanN"},
  {id:2, paymentDate: "11/09/2023", transactionNumber: "XXXXXX246", receiptNumber: "XXXXXX245",  paymentMode: "Cheque", paymentAmount:"2,50,000", status: "",cancelReason: "",createdBy:"SachinT"},
  {id:3, paymentDate: "12/09/2023", transactionNumber: "XXXXXX247", receiptNumber: "XXXXXX245",  paymentMode: "Demand Draft", paymentAmount:"20000", status: "",cancelReason: "",createdBy:"VirajK"},
  {id:4, paymentDate: "13/09/2023", transactionNumber: "XXXXXX248", receiptNumber: "XXXXXX245",  paymentMode: "Online", paymentAmount:"7500", status: "",cancelReason: "",createdBy:"KundanT"},
  {id:5, paymentDate: "14/09/2023", transactionNumber: "XXXXXX249", receiptNumber: "XXXXXX245",  paymentMode: "cash", paymentAmount:"9,000", status: "",cancelReason: "NA",createdBy:"JayM"},
  {id:1, paymentDate: "10/09/2023", transactionNumber: "XXXXXX245", receiptNumber: "XXXXXX245", paymentMode: "cash", paymentAmount:"10,000", status: "",cancelReason: "NA",createdBy:"ChetanN"},
  {id:2, paymentDate: "11/09/2023", transactionNumber: "XXXXXX246", receiptNumber: "XXXXXX245",  paymentMode: "Cheque", paymentAmount:"2,50,000", status: "",cancelReason: "",createdBy:"SachinT"},
  {id:3, paymentDate: "12/09/2023", transactionNumber: "XXXXXX247", receiptNumber: "XXXXXX245",  paymentMode: "Demand Draft", paymentAmount:"20000", status: "",cancelReason: "",createdBy:"VirajK"},
  {id:4, paymentDate: "13/09/2023", transactionNumber: "XXXXXX248", receiptNumber: "XXXXXX245",  paymentMode: "Online", paymentAmount:"7500", status: "",cancelReason: "",createdBy:"KundanT"},
  {id:5, paymentDate: "14/09/2023", transactionNumber: "XXXXXX249", receiptNumber: "XXXXXX245",  paymentMode: "cash", paymentAmount:"9,000", status: "",cancelReason: "NA",createdBy:"JayM"},
  {id:1, paymentDate: "10/09/2023", transactionNumber: "XXXXXX245", receiptNumber: "XXXXXX245", paymentMode: "cash", paymentAmount:"10,000", status: "",cancelReason: "NA",createdBy:"ChetanN"},
  {id:2, paymentDate: "11/09/2023", transactionNumber: "XXXXXX246", receiptNumber: "XXXXXX245",  paymentMode: "Cheque", paymentAmount:"2,50,000", status: "",cancelReason: "",createdBy:"SachinT"},
  {id:3, paymentDate: "12/09/2023", transactionNumber: "XXXXXX247", receiptNumber: "XXXXXX245",  paymentMode: "Demand Draft", paymentAmount:"20000", status: "",cancelReason: "",createdBy:"VirajK"},
  {id:4, paymentDate: "13/09/2023", transactionNumber: "XXXXXX248", receiptNumber: "XXXXXX245",  paymentMode: "Online", paymentAmount:"7500", status: "",cancelReason: "",createdBy:"KundanT"},
  {id:5, paymentDate: "14/09/2023", transactionNumber: "XXXXXX249", receiptNumber: "XXXXXX245",  paymentMode: "cash", paymentAmount:"9,000", status: "",cancelReason: "NA",createdBy:"JayM"},
]
export const SEND_DOCUMENTS = [
  { id:1,selected:false,documentname: "Premium paid cenrtificate", date: "", sendthrough: "",download:"",action:"" },
  { id:2,selected:false,documentname: "Renewal Premium Recepit", date: "", sendthrough: "",download:"",action:"" },
  { id:3,selected:false,documentname: "First Premium Recepit", date: "", sendthrough: "",download:"",action:"" },
  { id:4,selected:false,documentname: "Policy Bond", date: "", sendthrough: "",download:"",action:"" },
  { id:5,selected:false,documentname: "Bonus Letter", date: "", sendthrough: "",download:"",action:"" },
  { id:6,selected:false,documentname: "Unit Statement(if applicable)", date: "", sendthrough: "",download:"",action:"" },
  { id:7,selected:false,documentname: "Loan Statement(if applicable)", date: "", sendthrough: "",download:"",action:"" },
  { id:8,selected:false,documentname: "Assignment letters(if applicable)", date: "", sendthrough: "",download:"",action:"" },
  { id:9,selected:false,documentname: "Document Name", date: "", sendthrough: "",download:"",action:"" },
  { id:10,selected:false,documentname: "All Communications from DMS", date: "", sendthrough: "",download:"",action:"" },
  { id:11,selected:false,documentname: "Renewal quotation", date: "", sendthrough: "",download:"",action:"" },
];

export const ADDRESS_CHANGE = [
  {value: "validatesignature", label: "Validate Signature", type: "radio"},
  {value: "requestform", label: "Request Form", type: "radio"},
  {value: "refernb", label: "Refer NB Stage Document", type: "radio"},
  {value: "idproof", label: "ID Proof", type: "radio"},
  {value: "namechangeproof", label: "Name Change Proof", type: "radio"},
]

export const ADVANCE_SEARCH_RESULTS = [
  {title:"Policy No", field: "policyNo"},
  {title: "Application No", field:"applicationNo"},
  {title:"PO Name", field:"poName"},
  {title:"LA Name", field:"laName"},
  {title:"Policy Status", field: "policyStatus"},
  {title: "Sum Assures", field: "sumAssure"},
  {title: "Premium Amt.", field: "premiumAmt"},
  {title:"Agent Name", field:"agentName"},
  {title:"PIN Code", field:"pinCode"},
  {title:"PAN No.", field:"panNo"},
  {title:"Mobile No", field:"mobileNo"},
  {title:"Role", field:"role"},
  {title:"Case Type", field:"caseType"}
]

export const CHECKLIST_REASONS = [
  { value: "reasonforchange", label: "Reason For Change / Update", type: "text", placeholder: "Reason for change/update" },
  { value: "customersigning", label: "Customer Signing Date & Time", type: "date",placeholder: "",isKYC: true },
  { value: "requestdate", label: "Request Date & Time", type: "date",placeholder: "" },
  { value: "requestsource", label: "Request Source", type: "text",placeholder: "Request Source" },
  { value: "resonfordelay", label: "Reason For Delayed Submission", type: "text",placeholder: "Reason for Delayed Submission" },
  {value:"queryrequest", label: "Query Request Date & time", type: "date", placeholder: "Select Query Request Date & Time", isSubType:"panupdate"},
  {value:"queryrequestsorce", label: "Query Request Source", type: "date", placeholder: "Query Request Source", isSubType:"panupdate"},
  {value:"queryrequest", label: "Query Request Date & time", type: "date", placeholder: "Select Query Request Date & Time", isSubType:"panupdate"}
]
export const OWNERSHIP_REASONS = [
  { value: "customersigning", label: "Customer Signing Date & Time", inputType: "date",placeholder: "",isKYC: true,callType:['contactdetailsupdate','contractalteration',] },
  { value: "requestdate", label: "Request Date & Time", inputType: "date",placeholder: "",callType:['contactdetailsupdate','contractalteration',] },
  { value: "requestsource", label: "Request Source", inputType: "dropdown",placeholder: "Request Source",callType:['contactdetailsupdate','contractalteration',] },
  { value: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission",callType:['contactdetailsupdate','contractalteration',] },
]

export const CHECKLIST_ADDRESSPROOF = [
  { value: "validatesignature", label: "Validate Signature", type: "checkbox" },
  { value: "requestform", label: "Request Form", type: "upload", placeholder: "Upload Request Form" },
  { value: "addressproof", label: "Address Proof", type: "upload",isKYC: true,placeholder: "Upload Address Form" },
]

export const CHANGE_REASONS = [
  { value: "reasonforchange", label: "Reason For Change / Update", inputType: "dropdown", placeholder: "Reason for change/update",callType:['contactdetailsupdate','contractalteration',] },
  { value: "requestsource", label: "Request Source", inputType: "dropdown",placeholder: "Request Source",callType:['contactdetailsupdate','contractalteration','partialwithdrawalrequest','annuity'] },
  { value: "reasonforchange", label: "Reason For Surrender", inputType: "dropdown", placeholder: "Reason For Surrender",callType:['surrender'] },
  { value: "requestsource", label: "Request Source", inputType: "dropdown",placeholder: "Request Source",callType:['surrender'] },
  { value: "requestdate", label: "Request Date & Time", inputType: "date",placeholder: "" },
  { value: "customersigning", label: "Customer Signing Date & Time", inputType: "date",placeholder: "",isKYC: true },
  { value: "requestsource", label: "Request Source", inputType: "dropdown",placeholder: "Request Source",callType:['loanpolicy','paymentrelated','nomination','revivalwithdgh','bankdetails'] },
  { value: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
]
export const SURRENDER_REASONS = [
  { value: "reasonforchange", label: "Reason For Surrender", inputType: "dropdown", placeholder: "Reason for change/update" },
  { value: "requestsource", label: "Request Source", inputType: "dropdown",placeholder: "Request Source" },
  { value: "requestdate", label: "Request Date & Time", inputType: "date",placeholder: "" },
  { value: "customersigning", label: "Customer Signing Date & Time", inputType: "date",placeholder: "",isKYC: true },
  { value: "resonfordelay", label: "Reason For Delayed Submission", inputType: "text",placeholder: "Reason for Delayed Submission" },
]

export const CHECKLIST = [
  {name:"validatesignature",label:"Validate Signature",inputType:"radio",isRequired:true,validationMsg:""},
  {name:"refernbstage",label:"Refer NB Stage Document",inputType:"radio",isRequired:true,validationMsg:"",callType:"contractalterarion",subType:['changeinname','changeindob']},
  {name:"panaadharlink",label:"PAN Aadhar Linked",inputType:"radio",isRequired:true,validationMsg:"",placeholder:"PAN Aadhar Linked",callType:"partialwithdrawalrequest",subType:"partialwithdrawalrequest"},
  {name:"panaadharlink",label:"Policy Bond/Indemnity submitted",inputType:"radio",isRequired:true,validationMsg:"",placeholder:"PAN Aadhar Linked",callType:"partialwithdrawalrequest",subType:"partialwithdrawalrequest"},
  { name: "panaadharlink",label: "Penal Interest Applicable",inputType: "radio",required: false,validationmsg: "",placeholder:"Penal Interest Applicable",callType:"partialwithdrawalrequest",subType:"partialwithdrawalrequest" },
  { name: "prior3pm",label: "Requested Received",inputType: "radio",required: false,validationmsg: "",placeholder:"Penal Interest Applicable",callType:"partialwithdrawalrequest",subType:"partialwithdrawalrequest" },
  {name:"requestForm",label:"Request Form",inputType:"upload",isRequired:true,validationMsg:"",placeholder: "Upload Request Form"},
  {name:"addressProof",label:"Address Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder: "Upload Address Form",callType:"contactdetailsupdate",subType:['addresschange']},
  { value: "uploadpan",label: "Upload PAN",inputType: "upload",isRequired: false,validationmsg: "",placeholder:"Upload PAN",callType:"contractalteration",subType:"panupdate" },
  {name:"aadharcopy",label:"Upload Aadhar Card Copy",inputType:"upload",isRequired:true,validationMsg:"",placeholder: "Upload Aadhar Card Copy",callType:"contactdetailsupdate",subType:"aadharupdate"},
  {name:"idproof",label:"ID Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"ID Proof",callType:"contractalterarion",subType:['changeinname','changeindob','gstinupdate','changeindobnominee','changeinappointee','changeinnominee']},
  {name:"namechangeproof",label:"Name Change Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Name Change Proof",callType:"contractalterarion",subType:"changeinname"},
  {name:"validatesignatureproof",label:"Valid Signature Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Valid Signature Proof",callType:"contractalterarion",subType:"changeinsignature"},
  {name:"specimensignature",label:"Old Specimen Signature",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Specimen Signature",callType:"contractalterarion",subType:"changeinsignature"},
  {name:"specimensignature",label:"Specimen Signature",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Specimen Signature",callType:"contractalterarion",subType:"changeinsignature"},
  {name:"dobproof",label:"Upload DOB Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Upload DOB Proof",callType:"contractalterarion",subType:["changeindob","changeindobnominee"]},
  {name:"dobproof",label:"Death Certificate",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Death Certificate",callType:"contractalterarion",subType:"changeinownership"},
  {name:"dobproof",label:"ID Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"ID Proof",callType:"contractalterarion",subType:"changeinownership"},
  {name:"dobproof",label:"PAN Copy",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"PAN Copy",callType:"contractalterarion",subType:"changeinownership"},
  {name:"dobproof",label:"Bank Account Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Bank Account Proof",callType:"contractalterarion",subType:"changeinownership"},
  {name:"dobproof",label:"Address Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Address Proof",callType:"contractalterarion",subType:"changeinownership"},
  {name:"gstincertificate",label:"GSTIN Certificate",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"GSTIN Certificate",callType:"contractalterarion",subType:"gstinupdate"},
  {name:"oldcdf",label:"Old CDF",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"CDF",callType:"contractalterarion",subType:"agentcodecorrection"},
  {name:"newcdf",label:"New CDF",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"New CDF",callType:"contractalterarion",subType:"agentcodecorrection"},
  {name:"approvalmail",label:"Approval Mail",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Approval Mail",callType:"contractalterarion",subType:"agentcodecorrection"},
  {name:"sourcecode",label:"Sourcing Code Under old CDF & New CDF Match",inputType:"radio",isRequired:true,validationMsg:"",placeholder:"Approval Mail",callType:"contractalterarion",subType:"agentcodecorrection"},
  {name:"sourcecode",label:"Match New Code & Old Code Relationship",inputType:"radio",isRequired:true,validationMsg:"",placeholder:"Approval Mail",callType:"contractalterarion",subType:"agentcodecorrection"},
  {name:"supportingdoc",label:"Supporting Document",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Approval Mail",callType:"contractalterarion",subType:["changeinterm","changeinplan","rideraddition",'changeinsumassured']},
  {name:"withdrawalform",label:"Partial Withdrawal Form",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Partial Withdrawal Form",callType:"partialwithdrawalrequest",subType:"partialwithdrawalrequest"},
  {name:"owneridproof",label:"Policy Owner ID Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Policy Owner ID Proof",callType:"partialwithdrawalrequest",subType:"partialwithdrawalrequest"},
  {name:"ownerbankproof",label:"Policy Owner Bank Proof",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Policy Owner Bank Proof",callType:"partialwithdrawalrequest",subType:"partialwithdrawalrequest"},
  {name:"ownerbankproof",label:"Policy bond/indemnity submitted",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Policy bond/indemnity submitted",callType:"partialwithdrawalrequest",subType:"partialwithdrawalrequest"},


  {name:"coeForm",label:"COE Form",inputType:"upload",isRequired:true,validationMsg:"",placeholder: "COE Form",callType:"annuity",subType:"lifecertificatesubmitted"},
  {name:"callrecord",label:"Access The Customer Call Recording",inputType:"link",textvalue:"link",isRequired:true,validationMsg:"",placeholder: "COE Form",callType:"annuity",subType:"lifecertificatesubmitted"},
  {name:"ownerbankproof",label:"ECS/NACH Request Form",inputType:"upload",isRequired:true,validationMsg:"",placeholder:"Policy Owner Bank Account Proof",callType:"surrender",subType:"changeinmode"},
  {name:"coeForm",label:"Mode Change Approval",inputType:"upload",isRequired:true,validationMsg:"",placeholder: "COE Form",callType:"annuity",subType:"changeinmode"},
] 
export const PAN_CHECKLIST = [
  {name:"panupdateprocess",label:"PAN Update Process",inputType:"radios",isRequired:true,validationMsg:""},
  {name:"panupdateform",label:"PAN Update Form",inputType:"radios",isRequired:true,validationMsg:""},
]
export const AADHAR_CHECKLIST = [
  {name:"aadharupdateprocess",label:"Aadhar Update Process",inputType:"radios",isRequired:true,validationMsg:""},
]
export const FREELOOK_REGISTER_CHECKLIST = [
  {name:"validatesignature",label:"Upload POD",inputType:"upload",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"Upload Retention Letter",inputType:"upload",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"Customer Signing Date & Time",inputType:"date",isRequired:true,validationMsg:""},
]
export const FREELOOK_CHECKLIST = [
  {name:"validatesignature",label:"Validate Signature",inputType:"radio",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"Upload Customer Photo",inputType:"upload",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"Upload Customer Video",inputType:"upload",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"FLC Form",inputType:"upload",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"Policy Bond / Idemnity",inputType:"upload",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"Policy Owner ID Proof",inputType:"upload",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"Policy Owner Address proof",inputType:"upload",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"Policy Owner Bank Account Proof",inputType:"upload",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"Retention Attempt",inputType:"radio",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"PAN Aadhar Linked",inputType:"upload",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"Upload Out Freelook Email",inputType:"upload",isRequired:true,validationMsg:""},
]
export const BANKDETAILS_CHECKLIST = [
  {name:"validatesignature",label:"Validate Signature",inputType:"radio",isRequired:true,validationMsg:""},
  {name:"validatesignature",label:"Make Use of The Same Bank Account Details For Auto Copy",inputType:"radio",isRequired:true,validationMsg:""},
  {name:"requestform",label:"Request Form",inputType:"upload",isRequired:true,validationMsg:""},
  {name:"aadharupdateprocess",label:"Bank Account Proof",inputType:"upload",isRequired:true,validationMsg:""},

]

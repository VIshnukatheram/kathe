import React, { useState } from 'react'; 
import { Data } from "../../mainconfig";
import { Button, Form,Modal,Tooltip } from "antd";
import DetailsForm from '../../utils/DetailsForm';
import UploadIcon from '../../assets/images/upload.png';
import CloseIcon from '../../assets/images/close-icon.png';
import ContactForm from '../../utils/ContactForm';

const Revival = (props) => { 
    const [form] = Form.useForm();
    const {selectedSubType} = props;
    const [selectionRevival,setSelectionRevival] = useState("");
    const [totalFundsModal,setTotalFundModal] = useState(false);
    const [isShowPOSScreen,setIsShowPOSScreen] = useState(false);
    const [paymentViaSelection,setPaymentViaSelection] = useState("");
    const [showEmailFields,setShowEmailFields] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showEmailAddress, setShowEmailAddress] = useState(false);
    const [showWhatsApp, setShowWhatsApp] = useState(false);
    const suffix = <img src={UploadIcon} alt=""/>;

    const handleDropdownChange = (e,item) =>{
        setPaymentViaSelection("");
        if(item?.name?.toLowerCase()==="outofrevival"){
        setSelectionRevival(e)
        }
        else if(item?.name?.toLowerCase().includes("paymentvia")){
            setPaymentViaSelection(e);
        }
    }
    const handleLabelLink = (item) =>{
        setTotalFundModal(false);
        if(item?.name?.toLowerCase().includes("totalpremiumdue")){
          setTotalFundModal(true);
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

    const handleSubmit =()=>{

    }
    const handleRaiseRequest =()=>{
        setIsShowPOSScreen(!isShowPOSScreen);
    }

    return ( 
        <>
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
        {!isShowPOSScreen&&<>
          <DetailsForm
          data={
              Data[selectedSubType]?.Out_Of_Revival
          }
          subType={selectedSubType}
          handleDropdownChange={handleDropdownChange}
        ></DetailsForm>
         {selectionRevival==="yes"&&<>
        <div className='text-center'>
            <p>Policy is out of Revival period, hence policy cannot be revived !</p>
        </div>
        </>}
        {selectionRevival==="no"&&<>
        <DetailsForm
          data={
              Data[selectedSubType]?.Out_Of_Revival_Yes_Fields
          }
          subType={selectedSubType}
          handleLabelLink={handleLabelLink}
          toggleInputField={toggleInputField}
          showEmailAddress={showEmailAddress}
          showPhoneNumber={showPhoneNumber}
          showWhatsApp={showWhatsApp}
        ></DetailsForm>
           {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}

          <div className="contact-details-btn">
              <Button type="primary" htmlType="submit" className="primary-btn">
                Submit
              </Button>{" "}
              <Button type="primary" className="primary-btn" onClick={()=>handleRaiseRequest()}>
                Raise Request
              </Button>{" "}
            </div>
        </>}
        </>}
        {isShowPOSScreen&&<>
            <DetailsForm
          data={ Data[selectedSubType]?.POS_Details}
          subType={selectedSubType}
          handleDropdownChange={handleDropdownChange}
        ></DetailsForm>
        {paymentViaSelection?.includes("cash")&&<>
        <DetailsForm
          data={ Data[selectedSubType]?.Cash_Details}
          subType={selectedSubType}
          suffix={suffix}
          form={form}
        ></DetailsForm>
        </>}
        {paymentViaSelection?.includes("cheque")&&<>
        <DetailsForm
          data={ Data[selectedSubType]?.Cheque_Details}
          subType={selectedSubType}
          suffix={suffix}
          form={form}
        ></DetailsForm>
        </>}
        {paymentViaSelection?.includes("online")&&<>
        <DetailsForm
          data={ Data[selectedSubType]?.Online_Details}
          subType={selectedSubType}
          toggleInputField={toggleInputField}
              showEmailAddress={showEmailAddress}
              showPhoneNumber={showPhoneNumber}
              showWhatsApp={showWhatsApp}
          suffix={suffix}
          form={form}
        ></DetailsForm>
           {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}

        </>}
        <div className="contact-details-btn">
              <Button type="primary" htmlType="submit" className="primary-btn">
                Submit
              </Button>{" "}
            </div>
        </>}
        </Form>

        <Modal
        title="Total Premium Due"
        open={totalFundsModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setTotalFundModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container">
          <table className="responsive-table">
            <tr>
              <td width={50}>Annualised Premium</td>
              <td width={70}></td>
            </tr>
            <tr>
              <td>Total Modal Premium + Tax</td>
              <td></td>
            </tr>
            <tr>
              <td>Interest Amount</td>
              <td></td>
            </tr>
            <tr>
              <td>Amount in Suspense (Debit/Credit)</td>
              <td></td>
            </tr>
            <tr>
              <td>Total Premium due</td>
              <td></td>
            </tr>
          </table>
        </div>
      </Modal>
        </>
    ); 
} 
export default Revival;
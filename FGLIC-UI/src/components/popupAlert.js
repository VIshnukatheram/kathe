import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useNavigate  } from 'react-router-dom';

const PopupAlert = (props) => {
    const navigate = useNavigate();
  const [modalOpen, setmodalOpen] = useState(true);

  const handleOk =() =>{
    setmodalOpen(false);
    props?.setShowAlert(false);
     if(props?.getAdvance){
        props?.getAdvance();
      }
  }
  return (
    <>
      <Modal
        title={props?.title}
        centered
        open={modalOpen}
        closeIcon={false}
        footer={null}
      >
        <p>{props?.alertData}</p>
        <div className='text-center modal-validate'>
        <Button type="primary" className="primary-btn" onClick={()=>handleOk()}>
              OK
            </Button>
        </div>
      </Modal>
    </>
  );
};
export default PopupAlert;
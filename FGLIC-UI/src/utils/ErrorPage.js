import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
const navigate = useNavigate();

  return (
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<div className="contact-details-btn"><Button type="primary" className='primary-btn ErrorPage-BackBtn' onClick={()=>{navigate("/login")}}>Back Home</Button></div>}
  />
  )
}

export default ErrorPage
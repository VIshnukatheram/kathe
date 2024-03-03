import React, { useEffect,useState } from 'react';
import {
  Button,
  Form,
  Spin,
  message,
  Row,
  Col,
  Modal,
  Checkbox,
  Input,
  DatePicker,
  Select,
  Upload,
  Tooltip
} from "antd";
import apiCalls from "../api/apiCalls";


const TicketsOpenPopup = (props) => {
  const [isLoading,setIsLoading] = useState(false);
  const [data,setData]=useState([]);


  useEffect(()=>{
     getPOSIndividualData();
  },[])


  const getPOSIndividualData=async()=>{
    setIsLoading(true);
    const  val = await apiCalls.getPOSIndividualData(props?.serviceId);
    if(val?.data){
      setIsLoading(false);
      setData(val?.data)
      
    }else{
      message.destroy();
      message.error({
        content: val?.data?.responseHeader?.message||"Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  }
  return (
    <div>
      <Modal
        title="Tickets Details"
        open={props?.isOpenTicket}
        destroyOnClose={true}
        width={1200}
        closeIcon={false}
        footer={null}
      >
        {/* <Spin  spinning={isLoading} fullscreen> */}
        <div>
          <Form >
            <div className="reuirement">
              <Row>
                <Col xxl={6} xl={6} md={6}>
                  <section className="grid">
                    <div className="left-half">
                      <article>
                        <p>Ticket No</p>
                        <p>Created By</p>
                        <p>Closed By</p>
                      </article>
                    </div>
                    <div className="right-half">
                      <article>
                        <p>
                          <b>Hello </b>
                        </p>
                        <p>
                          <b>{"-"} </b>
                        </p>
                        <p>
                          <b>
                            {"-"}
                          </b>
                        </p>
                      </article>
                    </div>
                  </section>
                </Col>
                <Col xxl={6} xl={6} md={6}>
                  <section className="grid">
                    <div className="left-half">
                      <article>
                        <p>Call Type</p>
                        <p>Created on</p>
                        <p>Closed on</p>
                      </article>
                    </div>
                    <div className="right-half">
                      <article>
                        <p>
                          <b>Hello </b>
                        </p>
                        <p>
                          <b>{data?.createdOn || "-"} </b>
                        </p>
                        <p>
                          <b>
                          {data?.createdOn || "-"}
                          </b>
                        </p>
                      </article>
                    </div>
                  </section>
                </Col>
                <Col xxl={6} xl={6} md={6}>
                  <section className="grid">
                    <div className="left-half">
                      <article>
                        <p>Sub Type</p>
                        <p>Status</p>
                      </article>
                    </div>
                    <div className="right-half">
                      <article>
                        <p>
                          <b>{data?.currentStatus || "-"} </b>
                        </p>
                        <p>
                          <b> {data?.createdOn || "-"} </b>
                        </p>
                      </article>
                    </div>
                  </section>
                </Col>
                <Col xxl={6} xl={6} md={6}>
                  <section className="grid">
                    <div className="left-half">
                      <article>
                        <p>Category</p>
                        <p>Pending with</p>
                      </article>
                    </div>
                    <div className="right-half">
                      <article>
                        <p>
                          <b>Hello </b>
                        </p>
                        <p>
                          <b>{"-"} </b>
                        </p>
                      </article>
                    </div>
                  </section>
                </Col>
                <Col xxl={24} xl={24}>
                  <div className='ml-5' style={{ textAlign: 'left',paddingLeft:"56px" }}>
                    <span style={{ display: 'block' }}>View Requirements</span>
                    <span style={{ display: 'block' }}>View History</span>
                    <span style={{ display: 'block' }}>View Communication</span>
                  </div>
                </Col>
              </Row>
              <Row>
               
              </Row>
            </div>

            <div className="contact-details-btn">
              <Button
                type="primary"
                className="primary-btn"
                htmlType="submit"
              //onClick={()=>handleRequirementSubmit()}
              >
                Submit
              </Button>

              <Button
                type="primary"
                className="primary-btn"
                onClick={props?.handleClose}
              >
                Close
              </Button>
            </div>
          </Form>
        </div>


        {/* </Spin> */}
      </Modal>
    </div>
  )
}

export default TicketsOpenPopup
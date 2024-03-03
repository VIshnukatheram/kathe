import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button,Spin } from 'antd';
  
function Table() {
  const [isLoading,setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showContent,setShowContent] = useState(false);
  const [bodyContent,setBodyContent] = useState(false);
  const [ticketId,setTicketId] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://emailapis.azurewebsites.net/api/GetAllMailsData?code=BmMy6zbmcywQq3y6VwvWBFiOWROdcudnnhu6GNpxErK6AzFuDOL8KQ==')
    .then((response) => {
        setData(response.data)
        setIsLoading(false);
    })
    .catch((error) => {
        setIsLoading(false);
     
    });
  }, []);

  const handleAction = (item) => {
    setShowContent(true);
    setBodyContent(item.MailBody);
    setTicketId(item.TicketId);
  }

  return (
    <>
    <div className="">
        <Spin spinning={isLoading}>
        {!showContent && <>
    <div className="table-responsive w-100">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>From Mail</th>
            <th>Date</th>
            <th>Status</th>
            <th>Assigned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
            <td>{item.TicketId}</td>
              <td>{item.FromMail}</td>
              <td>{item.Date}</td>
              <td>{item.status}</td>
              <td>{item.assigned}</td>
              <td><Button onClick={()=>handleAction(item)}>Action</Button></td>
            </tr>
          ))}
               <tr>
                  <td colspan="6">
                {data?.length === 0  &&
                <div className="text-center"><span>No data available</span></div> }
        </td>
        </tr>
        </tbody>
      </table>
    </div>
    
    </>}
    </Spin>
    {showContent&&<>
        <h5>{ticketId}</h5>
       <div className='text-right' onClick={()=>setShowContent(false)}>Back</div>
        <div
      dangerouslySetInnerHTML={{__html: bodyContent}}
    />
    </>}
    </div></>
  );
}

export default Table;

import React, { useEffect, useState } from "react";
import {Row,Col,DatePicker,Form,Checkbox, Input, Radio} from 'antd';
import TableFormat from '../../utils/TableFormat';
import SendIcon from "../../assets/images/send.png";
import DownloadIcon from '../../assets/images/download.png';

const RenewalPremiumReceipt = (props) => {
  const obj = props?.tableData;
  const [data,setData] = useState(obj);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selection, setSelection] = useState([]);
  const [selectedObjs, setSelectedObjs] = useState([]);
  const dateFormat = "DD/MM/YYYY";
  const options = [
    { label: "SMS", value: "SMS" },
    { label: "Email", value: "Email" },
    { label: "Whatsapp", value: "Whatsapp" },
  ];
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  const toggleSelectAll = () => {
    const updatedData = obj?.map((item) => ({
      ...item,
      selected: !selectAll,
     
    }));
    setData(updatedData);
    setSelectAll(!selectAll);
    setSelection(updatedData)
  };
  const handleInputChange = (key, e) => {
    let _selection = [...selection];
    const idx = _selection.indexOf(key.id);
    // if (selection) {
    //   _selection = [];
    // }
    if (idx > -1) {
      _selection.splice(idx, 1);
      selectedObjs.splice(idx, 1);
    } else {
      _selection.push(key.id);
      selectedObjs.push(key);
    }
    setSelection(_selection);
    setSelectedObjs(selectedObjs.filter((id) => id !== key.id));
};
  return (
    <>
      {/* <Row>
       
                <Col xs={24} sm={24} md={20} lg={20} xxl={20} offset={1}>
                  <h4 className="subtype-headings fs-16 fw-500">
                    Renewal Premium Receipt
                  </h4>
                </Col>
             
        <Col xs={24} sm={24} md={10} lg={10} xxl={10} offset={1}>
          <Form.Item
            label={"From"}
            name={"From"}
            className="inputs-label fs-16 fw-400"
          >
            <DatePicker
              style={{ width: "100%" }}
              className="cust-input"
             // format={dateFormat}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={10} lg={10} xxl={10} offset={1}>
        <Form.Item
            label={"To"}
            name={"To"}
            className="inputs-label fs-16 fw-400"
          >
            <DatePicker
              style={{ width: "100%" }}
              className="cust-input"
             // format={dateFormat}
            />
          </Form.Item>
        </Col>
      </Row> */}
      <Row>
         <Col xs={24} sm={24} md={22} lg={22} xxl={22} offset={1}>
      <div className="table-responsive w-100">
            {/* <TableFormat
              headerData={RENEWAL_LAST5_OPEN_TICKETS}
              data={RENEWAL_TABLE_DATA}
            ></TableFormat> */}
             <table className="table table-bordered">
             
              <thead > 
              <tr>
              <th colspan="6" className="table-head">Last 05 Premium Renewal Receipt</th>
              </tr>
          <tr className="renewal-table-header">
            {/* <th>
            <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th> */}
               
            <th>Sr No</th>
            <th>ID No</th>
            <th>Payment Receipt Date</th>
            <th>Amount</th>
            <th>Payment Mode</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {obj?.map((val, key) => {
            return (
              <tr key={val.id} className="table-column">
                {/* <td>
                  <input
                    name="check"
                    type="checkbox"
                    checked={selection.indexOf(val.id) > -1}
                    onChange={(e) => handleInputChange(val, e)}
                  />
                  <span></span>
                </td> */}
                <td>{val.srno}</td>
                <td>
                  {val.idno}
                </td>
                <td>
                  {val.paymentreceiptdate}
                </td>
                <td>
                  {val.amount}
                </td>
                <td>
                  {val.paymentmode}
                </td>
                <td className="senddoc-checkboxes">
                  <Checkbox.Group
                    options={options}
                    defaultValue={["SMS"]}
                    onChange={onChange}
                  />
                   <span>
                      <img src={SendIcon} className="send-icon" />
                       <img src={DownloadIcon} className="send-icon c-ppointer" />
                    </span>
                </td>
                {/* <td className="c-pointer">
                  <DownloadOutlined /> <PrinterFilled />
                </td>
                <td className="c-pointer">
                  <LikeOutlined />
                </td> */}
              </tr>
            );
          })}
            </tbody>
        </table>
          </div>
          </Col>
       
       <Col xs={24} sm={24} md={10} lg={10} xxl={10} offset={1} className="mt-30">
                    <Form.Item
                      className="inputs-label radio-grp fs-16 fw-400"
                    >
                     <Radio>Select All</Radio>
                     
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={10} lg={10} xxl={10} offset={3} className="mt-30">
                  <Form.Item
                    className="inputs-label radio-grp fs-14 fw-400"
                  >
                    <Checkbox.Group
                      options={options}
                      defaultValue={["SMS"]}
                    ></Checkbox.Group>
                    <span>
                      <img src={SendIcon} className="send-icon" />
                    
                       <img src={DownloadIcon} className="send-icon c-ppointer" />
                    </span>
                  </Form.Item>
                </Col>
       </Row>
        
    </>
  );
}

export default RenewalPremiumReceipt;
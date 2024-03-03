import { Spin } from "antd";
import moment from "moment";
import React from "react";

const TableFormat = (props) => {
  //debugger
  const renderTableHeader = () => {
    return props?.headerData?.map((key, index) => {
      return <th key={index}>{key.title.toUpperCase()}</th>;
    });
  };

  const isDateField = (value) => {
    const momentDate = moment(value, moment.ISO_8601, true);
    return momentDate.isValid();
  };

  return (
    <>
    <Spin spinning={props?.ticketsLoader}>
      <div className="table-scroll">
      <div className="table-container">
            <table className="responsive-table">
            <thead>
              <tr className="renewal-table-header">{renderTableHeader()}</tr>
            </thead>
            <tbody >
            {props?.data?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {props?.headerData?.map((header, colIndex) => (
                    <td key={colIndex}>
                      {isDateField(row[header.field])
                        ?  moment.utc(row[header.field]).local().format("DD/MM/YYYY hh:mm A")
                        : header.field === "serviceNo" ?
                        <div className="gridLink" onClick={()=>{props?.handleTickectNoLink(row)}}>
                        {row[header.field]}
                      </div> : row[header.field]}
                    </td>
                  ))}
                </tr>
              ))}
             
                {props?.data?.length === 0 && (
                   <td colSpan={props?.headerData?.length}>
                  <div className="text-center">
                    <span>No data available</span>
                  </div>
                  </td>
                )}
             
            </tbody>
          </table>
        </div>
      </div>
      </Spin>
    </>
  );
};

export default TableFormat;

import React,{useState,useEffect,useRef} from 'react';
import { Spin,message,Table,Space } from "antd";
import { useSelector } from 'react-redux';
import moment from "moment";
import { useNavigate,useLocation  } from 'react-router-dom';
import { connect } from "react-redux";
import apiCalls from "../../api/apiCalls";

const ComplaintsUserDashboard = () => {
    const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // Access the state passed during navigation
    const { state } = location;
    const [showTotalPages,setShowTotalpages] = useState(null);
    const shouldLog = useRef(true);

    const columns = [
        {
          title: "ACTION",
          dataIndex: "action",
          render: (_, record) => (
            <Space size="middle">
    
    <a className="editIcon"> <i  onClick={() => handleAction(record)} className="bi bi-pencil-square"></i></a>
    
             {/* <Button
                            type="primary"
                            className="primary-btn panvalidate-btn"
                            onClick={() => handleAction(record.serviceNo)}
                          >
                            View
                          </Button> */}
            </Space>
          ),
        },
        {
          title: "Ticket No",
          dataIndex: "serviceNo",
          key: 'serviceNo',
        },
        {
          title: "Call Log Date",
          dataIndex: "date",
          showSorterTooltip: false,
          sorter: {
            compare: (a, b) => moment.utc(a.date).diff(moment.utc(b.date)),
          },
         render: (_, record) => (
          <Space size="middle">
          { moment.utc(record.date).local().format("DD/MM/YYYY hh:mm A")}
          </Space>
        ),
        },
    
        {
          title: "Policy/Application Number",
          dataIndex: "policyNo",
          showSorterTooltip: false,
          sorter: {
            compare: (a, b) => a.policyNo - b.policyNo,
          },
        },
        {
          title: "Request Type",
          dataIndex: "callTypeName"
        },
        {
          title: "Request SubType",
          dataIndex: "subTypeName"
        },
        {
          title: "Status",
          dataIndex: "status"
        },
        {
          title: "Customer Name",
          dataIndex: "proposerName"
        },
        {
          title: "Product",
          dataIndex: "plan"
        },
        // {
        //   title: "Customer Type",
        //   dataIndex: "CustomerType"
        // },
        // {
        //   title: "Ageing",
        //   dataIndex: "ageing"
        // },
        {
          title: "Logged By",
          dataIndex: "loggedBy",
        },
       
      ];
    
      const [data, setData] = useState([]);
      const handleAction = (item) => {
        let serviceId=item?.srvReqRefNo;
        navigate(`/complaintsuser/${serviceId}`);
      };

      useEffect(() => {
        if(shouldLog.current){
          shouldLog.current = false;
          getSearchData();
        }
       }, []);

       

      const getSearchData =  async () => {
        setIsLoading(true);
        let obj = {userId:'',role:'' };
        obj.role='13';
        let response = apiCalls.GetSerReqByFilters(obj);
        response.then((val)=>{
          if(val?.data){
            setData(val?.data);
            setShowTotalpages(val?.data?.length);
          }else{
            message.destroy();
            message.error({
              content: val?.data?.responseHeader?.message||"Something went wrong please try again!",
              className: "custom-msg",
              duration: 2,
            });
            navigate(`/complaintsteam`);
          }
          setIsLoading(false);
        }).catch((err)=>{
          setIsLoading(false);
        })
      }

  return (
    <Spin spinning={isLoading}>
      <div className="main-start">
        <div className="w-94">
          <div className="table-container dashboard">
          <Table
        columns={columns}
        dataSource={data}
        //bordered={true}
        x={true}
        pagination={{
          //pageSizeOptions: ["5", "10", "15", "15"],
          pageSize: 10,
          //showSizeChanger: true,
          defaultPageSize: 5,
         // size:"small",
           total: {showTotalPages},
          //showTotal: `Total ${showTotalPages} items`
        }}
      />
          </div>
        </div>
      </div>
      </Spin>
    
  )
}

const mapStateToProps = ({state,userProfileInfo }) => {
    return { data: state?.PolicyDetailsReducer?.policyDetailsObj,
      userProfileInfo}
  }

export default connect(mapStateToProps)(ComplaintsUserDashboard);
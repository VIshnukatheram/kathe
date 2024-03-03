import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function FileUpload(props) {
  
    const handleUpload = (info) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
  
  
    const customUploadButton = (
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    );
  
    return (
      <div>
        <Upload
          name={props?.file}
          action={props?.url} 
          onChange={handleUpload}
          showUploadList={false}
        >
          {customUploadButton}
        </Upload>
      </div>
    );
  }
  
  export default FileUpload;
  
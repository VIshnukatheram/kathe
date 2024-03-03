import React, {useState} from 'react'
// import FileViewer from 'react-file-viewer';
import { Button, Modal, Tooltip } from 'antd';

const FilePreview = () => {
    const [previewModal, setPreviewModal] = useState(false);
    const file = "./Get_Started_With_Smallpdf.pdf";
    const type = "pdf";
    const onError = e => {
        console.log(e, "error in file-viewer");
      };
 
  return (
    <>
    <Button onClick={()=>setPreviewModal(true)}>Click pdf</Button>
    <Modal
        className="documentmodal-width"
        destroyOnClose={true}
        title="Preview"
        width={1000}
        open={previewModal}
        closeIcon={
          <Tooltip title="Close">
            <span
              className="icon md x c-pointer"
              onClick={() => setPreviewModal(false)}
            />
          </Tooltip>
        }
        footer={
          <>
            <Button
              type="primary"
              onClick={() => setPreviewModal(false)}
              className="primary-btn cancel-btn"
            >
              Close
            </Button>
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => window.open(file, "_blank")}
            >
              Download
            </Button>
          </>
        }
      >
        {/* <FileViewer fileType={type} filePath={file} onError={onError}/> */}
      </Modal>
    </>
    
  )
}

export default FilePreview;
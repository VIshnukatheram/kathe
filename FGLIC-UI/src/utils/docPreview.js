import { useEffect, useState } from "react";
import { Modal, Tooltip, Button,Alert, Spin } from "antd";

const DocumentPreview = (props) => {
//   const [previewPath, setPreviewPath] = useState(null);
//   const [previewfileName, setPreviewfileName] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const mimeType = {
//     pdf: "application/pdf",
//     png: "image/png",
//     jpeg: "image/jpeg",
//     jpg: "image/jpg",
//     xls: "application/xls",
//     xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     txt: "text/plain"
//   };
//   const [mimetypefiles, setMimeTypeFiles] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    //docPreview();
  }, []);

  // const docPreview = async () => {
  //   setIsLoading(true);
  //   let res = await getFileURL(props?.upLoadResponse?.id);
  //   let extensions =null
  //   if (res.ok) {
  //     setIsLoading(false);
  //     setPreviewfileName(props?.upLoadResponse?.fileName || props?.upLoadResponse?.name);
  //     if(props?.upLoadResponse?.fileName){
  //        extensions = props?.upLoadResponse?.fileName.split(".");
  //     }else{
  //        extensions = props?.upLoadResponse?.name.split(".");
  //     }
  //     let isFileName = extensions[extensions.length - 1];
  //     setMimeTypeFiles(mimeType[isFileName].toLowerCase());
  //     setPreviewPath(res.data);
  //   } else {
  //     setIsLoading(false);
  //     setErrorMsg(isErrorDispaly(res));
  //   }
  // };
  return (
    <>
      {errorMsg !== null && (
        <Alert
          type="error"
          description={errorMsg}
          onClose={() => setErrorMsg(null)}
          showIcon
        />
      )}
      <Modal
        className="documentmodal-width"
        title="Preview"
        width={1000}
        open={props?.previewModal}
        closeIcon={
          <Tooltip title="Close">
            <span
              className="icon md c-pointer close"
              onClick={props?.handleCancle}
            />
          </Tooltip>
        }
        footer={
          <>
            <div className="d-flex excel-btn mb-36">
              <Button
                type="primary"
                onClick={props?.handleCancle}
                className="primary-btn cancel-btn mr-8 "
              >
                Close
              </Button>
              {/* <a
                className="primary-btn pop-btn detail-popbtn"
                download={previewfileName}
                href={`data:${mimetypefiles};base64,` + previewPath}
                title="Download pdf document"
              >
                Download
              </a> */}
            </div>
          </>
        }
      >
        {/* <Spin spinning={isLoading}> */}
        {/* <FileViewer fileType={""} filePath={props?.docPreviewDetails?.fileName } /> */}
          {/* <FilePreviewer
            hideControls={true}
            file={{
              data: previewPath,
              name: previewfileName,
              mimeType: mimetypefiles
            }}
          /> */}
          {/* </Spin> */}
      </Modal>

      
    </>
  );
};
export default DocumentPreview;

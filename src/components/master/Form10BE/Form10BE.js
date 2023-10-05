import React, { useState, useEffect, useRef } from 'react';
import "../../../assets/css/upload.css";
import { PlantationService } from '../../../services/PlantationService/plantation.service';
import { SUCCESS } from "../../constants/constants";
import { Form10BService } from '../../../services/Form10BEService/form10b.service';
import { toast, ToastContainer } from "react-toastify";

export default function Form10BE() {
  const [file, setFile] = useState(null);
  const fileRef = useRef();

  //choose file for import
  const handleFileChange = (e) => {
    if (e.target.files[0].size <= 5120000) {
      let fileName = e.target.files[0].name;
      //if (fileName.endsWith('xls') || fileName.endsWith('xlsx')) {
        setFile(e.target.files[0]);
      //} 
    //   else {
    //     //toast.error("Please upload excel file");
    //   }
    // } else {
    //   //toast.error("Please select excel file less than 5 MB");
    // }
  };
}

  const uploadForm10B = async () => {
    if (file != null) {
      console.log(file);
      const formData = new FormData();
      // Update the formData object
      //formData.append("file", file);
      formData.append("zipFile", file);
      console.log(formData);
      const response = await Form10BService.formBUpload(formData);
      if (response?.status === SUCCESS) {
        console.log(response);
        toast.success(response?.message);
        fileRef.current.value = '';  
      } else {
        toast.error("Please select a ZIP file to upload...")
      }
    } else {
      toast.error("Please select a ZIP file to upload...")
    }
  };


  return (
    <>
       <ToastContainer />
      <div className="container upload10be">
        <div className="row">
          <div className="col-md-6">
            <h4>Upload Form 10 BE </h4>
          </div>
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="file"
                className="form-control custom-file-input"
                placeholder="Upload Zip File"
                aria-label="Upload Zip File"
                aria-describedby="basic-addon2"
                style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
                onChange={handleFileChange}
                ref={fileRef}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary no-left-border-radius custom-button "
                  type="button"
                  style={{
                    borderTopRightRadius: "6px",
                    borderBottomRightRadius: "6px",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={uploadForm10B}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

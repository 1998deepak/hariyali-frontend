import React, { useState, useEffect } from 'react';
import MultiSelectDropdown from './MultiSelectDropdown';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal, Form} from "react-bootstrap";
import { PlantationService } from '../../../services/PlantationService/plantation.service';
import { SUCCESS } from "../../constants/constants";

const DashboardTable = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(''); // State to store the selected season
  const seasonOptions = ['Monsoon', 'Winter']; 
  const [show, setShow] = useState(false);
  const cities = [
    { name: '10', code: '10' },
    { name: '20', code: '20' },
    { name: '30', code: '30' },
    { name: '40', code: '40' },
    { name: '50', code: '50' }
  ];

  const handleClose = () => setShow(false);

  const handleShow = () =>{
    setShow(true);
    console.log(show)
  }

  //choose file for import
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  //File Upload
  const handleUpload = async () => {
    if (file) {
      const fileName = file.name;
      if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await PlantationService.UploadExcel(formData);
        // if(response?.status === SUCCESS){
          console.log(response);
          toast.success(response.Message);
        // }else {
        //   toast.error(response?.message);
        // }
      } else {
          toast.warning("Please select valid file format ")
      }
    }else{
      toast.warning("Please select file");
    }
  };

  //Select season type value
  const handleSeasonChange = (e) => {
    setSelectedSeason(e.target.value);
  };

  //Export Excel File Using Season Type
  const handleDownload = async () => {
    if (selectedSeason) {
      const formData = new FormData();
      formData.append('seasonType', selectedSeason);
      console.log(formData);
      const response = await PlantationService.ExportExcel(formData, {responseType : "blob",});
       if(response?.status === 200){
        console.log(response);
          const url = window.URL.createObjectURL(response?.data);
          const link = document.createElement("a");
          const fileName = response.headers["content-disposition"].split("filename=")[1];
          link.href = url;
          link.setAttribute("download", fileName);
          link.click();
      }else {
        toast.error(response?.message);
      }
    } else {
      alert('Please select a season before downloading.');
    }
  };

  return (
    <>
      <ToastContainer />
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2>Plantation Details</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <MultiSelectDropdown />
        </div>
      </div>
      <br/>
      <div className="row">
        <div className="col-12 text-right">
          <div className="form-group d-inline-block">
            <input type="file" id="fileInput" accept=".xls, .xlsx" onChange={handleFileChange} />
            <Button type='submit' className="btn btn-primary" onClick={handleUpload}>
              <span className="bi bi-upload" ></span> Upload
            </Button>
          </div> &nbsp;&nbsp;
          <Button type='submit' className="btn btn-primary" onClick={handleShow}> Download</Button>
        </div>
      </div>
      <div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className="bg-success">
          <Modal.Title className="text-light">Download Planting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group >
                <Form.Label>Season Type: </Form.Label>
                              <select
                                className="form-control-inside form-select"
                                name="donationEvent" onChange={handleSeasonChange}
                              >
                                <option disabled selected value="">
                                  Select Season Type
                                </option>
                                <option value="Monsoon">Monsoon</option>
                                <option value="Winter">Winter</option>
                              </select>          
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDownload}>
            <span className="bi bi-download" > </span> Download
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <br/>
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-bordered shadow-table">
            <thead>
              <tr>
                <th>Plot</th>
                <th>Village</th>
                <th>District</th>
                <th>No of Plant Planted</th>
                <th>Plantation Date</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="rows_count pagination-noteline" style={{'padding-top': '8px'}}>
            Showing 11 to 20 of 91 entries
          </div>
          <div className="">
            <nav className="d-flex justify-content-between align-items-center">
 
                <ul className="pagination shadow-table-pagination alignment_paginatin">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item active"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">4</a></li>
                  <li className="page-item"><a className="page-link" href="#">5</a></li>
                  <li className="page-item"><a className="page-link" href="#">6</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
                <div className="form-group tb_search1">
                  <div className="input-group">
                    <select className="form-control" style={{height: '33px'}}>
                      <option value="">10  </option>
                      <option value="option1">10</option>
                      <option value="option2">20</option>
                      <option value="option3">30</option>
                    </select>
                  </div>
                </div>
                
              </nav>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardTable

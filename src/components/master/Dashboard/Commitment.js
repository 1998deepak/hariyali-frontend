import React, { useState, useEffect } from 'react';
import MultiSelectDropdown from './MultiSelectDropdown';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal, Form } from "react-bootstrap";
import { PlantationService } from '../../../services/PlantationService/plantation.service';
import { SUCCESS } from "../../constants/constants";
import Loader from "../../common/loader/Loader";
import { MultiSelect } from "primereact/multiselect";
import ReactPaginate from 'react-paginate';
import {HiOutlineDocumentReport} from "react-icons/hi";

const Commitment = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedDistricts, setSelectedDistricts] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedCities, setSelectedCities] = useState(null); // State to store the selected season
  // const seasonOptions = ['Monsoon', 'Winter']; 
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [years, setYears] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageNo, setPageNo] = useState(0);
  const [pagesize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [commitmentList, setCommitmentList] = useState([]);


  const handleClose = () => setShowUploadModal(false);

  const handleYearChange = (e) => {

    setSelectedYear(e.target.value);
    
  };

  const getYears = async () => {
    setLoading(true);
    const response = await PlantationService.years();
    if (response?.status === SUCCESS) {
      setYears(response.data);
      setLoading(false);
      setSelectedYear(years[years.length - 1]);

    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const getSeasons = async () => {
    setLoading(true);
    const response = await PlantationService.seasons();
    if (response?.status === SUCCESS) {
      setSeasons(response.data);
      setLoading(false);
      setSelectedSeason(seasons[seasons.length - 1]);

    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const getCommitmentList = async () => {

    if (selectedYear == null) {
      toast.error("Please select plantation year!");
    } else if (selectedSeason == null) {
      toast.error("Please select season!");
    } else {
      setLoading(true);
    
      const data = {
        pageSize: pagesize,
        pageNumber: pageNo,
        data: {
          plantationMaster:{
            season: selectedSeason,
            plantationYear: selectedYear
          }
        }
      }
      console.log(data);
      const response = await PlantationService.getCommitmentList(data);
      if (response?.status === SUCCESS) {
        setCommitmentList(response.data);
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    }
  };


  useEffect(() => {
    getYears();
    getSeasons();
  }, []);


  const handlePageClick = (event) => {
    setPageNo(event.selected);
    getCommitmentList();
  };


  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className="container plantation">
        <div className="row">
          <div className="col-12">
            <h2>Commitment Details</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-2">
            <label> Plantation Year <span className="red-text">*</span></label>
            <select
              className=" form-control-inside form-select"
              name="plantationYear"
              onChange={handleYearChange}
            >
              <option disabled selected value="">Select Year</option>

              {years.map(year => {
                return (
                  <option value={year}>{year}</option>
                )
              })}
            </select>
          </div>
          <div className="col-md-4 col-lg-2">
            <label> Season <span className="red-text">*</span></label>

            <select
              className="form-control-inside form-select"
              name="season"
              onChange={(e) => setSelectedSeason(e.target.value)}
            >
              <option disabled selected value="">Select Season</option>
              {seasons.map((season) => {
                return (
                  <option value={season}>{season}</option>
                )
              })}
            </select>
          </div>
          
          <div className="col-md-6 col-lg-4">
            <div className="form-group d-inline-block top-30">

              <Button type='submit' className="btn btn-primary" onClick={getCommitmentList}>
                Search
              </Button>
              </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">
            <table className="table table-striped table-bordered shadow-table">
              <thead>
                <tr>
                  <th>Donation Number</th>
                  <th>Transaction Id</th>
                  <th>Donation Amount</th>
                  <th>No of Plant Planted</th>
                  <th>District</th>
                  <th>City</th>
                  <th>Plantation Date</th>
                  <th>Season</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {commitmentList.map(commitment => {
                  return (
                    <tr>
                      <td>{commitment?.donation?.donationCode}</td>
                      <td>{commitment?.donation?.orderId}</td>
                      <td>{commitment?.donation?.totalAmount}</td>
                      <td>{commitment?.noOfPlantsPlanted}</td>
                      <td>{commitment.plantationMaster?.district}</td>
                      <td>{commitment.plantationMaster?.village}</td>
                      <td>{commitment.plantationMaster?.plantationDateString}</td>
                      <td>{commitment.plantationMaster?.season}</td>
                      <td>
                        <a href='' title='Year1 Report'><HiOutlineDocumentReport /></a> &nbsp; &nbsp;
                        <a href='' title='Year2 Report'><HiOutlineDocumentReport /></a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {commitmentList.length > 0 && (
              <ReactPaginate className="pagination"
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        </div>
{/*         
        <Modal
          show={showUploadModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className='fileUploadModal'
        >
          <Modal.Header style={{ backgroundColor: "#23aa4a" }} closeButton>
            <Modal.Title>Upload Excel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-12'>
                <a href='/excelTemplate/plantationTemplate.xlsx'>Download Template</a>
              </div>
            </div>
            <input type="file" id="fileInput" accept=".xls, .xlsx" onChange={handleFileChange} />
            <button className='btn btn-primary' onClick={uploadFile}>Upload</button>
          </Modal.Body>
        </Modal> */}
      </div >
    </>
  );
};

export default Commitment

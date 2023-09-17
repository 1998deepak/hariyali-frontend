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

const DashboardTable = () => {
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
  const [plantationList, setPlantationList] = useState([]);


  const handleClose = () => setShowUploadModal(false);

  const handleYearChange = (e) => {

    setSelectedYear(e.target.value);
    getDistricts(e.target.value);
    getCities(e.target.value);
  };

  //choose file for import
  const handleFileChange = (e) => {
    console.log(districts)
    if (e.target.files[0].size <= 5120000) {
      let fileName = e.target.files[0].name;
      if (fileName.endsWith('xls') || fileName.endsWith('xlsx')) {
        setFile(e.target.files[0]);
      } else {
        toast.error("Please upload excel file");
      }
    } else {
      toast.error("Please select excel file less than 5 MB");
    }
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

  const getDistricts = async (year) => {
    setLoading(true);
    const response = await PlantationService.districts(year);
    if (response?.status === SUCCESS) {
      let districtList = [];
      response.data.map(data => {
        districtList.push({ name: data, code: data });
      });
      setSelectedDistricts(districtList);

      setDistricts(districtList);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const getCities = async (year) => {
    setLoading(true);
    const response = await PlantationService.cities(year);
    if (response?.status === SUCCESS) {
      let cityList = [];
      response.data.map(data => {
        cityList.push({ name: data, code: data })
      });

      setSelectedCities(cityList);

      setCities(cityList);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const uploadFile = async () => {
    if (file != null) {
      setLoading(true);
      console.log(file);
      const formData = new FormData();

      // Update the formData object
      formData.append("file", file);
      formData.append("fileName", file.name);
      console.log(formData);
      const response = await PlantationService.upload(formData);
      if (response?.status === SUCCESS) {
        setLoading(false);
        setShowUploadModal(false);
        getYears();
        getSeasons();
        getDistricts(selectedYear);
        getCities(selectedYear);
        getPlantationList();
        toast.info(response?.message);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } else {
      toast.error("Please upload excel file");
    }
  };


  const getPlantationList = async () => {

    if (selectedYear == null) {
      toast.error("Please select plantation year!");
    } else if (selectedSeason == null) {
      toast.error("Please select season!");
    } else if (selectedDistricts == null) {
      toast.error("Please select districts!");
    } else if (selectedCities == null) {
      toast.error("Please select cities!");
    } else {
      setLoading(true);
      let districtList = "";
      selectedDistricts.map(data => {
        districtList += data.name + ",";
      });
      districtList = districtList.substring(0, districtList.length - 1);
      let cityList = "";
      selectedCities.map(data => {
        cityList += data.name + ",";
      });

      cityList = cityList.substring(0, cityList.length - 1);
      const data = {
        pageSize: pagesize,
        pageNumber: pageNo,
        data: {
          district: districtList,
          village: cityList,
          season: selectedSeason,
          plantationYear: selectedYear
        }
      }
      console.log(data);
      const response = await PlantationService.getPlantationList(data);
      if (response?.status === SUCCESS) {
        setPlantationList(response.data);
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


  // //Select season type value
  // const handleSeasonChange = (e) => {
  //   setSelectedSeason(e.target.value);
  // };

  //Export Excel File Using Season Type
  const handleDownload = async () => {
    if (selectedYear == null) {
      toast.error("Please select plantation year!");
    } else if (selectedSeason == null) {
      toast.error("Please select season!");
    } else if (selectedDistricts == null) {
      toast.error("Please select districts!");
    } else if (selectedCities == null) {
      toast.error("Please select cities!");
    } else {
      let districtList = "";
      selectedDistricts.map(data => {
        districtList += data.name + ",";
      });
      districtList = districtList.substring(0, districtList.length - 1);
      let cityList = "";
      selectedCities.map(data => {
        cityList += data.name + ",";
      });

      cityList = cityList.substring(0, cityList.length - 1);
      const data = {
        district: districtList,
        village: cityList,
        season: selectedSeason,
        plantationYear: selectedYear
      }
      const response = await PlantationService.exportExcel(data);
      if (response?.status === 200) {
        console.log(response);
        const url = window.URL.createObjectURL(response?.data);
        const link = document.createElement("a");
        const fileName = response.headers["content-disposition"].split("filename=")[1];
        link.href = url;
        link.setAttribute("download", fileName);
        link.click();
      } else {
        toast.error(response?.message);
      }
    }
  };

  const handlePageClick = (event) => {
    setPageNo(event.selected);
    getPlantationList();
  };


  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className="container plantation">
        <div className="row">
          <div className="col-12">
            <h2>Plantation Details</h2>
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
              <option disabled selected value="">Select Plantation Year</option>

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
          <div className="col-md-4 col-lg-2">
            <label> District Name <span className="red-text">*</span></label>
            <div className="card p-multiselectCard">

              <MultiSelect
                value={selectedDistricts}
                onChange={(e) => setSelectedDistricts(e.value)}
                options={districts}
                optionLabel="name"
                filter
                placeholder="District"
                maxSelectedLabels={3}
                className="w-full "
              />
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <label> City Name <span className="red-text">*</span></label>
            <div className="card p-multiselectCard">
              <MultiSelect
                value={selectedCities}
                onChange={(e) => setSelectedCities(e.value)}
                options={cities}
                optionLabel="name"
                filter
                placeholder="City Name"
                maxSelectedLabels={3}
                className="w-full"
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="form-group d-inline-block top-30">

              <Button type='submit' className="btn btn-primary" onClick={getPlantationList}>
                Search
              </Button>
              <Button type='submit' className="btn btn-primary" onClick={setShowUploadModal}>
                <span className="bi bi-upload" ></span> Upload
              </Button>
              <Button type='submit' className="btn btn-primary" onClick={handleDownload}> <span className="bi bi-download" ></span>Download</Button>
            </div>
          </div>
        </div>
        <br />
        {/* <div className="row">
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
        </div> */}
        <br />
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
                {plantationList.map(plantation => {
                  return (
                    <tr>
                      <td>{plantation.plot}</td>
                      <td>{plantation.village}</td>
                      <td>{plantation.district}</td>
                      <td>{plantation.noOfPlantsPlanted}</td>
                      <td>{plantation.plantationDateString}</td>
                      <td>{plantation.latitude}</td>
                      <td>{plantation.longitude}</td>
                      <td>{plantation.status}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {plantationList.length > 0 && (
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
        {/* <div className="row">
          <div className="col-12">
            <div className="rows_count pagination-noteline" style={{ 'padding-top': '8px' }}>
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
                    <select className="form-control" style={{ height: '33px' }}>
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
        </div> */}

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
        </Modal>
      </div >
    </>
  );
};

export default DashboardTable

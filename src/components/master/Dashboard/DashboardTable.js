import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import { PlantationService } from '../../../services/PlantationService/plantation.service';
import { SUCCESS } from "../../constants/constants";
import Loader from "../../common/loader/Loader";
import { MultiSelect } from "primereact/multiselect";
import Pagination from '../../common/Pagination';


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
    getDistricts(e.target.value, false);
    getCities(e.target.value, false);
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

  const getYears = async (flag) => {
    setLoading(true);
    const response = await PlantationService.years();
    if (response?.status === SUCCESS) {
      setYears(response.data);
      setLoading(false);
      if (flag) {
        setSelectedYear(years[years.length - 1]);
        getSeasons(true);
        getDistricts(years[years.length - 1], true);

      }
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const getSeasons = async (flag) => {
    setLoading(true);
    const response = await PlantationService.seasons();
    if (response?.status === SUCCESS) {
      setSeasons(response.data);
      setLoading(false);
      if (flag) {
        setSelectedSeason(seasons[seasons.length - 1]);
      }
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const getDistricts = async (year, flag) => {
    setLoading(true);
    const response = await PlantationService.districts(year);
    if (response?.status === SUCCESS) {

      let districtList = [];
      response.data.map(data => {
        districtList.push({ name: data, code: data });
      });
      if (flag) {
        setSelectedDistricts(districtList);
        getCities(year, flag);
      }
      setDistricts(districtList);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const getCities = async (year, flag) => {
    setLoading(true);
    const response = await PlantationService.cities(year);
    if (response?.status === SUCCESS) {

      let cityList = [];
      response.data.map(data => {
        cityList.push({ name: data, code: data })
      });
      setCities(cityList);
      setLoading(false);

      if (flag) {
        setSelectedCities(cityList);
        setTimeout(() => {
          document.getElementById("search").click();
        }, 100);
      }
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
        getYears(true);
        toast.info(response?.message);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } else {
      toast.error("Please upload excel file");
    }
  };


  const getPlantationList = async (pageNo) => {

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
        setTotalRecords(response.totalRecords);
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    }
  };


  useEffect(() => {
    getYears(false);
    getSeasons(false);
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
  const downloadTemplate = async () => {

    const response = await PlantationService.downloadTemplate();
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

  };

  const handlePageClick = (event) => {
    setPageNo(event);
    getPlantationList(event - 1);
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
              value={selectedYear}
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
              value={selectedSeason}
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

              <Button type='submit' className="btn btn-primary" id="search" onClick={() => getPlantationList(0)}>
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
        <div className="row padding-bottom-10">
          <div className="table-responsive">
            <table className="table table-striped table-bordered shadow-table">
              <thead>
                <tr>
                  <th>Plot</th>
                  <th>Village</th>
                  <th>District</th>
                  <th>No of Plant Planted</th>
                  <th>Plantation Date</th>
                  {/* <th>Latitude</th>
                  <th>Longitude</th> */}
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
                      {/* <td>{plantation.latitude}</td>
                      <td>{plantation.longitude}</td> */}
                      <td>{plantation.status}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {totalRecords > 0 &&
              <Pagination
                itemsCount={totalRecords}
                itemsPerPage={pagesize}
                currentPage={pageNo}
                setCurrentPage={handlePageClick}
                alwaysShown={false}
              />
            }
          </div>
        </div>

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
                <a href='javascript:void(0)' target='_self' onClick={downloadTemplate}>Download Template</a>
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

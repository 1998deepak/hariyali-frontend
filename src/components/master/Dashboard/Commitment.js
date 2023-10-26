import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import { PlantationService } from '../../../services/PlantationService/plantation.service';
import { SUCCESS } from "../../constants/constants";
import Loader from "../../common/loader/Loader";
import { HiOutlineDocumentReport } from "react-icons/hi";
import Pagination from '../../common/Pagination';

const Commitment = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [years, setYears] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageNo, setPageNo] = useState(0);
  const [pagesize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [commitmentList, setCommitmentList] = useState([]);



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

  const getCommitmentList = async (pageNo) => {
    setPageNo(pageNo+1);
    if (selectedYear == null) {
      toast.error("Please select plantation year");
    } else if (selectedSeason == null) {
      toast.error("Please select season");
    } else {
      setLoading(true);

      const data = {
        pageSize: pagesize,
        pageNumber: pageNo,
        data: {
          plantationMaster: {
            season: selectedSeason,
            plantationYear: selectedYear
          }
        }
      }
      console.log(data);
      const response = await PlantationService.getCommitmentList(data);
      if (response?.status === SUCCESS) {
        setCommitmentList(response.data);
        setTotalRecords(response.totalRecords);
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    }
  };

  const getYear1Report = async (row) => {
    setLoading(true);
      console.log(row.id);
      const response = await PlantationService.getYear1Report(row.id);
      console.log(response);
      if (response) {
        toast.success(response)
        setLoading(false);
      } else {
        toast.error("Something went wrong, Please try again later");
        setLoading(false);
      }
    }

  const getYear2Report = async (row) => {
    setLoading(true);
      console.log(row.id);
      const response = await PlantationService.getYear2Report(row.id);
      console.log(response);
      if (response) {
        toast.success(response)
        setLoading(false);
      } else {
        toast.error("Something went wrong, Please try again later");
        setLoading(false);
      }
  };


  useEffect(() => {
    getYears();
    getSeasons();
  }, []);


  const handlePageClick = (event) => {
    setPageNo(event);
    getCommitmentList(event-1);
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

              <Button type='submit' className="btn btn-primary" onClick={() => getCommitmentList(0)}>
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-bordered shadow-table">
              <thead>
                <tr>
                  <th>Donation Number</th>
                  <th>Donor Id</th>
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
                      <td>{commitment?.donorId}</td>
                      <td>{commitment?.donation?.orderId}</td>
                      <td>{commitment?.donation?.totalAmount}</td>
                      <td>{commitment?.noOfPlantsPlanted}</td>
                      <td>{commitment.plantationMaster?.district}</td>
                      <td>{commitment.plantationMaster?.village}</td>
                      <td>{commitment.plantationMaster?.plantationDateString}</td>
                      <td>{commitment.plantationMaster?.season}</td>
                      <td>
                        <a href='javascript:void(0)' title='Year1 Report' onClick={() => {getYear1Report(commitment)}}><HiOutlineDocumentReport /></a> &nbsp; &nbsp;
                        <a href='javascript:void(0)' title='Year2 Report' onClick={() => {getYear2Report(commitment)}}><HiOutlineDocumentReport /></a>
                      </td>
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
      </div >
    </>
  );
};

export default Commitment

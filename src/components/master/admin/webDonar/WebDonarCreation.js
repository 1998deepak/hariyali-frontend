import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { WebDonorCreationService } from
  "../../../../services/webDonorCreationService/webDonorCreation.service.js";
import { SUCCESS } from "../../../constants/constants";
import { Modal, Button } from "react-bootstrap";
import Loader from "../../../common/loader/Loader.js";
import Table from 'react-bootstrap/Table';
import Pagination from '../../../common/Pagination';

function WebDonarCreation() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [donorTypeFilter, setDonorTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [status, setStatus] = useState("Pending");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationList, setDonationList] = useState([]);

  const [donationModalPageNo, setDonationModalPageNo] = useState(1);
  const [donationModalPagesize, setDonationModalPageSize] = useState(10);
  const [donationModalPageCount, setDonationModalPageCount] = useState(0);
  const [donationModalTotalRecords, setDonationModalTotalRecords] = useState(0);

  const [donor, setDonor] = useState({});
  const [remark, setRemark] = useState("");
  const [invalidRemark, setInvalidRemark] = useState(false);


  //Calling Function
  useEffect(() => {
    getAllUserWithWebID("", 0);
  }, []);

  // Get all user donation
  const getAllUserWithWebID = async (searchText, pageNo) => {
    setLoading(true);
    
    let pageRequest = {
      searchText: searchText,
      status: statusFilter,
      donorType: donorTypeFilter,
      pageNumber: pageNo,
      pageSize: pagesize
    }
    setTotalRecords(0);
    const response = await WebDonorCreationService.getAllUserWithWebID(pageRequest);
    setStatus(statusFilter);
    if (response?.data) {
      // const dataArray = JSON.parse(response.data);
      setData(response.data);
      setPageCount(response.totalPages);
      setTotalRecords(response.totalRecords);
      setLoading(false);
      if (response?.status === SUCCESS) {
        // toast.success(response?.message);
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } else {
      setData([]);
      setLoading(false);
      toast.error(response?.message);
    }
  };

  const getUserDonations = async (donor, pageNo) => {
    setLoading(true);
    let pageRequest = {
      userId: donor.userId,
      pageNumber: pageNo,
      pageSize: donationModalPagesize

    }

    setDonor(donor);
    const response = await WebDonorCreationService.getUserDonations(pageRequest);

    if (response?.data) {
      setDonationList(response.data);
      console.log(donationList);
      setDonationModalTotalRecords(response.totalRecords);
      setLoading(false);
      setShowDonationModal(true);
    } else {
      setData([]);
      setLoading(false);
      toast.error(response?.message);
    }
  }


  const handleClose = () => setShowDonationModal(false);
  const handleShow = () => setShowDonationModal(true);


  //Handle Approval
  const handleApproveAndReject = (row, msg) => {
    let data = JSON.parse(JSON.stringify(row));
    setInvalidRemark(false);
    setRemark("");
    data.approvalStatus = msg;
    setFormData(data);
    setShowConfirmationModal(true);
  };

  //Approve donation with webid
  const approveDonationWithWebId = async (data) => {

    if (formData.approvalStatus == 'Rejected' && remark == "") {
      setInvalidRemark(true);
    } else {
      formData.remark = remark;
      setLoading(true)
      const response = await WebDonorCreationService.approveDonation(formData);
      console.log(response);
      getAllUserWithWebID(searchText, 0);
      if (response?.status === SUCCESS) {
        toast.success(response?.message);
        setLoading(false)
      } else {
        toast.error(response?.message);
        setLoading(false)
      }

      // Close the confirmation modal
      setShowConfirmationModal(false);
    }
  };

  const handlePageClick = (event) => {
    console.log(event);
    setPageNo(event);
    getAllUserWithWebID(searchText, event-1);
  };

  const handleDonationModalPageClick = (event) => {
    setDonationModalPageNo(event);
    getUserDonations(donor, event-1);
  };

  // Handle Search for searching record
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // Handle Search for searching record
  const handleComment = (event) => {
    setRemark(event.target.value);
  };

  // Handle donor type filter
  const handleDonorTypeFilter = (event) => {
    setDonorTypeFilter(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const clearSearch = () => {
    setSearchText('');
    getAllUserWithWebID("", 0);
  }

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className="bggray">
        <div className="col-12 admin-maindiv">
          <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
            <h5>Donation List</h5>

            <div className="row">
              <div className="col-3">
                <input
                  placeholder="Search here"
                  id="searchField"
                  className="pl20 form-control-inside"
                  type="text"
                  value={searchText}
                  onChange={handleSearch}
                />
                {
                  searchText ? <RxCross2 className="searchicon" onClick={clearSearch} /> : <BiSearchAlt className="searchicon" />
                }
              </div>
              <div className="col-3">
                <select
                  className="pl20 form-control-inside"
                  onChange={handleDonorTypeFilter}
                >
                  <option value="">All Donor Types</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>
              <div className="col-3">
                <select
                  className="pl20 form-control-inside"

                  onChange={handleStatusFilter}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="col-3">
                <button className="btn btn-search" onClick={() => getAllUserWithWebID(searchText, 0)}>Search</button>
              </div>
            </div>
            <div className="row">
              {totalRecords > 0 &&
                <div className="col-12 pr0">
                  <span>{totalRecords} records found!</span>
                </div>
              }
              <div className="col-12 pr0">
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>WEB PORTAL ID</th>
                      {status == 'Approved' &&
                        <th>Donor Id</th>}
                      <th>Donor Name</th>
                      <th>DONOR TYPE</th>
                      <th>ORGANISATION</th>
                      <th>STATUS</th>
                      {status == 'Rejected' &&
                        <th>Remark</th>}

                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(donor => {
                      return (
                        <tr>
                          <td>{donor.webId}</td>
                          {status == 'Approved' &&
                            <td>{donor.donorId}</td>}

                          <td>{donor.firstName + ' ' + donor.lastName}</td>
                          <td>{donor.donarType}</td>
                          <td>{donor.organisation}</td>
                          <td>{donor.approvalStatus}</td>
                          {status == 'Rejected' &&
                            <td>{donor.remark}</td>
                          }
                          <td>
                            <span>

                              {status == 'Pending' &&
                                <>
                                  <BsCheckCircleFill title="Approve" className="icon-btn approve-button"
                                    onClick={() => handleApproveAndReject(donor, "Approved")} />
                                  <AiFillCloseCircle title="Reject" className="icon-btn reject-button"
                                    onClick={() => handleApproveAndReject(donor, "Rejected")} />
                                </>
                              }
                              <Link onClick={() => getUserDonations(donor, 0)} className="view-icon icon-btn" ><FaRegEye /></Link>
                            </span>

                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
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
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} className="confirmation-modal">
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to {formData?.approvalStatus === "Approved" ? "approve" : "reject"} this?</p>
          {formData?.approvalStatus == 'Rejected' &&
            <form>
              <div className="row">
                <div className="col-12">
                  <textarea
                    placeholder="Rejection Comment here"
                    className="pl20 form-control-inside"
                    type="text"
                    required="true"
                    onChange={handleComment}
                  />
                  {invalidRemark && <span className="error-message red-text">Remark is required</span>}
                </div>
              </div>
            </form>
          }
        </Modal.Body>
        <Modal.Footer className="">
          <Button variant="primary" onClick={() => approveDonationWithWebId(formData)}>OK</Button>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDonationModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Donation List of {donor.webId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="row">
            <div className="col-12 pr0">
              <Table striped responsive>
                <thead>
                  <tr>
                    <th>Transaction Id</th>
                    <th>Donation Mode</th>
                    <th>Donation Type</th>
                    <th>Payment Mode</th>
                    <th>Donation Amount</th>
                    <th>Payment Status</th>
                    <th>Payment Date</th>
                    {/* <th>Total Amount</th> */}
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {donationList.map(donation => {
                    return (
                      donation.paymentInfo.map(payment => {
                        return (
                          <tr>
                            <td>{payment.orderId}</td>
                            <td>{donation.donationMode}</td>
                            <td>{donation.donationType}</td>
                            <td>{payment.paymentMode}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.paymentStatus}</td>
                            <td>{payment.paymentDate}</td>
                            <td>
                              <span>
                                <Link to={`/OfflinePlanAndDonationUpdate/${donation.donationId}`} className="view-icon icon-btn" ><FaRegEye /></Link>
                              </span>

                            </td>
                          </tr>
                        );
                      })
                    );
                  })}
                </tbody>
              </Table>
              
              {donationModalTotalRecords > 0 &&
                  <Pagination
                    itemsCount={donationModalTotalRecords}
                    itemsPerPage={donationModalPagesize}
                    currentPage={donationModalPageNo}
                    setCurrentPage={handleDonationModalPageClick}
                    alwaysShown={false}
                  />
                }
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default WebDonarCreation;

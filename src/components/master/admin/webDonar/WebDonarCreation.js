import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import BootstrapTable from "react-bootstrap-table-next";
import { FaRegEye } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import { WebDonorCreationService } from
  "../../../../services/webDonorCreationService/webDonorCreation.service.js";
import { SUCCESS } from "../../../constants/constants";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button } from "react-bootstrap";
import Loader from "../../../common/loader/Loader.js";

function WebDonarCreation() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [donorTypeFilter, setDonorTypeFilter] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formData, setformData] = useState([]);
  const [loading, setLoading] = useState(false);

  //Calling Function
  useEffect(() => {
    getAllUserWithWebID();
  }, []);

  // Get all user donation
  const getAllUserWithWebID = async () => {
    setLoading(true);
    const response = await WebDonorCreationService.getAllUserWithWebID();

    if (response?.data) {
      const dataArray = JSON.parse(response.data);
      setData(dataArray);

      if (response?.status === SUCCESS) {
        // toast.success(response?.message);
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    }
  };



  //Handle Approval
  const handleApproveAndReject = (row, msg) => {
    const formData = {
      formData: {
        webId: row.webId,
        status: msg
      }
    }
    setformData(formData);
    setShowConfirmationModal(true);
  };

  console.log(formData);

  //Approve donation with webid
  const approveDonationWithWebId = async (data) => {
    console.log(data);
    setLoading(true)
    const response = await WebDonorCreationService.approveDonation(data.formData);
   console.log(response);
   getAllUserWithWebID();
      if (response?.status === SUCCESS) {
        toast.success(response?.message);
        setLoading(false)
      } else {
        toast.error(response?.message);
        setLoading(false)
      }
    
    // Close the confirmation modal
     setShowConfirmationModal(false);
  };



  const columns = [
    {
      dataField: "webId",
      text: "Web Portal ID",
    },
    {
      dataField: "paymentInfo.paymentInfoId",
      text: "Txn Id",
    },
    {
      dataField: "fullName",
      text: "Name",
      formatter: (cell, row) => {
        const fullName = `${row.firstName} ${row.lastName}`;
        return fullName;
      },
    },
    {
      dataField: "donarType",
      text: "Donor Type",
    },
    {
      dataField: "paymentInfo.amount",
      text: "Payment Amt",
    },
    {
      dataField: "organisation",
      text: "Organisation",
    },
    {
      dataField: "status",
      text: "Status",
    },
    {
      dataField: "",
      text: "Action",
      formatter: function (dataField, row) {
        return (
          <span>
            {/* <button
              className="approve-button btn btn-danger"
              onClick={() => handleApproveAndReject(row, "approved")}
            // disabled={isApproved}
            >
              Approve
            </button>
            <button
              className="reject-button btn btn-warning"
              onClick={() => handleApproveAndReject(row, "rejected")}
            // disabled={!isApproved}
            >
              Reject
            </button> */}
            <BsCheckCircleFill title="Approve" className="icon-btn approve-button"
              onClick={() => handleApproveAndReject(row, "approved")}/>
            <AiFillCloseCircle title="Reject" className="icon-btn reject-button"
              onClick={() => handleApproveAndReject(row, "rejected")}/>
            <Link to={`/DonarView/${row.emailId}`} className="view-icon icon-btn" ><FaRegEye /></Link>
          </span>
        );
      },
    },
  ];

  // Handle Search for searching record
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // Handle donor type filter
  const handleDonorTypeFilter = (event) => {
    setDonorTypeFilter(event.target.value);
  };


  /// Filter data as per search and donor type
  const filteredData = data.filter((item) => {
    const donorTypeMatch =
      donorTypeFilter === "" || item.donarType === donorTypeFilter;

    const searchWords = searchText.toLowerCase().split(' ');

    const searchMatch = searchWords.every((searchWord) => {
      return Object.values(item).some((value) => {
        if (value !== null && typeof value === "string") {
          const lowercaseValue = value.toLowerCase();
          return lowercaseValue.includes(searchWord);
        }
        return false;
      });
    });

    return donorTypeMatch && searchMatch;
  });



  const paginationOptions = {
    sizePerPage: 10, // Number of records to show per page
    hideSizePerPage: true, // Hide the dropdown for changing the page size
    hidePageListOnlyOnePage: true, // Hide the page list if there is only one page
    alwaysShowAllBtns: false, // Show next and previous buttons even when there is only one page
    paginationSize: 5, // Number of pagination list items to display
  };

  return (
    <>
    <ToastContainer />
    {loading && <Loader/>}
      <div className="bggray">
        <div className="col-12 admin-maindiv">
          <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
            <h5>Web Donor - Creation</h5>

            <div className="row">
              <div className="col-3">
                <input
                  placeholder="Search here"
                  className="pl20 form-control-inside"
                  type="text"
                  onChange={handleSearch}
                />
                <BiSearchAlt className="searchicon" />
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
            </div>

            <div className="col-12 pr0">
              <BootstrapTable
                classes="mt20 "
                keyField="webId"
                data={filteredData}
                columns={columns}
                //pagination={paginationFactory(paginationOptions)} // Apply pagination
              />
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
           <p>Are you sure you want to {formData?.formData?.status==="approved" ? "approve" : "reject"} this?</p> 
        </Modal.Body>
        <Modal.Footer className="">
          <Button variant="primary" onClick={() => approveDonationWithWebId(formData)}>OK</Button>
          <Button variant="secondary"onClick={() => setShowConfirmationModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default WebDonarCreation;

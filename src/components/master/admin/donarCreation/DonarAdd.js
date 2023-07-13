import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { AiFillEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SUCCESS } from "../../../constants/constants";
import { DonationService } from "../../../../services/donationService/donation.service";

function DonarAdd() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  // DataField
  const columns = [
    {
      dataField: "donorId",
      text: "Donor ID",
    },
    {
      dataField: "donarType",
      text: "Donor Type",
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
      dataField: "paymentDate",
      text: "Last Payment Date",
    },
    {
      dataField: "panCard",
      text: "PAN",
    },
    {
      dataField: "emailId",
      text: "Email",
    },
    {
      dataField: "",
      text: "Action",
      formatter: (cell, row) => {
        console.log(row);
        return (
          <>

            <span>
              <Link to={`/OfflineDonationUpdate/${row.emailId}`} className="edit-icon"><AiFillEdit /></Link>
              <Link to={`/DonarView/${row.emailId}`} className="view-icon" ><FaRegEye /></Link>
            </span>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getAllUserDonation();
  }, []);

  // Get all user donation
  const getAllUserDonation = async () => {
    const response = await DonationService.getAllUserDonation();

    if (response?.data?.data) {
      const dataArray = JSON.parse(response.data.data);
      setData(dataArray);
    }
    if (response?.status === SUCCESS) {
      toast.success(response?.message);
    } else {
      toast.error(response?.message);
    }
  };


  // Handle Search for searching record
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  //  For Searching data 
  const searchStrings = searchText.toLowerCase().split(' ');

  const filteredData = data.filter((item) =>
    searchStrings.every((searchString) =>
      Object.values(item).some((value) =>
        value !== null &&
        value.toString().toLowerCase().includes(searchString)
      )
    )
  );

// Pagination
  const paginationOptions = {
    sizePerPage: 5, // Number of records to show per page
    hideSizePerPage: true, // Hide the dropdown for changing the page size
    hidePageListOnlyOnePage: true, // Hide the page list if there is only one page
    alwaysShowAllBtns: false, // Show next and previous buttons even when there is only one page
    paginationSize: 5, // Number of pagination list items to display
  };

  return (
    <>
      <div className="bggray">
        <div className="col-12 admin-maindiv">
          <div className="justify-content-between bgwite borderform1 padding30 all-form-wrap">
            <div className="row">
              <h5 className="col-9">Donor - Creation</h5>
              <div className="col-3 text-right addbtnList">
                <BsPlusCircleFill /> <Link to={`/OfflineDonation`} className="edit-icon"> Add Donor
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <input
                  placeholder="Search here"
                  className="pl20 form-control-inside"
                  type="text"
                  value={searchText}
                  onChange={handleSearch}
                />
                <BiSearchAlt className="searchicon" />
              </div>
            </div>
            <div className="col-12 pr0">
              <BootstrapTable
                classes="mt20"
                keyField="id"
                data={filteredData}
                columns={columns}
                pagination={paginationFactory(paginationOptions)} // Apply pagination
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default DonarAdd;

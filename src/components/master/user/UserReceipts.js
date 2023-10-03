import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DonationService } from "../../../services/donationService/donation.service";
import { SUCCESS } from "../../constants/constants";
import { UserService } from "../../../services/userService/user.service";
import Loader from "../../common/loader/Loader";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { convertDateFormat } from "../../utils/convertDateFormat";

function UserReceipts() {
  //states to store data
  const [loading, setLoading] = useState(false);
  const [userReceiptData, setUserReceiptData] = useState([]);
  const { email } = UserService.userDetails();

  const columns = [
    {
      dataField: "donation_id",
      text: "Donation ID",
    },
    {
      dataField: "reciept_number",
      text: "Reciept Number",
    },
    {
      dataField: "recieptDate",
      text: "Reciept Date",
      formatter:(dataField)=>{
        return convertDateFormat(dataField);
      }
    },
    {
      dataField: "",
      text: "Action",
      formatter: (cell, row) => {
        console.log(row);
        return (
          <span>
            <button
              className="edit-icon btn btn-all"
              onClick={() => downloadReceipt(row.reciept_number)}
            >
              Download
            </button>
          </span>
        );
      },
    },
  ];

  // getUser Details
  const getUserDetails = async (id) => {
    try {
      setLoading(true);
      const response = await DonationService.getAllReceiptByUser(id);
      if (response?.data) {
        setUserReceiptData(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //calling api
  useEffect(() => {
    if (email) {
      getUserDetails(email);
    }
  }, [email]);

  // Update user Data
  const downloadReceipt = async (receiptNumber) => {
    try {
      setLoading(true);
      const response = await DonationService.downloadReceipt(receiptNumber);
      if (response?.status === 200) {
        const url = window.URL.createObjectURL(response?.data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "download.pdf");
        link.click();
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } catch (err) {
      if (err?.response?.data) {
        console.log(err.response.data);
      } else {
        console.log(err?.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className="bggray">
        <div className="col-12 admin-maindiv">
          <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
            <h5>Receipts</h5>
            <div className="col-12 pr0 contact-form-wrap">
              {" "}
              <div className="row">
                <div className="col-12 pr0">
                <div className="table-responsive">
                    <BootstrapTable
                      classes="mt20"
                      class
                      keyField="receiptId"
                      data={userReceiptData}
                      columns={columns}
                      // pagination={paginationFactory()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default UserReceipts;

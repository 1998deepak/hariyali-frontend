import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DonationService } from "../../../../services/donationService/donation.service";
import { FaRegEye } from "react-icons/fa";
import Loader from "../../../common/loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import Pagination from '../../../common/Pagination';
import { convertDateFormat } from "../../../utils/convertDateFormat";

function UserdonationView({ userDetails, setAuthToken, authToken }) {
  const id = useParams().id;
  console.log(id);
  const [loading, setLoading] = useState(false);

  const [pageNo, setPageNo] = useState(0);
  const [pagesize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [donationList, setDonationList] = useState([]);


  const handlePageClick = (event) => {
    setPageNo(event);
    getAllDonationOfUser(event-1);
  };

  useEffect(() => {
    // console.log(userDetails);
    // if (userDetails) {
      getAllDonationOfUser(pageNo);
    // }

  }, [userDetails]);


  const getAllDonationOfUser = async (pageNo) => {
    setPageNo(pageNo +1);
    setLoading(true);
    const response = await DonationService.getAllDonationOfUser(pagesize, pageNo,null);
    console.log(response);

    if (response?.status === "Success") {
      console.log(response)
      setDonationList(response.data);
      setTotalRecords(response.totalRecords);
      setLoading(false);
    } else if(response?.data?.status == "CONFLICT"){
      toast(response?.data?.message);
      setLoading(false);
    } else {
      toast.error(response?.message);
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
            <div className="row">
              <h5 className="col-9">Your Donations</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-bordered shadow-table">
                <thead>
                  <tr>
                    <th>Donation Code</th>
                    <th>Transaction Date</th>
                    <th>Transaction Number</th>
                    <th>Bank Transaction Number</th>
                    <th>Donation Amount</th>
                    <th>Payment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donationList.map(donation => {
                    return (
                      <tr key={donation.donationId}>
                        <td>{donation?.donationCode}</td>
                        <td>{convertDateFormat(donation?.donationDate)}</td>
                        <td>{donation?.paymentInfo[0]?.orderId}</td>
                        <td>{donation?.paymentInfo[0]?.bankPaymentRefNo}</td>
                        <td>{donation?.totalAmount}</td>
                        <td>{donation?.paymentInfo[0]?.paymentStatus}</td>
                        <td>
                        <Link to={`/UserSpecificDonationView/${donation.donationId}`} className="view-icon"><FaRegEye /></Link>
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
        </div>
      </div>
    </>
  );
}

export default UserdonationView;

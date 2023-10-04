import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link, useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { DonationService } from "../../../../services/donationService/donation.service";
import Loader from "../../../common/loader/Loader";
import Pagination from '../../../common/Pagination';
import { IoArrowBackCircleSharp } from "react-icons/io5";

function DonarView() {
  const id=useParams().id;
  const [data, setData] = useState([]);
  const[donorId,setDonorId]=useState("");
  const[donorName,setDonorName]=useState("");
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pagesize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  
  const columns = [
    {
      dataField: "donationCode",
      text: "Donation Code",
    },
    {
      dataField: "paymentDate",
      text: "Transaction Date",
    },
    {
      dataField: "paymentInfoId",
      text: "Txn Date",
    },
    {
      dataField: "paymentStatus",
      text: "Status",
    },
    {
      dataField: "",
      text: "Action",
      formatter: (cell,row) => {
        console.log(row);
        return (
          <span>
            <Link to={`/OfflinePlanAndDonationUpdate/${row.donationId}`}  className="edit-icon"><AiFillEdit /></Link>
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    if(id)
    {
      getAllDonationOfUser(pageNo,id);
    }
  }, [id]);

  
  
  const getAllDonationOfUser = async (pageNo,email) => {
    setLoading(true);
    const response = await DonationService.getAllDonationOfUser(pagesize,pageNo,email);
    console.log(response);
    if (response?.data) {
      const donorData = response.data;
      const newData = donorData.map((donor) => ({
        donorId:donor.donorId,
        donationId: donor.donationId,
        donationCode:donor.donationCode,
        firstName: donor.firstName,
        lastName: donor.lastName,
        paymentDate: donor.paymentInfo.paymentDate,
        paymentInfoId: donor.paymentInfo.paymentInfoId,
        paymentStatus: donor.paymentInfo.paymentStatus,
        donationType:donor.donationType,
      }));
      setTotalRecords(response.totalRecords);
      setData(newData);
      if (newData.length > 0) {
        const fullName = `${newData[0].firstName} ${newData[0].lastName}`;
        setDonorName(fullName);
        setDonorId(newData[0].donorId);
      }
    }
    setLoading(false);
  };
  const handlePageClick = (event) => {
    setPageNo(event);
    getAllDonationOfUser(event-1);
  };

  console.log(totalRecords);
  return (
    <>
    {loading && <Loader/>}
      <div className="bggray">
        <div className="col-12 admin-maindiv">
          <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
            <div className="row">
              <h5 className="col-9">Donation History</h5>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="row select-label">
                  <div className="col-4 "> Donor ID</div>
                  <div className="col-8 p0">
                    <input
                      className="form-control-inside"
                      type="text"
                      name="donorId"
                      value={donorId}
                      onChange={(e) => setDonorId(e.target.value)}
                      placeholder="Donor ID"
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row select-label">
                  <div className="col-4 "> Donor Name</div>
                  <div className="col-8 p0">
                    <input
                      className="form-control-inside"
                      type="text"
                      name="donarName"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Donor Name"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 pr0">
            <div className="table-responsive">
              <BootstrapTable
                classes="mt20 "
                keyField="donationId"
                data={data}
                columns={columns}
              />
              </div>
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
            <div>
              <Link className="edit-icon" to={`/DonarCreation`}><IoArrowBackCircleSharp style={{fontSize:'40px'}}/></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DonarView;

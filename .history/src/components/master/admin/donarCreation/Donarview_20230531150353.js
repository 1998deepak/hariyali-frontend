import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link, useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { DonationService } from "../../../../services/donationService/donation.service";

function DonarView() {
  const id=useParams().id;
  console.log(id);
  const [data, setData] = useState([]);
  const[donorId,setDonorId]=useState("");
  const[donorName,setDonorName]=useState("");

  const columns = [
    {
      dataField: "donationId",
      text: "Donation ID",
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
            <Link to={`/OfflineDonationPay/${row.donationId}`}  className="edit-icon"><AiFillEdit /></Link>
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    console.log(id);
    if(id)
    {
      getAllDonationOfUser(id);
    }
   
  }, [id]);

  // Get all donation of user
  const getAllDonationOfUser = async (id) => {
    console.log(id);
    const response = await DonationService.getAllDonationOfUser(id);
    console.log(id);
    console.log(response.data);
    // console.log(response?.data?.paymentInfo);
    
    if (response?.data) {
      const donorData = JSON.parse(response.data);
      console.log(donorData);
      const newData = donorData.map((donor) => ({
        donorId:donor.donorId,
        donationId: donor.donationId,
        firstName: donor.firstName,
        lastName: donor.lastName,
        paymentDate: donor.paymentInfo.paymentDate,
        paymentInfoId: donor.paymentInfo.paymentInfoId,
        paymentStatus: donor.paymentInfo.paymentStatus,
      }));
      console.log(newData);
      setData(newData);
      if (newData.length > 0) {
        const fullName = `${newData[0].firstName} ${newData[0].lastName}`;
        setDonorName(fullName);
        setDonorId(newData[0].donorId);
      }
    }
    
  };

  return (
    <>
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
                      placeholder="Donar ID"
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
                      placeholder="Donar Name"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 pr0">
              <BootstrapTable
                classes="mt20 "
                keyField="donationId"
                data={data}
                columns={columns}
                pagination={paginationFactory()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DonarView;

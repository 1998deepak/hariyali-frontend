import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link, useParams } from "react-router-dom";
import { DonationService } from "../../../../services/donationService/donation.service";
import { FaRegEye } from "react-icons/fa";
import Loader from "../../../common/loader/Loader";
function UserdonationView({ userDetails, setAuthToken, authToken }) {
  const id=useParams().id;
  console.log(id);
  const [data, setData] = useState([]);
  const[donorId,setDonorId]=useState("");
  const[donorName,setDonorName]=useState("");
  const [loading, setLoading] = useState(false);

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
            <Link to={`/UserSpecificDonationView/${row.donationId}`}  className="view-icon"><FaRegEye /></Link>
          </span>
        );
      },
    },

    // {
    //   dataField: "",
    //   text: "Action",
    //   formatter: (cell, row) => {
    //     console.log(row)
    //     return (
        
    //       <span>
    //         <Link
    //           to={
    //             row.donationType === "Gift donate"
    //               ? `/GiftDonateEditPage/${row.donationId}` // Change to your actual Gift Donate edit page route
    //               : `/OfflinePlanAndDonationUpdate/${row.donationId}`
    //           }
    //           className="edit-icon"
    //         >
    //           {row.donationType === "Gift donate" ? <BsGiftFill /> : <AiFillEdit />}
    //         </Link>
    //       </span>
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    console.log(userDetails);
    if(userDetails)
    {
      getAllDonationOfUser(userDetails);
    }
   
  }, [userDetails]);

  // Get all donation of user
  // const getAllDonationOfUser = async (id) => {
  //   try {
  //     console.log(id);
  //     const response = await DonationService.getAllDonationOfUser(id);
  //     console.log(id);
  //     console.log(response?.data);
  
  //     if (response?.data) {
  //       // Parse the JSON-encoded data string
  //       const donorDataString = response.data;
  //       const donorData = JSON.parse(donorDataString);
  
  //       console.log(donorData); // Make sure you see the parsed data in the console
  
  //       const newData = donorData.map((donor) => ({
  //         donorId: donor.donorId,
  //         donationId: donor.donationId,
  //         firstName: donor.firstName,
  //         lastName: donor.lastName,
  //         paymentDate: donor.paymentInfo.paymentDate,
  //         paymentInfoId: donor.paymentInfo.paymentInfoId,
  //         paymentStatus: donor.paymentInfo.paymentStatus,
  //         donationType: donor.donationType,
  //       }));
  
  //       console.log(newData);
  //       setData(newData);
  
  //       if (newData.length > 0) {
  //         const fullName = `${newData[0].firstName} ${newData[0].lastName}`;
  //         setDonorName(fullName);
  //         setDonorId(newData[0].donorId);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching donation data:", error);
  //   }
  // };
  
  
  const getAllDonationOfUser = async (id) => {
    console.log(id);
    // setLoading(true);
    const response = await DonationService.getAllDonationOfUser(id);
    console.log(id);
    console.log(response?.data);
    // console.log(response?.data?.paymentInfo);
    
    if (response?.data) {
      const donorData = JSON.parse(response.data);
      console.log(donorData);
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
      console.log(newData);
      setData(newData);
      if (newData.length > 0) {
        const fullName = `${newData[0].firstName} ${newData[0].lastName}`;
        setDonorName(fullName);
        setDonorId(newData[0].donorId);
      }
      setLoading(false);
    }
    
  };

  return (
    <>
    {loading && <Loader/>}
      <div className="bggray">
        <div className="col-12 admin-maindiv">
          <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
            <div className="row">
              <h5 className="col-9">Your Donations</h5>
            </div>
            <div className="col-12 pr0">
              <BootstrapTable
                classes="mt20 "
                keyField="donationId"
                data={data}
                columns={columns}
                // pagination={paginationFactory()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserdonationView;

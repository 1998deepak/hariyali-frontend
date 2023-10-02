import React from "react";
import { BANK_TRANSFER, CHEQUE, CREDIT_CARD, DEMAND_DRAFT, ONLINE, PAYMENT_MODES, PAYMENT_STATUS, SUCCESS } from "../constants/constants";
import { useState } from "react";
import { DonationService } from "../../services/donationService/donation.service";
import { toast } from "react-toastify";
import { useEffect } from "react";

const OnlinePaymentDetails = ({ donations, handlePaymentInfoChange, errors, setLoading, index, isDisabled }) => {
  const [bankList, setBankList] = useState([]);
  const [accountList, setAccountList] = useState([])
  console.log(donations);
  const getAllActiveBanks = async () => {
    setLoading(true);
    const response = await DonationService.getAllActiveBanks();
    console.log(response);
    if (response?.status === SUCCESS) {
      console.log(response.data);
      setBankList(response.data);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };
  const getAllActiveBankAccounts = async () => {
    setLoading(true);
    const response = await DonationService.getAllActiveAccount();
    console.log(response.data);
    if (response?.data?.status === SUCCESS) {
      setAccountList(response.data.data);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllActiveBanks();
    getAllActiveBankAccounts();
  }, [])


  return (
    <>
      <div className="col-sm-12 pr15 mt20">
        <div className="row">
          <div className="col-sm-6">
            <div className="row select-label">
              <div className="col-sm-4 ">
                {" "}
                Payment Mode <span className="red-text">*</span>
              </div>
              <div className="col-sm-8 p0">
                <input
                  className="form-control-inside"
                  name="paymentMode"
                  placeholder="Payment Mode"
                  type="text"
                  value={donations?.paymentInfo[0]?.paymentMode}
                  readonly="readonly"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row select-label">
              <div className="col-sm-4 ">
                Transaction Number
              </div>
              <div className="col-sm-8 p0">
                <input
                  className="form-control-inside"
                  name="orderId"
                  placeholder="Transaction Number"
                  type="text"
                  readonly="readonly"
                  value={donations?.paymentInfo[0]?.orderId}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row select-label">
              <div className="col-sm-4 ">
                Payment Reference Number
              </div>
              <div className="col-sm-8 p0">
                <input
                  className="form-control-inside"
                  name="PaymentReferenceNumber"
                  placeholder="Payment Transaction Number"
                  type="text"
                  readonly="readonly"
                  value={donations?.paymentInfo[0]?.bankPaymentRefNo}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row select-label">
              <div className="col-sm-4 ">
                Payment Tracking Id
              </div>
              <div className="col-sm-8 p0">
                <input
                  className="form-control-inside"
                  name="PaymentTrackingId"
                  placeholder="Payment Tracking Id"
                  type="text"
                  readonly="readonly"
                  value={donations?.paymentInfo[0]?.paymentTrackingId}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row select-label">
              <div className="col-sm-4 ">
                Amount <span className="red-text">*</span>
              </div>
              <div className="col-sm-8 p0">
                <input
                  className="form-control-inside"
                  name="amount"
                  placeholder="Amount"
                  type="number"
                  value={donations?.paymentInfo[0]?.amount}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row select-label">
              <div className="col-sm-4 ">
                Payment Date <span className="red-text">*</span>
              </div>
              <div className="col-sm-8 p0">
                <input
                  className="form-control-inside"
                  name="paymentDate"
                  placeholder="Payment Date"
                  type="date"
                  value={donations?.paymentInfo[0]?.paymentDate}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row select-label">
              <div className="col-sm-4 ">
                {" "}
                Payment Status <span className="red-text">*</span>
              </div>
              <div className="col-sm-8 p0">
                <input
                  className="form-control-inside"
                  name="PaymentStatus"
                  placeholder="Payment Status"
                  type="text"
                  readonly="readonly"
                  value={donations?.paymentInfo[0]?.paymentStatus}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row select-label">
              <div className="col-sm-4 ">
                {" "}
                Payment Remark
              </div>
              <div className="col-sm-8 p0">
                <input
                  className="form-control-inside"
                  name="PaymentRemark"
                  placeholder="Payment Status"
                  type="text"
                  readonly="readonly"
                  value={donations?.paymentInfo[0]?.remark}
                />
              </div>
            </div>
          </div>
          
          <div className="col-sm-6">
            <div className="row select-label">
              <div className="col-sm-4 ">
                {" "}
                Card
              </div>
              <div className="col-sm-8 p0">
                <input
                  className="form-control-inside"
                  name="Card"
                  placeholder="Payment Status"
                  type="text"
                  readonly="readonly"
                  value={donations?.paymentInfo[0]?.cardName}
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default OnlinePaymentDetails;

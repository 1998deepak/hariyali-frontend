import React from "react";
import { BANK_TRANSFER, CHEQUE, CREDIT_CARD, DEMAND_DRAFT, ONLINE, PAYMENT_MODES, PAYMENT_STATUS } from "../constants/constants";

const PaymentDetails = ({ donations, handlePaymentInfoChange, errors,bankList,index }) => {
    console.log(donations[0]?.paymentInfo[index]);
  return (
    <>
      <div className="col-12 pr15 mt20">
        <div className="row">
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                {" "}
                Select Mode <span className="red-text">*</span>
              </div>
              <div className="col-8 p0">
                <select
                  name="paymentMode"
                  className=" form-control-inside form-select"
                  value={donations[0]?.paymentInfo[index]?.paymentMode}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                >
                  <option disabled selected value="">
                    Select
                  </option>
                  {PAYMENT_MODES.map((mode) => {
                    return (
                      <option key={mode.value} value={mode.value}>
                        {mode.label}
                      </option>
                    );
                  })}
                </select>
                {errors.map((error, index) => {
                  if (
                    error.field === `donations[0].paymentInfo[${index}].paymentMode`
                  ) {
                    return (
                      <div key={index} className="error-message red-text">
                        {error.message}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>         
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                {" "}
                Bank Account <span className="red-text">*</span>
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="accountId"
                  placeholder="Bank Account"
                  type="text"
                  value={donations[0]?.paymentInfo[index]?.accountId}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
                {errors.map((error, index) => {
                  if (error.field === `donations[0].paymentInfo[${index}].accountId`) {
                    return (
                      <div key={index} className="error-message red-text">
                        {error.message}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                Amount <span className="red-text">*</span>
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="amount"
                  placeholder="Amount"
                  type="number"
                  value={donations[0]?.paymentInfo[index]?.amount}
                  onChange={(event) => {
                    if (event.target.value < 0) {
                      event.target.value = 0;
                    }
                    handlePaymentInfoChange(event, 0, index);
                  }}
                />
                {errors.map((error, index) => {
                  if (error.field === `donations[0].paymentInfo[${index}].amount`) {
                    return (
                      <div key={index} className="error-message red-text">
                        {error.message}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                Payment Date <span className="red-text">*</span>
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="paymentDate"
                  placeholder="Payment Date"
                  type="date"
                  value={donations[0]?.paymentInfo[index]?.paymentDate}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
                {errors.map((error, index) => {
                  if (
                    error.field === `donations[0].paymentInfo[${index}].paymentDate`
                  ) {
                    return (
                      <div key={index} className="error-message red-text">
                        {error.message}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                Total Amount <span className="red-text">*</span>
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="totalAmount"
                  placeholder="Total Amount"
                  type="Number"
                  value={donations[0]?.paymentInfo[index]?.totalAmount}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
                {errors.map((error, index) => {
                  if (
                    error.field === `donations[0].paymentInfo[${index}].paymentDate`
                  ) {
                    return (
                      <div key={index} className="error-message red-text">
                        {error.message}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                {" "}
                Payment Status <span className="red-text">*</span>
              </div>
              <div className="col-8 p0">
                <select
                  name="paymentStatus"
                  className=" form-control-inside form-select"
                  value={donations[0]?.paymentInfo[index]?.paymentStatus}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                >
                  <option disabled selected value="">
                    Select
                  </option>
                  {PAYMENT_STATUS.map((mode) => {
                    return (
                      <option key={mode.value} value={mode.value}>
                        {mode.label}
                      </option>
                    );
                  })}
                </select>
                {errors.map((error, index) => {
                  if (
                    error.field === `donations[0].paymentInfo[${index}].paymentStatus`
                  ) {
                    return (
                      <div key={index} className="error-message red-text">
                        {error.message}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>  
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                Receipt Date <span className="red-text">*</span>
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="receiptDate"
                  placeholder="Receipt Date"
                  type="date"
                  value={donations[0]?.paymentInfo[index]?.receiptDate}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
                {errors.map((error, index) => {
                  if (
                    error.field === `donations[0].paymentInfo[${index}].receiptDate`
                  ) {
                    return (
                      <div key={index} className="error-message red-text">
                        {error.message}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
          {
           donations[0]?.paymentInfo[index]?.paymentMode === BANK_TRANSFER || donations[0]?.paymentInfo[index]?.paymentMode === CHEQUE ? 
          <>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                Received Amount <span className="red-text">*</span>
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="receivedAmount"
                  placeholder="Received Amount"
                  type="Number"
                  value={donations[0]?.paymentInfo[index]?.receivedAmount}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
                {errors.map((error, index) => {
                  if (
                    error.field === `donations[0].paymentInfo[${index}].receivedAmount`
                  ) {
                    return (
                      <div key={index} className="error-message red-text">
                        {error.message}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
          </>
          :<></>
        }
          

          {/* optional fields */}

          {
           donations[0]?.paymentInfo[index]?.paymentMode === BANK_TRANSFER ? 
          <>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                Bank Charge
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="bankCharge"
                  placeholder="Bank Charge"
                  type="Number"
                  value={donations[0]?.paymentInfo[index]?.bankCharge}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
                
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                Document Number
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="documentNumber"
                  placeholder="Document Number"
                  type="text"
                  value={donations[0]?.paymentInfo[index]?.documentNumber}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
    
              </div>
            </div>
          </div>
           
          </>
          :<></>
        }

         

          {
           donations[0]?.paymentInfo[index]?.paymentMode ===  DEMAND_DRAFT || donations[0]?.paymentInfo[index]?.paymentMode === BANK_TRANSFER || donations[0]?.paymentInfo[index]?.paymentMode === CHEQUE  ? 
          <><div className="col-6">   
          <div className="row select-label">
            <div className="col-4 ">
              {" "}
              Bank Name
            </div>
            <div className="col-8 p0">
              <select
                name="bankName"
                className=" form-control-inside form-select"
                value={donations[0]?.paymentInfo[index]?.bankName}
                onChange={(event) => handlePaymentInfoChange(event, 0, index)}
              >
                <option disabled selected value="">
                  Select
                </option>
                {bankList.map((mode) => {
                  return (
                    <option key={mode.id} value={mode.bankName}>
                      {mode.bankName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row select-label">
            <div className="col-4 ">
              Bank Address
            </div>
            <div className="col-8 p0">
              <input
                className="form-control-inside"
                name="bankAddress"
                placeholder="Received Amount"
                type="text"
                value={donations[0]?.paymentInfo[index]?.bankAddress}
                onChange={(event) => handlePaymentInfoChange(event, 0, index)}
              />
            </div>
          </div>
        </div></>
          :<></>
        }

        {
           donations[0]?.paymentInfo[index]?.paymentMode === (BANK_TRANSFER || ONLINE) ? 
          <>
           <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                Transaction Number
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="orderId"
                  placeholder="Transaction Number"
                  type="text"
                  value={donations[0]?.paymentInfo[index]?.orderId}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
              </div>
            </div>
          </div> 
          </>
          :<></>
        }

         {/* cheque */}
         {
           donations[0]?.paymentInfo[index]?.paymentMode === CHEQUE ? 
          <>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
              cheque number
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="chequeNumber"
                  placeholder="Cheque Number"
                  type="text"
                  value={donations[0]?.paymentInfo[index]?.chequeNumber}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
              
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
              cheque date
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="chequeDate"
                  placeholder="Cheque Date"
                  type="Date"
                  value={donations[0]?.paymentInfo[index]?.chequeDate}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
                
              </div>
            </div>
          </div>
          </>
          :<></>
        }

        {/* Demand Draft */}
        {
           donations[0]?.paymentInfo[index]?.paymentMode === DEMAND_DRAFT ? 
          <>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
              DD number
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="demandDraftNumber"
                  placeholder="DD Number"
                  type="text"
                  value={donations[0]?.paymentInfo[index]?.demandDraftNumber}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
                
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
              DD date
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="demandDraftDate"
                  placeholder="Demand Draft Date"
                  type="Number"
                  value={donations[0]?.paymentInfo[index]?.demandDraftDate}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
                
              </div>
            </div>
          </div>
          </>
          :<></>
        }

        {/* creditCard */}
        {
           donations[0]?.paymentInfo[index]?.paymentMode === CREDIT_CARD ? 
          <>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
              credit card number
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="creditCardNumber"
                  placeholder="Credit Card Number"
                  type="text"
                  value={donations[0]?.paymentInfo[index]?.creditCardNumber}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
                
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
              expiry
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="cardExpiry"
                  placeholder="Expiry"
                  type="text"
                  value={donations[0]?.paymentInfo[index]?.cardExpiry}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
              name on card
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="cardHolderName"
                  placeholder="Name on Card"
                  type="Number"
                  value={donations[0]?.paymentInfo[index]?.cardHolderName}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
                
              </div>
            </div>
          </div>
          </>
          :<></>
        }
         
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                Deposit Number
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="depositNumber"
                  placeholder="Deposit Number"
                  type="text"
                  value={donations[0]?.paymentInfo[index]?.depositNumber}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
              </div>
            </div>
          </div> 
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                Deposit Date
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="depositDate"
                  placeholder="Deposit Date"
                  type="date"
                  value={donations[0]?.paymentInfo[index]?.depositDate}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
              </div>
            </div>
          </div> 
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                Receipt Number 
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="receiptNumber"
                  placeholder="Receipt Number"
                  type="text"
                  value={donations[0]?.paymentInfo[index]?.receiptNumber}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
              </div>
            </div>
          </div> 
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
              realization date
              </div>
              <div className="col-8 p0">
                <input
                  className="form-control-inside"
                  name="realizationDate"
                  placeholder="realizationDate"
                  type="date"
                  value={donations[0]?.paymentInfo[index]?.realizationDate}
                  onChange={(event) => handlePaymentInfoChange(event, 0, index)}
                />
              </div>
            </div>
          </div>   
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;

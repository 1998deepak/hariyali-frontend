import React from "react";

const PackageDetails = ({
  packageData,
  setPackageData,
  calculateOverallTotal,
  disabled
}) => {

    const handleChangeNumberOfBouquets = (e, row, rowIndex) => {
        let { name, value } = e.target;
        // if( value <= 0){
        //   value = 1;
        // }
        if(value){
          if(value < 1){
            value = 1;
          }
        }
        console.log({ name, value, rowIndex }, row);
        let userPackageData = packageData;
        if(value > 1000000){
          userPackageData[rowIndex][name] = 1000000;
        }else{
          userPackageData[rowIndex][name] =  Math.trunc(value);
        }
        const totalCost = 450 * row.noOfBouquets;
        userPackageData[rowIndex]["amount"] = totalCost;
        setPackageData(userPackageData);
        calculateOverallTotal(userPackageData);
      };

  return (
    <>
      <div className="actionheadingdiv">{disabled ? <></>:<>SELECT NUMBER</>} OF SAPLINGS</div>
      <div className="mt20">
        <table>
          <colgroup>
            <col width="40%" />
            <col width="30%" />
            <col width="30%" />
          </colgroup>
          <thead>
            <tr>
              <th>Cost per Sapling</th>
              <th >Number of Saplings</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, index) => {
              return (
                <tr key={index}>
                  <td>INR 450</td>
                  {/* <td>{packageItem.maintenanceCost}</td> */}
                  <td>
                    <input
                      type="number"
                      name="noOfBouquets"
                      className="form-control-inside bouquets-field"
                      value={packageItem.noOfBouquets}
                      onChange={(event) => {
                        // if (event.target.value < 0) {
                        //   event.target.value = 0;
                        // }
                        handleChangeNumberOfBouquets(event, packageItem, index);
                      }}
                      max={1000000}
                      disabled={disabled}
                    />
                  </td>
                  <td>INR {packageItem.amount === 0 ? " ":packageItem.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="overalltotal fw-bold">
          Overall Total : INR{" "}{packageData[0].amount=== 0 ? " ": packageData[0].amount}
        </div>
      </div>
    </>
  );
};

export default PackageDetails;

import React from "react";

const PackageDetails = ({
  packageData,
  setPackageData,
  calculateOverallTotal,
}) => {

    const handleChangeNumberOfBouquets = (e, row, rowIndex) => {
        let { name, value } = e.target;
        console.log({ name, value, rowIndex }, row);
        let userPackageData = packageData;
        if(value > 1000000){
          userPackageData[rowIndex][name] = 1000000;
        }else{
          userPackageData[rowIndex][name] = value;
        }
        const totalCost = 450 * row.noOfBouquets;
        userPackageData[rowIndex]["amount"] = totalCost;
        setPackageData(userPackageData);
        calculateOverallTotal(userPackageData);
      };

  return (
    <>
      <div className="actionheadingdiv">Select Your Donation Plan</div>
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
              <th >No. Sapling</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, index) => {
              return (
                <tr key={index}>
                  <td>450</td>
                  {/* <td>{packageItem.maintenanceCost}</td> */}
                  <td>
                    <input
                      type="number"
                      name="noOfBouquets"
                      className="form-control-inside bouquets-field"
                      value={packageItem.noOfBouquets}
                      onChange={(event) => {
                        if (event.target.value < 0) {
                          event.target.value = 0;
                        }
                        handleChangeNumberOfBouquets(event, packageItem, index);
                      }}
                      max={1000000}
                    />
                  </td>
                  <td>{packageItem.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="overalltotal fw-bold">
          Overall Total : INR{" "}{packageData[0].amount}
        </div>
      </div>
    </>
  );
};

export default PackageDetails;

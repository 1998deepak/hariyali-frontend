import React, { useEffect } from "react";
import { DonationService } from "../../services/donationService/donation.service";
import { SUCCESS } from "../constants/constants";
import { toast } from "react-toastify";

const PackageDetails = ({
  packageData,
  setPackageData,
  calculateOverallTotal,
  initialPackageData,
  donations,
  setLoading
}) => {

    useEffect(() => {
        //getAllPackages();
      }, []);
    
      const getAllPackages = async () => {
        setLoading(true);
        const response = await DonationService.getAllPackages();
        if (response?.status === SUCCESS) {
          console.log(response);
          let packageData = [...initialPackageData];
          console.log(packageData);
          const parsedData = JSON.parse(response.data);
          let data = parsedData.map((item) => ({
            bouquetPrice: item.bouquet_price,
            noOfBouquets: 1,
            amount: item.bouquet_price,
          }));
          setPackageData(data);
          calculateOverallTotal(data);
          setLoading(false);
        } else {
          toast.error(response?.message);
          setLoading(false);
        }
      };

      

    const handleChangeNumberOfBouquets = (e, row, rowIndex) => {
        let { name, value } = e.target;
        console.log({ name, value, rowIndex }, row);
        let userPackageData = packageData;
        userPackageData[rowIndex][name] = value;
        const totalCost = 450 * row.noOfBouquets;
        userPackageData[rowIndex]["amount"] = totalCost;
        setPackageData(userPackageData);
        calculateOverallTotal(packageData);
        console.log(userPackageData[0].amount);
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
                      className="form-control-inside"
                      value={packageItem.noOfBouquets}
                      onChange={(event) => {
                        if (event.target.value < 0) {
                          event.target.value = 0;
                        }
                        handleChangeNumberOfBouquets(event, packageItem, index);
                      }}
                    />
                  </td>
                  <td>{packageItem.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="overalltotal">
          Overall Total : {packageData[0].amount}
        </div>
      </div>
    </>
  );
};

export default PackageDetails;

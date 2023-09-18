import { MultiSelect } from "primereact/multiselect";
import React, { useState, useEffect } from "react";

export default function MultiSelectDropdown() {
  const [selectedCities, setSelectedCities] = useState(null);
  const [selectedCities1, setSelectedCities1] = useState(null);
  const [selectedCities2, setSelectedCities2] = useState(null);
  const [selectedCities3, setSelectedCities3] = useState(null);

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const cities1 = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const cities2 = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const cities3 = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
 
  return (
    <>
      <div className="row">
        <div className="col-md-2">
          <div className="card p-multiselectCard">
            <MultiSelect
              value={selectedCities}
              onChange={(e) => setSelectedCities(e.value)}
              options={cities}
              optionLabel="name"
              filter
              placeholder="Season Plot"
              maxSelectedLabels={3}
              className="w-full "
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="card p-multiselectCard">
            <MultiSelect
              value={selectedCities1}
              onChange={(e) => setSelectedCities1(e.value)}
              options={cities1}
              optionLabel="name"
              filter
              placeholder="District Name"
              maxSelectedLabels={3}
              className="w-full"
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="card p-multiselectCard">
            <MultiSelect
              value={selectedCities2}
              onChange={(e) => setSelectedCities2(e.value)}
              options={cities2}
              optionLabel="name"
              filter
              placeholder="Plantation Year"
              maxSelectedLabels={3}
              className="w-full"
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="card">
            <MultiSelect
              value={selectedCities3}
              onChange={(e) => setSelectedCities3(e.value)}
              options={cities3}
              optionLabel="name"
              filter
              placeholder="Status"
              maxSelectedLabels={3}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

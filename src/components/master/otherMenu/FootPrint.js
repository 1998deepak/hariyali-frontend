import React from "react";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import footprintimg from "../../../assets/img/footprint.png";
import { Container, Row } from "react-bootstrap";
import { GoLocation } from "react-icons/go";

function FootPrint() {

  return (
    <>
      {/* body */}
      <div className="pt100">
        {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
        <div className="section-footprint bggray">
          <Container className="pt30">
            <Row className="justify-content-between  padding30tb contact-form-wrap">
              <div className="otherbotmborder"><div className="otherpages-heading">Footprint </div>
              </div>
              <div className="footprint-divimg">
                <img src={footprintimg} alt="Footprint" />
                <div className="footprint-divtext footprint-divtext1">
                  <div className="tooltip-footprint footprint-tooltip-divtext"><GoLocation />Araku
                    {/* <span className="tooltip-footprinttext">Monsoon plantation
                    <br /> Months - June to September</span> */}
                    <span className="tooltip-footprinttext">Araku Valley is located in the tribal region which is under the jurisdiction of the ITDA Paderu (Integrated Tribal Development Agency) Paderu falling in Alluri Sitharama Raju district, Andhra Pradesh. We are working in 723 villages spread across 5 mandals impacting over 1,20,000 farmer families.</span>
                  </div></div>
                <div className="footprint-divtext footprint-divtext2">
                  <div className="tooltip-footprint footprint-tooltip-divtext"><GoLocation />Shravasti, Uttar Pradesh
                    {/* <span className="tooltip-footprinttext">Monsoon plantation
                    <br /> Months - June to September<br />
                  Winter plantation
                  <br /> Months - Nov to March</span> */}
                    <span className="tooltip-footprinttext">Shravasti is situated 175 kms from state capital Lucknow. According to the Government of India, it is among the 121 minority- concentrated district in India. The 2018 Niti Aayog Ranking puts it at fourth most backward district in India. We are currently working in 65 villages in Sirsia block.</span>
                  </div></div>
                <div className="footprint-divtext footprint-divtext3">
                  <div className="tooltip-footprint footprint-tooltip-divtext"><GoLocation />Tarn Taran, Punjab
                    {/* <span className="tooltip-footprinttext">Monsoon plantation
                  <br /> Months - June to September
                  <br />
                  Winter plantation
                  <br /> Months - Nov to March</span> */}
                    <span className="tooltip-footprinttext">Tarn Taran Sahib is a city in the state of Punjab, Northern India. The main occupation in this area is agriculture and agro industry with very few other industries. We are currently working in 50 villages in 5 districts. In Tarn Taran, 60% farmers belong to SC category and 32% farmers belong to other backward classes.</span>
                  </div></div>
                <div className="footprint-divtext footprint-divtext4">
                  <div className="tooltip-footprint footprint-tooltip-divtext"><GoLocation />Solan, Himachal Pradesh
                    {/* <span className="tooltip-footprinttext">Monsoon plantation
                  <br /> Months - June to September<br />
                  Winter plantation
                  <br /> Months - Nov to March</span> */}
                    <span className="tooltip-footprinttext">The project is proposed to be located in Solan district, of Himachal Pradesh, located 46
                      kilometres south of the state capital, Shimla. It is 70 kilometres from Chandigarh.
                      Solan is a predominantly rural district with less than 20% of the population living in urban
                      areas.<br />
                      However, in recent years, these forest resources are experiencing severe stress with
                      increasing pressure from the burgeoning population and rising impact of human
                      commercial activities.</span>
                  </div></div>
                <div className="footprint-divtext footprint-divtext6">
                  <div className="tooltip-footprint footprint-tooltip-divtext"><GoLocation />Moga Punjab
                    {/* <span className="tooltip-footprinttext">Monsoon plantation
                  <br /> Months - June to September</span> */}
                    <span className="tooltip-footprinttext">Moga lies in the state of Punjab. The total rural population is almost 80 percent, 20% being the urban population. We are currently working in 50 villages in 3 districts. In Moga, 60% farmers belong to SC category and 32% farmers belong to other backward classes.</span>
                  </div></div>
                <div className="footprint-divtext footprint-divtext7">
                  <div className="tooltip-footprint footprint-tooltip-divtext"><GoLocation />Wardha, Maharashtra
                    {/* <span className="tooltip-footprinttext">Winter plantation
                  <br /> Months - Nov to March</span> */}
                    <span className="tooltip-footprinttext">Wardha district is one of the 35 districts in western India. It is an agricultural district and 67% of the population is part of the rural belt.</span>
                  </div></div>
              </div>

            </Row>
          </Container>
        </div>   </div>



      {/* body */}
    </>
  );
}

export default FootPrint;

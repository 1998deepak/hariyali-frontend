import React from "react";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import footprintimg from "../../../assets/img/footprint.png";
import { Container, Row } from "react-bootstrap";
import { GoLocation } from "react-icons/go";
import image from "../../../assets/img/bannerWherearewe.png";

function FootPrint() {

  return (
    <>
      {/* body */}
      <section className="banner banner-footprint">
            <div className="title">
                {/* <h1>Ways to Associate</h1> */}
            </div>
        </section>
      {/* <div>
            <img src = {image} className="imgwidth100"/>
          </div> */}
      <div className="">
        {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
        <div className="section-footprint bggray">
          <Container className="pt30">
            <Row className="justify-content-between  padding30tb contact-form-wrap">
              <div className="otherbotmborder"><div className="otherpages-heading text-center sub-title">Footprint </div>
              </div>
              <div className="footprint-divimg">
                <img src={footprintimg} alt="Footprint" />
                <div className="footprint-divtext footprint-divtext1">
                  <div className="tooltip-footprint footprint-tooltip-divtext"><GoLocation />Araku
                    {/* <span className="tooltip-footprinttext">Monsoon plantation
                    <br /> Months - June to September</span> */}
                    <span className="tooltip-footprinttext">Araku, nestled in the north-west region of Andhra Pradesh, is dominated entirely by
                      Scheduled Tribe farmers (over 90%) and has been characterized by poor infrastructure,
                      dismal connectivity, low women’s literacy rates, high infant and maternal mortality and
                      low agricultural productivity. The forest lands (accounting for nearly 60% of the total
                      geographical area – Census 2011), which was the only source of income, were also
                      degraded, reducing the overall efficiency of land. Certain Mandals such as Munchingputtu
                      had nearly 28% of the total geographical area being barren and uncultivable land
                      (Handbook of Statistics, Visakhapatnam).</span>
                  </div></div>
                <div className="footprint-divtext footprint-divtext2">
                  <div className="tooltip-footprint footprint-tooltip-divtext"><GoLocation />Shravasti, Uttar Pradesh
                    {/* <span className="tooltip-footprinttext">Monsoon plantation
                    <br /> Months - June to September<br />
                  Winter plantation
                  <br /> Months - Nov to March</span> */}
                    <span className="tooltip-footprinttext">Bhinga, the district headquarters of Shravasti, is approximately 175 kilometres away from
                      the state capital, Lucknow. Shravasi, is the north-eastern Uttar Pradesh district near River
                      Rapti.<br />
                      According to the Government of India, it is among the 121 minority-concentrated districts in
                      India.[1] It is the fourth most backward district in India, according to the 2018 Niti
                      Aayog ranking.[2].</span>
                  </div></div>
                <div className="footprint-divtext footprint-divtext3">
                  <div className="tooltip-footprint footprint-tooltip-divtext"><GoLocation />Tarn Taran
                    {/* <span className="tooltip-footprinttext">Monsoon plantation
                  <br /> Months - June to September
                  <br />
                  Winter plantation
                  <br /> Months - Nov to March</span> */}
                    <span className="tooltip-footprinttext">Bhinga, the district headquarters of Shravasti, is approximately 175 kilometres away from
                      the state capital, Lucknow. Shravasi, is the north-eastern Uttar Pradesh district near River
                      Rapti.<br />
                      According to the Government of India, it is among the 121 minority-concentrated districts in
                      India.[1] It is the fourth most backward district in India, according to the 2018 Niti
                      Aayog ranking.[2].</span>
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
                <div className="footprint-divtext footprint-divtext5">
                  <div className="tooltip-footprint footprint-tooltip-divtext"><GoLocation />Moga Punjab
                    {/* <span className="tooltip-footprinttext">Monsoon plantation
                  <br /> Months - June to September</span> */}
                    <span className="tooltip-footprinttext">Moga is in the Indian state of Punjab.<br />
                      The total rural population is almost 80 percent whereas the urban population is
                      about 20 percent.</span>
                  </div></div>
                {/* -------------------- */}
                <div className="footprint-divtext footprint-divtext6">
                  <div className="tooltip-footprint footprint-tooltip-divtext"><GoLocation />Tarn Taran, Punjab
                    {/* <span className="tooltip-footprinttext">Winter plantation
                  <br /> Months - Nov to March</span> */}
                    <span className="tooltip-footprinttext">Tarn Taran Sahib is a city in the state of Punjab, in far northern India. The main
                      occupation in this area is agriculture and agro industry with very few other
                      industries.</span>
                  </div></div>
                <div className="footprint-divtext footprint-divtext7">
                  <div className="tooltip-footprint footprint-tooltip-divtext"><GoLocation />Wardha, Maharashtra
                    {/* <span className="tooltip-footprinttext">Winter plantation
                  <br /> Months - Nov to March</span> */}
                    <span className="tooltip-footprinttext">Wardha district is one of the 35 districts in Western India. It is an agricultural district and
                      67% of the population is part of the rural belt.</span>
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

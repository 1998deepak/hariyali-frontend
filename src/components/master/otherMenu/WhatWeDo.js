import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaSearchLocation, FaEdit, FaCalendarAlt, FaWpforms, FaRegUserCircle, FaStar, FaTree, FaUsers, FaCogs, FaCannabis } from "react-icons/fa";
import whatwe1 from "../../../assets/img/whatwe1.jpg";
import whatwe2 from "../../../assets/img/whatwe2.jpg";
import processImg from "../../../assets/img/process.jpg";
import step2Img from "../../../assets/img/pr-step2.png";
import step3Img from "../../../assets/img/pr-step3.png";
import step4Img from "../../../assets/img/pr-step4.png";
import step5Img from "../../../assets/img/pr-step5.png";

import monsoonImg from "../../../assets/img/plant-that-is-growing-dirt.jpg";
import winterImg from "../../../assets/img/winter.jpg";


function WhatWeDo() {

  return (
    <>
      <section className="banner banner-wedo">
        <div className="title">
          {/* <h1>What We Do</h1> */}
        </div>
      </section>
      <div className="">
        {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
       
          <Container className="pv-75">
            <div className="feature-description feature-description-other">
              <h2 className="sub-title text-center">What We Do</h2>
              <p>Project Hariyali aims to increase green cover, arrest the rising ecological imbalance, enhance biodiversity, restore the functional forest, and in the process support livelihoods of marginalized farmers. The trees we plant strengthen the ecosystem and enhance ecological diversity.</p>
            </div>
          </Container>
          <section className="bg-green"> <div className="container">
            <Row className="justify-content-between align-items-center">
              <div className="col-12 feature-description">
                <h2 className="sub-title text-center">Approach</h2>
                <p className="text-center">
                  We have two seasons for plantation Monsoon and Winter. Each Year, we follow a systematic plantation process so that survival rate is high.</p>
                <div className="row justify-content-center mt-5">
                  <div className="col-12 col-md-6">
                    <div className="card plantation-card h-100">
                      <div className="row g-0 h-100">
                        <div className="col-md-5">
                          <img src={monsoonImg} className="card-img-top h-100" alt="..." />
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h5 className="card-title text-center">Monsoon <span>(Jun - Sep)</span></h5>
                            <p className="card-text">
                              The Monsoon plantation, start in September of the previous financial year, giving our team 7-8 months of lead time to select and nurture the saplings.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="card plantation-card h-100">
                      <div className="row g-0 h-100">
                        <div className="col-md-5">
                          <img src={winterImg} className="card-img-top h-100" alt="..." />
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h5 className="card-title text-center">Winter <span>(Nov - Jan)</span></h5>
                            <p className="card-text">The Winter plantation, the process starts by September and saplings are planted from November to January of the same financial year.</p>
                          </div>
                        </div>
                      </div>
                      {/* <i className="icon-monsoon"></i> */}

                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-5">
                <div className="">
                </div>
              </div>
            </Row></div></section>
        <div className="container mt-5">
          <h2 className="sub-title text-center">Planting Process</h2>
          <div className="process-image">
            <img src={processImg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default WhatWeDo;

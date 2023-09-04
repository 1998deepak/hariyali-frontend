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

import monsoonImg from "../../../assets/img/monsoon.jpg";
import winterImg from "../../../assets/img/winter.jpg";
 

function WhatWeDo() {

  return (
    <>
      <section className="banner banner-wedo">
        <div className="title">
          {/* <h1>What we do</h1> */}
        </div>
      </section>
      <div className="">
        {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
        <div className="section bg-green">
          <Container className="pv-75">
            <div className="feature-description">
              <h2 className="sub-title text-center">What We Do</h2>
              <p>Project Hariyali is a unique blend in the sphere of environmental sustainability and impacting livelihood.
The project focusses on large scale tree plantation, natural resource management, global regenerative organic farming protocols to enrich agricultural eco-system and build functional forests as means to improve overall wellbeing of communities. The trees we plant strengthen the ecosystem and enhance ecological diversity.</p>
            </div>
            <Row className="justify-content-between align-items-center">
              <div className="col-12 feature-description">
              <h2 className="sub-title text-center">Approach</h2>
              <p className="text-center">We have two season for plantation</p>
              <div className="row justify-content-center mt-5">
                      <div className="col-12 col-md-6">
                          <div className="card plantation-card h-100">
                          <div className="row g-0 h-100">
                            <div className="col-md-4">
                              <img src={monsoonImg} className="card-img-top h-100" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title text-center">Monsoon <span>(Jun - Sep)</span></h5>
                                  <p className="card-text">
                                  Each year, we follow a systematic planting process. For Monsoon plantation, this process starts in September of the previous financial year, giving our team 9-10 months of lead time to select and nurture the saplings so that the survival rates after plantation are high
                                  </p>
                              </div>
                            </div>
                            </div>
                          </div>
                      </div>
                      <div className="col-12 col-md-6">
                          <div className="card plantation-card h-100">
                          <div className="row g-0 h-100">
                            <div className="col-md-4">
                              <img src={winterImg} className="card-img-top h-100"  alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Winter <span>(Nov - Jan)</span></h5>
                                    <p className="card-text">Winter plantation, the process starts by September and saplings are planted from November to January of the same financial year.</p>
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
            </Row>
          </Container>
          </div>
          <div className="container mt-5">
            <h2 className="sub-title text-center">Planting Process</h2>            
            <div className="process-image">
              <img src={processImg} alt=""/>
            </div>              
          </div>
      </div>
    </>
  );
}

export default WhatWeDo;

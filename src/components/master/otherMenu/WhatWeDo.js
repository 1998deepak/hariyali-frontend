import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaSearchLocation, FaEdit, FaCalendarAlt, FaWpforms, FaRegUserCircle, FaStar, FaTree, FaUsers, FaCogs, FaCannabis } from "react-icons/fa";
import whatwe1 from "../../../assets/img/whatwe1.jpg";
import whatwe2 from "../../../assets/img/whatwe2.jpg";
import step1Img from "../../../assets/img/pr-step1.png";
import step2Img from "../../../assets/img/pr-step2.png";
import step3Img from "../../../assets/img/pr-step3.png";
import step4Img from "../../../assets/img/pr-step4.png";
import step5Img from "../../../assets/img/pr-step5.png";
 

function WhatWeDo() {

  return (
    <>
      <section className="banner banner-wedo">
        <div className="title">
          {/* <h1>What we do</h1> */}
        </div>
      </section>
      <div className="pt100">
        {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
        <div className="section bggray">
          <Container className="pt30">
            <Row className="justify-content-between  padding30tb contact-form-wrap">
              <div className="otherbotmborder"><div className="otherpages-heading">What We Do</div>
              </div>
              <div className="otherpages-subheading textupp">Approach for pan India Hariyali Project</div>
              <p>Each year, we follow a systematic planting process.
                <br />
                For Monsoon plantation, this process starts in September of the previous financial year, giving our team 9-10 months of lead time to select and nurture the saplings so that the survival rates after plantation are high. Similarly, for winter plantation, the process starts by September and saplings are planted from November to January of the same financial year.</p>
              <div className="col-12">

                <div className="whatwe-approachdiv">
                  {/* <Row>
                    <div className="col-3 "><div className="whatwe-approach">
                  <p>Large scale tree plantation</p>
                  </div>
                  <div className="whatwe-approachicon"><FaTree /></div>
                  </div>
                  <div className="col-3 "><div className="whatwe-approach">
                  <p>Natural resource management</p>
                  </div>
                  <div className="whatwe-approachicon"><FaCannabis /></div>
                  </div>
                  <div className="col-3 "><div className="whatwe-approach">
                  <p>Global organic farming protocols to support livelihoods of local communities</p>
                  </div>
                  <div className="whatwe-approachicon"><FaUsers /></div>
                  </div>
                  <div className="col-3 "><div className="whatwe-approach">
                  <p>Enriching agricultural eco system and building finctional forests</p>
                  </div>
                  <div className="whatwe-approachicon"><FaCogs /></div>
                  </div>
                    </Row> */}
                  <img src={whatwe1} alt="what we do" />
                </div>

                {/* <p>
                  <br />This process starts in the September of previous year, giving our teams a total of 10 months for timely planting in June, year on year. </p>
                <div className="whatwe-heading">
                  The steps below summarise the said process:
                </div>
                <div className="whatwedo2img">
                  <img src={whatwe2} alt="what we do" />
                </div> */}
              </div>
            </Row>
          </Container>
          <div className="container-xxxl">
            <h2 className="sub-title text-center">Planting Process</h2>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="row align-items-center">
                  <div className="col-12 col-md-2">
                      <ul className="nav nav-tabs nunav border-0 d-flex flex-row flex-xl-column justify-content-xl-between steps-nav">
                        <li className="nav-item py-4 py-xl-3">
                          <a ></a>
                        </li>
                        <li className="nav-item py-4 py-xl-3">
                          <a ></a>
                        </li>
                        <li className="nav-item py-4 py-xl-3">
                          <a ></a>
                        </li>
                        <li className="nav-item py-4 py-xl-3">
                          <a ></a>
                        </li>
                        <li className="nav-item py-4 py-xl-3">
                          <a ></a>
                        </li>
                      </ul>
                  </div>
                  <div className="col-12 col-md-10">
                    <div className="steps-description">
                      <div className="">
                        <h3>Step 1</h3>
                        <div className="step-image">
                          <img src={step1Img} alt="" width={100} height={250}/>
                        </div>
                        {/* <p>Thinnings are carried out in accordance with the specifications of the sustainable management plan, to encourage the growth of future stems.</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-12 col-md-1"></div> */}
              <div className="col-12 col-md-6">
                <div className="row align-items-center">
                  <div className="col-12 col-md-2">
                      <ul className="nav nav-tabs nunav border-0 d-flex flex-row flex-xl-column justify-content-xl-between steps-nav">
                        <li className="nav-item py-4 py-xl-3">
                          <a ></a>
                        </li>
                        <li className="nav-item py-4 py-xl-3">
                          <a ></a>
                        </li>
                        <li className="nav-item py-4 py-xl-3">
                          <a ></a>
                        </li>
                        <li className="nav-item py-4 py-xl-3">
                          <a ></a>
                        </li>
                        <li className="nav-item py-4 py-xl-3">
                          <a ></a>
                        </li>
                      </ul>
                  </div>
                  <div className="col-12 col-md-10">
                    <div className="steps-description">
                      <div className="">
                        <h3>Step 1</h3>
                        <div className="step-image">
                          <img src={step1Img} alt="" width={100} height={250}/>
                        </div>
                        {/* <p>Thinnings are carried out in accordance with the specifications of the sustainable management plan, to encourage the growth of future stems.</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img scr={step1Img} alt="" width={100}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhatWeDo;

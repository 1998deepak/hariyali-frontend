import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaSearchLocation, FaEdit, FaCalendarAlt, FaWpforms, FaRegUserCircle, FaStar, FaTree, FaUsers, FaCogs, FaCannabis } from "react-icons/fa";
import whatwe1 from "../../../assets/img/whatwe1.jpg";
import whatwe2 from "../../../assets/img/whatwe2.jpg";
import whatwe3 from "../../../assets/img/whatWeDo.png";
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

                <p>
                  <br />This process starts in the September of previous year, giving our teams a total of 10 months for timely planting in June, year on year. </p>
                <div className="whatwe-heading">
                  The steps below summarise the said process:
                </div>
                <div className="whatwedo2img">
                  <img src={whatwe2} alt="what we do" />
                </div>
              </div>
            </Row></Container>
        </div>
      </div>
    </>
  );
}

export default WhatWeDo;

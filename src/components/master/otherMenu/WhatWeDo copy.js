import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaSearchLocation, FaEdit, FaCalendarAlt, FaWpforms, FaRegUserCircle, FaStar, FaTree, FaUsers, FaCogs, FaCannabis } from "react-icons/fa";
import whatwe1 from "../../../assets/img/whatwe1.jpg";
function WhatWeDo() {

  return (
    <>
      <div className="pt100">
        {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
        <div className="section bggray">
          <Container className="pt30">
            <Row className="justify-content-between  padding30tb contact-form-wrap">
              <div className="otherbotmborder"><div className="otherpages-heading">What We Do</div>
              </div>
              <div className="otherpages-subheading textupp">Approach for pan India Hariyali Project</div>
              <p>Each year, we follow a systematic planting process.
<br/>
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
                  <br/>This process starts in the September of previous year, giving our teams a total of 10 months for timely planting in June, year on year. </p>
                <div className="whatwe-heading">
                  The steps below summarise the said process:
                </div>
                <VerticalTimeline>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(35, 170, 74)' }}
                    contentArrowStyle={{ borderRight: '7px solid rgb(35, 170, 74)' }}
                    date="STEP 01"
                    iconStyle={{ background: 'rgb(35, 170, 74)', color: '#fff' }}
                    icon={<FaSearchLocation />}
                  >
                    <h3 className="vertical-timeline-element-title">Identify Location</h3>
                    {/* <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4> */}
                    <p>Based on the field team's assessment of farmer requirements, mandals were identified. 122 villages for finalised for 2020-21 planting.
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(157, 159, 162)' }}
                    contentArrowStyle={{ borderRight: '7px solid rgb(157, 159, 162)' }}
                    date="STEP 02"
                    iconStyle={{ background: 'rgb(157, 159, 162)', color: '#fff' }}
                    icon={<FaEdit />}
                  >
                    <h3 className="vertical-timeline-element-title">Farmer requirement</h3>
                    {/* <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4> */}
                    <p>
                      A need assessment survey was conducted to understand each farmer's requirement.
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(35, 170, 74)' }}
                    contentArrowStyle={{ borderRight: '7px solid rgb(35, 170, 74)' }}
                    date="STEP 03"
                    iconStyle={{ background: 'rgb(35, 170, 74)', color: '#fff' }}
                    icon={<FaCalendarAlt />}
                  >
                    <h3 className="vertical-timeline-element-title">Planting Plan </h3>
                    {/* <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4> */}
                    <p>Araku farmers and our in-house experts came together to create a suitable plan and finalise type of species, feasibility, etc.
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(157, 159, 162)' }}
                    contentArrowStyle={{ borderRight: '7px solid rgb(157, 159, 162)' }}
                    date="STEP 04"
                    iconStyle={{ background: 'rgb(157, 159, 162)', color: '#fff' }}
                    icon={<FaWpforms />}
                  >
                    <h3 className="vertical-timeline-element-title">Sapling procurement</h3>
                    {/* <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4> */}
                    <p> a) Certified seeds - Coffee Board of India, seedlings raised at a central nursery and saplings raised by individual farmers.
                      <br />
                      b)FFS - Kadiyam nurseries that are reqularly monitored by our experts.
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={{ background: 'rgb(35, 170, 74)' }}
                    contentArrowStyle={{ borderRight: '7px solid rgb(35, 170, 74)' }}
                    date="STEP 05"
                    iconStyle={{ background: 'rgb(35, 170, 74)', color: '#fff' }}
                    icon={<FaRegUserCircle />}
                  >
                    <h3 className="vertical-timeline-element-title">Farmer skilling</h3>
                    {/* <h4 className="vertical-timeline-element-subtitle">Online Course</h4> */}
                    <p>
                      Progressive farmer from each village are trained on the importance of different species in coffee farms, how to plant saplings & how to care for them.
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    iconStyle={{ background: 'rgb(157, 159, 162)', color: '#fff' }}
                    icon={<FaStar />}
                  />
                </VerticalTimeline>
              </div>
            </Row></Container>
        </div>
      </div>
    </>
  );
}

export default WhatWeDo;

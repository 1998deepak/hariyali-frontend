import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import { Carousel } from "react-bootstrap";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import {
  FaSearchLocation,
  FaEdit,
  FaCalendarAlt,
  FaWpforms,
  FaRegUserCircle,
  FaStar,
  FaTree,
  FaUsers,
  FaCogs,
  FaCannabis,
} from "react-icons/fa";
// import whatwe1 from "../../../assets/img/whatwe1.jpg";
import whatwe2 from "../../../assets/img/whatwe2.jpg";
import processImg1 from "../../../assets/img/process.jpg";
import processImg from "../../../assets/img/calender.png";
import step2Img from "../../../assets/img/pr-step2.png";

import step4Img from "../../../assets/img/pr-step4.png";
import step5Img from "../../../assets/img/pr-step5.png";
import monsoonImg from "../../../assets/img/plant-that-is-growing-dirt.jpg";
import winterImg from "../../../assets/img/winter.jpg";
// plant name
import ramphal from "../../../assets/img/plantName/rampahl.png";
import Breadfruit from "../../../assets/img/plantName/Breadfruit.png";
import Annatto from "../../../assets/img/plantName/Annatto.png";
import Lemon from "../../../assets/img/plantName/Lemon.png";
import CoralTree from "../../../assets/img/plantName/CoralTree.png";
import Grapefruit from "../../../assets/img/plantName/Grapefruit.png";
import GloryCedar from "../../../assets/img/plantName/GloryCedar.png";
import Jatrophaspecies from "../../../assets/img/plantName/Jatrophaspecies.png";
import Mahua from "../../../assets/img/plantName/Mahua.png";
import Jamun from "../../../assets/img/plantName/Jamun.png";
import Arjuna from "../../../assets/img/plantName/Arjuna.png";
import Guava from "../../../assets/img/plantName/Guava.png";
import Plum from "../../../assets/img/plantName/Plum.png";
import Apple from "../../../assets/img/plantName/Apple.png";
import Apricot from "../../../assets/img/plantName/Apricot.png";
import Kiwi from "../../../assets/img/plantName/Kiwi.png";
import Pear from "../../../assets/img/plantName/Pear.png";
import Peach from "../../../assets/img/plantName/Peach.png";
import Nectarine from "../../../assets/img/plantName/Nectarine.png";
import Burans from "../../../assets/img/plantName/Burans.png";
import Deodar from "../../../assets/img/plantName/Deodar.png";
import IndianGooseberry from "../../../assets/img/plantName/IndianGooseberry.png";
import Kachnar from "../../../assets/img/plantName/Kachnar.png";
import Mulberry from "../../../assets/img/plantName/Mulberry.png";
import Coffee from "../../../assets/img/plantName/Coffee.png";
// import Nectarine from "../../../assets/img/plantName/Nectarine.png";
// import Nectarine from "../../../assets/img/plantName/Nectarine.png";
import Approach from "../../../assets/img/approch.png";
import VerticalSwiper from "../../common/VerticalSwiper";

function WhatWeDo() {
  const plantname = [
    [
      { img: ramphal, quote: "Ramphal" },
      { img: Breadfruit, quote: "Bread fruit" },
      { img: Annatto, quote: "Annatto" },
      { img: Grapefruit, quote: "Grapefruit" },
      { img: Lemon, quote: "Lemon" },
    ],
    [
      { img: CoralTree, quote: "Coral Tree" },
      { img: GloryCedar, quote: "Glory Cedar" },
      { img: Jatrophaspecies, quote: "Jatropha species" },
      { img: Mahua, quote: "Mahua" },
      { img: Jamun, quote: "Jamun" },
    ],
    [
      { img: Arjuna, quote: "Arjuna" },
      { img: Guava, quote: "Guava" },
      { img: Plum, quote: "Plum" },
      { img: Apple, quote: "Apple" },
      { img: Apricot, quote: "Apricot" },
    ],
    [
      { img: Kiwi, quote: "Kiwi" },
      { img: Pear, quote: "Pear" },
      { img: Peach, quote: "Peach" },
      { img: Nectarine, quote: "Nectarine" },
      { img: Burans, quote: "Burans" },
    ],
    [
      { img: Burans, quote: "Laliguras" },
      { img: Deodar, quote: "Deodar" },
      { img: IndianGooseberry, quote: "Indian Gooseberry" },
      { img: ramphal, quote: "Baheda" },
      { img: ramphal, quote: "Bainj" },
    ],
    [
      { img: Kachnar, quote: "Kachnar" },
      { img: Kachnar, quote: "Rakta Chandan" },
      { img: Mulberry, quote: "Mulberry" },
      { img: ramphal, quote: "Baan" },
      { img: Coffee, quote: "Coffee" },
    ],
  ];
  return (
    <>
      <section className="banner banner-wedo">
        <div className="title">{/* <h1>What We Do</h1> */}</div>
      </section>
      <div className="">
        {/* <img src={planting} alt="planting" className="imgwidth100" /> */}

        <Container className="pv-75">
          <div className="feature-description feature-description-other">
            <h2 className="sub-title text-center">What We Do</h2>
            <p>Project Hariyali aims to increase green cover, arrest the rising ecological imbalance, enhance biodiversity, and restore the functional forest which support livelihood of small holding farmer families. The trees we plant strengthen the ecosystem and enhance ecological diversity. 
            </p>
          </div>
        </Container>
        <section className="bg-green">
          {" "}
          <div className="container">
            <Row className="justify-content-between align-items-center">
              <div className="col-12 feature-description">
                <h2 className="sub-title text-center">Approach</h2>
                <div className="col-10 m-auto approchimg">
                  {" "}
                  <img src={Approach} alt="Approach" />
                </div>
                <h5 className="text-center mt-5">We have two seasons for plantation - Monsoon and Winter. 
                </h5>
                <div className="row justify-content-center mt-5">
                  <div className="col-12 col-lg-6 mb-3">
                    <div className="card plantation-card h-100">
                      <div className="row g-0 h-100">
                        <div className="col-md-5">
                          <img
                            src={monsoonImg}
                            className="card-img-top h-100"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h5 className="card-title text-center">
                              Monsoon <span>(Jun - Sep)</span>
                            </h5>
                            <p className="card-text">
                            The planning for Monsoon plantation starts in the month of November of the previous financial year, giving our team 7-8 months of lead time to select and nurture the saplings before the plantation season begins.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mb-3">
                    <div className="card plantation-card h-100">
                      <div className="row g-0 h-100">
                        <div className="col-md-5">
                          <img
                            src={winterImg}
                            className="card-img-top h-100"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h5 className="card-title text-center">
                              Winter <span>(Nov - Jan)</span>
                            </h5>
                            <p className="card-text">
                            The planning for Winter plantation starts in the month of July, giving our team 4-5 months of lead time to select and nurture the saplings before the plantation season begins.                             </p>
                          </div>
                        </div>
                      </div>
                      {/* <i className="icon-monsoon"></i> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-5">
                <div className=""></div>
              </div>
            </Row>
          </div>
        </section>
        <div className="container mt-5">
          <h2 className="sub-title text-center">Planting Process</h2>
          <p className="text-center">We follow a systematic process which enables us to get a very high survival rate. </p>
          <div className="process-image">
            <img src={processImg1} alt="" />
          </div>
          {/* <VerticalSwiper/> */}
        </div>
          <div className="bg-green">
          <div className="col-12 feature-description">
          <h2 className="sub-title text-center">Plantation Calendar - Monsoon Season</h2>
          <div className="row">
            <div className="col-12 col-md-6">
              <h4 className="text-center">Year 1</h4>
            </div>
            <div className="col-12 col-md-6">
            <h4 className="text-center">Year 2</h4>
            </div>
          </div>
          <div className="process-image">
            <img src={processImg} alt="" />
          </div>
        </div>
        </div>
        {/* ----------plant name */}
        
          <div className="container pv-75">
            {/* <h3 class="text-center my-5 sub-title">Following commemorative artworks are available to choose from</h3> */}
            <h3 class="text-center sub-title">Trees we plant</h3>
            <div className="certificate-slider">
              <Carousel indicators={true}>
                {plantname.map((item, index) => (
                  <Carousel.Item key={index}>
                    <div className="d-flex justify-content-center">
                      {item.map((subItem, subIndex) => (
                        <>
                          <div>
                            {/* <div key={index} className="col-12 col-md-6 mb-3"></div> */}
                            <div key={index} className="plantdiv">
                              <div className="">
                                <img
                                  src={subItem.img}
                                  alt=""
                                  className="plantimg"
                                />

                                <h4 className="plant-text">{subItem.quote}</h4>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        
        {/* plant name */}
        {/* <div className="container mt-5 mb30 ">
          <h2 className="sub-title text-center">Plant names</h2>
          <div className="row g-0 h-100">
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Ramphal</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Bread fruit</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Annatto</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Grapefruit</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Lemon</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Coral Tree</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Glory Ceder</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Jatropa species</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Mahuwa</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Jamun</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Arjuna</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Guava</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Plum</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Apple</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Apricot</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Kiwi</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Pear</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Peach</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Nectarine</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Burans</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Laliguras</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Deodar</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Indian Gooseberry</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Baheda</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Bainj</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Kachnar</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Rakta Chandan</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Mulberry</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Baan</div>
              </div>
            </div>
            <div className="col-md-3 plantdiv">
              <div className="row">
                <div className="col-md-4">
                  <img src={monsoonImg} className="plantimg" alt="..." />
                </div>
                <div className="col-md-8 plant-text">Coffee</div>
              </div>
            </div>

          </div>
        </div> */}
        {/* Percentage */}
        {/* <div className="container">

        
        <div className="feature-description feature-description-other">
                    <h2 className="sub-title  text-center">Contribution</h2>
                      <section id="set-4">
                        <div className="hi-icon-wrap hi-icon-effect-4 hi-icon-effect-4b">
                          <div className="justify-content-center mb-4 row">
                            <div className="col-6 col-md-3 ">
                              <a className="hi-icon hi-icondiv">
                                <div className="percent-div">
                                  <div className="hi-iconimg hi-iconimg-percent">70%</div>
                                  <div className="percentname">Direct Programme</div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-3 ">
                              <a className="hi-icon hi-icondiv">
                                <div className="percent-div">
                                  <div className="hi-iconimg hi-iconimg-percent">20%</div>
                                  <div className="percentname">Project Management & Monitoring</div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-3 ">
                              <a className="hi-icon hi-icondiv">
                                <div className="percent-div">
                                  <div className="hi-iconimg hi-iconimg-percent">10%</div>
                                  <div className="percentname">Administration</div>
                                </div></a>
                            </div>
                          </div>
                        </div>
                      </section>
                  </div>
      </div> */}
      </div>
    </>
  );
}

export default WhatWeDo;

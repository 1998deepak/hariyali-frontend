import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
// import "react-image-gallery/styles/css/image-gallery.css";
// program
import planting from "../../../assets/img/about/hariyali-img-4.jpg";
import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
import downslide from "../../../assets/img/slider/downslide.jpg";
import csr1 from "../../../assets/img/csr1.png";
import csr2 from "../../../assets/img/csr2.png";
import csr3 from "../../../assets/img/csr3.png";
import csr4 from "../../../assets/img/csr4.png";
import csr5 from "../../../assets/img/csr5.png";
// SDG Images
import sdg13 from "../../../assets/img/SDG/sdg13.png";
import sdg15 from "../../../assets/img/SDG/sdg15.png";
import sdg8 from "../../../assets/img/SDG/sdg8.png";
import sdg14 from "../../../assets/img/SDG/sdg14.png";
import sdg17 from "../../../assets/img/SDG/sdg17.png";

import indImg1 from "../../../assets/img/ind1.avif";
import indImg2 from "../../../assets/img/ind2.avif";
import indImg3 from "../../../assets/img/slider/banner2.png";

import monsoonImg from "../../../assets/img/plant-that-is-growing-dirt.jpg";
import winterImg from "../../../assets/img/winter.jpg";
import associateImg from "../../../assets/img/funnel.png";
import freeshImage from "../../../assets/img/fresh-growth-green-plant-nature-beauty-generated-by-ai.jpg";
import freeshImage1 from "../../../assets/img/plant-that-is-growing-dirt.jpg";
import freeshImage2 from "../../../assets/img/hand-holding-pile-soil-with-plant-growing-out-it.jpg";
import freeshImage3 from "../../../assets/img/organic-farm-harvests-fresh-fruit-vegetables-generated-by-ai.jpg";
import freeshImage4 from "../../../assets/img/one-man-holding-freshly-planted-seedling-developing-growth-generated-by-ai.jpg";

import ind1 from "../../../assets/img/ind1.gif";
import ind2 from "../../../assets/img/ind2.gif";
import ind3 from "../../../assets/img/ind3.gif";
// partner
import bristlecone from "../../../assets/img/partner/bristlecone.jpg";
import mahindrafinance from "../../../assets/img/partner/mahindrafinance.jpg";
import mahindrarice from "../../../assets/img/partner/mahindrarice.jpg";

import Festivals from "../../../assets/img/certificate/Festivals.jpg";
import Specialday from "../../../assets/img/certificate/celebrateAward.jpg";
import Achievements from "../../../assets/img/certificate/Achievements.jpg";
import MemorialTribute from "../../../assets/img/certificate/MemorialTribute.jpg";
import Gifting from "../../../assets/img/certificate/gifting.jpg";

function WaystoAssociate() {
  const [activeTab, setActiveTab] = useState("individual");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    console.log(tab);
    if (tab == "corporate") {
      document.getElementById("associate").style.display = "block";
      document.getElementById("plantTree").style.display = "none";
    } else {
      document.getElementById("associate").style.display = "none";
      document.getElementById("plantTree").style.display = "block";
    }
  };
  const Individualsitems = [
    [
      { img: Festivals, quote: "Festivals" },
      { img: Specialday, quote: "Special day" },
      { quote: "Achievements", img: Achievements },
      { quote: "Memorial Tribute", img: MemorialTribute },
      { quote: "Simple Gifting", img: Gifting },
    ],
    // Add more item groups as needed
  ];

  const Patners = [
    [
      { img: bristlecone},
      { img: mahindrafinance},
      { img: mahindrarice },
    ],
    // Add more item groups as needed
  ];

  const Corporatesitems = [
    [
      { img: Festivals, quote: "Festivals" },
      { img: Specialday, quote: "Special day" },
      { quote: "Achievements", img: Achievements },
      { quote: "Memorial Tribute", img: MemorialTribute },
      { quote: "Simple Gifting", img: Gifting },
    ],
    // Add more item groups as needed
  ];

  return (
    <>
      <section className="banner banner-associate">
        <div className="title">{/* <h1>Ways to Associate</h1> */}</div>
      </section>

      {/* body */}
      <div className="">
        <div className="container">
          {/* <div className="pv-75">
                        <h2 className="sub-title text-center mb-0">Way to associate</h2>
                    </div> */}
          <div className="pv-75">
            <div className="feature-description">
              <h2 className="sub-title text-center mb-0">How To Associate</h2>
              <p className="text-center">
                There are two seasons for plantation{" "}
              </p>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-6 col-lg-3">
                <div className="card plantation-card">
                  <img src={monsoonImg} className="card-img-top" alt="..." />
                  {/* <i className="icon-monsoon"></i> */}
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      Monsoon <span>(Jun - Sep)</span>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="card plantation-card">
                  <img src={winterImg} className="card-img-top" alt="..." />
                  {/* <i className="icon-monsoon"></i> */}
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      Winter <span>(Nov - Jan)</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div>
              <p className="text-center">
                You can plant a tree for just ₹ 450/-* per plant.
              </p>
              <p className="text-center">
                The sapling takes 3 years of nurturing and monitoring to be self
                – sustainable. We provide support during this period and in case
                the plant doesn’t survive, we replace it with a new sapling.
              </p>
              <p className="text-center">
                <i>
                  * Each donation supports maintenance of the plant and
                  handholding of the farmers for additional two years.
                </i>
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <h3 className="text-center mtop-5 sub-title">
            On successful donation, every donor
            <br /> will receive a donation receipt and plantation reports
          </h3>
          <ul className="row donor-benefits">
            <li className="col-12 col-sm-6 col-md-3 col-lg-2">
              <span className="bg-receipt"></span>
              Donor receipts <br />
              <small>(Tax exemption under 80G)</small>
            </li>
            <li className="col-12 col-sm-6 col-md-3 col-lg-2">
              <span className="bg-certificate"></span>Certificate
            </li>
            <li className="col-12 col-sm-6 col-md-3 col-lg-2">
              <span className="bg-plantationreport"></span> Plantation Reports
            </li>
            <li className="col-12 col-sm-6 col-md-3 col-lg-2">
              <span className="bg-report"></span>Follow on reports for year 1
            </li>
            <li className="col-12 col-sm-6 col-md-3 col-lg-2">
              <span className="bg-report"></span>Follow on reports for year 2
            </li>
          </ul>
        </div>
        <section className="">
          <div className="container">
            <div>
              <ul className="nav nav-pills justify-content-center pb-75">
                <a
                  className={`nav-link ${
                    activeTab === "individual" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("individual")}
                >
                  Individual
                </a>

                <a
                  className={`nav-link ${
                    activeTab === "corporate" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("corporate")}
                >
                  Corporate
                </a>
              </ul>

              <div className="tab-content" id="myTabContent">
                <div
                  className={`tab-pane fade ${
                    activeTab === "individual" ? "show active" : ""
                  }`}
                  id="home-tab-pane"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className=" donation-card-group">
                    <p className=" text-center indu-p">
                      As an individual, there are many ways you can associate
                      with Project Hariyali.
                    </p>
                    <div className=" row justify-content-center group-content">
                      <div className="col-12 col-md-4 col-lg-3 donation-card-div">
                        <div className="card h-100">
                          <img
                            src={indImg1}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body tree-features1">
                            <h5 className="card-title">Plant a tree</h5>
                            {/* <p className="card-text">Whether you're planning to run a 5K or go for a full marathon, you can set up a ‘pledge’ page and invite your family, friends and colleagues to support your efforts by contributing to Hariyali.</p> */}
                            {/* <a href="#" className="btn btn-primary">Donate</a> */}
                          </div>
                          {/* <div className="card-footer">
                                                    <a href="#" className="btn btn-primary">Donate</a>
                                                </div> */}
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-lg-3 donation-card-div">
                        <div className="card h-100">
                          <img
                            src={indImg3}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body tree-features1">
                            <h5 className="card-title">Gift a tree</h5>
                            {/* <p className="card-text">Get your family, friends and colleagues together for some fun activities by throwing a high-tea party or a kitty party, lunch / dinner get-togethers, movie screenings, book readings, theatre shows, or anything else you can think of, and raise funds for Hariyali.</p> */}
                            {/* <a href="#" className="btn btn-primary">Gift</a> */}
                          </div>
                          {/* <div className="card-footer">
                                                    <a href="#" className="btn btn-primary"></a>
                                                </div> */}
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-lg-3 donation-card-div">
                        <div className="card h-100">
                          <img
                            src={indImg2}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body tree-features1">
                            <h5 className="card-title">
                              Commemorate an occasion
                            </h5>
                            {/* <p className="card-text">Make your special celebration an occasion to contribute towards greening the planet.</p> */}
                            {/* <a href="#" className="btn btn-primary">Gift</a> */}
                          </div>
                          {/* <div className="card-footer">
                                                    <a href="#" className="btn btn-primary">Donate</a>
                                                </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === "corporate" ? "show active" : ""
                  }`}
                  id="profile-tab-pane"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className=" donation-card-group">
                    <div className="feature-description">
                      <h2 className="text-capitalize">
                        A. Cause Related Marketing
                      </h2>
                      <p>
                        Partner with Project Hariyali to develop cause-related
                        marketing campaigns which highlight your organisation’s
                        commitment towards Environment. Customised, co-branded
                        campaigns can be conceptualised to help you build
                        goodwill for your business, while ensuring environmental
                        sustainability.
                        <br />
                      </p>
                    </div>
                    <div className="row justify-content-center group-content">
                      <div className="col-12 col-md-6 col-lg-3 donation-card-div">
                        <div className="card h-100">
                          <img
                            src={freeshImage1}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body tree-features1">
                            <h5 className="card-title ">
                              Campaign with employees
                            </h5>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                          </div>
                          {/* <div className="card-footer">
                                                    <a href="#" className="btn btn-primary">Plant a Tree</a>
                                                </div> */}
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 donation-card-div">
                        <div className="card h-100">
                          <img
                            src={freeshImage2}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body tree-features1">
                            <h5 className="card-title">
                              Campaign with Customers
                            </h5>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                          </div>
                          {/* <div className="card-footer">
                                                    <a href="#" className="btn btn-primary">Plant a Tree</a>
                                                </div> */}
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 donation-card-div">
                        <div className="card h-100">
                          <img
                            src={freeshImage3}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body tree-features1">
                            <h5 className="card-title">
                              Special Days Celebration
                            </h5>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            {/* <a href="#" className="btn btn-primary">Gift</a> */}
                          </div>
                          {/* <div className="card-footer">
                                                <a href="#" className="btn btn-primary">Plant a Tree</a>
                                                </div> */}
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 donation-card-div">
                        <div className="card h-100">
                          <img
                            src={freeshImage4}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body tree-features1">
                            <h5 className="card-title ">Simple Gifting</h5>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            {/* <a href="#" className="btn btn-primary">Gift</a> */}
                          </div>
                          {/* <div className="card-footer">
                                                    <a href="#" className="btn btn-primary">Plant a Tree</a>
                                                </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=" pv-75">
          <div id="plantTree" style={{ display: "block" }}>
            <div className="bg-green">
              <div className="container pv-75">
                {/* <h3 class="text-center my-5 sub-title">Following commemorative artworks are available to choose from</h3> */}
                <h3 class="text-center my-5 sub-title">
                  Gifting and Commemoration can include following events
                </h3>
                <div className="certificate-slider">
                  <Carousel indicators={true}>
                    {Individualsitems.map((item, index) => (
                      <Carousel.Item key={index}>
                        <div className="d-flex justify-content-center">
                          {item.map((subItem, subIndex) => (
                            <>
                              <div className="certificate-tile">
                                {/* <div key={index} className="col-12 col-md-6 mb-3"></div> */}
                                <div key={index} className="slide-content2">
                                  <div className="certificate-wrapper">
                                    <img src={subItem.img} alt="" />

                                    <h4>{subItem.quote}</h4>
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
            </div>
            <div className="container">
              <div className="row support-content1">
                <h3 class="text-center my-5 sub-title">
                  Fund raising strategies
                </h3>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="text-center h-101">
                    <div className="card-img-top">
                      <img src={ind1} className="" alt="..." />
                    </div>
                    <div className="card-body tree-features1">
                      <h5 className="card-title">Runs, walks & cyclothons</h5>
                      <p>
                        Runs, walks & cyclothons -Whether you're planning to run
                        a 5K or go for a full marathon, you can set up a
                        ‘pledge’ page and invite your family, friends and
                        colleagues to support your efforts by contributing to
                        project Hariyali.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="text-center h-101">
                    <div className="card-img-top">
                      <img src={ind3} className="" alt="..." />
                    </div>
                    <div className="card-body tree-features1">
                      <h5 className="card-title">
                        Organise your own fundraiser
                      </h5>
                      <p>
                        Organise your own fundraiser - Get your family, friends
                        and colleagues together for some fun activities by
                        throwing a high-tea party or a kitty party, lunch /
                        dinner get-togethers, movie screenings, book readings,
                        theatre shows, or anything else you can think of, and
                        raise funds for project Hariyali.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="text-center h-101">
                    <div className="card-img-top">
                      <img src={ind2} className="" alt="..." />
                    </div>
                    <div className="card-body tree-features1">
                      <h5 className="card-title">
                        Fundraise at your personal celebrations
                      </h5>
                      <p>
                        Fundraise at your personal celebrations – Make your
                        special celebration an occasion to contribute towards
                        greening the planet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section style={{ display: "none" }} id="associate">
          <div className="bg-green">
            <div className="container pv-75">
              {/* <h3 class="text-center my-5 sub-title">Following commemorative artworks are available to choose from</h3> */}
              <h3 class="text-center my-5 sub-title">
                Gifting and Commemoration can include following events
              </h3>
              <div className="certificate-slider">
                <Carousel indicators={true}>
                  {Corporatesitems.map((item, index) => (
                    <Carousel.Item key={index}>
                      <div className="d-flex justify-content-center">
                        {item.map((subItem, subIndex) => (
                          <>
                            <div className="certificate-tile">
                              {/* <div key={index} className="col-12 col-md-6 mb-3"></div> */}
                              <div key={index} className="slide-content2">
                                <div className="certificate-wrapper">
                                  <img src={subItem.img} alt="" />
                                  <h4>{subItem.quote}</h4>
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
          </div>
          <div className="project-bg ">
            <Container>
              <div className="feature-description feature-description-other">
                <h2 className="text-capitalize">
                  B. Corporate Social Responsibility
                </h2>
                <p>
                  Become a Corporate Partner for Project Hariyali and contribute
                  towards making our nation Carbon Neutral by 2070. Project
                  Hariyali aligns with Schedule VII of the Companies Act 2013
                  (India) under (iv) ensuring environmental sustainability,
                  ecological balance, protection of flora and fauna, animal
                  welfare, agroforestry, conservation of natural resources and
                  maintaining quality of soil, air and water . Our
                  implementation expertise, ability to map project milestones
                  and outcomes, as well as a comprehensive monitoring and
                  reporting framework makes Project Hariyali a preferred CSR
                  partner.
                  <br />
                </p>
                {/* <h2 className="sub-title  text-center">
                                        Alignment with United Nations Sustainable Development Goals
                                    </h2> */}
                <p>
                  Project Hariyali is aligned with United Nations Sustainable
                  Goals
                </p>

                <div className="col-12 col-md-8 pd-le-r-15">
                  {" "}
                  <Row>
                    <div className="col-6 col-md-4 col-lg-2-extra mb-lg-0 marginall-pad-0">
                      <img src={sdg13} width="100%" />
                    </div>
                    <div className="col-6 col-md-4 col-lg-2-extra mb-lg-0 marginall-pad-0">
                      <img src={sdg15} width="100%" />
                    </div>
                    <div className="col-6 col-md-4 col-lg-2-extra mb-lg-0 mb-3 marginall-pad-0">
                      <img src={sdg8} width="100%" />
                    </div>
                    <div className="col-6 col-md-4 col-lg-2-extra mb-lg-0 marginall-pad-0">
                      <img src={sdg14} width="100%" />
                    </div>
                    <div className="col-6 col-md-4 col-lg-2-extra mb-lg-0 marginall-pad-0">
                      <img src={sdg17} width="100%" />
                    </div>
                  </Row>
                </div>
                <br />
                <p>
                  <address>
                    {" "}
                    For CSR Queries contact Sunny Gangar{" "}
                    <a href="mail:csr@hariyali.org.in">
                      <i className="bi bi-envelope-fill"></i>{" "}
                      csr@hariyali.org.in
                    </a>{" "}
                    |{" "}
                    <a href="tel:93224 56789 ">
                      <i className="bi bi-phone"></i> 93224 56789{" "}
                    </a>{" "}
                    |{" "}
                    <a href="tel: 022 22021031">
                      <i className="bi bi-telephone-fill"></i> 022 22021031
                    </a>
                  </address>
                </p>
              </div>

              {/* <div>
          <img src={sdglinks} width="50%"  />
          </div> */}
            </Container>
          </div>
        </section>
        <div className="project-bg patner-carousel">
          <Container>
            <div className=" feature-description-other">
              <h3 class="text-center sub-title"> Our Partner</h3>
              <Carousel indicators={true}>
              <div className="m-auto">
                <Row className="justify-content-between ourpartner">
                  <div className="col-6 col-md-4 mb-lg-0 mb-3 marginall-pad-0 text-center">
                    <img src={bristlecone} width="80%" />
                  </div>
                  <div className="col-6 col-md-4 mb-lg-0 mb-3 marginall-pad-0 text-center">
                    <img src={mahindrafinance} width="80%" />
                  </div>
                  <div className="col-6 col-md-4 mb-lg-0 mb-3 marginall-pad-0 text-center">
                    <img src={mahindrarice} width="80%" />
                  </div>
                </Row>
              </div>
              </Carousel>
              <br />
            </div>

            {/* <div>
          <img src={sdglinks} width="50%"  />
          </div> */}
          </Container>
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default WaystoAssociate;

import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "../../../assets/css/footprint.css";
import "react-image-gallery/styles/css/image-gallery.css";
// about
// about
// program
// import program1 from "../../assets/img/program/program1.png";
import program1 from "../../../assets/img/regenarate.png";
import program2 from "../../../assets/img/biodiversity.jpg";
import program3 from "../../../assets/img/co2.jpg";
import program4 from "../../../assets/img/lifestyle.jpg";
import program5 from "../../../assets/img/featurewhere.png";
// program
// projects
// projects
// SDG Links
import sdg13 from "../../../assets/img/SDG/sdg13.png";
import sdg15 from "../../../assets/img/SDG/sdg15.png";
import sdg8 from "../../../assets/img/SDG/sdg8.png";
import sdg14 from "../../../assets/img/SDG/sdg14.png";
import sdg17 from "../../../assets/img/SDG/sdg17.png";
// SDG Links
// blogs
// blogs
// icon
// import 'react-slideshow-image/dist/styles.css';
// import riseProgramResgions1 from "../../../assets/img/program/rise-program-resgions-1.webp";
// import riseProgramResgions2 from "../../../assets/img/program/rise-program-resgions-2.webp";
// import riseProgramResgions3 from "../../../assets/img/program/rise-program-resgions-3.webp";
// import riseProgramResgions4 from "../../../assets/img/program/rise-program-resgions-4.webp";
// gallary
// import improving from "../../../assets/img/hariyali-img-4.jpg";
import { Link } from "react-router-dom";
// animation
//
import { Zoom } from "react-slideshow-image";
// import image1 from "../../../assets/img/slider/rise-program-resgions-1.jpg";
// import image2 from "../../../assets/img/slider/rise-program-resgions-2.jpg";
// import image3 from "../../../assets/img/slider/rise-program-resgions-3.jpg";
// import image4 from "../../../assets/img/slider/rise-program-resgions-4.jpg";
import image1 from "../../../assets/img/hariyali-img-4.jpg";
import image2 from "../../../assets/img/slider/extra.jpg";
import image3 from "../../../assets/img/slider/banner3.jpg";
import image4 from "../../../assets/img/slider/banner4.jpg";
import image5 from "../../../assets/img/Image20230827121634.png";

// import plantimg from "../../../assets/img/pmat_a_tree.png";

import planttreeImg from "../../../assets/img/plant.png";
import gifttreeImg from "../../../assets/img/holding-hand.png";

import { useEffect } from "react";
import { useState } from 'react';
import { USER_DETAILS } from "../../../components/constants/constants";
import { AuthService } from "../../../services/auth/auth.service";
import { EncryptionService } from "../../../services/encryption.service";
import { APIService } from '../../../services/api/api-service';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// style was imported in index.css
// import "react-slideshow-image/dist/styles.css";
// const images = [image1, image2, image3, image4];
const slides = [
  {
    image: image2,
    title:
      "When you cut a tree you take a life and when you plant a tree you plant HOPE",
    description: "We have planted more than 24 million trees since 2007",
  },
  {
    image: image1,
    title: "Trees need people as much as people need trees",
    description: "Araku Valley, Andhra Pradesh",
  },
  {
    image: image3,
    title:
      "A hectare of tropical forest absorbs 50-100 tonnes of CO2 per annum. Come plant a better future",
    description: "Tarn Taran, Punjab",
  },
  {
    image: image4,
    title: "Take your first step towards a green future for all",
    description: "Shravasti, Uttar Pradesh",
  },
  {
    image: image5,
    title:
      "A farmer does not only grow crops but also creates a healthy environment",
    description: "Wardha, Maharashtra",
  },

  // Add more slides here
];

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true,
};

const Slideshow = () => {
  return (
    // <div className="slide-container">
    //   <Zoom {...zoomOutProperties}>
    //     {slides.map((each, index) => (
    //       <>
    //       <img key={index} style={{ width: "100%" }} src={each.image} />
    //       <div className="slide-content">
    //         <h2>{each.title}</h2>
    //         <p><i className="bi-bi bi-geo-alt"></i>{each.description}</p>
    //         <div className="donate-btn-group">
    //         <div className="d-flex flex-wrap justify-content-start">
    //             <a href="" className="btn btn-primary">
    //                 Plant A tree <img src={planttreeImg} />
    //             </a>
    //             <a href="" className="btn btn-primary">
    //               Gift a Tree  <img src={gifttreeImg} />
    //             </a>
    //         </div>
    //       </div>
    //       </div>
    //       </>
    //     ))}
    //   </Zoom>
    // </div>

    <div className="slide-container home-page-slider">
      <Zoom {...zoomOutProperties}>
        {slides.map((each, index) => (
          <>
            <img
              key={index}
              style={{ width: "100%", height: "650px" }}
              src={each.image}
            />
            <div className="slide-content">
              <h2>{each.title}</h2>

              <div className="donate-btn-group">
                <div className="d-flex flex-wrap justify-content-start">
                  <Link className="btn banner-btn" to={`/OnlineDonation`}>
                    Plant A Tree <img src={planttreeImg} />
                  </Link>
                  <Link className="btn banner-btn" to={`/OnlineDonation`}>
                    Gift A Tree <img src={gifttreeImg} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="slide-location">
              <p>
                <i className="bi-bi bi-geo-alt"></i>
                {each.description}
              </p>
            </div>
          </>
        ))}
      </Zoom>
    </div>
  );
};

function HomePage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // //First Part
  function animateValue1(obj1, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value1 = Math.floor(progress * (end - start) + start);
      obj1.textContent = value1;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  useEffect(() => {
    const obj1 = document.getElementById("value1");
    animateValue1(obj1, 0, 24861288, 5000);
  }, []);

  //Second Part
  function animateValue2(obj2, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj2.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  useEffect(() => {
    const obj2 = document.getElementById("value2");
    animateValue2(obj2, 0, 85, 5000);
  }, []);

  //Thirdt part
  const animateValue3 = (obj3, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = start + progress * (end - start);
      obj3.textContent = value.toFixed(1); // Display one decimal place
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const obj3 = document.getElementById("value3");
    animateValue3(obj3, 0, 153, 5000);
  }, []);
    useEffect(() => {
      const obj3 = document.getElementById("value3");
      animateValue3(obj3, 0, 153 , 5000);
      sessionExpired();
    }, []);


  const sessionExpired = async () => {
    if(localStorage.getItem(USER_DETAILS)){
      let userDetails = await EncryptionService.decrypt(localStorage.getItem(USER_DETAILS));
      const response = await AuthService.logout(JSON.parse(userDetails));
      await APIService.Instance.removeToken();
    }
  }

  return (
    <>
      {/* body */}
      {/* slider */}
      <div className="">
        <Slideshow />
      </div>
      {/* slide info */}
      <div className="container pv-75">
        <div className="mb10 impact-wrapper">
          <div className="tree-features tree-featureswidth">
            {/* <i className="icon-tree"></i> */}
            <h4>Trees planted so far</h4>
            <p id="value1">0</p>
          </div>

          <div className="tree-features tree-featureswidth">
            <h4>Survival rate of trees</h4>
            <div className="d-flex align-items-center">
              <p id="value2">0</p>
              <span>%</span>
            </div>
          </div>
          <div className="tree-features tree-featureswidth">
            <h4>Estimated Carbon Sequestered</h4>
            <div className="d-flex align-items-center">
              <p>
                &#x3E;<span id="value3">0</span>{" "}
              </p>
              <span>
                ktonne CO<sub>2</sub>e
              </span>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-green">
        <div className="container pv-75">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="program-details">
                <h3 className="mb-3">Who We Are</h3>
                <p>
                  Project Hariyali is a joint initiative of Mahindra Foundation
                  and Naandi Foundation. One million trees have been planted
                  each year since 2007 across India. The project is part of
                  nature-based solution that focuses on natural resource
                  management and global organic farming protocols to improve the
                  eco-system. Going forward, the project aims to plant 5 million
                  trees per annum.{" "}
                </p>
                <div className="pt-5">
                  <a href="/AboutUs" className="btn btn-secondary">
                    Know More
                  </a>
                  <Link className="btn btn-primary" to={`/OnlineDonation`}>
                    Donate
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="img-responsive feature-image">
                <img src={program1} alt="planting" className="imgwidth100" />
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      <div className="container pv-75">
        <div className="row pv-75">
          <div className="col-12 col-lg-6 order-2 order-lg-1">
            <div className="img-responsive feature-image">
              <img src={program3} alt="planting" className="imgwidth100" />
            </div>
          </div>
          <div className="col-12 col-lg-6 order-1 order-lg-2">
            <div className="program-details">
              <h3 className="mb-3">What We Do</h3>
              <p>
                Project Hariyali aims to increase green cover, arrest the rising
                ecological imbalance, enhance biodiversity, restore the
                functional forest, and in the process support the livelihood of
                marginalized farmers.
              </p>
              <div className="pt-5">
                <a href="/WhatWeDo" className="btn btn-secondary">
                  Know More
                </a>
                <Link className="btn btn-primary" to={`/OnlineDonation`}>
                  Donate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <section className="bg-green">
        <div className="container pv-75">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="program-details feature-description-other">
                <h3 className="mb-3">Why Support Us</h3>
                {/* <p>
                  India is the 7th most vulnerable country with respect to
                  climate extremes <em>(CRI, 2021)</em>. The total forest cover
                  needs to increase for ecological stability.
                </p> */}
                {/* <p>India is promoting individual responsibility toward climate action through Mission LiFE "Lifestyle for Environment". Hariyali Project has increased the green cover and is in alignment with LiFE "Lifestyle for Environment".</p> */}
                {/* <p>
                  India is promoting individual responsibility toward climate
                  action through Mission LiFE "Lifestyle for Environment".
                  Hariyali Project has increased the green cover and is in
                  alignment with LiFE "Lifestyle for Environment".
                </p> */}
                {/* <p>
                  Hariyali Project has been conferred with multiple awards by
                  national and international bodies.
                </p> */}
                <p>
                  India is committed to its National Determined Contributions and seeks to be carbon neutral by 2070.</p>
                  <p>India is promoting individual responsibility toward climate action through Mission LiFE "Lifestyle for Environment". Project Hariyali has increased the green cover and is in alignment with LiFE.</p><p>Hariyali Project has been conferred with multiple awards by national and international bodies.</p>


                <div className="pt-5">
                  <a href="/WhySupportUs" className="btn btn-secondary">
                    Read More
                  </a>
                  <Link className="btn btn-primary" to={`/OnlineDonation`}>
                    Donate
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="img-responsive feature-image">
                <img src={program4} alt="Program" className="imgwidth100" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container pv-75">
        <div className="row">
        <div className="col-12 col-lg-6 order-2 order-lg-1">
            <div className="img-responsive feature-image">
              <img src={program2} alt="Program" className="imgwidth100" />
            </div>
          </div>
          <div className="col-12 col-lg-6 order-1 order-lg-2">
            <div className="program-details">
              <h3 className="mb-3">How To Associate</h3>
              <p>
                There are two seasons for plantation - Monsoon and Winter. You
                can choose to plant in any of these seasons or both with one
                time contribution of ₹ 450/- per plant. The sapling takes 3
                years of nurturing and monitoring to be self – dependent. We
                provide support to the plant for these 3 years and in case if
                the plant doesn’t survive, we replace it with a new sapling.
              </p>
              <div className="pt-5">
                <a href="/WaystoAssociate" className="btn btn-secondary">
                  Read More
                </a>
                <Link className="btn btn-primary" to={`/OnlineDonation`}>
                  Donate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-green">
        <div className="container pv-75">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="program-details">
                <h3 className="mb-3">Where Are We</h3>
                <p>
                  We are currently present in five states – Andhra Pradesh,
                  Uttar Pradesh, Punjab, Himachal Pradesh and Maharashtra.
                </p>
                <div className="pt-5">
                  <a href="/FootPrint" className="btn btn-secondary">
                    Read More
                  </a>
                  <Link className="btn btn-primary" to={`/OnlineDonation`}>
                    Donate
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="img-responsive feature-image">
                <img src={program5} alt="Program" className="imgwidth100" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* sdg */}
      {/* <div className="container pv-75">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="img-responsive feature-image">
            <div class="grid"> <Row className="justify-content-between ">
            <div className="col-6 col-md-4 col-lg-4 mb-lg-0 mb-3 discover-block">
					<figure class="effect-duke"><img src={sdg13} width="70%" />
            </figure></div>
            <div className="col-6 col-md-4 col-lg-4 mb-lg-0 mb-3 discover-block">
            <figure class="effect-duke"><img src={sdg15} width="70%" /></figure>
            </div>
            <div className="col-6 col-md-4 col-lg-4 mb-lg-0 mb-3 discover-block">
            <figure class="effect-duke"><img src={sdg8} width="70%" /></figure>
            </div>
            <div className="col-6 col-md-4 col-lg-4 mb-lg-0 mb-3 discover-block">
            <figure class="effect-duke"><img src={sdg14} width="70%" /></figure>
            </div>
            <div className="col-6 col-md-4 col-lg-4  mb-lg-0 mb-3 discover-block">
            <figure class="effect-duke"><img src={sdg17} width="70%" /></figure>
            </div>
          </Row></div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="program-details">
              <h3 className="mb-3"> Alignemnet with United Nations Sustainable Development Goals</h3>
              </div>
          </div>
        </div>
      </div> */}
      {/* -------------------------- */}
      <div className="project-bg ">
        <Container className="ptb50">
          <h2 className="sub-title text-center mb30 ">
            Alignment with United Nations Sustainable Development Goals
          </h2>

          <div class="grid">
            {" "}
            <div className="col-12 col-xl-8 m-auto">
              <Row className="">
                <div className="col-6 col-md-4 col-lg-2-extra mb-lg-0 mb-3 marginall-pad-0">
                  <figure className="effect-duke boxshaow-0">
                    <img src={sdg13} width="100%" />
                  </figure>
                </div>
                <div className="col-6 col-md-4 col-lg-2-extra mb-lg-0 mb-3 marginall-pad-0">
                  <figure className="effect-duke boxshaow-0">
                    <img src={sdg15} width="100%" />
                  </figure>
                </div>
                <div className="col-6 col-md-4 col-lg-2-extra mb-lg-0 mb-3 marginall-pad-0">
                  <figure className="effect-duke boxshaow-0">
                    <img src={sdg8} width="100%" />
                  </figure>
                </div>
                <div className="col-6 col-md-4 col-lg-2-extra mb-lg-0 mb-3 marginall-pad-0">
                  <figure className="effect-duke boxshaow-0">
                    <img src={sdg14} width="100%" />
                  </figure>
                </div>
                <div className="col-6 col-md-4 col-lg-2-extra mb-lg-0 mb-3 marginall-pad-0">
                  <figure className="effect-duke boxshaow-0">
                    <img src={sdg17} width="100%" />
                  </figure>
                </div>
              </Row>
            </div>
          </div>

          {/* <div>
          <img src={sdglinks} width="50%"  />
          </div> */}
        </Container>
      </div>
      {/* body */}
    </>
  );
}

export default HomePage;

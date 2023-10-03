import React, { useState } from "react";
import { Carousel, Modal, Button, Nav } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import Slider from "react-slick";
// import "react-image-gallery/styles/css/image-gallery.css";
import { Zoom } from "react-slideshow-image";
// program
import planting from "../../../assets/img/about/hariyali-img-4.jpg";
import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
import downslide from "../../../assets/img/slider/downslide.jpg";

import image1 from "../../../assets/img/slider/banner1.png";
import image2 from "../../../assets/img/slider/banner2.png";
import image3 from "../../../assets/img/slider/banner3.jpg";

import impactFile1 from "../../../assets/files/ImpactAssessmentReportFY22.pdf";
import impactFile2 from "../../../assets/files/ImpactAssessmentReportFY23.pdf";

import testimonialImg from "../../../assets/img/testimonial.png";
import testimonial2 from "../../../assets/img/shravasti.png";
import testimonial3 from "../../../assets/img/solan.png";
import testimonial4 from "../../../assets/img/moga.png";

import limcaAward from "../../../assets/img/Limca Records 2015_page-0001.jpg";
import limcaAward1 from "../../../assets/img/Limca Records 2020_pages-to-jpg-0001.jpg";
import impactAssessment1 from "../../../assets/img/Impact Assessment Report FY 22_page-0001.jpg";
import impactAssessment2 from "../../../assets/img/Impact Assessment Report FY 23_page-0001.jpg";
import csrCertificate from "../../../assets/img/Image20230825001136.png";
import csrCertificate1 from "../../../assets/img/CSR.png";
import aimacertificate from "../../../assets/img/AIMA.jpg";
import program3 from "../../../assets/img/co2.jpg";
import program4 from "../../../assets/img/lifestyle.jpg";
import video from "../../../assets/video/Solan-women-farmer-AV.mp4";
import { Link, useNavigate, useLocation } from "react-router-dom";
import plantation from "../../../assets/img/GIF's/plant-img.gif";
// const slides = [
//   {
//     title: 'When you cut a tree you take a life and when you plant a tree you plant a HOPE',
//     description: 'PLANT A TREE',
//   },
//   {
//     title: 'Take your first step towards a green future',
//     description: 'Araku Valley, Vishakhapatnam, Andhra Pradesh',
//   },
// ];

// const zoomOutProperties = {
//   duration: 5000,
//   infinite: true,
//   indicators: false,
//   arrows: true,
// };

// const Slideshow = () => {
//   return (
//     <div className="slide-container">

//       <Zoom {...zoomOutProperties}>
//         {slides.map((each, index) => (
//           <>
//             <div className="award-wrapper">
//               <h4>{each.title}</h4>
//             </div>
//           </>
//         ))}
//       </Zoom>

//     </div>
//   );
// };

function WhySupportUs() {
  const items = [
    {
      quote:
        "FICCI CSR Awards – In Skill Development & Livelihood Category, 2021",
      image: csrCertificate,
    },
    {
      quote:
        "Food System Vision Prize by Rockefeller Foundation to Naandi Foundation, 2020",
      // image: csrCertificate,
    },
    {
      quote:
        "The CSR Conclave and Awards by IFCCI in the Environment and Sustainability Category, 2020",
      image: csrCertificate1,
    },
    {
      quote: "AIMA Runner- up CSR Award, 2023",
      image: aimacertificate,
    },
    {
      quote: "Limca book of Awards - National Record, 2016",
      image: limcaAward,
    },
    // Add more item groups as needed
  ];

  const testimonials = [
    {
      image: testimonialImg,
      name: "Farmer family from Gondhi Rapa village (Hukumpeta mandal), Araku.",
      quote:
        "We are from Gondhi Rapa village in Hukumpeta mandal of the Araku region. Our farm yields 894 kgs of crimson red coffee cherries which we have given to the cooperative thereby earning 6 times of what we earned two years.",
      legend: "From Araku, Andhra Pradesh",
    },
    {
      image: testimonial2,
      name: "I care for my saplings just like a mother cares for her child",
      quote:
        "I live in Purva village of Shravasti district. After joining Hariyali, I got 91 fruit saplings including guava, jackfruit and lemon. I also received training on how to dig the pit for sapling planting, how much distance to maintain between saplings, how and when to spray bio inputs etc. I nurture, love and care for these saplings as a mother does for her child. Under the guidance of the Naandi team, I am making bio inputs too. In three years, these will become trees and start bearing fruits which my family can consume. And from the fifth year they will bear enough fruits for me to go to the market and sell them and make a living.",
      legend: "From Shravasti, Uttar Pradesh",
    },
    {
      image: testimonial3,
      name: "This is my small contribution towards reversing climate change",
      quote:
        "I live in Chabeet village of Solan district. I have been doing the usual kind of farming, but the yield was never very good. When I heard about Project Hariyali, I immediately came forward to join it.  I was given 42 fruit saplings - mostly plum and apple. I follow all the organic regenerative farming practices faithfully. This is my small contribution towards reversing climate change and making Himachal Pradesh clean and green. In the future, my family will reap the benefits.  ",
      legend: "From Solan, Himachal Pradesh",
    },
    {
      image: testimonial4,
      name: "These will add nutritional diversity for my family",
      quote:
        "I live in Kokri Kalan village of Moga district. We struggle to make a reasonable livelihood. I always had a liking for plants and agriculture in general. Through Project Hariyali, I have learnt efficient farming practices. I am confident that with these practices I will reap benefits in future. I have received 31 fruit saplings which include guava, mango, orange, and peach. I know these will add nutritional diversity for my family as well as bring additional income in future.",
      legend: "From Moga, Punjab",
    },
    // Add other testimonials
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };
  const goToDonate = () => {
    navigate("/OnlineDonation");
  };

  const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true,
  };
  const opts = {
    height: "315", // Set the height of the video player
    width: "560", // Set the width of the video player
  };
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {/* body */}
      <section className="banner banner-support"></section>
      <section>
        <div className="pv-75 pb-0">
          <div className="container ">
            <div className="feature-description">
              <h2 className="sub-title text-center">Why Support Us</h2>

              <p className="text-center">
                The total forest and tree cover in India is 809,537 square
                kilometres i.e., 24.62 % of the total geographical area. But as
                per the National Forest Policy, the ideal percentage of total
                geographical area under forest should be at least 33% to
                maintain ecological stability. India ranked the second highest
                for the rate of deforestation after losing 668,400 hectares of
                forest cover in the last 30 years. The forest areas are under
                threat due to rapid industrialization, road, and other
                connectivity projects as well as irrigation projects. Over and
                above, 90% of the area under the biodiversity hotspots have been
                lost as per the Centre for Science and Environment’s (CSE) new
                report entitled ‘State of India’s Environment in Figures 2021’.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6">
            <div className="card plantation-card h-100">
              <img
                src={program3}
                className="card-img-top full-height"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title text-center">
                  India's commitment to carbon neutrality
                </h5>
                <p>
                  UN Framework Convention on Climate Change raises awareness and
                  builds knowledge to help mitigate climate change. The Paris
                  Agreement within the UNFCCC aims at achieving greenhouse gas
                  emissions mitigations. The agreement outlines the National
                  Determined Contributions (NDCs), each member country should
                  make in order to stay ‘well below’ the 2°C target. India is
                  committed to its NDC and seeks to be carbon neutral by 2070.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="card plantation-card h-100">
              <img
                src={program4}
                className="card-img-top full-height"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title text-center">
                  Mission LiFE : <br />
                  Lifestyle for Environment
                </h5>
                <p>
                  India is promoting individual responsibility toward climate
                  action through Mission LIFE “Lifestyle for Environment”. This
                  movement aims to transform individuals into pro planet people
                  by having them adopt sustainable lifestyles and minimize their
                  carbon footprints.
                </p>
              </div>
              {/* <i className="icon-monsoon"></i> */}
            </div>
          </div>
        </div>
        <p className="text-center">
          Support the nation reach Carbon neutrality. Join us to make an impact
          through Project Hariyali{" "}
        </p>
        <div className="text-center">
          <div className="my-4">
            <Button className="btn btn-primary" onClick={goToDonate}>
              <img src={plantation} alt="Donote" className="donoteicon" />
              Plant A Tree{" "}
            </Button>
          </div>
        </div>
      </section>
      {/* <div className="container pv-75">
        <div className="row mb30 impact-wrapper">
          <div className="col-12 col-md-4 text-center">
            <div className="tree-features">
              <h4>Number of trees planted since 2007</h4>
              <p>20.89 Millions</p>
            </div>
          </div>
          </div>
        </div> */}
      <section className="bg-green">
        <div className="container">
          <div className="feature-description">
            <h3 className="sub-title text-center">
              Impact of Hariyali Project
            </h3>
            <p className="text-center">
              Project Hariyali is a unique blend in the sphere of environmental
              sustainability and impacting livelihood. The Project is already
              contributing towards mission LiFE & India’s commitment towards
              carbon neutrality.
            </p>
          </div>
          <div className="justify-content-center quantitative-card">
            <div className="discover-block impactbgcolor1">
              <div className="impactbg1">
                <div class="impact-margin h-100">
                  <div class="card-header">Trees planted</div>
                  <div class="card-body">
                    <h5 class="card-title impactwidth">
                      Number of trees planted since 2007
                    </h5>
                    <p class="card-text">24.86 Millions</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="discover-block impactbgcolor2">
              <div className="impactbg2">
                <div class="impact-margin h-100">
                  <div class="card-header">Survival Rate of Plant</div>

                  <div class="card-body">
                    <h5 class="card-title impactwidth">
                      Overall survival rate of plant since inception
                    </h5>
                    <p class="card-text">85% Plus</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="discover-block impactbgcolor3">
              <div className="impactbg3">
                <div class="impact-margin h-100">
                  {" "}
                  <div class="card-header">
                    CO<sub>2</sub> Sequestered
                  </div>
                  <div class="card-body">
                    <h5 class="card-title impactwidth">
                      CO<sub>2</sub> sequestered through the project since
                      inception{" "}
                    </h5>
                    <p class="card-text">
                      &#x3E;
                      <span>
                        153.0 ktonne CO<sub>2</sub>e
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* </Row> */}
            {/* <h4 className="text-center">Qualitative Impact</h4> */}
            {/* <Row className="justify-content-center mb-4 quantitative-card"> */}
            <div className="discover-block impactbgcolor4">
              <div className="impactbg4">
                <div class="impact-margin h-100">
                  {" "}
                  <div class="card-header">Soil Quality</div>
                  <div class="card-body">
                    <h5 class="card-title impactwidth">
                      Improvement in soil quality in terms of carbon, water
                      holding capacity & nutrients
                    </h5>
                    <p class="card-text">Soil Health</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="discover-block impactbgcolor5">
              <div className="impactbg5">
                <div class="impact-margin h-100">
                  {" "}
                  <div class="card-header">Bio-diversity</div>
                  <div class="card-body">
                    <h5 class="card-title impactwidth">
                      Significant positive change in bio-diversity
                    </h5>
                    <p class="card-text">Bio-diversity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container py-5">
        <div className="feature-description">
          <h2 className="sub-title text-center mb-0 pb-0">Awards Won</h2>
        </div>
        <div className="awards-slider">
          <Slider {...settings}>
            {items.map((subItem, subIndex) => (
              <>
                <div className="award-tile">
                  <div
                    key={subIndex}
                    className="slide-content2"
                    onClick={() => openModal(subItem.image)}
                  >
                    <div className="award-wrapper">
                      <h4>{subItem.quote}</h4>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </Slider>

          {/* <Carousel indicators={true}>
              {items.map((item, index) => (
                <Carousel.Item key={index}>
                  <div className="d-flex justify-content-center">
                    {item.map((subItem, subIndex) => (
                      <>
                        <div className="award-tile">
                          
                          <div
                            key={index}
                            className="slide-content2"
                            onClick={() => openModal(subItem.image)}
                          >
                            <div className="award-wrapper">
                              <h4>{subItem.quote}</h4>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel> */}
        </div>
        <Modal show={showModal} onHide={closeModal} className="awards-modal">
          <Modal.Body>
            {selectedImage && (
              <img src={selectedImage} alt="Modal" className="img-fluid" />
            )}
          </Modal.Body>
        </Modal>
      </div>
      <section className="bg-green">
        <div className="container">
          <div className="row align-items-center pv-75">
            <div className="col-12 col-lg-6">
              <div className="feature-description feature-description-other">
                <h3 className="sub-title text-center">
                  Impact Assessment Report
                </h3>
                <p>
                  <i>
                    Annual third - party audits have been conducted since 2012
                    by Unique forestry and land use GmbH.
                  </i>
                </p>
                <p>
                  <i>
                    Since FY22, Impact Assessment as part of CSR guidelines have
                    been conducted by third party organizations. In the last
                    Impact Assessment conducted for plantations done in FY21,
                    the survival rate has been reported at 94.67%.{" "}
                    <b>
                      Project Hariyali has been awarded “Platinum” category
                      performance of CSR Activity by an NABCB accredited “Type
                      A” Inspection Body.{" "}
                    </b>
                  </i>
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="">
                <div className="d-flex justify-content-center pdf-wrapper">
                  <a className="pdf-tile" href={impactFile2} target="_blank">
                    <span className="pdf1"></span>
                    <span>View</span>
                    <i className="bi bi-file-earmark-pdf-fill"></i>
                  </a>
                  <a className="pdf-tile" href={impactFile1} target="_blank">
                    <span className="pdf2"></span>
                    <span>View</span>
                    <i className="bi bi-file-earmark-pdf-fill"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {" "}
        <div className="feature-description feature-description-other">
          <h3 className="text-center sub-title">Testimonials</h3>
          <div className="testimonial-slider">
            <Zoom {...zoomOutProperties}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="slide-content-whysupport support-content"
                >
                  <div className="row">
                    <div className="offset-xl-1 col-xl-3 col-12 col-lg-4">
                      <img
                        src={testimonial.image}
                        alt="avatar"
                        className="mb-5"
                      />
                    </div>
                    <div className="col-12 col-lg-8 col-xl-8">
                      <h3 className="mb-3">{testimonial.name}</h3>
                      <p className="">
                        <i className="bi bi-quote pe-2"></i>
                        {testimonial.quote}
                      </p>
                      <div className="testimonial-legend">
                        {testimonial.legend}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Zoom>
          </div>
          <div className="slide-content-whysupport support-content">
            <div className="row  d-flex justify-content-center">
              <div className="col-12 col-lg-6 text-center mb-5">
                <video width="100%" height="500" controls>
                  <source src={video} type="video/mp4" />
                </video>
              </div>
              {/* <div className="col-12 col-md-6 text-center">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/YnhmRcQ4q6M"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div> */}
            </div>
          </div>
          {/* <Slideshow /> */}
        </div>
        {/* modal popup for awards */}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* body */}
      </div>
    </>
  );
}

export default WhySupportUs;

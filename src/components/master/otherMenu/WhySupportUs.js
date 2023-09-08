import React, { useState } from "react";
import { Carousel, Modal, Button } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
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
import csrCertificate from "../../../assets/img/Image20230825001140.png";
import csrCertificate1 from "../../../assets/img/Image20230825001136.png";
import program3 from "../../../assets/img/co2.jpg";
import program4 from "../../../assets/img/lifestyle.jpg";

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
    [
      {
        quote: "FICCI CSR Awards – In Skill Development & Livelihood Category to be replaced with FICCI CSR Awards – In Skill Development & Livelihood Category,2021",
        image: limcaAward,
      },
      {
        quote:
          " Food Vision 2050 Prize by Rockefeller Foundation to Naandi Foundation text to be replaced with – Food System Vision Prize by Rockefeller Foundation to Naandi Foundation, 2020",
        image: csrCertificate,
      },
      {
        quote:
          " The CSR Conclave and Awards by IFCCI in the Environment and Sustainability Category to be replaced with - The CSR Conclave and Awards by IFCCI in the Environment and Sustainability Category,2020",
        image: csrCertificate1,
      },
    ],
    [
      {
        quote: "Runner Up under Private Sector Category 2 to be replaced with – AIMA Runner- up CSR Award, 2023",
        //image :
      },
         { quote: "Limca book of Awards - National Record, 2016", image: limcaAward },
    ],
    // Add more item groups as needed
  ];

  const testimonials = [
    {
      image: testimonialImg,
      name: "Farmer family from Gondhi Rapa village (Hukumpeta mandal), Araku.",
      quote:
        "Our farm yields 894 kgs of crimson red cherries which we have given to the cooperative thereby earning 6 times of what we earned two years ago - farmer family from Gondhi Rapa village (Hukumpeta mandal), Araku.",
    },
    {
      image: testimonial2,
      name: "Woman Farmer from Shravasti.",
      quote: "I live in Purva village Shravasti dist. After joining the program, I got 91 fruit saplings of Guava, Jackfruit, Lemon etc. and was provided with training on how to plant, maintaining the distance between saplings, use of spray machine for application of bio inputs etc. I nurture, love and care for them as a mother does for her child. Under the guidance of the team, I am making Bio inputs too. From third year the trees will start bearing fruits which will be good to consume by my family and from the 5th year the produce would be enough for commercial purposes.",
    },
    {
      image: testimonial3,
      name: "Woman farmer from Chabeet village, Solan.",
      quote: "I have been engaged in usual form of farming, but the yield wasn't great. After getting to know about Project Hariyali I didn't think twice to become part of it. I was given 42 fruit saplings mostly Plum and Apple varieties. I follow all the organic farming practices in letter and in spirit. This is my bit for the climate change and to make Himachal Pradesh Clean and Green. I am sure my family will benefit from this initiative in near future.",
    },
    {
      image: testimonial4,
      name: "Woman farmer from Kokri Kalan village, Moga, Punjab.",
      quote: "I have been making a living with great difficulties. I had a liking for plants and agriculture in general. Through project Hariyali , I learnt efficient farming practices. I am confident with these practices I will reap benefit in future. I have received 31 fruit saplings of Guava, mango, Orange & Peach. I know these will add nutritional diversity for my family as well as bring additional income in future.",
    },
    // Add other testimonials
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
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
                The total forest and tree cover in India is 8,09,537 square
                kilometres i.e., 24.62 % of the total geographical area. But as
                per the National Forest Policy, the ideal percentage of total
                geographical area under forest should be at least 33% to
                maintain ecological stability. India ranked the second highest
                for the rate of deforestation after losing 668,400 hectares of
                forest cover in the last 30 years. The forest areas are under
                threat due to rapid industrialization, road and other
                connectivity projects and irrigation projects. Over and above,
                90% of the area under the biodiversity hotspots have been lost
                as per the Centre for Science and Environment’s (CSE) new report
                entitled ‘State of India’s Environment in Figures 2021’.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
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
          <div className="col-12 col-md-5">
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
        </div> */}<section className="bg-green">
      <div className="container">
        <div className="feature-description">
        <h3 className="sub-title text-center">Impact of Hariyali Project</h3>
        <p className="text-center">Project Hariyali is a unique blend in the sphere of environmental
          sustainability and impacting livelihood. Project hariyali is already contrubting towards mission LiFE & Indias commitement toward carbon neutrality</p>
        <div className="row justify-content-center">
          {/* <h4 className="text-center">Quantitative Impact</h4> */}
          <div className="col-md-8">
            <Row className="justify-content-center quantitative-card">
              <div className="col-6 col-md-4  discover-block">
                <figure class="effect-duke whysuimpact-effect">
                  {" "}
                  <h4>Number of trees planted since 2007</h4>
                  <p>24.86 Millions</p>
                </figure>
              </div>
              <div className="col-6 col-md-4  discover-block">
                <figure class="effect-duke whysuimpact-effect">
                  <h4>Overall survival rate of plant since inception</h4>
                  <p>85% Plus</p>
                </figure>
              </div>
              <div className="col-6 col-md-4 discover-block">
                <figure class="effect-duke whysuimpact-effect">
                  {" "}
                  <h4>
                    CO<sub>2</sub> sequestered through the project Since inception{" "}
                  </h4>
                  <p>400,000+ tonnes</p>
                </figure>
              </div>

              {/* </Row> */}
              {/* <h4 className="text-center">Qualitative Impact</h4> */}
              {/* <Row className="justify-content-center mb-4 quantitative-card"> */}
              <div className="col-6 col-md-4 discover-block">
                <figure class="effect-duke whysuimpact-effect">
                  {" "}
                  <h4>
                    Improvement in soil quality in terms of carbon, water holding capacity & nutrients
                    <p>Soil Health</p>
                  </h4>
                </figure>
              </div>
              <div className="col-6 col-md-4 discover-block">
                <figure class="effect-duke whysuimpact-effect">
                  <h4>
                    Significant positive change in <p>Bio-diversity</p>
                  </h4>
                </figure>
              </div>
            </Row></div>
        </div>
      </div></div></section>
      <div className="container">

        <div className="feature-description">
          <h2 className="sub-title  text-center">Awards Won</h2>

          <div className="awards-slider">
            <Carousel indicators={true}>
              {items.map((item, index) => (
                <Carousel.Item key={index}>
                  <div className="d-flex justify-content-center">
                    {item.map((subItem, subIndex) => (
                      <>
                        <div className="award-tile">
                          {/* <div key={index} className="col-12 col-md-6 mb-3"></div> */}
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
            </Carousel>
          </div>
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Body>
              {selectedImage && (
                <img src={selectedImage} alt="Modal" className="img-fluid" />
              )}
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <section className="bg-green">
      <div className="container">
        <div className="row align-items-center pv-75">
          <div className="col-12 col-md-6">
            <div className="feature-description feature-description-other">
              <h3 className="sub-title text-center">
                Impact Assessment Report{" "}
              </h3>
              <p>
                <i>
                  {" "}
                  An Annual third - party tree audits have been conducted since
                  2012 by Unique Agroforestry and Land use, Germany which is a
                  globally recognized company specializing in forestry
                  consulting, climate, forest investments, agriculture and rural
                  developments. Since FY22, Impact Assessment as part of CSR
                  guidelines have been conducted by third party organizations.
                  In the last Impact Assessment carried out for plantations done
                  in FY21, the survival rate has been reported at 94.67%.
                  Project Hariyali was awarded “Platinum” category performance
                  of CSR Activity by an NABCB accredited “Type A” Inspection
                  Body.
                </i>
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
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
      </div></section>
      
        <div className="container"> <div className="feature-description feature-description-other">
          <h3 className="text-center sub-title">Testimonials</h3>
<div className="testimonial-slider">
            <Zoom {...zoomOutProperties}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="slide-content-whysupport support-content"
                >
                  <div className="row">
                    <div className="offset-md-1 col-12 col-md-3">
                      <img
                        src={testimonial.image}
                        alt="avatar"
                        className="mb-5"
                      />
                    </div>
                    <div className="col-12 col-md-7">
                      <h3 className="mb-3">{testimonial.name}</h3>
                      <p className="">
                        <i className="bi bi-quote pe-2"></i>
                        {testimonial.quote}
                      </p>
                      <div> </div>
                    </div>
                  </div>
                </div>
              ))}


            </Zoom>
          </div>
          <div className="slide-content-whysupport support-content">
            <div className="row  d-flex justify-content-center">
              <div className="col-12 col-md-6 text-center mb-5">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/h5JfhFJG3vQ"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
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

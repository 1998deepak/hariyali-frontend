import React, { useState } from 'react';
import { Carousel, Modal, Button } from 'react-bootstrap';
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
import image3 from "../../../assets/img/slider/banner3.png";

import testimonialImg from "../../../assets/img/testimonial.png";
import limcaAward from "../../../assets/img/Limca Records 2015_page-0001.jpg";
import limcaAward1 from "../../../assets/img/Limca Records 2020_pages-to-jpg-0001.jpg";
import impactAssessment1 from "../../../assets/img/Impact Assessment Report FY 22_page-0001.jpg";
import impactAssessment2 from "../../../assets/img/Impact Assessment Report FY 23_page-0001.jpg";
import csrCertificate from "../../../assets/img/Image20230825001140.png";
import csrCertificate1 from "../../../assets/img/Image20230825001136.png";


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
      { quote: 'FICCI CSR Awards – In Skill Development & Livelihood Category',
    image: limcaAward },
      { quote: 'Limca book of Awards - Indian Record',
      image: limcaAward1 },
      { quote: 'Limca book of Awards - National Record',
      image: limcaAward }
    ],
    [
      { quote: 'Food Vision 2050 Prize by Rockefeller Foundation to Naandi Foundation',
    image : csrCertificate },
      { quote: 'The CSR Conclave and Awards by IFCCI in the Environment and Sustainability Category',
      image : csrCertificate1 }
    ],
    // Add more item groups as needed
  ];

  const testimonials = [
    {
      image: testimonialImg,
      name: 'Maria Kate',
      role: 'Photographer',
      quote:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit doloremque.',
      stars: [1, 2, 3, 4],
    },
    {
      image: image3,
      name: 'Maria Kate',
      role: 'Photographer',
      quote:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit doloremque.',
      stars: [1, 2, 3, 4],
    },
    {
      image: image1,
      name: 'Maria Kate',
      role: 'Photographer',
      quote:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit doloremque.',
      stars: [1, 2, 3, 4],
    },
    {
      image: image2,
      name: 'Maria Kate',
      role: 'Photographer',
      quote:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit doloremque.',
      stars: [1, 2, 3, 4],
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


  return (
    <>
      {/* body */}
      <section className="banner banner-support">
        <div className="title">{/* <h1>Why Support Us</h1> */}</div>
      </section>
      <div className="container pv-75">
        <div className="row mb30 impact-wrapper">
          <div className="col-12 col-md-4 text-center">
            <div className="tree-features">
              {/* <i className="icon-tree"></i> */}
              <h4>Number of trees planted since 2007</h4>
              <p>20.89 Millions</p>
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <div className="tree-features">
              {/* <i className="icon-survival"></i> */}
              <h4>Overall survival rate of plant since inspection</h4>
              <p>85% Plus</p>
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <div className="tree-features">
              {/* <i className="icon-carbon"></i> */}
              <h4>Trees sequestered through the project Since inspection </h4>
              <p> approx.</p>
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <div className="tree-features">
              {/* <i className="icon-carbon"></i> */}
              <h4>
                Project has witnessed significant positive change in bio
                diversity
              </h4>
              {/* <p> approx.</p> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container pv-75">
        <h3 className="text-center sub-title">Awards Won</h3>
        {/* <Zoom scope={0.4}>
          {awards.quotes.map((contant, index) => (
            <div className="row justify-content-center my-5 overflow-x">
              <div className="col-12 col-md-6 mb-3"></div>
              <div key={index} className="slide-content">
                <div className="award-wrapper">
                  <h4>{contant.quote}</h4>
                </div>
              </div>
            </div>
            
          ))}
        </Zoom> */}
        <Carousel indicators={true}>
      {items.map((item, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-center">
            {item.map((subItem, subIndex) => (
              <>
              <div key={index} className="row justify-content-center my-5 overflow-x">
                <div className="col-12 col-md-6 mb-3"></div>
                  <div  className="slide-content2" onClick={() => openModal(subItem.image)}>
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
    <Modal show={showModal} onHide={closeModal}>
        <Modal.Body>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Modal"
              className="img-fluid"
            />
          )}
        </Modal.Body>
      </Modal>
        {/* <div className="row justify-content-center my-5 overflow-x">
          <div className="col-12 col-md-6 mb-3">
                <div className="award-wrapper">
                  <h4>FICCI CSR Awards – In Skill Development & Livelihood Category</h4>
                </div>   
            </div>
            <div className="col-12 col-md-6 mb-3">
                <div className="award-wrapper">
                  <h4>FICCI CSR Awards – In Skill Development & Livelihood Category</h4>
                </div>   
            </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="award-wrapper">
              <h4>FICCI CSR Awards – In Skill Development & Livelihood Category</h4>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="award-wrapper">
              <h4>The CSR Conclave and Awards by IFCCI in the Environment and Sustainability Category</h4>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="award-wrapper">
              <h4>Food Vision 2050 Prize by Rockefeller Foundation to Naandi Foundation</h4>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="award-wrapper">
              <h4>Limca book of Awards.</h4>
            </div>
          </div>
        </div> */}
      </div>
      <div className="container">
        <h3 className="text-center sub-title">Testimonials</h3>
        <div className="row">
          <div className="col-12 col-md-6">
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
          <div className="col-12 col-md-6">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/YnhmRcQ4q6M"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        {/* <Slideshow /> */}
        <Zoom scope={0.4}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="slide-content">
              <img
                style={{ width: "150px" }}
                src={testimonial.image}
                alt="avatar"
              />
              <h5 className="mb-3">{testimonial.name}</h5>
              <p>{testimonial.role}</p>
              <p className="text-muted">
                <i className="fas fa-quote-left pe-2"></i>
                {testimonial.quote}
              </p>
              <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                {/* {testimonial.stars.map((star, starIndex) => (
              <li key={starIndex}>
                <i className="fas fa-star fa-sm"></i>
              </li>
            ))} */}
                <li>
                  <i className="far fa-star fa-sm"></i>
                </li>
              </ul>
            </div>
          ))}
        </Zoom>
        {/* <div id="carouselExampleControls" className="carousel slide text-center carousel-dark my-5" data-mdb-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="rounded-circle shadow-1-strong mb-4"
                src={testimonialImg} alt="avatar"
                width={150} />
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <h5 className="mb-3">Koppula Srinivas</h5>
                  <p className="text-muted">
                    <i className="bi bi-quote pe-2"></i>
                    Our farm yields 894 kgs of
                    crimson red cherries which
                    we have given to the co-operative thereby earning 6
                    times of what we earned two
                    years ago.<br />-
                    Koppula Srinivas
                    and Karramma from Gondhi
                    Rapa village (Hukumpeta
                    mandal), Araku.
                    The family has been a part of
                    Hariyali since 2018
                  </p>
                </div>
              </div>

            </div>

          </div>
          <button className="carousel-control-prev" type="button" data-mdb-target="#carouselExampleControls"
            data-mdb-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-mdb-target="#carouselExampleControls"
            data-mdb-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> */}

        {/* <MDBContainer className="py-5">
        <MDBCarousel showControls dark>
          <MDBCarouselInner>
            <MDBCarouselItem className="active">
              <MDBContainer>
                <MDBRow className="text-center">
                  <MDBCol lg="4" className="mb-5 mb-md-0">
                    <div className="d-flex justify-content-center mb-4">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                        className="rounded-circle shadow-1-strong" width={150} height={150} />
                    </div>
                    <h5 className="mb-3">Anna Deynah</h5>
                    <h6 className="text-primary mb-3">UX Designer</h6>
                    <p className="px-xl-3">
                      <MDBIcon fas icon="quote-left" className="pe-2" />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quod eos id officiis hic tenetur quae quaerat ad velit ab
                      hic tenetur.
                    </p>
                    
                  </MDBCol>
                  <MDBCol lg="4" className="d-none d-lg-block">
                    <div className="d-flex justify-content-center mb-4">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                        className="rounded-circle shadow-1-strong" width={150} height={150} />
                    </div>
                    <h5 className="mb-3">John Doe</h5>
                    <h6 className="text-primary mb-3">Web Developer</h6>
                    <p className="px-xl-3">
                      <MDBIcon fas icon="quote-left" className="pe-2" />
                      Ut enim ad minima veniam, quis nostrum exercitationem ullam
                      corporis suscipit laboriosam, nisi ut aliquid commodi.
                    </p>
                    
                  </MDBCol>
                  <MDBCol lg="4" className="d-none d-lg-block">
                    <div className="d-flex justify-content-center mb-4">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                        className="rounded-circle shadow-1-strong" width={150} height={150} />
                    </div>
                    <h5 className="mb-3">Maria Kate</h5>
                    <h6 className="text-primary mb-3">Photographer</h6>
                    <p className="px-xl-3">
                      <MDBIcon fas icon="quote-left" className="pe-2" />
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti atque
                      corrupti.
                    </p>
                  
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBCarouselItem>
            <MDBCarouselItem>
              <MDBContainer>
                <MDBRow className="text-center">
                  <MDBCol lg="4" className="mb-5 mb-md-0">
                    <div className="d-flex justify-content-center mb-4">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(3).webp"
                        className="rounded-circle shadow-1-strong" width={150} height={150} />
                    </div>
                    <h5 className="mb-3">John Doe</h5>
                    <h6 className="text-primary mb-3">UX Designer</h6>
                    <p className="px-xl-3">
                      <MDBIcon fas icon="quote-left" className="pe-2" />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quod eos id officiis hic tenetur quae quaerat ad velit ab
                      hic tenetur.
                    </p>
                    
                  </MDBCol>
                  <MDBCol lg="4" className="d-none d-lg-block">
                    <div className="d-flex justify-content-center mb-4">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                        className="rounded-circle shadow-1-strong" width={150} height={150} />
                    </div>
                    <h5 className="mb-3">Alex Rey</h5>
                    <h6 className="text-primary mb-3">Web Developer</h6>
                    <p className="px-xl-3">
                      <MDBIcon fas icon="quote-left" className="pe-2" />
                      Ut enim ad minima veniam, quis nostrum exercitationem ullam
                      corporis suscipit laboriosam, nisi ut aliquid commodi.
                    </p>
                    
                  </MDBCol>
                  <MDBCol lg="4" className="d-none d-lg-block">
                    <div className="d-flex justify-content-center mb-4">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(5).webp"
                        className="rounded-circle shadow-1-strong" width={150} height={150}/>
                    </div>
                    <h5 className="mb-3">Maria Kate</h5>
                    <h6 className="text-primary mb-3">Photographer</h6>
                    <p className="px-xl-3">
                      <MDBIcon fas icon="quote-left" className="pe-2" />
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti atque
                      corrupti.
                    </p>
                    
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBCarouselItem>
          
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer> */}
      </div>
      <div className="">
        <div className="section bggray">
          <Container className="pt30">
            <Row className="justify-content-between  padding30tb contact-form-wrap">
              <div className="col-12">
                <div>
                  <p>
                    Project Hariyali is a unique blend in the sphere of
                    environmental sustainability and impacting livelihood.
                    <br />
                    The Project on large scale{" "}
                    <span className="colorgreen">
                      tree planting, natural resource management, Global
                      regenerative organic farming
                    </span>{" "}
                    protocols to enrich agricultural eco-system and build
                    functional forests as means to increase communities' income
                    for an overall wellbeing of the community and mother earth
                    <br />
                    <br />
                    We are available at
                    <span className="colorgreen"> 1t.org</span>
                  </p>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default WhySupportUs;




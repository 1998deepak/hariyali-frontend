import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import mahindraLogo from "../../../assets/img/mahindra-logo.png";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
// about
import aboutbg from "../../../assets/img/about/tree-background.png";
import about1 from "../../../assets/img/about/about1.png";
import about2 from "../../../assets/img/about/about2.png";
import about3 from "../../../assets/img/about/about3.png";
// about
// program
// import program1 from "../../assets/img/program/program1.png";
import program1 from "../../../assets/img/regenarate.png";
import program2 from "../../../assets/img/biodiversity.jpg";
import program3 from "../../../assets/img/co2.jpg";
import program4 from "../../../assets/img/lifestyle.jpg";
import planting from "../../../assets/img/about/hariyali-img-4.jpg";
import bio from "../../../assets/img/program/hariyali-img-2.jpg";
import impro from "../../../assets/img/program/hariyali-img-3.jpg";
// program
// projects
import ourproject1 from "../../../assets/img/project/ourproject1.png";
import ourproject2 from "../../../assets/img/project/ourproject2.png";
import ourproject3 from "../../../assets/img/project/ourproject3.png";
// projects
// SDG Links
import sdg13 from "../../../assets/img/SDG/sdg13.png";
import sdg15 from "../../../assets/img/SDG/sdg15.png";
import sdg8 from "../../../assets/img/SDG/sdg8.png";
import sdg14 from "../../../assets/img/SDG/sdg14.png";
import sdg17 from "../../../assets/img/SDG/sdg17.png";
// SDG Links
// blogs
import blogs1 from "../../../assets/img/blogs/blogs1.jpg";
import blogs2 from "../../../assets/img/blogs/blogs2.jpg";
import blogsbg from "../../../assets/img/blogs/blogbg.png";
// blogs
// icon
import { GiShakingHands } from "react-icons/gi";
import { RiCalendarCheckLine } from "react-icons/ri";
import { FaPrayingHands } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { TbTree } from "react-icons/tb";
import { SiGumtree } from "react-icons/si";
import { TfiShoppingCart } from "react-icons/tfi";
import { BiLink } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { ImLocation } from "react-icons/im";
import { BsBoxArrowUpRight } from "react-icons/bs";
// import 'react-slideshow-image/dist/styles.css';
// import riseProgramResgions1 from "../../../assets/img/program/rise-program-resgions-1.webp";
// import riseProgramResgions2 from "../../../assets/img/program/rise-program-resgions-2.webp";
// import riseProgramResgions3 from "../../../assets/img/program/rise-program-resgions-3.webp";
// import riseProgramResgions4 from "../../../assets/img/program/rise-program-resgions-4.webp";
// gallary
// import improving from "../../../assets/img/hariyali-img-4.jpg";
import gallary2 from "../../../assets/img/gallary/gallary2.jpg";
import gallary3 from "../../../assets/img/gallary/gallary3.jpg";
import { Link } from "react-router-dom";
// animation
import { AnimationOnScroll } from "react-animation-on-scroll";
//
import { Zoom } from "react-slideshow-image";
// import image1 from "../../../assets/img/slider/rise-program-resgions-1.jpg";
// import image2 from "../../../assets/img/slider/rise-program-resgions-2.jpg";
// import image3 from "../../../assets/img/slider/rise-program-resgions-3.jpg";
// import image4 from "../../../assets/img/slider/rise-program-resgions-4.jpg";
import image1 from "../../../assets/img/hariyali-img-4.jpg";
import image2 from "../../../assets/img/slider/extra.jpg";
import image3 from "../../../assets/img/slider/banner3.png";
import image4 from "../../../assets/img/slider/banner4.jpg";
import image5 from "../../../assets/img/Image20230827121634.png"

// import plantimg from "../../../assets/img/pmat_a_tree.png";

import planttreeImg from "../../../assets/img/plant.png";
import gifttreeImg from "../../../assets/img/holding-hand.png";

import { useEffect } from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// style was imported in index.css
// import "react-slideshow-image/dist/styles.css";
// const images = [image1, image2, image3, image4];
const slides = [
  {
    image: image2,
    title: 'When you cut a tree you take a life and when you plant a tree you plant hope',
    description: 'we are planting millions of trees across indian since 2007',
  },
  {
    image: image1,
    title: 'Trees need people as much as people need trees',
    description: 'Araku Valley, Vishakhapatnam, Andhra Pradesh',
  },
  {
    image: image3,
    title: 'A hectare of tropical forest absorbs 50-100 tonnes of CO2 per annum. Come sow a better future',
    description: 'Tarn Taran, Punjab',
  },
  {
    image: image4,
    title: 'Take your first step towards a green future',
    description: 'Shravasti, Uttar Pradesh',
  },
  {
    image: image5,
    title: 'A farmer does not only grow crops but creates a healthy environment',
    description: 'Wardha, Maharashtra',
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

    <div className="slide-container">
      <Zoom {...zoomOutProperties}>
        {slides.map((each, index) => (
          <>
          <img key={index} style={{ width: "100%" }} src={each.image} />
          <div className="slide-content">
            <h2>{each.title}</h2>
            
            <div className="donate-btn-group">
              <div className="d-flex flex-wrap justify-content-start">          
                  <a href="" className="btn btn-primary">     
                      Plant A tree <img src={planttreeImg} />
                  </a>          
                  <a href="" className="btn btn-primary">     
                    Gift a Tree  <img src={gifttreeImg} /> 
                  </a>
              </div>
            </div>
          </div>
          <div className="slide-location">
            <p><i className="bi-bi bi-geo-alt"></i>{each.description}</p>
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
  

  // const goToLogin = () => {
  //   navigate("/Login");
  // };
  // const goToDonate = () => {
  //   navigate("/Donate");
  // };
  useEffect(() => {
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        );
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    });
  }, []);
  return (
    <>
      {/* body */}
      {/* slider */}
      <div className="">
        <Slideshow />
        
      </div>
      {/* slide info */}

      <div className="container pv-75">
        
        <div className="row mb30 impact-wrapper">
          <div className="col-12 col-md-4 text-center">
            <div className="tree-features">
              {/* <i className="icon-tree"></i> */}
              <h4>Trees planted so far</h4>
              <p>228,61,288</p>
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <div className="tree-features">
              {/* <i className="icon-survival"></i> */}
              <h4>Survival rate of trees</h4>
              <p>85%</p>
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <div className="tree-features">
              {/* <i className="icon-carbon"></i> */}
              <h4>Carbon sequestered</h4>
              <p>0.4 milion tCO<sub>2</sub>e</p>
            </div>
          </div>
        </div>
        
      </div>
      
      <div className="container pv-75">
        
        <div className="row">
        
          <div className="col-12 col-md-6">
            <div className="program-details">
              <h3 className="mb-3">Who are we</h3>
              <p>The project hariyali is a joint initiative by Mahindra Foundation and Nandi Foundation.
            The project aims to plant 5 million trees per annum. Project Hariyali is part of nature-based solution that promotes Regenerative agriculture.</p>
              <div className="pt-5">
                <a href = "/AboutUs" className="btn btn-secondary">Know More</a>
                <button className="btn btn-primary">Donate</button> 
              </div>
            </div>          
          </div>
          <div className="col-12 col-md-6">
            <div className="img-responsive feature-image">
              <img src={program1} alt="planting" className="imgwidth100" />  
            </div>            
          </div>
        </div>

        <div className="row pv-75">  
        <div className="col-12 col-md-6">
            <div className="img-responsive feature-image">
              <img src={program3} alt="planting" className="imgwidth100" />  
            </div>            
          </div>        
          <div className="col-12 col-md-6">
            <div className="program-details">
              <h3 className="mb-3">What we do</h3>
              <p>Project Hariyali aims to increase the green cover, arrest the rising ecological imbalance, enhace biodiversity and in the process support the livelihood of marginalized farmers.</p>
              <div className="pt-5">
                <a href="/WhatWeDo" className="btn btn-secondary">Know More</a>
                <button className="btn btn-primary">Donate</button> 
              </div>
            </div>          
          </div>
        </div>
      </div>
      <section className="bg-green">
        <div className="container pv-75">
          <div className="row">
            <div className="col-12 col-md-6">
            <div className="program-details">
                <h3 className="mb-3">Why Support Us</h3>
                <p>India is the 7th most vulnerable country with respect to climate extremes. The total forest and tree cover in India is 24.62 % as opposed to the minimum 33% to maintain ecological stability. Project Hariyali has increased the green cover and is in alignment with LIFE "Lifestyle for Environment" initiative by the government of India.
                  Project Hariyali has been conferred multiple awards by national and international bodies.</p>
 
                <div className="pt-5">
                <a href="/WhySupportUs" className="btn btn-secondary">Read More</a>
                  <button className="btn btn-primary">Donate</button> 
                </div>
              </div>          
            </div>
            <div className="col-12 col-md-6">
            <div className="img-responsive feature-image">
              <img src={program2} alt="Program" className="imgwidth100" />
              </div>
            </div>          
          </div>
        </div>   
      </section>      
      <div className="container pv-75">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="img-responsive feature-image">
              <img src={program3} alt="Program" className="imgwidth100" />
            </div>
          </div>   
          <div className="col-12 col-md-6">
          <div className="program-details">
              <h3 className="mb-3">How To Associate</h3>
              <p>UN Framework Convention on Climate Change raises awareness and builds knowledge to help mitigate climate change. 
                The Paris Agreement within the UNFCCC aims at achieving greenhouse gas emissions mitigations. The agreement outlines the National Determined Contributions (NDCs), each member country should make in order to stay ‘well below’ the 2°C target. India is committed to its NDC and seeks to be carbon neutral by 2070</p>
                <div className="pt-5">
                <a href="/WaystoAssociate" className="btn btn-secondary">Read More</a>
                  <button className="btn btn-primary">Donate</button> 
                </div>
            </div>          
          </div>                 
        </div>
      </div> 
      <section className="bg-green">
        <div className="container pv-75">
          <div className="row">
            <div className="col-12 col-md-6">
            <div className="program-details">
                <h3 className="mb-3">Where We Are</h3>
                <p>India is promoting individual responsibility toward climate action through Mission LIFE “Lifestyle for Environment”. 
                  This movement aims to transform individuals into pro planet people by having them adopt sustainable lifestyles and minimize their carbon footprint</p>
                  <div className="pt-5">
                  <a href="/FootPrint" className="btn btn-secondary">Read More</a>
                    <button className="btn btn-primary">Donate</button> 
                </div>
              </div>          
            </div>
            <div className="col-12 col-md-6">
            <div className="img-responsive feature-image">
              <img src={program4} alt="Program" className="imgwidth100" />
              </div>
            </div>          
          </div>
        </div>   
      </section>
      {/* <div className="container pt75 mb30">
       
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 mb30">
          <div className="card">
            <img src={planting} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Regenerative Agriculture</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="card-body">
              <a href="#" className="card-link">Card link</a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb30">
          <div className="card">
            <img src={program1} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Improving soil fertility</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="card-body">
              <a href="#" className="card-link">Card link</a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb30">
          <div className="card">
            <img src={bio} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Enhancing Bio-Diversity</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="card-body">
              <a href="#" className="card-link">Card link</a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb30">
          <div className="card">
            <img src={impro} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Improving livelihood</h5>
              <p className="card-text">25,984 lives of farmer families impacted.</p>
            </div>
            <div className="card-body">
              <a href="#" className="card-link">Card link</a>
            </div>
          </div>
        </div>
      </div>     
      </div> */}
      {/* about */}
      

      {/* Hariyali program */}
     
      {/* Hariyali program */}
      {/* <div className="pt50">
        <div className="section-header ">
          <div className=" heading-red-medium text-center ">
            ENHANCING BIO-DIVERSITY
          </div>
          <div className="subheading text-center ">
                     </div>
        </div>
        <div className="col-12 ">
          <img src={bio} alt="Program" className="imgwidth100" />
        </div>
      </div> */}
      {/* Hariyali program */}
      {/* <div className="pt50">
        <div className="section-header ">
          <div className=" heading-red-medium text-center ">
            improving livelihood
          </div>
          <div className="subheading text-center ">
            25,984 lives of farmer families impacted.
          </div>
        </div>
        <div className="col-12 ">
          <img src={impro} alt="Program" className="imgwidth100" />
        </div>
      </div> */}
      {/* Hariyali program */}

      {/* sdg */}
      <div className="project-bg ">
        <Container className="ptb50">
          <h2 className="sub-title text-center mb30 ">
              SDG Links
          </h2>
          <Row className="justify-content-between ">            
            <div className="col-6 col-md-4 col-lg-2 mb-lg-0 mb-3 discover-block">
                <div className="discoverImg"><img src={sdg13} width="100%" /></div>
            </div>
            <div className="col-6 col-md-4 col-lg-2 mb-lg-0 mb-3 discover-block">
                <div className="discoverImg"><img src={sdg15} width="100%" /></div>
            </div>
            <div className="col-6 col-md-4 col-lg-2 mb-lg-0 mb-3 discover-block">
                <div className="discoverImg"><img src={sdg8} width="100%" /></div>
            </div>
            <div className="col-6 col-md-4 col-lg-2 mb-lg-0 mb-3 discover-block">
                <div className="discoverImg"><img src={sdg14} width="100%" /></div>
            </div>
            <div className="col-6 col-md-4 col-lg-2 mb-lg-0 mb-3 discover-block">
                <div className="discoverImg"><img src={sdg17} width="100%" /></div>
            </div>
            {/* <div className="col-4 ">
              <div className="bggreen projectdiv row">
                <div className="col-5 small-center">
                  <img
                    src={ourproject1}
                    alt="Project"
                    className="imgwidth100 imgwidth25"
                  />
                </div>
                <div className="col-7 projectNumb ">01</div>
                <div className="projectText">
                  Biodiverse functional forests{" "}
                </div>
              </div>
            </div>
            <div className="col-4 ">
              <div className="bggreen projectdiv row">
                <div className="col-5 small-center">
                  <img
                    src={ourproject2}
                    alt="Project"
                    className="imgwidth100 imgwidth25"
                  />
                </div>
                <div className="col-7 projectNumb ">02</div>
                <div className="projectText">Skilled farmers </div>
              </div>{" "}
            </div>
            <div className="col-4 ">
              <div className="bggreen projectdiv row">
                <div className="col-5 small-center">
                  <img
                    src={ourproject3}
                    alt="Project"
                    className="imgwidth100 imgwidth25"
                  />
                </div>
                <div className="col-7 projectNumb ">03</div>
                <div className="projectText">
                  Individual farmer micro-nurseries
                </div>
              </div>
            </div> */}
          </Row>
        </Container>
      </div>
      {/* project */}
      {/* Blogs and news */}
      {/* <div className=" ">
        <Container>
          <Row className="justify-content-between ptb50 ">
            <h2 className="sub-title text-center mb30">
              Get in Touch
            </h2>

            <div className="col-12">
              <div className=" row">
                <div className="col-7 p0">
                  <img src={blogs1} alt="Blogs" className="imgwidth100" />
                </div>
                <div className="col-5 bgblack">
                  <div className="bloginheading blog-rightdiv">
                    <h3>LEARN MORE</h3>
                    <div className="btn-grp contact-usbtndiv" >
                      <a className="btn inquire-now contact-usbtn" variant="primary" onClick={handleShow}>Contact Us</a>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Contact Us</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="homeinput-div">
                          <label for="name" className="form-label">Name</label>
                          <input className="form-control form-text required" type="text" name="name" value="" placeholder="Name" required="required" />
                        </div>
                        <div className="homeinput-div">
                          <label for="email" className="form-label">Email</label>
                          <input className="form-control form-text required" type="text" name="email" value="" placeholder="Email" required="required" />
                        </div><div className="homeinput-div">
                        <label for="edit-query" className="form-label">Query</label>
                          <textarea className="form-control form-textarea required" rows="4" cols="60" maxlength="2500" placeholder="Write you query here...." required="required" aria-required="true"></textarea>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="homesubmit-div" variant="primary" >Submit
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>

          </Row>
        </Container>
      </div> */}
      {/* body */}
    </>
  );
}

export default HomePage;

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
import program1 from "../../../assets/img/program/hariyali-img-1.jpg";
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
import image1 from "../../../assets/img/slider/rise-program-resgions-1.jpg";
import image2 from "../../../assets/img/slider/rise-program-resgions-2.jpg";
import image3 from "../../../assets/img/slider/rise-program-resgions-3.jpg";
import image4 from "../../../assets/img/slider/rise-program-resgions-4.jpg";
import { useEffect } from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// style was imported in index.css
// import "react-slideshow-image/dist/styles.css";
const images = [image1, image2, image3, image4];

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
    <div className="slide-container">
      <Zoom {...zoomOutProperties}>
        {images.map((each, index) => (
          <img key={index} style={{ width: "100%" }} src={each} />
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
      <div className="pt100">
        <Slideshow />
        <div className="slid-linkdiv">
          <div className="all">
            <div className="lefterside">
              <div className="explainer">
                {" "}
                <BiLink />
              </div>
              <div className="text">Hosting</div>
            </div>
            <div className="leftside">
              <div className="explainer">
                {" "}
                <BiLink />
              </div>
              <div className="text">Web Design</div>
            </div>
            <div className="centerside">
              <div className="explainer">
                {" "}
                <BiLink />
              </div>
              <div className="text">Discover the chain</div>
            </div>
            <div className="rightside">
              <div className="explainer">
                {" "}
                <BiLink />
              </div>
              <div className="text">Backend Development</div>
            </div>
            <div className="righterside">
              <div className="explainer">
                {" "}
                <BiLink />
              </div>
              <div className="text">SEO</div>
            </div>
          </div>
        </div>
      </div>
      {/* slide info */}

      <div className="justify-content-between pt75 mb30">
        {/* <div className="mahindralogo">
          <img src={mahindraLogo} alt="Mahindra Logo" />
        </div> */}

        <div className="heading colorblack text-center ">2,28,61,288</div>

        <div className="subheading text-center">
          Creating carbon sink through focussed large scale plantation
        </div>
      </div>

      <img src={planting} alt="planting" className="imgwidth100" />
      {/* about */}
      <div className="aboutbg-img">
        <img src={aboutbg} alt="About" />
      </div>

      {/* about */}
      <div className="clear"></div>
      {/* Hariyali program */}
      <div className="pt50">
        {/* <div className="heading colorblack text-center ">
          OVERVIEW
        </div> */}
        <div className="section-header mt-5">
          <div className=" heading-red-medium text-center ">
            Regenerative Agriculture
          </div>
          <div className="subheading text-center ">
            Improving soil health using regen agri practices and that resource mgt techniques          </div>
        </div>
        <div className="col-12 ">
          <img src={program1} alt="Program" className="imgwidth100" />
        </div>{" "}
      </div>
      {/* Hariyali program */}
      <div className="pt50">
        <div className="section-header ">
          <div className=" heading-red-medium text-center ">
            ENHANCING BIO-DIVERSITY
          </div>
          <div className="subheading text-center ">
            The trees we plant strengthen the ecosystem and enhance ecological diversity.         </div>
        </div>
        <div className="col-12 ">
          <img src={bio} alt="Program" className="imgwidth100" />
        </div>{" "}
      </div>
      {/* Hariyali program */}
      <div className="pt50">
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
        </div>{" "}
      </div>
      {/* Hariyali program */}

      {/* sdg */}
      <div className="project-bg ">
        <Container>
          <Row className="justify-content-between ptb50">
            <div className="heading colorblack text-center mb30">
              SDG Links
            </div>
            <div className="col-lg-2 col-12 mb-lg-0 mb-3 discover-block">
              <div className="positin-relative " >
                <div className="discoverImg"><img src={sdg13} width="100%" /></div>
                {/* <div className="discoverLink text-lg-start text-center"><span>Trust Positive </span></div> */}
                {/* <a href="/trust-positive" className="stretched-link"></a> */}
              </div>
            </div>
            <div className="col-lg-2 col-12 mb-lg-0 mb-3 discover-block">
              <div className="positin-relative" >
                <div className="discoverImg"><img src={sdg15} width="100%" /></div>
                {/* <div className="discoverLink text-lg-start text-center"><span>Planet Positive </span></div> */}
                {/* <a href="/sustainability" className="stretched-link"></a> */}
              </div>
            </div>
            <div className="col-lg-2 col-12 discover-block">
              <div className="positin-relative aos-init aos-animate" >
                <div className="discoverImg"><img src={sdg8} width="100%" /></div>
                {/* <div className="discoverLink text-lg-start text-center"><span>Discover Business Verticals </span></div> */}
                {/* <a href="/our-business" className="stretched-link"></a> */}
              </div>
              <div className="clear"></div>
            </div>
            <div className="col-lg-2 col-12 discover-block">
              <div className="positin-relative aos-init aos-animate">
                <div className="discoverImg"><img src={sdg14} width="100%" /></div>
                {/* <div className="discoverLink text-lg-start text-center"><span>Discover Business Verticals </span></div> */}
                {/* <a href="/our-business" className="stretched-link"></a> */}
              </div>
            </div>
            <div className="col-lg-2 col-12 discover-block">
              <div className="positin-relative aos-init aos-animate">
                <div className="discoverImg"><img src={sdg17} width="100%" /></div>
                {/* <div className="discoverLink text-lg-start text-center"><span>Discover Business Verticals</span></div> */}
                {/* <a href="/our-business" className="stretched-link"></a> */}
              </div>
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
      <div className=" ">
        <Container>
          <Row className="justify-content-between ptb50 ">
            <div className="heading colorblack text-center mb30">
              GET IN TOUCH
            </div>

            <div className="col-12">
              <div className=" row">
                <div className="col-7 p0">
                  <img src={blogs1} alt="Blogs" className="imgwidth100" />
                </div>
                <div className="col-5 bgblack">
                  <div className="bloginheading blog-rightdiv">LEARN MORE
                    <div className="btn-grp contact-usbtndiv" >
                      <a className="btn inquire-now contact-usbtn" variant="primary" href="/ContactUs" >Contact Us</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </Row>
        </Container>
      </div>
      {/* body */}
    </>
  );
}

export default HomePage;

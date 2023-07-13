import React  from "react";
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
import program1 from "../../../assets/img/program/extra2.jpg";
import slider1 from "../../../assets/img/slider/rise-program-resgions-2.webp";
import planting from "../../../assets/img/slider/extra.jpg";

// program
// projects
import ourproject1 from "../../../assets/img/project/ourproject1.png";
import ourproject2 from "../../../assets/img/project/ourproject2.png";
import ourproject3 from "../../../assets/img/project/ourproject3.png";
// projects
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
import improving from "../../../assets/img/hariyali-img-4.jpg";
import gallary2 from "../../../assets/img/gallary/gallary2.jpg";
import gallary3 from "../../../assets/img/gallary/gallary3.jpg";
import { Link } from "react-router-dom";
// animation
import { AnimationOnScroll } from "react-animation-on-scroll";
//
import { Zoom } from "react-slideshow-image";
import image1 from "../../../assets/img/slider/rise-program-resgions-1.webp";
import image2 from "../../../assets/img/slider/rise-program-resgions-2.webp";
import image3 from "../../../assets/img/slider/rise-program-resgions-3.webp";
import image4 from "../../../assets/img/slider/rise-program-resgions-4.webp";
import { useEffect } from "react";

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
        <div className="mainslidediv">
          <div className="mainslideheading">
            <ImLocation />
            Himachal Pradesh
          </div>
          {/* <div className="mainslidesubheading">
            The project has planted 1mn trees per year since 2007.
          </div> */}
        </div>
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
        <div className="mahindralogo">
          <img src={mahindraLogo} alt="Mahindra Logo" />
        </div>

        <div className="heading colorblack text-center ">3,590,760</div>

        <div className="subheading text-center">
          The project has planted 1mn trees per year since 2007.
        </div>
      </div>

      <img src={planting} alt="planting" className="imgwidth100" />
      {/* about */}
      <div className="aboutbg-img">
        <img src={aboutbg} alt="About" />
      </div>
      <Container>
        <Row className="justify-content-between postionindex">
          <div className="aboutheading col-5">
            <div className="headinguptext">We are working </div>

            <div className="heading mt-13 colorblack">About Us</div>
          </div>
          <div className="subaboutheading col-6 justify-content-end">
            <div className="about-subheading">Building Green Cover: </div>
            <p>
              Mahindra Hariyali Planting a Million <br />
              Trees AnnuaLLY.
              <br />
              19.08 million trees planted pan India till date.
              <br />
              Over 11.68 million trees planted in Araku Valley to enhance <br />
              the livlihood of tribal farmers.
            </p>
          </div>
          {/* about counting text */}
          <div className="col-4 ">
            <div className="aboutcount">01</div>

            <div className="aboutdiv-padding">
              <div className="about-subheading">Objective</div>
              <p>
                The aim was to increase the green cover, arrest the rising
                ecological
              </p>
              <div className="learnmore">
                <Link>
                  Learn more <BsBoxArrowUpRight />
                  <div className="learnmoreborder"></div>
                </Link>
              </div>

              <img src={about1} alt="About" className="imgwidth100 aboutimg" />
            </div>
          </div>
          <div className="col-4 about2div pt100">
            <div className="aboutcount">02</div>

            <div className="aboutdiv-padding">
              <div className="about-subheading">Mission </div>
              <p>Partnerships to achieve the Mission</p>
              <div className="learnmore">
                <Link>
                  Learn more <BsBoxArrowUpRight />
                  <div className="learnmoreborder"></div>
                </Link>
              </div>

              <img src={about2} alt="About" className="imgwidth100 aboutimg" />
            </div>
          </div>
          <div className="col-4 about2div pt40">
            <div className="aboutcount">03</div>

            <div className="aboutdiv-padding">
              <div className="about-subheading">Partnership </div>
              <p>
                Protect, restore and promote sustainable use of terrestrial
                ecosystems,
              </p>
              <div className="learnmore">
                <Link>
                  Learn more <BsBoxArrowUpRight />
                  <div className="learnmoreborder"></div>
                </Link>
              </div>

              <img src={about3} alt="About" className="imgwidth100 aboutimg" />
            </div>
          </div>
        </Row>
      </Container>

      <div className="aboutinfo-bg ">
        <Container className="pt40 spt70">
          <Row className="justify-content-between">
            {" "}
            <div className="col-5 ">
              <div className="headinguptext colorwhite">About Us</div>

              <div className="heading colorwhite lineh50">
                Project Background <br />& Impact
              </div>
            </div>
            <div className="col-5 justify-content-end colorwhite small-pb-50">
              Araku, nestled in the north-west region of Andhra Pradesh, is home
              to various Adivasi Tribal Groups, left untouched by development
              and continued to live in abject poverty.
              <br />
              <br />
              The region dominated entirely by Scheduled Tribe farmers (over
              90%), was characterized by poor infrastructure, dismal
              connectivity, low women’s literacy rates, high infant and maternal
              mortality and low agricultural productivity.
            </div>
          </Row>
        </Container>
      </div>
      {/* about */}
      <div className="clear"></div>
      {/* Hariyali program */}
      <div className="pt50">
        <div className="mb30">
          <div className="heading colorblack text-center ">
            Our Hariyali Program
          </div>

          <div className="subheading text-center">
            Keshrani, Shrawasti, Uttar Pradesh
          </div>
        </div>
        <div className="col-12 ">
          <img src={program1} alt="Program" className="imgwidth100" />
        </div>{" "}
      </div>
      {/* Hariyali program */}
      {/* project */}
      <div className="project-bg ">
        <Container>
          <Row className="justify-content-between ptb50">
            <div className="heading colorblack text-center mb30">
              Our Projects
            </div>

            <div className="col-4 ">
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
            </div>
          </Row>
        </Container>
      </div>
      {/* project */}
      {/* gallary */}
      <div className="pt50">
        <div className="mb30">
          <div className="heading colorblack text-center ">
            IMPROVING LIVELIHOOD
          </div>

          <div className="subheading text-center">
            25,984 lives of farmer families impacted.
          </div>
        </div>

        <img
          src={improving}
          alt="IMPROVING LIVELIHOOD"
          className="improvingimg"
        />
        {/* <ImageGallery items={images} /> */}
      </div>
      {/* gallary */}
      {/* Blogs and news */}
      <div className=" ">
        <Container>
          <Row className="justify-content-between ptb50">
            <div className="heading colorblack text-center mb30">
              Blogs and News
            </div>

            <div className="col-12">
              <div className=" row">
                <div className="col-7 p0">
                  <img src={blogs1} alt="Blogs" className="imgwidth100" />
                </div>
                <div className="col-5 bgblack">
                  <div className="bloginheading blog-rightdiv">LEARN MORE</div>
                </div>
              </div>
            </div>

            {/* <div className="col-2 blogbg">
              <img src={blogsbg} alt="Blogs" />
            </div> */}
            {/* <div className="col-2"></div> */}
            {/* <div className="col-10 postionindex pt40 justify-content-end ">
              <div className="blog-2ndbg bggreen blogsdiv row">
                <div className="col-5">
                  <img src={blogs2} alt="Blogs" className="imgwidth100" />
                </div>
                <div className="col-7">
                  <p>
                    Karramma carrying coffee saplings to her farm for planting
                    Koppula Srinivas and Karramma from village Gondhi Rapa
                    (Hukumpeta mandal) have been a part of Mahindra Hariyali
                    since 2018, with a keen desire to improve coffee quality and
                    reap maximum benefits from their 1-acre coffee farm
                  </p>
                </div>
              </div>
            </div> */}
          </Row>
        </Container>
      </div>
      {/* Blogs and news */}
      {/* <div className="pbt40 text-center">
        <iframe
          className="blogVideo"
          src="https://www.youtube.com/embed/VIDEO_ID_HERE"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div> */}
      {/* Subscribe */}

      <div className="Subscribe-bg">
        <Container>
          <Row className="justify-content-between ptb50">
            <div className="col-7 leftborder">
              <div className="headingSubscribe colorwhite mb30">
                THE WORLD IS
                <br /> WAITING FOR YOU
              </div>
              <div className="subheadingSubscribe">
                Discover the world by travelling to different places.
              </div>
              <div className="input-group pt40">
                <input
                  type="text"
                  className="form-Subscribe"
                  placeholder="Your Email"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </Row>
        </Container>
      </div>

      {/* Subscribe */}
      {/* Blogs and news */}
      <Container>
        <Row className="justify-content-between ptb50">
          <div className="heading colorblack text-center mb70 ">
            Impact & Reach
          </div>
          <div className="col-2 impactdiv ">
            <TbTree className="colorgray" />
            <div className="impact-count colorgreen">33455</div>
            <div className="impact-text">Trees Planted</div>
          </div>
          <div className="col-2 impactdiv">
            <GiShakingHands className="colorgray" />
            <div className="impact-count colorgreen">33455</div>
            <div className="impact-text">Partners</div>
          </div>
          <div className="col-2 impactdiv">
            <RiCalendarCheckLine className="colorgray" />
            <div className="impact-count colorgreen">33455</div>
            <div className="impact-text">Events</div>
          </div>
          <div className="col-2 impactdiv">
            <FaPrayingHands className="colorgray" />
            <div className="impact-count colorgreen">33455</div>
            <div className="impact-text">Volunteers</div>
          </div>
          <div className="col-2 impactdiv">
            <RiUserSettingsFill className="colorgray" />
            <div className="impact-count colorgreen">33455</div>
            <div className="impact-text">
              Farmers & Families <br />
              Supported
            </div>
          </div>
        </Row>
      </Container>
      {/* Blogs and news */}
      {/* body */}
    </>
  );
}

export default HomePage;

import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
// program
import planting from "../../../assets/img/about/hariyali-img-4.jpg";
import about1 from "../../../assets/img/about/about1.png";
import about2 from "../../../assets/img/about/about2.png";
import about3 from "../../../assets/img/about/about3.png";
import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
import downslide from "../../../assets/img/slider/downslide.jpg";
function AboutUs() {

  return (
    <>
      {/* body */}
      <div className="pt100">
      {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
      <div className="section bggray">
      <Container className="pt30">
          <Row className="justify-content-between  padding30tb contact-form-wrap">
          <div className="otherpages-heading">About Us</div>
            <div className="col-12">
            <div>
              <div className="otherpages-subheading">HOW DID THE PROJECT START?</div>
              <p>
            Launched on 2nd October 2007, as an afforestation initiative, with a target to plant a million trees every year.
Project Hariyali aims to increase the green cover, arrest the rising ecological imbalance to create environmentally conscious and aware citizenry.
</p></div>
<div> In 2010, the project was further extended to Araku, Visakhapatnam, Andhra Pradesh to create</div>
              </div>
            </Row></Container>
      
        {/* <div className="section-header mt-5">
          <div className=" heading-red-medium text-center ">
          How did the project start?
          </div>
          <div className="subheading text-center ">
          Launched on 2nd October 2007, as an afforestation initiative, with a target to plant a million trees every year. 
          <br/>Project Hariyali aims to increase the green cover, arrest the rising ecological imbalance to create environmentally conscious and aware citizenry.
           </div>
        </div> */}
        <div className="section-header ">
          {/* <div className=" heading-red-medium text-center ">
          In 2010, the project was further extended<br/> to Araku, Visakhapatnam, Andhra Pradesh to create
          </div> */}
          <div className="project-bg ">
        <Container>
          <Row className="justify-content-between ptb50">
            <div className="col-lg-4 col-12 mb-lg-0 mb-3 ">
              <div className="positin-relative " >
                <div className="image"><img src={about1} width="100%" />
                <div className="about-furthertext text-center"><span>restore the ecosystem</span></div></div>
              </div>
            </div>
            <div className="col-lg-4 col-12 mb-lg-0 mb-3 ">
              <div className="positin-relative " >
                <div className="image"><img src={about2} width="100%" />
                <div className="about-furthertext  text-center"><span>a functional forest for the tribal community</span></div></div>
              </div>
            </div>
            <div className="col-lg-4 col-12 mb-lg-0 mb-3">
              <div className="positin-relative " >
                <div className="image"><img src={about3} width="100%" />
                <div className="about-furthertext  text-center"><span>ensure nutritional / economic security of the small & marginalized farmers</span></div></div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
          </div>
          <div className="heading-red-medium text-center mb-3">
          The project was replicated in Northern India in 2021
           </div>
      </div>
      <img src={Donateslid} alt="Donateslid" className="imgwidth100" />
      <Container>
        <div className="section-header mt-5 col-lg-12">
          <div className=" heading-red-medium text-center ">
          What is the goal?
          </div>
          <div className="subheading text-center ">
          Planting 5 million trees per annum through partnerships with like-minded organizations and people an in the process support livelihood of marginalized farmer communities.
           </div>
        </div>
        </Container>
        <img src={downslide} alt="downslide" className="imgwidth100" />
        <Container>
        <div className="section-header mt-5  col-12">
          <div className=" heading-red-medium text-center ">
          Project is a joint venture with Mahindra Foundation and Naandi Foundation.
          </div>
          <div className="subheading  ">
          <b>Mahindra Foundation</b> is a public charitable trust incorporated in 1969 and registered under Maharashtra Public Trust Act.

Mahindra Foundation operates with a vision to carry out public charitable objects and purposes wide enough for the extension of the benefit thereof to all irrespective of caste, community, creed, or religion through its public charitable activities. Mahindra Foundation has provided medical relief and donation of medical equipment for the treatment of underprivileged. During national calamities like floods in Uttarakhand and Bihar, COVID etc Mahindra Foundation has mobilized resources for the relief of poor. The Foundation has constructed toilets under Swachh Bharat Swachh Vidyalaya project of Govt of India. Mahindra Foundation has implemented environmental protection projects like Vijay Vidarbha, Solar lighting and Hariyali project in Kashmir.

The Trust is also registered u/s 12AB of Income Tax Act and has registration u/s 80G of Income Tax Act, 1961.

 <br/> <br/>

<b>Naandi Foundation </b>is an apolitical, autonomous public charitable trust and a not-for-profit organisation having registration under section 12AB of income-tax Act, 1961 is tax exempt and is recognised by tax authorities. Born out of the idea of creating a professionally run organization managed by eminent business leaders as Trustees, Naandi serves as a new experiment in the socio-development sector of India. Its foot print has expanded year on year across 17 states touching the lives of more than 6 million underserved people so far.

Naandi Foundation is one of the largest and fastest growing social sector organisations in India working to make poverty history.
           </div>
        </div></Container>
      </div>

      {/* body */}
    </>
  );
}

export default AboutUs;

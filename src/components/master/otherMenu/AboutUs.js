import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
// import "react-image-gallery/styles/css/image-gallery.css";
import goalimg from "../../../assets/img/goal.jpg";
import projectimg from "../../../assets/img/associate.jpg";
import ventureimg from "../../../assets/img/environment.jpg";

import arakuImg from "../../../assets/img/slider/araku.jpg";
import tarnImg  from "../../../assets/img/slider/tarn.jpg";
import wardhaImg from "../../../assets/img/slider/wardha.png";

function AboutUs() {

  return (
    <>
      {/* body */}
      <section className="banner banner-about">
        <div className="title">
          {/* <h1>About Us</h1> */}
        </div>          
      </section>
      <div className="">
        {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
        <div className="section bggray">
          <div className="container">
          <div className="pv-75">
            <div className="feature-description">
              <h2 className="sub-title">About us</h2>
              <p>The project hariyali is a join initiative by mahindra foundation and nandi foundation. (know more...)</p>
            </div>
          </div>
            <div className="row align-items-center pv-75">
              <div className="col-12">
              <div className="feature-description">
                <h2 className="text-capitalize">Details about initiative</h2>
                  <p>The project was launched on 2nd October 2007, as an afforestation initiative, with a target to plant a million trees every year. 
                  Project Hariyali aims to increase the green cover, arrest the rising ecological imbalance to create environmentally conscious and aware citizenry.</p>
                  <p>We are currently active in three regions for large scale plantation:</p>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                      <div class="card h-100">
                        <img src={arakuImg} className="img-fluid rounded-start" alt="..."/>
                        <div class="card-body text-center">
                          <h5 className="card-title">Southern India</h5>
                          <p className="card-text">The project started in <b className="colorgreen">Araku Valley</b>, <b className="colorgreen">Visakhapatnam</b>, <b className="colorgreen">Andhra Pradesh</b> in 2010</p>                          
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div class="card h-100">
                          <img src={tarnImg} className="img-fluid rounded-start" alt="..."/>
                          <div class="card-body text-center">
                              <h5 class="card-title">Northern India</h5>
                              <p class="card-text">The project <b className="colorgreen">Shravasti in Uttar Pradesh</b>,
                              <b className="colorgreen">Tarn Taran & Moga in Punjab</b> and <b className="colorgreen">Solan in Himachal Pradesh</b> in 2010</p>
                              {/* <a href="#" class="btn btn-primary">Button</a> */}
                          </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div class="card h-100">
                          <img src={wardhaImg} className="img-fluid rounded-start" alt="..."/>
                          <div class="card-body text-center">
                            <h5 class="card-title">Western India</h5>
                            <p class="card-text">The project is being currently replicated in <b className="colorgreen">Wardha, Maharashtra</b></p>
                            {/* <a href="#" class="btn btn-primary">Button</a> */}
                          </div>
                      </div>
                    </div>
                  </div>
                   {/* <ul>
                      <li>Araku Valley – The project started in <b className="colorgreen">Araku</b>, <b className="colorgreen">Visakhapatnam</b>, <b className="colorgreen">Andhra Pradesh</b> in 2010. The aim was to
                      <ul className="mb-2">
                        <li>Restore the ecosystem</li>
                        <li>Create a functional forest for the tribal community</li>
                        <li>Ensure nutritional / economic security of the small & marginalized farmers</li>
                      </ul>
                      </li>
                      <li>Northern India - The project was further extended in Punjab, Uttar Pradesh and Himachal Pradesh in 2021</li>
                      <li>Western India – The project is being currently replicated in Wardha, Maharashtra.</li>
                   </ul> */}
                </div>
              </div>
              {/* <div className="col-12 col-md-5">
                <div className="feature-image">
                  <img src={projectimg} alt=""/>
                </div>
              </div> */}
            </div>
          </div>
          <section className="bg-tree">
            <div className="container">
            <div className="row align-items-center pv-75">
                  <div className="col-12 col-md-5">
                    <div className="feature-image">
                      <img src={goalimg} alt=""/>
                    </div>              
                  </div>
                  <div className="col-12 col-md-7">
                      <div className="feature-description">
                          <h2 className="text-capitalize">Goal</h2>
                          <p className=""><quote><b className="colorgreen">Planting 5 million trees</b> per annum through partnerships with like-minded organizations and people and in the process support livelihood of marginalized farmer communities.</quote></p>                      
                      </div>
                  </div>
              </div>
            </div>
          </section>
          <section className="bg-venture">
          <div className="container">
            <div className="row pv-75">              
              <div className="col-12">
                  <div className="feature-description">
                  <h2 className="text-capitalize">Know your Partners</h2>
                  <p>
                    <b>Mahindra Foundation</b> is a public charitable trust incorporated in 1969 and registered under Maharashtra Public Trust Act.

                    Mahindra Foundation operates with a vision to carry out public charitable objects and purposes wide enough for the extension of the benefit thereof to all irrespective of caste, community, creed, or religion through its public charitable activities. Mahindra Foundation has provided medical relief and donation of medical equipment for the treatment of underprivileged. During national calamities like floods in Uttarakhand and Bihar, COVID etc Mahindra Foundation has mobilized resources for the relief of poor. The Foundation has constructed toilets under Swachh Bharat Swachh Vidyalaya project of Govt of India. Mahindra Foundation has implemented environmental protection projects like Vijay Vidarbha, Solar lighting and Hariyali project in Kashmir.

                    The Trust is also registered u/s 12AB of Income Tax Act and has registration u/s 80G of Income Tax Act, 1961.

                    <br /> <br />
                    <b>Naandi Foundation </b>is an apolitical, autonomous public charitable trust and a not-for-profit organisation having registration under section 12AB of income-tax Act, 1961 is tax exempt and is recognised by tax authorities. Born out of the idea of creating a professionally run organization managed by eminent business leaders as Trustees, Naandi serves as a new experiment in the socio-development sector of India. Its foot print has expanded year on year across 17 states touching the lives of more than 6 million underserved people so far.
                    Naandi Foundation is one of the largest and fastest growing social sector organisations in India working to make poverty history.
                  </p> 
                  
                  </div>
              </div>
              {/* <div className="col-12 col-md-5">
                <div className="feature-image">
                  <img src={ventureimg} alt=""/>
                </div>              
              </div>
              <div className="col-12 col-md-12">
                <div className="feature-image">
                  <img src={ventureimg} alt=""/>
                </div>              
              </div> */}
              
            </div>
          </div>
          </section>
          {/* <Container className="pt30">
            <Row className="justify-content-between  padding30tb contact-form-wrap">              
              <div className="col-12">
                <div>
                  <div className="otherpages-subheading textupp">HOW DID THE PROJECT START?</div>
                  <p>
                    Launched on 2nd October 2007, as an afforestation initiative, with a target to plant a million trees every year.
                    Project Hariyali aims to increase the green cover, arrest the rising ecological imbalance to create environmentally conscious and aware citizenry.
                  </p></div>
                <div className="otherpages-subheading"> In 2010, the project was further extended to <span className="colorgreen">Araku</span>,  <span className="colorgreen">Visakhapatnam</span>,  <span className="colorgreen">Andhra Pradesh</span></div>
                <div className="otherpagesulli mb-2r">
                  <ul><li>To Restore the Ecosystem</li><li>
                    To Create a Functional</li><li>
                      Ensure Nutritional / Economic security of the small & Marginalized Farmers
                    </li></ul>
                </div>
                <div className="otherpages-subheading ">The project was replicated in Northern India in 2021</div>
                <div className="otherpages-subheading mt25 textupp"> What is the goal?</div>
                <p>Planting 5 million trees per annum through partnerships with like-minded organizations and people an in the process support livelihood of marginalized farmer communities.
                </p>
                <div className="otherpages-subheading textupp">Project is a joint venture with Mahindra Foundation and Naandi Foundation.</div>
                <p>
                  <b>Mahindra Foundation</b> is a public charitable trust incorporated in 1969 and registered under Maharashtra Public Trust Act.

                  Mahindra Foundation operates with a vision to carry out public charitable objects and purposes wide enough for the extension of the benefit thereof to all irrespective of caste, community, creed, or religion through its public charitable activities. Mahindra Foundation has provided medical relief and donation of medical equipment for the treatment of underprivileged. During national calamities like floods in Uttarakhand and Bihar, COVID etc Mahindra Foundation has mobilized resources for the relief of poor. The Foundation has constructed toilets under Swachh Bharat Swachh Vidyalaya project of Govt of India. Mahindra Foundation has implemented environmental protection projects like Vijay Vidarbha, Solar lighting and Hariyali project in Kashmir.

                  The Trust is also registered u/s 12AB of Income Tax Act and has registration u/s 80G of Income Tax Act, 1961.

                  <br /> <br />
                  <b>Naandi Foundation </b>is an apolitical, autonomous public charitable trust and a not-for-profit organisation having registration under section 12AB of income-tax Act, 1961 is tax exempt and is recognised by tax authorities. Born out of the idea of creating a professionally run organization managed by eminent business leaders as Trustees, Naandi serves as a new experiment in the socio-development sector of India. Its foot print has expanded year on year across 17 states touching the lives of more than 6 million underserved people so far.
                  Naandi Foundation is one of the largest and fastest growing social sector organisations in India working to make poverty history.
                </p>          </div>
            </Row></Container> */}
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default AboutUs;

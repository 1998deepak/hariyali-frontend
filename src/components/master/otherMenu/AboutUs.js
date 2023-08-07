import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";

function AboutUs() {

  return (
    <>
      {/* body */}
      <div className="pt100">
        {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
        <div className="section bggray">
          <Container className="pt30">
            <Row className="justify-content-between  padding30tb contact-form-wrap">
              <div className="otherbotmborder"><div className="otherpages-heading">About Us</div>
              </div>
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
            </Row></Container>
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default AboutUs;

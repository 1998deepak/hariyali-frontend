import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
// program
import planting from "../../../assets/img/about/hariyali-img-4.jpg";
import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
import downslide from "../../../assets/img/slider/downslide.jpg";

function WhySupportUs() {
  return (
    <>
      {/* body */}
      <div className="pt100">
        {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
        <div className="section bggray">
          <Container className="pt30">
            <Row className="justify-content-between  padding30tb contact-form-wrap">
              <div className="otherbotmborder"><div className="otherpages-heading">Why Support Us</div>
              </div>
              <div className="col-12">
                <div>
                  {/* <div className="otherpages-subheading textupp">We are available at 1t.org</div> */}
                  <p>
                  Our project is a unique blend in the sphere of environmental sustainability and impacting livelihood.
<br/>
We focus on large scale <span className="colorgreen">tree planting, natural resource management, Global regenerative organic farming</span>  protocols to enrich agricultural eco-system and build functional forests as means to increase communities' income for an overall wellbeing of the community and mother earth
<br/><br/>
                  We are available at<span className="colorgreen"> 1t.org</span>
                  </p></div>
                {/* <div className="otherpages-subheading">
                  How we can gear up for climate action in context of our commitment for <span className="colorgreen">better and healthy living</span>.
                </div> */}
                {/* <div className="otherpages-subheading">
                  Address ecological fragility ;
                </div> */}
                {/* <p>
                  Our project is a unique blend in the sphere of env sustainibility and impacting livelihood<br /><br />
                  We focus on large scale <span className="colorgreen">tree planting, natural res, Global regen</span>. Organic farming protocols to enrich agri eco-system and build functional forests as means to increase communities' income for an overall wellbeing of the community and mother earth
                  Almanac. It is termed as farmers guide to bio galaxy. In all our landscape transformation work, the farmers use this almanac for their monthly agrarian activities.
                </p> */}
              </div>
            </Row></Container>
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default WhySupportUs;

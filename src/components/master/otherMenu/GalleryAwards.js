import React from "react";
import "animate.css/animate.min.css";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import about1 from "../../../assets/img/about/about1.png";
import about2 from "../../../assets/img/about/about2.png";
import about3 from "../../../assets/img/about/about3.png";
import about4 from "../../../assets/img/about/hariyali-img-4.jpg";
import blogs2 from "../../../assets/img/blogs/blogs2.jpg";
import blogsextra from "../../../assets/img/blogs/blogsextra.jpg";
import { Container, Row } from "react-bootstrap";
function GalleryAwards() {

  return (
    <>
      {/* body */}
      <div className="pt100"></div>
      <Container>
        <Row className=" ptb50">
        <div className="otherbotmborder"><div className="otherpages-heading">Gallery & Awards</div>
              {/* <div className="breadcrum"><ul><li>Home</li><li> | </li><li>Gallery & Awards</li></ul></div> */}
              </div>
          <div className="gallery-div col-lg-3 col-12">
            <Zoom>
              <img src={about1} alt="about1" />
            </Zoom>
            <div className="gallery-div-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div></div>
          <div className="gallery-div col-lg-3 col-12">
            <Zoom>
              <img src={about2} alt="about2" />
            </Zoom><div className="gallery-div-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div></div>
          <div className="gallery-div col-lg-3 col-12">
            <Zoom>
              <img src={about3} alt="about3" />
            </Zoom><div className="gallery-div-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div></div>
             <div className="gallery-div col-lg-3 col-12">
            <Zoom>
              <img src={blogs2} alt="blogs2" />
            </Zoom><div className="gallery-div-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div></div>
          <div className="gallery-div col-lg-3 col-12">
            <Zoom>
              <img src={blogsextra} alt="blogsextra" />
            </Zoom><div className="gallery-div-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div></div>
        </Row>
      </Container>
    </>
  );
}

export default GalleryAwards;

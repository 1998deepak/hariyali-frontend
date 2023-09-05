import React from "react";
import "animate.css/animate.min.css";
import "../../../assets/css/footprint.css";
import "react-image-gallery/styles/css/image-gallery.css";
import Wardhaimg from "../../../assets/img/footprint/wardha.jpg";
import Mogaimg from "../../../assets/img/footprint/moga.jpg";
import Solanimg from "../../../assets/img/footprint/solan.jpg";
import Taranimg from "../../../assets/img/footprint/taran.jpg";
import Shravastiimg from "../../../assets/img/footprint/shravast.jpg";
import Arakuimg from "../../../assets/img/footprint/araku.jpg";
// import Footo from "../../../assets/img/foot1.png";
import { Container, Row } from "react-bootstrap";
import { GoLocation } from "react-icons/go";
import image from "../../../assets/img/bannerWherearewe.png";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

function FootPrint() {

  const [arakushow, setArakuShow] = useState(false);
  const [shravastishow, setShravastiShow] = useState(false);
  const [solanshow, setSolanShow] = useState(false);
  const [taranshow, setTaranShow] = useState(false);
  const [mogashow, setMogaShow] = useState(false);
  const [wardhashow, setWardhaShow] = useState(false);

  const ArakuClose = () => setArakuShow(false);
  const Araku = () => setArakuShow(true);
  const ShravastiClose = () => setShravastiShow(false);
  const Shravasti = () => setShravastiShow(true);
  const SolanClose = () => setSolanShow(false);
  const Solan = () => setSolanShow(true);
  const TaranClose = () => setTaranShow(false);
  const Taran = () => setTaranShow(true);
  const MogaClose = () => setMogaShow(false);
  const Moga = () => setMogaShow(true);
  const WardhaClose = () => setWardhaShow(false);
  const Wardha = () => setWardhaShow(true);

  return (
    <>
      {/* body */}
      <section className="banner banner-footprint">
        <div className="title">
        </div>
      </section>
      <div className="">
        <div >
          <Container className="pv-75">
            <Row className="justify-content-between  padding30tb contact-form-wrap">
              <div className="otherbotmborder"><div className="otherpages-heading text-center sub-title">Where Are We </div>
              <p className="text-center">We are currently present in five states – Andhra Pradesh, Uttar Pradesh, Punjab, Himachal Pradesh and Maharashtra.</p>
              </div>
              <div class="grid">
              <figure class="effect-apollo" onClick={Araku}>
                  <img src={Arakuimg} alt="Araku" />
                  <figcaption>
                    <h2> <span>Araku</span>,<br /> Andhra Pradesh</h2>
                    <p>Araku, Nestled in the North-West Region of Andhra Pradesh</p>
                    <a onClick={Araku}>View more</a>
                  </figcaption>
                </figure>
                
                <figure class="effect-apollo" onClick={Moga}>
                  <img src={Mogaimg} alt="Mogaimg" />
                  <figcaption>
                    <h2> <span>Moga</span>,<br /> Punjab</h2>
                    <p>Moga is in the Indian State Of Punjab.</p>
                    <a onClick={Moga}>View more</a>
                  </figcaption>
                </figure>
                <figure class="effect-apollo" onClick={Taran}>
                  <img src={Taranimg} alt="Taranimg" />
                  <figcaption>
                    <h2> <span>Tarn Taran</span>,<br /> Punjab</h2>
                    <p>Tarn Taran Sahib is a City in the state Of Punjab</p>
                    <a onClick={Taran}>View more</a>
                  </figcaption>
                </figure>
                <figure class="effect-apollo" onClick={Solan}>
                  <img src={Solanimg} alt="Solanimg" />
                  <figcaption>
                    <h2> <span>Solan</span>,<br /> Punjab</h2>
                    <p>The Project ss proposed to be located in Solan district</p>
                    <a onClick={Solan}>View more</a>
                  </figcaption>
                </figure>
                <figure class="effect-apollo" onClick={Shravasti}>
                  <img src={Shravastiimg} alt="Shravastiimg" />
                  <figcaption>
                    <h2> <span>Shravasti</span>,<br /> Uttar Pradesh</h2>
                    <p>Bhinga, the district headquarters of Shravasti</p>
                    <a onClick={Shravasti}>View more</a>
                  </figcaption>
                </figure>
                <figure class="effect-apollo" onClick={Wardha}>
                  <img src={Wardhaimg} alt="Wardhaimg" />
                  <figcaption>
                    <h2> <span>Wardha</span>,<br /> Maharashtra</h2>
                    <p>Wardha district is one Of the 35 districts in Western India.</p>
                    <a onClick={Wardha}>View more</a>
                  </figcaption>
                </figure>
              </div>
            </Row>
          </Container>
        </div>   </div>
      <Modal show={arakushow} onHide={ArakuClose}>
        <Modal.Header closeButton>
          <Modal.Title>Araku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Arakuimg} alt="Arakuimg" className="footpop-img" />
            <p className="footpop-p" >Araku Valley is located in the tribal region which is under the 
            jurisdiction of the ITDA Paderu (Integrated Tribal Development Agency) Paderu falling in Alluri Sitharama Raju district, Andhra Pradesh. We are working in 723 villages spread across 5 mandals impacting over 1,20,000 farmer families. As of 2023, 14.90 million trees have been planted. (Plantation Season – Monsoon)</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={shravastishow} onHide={ShravastiClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shravasti, Uttar Pradesh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Shravastiimg} alt="Shravastiimg" className="footpop-img" />
            <p className="footpop-p" >Shravasti is situated 175 kms from state capital Lucknow. According to the Government of India, it is among the 121 minority- concentrated district in India. The 2018 Niti Aayog Ranking puts it at fourth most backward district in India. We are currently working in 65 villages in Sirsia block. As of 2023, 1.71 lakh trees have been planted. (Plantation Season – Monsoon, Winter)</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={solanshow} onHide={SolanClose}>
        <Modal.Header closeButton>
          <Modal.Title>Solan, Himacgal Pradesh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Solanimg} alt="Solanimg" className="footpop-img" />
            <p className="footpop-p" >Solan district falls in Himachal Pradesh, Northern India. Solan is a predominantly rural district with less than 20% of the population living in urban areas. The forest resources are experiencing severe stress with increasing pressure from the burgeoning population and rising impact of human commercial activities. As of 2023, 70 K trees have been planted. (Plantation Season – Winter)
</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={taranshow} onHide={TaranClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tarn Taran, Punjab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Taranimg} alt="Taranimg" className="footpop-img" />
            <p className="footpop-p" >Tarn Taran Sahib is a city in the state of Punjab, Northern India. The main occupation in this area is agriculture and agro industry with very few other industries. We are currently working in 50 villages in 5 districts. In Tarn Taran, 60% farmers belong to affirmative action category and 32% farmers belong to other backward classes. As of 2023, 1.67 lakh trees have been planted. (Plantation Season – Monsoon, Winter)</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={mogashow} onHide={MogaClose}>
        <Modal.Header closeButton>
          <Modal.Title>Moga, Punjab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Mogaimg} alt="Mogaimg" className="footpop-img" />
            <p className="footpop-p" >Moga lies in the state of Punjab. The total rural population is almost 80 percent, 20% being the urban population. We are currently working in 50 villages in 3 districts. In Moga, 60% farmers belong to affirmative action category and 32% farmers belong to other backward classes. As of 2023, 1.84 lakh trees have been planted. (Plantation Season – Monsoon, Winter)</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={wardhashow} onHide={WardhaClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wardha, Maharashtra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Wardhaimg} alt="Wardha" className="footpop-img" />
            <p className="footpop-p" >Wardha district is located in the Vidarbha region of the State of Maharashtra. 74% is residing in rural area and 26% is residing in urban area. We are currently working in 22 villages across 4 Tehsils. Plantation is in progress. (Plantation Season – Monsoon)</p></div>
        </Modal.Body>
      </Modal>
      {/* body */}
    </>
  );
}

export default FootPrint;

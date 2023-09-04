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
              </div>
              <div class="grid">
                <figure class="effect-apollo" onClick={Wardha}>
                  <img src={Wardhaimg} alt="Wardhaimg" />
                  <figcaption>
                    <h2> <span>Wardha</span>,<br /> Maharashtra</h2>
                    <p>Wardha District Is One Of The 35 Districts In Western India.</p>
                    <a onClick={Wardha}>View more</a>
                  </figcaption>
                </figure>
                <figure class="effect-apollo" onClick={Moga}>
                  <img src={Mogaimg} alt="Mogaimg" />
                  <figcaption>
                    <h2> <span>Moga</span>,<br /> Punjab</h2>
                    <p>Moga Is In The Indian State Of Punjab.</p>
                    <a onClick={Moga}>View more</a>
                  </figcaption>
                </figure>
                <figure class="effect-apollo" onClick={Taran}>
                  <img src={Taranimg} alt="Taranimg" />
                  <figcaption>
                    <h2> <span>Tarn Taran</span>,<br /> Punjab</h2>
                    <p>Tarn Taran Sahib Is A City In The State Of Punjab</p>
                    <a onClick={Taran}>View more</a>
                  </figcaption>
                </figure>
                <figure class="effect-apollo" onClick={Solan}>
                  <img src={Solanimg} alt="Solanimg" />
                  <figcaption>
                    <h2> <span>Solan</span>,<br /> Punjab</h2>
                    <p>The Project Is Proposed To Be Located In Solan District</p>
                    <a onClick={Solan}>View more</a>
                  </figcaption>
                </figure>
                <figure class="effect-apollo" onClick={Shravasti}>
                  <img src={Shravastiimg} alt="Shravastiimg" />
                  <figcaption>
                    <h2> <span>Shravasti</span>,<br /> Uttar Pradesh</h2>
                    <p>Bhinga, The District Headquarters Of Shravasti</p>
                    <a onClick={Shravasti}>View more</a>
                  </figcaption>
                </figure>
                <figure class="effect-apollo" onClick={Araku}>
                  <img src={Arakuimg} alt="Araku" />
                  <figcaption>
                    <h2> <span>Araku</span></h2>
                    <p>Araku, Nestled In The North-West Region Of Andhra Pradesh</p>
                    <a onClick={Araku}>View more</a>
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
            <p className="footpop-p" >Araku, Nestled In The North-West Region Of Andhra Pradesh, Is Dominated Entirely By Scheduled Tribe Farmers (Over 90%) And Has Been Characterized By Poor Infrastructure, Dismal Connectivity, Low Women’s Literacy Rates, High Infant And Maternal Mortality And Low Agricultural Productivity.
              <br />The Forest Lands (Accounting For Nearly 60% Of The Total Geographical Area – Census 2011), Which Was The Only Source Of Income, Were Also Degraded, Reducing The Overall Efficiency Of Land. Certain Mandals Such As Munchingputtu Had Nearly 28% Of The Total Geographical Area Being Barren And Uncultivable Land (Handbook Of Statistics, Visakhapatnam).</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={shravastishow} onHide={ShravastiClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shravasti, Uttar Pradesh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Shravastiimg} alt="Shravastiimg" className="footpop-img" />
            <p className="footpop-p" >Bhinga, The District Headquarters Of Shravasti, Is Approximately 175 Kilometres Away From The State Capital, Lucknow. Shravasi, Is The North-Eastern Uttar Pradesh District Near River Rapti.
              <br />According To The Government Of India, It Is Among The 121 Minority-Concentrated Districts In India.[1] It Is The Fourth Most Backward District In India, According To The 2018 Niti Aayog Ranking.[2].</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={solanshow} onHide={SolanClose}>
        <Modal.Header closeButton>
          <Modal.Title>Solan, Himacgal Pradesh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Solanimg} alt="Solanimg" className="footpop-img" />
            <p className="footpop-p" >The Project Is Proposed To Be Located In Solan District, Of Himachal Pradesh, Located 46 Kilometres South Of The State Capital, Shimla. It Is 70 Kilometres From Chandigarh. Solan Is A Predominantly Rural District With Less Than 20% Of The Population Living In Urban Areas.
              <br />
              However, In Recent Years, These Forest Resources Are Experiencing Severe Stress With Increasing Pressure From The Burgeoning Population And Rising Impact Of Human Commercial Activities.</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={taranshow} onHide={TaranClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tarn Taran, Punjab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Taranimg} alt="Taranimg" className="footpop-img" />
            <p className="footpop-p" >Tarn Taran Sahib Is A City In The State Of Punjab, In Far Northern India. The Main Occupation In This Area Is Agriculture And Agro Industry With Very Few Other Industries.</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={mogashow} onHide={MogaClose}>
        <Modal.Header closeButton>
          <Modal.Title>Moga, Punjab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Mogaimg} alt="Mogaimg" className="footpop-img" />
            <p className="footpop-p" >Moga Is In The Indian State Of Punjab.
              The Total Rural Population Is Almost 80 Percent Whereas The Urban Population Is About 20 Percent.</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={wardhashow} onHide={WardhaClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wardha, Maharashtra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Wardhaimg} alt="Wardha" className="footpop-img" />
            <p className="footpop-p" >Wardha District Is One Of The 35 Districts In Western India.
              <br />It Is An Agricultural District And 67% Of The Population Is Part Of The Rural Belt.</p></div>
        </Modal.Body>
      </Modal>
      {/* body */}
    </>
  );
}

export default FootPrint;

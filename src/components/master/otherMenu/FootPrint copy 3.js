import React from "react";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import logotree from "../../../assets/img/logotree.png";
import footprintimg from "../../../assets/img/footprint2.png";
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
  const [tarnshow, setTarnShow] = useState(false);
  const [solanshow, setSolanShow] = useState(false);
  const [taranshow, setTaranShow] = useState(false);
  const [mogashow, setMogaShow] = useState(false);
  const [wardhashow, setWardhaShow] = useState(false);

  const ArakuClose = () => setArakuShow(false);
  const Araku = () => setArakuShow(true);
  const ShravastiClose = () => setShravastiShow(false);
  const Shravasti = () => setShravastiShow(true);
  const TarnClose = () => setTarnShow(false);
  const Tarn = () => setTarnShow(true);
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
          {/* <h1>Ways to Associate</h1> */}
        </div>
      </section>
      {/* <div>
            <img src = {image} className="imgwidth100"/>
          </div> */}
      <div className="">
        {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
        <div className="section-footprint bggray">
          <Container className="pt30">
            <Row className="justify-content-between  padding30tb contact-form-wrap">
              <div className="otherbotmborder"><div className="otherpages-heading text-center sub-title">Footprint </div>
              </div>
              <div className="logoTree">
                <img src={logotree} alt="Logo tree" />
              </div>

              <div className="footprint-left">
                {/* <div className="foot-1 foot-wooden">Araku</div>
                <div className="foot-2 foot-wooden">SHRAVASTI, UTTAR PRADESH</div> */}
                <div className="foot-3 foot-wooden" onClick={Wardha}>Wardha, Maharashtra</div>
                <div className="foot-4 foot-wooden" onClick={Moga}>Moga Punjab</div>
                <div className="foot-5 foot-wooden" onClick={Taran}>Tarn Taran, Punjab</div>
                <div className="foot-6 foot-wooden" onClick={Solan}>Solan, Himacgal Pradesh</div>
                <div className="foot-7 foot-wooden" onClick={Tarn}>Tarn Taran</div>
                <div className="foot-8 foot-wooden" onClick={Shravasti}>Shravasti, Uttar Pradesh</div>
                <div className="foot-9 foot-wooden" onClick={Araku}>Araku</div>
                <img src={footprintimg} alt="FootprintLeft" />
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
            {/* <h3 class="mb-3">Araku</h3> */}
            <p>Araku, Nestled In The North-West Region Of Andhra Pradesh, Is Dominated Entirely By Scheduled Tribe Farmers (Over 90%) And Has Been Characterized By Poor Infrastructure, Dismal Connectivity, Low Women’s Literacy Rates, High Infant And Maternal Mortality And Low Agricultural Productivity. 
              <br/>The Forest Lands (Accounting For Nearly 60% Of The Total Geographical Area – Census 2011), Which Was The Only Source Of Income, Were Also Degraded, Reducing The Overall Efficiency Of Land. Certain Mandals Such As Munchingputtu Had Nearly 28% Of The Total Geographical Area Being Barren And Uncultivable Land (Handbook Of Statistics, Visakhapatnam).</p></div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button className="homesubmit-div" variant="primary" >Submit
          </Button>
        </Modal.Footer> */}
      </Modal>
      <Modal show={shravastishow} onHide={ShravastiClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shravasti, Uttar Pradesh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            {/* <h3 class="mb-3">Araku</h3> */}
            <p>Bhinga, The District Headquarters Of Shravasti, Is Approximately 175 Kilometres Away From The State Capital, Lucknow. Shravasi, Is The North-Eastern Uttar Pradesh District NearRiver Rapti.
<br/>According To The Government Of India, It Is Among The 121 Minority-Concentrated Districts In India.[1] It Is The Fourth Most Backward District In India, According To The 2018 Niti Aayog Ranking.[2].</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={solanshow} onHide={SolanClose}>
        <Modal.Header closeButton>
          <Modal.Title>Solan, Himacgal Pradesh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            {/* <h3 class="mb-3">Araku</h3> */}
            <p>The Project Is Proposed To Be Located In Solan District, Of Himachal Pradesh, Located 46 Kilometres South Of The State Capital, Shimla. It Is 70 Kilometres From Chandigarh. Solan Is A Predominantly Rural District With Less Than 20% Of The Population Living In Urban Areas.
              <br/>
However, In Recent Years, These Forest Resources Are Experiencing Severe Stress With Increasing Pressure From The Burgeoning Population And Rising Impact Of Human Commercial Activities.</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={tarnshow} onHide={TarnClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tarn Taran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            {/* <h3 class="mb-3">Araku</h3> */}
            <p>Bhinga, The District Headquarters Of Shravasti, Is Approximately 175 Kilometres Away From The State Capital, Lucknow. Shravasi, Is The North-Eastern Uttar Pradesh District NearRiver Rapti.
<br/>According To The Government Of India, It Is Among The 121 Minority-Concentrated Districts In India.[1] It Is The Fourth Most Backward District In India, According To The 2018 Niti Aayog Ranking.[2].</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={taranshow} onHide={TaranClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tarn Taran, Punjab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            {/* <h3 class="mb-3">Araku</h3> */}
            <p>Tarn Taran Sahib Is A City In The State Of Punjab, In Far Northern India. The Main Occupation In This Area Is Agriculture And Agro Industry With Very Few Other Industries.</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={mogashow} onHide={MogaClose}>
        <Modal.Header closeButton>
          <Modal.Title>Moga, Punjab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            {/* <h3 class="mb-3">Araku</h3> */}
            <p>Moga Is In The Indian State Of Punjab.
The Total Rural Population Is Almost 80 Percent Whereas The Urban Population Is About 20 Percent.</p></div>
        </Modal.Body>
      </Modal>
      <Modal show={wardhashow} onHide={WardhaClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wardha, Maharashtra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            {/* <h3 class="mb-3">Araku</h3> */}
            <p>Wardha District Is One Of The 35 Districts In Western India. 
              <br/>It Is An Agricultural District And 67% Of The Population Is Part Of The Rural Belt.</p></div>
        </Modal.Body>
      </Modal>
   
      {/* body */}
    </>
  );
}

export default FootPrint;

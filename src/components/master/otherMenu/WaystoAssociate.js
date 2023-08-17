import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
// program
import planting from "../../../assets/img/about/hariyali-img-4.jpg";
import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
import downslide from "../../../assets/img/slider/downslide.jpg";

function WaystoAssociate() {
    return (
        <>
            {/* body */}
            <div className="pt100">
                {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
                <div className="section bggray">
                    <Container className="pt30">
                        <Row className="justify-content-between  padding30tb contact-form-wrap">
                            <div className="otherbotmborder"><div className="otherpages-heading">Ways to Associate</div>
                            </div>
                            <div className="col-12">
                            <div>
                                    {/* <div className="otherpages-subheading textupp">Donation details | Plantation details | 450 NR | Certificate | Reporting</div> */}
                                    <p>
                                    The plantations are done during the <span className="colorgreen">Monsoon (June - Sept)</span> and <span className="colorgreen">Winter (Nov - Jan) season</span>.
<br/>
On successful donation, every donor will receive a donation receipt and plantation report
<br/>The sapling takes 3 years of nurturing and monitoring to be self – dependent. We provide support to the plant for these 3 years and in case if the plant doesn’t survive, we replace it with a new sapling.
Each donation is eligible for tax exemption under section 80G. 
<br/>
Under any circumstance is the plant does not survive, a new plant is then replaced
                                    </p></div>
                                <div>
                                    {/* <div className="otherpages-subheading textupp">Donation details | Plantation details | 450 NR | Certificate | Reporting</div> */}
                                    <p>
                                    As an individual you can<span className="colorgreen"> Donate</span> or <span className="colorgreen">Gift a Plant</span> or <span className="colorgreen">Commemorate an occasion</span>.
                                    <br />
                                    As a corporate, you can donate as well as run campaigns for your <span className="colorgreen">customer | employees | business partner | vendor</span>.   
                                    <br />
                                    for CSR donations, please read out to us at
                                        <br />
                                        Contact mentioned in the same <span className="colorgreen">mail:- GANGAR.SUNNY@mahindra.com</span> and <span className="colorgreen">his Contact No:- +91 93224 56789</span>
                                    </p>
                                    </div>

                            </div>
                        </Row></Container>
                </div>
            </div>
            {/* body */}
        </>
    );
}

export default WaystoAssociate;

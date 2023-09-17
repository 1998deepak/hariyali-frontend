import React from "react";

const PrivacyPolicy = ({
  privacyPolicy1,
  privacyPolicy2,
  setPrivacyPolicy1,
  setPrivacyPolicy2,
  informationShare,
  setInformationShare,
  handleShowConditions,
  privacyPolicymessage,
}) => {
  return (
    <>
      <div className="col-12 mt20 select-label">
        <ul>
          <li>
            <input
              type="checkbox"
              name="Condition"
              value={privacyPolicy1}
              onChange={() => setPrivacyPolicy1(!privacyPolicy1)}
              className="checkboxinput"
            />
            By checking this box, I confirm that I have read, understood and
            agree to the Terms of Use and{" "}
            <button
              className="privacy-policy-link"
              onClick={handleShowConditions}
            >
              Privacy Policy
            </button>{" "}
            and I consent to the processing of all personal data relating to me
            for the purposes as more fully described in the Privacy Policy until
            I withdraw my consent.
          </li>
          <li>
          <input
              type="checkbox"
              name="Condition"
              value={privacyPolicy2}
              onChange={() => setPrivacyPolicy2(!privacyPolicy2)}
              className="checkboxinput"
            />I understand that I am free to withdraw my consent to the processing
            of my personal data, at any time, by writing to
            support@hariyali.org,in.
          </li>
        </ul>
      </div>
      <br />
      <div
        value={informationShare}
        onChange={(e) => setInformationShare(e.target.value)}
      >
        <input type="radio" name="consent" value="yes" checked={informationShare ==="yes"} />
        {"  "}
        Yes, I consent to receive campaign related correspondences regarding
        Project Hariyali.
        <br />
        <input type="radio" name="consent" value="no" checked={informationShare ==="no"} />
        {"  "}
        No, I do not consent to receive campaign related correspondences
        regarding Project Hariyali.
      </div>
      <div><span className="red-text">{privacyPolicymessage}</span></div>
    </>
  );
};

export default PrivacyPolicy;

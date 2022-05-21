import React from "react";
import styles from "../styles/Footer.module.css";
import { ImFacebook } from "react-icons/im";
import { FiYoutube, FiTwitter } from "react-icons/fi";
import { CgInstagram } from "react-icons/cg";
import Link from "next/link";
function Footer() {
  return (
    <div>
      <footer className={styles.footerdistributed}>
        <div className={styles.footerleft}>
          <h3>
            <span>Blood</span>.Sikkim.<span>Co</span>
          </h3>
          <p className={styles.footerlinks}>
            <Link href="camps">
              <a>Blood Donation Camp</a>
            </Link>
            <br />
            <Link href="requests">
              <a>Active Requirement</a>
            </Link>
            <br />
            <Link href="about">
              <a>About Us</a>
            </Link>
          </p>
          <p className={styles.footercompanyname}>
            <a href="https://nedevelopers.in">NE Developers © 2022</a>
          </p>
        </div>

        <div className={styles.footerright}>
          <br />
          <p>You may list your queries at:</p>
          <br />
          <p>sikkim.co.blood@gmail.com</p>

          <div className={styles.footericons}>
            <a href="https://www.facebook.com/nedevelopers">
              <i className={styles.twitter}>
                {" "}
                <ImFacebook />{" "}
              </i>
            </a>
            <a href="https://www.instagram.com/nedevelopers">
              <i className={styles.github}>
                {" "}
                <CgInstagram />{" "}
              </i>
            </a>
            <a href="https://www.youtube.com/channel/UC7ZRzsMvFz1k9aiElHgTKFw">
              <i className={styles.linkedin}>
                {" "}
                <FiYoutube />{" "}
              </i>
            </a>
            <a href="https://twitter.com/nedevelopers">
              <i className={styles.facebook}>
                <FiTwitter />{" "}
              </i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

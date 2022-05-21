import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/RequestItem.module.css";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";
import { APP_URL } from "../config/index";
export default function RequestItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={`/images/BloodTypes/${evt.BloodType}.jpg`}
          width={150}
          height={150}
          className={styles.Image}
          alt=""
        ></Image>
      </div>
      <div className={styles.info}>
        <span>
          Date: {new Date(evt.date).toLocaleDateString("en-UK")}{" "}
          <br></br> at {evt.venue}
        </span>
        <h3>{evt.name + "\t" + "(" + evt.BloodType + ")"}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/requests/${evt.slug}`}>
          <a className="btn">Check Details</a>
        </Link>
        <br></br>
        <br></br>
        <WhatsappShareButton
          url={`${APP_URL}/requests/${evt.slug}`}
          quote={`Blood Request: ${evt.Name}`}
          hashtag={"#Blood.Sikkim.Co"}
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FacebookShareButton
          url={`${APP_URL}/requests/${evt.slug}`}
          quote={`Blood Request: ${evt.Name}`}
          hashtag={"#Blood.Sikkim.Co"}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
      </div>
    </div>
  );
}

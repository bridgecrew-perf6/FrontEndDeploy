import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/BloodCamps.module.css";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";
import { APP_URL } from "../config/index";

export default function BloodCamps({ evt }) {
  //converting time format
  let time = evt.Time.toString();
  time = time.substring(0, 5);

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.image
              ? evt.image.formats.thumbnail.url
              : "/images/Blood-Donation-Transparent-Background.png"
          }
          width={170}
          height={100}
          alt=""
        ></Image>
      </div>
      <div className={styles.info}>
        <span>{new Date(evt.Date).toLocaleDateString("en-UK")}</span>
        <h3>{evt.Name + "\t" + "(" + evt.Address + ")"}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/camps/${evt.slug}`}>
          <a className="btn">Check Details</a>
        </Link>
        <br></br>
        <br></br>
        <WhatsappShareButton
          url={`${APP_URL}/requests/${evt.slug}`}
          quote={`OnGoing Blood Camp: ${evt.Name}`}
          hashtag={"#Blood.Sikkim.Co"}
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FacebookShareButton
          url={`${APP_URL}/requests/${evt.slug}`}
          quote={`Blood Request for ${evt.Name}`}
          hashtag={"#Blood.Sikkim.Co"}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
      </div>
    </div>
  );
}

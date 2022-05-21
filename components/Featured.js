import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { useState } from "react";
import Wave from "react-wavify";
export default function Header() {
  const [index, setIndex] = useState(0);
  const images = [
    "/images/Eligibilty/BDChart.jpg",
  ];

  return (
    <div>
      <div className={styles.container1}>
      </div>
      <div className={styles.wave}>
      <Wave fill='#880808' 
        paused={false}
        options={{
          height:85,
          amplitude: 16,
          speed: 0.3,
          points: 3
        }}>
      </Wave>  
      </div>
      
    <div className={styles.container}>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image
              src={img}
              alt=""
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
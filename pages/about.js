import Layout from "../components/Layout";
import PhotoGrid from "../components/PhotoGrid";
import Link from "next/link";

export default function AboutPage() {
  return (
    <Layout title="About Blood Donation">
      <div className="divide">
        <h1>About</h1>
        <p>
        This portal is built to fulfill the blood requirements and to register voluntary blood donors of the state,
        so that a common and active database can be used to prevent loss of life due to blood shortage. 
        We thank each and every one who has been part of this journey in any way, And also who will be in the coming days.
        This portal was launched on 18th May, 2022 by Hon'ble Chief Minister Shri Prem Singh Tamang  accompanied by his spouse Smt. Krishna Rai in presence of Political Secretary Shri Jacob Khaling, Cabinet ministers, MLAs, Advisors, Chairpersons and other dignitaries on the occasion of 47th State Day Celebration and Sikkim Idol Grand finale at Mannan Kendra, Gangtok.
        </p>
        <p>&copy; Blood.Sikkim.Co 2022</p>
        <p>Developed and designed by Srijan, Shovit,<br/> Logesh and Gaurav</p>
        <p>
          <Link href="https://nedevelopers.in/">
            <a>
              Ne Developers &nbsp;
            </a>
          </Link>
          <br/>
          Gangtok
          <br/>
              Contact: +91-9894178970
          <br />
        </p>
        <br/>
        <h1>Support Partners</h1>
        {/* <p>
          On our journey to make the society lively and healthy, <br />
          we would also like to thank our support partners for the great
          assistance.
        </p> */}
        <div>
          <PhotoGrid evt={"/images/SupportPartners/bloodarmy.jpg"} />
          <PhotoGrid evt={"/images/SupportPartners/runners.jpg"} />
          <PhotoGrid evt={"/images/SupportPartners/Twilio.jpg"} />
          <PhotoGrid evt={"/images/SupportPartners/Friends.jpg"} />
          <PhotoGrid evt={"/images/SupportPartners/SC.jpg"} />
          <PhotoGrid evt={"/images/SupportPartners/vbdas.jpg"} />
          <PhotoGrid evt={"/images/SupportPartners/sai.jpg"} />
          <PhotoGrid evt={"/images/SupportPartners/Comp.png"} />
        </div>
      </div>
    </Layout>
  );
}
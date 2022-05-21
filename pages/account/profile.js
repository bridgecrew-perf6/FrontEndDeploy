import React from "react";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import ImageUpload from "../../components/ImageUpload";
import { FaImage } from "react-icons/fa";
import ProfileRequest from "../../components/ProfileRequest";
import { useRouter } from "next/router";
import { API_URL } from "../../config";
import { parseCookie } from "../../helpers";
import Image from "next/image";
import styles from "../../styles/Profile.module.css";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import styles2 from "../../styles/Form.module.css";
export default function Profile({ userRequest, token, userData }) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  // console.log(userData);

  const { user } = useContext(AuthContext);

  const [imagePreview, setimagePreview] = useState(
    userData.ProfilePicture
      ? userData.ProfilePicture.formats.thumbnail.url
      : null
  );

  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    role: "1",
    BloodType: null,
    PhoneNumber: null,
    address: null,
  });

  const [userValues, setUserValues] = useState({
    name: userData.name,
    email: userData.email,
    role: userData.role.type === "authenticated" ? "Non Donor" : "Blood Donor",
    PhoneNumber: userData.PhoneNumber,
    BloodType: userData.BloodType,
    address: userData.address,
  });

  const deleteEvent = async (id) => {
    if (confirm("Are you sure you want to cancel your Request")) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Some Validation
    const hasEmptyFields = Object.values(userValues).some(
      (element) => element === ""
    );
    if (userValues.role === "Non Donor" || userValues.role === "1") {
      userValues.role = "1";
      
      
    } else if (userValues.role === "Blood Donor" || userValues.role === "3") {
      userValues.role = "3";
      if (userValues.PhoneNumber.length !== 10) {
        toast.error("Please check your phone number");
        // console.log("Please fill in all the fields");
        return;
      }
    }
    // console.log(userValues);

    if (hasEmptyFields) {
      console.log(userValues);
      toast.error("Please fill in all the fields");
      // console.log("Please fill in all the fields");
      return;
    }
    //console.log(userValues.role);

    const res = await fetch(`${API_URL}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userValues),
    });
    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("You are not authorized");
        return;
      }
      toast.error("Something went wrong");
    } else {
      const evt = await res.json();
      alert("Your Profile has been Updated.");
      router.reload();
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };

  const handleunregister = async () => {
    //console.log(values.PhoneNumber);
    if (confirm("Are you sure you do not want to donate any further?")) {
      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("You are not authorized");
          return;
        }
        toast.error("Something went wrong");
      } else {
        const evt = await res.json();
        alert(
          "You have backed out as a blood donor.Feel free to join the club anytime."
        );
        router.reload();
      }
    } else {
      return;
    }
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/users/${userData.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setimagePreview(data.ProfilePicture.formats.thumbnail.url);
    setShowModal(false);
  };
  const handledisabled = (e) => {
    e.preventDefault();
    alert("You can edit your profile");
    setDisabled(false);
  };
  const handleEnabled = (e) => {
    e.preventDefault();

    setDisabled(true);
  };
  return (
    <Layout title="User Profile">
      <div className={styles.dash}>
        <div className={styles.upper}>
          <h1>Your Profile</h1>
         <br></br>
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ImageUpload
            userId={userData.id}
            imageUploaded={imageUploaded}
            token={token}
          />
        </Modal>
        <form onSubmit={handleSubmit} className={styles2.form}>
          <div className={styles2.grid}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userValues.name}
                onChange={handleInputChange}
                
                disabled={disabled}
                required
              ></input>
            </div>
            
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userValues.email}
                required
                onChange={handleInputChange}
                disabled
                
              ></input>
            </div>
           
            <div>
              <label htmlFor="role">Account Type</label>
              <input
                type="text"
                id="role"
                name="role"
                value={
                  userValues.role === "3" || userValues.role === "Blood Donor"
                    ? "Blood Donor"
                    : "Non Donor"
                }
                onChange={handleInputChange}
                disabled
                required
              ></input>
              {userData.role.type === "authenticated" ? (
                <h6>
                  <Link href="/Donor/registerdonor">
                    Register as a Blood Donor?
                  </Link>
                </h6>
              ) : (
                <span>
                  <a onClick={handleunregister}>
                    <h4>Back out as Blood Donor?</h4>
                  </a>
                </span>
              )}
            </div>
            {userData.role.type === "authenticated" ? (
              <></>
            ) : (

              <>
              <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={userValues.address}
                onChange={handleInputChange}
                disabled={disabled}
                required
              ></input>
            </div>
               <div>
              <label htmlFor="PhoneNumber">PhoneNumber</label>
              <input
                type="tel"
                id="PhoneNumber"
                name="PhoneNumber"
                pattern="[0-9]{10}"
                value={userValues.PhoneNumber}
                onChange={handleInputChange}
                disabled={disabled}
                required
              ></input>
            </div>
                <div>
                  <label htmlFor="BloodType">Blood Type</label>
                  <select
                    className="blood"
                    type="Text"
                    id="BloodType"
                    name="BloodType"
                    value={userValues.BloodType}
                    onChange={handleInputChange}
                    disabled={disabled}
                    required
                  >
                    <option></option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </>
            )}
          </div>
          <br></br>
          {disabled === false ? (
            <div className="divide">
              <button
                className="btn-secondary"
                type="submit"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
              <br></br>
              <br></br>
            </div>
          ) : (
            <></>
          )}
        </form>

        {disabled === false ? (
          <div className="divide">
            <button className="btn-secondary" onClick={handleEnabled}>
              Cancel
            </button>
           
          </div>
        ) : (
          <div className="divide">
            <button className="btn-secondary" onClick={handledisabled}>
              Edit Profile
            </button>
          </div>
        )}

        <ToastContainer />
        <br></br>

        <h3>My Requests</h3>
        {userRequest.length !== 0 ? (
          <>
            {userRequest.map((evt) => (
              <ProfileRequest
                key={evt.id}
                evt={evt}
                handleDelete={deleteEvent}
              ></ProfileRequest>
            ))}
          </>
        ) : (
          <h2>You have not requested yet</h2>
        )}
      </div>
    </Layout>
  );
}
export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);
  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res1 = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userRequest = await res.json();
  const userData = await res1.json();

  return {
    props: {
      userRequest,
      token,
      userData,
    },
  };
}

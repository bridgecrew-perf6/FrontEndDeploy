import Link from "next/link"
import {FaDownload,FaTimes} from "react-icons/fa"
import styles from "../styles/ProfileRequest.module.css";
import { useState } from "react";
import React from 'react'
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";
import { APP_URL } from "../config/index";
export default function ProfileRequest({evt,handleDelete}) {
  
  let len;
  
  if(evt.Donors===null)
  {
      len=0;
      
  }
  else{
    len=evt.Donors.length
    
  }
  
  const handleCheck=()=>
  {
    const str = JSON.stringify(evt.Donors);
    const newString=str.replaceAll("}","\n");
   // console.log(newString)
    const bytes = new TextEncoder().encode(newString);
    const blob = new Blob([bytes], {
        type: "application/json;charset=utf-8"
    });
    //console.log(blob)
    const href=URL.createObjectURL(blob);
    //console.log(href);
    
    const a =Object.assign(document.createElement("a"),{href,style:"display:none",download:`Donors_list_for_${evt.slug}.txt`})
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(href);
    a.remove();

  }

  return (
    <div className={styles.event}>
        <h4>
            <Link href={`/requests/${evt.slug}`}>

                <a><span>Request:&nbsp;</span>{new Date(evt.date).toLocaleDateString("en-UK")}</a>
            </Link>
          
          
          
          

 

        </h4>
        <h5><a><span>Venue:&nbsp;</span>{evt.venue}</a></h5>
        <a href="#" className={styles.edit} >
        <FaDownload/><span onClick={handleCheck}>Donor Received ({len})</span>
        </a>
        
        <a href="#" className={styles.delete} onClick={()=>handleDelete(evt.id)}>
        <FaTimes/><span>Cancel Request</span>
        </a>
        <br></br>
        <br></br>
        <div className="divide">
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
  )
}

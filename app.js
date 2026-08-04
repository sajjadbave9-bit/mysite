import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


async function addAd(){

  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value";
  let desc = document.getElementById("desc").value;
  let phone = document.getElementById("phone").value;
  let city = document.getElementById("city").value;
  let address = document.getElementById("address").value;


  if(title=="" || price==""){
    alert("نام کالا و قیمت را وارد کن");
    return;
  }


  await addDoc(collection(db,"ads"),{

    title:title,
    price:price,
    desc:desc,
    phone:phone,
    city:city,
    address:address,
    sold:false,
    time:new Date().toLocaleString("fa-IR")

  });


  alert("آگهی ثبت شد");

}


window.addAd = addAd;

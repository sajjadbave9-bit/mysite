import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


async function addAd(){

  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;
  const phone = document.getElementById("phone").value;
  const city = document.getElementById("city").value;
  const address = document.getElementById("address").value;


  if(title === "" || price === ""){
    alert("نام کالا و قیمت را وارد کن");
    return;
  }


  await addDoc(collection(db,"ads"),{
    title: title,
    price: price,
    desc: desc,
    phone: phone,
    city: city,
    address: address,
    time: new Date().toLocaleString("fa-IR")
  });


  alert("آگهی ثبت شد");

  loadAds();

}



async function loadAds(){

  const box = document.getElementById("ads");

  if(!box) return;


  box.innerHTML = "";


  const snapshot = await getDocs(collection(db,"ads"));


  snapshot.forEach((item)=>{

    const ad = item.data();


    box.innerHTML += `

    <div class="ad">

    <h3>${ad.title}</h3>

    <p>💰 ${ad.price} تومان</p>

    <p>${ad.desc}</p>

    <p>📞 ${ad.phone}</p>

    <p>📍 ${ad.city}</p>

    <p>🏠 ${ad.address}</p>

    <p>🕒 ${ad.time}</p>

    </div>

    `;

  });

}



window.addAd = addAd;


loadAds();

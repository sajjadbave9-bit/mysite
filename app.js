import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


let ads = [];


async function addAd(){

  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let desc = document.getElementById("desc").value;
  let phone = document.getElementById("phone").value;
  let city = document.getElementById("city").value;
  let address = document.getElementById("address").value;


  if(title=="" || price==""){
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
    sold: false,
    time: new Date().toLocaleString("fa-IR")

  });


  alert("آگهی ثبت شد");

  loadAds();

}



async function loadAds(){

  ads=[];


  const querySnapshot = await getDocs(collection(db,"ads"));


  querySnapshot.forEach((item)=>{

    ads.push({

      id:item.id,
      ...item.data()

    });

  });


  showAds();

}



function showAds(){

  let box = document.getElementById("ads");

  box.innerHTML="";


  ads.forEach((ad)=>{

    box.innerHTML += `

    <div class="ad">

    <h3>${ad.title}</h3>

    <p>💰 قیمت: ${Number(ad.price).toLocaleString("fa-IR")} تومان</p>

    <p>${ad.desc}</p>

    <p>📞 ${ad.phone}</p>

    <p>📍 ${ad.city}</p>

    <p>🏠 ${ad.address}</p>

    <p>🕒 ${ad.time}</p>

    <hr>

    </div>

    `;

  });

}



window.addAd = addAd;


loadAds();

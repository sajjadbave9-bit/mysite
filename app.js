import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


async function addAd(){

  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let desc = document.getElementById("desc").value;
  let phone = document.getElementById("phone").value;
  let city = document.getElementById("city").value;
  let address = document.getElementById("address").value;


  if(title === "" || price === ""){
    alert("نام کالا و قیمت را وارد کن");
    return;
  }


  await addDoc(collection(db,"ads"),{

    title,
    price,
    desc,
    phone,
    city,
    address,
    sold:false,
    time:new Date().toLocaleString("fa-IR")

  });


  alert("آگهی ثبت شد");

  showAds();

}



async function showAds(){

  let box = document.getElementById("ads");

  box.innerHTML = "";


  let result = await getDocs(collection(db,"ads"));


  result.forEach((item)=>{

    let ad = item.data();


    box.innerHTML += `

    <div class="ad">

    <h3>${ad.title}</h3>

    <p>💰 قیمت: ${Number(ad.price).toLocaleString("fa-IR")} تومان</p>

    <p>${ad.desc}</p>

    <p>📞 ${ad.phone}</p>

    <p>📍 ${ad.city}</p>

    <p>🏠 ${ad.address}</p>

    <p>🕒 ${ad.time}</p>

    ${
      ad.sold
      ? "<h3>✅ فروخته شد</h3>"
      :
      `<button onclick="soldAd('${item.id}')">✅ فروختم</button>`
    }

    <button onclick="deleteAd('${item.id}')">
    🗑 حذف آگهی
    </button>

    <hr>

    </div>

    `;

  });

}



async function deleteAd(id){

  await deleteDoc(doc(db,"ads",id));

  alert("آگهی حذف شد");

  showAds();

}



async function soldAd(id){

  await updateDoc(doc(db,"ads",id),{

    sold:true

  });


  alert("فروخته شد");

  showAds();

}



window.addAd = addAd;
window.deleteAd = deleteAd;
window.soldAd = soldAd;


showAds();

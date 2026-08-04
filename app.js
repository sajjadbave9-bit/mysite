import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

let ads = [];

async function addAd() {

let title = document.getElementById("title").value;
let price = document.getElementById("price").value;
let desc = document.getElementById("desc").value;
let phone = document.getElementById("phone").value;
let city = document.getElementById("city").value;
let address = document.getElementById("address").value;
let imageFile = document.getElementById("image").files[0];

if(title=="" || price==""){
alert("نام کالا و قیمت را وارد کن");
return;
}

let image="";

if(imageFile){

const reader=new FileReader();

reader.onload=async function(){

image=reader.result;

await addDoc(collection(db,"ads"),{

title,
price,
desc,
phone,
city,
address,
image,
sold:false,
time:new Date().toLocaleString("fa-IR")

});

loadAds();

};

reader.readAsDataURL(imageFile);

return;

}

await addDoc(collection(db,"ads"),{

title,
price,
desc,
phone,
city,
address,
image:"",
sold:false,
time:new Date().toLocaleString("fa-IR")

});

loadAds();

}
async function loadAds(){

ads=[];

const querySnapshot=await getDocs(collection(db,"ads"));

querySnapshot.forEach((document)=>{

let data=document.data();

ads.push({

id:document.id,
title:data.title,
price:data.price,
desc:data.desc,
phone:data.phone,
city:data.city,
address:data.address,
image:data.image,
sold:data.sold,
time:data.time

});

});

showAds();

}



async function soldAd(id){

await updateDoc(doc(db,"ads",id),{

sold:true

});

loadAds();

}



function showAds(){

let box=document.getElementById("ads");

box.innerHTML="";

ads.forEach((ad)=>{

box.innerHTML+=`

<div class="ad">

${ad.image ? `<img src="${ad.image}" width="200">` : ""}

<h3>${ad.title}</h3>

<p>💰 قیمت: ${Number(ad.price).toLocaleString("fa-IR")} تومان</p>

<p>${ad.desc}</p>

<p>📞 ${ad.phone}</p>

<p>📍 ${ad.city}</p>

<p>🏠 ${ad.address}</p>

<p>🕒 ${ad.time}</p>

${ad.sold
? "<h3 style='color:green'>✅ فروخته شد</h3>"
: `<button onclick="soldAd('${ad.id}')">فروختم</button>`
}

<hr>

</div>

`;

});
console.log("app.js loaded");
}
window.addAd = addAd;

window.soldAd = soldAd;

loadAds();

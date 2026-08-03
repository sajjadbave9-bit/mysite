let ads = JSON.parse(localStorage.getItem("ads")) || [];

function addAd() {

    let title = document.getElementById("title").value;
    let price = document.getElementById("price").value;
    let desc = document.getElementById("desc").value;
    let phone = document.getElementById("phone").value;
    let city = document.getElementById("city").value;
    let address = document.getElementById("address").value;

    if(title == "" || price == ""){
        alert("نام کالا و قیمت را وارد کن");
        return;
    }

    let ad = {
        title,
        price,
        desc,
        phone,
        city,
        address,
        sold:false,
        time:new Date().toLocaleString("fa-IR")
    };

    ads.push(ad);

    localStorage.setItem("ads", JSON.stringify(ads));

    showAds();
}


function soldAd(index){

    ads[index].sold = true;

    localStorage.setItem("ads", JSON.stringify(ads));

    showAds();
}


function showAds(){

    let box = document.getElementById("ads");

    box.innerHTML = "";

    ads.forEach((ad,index)=>{

        box.innerHTML += `

        <div class="ad">

            <h3>${ad.title}</h3>

            <p>💰 قیمت: ${ad.price}</p>

            <p>${ad.desc}</p>

            <p>📞 ${ad.phone}</p>

            <p>📍 ${ad.city}</p>

            <p>🏠 ${ad.address}</p>

            <p>🕒 ${ad.time}</p>


            ${
            ad.sold
            ? "<b>✅ فروخته شد</b>"
            : `<button onclick="soldAd(${index})">فروختم</button>`
            }

        </div>

        <hr>

        `;

    });

}


showAds();

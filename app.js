let ads = JSON.parse(localStorage.getItem("ads")) || [];

function addAd() {
    let title = document.getElementById("title").value;
    let price = document.getElementById("price").value;
    let desc = document.getElementById("desc").value;

    if (title === "" || price === "") {
        alert("لطفاً نام کالا و قیمت را وارد کن");
        return;
    }

    let ad = {
        title: title,
        price: price,
        desc: desc
    };

    ads.push(ad);

    localStorage.setItem("ads", JSON.stringify(ads));

    showAds();

    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("desc").value = "";
}

function showAds() {
    let box = document.getElementById("ads");
    box.innerHTML = "";

    ads.forEach(function(ad) {
        box.innerHTML += `
        <div>
            <h3>${ad.title}</h3>
            <p>💰 ${ad.price}</p>
            <p>${ad.desc}</p>
            <hr>
        </div>
        `;
    });
}

showAds();

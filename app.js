let ads = JSON.parse(localStorage.getItem("ads")) || [];

function addAd() {
    let title = document.getElementById("title").value;
    let price = document.getElementById("price").value;
    let desc = document.getElementById("desc").value;

    if (title == "" || price == "") {
        alert("نام کالا و قیمت را وارد کن");
        return;
    }

    ads.push({
        title: title,
        price: price,
        desc: desc,
        sold: false
    });

    localStorage.setItem("ads", JSON.stringify(ads));
    showAds();
}

function soldAd(index) {
    ads[index].sold = true;
    localStorage.setItem("ads", JSON.stringify(ads));
    showAds();
}

function showAds() {
    let box = document.getElementById("ads");
    box.innerHTML = "";

    ads.forEach(function(ad, index) {
        box.innerHTML += `
        <div>
            <h3>${ad.title}</h3>
            <p>💰 ${ad.price}</p>
            <p>${ad.desc}</p>

            ${
            ad.sold
            ? "✅ فروخته شد"
            : `<button onclick="soldAd(${index})">فروختم</button>`
            }

            <hr>
        </div>
        `;
    });
}

showAds();

// (() => {

function homePageNav() {
    let homePageDiv = document.getElementById("homePageDiv");
    let liveReportDiv = document.getElementById("liveReportDiv");
    let aboutMeDiv = document.getElementById("aboutMeDiv");

    homePageDiv.style.display = "block";
    liveReportDiv.style.display = "none";
    aboutMeDiv.style.display = "none";

    let html = "";
    html = `
    <div class="input-group mb-3 searchBar col-sm-12 col-lg-12" id="searchBarId">
        <input type="text" class="form-control searchInputStyle" placeholder="Search" id="liveSearch" onkeyup="liveSearchFunc()">
        <button class="btn btn-outline-secondary searchBtn">Submit</button>
    </div>

    <div class="container">
            <div class="row coinsContainer col-sm-12 col-lg-12" id="coinsMainDiv">

            </div>
            <div class="row coinsContainer col-sm-12 col-lg-12" id="coinSearchDiv">

            </div>
    </div>`
    homePageDiv.innerHTML = html;

    getAllCoins();

}

function liveSearchFunc() {
    let liveSearch = document.getElementById("liveSearch");
    let cards = document.querySelectorAll(".card");
    let coinSearchDiv = document.getElementById("coinSearchDiv");
    let coinsMainDiv = document.getElementById("coinsMainDiv");
    let arr = [];
    if (liveSearch.value != "") {
        cards.forEach(element => {
            if (element.innerHTML.includes(liveSearch.value.toLowerCase()) == true) {
                
                arr.push(element.innerHTML);
                displayAfterSearchCards(arr);
                

            }

        });

        console.log(arr);
        // html+= 
        // `
        // </div>
        // </div>
        // `

        coinSearchDiv.style.display = "flex"
        coinsMainDiv.style.display = "none"
    }
    else {
        coinsMainDiv.style.display = "flex"
        coinSearchDiv.style.display = "none"
    }

    // console.log(searchBar.value);
    // let coinSearchDiv = document.getElementById("coinSearchDiv");




}

function displayAfterSearchCards(arr) {
    let coinSearchDiv = document.getElementById("coinSearchDiv");
    let coinsMainDiv = document.getElementById("coinsMainDiv");

    let content = ""
    for (let a of arr) {
        content += a;
    }

    // coinSearchDiv.insertAdjacentHTML("beforebegin", '<div class="card card-style row col-sm-4 col-lg-4">')
    // coinSearchDiv.insertAdjacentHTML("afterbegin", `${content}`)
    // coinSearchDiv.insertAdjacentHTML("beforeend", '</div>')

    coinSearchDiv.innerHTML = content;
    

    // `
    // <div class="card card-style row col-sm-4 col-lg-4">
    // ${content} 
    // </div>
    // `

    coinSearchDiv.style.display = "flex"
    coinsMainDiv.style.display = "none"

}

function liveReportPageNav() {


}
function aboutPageNav() {

    let homePageDiv = document.getElementById("homePageDiv");
    let liveReportDiv = document.getElementById("liveReportDiv");
    let aboutMeDiv = document.getElementById("aboutMeDiv");

    homePageDiv.style.display = "none";
    liveReportDiv.style.display = "none";
    aboutMeDiv.style.display = "block";

    let html = ""
    html = `
    <div class="row">
                <div class="col-sm-6 col-lg-6 about-content"> 
                        <h1 class="about-me-header">About me</h1>
                        <p>My name is <span style="font-weight: bold">Shay Edri</span> and I am 27 years old from Jerusalem, Israel.<br></p>
                        <p>I am currently studying fullstack programming at <a href="https://www.johnbryce.co.il" target="_blank">John Bryce College</a> and working at the emergency center at the <a href="https://www.hagihon.co.il" target="_blank">Gihon company</a>.</p>
                        <p style="font-weight: bold">Follow me on social media:<br></p>
                        <button class="twitch-style" onclick="window.open('https://www.twitch.tv/essencore', '_blank');"><i class="fa fa-twitch"></i></button>
                        <button class="facebook-style" onclick="window.open('https://www.facebook.com/shay.edri.3', '_blank');"><i class="fa fa-facebook"></i></button>
                        <button class="instagram-style" onclick="window.open('https://www.instagram.com/shayedri7', '_blank');"><i class="fa fa-instagram"></i></button>
                </div>
                <div class="col-sm-6 col-lg-6 picture-profile">
                </div>
            </div> `
    aboutMeDiv.innerHTML = html;

}

//getAllCoins();

async function getAllCoins() {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/")
        const coins = await response.json();

        showAllCoins(coins);
    } catch (error) {
        console.log(error);
    }

}

async function getMoreInfo(id, index) {
    try {
        let response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
        let coin = await response.json();

        displayMoreInfo(coin, index);
    } catch (error) {
        alert(error)
    }
}

function displayMoreInfo(coin, index) {
    let coinInfoId = document.getElementById(`moreInfo${index}`);

    if (localStorage.getItem(`'${index}'`) != null) {
        coinInfoId.innerHTML = JSON.parse(localStorage.getItem(`'${index}'`));

    }
    else {

        setTimeout(() => {
            let usd = coin.market_data.current_price.usd;
            let euro = coin.market_data.current_price.eur;
            let ils = coin.market_data.current_price.ils;
            let image = coin.image.small;
            let html =
                `
            <div class="moreInfoStyle">
                <span>USD: ${usd}$
                </p>EURO: ${euro}€</p>
                <p>ILS: ${ils}₪</p>
            </div>
        
        `
            let savedHtml = coinInfoId.innerHTML = html;

            const json = JSON.stringify(savedHtml)
            localStorage.setItem(`'${index}'`, json)

            setTimeout(() => {
                localStorage.removeItem(`'${index}'`);
            }, 120_000)

        }, 1000)
    }

}

function showAllCoins(coins) {
    let coinsMainDiv = document.getElementById("coinsMainDiv");
    let html = ""
    for (let coin in coins) {
        if (coin < 15) {
            html +=
                `
        <div class="card card-style row col-sm-4 col-lg-4">
    <div class="card-body row col-sm-12 col-lg-12">
    <div class="form-check form-switch col-sm-12 col-lg-12">
                 <input class="form-check-input toggle-class toggle-style" type="checkbox" name="cards" value="${coins[coin].id}" role="switch" id="toggle${coin}" onclick="isChecked('toggle${coin}')">
            </div>
        <img class="coin-symbol-image" src="${coins[coin].image.small}" alt="...">
        <h5 class="card-title col-sm-12 col-lg-12">${coins[coin].id}</h5>
        <p class="card-text col-sm-12 col-lg-12">${coins[coin].name}</p>
        <p class="card-btn col-sm-12 col-lg-12">
            <button class="card-btn btn btn-primary" type="button" data-bs-toggle="collapse" id="${coins[coin].id}"
                onclick="getMoreInfo(id, ${coin})" data-bs-target="#moreInfo${coin}" aria-expanded="false"
                aria-controls="collapseWidthExample">
                More info
            </button>
        </p>
    </div>

    <div class="collapse collapse-horizontal" id="moreInfo${coin}">
        <div class="card card-body card-more-info col-sm-12 col-lg-12" id="coinInfoId">
            
        </div>
    </div>
</div>
        `
        }
        coinsMainDiv.innerHTML = html;
    }
}

let checkedList = [];

function isChecked(id) {


    let toggleId = document.getElementById(`${id}`)

    if (toggleId.checked) {
        if (checkedList.length < 6) {
            checkedList.push(toggleId.value);
            console.log(checkedList);
        }
    }
    else {
        checkedList.splice(checkedList.indexOf(toggleId.value, 0), 1)
    }

    if (checkedList.length > 5) {
        let modalBody = document.getElementById("modalBody");
        let choosenNumber = document.getElementById("choosenNumber");
        let modal = document.getElementById("maxLimitModal");
        let html = ""
        for (let i = 0; i < checkedList.length - 1; i++) {
            choosenNumber.innerHTML = `${checkedList[5]}`

            html +=
                `
                  <div>
                    ${checkedList[i]}
                  </div>
                  <div>
                    <button type="button" class="btn btn-danger btn-sm" onclick="exchangeSelected('${checkedList[i]}')">Exchange</button>
                  </div>
                  <br>
            `
        }

        modalBody.innerHTML = html;
        modal.style.display = "flex"

        return false;
    }
}

function closeModal(i, isLast) {
    let toggleClass = document.querySelectorAll(".toggle-class");
    let modal = document.getElementById("maxLimitModal");

    if (isLast == true) {

        toggleClass.forEach(element => {
            if (element.value == i) {
                //console.log(toggleClass.value);
                element.checked = false;
            }
        });

        modal.style.display = "none"
    }


    if (isLast == false) {

        toggleClass.forEach(element => {
            if (element.value == checkedList[5]) {
                element.checked = false;
            }
        });



        checkedList.splice(checkedList.indexOf(checkedList[5], 0), 1);
        modal.style.display = "none";
    }
}

function exchangeSelected(i) {

    checkedList.splice(checkedList.indexOf(i, 0), 1);
    closeModal(i, true);

}


// })()
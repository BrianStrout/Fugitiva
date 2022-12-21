{
  /* <script type="module"> */
}

let loaded = false;
import { getSheet } from "./google-master-sheet-hacker.js";
const displayMenu = document.getElementById("displayMenu");
const displayMenuActual = document.getElementById("hideableMenu");
const hourDiv = document.getElementById("hour-div");
const socialDiv = document.getElementById("social-div");
const locationDiv = document.getElementById("location-div");

let menuLoad = document.createElement("div");

const menuhere = document.getElementById("menuhere");
const menuItemTemplate = document.getElementById("menuitemtemplate");
let dispShown = "home";
const landingPage = document.getElementById("landingPage");
const menuCatSheet = {
  id: "1AWYa-kNuQiHusJNGVWkbxwhcHVnTcN3QFNU6gjqeWJ0",
  page: "Cat",
};
const menuItemsSheet = {
  id: "1AWYa-kNuQiHusJNGVWkbxwhcHVnTcN3QFNU6gjqeWJ0",
  page: 1,
};
const sheetData = await getSheet(menuItemsSheet);
const sheetCat = await getSheet(menuCatSheet);
const hoursDisplay = document.getElementById("new-hour-layout");
const locationDisplay = document.getElementById("new-location-layout");
let altScreen = false;
let taco = document.getElementById("taco");
let ddMenu = document.querySelectorAll(".dropdown-menu");
window.addEventListener("hashchange", function () {
  window.scrollTo(window.scrollX, window.scrollY - 100);
});

const generateMenuCategories = () => {
  for (const item of sheetCat) {
    let cateGene = document.createElement("div");
    cateGene.classList.add("menuCategory");
    cateGene.innerHTML = `<a name="${item.Category}"></a>`;
    hideableMenu.appendChild(cateGene);

    let ribbon = new Image();
    ribbon.src = "src/images/ribbonEdited.png";
    ribbon.classList.add("ribbon");
    cateGene.appendChild(ribbon);

    let cateTitle = document.createElement("div");
    cateTitle.classList.add("categoryTitle");
    cateTitle.innerHTML = `<H2>${item.Category}</H2>`;
    cateGene.appendChild(cateTitle);

    let ribbonBot = new Image();
    ribbonBot.src = "src/images/ribbonEdited.png";
    ribbonBot.classList.add("ribbon");
    cateGene.appendChild(ribbonBot);

    let cateDesc = document.createElement("div");
    cateDesc.setAttribute("id", `${item.Category}_Menu`);
    cateDesc.classList.add("menuDesc");
    cateGene.appendChild(cateDesc);
  }
};

const sortAndPost = () => {
  for (const item of sheetData) {
    let targetCategory = "";

    const content = menuItemTemplate.content.cloneNode(true);
    targetCategory = "";
    if (
      item.Category !== undefined &&
      item.Category !== "" &&
      item.Category !== " " &&
      item.Category !== null
    ) {
      targetCategory = item.Category;
    } else {
      targetCategory = "Desserts_Menu";
    }
    if (item.sub === "TRUE") {
      console.log(item.item + "!!!!! is big");
    }

    console.log(item.Category, "logged");
    // if(item.sub === "TRUE")item.classList.add("submenu");
    let targetDiv = document.getElementById(targetCategory);

    if (item.sub === "TRUE") {
      content.querySelector("span.temp_item").style =
        "text-decoration: underline; font-weight: bold; margin-left: .5rem";
    } else if (item.with === "TRUE") {
      content.querySelector("span.temp_item").classList.add("margin-left");
    }
    // else {
    //   content.querySelector("span.temp_item").style = "margin-left: 1.5rem";
    // }

    content.querySelector("span.temp_item").textContent = item.item;
    content.querySelector("span.temp_price").textContent = item.price;
    content.querySelector("span.temp_plate").textContent = item.description;
    // content.querySelector("span.temp_plate").style = "margin-left: 2.5rem";
    targetDiv.appendChild(content);
  }
};

document.addEventListener("click", (e) => {
  console.log(e.target.id);
  if (altScreen) {
    if (
      e.target.id !== "new-hour-layout" &&
      !hoursDisplay.classList.contains("waiting")
    ) {
      hoursDisplay.classList.add("waiting");
      altScreen = false;
      return;
    }
    if (
      e.target.id !== "new-location-layout" &&
      !locationDisplay.classList.contains("waiting")
    ) {
      locationDisplay.classList.add("waiting");
      altScreen = false;
      return;
    }
  }
  if (e.target.id === "hour-div") {
    hoursDisplay.classList.remove("waiting");
    altScreen = true;
    return;
  }

  if (e.target.id === "social-div") {
    console.log(e.target.id + "clicked");
    var strWindowFeatures =
      "location=yes,height=700,width=520,scrollbars=yes,status=yes";
    window.open(
      "https://www.instagram.com/lafugitivatacobar",
      "_blank",
      strWindowFeatures
    );
  }
  if (e.target.id === "location-div") {
    locationDisplay.classList.remove("waiting");
    altScreen = true;
    return;
  }
});

const shift = () => {
  hourDiv.classList.toggle("click-divs");
  socialDiv.classList.toggle("click-divs");
  locationDiv.classList.toggle("click-divs");
};

taco.addEventListener("click", () => {
  displayMenu.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  shift();
  setTimeout(() => {
    taco.classList.toggle("menu-taco-upright");
    taco.classList.toggle("menu-taco-tilt");
    displayMenu.classList.toggle("disappear");
    displayMenuActual.classList.toggle("hidden");
    dropItLikeItsHot();
  }, 500);
});
const dropTheSalad = (e) => {
  let saladBowl = document.querySelectorAll("[data-fall]");
  saladBowl.forEach((veggie) => veggie.classList.toggle("falling"));
  saladBowl.forEach((veggie) => veggie.classList.toggle("hidden"));
};
const dropItLikeItsHot = (e) => {
  console.log("dropping");
  for (let i = 0; i < ddMenu.length; i++) {
    ddMenu[i].classList.toggle(`dropdown-menu-active${i}`);
    ddMenu[i].classList.toggle(`dropdown-menu-inactive`);
    ddMenu[i].classList.toggle(`hidden`);
  }
  dropTheSalad();
  if (loaded === false) {
    generateMenuCategories();
    sortAndPost();
    loaded = true;
  }
};

//slider apps

let currentSlideIndex = 1;

function setSlides(num) {
  displaySlides((currentSlideIndex += num));
}

function displaySlides(num) {
  let slides = document.getElementsByClassName("imageSlides");
  let x;
  if (num > slides.length) {
    currentSlideIndex = 1;
  }
  if (num < 1) {
    currentSlideIndex = slides.length;
  }
  for (x = 0; x < slides.length; x++) {
    slides[x].style.display = "none";
  }
  slides[currentSlideIndex - 1].style.display = "inline";
}

const timeCop = () => {
  const timer = setInterval(function () {
    setSlides(1);
  }, 2000);
};

function myStopFunction() {
  clearInterval(myInterval);
}

setSlides(0);
timeCop();

// </script>

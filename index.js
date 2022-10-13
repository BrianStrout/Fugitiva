<script type="module">

let loaded = false;




import { getSheet } from './google-master-sheet-hacker.js';

let displayMenu = document.getElementById('displayMenu');
let menuLoad = document.createElement('div');
const menuCatSheet = {
        id: '1AWYa-kNuQiHusJNGVWkbxwhcHVnTcN3QFNU6gjqeWJ0',
        page: "Cat",
    }
const menuItemsSheet = {
        id: '1AWYa-kNuQiHusJNGVWkbxwhcHVnTcN3QFNU6gjqeWJ0',
        page: 1,
    }
const sheetData = await getSheet(menuItemsSheet);
const sheetCat = await getSheet(menuCatSheet);
const menuhere = document.getElementById('menuhere');
const menuItemTemplate = document.getElementById('menuitemtemplate');
let dispShown = "home";
const landingPage = document.getElementById('landingPage');


const generateMenuCategories = ()=>{
    for (const item of sheetCat){
        let cateGene = document.createElement('div');
        cateGene.classList.add("menuCategory");
        displayMenu.appendChild(cateGene);   

        let ribbon = new Image(); 
        ribbon.src = "src/images/ribbon.png";
        ribbon.classList.add('ribbon');
       cateGene.appendChild(ribbon);   


        let cateTitle = document.createElement('div');
        cateTitle.classList.add("categoryTitle");
        cateTitle.innerHTML=`<a name="${item.Category}">${item.Category}</a>`
        cateGene.appendChild(cateTitle);

        let ribbonBot = new Image(); 
        ribbonBot.src = "src/images/ribbon.png";
        ribbonBot.classList.add('ribbon');
       cateGene.appendChild(ribbonBot);  


        let cateDesc = document.createElement('div');
        cateDesc.setAttribute('id', `${item.Category}_Menu`);
        cateDesc.classList.add("menuDesc");
        cateGene.appendChild(cateDesc);

    }
}

const sortAndPost = ()=>{

    for (const item of sheetData) {
        // console.log(item.item);
        let targetCategory = "";



            
        const content = menuItemTemplate.content.cloneNode(true);
            targetCategory = "";
            if(item.Category !== undefined && item.Category !== "" && item.Category !== " " && item.Category !== null){
                targetCategory = item.Category;
            }else{
                targetCategory = "Desserts_Menu";
                }
            console.log(item.Category, "logged");
                // if(item.sub === "TRUE")item.classList.add("submenu");
            let targetDiv =  document.getElementById(targetCategory);
                content.querySelector('span.temp_item').textContent = item.item || 'missing name'
                content.querySelector('span.temp_price').textContent = item.price || 'missing price'
                content.querySelector('span.temp_plate').textContent = item.description
                targetDiv.appendChild(content);
        }
}

const popUp =(e) =>{
    console.log(e.target.id);
}
const menuSwitcher = ()=>{
}

let taco = document.getElementById('taco');
let ddMenu = document.querySelectorAll('.dropdown-menu');

document.addEventListener('click', (e)=>{
     
    
        if(e.target.id === "hours" ){
            document.getElementById("hours_modal").classList.toggle('hidden')
            document.getElementById("modal_overlay").classList.toggle('hidden')
        }
        
        if(e.target.id === "hours_closer"){
            document.getElementById("hours_modal").classList.toggle('hidden')
            document.getElementById("modal_overlay").classList.toggle('hidden')
        }
        if(e.target.id === "social"){
            var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
            window.open('https://www.instagram.com/lafugitivatacobar' , "_blank", strWindowFeatures);
        }
        if(e.target.id === "location"){
            document.getElementById("location_modal").classList.toggle('hidden')
            document.getElementById("modal_overlay").classList.toggle('hidden')
        }
        if(e.target.id === "location_closer"){
            document.getElementById("location_modal").classList.toggle('hidden')
            document.getElementById("modal_overlay").classList.toggle('hidden')
        }

});
  
taco.addEventListener('click', (e)=>{
    taco.classList.toggle('menu-taco-upright');
    taco.classList.toggle('menu-taco-tilt');
    landingPage.classList.toggle('hidden');

    dropItLikeItsHot();
    menuSwitcher();
  
} );
const dropTheSalad = (e) =>{
let saladBowl = document.querySelectorAll('[data-fall]');
    saladBowl.forEach(veggie => veggie.classList.toggle('falling'));
    saladBowl.forEach(veggie => veggie.classList.toggle('hidden'));
}
const dropItLikeItsHot = (e)=>{
    console.log("dropping");
    // console.log(ddMenu.length)
    for(let i=0; i<ddMenu.length; i++){
        // console.log(i);
        // console.log(ddMenu[i].classList);
        ddMenu[i].classList.toggle(`dropdown-menu-active${i}`);
        ddMenu[i].classList.toggle(`dropdown-menu-inactive`);
        ddMenu[i].classList.toggle(`hidden`);
        // console.log(ddMenu[i].classList);
    // ddMenu.forEach(menuTab =>menuTab.classList.toggle(`dropdown-menu-active${i}`));
    }
    // console.log(displayMenu);
    dropTheSalad();
    if(loaded === false){
            generateMenuCategories();
            sortAndPost();
            loaded = true;
    }
}



//slider apps

let currentSlideIndex = 1;

function setSlides(num) {
    displaySlides(currentSlideIndex += num);
}

function displaySlides(num) {
    let slides = document.getElementsByClassName("imageSlides");
    let x;
    if (num > slides.length) { currentSlideIndex = 1 }
    if (num < 1) { currentSlideIndex = slides.length }
    for (x = 0; x < slides.length; x++) {
        slides[x].style.display = "none";
    }
    slides[currentSlideIndex - 1].style.display = "block";
}

const timeCop = ()=> {
    console.log("time cop called!")
        const timer = setInterval(function() {
                setSlides(1);
            }, 2500);}



function myStopFunction() {
  clearInterval(myInterval);
}

setSlides(0);
timeCop();

</script>
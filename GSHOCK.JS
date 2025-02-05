//code for slider 1
const images = ["images/1.1.avif","images/1.2.avif"]
let currentindex = 0;
const intervaltime = 3000;
let sliderinterval;

const sliderimages = document.getElementById ("slider-image");
const navcontainer = document.getElementById("nav");

function startslideshow(){
    sliderinterval= setInterval(nextslide,intervaltime);
}

function stopslideshow(){
    clearInterval(sliderinterval);
}

function updatenav(){
   const dots = navcontainer.children;

   for(let i=0;i<dots.length; i++){
    dots[i].classList.remove("active");
   }
   dots[currentindex].classList.add('active')
}

function initslider(){
    sliderimages.src=images[currentindex];

    images.forEach((_,index)=>{
        const dot = document.createElement("span");
        dot.textContent = index +1;
        dot.addEventListener('click', ()=>jumpToSlide(index));
        navcontainer.appendChild(dot);
    });
    updatenav();
    startslideshow();
}

function showSlide(index){
    sliderimages.src = images[index];
    updatenav();
}

function nextslide(){
    currentindex = (currentindex + 1)%images.length;
    showSlide(currentindex);
}

function jumpToSlide(index){
    currentindex = index;
    stopslideshow();
    showSlide(currentindex);
    startslideshow();
}
window.addEventListener('load',initslider);



 //sorting
const li = document.querySelectorAll('.mainli');
const ar = [];
const field = document.getElementById('productList');


for (let i of li) {
    const last = i.querySelector('.cmp-product_panel__price-txt'); 
    const x = last.textContent.trim(); 
    const tr = x.replace(/,/g, ''); 
    const y = Number(tr.substring(1)); 
    i.setAttribute('data-price', y); 
    ar.push(i); 
}

document.getElementById('form1').onchange = sortingvalue;

function sortingvalue() {
    const selectedValue = document.querySelector('input[name="price"]:checked').value; 

    if (selectedValue === 'newest') {
        while (field.firstChild) {
            field.removeChild(field.firstChild); 
        }
        field.append(...ar); 
    } else if (selectedValue === 'lowtohigh') {
        sortElem(field, Array.from(li), true);
    } else if (selectedValue === 'hightolow') {
        sortElem(field, Array.from(li), false);
    }
}

function sortElem(field, li, asc) {
    const dm = asc ? 1 : -1; 
    const sortLi = li.sort((a, b) => {
        const ax = Number(a.getAttribute('data-price')); 
        const bx = Number(b.getAttribute('data-price'));
        return ax > bx ? (1 * dm) : (-1 * dm); 
    });

    while (field.firstChild) {
        field.removeChild(field.firstChild); 
    }
    field.append(...sortLi); 
}

//login code

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.Login-link');
const registerLink = document.querySelector('.register-link');
const btnpopup = document.querySelector('.btnlogin-popup');
const iconclose = document.querySelector('.icon-close')

registerLink.addEventListener ('click', ()=> {
  wrapper.classList.add('active');
})
loginLink.addEventListener ('click' , ()=> {
  wrapper.classList.remove('active');
})
btnpopup.addEventListener ('click',()=> {
  wrapper.classList.add('active-popup');
})
iconclose.addEventListener('click',()=>{
  wrapper.classList.remove('active-popup');
})
btnpopup.addEventListener('click',()=>{
  wrapper.style.display="flex";
})
iconclose.addEventListener('click',()=>{
  wrapper.style.display="none";
})

//register code
const Username = document.querySelector('.USER')
const register = document.querySelector('#register')
let check_availability = document.getElementById("check_availability");
function isUserNameAvailable(){
    if(localStorage.getItem(Username) != null){
        alert("Username is already occupied; please choose another");
        return false;
    }
    return true;
}
function isAvailable(){
    if(isUserNameAvailable()){
        alert("Username available; go ahead");
    }
}
check_availability.addEventListener('click', isAvailable);
register.addEventListener('submit', function(event){
    let fd = new FormData(event.target);
    if(isRegisterFormValidated(fd) && isUserNameAvailable()){
        let object = {};
        fd.forEach((value, key) => {
            object[key] = value;
        })
        localStorage.setItem(object['Username'], JSON.stringify(object));
        alert("Registration Successfull");
        for(let i = 0; register.elements.length; i++){
            let element = register.elements[i];
            if(element.type == 'text' || element.type == 'password'){
                element.value = "";
            }
        }
    }
    event.preventDefault();
});
function isRegisterFormValidated(fd){
    let message = "";
    if(fd.get('Name').trim().length == 0){
        message = "Please provide name";
    }
    if(fd.get('Username').trim().length == 0){
        message != ""?(message+="\nPlease provide username"):(message = "Please provide username");
    }
    if(fd.get('Email').length == 0){
      message != ""?(message+="\nPlease provide password"):(message = "Please provide password");
  }
    if(fd.get('Password').length == 0){
        message != ""?(message+="\nPlease provide password"):(message = "Please provide password");
    }
    
    if(message != ""){
        alert(message);
        return false;
    }
    return true;
}

//login code
let loginForm = document.getElementById("login");
loginForm.addEventListener('submit', function(event){
    let fd = new FormData(event.target);
    if(isLoginFormValidated(fd)){
        let userData = localStorage.getItem(fd.get("Username"));
        let isLoginSuccesssful = true;
        if(userData == null){
            isLoginSuccesssful = false;
        }else{
            userData = JSON.parse(userData)
            if(userData["password"] != loginForm.password.value){
                isLoginSuccesssful = false;
            }
        }
        if(!isLoginSuccesssful){
            alert("Invalid username or password");
            event.preventDefault();
        }else{
            alert("Login Successful");
            localStorage.setItem('loggedInUser', userData["Name"])
            window.location.href = "postlogin.html";
        }
    }
    event.preventDefault();
})
function isLoginFormValidated(fd){
    let message = "";
    if(fd.get('Username').trim().length == 0){
        message = "Please provide username";
    }
    if(fd.get('Password').length == 0){
        message != ""?(message+="\nPlease provide password"):(message = "Please provide password");
    }
    if(message != ""){
        alert(message);
        return false;
    }
    return true;
}

//slider2
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


  let iconcart = document.querySelector('.icon-cart');
  let closecart = document.querySelector('.close');
  let body = document.querySelector(".spa")



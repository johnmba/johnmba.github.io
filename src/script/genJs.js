
const portfolioMenus = document.querySelectorAll('.portfolio-menu a')

const info = document.querySelector('.info')
const quote = document.querySelector('.quote')
const slide = document.querySelector('.slider-wrapper')

//info.addEventListener('click', ()=>{ 
  //console.log(item)
  //info.classList.remove('hidden')
//})

let lastEvent = ""

for (let item = 0; item < portfolioMenus.length; item++) {
  const portfolioMenu = portfolioMenus[item];
  let active = ""
  let portfolioItemClick = ""

  portfolioMenu.addEventListener('click', (e)=>{
    let portfolioItemId = e.target.getAttribute("href");

    if(lastEvent != ""){
      lastEvent.classList.add('portfolio-item')
      portfolioItemId = portfolioItemId.substring(1, portfolioItemId.length)
      portfolioItemClick = document.querySelectorAll(portfolioItemId)
      portfolioItemClick[0].classList.remove('portfolio-item')
      lastEvent = portfolioItemClick[0]
      return
    }

    if (active === "" && lastEvent === "" && portfolioItemClick === "") {
      portfolioItemId = portfolioItemId.substring(1, portfolioItemId.length)
      portfolioItemClick = document.querySelectorAll(portfolioItemId)
      info.classList.add('hidden')
      slide.classList.remove('hidden')
      portfolioItemClick[0].classList.remove('portfolio-item')
      active = portfolioItemId
      lastEvent = portfolioItemClick[0]
      return
    }else if (active === portfolioItemClick[0]){
      return
    }
  })
}

const tutorials__div = document.querySelector('#tutorials')
const views__div = document.querySelector('#views')
const view__more = document.querySelectorAll('.view__more')
fetch('/src/json/data.json')
  .then((response) => response.json())
  .then((json) => view__more.forEach(element => {// will raise not a function error if used on non iteration data
    console.log(element.parentElement.id)
    element.addEventListener('click', ()=>{
      if (element.parentElement.id==="views") {
        `<div class=""></div>`
      } else if (element.parentElement.id==="tutorials"){
        `<div class="">
        <a href="/pages/base.html?id=3"><h2></h2></a>
        <p></p></div>`
      }else{
        alert("undefined variable")
      }
    })
  }));
// path error in relative file directry because the file might not be relatve when linked in html page
// to avoide such error you have to use fullpath directory

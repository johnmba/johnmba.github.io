
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
function paragrapher(full_text) {
  const splited_text = full_text.split("/^(\w{80, 100})$\s/^[A-Z]/")
  const paragraph = (paragraph_text)=>{
    return "<p>" + paragraph_text + "</p>"
  }
  return splited_text.map(paragraph)
}
function itrate_into_dom_array(json__data) {
  const child_div = (each_data)=>{
    if (each_data.quote) {
      return `<div class="quote">${each_data.quote}<span class="read__more"><a href="#">... ${each_data.phil}</a></span></div>`
    } else {
      return`<div class="">
        <a href="/pages/base.html?id=3"><h2>${each_data.topic}</h2></a>
        ${paragrapher(each_data.body)}</div>`
    }
  }
  return json__data.map(child_div)
}

const tutorials__div = document.querySelector('#tutorials')
const views__div = document.querySelector('#views')
const view__more = document.querySelectorAll('.view__more')
fetch('/src/json/data.json')
  .then((response) => response.json())
  .then((json) => view__more.forEach(element => {// will raise not a function error if used on non iteration data
    element.addEventListener('click', ()=>{
      if (element.parentElement.id==="views") {
        const views = itrate_into_dom_array(json.views)
        //use for iteration to insert generated views
        for (let view = 0; view < views.length; view++) {
          const container = document.createElement("div")
          container.innerHTML = views[view];
          element.parentElement.firstElementChild.insertBefore(
            container, element.parentElement.firstElementChild.lastChild
          );
        }
        return
        //element.parentElement.append(itrate_into_dom_array(json.views))
      } else if (element.parentElement.id==="tutorials"){
        const tutorials = itrate_into_dom_array(json.tutorials)
        console.log(tutorials)
        for (let tutorial = 0; tutorial < tutorials.length; tutorial++) {
          const container = document.createElement("div")
          container.innerHTML = tutorials[tutorial];
          element.parentElement.firstElementChild.insertBefore(
            container, element.parentElement.firstElementChild.lastChild
          );
        }
        return
      }else{
        alert("undefined variable")
      }
    })
  }));
// path error in relative file directry because the file might not be relatve when linked in html page
// to avoide such error you have to use fullpath directory

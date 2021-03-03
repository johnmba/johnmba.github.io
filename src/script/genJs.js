
const portfolioMenus = document.querySelectorAll('.portfolio-menu .menu-item')
const portfolioItems = document.querySelectorAll('.portfolio-item')

const info = document.querySelector('.info')

//info.addEventListener('click', ()=>{ 
  //console.log(item)
  //info.classList.remove('hidden')
//})

for (let item = 0; item < portfolioMenus.length; item++) {
  const portfolioMenu = portfolioMenus[item];
  portfolioMenu.addEventListener('mouseover', ()=>{ 
    info.classList.add('hidden')
    portfolioItems[item].classList.remove('portfolio-item')
    //portfolioItems[item].style.display = 'flex'
  });
  console.log(portfolioItems[item]);
  portfolioMenu.addEventListener('mouseout', ()=>{ 
    info.classList.remove('hidden')
    portfolioItems[item].classList.add('portfolio-item')
    //portfolioItems[item].style.display = 'none'
  });
}

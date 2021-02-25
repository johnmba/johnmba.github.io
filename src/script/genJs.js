const leftArrow = document.querySelector('.arrows label[for="item1"]')
const rightArrow = document.querySelector('.arrows label[for="item2"]')
const indicatorParent = document.querySelector('.dot')
var sectionIndex = 0

function setIndex() {
  document.querySelector('.arrows .selected').classList.remove('selected')
  slider.style.transform = 'translate(' + sectionIndex * -25 + '%)';
}

var dots = document.querySelectorAll(".dot li label")
console.log(dots)
dots.forEach(function(indicator, ind){
  indicator.addEventListener('click', function(){
    sectionIndex = ind;
    setIndex();
    indicator.classList.add('selected')
  });
})

leftArrow.addEventListener('click', function(){
  sectionIndex = (sectionIndex > 0) ?  sectionIndex - 1 : 0;
  indicatorParent.children[sectionIndex].classList.remove('selected');
  setIndex();
})
console.log(leftArrow)

leftArrow.addEventListener('click', function(){
  sectionIndex = (sectionIndex > 3) ?  sectionIndex + 1 : 0;
  indicatorParent.children[sectionIndex].classList.remove('selected');
  setIndex();
})

const portfolios = document.querySelectorAll('.portfolio-item-wrapper')
portfolios.forEach(portfolio =>{
  portfolio.addEventListener('mouseover', () =>{
    portfolio.childNodes[1].classList.add('bg-darken')
  });
  portfolio.addEventListener('mouseout', () =>{
    portfolio.childNodes[1].classList.remove('bg-darken')
  });
})

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
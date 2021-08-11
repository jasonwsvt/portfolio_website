var slideIndex = 1;

//used to store the timeout
var timer;

//Array of images
var images = [
	"20190720_122528.jpg",
	"20190811_172305.jpg",
	"20190908_183433.jpg",
	"20190910_174321.jpg",
	"20190916_135952.jpg",
	"20190918_091001.jpg",
	"20190918_195938.jpg",
	"20190919_153723.jpg",
	"20190919_173542.jpg",
	"20190922_081050.jpg",
	"20190922_133853.jpg",
	"20190922_161534.jpg",
	"20191004_120909.jpg",
	"20191020_123106.jpg",
	"20191025_124340.jpg",
	"20191025_142154.jpg",
	"20191103_161406.jpg",
	"20191110_110504.jpg",
	"20191110_122450.jpg",
	"20191212_120057.jpg",
	"20200105_193554.jpg",
	"20200106_081245.jpg",
	"20200117_160228.jpg",
	"20200211_083930.jpg",
	"20200302_153639.jpg",
	"20200306_143738.jpg",
	"20200306_211930.jpg",
	"20200307_091558.jpg",
	"20200323_130241.jpg",
	"20200622_140302.jpg",
	"20201216_024631.jpg"
]

//Creates a slide and dot for each of the images in the above array.
function generateSlides() {
	images.reverse().forEach((image, index) => {
		var i = images.length - index
		var date = new Date(image.slice(0,4), image.slice(4,6)-1, image.slice(6,8), image.slice(9,11), image.slice(11,13), image.slice(13,15))
		date = date.toString().split(" ").slice(0, 5).join(" ")
		document.getElementById('slides').insertAdjacentHTML('afterBegin', 
`		<div id="slide-${i}" class="mySlides fade">
			<div class="numbertext">${i} / ${images.length}</div>
			<img src="images/${image}">
			<div class="text">${date}</div>
		</div>
`)
		document.getElementById('dots').insertAdjacentHTML('afterBegin',
	`			<span class="dot" onclick="currentSlide(${i})"></span>
	`)
	})
}

//Switches the slideshow to the given slide
function showSlide(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides")
	var dots = document.getElementsByClassName("dot")

	slideIndex = (n > slides.length) ? 1 : (n < 1) ? slides.length : n

	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none"
	}

	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "")
	}

	slides[slideIndex-1].style.display = "block"
	dots[slideIndex-1].className += " active"
}

// Next/previous controls
function plusSlides(n) {
	showSlide(slideIndex += n)
}

// Thumbnail image controls
function currentSlide(n) {
	showSlide(slideIndex = n)
}

//While the slider is moving, update the text field with the number it's currently set to.
function updateSeconds() {
	if (timer) { clearTimeout(timer) }
	var seconds = document.getElementById('adjust').value;
	console.log("Setting duration to", seconds)
	if (seconds === "0") {
		document.getElementById('timer').innerHTML = "<i>Disabled</i>"
	}
	else {
		document.getElementById('timer').innerHTML = document.getElementById('adjust').value;
	}
}

//When the mouse button is released, start the countdown to the next slide.
function setTimer(e) {
	if (timer) { clearTimeout(timer) }
	var seconds = document.getElementById('adjust').value;
	console.log("Setting duration to", seconds)
	if (seconds === "0") {
		document.getElementById('timer').innerHTML = "<i>Disabled</i>"
	}
	else {
		document.getElementById('timer').innerHTML = document.getElementById('adjust').value;
		progressTimer()
	}
}

//If there are more seconds to go, reduce the seconds by 1 and wait another second,
//otherwise advance the slide and set another timer.
function progressTimer() {
	var seconds = parseInt(document.getElementById('timer').innerHTML)
	if (seconds === 0) {
		plusSlides(1)
		setTimer()
	}
	else if (seconds > 0) {
		console.log("Progressing timer to ", seconds - 1)
		document.getElementById('timer').innerHTML = --seconds
		timer = setTimeout(progressTimer, 1000)
	}
	console.log (seconds, document.getElementById('timer').innerHTML)
}

//Once the page loads
window.addEventListener('load', function () {
	generateSlides()

	slideIndex = 1;
	showSlide(slideIndex);

	//Create event listener for the slider.
	document.getElementById('adjust').addEventListener('change', setTimer)
	document.getElementById('adjust').addEventListener('input', updateSeconds)
})
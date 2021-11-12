var slideIndex = 1;

//used to store the timeout
var timer;

//Array of images and text
var data = [
	{ image: "20190720_122528.jpg", text: "She's the one in the front." },
	{ image: "20190811_172305.jpg", text: "This is the moment we really connected." },
	{ image: "20190908_183433.jpg", text: "She loved sleeping on my bed." },
	{ image: "20190910_174321.jpg", text: "Such a good little girl." },
	{ image: "20190916_135952.jpg", text: "She used to be obsessed with those bones." },
	{ image: "20190918_091001.jpg", text: "Are you sticking your tongue out at me?" },
	{ image: "20190918_195938.jpg", text: "Auntie Lucesita's bag was really comfy." },
	{ image: "20190919_153723.jpg", text: "A growing little girl gets in a nap anywhere she can." },
	{ image: "20190919_173542.jpg", text: "Auntie Avalon had a really comfy pillow." },
	{ image: "20190922_081050.jpg", text: "Such big feet you have." },
	{ image: "20190922_133853.jpg", text: "Not much to do at Sushi Sundays except for sleeping." },
	{ image: "20190922_161534.jpg", text: "Comfy spots are meant for naps." },
	{ image: "20191004_120909.jpg", text: "Laying in the grass is still her favorite thing to do." },
	{ image: "20191020_123106.jpg", text: "Even more sleeping at Sushi Sundays." },
	{ image: "20191025_124340.jpg", text: "I had to promise she wouldn't set foot inside the ruins." },
	{ image: "20191025_142154.jpg", text: "Hiking down the Inka trail between Chinchero and Urquillos." },
	{ image: "20191103_161406.jpg", text: "Hanging out at Tantraya." },
	{ image: "20191110_110504.jpg", text: "Outside Tarapoto, first time playing in the water." },
	{ image: "20191110_122450.jpg", text: "Also outside Tarapoto, digging holes in the sand on the beach." },
	{ image: "20191212_120057.jpg", text: "Getting used to her new crate at home in the United States." },
	{ image: "20200105_193554.jpg", text: "Best place in the world in the Winter is right in front of the fire." },
	{ image: "20200106_081245.jpg", text: "Cute little bat ears." },
	{ image: "20200117_160228.jpg", text: "Don't you think that's a little too close, sweetheart?" },
	{ image: "20200211_083930.jpg", text: "Teddy is now perfect." },
	{ image: "20200302_153639.jpg", text: "Having fun in the snow." },
	{ image: "20200306_143738.jpg", text: "Isn't it time to go on a run yet?" },
	{ image: "20200306_211930.jpg", text: "Disco point." },
	{ image: "20200307_091558.jpg", text: "Time to play." },
	{ image: "20200323_130241.jpg", text: "Don't you think I look pretty in my new hedgehog hat?" },
	{ image: "20200622_140302.jpg", text: "Lazy afternoon." },
	{ image: "20201216_024631.jpg", text: "Was this your seat?" },
	{ image: "20201225_170402.jpg", text: "New Christmas present." },
	{ image: "20210520_150755.jpg", text: "Mid-run photo shoot." },
	{ image: "20210828_021256.jpg", text: "Otter is my favorite pillow." },
	{ image: "20211029_193130.jpg", text: "The beast in her natural environment." }
]

//Creates a slide and dot for each of the images in the above array.
function generateSlides() {
	data.reverse().forEach(({ image, text }, index) => {
		var i = data.length - index
		var date = new Date(image.slice(0,4), image.slice(4,6)-1, image.slice(6,8), image.slice(9,11), image.slice(11,13), image.slice(13,15))
		date = date.toString().split(" ").slice(0, 5).join(" ")
		document.getElementById('slides').insertAdjacentHTML('afterBegin', 
`		<div id="slide-${i}" class="slides fade">
			<div class="numbertext">${i} / ${data.length}</div>
			<img src="images/${image}" alt="${date} - ${text}">
			<div class="text">${date}<br>${text}</div>
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
	var slides = document.getElementsByClassName("slides")
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
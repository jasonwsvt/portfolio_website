/*
function onResize() {
	console.log("call to onResize")
	var body = window.document.body
	var windowHeight = (window.innerHeight) ? window.innerHeight :
	                   (body && body.parentElement) ? body.parentElement.clientHeight :
					   (body && body.clientHeight) ? body.clientHeight : null
	var headerHeight = document.getElementsByTagName("header")[0].offsetHeight
	var navHeight = document.getElementById("nav").offsetHeight
	var portfolioHeight = [...document.getElementById("pills-portfolio-tab").classList].includes("active")
							? document.getElementById("pills-portfolio-tab").offsetHeight : 0
	console.log("windowHeight:", windowHeight)
	console.log("headerHeight:", headerHeight)
	console.log("navHeight:", navHeight)
	console.log("pills-portfolio-tab classlist: ", document.getElementById("pills-portfolio-tab").classList)
	console.log("portfolioHeight:", portfolioHeight)
	console.log("contentHeight:", windowHeight - headerHeight - navHeight - portfolioHeight)
	document.getElementById('content').style.height = ((windowHeight - headerHeight - navHeight - portfolioHeight) + "px")
	console.log("set to:", document.getElementById('content').style.height)
}

function onClick(event) {
	console.log("call to onClick")
	if (event.target.nodeName === 'BUTTON') {
		onResize();
	}
}
*/
window.addEventListener('load', () => {
	document.body.classList.remove('fade-out')

/*	window.addEventListener('resize', onResize)

	document.querySelectorAll('#nav button').forEach(btn => { console.log("adding event listener for", btn.textContent); btn.addEventListener('onmouseup', onClick) })

	onResize()*/
});
// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.menu__item')

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav)


// canvas animation

var c = document.getElementById("c");
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var particles = [];
var max = 1000;
var clearColor = "rgba(0, 0, 0, .4)";
var fov = 15;
var hue = 0;
var frame = 0;
var start = 310;


function random(min, max) {
		return (Math.random() * (max - min)) + min;
}


function P(){
	this.startZ = start;
	start+=.18;
}



P.prototype.init = function(){
	this.x = random(-w * 4, w * 4);
	this.y = 500;
	this.z = this.startZ || 500;
	this.startZ = null;
	this.vx = 0;
	this.vy = 0;
	this.vz = 2;
	this.color = "hsla("+hue+", 100%, 50%, .8)";
	this.size = 20;
};

P.prototype.draw = function(){
	var scale = fov/(fov+this.z);
	var x2d = this.x * scale + w/2;
	var y2d = this.y * scale + h/2;
	ctx.fillStyle = this.color;
	ctx.fillRect(x2d, y2d, this.size * scale, this.size * scale);
	
	if(x2d < 0 || x2d > w || y2d < 0 || y2d > h){
		this.init();
	}
	
	this.update();
};


P.prototype.update = function(){
	this.z -= this.vz;
	this.x += this.vx;
	this.y += this.vy;
	if(this.z < -fov){
		this.init();
	}
};

for(var i=0; i<max; i++){
	(function(x){
		setTimeout(function(){
			var p = new P();
			p.init();
			particles.push(p);
		}, x * 3)
	})(i)
}

window.addEventListener("resize", function(){
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight;
})


function anim(){
	ctx.fillStyle = clearColor;
	ctx.globalCompositeOperation = "source-over";
	ctx.fillRect(0,0,w,h);
	
	for(var i in particles){
		particles[i].draw();
	}
	
	hue += .1;
	frame = window.requestAnimationFrame(anim);
}


anim();

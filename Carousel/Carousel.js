let Carousel = (function () {
	function _Carousel(carouselContainer) {
		this.ct = carouselContainer
		this.init()
		this.bind()
		this.autoClick()
	}

	_Carousel.prototype.init = function () {
		// Dom
		this.carousel = this.ct.querySelector('.carousel')
		this.carouselLis = this.ct.querySelectorAll('.carousel > li')
		this.btnLeft = this.ct.querySelectorAll('.btn')[0]
		this.btnRight = this.ct.querySelectorAll('.btn')[1]
		this.bottomBarBtns = this.ct.querySelectorAll('.bottom-bar > li')
		// 每页的宽度
		this.perCarouselLiWidth = this.carouselLis[0].clientWidth
		// 当前页index
		this.currentPageIndex = 0
		// 因为设置了异步判断currentPageIndex，所以再声明一个变量用来set底部bar
		this.bottomBarCount = 0
		// 为了设置left
		this.currentLeft = -this.perCarouselLiWidth * (this.currentPageIndex + 1)
		// 为了防止事件未完成就点击
		this.stopEvent = false
		// clone node
		this.carousel.insertBefore(this.carouselLis[this.carouselLis.length - 1].cloneNode(true), this.carouselLis[0])
		this.carousel.appendChild(this.carouselLis[0].cloneNode(true))
		// 调整图片出现顺序和container的宽度
		this.carousel.style.width = `${this.perCarouselLiWidth * this.carouselLis.length}px`
		this.carousel.style.left = this.currentLeft + 'px'
	}

	_Carousel.prototype.bind = function () {
		this.btnLeft.addEventListener('click', e => {
			// 防止事件未完成就点击
			if (this.stopEvent) return;

			// 点击之后，清除自动轮播ID
			if (this.intId) {
				clearInterval(this.intId)
			}

			this.playPre()
			this.bottomBarCount -= 1
			if (this.bottomBarCount < 0) {
				this.bottomBarCount = this.carouselLis.length - 1
			}
			this.setBottomBar()
		})
		this.btnRight.addEventListener('click', e => {
			if (this.stopEvent) return;

			// 点击之后，清除自动轮播ID
			if (this.intId) {
				clearInterval(this.intId)
			}

			this.playNext()
			this.bottomBarCount += 1
			if (this.bottomBarCount > this.carouselLis.length - 1) {
				this.bottomBarCount = 0
			}
			this.setBottomBar()
		})
	}

	_Carousel.prototype.autoClick = function () {
		this.intId = setInterval(() => {
			if (this.stopEvent) return;
			console.log('hh')
			this.playNext()
			this.bottomBarCount += 1
			if (this.bottomBarCount > this.carouselLis.length - 1) {
				this.bottomBarCount = 0
			}
			this.setBottomBar()
		}, 5000)
	}

	_Carousel.prototype.playPre = function () {
		// this.currentPageIndex -= 1
		// this.carousel.style.left = -this.perCarouselLiWidth * (this.currentPageIndex + 1) + 'px'
		// if (this.currentPageIndex < 0) {
		// 	this.currentPageIndex = this.carouselLis.length - 1
		// 	console.log(this.currentPageIndex)
		// 	this.carousel.style.left = -this.perCarouselLiWidth * (this.currentPageIndex + 1) + 'px'
		// }
		this.stopEvent = true
		let self = this
		let n = -this.perCarouselLiWidth * (this.currentPageIndex + 1) // -1226
		console.log(n)
		this.currentPageIndex -= 1
		console.log(n <= -self.perCarouselLiWidth * (self.currentPageIndex + 1))
		// 用settimeout模拟jQuery的animate
		setTimeout(function run() {
			if (n <= -self.perCarouselLiWidth * (self.currentPageIndex + 1)) { // 0
				self.carousel.style.left = n + 1 + 'px'
				n += 1
				setTimeout(run, 1)
			} else {
				if (self.currentPageIndex < 0) {
					self.currentPageIndex = self.carouselLis.length - 1
					console.log(self.currentPageIndex)
					self.carousel.style.left = -self.perCarouselLiWidth * (self.currentPageIndex + 1) + 'px'
				}
				// 防止事件未完成就点击
				self.stopEvent = false
				// 点击轮播结束后，开启自动轮播
				self.autoClick()
			}
		}, 1)
	}

	_Carousel.prototype.playNext = function () {
		// this.currentPageIndex += 1
		// this.carousel.style.left = -this.perCarouselLiWidth * (this.currentPageIndex + 1) + 'px'
		// if (this.currentPageIndex > this.carouselLis.length - 1) {
		// 	this.currentPageIndex = 0
		// 	console.log(this.currentPageIndex)
		// 	this.carousel.style.left = -this.perCarouselLiWidth * (this.currentPageIndex + 1) + 'px'
		// }
		this.stopEvent = true
		let self = this
		let n = -this.perCarouselLiWidth * (this.currentPageIndex + 1) // -1226
		console.log(n)
		this.currentPageIndex += 1
		console.log(n <= -self.perCarouselLiWidth * (self.currentPageIndex + 1))
		// 用settimeout模拟jQuery的animate
		setTimeout(function run() {
			if (n >= -self.perCarouselLiWidth * (self.currentPageIndex + 1)) { // 0
				self.carousel.style.left = n - 1 + 'px'
				n -= 1
				setTimeout(run, 1)
			} else {
				if (self.currentPageIndex > self.carouselLis.length - 1) {
					self.currentPageIndex = 0
					console.log(self.currentPageIndex)
					self.carousel.style.left = -self.perCarouselLiWidth * (self.currentPageIndex + 1) + 'px'
				}
				// 防止事件未完成就点击
				self.stopEvent = false
				// 点击轮播结束后，开启自动轮播
				self.autoClick()
			}
		}, 1)
	}

	_Carousel.prototype.setBottomBar = function () {
		this.bottomBarBtns.forEach(element => {
			element.classList.remove('active')
		})
		this.bottomBarBtns[this.bottomBarCount].classList.add('active')
	}

	return {
		init: function () {
			for (let i = 0; i < arguments.length; i++) {
				new _Carousel(arguments[i])
			}
		}
	}
})()

Carousel.init(document.querySelector('.carousel-wrapper'))



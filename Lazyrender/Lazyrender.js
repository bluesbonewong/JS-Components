// lazyRender原理解析
// 1.对于所有img，把其地址放入img的自定义属性，如data-src中【或者放入一个数组内】
// 2.当页面滚动时，判断该img元素是否出现在视野内，再判断其是否被加载过，若未被加载，则加载，已加载则忽略

// 构建三个函数实现上述思路
// isVisible 判断元素是否出现在视野内
// isLoaded 判断是否加载过
// loadImg 加载图片地址

let LazyRender = (function () {
	let _LazyRender = function (lazyRenderContainer) {
		this.ct = lazyRenderContainer
		this.init()
		this.bind()
		this.lazyRender()
	}

	_LazyRender.prototype.init = function () {
		this.imgs = this.ct.querySelectorAll('li > a > img')
		this.clock = false
	}

	_LazyRender.prototype.bind = function () {
		window.document.addEventListener('scroll', () => {
			// 为了防止用户突然将页面拉到底部，而造成图片全部加载
			// 使用setTimeout实现
			let self = this
			if (this.clock) {
				clearTimeout(this.clock)
			}
			this.clock = setTimeout(function () {
				self.lazyRender()
			}, 100)
		})
	}

	_LazyRender.prototype.lazyRender = function () {
		console.log(2)
		for (let i = 0; i < this.imgs.length; i++) {
			if (this.isVisible(this.imgs[i]) && this.isLoaded(this.imgs[i])) {
				this.loadImg(this.imgs[i])
			}
		}
	}

	_LazyRender.prototype.isVisible = function (node) {
		// 判断元素是否出现在屏幕内
		// 滚动条位置
		let scrollTop = document.documentElement.scrollTop
		// 屏幕高度
		let windowHeight = document.documentElement.clientHeight
		// 元素距离顶部的高度
		let offsetTop = node.offsetTop

		// 核心是满足临界条件——元素出现在屏幕底部
		// offsetTop <= scrollTop + windowHeight
		// offsetTop > scrollTop
		return offsetTop < scrollTop + windowHeight && offsetTop > scrollTop
	}

	_LazyRender.prototype.isLoaded = function (node) {
		// 判断图片src有没有被data-src替换
		// 注意前面的 ！operator，如果图片src被替换了，整个表达式返回的是false，括号内返回的是true
		return !(node.getAttribute('src') === node.getAttribute('data-src'))
	}

	_LazyRender.prototype.loadImg = function (node) {
		// 更换图片的src
		node.setAttribute('src', node.getAttribute('data-src'))
	}

	return {
		init: function () {
			for (let i = 0; i < arguments.length; i++) {
				new _LazyRender(arguments[i])
			}
		}
	}
})()

LazyRender.init(document.querySelector('.lazy-wrapper > .container'))

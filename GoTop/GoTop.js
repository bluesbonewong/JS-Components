let GoTop = (function () {
	let _GoTop = function () {
		this.createElement()
		this.bind()
	}

	_GoTop.prototype.createElement = function () {
		this.container = document.querySelector('body')
		let newElement = document.createElement('div')
		let newTextNode = document.createTextNode('回到顶部')
		newElement.appendChild(newTextNode)
		newElement.classList.add('goTop')
		this.container.appendChild(newElement)
		// 元素创建完后，获取到这个dom节点
		this.goTopNode = this.container.querySelector('.goTop')
	}

	_GoTop.prototype.bind = function () {
		// 窗口滚动事件
		window.document.addEventListener('scroll', () => {
			if (document.documentElement.scrollTop > 200) {
				this.goTopNode.classList.add('display')
			} else {
				this.goTopNode.classList.remove('display')
			}
		})
		// 点击事件
		this.goTopNode.addEventListener('click', () => {
			scrollTo(0,0)
			this.goTopNode.classList.remove('display')
		})
	}

	return {
		init: function () {
			new _GoTop()
		}
	}
})()
// function Tab(tabContainer) {
// 	// 接收参数
// 	this.ct = tabContainer
// 	this.init()
// 	this.bind()
// }
//
// Tab.prototype.init = function () {
// 	// 为Tab绑定属性，可供其它prototype上的新建方法调用
// 	this.tabLis = this.ct.querySelectorAll('.tab-button > li')
// 	this.tabPanels = this.ct.querySelectorAll('.tab-panel > li')
// }
//
// Tab.prototype.bind = function () {
// 	// 绑定click事件
// 	let self = this
// 	let tabLisWrapper = this.ct.querySelector('.tab-button')
// 	tabLisWrapper.addEventListener('click', function (e) {
// 		let target = e.target
// 		let index = [].indexOf.call(self.tabLis, target)
// 		e.stopPropagation()
//
// 		// button的class切换
// 		for (let i = 0; i < self.tabLis.length; i++) {
// 			self.tabLis[i].classList.remove('active')
// 		}
// 		target.classList.add('active')
//
// 		// panel的class切换
// 		for (let i = 0; i < self.tabLis.length; i++) {
// 			self.tabPanels[i].classList.remove('display')
// 		}
// 		self.tabPanels[index].classList.add('display')
// 	})
// }
//
// let tab1 = new Tab(document.querySelectorAll('.tab-wrapper')[0])
// let tab2 = new Tab(document.querySelectorAll('.tab-wrapper')[1])

// 上面是未进行二次封装的代码，留待博客使用
// 从这里开始看

let Tab = (function () {
	function _Tab(tabContainer) {
		// 接收参数
		this.ct = tabContainer
		this.init()
		this.bind()
	}

	_Tab.prototype.init = function () {
		// 为Tab绑定属性，可供其它prototype上的新建方法调用
		this.tabLis = this.ct.querySelectorAll('.tab-button > li')
		this.tabPanels = this.ct.querySelectorAll('.tab-panel > li')
	}

	_Tab.prototype.bind = function () {
		// 绑定click事件
		let self = this
		let tabLisWrapper = this.ct.querySelector('.tab-button')
		tabLisWrapper.addEventListener('click', function (e) {
			let target = e.target
			let index = [].indexOf.call(self.tabLis, target)
			e.stopPropagation()

			// button的class切换
			for (let i = 0; i < self.tabLis.length; i++) {
				self.tabLis[i].classList.remove('active')
			}
			target.classList.add('active')

			// panel的class切换
			for (let i = 0; i < self.tabLis.length; i++) {
				self.tabPanels[i].classList.remove('display')
			}
			self.tabPanels[index].classList.add('display')
		})
	}

	return {
		init: function () {
			for (let i = 0; i < arguments.length; i++) {
				new _Tab(arguments[i])
			}
		}
	}
})()

Tab.init(document.querySelectorAll('.tab-wrapper')[0],document.querySelectorAll('.tab-wrapper')[1])


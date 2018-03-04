// 核心思路
// 当一行内的元素宽度之和超过了容器宽度
// 就把一行内的最后一个元素拿掉
// 然后把一行内的其它元素等比放大撑满一行

let Barrel = (function () {
	function _Barrel($container) {
		this.$container = $container
		this.rowList = []
		this.loadImg()
	}

	_Barrel.prototype = {
		loadImg: function () {
			let _this = this
			let imgs = this.getImgUrls(100)
			// 每次得到十张图片
			for (let i = 0; i < imgs.length; i++) {
				// 将每一个img新建为一个对象
				let img = new Image()
				// Image()函数将会创建一个新的HTMLImageElement实例[DOM元素]
				img.src = imgs[i]
				img.onload = function () {
					// 每当图片加载成功
					let imgInfo = {
						target: this,
						// 等高，设定元素的宽度
						width: 200 * (this.width / this.height), //new Image()构造出的对象自带这两个属性
						height: 200
					}
					// 每个图片加载之后都执行render
					_this.render(imgInfo)
				}
			}
		},
		getImgUrls: function (num) {
			// 解析url——需要得到几张图片
			// 图片都是随机宽高
			let color, width, height, urls = []
			for (let i = 0; i < num; i++) {
				color = Math.random().toString(16).substring(2, 8)
				width = Math.floor(Math.random() * 100 + 50)
				height = Math.floor(Math.random() * 30 + 50)
				urls.push('http://via.placeholder.com/' + width + 'x' + height + '/' + color)
			}
			return urls
		},
		render: function (imgInfo) {
			let containerWidth = this.$container.width()
			let rowWidth = 0
			let rowNewHeight = 0 // 对同一行内其它元素进行高度变化所需要的 新高度
			this.rowList.push(imgInfo)
			for (let i = 0; i < this.rowList.length; i++) {
				rowWidth += this.rowList[i].width
			}
			if (rowWidth > containerWidth) {
				// 当发现同行的元素总宽度大于容器总宽度时
				// 直接将数组最后一个去掉
				// 然后将rowWidth赋值为0，将去掉最后一个元素的rowList数组的宽度重新相加
				this.rowList.pop()

				// !!!!!!!!
				rowWidth = 0
				for (let j = 0; j < this.rowList.length; j++) {
					rowWidth += this.rowList[j].width
				}
				//!!!!!!!!

				// rowWidth/200 == containerWidth/rowNewHeight
				rowNewHeight = containerWidth * (200 / rowWidth)

				// 将去掉最后一个的rowList进行布局
				this.layout(rowNewHeight)
				// 布局完成后，清空数组
				this.rowList = []
				// 将刚才去掉的元素push进rowList数组，作为数组的第一项
				// 这一步的作用等于是开启下一行
				this.rowList.push(imgInfo)
			}
		},
		layout: function (rowNewHeight) {
			let $rowContainer = $('<div class="img-row"></div>')
			$.each(this.rowList, function (idx, imgInfo) {
				let $imgContainer = $('<div class="img-box"></div>')
				let $img = $(imgInfo.target) // 这里的 imgInfo.target === img
				$img.height(rowNewHeight)
				$imgContainer.append($img)
				$rowContainer.append($imgContainer)
			})
			this.$container.append($rowContainer)
		}
	}

	return {
		init: function () {
			for (let i = 0; i < arguments.length; i++) {
				new _Barrel(arguments[i])
			}
		}
	}
})()

Barrel.init($('.container'))



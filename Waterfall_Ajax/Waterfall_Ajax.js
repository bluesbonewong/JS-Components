// 思路
// 1.获取数据
// 2.将数据改装为DOM结构，通过瀑布流的方式放到网页上
// 3.当页面滚到底部时 -> 第1步
// 3.1实现方式：在页面底部埋一个元素，每当这个元素暴露在窗口，就代表窗口滚到底部了

// 难点
// 由于图片高度不定，所以每个item的的高度是不定的
// 所以要等到图片加载完成后，再将item放入瀑布流中

let Waterfall = (function () {
	let _Waterfall = function (container) {
		this.ct = container
		this.init()
		this.bind()
	}

	_Waterfall.prototype.init = function () {
		this.bottomLoadNode = this.ct.querySelector('#bottom-load')
		// 获取数组的具体信息
		this.perPageCount = 9
		this.currentPage = 1
		// 加载锁，防止数据为到来前重复点击
		this.isLoading = false
		// 计算出页面中共有几列
		this.perLiWidth = window.getComputedStyle(this.ct.querySelectorAll('.item')[0], null).getPropertyValue('width').slice(0, -2)
		this.columnLength = parseInt(this.ct.offsetWidth / this.perLiWidth)
		// 初始化列高度数组
		this.columnHeightArr = []
		for (let i = 0; i < this.columnLength; i++) {
			this.columnHeightArr[i] = 0
		}
	}

	_Waterfall.prototype.bind = function () {
		this.bottomLoadNode.addEventListener('click', () => {
			// 如果数据正在被请求，isloading为true，那么这次点击什么也不做
			if (this.isLoading) return
			// 发请求前，上锁
			this.isLoading = true
			// 1.获取数据
			this.getData((newsListArray) => {
				// 2.将数据改装为DOM结构，通过瀑布流的方式放到网页上
				console.log(newsListArray)
				for (let i = 0; i < newsListArray.length; i++) {
					// 2.1 将数据改装为DOM结构
					let node = this.getNode(newsListArray[i])
					// 2.2 只有当节点内的img加载完毕后，才能放到网页上
					node.querySelector('img').addEventListener('load', () => {
						this.ct.querySelector('#ct-picture').appendChild(node)
						console.log(node)
						this.waterFallPlace(node)
					})
				}
			})
		})
	}

	_Waterfall.prototype.getData = function (callback) {
		$.ajax({
			// 接口：http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4
			url: 'http://platform.sina.com.cn/slide/album_tech',
			dataType: 'jsonp',
			jsonp: 'jsoncallback', // 在一个JSONP请求中重写回调函数的名字。这个值用来替代在"callback=?"这种GET或POST请求中URL参数里的"callback"部分
			data: {
				app_key: '1271687855',// 这个是固定的
				num: this.perPageCount,
				page: this.currentPage
			}
		}).done((ret) => {
			if (ret && ret.status && ret.status.code === "0") {
				callback(ret.data) //如果数据没问题，就生成好节点并且摆放好位置
				this.currentPage += 1
				// 请求成功，解开isloading的锁
				this.isLoading = false
			} else {
				console.log("get error data")
			}
		})
	}

	_Waterfall.prototype.getNode = function (item) {
		let liNode = document.createElement('li')
		liNode.classList.add('item')
		let aNode = document.createElement('a')
		aNode.classList.add('link')
		aNode.setAttribute('href', `${item.url}`)
		let imgNode = document.createElement('img')
		imgNode.setAttribute('src', `${item.img_url}`)
		let h4Node = document.createElement('h4')
		h4Node.appendChild(document.createTextNode(`${item.short_name}`))
		let pNode = document.createElement('p')
		pNode.appendChild(document.createTextNode(`${item.short_intro}`))

		aNode.appendChild(imgNode)
		liNode.appendChild(aNode)
		liNode.appendChild(h4Node)
		liNode.appendChild(pNode)

		return liNode
	}

	_Waterfall.prototype.waterFallPlace = function (node) {
		// 选出数组里的最小值，将新的元素放入最小值所属的那一列
		let minValue = Math.min.apply(null, this.columnHeightArr)
		let minIndex = this.columnHeightArr.indexOf(minValue)
		// 节点margin大小,slice方法去掉px
		let nodeMargin = window.getComputedStyle(node, null).getPropertyValue("margin").slice(0, -2)

		// 节点样式设置
		node.setAttribute('style', `top:${minValue}px;left:${minIndex * (node.offsetWidth + nodeMargin * 2)}px;opacity:1;`)

		this.columnHeightArr[minIndex] += node.offsetHeight + nodeMargin * 2
		// 给ul赋值最大高度是因为li是绝对定位，所以ul的高度是撑不开的
		this.ct.querySelector('#ct-picture').setAttribute('style', `height:${Math.max.apply(null, this.columnHeightArr)}px;`)
		console.log(this.columnHeightArr)
	}

	return {
		init: function () {
			for (let i = 0; i < arguments.length; i++) {
				new _Waterfall(arguments[i])
			}
		}
	}
})()



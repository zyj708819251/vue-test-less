let publicJs = function() {

	/**
	 * 跳转路由
	 * @param {Object} data
	 * {
	     service_id: 'page.call_function',
	     browser_type: 'chrome',
	     function_name: 'window.$public.handleJumpRouter',
	     path:'/',
	     query:'{"data":"1234"}'
	   }
	 */
	var handleJumpRouter = function(data) {
		let path = "";
		let query = {};
		if (typeof data == 'string') {
			try {
				var obj = JSON.parse(data);
				if (typeof obj == 'object' && obj) {

					if (obj.hasOwnProperty("path")) {
						path = obj.path
					}
					if (obj.hasOwnProperty("query")) {
						try {
							query = obj.query
						} catch (e) {

						}

					}
				} else {}

			} catch (e) {
				console.log('error：' + e);
			}
		}
		$vue.$router.push({
			path: path,
			query: query
		});
	}

	/**
	 * 打开iframe页面
	 * @param {Object} data
	 * {
	     service_id: 'page.call_function',
	     browser_type: 'chrome',
	     function_name: 'window.$public.handleCreateIframe',
	     id: "ifsajkldjlk",
	     width: "200",
	     height: "200",
	     left: "10",
	     top: "20",
	     iframeSrc: "http://www.baidu.com",
	   }
	 */
	var handleCreateIframe = function(options) {
		handleCloseIframe(options);
		var options = JSON.parse(options)
		var prefix=options.iframeSrc.indexOf('http')>-1?'':$rootUrl;
		var top = options.top ? (options.top.indexOf('%') == -1 ? options.top + 'px' : options.top) : 'initial';
		var left = options.left ? (options.left.indexOf('%') == -1 ? options.left + 'px' : options.left) :
			'initial';
		var right = options.right ? (options.right.indexOf('%') == -1 ? options.right + 'px' : options.right) :
			'initial';
		var bottom = options.bottom ? (options.bottom.indexOf('%') == -1 ? options.bottom + 'px' : options
				.bottom) :
			'initial';
		$('#app').append(
			`
  			<iframe src="${prefix}${options.iframeSrc}"  id="${options.id}" class="handleCreateIframeContainer" style="
  			 position: fixed;
  			 z-index: 100001;
  			 width: ${options.width}px;
  			 height: ${options.height}px;
  			 left:${left};
  			 right:${right};
  			 top:${top};
  			 bottom:${bottom};
  			 overflow: hidden;" frameborder="0"></iframe>
  		`
		)
	}
	/**
	 * 关闭iframe页面
	 * @param {Object} data
	 * {
	     id: "ifsajkldjlk",
	   }
	 */
	var handleCloseIframe = function(options) {
		var optionsValue = JSON.parse(options)
		try {
			var obj = document.getElementById(optionsValue.id)
			obj.contentWindow.resafety_onclose && obj.contentWindow.resafety_onclose();
			obj.remove()
		} catch (error) {

		}
	}


	return {
		handleJumpRouter,
		handleCreateIframe,
		handleCloseIframe
	}
}()

export default publicJs

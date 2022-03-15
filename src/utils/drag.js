import Vue from 'vue';
//使用Vue.directive()定义一个全局指令
//1.参数一：指令的名称，定义时指令前面不需要写v-
//2.参数二：是一个对象，该对象中有相关的操作函数
//3.在调用的时候必须写v-
//4.结构
//  <div class="hello">
//    <div class="zyj-dialog-header" v-zyjdrag>
//      <div class="zyj-dialog-title">1111111111</div>
//    </div>
//  </div>
function getParentdElement(node, childName) {
	//如果父节点parentNode含有指定类名childName，这个节点就是目标节点
	if (node.className.indexOf(childName)>0) {
		return node;
	} else {
		var parent = node.parentNode;
		return getParentdElement(parent, childName);
	}
}


const zyjdrag = Vue.directive('zyjdrag', //弹出框拖动指令
	{
		bind: function(el, binding) {
			let oDiv = el; //当前元素
			let isFullScreen = false; //是否全屏
			oDiv.onmousedown = function(e) {
				let parent = getParentdElement(e.target, 'zyj-drag');

				//鼠标按下，计算当前元素距离可视区的距离
				let disX = e.clientX - parent.offsetLeft
				let disY = e.clientY - parent.offsetTop

				document.onmousemove = function(e) {
					let L = e.clientX - disX
					let T = e.clientY - disY

					if (L < 0) {
						L = 0;
					} else if (L > document.body.clientWidth - parent.offsetWidth) {
						L = document.body.clientWidth - parent.offsetWidth;
					}

					if (T < 0) {
						T = 0;
					} else if (T > document.body.clientHeight - parent.offsetHeight) {
						T = document.body.clientHeight - parent.offsetHeight;
					}

					parent.style.left = L < 0 ? 0 : L + 'px';
					parent.style.top = T < 0 ? 0 : T + 'px';
					parent.style.right = 'initial';
					parent.style.bottom = 'initial';
					parent.style.zIndex = '4';
				}
				document.onmouseup = function(e) {
					document.onmousemove = null
					document.onmouseup = null
					console.log(document.onmouseup)
					let dialogs = document.querySelectorAll("div[data-name='zyj-dialog']");
					dialogs.forEach((v, i) => {
						dialogs[i].style.zIndex = '3';
					})
					parent.style.zIndex = '4';
				}
				return false
			}
		}
	}
)
export default zyjdrag;

import Vue from 'vue'
import router from '@/router'
import store from '@/store'

import Dialog from '@com/Dialog/Dialog.vue'
let component = null;
let components = [];
export default {
	installDialog() {
		return {
			openPop: this.installSubPop.bind(this),
			closePop: this.closeSubPop.bind(this)
		}
	},
	installSubPop(options) {
		this.initBase(options);
	},
	closeSubPop(id) {
		for (var i = 0; i < components.length; i++) {
			if (components[i].id == id) {
				components[i].zyjDialogFlag = false
         components.splice(i,1);
				break;
			}
		}
	},
	initBase(options) {
		var message = Vue.extend(Dialog)
		component = new message({
			router,
			store,
			data: options
		}).$mount();
		components.push(component);
		let pop = document.getElementById('zyj-dialog-' + options.id);
		// pop && document.querySelector('#app').removeChild(pop);
		document.querySelector('#app').appendChild(component.$el)
		component.zyjDialogFlag = true;
	}
}

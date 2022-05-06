import Overlay from 'ol/Overlay';
//弹框
import dialogMessage from '@com/Dialog/Dialog.js';
var $zyjdialog = dialogMessage.installDialog();

var popup = {
	show(obj,e) {
		let that = this;
		$zyjdialog.closePop(obj.effectId);
		$zyjdialog.openPop({
			content: obj.popupCom,
			id: obj.effectId,
			dialogData: obj,
			isPostion: false
		});
		setTimeout(() => {
			var element = document.getElementById('zyj-dialog-' + obj.effectId);
			let popup = new Overlay({
				id: obj.effectId,
				element: element,
				positioning: 'bottom-center',
				stopEvent: true,
				autoPan: true,
				autoPanAnimation: {
					duration: 500
				},
				// offset: [0, -40]
			});
			window.map.addOverlay(popup);
			window.clearLabel.push({
				groupId: obj.groupId,
				id: obj.effectId
			});
			popup.setPosition(obj.lnglat?obj.lnglat:e.coordinate);
		});
	}
}

export default popup

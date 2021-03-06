/* global scene */
'use strict'

function addThreeJsButtons(user, isAndroid) {
	if (!altspace.inClient) { return; }
	if (!user.isModerator) { return; }

	var zoomFactor = isAndroid ? 1 : 1.25;
	var clickablesRoot = new THREE.Group();
	clickablesRoot.scale.multiplyScalar(1/250);
	clickablesRoot.position.set(1.95, 3.15, -8.5);
	scene.add(clickablesRoot);

	var clickableGeo = new THREE.PlaneGeometry(1, 1, 1);
	var clickableMat = new THREE.MeshBasicMaterial({visible: false});

	var clickables = [];

	function scaleAndPositionClickable(mesh, el) {
		var outerWidth = el.outerWidth();
		if (el.is(':visible') && outerWidth) {
			mesh.scale.x = Math.ceil(outerWidth) * zoomFactor;
			mesh.scale.y = Math.ceil(el.outerHeight()) * zoomFactor;
			mesh.visible = true;
		}
		else {
			mesh.visible = false;
		}

		var elOffset = el.offset();
		mesh.position.x = elOffset.left * zoomFactor + mesh.scale.x / 2;
		mesh.position.y = -elOffset.top * zoomFactor - mesh.scale.y / 2;
		mesh.position.z = 5;
	}

	function reScaleAndPositionClickables() {
		setTimeout(function () {
			clickables.forEach(function (clickable) {
				scaleAndPositionClickable(clickable.mesh, clickable.el);
			});
		}, 50);
	}

	$('[onclick], input').each(function () {
		var $el = $(this);
		var mesh = new THREE.Mesh(clickableGeo, clickableMat);
		clickablesRoot.add(mesh);

		scaleAndPositionClickable(mesh, $el);
		clickables.push({mesh: mesh, el: $el});

		mesh.addEventListener('cursorup', function () {
			var el = $el[0];
			if (el.onclick) { el.onclick(); }
			else { el.click(); }
			if (el.select) { el.select(); }
			$el.focus();
			reScaleAndPositionClickables();
		});
	});

}

/* global scene */
(function () {
'use strict'

if (!altspace.inClient) {
	console.re.log('not in client');
	return; }
	else {
	console.re.log('in client');
	}

var zoomFactor = 1.25;
var clickablesRoot = new THREE.Group();
altspace.getEnclosure().then(function (enclosure) {
	clickablesRoot.position.x = -enclosure.innerWidth / 2;
	clickablesRoot.position.y = enclosure.innerHeight / 2;
});
scene.add(clickablesRoot);

var clickableGeo = new THREE.PlaneGeometry(1, 1, 1);
var clickableMat = new THREE.MeshBasicMaterial();

var clickables = [];

function scaleAndPositionClickable(mesh, link) {
	var outerWidth = link.outerWidth();
	if (outerWidth) {
		mesh.scale.x = Math.ceil(outerWidth) * zoomFactor;
		mesh.scale.y = Math.ceil(link.outerHeight()) * zoomFactor;
		mesh.visible = true;
	}
	else {
		mesh.visible = false;
	}

	var linkOffset = link.offset();
	mesh.position.x = linkOffset.left * zoomFactor + mesh.scale.x / 2;
	mesh.position.y = -linkOffset.top * zoomFactor - mesh.scale.y / 2;
	mesh.position.z = 100;
}

function reScaleAndPositionClickables() {
	clickables.forEach(function (clickable) {
		scaleAndPositionClickable(clickable.mesh, clickable.link);
	});
}

$('[onclick], input').each(function () {
	var link = $(this);
	var mesh = new THREE.Mesh(clickableGeo, clickableMat);
	clickablesRoot.add(mesh);

	scaleAndPositionClickable(mesh, link);
	clickables.push({mesh: mesh, link: link});

	mesh.addEventListener('cursorup', function () {
		link[0].onclick();
		link.focus();
		reScaleAndPositionClickables();
	});
});

}());

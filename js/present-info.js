function addInfoImage() {
	var loader = new THREE.TextureLoader();
	var pixels = 1/root.scale.x;
	var info = new THREE.Mesh(
		new THREE.PlaneGeometry(1, 1),
		new THREE.MeshBasicMaterial({map: loader.load('img/cellular-concepts.png')})
	);
	info.scale.set(600 * pixels, 500 * pixels, 1);
	info.position.set(-5, -2, 1.7);
	info.rotation.set(Math.PI / 2, Math.PI / 2, 0);
	info.rotateOnAxis(new THREE.Vector3(1, 0, 0), -10 * Math.PI / 180);
	root.add(info);

	var amino = new THREE.Mesh(
		new THREE.PlaneGeometry(1, 1),
		new THREE.MeshBasicMaterial({map: loader.load('img/common-amino-acids.png')})
	);
	amino.scale.set(500 * pixels, 500 * pixels, 1);
	amino.position.set(5, -2, 1.7);
	amino.rotation.set(Math.PI / 2, -Math.PI / 2, 0);
	amino.rotateOnAxis(new THREE.Vector3(1, 0, 0), -10 * Math.PI / 180);
	root.add(amino);
}

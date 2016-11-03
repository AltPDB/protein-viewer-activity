function addInfoImage() {
	var tex = new THREE.TextureLoader().load('img/cellular-concepts.png');
	var info = new THREE.Mesh(
		new THREE.PlaneGeometry(1, 1),
		new THREE.MeshBasicMaterial({map: tex})
	);
	var pixels = 1/root.scale.x;
	info.scale.set(600 * pixels, 500 * pixels, 1);
	info.position.set(-5, -2, 1.7);
	info.rotation.set(Math.PI / 2, Math.PI / 2, 0);
	info.rotateOnAxis(new THREE.Vector3(1, 0, 0), -10 * Math.PI / 180);
	root.add(info);
}

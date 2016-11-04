function addPdbPopup(user, isAndroid) {
	if (isAndroid) { return; }
	function getFullUrl(path) {
		var currPath = location.pathname;
		if (!currPath.endsWith('/')) {
			currPath = location.pathname.split('/').slice(0, -1).join('/') + '/';
		}
		return location.origin + currPath + path;
	}
	altspace.open(
		'http://www.rcsb.org/pdb/explore/explore.do?structureId=2VAA',
		'_experience',
		{icon: getFullUrl('img/icon.png'), hidden: true}
	);
}

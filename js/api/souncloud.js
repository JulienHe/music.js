var sound;
var client_id = '676bae26d6f9cda08ed2ca73d668ab40';
SC.initialize({
	client_id: "676bae26d6f9cda08ed2ca73d668ab40"
});
$(document).ready(function() {
	$('#player source').attr('src', "http://api.soundcloud.com/tracks/161672361/stream?client_id="+ client_id +"");
});
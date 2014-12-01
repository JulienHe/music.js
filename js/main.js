$.ajax({
	url: 'js/json/wyved.json',
	type: 'GET',
	dataType: 'json',
})
.done(function(data) {
	//console.log(data);
})
.fail(function() {
	console.log("error");
});



$('.player--timer').on('click', '.player--timer--progress', function(event) {
	event.preventDefault();
	var posX = $(this).offset().left;
    var clickEventPosition = parseInt( event.pageX - posX );
    var widthElement = parseInt( $(this).width() );
    var pourcentageClick =  (clickEventPosition / widthElement);

    //Reposition the current audio output
    reposition(player.duration * pourcentageClick);

    //Reposition the cursor for the player
    $('#currentPourcent').width( (pourcentageClick * 100) + "%");
});


$('.player--volume').on('click', '.player--volume--progress', function(event) {
	event.preventDefault();
	var posX = $(this).offset().left;
    var clickEventPosition = parseInt( event.pageX - posX );
    var widthElement = parseInt( $(this).width() );
    var pourcentageClick =  (clickEventPosition / widthElement);

    //Reposition the current audio output
    updateVolume(pourcentageClick);
});
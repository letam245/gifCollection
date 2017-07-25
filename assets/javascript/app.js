$(document).ready(function(){

// =======================================
// DEFINE THE ARRAY OF FOOD CATEGORIES
// =======================================


var food = ['pizza', 'noodle', 'chinese food', 'taco', 'icecream', 'cake' ];

//function to display the food gif images
function displayGif() {
	var foodChoice = $(this).attr('data-food');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        foodChoice + "&api_key=dc6zaTOxFJmzC&limit=10";

//AJAX call
$.ajax({
	url: queryURL,
	method: 'GET'
}).done(function(response){
	console.log(response);
	var result = response.data;

	$('#gifHolder').empty();
	for (var j =0; j< result.length; j++){
		var foodDiv = $("<div class='show'>");

		var rating = result[j].rating;
		var p = $("<p>").text("Rating: " + rating);

		var foodGif = $('<img>');
		foodGif.attr('src', result[j].images.fixed_height_still.url);
		foodGif.attr('still', result[j].images.fixed_height_still.url);
		foodGif.attr('animate', result[j].images.fixed_height.url);
		foodGif.attr('state', 'still');

		foodGif.addClass('gify');

		foodDiv.append(foodGif);
		foodDiv.append(p);
		$('#gifHolder').prepend(foodDiv);
	}

});

}

//function to create food-buttons
function renderButtons(){

	$('#food-button').empty();

	for (var i = 0; i < food.length; i++){
		var b = $('<button>');
		b.addClass('btn btn-primary btn-lg foodie');
		b.attr('data-food', food[i]);
		b.text(food[i]);
		$('#food-button').append(b);
	}
}

//function to add the gif image when the button is clicked
function addButtons(){
	$('#add-food').on('click', function(event){
	event.preventDefault();

	var foodChoice = $('#food-input').val().trim();

	if (food.indexOf(foodChoice.toLowerCase()) === -1 && foodChoice !== ''){
		food.push(foodChoice);
		renderButtons();
	}
	$('#food-input').val().trim();
	return false;

});
}


renderButtons();
addButtons();


// Adding click event listeners to all elements with a class of "foodie"
$(document).on('click', '.foodie', displayGif);

	$(document).on('click', '.gify', function(){
		var gify = $(this).attr('state');
		var picStill = $(this).attr('still');
		var picMoving = $(this).attr('animate');

		if (gify === 'still'){
			$(this).attr('src', picMoving);
			$(this).attr('state', 'animate');
		}
		else {
			$(this).attr('src', picStill);
			$(this).attr('state', 'still');
		}
	});

});

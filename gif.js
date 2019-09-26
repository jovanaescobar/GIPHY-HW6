// Array for cartoons for buttons 
var cartoons = ["Invader Zim", "Cat Dog", "Rugrats","Dragon Ball Z", "Pokemon", "Scooby Doo"];

// Looping through each cartoon
for(var i = 0; i < cartoons.length; i++) {
// Dynamicaly generating buttons for each cartoon in the array
var button = $("<button>").text(cartoons[i]);
// Adding a data-attribute
button.attr("data-gif", cartoons[i]);
// Providing the initial button text
button.addClass("gif-button");
// Adding the button to the HTML
$("#button-group").append(button);
}

// Function handles events where one button is clicked
$("#add-gif-button").on("click", function(event) {
// Preventing the buttons default behavior when clicked (which is submitting a form)
event.preventDefault();
// To not duplicate already existing cartoon button
var alreadyExist = false;
if(cartoons.indexOf($("#new-gif-input").val()) !== -1) {
alreadyExist = true;
}

// Create new button if new cartoon input doesnt exist
if($("#new-gif-input").val() !== "" && alreadyExist === false) {
// This line will grab the text from the input box	
var newgif = $("#new-gif-input").val();
// Adding the input from the textbox to the array
		cartoons.push(newgif);
		var button = $("<button>").text(newgif);
// Adding a data-attribute with a value of the input 
		button.attr("data-gif", newgif);
// Adding a class
		button.addClass("gif-button");
// Adding the button to the HTML
		$("#button-group").append(button);
}

$("#new-gif-input").val("");
});

// Adding click event listen listener to all buttons
$(document).on("click", ".gif-button", function() {
// Grabbing and storing the data property value from the button
var gif = $(this).attr("data-gif");
// Constructing a URL to search Giphy of the input
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
gif + "&api_key=ZBh6r6cMA4xrpbO6ENKVlOld61MgCzsU";
// Performing an AJAX request with the queryURL
    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {

// Storing the data from the AJAX request in the results variable
var results = response.data;
var resultsContainerSection = $("<section class='results-container'>");

// Looping through each result item
    	for(var i = 0; i < results.length; i++) {
    		var singleResultDiv = $("<div class='result-container'>");
// Storing the result item's rating
    		var rating = results[i].rating;
// Creating a paragraph tag with the input result rating
var p = $("<p>").text("Rating: " + rating);
// Creating an image tag
var gifImg = $("<img class='result'>");
// Giving the image tag an src attribute of a proprty
    		gifImg.attr("src", results[i].images.fixed_height_still.url);
    		gifImg.attr("data-state", "still");
    		gifImg.attr("data-still", results[i].images.fixed_height_still.url);
    		gifImg.attr("data-animate", results[i].images.fixed_height.url);
// Appending the paragraph(ratings) and gif 
    		singleResultDiv.prepend(gifImg);
    		singleResultDiv.prepend(p);
    		resultsContainerSection.prepend(singleResultDiv);
    	}
// Prepending the gifs to the "#gifs-group" div in the HTML
$("#gifs-group").prepend(resultsContainerSection);
});
});

$(document).on("click", ".result", function() {
// The attr jQuery method to get or set the value of any attribute on the HTML element
var state = $(this).attr("data-state");
// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Listen for form submit 
let form = document.getElementById("myForm");

form.addEventListener("submit", saveBookmark);

// Save bookmark
function saveBookmark(e){

// Get form values
let siteName = document.getElementById("siteName").value;
let siteUrl = document.getElementById("siteUrl").value;

if(!validateForm(siteName, siteUrl)){
	return false;
}

let bookmark = {
	name: siteName,
	url: `https://${siteUrl}`
}


// Test is bookmarks is null
if(localStorage.getItem("bookmarks") === null){

// Initialise array
	let bookmarks = []

// Add to array
	bookmarks.push(bookmark);

// Set to local storage
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
} else {

// Get bookmarks from local storage
	let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

// Add bookmark to array
	bookmarks.push(bookmark);

// Re-set to local storage	
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Clear form
	document.getElementById("myForm").reset();

// Re-fetch bookmarks
	fetchBookmarks();

// Prevent form from submitting 
	e.preventDefault();
}

// Delete Bookmark 
function deleteBookmark(url){
// Get bookmarks from local
	let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

	console.log(url);
// Loop through bookmarks
	for(let i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
		// Remove from array
		bookmarks.splice(i, 1);	
		}
	}
	// Re-set to local storage	
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	// Re-fetch bookmarks
	fetchBookmarks();
}


// Fetch Bookmarks

function fetchBookmarks(){
// Get bookmarks from local storage	
	let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

// Get output id
	let bookmarksResults = document.getElementById("bookmarksResults");

// Build output
	bookmarksResults.innerHTML = "";
	for(let i = 0; i < bookmarks.length; i++){
		let name = bookmarks[i].name;
		let url = bookmarks[i].url;
	
		bookmarksResults.innerHTML += '<div class="well">'+ 
		                               '<h3>'+name+
		                               ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
		                               ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
		                               '</h3>'+
		                               '</div>';
	}

}

// Validate form
function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl){
		alert("Please fill in the form");
		return false;
	}

	let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	let regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert("Please use a valid URL");
		return false;
	}

return true;

}
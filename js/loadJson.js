var ingredients = {};
var dishes = {};

(function (){
	var http_request_ingr = new XMLHttpRequest();
	http_request_ingr.open( "GET", "json/ingredients.json");
	http_request_ingr.send();
	http_request_ingr.onreadystatechange = function () {
		if(http_request_ingr.readyState !== 4)
			return;
		if(http_request_ingr.status !== 200 )
			throw new Error(alert(http_request.status + ': ' + http_request.statusText));
		ingredients = JSON.parse(http_request_ingr.responseText);
	}

	var http_request_dishes = new XMLHttpRequest();
	http_request_dishes.open( "GET", "json/dishes.json");
	http_request_dishes.send();
	http_request_dishes.onreadystatechange = function () {
		if(http_request_dishes.readyState !== 4)
			return;
		if(http_request_dishes.status !== 200 )
			throw new Error(alert(http_request.status + ': ' + http_request.statusText));
		dishes = JSON.parse(http_request_dishes.responseText);
	}	
})();
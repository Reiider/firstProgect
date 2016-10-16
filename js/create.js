function loadImageLink(){
	casheLinksOfElements["dishPhoto"].style.background = "url(" + casheLinksOfElements["imageLink"].value + ") no-repeat center";
}

function createNewDish(){
	if(casheLinksOfElements["imageLink"].value === ""){
		alert("Покажи мне, свой шедевр!");
		return;
	}
	if(casheLinksOfElements[casheLinksOfElements["nameNewDish"].value] || casheLinksOfElements["nameNewDish"].value === ""){
		alert("Такое блюдо уже есть.");
		return;
	}
	var dish, tooltip, img, strMassImageForTooltip;
	
	var newDish = {};
	newDish["myName"] = casheLinksOfElements["nameNewDish"].value;
	newDish["fileName"] = casheLinksOfElements["imageLink"].value;
	
	dish = document.createElement('span');
	tooltip = document.createElement('span');
	img = document.createElement('img');
	
	casheLinksOfElements[casheLinksOfElements["nameNewDish"].value] = dish;
	
	dish.setAttribute("class", "dishes");
	dish.setAttribute("id", casheLinksOfElements["nameNewDish"].value);
	dish.setAttribute("draggable", true);
	dish.addEventListener("mousemove", movePic);
	dish.addEventListener("mouseout", hidePic);
	dish.addEventListener("dragstart", drag);
	
	tooltip.setAttribute("class", "tooltip");
	
	img.setAttribute("src", casheLinksOfElements["imageLink"].value);
	img.setAttribute("alt", casheLinksOfElements["nameNewDish"].value);
	
	strMassImageForTooltip = "";
	var ingrForDish = casheLinksOfElements["ingrForNew"].childNodes;
	var part = [];
	for(var k = 0; k < ingrForDish.length; k++){
		for(var j = 0; j < ingredients.length; j++) {
			if (ingredients[j].myName === ingrForDish[k].id) {
				strMassImageForTooltip += "<img src='" + pieceOfPathToImages + ingredients[j].fileName + "'>";
				part[part.length] = ingredients[j].myName;
			}
		}
	}
	tooltip.innerHTML = strMassImageForTooltip;
	tooltip.style.visibility = "hidden";
	dish.appendChild(img);
	dish.appendChild(tooltip);

	listOfDish.appendChild(dish);
	
	newDish["part"] = part;
	dishes[dishes.length] = newDish; 
	
	casheLinksOfElements["nameNewDish"].value = "";
	casheLinksOfElements["imageLink"].value = "";
	casheLinksOfElements["dishPhoto"].style.background = "url(../images/startPhotoCreate.jpg) no-repeat center";
	while(ingrForDish.length){
		casheLinksOfElements["market"].appendChild(ingrForDish[0]);
	}
}
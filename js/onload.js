var pieceOfPathToImages = "../images/";

var casheLinksOfElements = {};

document.addEventListener("DOMContentLoaded", onload);

function onload(){
	if(ingredients.length && dishes.length) onloadTime();
	else setTimeout(onload, 0);
}

function onloadTime() {
	var market = document.getElementById("market");
		casheLinksOfElements["market"] = market;
		market.addEventListener("drop", dropMarket);
		market.addEventListener("dragover", allowDrop);
	var fridge = document.getElementById("fridge");
		casheLinksOfElements["fridge"] = fridge;
		fridge.addEventListener("drop", dropFridge);
		fridge.addEventListener("dragover", allowDrop);
	var dish = document.getElementById("dish");
		casheLinksOfElements["dish"] = dish;
		dish.addEventListener("drop", dropDish);
		dish.addEventListener("dragover", allowDrop);
	var listOfDish = document.getElementById("listOfDish");
		casheLinksOfElements["listOfDish"] = listOfDish;
		listOfDish.addEventListener("drop", dropListOfDish);
		listOfDish.addEventListener("dragover", allowDrop);
	var ingrForNew = document.getElementById("ingrForNew");
		casheLinksOfElements["ingrForNew"] = ingrForNew;
		ingrForNew.addEventListener("drop", dropIngrForNew);
		ingrForNew.addEventListener("dragover", allowDrop);
	var imageLink = document.getElementById("imageLink");
		casheLinksOfElements["imageLink"] = imageLink;
		imageLink.addEventListener("change", loadImageLink);
	var butCreate = document.getElementById("butCreate");
		casheLinksOfElements["butCreate"] = butCreate;
		butCreate.addEventListener("click", createNewDish);
		
	casheLinksOfElements["dishPhoto"] = document.getElementById("dishPhoto");
	casheLinksOfElements["nameNewDish"] = document.getElementById("nameNewDish");
	
	var ingredient, tooltip, img, strMassImageForTooltip;
	
	var headWhat = document.getElementById("headWhat");
		headWhat.addEventListener("mousemove", movePic);
        headWhat.addEventListener("mouseout", hidePic);
		
		tooltip = document.createElement("span");
		tooltip.setAttribute("class","tooltip");
		strMassImageForTooltip = "Перетаскивай рецепты на доску что бы узнать чего тебе не хватает для приготовления блюда. Если всего хватает, то блюдо попадет в холодильник. (Продукты можно тоскать со склада)";
		tooltip.innerHTML = strMassImageForTooltip;
        tooltip.style.visibility = "hidden";
		headWhat.appendChild(tooltip);
	
    for(var i = 0; i < ingredients.length; i++) {
        ingredient = document.createElement('span');
        tooltip = document.createElement('span');
		img = document.createElement('img');
		
		casheLinksOfElements[ingredients[i].myName] = ingredient;
		
        ingredient.setAttribute("class", "ingredient");
        ingredient.setAttribute("id", ingredients[i].myName);
		ingredient.setAttribute("draggable", true);
		ingredient.addEventListener("mousemove", movePic);
        ingredient.addEventListener("mouseout", hidePic);
		ingredient.addEventListener("dragstart", drag);
		
        tooltip.setAttribute("class","tooltip");
		
		img.setAttribute("src", pieceOfPathToImages + ingredients[i].fileName);
		img.setAttribute("alt", ingredients[i].myName);

        strMassImageForTooltip = "";
        for(var k = 0; k < dishes.length; k++){
            for(var j = 0; j < dishes[k].part.length; j++){
                if(dishes[k].part[j] === ingredients[i].myName){
                    strMassImageForTooltip += "<img src='" + dishes[k].fileName + "'>";
                }
            }
        }
        tooltip.innerHTML = strMassImageForTooltip;
        tooltip.style.visibility = "hidden";
		
        ingredient.appendChild(img);
        ingredient.appendChild(tooltip);
        
        market.appendChild(ingredient);
    }

    var dish;
    for( i = 0; i < dishes.length; i++) {
        dish = document.createElement('span');
        tooltip = document.createElement('span');
		img = document.createElement('img');
		
		casheLinksOfElements[dishes[i].myName] = dish;
		
        dish.setAttribute("class", "dishes");
        dish.setAttribute("id", dishes[i].myName);
		dish.setAttribute("draggable", true);
		dish.addEventListener("mousemove", movePic);
        dish.addEventListener("mouseout", hidePic);
		dish.addEventListener("dragstart", drag);
		
        tooltip.setAttribute("class", "tooltip");
		
		img.setAttribute("src", dishes[i].fileName);
		img.setAttribute("alt", dishes[i].myName);
		
        strMassImageForTooltip = "";
        for(var k = 0; k < dishes[i].part.length; k++){
            for(var j = 0; j < ingredients.length; j++) {
                if (ingredients[j].myName === dishes[i].part[k]) {
                    strMassImageForTooltip += "<img src='" + pieceOfPathToImages + ingredients[j].fileName + "'>";
                }
            }
        }
        tooltip.innerHTML = strMassImageForTooltip;
        tooltip.style.visibility = "hidden";
        dish.appendChild(img);
        dish.appendChild(tooltip);

        listOfDish.appendChild(dish);
    }
}
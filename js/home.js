function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    var target;
    if(ev.target.tagName === "IMG") {
        target = ev.target.parentNode;
    }
	else target = ev.target;
    ev.dataTransfer.setData("text", target.id);
}

function dropMarket(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var elem = casheLinksOfElements[data];
    if(elem.className != "dishes"){
		casheLinksOfElements["market"].appendChild(elem);
    }
}

function remakeTooltipForDish(data) {
    var strMassImageForTooltip = "";
	var elem = casheLinksOfElements["dish"].firstChild;
    for(var i = 0; i < dishes.length; i++){
		if(dishes[i].myName === data) break;
	}
    var fridge = casheLinksOfElements["fridge"];
    var isNotIngrInFridge;
    var fridgeCN = fridge.childNodes;

    for(var j = 0; j < dishes[i].part.length; j++) {
        isNotIngrInFridge = true;
        for(var k = 0; k < fridgeCN.length; k++) {
            if (fridgeCN[k].id === dishes[i].part[j]) {
                isNotIngrInFridge = false;
            }
        }
        if(isNotIngrInFridge) strMassImageForTooltip += "<img src='" + casheLinksOfElements[dishes[i].part[j]].firstChild.src + "'>";
    }
    elem.lastChild.innerHTML = strMassImageForTooltip;
	var isNotNeededForDish;
    if(strMassImageForTooltip === "") {
        var market = casheLinksOfElements["market"];
        for( k = 0; k < fridgeCN.length; ){
            if(fridgeCN[k].className != "dishes") {
                isNotNeededForDish = true;
                for (var j = 0; j < dishes[i].part.length; j++) {
                    try {
                        if (fridgeCN[k].id === dishes[i].part[j]) {
                            market.appendChild(fridgeCN[k]);
                            isNotNeededForDish = false;
							break;
                        }
                    }
                    catch(e){}
                }
                if(isNotNeededForDish) k++;
            }
            else k++;
        }
        fridge.appendChild(elem);
    }
}

function dropFridge(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var elem = casheLinksOfElements[data];
    if (elem.className !== "dishes") {
		casheLinksOfElements["fridge"].appendChild(elem);
    }
    if(casheLinksOfElements["dish"].childElementCount !== 0){
        remakeTooltipForDish(casheLinksOfElements["dish"].firstChild.id);
    }
}

function dropDish(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var elem = casheLinksOfElements[data];
    var elemExchange;
    if(elem.className === "dishes") {
        if (ev.target.tagName === "IMG") {
            elemExchange = ev.target.parentNode;
            casheLinksOfElements["dish"].appendChild(elem);
            casheLinksOfElements["listOfDish"].appendChild(elemExchange);
        }
        else if(ev.target.hasChildNodes()){
            elemExchange = ev.target.firstChild;
			casheLinksOfElements["listOfDish"].appendChild(elemExchange);
            casheLinksOfElements["dish"].appendChild(elem);
			restoreFullListIngr(elemExchange.id);
        }
        else casheLinksOfElements["dish"].appendChild(elem);
        remakeTooltipForDish(data);
    }
}

function restoreFullListIngr(data){
	var strMassImageForTooltip = "";
	for(var i = 0; i < dishes.length; i++){
		if(dishes[i].myName === data) break;
	}
	for(var k = 0; k < dishes[i].part.length; k++){
		for(var j = 0; j < ingredients.length; j++){
			if(dishes[i].part[k] === ingredients[j].myName){
				strMassImageForTooltip += "<img src='" + pieceOfPathToImages + ingredients[j].fileName + "'>";
			}
		}
	}
	casheLinksOfElements[data].lastChild.innerHTML = strMassImageForTooltip;
}

function dropListOfDish(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var elem = casheLinksOfElements[data];
    if(elem.className === "dishes") {
        casheLinksOfElements["listOfDish"].appendChild(elem);
        restoreFullListIngr(data);
    }
}

function dropIngrForNew(ev){
	ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var elem = casheLinksOfElements[data];
	if (elem.className !== "dishes") {
		casheLinksOfElements["ingrForNew"].appendChild(elem);
    }
}

var hide = true;//глобальная переменная, отвечающая будет ли строка передана в подсказку
function movePic(event){
	var element;
	if(event.target.tagName === "IMG" ) element = event.target.parentNode.lastChild; 
	else if(event.target.id === "headWhat")  element = event.target.lastChild;
		 else return;
	
    var x = window.event.clientX;
    var y = window.event.clientY;
    var dx = 5;
    var left = false;
    var right = false;

    if(dx + x + element.clientWidth > document.body.clientWidth){
        x = document.body.clientWidth - element.clientWidth - dx;
        left = true;
    }

    if(dx + y + element.clientHeight > document.body.clientHeight){
        y = document.body.clientHeight - element.clientHeight - dx;
        right=true;
    }
    if(left && right) {
        y = document.body.clientHeight - element.clientHeight - dx * 4;
    }

    element.style.left = x + 20+"px";
    element.style.top = y + document.body.scrollTop + 20+"px";

    if(hide){
        element.style.visibility = "visible";
        hide = false;
    }
}
function hidePic(ev){
    var element;
	if(event.target.tagName === "IMG" ) element = event.target.parentNode.lastChild; 
	else if(event.target.id === "headWhat")  element = event.target.lastChild;
		 else return;	
	element.style.visibility="hidden";
    hide=true;
}
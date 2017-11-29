var menuList = {};

function loadRestaurants() {
	//Implementierung a)
   var sourceUrl = "http://oliverklemencic.com/campus/restaurants.json";
   ajax(sourceUrl, function(responseText){
	   var restaurants = JSON.parse(responseText);
	   showRestaurants(restaurants);
   });
}

function showRestaurants(result){
	
	//Implementierung b)
	var restaurantListContainer = document.getElementById('restaurantList');
	restaurantListContainer.innerHTML = "";
	
	var menuContainer = document.getElementById('menu');
	menuContainer.innerHTML = "";
	
	var restaurantTitle = document.createElement('h4');
	restaurantTitle.innerText = "Restaurants";
	
	restaurantListContainer.appendChild(restaurantTitle);
	
	var restaurantList = document.createElement('ul');
	restaurantListContainer.appendChild(restaurantList);
	
	for(var restaurantKey in result){
		var restaurantListItem = document.createElement('li');
		var restaurantListItemAttr = document.createAttribute('id');
		restaurantListItemAttr.value = restaurantKey;
		restaurantListItem.setAttributeNode(restaurantListItemAttr);
		restaurantListItem.innerText = result[restaurantKey].name;
		restaurantList.appendChild(restaurantListItem);
		
		//Implementierung c)
		menuList[restaurantKey] = result[restaurantKey].speisen;
		
		//Implementierung d) [1/2]
		restaurantListItem.addEventListener("click", function(e){
			var liElement = e.target;
			showMenu(liElement.id);
		});
	}
	
}

function showMenu(restaurantId){
	//Implementierung d) [2/2]
	
	var menuContainer = document.getElementById('menu');
	menuContainer.innerHTML="<h4>Menüs</h4>";
	
	var menuListElem = document.createElement('ul');
	menuContainer.append(menuListElem);
	
	for(var i = 0; i < menuList[restaurantId].length; i++){
		var menuListItem = document.createElement('li');
		menuListItem.innerText = menuList[restaurantId][i].name;
		menuListElem.append(menuListItem);
	}
}

function ajax(resourceName, callback) {
	
	xhr = new XMLHttpRequest();
    
	xhr.onreadystatechange = function(){
        if (xhr.readyState==4)
        {
            if (xhr.status==200)
            {
                callback(xhr.responseText);
            }
            else
            {
                alert("Problem retrieving data!");
            }
        }
    };
    
	xhr.open("GET", resourceName, true);
    xhr.send("");
}
var products = {};
var selectedProducts = [];
var searchResultTableBody = document.getElementById("searchResultTableBody");
var orderPreviewTableBorder = document.getElementById("orderPreviewTableBorder");
var searchButton = document.getElementById('searchButton');
var selectedProductStatusLabel = document.getElementById('selectedProductStatusLabel');

function showFinalOrder() {
    console.log('showFinalOrder');
    var resultHTML = '';
    var sum = 0;
    for (var i = 0; i < selectedProducts.length; i++) {
        var result = selectedProducts[i];
        resultHTML += '<tr><td>' + result.name + '</td><td>' + result.price + '</td></tr>';
        sum += result.price;
    }

    resultHTML += '<tr><td><b>' + selectedProducts.length + ' Produkte</b></td><td><b>'+sum+'</b></td></tr>';
    orderPreviewTableBorder.innerHTML = resultHTML;
}

// Helper function, can be used if helpful
function addProductToTable(productIndex) {
    console.log('addProductToTable');
    selectedProducts.push(products[productIndex]);
    selectedProductStatusLabel.textContent = selectedProducts.length + ' Produkte im Warenkorb';
}

function setupSearch() {
    var searchBox = document.getElementById('searchBox');
    var searchValue = searchBox.value;


    // find products
    var results = [];
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        if (product.name.toLowerCase().indexOf(searchValue.toLowerCase()) != -1) {
            results.push(product);
        }
    }

    // print results to table
    var resultHTML = '';
    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        var bild = '';

        if (result.image && result.image.length > 0) {
            var placeholder = 'https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/H/KH/HKHC2/HKHC2?wid=445&hei=445&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1474481298618';
            //bild = '<img src="' + result.image + '" />';
            bild = '<img style="max-height: 100px;" src="' + placeholder + '" />';
        }

        var knopf = '<button onclick="addProductToTable(' + i + ')">Add</button>';
        resultHTML += '<tr><td>' + result.name + '</td><td>' + bild + '</td><td>' + result.price + '</td><td>' + knopf + '</td></tr>';
    }
    searchResultTableBody.innerHTML = resultHTML;
}

searchButton.onclick = setupSearch;


function changeTextOfLoadingParagraph(_text) {
    var loadingTextDomNode = document.getElementById('loadingStatus');
    loadingTextDomNode.textContent = _text;
}

function loadProducts() {
    var url = "http://oliverklemencic.com/campus/products.json";

    var myFunctionDone = function(myStringParameter) {
        products = JSON.parse(myStringParameter);
        console.log('Products: ', products);
        changeTextOfLoadingParagraph('Done. Retrieved ' + products.length + ' Products');

        document.getElementById('step2').classList.remove('hide');
    };

    var myFunctionLoading = function() {
        changeTextOfLoadingParagraph('Loading...');
    };

    ajax(url, myFunctionDone, myFunctionLoading);
}

function ajax(resourceName, callbackDone, callbackLoading) {

    xhr = new XMLHttpRequest();

    var myFunction2 = function() {

        if (xhr.readyState == 1) {
            callbackLoading();
        }

        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callbackDone(xhr.responseText);
            } else {
                alert("Problem retrieving data!");
            }
        }
    }

    xhr.onreadystatechange = myFunction2;

    xhr.open("GET", resourceName, true);
    xhr.send("");
}
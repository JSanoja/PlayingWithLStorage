function addItem() {
    let id = document.getElementById("ID").value;
    let name = document.getElementById("Name").value;
    let price = document.getElementById("Price").value;
    let img = document.getElementById("Img").value;
    let description = document.getElementById("Description").value;
    let item = {
        id: id,
        name: name,
        price: price,
        img: img,
        description: description
    }
    var items = [];
    if (localStorage.items) {
        items = JSON.parse(localStorage.items)
    }
    items.push(item)
    localStorage.items = JSON.stringify(items);
    location.reload();
}

function init() {
    var container = document.getElementById("items");
    if (localStorage.items) {
        var items = JSON.parse(localStorage.items)
        console.log(items)
        var itemsHTML = "";
        items.forEach(item => {
            itemsHTML = itemsHTML +
                `<div class="card col-4 item-${item.id}" style="width: 18rem">
            <img src="${item.img}" class="card-img-top" alt="item" />
            <div class="card-body">
              <h5 class="card-title">${item.name} - ${item.price}</h5>              
              <p class="card-text">
                ${item.description}
              </p>
              <a href="#" class="btn btn-primary" onclick="addCart(${item.id})">Add to Cart</a>
            </div>
          </div>`;
        });
        container.innerHTML = itemsHTML;
    } else {
        container.innerHTML = "<b>No hay productos</b>";
    }
}

function addCart(id) {
    var cart = [];
    if (localStorage.cart) {
        cart = JSON.parse(localStorage.cart);
    }
    cart.push(id);
    localStorage.cart = JSON.stringify(cart);
}

function cleanCart() {
    localStorage.removeItem("cart")
    location.reload();
}

function initCart() {
    var container = document.getElementById("items");
    if (localStorage.cart) {
        var cart = JSON.parse(localStorage.cart);
        var itemsHTML = "";
        var itemsId = []
        cart.forEach(id => {
            console.log(itemsId.indexOf(id))
            if (itemsId.indexOf(id) == -1) {
                itemsId.push(id);
                let count = cart.filter(o => o == id).length;
                let item = getItem(id);
                itemsHTML = itemsHTML +
                    `<div class="card col-4 item-${item.id}" style="width: 18rem">
                <img src="${item.img}" class="card-img-top" alt="item" />
                <div class="card-body">
                <h5 class="card-title">${item.name} - ${item.price}</h5>              
                <h5 class="card-title">Cantidad - ${count}</h5> 
                <p class="card-text">
                    ${item.description}
                </p>
                </div>
            </div>`;
            }


        })
        container.innerHTML = itemsHTML
    } else {
        container.innerHTML = "<b>No has añadido productos</b>";
    }
}

function getItem(id) {
    var items = JSON.parse(localStorage.items);
    return items.filter(i => i.id == id)[0]
}
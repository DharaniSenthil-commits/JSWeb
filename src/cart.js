let label=document.getElementById("label");
let ShoppingCart=document.getElementById("shopping-cart");



let basket=JSON.parse(localStorage.getItem("data")) || [];

let cartcalculate =() =>
{
    let cartTotal=document.getElementById("cartAmount");
    cartTotal.innerHTML = basket.map((x)=> x.items).reduce((x,y)=> x+y,0)
    
    
};
cartcalculate();

let generateCartItem = () => { 
    
    if (basket.length !== 0){
      return ShoppingCart.innerHTML= basket.map((x)=> {
        let {id,items} =x;
        let search =shopitem.find((y)=> y.id === id) || [];  
        let {name,image,price}=search;      
        return`
       <div class="cart-items">
       <img width="100" height="78"  src="${image}" alt ="" />
       <div class="cart-details">
            <div class="title-price-x">
                <h5 class="title-price">
                <p>${name}</p>
                <p class="cart-price">Rs.${price}</p>
                </h5>
                <i onclick="RemoveItem(${id})" class="bi bi-x-lg"></i>
            </div>
            <div class="button">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                ${items}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3>Rs.${items*price}</h3>
       </div>
       </div>
        `;
      }).join('');
     }
    else {
      ShoppingCart.innerHTML = ``;
      label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to home</button>
      </a>
      `;
    }
};

generateCartItem();

let increment =(id) =>
{
    let selectedItem=id ;
    let search = basket.find((x) => x.id === selectedItem.id) ;
    console.log(basket)
    if (search === undefined)
    {
    basket.push({
        id:selectedItem.id,
        items:1
    });
    }
    else
    {
        search.items +=1;
    }
    update(selectedItem.id);
    basket=basket.filter((x)=> x.items != 0);
    generateCartItem(); 
    localStorage.setItem("data",JSON.stringify(basket));
}
let decrement =(id) =>
{
    let selectedItem=id ;
    let search = basket.find((x) => x.id === selectedItem.id) ;
    console.log(basket)
    if ( search === undefined ) return ;
    else if (search.items === 0 ) return ;
    else
    {
        search.items -=1;
    }
    update(selectedItem.id);
    basket=basket.filter((x)=> x.items !== 0);
    generateCartItem(); 
    localStorage.setItem("data",JSON.stringify(basket));
};


let update =(id) =>
{
    let search = basket.find ((x)=> x.id === id);
    console.log(search.items);
    document.getElementById(id).innerHTML=search.items;
    cartcalculate();
    TotalAmount();
};

let RemoveItem = (id) =>
{
  let selectedItem=id;
  basket=basket.filter((x)=> x.id !== selectedItem.id);
  generateCartItem();
  TotalAmount();
  cartcalculate();
  localStorage.setItem("data",JSON.stringify(basket));
  

}


let TotalAmount = () =>
{
  if (basket.length !== 0)
  {
      let amount=basket.map((x)=> 
      {
      let {items,id} = x;
      let search = shopitem.find((y)=> y.id == id) || [];
      return items*search.price;
      }).reduce( (x,y)=> x+y,0);
    //console.log(TotalAmount);
      label.innerHTML=`<h2>Total Bill : Rs. ${amount}</h2>
      <button class="checkout">CheckOut</button>
      <button onclick="clearcart()" class="removeall">Clear Cart</button>
      `
  }

  else return;
};
TotalAmount();

let clearcart = () =>
{
  basket = []
  generateCartItem();
  cartcalculate(); 
  localStorage.setItem("data",JSON.stringify(basket));
}


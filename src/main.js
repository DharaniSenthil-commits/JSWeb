let shop=document.getElementById("shop");

let basket=JSON.parse(localStorage.getItem("data")) || [];

let generateitem= () => {

    return (shop.innerHTML=shopitem.map((x)=>{
        let {id,name,description,price,image}=x;
        let search= basket.find((x)=>x.id === id ) || [];
        return `
    <div id=product-id-${id} class="item">
        <img class="shop-image" width="200" src=${image} alt="">
        <div class="details">
            <h5>${name}</h5>
            <p> ${description}</p>
            <div  class="price-quantity">
                <h2>Rs.${price}</h2>
                <div class="button">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                    ${search.items === undefined ? 0 : search.items}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>

   </div>
    `;
    }).join(""))
} ;
generateitem();




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
    
    localStorage.setItem("data",JSON.stringify(basket));
};

let update =(id) =>
{
    let search = basket.find ((x)=> x.id === id);
    console.log(search.items);
    document.getElementById(id).innerHTML=search.items;
    cartcalculate();
};

let cartcalculate =() =>
{
    let cartTotal=document.getElementById("cartAmount");
    cartTotal.innerHTML = basket.map((x)=> x.items).reduce((x,y)=> x+y,0)
    
    
};
cartcalculate();
let shop=document.getElementById("shop");

let basket=JSON.parse(localStorage.getItem("data")) || [];

let shopitem=[
    {
        id:"M65",
        name:"Mushroom 65",
        description:"Fresh Mushroom , sliced and addd favours and deep fired",
        price: 60,
        image :"images/Mushroom65.jpeg"
    },
    {
        id:"Mchilli",
        name:"Mushroom Chilli",
        description:"Fresh Mushroom , sliced and deep fired and added spicy favours ",
        price: 60,
        image :"images/MushroomChilli.jpeg"
    },
    {
        id:"Mmunchuriyan",
        name:"Mushroom Munchuriyan",
        description:"Fresh Mushroom , sliced and addd favours and deep fired , make semi-liquid gravy",
        price: 60,
        image :"images/MushroomMunchuriyan.jpeg"
    },
    {
        id:"Mchettinad",
        name:"Mushroom ChettiNad",
        description:"Fresh Mushroom , sliced and addd favoured , make a gravy",
        price: 80,
        image :"images/MushroomChettinad.jpg"
    },
    {
        id:"Msoup",
        name:"Mushroom Soup",
        description:"Fresh Mushroom , sliced and grinded , made liquid starter and break time drink",
        price: 20,
        image :"images/MushroomSoup.jpg"
    }
];
let generateitem= () => {

    return (shop.innerHTML=shopitem.map((x)=>{
        let {id,name,description,price,image}=x;
        let search= basket.find((x)=>x.id === id ) || [];
        return `
    <div id=product-id-${id} class="item">
        <img width="200" src=${image} alt="">
        <div class="details">
            <h3>${name}</h3>
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
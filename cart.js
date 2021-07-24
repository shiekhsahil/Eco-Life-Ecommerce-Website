


let carts = document.getElementsByClassName("add-to-link-btn");
let products = [
    {
        name:'grey tshirt',
        tag:'greytshirt',
        price:15,
        inCart:0

    },
    {
        name:'grey shirt',
        tag:'greyshirt',
        price:30,
        inCart:0

    },
    {
        name:'black shirt',
        tag:'blackshirt',
        price:20,
        inCart:0

    },
    {
        name:'black tshirt',
        tag:'blacktshirt',
        price:17,
        inCart:0

    }

]
for(let i=0;i< carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers();
    })
}
function onLoadCartNumbers(){
    let productNumbers =  localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.getElementsById("count").textContent = productNumbers;
    }
}

function cartNumbers(){
    let productNumbers = localStorage.getItem(`cartNumbers`);
    
    // console.log(productNumbers);
    // console.log(typeof productNumbers);
    productNumbers = parseInt(productNumbers);
    // console.log(typeof productNumbers);
    if(productNumbers){
        localStorage.setItem("cartNumbers",productNumbers+1);
        document.getElementsById("count").textContent = productNumbers+1;
    }else{
        localStorage.setItem("cartNumbers",1);
        document.getElementsById("count").textContent =1;
    }


}
onLoadCartNumbers();
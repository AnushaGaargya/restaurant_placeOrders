document.getElementById("user-form").addEventListener('submit', placeOrder);

async function postdata(x){
    try{
    const response = await axios.post('https://crudcrud.com/api/825004c7ec63486095d5f36a3eb897ae/placeOrders',
    x);
    console.log(response);
   
    }
    catch(error) {
        console.error(error);}
    }

function placeOrder(event)
{
    //prevent the normal submission of the form
    event.preventDefault();
    var table = document.getElementById('table').value;
    var dish = document.getElementById('dish').value;
    var price = document.getElementById('price').value;

    var orderDetails = new Object();
    
    orderDetails["table"] = table
    orderDetails["dish"] = dish
    orderDetails["price"] = price

    postdata(orderDetails);
 
    }


async function getdata(){
    try{
    const response = await axios.get('https://crudcrud.com/api/825004c7ec63486095d5f36a3eb897ae/placeOrders');
    console.log(response);
    for(var i=0; i<response.data.length; i++){
        showOrderOnScreen(response.data[i])
    } 
}catch(error) {
    console.error(error);}}



window.addEventListener("DOMContentLoaded", () => {   
    getdata();
});


function showOrderOnScreen(X){
    var table = X.table;
    var dish = X.dish;
    var price = X.price;
    
    console.log(table)

    var li = document.createElement('li');
    li.innerText = `${dish}-${price}-`;
    document.getElementById(`${table}`).appendChild(li);
   
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", delete_fn);
    
   
    async function getId_and_delete(t, d, p){
        try{
        const response = await axios.get('https://crudcrud.com/api/825004c7ec63486095d5f36a3eb897ae/placeOrders');
        console.log(response);

        for(var i=0; i<response.data.length; i++){
            if (response.data[i].table == t && response.data[i].dish == d && response.data[i].price == p){
                const delete_id = response.data[i]._id;
                console.log(delete_id);
                axios.delete(`https://crudcrud.com/api/825004c7ec63486095d5f36a3eb897ae/placeOrders/${delete_id}`)
                break;
              
            }

        }
        
    }catch(error) {
        console.error(error);}}
    


    async function delete_fn(e){
        try{
        if(e.target.classList.contains('delete')){
            if(confirm('Are you sure?')){
                var item = e.target.parentElement; //the parent element of delete btn is list item. 
                console.log(item)

                var ui_table = item.parentNode.id;
                console.log(ui_table);

                document.getElementById(table).removeChild(item);
        
                const ui_dish = (item.textContent).split('-')[0]
                console.log(ui_dish);

                const ui_price = (item.textContent).split('-')[1]
                console.log(ui_price);
                
                getId_and_delete(ui_table, ui_dish, ui_price);  
            }
        }

    }catch(error) {
        console.error(error);}}
    
}



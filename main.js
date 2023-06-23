document.getElementById("user-form").addEventListener('submit', placeOrder);

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

    // showOrderOnScreen(orderDetails);

    axios.post('https://crudcrud.com/api/1b72cd14e21a4efba10c70221b7e4755/placeOrders',
    orderDetails)
    .then((response) => console.log(response))
    .catch((err) => console.log(err))

};

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/1b72cd14e21a4efba10c70221b7e4755/placeOrders')
    .then((response) => {
    console.log(response)
    for(var i=0; i<response.data.length; i++){
        showOrderOnScreen(response.data[i])
    }
            })
    .catch((error) => {
    console.log(error) 
    })

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


    function delete_fn(e){
        if(e.target.classList.contains('delete')){
            if(confirm('Are you sure?')){
                var item = e.target.parentElement; //the parent element of delete btn is list item. 
                console.log(item)
                var ui_table = item.parentNode.id;
                console.log(ui_table);
                document.getElementById(table).removeChild(item);
        
    
                // const table = (item.textContent).split('-')[0]
                // console.log(first);
                const ui_dish = (item.textContent).split('-')[0]
                console.log(ui_dish);
                const ui_price = (item.textContent).split('-')[1]
                console.log(ui_price);
    
                axios.get("https://crudcrud.com/api/1b72cd14e21a4efba10c70221b7e4755/placeOrders")
                .then((response) => {
                console.log(response)
                for(var i=0; i<response.data.length; i++){
                    if (response.data[i].table == ui_table && response.data[i].dish == ui_dish && response.data[i].price == ui_price){
                        delete_id = response.data[i]._id;
                    }
                } console.log(delete_id);
                axios.delete(`https://crudcrud.com/api/1b72cd14e21a4efba10c70221b7e4755/placeOrders/${delete_id}`)
                .then((response) => {
                console.log(response)})
                .catch((error) => {
                    console.log(error) 
                    })
                        })
                .catch((error) => {
                console.log(error) 
                })
    
               
            }
        }
    }
}


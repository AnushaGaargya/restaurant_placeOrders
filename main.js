
document.getElementById("user-form").addEventListener('submit',
function placeOrder(event) {
    //prevent the normal submission of the form
    event.preventDefault();
    var table = document.getElementById('table').value;
    var dish = document.getElementById('dish').value;
    var price = document.getElementById('price').value;

    var orderDetails = new Object();
    
    orderDetails["table"] = table
    orderDetails["dish"] = dish
    orderDetails["price"] = price

    showOrderOnScreen(orderDetails);  

axios.post('https://crudcrud.com/api/87b61d932cf740e9ab8d26277f8f1b43/placeOrders',
 orderDetails)
 .then((response) => console.log(response))
 .catch((err) => console.log(err))

});


window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/87b61d932cf740e9ab8d26277f8f1b43/placeOrders")
    .then((response) => {
    console.log(response)
    for(var i=0; i<response.data.length; i++){
        showOrderOnScreen(response.data[i])
    }
            })
    .catch((error) => {
    console.log(error) 
    })
})

function showOrderOnScreen(X){
    var table = X.table;
    var dish = X.dish;
    var price = X.price;
    // console.log(table)

    var paragraph = document.createElement("P");
      paragraph.style.color = "black";
      paragraph.innerHTML = `${dish}-${price}`;
      document.getElementById(`${table}`).appendChild(paragraph);

// create delete button
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    paragraph.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", delete_fn);
}
//         // create edit button
//     var editBtn = document.createElement('button');
//     editBtn.className = 'btn btn-warning btn-sm float-right edit';
//     editBtn.appendChild(document.createTextNode('Edit'));
//     paragraph.appendChild(editBtn);
//     editBtn.addEventListener("click", edit_fn);
// }

function delete_fn(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var item = e.target.parentElement; //the parent element of delete btn is list item. 
            // console.log(item)
            var table = item.parentNode.id;
            // console.log(table);
            document.getElementById(table).removeChild(item);

            // const first = (item.textContent).split('-')[0]
            // axios.delete(`https://crudcrud.com/api/9476a29dbbaa4177ba2c05387a3cc305/appointmentdata/${first}`)
            // .then((response) => {
            // console.log(response)})
            // .catch((error) => {
            //     console.log(error) 
            //     })
        
        }
    }
}


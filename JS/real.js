window.onload = () =>{
 document.getElementById('choose').addEventListener('click', (e) => { // Performs action when button is clicked.
e.preventDefault();
const form = document.querySelector("form"),  //retrieving The Form
 cardField = form.querySelector(".card-field"),
 cardInput = cardField.querySelector(".CNumber").value, //retrieving Card Input
 CVVField = form.querySelector(".cvv-field"), 
 CVVInput = CVVField.querySelector(".CVVNumber").value; //retrieving CVV Input
 let Month1 = document.getElementById("Month").value; //retrieving Month Input
 let Year1 = document.getElementById("Year").value; //retrieving Year input

 let CardNumberPattern = /^5[1-5][0-9]{14}$/   //Card  Number Regex
 if(!cardInput.match(CardNumberPattern)){ //card validation
    alert("Please type a valid 16 digit number");
    location.reload(); // reloads if this is wrong
 }
 let today = new Date(); //Updating Date by todays Date.
 let ExpiryDate = new Date(Year1, Month1 -1, 1); //Calculation to get the ExpiryDate
 if (ExpiryDate < today) {
    alert("Your card is expired. Please enter a valid Expiry Date"); //Making sure card is not expired
    location.reload(); // reloads if this is wrong.
     }

 let CVVNumberPattern = /^[0-9]{3,4}$/; //CVV RegEx
 if (!CVVInput.match(CVVNumberPattern)){
    alert("Please enter a valid CVV Number");  //Making sure CVV Number is inputted correctly
     location.reload();
    }

  const url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";
  const data = {
    "master_card": parseInt(cardInput), //retrieving card input
    "exp_year": parseInt(Year1), //retrieving Year Input
    "exp_month": parseInt(Month1), //retrieving Month Input
    "cvv_code": CVVInput //retrieving CVV Input
   };
   console.table(data)
   
   fetch(url, {
     method: "post", //calling the Post Method
     headers: {
         "Content-Type": "application/json"
     },
     body: JSON.stringify(data)
   })
   .then((response) => {
     if(response.status === 200){ //success
       return response.json(); 
      }  if(response.status === 400){ //errors
         throw "Bad data was sent to the server";
      }else {
      throw "Something went wrong";
      }
   })
   .then((resJson) => {
   let cardInput = resJson.data["master_card"] 
   let last_4 = parseInt(cardInput) % 10000
   location.href = "success.html?num=" + last_4.toString() //inputs the last four digits at the end
   })
   .catch((error) => {
    //alert(error); 
   })
})
}



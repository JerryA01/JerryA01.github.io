window.onload = () => {
    const form = document.querySelector("form"),  //retrieving The Form
    cardField = form.querySelector(".card-field"),
    cardInput = cardField.querySelector(".CNumber"), //retrieving Card Input
    CVVField = form.querySelector(".cvv-field"), 
    CVVInput = CVVField.querySelector(".CVVNumber"); //retrieving CVV Input
    const Month1 = document.getElementById("Month").value; //retrieving Month Input
    const Year1 = document.getElementById("Year").value; //retrieving Year input
       
    function ValidateForm() { //Form Validation 
     const CardNumberPattern = /^5[1-5][0-9]{14}$/   //Card  Number Regex
     const CVVNumberPattern = /^[0-9]{3,4}$/; //CVV RegEx
     var Month = document.getElementById("Month").value; //retrieving Month Input
     var Year = document.getElementById("Year").value;  //retrieving Year Input
     var today = new Date(); //Updating Date by todays Date.
     var ExpiryDate = new Date(Year, Month -1, 1); //Calculation to get the ExpiryDate
      if (!cardInput.value.match(CardNumberPattern)){
       alert("Please enter a valid 16-digit number");   
        return false;
      }
   
     const sele1 = document.getElementById("Month").value
      if (!(sele1 == 01 || sele1 == 02 || sele1 == 03 || sele1 == 04 || sele1 == 05 || sele1 == 06 || sele1 == 07 || sele1 == 08 || sele1 == 09 || sele1 == 10 || sele1 == 11)){
       alert("Pick a Month");  //Making sure the Expiry Date Column is filled
        return false;
       }
     const sele2 = document.getElementById("Year").value
      if (!(sele2 == 2019 || sele2 == 2020 || sele2 == 2021 || sele2 == 2022 || sele2 == 2023 || sele2 == 2024 || sele2 == 2025 || sele2 == 2026 || sele2 == 2027 || sele2 == 2028 || sele2 == 2029 || sele2 == 2030 || sele2 == 2031 || sele2 == 2032 || sele2 == 2033 || sele2 == 2034 || sele2 == 2035)){
       alert("Pick a Year");  //Making sure the Expiry Date Column is filled
        return false;
       }
      if (ExpiryDate < today) {
       alert("Your card is expired. Please enter a valid Expiry Date"); //Making sure card is not expired
        return false;
       }
      if (!CVVInput.value.match(CVVNumberPattern)){
       alert("Please enter a valid CVV Number");  //Making sure CVV Number is inputted correctly
        return false;
       }
      else {
       window.location.href = "SuccessPage.html"; //Directing to the success page if everything works out right.
        return true;
       }
    }
    
    function SendToAPI() { //API Validation
     const url = "http://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";
     const data = {
      "master_card": parseInt(cardInput.value), //retrieving card input
      "exp_year": parseInt(Year1), //retrieving Year Input
      "exp_month": parseInt(Month1), //retrieving Month Input
      "cvv_code": CVVInput.value //retrieving CVV Input
     };
     fetch(url, {
       method: "post", //calling the Post Method
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify(data)
     })
     .then((response) => {
       if(response.status === 200){ //success
         return response.Json(); 
        } else if(response.status === 400){ //errors
           throw "Bad data was sent to the server";
        }else {
        throw "Something went wrong";
        }
     })
     .then((resJson) => {
       alert(resJson["master_card"] + "Your credit card has been added"); 
     })
     .catch((error) => {
       // alert(error); 
     })
     }
   
        
    form.addEventListener("submit", (e) => { //Calling Function on Form Submit
     e.preventDefault(); //Preventing form submitting
     ValidateForm(); // Calling the ValidateForm Function to make sure it's validated before submitting.
     SendToAPI(); // Send the data to the API.
    });
   } 
   
   
   
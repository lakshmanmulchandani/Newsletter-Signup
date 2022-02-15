// const express =require("express");
// const bodyParser=require("body-parser");
// const request=require("request");
// const https = require("https");
// const app = express();

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended:true}));

// app.get("/",function(req, res){
// res.sendFile(__dirname + "/signup.html");
// });

// app.post("/",function(req,res){
// var firstName=req.body.fName;
// var lastName=req.body.lName;
// var email=req.body.email;
// console.log(email);
// var data={
//     member:[
//         {
//             email_address:email,
//             status: "subscribed",
//             merge_fields:{
//                 FNAME: firstName,
//                 LNAME: lastName
//             }

//         }
//     ]
// };
// var jsonData=JSON.stringify(data);
// const url="https://us14.api.mailchimp.com/3.0/lists/7392ffcd85"
// const options={
//     method:"POST",
//     auth:"vennela1:61a9083ff0cdb872f5d9448f53b8fdd3-us14"
// }
// const request=https.request(url,options,function(response){
// if(response.statusCode===200){
// res.sendFile(__dirname+"/success.html")
// }
// else{
//     res.sendFile(__dirname+"/failure.html");
// }
// response.on("data",function(data){
//     console.log(JSON.parse(data));
// });
// });
// request.write(jsonData);
// request.end();
// });

// app.post("/failure",function(req,res){
// res.redirect("/");
// })
// app.listen(3000,function(){
//     console.log("Server is running on port 3000");
// });

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    'members': [
      {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
        }
      }
    ],
   
  }
  console.log("world")
  console.log(data.members[0].email_address)
console.log(data.members[0].merge_fields.FNAME);
  console.log(data.members[0].merge_fields.LNAME);
  var jsonData = JSON.stringify(data)

 
//   var options = {
//     url: 'https://us14.api.mailchimp.com/3.0/lists/7392ffcd85',
//     method: 'POST',
//     headers: {
//       'Authorization': "vennela1:61a9083ff0cdb872f5d9448f53b8fdd3-us14"
//     },
//     body: jsonData
//   }

//   request(options, function(error, response, body) {
//     if (error) {
//       console.log(error);
//       res.sendFile(__dirname + "/failure.html");
//     } else {
//       if(response.statusCode == 200){
//         res.sendFile(__dirname + "/success.html");
//       }else{
//           console.log("Hello");
//           console.log(response.statusCode);
         
//         res.sendFile(__dirname + "/failure.html");
//       }
//     }
//   });
// });
var options = {
    url: "https://us14.api.mailchimp.com/3.0/lists/7392ffcd85" ,
    method: "POST",
    headers: {
      "Authorization": "Vennela 61a9083ff0cdb872f5d9448f53b8fdd3-us14"
    },
    body: jsonData
  };

  request(options, function (error, response, body) {
    if (error) {
      res.sendFile(__dirname+"/failure.html");
    }
    else {
      if(response.statusCode!=200){
        res.sendFile(__dirname+"/failure.html");
      }else{
        res.sendFile(__dirname+"/success.html");
      }
    }
  });
});
app.post("/failure.html", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running");
});
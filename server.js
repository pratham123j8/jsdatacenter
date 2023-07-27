const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const { compile } = require("ejs");


const app = express();
app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

// Database stuff

const mongoose = require('mongoose');
const { stringify } = require("querystring");
const mongoURI = "mongodb+srv://pratham123j8:Lifeisjoy123@cluster0.zkqyuf6.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true,
});



const studentSchema = new mongoose.Schema({

    studentName: String,
    mentorName: String,
    programStartDate:String,
    studentNumber:String

}) 

const Student = mongoose.model("Student", studentSchema );


const student = new Student ({

    studentName: 'aman',
    mentorName: 'Angel',
    programStartDate: '2023-06-01',
    studentNumber:'6789'

})

student.save().then(()=>{
    console.log("User Saved")
})

// This is where the main code starts

let alldata = [ {
    studentName: 'Rachit',
    mentorName: 'Angel',
    programStartDate: '2023-07-01',
    studentNumber: '098'
  },
  {
    studentName: 'aman',
    mentorName: 'Angel',
    programStartDate: '2023-06-01',
    studentNumber: '1234567'
  }
];
let currentlyEnroled = [];
let date = new Date()

app.get('/', function(req,res){
    res.render( "index.ejs", {name:"monday"})
   
    // res.sendFile(__dirname + "/index.html")

})

app.get('/alldata', function(req,res){
    res.render("alldata.ejs", {allData: alldata})
})

app.post('/', function(req,res){
    console.log("😄")
    alldata.push({studentName:req.body.studentName,
        mentorName:req.body.mentorName,
        programStartDate: req.body.programStartDate,
        studentNumber: req.body.studentNumber})

  
    res.redirect('/alldata')

    
    
})


app.post("/test", function(req,res){
   
console.log('Post requestion from /test has been made')

   for (let i = 0; i < alldata.length; i++) {


    let date1 = new Date()
    let date2 = new Date(alldata[i].programStartDate)

    var time_difference = date1.getTime() - date2.getTime();
    var days_difference = time_difference / (1000 * 60 * 60 * 24);  

    console.log(days_difference)
   
     if (  Math.trunc(days_difference) < 30 ) {

        currentlyEnroled[i] = alldata[i]

     }
    
   }

   alldata = [];

   for ( let i = 0; i < currentlyEnroled.length; i++){
    alldata[i] = currentlyEnroled[i]
   }



   console.log(currentlyEnroled)
  

    res.redirect('/alldata')

  


   

 } )






let port = process.env.PORT;

if (port == null || port == ""){
    port = 3000;
}

app.listen(port, function(){
    console.log("Severstarted🤬")
})
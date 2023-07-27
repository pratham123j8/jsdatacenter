const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const { compile } = require("ejs");


const app = express();
app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

// Variables 

let allData = []
let currentlyEnroled = [];
let date = new Date()




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

// student.save().then(()=>{
//     console.log("User Saved")
// })


async function finder() {
    let students = await Student.find().then((res)=>{
        allData = res
    })

    
}

finder()

// ------------------------------------ This is where the main code starts


app.get('/', function(req,res){
    res.render( "index.ejs")
    

    // res.sendFile(__dirname + "/index.html")

})

app.get('/alldata', function(req,res){

    

    res.render("alldata.ejs", {allData: allData})
})

app.post('/', function(req,res){
    
    const student = new Student ({
        studentName: req.body.studentName,
        mentorName: req.body.mentorName,
        programStartDate: req.body.programStartDate,
        studentNumber: req.body.studentNumber
    })
    

    async function studentAdder() { 
        let studentAdded =  await student.save().then((response)=>{
            console.log(response)
            allData.push(response)
        }).then(()=>{



            res.redirect('/alldata')

        })
    }

    studentAdder()

    
   

   
  
   

    
    
})


app.post("/test", function(req,res){
   
console.log('Post requestion from /test has been made')

   for (let i = 0; i < allData.length; i++) {


    let date1 = new Date()
    let date2 = new Date(allData[i].programStartDate)

    var time_difference = date1.getTime() - date2.getTime();
    var days_difference = time_difference / (1000 * 60 * 60 * 24);  

    console.log(days_difference)
   
     if (  Math.trunc(days_difference) < 30 ) {

        currentlyEnroled[i] = allData[i]

     }
    
   }

   allData = [];

   for ( let i = 0; i < currentlyEnroled.length; i++){
    allData[i] = currentlyEnroled[i]
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
const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const { compile } = require("ejs");


const app = express();
app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))


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








app.listen(3000, function(){
    console.log("Severstarted🤬")
})
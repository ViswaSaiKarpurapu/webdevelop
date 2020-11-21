const app=require('express')();
var fs = require('fs');
const parser= require("body-parser")
const cors=require('cors')
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(cors())
var doners=[];
function fillData(){
    doners=JSON.parse(fs.readFileSync("./donersdata.json","utf-8"));
}
app.post("/users", (req, res)=>{
    if(doners.length == 0){
        fillData()
    }
    let body= req.body
    doners.push(body)
    let data=JSON.stringify(doners)
    fs.writeFileSync('./donersdata.json', data, 'utf-8')
    res.send("User added successfully")
})




app.get("/searchByGroup", (req, res) => {
    fillData();
    res.send(JSON.stringify(doners));
})



//creating port 
app.listen(1234,()=>{
    console.log("Running at 1234");
})

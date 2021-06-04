const express=require('express');
// require('./db/conn');
const app=express();
const PORT=process.env.PORT||5000;
app.use(express.json());
// app.use(require('./router/auth'));




app.get('/',(req,res)=>{
    res.send("this is home page");
 })
app.get('/contact',(req,res)=>{
   res.send("this is contact page");
})

app.listen(PORT,()=>{
    console.log(`we are listen at port${PORT}`);
})
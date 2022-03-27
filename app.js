const express=require('express')
const jwt=require('jsonwebtoken')
const app=express()
const fun = require('./functions')
const cors = require('cors')
app.use(express.json())
app.use(cors({
    origin:'http://localhost:4200'
}))

app.post('/adminlogin',(req,res)=>{
    console.log(req.body.username,req.body.password)
    fun.adminlogin(req.body.username,req.body.password).then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/addbook',(req,res)=>{
    fun.addnewbook(req.body.book_id,req.body.book_name,req.body.author,req.body.description,req.body.language,req.body.publisher,req.body.price)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.put('/edit',(req,res)=>{
    fun.editbook(req.body)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})
app.put('/delete',(req,res)=>{
    fun.deletebook(req.body.book_id)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})


app.listen(3000,()=>{
    console.log("server is up on port 3000")
})
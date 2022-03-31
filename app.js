const express=require('express')
const jwt=require('jsonwebtoken')
const app=express()
const fun = require('./functions')
const cors = require('cors')
app.use(express.json())
app.use(cors({
    origin:'http://localhost:4200'
}))

// ADMIN REQUESTS

app.post('/adminlogin',(req,res)=>{
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

app.put('/add',(req,res)=>{
    fun.addbook(req.body.book_id)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/viewbook',(req,res)=>{
    fun.viewbooks(req.body.sortoption,parseInt(req.body.skipval))
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/viewuser',(req,res)=>{
    fun.viewusers(req.body.option)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.put('/blockuser',(req,res)=>{
    fun.blockuser(req.body.user_id)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.put('/unblockuser',(req,res)=>{
    fun.unblockuser(req.body.user_id)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/adminbook',(req,res)=>{
    fun.adminviewbook(req.body.bookid)
    .then((data)=>{
        res.status(data.statuscode).json(data)
    })
})


// CUSTOMER REQUESTS

app.post('/register',(req,res)=>{
    fun.register(req.body).then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/login',(req,res)=>{
    fun.userlogin(req.body.username,req.body.password).then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/books',(req,res)=>{
    fun.getbooks(req.body.option)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/book',(req,res)=>{
    fun.getbook(req.body.bookid)
    .then((data)=>{
        res.status(data.statuscode).json(data)
    })
})

app.put('/postcomment',(req,res)=>{
    userid=parseInt(req.body.userid)
    bookid=parseInt(req.body.bookid)
    rating=parseInt(req.body.rating)
    console.log(req.body.comment,rating,userid,bookid)
    fun.postcomment(req.body.comment,rating,userid,bookid)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.listen(3000,()=>{
    console.log("server is up on port 3000")
})
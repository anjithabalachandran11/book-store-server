const express=require('express')
const jwt=require('jsonwebtoken')
const app=express()
const fun = require('./functions')
const cors = require('cors')
app.use(express.json())
app.use(cors({
    origin:'http://localhost:4200'
}))

//jwtmiddleware to validate token

const jwtmiddleware =  async (req,res,next) =>{
    try{
        const token = req.headers['x-access-token']
        const data = await jwt.verify(token,'mysecretkey@098')
        next()
    }
    catch (err){
        res.json({
            statuscode:404,
            status : false,
            message: 'PLEASE LOGIN'
        })
        
    }
}

// ADMIN REQUESTS

app.post('/adminlogin', async (req,res)=>{
    await fun.adminlogin(req.body.username,req.body.password).then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/addbook',jwtmiddleware,async (req,res)=>{
    await fun.addnewbook(req.body.book_id,req.body.book_name,req.body.author,req.body.description,req.body.language,req.body.publisher,req.body.price)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.put('/edit',jwtmiddleware, async(req,res)=>{
    await fun.editbook(req.body)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.get('/getebook/:cbook', async (req,res)=>{
    id=parseInt(req.params.cbook)
    await fun.adminviewbook(id)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.put('/delete',async(req,res)=>{
    await fun.deletebook(req.body.book_id)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.put('/add',async (req,res)=>{
    await fun.addbook(req.body.book_id)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/viewbook',jwtmiddleware,async (req,res)=>{
    await fun.viewbooks(req.body.sortoption,parseInt(req.body.skipval))
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/viewuser',jwtmiddleware,async (req,res)=>{
    await fun.viewusers(req.body.option)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.put('/blockuser',async (req,res)=>{
    await fun.blockuser(req.body.user_id)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.put('/unblockuser',async(req,res)=>{
    await fun.unblockuser(req.body.user_id)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/adminbook',jwtmiddleware,async(req,res)=>{
    await fun.adminviewbook(req.body.bookid)
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

app.post('/books',jwtmiddleware,(req,res)=>{
    fun.getbooks(req.body.option)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/book',jwtmiddleware,(req,res)=>{
    fun.getbook(req.body.bookid)
    .then((data)=>{
        res.status(data.statuscode).json(data)
    })
})

app.post('/postcomment',(req,res)=>{
    userid=parseInt(req.body.userid)
    bookid=parseInt(req.body.bookid)
    rating=parseInt(req.body.rating)
    fun.postcomment(req.body.comment,rating,userid,bookid)
    .then((result)=>{
        //console.log(result)
        res.status(result.statuscode).json(result)
    })
})

app.put('/editcomment',(req,res)=>{
    userid=parseInt(req.body.userid)
    bookid=parseInt(req.body.bookid)
    rating=parseInt(req.body.rating)
    fun.editcomment(req.body.newcomment,rating,userid,bookid)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.put('/deletecomment',(req,res)=>{
    userid=parseInt(req.body.userid)
    bookid=parseInt(req.body.bookid)
    fun.deletecomment(userid,bookid)
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

app.listen(3000,()=>{
    console.log("server is up on port 3000")
})
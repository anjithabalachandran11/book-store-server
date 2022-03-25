const mongoose=require('mongoose')
const bcrypt = require('bcryptjs/dist/bcrypt')

mongoose.connect('mongodb://localhost:27017/bookstoredb',{ useNewUrlParser : true, useUnifiedTopology: true }, err=>{
    console.log('connected')
})

const UserSchema = new mongoose.Schema({
    user_id :{
        type : Number,
        required : true,
        minlength : 4,
        unique : true
    },
    username : {
        type : String,
        required : true,
        minlength : 5,
        unique : true
    },
    name : {
        type : String,
        required : true,
        minlength : 5,
        uppercase : true
    },
    password : {
        type : String,
        required : true,
        minlength : 5
    },
    category : {
        type : String,
        default : "USER",
        uppercase : true
    },
    userstatus : {
        type : String,
        default : "UNBLOCK",
        uppercase : true
    }
},
{
    timestamps : true
})

const BookSchema = new mongoose.Schema({
    book_id : {
        type : Number,
        required : true,
        unique : true
    },
    book_name : {
        type : String,
        required : true,
        uppercase : true
    },
    author : {
        type : String,
        required : true,
        uppercase : true
    },
    description : {
        type : String,
    },
    comments : [{
        type : mongoose.Types.ObjectId,
        ref : 'Post'
    }],
    ratings : [{
        type : mongoose.Types.ObjectId,
        ref : 'Post'
    }],
    language : {
        type : String,
        required : true,
        uppercase : true
    },
    publication : {
        type : String,
        uppercase : true
    },
    price : {
        type : Number,
        default : 0
    },
    cover : {
        data: Buffer,
        contentType: String
    },
    book_status : {
        type : String,
        default : "AVAILABLE",
        uppercase : true
    }
},
{
    timestamps : true
})

const PostSchema = new mongoose.Schema({
    comment : {
        type : String,
    },
    rating : {
        type : Number
    },
    user_id : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    book_id : {
        type : mongoose.Types.ObjectId,
        ref : 'Book'
    }
},
{
    timestamps : true
})

const User = mongoose.model('User',UserSchema)
const Book = mongoose.model('Book',BookSchema)
const Post = mongoose.model('Post',PostSchema)

module.exports = {
    User,
    Book,
    Post

}



// const pswdhash = async ()=>{
//     const password="admin1000"
//     const hashedpswd = await bcrypt.hash(password,8)
//     console.log("password: "+password)
//     console.log("hashed password: ",hashedpswd)

//     const newUser = new User({
//         user_id : 1000,
//         username : "ADMIN",
//         name : "ADMIN",
//         password : hashedpswd,
//         category : "admin",
//     })
//     newUser.save()

//     // const isMatch = await bcrypt.compare('admin1000',hashedpaswd)
//     // console.log(isMatch)
// }
//  pswdhash()


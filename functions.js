const db=require('./model')
const bcrypt = require('bcryptjs/dist/bcrypt')


adminlogin = (id,password)=>{
    const pswd = pswdhashfun(password)
    return db.User.findOne({id,pswd}).then((user)=>{
        console.log(user)
        if(user){
            return {
                message : 'login success',
                statuscode : 200,
                user
            }
        }
        else {
            return {
                message : 'unable to login',
                statuscode : 401,
            }
        }
        
    })
}
const pswdhashfun = async (password)=>{
    const hashedpswd = await bcrypt.hash(password,8)
    return hashedpswd
}

addnewbook = (id,name,author,description,language,publication,price,status)=>{
    return db.Book.findOne({book_id:id}).then((book)=>{
        if(book){
            return {
                message : "book already exist",
                statuscode : 400,
                book
            }
        }
        else{
            const newbook = new db.Book({
                book_id:id,
                book_name:name,
                author:author,
                description:description,
                language:language,
                publication:publication,
                price:price,
                book_status:status})
            newbook.save()
            return {
                message : "added",
                statuscode : 200,
            }
        }
    })
}
   
editbook = (data)=>{
    return db.Book.findOneAndUpdate({book_id:data.book_id},
        {
            book_name:data.book_name,
            author:data.author,
            description:data.description,
            language:data.language,
            publication:data.publication,
            price:data.price
        }).then((book)=>{
        if(book){
            return {
                message : "updated",
                statuscode : 200
            }
        }
        else{
            return {
                message : "no book",
                statuscode : 401
            }
        }
    })
}
deletebook = (data)=>{
    return db.Book.findOneAndUpdate({book_id:data},{book_status:"DELETED"}).then((book)=>{
        if(book){
            return {
                message : "deleted",
                statuscode : 200
            }
        }
        else{
            return {
                message : "no book",
                statuscode : 401
            }
        }
    })
    
}

module.exports={
    adminlogin,
    addnewbook,
    editbook,
    deletebook
}
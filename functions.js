const db=require('./model')
const bcrypt = require('bcryptjs/dist/bcrypt')


adminlogin = (username,password)=>{
    return db.User.findOne({username}).then((user)=>{
        console.log(user)
        if(user){
            if(user.password==password){
                return {
                    message : 'login success',
                    statuscode : 200,
                    user
                }
            }
            else{
                return {
                    message : 'incorrect password',
                    statuscode : 201,
                }
            }
           
        }
        else {
            return {
                message : 'unable to login',
                statuscode : 202,
            }
        }
        
    })
}

addnewbook = (id,name,author,description,language,publication,price,status)=>{
    return db.Book.findOne({book_id:id}).then((book)=>{
        if(book){
            return {
                message : "book already exist!!!",
                statuscode : 201,
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
                message : " book added sucessfully..",
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
            publication:data.publisher,
            price:data.price
        }).then((book)=>{
        if(book){
            return {
                message : "Book details updated successfully..",
                statuscode : 200
            }
        }
        else{
            return {
                message : "No such book exist!!!",
                statuscode : 201
            }
        }
    })
}
deletebook = (data)=>{
    return db.Book.findOneAndUpdate({book_id:data},{book_status:"DELETED"}).then((book)=>{
        if(book){
            if(book.book_status='AVAILABLE'){
                return {
                    message : "Book deleted successfully...",
                    statuscode : 200
                }
            }
            else{
                return {
                    message : "Book already deleted!!!",
                    statuscode : 201
                }
            }
            
        }
        else{
            return {
                message : "No such book",
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
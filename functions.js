const db=require('./model')
const jwt=require('jsonwebtoken')

// ADMIN OPERATIONS

adminlogin = (username,password)=>{
    return db.User.findOne({username}).then((user)=>{
        if(user){
            if(user.password==password){
                const token = jwt.sign({cuser:username},'mysecretkey@098')
                return {
                    message : 'login success',
                    statuscode : 200,
                    user,
                    token
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
    return db.Book.findOneAndUpdate({book_id:data},{book_status:"DELETED"})
    .then((book)=>{
        if(book){
            if(book.book_status=='AVAILABLE'){
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

addbook = (data)=>{
    return db.Book.findOneAndUpdate({book_id:data},{book_status:"AVAILABLE"}).then((book)=>{
        if(book){
            if(book.book_status=='DELETED'){
                return {
                    message : "Book added successfully...",
                    statuscode : 200
                }
            }
            else{
                return {
                    message : "Book already available!!!",
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

viewbooks = (sortval,skipval)=>{
    return db.Book.find()
    .populate('comments')
    .sort({[sortval]:1})
    //.skip(skipval)
    //.limit(5)
    .then((result)=>{
        if(result){
            return {
                message : "book details",
                statuscode : 200,
                result
            }
        }
    })
}

viewusers = (sortval)=>{
    return db.User.find({"category":{"$ne":"ADMIN"}})
    .sort({[sortval]:1})
    .then((result)=>{
        if(result){
            return {
                message : "Users details",
                statuscode : 200,
                result
            }
        }
    })
}

blockuser = (userid)=>{
    return db.User.findOneAndUpdate({user_id:userid},{userstatus:"BLOCKED"}).then((user)=>{
        if(user){
            if(user.userstatus=='UNBLOCKED'){
                return {
                    message : "User blocked successfully...",
                    statuscode : 200
                }
            }
            else{
                return {
                    message : "User already blocked!!!",
                    statuscode : 201
                }
            }
        }
        else{
            return {
                message : "No such user",
                statuscode : 401
            }
        }
    })
}

unblockuser = (userid)=>{
    return db.User.findOneAndUpdate({user_id:userid},{userstatus:"UNBLOCKED"}).then((user)=>{
        if(user){
            if(user.userstatus=='BLOCKED'){
                return {
                    message : "User unblocked successfully...",
                    statuscode : 200
                }
            }
            else{
                return {
                    message : "User already unblocked!!!",
                    statuscode : 201
                }
            } 
        }
        else{
            return {
                message : "No such user",
                statuscode : 401
            }
        }
    })
}

adminviewbook = (book_id)=>{
    return db.Book.findOne({book_id})
    .populate('comments')
    .then((data)=>{
        if(data){
            return {
                message : "Book exist",
                statuscode : 200,
                data
            }
        }
    })
}

// CUSTOMER OPERATIONS

register = (userdata)=>{
    return db.User.findOne({user_id:userdata.user_id}).then((user)=>{
        if(user){
            return {
                message : "User id already exist!!",
                statuscode : 201,
                user
            }
        }
        else{
            const newUser = new db.User({
                user_id : userdata.user_id,
                username : userdata.username,
                name : userdata.name,
                password : userdata.password,
                category : "USER",
            })
            newUser.save()
            return { 
                message : "User added..",
                statuscode : 200,
            }
        }
    })
}

userlogin=(username,password)=>{
    return db.User.findOne({username}).then((user)=>{
        if(user){
            if(user.userstatus!='BLOCKED'){
                if(user.password==password){
                    const token = jwt.sign({cuser:username},'mysecretkey@098')
                    return {
                        message : "Login success..",
                        statuscode : 200,
                        user,
                        token
                    }
                }
                else{
                    return {
                        message : "Incorrect password",
                        statuscode : 201
                    }
                }
            }
            else{
                return {
                    message : "User blocked",
                    statuscode : 202
                }
            }
        }
        else{
            return {
                message : "User not exist",
                statuscode : 203
            }
        }
    })
}

getbooks = (sortval)=>{
    return db.Book.find({"book_status":{"$ne":"DELETED"}})
    .populate('comments')
    .sort({[sortval]:1})
    .then((books)=>{
        if(books){
            return {
                message : "book details",
                statuscode : 200,
                books
            }
        }
    })
}

getbook = (book_id)=>{
    return db.Book.findOne({book_id})
    .populate('comments')
    .then((data)=>{
        if(data){
            return {
                message : "Book exist",
                statuscode : 200,
                data
            }
        }
        else {
            return {
                message : "No book",
                statuscode : 202
            }
        }
    })
}

postcomment=(comment,rating,user_id,book_id,)=>{
    userid=0
    bookid=0
    username=""
    return db.User.findOne({user_id}).then((user)=>{
        if(user){
            userid=user._id
            username=user.name
            return db.Book.findOne({book_id}).then((book)=>{
                if(book){
                    bookid=book._id
                    const newpost = new db.Post({
                        comment : comment,
                        rating : rating,
                        user_id : userid,
                        username : username,
                        book_id : bookid
                    })
                    book.comments.push(newpost._id)
                    book.ratings.push(newpost.rating)
                    newpost.save()
                    let sum=0
                    book.ratings.forEach((i)=>{
                        sum=sum+i
                    })
                    book.averagerating=Math.floor(sum/book.ratings.length)
                    book.save()
                    return {
                        message : "post added",
                        statuscode : 200
                    }
                }
                else {
                    return {
                        message : "no such book",
                        statuscode : 201
                    }
                }
            })
        }
        else{
            return {
                message : "no such user",
                statuscode : 202
            }
        }
    })
}

editcomment=(newcomment,rating,user_id,book_id)=>{
    return db.User.findOne({user_id}).then((user)=>{
        if(user){
            userid=user._id
            return db.Book.findOne({book_id}).then((book)=>{
                bookid=book._id
                return db.Post.findOne({user_id:userid,book_id:bookid}).then((post)=>{
                    if(post){
                        post.comment=newcomment
                        let old_rating= post.rating
                        post.rating=rating
                        post.save()
                        let index = book.ratings.indexOf(old_rating)
                        let r=book.ratings.splice(index,1)
                        book.ratings.push(rating)
                        let sum=0
                        book.ratings.forEach((i)=>{
                            sum=sum+i
                        })
                        book.averagerating=Math.floor(sum/book.ratings.length)
                        book.save()
                        return {
                            statuscode : 200,
                            message : "Comment updated"
                        }
                    }
                    else{
                        return {
                            statuscode : 201,
                            message : "Firt post comment and rating to edit"
                        }
                    }
                })
            })
        }
    })
}

deletecomment=(user_id,book_id)=>{
    return db.User.findOne({user_id}).then((user)=>{
        if(user){
            userid=user._id
            return db.Book.findOne({book_id}).then((book)=>{
                bookid=book._id
                return db.Post.findOneAndDelete({user_id:userid,book_id:bookid}).then((post)=>{
                    if(post){
                        let indexofcomment=book.comments.indexOf(post._id)
                        let c=book.comments.splice(indexofcomment,1)
                        let sum=0
                        book.ratings.forEach((i)=>{
                            sum=sum+i
                        })
                        let indexofrating=book.ratings.indexOf(post.rating)
                        let r=book.ratings.splice(indexofrating,1)
                        n=parseInt(r[0])
                        book.averagerating=Math.floor((sum-n)/(book.ratings.length))
                        book.save()
                        return {
                            statuscode : 200,
                            message : "Comment deleted"
                        }
                    }
                    else{
                        return {
                            statuscode : 201,
                            message : "Firt post comment and rating to delete"
                        }
                    }
                })
            })
        }
    })
}

module.exports={
    adminlogin,
    addnewbook,
    editbook,
    deletebook,
    addbook,
    viewbooks,
    viewusers,
    blockuser,
    unblockuser,
    adminviewbook,
    register,
    userlogin,
    getbooks,
    getbook,
    postcomment,
    editcomment,
    deletecomment
}
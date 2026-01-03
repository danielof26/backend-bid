const express = require("express")
let jwt = require("jsonwebtoken")

let routerUsers = express.Router()

let users = require("../data/users")

routerUsers.post("/login", (req,res) => {
    let email = req.body.email
    let password = req.body.password

    let errors = []
    if(email == undefined){
        errors.push("not email")
    }
    if(password == undefined){
        errors.push("not password")
    }
    if(errors.length > 0){
        res.status(400).json({errors: errors})
        return
    }
    let user = users.find( u => u.email == email && u.password == password )
    if(user == undefined){
        res.status(401).json({error: "not valid email or password"})
        return
    }

    let apiKey = jwt.sign({
        email: user.email,
        id: user.id,
    }, "secret")

    res.json({apiKey: apiKey})
})

module.exports = routerUsers
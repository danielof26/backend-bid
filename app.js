const express = require("express")
let jwt = require("jsonwebtoken")

let app = express()
let port = 8081

app.use(express.json())

app.use(["/items", "/bids"], (req,res,next) => {
    console.log("middleware")
    let apiKey = req.query.apiKey

    if(apiKey == undefined){
        res.status(401).json({error: "not apikey"})
        return
    }

    let infoApiKey = null
    try{
        infoApiKey = jwt.verify(apiKey, "secret")
    } catch(error){
        res.status(401).json({error: "not valid apiKey"})
        return
    }
    
    req.infoApiKey = infoApiKey

    next()
})

let routerItems = require("./routers/routerItems")
app.use("/items", routerItems)
let routerBids = require("./routers/routerBids")
app.use("/bids", routerBids)
let routerUsers = require("./routers/routerUsers")
app.use("/users", routerUsers)

app.listen(port, () => {
    console.log("Servidor activo en " + port)
})
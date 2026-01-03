const express = require("express")

let app = express()
let port = 8081

app.use(express.json())

let routerItems = require("./routers/routerItems")
app.use("/items", routerItems)
let routerBids = require("./routers/routerBids")
app.use("/bids", routerBids)
let routerUsers = require("./routers/routerUsers")
app.use("/users", routerUsers)

app.listen(port, () => {
    console.log("Servidor activo en " + port)
})
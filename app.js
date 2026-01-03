const express = require("express")

let app = express()
let port = 8081

let routerItems = require("./routers/routerItems")
app.use("/items", routerItems)
let routerBids = require("./routers/routerBids")
app.use("/bids", routerBids)

app.listen(port, () => {
    console.log("Servidor activo en " + port)
})
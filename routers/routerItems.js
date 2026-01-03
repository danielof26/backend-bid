const express = require("express")

let routerItems = express.Router()

let items = require("../data/items")

routerItems.get("/", (req,res) => {
    res.json(items)
})

routerItems.get("/:id", (req,res) => {
    let item = items.find( i => i.id == req.params.id)

    if(item == undefined){
        res.status(400).json({error: "no item with this id"})
        return
    }

    res.json(item)
})

routerItems.post("/", (req,res) => {
    let description = req.body.description
    if(description == undefined){
        res.status(400).json({error: "no description in body"})
        return   
    }

    let lastId = items[items.length-1].id
    items.push({
        id: lastId+1,
        userId: req.infoApiKey.id,
        description: description
    })

    res.json({added: lastId+1})
})

module.exports = routerItems
const express = require("express")

let routerBids = express.Router()

let bids = require("../data/bids")
let items = require("../data/items")

routerBids.get("/", (req,res) => {
    res.json(bids)
})

routerBids.get("/:id", (req,res) => {
    let bid = bids.find( b => b.id == req.params.id)

    if(bid == undefined){
        res.status(400).json({error: "no bid with this id"})
        return
    }

    res.json(bid)
})

routerBids.post("/", (req,res) => {
    let amount = req.body.amount
    let itemId = req.body.itemId

    let errors = []
    if(amount == undefined || isNaN(amount)){
        errors.push("not valid amount")
    }
    if(itemId == undefined || items.find(i => i.id == itemId) == undefined){
        errors.push("not valid itemId")
    }
    if(errors.length > 0){
        res.status(400).json({errors: errors})
        return
    }

    let lastId = bids[bids.length-1].id
    bids.push({
        id: lastId+1,
        userId: req.infoApiKey.id,
        itemId: itemId,
        amount: parseFloat(amount)
    })

    res.json({added: lastId+1})
})

module.exports = routerBids
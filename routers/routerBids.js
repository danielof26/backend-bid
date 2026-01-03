const express = require("express")

let routerBids = express.Router()

let bids = require("../data/bids")

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

module.exports = routerBids
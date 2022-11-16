require("dotenv").config()
const express = require('express')
const budget = require("./models/budget.js")
const methodOverride = require("method-override")

const app = express()

let bankAccount = 0

//Middleware
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))


// INDEX ROUTE - GET
app.get('/budget', (req, res) => {
    res.render("index.ejs", {
        allBudget:budget,
        account:bankAccount
        
    } )
})

// NEW ROUTE - GET
app.get('/budget/new', (req, res) => {
    res.render("new.ejs")
})

// Create Route - POST
app.post('/budget', (req, res) => {
    budget.push(req.body)
    
    res.redirect("/budget")
})

// SHOW ROUTE - GET
app.get('/budget/:index', (req, res) => {
    // res.render(template, data)
    res.render('show.ejs', {
        item: budget[req.params.index],
        index: req.params.index
    })
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
//required packages
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')


//config express app/middlewares
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false}))

//controllers set up
app.use('/users', require('./controllers/users'))

//route definitions
app.get('/', (req, res) => {
    res.render('home.ejs')
}) 

//listen on port
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
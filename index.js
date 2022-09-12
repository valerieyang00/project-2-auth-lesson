//required packages
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const db = require('./models')


//config express app/middlewares
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
//our custom auth middleware
//next tells express to move on to next route or middleware in the chain 
app.use(async (req, res, next) => {
    //if there is a cooke on the incoming request, we want to look up the user in the db
    if (req.cookies.userId) {
        const user = await db.user.findByPk(req.cookies.userId)
        // res.locals (mount the user here, so it passes down to all other routes)
        res.locals.user = user
    } else {
        //if no user (no cookie) -- set the user to be null in the res.locals
        res.locals.user = null
    }
    next()
})

//controllers set up
app.use('/users', require('./controllers/users'))

//route definitions
app.get('/', (req, res) => {
    console.log('the current user is', res.locals.user)
    res.render('home.ejs')
})

//listen on port
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
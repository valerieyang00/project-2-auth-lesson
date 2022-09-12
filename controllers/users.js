const express = require('express')
const router = express.Router()
const db = require('../models')

//GET render a form to create new user
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

//POST /users -- create new user in the db

router.post('/', async (req,res) => {
    //create a new user
    try{
    const newUser = await db.user.create(req.body)
    //store new user's id as a cookie in the browser
    // res.cookie('key', value)
    res.cookie('userId', newUser.id)
    //redirect to the homepage
    res.redirect('/')

    }catch(err){
        console.log(err)
        res.send('server error')
    }
})

// GET /users/login -- show a login from to user
router.get('/login', (req, res) => {
    console.log(req.query)
    res.render('users/login.ejs', {
        // if the req.query.message exist, pass it as message, otherwise pass in null
        // ternary operator (old syntax, shorthand for if/else)
        // condition ? expression if truthy : expression if falsy
        message: req.query.message ? req.query.message : null
    })
})

//POST /users/login -- accept a payload of form data and use it to log a user in
router.post('/login', async (req, res) => {
    try {
        //look up the user in the db using the supplied email
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        const noLoginMsg = 'Incorrect username or password'
        //if the user is not found -- send the user back to the login form
        if (!user) {
            console.log('user not found')
            res.redirect('/users/login?message='+ noLoginMsg)
        }
        //if the user found, but given wrong password, send them back to login form
        else if (user.password !== req.body.password) {
            console.log(req.body.password)
            console.log('password does not match')
            //passing in query ?key= 
            res.redirect('/users/login?message='+ noLoginMsg)
            //if the user is found and the supplised pw matches what's in db, log them in
        } else {
            console.log('login successful')
            res.cookie('userId', user.id)
            res.redirect('/users/profile')
        }
        
    }catch(err) {
        console.log(err)
        res.send('server error')
    }

})

//GET /users/logout -- log out a user by clearing cookies
router.get('/logout', (req, res) => {
    //clear the cookie and redirect to homepage
    res.clearCookie('userId')
    res.redirect('/')
})

router.get('/profile', (req, res) => {
    // if the user is not logged in, redirect to login form
    if (!res.locals.user) {
        res.redirect('/users/login?message=You must authenticate before you are authorized to view this resource')
    } else {
    // otherwise, show them their profile
    res.render('users/profile.ejs', {
        user: res.locals.user
    })
}})





module.exports = router
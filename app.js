const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')

const roomRouter = require('./api/routes/rooms')
const activitiesRouter = require('./api/routes/activities')
const orderRouter = require('./api/routes/orders')
const userRouter = require('./api/routes/users')

const mongoose = require('mongoose')

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CONNECTION WITH ATLAS

// mongoose.connect('mongodb+srv://Chris:'+process.env.MONGO_ATLAS_PW+'@hotel-vxquv.mongodb.net/test?retryWrites=true',{
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// }, console.log("Data Base is connected"))

//LOCAL CONNECTION 

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/hoteldb', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(db => console.log('DB local connected'))

//CORS
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

//handle request
app.use('/rooms', roomRouter)
app.use('/activities', activitiesRouter)
app.use('/orders', orderRouter)
app.use('/users', userRouter)

//static
app.use(express.static(__dirname + '/public'))

//handle error
app.use((req, res, next)=>{
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app
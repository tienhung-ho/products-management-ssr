require('dotenv').config()
const systemConfig = require('./config/system/index')
const express = require('express')
const database = require('./config/database/index')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')   
const session = require('express-session')

const routeClient = require('./routes/client/index.route.js')
const routeAdmin = require('./routes/admin/index.route.js')

const app = express()
database.connect()
const port = process.env.PORT

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// express flash
app.use(cookieParser('SDHAERWTRW'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// method override
app.use(methodOverride('_method'))

// template engine
app.set('views', `${ __dirname }/views`)
app.set('view engine', 'pug')

// static
app.use(express.static(`${ __dirname }/public`))

// local variables within the application
app.locals.prefixAdmin = systemConfig.prefixAdmin

// Routes client
routeClient(app)
routeAdmin(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
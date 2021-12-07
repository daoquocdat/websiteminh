const path =require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const route = require('./routes/index')
const db = require('./config/db')

// Connect to DB
db.connect()

const app = express()
const port = 5000

app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())
app.use(express.urlencoded({
  extended: true
}))

app.use(methodOverride('_method'))
app.use(express.json())

//HTTP logger
//app.use(morgan('combined'))
app.set('views', path.join(__dirname, 'resources', 'views'))
//Template engine
app.engine('hbs', 
    handlebars({
        extname: '.hbs',
        defaultLayout: 'user.hbs',
        helpers: require('./app/helpers/handlebar'),
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })
)
app.set('view engine','hbs')
app.set('view options', { layout: 'other' })
app.set('views',path.join(__dirname,'resources','views'))


//Route init
route(app)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
const session = require('express-session');
const {engine} = require('express-handlebars');
const { createServer } = require("http");
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = require('socket.io')(httpServer,{
    cors: {
        origin: '*'
    }
});

// config dotenv
dotenv.config({ path: './config/config.env' });

// passport config
require('./config/passport')(passport)

// express handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// static folder
app.use(express.static(path.join(__dirname,'public')))

// express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

// passport middleware
passport.use(passport.initialize());
passport.use(passport.session());

// routes middleware
app.use('/', require('./routes/login'));
app.use('/auth', require('./routes/auth'));




const users = {};


io.on('connection',socket =>{
    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]});
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
    });
})

httpServer.listen(PORT);
const express = require('express');
const app = express();
app.use(express.static('public'));

const config = require('./config/config');

//Socket.io connection
const http = require('http').createServer(app);
const io = require('socket.io')(http);
global.io = io;
require('./socket')(io);


//Allow CORS origin requests
const cors = require('cors');
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('morgan')('dev'));
app.use(cors());


//MongoDB connection
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(config.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch(error => console.log(error));


//Passport
const passport = require('passport');
app.use(passport.initialize()).use(passport.session());
require('./config/passport')(passport);

//Routes
const auth_routes = require('./routes/auth');
const roles_routes = require('./routes/roles');
const users_routes = require('./routes/users');
const categories_routes = require('./routes/categories');
const category_items_routes = require('./routes/category-items');
const orders_routes = require('./routes/orders');
const search_routes = require('./routes/search');
const advertisement_routes = require('./routes/advertisement');
const rate_routes = require('./routes/rate');

app.use('/api/auth', auth_routes);
app.use('/api/roles', roles_routes);
app.use('/api/users', passport.authenticate('jwt', {session: false}), users_routes);
app.use('/api/categories', passport.authenticate('jwt', {session: false}), categories_routes);
app.use('/api/category_items', passport.authenticate('jwt', {session: false}), category_items_routes);
app.use('/api/orders', passport.authenticate('jwt', {session: false}), orders_routes);
app.use('/api/search', passport.authenticate('jwt', {session: false}), search_routes);
app.use('/api/advertisement', passport.authenticate('jwt', {session: false}), advertisement_routes);
app.use('/api/rate', passport.authenticate('jwt', {session: false}), rate_routes);


const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log(`Server is running ${port}...`);
});

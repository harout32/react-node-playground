const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./routes/api');
const { notFound, apiHandle } = require('./error handlers/errorHandler');

const app = express();

// const admin = require('./routes/admin');
// const path = require('path');

// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'pug');
// app.use(express.static(path.join(__dirname, '../public')));
// convert json to object && accept data inside of URL
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.use('/admin', admin);
app.use('/api', api);
api.use(notFound);
api.use(apiHandle);

module.exports = app;

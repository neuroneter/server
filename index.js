const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Users = require('./routes/Users');
const Groups = require('./routes/Groups');
const Stores = require('./routes/Stores');
const Orders = require('./routes/Orders');
const Customers = require('./routes/Customers');
const Catalogue = require('./routes/Catalogue.js');
const Divipola = require('./routes/Divipola.js');
const Suppliers = require('./routes/Suppliers.js');
const Brands = require('./routes/Brands.js');
const Products = require('./routes/Products.js');
const WebHook = require('./routes/WebHook.js');
const ScoreDps = require('./routes/ScoreDps.js');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

//app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//    next();
//});


mongoose.connect('mongodb+srv://usBOB:8SLyb9VXtFhCAlPR@clbobseller-i3uwq.gcp.mongodb.net/BDBob?retryWrites=true&w=majority',{ useUnifiedTopology: true });
const PORT = 5567;
app.listen(PORT, () => {console.log(` running on port ${PORT}`);});

//Llamado a las rutas de los EndPoints
app.use('/users',Users);
app.use('/customers',Customers);
app.use('/orders',Orders);
app.use('/catalogue',Catalogue);
app.use('/divipola',Divipola);
app.use('/suppliers',Suppliers);
app.use('/groups',Groups);
app.use('/brands',Brands);
app.use('/stores',Stores);
app.use('/products',Products);
app.use('/webhook',WebHook);
app.use('/scoredps',ScoreDps);

module.exports = {app};
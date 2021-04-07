const express = require('express')
const router = express.Router();
const Customers = require('../models/Customers.js');
const Stores = require('../models/Stores.js');
const Configs = require('../models/Configs.js');
const Products = require('../models/Products.js');
const Taxes = require('../models/Taxes.js');
const Email = require("./Email.js");
const PriceCalc = require("./functions/PriceCalc.js");
const e = require('express');
const Orders = require('../models/Orders.js');
const firebase = require('../connectdb/Firebase.js');

const Users = require('../models/Users.js');
var validator = require("email-validator");
const { route } = require('./Orders.js');

router.post('/find', (req, res) => {
    var email = req.body.e.toLowerCase();
    Customers.find({"email":email}).then(cust => {
        if(cust.length == 0){
            var errorInfo = "Verifique el correo.";
            res.status(201).send({customer:null, errorCode:"Bob123", errorInfo:errorInfo});
        } 
        else if(req.body.p != cust[0].pass){
            var errorInfo = "Verifique la contraseña.";
            res.status(201).send({customer:null, errorCode:"Bob124", errorInfo:errorInfo});
        }else{
            res.status(201).send({customer:1,view:cust[0].view, stores:cust[0].stores, email:cust[0].email, p:req.body.p, bookAddress:cust[0].bookAddress});
        }
    });
});

router.post('/remember',(req, res) => {
    
    if(req.body.d != undefined) var find = {"document":req.body.d}
    if(req.body.e != undefined){
        var email = req.body.e.toLowerCase();
        var find = {"email":email}
    }
    Customers.find(find).then(cust => {
        if(cust.length > 0){
            // Definimos el email
            var mailOptions = {
                from: 'gestion@bobseller.com',
                to: cust[0].email,
                subject: 'Recuperacon de contraseña',
                html: '<div>El correo asociado: '+cust[0].email+'<br/>'+'La contraseña asociada: '+cust[0].pass+'</div>'
            };

            // Enviamos el email
            Email.sendMail(mailOptions, function(error, info){
                if (error){res.status(201).send({customer:1, email:"Tu bandeja no acepta correo, intentalo nuevamente"});} 
                else {
                    var splits = cust[0].email.split("@");
                    var emailname =  splits[0].slice(0, -4);
                    emailname = emailname+"xxx@"+splits[1];
                    res.status(201).send({customer:1, Info:"Hemos enviado un correo con los datos de ingreso a su cuenta <<"+emailname+">>, verifica su bandeja de correo he intenta ingresar."});
                }
            });
        }else{
            if(req.body.d != undefined){
                var errorInfo = "Documento no se encuentra.";
                var errorCode = "Bob119";
            } 
            if(req.body.e != undefined){
                var errorInfo = "Correo no se encuentra.";
                var errorCode = "Bob118";
            } 
            res.status(201).send({customer:null, errorCode:errorCode, errorInfo:errorInfo});
        }
    })
})

//Funcion utilizada por el front en checkout
router.post('/find/bookaddress', (req, res) => {
    var email = req.body.e.toLowerCase();
    Customers.find({"email":email},{_id:0,bookAddress:1,email:1,firstName:1,lastName:1,document:1,stores:1}).then(address => {
        var node = {
                    bookAddress:address[0].bookAddress,
                    email:address[0].email,
                    firstName:address[0].firstName,
                    lastName:address[0].lastName,
                    document:address[0].document,
                    stores:address[0].stores[0],
                    cityDefault:PriceCalc.defStateCity.cities.code
                };
        res.status(201).send(node);
    });
});

//Funcion utilizada por el front en checkout
router.put('/add/address', (req, res) => {
    var email = req.body.e.toLowerCase();
    Customers.find({"email":email}).then(cust => {
        cust[0].bookAddress.push(req.body.address);
        var update = { $set: { bookAddress: cust[0].bookAddress }}
        if(cust[0].firstName === undefined){
            update = { $set: { 
                bookAddress: cust[0].bookAddress, 
                firstName:req.body.address.firstName, 
                lastName:req.body.address.lastName,
                typeDocument:req.body.address.typeDocument,
                document:req.body.address.document
             }}
        } 
        Customers.update({_id:cust[0]._id},update)
        .then(x => {
             res.status(201).send({firstName:cust[0].firstName,lastName:cust[0].lastName,document:cust[0].document, bookAddress:cust[0].bookAddress,cityDefault:"11001"});
        })
        .catch(x => res.status(401).send(x));
    });
})

//Funcion para cambiar la dirección por defecto a utilizar
//este EndPoint es utilizado por la tienda
router.post('/default/address', (req, res) => {
    Customers.find({email:req.body.e}).then(customer => {
        var bookAddress = customer[0].bookAddress;
        var orderBookAddress = [];
        for(var i=0; i<bookAddress.length; i++){
            if(bookAddress[i]._id == req.body._id) orderBookAddress.unshift(bookAddress[i]);
            else orderBookAddress.push(bookAddress[i]);
        }
        address = {$set:{"bookAddress":orderBookAddress}}
        Customers.updateOne({"email":req.body.e},address)
            .then(x => {
                res.status(201).send({
                    emal:req.body.e,
                    document:customer[0].document,
                    firstName:customer[0].firstName,
                    lastName:customer[0].lastName,
                    bookAddress:orderBookAddress,
                    idStore:customer[0].stores[0],
                    cityDefault:PriceCalc.defStateCity.cities.code
                });
            })
        .catch(x => res.status(401).send(x));
    });
})

router.put('/delete/address', (req, res) => {
    //$pull elimina un campo de un registro interno de array
    Customers.update({email:req.body.e},{$pull:{bookAddress:{_id:req.body.id}}})
    .then(x => {
        res.status(201).send({_id:req.body.id,update:"ok"})
    })
    .catch(x => res.status(401).send(x));
});

router.put('/update/address', (req, res) => {
    var email = req.body.e.toLowerCase();
    Customers.find({email:req.body.e}).then(customer => {
        var bookAddress = customer[0].bookAddress;
        for(var i=0; i<bookAddress.length; i++){
            if(bookAddress[i]._id == req.body.address._id){
                bookAddress[i] = req.body.address;
                address = {$set:{"bookAddress":bookAddress}}
                Customers.updateOne({"email":email},address)
                .then(x => {
                    res.status(201).send({
                        emal:req.body.e,
                        document:customer[0].document,
                        firstName:customer[0].firstName,
                        lastName:customer[0].lastName,
                        bookAddress:bookAddress,
                        idStore:customer[0].stores[0],
                        cityDefault:PriceCalc.defStateCity.cities.code
                    });
                })
                .catch(x => res.status(401).send(x));
            }
        }
    })
});

//Gestiona el carrito de compras para buscar un producto
router.post('/find/cart', (req, res) => {
    var email = req.body.e.toLowerCase();
    Customers.find({"email":email}).then(customer => {
        var state = PriceCalc.defStateCity.code;
        var city = PriceCalc.defStateCity.cities.code;
        if(customer[0].bookAddress[0] !== undefined){
            state = customer[0].bookAddress[0].state;
            city = customer[0].bookAddress[0].city;
        }
        var shippingCost = (customer[0].cart.length > 0)? PriceCalc.calcShipping(customer[0].cart,state,city):0;
        res.status(201).send({cart:customer[0].cart,shippingCost,state,city:city});
    });
})

//Gestiona el carrito de compras para adicionar o actualizar la cantidad que tiene el carrito
router.post('/update/cart', (req, res) => {
    var email = req.body.e.toLowerCase();
    var arrSku = [];
    Customers.find({"email":email}).then(customer => {
        if(req.body.cart.length > 0){
            Stores.find({_id:customer[0].stores[0]}).then(store => {
                Configs.find().then(function(config){
                    req.body.cart.forEach(val => {  arrSku.push(val.sku) });
                    Products.find({sku:{ "$in" : arrSku}}).then(item => {
                        Taxes.find().then(taxes => {
                            var newCart = [];

                            req.body.cart.forEach(carVal => {
                                for(var j=0; j< item.length; j++){
                                    if(item[j].sku == carVal.sku){
                                        //Construimos el precio del producto 
                                        var calc = {v1:config[0].protection,v2:config[0].maxMargin,v3:config[0].incentive,v4:store[0].fee,v5:store[0].discount};
                                        var priceTmp = PriceCalc.getPrice(calc, item[j].pvp, item[j].cost, item[j].idTax, taxes);

                                        //Si el producto no fue actualizado es por que se requiere crear nuevamente el producto
                                        newCart.push({ 
                                            "name": item[j].name,
                                            "image": item[j].images[0].url,
                                            "alot": carVal.alot,
                                            "sku": carVal.sku,
                                            "newPrice" : priceTmp.newPrice,
                                            "priceOld" : priceTmp.priceOld,
                                            "discountP" : priceTmp.discountP,
                                            "dicountMarg" : priceTmp.dicountMarg,
                                            "taxValue" : priceTmp.taxValue,
                                            "stock" : item[j].stock,
                                            "status": item[j].status,
                                            "bDimensions": item[j].bDimensions,
                                            "dimensions": item[j].dimensions
                                        });
                                        break;
                                    }
                                }
                            })

                            var state = PriceCalc.defStateCity.code;
                            var city = PriceCalc.defStateCity.cities.code;
                            if(customer[0].bookAddress[0] !== undefined){
                                state = customer[0].bookAddress[0].state;
                                city = customer[0].bookAddress[0].city;
                            }

                            var shippingCost = PriceCalc.calcShipping(newCart,state,city);
                            cart = { $set: { "cart":newCart } }
                            Customers.updateOne({"email":email},cart).then(cart => {
                                res.status(201).send({e:email,cart:newCart,shippingCost,state,city});
                            })

                        })
                    })
                })
            })
        }else{
            cart = { $set: { "cart":[] } }
            var shippingCost =  0;
            Customers.updateOne({"email":email},cart).then(cart => {
                res.status(201).send({e:email,cart:[],shippingCost,state:customer[0].bookAddress[0].state,city:customer[0].bookAddress[0].city});
            })
        }
    })
})

//Buscar los datos del usuario para gestionar el perfil se utiliza para el front
//Easte endPoint es utilizado en la tienda 
router.post('/find/customer', (req, res) => {
    var arrStore = [];
    Customers.find({email:req.body.e})
    .then(customer => {
        Orders.find({idCustomer:customer[0]._id},{
                sku:1,_id:1,status:1,statusCode:1,traking:1,order:1,idRefPay:1,paymentMethod:1,
                idStore:1,date:1,code:1,skuName:1,reference:1,lot:1,oldTax:1,oldPrice:1,tax:1,
                price:1,discount:1,totalPay:1,totalTax:1,shipping:1,points:1,state:1,city:1,
                neighborhood:1,address:1,deliveryOnName:1,deliveryDays:1,guide:1,invoice:1,
                invoiceUrl:1,carrier:1,trakingUrl:1,brand:1,image:1}).sort({order:1})
        .then(orders => {
            console.log(customer[0].stores);
            //Cargamos todos los productos que existen en las ordennes del cliente 
            //verificamos no cargar productos de forma repetida 
            Stores.find(
                {_id:{ "$in" : customer[0].stores}},
                {_id:1,name:1,invitation:1,url:1,description:1}
            )
            .then(stores => {

                //Ordenamos las tiendas de acuerdo a la tienda que se encuentra seleccionada por defecto en el 
                //primer posición del array
                stores.forEach(val => {
                    if(val._id == customer[0].stores[0]) arrStore.unshift(val);
                    else arrStore.push(val);
                });


                if(customer[0].birhtday === undefined) customer[0]["birhtday"] = "00/00/0000";
                customer[0].pass = "xxxx";
                customer[0].bookAddress = [];
                res.status(201).send({customer:customer[0],newPass:{old:"",new:"",new2:""},orders,stores:arrStore});
            });
        });
    });
});

//Buscar los datos del usuario para gestionar el perfil se utiliza para el front
router.post('/update/pass', (req, res) => {
    var pass = req.body.pass.new;
    var pass2 = req.body.pass.new2;
    var old = req.body.pass.old;
    Customers.find({email:req.body.e})
    .then(customer => {
        if(customer[0].pass === old){
            var upper = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ¿?!¡*$%#@-_=+~|";
            var cont = 0;
            if(pass === pass2){
                if(pass.length > 5){
                    for(var i=0; i<pass.length; i++){
                        for(var up=0; up<42; up++){
                            if(pass[i] === upper[up]){
                                cont++;
                                break;
                            } 
                        }
                    }
                    if(cont > 1){
                        //La contraseña nueva cumple con lo necesario por lo que procedemos a realizar el logueo 
                        //esto es obligatorio para poder realizar el cambio de contraseñas
                        firebase.auth().signInWithEmailAndPassword(req.body.e, old)
                        .then(valUser => {
                            user = firebase.auth().currentUser;
                            //Teniendo el objeto del usuario logueado procedemos a solicitar el cambio de contraseña 
                            //en la platafoma de google y despues realizamos la actualización de esta en la BD 
                            user.updatePassword(pass).then(function(sd) {
                                custUpdate = { $set: { pass:pass }}
                                Customers.updateOne({email:req.body.e},custUpdate)
                                .then(custUpdate => {
                                    res.status(201).send({sd,custUpdate,infoCode:null});
                                });
                            })
                            .catch(function(error) {
                                user.updatePassword(old).then(function(sd) {
                                    res.status(201).send({customer,infoCode:"Bob106"});
                                });
                            });
                        });
                    } 
                    else res.status(201).send({pass, infoCode:"Bob104"});
                }else res.status(201).send({pass, infoCode:"Bob103"});
            }
            else res.status(201).send({pass:"Password: "+pass+" Verificación: "+pass2, infoCode:"Bob102"});
        }
        //La contraseña que se intenta cambiar no coincide con la almacendad en la base de datos 
        else res.status(201).send({pass:old, infoCode:"Bob105"});
        
    });
})

//Actualiza los datos del cliente utilizado por el front de la tienda 
router.post('/update/info', (req, res) => {
    //Garantizo que el correo este bien formado
    var val = validator.validate(req.body.customer.email);
    if(val){
        //retiramos  de la clave espacios en blanco

        var user = firebase.auth().currentUser;
        if(user == null){
            console.log("ingrese cambio");
            // Update successful.  
            //Construimos el objeto a actualizar si no existen errores
            custUpdate = { $set: { 
                birhtday:req.body.customer.birhtday, 
                document:req.body.customer.document,
                email:req.body.customer.email,
                firstName:req.body.customer.firstName,
                lastName:req.body.customer.lastName,
                typeDocument:req.body.customer.typeDocument,
                sex:req.body.customer.sex,
                celPhone:req.body.customer.celPhone,
                alertWhatsapp:req.body.customer.alertWhatsapp
            } }
            
            //Verificamos si se esta solicitando cambio de correo ya que si se solicita este cambio hay que verificar que no exista 
            //asignado el correo a otro cliente 
            console.log(req.body.e+" !== "+req.body.customer.email);
            if(req.body.e !== req.body.customer.email){
                Customers.find({email:req.body.customer.email},{_id:1})
                .then(customer => {
                    //Si el correo que se quiere asignar ya existe en la base de datos se retorna el error ya que no es posible asignar
                    if(customer.length > 0) res.status(201).send({customer,infoCode:"Bob602"});
                    else{
                        Customers.updateOne({email:req.body.e},custUpdate)
                        .then(newCustomer => {
                            res.status(201).send({customer:req.body.customer,infoCode:null});                
                        });
                    }
                })
            }else{
                Customers.updateOne({email:req.body.e},custUpdate)
                .then(newCustomer => {
                    res.status(201).send({customer:req.body.customer,infoCode:null});
                });
            }      
        }     
    }else res.status(201).send({infoCode:"Bob601"});
});

//Funcion que permite agregar una nueva invitación para el cliente ya registrado 
//Este EndPoint es utilizado por la tienda 
router.post('/add/store', (req, res) => {
    var email = req.body.e.toLowerCase();
    var invi = req.body.i.replace(/ /gi,"");
    var arrStore = [];
    invi = invi.toUpperCase();
    Customers.find({email:email},{_id:1,stores:1})
    .then(customer => {
        Stores.find({"invitation":invi})
        .then(findStore => {
            if(findStore.length > 0){
                //Verificamos si ya la invitación existe para evitar ingresarla de forma repetida
                var flag = true;
                customer[0].stores.forEach(val => {if(val == findStore[0]._id) flag =false; });
                if(flag){
                    customer[0].stores.push(findStore[0]._id);
                    var update = { $set: { stores:customer[0].stores}}
                    Customers.updateOne({email:email},update)
                    .then(upd => {
                        Stores.find(
                            {_id:{ "$in" : customer[0].stores}},
                            {_id:1,name:1,invitation:1,url:1,description:1}
                        )
                        .then(StoresNews => {
                            //Ordenamos la respuesta de las tiendas 
                            StoresNews.forEach(val => {
                                if(val._id == customer[0].stores[0]) arrStore.unshift(val);
                                else arrStore.push(val);
                            });
                            res.status(201).send({stores:arrStore,infoCode:null});
                        });
                    });
                }else res.status(201).send({i:req.body.i,infoCode:"Bob109"});
            }else{
                res.status(201).send({i:req.body.i,infoCode:"Bob108"});
            }
        });
    });
});

//Funcion que permite agregar ordenar colocando la Tienda seleccionada como principal
//Este EndPoint es utilizado por la tienda 
router.post('/default/store', (req, res) => {
    var email = req.body.e.toLowerCase();
    var stores = [];
    var arrStore = [];
    Customers.find({email:email},{_id:1,stores:1})
    .then(customer => {
        customer[0].stores.forEach(val => {
            if(val == req.body.store) stores.unshift(val);
            else stores.push(val);
        });

        var update = { $set: { stores:stores}}
        Customers.updateOne({email:email},update)
        .then(upd => {

            Stores.find(
                {_id:{ "$in":stores}},
                {_id:1,name:1,invitation:1,url:1,description:1}
            )
            .then(StoresNews => {
                //Ordenamos la respuesta de las tiendas 
                StoresNews.forEach(val => {
                    if(val._id == req.body.store){
                        arrStore.unshift(val);
                    } 
                    else arrStore.push(val);
                });

                res.status(201).send({stores:arrStore,infoCode:null});
            });

        });
    });
});

module.exports = router
const express = require('express')
const router = express.Router();
var moment = require('moment-timezone');

const Orders = require('../models/Orders.js');
const Groups = require('../models/Groups.js');
const Configs = require('../models/Configs.js');
const Stores = require('../models/Stores.js');
const Units = require('../models/Units.js');
const Taxes = require('../models/Taxes.js');
const Customers = require('../models/Customers.js');
const Products = require('../models/Products.js');
const PriceCalc = require("./functions/PriceCalc.js");
const Users = require('../models/Users.js');
var soap = require('soap');
const { route } = require('./Customers.js');

//Ruta ingreso por defecto
router.get('/', (req, res) => {
    res.send("hola Juan");
    //Orders.find()
    //.exec()
    //.then(x => res.status(200).send(x));
})

//Ruta busqueda de datos por id
router.get('/:id', (req, res) => {
    //res.send(req.params.id)
    Orders.findById(req.params.id)
    .exec()
    .then(function(response){
        res.status(200).send(response);
    });

    //.then(x => );
})
//cors(listAccess),

//Realizar una busqueda dentro de una Collection y retornar el cunjunto de registros resultado
router.post('/find', (req, res) => {

    //res.send("hola muncdo");
    
    var Vsorts = {};
    var Vfilters = {};
    var Registros = 0;
    
    //Recorremos todos los sort que se solicitan
    for(var s = 0; req.body.sorts[s]; s++) Vsorts[req.body.sorts[s].file] = req.body.sorts[s].value;
    
    //Recorremos todos los filtros que se piden
    if(req.body.filFile != "" && req.body.filValue != "") Vfilters[req.body.filFile] = new RegExp('^'+req.body.filValue,'i');    

    var rPerFind = 0;
    var NPages = 220;

    //Consultamos cuantos registros hacen parte de la busqueda solicitada 
    Orders.find(Vfilters).sort(Vsorts).count()
    .then(
        count => {
            rPerFind = count;
            NPages = Math.ceil(count/parseInt(req.body.limit));
        }
    );

    //Calculamos los registros que deveran ser excluidos en la paginacion de la consulta 
    const pageNumber = parseInt(req.body.pag);
    const nPerPage = parseInt(req.body.limit);
    const skypPage = pageNumber>0?((pageNumber-1)*nPerPage):0;

    if(req.body.limit == "10000000")
        Orders.find(Vfilters).sort(Vsorts).skip(skypPage)
        .then(x => res.status(200).send({
            info:{
                RegPerFind:rPerFind,
                NumPages:NPages,
                limit:parseInt(req.body.limit),
                pag:parseInt(req.body.pag)
            },
            data:x
        }));
    else
        Orders.find(Vfilters).sort(Vsorts).skip(skypPage).limit(parseInt(req.body.limit))
        .then(x => res.status(200).send({
            info:{
                RegPerFind:rPerFind,
                NumPages:NPages,
                limit:parseInt(req.body.limit),
                pag:parseInt(req.body.pag)
            },
            data:x
        }));

});

//busca los registros que hacen parte de la orden para ser editados 
router.post('/find/edit', (req, res) => {
    var Vsorts = {};
    var Vfilters = {};
    
    //Recorremos todos los sort que se solicitan
    for(var s = 0; req.body.sorts[s]; s++) Vsorts[req.body.sorts[s].file] = req.body.sorts[s].value;

    //Recorremos todos los filtros que se piden
    if(req.body.filFile != "" && req.body.filValue != "") Vfilters[req.body.filFile] = new RegExp('^'+req.body.filValue,'i');    

    //Obtenemos todos los estatus existentes
    var resul = {}
    Orders.find(Vfilters).sort(Vsorts).then(function(response){
        resul["order"] = response;
        //var resp = JSON.parse(response);
        var dni = response[0].dni;
        var ref = [];

        //Creamos un vector con los numeros  de id  de las ordenes que hacen parte de la busqueda basica
        //con esto podemos buscar por documento de identidad y extraer estas ordenes para que no  se pinten 
        //de forma repetida. 
        response.forEach((val, key)=>{ ref[key] = val._id; });

        //bucamos todas las ordenes que este cliente ha pedido y le retiramos las que hacen parte de la busqueda basica.
        Orders.find({"dni":dni}).then(function(total){
            ref.forEach((info, item) => {
                total.forEach((val, key)=>{
                    //Si el id de la orden es igual a algun id de orden de busqueda basica la retiramos
                    if(""+val._id == ""+info._id){ total.splice(key, 1);}
                })
            });
            
            //Organizamos las ordenes por grupo de pedidos tipo arbol
            var history = {};
            total.forEach((val1, key1)=>{
                history[val1.order] = [];
                history[val1.order].push(val1);
                total.forEach((val2, key2)=>{
                    if(""+val1.order == ""+val2.order && key1 != key2){
                        history[val1.order].push(val2);
                        //total.splice(key2, 1);
                    }
                })
            });

            resul["history"] = history;
            
            Groups.find({"group":"StatusOrder","rol":parseInt(req.body.rol)}).sort({"level":"1"}).then(function(response){
                resul["status"] = response;
                Units.find({"rol":parseInt(req.body.rol)}).sort({"name":"1"}).then(function(response){
                    resul["units"] = response;
                    res.send(resul);
                })
            })

        });
    });

});

router.post('/edit/update', (req, res) => {
    var json = JSON.parse('{"'+req.body.file+'":"'+req.body.value+'"}');
    var id = req.body._id; 
    Orders.updateOne({_id:id},{$set: json}).then(function(response){
        var resp = JSON.parse('{"nModified":"'+response.nModified+'", "_id":"'+id+'", "file":"'+req.body.file+'", "value":"'+req.body.value+'"}');
        res.status(201).send(resp);
    });

});

//Creamos el objeto que sera utilizado como filtros de las tablas
router.post('/filters', function(req, res){
    
        var resul = {}
        Orders.distinct("brand").then(function(response){
            response.unshift('Todas las Marcas');
            var temp = [];
            response.map((val, index) =>  { temp[index] = val; });
            resul["brand"] = temp;
            Orders.distinct("store").then(function(response){
                response.unshift('Todas las Tiendas');
                var temp = [];
                response.map((val, index) =>  { temp[index] = val; });
                resul["store"] = temp;
                Orders.distinct("supplier").then(function(response){
                    response.unshift('Todos los Proveedores');
                    var temp = [];
                    response.map((val, index) =>  { temp[index] = val; });
                    resul["supplier"] = temp;
                    Orders.distinct("status").then(function(response){
                        var temp = [];
                        response.map((val, index) =>  { temp[index] = val; });
                        resul["status"] = temp;
                        res.send(resul);
                    });
                });
            });
        });

});

router.post('/', function(req, res){
    Orders.create(req.body)
    .then(x => res.status(201).send(x))
    .catch(x => res.status(401).send(x)); 
});

router.put('/:id', (req, res) => {
    Orders.findOneAndUpdate(req.params.id, req.body)
    .then(x => res.status(204).send(x));
})

router.delete('/:id', (req, res) => {
    Orders.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
})

//Busca las ordenes de un cliente este endPoint es utilizado por el front para visualizar la información de las 
//ordenes al cliente desde el area de clientes 
router.post('/customer/orders', (req, res) => {
    //idCustomer
    Customers.find({email:req.body.e})
    .then(customer => {
        Orders.find({idCustomer:customer[0]._id})
        .then(orders => {
            Configs.find({},{_id:0,stateTree:1,stateTracking:1})
            .then(configs => {
                res.status(201).send({orders, configs, infoCode:null});
            })
        })
    });
});

router.post('/payTC',(req, res) => {
    var arrSku = [];
    var subTotal = 0;
    var Total = 0;
    var Tax = 0;
    var statusFalse = [];
    var stockFalse = [];
    var panNum = req.body.infoTC.numTC.replace(/ /gi,"");

    Customers.find({email:req.body.e})
    .then(custom => {
        //Si no hay productos en el carrito de compra retornamos el error correspondiente
        if(custom[0].cart.length > 0){
            //construimos el objeto de carrito de compras con los sku para verificar disponibiliad y estado de todos los productos del carrito 
            custom[0].cart.forEach(val => { arrSku.push(val.sku) });

            //Recuperamos todos los productos que hacen parte del carrito de compra para verificar el estado y la cantidad 
            Products.find({sku:{ "$in" : arrSku}})
            .then(product => {
                product.forEach(val => {
                    if(!val.status) statusFalse.push(val.sku);
                    if(val.stock <= 0) stockFalse.push(val.sku);
                });
                //Retornamos un error en caso de que alguno de los productos se encuentre desactivado y fuera de inventario
                if(statusFalse.length > 0 || stockFalse.length >0) res.status(201).send({statusFalse, stockFalse, infoCode:"Bob501"});
                else{
                    Taxes.find().then(taxes => {
                        Stores.find({_id:custom[0].stores[0]}).then(store => {
                            Configs.find().then(config => {
                                
                                //Verificamos si los precios que estan en el carrito de compra son los equivalentes
                                var checkPrices = checkPricess(taxes, store, config, custom[0].cart,product,custom[0].bookAddress[0],req.body.shippingCost);
                                
                                //Si se retorna un codigo de error hay algun precio o costo de envío que no es correcto
                                if(checkPrices.infoCode != null){
                                    res.status(201).send({CheckPrice:checkPrices.CheckPrice, infoCode:checkPrices.infoCode});
                                }
                                else{
                                    //Creamos el codigo unico para el carrito de compra
                                    var date = new Date();
                                    var codOrde = moment.unix(date);
                                    var idStore = req.body.e.substring(0,2)+"-"+custom[0].stores[0].substring(0,3);
                                    codOrde = Math.random(custom[0].cart.length+codOrde)+"";
                                    codOrde = "ORD"+custom[0].bookAddress[0].state+codOrde.substring(4,6)+""+checkPrices.codeSku+codOrde.substring(8,10)+""+idStore;
                                    codOrde = codOrde.toUpperCase();
                                    
                                    //Identificamos el código de la franquisia y si la tarjeta permite pagos en nuestra plataforma 
                                    //Ya que la franquicia tiene que estar actividadaƒ
                                    var binEvaFranquicie = panNum.substring(0,2);
                                    var objTC = {};
                                    for(var f=0; f<config[0].franchise.length; f++){
                                        for(var k=0; k<config[0].franchise[f].bins.length; k++){
                                            if(config[0].franchise[f].bins[k] == binEvaFranquicie){
                                                objTC = config[0].franchise[f];
                                                f = 1000;
                                                break
                                            } 
                                        }
                                    }

                                    //Si la franquisia esta desactivada retornamos el error de franquisia ya que no se puede procesar el pago 
                                    if(!objTC.state) res.status(201).send({statusFalse, stockFalse, infoCode:"Bob504"});

                                    //Verificamos si existe en esta tienda restricciones de pago por Bines en el caso que sea de esta manera
                                    //retiramos los beneficios de descuento que se otorga y se mantiene el precio full 
                                    //Solo se realiza una exepción para las tarjetas de test configuradas 
                                    var bins = (store[0].bins.length > 4)? checkTC(store[0].bins, panNum,objTC):true;
                                    if(bins){
                                        subTotal = Math.round((checkPrices.TotalNew-checkPrices.taxCost)+checkPrices.shippingCost);
                                        Total = Math.round(checkPrices.TotalNew+checkPrices.shippingCost);
                                        Tax = Math.round(checkPrices.taxCost);
                                    }else{
                                        subTotal = Math.round((checkPrices.TotalOld-checkPrices.taxOldCost)+checkPrices.shippingCost);
                                        Total = Math.round(checkPrices.TotalOld+checkPrices.shippingCost);
                                        Tax = Math.round(checkPrices.taxOldCost);
                                    }

                                    var args = {
                                        USUARIO:config[0].userPay,
                                        CONTRASENA:config[0].passwordPay,
                                        PAN:parseInt(panNum),
                                        CVV2:parseInt(req.body.infoTC.cvvTC),
                                        MES_VEN:req.body.infoTC.monthTC,
                                        ANO_VEN:parseInt(req.body.infoTC.yearTC),
                                        NOMBRES:req.body.infoTC.nameTC,
                                        CEDULA:parseInt((!req.body.checkInfoTC)?req.body.infoTC.documentTTC:custom[0].bookAddress[0].document),
                                        TELEFONO:parseInt((!req.body.checkInfoTC)?req.body.infoTC.phoneTTC:custom[0].bookAddress[0].celPhone),
                                        DIRECCION:(!req.body.checkInfoTC)?req.body.infoTC.addressTTC:custom[0].bookAddress[0].address,
                                        CIUDAD:PriceCalc.getNameCity(custom[0].bookAddress[0].city),
                                        DEPARTAMENTO:PriceCalc.getNameState(custom[0].bookAddress[0].state),
                                        EMAIL:req.body.e,
                                        SUBTOTAL:subTotal,
                                        IMPUESTO:Tax,
                                        TOTAL:Total,
                                        CUOTAS:parseInt(req.body.infoTC.couteTC),
                                        REFPAGO:codOrde,
                                        FRANQUICIA:objTC.code,
                                    };
                                    
                                    //Llamamos al servicio de TC para registrar la transacción
                                    soap.createClient(config[0].urlPayTC, function(err, client) {
                                        client.PROCESAR_TRANSACCION(args, function(err, result) {
                                            console.log(codOrde);
                                            if(!result.return.item["ESTADO"]){
                                                res.status(201).send({info:result.return.item["Respuesta"]['$value'], infoCode:result.return.item["Id"]['$value']});
                                            }
                                            else{
                                                var valor = "";
                                                product.forEach((prodVal, item) => {
                                                    valor = addOrder(
                                                        result.return.item["ESTADO"]['$value'],
                                                        result.return.item["CODIGO_RESPUESTA"]['$value'],
                                                        result.return.item["IDREFERENCIA"]['$value'],
                                                        checkPrices,
                                                        custom,
                                                        prodVal,
                                                        config,
                                                        req.body,
                                                        args,
                                                        "TC",
                                                        objTC,
                                                        bins
                                                    ).then(val =>{
                                                        if(custom[0].cart.length == item+1){
                                                            if(checkAprove(result.return.item["CODIGO_RESPUESTA"]['$value'])){
                                                                cart = { $set: { "cart":[] } }
                                                                Customers.updateOne({"email":req.body.e},cart).then(cart => {
                                                                    res.status(201).send({order:codOrde, args:{
                                                                        subTotal:args.SUBTOTAL, 
                                                                        taxt:args.IMPUESTO, 
                                                                        shippingCost:checkPrices.shippingCost,
                                                                        total:args.TOTAL, 
                                                                        cuotes: args.CUOTAS,
                                                                        address:custom[0].bookAddress[0].address,
                                                                        city:PriceCalc.getNameState(custom[0].bookAddress[0].state)+", "+PriceCalc.getNameCity(custom[0].bookAddress[0].city),
                                                                    }, infoCode:"Bob505"});
                                                                });
                                                            }else res.status(201).send({infoCode:"Bob"+result.return.item["CODIGO_RESPUESTA"]['$value']});
                                                        }
                                                    });
                                                });
                                            }
                                        }); 
                                    });
                                } 
                            })
                        })
                    })      
                }
            });
        }else res.status(201).send({infoCode:"Bob507"});
    });
});

//Crea los diferentes productos dentro de la pagina de ordenes 
async function addOrder(status,codeStatus,idReferencie,checkPrices,custom,prodVal,config,body,args,paymentMethod,objT,bins){
     //construimos el objeto de carrito de compras con los sku para verificar disponibiliad y estado de todos los productos del carrito 
     var objCart;
     var tax = 0;
     var price = 0;
     var totalPay = args.TOTAL;
     var totalTax = args.IMPUESTO;
     var statusCode = 0;
     var statusText = '';

    //Identificamos cual es el producto del carrito de compra que estoy ingresando a la Orden
    //Recordar que se ingresa a la tabla de ordenes cada producto de forma independiente si la orden tiene 4 productos se ingresan 4 registros con el mismo codigo de orden
    //Esto lo hacemos para poder procesar la orden de forma independiente en caso de requerirse por la logistica. 
    for(var c = 0; c< custom[0].cart.length; c++){
        if(custom[0].cart[c].sku == prodVal.sku){
            objCart = custom[0].cart[c];
            break;
        }
    }

    //Verificamos el estado del pago de la transacción si es falso el estado code es 110 buscamos en el listado de estados 
    //como se denota este estado
    if(checkAprove(codeStatus)) statusCode = 110;
    else statusCode = 112;
    //Buscamos el nombre del estado 
    for(var st=0; st<config[0].stateTree.length; st++){
        if(config[0].stateTree[st].code == statusCode){
            statusText = config[0].stateTree[st].name;
            break;
        } 
    }

    //Determinamos si el precio que fue cobrado es con o sin descuento esto lo define la variable booleana bins. 
    for(var i=0; i<checkPrices.productPrice.length; i++){
        if(prodVal.sku == checkPrices.productPrice[i].sku){
            tax = (bins)? Math.round(checkPrices.productPrice[i].newTax):Math.round(checkPrices.productPrice[i].oldTax);
            price = (bins)? Math.round(checkPrices.productPrice[i].newPrice):Math.round(checkPrices.productPrice[i].oldPrice);
            //totalPay = (bins)? Math.round(checkPrices.TotalNew):Math.round(checkPrices.TotalOld);
            //totalTax = (bins)? Math.round(checkPrices.taxCost):Math.round(checkPrices.taxOldCost);
            break;
        }
    }

    var panNum = body.infoTC.numTC.replace(/ /gi,"");

    var obj = {
        status:statusText+"-"+status+"-"+codeStatus,
        statusCode,
        traking:210,
        order:args.REFPAGO,
        idRefPay:idReferencie,
        paymentMethod:paymentMethod,
        image:prodVal.images[0].url,
        infoTC:{
            franchise:objT.name,
            bins:panNum.substring(0,6)+"****"+panNum.substring(panNum.trim().length-4,panNum.trim().length),
            name:body.infoTC.nameTC,
            coute:body.infoTC.couteTC,
            cvv:body.infoTC.cvvTC,
            month:body.infoTC.monthTC,
            year:body.infoTC.yearTC,
            phone:(!body.checkInfoTC)?body.infoTC.phoneTTC:custom[0].bookAddress[0].celPhone,
            document:(!body.checkInfoTC)?body.infoTC.documentTTC:custom[0].bookAddress[0].document,
            address:(!body.checkInfoTC)?body.infoTC.addressTTC:custom[0].bookAddress[0].address,
            city:body.infoTC.cityTTC,
            state:body.infoTC.stateTTC
        },
        idCustomer:custom[0]._id+"",
        idStore:custom[0].stores[0],
        date:moment().tz("America/Bogota").format(),
        reference:prodVal.reference,
        code:prodVal.code,
        sku:prodVal.sku,
        skuName:prodVal.name,
        lot:objCart.alot,
        cost:prodVal.cost,
        pvp:prodVal.pvp,
        oldTax:Math.round(checkPrices.productPrice[i].oldTax),
        oldPrice:Math.round(checkPrices.productPrice[i].oldPrice),
        tax:tax,
        price:price,
        discount:Math.round(price - checkPrices.productPrice[i].oldTax),
        totalPay:totalPay,
        totalTax:totalTax,
        shipping:checkPrices.shippingCost,
        points:0,
        value:totalPay,
        discountName:"Page",
        customer:custom[0].firstName+" "+custom[0].lastName,
        dni:custom[0].document,
        phone:custom[0].bookAddress[0].celPhone,
        state:custom[0].bookAddress[0].state,
        city:custom[0].bookAddress[0].city,
        neighborhood:custom[0].bookAddress[0].neighborhood,
        address:custom[0].bookAddress[0].address,
        addAddress:custom[0].bookAddress[0].note,
        deliveryOnName:custom[0].bookAddress[0].lastName+" "+custom[0].bookAddress[0].firstName,
        deliveryDays:PriceCalc.Global.deliveryDays,
        guide:"",
        invoice:"",
        supplier:prodVal.idSupplier,
        brand:prodVal.nBrand,
        idBrand:prodVal.idBrand,
        idStore:custom[0].stores[0],
     }

    let timeoutObj = await Orders.create(obj).then(order => {
       return order;
    });

 }

//Chequea si el codigo retornado por el servicio esta dentro de los codigos de transacción Aceptada
function checkAprove(code){
    var ok = ["00","99",'000','003','006','002','004','005','007','008','009','08','11','76','77','78','79','80','81','PSE00'];
    for(var i=0; i< ok.length; i++) if(code == ok[i]) return true;
    return false;
}

//Cheque si el número de tarjeta de crédito se encuentra valida dentro del listado de bines de la entidad financiera dueña de la tienda
function checkTC(bins, pan, objTC){
    bins = bins.split(",");
    var subPan = ""+pan.substring(0,6);
    for(var i=0; i<bins.length; i++) if(subPan == bins[i]) return true;
    if(pan == objTC.testTrue.pan || pan == objTC.testFalse.pan) return true;
    return false;
}

//Funcion que permite chequiar si los precios del carrito se encuentran sin modificiaciones
function checkPricess(taxes, store, config, cart,products,address,shipping){
    var CheckPrice = [];
    var codeSku = "";
    var taxCost = 0;
    var taxOldCost = 0;
    var TotalNew = 0;
    var TotalOld = 0;
    var productPrice = [];

    var calc = {v1:config[0].protection,v2:config[0].maxMargin,v3:config[0].incentive,v4:store[0].fee,v5:store[0].discount};
     //Recorremos todos los productos para calcular en cada uno de estos el precio que devería tener
    products.forEach(prod => {
        var priceTmp = PriceCalc.getPrice(calc, prod.pvp, prod.cost, prod.idTax, taxes);

        for(var i=0; i<cart.length; i++){
            if(prod.sku == cart[i].sku){
                if(priceTmp.priceOld != cart[i].priceOld) CheckPrice.push(cart[i].sku);
                else if(priceTmp.newPrice != cart[i].newPrice) CheckPrice.push(cart[i].sku);
                else if(priceTmp.discountP != cart[i].discountP) CheckPrice.push(cart[i].sku);
                else if(priceTmp.dicountMarg != cart[i].dicountMarg) CheckPrice.push(cart[i].sku);
                taxCost += priceTmp.taxValue*cart[i].alot;
                taxOldCost += priceTmp.taxOldValue*cart[i].alot;
                TotalNew +=  priceTmp.newPrice*cart[i].alot;
                TotalOld += priceTmp.priceOld*cart[i].alot;
                codeSku += prod.sku.substring(3,4);
                productPrice.push({newTax:priceTmp.taxValue,newPrice:priceTmp.newPrice,sku:prod.sku,oldPrice:priceTmp.priceOld, oldTax:priceTmp.taxOldValue})
                break;
            }
        }
    });
                
    //Si hay algun precio que tuvo cambio se notifica el con el array de los sku que cambiaron en su precio
    if(CheckPrice.length > 0) return {CheckPrice, infoCode:"Bob502"}

    //Calculamos los costos de envío. 
    var shippingCost = PriceCalc.calcShipping(cart,address.state,address.city);
    if(shipping != shippingCost) return {CheckPrice, infoCode:"Bob503"}

    return {shippingCost, taxCost,TotalNew,codeSku:parseInt(codeSku),TotalOld, taxOldCost,  productPrice, infoCode:null};

}

module.exports = router
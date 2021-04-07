var whitelist = ['http://localhost:3000','https://backoffice-447b0.web.app/'];

module.exports = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  } 
}
module.exports=function(router, db, passport){
    router = require("./api.js")(router,db,passport);
    router = require("./auth.js")(router,db,passport)
    return router;
}
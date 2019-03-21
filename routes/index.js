module.exports=function(router, db, passport, nodeEnv){
    router = require("./api.js")(router,db,passport);
    router = require("./auth.js")(router,db,passport, nodeEnv)
    return router;
}
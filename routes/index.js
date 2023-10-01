const {patientRouter} = require("./patients");
const indexRouter = require("express").Router()


indexRouter.use('/patients', patientRouter)


exports.indexRoutes = indexRouter
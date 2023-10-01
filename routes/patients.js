const patientRouter = require("express").Router()
const { registerPatient, recordVisit, getPatientsByName, getAllPatients} = require("../controllers/patients");


patientRouter
    .route('/')
    .get(getPatientsByName)
    .post(registerPatient)

patientRouter
    .route('/all')
    .get(getAllPatients)

patientRouter
    .route('/:patientId')
    .post(recordVisit)


exports.patientRouter = patientRouter
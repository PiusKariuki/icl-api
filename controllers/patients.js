const {patientModel} = require("../models/patients");
const {vitalsModel} = require("../models/vitals");
const {healthReportModel} = require("../models/healthReport");


exports.getPatientsByName = async (req, res) => {
    try {
        const {fname, lname} = req.query


        const patients = await patientModel.find({
            $and: [
                {firstName: {"$regex": fname, "$options": "i"}},
                {lastName: {"$regex": lname, "$options": "i"}},
            ]
        })

        if (patients.length === 0)
            res.status(404).json({message: "no found"})
        else res.status(200).json(patients)
    } catch (e) {
        res.status(404).json(e.message)
    }
}

exports.getAllPatients = async (req, res) => {
    try {

        const vitals = await vitalsModel.aggregate([
            // Stage 1 sort the documents in descending order based on date created
            {$sort: {createdAt: 1}},
            // Stage 2: Group all vital records by patientId
            {
                $group: {
                    _id: "$patientId",
                    centimeters: {$last: "$centimeters"},
                    kilograms: {$last: "$kilograms"},
                    patientId: {$last: "$patientId"},
                    createdAt: {$last: "$createdAt"}
                },
            },
        ])

        const populatedVitals = await vitalsModel.populate(vitals, {
            path: "patientId",
            select: ["firstName", "lastName", "DOB", 'gender']
        })

        res.status(200).json(populatedVitals)
    } catch (e) {
        res.status(404).json(e.message)
    }
}


exports.registerPatient = async (req, res) => {
    try {
        // save basic patient info
        const patientObject = new patientModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            DOB: req.body.DOB,
            gender: req.body.gender
        })
        const savedPatient = await patientObject.save()

        // save vitals info
        const vitalsObject = new vitalsModel({
            patientId: savedPatient._id,
            date: req.body?.vitalsDate,
            centimeters: req.body?.centimeters,
            kilograms: req.body?.kilograms
        })

        const savedVitals = await vitalsObject.save()

        // save health report info
        const healthReportObject = new healthReportModel({
            vitalsId: savedVitals._id,
            date: req.body?.healthReportDate,
            generalHealth: req.body?.generalHealth,
            onDiet: typeof req.body?.onDiet === "boolean" ? req.body?.onDiet : null,
            onDrugs: typeof req.body?.onDrugs === "boolean" ? req.body?.onDrugs : null,
            comments: req.body?.comments
        })

        const savedHealthReport = await healthReportObject.save()

        res.status(201).json({patient: savedPatient, vitals: savedVitals, report: savedHealthReport})
    } catch (e) {
        res.status(422).json(e.message)
    }
}

exports.recordVisit = async (req, res) => {
    try {
        // save vitals info
        const vitalsObject = new vitalsModel({
            patientId: req.params.patientId,
            date: req.body?.vitalsDate,
            centimeters: req.body?.centimeters,
            kilograms: req.body?.kilograms
        })

        const savedVitals = await vitalsObject.save()

        // save health report info
        const healthReportObject = new healthReportModel({
            vitalsId: savedVitals._id,
            date: req.body?.healthReportDate,
            generalHealth: req.body?.generalHealth,
            onDiet: typeof req.body?.onDiet === "boolean" ? req.body?.onDiet : null,
            onDrugs: typeof req.body?.onDrugs === "boolean" ? req.body?.onDrugs : null,
            comments: req.body?.comments
        })

        const savedHealthReport = await healthReportObject.save()

        res.status(201).json({vitals: savedVitals, report: savedHealthReport})
    } catch (e) {
        res.status(422).json(e.message)
    }
}
const {Schema, model} = require("mongoose")


const patientSchema = new Schema({
        /**
         * Fields
         */
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        DOB: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female']
        },
    },
    /**
     *   timestamps config
     */
    {
        timestamps: {
            createdAt: true, updatedAt: true
        }
    })

exports.patientModel = model('patient', patientSchema)

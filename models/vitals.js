const {Schema, model} = require("mongoose")

const vitalsSchema = new Schema({
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "patient",
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        centimeters: {
            type: Number,
            required: true
        },
        kilograms: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: true, updatedAt: true
        }
    }
)


exports.vitalsModel = model("vital", vitalsSchema)
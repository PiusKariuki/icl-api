const {Schema, model} = require("mongoose")

const reportSchema = new Schema({
    vitalsId: {
        type: Schema.Types.ObjectId,
        ref: "vital",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    generalHealth: {
        type: String,
        enum: ["good", "poor"],
        required: true
    },
    onDiet: {
        type: Boolean,
    },
    onDrugs: {
        type: Boolean,
    },
    comments: {
        type: String,
    }
}, {
    timestamps: {
        createdAt: true, updatedAt: true
    }
})

exports.healthReportModel = model('health report', reportSchema)
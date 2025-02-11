import mongoose from "mongoose";
import moment from "moment-timezone";

const registrationSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
    },
    teamSize: {
        type: String,
        required: true,
    },
    teamLeadName: {
        type: String,
        required: true,
    },
    teamLeadEmail: {
        type: String,
        required: true,
    },
    teamLeadPhone: {
        type: String,
        required: true,
    },
    teamLeadCourse: {
        type: String,
        required: true,
    },
    teamLeadYearOfStudy: {
        type: String,
        required: true,
    },
    teamLeadUPESStudent: {
        type: String,
        required: true,
        default: "Yes",
    },
    teamLeadCollegeName: {
        type: String,
        required: false,
        default: "UPES",
    },
    teamLeadSapID: {
        type: String,
        required: true,
    },
    teamLeadCSAMember: {
        type: String,
        required: true,
        default: "No",
    },
    teamLeadCSAID: {
        type: String,
        required: false,
        default: "-",
    },
    members: [{
        name: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        sapID: {
            type: String,
            required: false,
            default: "-",
        },
        csaID: {
            type: String,
            required: false,
            default: "-",
        }
    }],
    createdAt: {
        type: Date,
        default: () => moment().tz("Asia/Kolkata").toDate(),
        required: true,
    },
    updated_at: {
        type: Date,
        default: () => moment().tz("Asia/Kolkata").toDate(),
        required: false,
    },
});

const RegistrationModel = mongoose.model("Registration", registrationSchema, "registrations");

export default RegistrationModel;
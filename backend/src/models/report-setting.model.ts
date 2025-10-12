import mongoose from "mongoose";

export enum ReportFrequencyEnum {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY"
}

export interface ReportSettingDocument extends mongoose.Document {
    userID: mongoose.Types.ObjectId;
    frequency: keyof typeof ReportFrequencyEnum;
    isEnabled: boolean;
    nextReportDate?: Date;
    lastSentDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const reportSettingSchema = new mongoose.Schema<ReportSettingDocument>({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    frequency: {
        type: String,
        enum: Object.values(ReportFrequencyEnum),
        default: ReportFrequencyEnum.MONTHLY,
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: true,
        required: true
    },
    nextReportDate: {
        type: Date,
        required: true
    },
    lastSentDate: {
        type: Date,
    }   
}, {
    timestamps: true
});

const ReportSettingModel = mongoose.model<ReportSettingDocument>("ReportSetting", reportSettingSchema);
export default ReportSettingModel;
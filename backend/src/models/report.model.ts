import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export enum ReportStatusEnum {
    PENDING = "PENDING",
    SENT = "SENT",
    FAILED = "FAILED"
}

export interface ReportDocument extends Document {
    userId: mongoose.Types.ObjectId;
    period:string,
    sentDate: Date;
    status: keyof typeof ReportStatusEnum;
    createdAt: Date;
    updatedAt: Date;
};

const reportSchema = new Schema<ReportDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    period: {
        type: String,
        required: true
    },
    sentDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(ReportStatusEnum),
        default: ReportStatusEnum.PENDING,
        required: true
    },
}, {
    timestamps: true
});

const ReportModel = mongoose.model<ReportDocument>("Report", reportSchema);
export default ReportModel;
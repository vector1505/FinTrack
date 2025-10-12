import mongoose, { Schema } from "mongoose";
import { convertToCents, convertToDollars } from "../utils/format-currency.js";

export enum TransactionStatusEnum {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
}

export enum RecurringIntervalEnum {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
}

export enum TransactionTypeEnum {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
}

export enum PaymentMethodEnum {
    CASH = "CASH",
    CARD = "CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
    MOBILE_PAYMENT = "MOBILE_PAYMENT",
    AUTO_DEBIT = "AUTO_DEBIT",
    OTHER = "OTHER"
}

export interface TransactionDocument extends Document {
    userId: mongoose.Types.ObjectId;
    type: keyof typeof TransactionTypeEnum;
    title: string;
    amount: number;
    category: string;
    receiptUrl?: string;
    date: Date;
    recurringInterval?: keyof typeof RecurringIntervalEnum;
    nextRecurringDate?: Date;
    lastProcessedDate?: Date;
    isRecurring: boolean;
    description?: string;
    status: keyof typeof TransactionStatusEnum;
    paymentMethod: keyof typeof PaymentMethodEnum;
}

const transactionSchema = new Schema<TransactionDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        enum: Object.values(TransactionTypeEnum),
        required: true
    },amount: {
        type: Number,
        required: true,
        set: (value: number) => convertToCents(value),
        get: (value: number) => convertToDollars(value)
    },

    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    receiptUrl: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isRecurring: {
        type: Boolean,
        default: false,
    },
    recurringInterval: {
        type: String,
        enum: Object.values(RecurringIntervalEnum),
        default: null,
    },
    nextRecurringDate: {
        type: Date,
        default: null,
    },
    lastProcessedDate: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        enum: Object.values(TransactionStatusEnum),
        default: TransactionStatusEnum.PENDING,
    },
    paymentMethod: {
        type: String,
        enum: Object.values(PaymentMethodEnum),
        default: PaymentMethodEnum.CASH,
    }
},{
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true }
});

const TransactionModel = mongoose.model<TransactionDocument>("Transaction", transactionSchema);
export default TransactionModel;
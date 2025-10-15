import { NotFoundException, UnauthorizedException } from "../utils/app-error.js";
import type { RegisterSchemaType } from "../validators/auth.validator.js";
import UserModel from "../models/user.model.js";
import mongoose, { mongo } from "mongoose";
import ReportSettingModel, { ReportFrequencyEnum } from "../models/report-setting.model.js";

export const registerService = async (body: RegisterSchemaType) => {
    const {email} = body;

    const session = await mongoose.startSession();

    try {
        const result = await session.withTransaction(async() => {
            const existingUser = await UserModel.findOne({email}).session(session);
            if(existingUser) {
                throw new UnauthorizedException("User already exists");
            }

            const newUser = new UserModel({...body});
            await newUser.save({session});

            const ReportSetting = new ReportSettingModel({
                userID: newUser._id,
                frequency: ReportFrequencyEnum.MONTHLY,
                isEnabled: true,
                lastSentDate: null,
                nextReportDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
            });
            await ReportSetting.save({session});

            return newUser.omitPassword();
        });
        
        return result;
    } catch(error) {
        throw error;
    } finally {
        await session.endSession();
    }
}
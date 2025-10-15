import { NotFoundException, UnauthorizedException } from "../utils/app-error.js";
import type { LoginSchemaType, RegisterSchemaType } from "../validators/auth.validator.js";
import UserModel from "../models/user.model.js";
import mongoose, { mongo } from "mongoose";
import ReportSettingModel, { ReportFrequencyEnum } from "../models/report-setting.model.js";
import { signJwtToken } from "../utils/jwt.js";

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

export const loginService = async (body: LoginSchemaType) => {
    const {email, password} = body;

    const user = await UserModel.findOne({email});

    if(!user) {
        throw new NotFoundException("Email/password not found");
    }

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid) {
        throw new UnauthorizedException("Email/password not found");
    }

    const {token, expiresAt} = signJwtToken({userId: user.id});

    const reportSettings = await ReportSettingModel.findOne({userID: user.id},{_id: 1, frequency: 1, isEnabled: 1}).lean();

    return {
        user: user.omitPassword(),
        accessToken: token,
        expiresAt,
        reportSettings
    };
}
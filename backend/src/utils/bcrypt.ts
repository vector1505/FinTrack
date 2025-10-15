import bcrypt from "bcrypt"
import express from "express";

export const hashValue = async(value: string, saltRounds = 10) => {
    return await bcrypt.hash(value, saltRounds);
}

export const compareValue = async(value: string, hash: string) => {
    return await bcrypt.compare(value, hash);
}
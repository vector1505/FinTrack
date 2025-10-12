import { config } from "dotenv";
import "dotenv/config"

config({path : "../.env"})

const getEnv = (key:string, defaultValue?:string):string => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set and no default value provided.`);
    }
    return value;
}

export default getEnv;

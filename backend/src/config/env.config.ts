import getEnv from "../utils/get-env.js"

const envConfig = ()=>(
    {
        NODE_ENV : getEnv('NODE_ENV', 'development'),
        BASE_PATH: getEnv('BASE_PATH',"/api"),
        PORT : getEnv('PORT', '8000'),
        MONGODB_URI : getEnv('MONGODB_URI',"default"),

        JWT_SECRET : getEnv('JWT_SECRET',"secret_jwt"),
        JWT_EXPIRES_IN : getEnv('JWT_EXPIRES_IN',"15m") as string,

        JWT_REFRESH_SECRET : getEnv('JWT_REFRESH_SECRET',"secret_jwt_refresh"),
        JWT_REFRESH_EXPIRES_IN : getEnv('JWT_REFRESH_EXPIRES_IN',"7d") as string,

        GEMINI_API_KEY : getEnv('GEMINI_API_KEY',"default"),

        FRONTEND_ORIGIN : getEnv('FRONTEND_ORIGIN', 'http://localhost')
    }
);

export const Env = envConfig();
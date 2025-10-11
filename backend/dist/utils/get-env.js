const getEnv = (key, defaultValue) => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set and no default value provided.`);
    }
    return value;
};
export default getEnv;
//# sourceMappingURL=get-env.js.map
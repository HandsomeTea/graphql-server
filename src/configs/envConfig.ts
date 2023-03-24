interface EnvConfigType {
    NODE_ENV: 'development' | 'production' | 'test'
    SERVER_NAME: string
    PORT: string
    LOG_LEVEL?: 'all' | 'mark' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'off'
    TRACE_LOG_LEVEL?: 'all' | 'mark' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'off'
    DEV_LOG_LEVEL?: 'all' | 'mark' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'off'
    AUDIT_LOG_LEVEL?: 'all' | 'mark' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'off'
    DB_URL: string
}
const developConfig: EnvConfigType = {
    NODE_ENV: 'development',
    SERVER_NAME: 'personal server',
    PORT: '3004',
    LOG_LEVEL: 'all',
    TRACE_LOG_LEVEL: 'all',
    DEV_LOG_LEVEL: 'all',
    AUDIT_LOG_LEVEL: 'all',
    DB_URL: 'mongodb://127.0.0.1:27017/test'
};

export default <K extends keyof EnvConfigType>(env: K): EnvConfigType[K] => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return developConfig[env];
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return process.env[env];
};

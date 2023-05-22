const value = {
    port: process.env.SERVER_POST || 3066,

    DB_NAME: process.env.DB_NAME || 'tracker',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 3306,

    secretKey: process.env.JWT_SECRET || 'key@test',
}

module.exports = value
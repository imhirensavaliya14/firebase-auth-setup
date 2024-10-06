module.exports = {
    username: process.env.FASTSPRING_API_USERNAME,
    password: process.env.FASTSPRING_API_PASSWORD,
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
};
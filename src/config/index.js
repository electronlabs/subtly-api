const config = {
  port: process.env.PORT || 5000,
  aws: {
    accessKeyID: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

module.exports = config;

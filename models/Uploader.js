const cloudinary = require("cloudinary").v2;

const secrets = require("../config/secrets");

cloudinary.config(secrets.cloudinary);

module.exports = imagePath => {
  return new Promise((resolve, reject) => {
    return cloudinary.uploader.upload(imagePath, (error, result) => {
      if (result) return resolve(result.secure_url);

      return reject(new Error(error));
    });
  });
};

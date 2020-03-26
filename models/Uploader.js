const cloudinary = require("clodinary");

const secrets = require("../config/secrets");

cloudinary.config(secrets.cloudinary);

module.exports = imagePath => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imagePath, result => {
      if (result.secure_url) return resolve(result.secure_url);

      return reject(new Error("Error with cloudinary"));
    });
  });
};

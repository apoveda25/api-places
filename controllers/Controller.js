const slugify = require("../plugins/slugify");

class Controller {
  static paramsBuilderBody(validParams, body) {
    const params = {};

    validParams.forEach((param) => {
      if (body.hasOwnProperty(param)) {
        params[param] = body[param];
      }
    });

    return params;
  }

  static paramsBuilderFile(validParams, files) {
    const params = {};

    validParams.forEach((file) => {
      if (files.hasOwnProperty(file)) {
        params[`${file}Image`] = files[file].url;
      }
    });

    return params;
  }

  static setSlug(title) {
    const slug = slugify(title);

    return Controller.slugRandom(slug);
  }

  static slugRandom(slug, min = 1000, max = 9999) {
    return `${slug}-${Math.floor(Math.random() * (max - min) + min)}`;
  }
}

module.exports = Controller;

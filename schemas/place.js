const joi = require("joi");
module.exports.placeSchema = joi.object({
  place: joi
    .object({
      title: joi.string().required(),
      location: joi.string().required(),
      description: joi.string().required(),
      price: joi.number().min(0).required(),
    })
    .required(),
});

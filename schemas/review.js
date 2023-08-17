const joi = require("joi");
module.exports.reviewSchema = joi.object({
  review: joi
    .object({
      ratting: joi.number().min(1).max(5).required(),
      body: joi.string().required(),
    })
    .required(),
});

const { Testimonial } = require('../models/index');
const responseParser = require('../utils/responseFormatter');

module.exports.createTestimonial = async (body) => {
    try {
        const newTestimonial = await Testimonial.create({
            name: body.name,
            image: body.image,
            content: body.content
        });

        return responseParser({ statusCode: 201, object: newTestimonial });
    } catch (error) {
        return responseParser({ statusCode: 500, object: error });
    }
};

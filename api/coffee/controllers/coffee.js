const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Retrieve records.
   * @param {Array} ctx
   */
  async find(ctx) {
    let entities;

    if (ctx.query._q) {
      entities = await strapi.services.coffee.search(ctx.query);
    } else {
      entities = await strapi.services.coffee.find(ctx.query);
    }

    // Clean up returned relationship fields.
    return entities.map((entity) => {
      const coffee = sanitizeEntity(entity, { model: strapi.models.coffee });

      if (coffee.roast_level && coffee.roast_level.name) {
        const roastLevel = coffee.roast_level.name;

        delete coffee.roast_level;

        coffee.roast_level = roastLevel;
      }

      if (coffee.flavor_profile) {
        const flavor_profile = {};
        if (coffee.flavor_profile.name) {
          flavor_profile.name = coffee.flavor_profile.name;
        }

        if (coffee.flavor_profile.brief_description) {
          flavor_profile.brief_description =
            coffee.flavor_profile.brief_description;
        }

        delete coffee.flavor_profile;

        coffee.flavor_profile = flavor_profile;
      }

      if (coffee.roaster.logo) {
        let logo = coffee.roaster.logo;
        console.log(process.env);
        const baseUrl =
          process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : '';

        let cleanedLogo = {
          alt: logo.alternativeText,
          formats: {
            large: {
              url: logo.formats.large.url
                ? baseUrl + logo.formats.large.url
                : '',
            },
            medium: {
              url: logo.formats.medium.url
                ? baseUrl + logo.formats.medium.url
                : '',
            },
            small: {
              url: logo.formats.small.url
                ? baseUrl + logo.formats.small.url
                : '',
            },
            thumbnail: {
              url: logo.formats.thumbnail.url
                ? baseUrl + logo.formats.thumbnail.url
                : '',
            },
          },
        };

        delete coffee.roaster.logo;
        coffee.roaster.logo = cleanedLogo;
      }

      return coffee;
    });
  },
};

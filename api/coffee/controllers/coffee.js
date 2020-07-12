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
          flavor_profile['name'] = coffee.flavor_profile.name;
        }

        if (coffee.flavor_profile.brief_description) {
          flavor_profile['brief_description'] =
            coffee.flavor_profile.brief_description;
        }

        delete coffee.flavor_profile;

        coffee.flavor_profile = flavor_profile;
      }

      return coffee;
    });
  },
};

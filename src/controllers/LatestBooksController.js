const knex = require("../database");
const months = require("../utils/month_object");
const main_books = require("../utils/main_books");

module.exports = {
  async index(req, res, next) {
    try {
      const rentals = await knex("rent_controls").where({ deleted_at: null });

      const new_array = rentals.map((element) => {
        let month_rental = new Date(element.return_date);
        month_rental = month_rental.getMonth() + 1;
        // console.log(element.delivery_date, element.return_date);
        if (element.delivery_date > element.return_date) {
          return {
            month_rental,
            latest: { ...element },
          };
        }
        return {};
      });

      const new_month = { ...months() };
      new_array.forEach((month, index) => {
        if (new_array[index] && new_array[index].month_rental) {
          new_month[new_array[index].month_rental].latest.push(
            new_array[index].latest
          );
        }
      });

      const object_months = Object.values(new_month);

      const teste = main_books(object_months);

      return res.json({ months: teste });
    } catch (error) {
      next(error);
    }
  },
};

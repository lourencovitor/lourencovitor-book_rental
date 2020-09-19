module.exports = function (months) {
  return months.map((month) => {
    if (month.latest.length > 0) {
      const copies = [];
      month.latest.forEach((element) => {
        copies.push(element.copie_id);
      });
      return {
        ...month,
        copies,
      };
    }
    return month;
  });
};

module.exports = (sequelize, type) => {
  return sequelize.define(
    "catalogue_subcats",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      brand: {
        field: "subcategory",
        type: type.STRING
      },
      slug: {
        type: type.STRING
      }
    },
    {
      timestamps: false
    }
  );
};

// createdAt: {
//   field: "upload_date",
//   type: sequelize.DATE
// },
// updatedAt: {
//   field: "upload_date",
//   type: sequelize.DATE
// }

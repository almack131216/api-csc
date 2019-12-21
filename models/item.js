module.exports = (sequelize, type) => {
  return sequelize.define(
    "catalogue",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING,
      category: type.INTEGER,
      subcategory: type.INTEGER,
      detail_1: type.INTEGER,
      price: type.INTEGER,
      createdAt: {
        field: "upload_date",
        type: Date
      },
      updatedAt: {
        field: "upload_date",
        type: Date
      },
      catalogueSubcatId: {
        field: "subcategory",
        type: type.INTEGER
      }
    },
    {
      timestamps: true,
      freezeTableName: true
    }
  );
};

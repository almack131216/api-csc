module.exports = (sequelize, type) => {
  return sequelize.define(
    "catalogue",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status: type.INTEGER,
      name: type.STRING,
      slug: type.STRING,
      category: type.INTEGER,
      brand: {
        field: "subcategory",
        type: type.INTEGER
      },
      year: {
        field: "detail_1",
        type: type.INTEGER
      },
      createdAt: {
        field: "upload_date",
        type: Date
      },
      updatedAt: {
        field: "upload_date",
        type: Date
      },
      image: {
        field: "image_large",
        type: type.STRING
      }
    },
    {
      timestamps: true,
      freezeTableName: true
    }
  );
};

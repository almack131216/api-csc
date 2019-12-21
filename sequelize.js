const Sequelize = require("sequelize");
const BrandModel = require("./models/brand");
const ItemModel = require("./models/item");
const {
  DATABASE_NAME,
  USERNAME,
  PASSWORD,
  HOST,
  DIALECT
} = require("./constants");
const sequelize = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const Item = ItemModel(sequelize, Sequelize);
const Brand = BrandModel(sequelize, Sequelize);
// Brand has Many to Item
// Brand.hasMany(Item);
// sequelize.sync({ force: false }).then(() => {
//   console.log(`Database & tables created here!`);
// });
module.exports = {
  Brand,
  Item
};

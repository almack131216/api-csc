const Sequelize = require("sequelize");
const BrandModel = require("./models/brand");
const ItemModel = require("./models/item");
const ItemSoldModel = require("./models/itemSold");
const ItemDetailModel = require("./models/itemDetail");
const ItemSoldDetailModel = require("./models/itemSoldDetail");

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
const ItemSold = ItemSoldModel(sequelize, Sequelize);
const ItemDetail = ItemDetailModel(sequelize, Sequelize);
const ItemSoldDetail = ItemSoldDetailModel(sequelize, Sequelize);
const Brand = BrandModel(sequelize, Sequelize);

Brand.hasMany(Item, { foreignKey: "id" });
Item.belongsTo(Brand, { foreignKey: "brand" });
Brand.hasMany(ItemSold, { foreignKey: "id" });
ItemSold.belongsTo(Brand, { foreignKey: "brand" });

// Post.find({ where: { ...}, include: [User]})

// Brand has Many to Item
// Brand.hasMany(Item);
// sequelize.sync({ force: false }).then(() => {
//   console.log(`Database & tables created here!`);
// });
module.exports = {
  Brand,
  Item,
  ItemSold,
  ItemDetail,
  ItemSoldDetail
};

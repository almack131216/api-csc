const express = require("express");
const bodyParser = require("body-parser");
const {
  Brand,
  Item,
  ItemDetail,
  ItemSold,
  ItemSoldDetail
} = require("./sequelize");
const sitePort = 3000;

// INIT APP
const app = express();
app.use(bodyParser.json());
// restrict access to APIs

let ALLOWED_DOMAIN = `http://localhost:${sitePort}`;

let allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", `${ALLOWED_DOMAIN}`);
  res.header("Access-Control-Allow-Headers", `${ALLOWED_DOMAIN}`);
  next();
};
app.use(allowCrossDomain);

// ITEM PROPS
const qStatus = {
  forSale: 1,
  sold: 2
};
const qCat = {
  cars: 2,
  testimonials: 3,
  press: 4,
  news: 5
};

///////////////////////////////////////// GET ITEMS
// get ALL items
app.get("/api/items/all", (req, res) => {
  Item.findAll({
    where: { id_xtra: 0 },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Brand,
        required: true
      }
    ]
  }).then(items => res.json(items));
  //SELECT items.id,items.name,items.detail_1 AS year,items.upload_date AS image,brands.subcategory AS brandName FROM catalogue AS items LEFT JOIN catalogue_subcats AS brands ON items.subcategory=brands.id WHERE items.category=2 AND items.status=1 ORDER BY items.upload_date DESC
});
// get all items FOR SALE
// app.get("/images", (req, res) => {
//   Item.findAll({
//     where: { category: qCat.cars, status: qStatus.forSale },
//     order: [["createdAt", "DESC"]]
//   }).then(items => res.json(items));
// });
app.get("/api/items/for-sale", (req, res) => {
  Item.findAll({
    where: { id_xtra: 0, category: qCat.cars, status: qStatus.forSale },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Brand,
        required: true
      }
    ]
  }).then(items => res.json(items));
  //SELECT items.id,items.name,items.detail_1 AS year,items.upload_date AS image,brands.subcategory AS brandName FROM catalogue AS items LEFT JOIN catalogue_subcats AS brands ON items.subcategory=brands.id WHERE items.category=2 AND items.status=1 ORDER BY items.upload_date DESC
});
// get all items[SOLD]
app.get("/api/items/sold", (req, res) => {
  ItemSold.findAll({
    where: { id_xtra: 0, category: qCat.cars, status: qStatus.sold },
    order: [["createdAt", "DESC"]],
    limit: 300,
    include: [
      {
        model: Brand,
        required: true
      }
    ]
  }).then(items => res.json(items));
});
// get item detail by itemId
app.get("/api/item/:id", (req, res) => {
  ItemDetail.findOne({
    where: { id: req.params.id }
  }).then(item => res.json(item));
});
// get item detail[SOLD] by itemId
app.get("/api/item/sold/:id", (req, res) => {
  ItemSoldDetail.findOne({
    where: { id: req.params.id }
  }).then(item => res.json(item));
});
// get FEATURED items for homepage
app.get("/api/items/for-sale/featured", (req, res) => {
  Item.findAll({
    where: { category: qCat.cars, status: qStatus.forSale },
    order: [["createdAt", "DESC"]],
    limit: 7,
    include: [
      {
        model: Brand,
        required: true
      }
    ]
  }).then(items => res.json(items));
});
// get FEATURED items for homepage
app.get("/api/items/sold/featured", (req, res) => {
  ItemSold.findAll({
    where: { category: qCat.cars, status: qStatus.sold },
    order: [["createdAt", "DESC"]],
    limit: 7,
    include: [
      {
        model: Brand,
        required: true
      }
    ]
  }).then(items => res.json(items));
});
// get items FOR SALE by BRAND
app.get("/api/items/for-sale/:brand", (req, res) => {
  Item.findAll({
    where: {
      category: qCat.cars,
      subcategory: req.params.brand,
      status: qStatus.forSale
    },
    order: [["createdAt", "DESC"]]
  }).then(items => res.json(items));
});
// get items SOLD by BRAND
app.get("/api/items/sold/:brand", (req, res) => {
  ItemSold.findAll({
    where: {
      category: qCat.cars,
      subcategory: req.params.brand,
      status: qStatus.sold
    },
    order: [["createdAt", "DESC"]]
  }).then(items => res.json(items));
});

///////////////////////////////////////// GET BRANDS
// get all brands
app.get("/api/brands", (req, res) => {
  Brand.findAll({ order: [["brand", "ASC"]] }).then(brands => res.json(brands));
});

// get brand by id
app.get("/api/brand/:id", (req, res) => {
  Brand.findOne({
    where: { id: req.params.id }
  }).then(brand => res.json(brand));
});

// PRESS
app.get("/api/items/press", (req, res) => {
  Item.findAll({
    where: { id_xtra: 0, category: qCat.press, status: qStatus.forSale },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Brand,
        required: true
      }
    ]
  }).then(items => res.json(items));
  //SELECT items.id,items.name,items.detail_1 AS year,items.upload_date AS image,brands.subcategory AS brandName FROM catalogue AS items LEFT JOIN catalogue_subcats AS brands ON items.subcategory=brands.id WHERE items.category=2 AND items.status=1 ORDER BY items.upload_date DESC
});

// Create a Brand
// app.post("/api/brand", (req, res) => {
//   console.log(req.body);
//   Brand.create(req.body).then(brand => res.json(brand));
// });
// create a item
// app.post("/api/item", (req, res) => {
//   console.log("item==>", req.body);
//   Item.create(req.body).then(brand => res.json(brand));
// });

// get brand with his item list
// app.get("/api/brandHasManyItems/:id", (req, res) => {
//   let query;
//   query = Brand.findAll({
//     where: { id: req.params.id },
//     include: [{ model: Item }]
//   });
//   return query.then(brand => res.json(brand));
// });

///////////////////////////////////////// LISTENER
const port = 3002;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

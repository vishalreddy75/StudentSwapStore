const Item = require("../model/Item");

const getAllItems = async (req, res, next) => {
  let items;
  try {
    items = await Item.find();
  } catch (err) {
    console.log(err);
  }

  if (!items) {
    return res.status(404).json({ message: "No products found" });
  }
  // return res.status(200).json({ items });
  return res.render("allProducts.ejs",{Title:"Display All Items",AllItemsList:items});

};

const getYourItems = async (req, res, next) => {
  let items;
  try {
    const id = req.UserID;
    items = await Item.find({UserId:id});
  } catch (err) {
    console.log(err);
  }

  if (!items) {
    return res.status(404).json({ message: "No products found" });
  }
  // return res.status(200).json({ items });
  return res.render("yourProducts.ejs",{Title:"Display User Items",AllItemsList:items});

};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let item;
  try {
    item = await Item.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!item) {
    return res.status(404).json({ message: "No Item found" });
  }
  // return res.status(200).json({ item });
  return res.render("singleItem.ejs",{Title:"Display a Selected Product",N:item.itemName,U:item.postedBy,D:item.description,P:item.price,A:item.available,I:item.image});
};


const addItem = async (req, res, next) => {
  const { itemName, postedBy, description, price, available} = req.body;
  const UserId = req.UserID;
  const image = req.file.filename
  let item;
  try {
    item = new Item({
      UserId,
      itemName,
      postedBy,
      description,
      price,
      available,
      image
    });
    await item.save();
  } catch (err) {
    console.log(err);
  }

  if (!item) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  // return res.status(201).json({ item });
  return res.render("addProduct.ejs",{Title:"Add a Product",Usage:"Upload Product"});
}


const updateItem = async (req, res, next) => {
  const id = req.params.id;
  const UserId = req.UserID;
  const { itemName, postedBy, description, price,available} = req.body
  const image = req.file.filename
  let item;
  try {
    item = await Item.findByIdAndUpdate(id, {
      UserId,
      itemName,
      postedBy,
      description,
      price,
      available,
      image
    });
    item = await item.save();
  } catch (err) {
    console.log(err);
  }
  if (!item) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  // return res.status(200).json({ item });
  return res.render("updateProduct.ejs",{Title:"Update product details",id:req.params.id});
}

const deleteItem = async (req, res, next) => {
  const id = req.params.id;
  let item;
  try {
    item = await Item.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!item) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  // return res.status(200).json({ message: "Product Successfully Deleted" });
  return res.redirect("/items/user");
};

exports.getAllItems = getAllItems;
exports.addItem = addItem;
exports.getById = getById;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.getYourItems = getYourItems;
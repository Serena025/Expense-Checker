const categoryRouter = require("express").Router();
const db = require("../models");
const { Op } = require("sequelize");

const { Category, SubCategory } = db;

// Gets all the categories
categoryRouter.get("/", async (req, res) => {
  let categories = await Category.findAll();

  if (!categories) {
    res.status(404).json({
      message: `Could not retrieve categories`,
    });
  }

  res.status(200).json(categories);
});

// Gets an individual category by id
categoryRouter.get("/:id", async (req, res) => {
  let categoryID = Number(req.params.id);
  if (isNaN(categoryID)) {
    res.status(404).json({ message: `Invalid id "${categoryID}"` });
  } else {
    const category = await Category.findOne({
      where: { id: categoryID },
    });

    if (!category) {
      res
        .status(404)
        .json({ message: `Could not find category with id "${categoryID}"` });
    } else {
      res.json(category);
    }
  }
});

// Adds a new category
categoryRouter.post("/", async (req, res) => {
  let category = await Category.create(req.body);
  res.status(200).json(category);
});

// Update an existing category
categoryRouter.put("/:id", async (req, res) => {
  let categoryID = Number(req.params.id);
  if (isNaN(categoryID)) {
    res.status(404).json({ message: `Invalid id "${categoryID}"` });
  } else {
    const category = await Category.findOne({
      where: { id: categoryID },
    });

    if (!category) {
      res
        .status(404)
        .json({ message: `Could not find category with id "${categoryID}"` });
    } else {
      Object.assign(category, req.body);
      await category.save();
      res.json(category);
    }
  }
});

// Delete a category
categoryRouter.delete("/:id", async (req, res) => {
  let categoryID = Number(req.params.id);
  if (isNaN(categoryID)) {
    res.status(404).json({ message: `Invalid id "${categoryID}"` });
  } else {
    const category = await Category.findOne({
      where: { id: categoryID },
    });

    if (!category) {
      res
        .status(404)
        .json({ message: `Could not find category with id "${categoryID}"` });
    } else {
      await category.destroy();
      res.json(category);
    }
  }
});

// Gets all the subcategories for a given category
categoryRouter.get("/:category_id/subcategories", async (req, res) => {
  let categoryID = Number(req.params.category_id);
  if (isNaN(categoryID)) {
    res.status(404).json({ message: `Invalid Category id "${categoryID}"` });
  } else {
    let subcategories = await SubCategory.findAll({
      attributes: ["id", "name"],
      where: { category_id: categoryID },
    });

    if (!subcategories) {
      res.status(404).json({
        message: `Could not retrieve categories`,
      });
    }

    res.status(200).json(subcategories);
  }
});

// Gets an individual subcategory by id
categoryRouter.get("/:category_id/subcategories/:id", async (req, res) => {
  let categoryID = Number(req.params.category_id);
  let subcategoryID = Number(req.params.id);
  console.log(categoryID, subcategoryID);
  if (isNaN(categoryID)) {
    res
      .status(404)
      .json({ message: `Invalid category id "${req.params.category_id}"` });
  } else if (isNaN(subcategoryID)) {
    res
      .status(404)
      .json({ message: `Invalid subcategory id "${req.params.id}"` });
  } else {
    const subCategory = await SubCategory.findOne({
      where: { [Op.and]: [{ id: subcategoryID, category_id: categoryID }] },
    });

    if (!subCategory) {
      res.status(404).json({
        message: `Cound not find subcategory with id=${categoryID} and category_id=${subcategoryID}`,
      });
    } else {
      res.json(subCategory);
    }
  }
});

// Update an individual subcategory by id
categoryRouter.put("/:category_id/subcategories/:id", async (req, res) => {
  let categoryID = Number(req.params.category_id);
  let subcategoryID = Number(req.params.id);
  console.log(categoryID, subcategoryID);
  if (isNaN(categoryID)) {
    res
      .status(404)
      .json({ message: `Invalid category id "${req.params.category_id}"` });
  } else if (isNaN(subcategoryID)) {
    res
      .status(404)
      .json({ message: `Invalid subcategory id "${req.params.id}"` });
  } else {
    const subCategory = await SubCategory.findOne({
      where: { [Op.and]: [{ id: subcategoryID, category_id: categoryID }] },
    });

    if (!subCategory) {
      res.status(404).json({
        message: `Cound not find subcategory with id=${categoryID} and category_id=${subcategoryID}`,
      });
    } else {
      Object.assign(subCategory, req.body);
      await subCategory.save();
      res.json(subCategory);
    }
  }
});

// Add a new subcategory
categoryRouter.post("/:category_id/subcategories", async (req, res) => {
  let categoryID = Number(req.params.category_id);
  if (isNaN(categoryID)) {
    res.status(404).json({ message: `Invalid Category id "${categoryID}"` });
  } else {
    let subCategoryName = req.body.name;
    console.log(subCategoryName);
    let subCategory = await SubCategory.create({
      category_id: categoryID,
      name: subCategoryName,
    });
    console.log(subCategory);

    res.status(200).json(subCategory);
  }
});

// Delete a subcategory
categoryRouter.delete("/:category_id/subcategories/:id", async (req, res) => {
  let categoryID = Number(req.params.category_id);
  let subcategoryID = Number(req.params.id);
  console.log(categoryID, subcategoryID);
  if (isNaN(categoryID)) {
    res
      .status(404)
      .json({ message: `Invalid category id "${req.params.category_id}"` });
  } else if (isNaN(subcategoryID)) {
    res
      .status(404)
      .json({ message: `Invalid subcategory id "${req.params.id}"` });
  } else {
    const subCategory = await SubCategory.findOne({
      where: { [Op.and]: [{ id: subcategoryID, category_id: categoryID }] },
    });

    if (!subCategory) {
      res.status(404).json({
        message: `Cound not find subcategory with id=${categoryID} and category_id=${subcategoryID}`,
      });
    } else {
      await subCategory.destroy();
      res.json(subCategory);
    }
  }
});

module.exports = categoryRouter;

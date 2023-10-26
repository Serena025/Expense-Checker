const categoryRouter = require("express").Router();
const db = require("../models");

const { Category } = db;

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

module.exports = categoryRouter;

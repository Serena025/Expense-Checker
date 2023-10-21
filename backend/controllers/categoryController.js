const categoryRouter = require("express").Router();

// Gets the list of all category
categoryRouter.get("/", async (req, res) => {
  const categories = [
    {
      id: 1,
      name: "Housing",
    },
    {
      id: 2,
      source: "Travel",
    },
    {
      id: 3,
      name: "Food",
    },
    {
      id: 4,
      source: "Personal Care",
    },
  ];

  res.json(categories);
});

// Adds a new category

// Gets an individual category by id

// Route for updating a category

// Route for deleting a category

module.exports = categoryRouter;

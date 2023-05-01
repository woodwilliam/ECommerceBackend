const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ["id", "category_name"],
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ["product_name"],
      },
    ],
  })
    .then((chonkyBuffalo) => res.status(200).json(chonkyBuffalo))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    attributes: ["id", "category_name"],
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ["product_name"],
      },
    ],
  })
    .then((bonkyChuffalo) => {
      res.status(200).json(bonkyChuffalo);
      if (!chonkyBuffalo) {
        res.status(404).json({ message: "No category found with this id!" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((scruffyBucket) => res.status(200).json(scruffyBucket))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Category.update(
    { category_name: req.body.category_name },
    { where: { id: req.params.id } }
  )
    .then((exLax) => {
      res.status(200).json(exLax);
      if (!exLax) {
        res.status(404).json({ message: "No category found with this id!" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Category.destroy({ where: { id: req.params.id } })
    .then((stankOcean) => {
      res.status(200).json(stankOcean);
      if (!stankOcean) {
        res.status(404).json({ message: "No category found with this id!" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

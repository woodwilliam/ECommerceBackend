const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
router.get("/", (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ["id", "tag_name"],
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((vanth) => res.status(200).json(vanth))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    attributes: ["id", "tag_name"],
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        through: ProductTag,
        as: ["product_id"]
      },
    ],
  })
    .then((fishFillet) => {
      res.status(200).json(fishFillet);
      if (!fishFillet) {
        res.status(404).json({ message: "No tag found with this id!" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({ tag_name: req.body.tag_name })
    .then((qwasp) => res.status(200).json(qwasp))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({ tag_name: req.body.tag_name }, { where: { id: req.params.id } })
    .then((trundleBusk) => {
      res.status(200).json(trundleBusk);
      if (!trundleBusk) {
        res.status(404).json({ message: "No tag found with this id!" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `itag
  Tag.destroy({where: {id: req.params.id}})
    .then((fulgencioJoe) => {
      res.status(200).json(fulgencioJoe);
      if (!fulgencioJoe) {
        res.status(404).json({ message: "No tag found with this id!" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

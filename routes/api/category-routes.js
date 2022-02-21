const router = require('express').Router();
const { CANCELLED } = require('dns');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // GET all categories with associated products
  Category.findAll({include: Product})
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // GET category based on id
  Category.findOne({
    where: {id: req.params.id,},
    include: Product
   })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // CREATE a category (expects "category_name: ?")
  Category.create({ category_name: req.body.category_name})
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // UPDATE a category name based on the requested id
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {id: req.params.id}
    })
    .then(dbCategoryData => {
      if(!dbCategoryData) {
        res.status(404).json({ message: 'No category with this id'});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // DELETE a category with the requested id
  Category.destroy({ where: {id: req.params.id}})
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message: 'No category with this id'});
      return;
    };
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;

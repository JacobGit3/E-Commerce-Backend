const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // GET all tags with associated products
  Tag.findAll({include: Product})
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // GET tag based on id with associated products
  Tag.findOne({
    where: {id: req.params.id,},
    include: Product
   })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
    // CREATE a tag (expects "tag_name: ?")
    Tag.create({ tag_name: req.body.tag_name})
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // UPDATE a tag name based on the requested id (expects "tag_name: ?")
  Tag.update(
  {
    tag_name: req.body.tag_name
  },
  {
    where: {id: req.params.id}
  })
  .then(dbtagData => {
    if(!dbtagData) {
      res.status(404).json({ message: 'No tag with this id'});
      return;
    }
    res.json(dbtagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // DELETE a tag with the requested id
  Tag.destroy({ where: {id: req.params.id}})
  .then(dbtagData => {
    if(!dbtagData) {
      res.status(404).json({message: 'No tag with this id'});
      return;
    };
    res.json(dbtagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;

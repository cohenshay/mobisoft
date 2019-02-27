let express = require('express')
const router = express.Router();
let redis = require('../Controllers/RedisController')

//init list of products
router.get('/init', redis.init)

// get all products
router.get('/', redis.get_all_products)

// add a new product
router.post('/add', redis.add_product)

// delete a product
router.delete('/remove/:id', redis.delete_product)

// get a product by id
router.get('/:id', redis.get_product)

// update a product by id
router.put('/update/:id', redis.update_product)

module.exports = router;
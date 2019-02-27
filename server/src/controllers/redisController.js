const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);

exports.init = (req, res, next) => {
  const products = [
    {
      id: 1,
      category: 'Sporting Goods',
      price: '49.99',
      quantity: 12,
      name: 'football'
    }, {
      id: 2,
      category: 'Sporting Goods',
      price: '9.99',
      quantity: 15,
      name: 'baseball'
    }, {
      id: 3,
      category: 'Sporting Goods',
      price: '29.99',
      quantity: 14,
      name: 'basketball'
    }, {
      id: 4,
      category: 'Electronics',
      price: '99.99',
      quantity: 34,
      name: 'iPod Touch'
    }, {
      id: 5,
      category: 'Electronics',
      price: '399.99',
      quantity: 12,
      name: 'iPhone 5'
    }, {
      id: 6,
      category: 'Electronics',
      price: '199.99',
      quantity: 23,
      name: 'nexus 7'
    }
  ];

  products.forEach(element => {
    redisClient.hmset(element.id, [
      'category', element.category,
      'price', element.price,
      'quantity', element.quantity,
      'name', element.name
    ], (err, reply) => {
      if (err) {
        console.log(err)
      }
      console.log(reply)
    });
  });
  res.send('products added successfully')
}

exports.get_all_products = (req, res, next) => {
  let return_dataset = []

  redisClient.keys('*', (err, id) => {
    let multi = redisClient.multi()
    let keys = Object.keys(id)
    let i = 0

    keys.forEach((l) => {
      redisClient.hgetall(id[l], (e, o) => {
        i++
        if (e) { console.log(e) } else {
          temp_data = { 'id': id[l], 'data': o } //change
          return_dataset.push(temp_data)
        }

        if (i == keys.length) {
          res.send(return_dataset)
        }
      })
    })
  })
}

exports.add_product = (req, res, next) => {
  // post Parameters


  let id = req.body.id
  let category = req.body.category
  let price = req.body.price
  let quantity = req.body.quantity
  let name = req.body.name

  // make id the key and assign the id to the other Parameters
  redisClient.hmset(id, [
    'category', category,
    'price', price,
    'quantity', quantity,
    'name', name
  ], (err, reply) => {
    if (err) {
      console.log(err)  // callback to log errors
    }

    console.log(reply)  // log success message
    res.send('product added successfully') // response back to the client
  });
}



exports.delete_product = (req, res, next) => {
  // find key associated with the id and deletes it
  redisClient.del(req.params.id, (err, reply) => {
    if (err) {
      console.log(err)  // callback incase something goes wrong
    }

    console.log(reply)  // log success message
    res.send('product deleted successfully') // response back to the client
  })
}

exports.get_product = (req, res, next) => {
  // id from url Parameter
  let id = req.params.id

  // get all values associated with the key as id
  redisClient.hgetall(id, (err, obj) => {
    if (!obj) {
      res.send('product does not exist') // if no product is associated with that id/key return this
    } else {
      obj.id = id

      res.send(
         obj // if product is found return details
      )
    }
  })
}

exports.update_product = (req, res, next) => {
  // put Parameters
  let id = req.params.id
  let category = req.body.category
  let price = req.body.price
  let quantity = req.body.quantity
  let name = req.body.name

  // make id the key and assign the id to the other Parameters
  redisClient.hmset(id, [
    'category', category,
    'price', price,
    'quantity', quantity,
    'name', name
  ], (err, reply) => {
    if (err) {
      console.log(err)  // callback to log errors
    }

    console.log(reply)  // log success message
    res.send("product updated successfully") // response to client
  })
}
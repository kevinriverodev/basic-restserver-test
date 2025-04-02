const Route = require('express');
const { search } = require('../controllers/search');

const route = Route();

route.get('/:collection/:term', search);

module.exports = route;
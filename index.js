'use strict'

const Client = require('./lib/client')

exports.crearCliente = function (options) {
  return new Client(options)
}

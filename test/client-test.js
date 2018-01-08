'use strict'

const test = require('ava')
const senagram = require('../')
// const fixtures = require('./fixtures')

test('cliente', t => {
  const client = senagram.crearCliente()

  t.is(typeof client.getPicture, 'function')
  t.is(typeof client.getPicture, 'function')
  t.is(typeof client.guardarPicture, 'function')
  t.is(typeof client.likePicture, 'function')
  t.is(typeof client.listaPicture, 'function')
  t.is(typeof client.listaPicturePorTag, 'function')
  t.is(typeof client.guardarUsuario, 'function')
  t.is(typeof client.getUsuario, 'function')
  t.is(typeof client.autenticar, 'function')
})

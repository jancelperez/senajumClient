'use strict'

const test = require('ava')
const nock = require('nock')
const senagram = require('../')
const fixtures = require('./fixtures')

let options = {
  endpoints: {
    pictures: 'http://senagram.test/picture',
    users: 'http://senagram.test/user',
    auth: 'http://senagram.test/auth'
  }
}

test.beforeEach(t => {
  t.context.client = senagram.crearCliente(options)
})

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

test('getPicture', async t => {
  const client = t.context.client

  let imagen = toString(fixtures.getImagen())

  nock(options.endpoints.pictures)
  .get(`/${imagen.publicId}`)
  .reply(200, imagen)

  let result = await client.getPicture(imagen.publicId)

  console.log(result)

  console.log(typeof result)

  t.deepEqual(imagen, result)
})

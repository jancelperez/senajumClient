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

  let imagen = fixtures.getImagen()

  nock(options.endpoints.pictures)
  .get(`/${imagen.publicId}`)
  .reply(200, imagen)

  let result = await client.getPicture(imagen.publicId)

  t.deepEqual(imagen, result)
})

test('guardarPicture', async t => {
  const client = t.context.client

  // la ruta guardarPicture es segura por lo cual se crea un token
  // token es como una palabra clave que reconoce el endpoitn
  let token = 'xxx-xxx-xxx'
  let imagen = fixtures.getImagen()
  let newImagen = {
    src: imagen.url,
    description: imagen.description
  }
  // para enviar el header de autorizacion en el request se utiliza reqheaders que es una propiedad de nock
  // endpoints es la primer capa de seguridad.
  nock(options.endpoints.pictures, {
    reqheaders: {
      'Authorization': `Bearer ${token}`
    }
  })
  // post es por que la ruta es asegura
  .post('/', newImagen)
  // el status code 201 es la de entidad creada
  .reply(201, imagen)

  let result = await client.guardarPicture(newImagen, token)

  // garantizamos que la imagena es igual a resultado
  t.deepEqual(imagen, result)
})

test('likePicture', async t => {
  const client = t.context.client

  let imagen = fixtures.getImagen()

  imagen.liked = true
  imagen.likes = 1

  nock(options.endpoints.pictures)
  .post(`/${imagen.publicId}/like`)
  .reply(200, imagen)

  let result = await client.likePicture(imagen.publicId)

  t.deepEqual(imagen, result)
})

test('listaPicture', async t => {
  const client = t.context.client

  let imagenes = fixtures.getImagenes(3)

  nock(options.endpoints.pictures)
  .get('/List')
  .reply(200, imagenes)

  let result = await client.listaPicture()

  t.deepEqual(imagenes, result)
})

test('listaPicturePorTag', async t => {
  const client = t.context.client

  let imagenes = fixtures.getImagenes(3)
  let tag = 'sena'

  nock(options.endpoints.pictures)
  .get(`/tag/${tag}`)
  .reply(200, imagenes)

  let result = await client.listaPicturePorTag(tag)

  t.deepEqual(imagenes, result)
})

test('guardarUsuario', async t => {
  const client = t.context.client

  let usuario = fixtures.getUsuario()

  let newUsuario = {
    username: usuario.username,
    name: usuario.name,
    email: 'usuario@senagram.test',
    password: 's3n4'
  }

  nock(options.endpoints.users)
    .post('/', newUsuario)
    .reply(201, usuario)

  let result = await client.guardarUsuario(newUsuario)

  t.deepEqual(usuario, result)
})

test('getUsuario', async t => {
  const client = t.context.client

  let usuario = fixtures.getUsuario()

  nock(options.endpoints.users)
    .get(`/${usuario.username}`)
    .reply(200, usuario)

  let result = await client.getUsuario(usuario.username)

  t.deepEqual(usuario, result)
})

test('autenticacion', async t => {
  const client = t.context.client

  let credenciales = {
    username: 'Jancel',
    password: 's3n4'
  }

  let token = 'xxx-xxx-xxx'

  nock(options.endpoints.auth)
    .post('/', credenciales)
    .reply(200, token)

  let result = await client.autenticar(credenciales.username, credenciales.password)

  t.deepEqual(token, result)
})

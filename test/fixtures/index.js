'use strict'

const uuid = require('uuid-base62')

const fixtures = {
  getImagen () {
    let id = uuid.uuid()
    return {
      createAt: new Date().toString(),
      description: 'an #awesome picture with #tags #senagram',
      id: id,
      liked: false,
      likes: 0,
      publicId: uuid.encode(id),
      tags: ['awesome', 'tags', 'senagram'],
      url: `https://senagram.test/${uuid.v4()}.jpg`,
      userId: uuid.uuid()
    }
  },
  getImagenes (n) {
    let imagen = []
    while (n-- > 0) {
      imagen.push(this.getImagen())
    }

    return imagen
  },
  getUsuario () {
    return {
      id: uuid.uuid(),
      name: 'A random user',
      username: 'senagram',
      createAt: new Date().toString()
    }
  }
}

module.exports = fixtures

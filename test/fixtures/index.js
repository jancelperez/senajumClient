'use strict'

const uuid = require('uuid-base62')

const fixtures = {
  getImagen () {
    let id = uuid.uuid()
    return {
      description: 'an #awesome picture with #tags #senagram',
      tags: ['awesome', 'tags', 'senagram'],
      url: `https://senagram.test/${uuid.v4().jpg}`,
      likes: 0,
      liked: false,
      userId: uuid.uuid(),
      publicId: uuid.encode(id),
      id: id,
      createAt: new Date().toString()
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
      username: 'platzigram',
      createAt: new Date().toString()
    }
  }
}

module.exports = fixtures

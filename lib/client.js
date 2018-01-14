'use strict'

const request = require('request-promise')
const Promise = require('bluebird')

class Client {
  constructor (options) {
    this.options = options || {
      endpoints: {
        pictures: 'http://api.senagram.com/picture',
        users: 'http://api.senagram.com/user',
        auth: 'http://api.senagram.com/auth'
      }
    }
  }

  getPicture (id, callback) {
    let opts = {
      method: 'GET',
      uri: `${this.options.endpoints.pictures}/${id}`,
      json: true
    }

    return Promise.resolve(request(opts)).asCallback(callback)
  }

  guardarPicture () {}

  likePicture () {}

  listaPicture () {}

  listaPicturePorTag () {}

  guardarUsuario () {}

  getUsuario () {}

  autenticar () {}
}

module.exports = Client

'use strict'

const request = require('request-promise')
const Promise = require('bluebird')

class Client {
  constructor (options) {
    this.options = {
      endpoints: {
        pictures: 'http://localhost:5000',
        users: 'http://localhost:5001',
        auth: 'http://localhost:5002'
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

  guardarPicture (picture, token, callback) {
    let opts = {
      method: 'POST',
      uri: `${this.options.endpoints.pictures}/`,
      body: picture,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: true
    }

    return Promise.resolve(request(opts)).asCallback(callback)
  }

  likePicture (id, callback) {
    let opts = {
      method: 'POST',
      uri: `${this.options.endpoints.pictures}/${id}/like`,
      json: true
    }

    return Promise.resolve(request(opts)).asCallback(callback)
  }

  listaPicture (callback) {
    let opts = {
      method: 'GET',
      uri: `${this.options.endpoints.pictures}/List`,
      json: true
    }
    return Promise.resolve(request(opts)).asCallback(callback)
  }

  listaPicturePorTag (tag, callback) {
    let opts = {
      method: 'GET',
      uri: `${this.options.endpoints.pictures}/tag/${tag}`,
      json: true
    }
    return Promise.resolve(request(opts)).asCallback(callback)
  }

  guardarUsuario (usuario, callback) {
    let opts = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/`,
      body: usuario,
      json: true
    }

    return Promise.resolve(request(opts)).asCallback(callback)
  }

  getUsuario (username, callback) {
    let opts = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${username}`,
      json: true
    }

    return Promise.resolve(request(opts)).asCallback(callback)
  }
  autenticar (username, password, callback) {
    let opts = {
      method: 'POST',
      uri: `${this.options.endpoints.auth}/`,
      body: {
        username,
        password
      },
      json: true
    }

    return Promise.resolve(request(opts)).asCallback(callback)
  }
}

module.exports = Client

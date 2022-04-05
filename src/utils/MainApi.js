class MainApi {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
      method: 'GET',
    })
      .then(res => this._getResponseData(res));
  }

  createMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: movieData.country || ' ',
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        trailer: movieData.trailerLink || 'https://nikz.beatfilm.nomoredomains.rocks/404',
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN || ' ',
        image: 'https://api.nomoreparties.co' + movieData.image.url,
        thumbnail: 'https://api.nomoreparties.co' + movieData.image.formats.thumbnail.url,
        movieId: movieData.id.toString(),
      })
    })
      .then(res => this._getResponseData(res));
  }

  removeMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._getResponseData(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',

    })
      .then(res => this._getResponseData(res));
  }

  updateUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'email': email,
      })
    })
      .then(res => this._getResponseData(res));
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password
      })
    })
      .then(res => this._getResponseData(res));
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'password': password,
        'email': email
      })
    })
      .then(res => this._getResponseData(res));
  }

  signout() {
    return fetch(`${this._baseUrl}/signout`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._getResponseData(res));
  }

  checkIsLogin() {
    return fetch(`${this._baseUrl}/approve`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._getResponseData(res));
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.nikz.beatfilm.nomoredomains.rocks',
});

export default mainApi;

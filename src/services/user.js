import { authHeader } from "../helpers";

const config = {
  apiUrl: process.env.REACT_APP_API_URL
};

const getAll = ({ term = null, page = 1 }) => {
  const options = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' }
  };

  return fetch(`${config.apiUrl}/users?page=${page}${term ? `&term=${decodeURIComponent(term)}` : ""}`, options).then(handleResponse);
};

const getOne = (id) => {
  const options = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' }
  };

  return fetch(`${config.apiUrl}/users/${id}`, options).then(handleResponse);
};

const create = (user) => {
  const options = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ user })
  };

  return fetch(`${config.apiUrl}/users`, options).then(handleResponse);
};

const update = (user) => {
  const options = {
    method: 'PATCH',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ user })
  };

  return fetch(`${config.apiUrl}/users/${user.hashed_id}`, options).then(handleResponse);
};

const remove = (id) => {
  const options = {
    method: 'DELETE',
    headers: { ...authHeader(), 'Content-Type': 'application/json' }
  };

  return fetch(`${config.apiUrl}/users/${id}`, options).then(handleResponse);
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    // Credentials are invalid?
    if (response.status === 401) {
      // Hack, it should call signOut
      localStorage.removeItem('token');
      window.location.reload(true);
    }

    const error = data ? data.errors : response.statusText;
    return Promise.reject(error);
  }

  const result = { data };
  if (response.headers.get('X-Total-Pages')) {
    Object.assign(result, { totalPages: response.headers.get('X-Total-Pages') });
  }

  return result;
};

export const userService = {
  getAll,
  getOne,
  create,
  update,
  remove
};
const config = {
  apiUrl: process.env.REACT_APP_API_URL
};

const signIn = ({ email, password }) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${config.apiUrl}/sign_in`, options)
    .then(handleResponse)
    .then(data => {
      // It will allow to keep signed in between page refreshes
      // token does not have sensitive info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    });
};

const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const signUp = (user) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/sign_up`, options)
    .then(handleResponse)
    .then(data => {
      // Same thing as signIn, auto signIn User...
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    });
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    // Credentials are invalid?
    if (response.status === 401) {
      signOut();
      window.location.reload(true);
    }

    const error = data ? data.errors : response.statusText;
    return Promise.reject(error);
  }

  return { user: data, token: response.headers.get('Token') };
};

export const authService = {
  signIn,
  signOut,
  signUp
};
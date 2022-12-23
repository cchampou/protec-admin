class Auth {
  isAuthenticated = false;

  authenticate = (username: string, password: string): void => {
    console.log('Authenticating...', username, password);
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      return;
    }
    throw new Error('Invalid username or password');
  };
}

export default new Auth();

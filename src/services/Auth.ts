import Api from './Api';

class Auth {
  token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  authenticate = async (username: string, password: string) => {
    const { token } = await Api.login(username, password);
    if (token) {
      this.token = token;
      localStorage.setItem('token', token);
      return;
    }
    throw new Error('Invalid username or password');
  };

  logout = (): void => {
    this.token = null;
    localStorage.removeItem('token');
  };
}

export default new Auth();

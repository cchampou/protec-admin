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
    const {
      payload: { token },
    } = await Api.login(username, password);
    this.token = token;
    localStorage.setItem('token', token);
    return;
  };

  logout = (): void => {
    this.token = null;
    localStorage.removeItem('token');
  };
}

export default new Auth();

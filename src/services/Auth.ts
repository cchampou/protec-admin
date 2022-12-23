class Auth {
  token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  authenticate = (username: string, password: string): void => {
    if (username === 'admin' && password === 'admin') {
      this.token = '1234567890';
      localStorage.setItem('token', this.token);
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

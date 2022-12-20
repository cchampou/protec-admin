class Api {
  private static async fetch(path: string, options: RequestInit) {
    const url = `http://localhost:3000${path}`;
    const response = await fetch(url, options);
    return await response.json();
  }

  public static async getUsers() {
    try {
      return await this.fetch('/api/user', {
        method: 'GET',
      });
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  }

  public static async sendNotification() {
    try {
      await this.fetch('/api/notify', {
        method: 'POST',
      });
      console.info('Notification sent');
    } catch (error) {
      console.error('Failed to send notification', error);
    }
  }

  public static async importUsers(file: File) {
    try {
      const formData = new FormData();
      formData.append('csv', file);
      await this.fetch('/api/user/import', {
        method: 'POST',
        body: formData,
      });
      console.info('Users imported');
    } catch (error) {
      console.error('Failed to import users', error);
    }
  }
}

export default Api;

class Api {
  private static async fetch(path: string, options: RequestInit) {
    const url = `http://localhost:3000${path}`;
    const response = await fetch(url, options);
    return await response.json();
  }

  public static async getUsers() {
    try {
      return await this.fetch('/api/users', {
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
}

export default Api;

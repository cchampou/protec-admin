class Api {
  private static async fetch(path: string, options: RequestInit) {
    const url = `http://localhost:3000${path}`;
    const response = await fetch(url, options);
    const content = await response.json();
    if (!response.ok) {
      throw new Error(content.message);
    }
    return content;
  }

  public static async getUsers(): Promise<any> {
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
    const formData = new FormData();
    formData.append('csv', file);
    await this.fetch('/api/user/import', {
      method: 'POST',
      body: formData,
    });
  }

  public static async getEvents(): Promise<any> {
    try {
      return await this.fetch('/api/event', {
        method: 'GET',
      });
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  }

  public static createEvent(event: any) {
    return this.fetch('/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
  }
}

export default Api;

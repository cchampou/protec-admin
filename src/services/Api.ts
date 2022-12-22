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

  public static async getUser(id: string): Promise<any> {
    try {
      return await this.fetch(`/api/user/${id}`, {
        method: 'GET',
      });
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  }

  public static async inviteUser(userId: string) {
    try {
      await this.fetch(`/api/user/${userId}/invite`, {
        method: 'POST',
      });
      console.info('Invitation sent');
    } catch (error) {
      console.error('Failed to send invitation', error);
    }
  }

  public static async sendNotification(eventId: string, mode: string) {
    try {
      await this.fetch(`/api/event/${eventId}/notify/${mode}`, {
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

  public static async getEvent(id: string): Promise<any> {
    return await this.fetch(`/api/event/${id}`, {
      method: 'GET',
    });
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

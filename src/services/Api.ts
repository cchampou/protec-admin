import Auth from './Auth';

class Api {
  private static async fetch(path: string, options: RequestInit) {
    const url = `${import.meta.env.VITE_API_URL}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...(Auth.isAuthenticated
          ? { Authorization: `Bearer ${Auth.token}` }
          : {}),
      },
    });
    const content = await response.json();
    if (response.status === 401 && path !== '/api/auth/login') {
      Auth.logout();
      window.location.reload();
    }
    if (!response.ok) {
      throw new Error(content.message);
    }
    return content;
  }

  public static async login(email: string, password: string) {
    return this.fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  }

  public static async recoverPassword(email: string) {
    return this.fetch(`/api/auth/recover`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static async resetPassword(token: string, password: string) {
    return this.fetch(`/api/auth/reset`, {
      method: 'POST',
      body: JSON.stringify({ token, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
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

  public static async postUser(user: any) {
    return this.fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }

  public static async patchUser(id: string, user: any) {
    return this.fetch(`/api/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
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

  public static async sendNotification(
    eventId: string,
    mode: string,
  ): Promise<any> {
    return await this.fetch(`/api/event/${eventId}/notify/${mode}`, {
      method: 'POST',
    });
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

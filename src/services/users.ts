import { UserSchemaType } from '@/app/(private)/schema';
import { SignInType } from '@/app/(public)/schema';
import { IUserModel } from '@/data/users';
import { api } from '@/lib/axios';

export class UsersService {
  static readonly baseUrl = '/users';

  static async getUsers() {
    const response = await api.get<{ users: IUserModel[] }>(this.baseUrl);
    return response.data;
  }

  static async getUserById(id: string) {
    const response = await api.get<{ user: IUserModel }>(
      `${this.baseUrl}/${id}`,
    );
    return response.data;
  }

  static async createUser(body: UserSchemaType) {
    const response = await api.post<IUserModel>(this.baseUrl, body);
    return response.data;
  }

  static async updateUser(id: string, body: UserSchemaType) {
    const response = await api.put<IUserModel>(`${this.baseUrl}/${id}`, body);
    return response.data;
  }

  static async deleteUser(id: string) {
    const response = await api.delete(`${this.baseUrl}/${id}`);
    return response.data;
  }

  static async authenticate(body: SignInType) {
    const response = await api.post<{ user: IUserModel; accessToken: string }>(
      `${this.baseUrl}/authenticate`,
      body,
    );

    return response.data;
  }
}

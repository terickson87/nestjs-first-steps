export enum Role {
  User = 'user',
  Admin = 'admin',
}

export class User {
  name: string;
  roles: Role[];
}

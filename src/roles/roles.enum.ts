export enum Role {
  User = 'user',
  Admin = 'admin',
}

export class User {
  name: String;
  roles: Role[];
}
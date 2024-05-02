export enum Role {
  User = 'user',
  Admin = 'admin',
}

class User {
  name: String;
  roles: Role[];
}
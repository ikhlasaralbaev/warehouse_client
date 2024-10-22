export interface IPermission {
  id: number
  name: string
  action: string
  createdAt: string // or Date, depending on your usage
}

export interface IRole {
  id: number
  name: string
  createdAt: string
  permissions: IPermission[]
}

export interface IRoleDetails {
  id: number
  name: string
  createdAt: string
  permissions: Permission[]
  users: User[]
}

interface Permission {
  id: number
  name: string
  action: string
  createdAt: string
}

interface User {
  id: number
  email: string
  password: string
  role: string
  createdAt: string
  updatedAt: string
  roles: Role[]
}

interface Role {
  id: number
  name: string
  createdAt: string
}

export interface IRole {
  id: number
  name: string
  createdAt: string
}

export interface IEmployee {
  id: number
  email: string
  password: string
  role: string
  createdAt: string
  updatedAt: string
  roles: Role[]
}

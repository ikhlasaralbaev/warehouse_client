export interface ITeam {
  id: number
  fullName: string
  phone: string
  createdAt: string // Or Date if you intend to parse it as a Date object
}

export interface ICreateTeam {
  fullName: string
  phone: string
}

interface Product {
  id: number
  name: string
  price: number
  description: string | null
  quantity: number
  createdAt: string
  updatedAt: string
}

interface TransactionProduct {
  id: number
  quantity: number
  createdAt: string
  product: Product
}

interface User {
  id: number
  email: string
  password: string
  role: string
  createdAt: string
  updatedAt: string
}

interface Transaction {
  id: number
  totalAmount: number
  description: string
  createdAt: string
  updatedAt: string
  transactionProducts: TransactionProduct[]
  createdBy: User
}

export interface ITeamDetails {
  id: number
  fullName: string
  phone: string
  createdAt: string
  transactions: Transaction[]
}

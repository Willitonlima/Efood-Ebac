export interface Product {
  id: number
  nome: string
  descricao: string
  foto: string
  preco: number
  porcao?: string
}

export interface Restaurant {
  id: number
  titulo: string
  descricao: string
  capa: string
  tipo: string
  avaliacao: number
  destacado: boolean
  cardapio: Product[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  restaurantId: number | null
  restaurantName: string | null
}

export interface OrderState {
  confirmation: OrderConfirmation | null
  loading: boolean
  error: string | null
}

export interface OrderConfirmation {
  orderId?: string
  orderDate?: string
  delivery?: {
    receiver: string
    address: {
      description: string
      city: string
      zipCode: string
      number: number
      complement: string
    }
  }
  payment?: {
    card: {
      name: string
      number: string
      code: number
      expires: {
        month: number
        year: number
      }
    }
  }
  [key: string]: unknown
}

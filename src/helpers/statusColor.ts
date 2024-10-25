import { OrderStatus } from '@/services/order.service'

export const getStatusColor = (status: OrderStatus | '') => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'bg-warning'
    case OrderStatus.SUBMITTED:
      return 'bg-info'
    case OrderStatus.PROCESSING:
      return 'bg-primary'
    case OrderStatus.DELIVERED:
      return 'bg-success'
    case OrderStatus.COMPLETED:
      return 'bg-success'
    case OrderStatus.DELIVERY_FAILED:
      return 'bg-danger'
    case OrderStatus.CANCELED:
      return 'bg-danger'
    default:
      return 'bg-secondary'
  }
}

export const getOrderStatusLabel = (value: string): string | undefined => {
  return Object.keys(OrderStatus)
    .find((key) => OrderStatus[key as keyof typeof OrderStatus] === value)
    ?.toLocaleLowerCase()
}

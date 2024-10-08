export const formatCurrency = (price: string | undefined) => {
  if (price)
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      parseFloat(price)
    )
  else return ''
}

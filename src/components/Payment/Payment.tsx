declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IMP: any
  }
}

interface userDataInterface {
  name: string
  phone: string
}
export const onClickPayment = (
  cartItems: object,
  discountPrice: number,
  totalPrice: number,
  user: userDataInterface
) => {
  const { IMP } = window
  IMP.init(`${process.env.REACT_APP_IMP}`)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatName = (cartItems: any) => {
    return cartItems.length > 1
      ? `${cartItems[0].title} 외 + ${cartItems.length}`
      : `${cartItems[0].title}`
  }

  const data = {
    pg: `${process.env.REACT_PAYMENT_PG}`, // PG사
    pay_method: 'card', // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
    amount: totalPrice - discountPrice, // 결제금액
    name: formatName(cartItems), // 주문명
    buyer_name: user.name, // 구매자 이름
    buyer_tel: user.phone // 구매자 전화번호
  }
  IMP.request_pay(data, callback)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (response: any) => {
  const { success, error_msg } = response
  if (success) {
    alert('결제 성공')
  } else {
    alert(`결제 실패: ${error_msg}`)
  }
}

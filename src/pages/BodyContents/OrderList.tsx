import React, { useEffect, useState } from "react";
import {PaymentType, PaymentDetails} from 'components/interface/POS_interface';
import axiosInstance from "@axiosInstance";
import { userState } from 'utils/recoile';
import { useRecoilValue } from 'recoil';
import Board from 'components/Board/index';  // 경로를 실제 경로로 수정해주세요.

const OrderList: React.FC = () => {
  interface OrderIdType {
    orderId: string;
    status: string;
  }

  const user = useRecoilValue(userState);
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    fetchPayments();
    getAccesKey();
  }, [user]);

  const getAccesKey = () => {
    ///apiv2/users/getToken
        axiosInstance.post('/apiv2/users/getToken', {
          imp_key: import.meta.env.VITE_IMP_KEY,
          imp_secret: import.meta.env.VITE_IMP_SECRET,
      }, {
          baseURL: '',  // 이 호출에만 적용되는 baseURL
      })
    .then((response) => {
        const { access_token } = response.data.response;
        console.log(access_token)
        setToken(access_token);
        // Access token을 사용하여 결제 취소 요청을 보낼 수 있습니다.
    })
    .catch((error) => {
        console.error('Failed to get access token:', error);
    });
  }

  const cancelPayment = (access_token: string, order_id: OrderIdType) => {
    console.log(order_id)
    if(order_id.status == '취소'){
      alert('이미 취소되었습니다.')
      return false;
    }
    axiosInstance.post('/apiv2/payments/cancel', {
          imp_uid: order_id.orderId,
          reason: '테스트',
    }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        baseURL: '', 
    })
    .then((response) => {
        // alert(response.data.message);
        savePayment(order_id.orderId);
        console.log('Payment cancelled successfully:', response.data);
        
    })
    .catch((error) => {
        alert(error)
        console.error('Failed to cancel payment:', error);
    });
};

const savePayment = async (param:string) => {
    try {
        await axiosInstance.put(`/payment/${param}`, {orderId : param})
        .then((reponse)=> {
          fetchPayments()
        });
    } catch (error) {
        console.error('Menu update failed', error);
    }
};

  
  const fetchPayments = async () => {
    if (!user || !user.user_id) {
      setError("접근방법이 잘못되었습니다.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.get(`/payment/${user.user_id}`);
      setPayments(response.data);
    } catch (error) {
      setError("결제된 내역이 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const columnsData = [
    { field: 'orderId', headerName: '주문번호', width: 500, },
    { field: 'status', headerName: '결제상태', width: 150},
    { field: 'amount', headerName: '결제금액', width: 150},
    { field: 'paymentDate', headerName: '결제일', width: 300},
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Board
          title="상세내역"
          columnsData={columnsData}
          rows={payments}
          showSaveButton={true}
          saveButtonText={'결제취소'}
          saveButtonColor={'gray'}
          pageMaxrows={5}  // 원하는 페이지당 행의 수를 설정해주세요.
          onSave={(data) =>  cancelPayment(token, data) }  // 필요한 저장 로직을 추가해주세요.
        />
      )}
    </div>
  );
};

export default OrderList;

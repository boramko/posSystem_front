import { v4 as uuidv4 } from 'uuid';
import { userState } from 'utils/recoile';
import { useRecoilValue } from 'recoil';
import { PayButtonProps } from "./../../components/interface/POS_interface"
import CommonButton from 'components/Button';
import axiosInstance from '@axiosInstance';
import useEventError401 from 'components/hook/eventHook';

const PayButton: React.FC<PayButtonProps> = ({ selectedMenus, total, onPaymentSuccess}) => {
    var IMP = window.IMP;
    IMP.init('imp03688438');

    const user = useRecoilValue(userState); 
    const eventError401 = useEventError401();
    const names = selectedMenus.map(menu => menu.menu.name).join(', ')
    const Mid = 'INIBillTst';

    const paySave = (res:any, param:string) => {
      
        const datainfo = {
            transactionId : res.apply_num,
            orderId : param,
            status : '승인',
            amount : total ,
            paymentDetails : JSON.stringify(selectedMenus) ,
            payerName : user.user_name,
            payerId : user.user_id
        }
        try {
            axiosInstance.post("/payment", { datainfo }).then(data => {
                onPaymentSuccess();
            }).catch(error => {
                if (error.response) {
                    const status = error.response.status;
                    console.log(status);
                    if (status === 401) {
                      eventError401();
                    } else if (status === 500) {
                        console.error('500 서버 내부 오류입니다.');
                    } else {
                        console.error(`Unexpected Error: ${status}`);
                    }
                } 
            });
        } catch(error) {
            console.error('Synchronous error:', error);
        }
    }

    const requestPay = () => {
        const uniqueOrderId = uuidv4();
        IMP.request_pay({
            pg : `html5_inicis.${Mid}`,
            pay_method : "card", 
            merchant_uid: uniqueOrderId,
            name : names,
            amount : total,
            buyer_email : user.user_id,
            buyer_name : user.user_name,
            buyer_tel : "123",
        }, function (response: {
            error_msg(error_msg: any): unknown; success: any; 
}) {
            if(response.success){
                paySave(response,uniqueOrderId)
            }else{
                alert(response.error_msg);
            }
        });

        return false;
    }
    return (
        <CommonButton
        label="결제하기"
        onClick={()=> {
            requestPay()
        }}
        variant="Black"
        size="middle"
      />
    )
}

export default PayButton;
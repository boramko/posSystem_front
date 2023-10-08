import { atom } from 'recoil';
import {userType} from '../components/interface/POS_interface'
export const userState = atom<userType>({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: {
    user_seq: 0,
    user_id: '',
    user_name: '',
    user_password: '',
    user_regdate: new Date(),
    user_status: '',
  },// default value (aka initial value)
});

export const payState = atom({
  key: 'payState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

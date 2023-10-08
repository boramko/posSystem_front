import { useNavigate } from 'react-router-dom';
import showAlert from '../../utils/alteBound';

function useEventError401() {
  const navigate = useNavigate();

  const eventError401 = () => {
    localStorage.setItem("token", "");
    showAlert('로그인 세션이 끊혔습니다.')
    navigate('/login');
  }

  return eventError401;
}

export default useEventError401;

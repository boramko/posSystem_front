import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
};

const ProtectedRouter: React.FC<Props> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        // 로컬 스토리지에 토큰이 있는지 확인하고, 그 결과를 상태에 설정합니다.
        setIsAuthenticated(!!token);

        // 토큰이 없으면 로그인 페이지로 리다이렉트합니다.
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // isAuthenticated가 true일 때만 자식 컴포넌트를 렌더링합니다.
    return <>{isAuthenticated && children}</>;
};

export default ProtectedRouter;

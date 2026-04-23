import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/auth/authSlice';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (!user) {
            dispatch(getMe());
        }
    }, [dispatch]);

    return (
        <div style={{ minHeight: '100vh', background: '#f2f3fd' }}>
            <Outlet />
        </div>
    );
};

export default Layout;

import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function LoginRoute({ requiredPermission, children }) {
	const { userData } = useContext(AuthContext);

	if (userData.permission === 'admin') {
		return <Navigate to={`/${userData.permission}`} replace />;
	} else if (userData.permission === 'pm') {
		return <Navigate to={`/${userData.permission}`} replace />;
	}

	return children ? children : <Outlet />;
}

export default LoginRoute;

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/">ProfileMap</Link>
      </div>
      <div>
        <Link to="/" className="px-3">Home</Link>
        {!token && (
          <>
            <Link to="/login" className="px-3">Login</Link>
            <Link to="/signup" className="px-3">Sign Up</Link>
          </>
        )}
        {token && (
          <>
            {/* Optionally check for user role here */}
            {user && user.role === 'admin' && (
              <Link to="/admin" className="px-3">Admin Panel</Link>
            )}
            <button onClick={() => dispatch(logout())} className="px-3">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

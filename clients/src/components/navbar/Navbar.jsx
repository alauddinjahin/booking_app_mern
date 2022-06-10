import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import "./navbar.css"

const Navbar = () => {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginPage = ()=>{
    navigate('/login')
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <Link to={'/'} style={{ 
            color:'inherit', textDecoration:'none'
           }}>Ajbooking</Link>
        </span>
        
        {user ? user.username : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton" onClick={handleLoginPage}>Login</button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Navbar
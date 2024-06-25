import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


export default function Navbar() {

  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <div>
      <header>
        <div>
          
        </div>
        <div className="container">

          <Link to="/">
            <h1>Rahul's Fitness Club</h1>
          </Link>
         <nav>

        {user && (
          <div>
            <span className="email">{user.email}</span>
          <button onClick={handleClick} className="logout">Log Out</button>
        </div>
        )}

          {!user && 
          <div>
          <Link to="/login" className="login">Login</Link>
          <Link to="/signup" className="signup">SignUp</Link>
        </div>

          }
            
          </nav> 
          
        </div>


        <div>
        <hr
        style={{
          background:"red",
          color:"red",
          border:"red",
          height: '2px',
        }}
      />

        </div>
      </header>
    </div>
  );
}

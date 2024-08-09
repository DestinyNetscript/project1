import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
     <>
      <header>
        <div className="container">
          <navbar>
            <div className="menuLeft"> 
              <NavLink to="/"><h2 className="Logo">Accelerated Agency</h2></NavLink> 
            </div>
            <div className="admin">
              <NavLink to="/Form">Book A Demo</NavLink> 
            </div>
          </navbar> 
        </div>
      </header>
    </>
  );

}
export default Navbar; 
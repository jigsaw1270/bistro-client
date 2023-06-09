import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/Authprovider";
import { FaShoppingCart} from "react-icons/fa";
import useCart from "../../Hooks/useCart";



const Navbar = () => {
  const {user, logOut} = useContext(AuthContext);
  const {cart} = useCart();
  const handlelogout = () => {
    logOut()
    .then(()=>{})
    .catch(error => console.log(error));

  }



    const navOptions = <>
         <li> <Link to='/'>Home</Link></li>
         <li> <Link to='/menu'>Menu</Link></li>
         <li> <Link to='/order/salad'>Order</Link></li>
         <li> <Link to='/login'>Login</Link></li>
         <li>
          <Link to='/dashboard/mycart'>
          <button className="btn">
 <FaShoppingCart></FaShoppingCart>
  <div className="badge badge-secondary">+{cart?.length || 0}</div>
</button>
          </Link>
         </li>
      
   {
user ? <>
<button onClick={handlelogout} className="btn btn-active btn-ghost">Logout</button>
</> : <> 
<li><Link to='/login'>Login</Link></li>
</>
   }
    </>
    return (
        <>
           <div className="fixed z-10 max-w-screen-xl mx-auto text-yellow-200 bg-black navbar bg-opacity-30">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
       {navOptions}
      </ul>
    </div>
    <a className="text-xl normal-case btn btn-ghost" style={{fontFamily:'cinzel'}}><Link to="/">Bristo boss</Link> <br /> </a>
  </div>
  <div className="hidden navbar-center lg:flex">
    <ul className="px-1 menu menu-horizontal">
    {navOptions}
    </ul>
  </div>
  <div className="navbar-end">
  <div className="avatar">
  <p >{user?.displayName}</p>
  <div className="w-12 rounded-full">
    <img src={user?.photoURL} />
  </div>
</div>
  </div>
</div> 
        </>
    );
};

export default Navbar;
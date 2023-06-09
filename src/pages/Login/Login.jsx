import React, { useContext, useEffect,  useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/Authprovider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import GoogleSignIn from './GoogleSignIn';
import authgif  from '../../assets/others/authentication.gif'

const Login = () => {

  const [disabled, setDisabled] = useState(true);
  const {signIn} = useContext(AuthContext);
  const navigate  = useNavigate();
  const location = useLocation();

  const from =  location.state?.form?.pathname || "/" ;

useEffect( ()=>{
  loadCaptchaEnginge(6);
}, [])

const handleValidateCaptcha = (e) =>{
  const user_captcha_value = e.target.value;
  if(validateCaptcha(user_captcha_value)){
    setDisabled(false);

  }
  else{
    setDisabled(true);
  }
}

    const handlelogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
        .then(result =>{
          const user = result.user;
          console.log(user);
          Swal.fire({
            title: 'User Log in successful',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        });
        navigate(from,{replace: true});
    }
    return (
        <>
         <Helmet>
        <title>Login</title>
        
      </Helmet>
          <div className="min-h-screen bg-teal-400 " >
        <div className="flex-col hero-content md:flex-row-reverse" style={{ 
      backgroundImage: `url('./../../assets/others/authentication.png)` 
    }} >
          <div className="text-center lg:text-left md:w-1/2">
            <h1 className="text-5xl font-bold text-center text-white">Login now!</h1>
            <p className="py-6"> <img className='rounded-full' src={authgif} alt="" /></p>
          </div>
          <div className="max-w-sm shadow-2xl md:w-1/2 card bg-base-100">
            <form  onSubmit={handlelogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                <span className="label-text">Password</span>
               
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" />
               
              </div>
              <div className="form-control">
                <label className="label">
                  
                  <LoadCanvasTemplate />
                </label>
                <input onBlur={handleValidateCaptcha} type="text" name='recaptcha' placeholder="your text" className="input input-bordered" />
              
               
              </div>
              <div className="mt-6 form-control">
               
                <input disabled={disabled}  className="text-white bg-teal-400 btn" type="submit" value="Login" />
              </div>
            </form>
            <GoogleSignIn></GoogleSignIn>
            <p> <small>New here? <Link to="/signup">Create an account</Link></small></p>
          </div>
        </div>
      </div>
        </>
    );
};

export default Login;
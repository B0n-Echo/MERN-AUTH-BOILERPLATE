import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {ToastContainer, toast} from 'react-toastify';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'   //* dynamically change the button text
    });


    const {buttonText} = values;


    const signupForm = () => (
        <form>
            <div className="form-group">
                <lable className="text-muted">Name</lable>
                <input onChange={handleChange('name')}  type="text" className="form-control"/>
            </div>
          
            <div className="form-group">
                <lable className="text-muted">Email</lable>
                <input onChange={handleChange('email')}  type="email" className="form-control"/>
            </div>
          
            <div className="form-group">
                <lable className="text-muted">Password</lable>
                <input onChange={handleChange('password')}  type="password" className="form-control"/>
            </div>
            
            <div>
                <button className="btn btn-primary" onClick={clickSubmit()}>{buttonText}</button>
            </div>
        </form>
    );

    const handleChange = (name) => (event) => {
        // event.target.value;
    }

    const clickSubmit = (event) => {

    }

   return ( 
   <Layout>
        <ToastContainer  />
        <h1>SignUp</h1>
        {signupForm()}
    </Layout>
    )
}

export default Signup;
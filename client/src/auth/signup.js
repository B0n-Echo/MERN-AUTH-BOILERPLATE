import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'   //* dynamically change the button text
    });


    const {name, email, password, buttonText} = values; //* Desctructuring the button text


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
        setValues({...values, [name]: event.target.value});
    }

    const clickSubmit = (event) => {
        event.preventDefault();

        setValues({...values, buttonText: 'Submitting'});

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: {name, email, password}
        })
        .then((response) => {
            console.log(response);
            setValues({...values,name:'', email:'', password:'', buttonText: 'Submitted'});
            toast.success(response.data.message)
        })
        .catch(err => {
            console.log(err);
            setValues({...values,buttonText: 'Submit'});
            toast.error(err)
        })
    }

   return ( 
    <Layout>
    <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5 text-center">Signup</h1>
        {signupForm()}
    </div>
</Layout>
    )
}

export default Signup;
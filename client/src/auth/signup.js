import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {ToastContainer, toast} from 'react-toastify';

const Signup = () => {
   return ( <Layout>
        <ToastContainer  />
        <h1>SignUp</h1>
    </Layout>)
}

export default Signup;
import { React, useState } from 'react';
import styles from '../styles/login.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SignUpModal from './SignUpModal';
import Loading from './Loading';

function Login({ action }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false)
  const [activation, setActivation] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  // Combined state for both login and signup
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    instituteCode:'',
    password: '',
    confirmPassword: '' // only used for signup
  });

  // Handle input change for all fields dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Login action
  const login = async() => {
    const { email, password } = formData;
    if (!email || !password) {
      alert('Enter Credentials !!');
    }
    else{
      setShowLoading(true);
      let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/auth/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({Email:formData.email, Password:formData.password})
      })
      let res = await a.json();
      if (res.success === true) {
        localStorage.setItem('token',res.token);
        alert(res.message);
        setShowLoading(false);
        router.push(`/user/${res.URLID}`);
      }
      else if(res.success === false){
        alert("Wrong Email or Password !!");
      }
      else {
        alert("There is a problem, Please try again!");
      }
    }
  };

  const signUp = async() => {
    const { email, password, firstName, lastName, phone, instituteCode, confirmPassword } = formData;
    if (!email || !password || !firstName ||!lastName ||!phone ||!confirmPassword||!instituteCode) {
      alert('Enter All Credentials !!');
    }
    else{
      setShowLoading(true)
      let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/auth/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          FirstName: formData.firstName,
          LastName: formData.lastName,
          Email:formData.email,
          Phone:formData.phone,
          Password:formData.password,
          InstituteCode:formData.instituteCode
        })
      })
      let res = await a.json();
      if (res.success === true) {
        alert(res.message.user);
        alert(res.message.institute);
        setShowModal(true);
        setActivation(res.activationToken);
        setShowLoading(false)
      }
      else{
        alert(res.message);
        setShowLoading(false)
      }
    }
  }
  const receiveData = async (data) => {
 
      setShowLoading(true);
      let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/auth/user/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({token:activation, code:data})
      })
      let response = await request.json();
      if (response.success == true) {
        setShowLoading(false);
        alert('Successfully Registered!!');
        setShowModal(false);
        router.push('/user/login');
      } else {
        setShowLoading(false);
        alert(res.message);
      }
  }
  // JSX for login or signup fields
  const renderFields = () => {
    if (action === 'Log-In') {
      return (
        <div className={styles.fieldsDiv}>
          <input name='email' type='email' placeholder='Email' value={formData.email} onChange={handleChange} />
          <input name='password' type='password' placeholder='Password' value={formData.password} onChange={handleChange} />
          <p>If you have no account yet, <Link href={'/user/signup'}>Sign Up</Link></p>
          <button className={styles.submit} onClick={login}>{action}</button>
        </div>
      );
    } else {
      return (
        <div className={styles.fieldsDiv}>
          <div className={styles.dualInputs}>
            <input name='firstName' type='text' placeholder='Firstname' value={formData.firstName} onChange={handleChange} />
            <input name='lastName' type='text' placeholder='Lastname' value={formData.lastName} onChange={handleChange} />
          </div>
          <input name='phone' type='number' placeholder='Phone' value={formData.phone} onChange={handleChange} />
          <input name='email' type='email' placeholder='Email' value={formData.email} onChange={handleChange} />
          <input name='instituteCode' type='number' placeholder='Intitute Code' value={formData.instituteCode} onChange={handleChange} />
          <input name='password' type='password' placeholder='Password' value={formData.password} onChange={handleChange} />
          <input name='confirmPassword' type='password' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} />
          <button className={styles.submit} onClick={signUp}>{action}</button>
        </div>
      );
    }
  };

  return (
    <div className={styles.mainDiv}>
      {showModal && <SignUpModal sendCode={receiveData} />}
      {showLoading && <Loading/>}
      <div className={styles.loginBox}>
        <h2>Welcome Students</h2>
        <div className={styles.wrapperDiv}>
          {renderFields()}
        </div>
      </div>
      <Link href='/login' className={styles.loginLink}>Instittue Login</Link>
    </div>
  );
}

export default Login;

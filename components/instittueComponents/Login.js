import { React, useState } from 'react';
import styles from '../../styles/login.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SignUpModal from '../SignUpModal';
import Loading from '../Loading';
import SignUpInstituteModal from './SignUpInstituteModal';

function InstituteLogin({ action }) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false)
    const [activation, setActivation] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    // Combined state for both login and signup
    const [formData, setFormData] = useState({
        name:'',
        phone: '',
        email: '',
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
    const login = async () => {
        const { email, password } = formData;
        if (!email || !password) {
            alert('Enter Credentials !!');
        }
        else {
            setShowLoading(true)
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/auth/subadmin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ Email: formData.email, Password: formData.password })
            })
            let res = await a.json();
            if (res.success === true) {
                localStorage.setItem('subAdminToken', res.token);
                setShowLoading(false)
                alert(res.message);
                router.push('/subadmin/12');
            }
            else if (res.success === false) {
                alert("Wrong Email or Password !!");
                console.log(res.message);
            }
            else {
                alert("There is a problem, Please try again!");
            }
        }
    };

    const signUp = async () => {
        const { email, password, name, phone, confirmPassword } = formData;
        if (!email || !password || !name || !phone || !confirmPassword) {
            alert('Enter All Credentials !!');
        }
        else {
            setShowLoading(true)
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/auth/subadmin/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    Name: name,
                    Email: email,
                    Phone: phone,
                    Password: password,
                    PlanId:'None'
                })
            })
            let res = await a.json();
            if (res.success === true) {
                alert(res.message);
                setShowModal(true);
                setActivation(res.activationToken);
                setShowLoading(false)
            }
            else {
                alert(res.message);
            }
        }
    }
    const receiveData = async (data) => {

        setShowLoading(true);
        let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/auth/subadmin/activate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ token: activation, code: data })
        })
        let response = await request.json();
        if (response.success == true) {
            setShowLoading(false);
            alert('Successfully Registered!!');
            setShowModal(false);
            router.push('/login');
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
                    <p>If you have no account yet, <Link href={'/signup'}>Sign Up</Link></p>
                    <button className={styles.submit} onClick={login}>{action}</button>
                </div>
            );
        } else {
            return (
                <div className={styles.fieldsDiv}>
                    <input name='name' type='text' placeholder='Name' value={formData.name} onChange={handleChange} />
                    <input name='phone' type='number' placeholder='Phone' value={formData.phone} onChange={handleChange} />
                    <input name='email' type='email' placeholder='Email' value={formData.email} onChange={handleChange} />
                    <input name='password' type='password' placeholder='Password' value={formData.password} onChange={handleChange} />
                    <input name='confirmPassword' type='password' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} />
                    <button className={styles.submit} onClick={signUp}>{action}</button>
                </div>
            );
        }
    };

    return (
        <div className={styles.mainDiv}>
            {showModal && <SignUpInstituteModal sendCode={receiveData} />}
            {showLoading && <Loading />}
            <div className={styles.loginBox}>
                <h2>Welcome Institutes</h2>
                <div className={styles.wrapperDiv}>
                    {renderFields()}
                </div>
            </div>
            <Link href='/user/login' className={styles.loginLink}>User Login</Link>
        </div>
    );
}

export default InstituteLogin;

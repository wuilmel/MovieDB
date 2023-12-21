import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../Slices/usersApiSlice';
import { setCredentials } from '../Slices/authSlice';
import { toast } from 'react-toastify';
import '../Styles/LoginPage.css';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector ((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log('submit');
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            console.log(userInfo);
            navigate('/');
        } catch (err) {
            console.error("Error:", err);
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
    <div className="main-container">
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
            <h2 className="email">Email</h2>
                <input type="text" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
            <h2 className="email">Password</h2>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                {isLoading && <h2>LOADING......</h2>}
                <h3><button className="button" type='submit'>Login</button></h3>
                <h3>New User?<Link to ="/user/signup"><button className='button1'>Click here!</button></Link></h3>
                <h3><Link to ="/"><button className='button'>Go Back</button></Link></h3>
            </form>
        </div>
    </div>
    )
}

export default LoginPage;
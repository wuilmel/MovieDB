import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../Slices/usersApiSlice';
import { setCredentials } from '../Slices/authSlice';

const SignupPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector ((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log('submit');
        if (password !== confirmPassword) {
            toast.error('Password do not match');
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate('/');
            }catch (err) {
                console.error("Error:", err);
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="main-container">
            <div className="signup-container">
                <form onSubmit={submitHandler}>
                    <h2 className="name">Name</h2>
                        <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name}/>
                    <h2 className="email">Email</h2>
                        <input type="text" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                    <h2 className="password">Password</h2>
                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                    <h2 className="password">Password</h2>
                        <input type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmPassword}/>
                    {isLoading && <h2>LOADING......</h2>}
                    <h3><button type='submit'>Submit</button></h3>
                    <h3>Already have an account?<Link to ="/user/login">Log in</Link></h3>
                    <h3><Link to ="/">Go Back</Link></h3>
                </form>
            </div>
        </div>
    )
}

export default SignupPage;
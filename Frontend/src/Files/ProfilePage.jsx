import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../Slices/authSlice';
import { useUpdateUserMutation } from '../Slices/usersApiSlice';

const ProfilePage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const { userInfo } = useSelector ((state) => state.auth);

    const [updateProfile, {isLoading}] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.name, userInfo.email]);
    

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log('submit');
        if (password !== confirmPassword) {
            toast.error('Password do not match');
        } else {
            try{
                const res =await updateProfile({
                    _id: userInfo.id,
                    name,
                    email,
                    password,
                }).unwrap(); 
                console.log('Response:', res);
                dispatch(setCredentials({...res}));
                toast.success('Profile updated');
            }catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="main-container">
            <h1>Update Profile</h1>
            <div className="update-container">
                <form onSubmit={submitHandler}>
                    <h2 className="name">Name</h2>
                        <input type="text" placeholder="Enter your name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
                    <h2 className="email">Email</h2>
                        <input type="text" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                    <h2 className="password">Password</h2>
                        <input type="password" placeholder="Enter new password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                    <h2 className="password">Password</h2>
                        <input type="password" placeholder="Confirm new password" onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmPassword}/>
                    <h3><button type='submit'>Update</button></h3>
                    <h3><Link to ="/">Go Back</Link></h3>
                    {isLoading && <h2>LOADING......</h2>}
                </form>
            </div>
        </div>
    )
};

export default ProfilePage;
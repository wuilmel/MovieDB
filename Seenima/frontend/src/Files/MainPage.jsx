import "../Styles/Mainpage.css";
import SearchBar from "../Components/SearchBar";
import Trending from "../Components/Trending";
import Popular from "../Components/Popular";
import RandomBar from "../Components/RandomBar";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../Slices/usersApiSlice';
import { logout } from '../Slices/authSlice';

const Mainpage= () => {
    
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err){
            console.log(err);
        }
    }
    
    return (
        <div className="main">
                <div className="area1">
                    { userInfo ? (
                        <>
                        <NavDropdown title = {userInfo.name} id='username'>
                            <LinkContainer to='/user/profile'>
                                <NavDropdown.Item id='nav-item1' >
                                    Profile
                                </NavDropdown.Item>
                            </LinkContainer>
                                <NavDropdown.Item id='nav-item2' onClick={ logoutHandler }>
                                    Logout
                                </NavDropdown.Item>
                        </NavDropdown>
                        </>
                    ) : (
                        <>
                            <Link to ="/user/signup"><button className="buttons">Sign Up</button></Link>
                            <Link to ="/user/login"><button className="buttons">Login</button></Link>
                        </>
                    )}
                </div>
                <div className="area2">
                    <p className="title1">Welcome To Seenima</p>
                    <SearchBar/>
                </div>
            <div className="trending">
                <p className="title">Top-rate</p>
                <Trending/>
            </div>
            <div className="Popular">
                <p className="title">Popular</p>
                <Popular/>
            </div>
            <div className="Random-search">
                <div>
                    <p className="title">Find Something New...</p>
                </div>
                <div className="random-display">
                    <RandomBar/>
                </div>
            </div>
            <footer className="footer">
                <p>
                    &copy;
                    2023 Wuilmel Wu Wu
                </p>
            </footer>
        </div>
    );
}

export default Mainpage;
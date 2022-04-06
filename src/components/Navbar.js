import React from 'react'
import {Menu, Button} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logoutInitiate } from '../Redux/Actions/authAction'

export const Navbar = () => {
    const {currentUser} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSigout = () => {
        console.log('button clicked')
        if(currentUser){
             dispatch(logoutInitiate());
        }
    }
    return (
        <div style={{position: 'fixed', width:'100%', zIndex: '100'}}>
            <Menu mode='horizontal' id='navbar'>
                <Menu.Item key='home'>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key='login'>
                    <Link to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item key='signout' onClick={handleSigout}>
                    SignOut
                </Menu.Item>
            </Menu>
        </div>
        
    )
}

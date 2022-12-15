import React from 'react'
import { useNavigate, Link } from "react-router-dom";

const Home = (props) => {
    const navigate = useNavigate();
    let token = localStorage.getItem('userId') ? localStorage.getItem('userId') : ''

    const logout = async () => {
        localStorage.removeItem('userId')
        navigate('/')
        props.Logged(false)
    }
    return (
        <>
            {props.loggedIn ?
                <>
                    <Link to='/questions'><button>Play</button></Link>
                    <button onClick={logout}>Sign Out</button>
                </>
                :
                <>
                    <Link to='/login'><button>Sign In</button></Link>
                    <Link to='/singup'><button>Sign UP</button></Link>
                </>
            }
        </>
    )
}

export default Home
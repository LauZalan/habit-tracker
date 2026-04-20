import { Link } from "react-router-dom"

function Header() {

    return (
        <>
            <div>
                <Link to={'/'}><button>Home</button></Link>
                <Link to={'login'}><button>Login</button></Link>
                <Link to={'register'}><button>Register</button></Link>
                <Link to={'dashboard'}><button>Dashboard</button></Link>
                <Link to={'profile'}><button>Profile</button></Link>
                <Link to={'calendar'}><button>Calendar</button></Link>
            </div>
        </>
    )

}

export default Header
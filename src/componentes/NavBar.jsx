import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <div className='container'>
                <nav className="navbar fixed-top navbar-expand-lg bg-warning"> {/*fixed-top IMPORTANTE*/}
                    <div className="container-fluid">
                        <Link to={"./"}>
                            <p className="navbar-brand fs-4 text-primary"><span className='title'>Economy</span>Gestor</p>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div>
                            <Link to={"/login"}>
                                <button className='btn btn-success'>Login</button>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavBar
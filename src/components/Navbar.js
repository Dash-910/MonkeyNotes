import React from 'react'
import {Link} from "react-router-dom"
import { useLocation } from 'react-router-dom'

const Navbar=()=>{
    let location = useLocation();
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">MonkeyNotes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":" "}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"about":" "}`} to="/about">About</Link>
        </li>
      </ul>
      <form className='d-flex'>
        <Link className='btn btn-primary mx-1' to="/login" role="button">Login</Link>
        <Link className='btn btn-primary mx-1' to="/signup" role="button">Signup</Link>
      </form>
    </div>
  </div>
</nav>
    )
}

export default Navbar
import React from 'react'
import {Link} from "react-router-dom"
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Navbar=()=>{
    let location = useLocation();
    useEffect(()=>{
        console.log(location.pathname);
    },[location]);
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">MonkeyNotes</a>
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
    </div>
  </div>
</nav>
    )
}

export default Navbar
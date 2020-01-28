import React, { Component, createRef } from "react"
import { NavLink } from 'react-router-dom';

const menu = createRef() // Hace un document.getElementById en el DOM virtual de React
const toggleMenu = () => {
  menu.current.classList.toggle('active')
}


const tabs = JSON.parse(localStorage.getItem('options')) ? JSON.parse(localStorage.getItem('options')) : []

const removeToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('student_status')
    localStorage.removeItem('roles')
    localStorage.removeItem('courses')
    localStorage.removeItem('user')
    localStorage.removeItem('options')
    localStorage.removeItem('categories')
    window.location = '/'
}

const withLayout = (propValue) => (WrappedComponent) => {
    return class withLayout extends Component {

        render() {
            return (
                <>
                <div id="wrapper" className="active" ref={menu}>
                    <div id="sidebar-wrapper">
                        <ul id="sidebar_menu" className="sidebar-nav">
                            <li className="sidebar-brand">
                                <span id="menu-toggle" onClick={ () => toggleMenu()}>
                                Cuenta <i className="fas fa-bars"></i>
                                </span>
                            </li>
                        </ul>
                        <ul className="sidebar-nav" id="sidebar">
                            {
                                tabs.map(
                                    nav => <li key={nav.id}>
                                                <NavLink to={'/'+nav.client_url} exact>{nav.name}<i className="fas fa-user-shield"></i>
                                                </NavLink>
                                            </li>
                                )
                            }
                            <li>
                                <span style={{color: 'white', cursor: 'pointer'}} onClick={() => removeToken()}>Cerrar Sesión
                                </span>
                            </li>
                        </ul>
                    </div>
                        
                    <div id="page-content-wrapper" >
                        <div className="page-content inset">
                            <WrappedComponent {...this.props} />
                        </div>
                    </div>
                    
                </div>
                </>
            )
        }

    }
}

export default withLayout
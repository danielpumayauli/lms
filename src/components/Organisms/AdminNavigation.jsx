import React from 'react'
import { NavLink } from 'react-router-dom' 

const AdminNavigation = ({id}) => {
  return (
    <div id="course-sidebar" className="col-md-2 p-x-0 p-y-3">
        <ul className="list-unstyled">
            <li><NavLink exact to={ '/admin/courses' }>Cursos</NavLink></li>
            <li><NavLink to={ '/admin/users' }>Personas</NavLink></li>
            <li><NavLink to={ '/admin/programs' }>Programas</NavLink></li>
            <li><NavLink to={ '/admin/categories' }>Categorías</NavLink></li>
            <li><NavLink to={ '/admin/settings' }>Configuraciones</NavLink></li>
        </ul>
    </div>
  )
}

export default AdminNavigation

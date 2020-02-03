import React from 'react'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'

const CourseNavigation = ({id, options, is_student}) => {
  // TODO pendiente de pintar dinamicamente las opciones
  // console.log('es estudiante?',is_student)

    // Inicializando tooltips de bootstrap
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  // console.log(options)

  return (
    <div id="course-sidebar" className="col-md-2 p-x-0 p-y-3">
        <ul className="course-menu list-unstyled" style={{backgroundColor:'white', borderRadius: 10+'px'}}>

            { 
              options.map(function( option, index ) {
                if( is_student && (!option.visibility || option.alias === 'settings' )){
                  return null
                }
                return <li key={index} className="nav-item" style={{borderBottom: 1+ 'px solid #DCE3EE', padding: 5+'px'}}>
                    <NavLink { ...this} className="nav-link-text" exact={true} to={`/courses/${id}${(option.alias !== '' ? '/'+option.alias : '')}`}>
                      {option.name}
                      {
                        option.visibility === false ? <>&nbsp;<i className="far fa-eye-slash" data-toggle="tooltip" data-placement="left" title="No visible para estudiantes"></i></> : null
                      }
                    </NavLink>
                  </li>
                }
              ) 
            }
        </ul>
    </div>
  )
}

export default CourseNavigation

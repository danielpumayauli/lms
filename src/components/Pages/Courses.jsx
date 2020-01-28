import React from 'react'
import withLayout from '../HOC/withLayout'

const Courses = () => {
  return (
        <div className="row">
            <div className="col-md-6">
              <p className="well lead">LISTADO DE CURSOS!!!!!!</p> 
            </div>
            <div className="col-md-6">
              <p className="well lead">LISTADO DE CURSOS!</p> 
            </div>
        </div>
  )
}


export default  withLayout()(Courses) 

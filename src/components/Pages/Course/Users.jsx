import React, { useState, useEffect } from 'react'
import withLayout from '../../HOC/withLayout'
import CourseNavigation from '../../Organisms/CourseNavigation'
import withValidationCourse from '../../HOC/withValidationCourse'
import UsersTable from '../../Organisms/Course/UsersTable'
import Loader from '../../Organisms/Loader'
import Axios from 'axios'




const Users = ({match, name, options, is_student}) => {
  const head = [
    '#',
    'Nombres',
    'ID inicio de sesión',
    'ID SIS',
    'Rol',
    ''
  ]
  const [data, setData] = useState(null);

  useEffect(() => {
    
    const getData = () => {
      // Se consultan personas del curso
      const API_URL = process.env.REACT_APP_API_URL    
      Axios.get(`${API_URL}/courses/`+match.params.id+'/users')    
      .then(r => {
        if(r.data.success){
          setData(r.data.data.users); // esto cambia el estado del "data" y de inmediato se vuelve a ejecutar el render
        }else{
          console.log('Hubo un problema al cargar los cursos. Comuníquese con el administrador.')
        }
      })
      .catch(e => {
        console.log(e);
      })
    }
    getData();

  }, [match]);
  return (
      <>
        <div className="header pb-6 mr-top-fx">
          <div className="container-fluid">
              <div className="header-body">
                <div className="row align-items-center py-4">
                    <div className="col-lg-6 col-7">
                      <p className="d-inline-block mb-0 breat-fx"><i className="fa fa-folder-open text-info"></i> {name}</p>
                    </div>
                </div>
              </div>
          </div>
        </div>

        <div className="container-fluid mt--6">
          <div className="row">
              <CourseNavigation id={match.params.id} options={options} is_student={is_student}/>
              <div id="course-content" className="col-md-10 p-x-3 p-y-1">
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">                          
                      <input type="text" 
                            className="form-control" 
                            aria-label="Sizing example input" 
                            aria-describedby="inputGroup-sizing-default" 
                            placeholder="Buscar usuario" />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <select className="form-control" id="exampleFormControlSelect1">
                      <option>Todas las funciones</option>
                      <option>Alumno</option>
                      <option>Profesor</option>
                      <option>Coordinador</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    {
                      is_student 
                      ? null
                      : <button type="button" className="btn btn-primary">
                          <i className="fas fa-plus"></i> Agregar
                        </button>
                    }
                    
                  </div>
                </div>
                {/* Tabla de usuarios inscritos */}
                <div className="row">
                  <div className="col-md-12 table-responsive-sm">
                    {data ? <UsersTable head={head} body={data} is_student={is_student} /> : <Loader />}
                  </div>
                </div>
              </div>
          </div> 
        </div>
    </>
  )
}

export default  withLayout()(withValidationCourse()(Users)) 

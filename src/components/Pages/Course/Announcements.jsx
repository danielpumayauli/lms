import React, { useState, useEffect } from 'react'

import withLayout from '../../HOC/withLayout'
import CourseNavigation from '../../Organisms/CourseNavigation'
import withValidationCourse from '../../HOC/withValidationCourse'
import List from '../Course/Announcement/List'
import Axios from 'axios'
import Loader from '../../Organisms/Loader'

const Announcements = ({match, name, options, is_student}) => {

  const [scope, setScope] = useState({
    'announcements': null
  });

  useEffect(() => {
    console.log('Entró al useEffect')

    if(scope.announcements !== null) return

    console.log('iré al ajax')

    const API_URL = process.env.REACT_APP_API_URL

    const getAnnouncements = () => {
      Axios.get(`${API_URL}/courses/${match.params.id}/announcements`,{
        headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
      }).then(r => {
        if(r.data.success){
          setScope({
            ...scope,
            'announcements': r.data.data.data
          })
        }else{
          console.log('Ocurrió un error de Servidor')
        }
      })
      .catch(er => {
        console.log(er)
      })
    }

    getAnnouncements()

  },[match,scope])
  


  const printAdminButtons = () => {

    if(is_student) return null
    return <>
              <button type="button" className="btn btn-outline-dark">
                <i className="fas fa-plus"></i>
                &nbsp; Anuncio
              </button>
              &nbsp;
              <button type="button" className="btn btn-outline-dark">
                <i className="fas fa-cog"></i>
              </button>

          </>
  }




  // console.log('antes del return ', scope.announcements)
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
                <div className="col-md-3">
                  <div className="input-group mb-3">                          
                    <select className="custom-select" id="inputGroupSelect01">
                      <option defaultValue>Todo</option>
                      <option value="1">No Leído</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group mb-3">
                    <input type="text" 
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          placeholder="Buscar Anuncio" />
                  </div>
                </div>
                <div className="col-md-3">
                  { printAdminButtons() }                  
                </div>
              </div>
              {/* Contenido del Anuncio */}
              <div className="row">
                <div className="col-md-12" id="announcementsList">

                  {/* {
                    
                  } */}

                  {
                    scope.announcements ? ( scope.announcements.length > 0 
                      ? 
                      <List data={scope.announcements} is_student={is_student}/> 
                      : 
                      <p className="text-center"><br/>Aún no hay anuncios en este curso.</p> ) : <Loader />
                  }
                  
                </div>
              </div>
          </div>
      </div> 
    </div>





  </>
  )
}

export default  withLayout()(withValidationCourse()(Announcements)) 

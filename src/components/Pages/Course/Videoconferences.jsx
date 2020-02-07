import React from 'react'
import withLayout from '../../HOC/withLayout'
import CourseNavigation from '../../Organisms/CourseNavigation'
import withValidationCourse from '../../HOC/withValidationCourse'

const Videoconferences = ({match, name, options, is_student}) => {
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
              
              <div className="card" style={{minHeight: '500px'}}>
                <div className="card-body">
                  <h1>Videoconferencias</h1>
                  <div className="px-5">
                    <a href="https://zoom.us/rec/share/2-ZsN4Hh839IZrP9xRnbY6ECIYHGeaa8gHMW_KEFyE8EhATcakLMaf1NSnMewJIm?startTime=1580344275000" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-video-camera" aria-hidden="true"></i> Sesión 29-01-2020  
                    </a>
                  </div>
                </div>
              </div>
              
          </div>
        </div> 
      </div>



    </>
  )
}

export default  withLayout()(withValidationCourse()(Videoconferences)) 
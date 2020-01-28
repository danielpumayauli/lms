import React from 'react'
import withLayout from '../../HOC/withLayout'
import CourseNavigation from '../../Organisms/CourseNavigation'
import withValidationCourse from '../../HOC/withValidationCourse'

const Settings = ({match, name, options, is_student}) => {
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
              <div className="content-title m-x-auto">
                  Configuración
              </div>
              <p className="display-4">Configuración del curso</p>
              <p className="text-primary">This is where one might find all sorts of dashboard-y goodness...</p>
              <p className="text-success">Instead, you're seeing Lorem Gibson, which is cooler than Lorem Ipsum, but a little less cool than Lorem Jackson.</p>
              <p className="text-muted">Mostly, you'll find that I'm just finding excuses to use BS4's crazy cool classes...</p>
              <p className="text-danger">Don't be distracted by all of this filler. The cool stuff is in the sidebar nav!</p>
              
          </div>
        </div> 
      </div>



    </>
  )
}

export default  withLayout()(withValidationCourse()(Settings)) 
import React from 'react'
import withLayout from '../../HOC/withLayout'
import CourseNavigation from '../../Organisms/CourseNavigation'
import withValidationCourse from '../../HOC/withValidationCourse'
// import Table from '../../Organisms/WallTable'
// import Error from './Error';
// import Swal from 'sweetalert2';
// import Loader from '../../Organisms/Loader'
// import Axios from 'axios'
// import $ from 'jquery';


  const Announcements = ({match, name, options, is_student}) => {

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
                        MURO
                    </div>
                    
                    
                </div>
            </div> 
          </div>

        </>
  )
}

export default  withLayout()(withValidationCourse()(Announcements)) 
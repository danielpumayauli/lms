import React, { useState, useEffect } from 'react'


import withLayout from '../../HOC/withLayout'
import CourseNavigation from '../../Organisms/CourseNavigation'
import withValidationCourse from '../../HOC/withValidationCourse'

import ModuleCard from '../../Organisms/ModuleCard'
import Loader from '../../Organisms/Loader'
import Axios from 'axios'

const Course = ({match, name, options, is_student}) => {

  const [data, setData] = useState(null);
  useEffect(() => {

    const getModules = () => {
      console.log('en getModules')


      const API_URL = process.env.REACT_APP_API_URL

      Axios.get(`${API_URL}/courses/${match.params.id}/modules`,{
        headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
      }).then(r => {
        if(r.data.success){
          setData(r.data.data)

        }else{
          console.log('Ocurrió un error de Servidor')
        }
      })
      .catch(er => {
        console.log(er)
      })

    }

    getModules()

  }, [match]);

  const drawModules = () => {
    console.log(data)

    if(data.length > 0){
      return <div id="course-content" className="col-md-10 p-x-3 p-y-1">
                  <div className="row" style={{backgroundColor: ''}}>

                    {
                      data.map( (module, index) => <div key={index} className="col-md-3" >
                                                          <ModuleCard id={1} name={module.name} code={module.url_name} img={module.url_image} />
                                                    </div> )
                    }
                  </div>            
              </div>
    }else{
      return  <div className="col-md-10 p-x-3 p-y-1" style={{backgroundColor: 'white', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
              <p>Este curso aún no cuenta con contenido para mostrar</p>
              </div>
    }
    
  }

    console.log('antes del return')
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
            
          {data ? drawModules() : <Loader />}

        </div> 
      </div>

        


    </>
    )
  
}


export default  withLayout()(withValidationCourse()(Course)) 

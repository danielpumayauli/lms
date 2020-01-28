import React, { useState, useEffect } from 'react'
import withLayout from '../HOC/withLayout'
// import { Link } from 'react-router-dom'
import CourseCard from '../Organisms/CourseCard'
import Loader from "../Organisms/Loader"
import Axios from 'axios'


function Home() {

   const [board, setBoard] = useState(null);

   useEffect(() => {

      // console.log((showCategories+1), JSON.parse(localStorage.getItem('categories')).length)
    const msjDefault = <div className="text-center"><p>Usted aún no está inscrito en un curso en la plataforma.</p></div>
    const categories = JSON.parse(localStorage.getItem('categories')) ? JSON.parse(localStorage.getItem('categories')) : []
    const userId = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).id : null

    /* Construye un row de categoria con sus respectivos cursos */
    const makeTablero = (currentCategory, courses) => {
      console.log(courses)

      let content =  <div >
                        <div className="col-md-12">
                          <h4 className="text-primary">{ categories[currentCategory].name }</h4>
                        </div>

                        <div className="header pb-6 mr-top-fx">
                           <div className="container-fluid">
                              <div className="header-body">
                                 <div className="row align-items-center py-4">
                                    <div className="col-lg-6 col-7">
                                       <p className="d-inline-block mb-0 breat-fx"><i className="fa fa-folder-open text-info"></i> { categories[currentCategory].name } </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="container-fluid mt--6">
                           <div className="row">
                              {
                                 courses.map(function(course) {
                                    return categories[currentCategory].id === course.category_id
                                    ?

                                    <div className="col-md-3" key={course.id}>
                                          <CourseCard id={course.id} 
                                                      name={course.name} 
                                                      code={course.shortname} 
                                                      modules={course.tmp_modules} 
                                                      image={course.tmp_image}
                                                      professor={course.tmp_professor}/>

                                    </div>
                                    :
                                    null
                                 })
                              }
                           </div>
                        </div>

                        
                        {/* <hr/> */}
                        
                      </div>
      return content
    }

    const getCourses = () => {
      if( !JSON.parse(localStorage.getItem('categories')) || JSON.parse(localStorage.getItem('categories')).length === 0 ){
        // console.log('este usuario no está inscrito en algun curso')
        setBoard(msjDefault)
        return
      }

      if(localStorage.getItem('student_status') && localStorage.getItem('student_status') === 'true'){
        // console.log('es estudiante')
        setBoard(makeTablero(0,JSON.parse(localStorage.getItem('courses')))) // Se renderiza del localStorage

      }else{
        // console.log('no es estudiante') OK
        if( !JSON.parse(localStorage.getItem('courses')) || JSON.parse(localStorage.getItem('courses')).length === 0 ){
          // console.log('no existe courses en localstorage y se hara un axios')
          const API_URL = process.env.REACT_APP_API_URL

          Axios.get(`${API_URL}/users/${userId}/courses?category=`+categories[0].id)    
          .then(r => {
            if(r.data.success){
              localStorage.setItem('courses', JSON.stringify(r.data.data.courses))
              setBoard(makeTablero(0,r.data.data.courses));
            }else{
              console.log('Hubo un problema al cargar los cursos. Comuníquese con el administrador.')
            }
          })
          .catch(e => {
            console.log(e);
          })
        }else{
          // console.log('se llaman los cursos desde el localstorage y no se hara un axios')
          setBoard(makeTablero(0,JSON.parse(localStorage.getItem('courses')))) // Se renderiza del localStorage
        }        
      }      
    }
    getCourses();


   
  }, []);


  return (
    <>
    <div id ="board" className="term_group">

      {board ? board : <Loader />}

    </div>

    </>
  ) 
  
}

export default  withLayout()(Home) 













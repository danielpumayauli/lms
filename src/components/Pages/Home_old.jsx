import React, { useState, useEffect } from 'react'; 
import withLayout from '../HOC/withLayout'
import { Link } from 'react-router-dom'
import CourseCard from '../Organisms/CourseCard'
import Loader from "../Organisms/Loader"
import Axios from 'axios'

function Home() {
  // const [showCategories, setShowCategories] = useState(0);
  const [board, setBoard] = useState(null);


  useEffect(() => {
    // console.log((showCategories+1), JSON.parse(localStorage.getItem('categories')).length)
    const msjDefault = <div className="text-center"><p>Usted aún no está inscrito en un curso en la plataforma.</p></div>
    const categories = JSON.parse(localStorage.getItem('categories')) ? JSON.parse(localStorage.getItem('categories')) : []
    const userId = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).id : null
    
    /* Construye un row de categoria con sus respectivos cursos */
    const makeTablero = (currentCategory, courses) => {

      let content =  <div className="row" >
                        <div className="col-md-12">
                          <h4 className="text-primary">{ categories[currentCategory].name }</h4>
                        </div>
                        {
                          courses.map(function(course) {
                            return categories[currentCategory].id === course.category_id
                            ?
                            <div className="col-md-4" key={course.id} style={{marginBottom: 10+'px'}}>
                                     <Link to={"/courses/"+course.id}>
                                       <CourseCard name={course.name} code={course.shortname} />
                                     </Link>
                                   </div> 
                            :
                            null
                          })
                        }
                        <hr/>
                        {/* {
                          (JSON.parse(localStorage.getItem('categories')).length) > (showCategories+1)
                          ? 
                          <div className="col-md-12 text-center">
                            <button type="button" className="btn btn-primary" onClick={() => setShowCategories(showCategories + 1)}>
                              Ver periodo anterior
                            </button>              
                          </div>
                          : null
                        } */}
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
        // console.log('no es estudiante')
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
  }, []); // Pass empty array to only run once on mount.
  return (
    <>        
        <div className="row">
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-12">
                <h1 className="well lead">Tablero</h1>
                <hr/>
              </div>
            </div>
            <div id ="board">
              {board ? board : <Loader />}
            </div>            
          </div>
          <div className="col-md-2">
            <p>Columna 2</p>            
          </div>
        </div>
        
      </>
  ) 
  
}

export default  withLayout()(Home) 












import React, { useState, useEffect, createRef } from 'react'
import withLayout from '../../HOC/withLayout'
import CourseNavigation from '../../Organisms/CourseNavigation'
import withValidationCourse from '../../HOC/withValidationCourse'
import Loader from '../../Organisms/Loader'
import Table from '../../Organisms/Course/FilesTable'
import Axios from 'axios'
import FolderModal from '../Course/Folder/addFolderModal'


const Files = ({match, name, options, is_student}) => {

  // const [enable, setEnable] = useState(null)

  const [data, setData] = useState({
    'firstLoad': null,
    'containerId' : null,
    'countCreadosFlag': 0,
    'countCreados': 0,
    'folders': null
  })
  const fileInput = createRef()
  const aumentaFolders = () => {
    console.log('¡en funcion aumentaFolders! ', data)

    setData({
      ...data,
      'countCreados': data.countCreados + 1
    })

    

  }

  useEffect(() => {
    // prevenir ejecución
    if((data.firstLoad === true && data.countCreados === data.countCreadosFlag) || data.firstLoad === false) return

    console.log('iniciando el useEffect')

    const getFolders = () => {
      const API_URL = process.env.REACT_APP_API_URL
      Axios.get(`${API_URL}/courses/`+match.params.id+'/folders?container=true&root=true')
      .then(r => {
        if(r.data.success){
          setData({
            ...data,
            'firstLoad': true,
            'countCreadosFlag': data.countCreados,
            'containerId': r.data.data.containerId,
            'folders': r.data.data.folders}) // esto cambia el estado del "data" y de inmediato se vuelve a ejecutar el render
        }else{
          console.log('Hubo un problema al cargar los archivos. Comuníquese con el administrador.')
        }
      })
      .catch(e => {
        console.log(e)
        setData({
          ...data,
          'firstLoad': false})
      })
    }

    getFolders()
  
  },[match, data])

  const fileSelectedHandler = event => {

    let myFile = event.target.files[0]

    if(myFile){

      // Comparación en KB TODO traer de el backend
      if( (myFile.size/1024) < parseInt(process.env.REACT_APP_MAX_UPLOAD_FILE_KB)){
        const fd = new FormData()
        fd.append('file', myFile, myFile.name)
        fd.append('folder_id', data.containerId)

        const API_URL = process.env.REACT_APP_API_URL
        // console.warn('Si hay un file por subir al axios aqui...',fd, data.containerId)
        // window.open('http://127.0.0.1:8000/api/files/3')
        // document.execCommand('SaveAs',true,'http://127.0.0.1:8000/storage/cursos/1/course_files/5dcb35bf70825_03-banner-examen.jpg');
        Axios.post(`${API_URL}/courses/${match.params.id}/files`, fd)
        .then(r => {
          console.table(r.data)
        })
        .catch(e => {
          console.log(e)
        })
      }else{
        alert('Este archivo excede el límite permitido de 20 MB')
      }
      
    }else{
      console.log('no hay file x subir')
    }
  }

  const buttonsTeacher = () => {
    if(data.containerId){
      return <div className="col-md-3">
              <button type="button" className="btn btn-outline-dark h-auto" data-toggle="modal" data-target="#modalAddFolder" data-backdrop="static" data-keyboard="false">
                <i className="fas fa-plus"></i> Carpeta
              </button>
              &nbsp;
              
              <input style={{display: 'none'}} 
                      type="file" 
                      onChange={fileSelectedHandler}
                      ref={fileInput}/>

              <button type="button" className="btn btn-outline-dark h-auto" 
                onClick={() => fileInput.current.click()}>
                <i className="fas fa-arrow-up"></i> Cargar
              </button>
              {/* Ejemplo de boton de descarga forzosa desde API
              <a href="http://127.0.0.1:8000/api/files/3" download="prueba.jpg">
                Descarga
              </a> */}
            </div>
    }else{
      return null

    }
  }  

  console.log('¡¡¡¡ antes del return !!!')
  
  return (
        <div className="row">
          <div className="col-md-12">
            <h1 className="well lead course-name">{ name }</h1>
            <hr/>
          </div>
           
           <div className="col-md-12">
              <div className="container-fluid">
                <div className="row">
                    <CourseNavigation id={match.params.id} options={options} is_student={is_student}/>
                    <div id="course-content" className="col-md-10 p-x-3 p-y-1">
                        <div className="row">
                          {/* <div className="col-md-12">
                            <span>Mostrar Navegación aquí ></span>
                          </div> */}
                          <div className="col-md-3">
                            <div className="input-group mb-3">
                              <input type="text" 
                                    className="form-control h-auto" 
                                    placeholder="Buscar archivos" 
                                    aria-label="Buscar archivos" 
                                    aria-describedby="basic-addon2" />
                              <div className="input-group-append">
                                <button className="btn btn-outline-secondary h-auto" type="button">
                                <i className="fas fa-search"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            {/* Agregar botones con iconos */}
                                0 elementos seleccionados
                          </div>
                          { buttonsTeacher() }
                        </div>
                        <div className="row" style={{borderTop: '1px solid lightgrey', 
                                                      borderBottom: '1px solid lightgrey', 
                                                      minHeight: '20em'}}>
                          <div className="col-md-3" style={{borderRight: '1px solid lightgrey'}}>
                            AVENGERS
                          </div>
                          <div className="col-md-9">
                            <div className="row">
                              <div className="col-md-12">

                                {/* {data.folders ? 
                                <Table data={data.folders}/> 
                                : 
                                <Loader />} */}
                                {
                                  data.firstLoad === null ? <Loader /> : 
                                  (data.firstLoad ? <Table data={data.folders}/> : 
                                  <p>Este curso no tiene habilitada la creación de carpetas por el momento.</p>)
                                  
                                }

                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Modal de Agregar carpeta */}
                        
                        <FolderModal aumentaFolders={aumentaFolders} courseId={match.params.id} containerId={data.containerId}/>
                        

                        {/* Fin modal */}

                    </div>
                </div> 
              </div>
             
             </div> 
        
        </div>
  )
}

export default  withLayout()(withValidationCourse()(Files)) 
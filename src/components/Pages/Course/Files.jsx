import React, { useState, useEffect, createRef } from 'react'
import withLayout from '../../HOC/withLayout'
import CourseNavigation from '../../Organisms/CourseNavigation'
import withValidationCourse from '../../HOC/withValidationCourse'
import Loader from '../../Organisms/Loader'
import Table from '../../Organisms/Course/FilesTable'
import Axios from 'axios'
import withFolderRoot from '../../HOC/withFolderRoot'
import FolderModal from '../Course/Folder/addFolderModal'
import FolderNavigation from './Folder/FolderNavigation'
import $ from 'jquery'



const Files = ({match, name, options, is_student, rootFolder}) => {
  console.log(rootFolder)
  const [scope, setScope] = useState({
    'currentFolder': rootFolder,
    'oldCurrent': rootFolder, // null
    'data': null,
    'firstFolders': null,
    'counterFolder': 0,
    'oldCounterFolder': 0
    
  })

  // Inicializando tooltips de bootstrap
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  const fileInput = createRef()

  useEffect(() => {
    // console.log('entrada del useEffect')

    if(scope.data !== null && scope.currentFolder === scope.oldCurrent
        && scope.counterFolder === scope.oldCounterFolder) return // provisional

    // console.log('despue del return peligroso')
    
    const API_URL = process.env.REACT_APP_API_URL
 

  const getItems = () => {

    let items = null
    Axios.get(`${API_URL}/courses/`+match.params.id+'/files?parent='+scope.currentFolder)
          .then(r => {
              if(r.data.success){
                  // console.warn('Volvi de la API de Files',r.data.data)
                  Axios.get(`${API_URL}/courses/`+match.params.id+'/folders?parent='+scope.currentFolder)
                    .then(fo => {
                        if(fo.data.success){
                            // console.warn('Volvi de la API de Folders',fo.data.data)

                            items = r.data.data.concat(fo.data.data)
                            // console.log(items)
                                setScope({
                                ...scope,
                                'oldCurrent': scope.currentFolder,
                                'oldCounterFolder': scope.counterFolder,
                                'data': items,
                                'firstFolders': fo.data.data
                              })
                            
                        }else{
                            console.log('Hubo un problema al cargar los archivos. Comuníquese con el administrador.')                            
                        }
                    })
                    .catch(e => {
                        console.log(e)                        
                    })

              }else{    
                  console.log('Hubo un problema al cargar los archivos. Comuníquese con el administrador.')                        
              }
          })
          .catch(e => {
              console.log(e)                    
          })
  }
    
  if(scope.currentFolder){
    getItems()
  }

    
  
  },[match, scope])

  const fileSelectedHandler = event => {

    let myFile = event.target.files[0]

    if(myFile){

      // Comparación en KB TODO traer de el backend
      if( (myFile.size/1024) < parseInt(process.env.REACT_APP_MAX_UPLOAD_FILE_KB)){
        const fd = new FormData()
        fd.append('file', myFile, myFile.name)
        fd.append('folder_id', scope.currentFolder)

        const API_URL = process.env.REACT_APP_API_URL
        Axios.post(`${API_URL}/courses/${match.params.id}/files`, fd)
        .then(r => {
          console.table(r.data)
          setScope({
            ...scope,
            'counterFolder': scope.counterFolder+1
          })
        })
        .catch(e => {
          console.log(e)
        })
      }else{
        alert('Este archivo excede el límite permitido de 20 MB')
      }
      
    }else{
      console.log('No hay archivo por subir')
    }
  }

  const enableFilesCretionHandler = () => {
    const API_URL = process.env.REACT_APP_API_URL

    Axios.post(`${API_URL}/courses/${match.params.id}/files/enable`,null,{
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    })

    .then(r => {
      if(r.data.success){
        console.log(r.data.data)
        window.location = '/courses/'+match.params.id+'/files'
      }else{
        console.log('Ocurrió un error 500')
      }
    })
    .catch(er => {
      console.log(er)
    })

  }

  const buttonsTeacher = () => {
    if(rootFolder){
      return <div className="col-md-4">
              <button type="button" className="btn btn-primary h-auto" data-toggle="modal" data-target="#modalAddFolder" data-backdrop="static" data-keyboard="false">
                <i className="fas fa-plus"></i> Carpeta
              </button>
              &nbsp;

              <input style={{display: 'none'}} 
                      type="file" 
                      onChange={fileSelectedHandler}
                      ref={fileInput}/>

              <button type="button" className="btn btn-primary h-auto" 
                onClick={() => fileInput.current.click()}>
                <i className="fas fa-arrow-up"></i> Cargar
              </button>
              
            </div>
    }else{
      return <div className="col-md-4">
              <button type="button" className="btn btn-dark h-auto" data-toggle="tooltip" data-placement="left" title="Habilite la subida de archivos en el curso" onClick={() => enableFilesCretionHandler()}>
              <i className="fas fa-check"></i>&nbsp;
              Habilitar
              </button>
              </div>
    }
  }

  const changeCurrentFolder = (newFolder) => {
    console.log('cambiara current folder '+ newFolder)
    setScope({
      ...scope,
      'currentFolder': newFolder
    })
  }

  const aumentaFolders = (value) => {
    console.log('debo aumentar folders de aqui '+ value)
    setScope({
      ...scope,
      'counterFolder': value
    })
  }

  const renderTable = () => {

    // if(rootFolder === false) return null

    if(scope.data === null){
      return <p>Cargando...</p>
    }else{
      return <Table currentCourse={match.params.id} rootFolder={rootFolder} changeCurrentFolder={changeCurrentFolder} data={scope.data}/>
    }
    
  }

  console.warn('¡¡¡¡ Antes del return Principal !!!', rootFolder)

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
                
                <div className="col-md-2">
                  {/* <div className="input-group mb-3">
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
                  </div> */}
                </div>
                <div className="col-md-6">
                      {/* 0 elementos seleccionados */}
                </div>
                { buttonsTeacher() }
              </div>
              <div className="row" style={{borderTop: '1px solid lightgrey', 
                                            borderBottom: '1px solid lightgrey', 
                                            minHeight: '20em',
                                            marginTop: 5+'px'}}>
                <div className="col-md-3" style={{borderRight: '1px solid lightgrey'}}>
                  

                  <FolderNavigation 
                  courseId={match.params.id} 
                  currentFolder={scope.currentFolder} 
                  firstFolders={scope.firstFolders} 
                  rootFolder={rootFolder} 
                  changeCurrentFolder={changeCurrentFolder} />


                </div>
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-12">

                      {
                        rootFolder === null ? <Loader /> : 
                        (rootFolder ? 
                        renderTable() : 
                        <p>Este curso no tiene habilitada la creación de carpetas por el momento.</p>)
                        
                      }
                    </div>
                  </div>
                </div>
              </div>
              
            <FolderModal aumentaFolders={aumentaFolders} courseId={match.params.id} currentFolder={scope.currentFolder} counterFolder={scope.counterFolder}/>
              
          </div>
        </div>
      </div>
    </>
  )
}

export default  withLayout()(withFolderRoot()(withValidationCourse()(Files))) 
import React from 'react'
import withLayout from '../../HOC/withLayout'
import CourseNavigation from '../../Organisms/CourseNavigation'
import withValidationCourse from '../../HOC/withValidationCourse'

const Forums = ({match, name, options, is_student}) => {
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
                        <option defaultValue>Categoría</option>
                        <option value="1">Opcion 1</option>
                        <option value="2">Opcion 2</option>
                        <option value="3">Opcion 3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <input type="text" 
                            className="form-control" 
                            aria-label="Sizing example input" 
                            aria-describedby="inputGroup-sizing-default" 
                            placeholder="Buscar Foro" />
                    </div>
                  </div>
                  <div className="col-md-3">
                    {/* Botón de agregar nuevo foro (Restringido) */}
                    <button type="button" className="btn btn-outline-dark">
                      <i className="fas fa-plus"></i>
                      &nbsp; Foro
                    </button>
                    &nbsp;
                    {/* Configuración (Restringido) */}
                    <button type="button" className="btn btn-outline-dark">
                      <i className="fas fa-cog"></i>
                    </button>
                  </div>
                </div>
                {/* Contenido del Foro */}
                <div className="row">
                  <div className="accordion" id="accordionExample">
                    <div className="card">
                      <div className="card-header" id="headingOne">
                        <h3 className="mb-0">
                          <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Foros
                          </button>
                        </h3>
                      </div>

                      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="card-body">
                          
                        <div className="card" style={{background: '100%'}}>
                          <div className="card-body">
                          
                            <h5 className="card-title">
                              <i className="fas fa-file-signature" style={{color: 'limegreen'}}></i> &nbsp;
                              Foro de discusión: Contrato psicológico 
                            </h5>
                            
                            <p className="card-text text-center">Se bloqueó en 28 de abr en 23:00</p>                                    
                          </div>
                        </div>
                        <div className="card" style={{background: '100%'}}>
                          <div className="card-body">
                          
                            <h5 className="card-title">
                              <i className="fas fa-file-signature" style={{color: 'limegreen'}}></i> &nbsp;
                              Unidad 1 – Actividad individual: Foro de discusión
                            </h5>
                            
                            <p className="card-text text-center">Se bloqueó en 28 de abr en 23:00</p>                                    
                          </div>
                        </div>
                        

                        </div>
                      </div>
                    </div>
                    
                    
                  </div>
                </div>
            </div>
        </div> 
      </div>





    </>
  )
}

export default  withLayout()(withValidationCourse()(Forums)) 
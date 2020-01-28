import React from 'react'
import withLayout from '../../HOC/withLayout'
import AdminNavigation from '../../Organisms/AdminNavigation'

const Categories = () => {
  return (
    
    <div className="row">
        <div className="col-md-12">
          <h1 className="well lead course-name">Universidad San Ignacio de Loyola > Categorías</h1>
          <hr/>
        </div>
        <div className="col-md-12">
          <div className="container-fluid">
            <div className="row">
                <AdminNavigation />
                <div id="course-content" className="col-md-10 p-x-3 p-y-1">
                    {/* <div className="content-title m-x-auto">
                        ADMINISTRADOR DE CONFIGURACIONES
                    </div> */}
                    <div className="row">
                      {/* Input de Búsqueda */}
                      <div className="col-md-9">
                        <div className="input-group mb-3">
                          
                          <input type="text" 
                                className="form-control" 
                                aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-default" 
                                placeholder="Buscar categoría" />
                        </div>
                      </div>
                      {/* Agregar un nuevo curso */}
                      <div className="col-md-3">
                        <button type="button" className="btn btn-outline-dark">
                        <i className="fas fa-plus"></i> Agregar categoría
                        </button>
                      </div>
                    </div>
                    {/* Tabla de categorias */}
                    <div className="row">
                      <div className="col-md-12 table-responsive-sm">
                        <table className="table">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">First</th>
                              <th scope="col">Last</th>
                              <th scope="col">Handle</th>
                              <th scope="col">Last</th>
                              <th scope="col">Handle</th>
                              <th scope="col">Last</th>
                              <th scope="col">Handle</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
                              <td>@mdo</td>
                              <td>@mdo</td>
                              <td>@mdo</td>
                              <td>@mdo</td>
                              <td>
                                <button type="button" className="btn btn-outline-secondary btn-sm">
                                  <i className="fas fa-cog"></i>
                                </button>
                                &nbsp;
                                <button type="button" className="btn btn-outline-secondary btn-sm">
                                  <i className="fas fa-plus"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>Jacob</td>
                              <td>Thornton</td>
                              <td>@fat</td>
                              <td>@mdo</td>
                              <td>@mdo</td>
                              <td>@mdo</td>
                              <td>@mdo</td>
                              <td>
                                <button type="button" className="btn btn-outline-secondary btn-sm">
                                  <i className="fas fa-cog"></i>
                                </button>
                                &nbsp;
                                <button type="button" className="btn btn-outline-secondary btn-sm">
                                  <i className="fas fa-plus"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td>Larry</td>
                              <td>the Bird</td>
                              <td>@twitter</td>
                              <td>@mdo</td>
                              <td>@mdo</td>
                              <td>@mdo</td>
                              <td>@mdo</td>
                              <td>
                                <button type="button" className="btn btn-outline-secondary btn-sm">
                                  <i className="fas fa-cog"></i>
                                </button>
                                &nbsp;
                                <button type="button" className="btn btn-outline-secondary btn-sm">
                                  <i className="fas fa-plus"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                          <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                              <a className="page-link" href="/#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                              </a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="/#">1</a></li>
                            <li className="page-item"><a className="page-link" href="/#">2</a></li>
                            <li className="page-item"><a className="page-link" href="/#">3</a></li>
                            <li className="page-item">
                              <a className="page-link" href="/#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                </div>
            </div> 
          </div>
        </div> 
    </div>
  )
}


export default  withLayout()(Categories) 

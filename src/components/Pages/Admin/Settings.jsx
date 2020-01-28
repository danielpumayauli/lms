import React from 'react'
import withLayout from '../../HOC/withLayout'
import AdminNavigation from '../../Organisms/AdminNavigation'

const Settings = () => {
  return (
    
    <div className="row">
        <div className="col-md-12">
          <h1 className="well lead course-name">Universidad San Ignacio de Loyola > Configuraciones</h1>
          <hr/>
        </div>
        <div className="col-md-12">
          <div className="container-fluid">
            <div className="row">
                <AdminNavigation />
                <div id="course-content" className="col-md-10 p-x-3 p-y-1">
                    <div className="content-title m-x-auto">
                        ADMINISTRADOR DE CONFIGURACIONES
                    </div>
                </div>
            </div> 
          </div>
        </div> 

    </div>
  )
}


export default  withLayout()(Settings) 

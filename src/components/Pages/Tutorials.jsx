import React from 'react'
import withLayout from '../HOC/withLayout'



const Tutorials = () => {
  return (
    <>
              <div className="header pb-6 mr-top-fx">
                <div className="container-fluid">
                    <div className="header-body">
                      <div className="row align-items-center py-4">
                          <div className="col-lg-6 col-7">
                            <p className="d-inline-block mb-0 breat-fx"><i className="fa fa-folder-open text-info"></i> Universidad San Ignacio de Loyola > Tutoriales</p>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
      
              <div className="container-fluid mt--6">
                <div className="row">
                  <div className="col-md-3">
                    <div className="card">
                        <div className="codigo-curso">TUTORIALES</div>
                        
                        
                     </div>
                  </div>
                </div>
      
              </div>
      
      
      </>
  )
}


export default  withLayout()(Tutorials) 

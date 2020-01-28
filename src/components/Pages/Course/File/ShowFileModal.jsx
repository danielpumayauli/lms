import React from 'react'

/**
 * Muestra el contenido del modal al seleccionar un file
 * @param {archivo seleccionado}  file
 */
const ShowFileModal = ({file}) => {
    console.log(file)


    const renderContent = () => {

        if(file === null) return null
        console.log(file.extension)

        /**
         * Decide que pintar en el lado izqquierdo del modal
         * validando el tipo de archivo
         * @param {archivo seleccionado} file 
         */
        const API_URL = process.env.REACT_APP_API_URL
        const downloadFile = (url) => {
            window.open(url)
        }
        const printFile = (file) => {
            
        
            switch (file.extension) {
                case 'mp4':
                case 'jpg':
                case 'PNG':
                case 'pdf':
                        return <iframe src={`${API_URL}/files/`+file.id} width="100%" height="100%" frameBorder="0" title="myFrame"></iframe>
                default:
                    return <div className="text-center">
                                
                                <button onClick={() => downloadFile(`${API_URL}/files/`+file.id+"?download=true")} className="btn btn-info h-auto">
                                    <i className="fas fa-download"></i> Descargar
                                </button>
                            </div>
            }
        }

        return <div className="modal-content" style={{height: 90+'vh'}}>
                    <div className="modal-header" style={{background: '#14171B'}}>
                        <h5 className="modal-title text-white" id="exampleModalLongTitle">{file.display_name}</h5>
                        <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                    <div className="modal-body" style={{backgroundColor:'rgba(20, 23, 27, 0.8)'}}>
                        <div className="container-fluid" style={{height: 100+'%'}}>
                            <div className="row" style={{height: 100+'%'}}>
                                <div className="col-sm-9" style={{width: 100+'%', 
                                                                height: 100+'%', 
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center'}}>
                                    {printFile(file)}

                                </div>
                                <div className="col-sm-3" >
                                    <h3 className="text-white">
                                    <i className="fas fa-info-circle"></i> Información
                                    </h3>
                                    <hr/>
                                    <table className="table text-white">                                        
                                        <tbody>
                                            <tr>
                                            <td>Nombre</td>
                                            <td>{file.display_name}</td>

                                            </tr>
                                            <tr>
                                            <td>Tipo</td>
                                            <td>{file.extension}</td>

                                            </tr>
                                            <tr>
                                            <td>Tamaño</td>
                                            <td>{Math.round(file.size/1024) + ' KB'}</td>

                                            </tr>
                                            <tr>
                                            <td>Creación</td>
                                            <td>{file.created_at}</td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer" style={{background: '#14171B'}}>
                        
                        <button onClick={() => downloadFile(`${API_URL}/files/`+file.id+"?download=true")} className="btn btn-secondary h-auto">
                            <i className="fas fa-download"></i> Descargar
                        </button>

                        <button type="button" className="btn btn-secondary h-auto" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
    }
    return (
        <div className="modal fade" id="modalShowFile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{zIndex: 100000}}>
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document" style={{width: 100+'%', minWidth: 100+'%'}}>
                {renderContent()}
            </div>
        </div>
    )
}

export default ShowFileModal
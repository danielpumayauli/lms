import React from 'react'
import Axios from 'axios'
import $ from 'jquery'

const addFolderModal = ({aumentaFolders, courseId, currentFolder, counterFolder}) => {
    
    const createFolder = e => {
        e.preventDefault()

        const form = e.target
        const API_URL = process.env.REACT_APP_API_URL

        if( form.folderName.value !== ''){
            console.log('creare la carpeta: '+form.folderName.value.trim())        
            
            const data = {
                'display_name': form.folderName.value.trim(),
                'parent': currentFolder
            }

            Axios.post(`${API_URL}/courses/${courseId}/folders`, data)    
            .then(r => {
                if(r.data.success){

                    form.folderName.value = ''
                    $('#modalAddFolder').modal('hide')                    
                    aumentaFolders(counterFolder+1)
                    // window.location.reload(true)

                }else{
                console.log('Hubo un problema al cargar los archivos. Comuníquese con el administrador.')
                }
            })
            .catch(e => {
                console.log(e)
                alert('Ocurrió un error. Inténtelo más tarde.')
            })
        }
    }


    return (
        <div className="modal fade" id="modalAddFolder" tabIndex="-1" role="dialog" aria-labelledby="modalAddFolderTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Agregue una carpeta</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <form onSubmit={createFolder.bind()}>
                    <div className="modal-body">                    
                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                            <input type="text" className="form-control" id="folderName" name="folderName" maxLength="180" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-rubik" data-dismiss="modal">Cerrar</button>
                        <button type="submit" name="submit" className="btn btn-outline-dark btn-rubik">Guardar</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default addFolderModal

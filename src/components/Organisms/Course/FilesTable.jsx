import React, { useState } from 'react'
// import React from 'react'
import $ from 'jquery'
import ShowFileModal from '../../Pages/Course/File/ShowFileModal'

const FilesTable = ({currentCourse, rootFolder, changeCurrentFolder, data}) => {
    // console.log(data)
    const [scope,setScope] = useState({
        'selectedFile': null
    })

    const enterItem = (item) => {
        if(item.uuid){
            // Se muestra el file en un modal
            setScope({
                'selectedFile': item
            })

            $("#modalShowFile").modal('show')
        }else{
            // Se cambia el contenedor aquí
            changeCurrentFolder(item.id)
        }
    }

    
    console.warn('¡¡ ANTES DE RENDER LA TABLA !!', scope)

    if( data.length === 0){
        return <p className="text-center">Sin contenido aún para mostrar.</p>
    }else {
        return   <>
                    <table className="table table-hover table-files">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Fecha creada</th>
                                <th scope="col">Tamaño</th>
                                <th scope="col">check</th>

                            </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((row,index) => 
                            <tr key={index}>
                                <th scope="row" onClick={ () => enterItem(row)}>
                                    {
                                        row.uuid ? 
                                        <span className="file-row-icon">
                                            <i className="fas fa-file-alt"></i>
                                        </span> 
                                        : 
                                        <span className="file-row-icon">
                                            <i className="far fa-folder"></i>
                                        </span>
                                    }
                                    <span className="file-row-name" >
                                    {row.display_name}
                                    </span>
                                </th>
                                <td>{row.created_at}</td>
                                <td>{ row.uuid ? Math.round(row.size/1024) + ' KB' : '--'
                                    
                                    }</td>
                                <td>check</td>
                            </tr>)
                            
                        }     
                        </tbody>
                    </table>

                    <ShowFileModal file={scope.selectedFile}/>
                    </>
    }

        
 
}

export default FilesTable

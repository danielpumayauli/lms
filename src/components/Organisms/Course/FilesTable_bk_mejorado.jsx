import React, { useState, useEffect } from 'react'
import Axios from 'axios'



const FilesTable = ({currentCourse, currentFolder, changeCurrentFolder}) => {
    // console.error(currentFolder)

    const [folders, setFolders] = useState({
        'countCreadosFlag': 0,
        'countCreados': 0,
        'folders': null,
    })

    const [files, setFiles] = useState({
        'files': null,
    })
    useEffect(() => {
        console.log('EN USEFECT DE TABLA curso y folder son:', currentCourse, currentFolder)
        if(folders.folders && files.files) return
        const API_URL = process.env.REACT_APP_API_URL

        const getFolders = () => {
            // if(folders.folders !== null){
                Axios.get(`${API_URL}/courses/`+currentCourse+'/folders?parent='+currentFolder)
                    .then(r => {
                        if(r.data.success){
                            
                            setFolders({
                                ...folders,
                                folders: r.data.data
                            })

                        }else{
                            console.log('Hubo un problema al cargar los archivos. Comuníquese con el administrador.')
                            
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        
                    })
            // }
        }
        const getFiles = () => {
            // if(files.files !== null){

                Axios.get(`${API_URL}/courses/`+currentCourse+'/files?parent='+currentFolder)
                    .then(r => {
                        if(r.data.success){
                            
                            setFiles({
                                ...files,
                                files: r.data.data
                            })

                        }else{
                            console.log('Hubo un problema al cargar los archivos. Comuníquese con el administrador.')
                            
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        
                    })
            // }
        }

        getFiles()

        getFolders()
    },[currentCourse, currentFolder, folders, files])

    let items = []

    if(folders.folders && files.files){
        items = files.files.concat(folders.folders) // Esto se muestra al usuario
    }

    // console.table(folders.folders)

    const enterItem = (item) => {
        if(item.uuid){
            console.log('es un file')
        }else{
            // console.log('es un folder', item.id)
            // cambiare el contenedor aqui

            setFolders({
                ...folders,
                'folders': null
            })
            changeCurrentFolder(item.id)
        }
    }

    console.log('== ANTES DE RENDER LA TABLA ==')

    if(folders.folders === null && files.files === null) return <p>Cargando...</p>

    if( items.length === 0){
        return <p className="text-center">Sin contenido aún para mostrar.</p>
    }else {
        return (
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
                        items.map((row,index) => 
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
                            <td>--</td>
                            <td>check</td>
                        </tr>)
                        
                    }
                    
                </tbody>
            </table>
        )
    }
    
}

export default FilesTable

import React from 'react'

const FilesTable = ({currentFolder,data, changeCurrentFolder}) => {
    // console.log(data.length, currentFolder)
    // changeCurrentFolder()


    if( data.length === 0){
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
                        data.map((row,index) => 
                        <tr key={index}>
                            <th scope="row">
                                <span className="file-row-icon">
                                    <i className="far fa-folder"></i>
                                </span>
                                <span className="file-row-name">
                                {row.name}
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

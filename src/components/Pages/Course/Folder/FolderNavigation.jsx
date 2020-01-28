import React from 'react'

export const FolderNavigation = ({courseId, currentFolder, firstFolders, rootFolder, changeCurrentFolder}) => {

    console.log(rootFolder,currentFolder)

    const enterFolder = (id) => {
        console.log('di clic en el id '+id)
        changeCurrentFolder(id)
    }

    if(firstFolders){
        return (
            <div style={{'cursor': 'pointer'}}>
                <span onClick={() => enterFolder(rootFolder)}>
                <i className="far fa-folder"></i>&nbsp;
                    Archivos del curso
                </span><br/>
                {
                    firstFolders.map((folder, index) =>
                        <div key={index} style={{'marginLeft':10+'px'}}>
                            <span onClick={() => enterFolder(folder.id)}>
                            <i className="far fa-folder"></i>&nbsp;
                                {folder.display_name}
                            </span><br/>
                        </div>
                    )
                } 
                
            </div>
        )
    }else{
        return null
    }
    
}

export default FolderNavigation
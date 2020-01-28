import React from 'react'

const List = ({data, is_student}) => {
    console.log( data )
    return (
        <>
            {
                data.map(
                    (ann,index) => 
        
                                    <div key={index} className="card" style={{background: '100%'}}>
                                        <div className="card-body" style={{backgroundColor: ''}}>
                                        
                                            <h5 className="card-title">
                                            <i className="fas fa-file-signature" style={{color: 'limegreen'}}></i> &nbsp;
                                            {ann.title} - <i className="card-text text-center">Publicado el {ann.dispatch_at}</i>
                                            </h5>
                                            <p className="card-text" style={{fontSize: '0.7em'}}>
                                            Por: {ann.editor_fullname}
                                            </p>

                                            {/*  */}

                                            {
                                                is_student ? null
                                                            : <div className="float-md-right">
                                                                <button type="button" className="btn btn-info">
                                                                    <i className="far fa-edit"></i>
                                                                </button>
                                                                <button type="button" className="btn btn-danger">
                                                                    <i className="far fa-trash-alt"></i>
                                                                </button>
                                                            </div>  
                                            }
                                            
                                                            
                                        </div>
                                    </div>


                )
            }

            
        </>
    )
}

export default List

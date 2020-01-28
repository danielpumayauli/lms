import React, { useState } from 'react'
import Axios from 'axios'
import Loader from '../Loader'

// Este componente puede ser reutilizable para usuarios,
// pero deberia de enviarse el head y el body con el mismo
// número de elementos.

const Table = ({head, body, is_student}) => {

    // console.log('Inicio en Table.jsx', head, body)

    const [pagination, setPagination] = useState({
        'data' : body.data,
        'current_page' : body.current_page,
        'last_page': body.last_page,
        'prev_page_url': body.prev_page_url,
        'next_page_url' : body.next_page_url,
        'last_page_url': body.last_page_url,
        'first_page_url' : body.first_page_url,
        'path' : body.path,
        'from' : body.from,
        'to' : body.to

    })
    
    const changePagination = (newPage) => {
        // console.log('di clic en changePagination', newPage, pagination.path)

        setPagination({
            ...pagination,
            'data' : null
        })
        Axios.get(pagination.path+'?page='+newPage)
        .then(r => {
            if(r.data.success){

                setPagination({
                    ...pagination,
                    'data' : r.data.data.users.data,
                    'current_page' : r.data.data.users.current_page,
                    'next_page_url' : r.data.data.users.next_page_url,
                    'from' : r.data.data.users.from,
                    'to' : r.data.data.users.to
                }); /** esto cambia el estado del "data" y de inmediato se vuelve a ejecutar el render */

            }else{
            console.log('Hubo un problema al cargar los cursos. Comuníquese con el administrador.')
            }
        })
        .catch(e => {
            console.log();
        })
    }

    const renderButtons = () => {

        /** Si API solo devuelve una página de navegación */
        if(pagination.current_page === pagination.last_page && pagination.current_page === 1) {
            return <li className="page-item active"><span className="page-link">{pagination.current_page}</span></li>
        }
        /** Si API devuelve más de 2 páginas de navegación, se renderizan al menos 3 botones numerales */
        if( pagination.last_page >= 3 || ( pagination.last_page - pagination.current_page) >= 2 ){
            
            let buttons

                if(pagination.current_page === 1){
                    buttons = <>
                                <li className="page-item disabled">
                                    <span className="page-link" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Anterior</span>
                                    </span>
                                </li>
                                <li className="page-item active"><span className="page-link" >{pagination.current_page}</span></li>
                                <li className="page-item"><span className="page-link" onClick={ () => changePagination( pagination.current_page + 1 ) }>{pagination.current_page + 1}</span></li>
                                <li className="page-item"><span className="page-link" onClick={ () => changePagination( pagination.current_page + 2 ) } >{pagination.current_page + 2}</span></li>
                                <li className="page-item">
                                    <span className="page-link" onClick={ () => changePagination( pagination.last_page ) } aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Siguiente</span>
                                    </span>
                                </li>
                            </>
                }else if(pagination.current_page !== 1 && pagination.current_page !== pagination.last_page){
                    buttons =   <>
                                    <li className="page-item">
                                        <span className="page-link" onClick={ () => changePagination( 1 ) } aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Anterior</span>
                                        </span>
                                    </li>
                                    <li className="page-item"><span className="page-link" onClick={ () => changePagination( pagination.current_page - 1 ) }>{pagination.current_page - 1}</span></li>
                                    <li className="page-item active"><span className="page-link">{pagination.current_page}</span></li>
                                    <li className="page-item"><span className="page-link" onClick={ () => changePagination( pagination.current_page + 1 ) }>{pagination.current_page + 1}</span></li>
                                    <li className="page-item">
                                        <span className="page-link" onClick={ () => changePagination( pagination.last_page ) } aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Siguiente</span>
                                        </span>
                                    </li>
                                </>
                }else{
                    buttons =   <>
                                    <li className="page-item">
                                        <span className="page-link" onClick={ () => changePagination( 1 ) } aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Anterior</span>
                                        </span>
                                    </li>
                                    <li className="page-item"><span className="page-link" onClick={ () => changePagination( pagination.current_page - 2 ) }>{pagination.current_page - 2}</span></li>
                                    <li className="page-item"><span className="page-link" onClick={ () => changePagination( pagination.current_page - 1 ) }>{pagination.current_page - 1}</span></li>
                                    <li className="page-item active"><span className="page-link" >{pagination.current_page}</span></li>
                                    <li className="page-item disabled">
                                        <span className="page-link" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Siguiente</span>
                                        </span>
                                    </li>
                                </>

                }

            return <>
                     { buttons }
                    </>

        } else {
            /** Si solo es necesario mostrar 2 botones numerales de navegación */
            if( pagination.current_page === 1){
                return <>
                            <li className="page-item active"><span className="page-link" >{pagination.current_page}</span></li>
                            <li className="page-item"><span className="page-link" onClick={ () => changePagination( pagination.current_page + 1 ) }>{pagination.current_page + 1}</span></li>
                        </>
            }else{
                return <>
                            <li className="page-item"><span className="page-link" onClick={ () => changePagination( pagination.current_page - 1 ) }>{pagination.current_page - 1}</span></li>
                            <li className="page-item active"><span className="page-link">{pagination.current_page}</span></li>
                        </>
            }
            
        }
        
    }

    const renderTable = () => {
        return <table className="table">
                    <thead className="thead-light">
                        <tr>
                        {
                            head.map( (th, index) => <th key={index} scope="col">{th}</th> )
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pagination.data.map(
                                (tr, index) =>  <tr key={index}>
                                                    <th scope="row">{ index + pagination.from }</th>
                                                    <td>{ tr.sortable_name }</td>
                                                    <td>{ tr.email }</td>
                                                    <td>###</td>
                                                    <td>{ tr.role_name }</td>
                                                    <td>
                                                        {
                                                            is_student 
                                                            ? null
                                                            : <button type="button" className="btn btn-outline-secondary btn-sm">
                                                                    <i className="fas fa-cog"></i>
                                                                </button>
                                                        }
                                                        
                                                    </td>
                                                </tr>
                            )
                        }                
                    </tbody>
                </table>
    }
    // console.log('Se renderiza la tabla de usuarios')

    if(body.data.length === 0){
        return  <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <br/>
                            <span>Aún no existen usuarios inscritos.</span>
                        </div>
                    </div>
                </div>
    }else{
        return (
            <>
                { pagination.data ? renderTable() : <Loader />}
    
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
    
                            { renderButtons() }
    
                    </ul>
                </nav>
            </>
        )
    }


}

export default Table

import React from 'react'
import { Link } from 'react-router-dom'

const Restricted = () => {
    return (
        <div className="container">
            <div className="row not-found__container">                                    
                <div className="col-md-12 text-center">
                <br/><br/>
                    <img src="https://contenidoscev.usil.edu.pe/shared/img/4041.png" alt="Not Found"/>
                </div>
                <div className="col-md-12 text-center">
                    <h1 style={{    fontWeight: 'bold',
                                    fontSize: 34+'px'
                                }}>
                        Acceso restringido
                    </h1>                    
                    <div>
                        <br/>
                        <Link 
                            to="/"
                            className="btn btn-outline-dark btn-link-a"
                        >
                            Volver a mis cursos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Restricted

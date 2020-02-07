import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({id, name, code, modules, image, professor}) => {
    return (

        <div className="card">
            <div className="codigo-curso">{code}</div>
            <Link to={"/courses/"+id}>
                {
                    image !== null
                    ?
                    <img className="card-img-top" src={image} alt="curso2" />
                    :
                    <img className="card-img-top" src={require("../../assets/img/curso2.jpg")} alt="curso2" />
                    
                }
            
            </Link>
            <div className="card-body card-padding-fx">
            <Link to={"/courses/"+id}>
                <h4 className="card-title">{name}</h4>
            </Link>
            <div className="row">
                {
                    professor !== null
                    ?
                    <div className="col">                    
                        <img src={require("../../assets/img/1.jpg")} className="circle-img-mini color-success" alt="demo1" />
                <p className="floatp cut-string">Prof. {professor}</p>
                    </div>
                    :
                    null
                }
                
                {
                    modules !== null 
                    ?
                    <div className="col">
                        <p className="text-right mrt-6"><i className="fa fa-list-ul"></i> {modules} Módulos</p>
                    </div>
                    : null
                }
            </div>
            <div className="row">
                <div className="col-md-12">
                    {
                        id === 3
                        ?
                        <div className="progress-wrapper paddtop">
                            <div className="progress-info">
                                <span>Progreso</span>
                                <div className="progress-percentage">
                                    <span>70%</span>
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar bg-info" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style={{width: 70+'%'}}></div>
                            </div>
                        </div>
                        :
                        <div className="progress-wrapper paddtop">
                            <div className="progress-info">
                                <span>Progreso</span>
                                <div className="progress-percentage">
                                    <span>5%</span>
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar bg-info" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style={{width: 5+'%'}}></div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            </div>
        </div>
    )
}

export default CourseCard

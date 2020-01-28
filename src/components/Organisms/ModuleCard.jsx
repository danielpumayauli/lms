import React from 'react'
import { Link } from 'react-router-dom'

const ModuleCard = ({id, name, code, img}) => {
    return (

        <div className="card">
            {/* <div className="codigo-curso">{code}</div> */}
            <Link to={"/courses/"+id+"/module/"+code}>
            {
                img 
                ?
                <img className="card-img-top" src={img} alt="curso2" />
                :
                <img className="card-img-top" src={require("../../assets/img/curso2.jpg")} alt="curso2" />

            }
            </Link>
            <div className="card-body card-padding-fx">
            <Link to={"/courses/"+id+"/module/"+code}>
                <h4 className="card-title">{name}</h4>
            </Link>
            <div className="row">
                
                <div className="col-12">
                    <p className="text-right mrt-6"><i className="fa fa-list-ul"></i> 12 Items</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="progress-wrapper paddtop">
                        <div className="progress-info">
                        <span>Progreso del modulo</span>
                        <div className="progress-percentage">
                            <span>10%</span>
                        </div>
                        </div>
                        <div className="progress">
                        <div className="progress-bar bg-info" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style={{width: 10+'%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ModuleCard

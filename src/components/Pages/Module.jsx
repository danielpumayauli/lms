import React, { useState, useEffect } from 'react'
import withLayout from '../HOC/withLayout'
import Loader from '../Organisms/Loader'
import Axios from 'axios'
import NotFound from '../Organisms/NotFound'


const Module = ({match}) => {
  // console.log(match.params.module)

  const [module, setModule] = useState(null);
  const [denied, setDenied] = useState(false);
  const [view, setView] = useState(null);


  useEffect(() => {
    console.log(' en usefeect ')


    const getModuleData = () => {
      const API_URL = process.env.REACT_APP_API_URL

      Axios.get(`${API_URL}/courses/${match.params.id}/modules/${match.params.module}`,{
        headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
      }).then(r => {
        if(r.data.success){
          setModule(r.data.data)

        }else{
          console.log('Ocurrió un error de Servidor')
        }
      })
      .catch(er => {
        console.log(er)
        setDenied(true)
      })
    }
    getModuleData()

  }, [match]);

  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  const isYoutubeLink = (link) => {
    return link.indexOf('youtu') !== -1 ? true : false
  }

  const dispatchHandler = (e, type, link) => {

    // Se quita clase activa a cualquier otro elemento encontrado

    let items = document.querySelectorAll('.accordion .list-group-item')
    
    for (let i = 0; i < items.length; i++){

      items[i].classList.remove('active');

    }

    // Se añade la clase activa a elemento seleccionado

    const element = e.target
    element.className = ['list-group-item active']    

    choiceEmbeb(type,link)
  }

  const choiceEmbeb = (type, link) => {
    switch (type) {
      case 1:
        console.log('es link de youtube?: '+isYoutubeLink(link))

        if(isYoutubeLink(link)){
          console.log(1)
            const videoId = getId(link);
            const iframeMarkup = <iframe title="ContenidoEmbebido" width="560" height="315" src={'//www.youtube.com/embed/'+videoId}
             frameBorder="0" allowFullScreen></iframe>

              setView(iframeMarkup)
        }else{
          if(link.indexOf('.mp4') !== -1){
            console.log(2)
            // const object = <video style={{width: 100+'%', minHeight: 500+'px'}}  
            //                     data={link}>
            //                 </video>
            // setView(object)
          }else{
            console.log(3)
            const object = <object style={{width: 100+'%', minHeight: 500+'px'}}  
                                data={link}>
                            </object>
            setView(object)
          }
        }

        break;
    
      default:
        break;
    }
  }

  const printItems = (group) => {
    let items = module.items.filter(item => item.group_id === group)
    
    if(items.length === 0) return <p>Sin contenido aún.</p>

    let content = items.map((item, index) => <li key={index} className="list-group-item" style={{cursor: 'pointer'}} onClick={(e) => dispatchHandler(e, item.type, item.external_link)}>{item.display_name}</li>)

    return content
  }

  const itinerario = () => {

    if(module.groups.length < 1){
      return <div className="accordion" id="accordionItinerario">
                <div className="card">
                  <div className="card-header" >
                    <p>Sin grupos de itinerario por el momento</p>
                  </div>
                </div>
              </div>
    }
    return <div className="accordion" id="accordionItinerario">

            {
              module.groups.map( (group, index) => 
                <div className="card" key={index}>
                  <div className="card-header" id={'heading'+index}>
                    <h2 className="mb-0">
                      <button className="btn btn-link" type="button" data-toggle="collapse" data-target={'#collape'+index} aria-expanded="true" aria-controls={'collape'+index}>
                        {group.name}
                      </button>
                    </h2>
                  </div>

                  <div id={'collape'+index} className={index === 0 ? "collapse show" : "collapse"} aria-labelledby={'heading'+index} data-parent="#accordionItinerario">
                    <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {
                        printItems(group.id)
                      }
                    </ul>
                    </div>
                  </div>
                </div>
               )
            }
            
            
            
          </div>
  }

  const primeraVista = () => {

    console.log(module.items[0])
    if(module.items.length === 0){
      return <div><br/><br/>Sin contenido para mostrar</div>
    }else{
      choiceEmbeb(module.items[0].type, module.items[0].external_link)
      // return JSON.stringify(module.items[0])
    }
  }
  


  // console.log('antes del return', module, view)


  if(denied) {
    return <NotFound/>
  }
  return (
    <>
      {module ? 
      <div>
        <div className="header pb-6 mr-top-fx">
          <div className="container-fluid">
              <div className="header-body">
                <div className="row align-items-center py-4">
                    <div className="col-lg-6 col-7">
      <p className="d-inline-block mb-0 breat-fx"><i className="fa fa-folder-open text-info"></i> Universidad San Ignacio de Loyola > Visor de documentos - {module.module.name}</p>
                    </div>
                </div>
              </div>
          </div>
        </div>

        <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-md-8">

                <div id="presentation" style={{textAlign: 'center'}}>

                  {
                    view ? view : primeraVista()
                  }


                {/* <object style={{width: 100+'%', minHeight: 500+'px'}}  
                    data="https://contenidoscev.usil.edu.pe/EPG/MBA-DG/metodos_cuantitativos/Unidad_1/Video_introductorio/MCN_UD1_Intro/story_html5.html">
                </object> */}
                {/* <object style={{width: 100+'%', minHeight: 500+'px'}}  
                    data="https://youtu.be/5EggK6AIVoc">
                </object> */}
                {/* <iframe width="560" height="315" src="//www.youtube.com/embed/5EggK6AIVoc" frameBorder="0" allowFullScreen></iframe> */}
                {/* <iframe width="560" height="315" src="//www.youtube.com//FoP_mEKdy5Y" frameBorder="0" allowFullScreen></iframe> */}




                </div>
            </div>
            <div className="col-md-4">

              { itinerario() }
              
            </div>
          </div>

        </div>
      </div> : 
      <Loader />}
      </>
  )
}
export default  withLayout()(Module)
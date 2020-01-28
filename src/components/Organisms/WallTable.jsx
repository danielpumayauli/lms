import React, { useState, useRef } from 'react'

import $ from 'jquery';
import Swal from 'sweetalert2';
import Axios from 'axios';

import Error from '../Pages/Course/Error';




const Table = ({head, body, is_student}) => {


    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null
    const [flag,cambiaFlag] = useState(body);
    const userFirstname = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).firstname : null




 function deleteAnnouncement(id,course_id) {
        console.log('eliminando', id);

        // TODO: Eliminar los registros
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Un anuncio eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText : 'Cancelar'
        }).then( async (result) => {
            if (result.value) {
                try {
                    const url = `http://159.89.88.142/api/courses/${course_id}/announcements/${id}`;

                    const resultado = await Axios.delete(url);
                    if(resultado.status === 200){
                        Swal.fire(
                            'Eliminado!',
                            'El Anuncio se ha eliminado',
                            'success'
                        )

                        window.location.reload(false);

                  
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'Hubo un error, vuelve a intentarlo'
                    })
                }
            }
        })

    
    }



    function detailAnnouncement(description,id) {
          
       var newId = id;
       var newDescription = description;

       document.getElementById('descriptionData').innerHTML = newDescription;
       document.getElementById('idData').value = newId;
        
        $('#modalDetailAnnouncement').modal('show');
    
    }

    // generar los refs : los valores que existen en el html del form
    const descriptionRef = useRef('');
    const idDataRef = useRef('');
    
    // Mensaje de error para Editar
    const [ errorvalidar, guardarError ] = useState(false);
    
    async function editWall(flag) {   

         const  newDescription = descriptionRef.current.value;
         const  newId = idDataRef.current.value;   

        if(newDescription === '' ) {   
            guardarError(true);
            return;
        }

        guardarError(false);


     
     
     const editWall = {
          
        description : newDescription,
        course_id: 1,
        privacy_state_id:1,
        reply_permission:1,
        dispatch_email:1,
        editor_id: 3,
        visibility_author:flag,
        editor_id:userId
               
     }
 
    // Enviar el Request
     const url = `http://159.89.88.142/api/courses/2/announcements/${newId}`;

     try {
         const resultado = await Axios.put(url, editWall);

         if(resultado.status === 200) {
             Swal.fire(
                 'Mensaje Editado',
                 'El anuncio se editó correctamente',
                 'success'
             )
             window.location.reload(false);
         }
     } catch (errorvalidar) {
         console.log(errorvalidar);
         Swal.fire({
             type: 'error',
             title: 'Error',
             text: 'Hubo un error, vuelve a intentarlo'
         })
     }
    
 }

    return (
        <>     
          <div>
                    {
                        flag.map(
                            (tr, index) =>  <div key={index}>



<div className="card">
          
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-auto">
               
                <a href="#" class="avatar avatar-xl rounded-circle">
                  <img alt="Image placeholder" src="https://scontent.flim14-1.fna.fbcdn.net/v/t1.0-9/10458338_620953564705720_8412713086015389626_n.jpg?_nc_cat=103&_nc_eui2=AeHoFsxF2kpVoa-t3CV98XG6ntM98MCH6B1OyLAryb2sSp7SnTt7v1Y_Z4R_t4uGcg4ikMhJS0PM_YWL93IIlWvIdnlVRqpl_34XeNaPnD5lRQ&_nc_oc=AQkhLhktDmkvgnDccJx7A9VglwxmTKPtKwSF4gE-DRJdPi8KCEOSkMxDI4ykg8nqQA8&_nc_ht=scontent.flim14-1.fna&oh=0dc35ff4dac6008221ce07e7f724c184&oe=5E440726" />
                </a>
              </div>

              <div className="col ml--2">
                <h4 className="mb-0">
                { tr.visibility_author ? tr.author_fullname :'anónimo' } 
                </h4>
                <p className="text-sm text-muted mb-0">{ tr.description } </p>

                {
                    !is_student ? 
                    <small>

                        &nbsp; 
                        <a id="deleteComment" title="Eliminar"
                        href="#" onClick={() => deleteAnnouncement(tr.id,tr.course_id)}>Eliminar</a>

                                                                        &nbsp; 
                        <a id="editComment" title="Editar"detailAnnouncement
                        href="#" onClick={() => detailAnnouncement(tr.description,tr.id)}>Editar</a>
                                                            
                                                                    

                    </small>
                    : null
                }
                
                
              </div>
            
            </div>
          </div>
        </div>




 
                                            </div>
                        )
                    }                
      </div>
           




     <div className="modal fade" id="modalDetailAnnouncement" tabIndex="-1" role="dialog" aria-labelledby="modalAddFolderTitle" aria-hidden="true">
     <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Editar publicación</h5>

               
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
       </button>
                </div>
                <form id='update' name='update'>
                   <div className="modal-body">                    
                    <div className="form-group">
                        <textarea className="form-control" name="description" id="descriptionData" rows="3"
                        ref={descriptionRef}
                        >
                          </textarea>
                          <input className="form-control" name="idData" id="idData" type='hidden'
                          ref={idDataRef}
                          >

                          </input>
                     </div>
                    </div>

             <div className="btn-group float-right" role="group">
            
            
    <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Actualizar
    </button>
    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
    <span className="dropdown-item"  id='toPost' onClick={() => editWall(1)}><strong>Publicar como {userFirstname}</strong></span>
     <span className="dropdown-item"  id='Anonymus' onClick={() => editWall(0)}>Publicar Anónimo</span>
    </div>
  </div>

 
                </form>
            </div>
            </div>
        </div>





        </>
    )
}

export default Table

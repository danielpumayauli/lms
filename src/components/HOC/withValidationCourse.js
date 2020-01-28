import React, { Component } from "react"
import Loader from "../Organisms/Loader"
import {
    NOT_FOUND,
    RESTRICTED,
    ACTIVATED
} from "../../config/constants"
import Axios from "axios"
import NotFound from "../Organisms/NotFound"
import Restricted from "../Organisms/Restricted"


const withValidationCourse = (propValue) => (WrappedComponent) => {

    return class withValidationCourse extends Component {
        state = {
            name: null,
            options: null,
            is_student: null,
            access: null, // null, NotFound, Restricted, activated
          }
        // componentWillMount () {
        //     console.log('en el will mount')
            
            
        //     console.log(this.state.access)
        //     // this.setState({...this,access:false})
        //     console.log(this.state.access)

            
        //     // console.log(access)
        // }
        

        componentDidMount () {
            const { match } = this.props
            const fragment = this.props.match.path.replace('/courses/:id/','') // Se obtiene el apartado solicitado del curso
            const API_URL = process.env.REACT_APP_API_URL

            // Axios.get(`${API_URL}/courses/${match.params.id}/options`,{
            //     headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
            // })
            Axios.get(`${API_URL}/courses/${match.params.id}/options`,{
                headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
            })
            .then(o => {

                // console.warn(o.data.data)
                
                let filtro = o.data.data.options.filter(option => option.visibility === false && option.alias === fragment)
                // console.log(fragment,filtro)

                /**
                 * length de filtro es mayor a cero cuando encuentra una conincidencia entre un apartado de curso pedido
                 * y una opción no habilitada a los estudiantes (también cuando el estudiante intente entrar a settings), 
                 * en ese caso se renderizará un componente de restricción.
                 */
                
                if(o.data.data.is_student && (filtro.length > 0 || fragment === 'settings')){
                    this.setState({...this, options: [], access: RESTRICTED})
                }else{
                    this.setState({...this, 
                        name: o.data.data.course.name, 
                        options: o.data.data.options,
                        is_student: o.data.data.is_student,
                        access: ACTIVATED })
                }

            })
            .catch(er => {
                console.log(er)
                this.setState({...this, options: [], access: NOT_FOUND})
                // console.log('se cambio el estado', match.params.id, this.state.access), opc. Personalizar aquí el notfound según la respuesta

            })
                

        }

        

        render() {
            
            if(this.state.access === null){
                return <Loader />
            }else if (this.state.access === ACTIVATED) {
                // console.log('en el HOC rol es: ', this.state.is_student)
                return  <>
                            <WrappedComponent {...this.props} name={this.state.name} options={this.state.options} is_student={this.state.is_student} />
                        </>
            }else if (this.state.access === NOT_FOUND) {
                return  <>
                            <NotFound/>
                        </>
            }else if (this.state.access === RESTRICTED) {
                return  <>
                            <Restricted/>
                        </>
            } else {
                return  <>
                        <p>404</p>
                        </>
            }
            
        }

    }
}

export default withValidationCourse
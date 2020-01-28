import React, { Component } from "react"
import Loader from "../Organisms/Loader"
import Axios from "axios"


const withFolderRoot = (propValue) => (WrappedComponent) => {

    return class withValidationCourse extends Component {
        state = {
            rootFolder: null,
            rootFolderName: null
            // access: null // null, NotFound, Restricted, activated
          }
        

        componentDidMount () {
            const { match } = this.props
            const API_URL = process.env.REACT_APP_API_URL

            Axios.get(`${API_URL}/courses/${match.params.id}/folders?container=true`,{
                headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
            })
            .then(r => {
                
                if(r.data.success){
                    
                    this.setState({...this, rootFolder: r.data.data.id, rootFolderName: r.data.data.display_name})
                } else{
                    this.setState({...this, rootFolder: null, rootFolderName: null})

                }
                
            })
            .catch(er => {
                console.log(er)
                this.setState({...this, rootFolder: false, rootFolderName: false})
            })
                

        }

        

        render() {
            if(this.state.rootFolder === null){
                return <Loader />
            }else{
                return (
                    <WrappedComponent {...this.props} rootFolder={this.state.rootFolder} />
                    )
            }
            
        }

    }
}

export default withFolderRoot
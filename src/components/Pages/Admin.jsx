import React from 'react'
import {Redirect} from 'react-router-dom'



const Admin = () => {
  return (<Redirect to={'/admin/courses'} />);
}

export default Admin 

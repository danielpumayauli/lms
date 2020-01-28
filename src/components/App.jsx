import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Protected from './Routes/Protected'
import Public from './Routes/Public'
import Home from './Pages/Home'
import Admin from './Pages/Admin'
import Courses from './Pages/Courses'
import Course from './Pages/Course/Course'
import Login from './Pages/Login'
import Page404 from './Pages/Page404'
import Forums from './Pages/Course/Forums'

import Wall from './Pages/Course/Wall'

import Announcements from './Pages/Course/Announcements'
import Support from './Pages/Support'
import Tutorials from './Pages/Tutorials'

import Calendar from './Pages/Calendar'
import Groups from './Pages/Groups'
import Conversations from './Pages/Conversations'
import Module from './Pages/Module'


import Assignments from './Pages/Course/Assignments'
import Users from './Pages/Course/Users'
import Files from './Pages/Course/Files'
import Settings from './Pages/Course/Settings'
import AdminCourses from './Pages/Admin/Courses'
import AdminUsers from './Pages/Admin/Users'
import AdminPrograms from './Pages/Admin/Programs'
import AdminCategories from './Pages/Admin/Categories'
import AdminSettings from './Pages/Admin/Settings'

const App = () => (
  <Router basename="/lms">
    
    <Switch>
      <Protected path="/" exact component={Home} />

      <Protected path="/admin" exact component={Admin} />
      <Protected path="/admin/courses" component={AdminCourses} />
      <Protected path="/admin/users" component={AdminUsers} />
      <Protected path="/admin/programs" component={AdminPrograms} />
      <Protected path="/admin/categories" component={AdminCategories} />
      <Protected path="/admin/settings" component={AdminSettings} />

      <Protected path="/support" component={Support} />
      <Protected path="/tutorials" component={Tutorials} />

      <Protected path="/calendar" component={Calendar} />
      <Protected path="/groups" component={Groups} />
      <Protected path="/conversations" component={Conversations} />


      <Protected path="/courses" exact component={Courses} />
      <Protected path="/courses/:id" exact component={Course} />
      <Protected path="/courses/:id/announcements" component={Announcements} />
      <Protected path="/courses/:id/forums" component={Forums} />
      <Protected path="/courses/:id/wall" component={Wall} />

      <Protected path="/courses/:id/assignments" component={Assignments} />
      <Protected path="/courses/:id/users" component={Users} />
      <Protected path="/courses/:id/files" component={Files} />
      <Protected path="/courses/:id/settings" component={Settings} />

      <Protected path="/courses/:id/module/:module" component={Module} />

      

      <Public path="/login" component={Login} />
      
      <Route component={Page404}/>
      
    </Switch>
  </Router>
)

export default App;

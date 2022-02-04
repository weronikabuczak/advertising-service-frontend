import {Switch, Route, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthorizationPage';
import HomePage from './pages/HomePage';
import NewTaskPage from "./pages/NewTaskPage";
import TaskAdded from "./components/NewTask/TaskAdded";
import UserTasks from "./components/Profile/UserTasks/UserTasks";
import {useSelector} from "react-redux";
import {getRole, isUserLoggedIn} from "./store/auth";
import ProfilePage from "./pages/ProfilePage";
import TaskDetails from "./components/HomePage/TaskList/TaskItem/TaskDetails/TaskDetails";
import UserDetails from "./components/HomePage/TaskList/TaskItem/TaskDetails/UserDetails/UserDetails";
import AdminPanel from "./components/Administration/AdminPanel";

function App() {
    const isLoggedIn = useSelector(isUserLoggedIn);
    const role = useSelector(getRole);
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    {!isLoggedIn && <Redirect to='/auth'/>}
                    <HomePage/>
                </Route>
                {!isLoggedIn && (
                    <Route path='/auth'>
                        <AuthPage/>
                    </Route>
                )}
                <Route path='/profile'>
                    {isLoggedIn && <ProfilePage/>}
                    {!isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='/newTask'>
                    {isLoggedIn && <NewTaskPage/>}
                    {!isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='/taskAdded'>
                    {isLoggedIn && <TaskAdded/>}
                    {!isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='/userTasks'>
                    {isLoggedIn && <UserTasks/>}
                    {!isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='/taskDetails:id?'>
                    {isLoggedIn && <TaskDetails/>}
                    {!isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='/user:id?'>
                    {isLoggedIn && <UserDetails/>}
                    {!isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='/admin'>
                    {isLoggedIn && role === 'ADMIN' && <AdminPanel/>}
                    {!isLoggedIn && role !== 'ADMIN' && <Redirect to='/auth'/>}
                </Route>
                <Route path='*'>
                    <Redirect to='/'/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
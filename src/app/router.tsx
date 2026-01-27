import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import CompanyList from "../features/companies/CompanyList";
import MonthlyTaskBoard from "../features/tasks/MonthlyTaskBoard";
import MainLayout from "../layouts/MainLayout";
import { RequireAuth } from "../core/auth/RequireAuth";
import TaskDefinitionList from "../features/task-definitions/TaskDefinitionList";
import CompanyTaskList from "../features/company-tasks/CompanyTaskList";
import TaskAssignmentList from "../features/task-assignments/TaskAssignmentList";
import TaskAssignmentCalendar from "../features/task-assignments/TaskAssignmentCalendar";
import Dashboard from "../features/dashboard/Dashboard";
import Unauthorized from "../features/auth/Unauthorized";
import HomePage from "../pages/home";
import ProfilePage from "../features/profile/ProfilePage";
import TaskSubItemCreatePage from "../features/task-subitems/TaskSubItemCreatePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/*<Route path="/" element={<LoginPage />} />*/}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Authenticated */}
        <Route element={<RequireAuth allowUserPaths={["/my-tasks"]} />}>
        {/*<Route element={<RequireAuth />}>*/}
          <Route element={<MainLayout />}>
           
            <Route path="/my-tasks" element={<TaskAssignmentCalendar />} />

            {/* Admin only */}
             {/*role="admin" requiredAuth a bu eklenecek*/}
            <Route element={<RequireAuth />}>
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/subtasks-definitions" element={<TaskSubItemCreatePage />} />
              <Route path="/tasks-definitions" element={<TaskDefinitionList />} />
              <Route path="/company-tasks" element={<CompanyTaskList />} />
              <Route path="/task-assignments" element={<TaskAssignmentList />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/tasks" element={<MonthlyTaskBoard />} />

            </Route>
            </Route>         
          </Route>      
      </Routes>
    </BrowserRouter>
  );
}




/*eski rout yapım
import { BrowserRouter,Routes,Route } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import CompanyList from "../features/companies/CompanyList";
import MonthlyTaskBoard from "../features/tasks/MonthlyTaskBoard";
import MainLayout from "../layouts/MainLayout";
import { RequireAuth } from "../core/auth/RequireAuth";
import TaskDefinitionList from "../features/task-definitions/TaskDefinitionList";
import CompanyTaskList from "../features/company-tasks/CompanyTaskList";
import TaskAssignmentList from "../features/task-assignments/TaskAssignmentList";
import TaskAssignmentCalendar from "../features/task-assignments/TaskAssignmentCalendar";
import Dashboard from "../features/dashboard/Dashboard";
import Unauthorized from "../features/auth/Unauthorized";

export default function AppRouter(){
return (
     <BrowserRouter>
        <Routes>
            {/* Public *//*}
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/" element={<LoginPage/>} />
            <Route path="/unauthorized" element={<Unauthorized/>}/>
            {/* Protected *//*}
            <Route
            element={
                <RequireAuth>
                    <MainLayout/>
                </RequireAuth>
            }
            >
                <Route
                path="/companies"
                element={
                    <RequireAuth role="Admin">
                        <CompanyList />
                    </RequireAuth>
                }
                />
                <Route
                path="/tasks"
                element={
                    <RequireAuth>
                        <MonthlyTaskBoard />
                    </RequireAuth>
                }
                />
                <Route
                path="/tasks-definitions"
                element={
                    <RequireAuth role="Admin">
                        <TaskDefinitionList />
                    </RequireAuth>
                }
                />
                 <Route
                path="/company-tasks"
                element={
                    <RequireAuth role="Admin">
                        <CompanyTaskList />
                    </RequireAuth>
                }
                />
                <Route
                path="/task-assignments"
                element={
                    <RequireAuth role="Admin">
                        <TaskAssignmentList />
                    </RequireAuth>
                }
                />
                <Route
                path="/my-tasks"
                element={
                    <RequireAuth>
                        <TaskAssignmentCalendar />
                    </RequireAuth>
                }
                />
                 <Route
                path="/dashboard"
                element={
                    <RequireAuth role="Admin">
                        <Dashboard />
                    </RequireAuth>
                }
                />
                </Route>
        </Routes>
     </BrowserRouter>
    );
}*/
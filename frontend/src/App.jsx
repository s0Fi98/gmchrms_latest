import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import Login from './features/auth/login/Login' 
import CommonLayout from './layouts/CommonLayout'
import Home from './features/home/Home'
import EmployeeData from './features/employees/datas/EmployeeData'
import EmployeeProfile from './features/employees/profiles/EmployeeProfile'
import AttendanceMarking from './features/attendance/marking/AttendanceMarking'
import AttendanceReport from './features/attendance/report/AttendanceReport'
import AttendanceStatement from './features/attendance/statement/AttendanceStatement'
import LeaveRecords from './features/leave/records/LeaveRecords'
import LeaveApproval from './features/leave/approvals/LeaveApproval'
import ApplyLeave from './features/leave/apply/ApplyLeave'
import SalaryStatement from './features/payroll/statements/SalaryStatement'
import SalarySlip from './features/payroll/payslip/SalarySlip'
import SalaryGeneration from './features/payroll/generation/SalaryGeneration'
import SalaryAbstract from './features/payroll/abstract/SalaryAbstract'
import SectionAllocation from './features/departments/section/SectionAllocation'
import DepartmentDetails from './features/departments/details/DepartmentDetails'
import ArrearSuspension from './features/suspension/allowance/ArrearSuspension'
import AddSuspension from './features/suspension/add/AddSuspension'
import ReinstatementOrder from './features/suspension/reinstatement/ReinstatementOrder'
import AddDaPercent from './features/arrear/da/AddDaPercent'
import PayRevisionArrear from './features/arrear/revision/PayRevisionArrear'
import Increment from './features/arrear/increment/Increment'
import LeaveBill from './features/arrear/leave/LeaveBill'
import ArrearStatements from './features/arrear/statements/ArrearStatements'
import AddEpf from './features/epf/add/AddEpf'
import EpfStatements from './features/epf/statement/EpfStatements'
import FormSummary from './features/epf/form/FormSummary'

import ManageAllowance from './features/settings/allowance/ManageAllowance'
import ManageDesignation from './features/settings/designation/ManageDesignation'
import ManageHolidays from './features/settings/holidays/ManageHolidays'
import ManageLeaves from './features/settings/leaves/ManageLeaves'
import ManageBranches from './features/settings/branches/ManageBranches'

const routesPath = createBrowserRouter([
    {
        path: '/', element: <Navigate to="/login" replace />,
    },
    {
        path: '/login', element: <Login />,
    },
    {
        path: '/home', 
        element: <CommonLayout />,
        children: [
            {
                index: true, element: <Home />,
            },
            {
                path: '/home', element: <Home />,
            },
            {
                path: '/home/employees/data', element: <EmployeeData />,
            },
            {
                path: '/home/employees/profile', element: <EmployeeProfile />,
            },
            {
                path: '/home/attendance/marking', element: <AttendanceMarking />,
            },
            {
                path: '/home/attendance/report', element: <AttendanceReport />,
            },
            {
                path: '/home/attendance/statement', element: <AttendanceStatement />,
            },
            {
                path: '/home/leave/records', element: <LeaveRecords />,
            },
            {
                path: '/home/leave/approvals', element: <LeaveApproval />,
            },
            {
                path: '/home/leave/apply', element: <ApplyLeave />,
            },
            {
                path: '/home/payroll/statements', element: <SalaryStatement />,
            },
            {
                path: '/home/payroll/payslips', element: <SalarySlip />,
            },
            {
                path: '/home/payroll/generation', element: <SalaryGeneration />,
            },
            {
                path: '/home/payroll/abstract', element: <SalaryAbstract />,
            },
            {
                path: '/home/departments/sections', element: <SectionAllocation />,
            },
            {
                path: '/home/departments/details', element: <DepartmentDetails />,
            },
            {
                path: '/home/suspension/allowance', element: <ArrearSuspension />,
            },
            {
                path: '/home/suspension/add', element: <AddSuspension />,
            },
            {
                path: '/home/suspension/reinstatement', element: <ReinstatementOrder />,
            },
            {
                path: '/home/arrears/da%', element: <AddDaPercent />,
            },
            {
                path: '/home/arrears/pay-revision', element: <PayRevisionArrear />,
            },
            {
                path: '/home/arrears/add-increment', element: <Increment />,
            },
            {
                path: '/home/arrears/leave-bill', element: <LeaveBill />,
            },
            {
                path: '/home/arrears/arrear-statements', element: <ArrearStatements />,
            },
            {
                path: '/home/epf/add-epf', element: <AddEpf />,
            },
            {
                path: '/home/epf/generate-statement', element: <EpfStatements />,
            },
            {
                path: '/home/epf/returns', element: <FormSummary />,
            },
            {
                path: '/home/settings/manage-allowances', element: <ManageAllowance />,
            },
            {
                path: '/home/settings/manage-designations', element: <ManageDesignation />,
            },
            {
                path: '/home/settings/manage-holidays', element: <ManageHolidays />,
            },
            {
                path: '/home/settings/manage-leaves', element: <ManageLeaves />,
            },
            {
                path: '/home/settings/manage-branches', element: <ManageBranches />,
            }
        ],
    },
    {
        path: '*', element: <Navigate to="/" replace />,
    },
])

function App() {
    return (
        <React.Fragment>
            <RouterProvider router={routesPath} />
        </React.Fragment>
    )
}

export default App
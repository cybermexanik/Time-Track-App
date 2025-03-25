import * as React from "react";
import { FC } from "react";
import "./EmployyesPage.css";
import Users from "../../components/Employyes/Employyes";
import UsersTable from "../../components/Employyes/UsersTable";


const EmployyesPage: FC = () => {
    return (
        <div className="employyes-page">
            <div className="employyes-content">
                <div className="content-grid-one">
                    <Users />
                </div>
                <div className="content-grid-two">
                    <UsersTable/>
                </div>
            </div>
        </div>
    );
}

export default EmployyesPage;
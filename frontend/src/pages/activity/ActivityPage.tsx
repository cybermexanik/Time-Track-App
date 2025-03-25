import * as React from "react";
import { FC } from "react";
import WorkAnalitycs from "../../components/Activity/WorkAnalitycs";
import EmployyePerformance from "../../components/Activity/EmployyePerformance";
import Transactions from "../../components/Employyes/Employyes";
import Financial from "../../components/Settings/Settings";
import ProductPerformance from "../../components/Activity/ProductPerformance";


const ActivityPage: FC = () => {
    return (
        <div className="home-page">
            <div className="home-content">
                <div className="content-grid-one">
                    <EmployyePerformance/>
                    <ProductPerformance/>
                </div>
                <div className="content-grid-two">
                    <WorkAnalitycs/>
                </div>
            </div>
        </div>
    );
}

export default ActivityPage;
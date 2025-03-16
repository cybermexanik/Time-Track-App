import "./ContentMain.css";
import Cards from "../Cards/Cards.tsx";
import Transactions from "../Employyes/Employyes.js";
import Report from "../Report/Report.tsx";
import Budget from "../Budget/Budget.tsx";
import Subscriptions from "../Subscriptions/Subscriptions.js";
import Savings from "../Savings/Savings.js";
import Loans from "../Loans/Loans.js";
import Financial from "../Settings/Settings.js";
import React from "react";

const ContentMain = () => {
  return (
    <div className="main-content-holder">
        <div className="content-grid-one">
            <Cards />
            <Transactions />
            <Report />
        </div>
        <div className="content-grid-two">
            <Budget />
            <div className="grid-two-item">
              <div className="subgrid-two">
                <Subscriptions />
                <Savings />
              </div>
            </div>

            <div className="grid-two-item">
              <div className="subgrid-two">
                <Loans />
                <Financial />
              </div>
            </div>
        </div>
    </div>
  )
}

export default ContentMain

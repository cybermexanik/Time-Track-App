import "./Employyes.css";
import { transactions } from "../../data/data";
import { iconsImgs } from "../../utils/images";
import React from "react";

const Transactions = () => {
  return (
    <div className="grid-one-item grid-common grid-c2">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Пользователи :</h3>
            <button className="grid-c-title-icon">
                <img src={ iconsImgs.plus } />
            </button>
        </div>

        <div className="grid-content">
            <div className="grid-items">
                {
                    transactions.map((transaction) => (
                        <div className="grid-item" key = { transaction.id }>
                            <div className="grid-item-l">
                                <div className="avatar img-fit-cover">
                                    <img src={ transaction.image } alt="" />
                                </div>
                                <p className="text">{ transaction.name } <span>{ transaction.role }</span></p>
                            </div>
                            <div className="grid-item-r">
                                <span>{ transaction.status }</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Transactions

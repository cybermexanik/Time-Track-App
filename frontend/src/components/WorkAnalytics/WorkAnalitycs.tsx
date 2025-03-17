import React, { useState } from "react";
import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FC } from "react";
import './WorkAnalytics.css';

const revenueData = [
    {name:"Январь", hoursActivity:730, hoursTarget: 865},
    {name:"Февраль", hoursActivity:690, hoursTarget: 865},
    {name:"Март", hoursActivity:800, hoursTarget: 865},
    {name:"Апрель", hoursActivity:890, hoursTarget: 865},
    {name:"Май", hoursActivity:733, hoursTarget: 865},
    {name:"Июнь", hoursActivity:712, hoursTarget: 865},
    {name:"Июль", hoursActivity:835, hoursTarget: 865},
    {name:"Август", hoursActivity:660, hoursTarget: 865},
    {name:"Сентябрь", hoursActivity:770, hoursTarget: 865},
    {name:"Октябрь", hoursActivity:695, hoursTarget: 865},
    {name:"Ноябрь", hoursActivity:820, hoursTarget: 865},
    {name:"Декабрь", hoursActivity:679, hoursTarget: 865},
];

const WorkAnalitycs: FC = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState("Месяц");

    return (
        <motion.div
            className='analytics-container'
            initial={{opacity:0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{delay:0.2}}
        >
            <div className='analytics-header'>
                <h2 className='analytics-title'>Активность :</h2>
                <select
                    className='analytics-select'
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                >
                    <option>Неделя</option>
                    <option>Месяц</option>
                    <option>Квартал</option>
                    <option>Год</option>
                </select>
            </div>

            <div className='analytics-chart-container'>
                <ResponsiveContainer>
                    <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#374151'/>
                        <XAxis dataKey='name' stroke='#9CA3AF'/>
                        <YAxis stroke='#9CA3AF'/>
                        <Tooltip
                            contentStyle={{backgroundColor:"rgba(31, 41, 55, 0.8)", borderColor:"#4B5563"}}
                            itemStyle={{color:"#E5E7EB"}}
                        />
                        <Legend/>
                        <Area 
                            type='monotone' 
                            dataKey='hoursActivity' 
                            name="Часы активности"
                            stroke='#fe6c00'
                            fill='#fe6c00'
                            fillOpacity={0.3}
                        />
                        <Area 
                            type='monotone' 
                            dataKey='hoursTarget' 
                            name="Целевые часы"
                            className="analytics-area-target"
                            stroke='#ffc397'
                            fill='#ffc397'
                            fillOpacity={0.3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
};

export default WorkAnalitycs;
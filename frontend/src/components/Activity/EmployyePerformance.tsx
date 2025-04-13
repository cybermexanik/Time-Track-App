import { motion } from "framer-motion";
import './EmployyePerformance.css';
import {
    ResponsiveContainer,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Legend,
    Tooltip,
} from "recharts";
import React from "react";

const customerSegmentationData = [
    { subject: "Время в работе", A: 120, B: 110, fullMark: 150 },
    { subject: "Выполнение задач", A: 98, B: 130, fullMark: 150 },
    { subject: "Участие в проектах", A: 86, B: 130, fullMark: 150 },
    { subject: "Перерывы", A: 99, B: 100, fullMark: 150 },
    { subject: "Ошибки", A: 85, B: 90, fullMark: 150 },
    { subject: "Пропуски", A: 65, B: 85, fullMark: 150 },
];

const CustomerSegmentation = () => {
    return (
        <motion.div
            className='employye-container'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
        >
            <h2 className='employye-title '>Активность сотрудников :</h2>
            <div className='employye-chart-container'>
                <ResponsiveContainer>
                    <RadarChart cx='50%' cy='50%' outerRadius='80%' data={customerSegmentationData}>
                        <PolarGrid stroke='#374151' />
                        <PolarAngleAxis dataKey='subject' stroke='#9CA3AF' />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} stroke='#9CA3AF' />
                        <Radar name='Сегмент A' dataKey='A' stroke='#8B5CF6' fill='#8B5CF6' fillOpacity={0.6} />
                        <Radar name='Сегмент B' dataKey='B' stroke='#10B981' fill='#10B981' fillOpacity={0.6} />
                        <Legend />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};
export default CustomerSegmentation;
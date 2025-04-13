import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import './ProductPerformance.css'
import React from "react";

const productPerformanceData = [
    { name: "Отдел кадров", Работа: 4000, Процесс: 2400, Профит: 2400 },
    { name: "Отдел разработки", Работа: 3000, Процесс: 1398, Профит: 2210 },
    { name: "Администрация", Работа: 2000, Процесс: 9800, Профит: 2290 },
    { name: "Сотрудники", Работа: 2780, Процесс: 3908, Профит: 2000 },
];

const ProductPerformance = () => {
    return (
        <motion.div
            className='product-container'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className='product-header'>
                <h2 className='product-title'>Активность по времени :</h2>
            </div>
            <div className='product-chart-container'>
                <ResponsiveContainer>
                    <BarChart data={productPerformanceData}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                        <XAxis dataKey='name' stroke='#9CA3AF' />
                        <YAxis stroke='#9CA3AF' />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend />
                        <Bar dataKey='Работа' fill='#8B5CF6' />
                        <Bar dataKey='Процесс' fill='#10B981' />
                        <Bar dataKey='Профит' fill='#F59E0B' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};
export default ProductPerformance;
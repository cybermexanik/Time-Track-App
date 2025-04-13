// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; // Используем наш хук
import { useAuth } from '../context/authContext';

interface ProtectedRouteProps {
    children: React.ReactElement; // Компонент, который нужно защитить
    allowedRoles?: string[];     // Массив ролей, которым разрешен доступ
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { isAuthenticated, isLoading, hasRole, user } = useAuth();
    const location = useLocation(); // Для запоминания пути при редиректе на логин

    if (isLoading) {
        return <div>Проверка доступа...</div>;
    }

    // 2. Если пользователь не аутентифицирован, редирект на страницу входа
    if (!isAuthenticated) {
        // Сохраняем путь, чтобы вернуться после логина (опционально)
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // 3. Если роли для этого маршрута не указаны (allowedRoles пуст или undefined),
    //    значит доступ разрешен любому аутентифицированному пользователю.
    //    ИЛИ если пользователь имеет необходимую роль.
    if (!allowedRoles || allowedRoles.length === 0 || hasRole(allowedRoles)) {
         // Пользователь аутентифицирован и имеет нужную роль (или роли не требуются)
        return children; // Отображаем защищенный компонент
    }

    // 4. Если пользователь аутентифицирован, но не имеет нужной роли
    console.warn(`User ${user?.name} with roles [${user?.role?.map(r => r.role_name).join(', ')}] tried to access a route requiring roles [${allowedRoles.join(', ')}]`);
    return <Navigate to="/unauthorized" replace />; // Редирект на страницу "Нет доступа"
};

export default ProtectedRoute;
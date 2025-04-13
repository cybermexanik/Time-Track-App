// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'; // Для редиректа при ошибках

// Интерфейс для данных пользователя (адаптируйте под вашу структуру)
interface UserRole {
    role_id: number;
    role_name: string; // Важное поле для проверки прав
}

interface User {
    id: number;
    name?: string;
    surname?: string;
    avatarUrl?: string;
    role?: UserRole[];
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>; // Если нужно обновлять извне
    isAuthenticated: boolean;
    isLoading: boolean; // Флаг загрузки данных пользователя
    logout: () => void; // Функция выхода
    hasRole: (roles: string[]) => boolean; // Функция проверки роли
}

// Создаем контекст с начальными значениями
export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => null,
    isAuthenticated: false,
    isLoading: true, // Начинаем с загрузки
    logout: () => {},
    hasRole: () => false,
});

// Хук для удобного использования контекста
export const useAuth = () => {
    return useContext(AuthContext);
};

// Компонент-провайдер
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate(); // Используем для редиректов из провайдера

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setIsLoading(false);
                setUser(null);
                return;
            }

            setIsLoading(true); // Начинаем загрузку
            try {
                const response = await fetch('http://localhost:3000/api/user/me', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (response.ok) {
                    const userData: User = await response.json();
                    setUser(userData);
                } else {
                    // Ошибка (например, токен невалиден)
                    console.error("Failed to fetch user:", response.status);
                    localStorage.removeItem('authToken'); // Удаляем невалидный токен
                    setUser(null);
                    // Можно добавить навигацию на /auth, если токен протух
                    // if (response.status === 401) navigate('/auth');
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUser(null); // Сбрасываем пользователя при ошибке сети
                localStorage.removeItem('authToken'); // Тоже удаляем токен
            } finally {
                setIsLoading(false); // Завершаем загрузку в любом случае
            }
        };

        fetchUser();
    }, []); // Запускаем один раз при монтировании

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        // Перенаправление на страницу входа после выхода
        navigate('/auth');
    };

    // Функция для проверки наличия у пользователя хотя бы одной из разрешенных ролей
    const hasRole = (allowedRoles: string[]): boolean => {
        if (!user || !user.role || user.role.length === 0) {
            return false; // Нет пользователя или ролей
        }
        // Проверяем, есть ли пересечение между ролями пользователя и разрешенными ролями
        return user.role.some(userRole => allowedRoles.includes(userRole.role_name));
    };


    const value = {
        user,
        setUser, // Добавили, если нужно будет обновлять пользователя из других мест
        isAuthenticated: !!user, // Пользователь аутентифицирован, если user не null
        isLoading,
        logout,
        hasRole, // Добавляем функцию проверки роли в контекст
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
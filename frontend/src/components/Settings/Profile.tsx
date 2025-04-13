import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import "./Profile.css";
import React, { useEffect, useState } from "react";
import { Form, Input, message, Modal, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import { UserOutlined } from '@ant-design/icons';

const Profile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editForm] = Form.useForm();
    const [newAvatar, setNewAvatar] = useState<File | null>(null);
    

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            setError(null);
            setUserData(null);

            try {
                const token = localStorage.getItem('authToken');

                if (!token) {
                    console.warn("Auth token not found in Profile component.");
                    setError("Пользователь не аутентифицирован");
                    return;
                }

                const response = await fetch("http://localhost:3000/api/user/me", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        console.error('Unauthorized access in Profile component.');
                        localStorage.removeItem('authToken');
                        setError("Ошибка аутентификации.");
                    } else {
                        const errorData = await response.text();
                        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}. ${errorData}`);
                    }
                    return;
                }

                const data: UserData = await response.json();
                console.log('User data received in Profile:', data);
                setUserData(data);

            } catch (err) {
                console.error("Ошибка при загрузке данных пользователя в Profile:", err);
                setError(err instanceof Error ? err.message : "Неизвестная ошибка загрузки данных");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);


    const handleEditProfile = () => {
        console.log("Edit profile clicked");
        setIsEditModalOpen(true);
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setNewAvatar(null); 
        editForm.resetFields(); 
        if (userData) {
            editForm.setFieldsValue({
                name: userData.name,
                surname: userData.surname,
                email: userData.email,
            });
        }
    };

    const handleEditOk = () => {
        editForm.validateFields().then(async (values) => {
            setIsLoading(true);
            setError(null);

            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('surname', values.surname);
            formData.append('email', values.email);
            if (newAvatar) {
                formData.append('avatar', newAvatar);
            }

            try {
                const token = localStorage.getItem('authToken');
                if (!userData?.id) {
                    console.error("User ID is not available for update.");
                    message.error("Не удалось определить ID пользователя.");
                    setIsLoading(false);
                    return;
                }
                const response = await fetch(`http://localhost:3000/api/user/${userData.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    throw new Error(`Ошибка обновления профиля: ${response.status} ${response.statusText}. ${errorData}`);
                }

                const updatedUserData: UserData = await response.json();
                setUserData(updatedUserData);
                setIsEditModalOpen(false);
                message.success("Профиль успешно обновлен!");
                setNewAvatar(null);

            } catch (err) {
                console.error("Ошибка при обновлении профиля:", err);
                setError(err instanceof Error ? err.message : "Неизвестная ошибка при обновлении профиля");
                message.error("Не удалось обновить профиль.");
            } finally {
                setIsLoading(false);
            }
        });
    };

    const handleAvatarChange = (info: any) => {
        if (info.file.originFileObj) {
            setNewAvatar(info.file.originFileObj as File);
        }
    };

    
    const renderProfileContent = () => {
        if (isLoading) {
            return <p>Загрузка профиля...</p>;
        }

        if (error) {
            return <p className="profile-error">Ошибка загрузки: {error}</p>;
        }

        if (userData) {
            return (
                <>
                    <div className="profile-container">
                        <div className="profile-image-container">
                            {userData.avatarUrl ? (
                                <img
                                    src={userData.avatarUrl}
                                    alt="Profile"
                                    className="profile-image"
                                />
                            ) : (
                                <UserOutlined className="profile-image-icon" style={{ fontSize: '60px', color:"white", marginLeft:"10px" }} />
                            )}
                        </div>

                        <div>
                        <h3 className="profile-name">
                                {userData.name || 'Имя не указано'} {userData.surname || 'Фамилия не указана'}
                            </h3>
                            <p className="profile-email">{userData.email || 'Email не указан'}</p>
                        </div>
                    </div>

                    <button className="profile-button" onClick={handleEditProfile}>
                        Редактировать профиль
                    </button>
                </>
            );
        }

        return <p>Не удалось загрузить данные профиля.</p>;
    };

    return (
        <SettingSection icon={User} title="Профиль">
            {renderProfileContent()}
            <Modal
                className='popUp'
                title="Редактировать профиль"
                open={isEditModalOpen}
                onCancel={handleEditCancel}
                onOk={handleEditOk}
                confirmLoading={isLoading}
            >
                <Form form={editForm} layout="vertical">
                    <Form.Item name="name" label="Имя" rules={[{ required: true, message: "Введите имя" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="surname" label="Фамилия" rules={[{ required: true, message: "Введите фамилию" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Введите корректный email" }]}>
                        <Input />
                    </Form.Item>
                    {/* <Form.Item label="Фото">
                        <ImgCrop aspect={1}>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleAvatarChange}
                            >
                                {newAvatar ? (
                                    <img src={URL.createObjectURL(newAvatar)} alt="avatar" style={{ width: '100%' }} />
                                ) : userData?.avatarUrl ? (
                                    <img src={userData.avatarUrl} alt="avatar" style={{ width: '100%' }} />
                                ) : (
                                    '+ Upload'
                                )}
                            </Upload>
                        </ImgCrop>
                    </Form.Item> */}
                </Form>
            </Modal>
        </SettingSection>
    );
};
export default Profile;

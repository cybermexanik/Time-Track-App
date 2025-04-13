import * as React from "react";
import {useEffect, useState} from "react";
import {Avatar, Button, Divider, Form, Input, List, Modal, Skeleton} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import './UsersTable.css';

const UsersTable = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<UserData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<UserData | null>(null);
    const [form] = Form.useForm();

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('http://localhost:3000/api/user')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);


    const showModal = (user?: UserData) => {
        if (user) {
            setEditUser(user);
            form.setFieldsValue({
                first: user.name,
                last: user.surname,
                email: user.email
            });
        } else {
            setEditUser(null);
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleOk = () => {
        form.validateFields().then((values) => {
            if (editUser) {
                setData(data.map(user =>
                    user.email === editUser.email
                        ? {
                            ...user,
                            name: values.first,
                            surname: values.last,
                            email: values.email
                        }
                        : user
                ));
            } else {
                const newUser: UserData = {
                    id: Date.now(),
                    name: values.first,
                    surname: values.last,
                    middlename: "",
                    email: values.email,
                    // avatarUrl: "https://placehold.co/64x64"
                };
                setData([...data, newUser]);
            }
            setIsModalOpen(false);
        });
    };

    const handleDelete = (email: string) => {
        setData(data.filter(user => user.email !== email));
    };


    return (
        <div className="users-table-container" id="scrollableDiv">
            <div className="header">
                <Button className="add-btn" onClick={() => showModal()}>Добавить пользователя</Button>
            </div>
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.email} className="user-item">
                            <List.Item.Meta
                                // avatar={<Avatar src={item.avatarUrl} />}
                                title={<span className="user-name">{`${item.name} ${item.surname}`}</span>}
                                description={<span className="user-email">{item.email}</span>}
                            />
                            <div className="buttons">
                                <Button className="change-btn" onClick={() => showModal(item)}>Изменить</Button>
                                <Button className="delete-btn" onClick={() => handleDelete(item.email)}>Удалить</Button>
                            </div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>

            <Modal className='popUp' title={editUser ? "Редактировать пользователя" : "Добавить пользователя"}
                   open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
                <Form form={form} layout="vertical">
                    <Form.Item name="first" label="Имя" rules={[{ required: true, message: "Введите имя" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="last" label="Фамилия" rules={[{ required: true, message: "Введите фамилию" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Введите корректный email" }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UsersTable;
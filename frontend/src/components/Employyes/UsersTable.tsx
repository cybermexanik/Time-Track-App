import * as React from "react";
import {useEffect, useState} from "react";
import {Avatar, Button, Divider, Form, Input, List, Modal, Skeleton} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import './UsersTable.css';


interface DataType {
    id: string;
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
    role: string;
}

const UsersTable = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<DataType | null>(null);
    const [form] = Form.useForm();

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);


    const showModal = (user?: DataType) => {
        if (user) {
            setEditUser(user);
            form.setFieldsValue({
                first: user.name.first,
                last: user.name.last,
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
                    user.email === editUser.email ? { ...user, name: { ...user.name, ...values }, email: values.email } : user
                ));
            } else {
                const newUser: DataType = {
                    id: Date.now().toString(),
                    gender: "unknown",
                    name: { title: "", first: values.first, last: values.last },
                    email: values.email,
                    picture: { large: "", medium: "", thumbnail: "" },
                    nat: "N/A",
                    role:"Разработчик"
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
                                avatar={<Avatar src={item.picture.large} />}
                                title={<span className="user-name">{`${item.name.first} ${item.name.last} (${item.role})`}</span>}
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
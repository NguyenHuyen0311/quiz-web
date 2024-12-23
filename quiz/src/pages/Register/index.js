import { Form, Input, Button, Alert } from 'antd';
import { generateToken } from "../../helpers/generateToken";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { checkExits, register } from '../../services/usersService';
import "./Register.scss";
import "../../base.scss";

function Register() {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (values) => {
        const fullName = values.fullName;
        const email = values.email;
        const password = values.password;

        const checkExitsEmail = await checkExits("email", email);
        
        if(checkExitsEmail.length > 0) {
            setAlert({ message: "Email đã tồn tại!", type: "warning" });
        } else {
                const options = {
                    fullName: fullName,
                    email: email,
                    password: password,
                    token: generateToken()
                };
        
                const response = await register(options);
                if (response) {
                    navigate("/login");
                } else {
                    setAlert({ message: "Đăng ký không thành công!", type: "error" });
                }
        }
    }

    return (
        <>
            <div className="register-container">
                <Form
                    name="register_form"
                    className="register-form"
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                >
                    <h2 className="register-title">Đăng ký</h2>

                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tên của bạn!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng điền email của bạn!' }]}
                    >
                        <Input type='email' />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng điền mật khẩu của bạn!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-button">
                            Đăng ký
                        </Button>
                    </Form.Item>

                    {alert && <Alert message={alert.message} type={alert.type} showIcon />}
                </Form>
            </div>
        </>
    );
}

export default Register;
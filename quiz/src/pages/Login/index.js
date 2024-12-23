import { Form, Input, Button, Alert } from 'antd';
import { login } from '../../services/usersService';
import { checkLogin } from "../../actions/login";
import { setCookie } from "../../helpers/cookie";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import "./Login.scss";
import "../../base.scss";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (values) => {
        const email = values.email;
        const password = values.password;
        const response = await login(email, password);  
        if(response.length > 0) {
            setCookie("id", response[0].id, 1);
            setCookie("fullName", response[0].fullName, 1);
            setCookie("email", response[0].email, 1);
            setCookie("token", response[0].token, 1);
            dispatch(checkLogin(true));
            navigate("/");
        } else {
            setAlert({ message: "Đăng nhập thất bại!", type: "error" });
        }
    }

    return (
        <>
            <div className="login-container">
                <Form
                    name="login_form"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                >
                    <h2 className="login-title">Đăng nhập</h2>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng điền email của bạn!' }]}
                    >
                        <Input type='email' placeholder="Nhập email của bạn" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng điền mật khẩu của bạn!' }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu của bạn" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-button">
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    {alert && <Alert message={alert.message} type={alert.type} showIcon />}
                </Form>
            </div>
        </>
    );
}

export default Login;
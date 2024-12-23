import { Button, Card, Col, message, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { getListTopic } from "../../services/topicService";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import "./Home.scss";
import "../../base.scss";

const { Title, Paragraph } = Typography;

function Home() {
    const [topics, setTopic] = useState([]);
    const navigate = useNavigate();
    const token = getCookie("token");

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTopic();
            setTopic(response.slice(0, 3));
        }
        fetchApi();
    }, []);

    const handleNavigate = (path) => {
        if (!token) {
            message.warning("Vui lòng đăng nhập để tiếp tục!");
        } else {
            navigate(path);
        }
    };

    return (
        <>
            <div className="open-section">
                <Title level={1}>Cùng học và kiểm tra kỹ năng của bạn!</Title>
                <Paragraph>Nâng cao kiến thức và thử thách bản thân với các bài kiểm tra thú vị.</Paragraph>
                <Button
                    className="button-open"
                    type="link"
                    size="large"
                    onClick={() => handleNavigate("/topic")}
                >
                    Luyện tập ngay
                </Button>
            </div>

            <div className="topics-section">
                <Title level={2}>Chủ đề nổi bật</Title>
                <Row gutter={[16, 16]}>
                    {topics.map((topic) => (
                        <Col xs={24} sm={12} md={8} key={topic.id}>
                            <Card className="topic-card" title={topic.name} bordered={false}>
                                <Paragraph>{topic.description}</Paragraph>
                                <Button
                                    type="primary"
                                    onClick={() => handleNavigate(`/quiz/${topic.id}`)}
                                >
                                    Bắt đầu
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
}

export default Home;
import { Button, Card, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { getListTopic } from "../../services/topicService";
import "./Home.scss";
const { Title, Paragraph } = Typography;

function Home() {
    const [topics, setTopic] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTopic();
            setTopic(response.slice(0,3));
        }
        fetchApi();
    }, []);

    return (
        <>
            <div className="open-section">
                <Title level={1}>Cùng học và kiểm tra kỹ năng của bạn!</Title>
                <Paragraph>Nâng cao kiến thức và thử thách bản thân với các bài kiểm tra thú vị.</Paragraph>
                <Button className="button-open" type="primary" size="large" href="#topics">
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
                                <Button type="primary">Bắt đầu</Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
}

export default Home;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Typography, Button } from "antd";
import { getListTopic } from "../../services/topicService";
import "./Topic.scss";

const { Title } = Typography;

function Topic() {
    const [topics, setTopic] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTopic();
            setTopic(response);
        };
        fetchApi();
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên chủ đề",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Button className="button-topic" type="link">
                    <Link to={`/quiz/${record.id}`}>Làm bài</Link>
                </Button>
            ),
        },
    ];

    return (
        <>
            <div className="table-topic">
                <Title level={2}>Danh sách chủ đề</Title>
                {topics.length > 0 && (
                    <Table
                        dataSource={topics}
                        columns={columns}
                        rowKey="id"
                        bordered
                        pagination={{ pageSize: 5 }}
                    />
                )}
            </div>
        </>
    );
}

export default Topic;

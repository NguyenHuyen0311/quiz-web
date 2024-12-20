import { useEffect, useState } from "react";
import { Table, Typography, Button } from "antd";
import { getAnswersByUserId } from "../../services/answersService";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
import "./Answers.scss";

const { Title } = Typography;

function Answers() {
    const [dataAnswers, setDataAnswers] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const answersByUserId = await getAnswersByUserId();
            const topics = await getListTopic();

            let result = [];
            for (let i = 0; i < answersByUserId.length; i++) {
                result.push({
                    ...topics.find(item => parseInt(item.id) === parseInt(answersByUserId[i].topicId)),
                    ...answersByUserId[i],
                })
            }
            setDataAnswers(result.reverse());
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
                <Button type="link" className="button-answers">
                    <Link to={`/result/${record.id}`}>Xem chi tiết</Link>
                </Button>
            ),
        },
    ];

    return (
        <>
            <div className="table-answers">
                <Title level={2}>Danh sách bài đã luyện tập</Title>
                <Table
                    dataSource={dataAnswers}
                    columns={columns}
                    rowKey={record => `${record.id}-${record.topicId}`}
                    bordered
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </>
    );
}

export default Answers;

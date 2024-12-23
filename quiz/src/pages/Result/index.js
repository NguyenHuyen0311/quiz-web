import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Row, Table, Tag, Typography } from "antd";
import { getAnswer } from "../../services/answersService";
import { getListQuestion } from "../../services/questionService";
import "./Result.scss";
import "../../base.scss";

const { Title, Text } = Typography;

function Result() {
    const params = useParams();
    const navigate = useNavigate();
    const [dataResult, setDataResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const fetchApi = async () => {
            const dataAnswers = await getAnswer(params.id);
            const dataQuestions = await getListQuestion(dataAnswers.topicId);

            let resultFinal = [];

            for (let i = 0; i < dataQuestions.length; i++) {
                resultFinal.push({
                    ...dataAnswers.answers.find(item => parseInt(item.questionId) === parseInt(dataQuestions[i].id)),
                    ...dataQuestions[i],
                });
            }
            setDataResult(resultFinal);
        };
        fetchApi();
    }, [params.id]);

    const totalQuestions = dataResult.length;
    const correctAnswers = dataResult.filter(item => item.correctAnswer === item.answer).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const correctPercentage = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) : 0;
    
    const handleRedo = () => {
        navigate(`/quiz/${dataResult[0].topicId}`);
    };

    const columns = [
        {
            title: "Câu hỏi",
            dataIndex: "question",
            key: "question",
            render: (text, _, index) => {
                const questionNumber = (currentPage - 1) * pageSize + index + 1;
                return `Câu ${questionNumber}: ${text}`;
            }
        },
        {
            title: "Kết quả",
            key: "result",
            render: (_, record) => (
                record.correctAnswer === record.answer ? (
                    <Tag color="green">Đúng</Tag>
                ) : (
                    <Tag color="red">Sai</Tag>
                )
            ),
        },
        {
            title: "Đáp án",
            key: "answers",
            render: (_, record) => (
                <div>
                    {record.answers.map((itemAns, indexAns) => {
                        let className = "";

                        if (record.answer === indexAns) {
                            className = "result__item--selected";
                        }

                        if (record.correctAnswer === indexAns) {
                            className += " result__item--result";
                        }

                        return (
                            <div className="result__answer" key={indexAns}>
                                <input type="radio" checked={record.answer === indexAns} disabled />
                                <label className={className}>{itemAns}</label>
                            </div>
                        );
                    })}
                </div>
            ),
        },
    ];

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
    };

    return (
        <>
            <div className="table__result">
                <div className="table__result--redo">
                    <Title level={2} style={{ margin: 0 }}>Kết quả:</Title>
                    <Button className="table__result--button" onClick={handleRedo}>Làm lại</Button>
                </div>
                <div className="table__result--stats">
                    <Row gutter={[16, 16]}>
                        <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                            <Card>Tổng số câu: <Text strong>{totalQuestions}</Text></Card>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                            <Card>Số câu đúng: <Text strong>{correctAnswers}</Text></Card>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                            <Card>Số câu sai: <Text strong>{incorrectAnswers}</Text></Card>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                            <Card>Phần trăm đúng: <Text strong>{correctPercentage}%</Text></Card>
                        </Col>
                    </Row>
                </div>
                <Table
                    dataSource={dataResult}
                    columns={columns}
                    bordered
                    rowKey="id"
                    pagination={{ pageSize }}
                    onChange={handleTableChange}
                />
            </div>
        </>
    );
}

export default Result;

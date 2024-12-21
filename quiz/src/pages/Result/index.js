import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Tag, Typography } from "antd";
import { getAnswer } from "../../services/answersService";
import { getListQuestion } from "../../services/questionService";
import "./Result.scss";

const { Title } = Typography;

function Result() {
    const params = useParams();
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
            <div className="table-result">
                <Title level={2}>Kết quả:</Title>
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

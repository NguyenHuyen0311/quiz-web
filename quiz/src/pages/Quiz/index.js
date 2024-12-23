import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizService";
import { Typography, Radio, Button, Card, Space, Form, message } from "antd";
import "./Quiz.scss";
import "../../base.scss";

const { Title, Paragraph } = Typography;

function Quiz() {
  const params = useParams();
  const [dataTopic, setDataTopic] = useState();
  const [dataQuestions, setDataQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      const response = await getTopic(params.id);
      setDataTopic(response);
    };
    fetchTopic();
  }, [params.id]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getListQuestion(params.id);
      setDataQuestions(response);
    };
    fetchQuestions();
  }, [params.id]);

  const handleSubmit = async (values) => {
    const selectedAnswers = Object.keys(values).map((key) => ({
      questionId: parseInt(key),
      answer: parseInt(values[key]),
    }));

    const options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: selectedAnswers,
    };

    try {
      const response = await createAnswer(options);
      if (response) {
        message.success("Nộp bài thành công!");
        navigate(`/result/${response.id}`);
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi nộp bài!");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Card className="quiz-title">
        <Title level={2}>
          Bài Quiz chủ đề: {dataTopic && <>{dataTopic[0].name}</>}
        </Title>
      </Card>

      <Form onFinish={handleSubmit} layout="vertical" className="quiz-form">
        <Space direction="vertical" size="large" className="quiz-form__item">
          {dataQuestions.map((item, index) => (
            <Card key={item.id}>
              <Paragraph>
                <strong>Câu {index + 1}:</strong> {item.question}
              </Paragraph>
              <Form.Item
                name={String(item.id)}
                rules={[{ required: true, message: "Vui lòng chọn câu trả lời!" }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    {item.answers.map((itemAns, indexAns) => (
                      <Radio key={indexAns} value={indexAns}>
                        {itemAns}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Card>
          ))}
        </Space>
        <Form.Item>
          <Button className="quiz-form__button" htmlType="submit" block>
            Nộp bài
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Quiz;

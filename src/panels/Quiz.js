import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import List from '@vkontakte/vkui/dist/components/List/List';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import CONST from '../QuizHub-Network-Bridge/const';

const Quiz = ({ id, go, run, fetchedUser, questionIndex, onClickBtnAnswer}) => (
	<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack/>} right={run && ((typeof questionIndex == 'number' ? questionIndex : '-') + '/' + run.questions.length)} separator={true}>
            {run && run.quiz.title}
        </PanelHeader>
        {run && typeof questionIndex == 'number' &&
            <Div>
                <CardGrid style={{ margin : 20 }}>
                    <Card style={{ padding : 20 }} size="xl" mode="shadow">
                        {run.questions[questionIndex].text}
                    </Card>
                </CardGrid>
                {run.questions[questionIndex].type != CONST.QUESTION_TYPE.TEXT &&
                    <List>
                        {run.questions[questionIndex].type == CONST.QUESTION_TYPE.MULTIPLE_CHOISES ?
                            run.questions[questionIndex].options.map((a, i) => (<Checkbox key={i}>{a}</Checkbox>)) :
                            run.questions[questionIndex].options.map((a, i) => (<Radio key={i}>{a}</Radio>))
                        }
                    </List>
                }

                {run.questions[questionIndex].type == CONST.QUESTION_TYPE.TEXT &&
                    <FormLayout>
                        <FormLayoutGroup top="Ответ">
                            <Input type="text" align="center" />
                        </FormLayoutGroup>
                    </FormLayout>
                }

                <Div>
                    <Button size="xl" onClick={onClickBtnAnswer}>Primary</Button>
                </Div>
            </Div>
        }
	</Panel>
);

Quiz.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Quiz;

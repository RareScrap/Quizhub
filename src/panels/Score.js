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
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';

import './Score.css';

const Score = ({ id, go, fetchedUser, score }) => (
	<Panel id={id}>
        <PanelHeader separator={true}>
            Результаты
        </PanelHeader>

        {score &&
            <Div>
                <p id="score_label">Вы ответили верно на {score.rightAnswerCount} из {score.totalQuestionCount} вопросов и получили</p>
                <img id="coin_logo" src="https://art.pixilart.com/7736b1d30d303e4.gif" alt="альтернативный текст"/>
                <p id="ebal_label">{score.newEpoints} баллов</p>
                <p id="status_label">Отличная работа!</p>
                {score.rightAnswerCount < score.totalQuestionCount &&
                    <Div>
                        <p id="status_label">Эти книги помогут вам завершить викторину до конца</p>
                        <List>
                            {score.books.map(book => (
                                <Cell className="BookCell">
                                    <img className="Book" src={book.imgUrl}/>
                                    <Div className="CellText">
                                        <h3>{book.title}</h3>
                                        <h4>{book.description}</h4>
                                    </Div>
                                    <Button size="m" className="BuyButton" href={book.url} target="_blank">Купить</Button>
                                </Cell>
                            ))}
                        </List>
                    </Div>
                }

                <Div>
                    <Button size="xl" onClick={go} data-to="home">Завершить</Button>
                </Div>
            </Div>
        }
	</Panel>
);

Score.propTypes = {
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

export default Score;

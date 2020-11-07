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

const Score = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack/>} separator={true}>
            Результаты
        </PanelHeader>

        <p id="score_label">Вы ответили верно на 5 из 10 вопросов и получили</p>
        <img id="coin_logo" src="https://art.pixilart.com/7736b1d30d303e4.gif" alt="альтернативный текст"/>
        <p id="ebal_label">5928 эбалов</p>
        <p id="status_label">Отличная работа!</p>

        <p id="status_label">Эти книги помогут вам завершить викторину до конца</p>
        <List>
            <Cell className="BookCell">
                
                    <img className="Book" src="https://pbs.twimg.com/media/EBsOZOVXoAEz61S?format=jpg&name=medium"/>
        
                <Div className="CellText">
                    <h3>Title</h3>
                    <h4>Subtitle</h4>
                </Div>
                <Button size="m" className="BuyButton">Купить</Button>
            </Cell>
        </List>

        

        <Div>
            <Button size="xl">Завершить</Button>
        </Div>
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

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
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell';
import InfoRow from '@vkontakte/vkui/dist/components/InfoRow/InfoRow';
import { Avatar } from '@vkontakte/vkui';
import api from '../QuizHub-Network-Bridge/importme'

import './Stats.css';

const Stats = ({ id, go, fetchedUser, onClickBuyCoupons, stats }) => (
	<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack/>} separator={false} onClick={go} data-to="home">
            Статистика
        </PanelHeader>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {fetchedUser && <Avatar src={fetchedUser.photo_200} size={150}/>}
        </div>
        <p id="score_label">
            <img id="stats_coin_logo" src="https://art.pixilart.com/7736b1d30d303e4.gif"/>
            <span id="all_ebals">{stats && stats.balance} баллов</span>
            <img id="stats_coin_logo" src="https://art.pixilart.com/7736b1d30d303e4.gif"/>
        </p>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '-1cm' }}>
            <Button onClick={onClickBuyCoupons} data-to="shop">Обменять на купоны</Button>
        </div>

        {stats && 
        <Group>
                <SimpleCell multiline>
                    <InfoRow header="Пройдено за месяц">
                        {stats.runsAtCurrentMonthCount} викторин
                    </InfoRow>
                </SimpleCell>

                <SimpleCell>
                    <InfoRow header="Пройдено всего">
                        {stats.totalRunCount} викторин
                    </InfoRow>
                </SimpleCell>
            
                <SimpleCell>
                    <InfoRow header="Любимая тема">
                        {stats.favouriteCategoryName == "" ? "Пока нет" : stats.favouriteCategoryName}
                    </InfoRow>
                </SimpleCell>
        </Group>
        }
	</Panel>
);

Stats.propTypes = {
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

export default Stats;

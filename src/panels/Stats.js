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

import './Stats.css';

const Stats = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack/>} separator={false}>
            Статистика
        </PanelHeader>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Avatar size={150}></Avatar>
        </div>
        <p id="score_label">
            <img id="stats_coin_logo" src="https://art.pixilart.com/7736b1d30d303e4.gif"/>
            <span id="all_ebals">5928 э-балов</span>
            <img id="stats_coin_logo" src="https://art.pixilart.com/7736b1d30d303e4.gif"/>
        </p>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '-1cm' }}>
            <Button>Обменять на купоны</Button>
        </div>
        <Group>
            <SimpleCell multiline>
            <InfoRow header="Пройдено за месяц">
                125 викторин
            </InfoRow>
            </SimpleCell>
            <SimpleCell>
            <InfoRow header="Пройдено за сегодня">
                12 викторин
            </InfoRow>
            </SimpleCell>
            <SimpleCell>
            <InfoRow header="Любимая тема">
                Девушки бодибилдеры 60-х
            </InfoRow>
            </SimpleCell>
        </Group>
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

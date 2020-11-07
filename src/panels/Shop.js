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
import RichCell from '@vkontakte/vkui/dist/components/RichCell/RichCell';
import { Avatar } from '@vkontakte/vkui';

import './Shop.css';


const Shop = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack/>} separator={false}>
            Купоны
        </PanelHeader>

        <img id="shop_coin_logo" src="https://art.pixilart.com/7736b1d30d303e4.gif" alt="альтернативный текст"/>
        <p id="ebal_label">5928 эбалов</p>

        <Group>
            <Header mode="secondary">Купленные купоны</Header>
            <RichCell
                disabled
                multiline
                before={<img className="Book" src="https://i.pinimg.com/originals/3c/7a/f3/3c7af3c03a1fc34f679d6cb8d1af703a.png"/>}
                text="-10% в МирКниг"
                caption="На книги по строительству и программированию"
                after="Код: asdewgoidfosdfre"
            />
        </Group>


        <Group>
            <Header mode="secondary">Доступные</Header>
            <RichCell
                disabled
                multiline
                before={<img className="Book" src="https://i.pinimg.com/originals/3c/7a/f3/3c7af3c03a1fc34f679d6cb8d1af703a.png"/>}
                text="-10% в МирКниг"
                caption="На книги по строительству и программированию"
                actions={
                <React.Fragment>
                    <Button>350 э-балов</Button>
                </React.Fragment>
                }
            />
        </Group>

	</Panel>
);

Shop.propTypes = {
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

export default Shop;

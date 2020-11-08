import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import PanelHeaderContent from '@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';

const Onboard = ({ id, go }) => (
	<Panel id={id}>
        <Gallery
        slideWidth="100%"

        align="center"
        style={{ height: '100vh' }}
        bullets="dark"
        >
        <div style={{ padding: 16, color : 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--destructive)' }}>
            <span style={{ textAlign : 'center' }}>Выбирайте тесты по своему вкусу и навыку</span>
        </div>
        <div style={{  padding: 16, color : 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--accent)' }}>
            <span style={{ textAlign : 'center' }}>Проверяйте свои знания по темам</span>
        </div>
        <div style={{  padding: 16, color : 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--accent)' }}>
            <span style={{ textAlign : 'center' }}>Получайте баллы за правильные ответы в тестах</span>
        </div>
        <div style={{  padding: 16, color : 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--button_commerce_background)' }}>
            <span style={{ textAlign : 'center' }}>Тратьте накопленные баллы на скидки в книжных магазинах</span>
            <Button size="xl" onClick={go} data-to="home" style={{ position: 'absolute', bottom: 30, marginLeft: -32 }}>Начать</Button>
        </div>
        </Gallery>
	</Panel>
);

Onboard.propTypes = {
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

export default Onboard;

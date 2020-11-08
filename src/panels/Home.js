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
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';

const Home = ({ id, go, onClickCategory, onClickProfile, fetchedUser, categories, onChangeSearchCategories, searchCategories }) => (
	<Panel id={id}>
		<PanelHeader
			left={fetchedUser && <Avatar src={fetchedUser.photo_100} onClick={onClickProfile} data-to="stats"/>}>
			<PanelHeaderContent>
				<Search onChange={onChangeSearchCategories} value={searchCategories} />
			</PanelHeaderContent>
		</PanelHeader>

		<Group separator="hide">
			{categories && categories.filter(anime => !searchCategories || anime.name.toLowerCase().includes(searchCategories.toLowerCase())).reduce((resultArray, item, index) => { 
					const chunkIndex = Math.floor(index/2)

					if(!resultArray[chunkIndex]) {
						resultArray[chunkIndex] = [] // start a new chunk
					}

					resultArray[chunkIndex].push(item)

					return resultArray
				}, []).map(row => (
					<CardGrid>
						{row.map(category => (
							<Card key={category.id} size="m" onClick={onClickCategory} data-id={category.id}>
								<img style={{ width : '100%', objectFit: 'cover' , height: 96, borderRadius: 'inherit' }} src={category.imgUrl} />
								<Cell>{category.name}</Cell> {/* Нам просто нравится шрифт в cell и нам лень смотреть его ксс */}
							</Card>
						))}
					</CardGrid>
				))}
			{categories && categories.filter(anime => !searchCategories || anime.name.toLowerCase().includes(searchCategories.toLowerCase())).length == 0 &&
			<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
				<Cell>Ничего не найдено</Cell>
			</div>}
		</Group>
	</Panel>
);

Home.propTypes = {
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

export default Home;

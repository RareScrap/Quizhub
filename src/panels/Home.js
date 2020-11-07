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

const Home = ({ id, go, onClickCategory, fetchedUser, categories }) => (
	<Panel id={id}>
		<PanelHeader
			left={fetchedUser && <Avatar src={fetchedUser.photo_100} onClick={go} data-to="stats"/>}>
			<PanelHeaderContent>
				<Search />
			</PanelHeaderContent>
		</PanelHeader>

		<Group separator="hide">
			{categories && categories.reduce((resultArray, item, index) => { 
					const chunkIndex = Math.floor(index/3)

					if(!resultArray[chunkIndex]) {
						resultArray[chunkIndex] = [] // start a new chunk
					}

					resultArray[chunkIndex].push(item)

					return resultArray
				}, []).map(row => (
					<CardGrid>
						{row.map(category => (
							<Card key={category.id} size="s" onClick={onClickCategory} data-id={category.id}>
								<img style={{ height: 96, borderRadius: 'inherit' }} src={category.imgUrl} />
								<h1>{category.name}</h1>
							</Card>
						))}
					</CardGrid>
				))}
		</Group>

{/* 
		{fetchedUser &&
		<Group title="User Data Fetched with VK Bridge">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		<Group title="Navigation Example">
			<Div>
				<Button size="xl" level="2" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
		</Group>	 */}
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

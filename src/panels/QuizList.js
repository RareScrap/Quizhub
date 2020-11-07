import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

const QuizList = ({ id, go, fetchedUser, quizzes }) => (
	<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>} separator={false}>
            <Search
                //value="asd"
                //onChange={this.onChange}
                //onIconClick={this.props.onFiltersClick}
            />
        </PanelHeader>
        <List>
            {quizzes && quizzes.map(quiz => (
                <Cell>{quiz.title}</Cell>
            ))}
        </List>
	</Panel>
);

QuizList.propTypes = {
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

export default QuizList;

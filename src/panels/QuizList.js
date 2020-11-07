import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

const QuizList = ({ id, go, onClickQuiz, fetchedUser, quizzes, onChangeSearchQuizzes, searchQuizzes, onClickBtnQuizListBack }) => (
	<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={onClickBtnQuizListBack}/>} separator={false}>
            <Search
                value={searchQuizzes}
                onChange={onChangeSearchQuizzes}
                //onIconClick={this.props.onFiltersClick}
            />
        </PanelHeader>
        <List>
            {quizzes && quizzes.filter(anime => !searchQuizzes || anime.title.toLowerCase().includes(searchQuizzes.toLowerCase())).map(quiz => (
                <Cell key={quiz.id} onClick={onClickQuiz} data-id={quiz.id}>{quiz.title}
                <span style={{ float : 'right', color : 'gray'}}>{
                    quiz.run ? quiz.cooldownAt : 'Cложность ' + '💣'.repeat(quiz.difficulty)
                }</span>
                </Cell>
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

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
                <Cell key={quiz.id} onClick={quiz.run && quiz.run.cooldownAt > new Date().getTime() / 1000 ? null : onClickQuiz} data-id={quiz.id} >
                <span style={ quiz.run && quiz.run.cooldownAt > new Date().getTime() / 1000 ? { color : 'lightgray'} : {}}>{
                    quiz.title
                }</span>
                <span style={{ float : 'right', color : 'gray'}}>{
                    quiz.run && quiz.run.cooldownAt > new Date().getTime() / 1000 ? 'Будет доступна ' + formatTime(new Date(quiz.run.cooldownAt * 1000)) : 'Cложность ' + '💣'.repeat(quiz.difficulty)
                }</span>
                </Cell>

                
            ))}
            
            {

            quizzes && quizzes.filter(anime => !searchQuizzes || anime.title.toLowerCase().includes(searchQuizzes.toLowerCase())).length == 0 &&
                <Cell>Ничего не найдено</Cell>}
            
            
        </List>
	</Panel>
);

function formatTime(date = new Date()) {
    var result = (date.getDate() - new Date().getDate() == 1 ? 'завтра ' : '') +  'в ';
    if (date.getHours() < 10) result += '0';
    result += date.getHours() + ':';
    if (date.getMinutes() < 10) result += '0';
    result += date.getMinutes();

    return result;
}

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

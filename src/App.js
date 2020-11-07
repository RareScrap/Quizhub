import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import api from './QuizHub-Network-Bridge/importme';
import Home from './panels/Home';
import QuizList from './panels/QuizList';
import Quiz from './panels/Quiz';
import Score from './panels/Score';
import Stats from './panels/Stats';
import Shop from './panels/Shop';
import Persik from './panels/Persik';

const POPOUT_BLYAT = <ScreenSpinner size='large'/>;

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(POPOUT_BLYAT);
	const [categories, setCategories] = useState(null);
	const [quizzes, setQuizes] = useState(null);
	const [run, setRun] = useState(null);
	const [questionIndex, setQuestionIndex] = useState(null);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();

		api.getCategories().then(setCategories);
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const onClickCategory = e => {
		let id = +e.currentTarget.dataset.id;
		for (let i = 0; i < categories.length; i++) {
			let category = categories[i];
			if (category.id === id) {
				setQuizes(null);
				setPopout(POPOUT_BLYAT);
				setActivePanel('quiz_list');
				category.getQuizzes().then(shit => {
					setQuizes(shit);
					setPopout(null);
				});
				break;
			}
		}
	}

	const onClickQuiz = e => {
		let id = +e.currentTarget.dataset.id;
		for (let i = 0; i < quizzes.length; i++) {
			let quiz = quizzes[i];
			if (quiz.id === id) {
				setRun(null);
				setPopout(POPOUT_BLYAT);
				setActivePanel('run');
				quiz.start().then(run => {
					setRun(run);
					setQuestionIndex(0);
					setPopout(null);
				})
			}
		}
	}

	const onClickBtnAnswer = e => {
		if (!run || typeof questionIndex != 'number')
			return;

		//run.questions[questionIndex].answer([0]); // TODO атвет
		if (questionIndex + 1 >= run.questions.length) {
			setActivePanel('score');
		} else {
			setQuestionIndex(questionIndex + 1);
		} 
	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} onClickCategory={onClickCategory} categories={categories} />
			<QuizList id='quiz_list' go={go} onClickQuiz={onClickQuiz} quizzes={quizzes}/>
			<Stats id='stats' fetchedUser={fetchedUser} go={go} />
			<Quiz id='run' fetchedUser={fetchedUser} run={run} questionIndex={questionIndex} setQuestionIndex={setQuestionIndex} go={go} onClickBtnAnswer={onClickBtnAnswer} />
			<Score id='score' fetchedUser={fetchedUser} go={go} />
			<Persik id='persik' go={go} />
		</View>
	);
}

export default App;


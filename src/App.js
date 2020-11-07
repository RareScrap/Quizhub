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
	const [answerButtonEnabled, setAnswerButtonEnabled] = useState(false);
	const [score, setScore] = useState(null);
	const [stats, setStats] = useState(null);

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

	const onChangeQuestionCheckBox = e => {
		let question = run.questions[questionIndex];
		if (!question.answer)
			question.setAnswer([]);
		let index = +e.currentTarget.dataset.index;
		if (e.currentTarget.checked) {
			if (!question.answer.some(a => a == index)) {
				question.answer.push(index);
				question.setAnswer(question.answer);
			}
		} else {
			question.setAnswer(question.answer.filter(a => a != index));
		}

		setAnswerButtonEnabled(question.answer.length > 0);
	}

	const onChangeQuestionRadio = e => {
		let question = run.questions[questionIndex];
		question.setAnswer(+e.currentTarget.dataset.index);

		setAnswerButtonEnabled(true);
	}

	const onChangeQuestionText = e => {
		let question = run.questions[questionIndex];
		question.setAnswer(e.currentTarget.value);

		setAnswerButtonEnabled(question.answer);
	}

	const onClickBtnAnswer = e => {
		if (!run || typeof questionIndex != 'number')
			return;

		if (questionIndex + 1 >= run.questions.length) {
			setScore(null);
			setActivePanel('score');
			setPopout(POPOUT_BLYAT);
			run.end().then(response => {debugger;
				setScore(response);
				setPopout(null);
			});
		} else {
			setQuestionIndex(questionIndex + 1);
			setAnswerButtonEnabled(false);
		}
	}

	const onClickProfile = e => {
		setPopout(POPOUT_BLYAT);
		setActivePanel('stats');
		api.getStats().then(newStats => {
			setStats(newStats)
			setPopout(null);
		})
	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} onClickCategory={onClickCategory} onClickProfile={onClickProfile} categories={categories} />
			<QuizList id='quiz_list' go={go} onClickQuiz={onClickQuiz} quizzes={quizzes}/>
			<Quiz id='run' fetchedUser={fetchedUser} run={run} questionIndex={questionIndex} setQuestionIndex={setQuestionIndex} go={go} onClickBtnAnswer={onClickBtnAnswer} onChangeQuestionCheckBox={onChangeQuestionCheckBox} onChangeQuestionRadio={onChangeQuestionRadio} onChangeQuestionText={onChangeQuestionText} answerButtonEnabled={answerButtonEnabled} />
			<Score id='score' fetchedUser={fetchedUser} go={go} score={score}/>
			<Stats id='stats' fetchedUser={fetchedUser} go={go} stats={stats}/>
			<Persik id='persik' go={go} />
		</View>
	);
}

export default App;


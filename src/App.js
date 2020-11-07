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
	const [stats, setStats] = useState(null);
	const [coupons, setCoupons] = useState(null);
	const [discounts, setDiscounts] = useState(null);

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

	const onClickProfile = e => {
		setPopout(POPOUT_BLYAT);
		setActivePanel('stats');
		api.getStats().then(newStats => {
			setStats(newStats)
			setPopout(null);
		})
	}

	const onClickBuyCoupons = e => {
		setPopout(POPOUT_BLYAT);
		api.getCoupons().then(netCoupons => {
		
			api.getDiscounts().then(netDiscount => {
				setCoupons(netCoupons)
				setDiscounts(netDiscount)
				setActivePanel('shop');
				setPopout(null);
			})
		})
	}

	const onBuyDiscount = e => {
		api.getStats().then(newStats => {
			setStats(newStats)
		})

		let id = +e.currentTarget.dataset.id;
		for (let i = 0; i < discounts.discounts.length; i++) {
			let discount = discounts.discounts[i];
			if (discount.id === id) {
				setPopout(POPOUT_BLYAT);

				discount.generateCoupon().then((newCoupon) => {
					const newCoupons = coupons
					newCoupons.coupons.push(newCoupon.coupon)
					setCoupons(newCoupons)
					setPopout(null)
					this.forceUpdate()
				}).catch((error) => {
					console.error(error)
				})

				break;
			}
		}
	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} onClickCategory={onClickCategory} onClickProfile={onClickProfile} categories={categories} />
			<QuizList id='quiz_list' go={go} quizzes={quizzes}/>
			<Stats id='stats' fetchedUser={fetchedUser} go={go} onClickBuyCoupons={onClickBuyCoupons} stats={stats}/>
			<Shop id='shop'  go={go} coupons={coupons} discounts={discounts} stats={stats} onBuyDiscount={onBuyDiscount}/>
			<Persik id='persik' go={go}/>
		</View>
	);
}

export default App;


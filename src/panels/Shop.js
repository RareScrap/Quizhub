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


const Shop = ({ id, go, coupons, discounts, stats, onBuyDiscount }) => (
	<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={go} data-to="stats"/>} separator={false}>
            Купоны
        </PanelHeader>

        <img id="shop_coin_logo" src="https://art.pixilart.com/7736b1d30d303e4.gif" alt="альтернативный текст"/>
        <p id="ebal_label">{stats.balance} баллов</p>

        {coupons && coupons.coupons.length != 0 &&
        <Group>
            <Header mode="secondary">Купленные купоны</Header>
            {coupons && coupons.coupons.map(coupon => (
            <RichCell
                disabled
                multiline
                before={<img className="Book" src={coupon.discount.shop.imgUrl} style={{ width : '15%', height : '15%', margin : '16px', borderRadius: '6px' }}/>}
                text={coupon.discount.title}
                caption={coupon.discount.shop.name}
                after={"Код: " + coupon.coupon}
            />
            ))}
        </Group>
        }

        <Group>
            <Header mode="secondary">Доступные</Header>
            {discounts && discounts.discounts.map(discount => (
            <RichCell
                disabled
                multiline
                before={<img className="Book" src={discount.shop.imgUrl} style={{ width : '15%', height : '15%', margin : '16px', borderRadius: '6px' }}/>}
                text={discount.title}
                caption={discount.shop.name}
                actions={
                <React.Fragment>
                    <Button disabled={discount.price > stats.balance} onClick={onBuyDiscount} data-id={discount.id}>{"Купить купон за " + discount.price +" баллов"}</Button>
                </React.Fragment>
                }
            />
            ))}
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

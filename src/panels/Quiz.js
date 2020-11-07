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

const Quiz = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack/>} right={"1/10"} separator={true}>
            Quiz #1
        </PanelHeader>
        <CardGrid style={{ margin : 20 }}>
          <Card style={{ padding : 20 }} size="xl" mode="shadow">
            ЯLorem ipsum dolor sit amet, consectetur.
            ЯLorem ipsum dolor sit amet, consectetur.
            ЯLorem ipsum dolor sit amet, consectetur.
            ЯLorem ipsum dolor sit amet, consectetur.
            ЯLorem ipsum dolor sit amet, consectetur.
          </Card>
        </CardGrid>
        <List>
            <Checkbox>ЯLorem ipsum dolor sit amet, consectetur.</Checkbox>
            <Checkbox>ЯLorem ipsum dolor sit amet, consectetur.</Checkbox>
            <Checkbox>ЯLorem ipsum dolor sit amet, consectetur.</Checkbox>
            <Checkbox>ЯLorem ipsum dolor sit amet, consectetur.</Checkbox>
        </List>
        <List>
            <Radio name="radio" value="1" description="Lorem ipsum dolor sit amet, consectetur." defaultChecked>First</Radio>
            <Radio name="radio" value="2" description="Lorem ipsum dolor sit amet, consectetur." defaultChecked>First</Radio>
            <Radio name="radio" value="3" description="Lorem ipsum dolor sit amet, consectetur." defaultChecked>First</Radio>
            <Radio name="radio" value="4" description="Lorem ipsum dolor sit amet, consectetur." defaultChecked>First</Radio>
        </List>
        <FormLayout>
            <FormLayoutGroup top="Ответ">
                <Input type="text" align="center" />
            </FormLayoutGroup>
        </FormLayout>

        <Div>
            <Button size="xl">Primary</Button>
        </Div>
	</Panel>
);

Quiz.propTypes = {
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

export default Quiz;

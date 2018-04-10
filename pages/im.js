'use strict';

/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../blocks/chats-page/Header';
import Chats from '../blocks/chats-page/Chats';

/* eslint-disable */
const fetch = require('node-fetch');
const URL = `${process.env.HOST}:${process.env.PORT}`;
import ChatWindow from '../blocks/chats-page/ChatWindow';

import './global-const.css';
import './im.css';

export default class ProfilePage extends Component {
    // раскомментировать
    // state = { 
    //     chats: null, 
    //     activeChat: null 
    // };


    // click = id => this.setState({ activeChat: id });

    // search = event => {
    //     const filterChats = this.state.chats.filter(el => el.name.indexOf(event.target.value) !== -1);
    //     this.setState({ chats: filterChats });
    // }
    
    render() {
        const { chats } = this.state;
        const { activeChat } = this.state;

        return (
            <React.Fragment>
                <Header />
                <main className="main">
                    <article className="chats">
                        <input type="search" className="chats__search"/>
                        <div className="chats__list">
                            <Chats chatsList={chats} click={this.click}/>
                        </div>
                    </article>
                    <ChatWindow chatid={this.state.activeChat}/>
                </main>
            </React.Fragment>
        );
    }
}

// здесь линтер даже с дизейблом ругается на async/await, 
// хотя у Гоголева ТАКОЙ ЖЕ КОМЬЮТЕР И ВСЕ РАБОТАЕТ
ProfilePage.getInitialProps =  () => {
    let chats = null;
    // await fetch(`${URL}/api/chats`)
    //     .then((res)=>{
    //         return res.json();
    //     })
    //     .then((data)=>{
    //         chats = data;
    //     });

    chats = [{
        id: 11111,
        name: 'bobby',
        lastMessage: 'Привет!'
    },
    {
        id: 22222,
        name: 'sergey',
        lastMessage: 'доделывать будем?'
    }]

    return { chats };
};

// Перекладываем в state сразу из props
ProfilePage.getDerivedStateFromProps = ({ chats }) => {
    return { chats };
}

ProfilePage.propTypes = { user: PropTypes.object };
'use strict';

import getSocket from '../pages/socket';

import types from './types';

export const createChat = (myUser, user) => dispatch => { // туду private
    const socket = getSocket();

    dispatch({ type: types.SHOW_LOADER });
    dispatch({ type: types.HIDE_ADDUSER });

    socket.emit('chat', {
        members: [myUser.nickname, user.nickname], // Важно! создатель первый в списке
        type: 'private'
    }, (chat, existsChatId) => {
        if (chat) {
            dispatch({ type: types.CREATE_CHAT, chat });
            dispatch({ type: types.OPEN_CHAT, id: chat._id });
            socket.emit('join', [chat._id]);
        } else {
            dispatch({ type: types.OPEN_CHAT, id: existsChatId });
        }
        dispatch({ type: types.HIDE_LOADER });
    });
};

export const createGroupChat = (myUser, otherMembers, groupTitle) => dispatch => {
    const socket = getSocket();

    console.info(myUser, otherMembers, groupTitle);

    dispatch({ type: types.HIDE_CREATEGROUP });
    dispatch({ type: types.SHOW_LOADER });

    socket.emit('chat', {
        title: groupTitle,
        members: [myUser, ...otherMembers].map(m => m.nickname), // Важно! создатель первый в списке
        type: 'group'
    }, chat => {
        dispatch({ type: types.CREATE_CHAT, chat });
        dispatch({ type: types.OPEN_CHAT, id: chat._id });
        dispatch({ type: types.HIDE_LOADER });

        console.info(chat);
        socket.emit('join', [chat._id]);
    });

};

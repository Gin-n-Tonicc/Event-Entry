import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from 'use-http';
import Spinner from '../../components/spinner/Spinner';
import { messagesPaths, usersPaths } from '../../config/api';
import { useAuthContext } from '../../contexts/AuthContext';
import { IFullUser, IMessage, PageEnum } from '../../types';
import './Chat.css';
import ChatLeftMessage from './chat-left-message/ChatLeftMessage';
import ChatRightMessage from './chat-right-message/ChatRightMessage';

function Chat() {
  const { user } = useAuthContext();
  const { userId: userIdParam } = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const userId = Number(userIdParam || -1);

  const { get, data: messagesFetch } = useFetch<IMessage[]>(
    messagesPaths.get(userId),
    []
  );

  const { data: userFetch, loading } = useFetch<IFullUser>(
    usersPaths.getById(userId),
    []
  );

  const { post, response } = useFetch<IMessage>(messagesPaths.send);

  const onMessageSend = async () => {
    const body = {
      id: 0,
      content: inputValue,
      sentAt: new Date(Date.now()),
      senderId: user.id,
      receiverId: userId,
    };

    const message = await post(body);

    if (response.ok) {
      setInputValue('');
      setMessages((prev) => [...prev, message]);
    }
  };

  useEffect(() => {
    if (!messagesFetch) {
      return;
    }
    setMessages(messagesFetch);
  }, [messagesFetch]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await get();
    }, 1000 * 15);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="d-flex flex-column justify-content-center container mt-5 custom-chatter">
      <h2 className="text-center">Chat With</h2>
      <Link
        to={PageEnum.Profile.replace(
          ':userId',
          userFetch?.id.toString() as string
        )}
        className="mb-5">
        <h5 className="text-primary text-center text-decoration-underline">
          {userFetch?.firstname} {userFetch?.lastname}
        </h5>
      </Link>
      <div className="wrapper">
        <div className="main">
          <div className="px-2 scroll">
            {messages.map((x) => {
              if (x.senderId.id === user.id) {
                return <ChatRightMessage message={x.content} key={x.id} />;
              }

              const fullName = `${x.senderId.firstname} ${x.senderId.lastname}`;
              return (
                <ChatLeftMessage
                  content={x.content}
                  senderFullName={fullName}
                  key={x.id}
                />
              );
            })}
          </div>
          <nav className="navbar bg-white navbar-expand-sm d-flex justify-content-between">
            {' '}
            <input
              type="text number"
              name="text"
              className="form-control"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
            />
            <div className="icondiv d-flex justify-content-end align-content-center text-center ml-2">
              {' '}
              <i
                className="fa fa-arrow-circle-right icon2 text-primary"
                onClick={onMessageSend}
              />{' '}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Chat;

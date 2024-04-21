interface ChatRightMessageProps {
  message: string;
}

function ChatRightMessage({ message }: ChatRightMessageProps) {
  return (
    <div className="d-flex align-items-center text-right justify-content-end ">
      <div className="pr-2">
        {' '}
        <span className="name">You</span>
        <p className="msg">{message}</p>
      </div>
      <div>
        <img
          src="https://i.imgur.com/HpF4BFG.jpg"
          width={30}
          className="img1"
        />
      </div>
    </div>
  );
}

export default ChatRightMessage;

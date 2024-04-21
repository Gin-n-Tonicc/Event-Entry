interface ChatLeftMessageProps {
  content: string;
  senderFullName: string;
}

function ChatLeftMessage(props: ChatLeftMessageProps) {
  return (
    <div className="d-flex align-items-center">
      <div className="text-left pr-1">
        <img
          src="https://img.icons8.com/color/40/000000/guest-female.png"
          width={30}
          className="img1"
        />
      </div>
      <div className="pr-2 pl-1">
        {' '}
        <span className="name">{props.senderFullName}</span>
        <p className="msg">{props.content}</p>
      </div>
    </div>
  );
}

export default ChatLeftMessage;

import React, { useState } from "react";
import MainPlayer from "../components/MainPlayer";
import Socket from "../helpers/socket";

const ClientView = () => {
  const [isInit, setIsInit] = useState(false);

  const initAudioContext = () => {
    if (isInit) {
      return;
    }

    const socketInstance = new Socket();
    socketInstance.bindSockets();
    socketInstance.initAudioTag();
    setIsInit(true);
  };

  return (
    <div className="container container__client">
      <div className="client__connect">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => initAudioContext()}
        >
          Connect to Server
        </button>
      </div>
      <div className="client__player">
        <MainPlayer />
      </div>
    </div>
  );
};

export default ClientView;

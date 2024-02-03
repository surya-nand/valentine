import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import "../MainPage/mainPage.modules.css";
import ilayarajaAudio from "../../Assets/ilayaraja.mp3";
const BASE_URL = "https://valentine-ybw3.onrender.com";

function MainPage() {
  const { userId } = useParams();
  const [invalidLink, setInvalidLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState("");
  const [imgMarginRight, setImgMarginRight] = useState("60");
  const [yesButtonSize, setYesButtonSize] = useState("1.5");
  const [YesClicked, setYesClicked] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [currentNoPhraseIndex, setCurrentNoPhraseIndex] = useState(0);
  const noPhrases = [
    "No",
    "Reconsider? My dog thinks you should",
    "Think twice? I have pizza and a Netflix subscription",
    "Reconsidering? I'm 90% coffee and 10% charm",
    "No? I was going to share my chocolate stash with you!",
    "I promise I won't sing in the shower",
    "I promise not to steal your fries, just one or two",
  ];
  const handleNoButton = (event) => {
    event.preventDefault();
    setImgMarginRight((prev) => Math.max(prev - 10, 0));
    setYesButtonSize((prev) => Math.min(prev * 1.5, 13));
    const nextIndex = (currentNoPhraseIndex + 1) % noPhrases.length;
    setCurrentNoPhraseIndex(nextIndex);
    if (!audioPlayed) {
      const audio = new Audio(ilayarajaAudio);
      audio.volume = 0.05;
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));

      setAudioPlayed((prev) => !prev);
    }
  };

  const handleYesButton = () => {
    setYesClicked(true);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/${userId}`);
        if (response.data.message === "User not found") {
          setInvalidLink((prev) => !prev);
        }
        setUserDetails(response.data.details);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [userId]);

  return (
    <div>
      {loading ? (
        <div>Surprise Loading....</div>
      ) : (
        <div
          className="main-page"
          style={{ background: userDetails.pageColor }}
        >
          {YesClicked ? (
            <>
              <Confetti />
              <div className="boy-girl-gifs">
                <img
                  className="love-bunny"
                  src={"https://media.tenor.com/bVN5MdTrelYAAAAj/yaseen1.gif"}
                ></img>
              </div>
              <div>
                <h1 className="celebrations-message">
                  Let's create some memories
                </h1>
              </div>
            </>
          ) : (
            <>
              <div className="boy-girl-gifs">
                <img
                  className="left-bunny"
                  style={{ marginRight: `${imgMarginRight}%` }}
                  src={
                    "https://media.tenor.com/vZZEPrwfe6AAAAAj/happy-amine.gif"
                  }
                ></img>
                <img
                  className="right-bunny"
                  src={
                    "https://media.tenor.com/_mHPg-YIxFEAAAAj/love-you-cute-girl.gif"
                  }
                ></img>
                <p>Will you be my valentine {userDetails.name}?</p>
                <p>{userDetails.pickupLine}</p>
              </div>
              <div className="yes-no-buttons">
                <button
                  onClick={handleYesButton}
                  className="yes-button"
                  style={{ fontSize: `${yesButtonSize}vw` }}
                >
                  Yes
                </button>
                <button onClick={handleNoButton} className="no-button">
                  {noPhrases[currentNoPhraseIndex]}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MainPage;

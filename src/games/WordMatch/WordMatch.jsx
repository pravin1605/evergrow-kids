import { useState } from "react";
import "./WordMatch.css";
import { getGameLevels } from "../../data/gameLevels";
import { recordLevelCompleted } from "../../data/rewards";
import RewardPopup from "../../components/RewardPopup/RewardPopup";

function WordMatch({ onBack, levelId = 1 }) {
  const level = getGameLevels("word-match")[Number(levelId) - 1] || getGameLevels("word-match")[0];
  const [message, setMessage] = useState("");
  const [rewardVisible, setRewardVisible] = useState(false);
  const handleAnswer = (answer) => {
    if (answer !== level.word) return setMessage("💭 Look carefully!");
    setMessage("🎉 Correct! Great job!");
    const result = recordLevelCompleted("word-match", level.id, level.stars);
    if (result.awarded) setRewardVisible(true);
  };
  return <main className="word-match-page"><button className="word-match-back" onClick={onBack}>← Levels</button><header><span>🧩 WORD GAME</span><h1>Word Match</h1><p>Match the picture with the right word.</p></header><section className="word-match-card"><div className="word-match-icon">{level.icon}</div><h2>What is this?</h2><div className="word-match-options">{level.options.map((option)=><button key={option} onClick={()=>handleAnswer(option)}>{option}</button>)}</div>{message&&<div className="word-match-message">{message}</div>}</section><RewardPopup isVisible={rewardVisible} stars={level.stars} message="Level Complete!" onClose={()=>setRewardVisible(false)} /></main>;
}
export default WordMatch;

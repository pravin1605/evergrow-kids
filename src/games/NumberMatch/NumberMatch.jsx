import { useState } from "react";
import "./NumberMatch.css";
import RewardPopup from "../../components/RewardPopup/RewardPopup";
import { getGameLevels } from "../../data/gameLevels";
import { recordLevelCompleted } from "../../data/rewards";

function NumberMatch({ onBack, levelId = 1 }) {
  const level = getGameLevels("number-match")[Number(levelId) - 1] || getGameLevels("number-match")[0];
  const [message, setMessage] = useState("");
  const [rewardVisible, setRewardVisible] = useState(false);
  const handleAnswer = (answer) => {
    if (answer !== level.number) return setMessage("💭 Try again!");
    setMessage("🎉 Correct!");
    const result = recordLevelCompleted("number-match", level.id, level.stars);
    if (result.awarded) setRewardVisible(true);
  };
  return <main className="number-match-page"><button type="button" className="number-match-back" onClick={onBack}>← Levels</button><header className="number-match-header"><span>🔢 NUMBER GAME</span><h1>Number Match</h1><p>Match the number with the objects.</p></header><section className="number-match-card"><div className="number-match-objects">{Array.from({length:level.number},(_,i)=><span key={i}>{level.emoji}</span>)}</div><h2>How many?</h2><div className="number-match-options">{level.options.map((option)=><button key={option} type="button" onClick={()=>handleAnswer(option)}>{option}</button>)}</div>{message&&<div className="number-match-message">{message}</div>}</section><RewardPopup isVisible={rewardVisible} stars={level.stars} message="Level Complete!" onClose={()=>setRewardVisible(false)} /></main>;
}
export default NumberMatch;

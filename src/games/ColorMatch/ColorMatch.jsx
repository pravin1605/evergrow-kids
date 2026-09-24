import { useState } from "react";
import "./ColorMatch.css";
import RewardPopup from "../../components/RewardPopup/RewardPopup";
import { getGameLevels } from "../../data/gameLevels";
import { recordLevelCompleted } from "../../data/rewards";

function ColorMatch({ onBack, levelId = 1 }) {
  const level = getGameLevels("color-match")[Number(levelId) - 1] || getGameLevels("color-match")[0];
  const [message, setMessage] = useState("");
  const [rewardVisible, setRewardVisible] = useState(false);
  const handleAnswer = (answer) => {
    if (answer !== level.color) return setMessage("💭 Try another color!");
    setMessage("🎨 Perfect match!");
    const result = recordLevelCompleted("color-match", level.id, level.stars);
    if (result.awarded) setRewardVisible(true);
  };
  return <main className="color-match-page"><button type="button" className="color-match-back" onClick={onBack}>← Levels</button><header className="color-match-header"><span>🎨 COLOR GAME</span><h1>Color Match</h1><p>Choose the correct color.</p></header><section className="color-match-card"><div className="color-match-target">{level.emoji}</div><h2>What color is it?</h2><div className="color-match-options">{level.options.map((option)=><button key={option} type="button" onClick={()=>handleAnswer(option)}>{option}</button>)}</div>{message&&<div className="color-match-message">{message}</div>}</section><RewardPopup isVisible={rewardVisible} stars={level.stars} message="Level Complete!" onClose={()=>setRewardVisible(false)} /></main>;
}
export default ColorMatch;

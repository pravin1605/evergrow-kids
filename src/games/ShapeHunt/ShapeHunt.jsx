import { useState } from "react";
import "./ShapeHunt.css";
import RewardPopup from "../../components/RewardPopup/RewardPopup";
import { getGameLevels } from "../../data/gameLevels";
import { recordLevelCompleted } from "../../data/rewards";

function ShapeHunt({ onBack, levelId = 1 }) {
  const level = getGameLevels("shape-hunt")[Number(levelId) - 1] || getGameLevels("shape-hunt")[0];
  const [message, setMessage] = useState("");
  const [rewardVisible, setRewardVisible] = useState(false);
  const handleAnswer = (answer) => {
    if (answer !== level.icon) return setMessage("💭 Look at the shape!");
    setMessage("🎉 Shape found!");
    const result = recordLevelCompleted("shape-hunt", level.id, level.stars);
    if (result.awarded) setRewardVisible(true);
  };
  return <main className="shape-hunt-page"><button type="button" className="shape-hunt-back" onClick={onBack}>← Levels</button><header className="shape-hunt-header"><span>🔺 SHAPE GAME</span><h1>Shape Hunt</h1><p>Find the {level.shape.toLowerCase()}.</p></header><section className="shape-hunt-card"><div className="shape-hunt-target">{level.icon}</div><h2>Find this shape</h2><div className="shape-hunt-options">{level.options.map((option,index)=><button key={`${option}-${index}`} type="button" onClick={()=>handleAnswer(option)}>{option}</button>)}</div>{message&&<div className="shape-hunt-message">{message}</div>}</section><RewardPopup isVisible={rewardVisible} stars={level.stars} message="Level Complete!" onClose={()=>setRewardVisible(false)} /></main>;
}
export default ShapeHunt;

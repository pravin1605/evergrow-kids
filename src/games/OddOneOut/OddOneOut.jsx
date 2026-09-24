import { useState } from "react";
import "./OddOneOut.css";
import { getGameLevels } from "../../data/gameLevels";
import { recordLevelCompleted } from "../../data/rewards";
import RewardPopup from "../../components/RewardPopup/RewardPopup";

function OddOneOut({ onBack, levelId = 1 }) {
  const level = getGameLevels("odd-one-out")[Number(levelId) - 1] || getGameLevels("odd-one-out")[0];
  const [message, setMessage] = useState("");
  const [rewardVisible, setRewardVisible] = useState(false);
  const handlePick = (item) => {
    if (item !== level.odd) return setMessage("💭 Try again!");
    setMessage("🎉 You found the different one!");
    const result = recordLevelCompleted("odd-one-out", level.id, level.stars);
    if (result.awarded) setRewardVisible(true);
  };
  return <main className="odd-one-out-page"><button className="odd-one-out-back" onClick={onBack}>← Levels</button><header><span>👀 THINKING GAME</span><h1>Odd One Out</h1><p>Find the one that is different.</p></header><section className="odd-one-out-card"><h2>Which one is different?</h2><div className="odd-one-out-items">{level.items.map((item,index)=><button key={`${item}-${index}`} onClick={()=>handlePick(item)}>{item}</button>)}</div>{message&&<div className="odd-one-out-message">{message}</div>}</section><RewardPopup isVisible={rewardVisible} stars={level.stars} message="Level Complete!" onClose={()=>setRewardVisible(false)} /></main>;
}
export default OddOneOut;

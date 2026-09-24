import { useState } from "react";
import "./LetterHunt.css";
import RewardPopup from "../../components/RewardPopup/RewardPopup";
import { getGameLevels } from "../../data/gameLevels";
import { recordLevelCompleted } from "../../data/rewards";

function LetterHunt({ onBack, levelId = 1 }) {
  const level = getGameLevels("letter-hunt")[Number(levelId) - 1] || getGameLevels("letter-hunt")[0];
  const [message, setMessage] = useState("");
  const [rewardVisible, setRewardVisible] = useState(false);
  const handleLetter = (letter) => {
    if (letter !== level.target) return setMessage("💭 Look carefully!");
    setMessage("🎉 You found it!");
    const result = recordLevelCompleted("letter-hunt", level.id, level.stars);
    if (result.awarded) setRewardVisible(true);
  };
  return <main className="letter-hunt-page"><button type="button" className="letter-hunt-back" onClick={onBack}>← Levels</button><header className="letter-hunt-header"><span>🔤 ALPHABET GAME</span><h1>Letter Hunt</h1><p>{level.task}</p></header><section className="letter-hunt-card"><div className="letter-hunt-target">{level.target}</div><h2>Find this letter</h2><div className="letter-hunt-options">{level.options.map((letter)=><button key={letter} type="button" onClick={()=>handleLetter(letter)}>{letter}</button>)}</div>{message&&<div className="letter-hunt-message">{message}</div>}</section><RewardPopup isVisible={rewardVisible} stars={level.stars} message="Great Job!" onClose={()=>setRewardVisible(false)} /></main>;
}
export default LetterHunt;

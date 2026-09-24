import { useState } from "react";
import "./AnimalSounds.css";
import RewardPopup from "../../components/RewardPopup/RewardPopup";
import { getGameLevels } from "../../data/gameLevels";
import { recordLevelCompleted } from "../../data/rewards";

function AnimalSounds({ onBack, levelId = 1 }) {
  const level = getGameLevels("animal-sounds")[Number(levelId) - 1] || getGameLevels("animal-sounds")[0];
  const [message, setMessage] = useState("");
  const [rewardVisible, setRewardVisible] = useState(false);
  const handleAnswer = (answer) => {
    if (answer !== level.icon) return setMessage("💭 Listen again!");
    setMessage(`🎉 ${level.sound}`);
    const result = recordLevelCompleted("animal-sounds", level.id, level.stars);
    if (result.awarded) setRewardVisible(true);
  };
  return <main className="animal-sounds-page"><button type="button" className="animal-sounds-back" onClick={onBack}>← Levels</button><header className="animal-sounds-header"><span>🐾 ANIMAL GAME</span><h1>Animal Sounds</h1><p>Which animal makes this sound?</p></header><section className="animal-sounds-card"><div className="animal-sounds-sound">🔊<small>{level.sound}</small></div><div className="animal-sounds-options">{level.options.map((option,index)=><button key={`${option}-${index}`} type="button" onClick={()=>handleAnswer(option)}>{option}</button>)}</div>{message&&<div className="animal-sounds-message">{message}</div>}</section><RewardPopup isVisible={rewardVisible} stars={level.stars} message="Level Complete!" onClose={()=>setRewardVisible(false)} /></main>;
}
export default AnimalSounds;

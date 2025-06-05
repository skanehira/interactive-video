import React from 'react';
import type { Choice } from '../types/video';
import './ChoiceOverlay.css';

interface ChoiceOverlayProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
  isVisible: boolean;
}

export const ChoiceOverlay: React.FC<ChoiceOverlayProps> = ({
  choices,
  onChoiceSelect,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="choice-overlay">
      <div className="choice-container">
        <h3 className="choice-title">次はどうする？</h3>
        <div className="choice-grid">
          {choices.map((choice) => (
            <button
              key={choice.id}
              className="choice-button"
              onClick={() => onChoiceSelect(choice)}
            >
              <span className="choice-icon">{choice.icon}</span>
              <span className="choice-text">{choice.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
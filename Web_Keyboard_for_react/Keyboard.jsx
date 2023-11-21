// keyboard.js
import React, { useState } from "react";
import "./Keyboard.css";

export default function Keyboard({
  textValue,
  setTextValue,
  keyboard,
  setKeyboard,
  inputText,
  setInputText,
}) {
  const [isCaps, setIsCaps] = useState(false);
  const [isShift, setIsShift] = useState(false);

  const handleKeyClick = (key) => {
    if (key === "Enter") {
      handleEnterKey();
    } else if (key === "Ctrl" || key === "Alt" || key === "<" || key === ">") {
    } else if (key === " ") {
      handleSpaceKey();
    } else if (key === "Caps Lock") {
      handleCapsLock();
    } else if (key === "DEL") {
      handleDeleteKey();
    } else if (key === "Shift") {
      handleShiftKey();
    } else if (key === "Tab") {
      handleTabKey();
    } else {
      handleRegularKey(key);
    }
  };
  const handleSpaceKey = () => {
    const newContent = inputText + "\u00A0";
    setInputText(newContent);
  };
  const handleEnterKey = () => {
    const newContent = inputText + "\n";
    setInputText(newContent);
    setTextValue(newContent);
  };
  const handleCapsLock = () => {
    const updatedCaps = !isCaps;
    setIsCaps(updatedCaps);
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
      const firstSpanElement = key.querySelector("span:first-child");
      if (firstSpanElement) {
        const keyText = firstSpanElement.innerText.toLowerCase();
        if (
          !["shift", "alt", "ctrl", "enter", "caps lock", "tab"].includes(
            keyText
          )
        ) {
          firstSpanElement.innerText =
            (updatedCaps && isShift) || (!updatedCaps && !isShift)
              ? keyText.toLowerCase()
              : keyText.toUpperCase();
        }
        if (keyText === "caps lock") {
          firstSpanElement.parentElement.style.backgroundColor = updatedCaps
            ? "blue"
            : "#445760";
        }
      }
    });
  };
  const handleTabKey = () => {
    const newContent = inputText + " ";
    setInputText(newContent);
  };

  const handleDeleteKey = () => {
    if (inputText.length === 0) {
      return;
    }
    const newContent = inputText.slice(0, inputText.length - 1);
    setInputText(newContent);
  };

  const handleShiftKey = () => {
    const updatedShift = !isShift;
    setIsShift(updatedShift);
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
      const firstSpanElement = key.querySelector("span:first-child");
      if (firstSpanElement) {
        const keyText = firstSpanElement.innerText.toLowerCase();
        if (
          !["shift", "alt", "ctrl", "enter", "caps lock", "tab"].includes(
            keyText
          )
        ) {
          firstSpanElement.innerText =
            (updatedShift && isCaps) || (!updatedShift && !isCaps)
              ? keyText.toLowerCase()
              : keyText.toUpperCase();
        }
        if (keyText === "shift") {
          firstSpanElement.parentElement.style.backgroundColor = updatedShift
            ? "blue"
            : "#445760";
        }
      }
    });
  };

  const handleRegularKey = (key) => {
    const keys = key.split(/[._]/);
    let newContent;
    if (keys.length > 1) {
      if (isShift) {
        if (keys.length === 3) {
          if (keys[0] === ">") newContent = inputText + ">";
          else newContent = inputText + "_";
        } else newContent = inputText + keys[0];
      } else {
        if (keys.length === 3) {
          if (keys[0] === ">") newContent = inputText + ".";
          else newContent = inputText + "-";
        } else newContent = inputText + keys[1];
      }
    } else {
      let character =
        (isShift && isCaps) || (!isShift && !isCaps)
          ? key.toLowerCase()
          : key.toUpperCase();
      newContent = inputText + character;
    }
    setInputText(newContent);
  };

  return (
    <div
      className={`select-none duration-500 transition-opacity ${
        keyboard ? "opacity-100 " : "opacity-0 "
      }`}
    >
      <div className="keyboardcontainer" id="keyboard">
        <div className="container">
          <div className="row">
            {[
              "~.`",
              "!.1",
              "@.2",
              "#.3",
              "$.4",
              "%.5",
              "^.6",
              "&.7",
              "*.8",
              "(.9",
              ").0",
              "_.-",
              "+.=",
              "DEL",
            ].map((keyvalue) => (
              <div
                key={keyvalue}
                className="key"
                onClick={() => handleKeyClick(keyvalue)}
              >
                {keyvalue.includes(".") ? (
                  keyvalue
                    .split(".")
                    .map((part, index) => <span key={index}>{part}</span>)
                ) : keyvalue === "DEL" ? (
                  <span>DEL</span>
                ) : (
                  <span>{keyvalue}</span>
                )}
              </div>
            ))}
          </div>
          <div className="row">
            {[
              "Tab",
              "q",
              "w",
              "e",
              "r",
              "t",
              "y",
              "u",
              "i",
              "o",
              "p",
              "{_[",
              "}_]",
              "|_\\",
            ].map((keyvalue) => (
              <div
                key={keyvalue}
                className="key"
                onClick={() => handleKeyClick(keyvalue)}
              >
                {keyvalue.includes("_") ? (
                  keyvalue
                    .split("_")
                    .map((part, index) => <span key={index}>{part}</span>)
                ) : (
                  <span>{keyvalue}</span>
                )}
              </div>
            ))}
          </div>
          <div className="row">
            {[
              "Caps Lock",
              "a",
              "s",
              "d",
              "f",
              "g",
              "h",
              "j",
              "k",
              "l",
              ":_;",
              `"_'`,
              "Enter",
            ].map((keyvalue) => (
              <div
                key={keyvalue}
                className="key"
                onClick={() => handleKeyClick(keyvalue)}
              >
                {keyvalue.includes("_") ? (
                  keyvalue
                    .split("_")
                    .map((part, index) => <span key={index}>{part}</span>)
                ) : (
                  <span>{keyvalue}</span>
                )}
              </div>
            ))}
          </div>
          <div className="row">
            {[
              "Shift",
              "z",
              "x",
              "c",
              "v",
              "b",
              "n",
              "m",
              "<_,",
              ">_.",
              "?_/",
              "Shift",
            ].map((keyvalue, index) => (
              <div
                key={index}
                className="key"
                onClick={() => handleKeyClick(keyvalue)}
              >
                {keyvalue.includes("_") ? (
                  keyvalue
                    .split("_")
                    .map((part, index) => <span key={index}>{part}</span>)
                ) : (
                  <span>{keyvalue}</span>
                )}
              </div>
            ))}
          </div>
          <div className="row">
            {["Ctrl", "Alt", " ", "Ctrl", "Alt", "<", ">"].map(
              (keyvalue, index) => (
                <div
                  key={index}
                  className="key"
                  onClick={() => handleKeyClick(keyvalue)}
                >
                  <span>{keyvalue}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

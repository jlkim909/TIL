import React from "react";
import "./Home.css";
import Todo from "./TodoBox";
import TodoBoxLater from "./TodoBoxLater";
import { IconList } from "./HomeData";

const imgTest = require("../../image/Study/cssimg/cssMethod2.png");
function Home() {
  return (
    <div className="lzHomeContainer">
      <strong className="lzTitle">Today Minguk Learned</strong>
      {/* date and stopwatch */}
      <div className="lzHomeToolBox">
        <div className="lzCalendar lzNeonWhite">16일 목요일</div>
        <div className="lzStopwatch">
          <span className="lzNeonWhite">00 : 00</span>
        </div>
      </div>
      <div className="lzHomeBody">
        {/* IconBox */}
        <div className="lzHomeIconBox">
          <strong className="lzHomeIconBox__header lzNeonWhite">Pages</strong>
          <div className="lzHomeIconList">
            {IconList.map((item, idx) => (
              <a
                className="lzHomeIconList__item"
                key={item.name + idx}
                href={item.href}
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="lzHomeIconList__icon"
                  src={item.img}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </a>
            ))}
          </div>
        </div>
        <div className="lzTodoList">
          <Todo />
          <TodoBoxLater />
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import Home from "./components/home/Home";
import CategoryBox from "./components/category/CategoryBox";
import Board from "./components/category/Board";
import { Route, Routes } from "react-router-dom";
import { dragSortable, draggable } from "./StudyData/Skills";
import { reactQuill, reactCopyToClipboard } from "./StudyData/Libs";
import Jotter from "./components/jotter/Jotter";
import {
  cssMethod,
  cssNeon,
  cssinitial,
  namingBEM,
  cssDisplay,
  cssPosition,
  cssPaddingMargin,
  cssFloat,
  cssFlex,
  cssGrid,
  cssDrawIcon,
  cssOptimization,
} from "./StudyData/Css";
import "./App.css";
import { uxAccessibility, uxAria } from "./StudyData/Ux";

function App() {
  return (
    <div className="lzAppContainer">
      {/* 카테고리 */}
      <CategoryBox />
      <div className="lzMainContainer">
        <Routes>
          <Route path="/TIL" element={<Home />} />
          <Route path="/TIL/jotter" element={<Jotter />} />
          <Route
            path="/TIL/dragSortable"
            element={<Board data={dragSortable} />}
          />
          <Route path="/TIL/draggable" element={<Board data={draggable} />} />
          <Route
            path="/TIL/react-quill"
            element={<Board data={reactQuill} />}
          />
          <Route
            path="/TIL/react-copy-to-clipboard"
            element={<Board data={reactCopyToClipboard} />}
          />
          {/* css */}
          <Route path="/TIL/cssMethod" element={<Board data={cssMethod} />} />
          <Route path="/TIL/cssNeon" element={<Board data={cssNeon} />} />
          <Route path="/TIL/cssInitial" element={<Board data={cssinitial} />} />
          <Route path="/TIL/BEM" element={<Board data={namingBEM} />} />
          <Route path="/TIL/cssDisplay" element={<Board data={cssDisplay} />} />
          <Route
            path="/TIL/cssPosition"
            element={<Board data={cssPosition} />}
          />
          <Route
            path="/TIL/cssPaddingMargin"
            element={<Board data={cssPaddingMargin} />}
          />
          <Route path="/TIL/cssFloat" element={<Board data={cssFloat} />} />
          <Route path="/TIL/cssFlex" element={<Board data={cssFlex} />} />
          <Route path="/TIL/cssGrid" element={<Board data={cssGrid} />} />
          <Route
            path="/TIL/cssDrawIcon"
            element={<Board data={cssDrawIcon} />}
          />
          <Route
            path="/TIL/cssOptimization"
            element={<Board data={cssOptimization} />}
          />
          {/* UX */}
          <Route
            path="/TIL/uxAccessibility"
            element={<Board data={uxAccessibility} />}
          />
          <Route path="/TIL/uxAria" element={<Board data={uxAria} />} />
          {/* 바디 */}
          {/* <Board /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

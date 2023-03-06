import React, { useState } from "react";
import Profil from "./Profil";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsClipboard } from "react-icons/bs";
import { BiNote } from "react-icons/bi";
import "./CategoryBox.css";
import MemoModal from "../modal/MemoModal";

const categoryData = [
  {
    title: "기능",
    itemList: [
      {
        content: "dragSortable",
        to: "/TIL/dragSortable",
      },
      {
        content: "draggable",
        to: "/TIL/draggable",
      },
    ],
  },
  {
    title: "라이브러리",
    itemList: [
      {
        content: "react-quill",
        to: "/TIL/react-quill",
      },
      {
        content: "clipboard",
        to: "/TIL/react-copy-to-clipboard",
      },
    ],
  },
  // css
  {
    title: "css",
    itemList: [
      {
        content: "Display",
        to: "/TIL/cssDisplay",
      },
      {
        content: "Flex",
        to: "/TIL/cssFlex",
      },
      {
        content: "Grid",
        to: "/TIL/cssGrid",
      },
      {
        content: "Position",
        to: "/TIL/cssPosition",
      },
      {
        content: "패딩, 마진",
        to: "/TIL/cssPaddingMargin",
      },
      {
        content: "Float",
        to: "/TIL/cssFloat",
      },
      {
        content: "CSS초기화",
        to: "/TIL/cssInitial",
      },
      {
        content: "CSS명세 읽는 방법",
        to: "/TIL/cssMethod",
      },
      {
        content: "BEM(네이밍기법)",
        to: "/TIL/BEM",
      },
      {
        content: "네온사인효과",
        to: "/TIL/cssNeon",
      },
      {
        content: "css로 아이콘 그리기",
        to: "/TIL/cssDrawIcon",
      },
      {
        content: "퍼포먼스 향상",
        to: "/TIL/cssOptimization",
      },
    ],
  },
  {
    title: "UX",
    itemList: [
      {
        content: "접근성",
        to: "/TIL/uxAccessibility",
      },
      {
        content: "ARIA",
        to: "/TIL/uxAria",
      },
    ],
  },
  {
    title: "react",
    itemList: [],
  },
  {
    title: "공부일지",
    itemList: [],
  },
];

export default function CategoryBox() {
  const [openMemo, setOpenMemo] = useState<boolean>(false);
  return (
    <>
      <div className="lzCategoryBox">
        <Profil />
        <div className="lzCategoryBox__iconsList">
          <span
            className="lzCategoryBox__icon"
            onClick={() => setOpenMemo(true)}
          >
            <BiNote />
          </span>
          <NavLink
            className="lzCategoryBox__icon lzCategoryBox__icon--board"
            to="/TIL/jotter"
          >
            <BsClipboard />
          </NavLink>
          <NavLink className="lzCategoryBox__icon" to="/TIL">
            <AiOutlineHome />
          </NavLink>
        </div>
        <div className="lzCategory">
          {categoryData.map(({ title, itemList }, index) => (
            <div className="lzCategory__item" key={title + index}>
              <div className="lzStudyList__title">{title}</div>
              <ul className="lzStudyList">
                {itemList?.map(({ content, to }, index) => (
                  <NavLink
                    className="lzStudyList__item"
                    to={to}
                    key={content + index}
                  >
                    {content}
                  </NavLink>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {openMemo === true ? (
        <MemoModal onClose={() => setOpenMemo(false)} />
      ) : null}
    </>
  );
}

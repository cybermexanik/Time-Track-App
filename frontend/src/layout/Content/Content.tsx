import "./Content.css";
import ContentTop from '../../components/ContentTop/ContentTop.tsx';
import ContentMain from '../../components/ContentMain/ContentMain.tsx';
import React from "react";

const Content = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <ContentMain />
    </div>
  )
}

export default Content

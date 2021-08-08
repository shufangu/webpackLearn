import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";

function Home() {
  const [love, setLove] = useState("小河妖");
  const locations  = useLocation();

  const params = useParams();
  // console.log(params);

  const history = useHistory();
  const handleClick = () => {
    history.push("/about");
  };
  

  useEffect(() => {
    console.log( locations );
  }, [locations]);

  return (
    <div className="Home-container-wrap">
      我就是首页
      <p className="click-btn" onClick={() => handleClick()}>
        我要回到广告页面
      </p>
      <p className="click-btn" onClick={() => setLove(love + "1")}>
        {love}
      </p>
    </div>
  );
}
Home.propTypes = {};
Home.defaultProps = {};
export default Home;

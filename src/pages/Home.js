import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";

function Home() {
  const location =  useLocation();
  console.log(location);

  const params = useParams();
  console.log(params);

  const history = useHistory();
  const  handleClick = () => {
    history.push("/about");
  }

  return <div className="Home-container-wrap">
    我就是首页
    <p className="click-btn" onClick={() => handleClick()}>我要回到广告页面</p>
  </div>;
}
Home.propTypes = {};
Home.defaultProps = {};
export default Home;

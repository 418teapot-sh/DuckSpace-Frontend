import NavBar from "../components/NavBar";

import HomeSlide from "../components/homeComponents/HomeSlide";
import HomePopupCard from "../components/homeComponents/HomePopupCard";
import HomeExhibition from "../components/homeComponents/HomeExhibition";
import DuckSpaceIcon from "../assets/DuckSpaceIcon.svg";

const Home = () => {
  return (
    <div className="min-h-screen bg-white pb-24">

      {/* 로고 */}
      <div className="px-5 py-3">
        <img
          src={DuckSpaceIcon}
          alt="DuckSpace"
          className="h-9"
        />
      </div>

      {/* 상단 팝업 슬라이드 */}
      <div className="pt-4">
        <HomeSlide/>
      </div>

      {/* 다가오는 팝업 */}
      <HomePopupCard/>

      {/* 다른 유저 전시장 */}
      <HomeExhibition />

      <NavBar />
    </div>
  );
}

export default Home 
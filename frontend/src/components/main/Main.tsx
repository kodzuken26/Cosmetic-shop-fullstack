import { type FC } from "react";
import "./styles-main.scss";
import Categories from "./Categories";
import Slider from "./Slider";
import Brands from "./Brands";
import StartInfo from "./StartInfo";
import AboutInfo from "./AboutInfo";
import LatestProducts from "./LatestProducts";

const Main: FC = () => {
  return (
    <>
      <div className="container">
        <Slider />
        <StartInfo />
              <Categories />
              <LatestProducts/>
              <AboutInfo/>
        <Brands />
      </div>
    </>
  );
};

export default Main;

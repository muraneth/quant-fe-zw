import { Carousel, Button } from "antd";
// import { svgMap } from "@/constants/svg";
import styles from "./index.module.scss";
import { coinImgList } from "./coinlist";
// google 压缩后，转 base64，或者 svg，直接打进 html
// 走请求拿图片效果不好
// 需要提供 svg 的图，目前的 figma 导出的 svg 有问题
const chartImgList = [
  { path: "/chart_1.png" },
  { path: "/chart_2.png" },
  { path: "/chart_3.png" },
];

// const buttomList = [
//   {
//     icon: svgMap["email"],
//     link: "tokenalytic@gmail.com",
//   },
//   {
//     icon: svgMap["telegram"],
//     link: "",
//   },
//   {
//     icon: svgMap["x"],
//     link: "https://x.com/tokenalytic",
//   },
// ];

const LangingPage = () => {
  const renderCoinItem = (key: number, path: string) => {
    return (
      <div className={styles.coinImgBack1} key={key}>
        <div className={styles.coinImgBack2}>
          <img src={path} />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.landingPage}>
      <section className={styles.introduce}>
        <div className={styles.bref}>
          <h1>Make Rational Decision when trading meme</h1>
          <div className={styles.desc}>
            <h3>We mainly focus on meme coins that</h3>
            <h3>have 100% token in circulation</h3>
            <div>
              <Button type="primary" href="https://studio.tokenalytic.com/explorer">
                Get Started
              </Button>
            </div>
          </div>
        </div>
        <Carousel className={styles.chartImgList} autoplay autoplaySpeed={3000}>
          {chartImgList.map((item, index) => {
            return (
              <div key={index}>
                <img className={styles.imgItem} src={item.path} />
              </div>
            );
          })}
        </Carousel>
      </section>

      <section className={styles.coinImgList}>
        <div className={styles.coinImgListInner}>
          {coinImgList.map((item, index) => renderCoinItem(index, item.path))}
        </div>
        <div className={styles.coinImgListInner}>
          {coinImgList.map((item, index) => renderCoinItem(index, item.path))}
        </div>
      </section>
      {/* <section className={styles.bottom}>
        {buttomList.map((item, index) => (
          <a
            className={styles.bottomIcon}
            key={index}
            href={item.link}
            target="_blank"
          >
            {item.icon}
          </a>
        ))}
      </section> */}
    </div>
  );
};

export default LangingPage;

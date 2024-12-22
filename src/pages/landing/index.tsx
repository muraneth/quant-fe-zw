import { Carousel } from "antd";
import { svgMap } from "@/constants/svg";
import styles from "./index.module.scss";

// google 压缩后，转 base64，或者 svg，直接打进 html
// 走请求拿图片效果不好
// 需要提供 svg 的图，目前的 figma 导出的 svg 有问题
const chartImgList = [
  { path: "/chart_1.png" },
  { path: "/chart_2.png" },
  { path: "/chart_3.png" },
];

// 这里如果 coin 是固定的 icon，建议也是 svg 打进 html
const coinImgList = [
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0xd6203889c22d9fe5e938a9200f50fdffe9dd8e02.png?1731336065917",
  },
  {
    path: "https://assets.coingecko.com/coins/images/33798/large/photo_2023-12-18_04-47-31.jpg?1702990624",
  },
  {
    path: "https://assets.coingecko.com/coins/images/33666/large/points_%281%29.png?1703050357",
  },
  {
    path: "https://assets.coingecko.com/coins/images/30911/large/osak_logo.png?1696529756",
  },
  {
    path: "https://assets.coingecko.com/coins/images/31374/large/emplogotransparent_%281%29.png?1696530191",
  },
  {
    path: "https://assets.coingecko.com/coins/images/30505/large/dmt.png?1696529391",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0xc785698504a70be37d0e939a4c5326f8eddd5beb.jpg?1685976967535",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/3/ether/0xe5018913f2fdf33971864804ddb5fca25c539032.png?1714009113",
  },
  {
    path: "https://assets.coingecko.com/coins/images/32557/large/imresizer-1698351889115.jpg?1698503559",
  },
  {
    path: "https://coin-images.coingecko.com/coins/images/38697/large/coingecko_png.png?1718349882",
  },
  {
    path: "https://assets.coingecko.com/coins/images/35708/large/1000005823.jpg?1709624357",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0xb60fdf036f2ad584f79525b5da76c5c531283a1b.png?1717776762159",
  },
  {
    path: "https://assets.coingecko.com/coins/images/16916/large/bone_icon.png?1696516487",
  },
  {
    path: "https://assets.coingecko.com/coins/images/18111/large/Doge.png?1696517615",
  },
  {
    path: "https://assets.coingecko.com/coins/images/31777/large/cg.png?1696530595",
  },
  {
    path: "https://assets.coingecko.com/coins/images/31839/large/cglogo.png?1699223398",
  },
  {
    path: "https://assets.coingecko.com/coins/images/30051/large/h3OCGNvn_400x400.jpg?1696528973",
  },
  {
    path: "https://assets.coingecko.com/coins/images/34484/large/Type_AI_%28Custom%29.jpg?1705044610",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0x473f4068073cd5b2ab0e4cc8e146f9edc6fb52cc.png?1699868792388",
  },
  {
    path: "https://assets.coingecko.com/coins/images/25130/large/x-Logo-color-10x.png?1696524280",
  },
  {
    path: "https://assets.coingecko.com/coins/images/29908/large/noisegpt.png?1696528837",
  },
  {
    path: "https://assets.coingecko.com/coins/images/31908/large/Logo_200x200.png?1696530717",
  },
  {
    path: "https://assets.coingecko.com/coins/images/29590/large/Toku.jpeg?1696528529",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0xceb67a66c2c8a90980da3a50a3f96c07525a26cb.jpg?1716539321689",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0x0000e3705d8735ee724a76f3440c0a7ea721ed00.png?1720555178814",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/3/ether/0x7d4a7be025652995364e0e232063abd9e8d65e6e.png?1696588281",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0x1f19d846d99a0e75581913b64510fe0e18bbc31f.png?1682211162419",
  },
  {
    path: "https://assets.coingecko.com/coins/images/30197/large/n0z-571z_400x400.png?1696529112",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/3/ether/0xed11c9bcf69fdd2eefd9fe751bfca32f171d53ae.png?1728587403",
  },
  {
    path: "https://assets.coingecko.com/coins/images/7989/large/HUNT.png?1696508215",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0x594daad7d77592a2b97b725a7ad59d7e188b5bfa.png?1713003345519",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0x8ed97a637a790be1feff5e888d43629dc05408f6.png?1704008700112",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0xba386a4ca26b85fd057ab1ef86e3dc7bdeb5ce70.png?1682464519651",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0x28561b8a2360f463011c16b6cc0b0cbef8dbbcad.jpg?1727024815408",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0xc56c7a0eaa804f854b536a5f3d5f49d2ec4b12b8.jpg?1715581230622",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0x576e2bed8f7b46d34016198911cdf9886f78bea7.webp?1703406947133",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0xd29da236dd4aac627346e1bba06a619e8c22d7c5.jpg?1715876542020",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0xee2a03aa6dacf51c18679c516ad5283d8e7c2637.png?1722916352753",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0xb90b2a35c65dbc466b04240097ca756ad2005295.png?1725463459542",
  },
  {
    path: "https://www.dextools.io/resources/tokens/logos/ether/0x42069026eac8eee0fd9b5f7adfa4f6e6d69a2b39.jpg?1728373005814",
  },
];

const buttomList = [
  {
    icon: svgMap["email"],
    link: "",
  },
  {
    icon: svgMap["telegram"],
    link: "",
  },
  {
    icon: svgMap["x"],
    link: "",
  },
];

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
        <h1>Make Rational Decision when trading meme</h1>
        <div className={styles.desc}>
          <h2>We mainly focus on meme coins that</h2>
          <h2>have 100% token in circulation</h2>
          <a href="/charts">
            <button>Get Started</button>
          </a>
        </div>
        <Carousel className={styles.chartImgList} autoplay autoplaySpeed={1500}>
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
      <section className={styles.bottom}>
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
      </section>
    </div>
  );
};

export default LangingPage;

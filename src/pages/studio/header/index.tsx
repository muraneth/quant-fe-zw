import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { Input, Popover, Skeleton, Tabs } from "antd";
import { useDebounceFn, useRequest } from "ahooks";
import {
  getTokenList,
  getTokenMarketInfo,
  TokenDetailInfo,
  IndicatorListResDto,
  Indicator,
} from "@/service/charts";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import EllipsisMiddle from "@/components/ellipsis-middle";
import {
  extractedTokenMarketInfo,
  ExtractedTokenMarketInfoItem,
} from "@/utils/common";
import { useChartStore } from "@/store/charts";
import type { TokenBaseInfo } from "@/service/charts";
import classNames from "classnames";
import styles from "./index.module.scss";
import { formatNumber, getDefaultExtraParams } from "@/utils/common";

const chains = [
  { key: "ethereum", label: "Ethereum" },
  { key: "base", label: "Base" },
];

const queryParams = new URLSearchParams(location.search);
const chain = queryParams.get("chain") as string;
const symbol = queryParams.get("symbol");
const handle_name = queryParams.get("handle_name");
const hasUrlInitParams = Boolean(chain && symbol && handle_name);

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const hasUrlInitRef = React.useRef<{ resetFlag: boolean }>({ 
    resetFlag: hasUrlInitParams,
   });

  const [openPopover, setOpenPopover] = useImmer(false);
  const [keywords, setKeywords] = useImmer("");
  const [selectedChain, setSelectedChain] = useImmer("ethereum");
  const [tokenMarketInfoList, setTokenMarketInfoList] = useImmer<
    Array<ExtractedTokenMarketInfoItem>
  >([]);
  const [currentToken, setCurrentToken] = useImmer<TokenBaseInfo>(
    null as unknown as TokenBaseInfo
  );

  const setDraftData = useChartStore.use.setDraftData();
  const resetChartPanelData = useChartStore.use.resetChartPanelData();
  const tokenInfo = useChartStore.use.tokenInfo();
  const indicatorList = useChartStore.use.indicatorList();

  React.useEffect(() => {
    if (indicatorList) {
      // 解析 url 参数，获取 indicator 数据
      // token 切换 -> indicatorList更新 -> 设置默认的 extra_params
      setDraftData((draft) => {
        const findIndicator = (list: IndicatorListResDto): Indicator => {
          for (const category of list) {
            for (const group of category.groups) {
              const foundIndicator = group.indicators.find(
                (indicator) => indicator.handle_name === handle_name
              );

              if (foundIndicator) {
                return foundIndicator;
              }
            }
          }
          return null as unknown as Indicator;
        };
        const indicatorInfo = findIndicator(indicatorList);
        if (indicatorInfo) {
          draft.indicatorInfo = indicatorInfo;
            const { param_schema } = indicatorInfo || {};
            draft.extra_params = getDefaultExtraParams(param_schema);
        }
      });
    }
  }, [indicatorList, setDraftData]);

  const { data: tokenList = [] } = useRequest(
    () => {
      return getTokenList({ key: keywords, chain: selectedChain });
    },
    {
      refreshDeps: [keywords, selectedChain],
      onSuccess: (res) => {
        if (tokenInfo && res) {
          const matchUrlToken = res.find(
            (token) => token.symbol === symbol && chain === token.chain
          );
          if (matchUrlToken) {
            setCurrentToken(matchUrlToken);
            return;
          }
          const matchingToken = res.find(
            (token) =>
              token.symbol === tokenInfo.symbol && token.chain === token.chain
          );
          if (matchingToken) {
            setCurrentToken(matchingToken);
          } else {
            setCurrentToken(res[0]);
          }
        }
      },
    }
  );

  useRequest(
    () => {
      if (!currentToken) return null as any;
      return getTokenMarketInfo({
        symbol: currentToken.symbol,
        chain: currentToken.chain,
      });
    },
    {
      refreshDeps: [currentToken],
      // pollingInterval: 10 * 60 * 1000, // 10分钟轮询
      onSuccess: (tokenMarketInfo: TokenDetailInfo) => {
        if (tokenMarketInfo) {
          setTokenMarketInfoList(extractedTokenMarketInfo(tokenMarketInfo));
        } else {
          setTokenMarketInfoList([]);
        }
      },
      onError: () => {
        setTokenMarketInfoList([]);
      },
    }
  );
  const handleSelectToken = (token: TokenBaseInfo) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("symbol", token.symbol);
    newParams.set("chain", token.chain);
    setSearchParams(newParams);
    setCurrentToken(token);
    setOpenPopover(false);
  };
  const handleChainChange = (chain: string) => {
    setSelectedChain(chain);
    setKeywords("");
  };
  const { run: onSearch } = useDebounceFn(
    (v: string) => {
      setKeywords(v);
    },
    {
      wait: 200,
    }
  );

  React.useEffect(() => {
    if (currentToken) {
      setDraftData((draft) => {
        draft.tokenInfo = {
          symbol: currentToken.symbol,
          chain: currentToken.chain,
          start_time: "",
          end_time: "",
        };
      });
      if (hasUrlInitRef.current.resetFlag) {
        hasUrlInitRef.current.resetFlag = false;
      } else {
        resetChartPanelData({ refreshChart: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentToken]);

  const handleItemClick = (item: ExtractedTokenMarketInfoItem) => {
    if (item) {
      window.location.href = `/studio?symbol=${currentToken.symbol}&handle_name=${item.handle_name}&chain=${currentToken.chain}`;
    }
  };
  const tokenContent = (
    <div className={styles.tokenContent}>
      <Tabs
        defaultActiveKey={selectedChain}
        onChange={handleChainChange}
        items={chains}
        className={styles.chainTabs}
      />
      <div className={styles.search}>
        <Input
          onChange={(v) => {
            onSearch(v.target.value);
          }}
          allowClear
          placeholder="search by token name or symbol or address"
          style={{ height: 32, background: "#222324" }}
          suffix={<SearchOutlined style={{ color: "gray" }} />}
        />
      </div>
      <div className={styles.content}>
        {tokenList?.map((i, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() => {
              handleSelectToken(i);
            }}
          >
            <div className={styles.left}>
              <img src={i.icon_url} alt="" />
            </div>
            <div className={styles.right}>
              <div className={styles.itemHeader}>
                <span className={styles.itemHeaderName}>{i.symbol}</span>
                <span className={styles.itemHeaderDesc}>{i.name}</span>
              </div>
              <div className={styles.rightBottom}>
                {/* <img src={i.icon_url} alt="" /> */}
                <EllipsisMiddle
                  className={styles.contract_address}
                  title={i.contract_address}
                >
                  {i.contract_address}
                </EllipsisMiddle>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.header}>
      <div className={styles.leftWrapper}>
        <Popover
          open={openPopover}
          onOpenChange={(v) => {
            setOpenPopover(v);
          }}
          placement="bottomLeft"
          content={tokenContent}
          trigger={["click"]}
        >
          <div className={styles.left}>
            {currentToken ? (
              <>
                <div className={styles.leftTop}>
                  <img
                    className={styles.logo}
                    src={currentToken?.icon_url}
                    alt=""
                  />
                  <p className={classNames(styles.name, ["common-ellipsis-1"])}>
                    {currentToken?.name}
                  </p>
                  <DownOutlined
                    style={{
                      color: "rgba(255, 255, 255, 0.45)",
                      fontWeight: "bolder",
                    }}
                    className={styles.arrow}
                  />
                </div>
                <EllipsisMiddle
                  className={styles.leftBottom}
                  title={currentToken?.contract_address}
                >
                  {currentToken?.contract_address}
                </EllipsisMiddle>
              </>
            ) : (
              <div className={styles.skeleton}>
                <Skeleton.Avatar
                  style={{ marginRight: 10, width: 18, height: 18 }}
                  active
                  size="small"
                />
                <Skeleton.Input
                  style={{ width: 160, height: 18 }}
                  active
                  size="small"
                />
                <Skeleton.Input
                  style={{ width: 191, height: 10, marginTop: 7 }}
                  active
                  size="small"
                />
              </div>
            )}
          </div>
        </Popover>
      </div>
      <div className={styles.right}>
        {tokenMarketInfoList?.map((i, index) => {
          return (
            <div
              key={index}
              className={styles.itemInfo}
              onClick={() => handleItemClick(i)}
            >
              <div className={styles.title}>{i.title}</div>
              <div className={styles.valueInfo}>
                <span>{formatNumber(i.value)}</span>
                {i.type !== "neutral" && (
                  <span
                    style={{ color: i.type === "rise" ? "#36F097" : "#EB5757" }}
                  >
                    {i.type === "rise" ? "+" : "-"}
                    {i.percentage}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;

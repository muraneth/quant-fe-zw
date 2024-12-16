import * as React from "react";
import { useImmer } from "use-immer";
import { Input, Popover, Skeleton } from "antd";
import { useDebounceFn, useRequest } from "ahooks";
import { getTokenList, getTokenMarketInfo } from "@/service/charts";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import EllipsisMiddle from "@/components/ellipsis-middle";
import {
  extractedTokenMarketInfo,
  ExtractedTokenMarketInfoItem,
} from "@/utils/common";
import { useChartStore } from "@/store/charts";
import type { TokenListItem } from "@/service/charts";
import classNames from "classnames";
import styles from "./index.module.scss";
import {formatBigNumber} from "@/utils/common";


const Header = () => {
  const [openPopover, setOpenPopover] = useImmer(false);
  const [keywords, setKeywords] = useImmer("");
  const [currentToken, setCurrentToken] = useImmer<TokenListItem>(
    null as unknown as TokenListItem
  );
  const [tokenMarketInfoList, setTokenMarketInfoList] = useImmer<
    Array<ExtractedTokenMarketInfoItem>
  >([]);

  const { data: tokenList = [] } = useRequest(
    () => getTokenList({ key: keywords }),
    {
      refreshDeps: [keywords],
      onSuccess: (res) => {
        if (res?.[0] && !currentToken) {
          setCurrentToken(res[0]);
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
      pollingInterval: 10 * 60 * 1000, // 10分钟轮询
      onSuccess: (tokenMarketInfo) => {
        if (tokenMarketInfo) {
          setTokenMarketInfoList(extractedTokenMarketInfo(tokenMarketInfo));
        }
      },
      onError: () => {
        setTokenMarketInfoList([]);
      },
    }
  );

  const { run: onSearch } = useDebounceFn(
    (v: string) => {
      setKeywords(v);
    },
    {
      wait: 200,
    }
  );

  const setTokenInfo = useChartStore.use.setTokenInfo();
  const setOptions = useChartStore.use.setOptions();
  const setChartData = useChartStore.use.setChartData();

  const resetStoreData = () => {
    setOptions(null);
    setChartData(null);
  };

  React.useEffect(() => {
    if (currentToken) {
      resetStoreData();
      setTokenInfo({ symbol: currentToken.symbol, chain: currentToken.chain });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentToken]);

  const tokenContent = (
    <div className={styles.tokenContent}>
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
              setCurrentToken(i);
              setOpenPopover(false);
            }}
          >
            <div className={styles.left}>
              <img src={i.icon_url} alt="" />
            </div>
            <div className={styles.right}>
              <div className={styles.itemHeader}>
                <span className={styles.itemHeaderName}>{i.name}</span>
                <span className={styles.itemHeaderDesc}>
                  Department of Government Efficience
                </span>
              </div>
              <div className={styles.rightBottom}>
                <img src={i.icon_url} alt="" />
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
      <div className={styles.right}>
        {tokenMarketInfoList?.map((i, index) => {
          return (
            <div key={index} className={styles.itemInfo}>
              <div className={styles.title}>{i.title}</div>
              <div className={styles.valueInfo}>
                <span>{formatBigNumber(  i.value)}</span>
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

import { TokenDetailInfo } from "@/service/charts";
import { formatNumber } from "@/utils/common";
import { useNavigate } from "react-router-dom";
import SparklineChart from "./SimpleChart";
import { getUserInfo } from "@/utils/common";
import { userInfo } from "os";
const getColor = (current: number, previous: number) =>
  current - previous >= 0 ? "#36F097" : "#EB5757";
const calculateChange = (current: number, previous: number) =>
  (((current - previous) / previous) * 100).toFixed(2);
export function createDynamicColumns(tokenDetailList: Array<TokenDetailInfo>) {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  return (
    tokenDetailList[0]?.indicator_snaps?.map((indicator, index) => ({
      title: indicator.name,
      key: `indicator_${index}`,
      width: "220px",
      sorter: (a: TokenDetailInfo, b: TokenDetailInfo) => {
        const snapA = a.indicator_snaps?.find(
          (snap) => snap.name === indicator.name
        );
        const snapB = b.indicator_snaps?.find(
          (snap) => snap.name === indicator.name
        );
        return (snapA?.data[6]?.value || 0) - (snapB?.data[6]?.value || 0);
      },
      render: (_: any, record: TokenDetailInfo) => {
        const snap = record.indicator_snaps?.find(
          (snap) => snap.name === indicator.name
        );
        if (snap == undefined) {
          return null;
        }
        if (
          snap.required_level > 1 &&
          (!userInfo || userInfo.level < snap.required_level)
        ) {
          return (
            <div>
              higher level required <a href="/pricing">upgrade plan</a>
            </div>
          );
        }

        if (snap?.data && snap.data.length >= 7) {
          const values = snap.data.map((d) => d.value);

          const baseInfo = record.base_info;

          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: "100%",
                gap: "4px",
                padding: "4px",
                fontSize: "12px",
                lineHeight: "1.5",
                cursor: snap.handle_name ? "pointer" : "default",
                color: snap.handle_name ? "gray" : "inherit",
              }}
              onClick={() => {
                if (snap.handle_name) {
                  navigate(
                    `/studio?symbol=${baseInfo.symbol}&handle_name=${snap.handle_name}&chain=${baseInfo.chain}`
                  );
                }
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "90%",
                }}
              >
                <span>Current:</span>{" "}
                <strong style={{ fontWeight: "bold", color: "white" }}>
                  {formatNumber(snap.data[6].value)}
                </strong>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "90%",
                }}
              >
                <span>24h:</span>
                <div>
                  <strong style={{ color: "white" }}>
                    {formatNumber(snap.data[5].value)} /{" "}
                  </strong>
                  <span
                    style={{
                      color: getColor(snap.data[6].value, snap.data[5].value),
                    }}
                  >
                    {calculateChange(snap.data[6].value, snap.data[5].value)}%
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "90%",
                }}
              >
                <span>7d:</span>{" "}
                <div>
                  <strong style={{ color: "white" }}>
                    {formatNumber(snap.data[0].value)} /{" "}
                  </strong>
                  <span
                    style={{
                      color: getColor(snap.data[6].value, snap.data[0].value),
                    }}
                  >
                    {calculateChange(snap.data[6].value, snap.data[0].value)}%
                  </span>
                </div>
              </div>
              <div style={{ width: "100%", marginTop: "4px" }}>
                <SparklineChart
                  data={values}
                  color={getColor(snap.data[6].value, snap.data[0].value)}
                />
              </div>
            </div>
          );
        }
        return null;
      },
    })) || []
  );
}


import {TokenDetailInfo} from "@/service/charts";
import { formatNumber } from "@/utils/common";
import { useNavigate } from "react-router-dom";
import SparklineChart from "./SimpleChart";
const getColor = (current:number, previous:number) => (current - previous >= 0 ? "#36F097" : "#EB5757");
const calculateChange = (current:number, previous:number) => ((current - previous) / previous * 100).toFixed(2);
export function createDynamicColumns(tokenDetailList:Array<TokenDetailInfo>) {
    const navigate = useNavigate();

    return (
        tokenDetailList[0]?.indicator_snaps?.map((indicator, index) => ({
            title: indicator.name,
            key: `indicator_${index}`,
            width: "180px",
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
                                        `/charts?symbol=${baseInfo.symbol}&handle_name=${snap.handle_name}&chain=${baseInfo.chain}`
                                    );
                                }
                            }}
                        >
                            <div>
                                <strong>Current:</strong>{" "}
                                <span style={{ fontWeight: "bold" }}>{formatNumber(snap.data[6].value)}</span>
                            </div>
                            <div>
                                <strong>24h:</strong>{" "}
                                <span>{formatNumber(snap.data[5].value)} / </span>
                                <span style={{ color: getColor(snap.data[6].value, snap.data[5].value) }}>
                                    {calculateChange(snap.data[6].value, snap.data[5].value)}%
                                </span>
                            </div>
                            <div>
                                <strong>7d:</strong>{" "}
                                <span>{formatNumber(snap.data[0].value)} / </span>
                                <span style={{ color: getColor(snap.data[6].value, snap.data[0].value) }}>
                                    {calculateChange(snap.data[6].value, snap.data[0].value)}%
                                </span>
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

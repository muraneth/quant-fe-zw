import IndicatorSetting from "./indicator-setting";
import GlobalSetting from "./global-setting"
// import styles from "./index.module.scss";
const ChartSetting = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: '100%' 
        }}>

            <IndicatorSetting />
            <GlobalSetting />

        </div>
    );
}
export default ChartSetting;
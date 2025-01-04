/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { priceLineTransform } from "./price-line";
import { independentLineTransform } from "./independent-line";
import { xBarTransform } from "./x-bar";
import { xBarStackTransform } from "./x-bar-stack";
import { yBarTransform } from "./y-bar";
import { yBarStackTransform } from "./y-bar-stack";
import { IndicatorChartType } from "@/service/charts";
import { areaStackTransform } from "./area-stack";
export function generateOptions({
  type,
  indicatorDetailList = [] as any,
  priceList = [] as any,
  klineType = '',
}) {

  switch (type) {
    case IndicatorChartType.PRICE_LINE:
      return priceLineTransform({ indicatorDetailList, priceList, klineType });

    case IndicatorChartType.INDEPENDENT_LINE:
      return independentLineTransform({ indicatorDetailList, priceList, klineType });

    case IndicatorChartType.X_BAR:
      return xBarTransform({ indicatorDetailList, priceList, klineType });

    case IndicatorChartType.X_BAR_STACK:
      return xBarStackTransform({ indicatorDetailList, priceList, klineType });

    case IndicatorChartType.Y_BAR:
      return yBarTransform({ indicatorDetailList, priceList, klineType });

    case IndicatorChartType.Y_BAR_STACK:
      return yBarStackTransform({ indicatorDetailList, priceList, klineType });
    case IndicatorChartType.AREA_STACK:
      return areaStackTransform({ indicatorDetailList, priceList, klineType });
    default:
      return independentLineTransform({ indicatorDetailList, priceList, klineType });
  }
}

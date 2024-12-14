/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { priceLineTransform } from "./price-line";
import { independentLineTransform } from "./independent-line";
import { xBarTransform } from "./x-bar";
import { xBarStackTransform } from "./x-bar-stack";
import { yBarTransform } from "./y-bar";
import { yBarStackTransform } from "./y-bar-stack";
import { IndicatorChartType } from "@/service/charts";

export function generateOptions({
  type,
  indicatorData = [] as any,
  klineList = [] as any,
  klineType = '',
}) {
  switch (type) {
    case IndicatorChartType.PRICE_LINE:
      return priceLineTransform({ indicatorData, klineList, klineType });

    case IndicatorChartType.INDEPENDENT_LINE:
      return independentLineTransform({ indicatorData, klineList, klineType });

    case IndicatorChartType.X_BAR:
      return xBarTransform({ indicatorData, klineList, klineType });

    case IndicatorChartType.X_BAR_STACK:
      return xBarStackTransform({ indicatorData, klineList, klineType });

    case IndicatorChartType.Y_BAR:
      return yBarTransform({ indicatorData, klineList, klineType });

    case IndicatorChartType.Y_BAR_STACK:
      return yBarStackTransform({ indicatorData, klineList, klineType });

    default:
      return {};
  }
}

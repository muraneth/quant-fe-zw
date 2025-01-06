import { SignInResDto } from "@/service/sign-in-up";
import { storageKey } from "@/constants/common";
import { TokenDetailInfo } from "@/service/charts";

export function removeSpaces(str: string) {
  return (str || "").replace(/\s+/g, "");
}

export function removeSpacesFromObject(obj: Record<string, any>) {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    newObj[key] = removeSpaces(obj[key]);
  });
  return newObj;
}
export function updateUserInfo(userInfo: SignInResDto) {
  try {
    localStorage.setItem(
      storageKey["userInfo"],
      JSON.stringify(userInfo || {})
    );
    window.history.back();
  } catch (err) {
    console.error(err);
  }
}
export function signInSuccessAction(userInfo: SignInResDto) {
  try {
    localStorage.setItem(
      storageKey["userInfo"],
      JSON.stringify(userInfo || {})
    );
    const searchIns = new URLSearchParams(location.search);
    const redirectUrl = searchIns.get("redirectUrl");
    window.location.href = redirectUrl || "/explorer";
  } catch (err) {
    console.error(err);
  }
}

export function getUserInfo(): SignInResDto {
  try {
    const userInfo = JSON.parse(
      localStorage.getItem(storageKey["userInfo"]) || "{}"
    );
    return userInfo as unknown as SignInResDto;
  } catch {
    return {} as unknown as SignInResDto;
  }
}
export function deleteUserInfo() {
  localStorage.removeItem(storageKey["userInfo"]);
}

interface Auth {
  indicatorLevelAuth?: boolean;
}

export function setAuth({ indicatorLevelAuth }: Auth) {
  if (indicatorLevelAuth !== null && indicatorLevelAuth !== undefined) {
    localStorage.setItem(
      storageKey["indicatorLevelAuth"],
      JSON.stringify(indicatorLevelAuth)
    );
  }
}

interface Auth {
  indicatorLevelAuth?: boolean;
}

export function getAuth(): Auth {
  try {
    const auth = {} as Auth;
    auth.indicatorLevelAuth = JSON.parse(
      localStorage.getItem(storageKey["indicatorLevelAuth"]) || "{}"
    );
    return auth;
  } catch {
    return {};
  }
}

export function findKeyByValueFromMapping<T>(mapping: Record<any, Array<T>>) {
  return function (value: T) {
    for (const key in mapping) {
      if (mapping[key].includes(value)) {
        return key;
      }
    }
  };
}

export interface ExtractedTokenMarketInfoItem {
  percentage?: string;
  title: string;
  handle_name: string;
  chart_type?: string;
  type?: "rise" | "fall" | "neutral";
  value?: number;
}

export function extractedTokenMarketInfo(
  tokenMarketInfo?: TokenDetailInfo
): Array<ExtractedTokenMarketInfoItem> {
  if (!tokenMarketInfo||!tokenMarketInfo.indicator_snaps) return [];
  return tokenMarketInfo.indicator_snaps.map((item) => {
    if (!item.data || item.data.length < 7) {
      return {
        title: item.name, 
        handle_name: item.handle_name,
        chart_type: item.type,
      }
    }
    var chg = item.data[6].value - item.data[5].value;
    var chgPercentage =0;
    if (item.data[5].value!=0){
      chgPercentage = chg / item.data[5].value;
    }
    return {
      title: item.name,
      value: item.data[6].value,
      handle_name: item.handle_name,
      chart_type: item.type,
      type: chg > 0 ? "rise" :chg < 0 ? "fall" : "neutral",
      percentage: numberToPercentage(chgPercentage),
    };
  })
 
}

export const formatNumber = (data: any) => {
  if (data === undefined) {
    return "N/A";
  }
  const numData = Number(data);

  // Check if conversion resulted in a valid number
  if (isNaN(numData)) {
    console.error("Invalid input to formatBigNumber:", data);
    return "N/A";
  }
  if (Math.abs(numData) > 1000000000) {
    return (numData / 1000000000).toFixed(1) + "B";
  } else if (Math.abs(numData) > 1000000) {
    return (numData / 1000000).toFixed(1) + "M";
  } else if (Math.abs(numData) > 1000) {
    return (numData / 1000).toFixed(1) + "K";
  } else if (Math.abs(numData) > 1) {
    return numData.toFixed(2);
  } else if (Math.abs(numData) > 0.01) {
    return numData.toFixed(3);
  } else if (Math.abs(numData) > 0.001) {
    return numData.toFixed(4);
  } else if (Math.abs(numData) > 0.0001) {
    return numData.toFixed(5);
  } else if (Math.abs(numData) > 0.00001) {
    return numData.toFixed(6);
  } else if (Math.abs(numData) > 0.000001) {
    return numData.toFixed(7);
  } else if (Math.abs(numData) > 0.0000001) {
    return numData.toFixed(8);
  } else if (Math.abs(numData) > 0.00000001) {
    return numData.toFixed(9);
  } else if (Math.abs(numData) == 0.0) {
    return 0;
  }
  return numData;
};

export const numberToPercentage = (value: number) => {
  return (value * 100).toFixed(1) + "%";
};

export const getDefaultExtraParams = (param_schema: string) => {
  const { extra_params_schema = {} } =
    JSON.parse((param_schema || null) as string) || {};

  if (extra_params_schema.properties) {
    const defaultExtraParams: Record<string, any> = {};
    const properties = extra_params_schema.properties;

    Object.keys(properties).forEach((key) => {
      const prop = properties[key];
      const defaultValue = prop?.default;
      const customWidgetDefaultValue = prop?.props?.default_value;
      if (defaultValue !== undefined && defaultValue !== null) {
        defaultExtraParams[key] = prop.default;
      } else if (
        customWidgetDefaultValue !== undefined &&
        customWidgetDefaultValue !== null
      ) {
        defaultExtraParams[key] = prop.props.default_value;
      }
    });

    return defaultExtraParams;
  }

  return {};
};

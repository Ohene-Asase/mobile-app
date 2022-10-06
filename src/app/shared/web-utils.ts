import { isArray, isObject } from "underscore";

export class WebUtils {
  public static getIsoDateString(date) {
    if (!date) return null
    date = new Date(date)
    return date = date.toISOString().substring(0, 10)
  }

  public static replaceDateTime(dateString: string) {
    if (dateString.includes("T0")) return dateString.replace("T0", "T1");
    else return dateString
  }

  public static getTimeString(date) {
    if (!date) return null
    date = new Date(date)
    return date = date.toISOString().substring(11, 16)
  }

  public static camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  public static getColor() {
    let newColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    return newColor;
  }

  public static refactorObj(obj: Object) {
    Object.keys(obj).forEach(prop => {
      const propValue = obj[prop];
      if (propValue === null) delete obj[prop];
      else if (isArray(propValue)) obj[prop] = propValue.map((i) => this.refactorObj(i));
      else if (isObject(propValue)) obj[prop] = this.refactorObj(propValue);
    });
    return obj;
  }

}


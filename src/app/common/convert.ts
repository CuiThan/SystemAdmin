
export class Convert {
    public static StringToBool(val: string): boolean {
      return (/^true$/i).test(val);
    }
  }
  
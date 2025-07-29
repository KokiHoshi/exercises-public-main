export const point = {
    r: 0,
    theta: 0,
  
    get x() {
      return this.r * Math.cos(this.theta);
    },
    set x(value) {
      if (Number.isNaN(value)) {
        throw new Error("Invalid x value: NaN");
      }
      const y = this.y;
      this.r = Math.hypot(value, y);
      this.theta = Math.atan2(y, value);
    },
  
    get y() {
      return this.r * Math.sin(this.theta);
    },
    set y(value) {
      if (Number.isNaN(value)) {
        throw new Error("Invalid y value: NaN");
      }
      const x = this.x;
      this.r = Math.hypot(x, value);
      this.theta = Math.atan2(value, x);
    }
  };
  
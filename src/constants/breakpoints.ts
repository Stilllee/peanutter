type Breakpoints = {
  mobile: string;
  tablet: string;
  desktop: string;
};

export const device: Breakpoints = {
  mobile: "(max-width: 500px)",
  tablet: "(min-width: 501px) and (max-width: 1000px)",
  desktop: "(min-width: 1001px)",
};

export const flags = (countryCodes: string[]) => {
  return countryCodes.map(flag).join("");
};

const flag = (countryCode: string) => {
  return countryCode.replace(/./g, x =>
    String.fromCharCode(55356, 56741 + x.charCodeAt(0))
  );
};

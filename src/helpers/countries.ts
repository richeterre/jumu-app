export const flag = (countryCode: string) => {
  return countryCode.replace(/./g, x =>
    String.fromCharCode(55356, 56741 + x.charCodeAt(0))
  );
};

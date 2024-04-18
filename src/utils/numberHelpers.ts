export const formatNumber = (num: number) => {
  if (isNaN(num)) {
    return 0.0;
  }
  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });
};

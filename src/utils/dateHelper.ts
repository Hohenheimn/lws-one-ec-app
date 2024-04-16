export const dateString = (dateString: string) => {
  const date = new Date(dateString);
  const options: any = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const ratingPr = (reviews, average) => {
  if (reviews.length > 0) {
    reviews.forEach((ele) => {
      return (average += ele.assessment);
    });
    return (average / (reviews.length + 1)).toFixed(2);
  }
  return average.toFixed(2);
};

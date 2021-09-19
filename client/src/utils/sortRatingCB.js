import { ratingPr } from "./RatingAverage";

export default function sortRatingCB(array, str) {
  let results = [];
  const average = 3.5;
  if (str === "highest") {
    results = array.sort((a, b) => {
      return ratingPr(b.rating, average) - ratingPr(a.rating, average);
    });
  } else if (str === "lowest") {
    results = array.sort((a, b) => {
      return ratingPr(a.rating, average) - ratingPr(b.rating, average);
    });
  }
  return results;
}

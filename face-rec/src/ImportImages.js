function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item).default || r(item);
  });
  return images;
}

const images = importAll(
  require.context("../public/images", false, /\.(png|jpe?g|svg)$/)
);

export default images;

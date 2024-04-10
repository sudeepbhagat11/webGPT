import FileSaver from "file-saver";

// @ts-ignore
const downlaodImage = async (imageUrl) => {
  FileSaver.saveAs(imageUrl, `download-${imageUrl}.jpg`);
};

export default downlaodImage;

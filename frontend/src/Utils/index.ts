import FileSaver from "file-saver";

const downlaodImage = async (imageUrl) => {
  FileSaver.saveAs(imageUrl, `download-${imageUrl}.jpg`);
};

export default downlaodImage;

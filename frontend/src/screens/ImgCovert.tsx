import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button } from "react-bootstrap";
import Tesseract from "tesseract.js";

export const ImgCovert = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  // @ts-ignore
  const [progress, setProgress] = useState(0);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (image) {
      const result = await Tesseract.recognize(image);
      setText(result.data.text);
      setIsLoading(false);
    }
  };
  return (
    <div>
      {!isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: "grey",
            margin: "20px",
            marginBottom: "60px",
            alignItems: "center",
            fontSize: "50px",
          }}
        >
          Image To Text{" "}
        </div>
      )}
      <FormContainer>
        {isLoading && (
          <>
            <progress className="form-control" value={progress} max="100">
              {progress}%{" "}
            </progress>{" "}
            <p className="text-center py-0 my-0">Converting:- {progress} %</p>
          </>
        )}
        {!isLoading && !text && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              // @ts-ignore
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
              type="file"
              className="form-control"
              style={{
                width: "95%",
                backgroundColor: "transparent",
                padding: "30px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px",
              }}
            />
            <Button
              type="submit"
              variant="outline-primary"
              style={{ width: "140px", borderRadius: "20px", padding: "10px" }}
              disabled={isLoading}
              value={text}
              onClick={handleSubmit}
            >
              Convert
            </Button>
          </div>
        )}

        {!isLoading && text && (
          <>
            <textarea
              className="form-control w-100 mt-5"
              // @ts-ignore
              rows="30"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </>
        )}
      </FormContainer>
    </div>
  );
};

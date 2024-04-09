import "./Dalle.css";
import ai from "../assets/ai.jpg";
import { LuSend } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";
import downlaodImage from "../Utils/index";
import { Button } from "react-bootstrap";

export const Dalle = () => {
  const [prompt, setPrompt] = useState("");
  const [image_url, setImage_url] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(false);

  const submitHandler = async () => {
    // @ts-ignore
    if (prompt === "") {
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post("openai/generateimage", { prompt });
      setPrompt("");
      console.log(res);

      setImage_url(res.data.data.imageUrl);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating image:", error);
      throw new Error("Unable to get image url");
    }
  };

  return (
    <div className="ai-image">
      <div className="header">
        AI-Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          {isLoading && (
            <>
              <progress className="form-control" value={progress} max="100">
                {progress}%{" "}
              </progress>{" "}
              <p className="text-center py-0 my-0">Generating</p>
            </>
          )}

          {!isLoading && <img src={image_url === "/" ? ai : image_url} />}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
            }}
          >
            {" "}
            <Button
              variant="outline-success"
              onClick={() => downlaodImage(image_url)}
              disabled={image_url === "/"}
            >
              Download
            </Button>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "60%",
          borderRadius: "50px",
          backgroundColor: "#1F3540",

          display: "flex",
          margin: "auto",
          height: "70px",
        }}
      >
        {" "}
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          style={{
            width: "90%",
            backgroundColor: "transparent",
            padding: "30px",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: "20px",
          }}
        />
        {
          <LuSend
            onClick={submitHandler}
            style={{ marginTop: "30px", cursor: "pointer" }}
          />
        }
      </div>
    </div>
  );
};

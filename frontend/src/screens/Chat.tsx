import { useState, useLayoutEffect, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import ChatItem from "../components/chats/chatItem";
import { useNavigate } from "react-router-dom";

import { getUserChats, deleteUserChats } from "../helpers/api";

import { Button } from "react-bootstrap";
import { LuSend } from "react-icons/lu";
import axios from "axios";

import FormContainer from "../components/FormContainer";

import Tesseract from "tesseract.js";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const Chat = () => {
  // const inputRef = useRef<HTMLInputElement | null>(null);
  // @ts-ignore
  const userInfo = useSelector((state) => state.auth.userInfo);
  // const name = userInfo?.name[0];

  const navigate = useNavigate();
  // @ts-ignore
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  // @ts-ignore
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [content, setContents] = useState("");

  const handleSubmit = async () => {
    // const content = inputRef.current?.value as string;
    console.log(content);

    if (content === "") {
      console.log("Content empty");
      console.error("Content is null or empty");
      return;
    }

    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      setIsLoading(true);
      const chatData = await axios.post("api/new", { message: content });
      setIsLoading(false);
      console.log(chatData.data);
      setChatMessages([...chatData.data.chats]);
      setContents("");
    } catch (error) {
      console.error("Error generating text:", error);
      throw new Error("Unable to get  data");
    }
  };

  const handleDeleteChats = async () => {
    try {
      // @ts-ignore
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      // @ts-ignore
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      // @ts-ignore
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (userInfo) {
      toast.loading("Loading Chats");
      getUserChats()
        .then((data) => {
          if (data.chats && Array.isArray(data.chats)) {
            setChatMessages([...data.chats]);
          } else {
            console.error("Invalid chat data structure:", data);
          }
          toast.success("Successfully loaded chats");
        })
        .catch((err) => {
          console.log(err);
          // @ts-ignore
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) {
      return navigate("/login");
    }
  }, [userInfo]);

  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  // @ts-ignore
  const [progress, setProgress] = useState(0);

  const handleSubmit2 = async () => {
    setIsLoading(true);

    try {
      if (image) {
        setIsLoading2(true);
        const result = await Tesseract.recognize(image);
        setIsLoading2(false);
        if (result && result.data && result.data.text) {
          const extractedText = result.data.text;
          setText(extractedText);
          const newMessage: Message = { role: "user", content: extractedText };
          setChatMessages((prev) => [...prev, newMessage]);
          try {
            const chatData = await axios.post("api/new", {
              message: extractedText,
            });
            setChatMessages([...chatData.data.chats]);
          } catch (error) {
            console.error("Error generating text:", error);
            throw new Error("Unable to get data");
          }
        } else {
          console.error("Failed to extract text from the image.");
        }
      } else {
        console.error("No image selected.");
      }
    } catch (error) {
      console.error("Error during OCR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
          maxWidth: "100%",
          height: "100%",
          mt: 3,
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "1100px",
            flex: { md: 1, xs: 1, sm: 1 },
            flexDirection: "column",
            px: 3,
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "40px",
              color: "grey",
              mb: 2,
              mt: -5,

              mx: "35%",
              fontWeight: "600",
            }}
          >
            webGPT
          </Typography>
          <Box
            sx={{
              maxWidth: "100%",
              height: "68vh",
              borderRadius: 3,
              mx: "auto",
              display: "flex",
              flexDirection: "column",

              scrollBehavior: "smooth",
              overflow: "scroll",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {chatMessages.map((chat, index) => (
              //@ts-ignore
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}
          </Box>

          <div
            style={{
              width: "100%",
              borderRadius: "50px",
              backgroundColor: "#1F3540",

              display: "flex",
              margin: "auto",
              height: "70px",
            }}
          >
            {" "}
            <input
              value={content}
              onChange={(e) => setContents(e.target.value)}
              type="text"
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
            {
              <LuSend
                onClick={handleSubmit}
                style={{ marginTop: "30px", cursor: "pointer" }}
              />
            }
          </div>

          <Button
            variant="outline-danger"
            onClick={handleDeleteChats}
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              marginRight: "40px",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            Clear Conversation
          </Button>

          <FormContainer>
            {isLoading2 && (
              <>
                <progress className="form-control" value={progress} max="100">
                  {progress}%{" "}
                </progress>{" "}
                <p className="text-center py-0 my-0">
                  Converting:- {progress} %
                </p>
              </>
            )}
            {!isLoading2 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <input
                  onChange={(e) =>
                    // @ts-ignore
                    setImage(URL.createObjectURL(e.target.files[0]))
                  }
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
                  style={{
                    width: "140px",
                    borderRadius: "20px",
                    padding: "10px",
                  }}
                  disabled={isLoading2}
                  value={text}
                  onClick={handleSubmit2}
                >
                  Search
                </Button>
              </div>
            )}

            {/* {!isLoading2 && text && (
              <div>
                <input
                  onChange={(e) =>
                    setImage(URL.createObjectURL(e.target.files[0]))
                  }
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
                  style={{
                    width: "140px",
                    borderRadius: "20px",
                    padding: "10px",
                  }}
                  disabled={isLoading2}
                  value={text}
                  onClick={handleSubmit2}
                >
                  Search
                </Button>
              </div>
            )} */}
          </FormContainer>
        </Box>
      </Box>
    </div>
  );
};

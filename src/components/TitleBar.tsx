import React, { useEffect, useState } from "react";
import { PiSidebar, PiSidebarFill } from "react-icons/pi";

import { BsChatLeftDots, BsFillChatLeftDotsFill } from "react-icons/bs";
import FileHistoryNavigator from "./File/FileSideBar/FileHistoryBar";

export const titleBarHeight = "30px";
interface TitleBarProps {
  onFileSelect: (path: string) => void;
  currentFilePath: string | null;
  chatbotOpen: boolean;
  similarFilesOpen: boolean;
  toggleChatbot: () => void;
  toggleSimilarFiles: () => void;
  history: string[];
  setHistory: (string: string[]) => void;
}

const TitleBar: React.FC<TitleBarProps> = ({
  onFileSelect,
  currentFilePath,
  chatbotOpen,
  similarFilesOpen,
  toggleChatbot,
  toggleSimilarFiles,
  history,
  setHistory,
}) => {
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    const fetchPlatform = async () => {
      const response = await window.electron.getPlatform();
      setPlatform(response);
    };

    fetchPlatform();
  }, []);

  return (
    <div
      id="customTitleBar"
      className={`h-titlebar  flex justify-between`}
      style={{ backgroundColor: "#303030" }}
    >
      <div
        className="flex mt-[1px]"
        style={
          platform === "darwin" ? { marginLeft: "60px" } : { marginLeft: "2px" }
        }
      >
        <FileHistoryNavigator
          history={history}
          setHistory={setHistory}
          onFileSelect={onFileSelect}
          currentPath={currentFilePath || ""}
        />
      </div>
      <div
        className="flex justify-content-right align-items-right"
        style={platform === "win32" ? { marginRight: "8.5rem" } : {}}
      >
        {similarFilesOpen ? (
          <PiSidebarFill
            className="text-gray-100 cursor-pointer mt-[0.04rem]"
            size={28}
            onClick={toggleSimilarFiles}
            title="Hide Similar Files"
          />
        ) : (
          <PiSidebar
            className="text-gray-100 cursor-pointer mt-[0.04rem]"
            size={28}
            onClick={toggleSimilarFiles}
            title="Show Similar Files"
          />
        )}

        <div className="mt-[0.34rem] mr-[0.5rem] ml-[0.3rem]">
          {chatbotOpen ? (
            <BsFillChatLeftDotsFill
              size={22}
              className="text-gray-100 cursor-pointer"
              onClick={toggleChatbot}
              title="Open Chatbot"
            />
          ) : (
            <BsChatLeftDots
              className="text-gray-100 cursor-pointer "
              size={22}
              onClick={toggleChatbot}
              title="Close Chatbot"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleBar;

import { MdChatBubbleOutline, MdSearch } from "react-icons/md"; // Material Design search icon
import { HiOutlinePlusCircle } from "react-icons/hi"; // Heroicons plus circle
import { HiSearch } from "react-icons/hi"; // Outlined search icon
import { HiOutlineSearch } from "react-icons/hi"; // Solid search icon
import SearchComponent from "./Search/Search";
import NewNoteComponent from "./File/NewNote";
import { MdChatBubble } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaPenSquare, FaSearch } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { TbEqualDouble } from "react-icons/tb";
import { PiSidebar } from "react-icons/pi";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { FaFolderClosed } from "react-icons/fa6";
import { IoFolderOutline } from "react-icons/io5";

import {
  BsChatRightDots,
  BsChatLeftDots,
  BsFillChatLeftDotsFill,
} from "react-icons/bs";
import { SidebarAbleToShow } from "./FileEditorContainer";

interface TitleBarProps {
  onFileSelect: (path: string) => void;
  chatbotOpen: boolean;
  toggleChatbot: () => void;
  toggleSimilarFiles: () => void;
  makeSidebarShow: (show: SidebarAbleToShow) => void;
}

const TitleBar: React.FC<TitleBarProps> = ({
  onFileSelect,
  chatbotOpen,
  toggleChatbot,
  toggleSimilarFiles,
  makeSidebarShow,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    const fetchPlatform = async () => {
      const response = await window.electron.getPlatform();
      setPlatform(response);
    };

    fetchPlatform();
  }, []);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div
      id="customTitleBar"
      className="h-[33px] bg-gray-900 flex justify-between"
    >
      <div
        className=" flex"
        style={
          platform === "darwin" ? { marginLeft: "70px" } : { marginLeft: "1px" }
        }
      >
        {/* <button className="bg-transparent border-none cursor-pointer">
        <MdSearch className="text-gray-600" size={24} />
      </button> */}
        <div className="mt-[0.3rem]" onClick={() => makeSidebarShow("files")}>
          <IoFolderOutline className="text-gray-200 cursor-pointer" size={22} />
        </div>
        <div
          className="ml-2 mt-[2.2px]"
          onClick={() => makeSidebarShow("search")}
        >
          <FaSearch
            size={20}
            className="mt-[3px] cursor-pointer text-gray-200"
            // onClick={() => setShowSearch(true)}
          />
        </div>
        <button
          className="bg-transparent border-none cursor-pointer ml-1"
          onClick={toggleModal}
        >
          <FaRegPenToSquare className="text-gray-200" size={20} />
        </button>

        <NewNoteComponent
          isOpen={isModalOpen}
          onClose={toggleModal}
          onFileSelect={onFileSelect}
        />
      </div>

      <div
        className="flex justify-content-right align-items-right"
        style={platform === "win32" ? { marginRight: "8.5rem" } : {}}
      >
        {/* <button
          className="bg-transparent border-none cursor-pointer mr-0 bg-blue-300"
          onClick={() => {
            toggleSimilarFiles();
            toggleChatbot();
          }}
        > */}
        <PiSidebar
          className="text-gray-100 cursor-pointer mt-[0.1rem]"
          size={28}
          onClick={toggleSimilarFiles}
        />

        <div className="mt-[0.33rem] mr-[0.5rem] ml-[0.3rem]">
          {chatbotOpen ? (
            <BsFillChatLeftDotsFill
              size={22}
              className="text-gray-100 cursor-pointer"
              onClick={toggleChatbot}
            />
          ) : (
            <BsChatLeftDots
              className="text-gray-100 cursor-pointer "
              size={22}
              onClick={toggleChatbot}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleBar;

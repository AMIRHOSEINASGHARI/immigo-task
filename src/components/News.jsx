import React, { useContext, useState } from "react";
// components
import moment from "moment/moment";
import {
  MdFavoriteBorder,
  MdFavorite,
  MdOutlineBookmarkRemove,
  MdOutlineModeComment,
  MdOutlineInsertComment,
  MdOutlineAddComment,
} from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiCommentMinus } from "react-icons/bi";
// context
import { SavedNewsProvider } from "../contexts/SavedNewsContext";
import { CommentContextProvider } from "../contexts/CommentContext";
// functions
import { commentIndex, isSaved, ifHasComment } from "../services/functions";
// demo image
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = (props) => {
  const { savedState, dispatch } = useContext(SavedNewsProvider);
  const { commentState, cDispatch } = useContext(CommentContextProvider);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(false);
  const [showComments, setShowComments] = useState(false);
  return (
    <div className="shadow-md p-3 rounded-md card-styles-primary flex flex-col justify-between">
      <a href={props.url} target="_blank">
        <img
          className="w-full h-44 md:h-72 object-cover rounded-md"
          src={props.image ? props.image : demoImage}
          alt="image"
        />
        <h1 className="text-blue-400 font-semibold text-lg mt-2 mb-4">
          {props.title.length > 50
            ? `${props.title.substring(0, 50)}...`
            : props.title}
        </h1>
        <p>
          {props.summary.length > 100
            ? `${props.summary.substring(0, 100)}...`
            : props.summary}
        </p>
      </a>
      <hr className="my-3" />
      {props.attachments && (
        <div>
          <h1 className="text-blue-500 font-bold text-center border-l-2 border-r-2 border-blue-500 px-3 bg-blue-100">
            {props?.attachments[0]?.title}
          </h1>
          <audio className="w-full h-10 my-3" controls>
            <source src={props?.attachments[0].url} />
          </audio>
        </div>
      )}
      <div className="flex items-center justify-between">
        <a
          href={`${props?.author?.url} : ${props?.author?.url} : '#'`}
          target="_blank"
          className="flex items-center"
        >
          <img
            className="w-8 h-8 object-cover rounded-full mr-2 border"
            src={props?.author?.avatar ? props?.author?.avatar : demoImage}
            alt="avatar"
          />
          {props?.author?.name && (
            <span className="font-bold text-sm text-gray-400">
              {props?.author?.name?.length > 15
                ? `${props?.author?.name?.substring(0, 15)}...`
                : props?.author?.name}
            </span>
          )}
        </a>
        <div className="flex items-center space-x-5">
          <span className="text-xs font-semibold text-gray-500">
            {moment(props.date_published).startOf("ss").fromNow()}
          </span>
        </div>
      </div>
      <hr className="mt-2" />
      <div className="flex items-center space-x-5 justify-end mt-3 mb-1">
        {/* comments icon */}
        <div
          onClick={() => setShowComments(!showComments)}
          className="relative cursor-pointer"
        >
          <MdOutlineInsertComment />
          {commentState.comments[commentIndex(commentState, props.id)] &&
            commentState.comments.length !== 0 && (
              <span className="absolute -left-2 -bottom-2 z-10 text-xs bg-red-400 w-4 h-4 flex items-center justify-center rounded-full text-white">
                {
                  commentState.comments[commentIndex(commentState, props.id)]
                    .comment.length
                }
              </span>
            )}
        </div>
        {/* add comment icon */}
        {!value ? (
          <button
            onClick={() => setValue(true)}
            className="flex items-center flex-col cursor-pointer"
          >
            <MdOutlineAddComment className="text-lge-" />
          </button>
        ) : (
          <button
            onClick={() => setValue(false)}
            className="flex items-center flex-col cursor-pointer"
          >
            <BiCommentMinus className="text-lg fill-red-500" />
          </button>
        )}
        {!isSaved(savedState, props.id) && (
          <button
            type="button"
            onClick={() => dispatch({ type: "SAVE_NEWS", payload: props })}
            className="flex items-center space-x-1 cursor-pointer"
          >
            <MdFavoriteBorder />
            <span className="font-bold text-xs">Save</span>
          </button>
        )}
        {isSaved(savedState, props.id) && props.simplified && (
          <button
            type="button"
            onClick={() =>
              dispatch({ type: "DELETE_SAVED_NEWS", payload: props })
            }
            className="flex items-center space-x-1 cursor-pointer"
          >
            <MdOutlineBookmarkRemove className="fill-red-500" />
            <span className="font-bold text-xs text-red-500">Remove</span>
          </button>
        )}
        {isSaved(savedState, props.id) && !props.simplified && (
          <button
            type="button"
            onClick={() =>
              dispatch({ type: "DELETE_SAVED_NEWS", payload: props })
            }
            className="flex items-center space-x-1 cursor-pointer"
          >
            <MdFavorite className="fill-red-500" />
            <span className="font-bold text-xs text-red-500">saved</span>
          </button>
        )}
      </div>
      {/* comments box */}
      {commentState.comments.length !== 0 &&
        ifHasComment(commentState, props.id) && (
          <div
            className={`bg-gray-100 p-3 rounded-md mt-3 ${
              !showComments && "hidden"
            }`}
          >
            <h1 className="text-blue-600 font-bold">Comments: </h1>
            <hr className="mb-2" />
            {commentState.comments[
              commentIndex(commentState, props.id)
            ].comment.map((el, i) => (
              <p
                className="w-full overflow-auto bg-white rounded-sm my-1 px-1 py-1 border"
                key={i}
              >{`${i + 1}. ${el}`}</p>
            ))}
          </div>
        )}
      <div
        className={`${
          value
            ? "bg-gray-100 rounded-full px-1 py-1 flex items-center mt-2"
            : "hidden"
        }`}
      >
        <button
          className="bg-blue-500 rounded-full py-1 px-3 text-white text-xs mr-2"
          onClick={() => {
            if (
              commentState.comments.length !== 0 &&
              ifHasComment(commentState, props.id)
            ) {
              cDispatch({
                type: "INCREASE_COMMENT",
                payload: props,
                content: inputValue,
              });
            } else if (
              commentState.comments.length !== 0 &&
              !ifHasComment(commentState, props.id)
            ) {
              cDispatch({
                type: "ADD_COMMENT",
                payload: props,
                content: inputValue,
              });
            } else if (commentState.comments.length === 0) {
              cDispatch({
                type: "ADD_COMMENT",
                payload: props,
                content: inputValue,
              });
            }
            setInputValue("");
            setValue(false);
          }}
        >
          Submit
        </button>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-transparent text-xs outline-none placeholder:text-xs placeholder:text-gray-300 w-full"
          type="text"
          placeholder="Type your comment..."
        />
      </div>
    </div>
  );
};

export default News;

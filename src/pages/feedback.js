import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authcontext";
import { api } from "../utils/utils";
import {
  Box,
  Text,
  Button,
  Textarea,
  Avatar,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const Comment = ({ comment, currentUser, fetchComments }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);

  const handleDelete = async () => {
    try {
      await api.delete(`/feedbacks/${comment.id}`);
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await api.patch(`/feedbacks/${comment.id}`, { comment: editedComment });
      fetchComments();
      setEditMode(false);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  return (
    <Box bg={bgColor} p="4" mb="4" borderRadius="md" boxShadow="md">
      <Flex>
        <Avatar name={comment.username} size="sm" mr="2" />
        <Text mb="2" color="blue.500" fontWeight="bold">
          {comment.username}
        </Text>
      </Flex>
      <Box>
        {editMode ? (
          <Textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            size="md"
            resize="none"
            mb="2"
          />
        ) : (
          <Text mb="4" color={textColor}>
            {comment.comment}
          </Text>
        )}
        {currentUser && currentUser.id === comment.user_id && (
          <div>
            {editMode ? (
              <Button
                colorScheme="green"
                size="sm"
                onClick={handleEdit}
                mr="2"
                leftIcon={<FaCheck />}
              >
                Save
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => setEditMode(true)}
                mr="2"
                leftIcon={<FaEdit />}
              >
                Edit
              </Button>
            )}
            <Button
              colorScheme="red"
              size="sm"
              onClick={handleDelete}
              leftIcon={<FaTrash />}
            >
              Delete
            </Button>
          </div>
        )}
      </Box>
    </Box>
  );
};

const Feedback = () => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [displayedComments, setDisplayedComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await api.get("/feedbacks");
      setComments(response.data);
      setDisplayedComments(response.data.slice(0, 3)); // Display the first 3 comments initially
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() !== "") {
      try {
        await api.post("/feedbacks", { comment: comment });
        fetchComments();
        setComment("");
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  const handleViewMore = () => {
    setShowAllComments(true);
    setDisplayedComments(comments);
  };

  return (
    <Box>
      <Box mb="4">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          size="md"
          resize="none"
          mb="2"
        />
        <Button colorScheme="blue" size="sm" onClick={handleCommentSubmit}>
          Comment
        </Button>
      </Box>
      {displayedComments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={user}
          fetchComments={fetchComments}
        />
      ))}
      {!showAllComments && comments.length > 3 && (
        <Button onClick={handleViewMore} colorScheme="blue" mt="4">
          View More
        </Button>
      )}
    </Box>
  );
};

export default Feedback;

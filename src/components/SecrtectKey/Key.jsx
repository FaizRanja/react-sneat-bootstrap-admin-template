import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SecrectKey } from '../../store/reducers/User'; // Update the import path accordingly

const ChatbotComponent = () => {
  const dispatch = useDispatch();

  // Access the correct state slice, make sure you're using the right key (auth in this case)
  const { instructions, isLoading, error } = useSelector((state) => state.authReducier);

  useEffect(() => {
    dispatch(SecrectKey()); // Fetch the secretKey and instructions
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Render the instructions (which contains HTML code) */}
      <div
        dangerouslySetInnerHTML={{
          __html: instructions, // Inject HTML content (like <script> and <link>)
        }}
      />
    </div>
  );
};

export default ChatbotComponent;

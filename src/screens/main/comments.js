import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
  useColorScheme,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Send,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Calendar,
  Star,
} from 'lucide-react-native';
import {darkColors, lightColors} from '../../utils/colors';
import {
  darkThemeStyles,
  lightThemeStyles,
} from '../../common-styling/theme-styling';

// Mock data for comments
const MOCK_COMMENTS = [
  {
    id: '1',
    user: {
      id: '101',
      name: 'Jane Cooper',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    content:
      "This is such a great product! I've been using it for a month now and I'm really impressed with the quality.",
    timestamp: '15m ago',
    likes: 24,
    dislikes: 2,
    isLiked: false,
    isDisliked: false,
    replies: [
      {
        id: '1-1',
        user: {
          id: '102',
          name: 'Robert Johnson',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
        content: 'I agree! The battery life is amazing too.',
        timestamp: '10m ago',
        likes: 5,
        dislikes: 0,
        isLiked: false,
        isDisliked: false,
      },
      {
        id: '1-2',
        user: {
          id: '103',
          name: 'Sarah Williams',
          avatar: 'https://i.pravatar.cc/150?img=3',
        },
        content:
          'Did you try the noise cancellation feature? It works so well in crowded places.',
        timestamp: '8m ago',
        likes: 3,
        dislikes: 0,
        isLiked: false,
        isDisliked: false,
      },
    ],
  },
  {
    id: '2',
    user: {
      id: '104',
      name: 'Michael Brown',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    content:
      'The sound quality is excellent, but I found the ear cups a bit uncomfortable after wearing them for several hours.',
    timestamp: '1h ago',
    likes: 8,
    dislikes: 3,
    isLiked: false,
    isDisliked: false,
    replies: [],
  },
  {
    id: '3',
    user: {
      id: '105',
      name: 'Emily Davis',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    content:
      "Has anyone compared these to the Bose QuietComfort? I'm trying to decide between the two.",
    timestamp: '2h ago',
    likes: 15,
    dislikes: 0,
    isLiked: false,
    isDisliked: false,
    replies: [
      {
        id: '3-1',
        user: {
          id: '106',
          name: 'David Wilson',
          avatar: 'https://i.pravatar.cc/150?img=6',
        },
        content:
          "I've used both and I prefer these. The Sony has better sound quality and the noise cancellation is slightly better. The Bose is more comfortable though.",
        timestamp: '1h ago',
        likes: 12,
        dislikes: 1,
        isLiked: false,
        isDisliked: false,
      },
    ],
  },
  {
    id: '4',
    user: {
      id: '107',
      name: 'Jessica Taylor',
      avatar: 'https://i.pravatar.cc/150?img=7',
    },
    content:
      'Just got mine yesterday! The app is really intuitive and has lots of customization options.',
    timestamp: '3h ago',
    likes: 6,
    dislikes: 0,
    isLiked: false,
    isDisliked: false,
    replies: [],
  },
  {
    id: '5',
    user: {
      id: '108',
      name: 'Andrew Martin',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    content:
      'Does anyone know if these are good for gaming? Looking for something with low latency.',
    timestamp: '5h ago',
    likes: 3,
    dislikes: 0,
    isLiked: false,
    isDisliked: false,
    replies: [
      {
        id: '5-1',
        user: {
          id: '109',
          name: 'Thomas Anderson',
          avatar: 'https://i.pravatar.cc/150?img=9',
        },
        content:
          "They're decent but not great for gaming due to Bluetooth latency. I'd recommend a dedicated gaming headset.",
        timestamp: '4h ago',
        likes: 8,
        dislikes: 0,
        isLiked: false,
        isDisliked: false,
      },
      {
        id: '5-2',
        user: {
          id: '110',
          name: 'Olivia Garcia',
          avatar: 'https://i.pravatar.cc/150?img=10',
        },
        content:
          "I use them for casual gaming and they work fine, but for competitive gaming you'll want something with lower latency.",
        timestamp: '3h ago',
        likes: 5,
        dislikes: 0,
        isLiked: false,
        isDisliked: false,
      },
    ],
  },
];

const CommentsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {postId, title, content} = route.params || {};
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;
  const commonStyles =
    colorScheme === 'dark' ? darkThemeStyles : lightThemeStyles;

  // Animation for comment input
  const inputAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
        Animated.timing(inputAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        Animated.timing(inputAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const navigateToProfile = userId => {
    navigation.navigate('Profile', {userId});
  };

  const handleLikeComment = (commentId, isReply = false, parentId = null) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (!isReply && comment.id === commentId) {
          // Handle main comment like
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
            isDisliked: false,
            dislikes: comment.isDisliked
              ? comment.dislikes - 1
              : comment.dislikes,
          };
        } else if (isReply && comment.id === parentId) {
          // Handle reply like
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === commentId
                ? {
                    ...reply,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                    isLiked: !reply.isLiked,
                    isDisliked: false,
                    dislikes: reply.isDisliked
                      ? reply.dislikes - 1
                      : reply.dislikes,
                  }
                : reply,
            ),
          };
        }
        return comment;
      });
    });
  };

  const handleDislikeComment = (
    commentId,
    isReply = false,
    parentId = null,
  ) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (!isReply && comment.id === commentId) {
          // Handle main comment dislike
          return {
            ...comment,
            dislikes: comment.isDisliked
              ? comment.dislikes - 1
              : comment.dislikes + 1,
            isDisliked: !comment.isDisliked,
            isLiked: false,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes,
          };
        } else if (isReply && comment.id === parentId) {
          // Handle reply dislike
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === commentId
                ? {
                    ...reply,
                    dislikes: reply.isDisliked
                      ? reply.dislikes - 1
                      : reply.dislikes + 1,
                    isDisliked: !reply.isDisliked,
                    isLiked: false,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes,
                  }
                : reply,
            ),
          };
        }
        return comment;
      });
    });
  };

  const handleReplyPress = (commentId, userName) => {
    setReplyingTo({id: commentId, name: userName});
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const toggleReplies = commentId => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    if (replyingTo) {
      // Add a reply to an existing comment
      const newReply = {
        id: `${replyingTo.id}-${Date.now()}`,
        user: {
          id: 'current-user',
          name: 'You',
          avatar: 'https://i.pravatar.cc/150?img=11',
        },
        content: commentText,
        timestamp: 'Just now',
        likes: 0,
        dislikes: 0,
        isLiked: false,
        isDisliked: false,
      };

      setComments(prevComments => {
        return prevComments.map(comment => {
          if (comment.id === replyingTo.id) {
            return {
              ...comment,
              replies: [...comment.replies, newReply],
            };
          }
          return comment;
        });
      });

      // Auto-expand the comment that was just replied to
      setExpandedComments(prev => ({
        ...prev,
        [replyingTo.id]: true,
      }));
    } else {
      // Add a new main comment
      const newComment = {
        id: `comment-${Date.now()}`,
        user: {
          id: 'current-user',
          name: 'You',
          avatar: 'https://i.pravatar.cc/150?img=11',
        },
        content: commentText,
        timestamp: 'Just now',
        likes: 0,
        dislikes: 0,
        isLiked: false,
        isDisliked: false,
        replies: [],
      };

      setComments(prevComments => [newComment, ...prevComments]);
    }

    // Reset state
    setCommentText('');
    setReplyingTo(null);
    Keyboard.dismiss();
  };

  const renderReplyItem = ({item, parentId}) => {
    return (
      <View style={[styles.replyContainer, {borderColor: colors.divider}]}>
        <View style={styles.commentHeader}>
          <TouchableOpacity onPress={() => navigateToProfile(item.user.id)}>
            <Image source={{uri: item.user.avatar}} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.commentMetaContainer}>
            <TouchableOpacity onPress={() => navigateToProfile(item.user.id)}>
              <Text style={[styles.userName, {color: colors.primaryText}]}>
                {item.user.name}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.timestamp, {color: colors.secondaryText}]}>
              {item.timestamp}
            </Text>
          </View>
        </View>

        <Text style={[styles.commentContent, {color: colors.primaryText}]}>
          {item.content}
        </Text>

        <View style={styles.commentActions}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              item.isLiked && {backgroundColor: 'rgba(59, 130, 246, 0.1)'},
            ]}
            onPress={() => handleLikeComment(item.id, true, parentId)}>
            <ThumbsUp
              size={16}
              color={
                item.isLiked ? colors.brandAccentColor : colors.secondaryText
              }
              fill={item.isLiked ? colors.brandAccentColor : 'transparent'}
            />
            <Text
              style={[
                styles.actionText,
                {
                  color: item.isLiked
                    ? colors.brandAccentColor
                    : colors.secondaryText,
                },
              ]}>
              {item.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              item.isDisliked && {backgroundColor: 'rgba(239, 68, 68, 0.1)'},
            ]}
            onPress={() => handleDislikeComment(item.id, true, parentId)}>
            <ThumbsDown
              size={16}
              color={item.isDisliked ? colors.error : colors.secondaryText}
              fill={item.isDisliked ? colors.error : 'transparent'}
            />
            <Text
              style={[
                styles.actionText,
                {
                  color: item.isDisliked ? colors.error : colors.secondaryText,
                },
              ]}>
              {item.dislikes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleReplyPress(parentId, item.user.name)}>
            <Text style={[styles.actionText, {color: colors.secondaryText}]}>
              Reply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCommentItem = ({item}) => {
    const hasReplies = item.replies && item.replies.length > 0;
    const isExpanded = expandedComments[item.id];

    return (
      <View
        style={[styles.commentContainer, {backgroundColor: colors.secondary}]}>
        <View style={styles.commentHeader}>
          <TouchableOpacity onPress={() => navigateToProfile(item.user.id)}>
            <Image source={{uri: item.user.avatar}} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.commentMetaContainer}>
            <TouchableOpacity onPress={() => navigateToProfile(item.user.id)}>
              <Text style={[styles.userName, {color: colors.primaryText}]}>
                {item.user.name}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.timestamp, {color: colors.secondaryText}]}>
              {item.timestamp}
            </Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical size={18} color={colors.secondaryText} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.commentContent, {color: colors.primaryText}]}>
          {item.content}
        </Text>

        <View style={styles.commentActions}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              item.isLiked && {backgroundColor: 'rgba(59, 130, 246, 0.1)'},
            ]}
            onPress={() => handleLikeComment(item.id)}>
            <ThumbsUp
              size={16}
              color={
                item.isLiked ? colors.brandAccentColor : colors.secondaryText
              }
              fill={item.isLiked ? colors.brandAccentColor : 'transparent'}
            />
            <Text
              style={[
                styles.actionText,
                {
                  color: item.isLiked
                    ? colors.brandAccentColor
                    : colors.secondaryText,
                },
              ]}>
              {item.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              item.isDisliked && {backgroundColor: 'rgba(239, 68, 68, 0.1)'},
            ]}
            onPress={() => handleDislikeComment(item.id)}>
            <ThumbsDown
              size={16}
              color={item.isDisliked ? colors.error : colors.secondaryText}
              fill={item.isDisliked ? colors.error : 'transparent'}
            />
            <Text
              style={[
                styles.actionText,
                {
                  color: item.isDisliked ? colors.error : colors.secondaryText,
                },
              ]}>
              {item.dislikes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleReplyPress(item.id, item.user.name)}>
            <Text style={[styles.actionText, {color: colors.secondaryText}]}>
              Reply
            </Text>
          </TouchableOpacity>

          {hasReplies && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => toggleReplies(item.id)}>
              <Text
                style={[
                  styles.actionText,
                  {color: colors.linkColor, fontFamily: 'Roboto-Medium'},
                ]}>
                {isExpanded
                  ? `Hide ${item.replies.length} ${
                      item.replies.length === 1 ? 'reply' : 'replies'
                    }`
                  : `View ${item.replies.length} ${
                      item.replies.length === 1 ? 'reply' : 'replies'
                    }`}
              </Text>
              {isExpanded ? (
                <ChevronUp size={16} color={colors.linkColor} />
              ) : (
                <ChevronDown size={16} color={colors.linkColor} />
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* Replies section */}
        {hasReplies && isExpanded && (
          <View style={styles.repliesContainer}>
            {item.replies.map(reply => (
              <View key={reply.id}>
                {renderReplyItem({item: reply, parentId: item.id})}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderPostPreview = () => {
    return (
      <View
        style={[
          styles.postPreviewContainer,
          {backgroundColor: colors.secondary},
        ]}>
        <View style={styles.postHeader}>
          <TouchableOpacity onPress={() => navigateToProfile('author')}>
            <Image
              source={{uri: 'https://i.pravatar.cc/150?img=12'}}
              style={styles.postAvatar}
            />
          </TouchableOpacity>
          <View style={styles.postMetaContainer}>
            <TouchableOpacity onPress={() => navigateToProfile('author')}>
              <Text style={[styles.postAuthor, {color: colors.primaryText}]}>
                Review Author
              </Text>
            </TouchableOpacity>
            <View style={styles.postTimeContainer}>
              <Calendar size={12} color={colors.secondaryText} />
              <Text style={[styles.timestamp, {color: colors.secondaryText}]}>
                1 day ago
              </Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Star
                key={index}
                size={14}
                color={
                  index < 4 ? colors.brandAccentColor : colors.secondaryText
                }
                fill={index < 4 ? colors.brandAccentColor : 'transparent'}
              />
            ))}
          </View>
        </View>

        <Text style={[styles.postTitle, {color: colors.primaryText}]}>
          {title || 'Sony WH-1000XM4 Wireless Headphones'}
        </Text>

        <Text
          style={[styles.postContent, {color: colors.primaryText}]}
          numberOfLines={3}
          ellipsizeMode="tail">
          {content ||
            "This is such a great product! I've been using it for a month now and I'm really impressed with the quality. The sound is crystal clear and the noise cancellation works perfectly."}
        </Text>

        <TouchableOpacity
          style={styles.viewFullPostButton}
          onPress={() => navigation.navigate('Product')}>
          <Text style={[styles.viewFullPostText, {color: colors.linkColor}]}>
            View full post
          </Text>
          <ChevronDown size={16} color={colors.linkColor} />
        </TouchableOpacity>
      </View>
    );
  };

  const inputBackgroundColor = inputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      colors.background,
      colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
    ],
  });

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      {/* Header */}
      <View style={[styles.header, {borderBottomColor: colors.divider}]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.primaryText}]}>
          Comments ({comments.length})
        </Text>
        <View style={styles.headerRight} />
      </View>

      {/* Comments List */}
      <FlatList
        ref={listRef}
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderPostPreview}
        contentContainerStyle={styles.commentsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Comment Input */}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderTopColor: colors.divider,
            backgroundColor: inputBackgroundColor,
          },
        ]}>
        {replyingTo && (
          <View
            style={[
              styles.replyingToContainer,
              {backgroundColor: colors.divider},
            ]}>
            <Text
              style={[styles.replyingToText, {color: colors.secondaryText}]}>
              Replying to{' '}
              <Text style={{fontWeight: 'bold'}}>{replyingTo.name}</Text>
            </Text>
            <TouchableOpacity onPress={handleCancelReply}>
              <Text style={[styles.cancelReply, {color: colors.error}]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.inputWrapper}>
          <Image
            source={{uri: 'https://i.pravatar.cc/150?img=11'}}
            style={styles.inputAvatar}
          />
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              {
                backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0',
                color: colors.primaryText,
              },
            ]}
            placeholder={
              replyingTo
                ? `Reply to ${replyingTo.name}...`
                : 'Write a comment...'
            }
            placeholderTextColor={colors.secondaryText}
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: commentText.trim()
                  ? colors.brandAccentColor
                  : colorScheme === 'dark'
                  ? '#444'
                  : '#ddd',
              },
            ]}
            onPress={handleSubmitComment}
            disabled={!commentText.trim()}>
            <Send
              size={20}
              color={
                commentText.trim()
                  ? '#fff'
                  : colorScheme === 'dark'
                  ? '#888'
                  : '#999'
              }
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
  headerRight: {
    width: 32,
  },
  commentsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  postPreviewContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postMetaContainer: {
    flex: 1,
    marginLeft: 12,
  },
  postAuthor: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
  },
  postTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    marginBottom: 8,
  },
  postContent: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  viewFullPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  viewFullPostText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    marginRight: 4,
  },
  commentContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  commentMetaContainer: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  timestamp: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  commentContent: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 12,
    borderRadius: 16,
  },
  actionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    marginLeft: 4,
  },
  repliesContainer: {
    marginTop: 8,
    paddingTop: 8,
  },
  replyContainer: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderLeftWidth: 1,
    marginLeft: 18,
    paddingLeft: 12,
  },
  inputContainer: {
    borderTopWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  replyingToContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  replyingToText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
  },
  cancelReply: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 40,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    maxHeight: 120,
  },
  sendButton: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CommentsScreen;

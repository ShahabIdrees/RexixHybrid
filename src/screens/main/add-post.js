import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {useAppColors} from '../../utils/colors';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {CustomDropdown} from '../../components';
import StarRating from '../../components/star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Plus,
  Package,
  Wrench,
  Search,
  X,
  Edit2,
  CheckCircle,
  Home,
  MessageSquare,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

const AddPost = () => {
  const navigation = useNavigation();
  const commonStyles = useCommonStyles();
  const colors = useAppColors();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    {id: '1', name: 'iPhone 15 Pro Max', brand: 'Apple', type: 'product'},
    {id: '2', name: 'Sony WH-1000XM4', brand: 'Sony', type: 'product'},
    {id: '3', name: 'Samsung Galaxy S24', brand: 'Samsung', type: 'product'},
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [postedReviewId, setPostedReviewId] = useState(null);

  const productList = [
    {id: '1', name: 'iPhone 15 Pro Max', brand: 'Apple', type: 'product'},
    {id: '2', name: 'Sony WH-1000XM4', brand: 'Sony', type: 'product'},
    {
      id: '3',
      name: 'Apple Repair Service',
      provider: 'Apple Store',
      type: 'service',
    },
    {id: '4', name: 'Samsung Galaxy S24', brand: 'Samsung', type: 'product'},
    {
      id: '5',
      name: 'Sony Camera Repair',
      provider: 'Sony Service Center',
      type: 'service',
    },
    {id: '6', name: 'MacBook Pro M2', brand: 'Apple', type: 'product'},
    {
      id: '7',
      name: 'Samsung TV Repair',
      provider: 'Samsung Care',
      type: 'service',
    },
    {id: '8', name: 'AirPods Pro', brand: 'Apple', type: 'product'},
  ];

  const filteredSuggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return productList.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        (item.brand && item.brand.toLowerCase().includes(q)) ||
        (item.provider && item.provider.toLowerCase().includes(q)),
    );
  }, [searchQuery]);

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo', // Only allow image selection
        selectionLimit: 20 - images.length, // Limit selection to remaining slots
      },
      response => {
        if (!response.didCancel && response.assets) {
          const newImages = response.assets.filter(
            asset => !images.some(image => image.uri === asset.uri),
          ); // Ensure unique images
          setImages([...images, ...newImages].slice(0, 20)); // Ensure a maximum of 20 images
        }
      },
    );
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      response => {
        if (!response.didCancel && response.assets) {
          const newImages = response.assets.filter(
            asset => !images.some(image => image.uri === asset.uri),
          );
          setImages([...images, ...newImages].slice(0, 20));
        }
      },
    );
  };

  const captureMultiplePhotos = async () => {
    let continueCapturing = true;
    while (continueCapturing && images.length < 20) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => {
        launchCamera(
          {mediaType: 'photo', cameraType: 'back', saveToPhotos: true},
          response => {
            if (!response.didCancel && response.assets) {
              const newImages = response.assets.filter(
                asset => !images.some(image => image.uri === asset.uri),
              );
              setImages(prev => [...prev, ...newImages].slice(0, 20));
            }
            Alert.alert(
              'Add more photos?',
              `${Math.min(20, images?.length || 0)}/20 selected`,
              [
                {
                  text: 'Done',
                  style: 'cancel',
                  onPress: () => {
                    continueCapturing = false;
                    resolve();
                  },
                },
                {text: 'Add another', onPress: () => resolve()},
              ],
              {cancelable: false},
            );
          },
        );
      });
    }
  };

  const removeImage = uri => {
    setImages(images.filter(image => image.uri !== uri)); // Remove image from state
  };

  const handleProductSelect = item => {
    setSelectedProduct(item);
    setSearchQuery(item.name);
    setShowSuggestions(false);
    setIsSearchMode(false);
    // Add to recent searches
    setRecentSearches(prev => {
      const next = [item, ...prev.filter(v => v.id !== item.id)];
      return next.slice(0, 6);
    });
  };

  const handleEditProduct = () => {
    setIsSearchMode(true);
    const productName = selectedProduct?.name || '';
    setSearchQuery(productName);
    // Show suggestions if there's a search query
    if (productName.trim().length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSubmit = () => {
    const postData = {
      title,
      description,
      productId: selectedProduct?.id,
      rating,
      images,
    };
    console.log('Post data:', postData);

    // Simulate API call - in real app, this would be an async API call
    // For now, we'll simulate success after a brief delay
    setTimeout(() => {
      // Generate a mock review ID
      const reviewId = `review_${Date.now()}`;
      setPostedReviewId(reviewId);
      setShowSuccessModal(true);
    }, 500);
  };

  const handleGoToReview = () => {
    setShowSuccessModal(false);
    // Navigate to the Comments screen where the review was posted
    if (selectedProduct && postedReviewId) {
      resetForm();
      navigation.navigate('Comments', {
        postId: postedReviewId,
        title: title || selectedProduct.name,
        content: description || `Review for ${selectedProduct.name}`,
      });
    } else {
      // Fallback to home if no product/review selected
      resetForm();
      // Try to navigate to HomeTab first, fallback to Home stack screen
      try {
        navigation.navigate('HomeTab');
      } catch {
        navigation.navigate('Home');
      }
    }
  };

  const handleGoToHome = () => {
    setShowSuccessModal(false);
    resetForm();
    // Navigate to HomeTab - since AddPost is in the tab navigator, we navigate to another tab
    navigation.navigate('HomeTab');
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedProduct(null);
    setRating(0);
    setImages([]);
    setSearchQuery('');
    setIsSearchMode(true);
    setShowSuggestions(false);
    setPostedReviewId(null);
  };

  const renderSearchItem = item => {
    const displayText = item.type === 'product' ? item.brand : item.provider;
    const ItemIcon = item.type === 'product' ? Package : Wrench;

    return (
      <TouchableOpacity
        style={[styles.searchResultItem, {backgroundColor: colors.secondary}]}
        onPress={() => handleProductSelect(item)}>
        <View style={styles.searchItemLeft}>
          <View
            style={[
              styles.itemIconContainer,
              {
                backgroundColor:
                  item.type === 'product'
                    ? colors.brandSecondaryColor + '20'
                    : colors.brandAccentColor + '20',
              },
            ]}>
            <ItemIcon
              size={18}
              color={
                item.type === 'product'
                  ? colors.brandSecondaryColor
                  : colors.brandAccentColor
              }
            />
          </View>
          <Text
            style={[styles.searchItemName, {color: colors.primaryText}]}
            numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        <View style={styles.searchItemRight}>
          <Text
            style={[styles.searchItemBrand, {color: colors.secondaryText}]}
            numberOfLines={1}>
            {displayText}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSelectedProduct = () => {
    if (!selectedProduct) return null;

    const displayText =
      selectedProduct.type === 'product'
        ? selectedProduct.brand
        : selectedProduct.provider;
    const ItemIcon = selectedProduct.type === 'product' ? Package : Wrench;

    return (
      <TouchableOpacity
        style={[
          styles.selectedProductContainer,
          {backgroundColor: colors.secondary, borderColor: colors.divider},
        ]}
        onPress={handleEditProduct}
        activeOpacity={0.7}>
        <View style={styles.selectedProductContent}>
          <View style={styles.selectedProductLeft}>
            <View
              style={[
                styles.selectedItemIconContainer,
                {
                  backgroundColor:
                    selectedProduct.type === 'product'
                      ? colors.brandSecondaryColor + '20'
                      : colors.brandAccentColor + '20',
                },
              ]}>
              <ItemIcon
                size={20}
                color={
                  selectedProduct.type === 'product'
                    ? colors.brandSecondaryColor
                    : colors.brandAccentColor
                }
              />
            </View>
            <View style={styles.selectedProductInfo}>
              <Text
                style={[
                  styles.selectedProductName,
                  {color: colors.primaryText},
                ]}
                numberOfLines={1}>
                {selectedProduct.name}
              </Text>
              <Text
                style={[
                  styles.selectedProductBrand,
                  {color: colors.secondaryText},
                ]}
                numberOfLines={1}>
                {displayText}
              </Text>
            </View>
          </View>
          <Edit2 size={18} color={colors.secondaryText} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, {backgroundColor: colors.primaryBG}]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Header */}
        <Text style={commonStyles.largeTitle}>Add Review</Text>

        {/* Selected Product Container - shown when product is selected */}
        {selectedProduct && !isSearchMode && renderSelectedProduct()}

        {/* Search Mode or Edit Mode - show when no product selected or in edit mode */}
        {(isSearchMode || !selectedProduct) && (
          <>
            {/* Search Bar for product/service */}
            <Text style={[commonStyles.label, {marginTop: 8, marginBottom: 8}]}>
              Search product or service
            </Text>
            <View
              style={[styles.searchBar, {backgroundColor: colors.secondary}]}>
              <Search size={20} color={colors.secondaryText} />
              <TextInput
                style={[styles.searchInput, {color: colors.primaryText}]}
                placeholder="Type to search..."
                placeholderTextColor={colors.placeholderColor}
                value={searchQuery}
                onChangeText={text => {
                  setSearchQuery(text);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                returnKeyType="search"
                autoFocus={isSearchMode}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}>
                  <X size={18} color={colors.secondaryText} />
                </TouchableOpacity>
              )}
            </View>

            {/* Recent Searches */}
            {recentSearches.length > 0 && !searchQuery && (
              <View style={styles.recentContainer}>
                <Text
                  style={[
                    commonStyles.smallLabel,
                    {marginBottom: 10, color: colors.secondaryText},
                  ]}>
                  Recent Searches
                </Text>
                {recentSearches.map(item => renderSearchItem(item))}
              </View>
            )}

            {/* Autocomplete Suggestions */}
            {showSuggestions &&
              filteredSuggestions.length > 0 &&
              searchQuery && (
                <View style={styles.suggestionsContainer}>
                  {filteredSuggestions.map(item => renderSearchItem(item))}
                </View>
              )}

            {/* Empty state when no results */}
            {showSuggestions &&
              filteredSuggestions.length === 0 &&
              searchQuery && (
                <View style={styles.emptyState}>
                  <Text
                    style={[
                      commonStyles.smallLabel,
                      {color: colors.secondaryText},
                    ]}>
                    No results found
                  </Text>
                </View>
              )}
          </>
        )}

        {/* Form Details - shown only when product is selected and not in search mode */}
        {selectedProduct && !isSearchMode && (
          <>
            {/* Title */}
            <Text style={[commonStyles.label, {marginTop: 20}]}>Title</Text>
            <TextInput
              style={[
                styles.input,
                {color: colors.primaryText, backgroundColor: colors.secondary},
              ]}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter title"
              placeholderTextColor={colors.placeholderColor}
            />

            {/* Description */}
            <Text style={commonStyles.label}>Description</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                {
                  color: colors.primaryText,
                  backgroundColor: colors.secondary,
                },
              ]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              placeholderTextColor={colors.placeholderColor}
              multiline
            />

            {/* Star Rating */}
            <Text style={commonStyles.label}>Rating</Text>
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              center
              showFeedback
            />

            {/* Image Upload */}
            <Text style={commonStyles.label}>Add Photos (Max 20)</Text>
            <TouchableOpacity
              style={[styles.addPhotosButton, {borderColor: colors.divider}]}
              onPress={() => setPickerVisible(true)}
              disabled={images.length === 20}>
              <Plus size={28} color={colors.secondaryText} />
            </TouchableOpacity>

            {/* Selected Images */}
            {images.length > 0 && (
              <FlatList
                data={images}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: item.uri}}
                      style={styles.imagePreview}
                    />
                    <TouchableOpacity
                      style={[
                        styles.removeButton,
                        {backgroundColor: colors.primaryBG},
                      ]}
                      onPress={() => removeImage(item.uri)}>
                      <Icon
                        name="close"
                        size={14}
                        color={colors.secondaryText}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.imagesList}
              />
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                {backgroundColor: colors.brandAccentColor},
              ]}
              onPress={handleSubmit}>
              <Text style={[commonStyles.boldText, {color: '#FFFFFF'}]}>
                Submit Review
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Picker Modal */}
        <Modal
          transparent
          visible={pickerVisible}
          animationType="fade"
          onRequestClose={() => setPickerVisible(false)}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setPickerVisible(false)}>
            <View style={[styles.sheet, {backgroundColor: colors.primaryBG}]}>
              <Text style={[commonStyles.label, {marginBottom: 10}]}>
                Add Photos
              </Text>
              <TouchableOpacity
                style={[styles.sheetBtn, {backgroundColor: colors.secondary}]}
                onPress={() => {
                  setPickerVisible(false);
                  selectImage();
                }}>
                <Text style={{color: colors.primaryText}}>
                  Choose from Gallery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sheetBtn, {backgroundColor: colors.secondary}]}
                onPress={() => {
                  setPickerVisible(false);
                  takePhoto();
                }}>
                <Text style={{color: colors.primaryText}}>
                  Open Camera (single)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPickerVisible(false)}
                style={styles.cancelArea}>
                <Text style={{color: colors.linkColor}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* Success Modal */}
        <Modal
          transparent
          visible={showSuccessModal}
          animationType="fade"
          onRequestClose={() => setShowSuccessModal(false)}>
          <Pressable
            style={styles.successModalBackdrop}
            onPress={() => {}} // Prevent closing on backdrop tap
            activeOpacity={1}>
            <View
              style={[
                styles.successModalContainer,
                {backgroundColor: colors.primaryBG},
              ]}>
              {/* Success Icon */}
              <View style={styles.successIconWrapper}>
                <View
                  style={[
                    styles.successIconOuter,
                    {
                      backgroundColor: colors.success + '20',
                      borderColor: colors.success + '40',
                    },
                  ]}>
                  <View
                    style={[
                      styles.successIconInner,
                      {backgroundColor: colors.success},
                    ]}>
                    <CheckCircle
                      size={48}
                      color="#FFFFFF"
                      fill="#FFFFFF"
                      strokeWidth={2.5}
                    />
                  </View>
                </View>
              </View>

              {/* Success Title */}
              <Text
                style={[
                  styles.successTitle,
                  {color: colors.primaryText},
                  commonStyles.largeTitle,
                ]}>
                Review Posted!
              </Text>

              {/* Success Message */}
              <Text
                style={[
                  styles.successMessage,
                  {color: colors.secondaryText},
                  commonStyles.text,
                ]}>
                Your review has been successfully posted and is now visible to
                the community.
              </Text>

              {/* Button Container */}
              <View style={styles.successButtonContainer}>
                {/* Go to Review Button */}
                <TouchableOpacity
                  style={[
                    styles.successButton,
                    styles.primarySuccessButton,
                    {backgroundColor: colors.brandAccentColor},
                  ]}
                  onPress={handleGoToReview}
                  activeOpacity={0.8}>
                  <MessageSquare size={20} color="#FFFFFF" />
                  <Text
                    style={[
                      styles.successButtonText,
                      {color: '#FFFFFF'},
                      commonStyles.boldText,
                    ]}>
                    Go to Review
                  </Text>
                </TouchableOpacity>

                {/* Go to Home Button */}
                <TouchableOpacity
                  style={[
                    styles.successButton,
                    styles.secondarySuccessButton,
                    {
                      backgroundColor: colors.secondary,
                      borderColor: colors.divider,
                    },
                  ]}
                  onPress={handleGoToHome}
                  activeOpacity={0.8}>
                  <Home size={20} color={colors.primaryText} />
                  <Text
                    style={[
                      styles.successButtonText,
                      {color: colors.primaryText},
                      commonStyles.boldText,
                    ]}>
                    Go to Home
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    gap: 12,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  recentContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  suggestionsContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 10,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  searchItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  searchItemRight: {
    flexShrink: 0,
    marginLeft: 12,
  },
  itemIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchItemName: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
  searchItemBrand: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
  },
  selectedProductContainer: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  selectedProductContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedProductLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  selectedItemIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedProductInfo: {
    flex: 1,
  },
  selectedProductName: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginBottom: 4,
  },
  selectedProductBrand: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
  },
  emptyState: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  input: {
    borderRadius: 12,
    padding: 14,
    marginVertical: 10,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  textArea: {
    minHeight: 120,
    maxHeight: 200,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  addPhotosButton: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  imagesList: {
    paddingVertical: 10,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  removeButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    borderRadius: 14,
    padding: 4,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    padding: 16,
    marginVertical: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetBtn: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  cancelArea: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  successModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successModalContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  successIconWrapper: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  successIconInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  successButtonContainer: {
    width: '100%',
    gap: 12,
  },
  successButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primarySuccessButton: {
    // Primary button styles are handled by backgroundColor
  },
  secondarySuccessButton: {
    borderWidth: 1.5,
  },
  successButtonText: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
});

export default AddPost;

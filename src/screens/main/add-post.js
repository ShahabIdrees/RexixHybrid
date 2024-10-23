import React, {useState} from 'react';
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
} from 'react-native';
import {useAppColors} from '../../utils/colors';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {launchImageLibrary} from 'react-native-image-picker';
import {CustomDropdown} from '../../components';
import StarRating from '../../components/star-rating';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you are using Ionicons for the close button

const AddPost = () => {
  const commonStyles = useCommonStyles();
  const colors = useAppColors();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [rating, setRating] = useState(0); // Store only one rating for the product
  const [images, setImages] = useState([]);

  const productList = [
    {id: '1', label: 'Product 1'},
    {id: '2', label: 'Product 2'},
  ];

  const brandList = [
    {id: '1', label: 'Brand A'},
    {id: '2', label: 'Brand B'},
  ];

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo', // Only allow image selection
        selectionLimit: 10 - images.length, // Limit selection to remaining slots
      },
      response => {
        if (!response.didCancel && response.assets) {
          const newImages = response.assets.filter(
            asset => !images.some(image => image.uri === asset.uri),
          ); // Ensure unique images
          setImages([...images, ...newImages].slice(0, 10)); // Ensure a maximum of 10 images
        }
      },
    );
  };

  const removeImage = uri => {
    setImages(images.filter(image => image.uri !== uri)); // Remove image from state
  };

  const handleSubmit = () => {
    const postData = {
      title,
      description,
      productId: selectedProduct?.id,
      brandId: selectedBrand?.id,
      rating, // Include the star rating
      images,
    };
    console.log('Post data:', postData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Text style={commonStyles.largeTitle}>Create New Post</Text>

        {/* Product Dropdown */}
        <Text style={commonStyles.label}>Select Product</Text>
        <CustomDropdown
          data={productList}
          onChange={setSelectedProduct}
          value={selectedProduct}
          maxHeight={300}
        />

        {/* Brand Dropdown */}
        <Text style={commonStyles.label}>Select Brand</Text>
        <CustomDropdown
          data={brandList}
          onChange={setSelectedBrand}
          value={selectedBrand}
          maxHeight={300}
        />

        {/* Title */}
        <Text style={commonStyles.label}>Title</Text>
        <TextInput
          style={[
            styles.input,
            {color: colors.primaryText, backgroundColor: colors.secondary},
            commonStyles.shadow,
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
            {
              maxHeight: 250,
              textAlignVertical: 'top',
              backgroundColor: colors.secondary,
            },
            commonStyles.shadow,
          ]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          placeholderTextColor={colors.placeholderColor}
          multiline
        />

        {/* Star Rating */}
        <Text style={commonStyles.label}>Rate Product</Text>
        <StarRating rating={rating} onRatingChange={setRating} />

        {/* Image Upload */}
        <Text style={commonStyles.label}>Add Images (Max 10)</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={selectImage}
          disabled={images.length === 10}>
          <Text style={commonStyles.boldText}>Select Image</Text>
        </TouchableOpacity>

        {/* Selected Images */}
        <FlatList
          data={images}
          horizontal
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Image source={{uri: item.uri}} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(item.uri)}>
                <Icon name="xmark" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            {backgroundColor: colors.brandAccentColor},
          ]}
          onPress={handleSubmit}>
          <Text style={commonStyles.boldText}>Submit</Text>
        </TouchableOpacity>
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
  input: {
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: '#ececec',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginHorizontal: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  submitButton: {
    padding: 15,
    marginVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default AddPost;

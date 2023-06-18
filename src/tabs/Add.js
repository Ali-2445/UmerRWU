import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
const Add = () => {
  const [imageData, setImageData] = useState(null);
  const [name, setName] = useState('');
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const [foodCategories, setFoodCategories] = useState([
    {label: 'Pizza', value: 'pizza'},
    {label: 'Burger', value: 'burger'},
    {label: 'Sushi', value: 'sushi'},
    {label: 'Desi', value: 'desi'},
    {label: 'Drinks', value: 'drinks'},
    {label: 'Fries', value: 'fries'},
  ]);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.didCancel) {
    } else {
      console.log(result);
      setImageData(result);
    }
  };

  const uplaodImage = async () => {
    setActivityIndicator(true);
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);
    uploadItem(url);
  };

  const uploadItem = url => {
    firestore()
      .collection('items')
      .add({
        name: name,
        price: price,
        discountPrice: discountPrice,
        description: description,
        imageUrl: url + '',
        totalRating: 0,
        countNumberOfRate: 0,
        qty: 1,
        category: category,
      })
      .then(() => {
        // navigation.navigate('Items');
        alert('Item added');
        setActivityIndicator(false);
        console.log('User added!');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Item</Text>
        </View>

        {imageData !== null ? (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={styles.imageStyle}
          />
        ) : null}
        <TextInput
          placeholder="Enter Item Name"
          style={styles.inputStyle}
          placeholderTextColor={'grey'}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="Enter Item Price"
          style={styles.inputStyle}
          value={price}
          keyboardType="numeric"
          placeholderTextColor={'grey'}
          onChangeText={text => setPrice(text)}
        />
        <TextInput
          placeholder="Enter Item Discount Price"
          style={styles.inputStyle}
          value={discountPrice}
          placeholderTextColor={'grey'}
          keyboardType="numeric"
          onChangeText={text => setDiscountPrice(text)}
        />
        <TextInput
          placeholder="Enter Item Description"
          style={styles.inputStyle}
          placeholderTextColor={'grey'}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <DropDownPicker
          open={open}
          placeholder="Select Category"
          value={value}
          items={foodCategories}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={{backgroundColor: 'pink', zIndex: 1000}}
          style={{width: '90%', alignSelf: 'center', marginTop: 20}}
          onChangeValue={item => {
            console.log(item);
            setCategory(item);
          }}
        />
        <TouchableOpacity
          style={styles.pickBtn}
          onPress={() => {
            requestCameraPermission();
          }}>
          <Text style={{color: 'grey'}}>Pick Image From Gallery</Text>
        </TouchableOpacity>
        {activityIndicator == false ? (
          <TouchableOpacity
            style={styles.TouchableOpacityButton}
            onPress={() => {
              if (
                name == '' ||
                price == 0 ||
                discountPrice == 0 ||
                description == '' ||
                imageData == null
              )
                alert('plz add all record');
              else uplaodImage();
            }}>
            <Text style={styles.textButton}>Upload Item</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator
            animating={true}
            color={'blue'}
            style={{marginTop: '5%'}}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Add;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'grey',
  },
  inputStyle: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    color: 'grey',
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  pickBtn: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
  },
  uploadBtn: {
    backgroundColor: '#5246f2',
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  imageStyle: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  TouchableOpacityButton: {
    alignItems: 'center',
    paddingVertical: '3%',
    marginHorizontal: '15%',
    borderRadius: 10,
    backgroundColor: 'olive',
    marginTop: '10%',
  },
  textButton: {
    fontSize: 20,
    color: 'white',
  },
});

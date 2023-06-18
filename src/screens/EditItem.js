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
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
const EditItem = ({navigation}) => {
  const route = useRoute();
  const [imageData, setImageData] = useState({
    assets: [{uri: route.params.data.imageUrl}],
  });
  const [name, setName] = useState(route.params.data.name);
  const [price, setPrice] = useState(route.params.data.price);
  const [discountPrice, setDiscountPrice] = useState(
    route.params.data.discountPrice,
  );
  const [description, setDescription] = useState(route.params.data.description);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
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

  const uploadItem = () => {
    firestore()
      .collection('items')
      .doc(route.params.id)
      .update({
        name: name,
        price: price,
        discountPrice: discountPrice,
        description: description,
        imageUrl: route.params.data.imageUrl + '',
      })
      .then(() => {
        setActivityIndicator(false);
        console.log('User added!');
        navigation.navigate('Items');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Edit Item</Text>
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
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="Enter Item Price"
          style={styles.inputStyle}
          value={price}
          keyboardType="numeric"
          onChangeText={text => setPrice(text)}
        />
        <TextInput
          placeholder="Enter Item Discount Price"
          style={styles.inputStyle}
          value={discountPrice}
          keyboardType="numeric"
          onChangeText={text => setDiscountPrice(text)}
        />
        <TextInput
          placeholder="Enter Item Description"
          style={styles.inputStyle}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        {/* <TextInput
          placeholder="Enter Item Image URL"
          style={styles.inputStyle}
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
        />
        <Text style={{alignSelf: 'center', marginTop: 20}}>OR</Text> */}
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
              else uploadItem();
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

export default EditItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 30,
    borderWidth: 0.5,
    color: 'grey',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: 'center',
  },
  pickBtn: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  uploadBtn: {
    backgroundColor: '#84c000',
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
    borderRadius: 30,
    backgroundColor: '#84c000',
    marginTop: '10%',
    marginBottom: '20%',
  },
  textButton: {
    fontSize: 20,
    color: 'white',
  },
});

import React from 'react';
import { 
    Button,  
    Text, 
    TextInput,
    Image,
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Alert
     } from 'react-native';


import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}> FRIENDSHIP </Text>
      </View>
    );
  }
}
class LogoInput extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}> Input Friends </Text>
      </View>
    );
  }
}
class LogoView extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}> View Friends </Text>
      </View>
    );
  }
}
class LogoEdit extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}> Edit Friends </Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };
  constructor(props) {
      super(props);
      this.state = {
        nama: '',
        telephone: '',
        alamat: '',
      };
    }
render() {
  return (
       <View style = {{flex:1,backgroundColor:'#192a56'}}>
        <View style={{backgroundColor:'#192a56', alignItems: 'center', padding : 30 }}>
        <Image source={require('./src/image/teman2.png')}  style={styles.icon} />
         <View style={{margin:10, height: 20}}>
          <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>WELCOME APLIKASI FRIENDSHIP</Text>
        </View>
        </View>
        <View>
         <View style={{backgroundColor:'#192a56'}}>
          <View style={{margin:10}} >
            <Button
                title="New Friends"
                color="green"
                onPress={() => this.props.navigation.navigate('Sapa')}
                  
                />
          </View>
        </View>
      </View>
      <View>
         <View style={{backgroundColor:'#192a56'}}>
          <View style={{margin:10}} >
            <Button
              onPress={() => {
              this.props.navigation.navigate('Tampilan', {
                nama: this.state.nama,
                telephone: this.state.telephone,
                alamat: this.state.alamat,
              });
            }}

              title="View Friends"
              color="#0D47A1"

            />
          </View>
        </View>
      </View>
      </View>

    );
  }
}
class DetailsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoEdit/>,  
  };
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      telephone: '',
      alamat: '',
      ActivityIndicator_Loading: false, 
  };
}
  componentDidMount()  {
    this.setState({ 
        nama: this.props.navigation.state.params.nama,
        telephone: this.props.navigation.state.params.telephone,
        alamat: this.props.navigation.state.params.alamat,
      })
     }
  
  UpdateRecord = () =>{
      this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('https://ketutindasundhari.000webhostapp.com/API/updateData.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
      
              nama : this.state.nama,

              telephone : this.state.telephone,
      
              alamat: this.state.alamat,
      
            })
      
            }).then((response) => response.json())
                .then((responseJson) => {
                  this.setState({ ActivityIndicator_Loading : false });
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);
      
                }).catch((error) => {
                  console.error(error);
                  this.setState({ ActivityIndicator_Loading : false });
                });
        });
      }
   DeleteRecord = () =>{
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
          fetch('https://ketutindasundhari.000webhostapp.com/API/deleteData.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
        
            telephone : this.state.telephone
        
          })
        
          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({ ActivityIndicator_Loading : false });
            // Menampilkan pesan yang ada di query
            Alert.alert(responseJson);
            this.props.navigation.navigate('Tampilan');
        
          }).catch((error) => {
             console.error(error);
             this.setState({ ActivityIndicator_Loading : false });
          });

          
          });
      }
    render() {
    return (
    <View style = {{flex:1,backgroundColor:'#192a56', alignItems : 'center', padding: 10}}>
    <Image source={require('./src/image/temanku.png')}  style={styles.icon2} />
    <View style={{
                backgroundColor:'#1B5E20', 
                alignItems: 'center', 
                padding : 20,
                marginTop :10,
                marginLeft: 20, 
                marginRight: 20, 
                height: 250 }}>  
    <View style={{margin:7, height: 40}}>
        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>Edit Your Friends</Text>
        </View>     
        <TextInput
            style={{
              height: 35,
              width: 300,
              textAlign: 'center',
              backgroundColor: 'white',
              margin: 7 }}
              placeholder="Name Friend"
              value={this.state.nama}
              onChangeText={(nama) => this.setState({ nama })}
              keyboardType='ascii-capable'
          />
        <TextInput
            style={{
              height: 35,
              width: 300,
              textAlign: 'center',
              backgroundColor: 'white',
              margin: 7 }}
              placeholder="Phone Number"
              value={this.state.telephone}
              onChangeText={(telephone) => this.setState({ telephone })}
              keyboardType='numeric'
          />    
           <TextInput
            style={{
              height: 35,
              width: 300,
              textAlign: 'center',
              backgroundColor: 'white',
              margin: 7 }}
              placeholder="Address"
              value={this.state.alamat}
              onChangeText={(alamat) => this.setState({ alamat })}
              keyboardType='ascii-capable'
          />      
      </View>
       <View>
         <View style={{backgroundColor:'#192a56'}}>
          <View style={{margin:20, flexDirection : 'row'}} >
            <Button
                onPress={() => this.UpdateRecord()}
                  title="Update"
                  color="green"
                />
                {
                this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null
                }
                <Button
                onPress={() => this.DeleteRecord()}
                  title="Delete"
                  color="red"
                />
                <Button
                    title="Home"
                    color="#0D47A1"
                    onPress={() => this.props.navigation.navigate('Home')}
            />
          </View>
          </View>
      </View> 
      </View>
    );
  }
}

class TampilanScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoView />,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false, 
    };
}

GetIDFunction=(nama, telephone, alamat)=>{
          this.props.navigation.navigate('Details', { 
            nama : nama,
            telephone : telephone,
            alamat : alamat,

          });
        }

    componentDidMount()  {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        this.setState({refreshing: true});
        const url = 'https://ketutindasundhari.000webhostapp.com/API/getData.php';
       //this.setState({ loading: true });
        fetch (url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("comp");
          console.log(responseJson);
          this.setState({
            data: responseJson,
            error: responseJson.error || null,
            loading: false,
            refreshing: false,
            ActivityIndicator_Loading: false, 

          });
        }
      );
    });
  }
  _keyExtractor = (item, index) => item.telephone;
  render() {
    return (
      <View style = {{flex:1,backgroundColor:'#192a56', alignItems : 'center', padding: 20}}>
       <Image source={require('./src/image/orang4.png')}  style={styles.icon2} />
       <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>The List Of Your Friends</Text>
          
           {
          this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null        
          }
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
          <View style={{
                backgroundColor:'white', 
                alignItems: 'flex-start', 
                padding : 10,
                marginBottom :10,
                marginTop :10,
                marginLeft: 20, 
                marginRight: 20, 
                width: 300,
                height: 130 }}>
            <Text>Nama : {item.nama}</Text>
            <Text>Telephone : {item.telephone}</Text>
            <Text>Alamat :  {item.alamat}</Text>
         <View>
         <View style={{backgroundColor:'white'}}>
         <View style={{margin:10, flexDirection : 'row'}} >
             <Button
              title="Edit Data"
              color="#00BCD4"
               onPress={this.GetIDFunction.bind(
                        this, item.nama,
                         item.telephone, 
                         item.alamat, 
                         )}
            />
            </View>
            </View>
            </View> 
        </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }
        /> 
         <View>
         <View style={{backgroundColor:'#192a56'}}>
          <View style={{margin:10, flexDirection : 'row'}} >
             <Button
              title="Home"
              color="#0D47A1"
              onPress={() => this.props.navigation.navigate('Home')}
            />
          </View>
          </View>
      </View> 
          </View>
    );
  }
}

class SapaScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoInput/>,
  };

  constructor()
    {
        super();

        this.state = {
          nama: '',
          telephone: '',
          alamat: '',
          ActivityIndicator_Loading: false,

        }
    }
    //fungsi mengirim data ke database
    Insert_Data_Into_MySQL = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
          //mengirim data ke database melalui api
            fetch('https://ketutindasundhari.000webhostapp.com/API/sentData.php',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  nama : this.state.nama,
                  telephone : this.state.telephone,
                  alamat : this.state.alamat,
                })

            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                alert(responseJsonFromServer);
                this.setState({ ActivityIndicator_Loading : false });
            }).catch((error) =>
            {
                console.error(error);
                /*Alert.alert(
                  'Oops!',
                  'Something went wrong!',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )*/
                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }

  render() {
    return (
    <View style = {{flex:1,backgroundColor:'#192a56', alignItems : 'center', padding: 10}}>
    <Image source={require('./src/image/input.png')}  style={styles.icon2} />
    <View style={{
                backgroundColor:'#1B5E20', 
                alignItems: 'center', 
                padding : 20,
                marginTop :10,
                marginLeft: 20, 
                marginRight: 20, 
                height: 250 }}>  
      <View style={{margin:7, height: 40}}>
        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>Enter The Name Of Your Friend</Text>
        </View>     
        <TextInput
            style={{
              height: 35,
              width: 300,
              textAlign: 'center',
              backgroundColor: 'white',
              margin: 7 }}
              placeholder="Name Friend"
              onChangeText={(nama) => this.setState({ nama })}
              keyboardType='ascii-capable'
          />
        <TextInput
            style={{
              height: 35,
              width: 300,
              textAlign: 'center',
              backgroundColor: 'white',
              margin: 7 }}
              placeholder="Phone Number"
              onChangeText={(telephone) => this.setState({ telephone })}
              keyboardType='numeric'
          />    
           <TextInput
            style={{
              height: 35,
              width: 300,
              textAlign: 'center',
              backgroundColor: 'white',
              margin: 7 }}
              placeholder="Address"
              onChangeText={(alamat) => this.setState({ alamat })}
              keyboardType='ascii-capable'
          />      
      </View>
       <View>
         <View style={{backgroundColor:'#192a56'}}>
          <View style={{margin:20, flexDirection : 'row'}} >
            <Button
                onPress={() => this.Insert_Data_Into_MySQL()}
                  title="Save"
                  color="green"
                />
                {

                this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null

                }
             <Button
              title="Home"
              color="#0D47A1"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          </View>
      </View> 
      </View>
    );
  }
}


const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Sapa: {
      screen: SapaScreen,
    },
    Tampilan: {
      screen: TampilanScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#BBDEFB',
    flex: 1,
    flexDirection: 'column'
  },
  icon: {
    height: 130,
    width: 200,
  },
   icon2: {
    height: 100,
    width: 100,
  }
});

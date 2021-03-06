import React, { useState,useEffect } from 'react';

import { StyleSheet, View, TextInput, AsyncStorage } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';

/* LOGUPFORM */
function Logupform( props ) {
    const [isLogged,setIsLogged] = useState(false);
    //state pour le sign up
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [userFirstName,setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [messageSignUp,setMessageSignUp] = useState("");
    const [sexeM, setSexeM]= useState(false)
    const [sexeF, setSexeF]= useState(true)
    const [sexe, setSexe] = useState("")
    
    // gestion du sexe de l'utilisateur

    useEffect (() => {
        if (sexeM==false){
            setSexe("femme")
        } else {
            setSexe("homme")
        }
        //console.log(sexe)
    })

    
    
    
    //gestion sign up >>>> envoi au back les champs de signup (récupéré par button) et met à jour les états (islogin, message et token)
    
    
    
    var handleSignUp = async () =>{
        let data = await fetch("https://weedingplanner.herokuapp.com/sign-up",{  //https://weedingplanner.herokuapp.com
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `email=${email}&password=${password}&userfirstname=${userFirstName}&userlastname=${userLastName}&sexe=${sexe}`
        });
  
        let dataJson = await data.json();
        console.log('reponse du back', dataJson)
        props.signup();
        AsyncStorage.setItem("tokenUser", dataJson.tokenUser);

    }



		//console.log(userFirstName)

    return (
     
            <View style={{padding:20}}>


                <TextInput 
                placeholder="NOM"
                placeholderTextColor="rgba(102, 102, 102, 0.5)"
                style={styles.input} 
                onChangeText={(value) => setUserFirstName(value)} 
                value={userFirstName}
                />

                <TextInput 
                placeholder="PRENOM"
                placeholderTextColor="rgba(102, 102, 102, 0.5)"
                style={styles.input}
                onChangeText={(value) => setUserLastName(value)} 
                value={userLastName} 
                />

{/*                 <Button
                title="DATE DE NAISSANCE JJ/MM/AN"
                disabled
                style={styles.jourmoisan} 
                titleStyle={{ fontSize: 10 }}
                /> */}

                {/* <View style={styles.date}>
		              <NumericInput 
		              type='up-down' 
		              textColor='grey' 
		              totalWidth={90}
		              totalHeight={40} 
		              minValue={1} 
		              maxValue={31}
		              rounded
		              onChange={value => console.log(value)} 
		              />
		              <NumericInput 
		              type='up-down' 
		              textColor='grey' 
		              totalWidth={90}
		              totalHeight={40} 
		              minValue={1} 
		              maxValue={12}
		              rounded
		              onChange={value => console.log(value)} 
		              />
		              <NumericInput 
		              type='up-down' 
		              textColor='grey' 
		              totalWidth={90}
		              totalHeight={40} 
		              minValue={1950} 
		              maxValue={2004}
		              rounded
		              onChange={value => console.log(value)} 
		              />
                </View> */}

                <TextInput 
		              placeholder="EMAIL"
		              placeholderTextColor="rgba(102, 102, 102, 0.5)"
		              keyboardType="email-address"
                      style={styles.input} 
                      onChangeText={(value) => setEmail(value)} 
                      value={email}
                />

                <TextInput 
		              placeholder="MOT DE PASSE"
		              placeholderTextColor="rgba(102, 102, 102, 0.5)"
		              secureTextEntry
                      style={styles.input} 
                      onChangeText={(value) => setPassword(value)} 
                      value={password}
                />
                <View style={{flexDirection:'row',flex:1, justifyContent:'space-around',marginBottom:15}}>
                    
                        
                    <CheckBox
                            center
                            title='Femme'
                            checked={sexeF}
                            onPress={() => setSexeF( !sexeF ) & setSexeM( !sexeM ) }/>  

                    <CheckBox
                        center
                        title='Homme'
                        checked={sexeM}
                        style={{opacity: 0.01}}
                        onPress={() => setSexeM( !sexeM ) & setSexeF(!sexeF) }/>    

                </View>

                <Button title="Inscription" 
                    buttonStyle={{marginTop:50,backgroundColor:'#f4c6c1'}}
                    onPress={ ()=>handleSignUp() }
                />
                {/* <TouchableOpacity style={styles.buttonInscription}
                	onPress={ () => handleSignUp() }
                >
                    <Text style={styles.buttonText}>INSCRIPTION</Text>
                </TouchableOpacity> */}

                <Button title="VOUS AVEZ DEJA UN COMPTE" 
		              type="clear"
		              titleStyle={{ color: 'white', fontSize: 12, marginTop: 10}}
		              onPress={ ()=>props.signin() }
                />

            </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
       padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20,
        color: 'black',
        paddingHorizontal: 10,
        fontSize: 10
    },
    buttonInscription: {
        backgroundColor: '#f4c6c1',
        paddingVertical: 20,
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700'
    },
    date: {
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        justifyContent: 'space-around'
    },
    jourmoisan: {
        
    
    }
})


export default Logupform ;


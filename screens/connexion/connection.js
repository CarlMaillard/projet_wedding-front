import React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, View, Image, 
	KeyboardAvoidingView,  TouchableOpacity } from 'react-native';
import ConnectionForm from './connectionform'

/* CONNECTION */
function Connection( props ) {

	const toSignIn = () => {
		props.navigation.navigate( 'SignIn' );
	}
	
	const toSignUp = () => {
		props.navigation.navigate( 'SignUp' );
	}


    return (

            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <TouchableOpacity style={styles.logoContainer}
				        	onPress={ ()=>{
				        		console.log('Fausse connexion !');
				        		props.navigation.navigate('Enter');
				        		props.setLogin({status: true, userToken: ''});
				        	} }>
				           <Image 
						         style={styles.logo}
						         source={require('../../assets/logo1.png')}
						         
				           />
				        </TouchableOpacity>

                <View>
                    <ConnectionForm toSignIn={toSignIn} toSignUp={toSignUp}/>
                </View>
                
            </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F8FB'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        marginTop: 50,
        width: 250,
        height: 200,
    },
})


function mapStateToProps(state) {
  return { 
	 	isLogin: state.isLogin,
//  	username: state.username,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setLogin: function ( val ) {
    	 dispatch( {type: 'setLogin', login: val } )
    }
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)( Connection );


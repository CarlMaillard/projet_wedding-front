import React from 'react';
import { connect } from 'react-redux';

import { View, Text, Button, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Image } from 'react-native-elements';


function Accueil ( props ) {
	console.log( "je suis dans l'accueil ", props.myWedding );

	if ( props.myWedding.justCreate ) {
		
		
		return(
			<View 
				style={{ 
					flex:1, alignItems:'center', justifyContent:'center'
				}}>
			
				<TouchableOpacity
					onPress={ () => { 
						props.navigation.navigate( 'Drawer', { screen: 'DashboardScreen' } );
					} }
					style={{ 
					flex:1, justifyContent:'space-around'
					}}>
					<View
						style={{ 
							flex:0.3, flexDirection:'row', alignItems:'center', justifyContent:'center',
							backgroundColor:'#FAEBE4',
							width: Dimensions.get('window').width*0.9,
							borderRadius: 5, border:'#000'
						}}
						>
						<Icon name='flower' type='material-community' color='#31AE89'  size={35}/>
						<Text
							style={{color:'#000', fontFamily:'catamaran-regular', fontSize:15}}
							>{`J'ORGANISE MON MARIAGE \u263A`}</Text>
				  </View>
				</TouchableOpacity>
				  
			</View>
		
		);
	
	} else {


						return(
						
							<View 
								style={{ 
									flex:1, alignItems:'center', justifyContent:'center',
									marginTop:30
								}}>
							
								<TouchableOpacity
									onPress={ () => { props.navigation.navigate('CreateWed'); } }
									style={{ 
									flex:1, justifyContent:'space-around'
									}}>
									<View
										style={{ 
											flex:0.3, flexDirection:'row', alignItems:'center', justifyContent:'center',
											backgroundColor:'#FAEBE4',
											width: Dimensions.get('window').width*0.9,
											borderRadius: 5, border:'#000'
										}}
										>
										<Icon name='flower' type='material-community' color='#31AE89'  size={35}/>
										<Text
											style={{color:'#000', fontFamily:'catamaran-regular', fontSize:15}}
											>{`J'ORGANISE MON MARIAGE \u263A`}</Text>
									</View>
								</TouchableOpacity>
								
								
								<TouchableOpacity 
									style={{ flex:1 }}
									onPress={ () => { props.navigation.navigate('Drawer'); } }
									>
									<View
										style={{ 
											flex:0.3, flexDirection:'row', alignItems:'center', justifyContent:'center',
											backgroundColor:'#FAEBE4',
											width: Dimensions.get('window').width*0.9,
											borderRadius: 5, border:'#000'
										}}
										>
										<Icon name='flower' type='material-community' color='#31AE89'  size={35}/>
										<Text
											style={{
												color:'#000',
												fontFamily:'catamaran-regular', fontSize:15
											}}>
											{`Je suis invité·e à un mariage`}
										</Text>
									</View>
								</TouchableOpacity>
									
							</View>
						
						);
					}
}

function mapStateToProps(state) {
  return { 
	 	myWedding: state.myWedding,
  }
}


function mapDispatchToProps(dispatch) {
  return {
		setJustCreateWedding: function ( val ) {
			 dispatch( {type: 'setJustCreateWedding', justCreate: val } )
		}
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)( Accueil );


// &nbsp;


/*
  		<Button
  			iconRight="true"
				icon={<Icon name='flower' type='material-community' color='#31AE89'  size={35}/>}
				title={`J'organise mon mariage \u263A`}
				titleStyle={{borderColor:'#fff'}}
				color="#FAEBE4" 
				buttonStyle={{ 
  				width: Dimensions.get('window').width*0.8,
  				height: Dimensions.get('window').height*0.25,
  				borderColor:'grey'
  				}}
			/>
*/
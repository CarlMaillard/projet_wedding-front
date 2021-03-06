import React ,{ useState, useEffect } from 'react';

import { View, ScrollView, Text,  StyleSheet, TouchableOpacity  } from 'react-native';

import { Icon,  ListItem,  Button , Overlay, CheckBox} from 'react-native-elements';

import * as Progress from 'react-native-progress';

import HeaderNav from '../HeaderNav';




function Tasks( props ) {

	const [listTasks, setListTasks]= useState([]);
	const [modalVisible, setModalVisible] = useState( false );
	
	const [tasks, setTasks] = useState('')
	const [index, setIndex] = useState(null)

	const [title, setTitle]=useState('');
	const [description, setDescription] = useState('');
	const [dateIn, setDateIn] = useState('');
	const [dateOut,setDateOut] = useState('');
	
	const [count,setCount]=useState(0);



	const [avancementTasks, setAvancementTasks ]= useState(0)


	useEffect( () => { 
  
	  async function  etatTasks(){
  
		var dataTasks = await fetch('https://weedingplanner.herokuapp.com/tasks', {
  
		  method: 'POST',
		  headers: {'Content-Type':'application/x-www-form-urlencoded'},
		  body: `id=5e67be5ac820c000174ee417&index=${index}`
		  });
		 
		  var tasks = await dataTasks.json();
		 
		  setListTasks(tasks.wedding.tasksPersonal)
		  setCount(tasks.count)
		  setAvancementTasks(tasks.avancement)
		}
		
		
		/* console.log("YOOOOOOO", listTasks) */
		etatTasks()
		
		
		
	},[index]);

	function formaliserDate(date) {
        const newDate= new Date(date)
        return(

        newDate.getDate()+"/"+(newDate.getMonth()+1)+"/"+newDate.getFullYear()
    )
}
	

	//5e67be5ac820c000174ee417 id d'un mariage

		return(

			<View style={{	
					flex:1,
					backgroundColor:'#FFF'
				  }}>
 
				 <HeaderNav nom='Mes tâches'/>			
				
			 	 <ListItem 
                      rightAvatar={ <Icon name="ios-calendar" type="ionicon" color="#31AE89"  size={35}/>}
                      title='Avancement des tâches'
                      subtitle={
                      <View>
                       <Progress.Bar progress={avancementTasks} width={250} height={15} color={'#31AE89'}  />
                      </View>
                    }
                  />

					
					<ScrollView>
					
					{listTasks.map( (u,i) => {
					 const newDate= new Date(u.dateOut)
					 
							
						return(
						<TouchableOpacity onPress={ () => {
							setTitle(u.title), 
							setDescription(u.description),
							setDateIn(u.dateIn), 
							setDateOut(u.dateOut),
							setModalVisible( true )
										
							}} 
							
							>


							<ListItem key={i}
								rightAvatar={ 
								    <CheckBox
									center
									checked={u.state}
									onPress={() => {
										// let newStateTasks = [...listTasks];
										// newStateTasks.splice(i , 1);
										setTasks(!tasks);
										setIndex(i);
										
										
									  }
									 }
									/>
								   }

								   
								title={u.title}
								titleStyle={styles.titleView}
								subtitle={
									<View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
										<View style={styles.subtitleView}>
											<Icon name='clock' type='evilicon' color='red' />
											<Text style={styles.ratingText}>{newDate.getDate()+"/"+(newDate.getMonth()+1)+"/"+newDate.getFullYear()}</Text>
										</View>
										<View style={styles.subtitleView}>
											<Icon name='location-on' type='materialIcons' color='#31AE89' />
											<Text style={styles.ratingText}>Paris</Text>
									    </View>
									</View>
								}
								bottomDivider
							/>
						 </TouchableOpacity>
						);
					  })
					
						
					}
						
						
					</ScrollView>

							
						<Overlay
						    
							isVisible={modalVisible}
							onBackdropPress={ () => setModalVisible(false) }
							windowBackgroundColor="rgba(0, 0, 0, .5)"
							overlayBackgroundColor="rgba(255, 255, 255, 1)"
							width="90%" height="75%"
						  >
							<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>

								<ScrollView > 
									  <ListItem 
				
	                                titleStyle={styles.titleView}
									title={title}
									bottomDivider
	                                />
					
									<Text 
									style={styles.ratingText}>
									{description}
									</Text>

									<ListItem 
	                                titleStyle={styles.titleView}
									title={formaliserDate(dateIn)}
									subtitle='   Début de la tâche'
									bottomDivider
									/>
								    <ListItem 
									titleStyle={styles.titleView}
									subtitle='   Fin de la tâche'
									title={formaliserDate(dateOut)}
									
									
									/>
								</ScrollView>
						
							
							</View>
						</Overlay>
					
					  
					  
				
			</View>
			
	
		);
	}




const styles = StyleSheet.create({
	titleView: {
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily:'greatvibes',
		fontWeight:'bold', 
		paddingTop: 10,
		fontSize:18,
		paddingLeft: 10,
		paddingRight: 10,
	},
	
	subtitleView: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingLeft: 15,
		paddingTop: 5
	},
	ratingText: {
		paddingLeft: 10,
		paddingRight: 10,
		color: 'black'
	},
	interSpace:{
		paddingLeft: 30,
	}, 
	input: { 
		alignSelf:'flex-start', 
		width: '70%', 
		marginTop: 10,
		height: 40,
		backgroundColor: 'rgba(255,255,255,0.7)',
		marginBottom: 20,
		paddingHorizontal: 10
	}
});


export default Tasks; 

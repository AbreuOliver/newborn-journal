import { React, Component } from 'react';
import {
	ChakraProvider,
	Box,
	Text,
	Grid,
	HStack,
	extendTheme,
	SimpleGrid
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import Firebase from "firebase";
import config from "./config.js";

import moment from "moment";

import babyHappy from "./assets/babyHappy.png";
import bottle from "./assets/bottle.png";
import calendar from "./assets/calendar.png";
import diaper from "./assets/diaper.png";
import diaperPoopy from "./assets/diaperPoopy.png";
import diaperWet from "./assets/diaperWet.png";
import meal from "./assets/meal.png";


const today = moment().format("MMM DD, YYYY");

// function App() {
class App extends Component {
	constructor(props) {
		super(props);
		if (!Firebase.apps.length) {
			Firebase.initializeApp(config);
		};
		this.state = {
			data: [],
			loading: true,
		};
	}

	componentDidMount() {
		this.getUserData();
	};

	// FUNCTION TO GET INITIAL DATA FROM FIREBASE REALTIME DATABASE
	getUserData = () => {
		let ref = Firebase.database().ref("/data");
		ref.on("value", snapshot => {
			this.setState({
				data: Object.values(snapshot.val()),
				loading: false,
			})
		});
	};

	render() {
		console.log("DATA:", this.state.data)
		// console.log("DIAPERS:", this.state.data.filter(x => x.recordType.includes("Diaper")))
		console.log(today)
		console.log("TODAY DIAPERS:", this.state.data.filter(x => x.recordType.includes("Diaper")).filter(x => x.recordStartTime.includes(today)))
		console.log("OBJECT",
						// this.state.data
						// 	.filter(x => x.recordType.includes("Diaper"))
						// 	.filter(x => x.recordStartTime.includes(today))
						// 	.slice(-1)[0]
						this.state.data[this.state.data.length-1]
						// [Object.recordType]
		)
		return (
			<ChakraProvider theme={extendTheme({
				fonts: {
					body: " 'Work Sans', sans-serif"
				}
			})}>
			<Box textAlign="center" fontSize="xl">
				<Grid minH="100vh" >
				<ColorModeSwitcher justifySelf="flex-end" />
				<Text fontWeight="900" fontSize="5xl" >Baby Journal</Text>
				<SimpleGrid
					columns={[ 1, 2]} spacingY="0px" spacingX="20px"
					margin="0 20px"
				>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="flex-start"
						textAlign="left"
						paddingLeft="30px"
						color="#fff"
						height="300px"
						backgroundColor="#303297"
						marginBottom="20px"
					>
						<Text fontSize="2xl" >
							Total Feedings <br/> (Lifetime)
						</Text>
						<HStack>
							<Text minWidth="2ch" fontSize="8xl" fontWeight="bold" >
								{ this.state.data
									.filter(x => x.recordType.includes("feeding"))
									.length
								}
							</Text>
							<img src={bottle} alt="" style={{opacity: 0.5, height: "100px"}}/>
						</HStack>
						<Text fontSize="md">Last Feeding: </Text>
					</Box>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="flex-start"
						textAlign="left"
						paddingLeft="30px"
						height="300px"
						backgroundColor="#f95b58"
						marginBottom="20px"
					>
						<Text fontSize="2xl" >
							Total Diapers Changed <br/> (Lifetime)
						</Text>
						<HStack>
							<Text minWidth="2ch"  fontSize="8xl" fontWeight="bold" >
								{ this.state.data
									.filter(x => x.recordType.includes("iaper"))
									.length
								}
							</Text>
							<img src={diaper} alt="" style={{opacity: 0.5, height: "100px"}}/>
						</HStack>
						<Text fontSize="md">Last Diaper Change: </Text>
					</Box>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="flex-start"
						textAlign="left"
						paddingLeft="30px"
						height="300px"
						backgroundColor="#2b79ff"
						marginBottom="20px"
					>
						<Text fontSize="2xl" >
							Total Wet Diapers <br/>Changed (Lifetime)
						</Text>
						<HStack>
							<Text minWidth="2ch" fontSize="8xl" fontWeight="bold">
								{ this.state.data
									.filter(x => x.recordType.includes("iaper"))
									.filter(x => x.recordDetail.includes("et"))
									.length
								}
							</Text>
							<img src={diaperWet} alt="" style={{opacity: 0.5, height: "100px"}}/>
						</HStack>
						<Text fontSize="md">Last Wet Diaper: </Text>
					</Box>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="flex-start"
						textAlign="left"
						paddingLeft="30px"
						color="#fff"
						height="300px"
						backgroundColor="#29272a"
						marginBottom="20px"
					>
						<Text fontSize="2xl" >
							Total Poopy Diapers <br/>Changed (Lifetime)
						</Text>
						<HStack>
							<Text minWidth="2ch" fontSize="8xl" fontWeight="bold">
								{ this.state.data
									.filter(x => x.recordType.includes("iaper"))
									.filter(x => x.recordDetail.includes("oop"))
									.length
								}
							</Text>
							<img src={diaperPoopy} alt="" style={{opacity: 0.5, height: "100px"}}/>
						</HStack>
						<Text fontSize="md">Last Poopy Diaper: </Text>
					</Box>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="flex-start"
						textAlign="left"
						paddingLeft="30px"
						color="#fff"
						height="300px"
						backgroundColor="#303297"
						marginBottom="20px"
					>
						<Text fontSize="2xl" >
							Total Diapers Changed <br/> (Today)
						</Text>
						<HStack>
							<Text minWidth="2ch" fontSize="8xl" fontWeight="bold" >
							{this.state.data
								.filter(x => x.recordType.includes("iaper"))
								.filter(x => x.recordStartTime.includes(today))
								.length
							}
							</Text>
							<img src={babyHappy} alt="" style={{opacity: 0.5, height: "100px"}}/>
						</HStack>
						<Text fontSize="md">Most Active Day: </Text>
					</Box>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="flex-start"
						textAlign="left"
						paddingLeft="30px"
						color="#000"
						height="300px"
						backgroundColor="#8cffa0"
						marginBottom="20px"
					>
						<Text fontSize="2xl" >
							Total Entries <br/>(Lifetime)
						</Text>
						<HStack>
							<Text minWidth="2ch" fontSize="8xl" fontWeight="bold">
								{ this.state.data
									.length
								}
							</Text>
							<img src={calendar} alt="" style={{opacity: 0.5, height: "100px"}}/>
						</HStack>
						<Text fontSize="md">Last Entry: {this.state.data.length-1[Object.recordType]}</Text>
					</Box>
				</SimpleGrid>
				</Grid>
			</Box>
			</ChakraProvider>
		);
	};
};

export default App;

// ```
// ROOT PASSWORD i2D_V3

// 4 servers total

// 220 - has flask application
// 157 - development server
// 156 - Production Server

// Free round noon tomorrow
// ```
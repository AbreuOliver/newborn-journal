import { React, Component } from 'react';
import {
	ChakraProvider,
	Box,
	Text,
	Link,
	VStack,
	Code,
	Grid,
	theme,
	HStack,
	Flex,
	extendTheme,
	SimpleGrid
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

import Firebase from "firebase";
import config from "./config.js";

import moment from "moment";

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
		console.log("OBJECT", this.state.data
							.filter(x => x.recordType.includes("Diaper"))
							.filter(x => x.recordStartTime.includes(today))
							.slice(-1)[0]
							// .recordStartTime
		)
		return (
			<ChakraProvider theme={extendTheme({
				fonts: {
					body: " 'Work Sans', sans-serif"
				}
			})}>
				{/* <Box border="2px solid blue" textAlign="center" fontSize="xl">
					<Grid
						minH="100vh"
						gap={3}
						border="2px solid orange"
					>
						<ColorModeSwitcher justifySelf="flex-end" />
						<VStack
							height="300px"
							justifyContent="center"
						>
							<HStack>
								<VStack
									justifyContent="center"
									alignItems="flex-start"
									textAlign="left"
									paddingLeft="30px"
									width="300px"
									height="300px"
									backgroundColor="#303297"
								>
									<Text color="#fff">
										Total <br/>Entries
									</Text>
									<Text color="#fff" fontSize="8xl" fontWeight="bold">
										{this.state.data.length}
									</Text>
								</VStack>
								<VStack
									justifyContent="center"
									alignItems="flex-start"
									paddingLeft="30px"
									textAlign="left"
									width="300px"
									height="300px"
									backgroundColor="#ff4c4f"
								>
									<Text width="20ch">
										Diapers Changed Lifetime
									</Text>
									<Text fontSize="8xl" fontWeight="bold">
										{this.state.data.filter(x => x.recordType.includes("Diaper")).length}
									</Text>
								</VStack>
								<VStack
									justifyContent="center"
									alignItems="flex-start"
									paddingLeft="30px"
									textAlign="left"
									width="300px"
									height="300px"
									backgroundColor="#2b79ff"
								>
									<Text width="15ch">
										Diapers Changed Today
									</Text>
									<Text fontSize="8xl" fontWeight="bold">
										{this.state.data
											.filter(x => x.recordType.includes("Diaper"))
											.filter(x => x.recordStartTime.includes(today))
											.length
										}
									</Text>
								</VStack>
								<VStack
									justifyContent="center"
									alignItems="flex-start"
									paddingLeft="30px"
									textAlign="left"
									width="300px"
									height="300px"
									backgroundColor="#29272a"
								>
									<Text color="#fff" width="15ch">
										Last Diaper Change:
									</Text>
									<Text color="#fff" fontSize="8xl" fontWeight="bold">

									</Text>
								</VStack>
							</HStack>
						</VStack>
						<VStack>
							<HStack>
									<VStack
										justifyContent="center"
										alignItems="flex-start"
										textAlign="left"
										paddingLeft="30px"
										width="300px"
										height="300px"
										backgroundColor="#f95b58"
									>
										<Text>
											Feedings Total <br/> Lifetime
										</Text>
										<Text fontSize="8xl" fontWeight="bold">
											{ this.state.data
												.filter(x => x.recordType.includes("feeding"))
												.length
											}
										</Text>
									</VStack>
								</HStack>
						</VStack>
					</Grid>
				</Box> */}
			<Box textAlign="center" fontSize="xl">
				<Grid
						minH="100vh"
						// spacingY="5px"
						// gap={3}
						// border="2px solid orange"
						// backgroundColor="#8cffa0"
				>
				<ColorModeSwitcher justifySelf="flex-end" />
				<Text fontWeight="900" fontSize="5xl" >Baby Journal</Text>
				<SimpleGrid
					columns={[ 1, 2, 3]} spacing="5px"
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
					>
						<Text fontSize="2xl" >
							Total Feedings <br/> (Lifetime)
						</Text>
						<Text fontSize="8xl" fontWeight="bold" >
							{ this.state.data
								.filter(x => x.recordType.includes("feeding"))
								.length
							}
						</Text>
						<Text fontSize="md">Last Feeding: </Text>
					</Box>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="flex-start"
						textAlign="left"
						paddingLeft="30px"
						// color="#fff"
						height="300px"
						backgroundColor="#f95b58"
					>
						<Text fontSize="2xl" >
							Total Diapers Changed <br/> (Lifetime)
						</Text>
						<Text fontSize="8xl" fontWeight="bold" >
							{ this.state.data
								.filter(x => x.recordType.includes("iaper"))
								.length
							}
						</Text>
						<Text fontSize="md">Last Diaper Change: </Text>
					</Box>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="flex-start"
						textAlign="left"
						paddingLeft="30px"
						// color="#fff"
						height="300px"
						backgroundColor="#2b79ff"
					>
						<Text fontSize="2xl" >
							Total Wet Diapers <br/>Changed (Lifetime)
						</Text>
						<Text fontSize="8xl" fontWeight="bold">
							{ this.state.data
								.filter(x => x.recordType.includes("iaper"))
								.filter(x => x.recordDetail.includes("et"))
								.length
							}
						</Text>
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
					>
						<Text fontSize="2xl" >
							Total Poopy Diapers <br/>Changed (Lifetime)
						</Text>
						<Text fontSize="8xl" fontWeight="bold">
							{ this.state.data
								.filter(x => x.recordType.includes("iaper"))
								.filter(x => x.recordDetail.includes("oop"))
								.length
							}
						</Text>
						<Text fontSize="md">Last Poopy Diaper: </Text>
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
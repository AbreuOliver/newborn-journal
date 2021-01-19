import { React, Component } from 'react';
import {
	ChakraProvider,
	Box,
	Text,
	Grid,
	HStack,
	extendTheme,
	SimpleGrid,
	Button,
	VStack
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
import pacifier from "./assets/pacifier.png";
 // import axios from "axios";

import Clock from "./Clock";


const today = moment().format("MMM DD, YYYY");
const thisDay = moment().format("ddd, MMM DD")
const daysOld = moment().diff(moment("202101081015", "YYYYMMDDhhmm"), "days")

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
			allDiapers: [],
			allFeedings: [],
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
				data:
					Object.values(snapshot.val())
					,
				loading: false,
			})
		});
	};

	render() {

		return (
			<ChakraProvider theme={extendTheme({
				fonts: {
					body: " 'Work Sans', sans-serif"
				}
			})}>
			<Box
				flexDirection="column"
				textAlign="center"
				fontSize="xl"
				margin="0 auto"
				maxWidth="750px"
			>
				<Grid
					minH="100vh"
					alignItems="flex-start"
				>
					<HStack
						marginTop="25px"
						marginBottom="15px"
						marginLeft="25px"
						marginRight="35px"
						justifyContent="space-between"
					>
						<ColorModeSwitcher justifySelf="flex-end" />
						<Button>Add New Entry</Button>
					</HStack>
					<VStack
						// height="100%"
						// border="2px solid purple"
						justifyContent="center"
						alignItems="center"
						marginBottom="25px"
					>
						<Text
							fontWeight="900"
							fontSize="5xl"
							marginBottom="15px"
							lineHeight="50px"
							maxHeight="100px"
							// border="2px solid red"
						>
							Newborn Journal
						</Text>
						< Clock />
					</VStack>
					<SimpleGrid
						columns={[ 1, 2]}
						spacingY="0px"
						spacingX="20px"
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
							borderRadius="41.5px"
							paddingTop="25px"
							paddingBottom="25px"
						>
							<Text fontSize="2xl" >
								Age <br/>
							</Text>
							<HStack>
								<Text minWidth="2ch" fontSize="8xl" fontWeight="bold" wordBreak="break-word">
									{
										daysOld
									}
								</Text>
								<img src={calendar} alt="" style={{opacity: 0.5, height: "100px"}}/>
							</HStack>
							<Text fontSize="md">
								Days
							</Text>
						</Box>
						{/* ========================================================================== */}
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="center"
							alignItems="flex-start"
							textAlign="left"
							paddingLeft="30px"
							height="300px"
							backgroundColor="#faa307"
							marginBottom="20px"
							borderRadius="41.5px"
							paddingTop="25px"
							paddingBottom="25px"
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
							<Text fontSize="md">Avg Feedings Per Day: &nbsp;
								{
									Math.round(this.state.data
									.filter(x => x.recordType.includes("feeding"))
									.length/moment().diff(moment("20210108", "YYYYMMDD"), "days")*10)/10
								}
							</Text>
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
							borderRadius="41.5px"
							paddingTop="25px"
							paddingBottom="25px"
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
								<Text fontSize="md">Last Diaper Change:
									{this.state.data
										.filter(x => x.recordType.includes("iaper"))
										.reverse()
										.slice(0, 1)
										.map( x => {
										return (
											<div className="content" key={x.id}>
												<div className="class">
													{x.recordStartTime} &nbsp;
													({x.recordDetail})
												</div>
											</div>
										)
									})}
								</Text>
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
							borderRadius="41.5px"
							paddingTop="25px"
							paddingBottom="25px"
						>
							<Text fontSize="2xl" >
								Total Diapers with<br/>Pee (Lifetime)
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
							<HStack width="100%">
							<Text fontSize="md">Last Wet Diaper:
								{this.state.data
									.filter(x => x.recordType.includes("iaper"))
									.filter(x => x.recordDetail.includes("et"))
									.reverse()
									.slice(0, 1)
									.map( x => {
									return (
										<div className="content" key={x.id}>
											<div className="class">
												{x.recordStartTime}
											</div>
										</div>
									)
								})}
							</Text>
							</HStack>
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
							borderRadius="41.5px"
							paddingTop="25px"
							paddingBottom="25px"
						>
							<Text fontSize="2xl" >
								Total Diapers with <br/>Poopy (Lifetime)
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
							<Text fontSize="md">Last Poopy Diaper:
								{this.state.data
									.filter(x => x.recordType.includes("iaper"))
									.filter(x => x.recordDetail.includes("oop"))
									.reverse()
									.slice(0, 1)
									.map( x => {
									return (
										<div className="content" key={x.id}>
											<div className="class">
												{x.recordStartTime}
											</div>
										</div>
									)
								})}
							</Text>
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
							backgroundColor="#7666b2"
							marginBottom="20px"
							borderRadius="41.5px"
							paddingTop="25px"
							paddingBottom="25px"
						>
							<Text fontSize="2xl" >
								Total Diapers Changed <br/> Today ({thisDay})
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
							backgroundColor="#ffd500"
							marginBottom="20px"
							borderRadius="41.5px"
							paddingTop="25px"
							paddingBottom="25px"
						>
							<Text fontSize="2xl">
								Total Feedings <br/>Today ({thisDay})
							</Text>
							<HStack height="100px">
								<Text minWidth="2ch" fontSize="8xl" fontWeight="bold">
									{ this.state.data
										.filter(x => x.recordType.includes("eeding"))
										.filter(x => x.recordStartTime.includes(today))
										.length
									}
								</Text>
								<img src={meal} alt="" style={{opacity: 0.5, height: "100px"}}/>
							</HStack>
							<Text fontSize="md">Last Feeding:
								{this.state.data
									.filter(x => x.recordType.includes("eeding"))
									.reverse()
									.slice(0, 1)
									.map( x => {
									return (
										<div className="content" key={x.id}>
											<div className="class">
												{x.recordStartTime} <br></br>
												(
												{x.recordDetail} side, &nbsp;
												{x.recordDuration} minutes)
											</div>
										</div>
									)
								})}
							</Text>
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
							borderRadius="41.5px"
							paddingTop="25px"
							paddingBottom="25px"
						>
							<Text fontSize="2xl" >
								Total Entries <br/>(Lifetime)
							</Text>
							<HStack height="100px">
								<Text minWidth="2ch" fontSize="8xl" fontWeight="bold">
									{ this.state.data
										.length
									}
								</Text>
								<img src={pacifier} alt="" style={{opacity: 0.5, height: "100px"}}/>
							</HStack>
							<Text fontSize="md">Last Entry:
								{this.state.data
									.reverse()
									.slice(0, 1)
									.map( x => {
									return (
										<div className="content" key={x.id}>
											<div className="class">
												{x.recordType}, <br></br>
												entered at {x.inputTime}
											</div>
										</div>
									)
								})}
							</Text>
						</Box>
					</SimpleGrid>
				</Grid>
				{/* {this.state.data
					.reverse()
					.slice(0, 1)
					.map( x => {
					return (
						<div className="content" key={x.id}>
							<div className="class">
								{x.recordType} -
								- {x.inputTime} -
								- {x.recordDetail}
							</div>
						</div>
					)
				})} */}
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
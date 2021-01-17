import React, { Component } from 'react';
import moment from "moment";
import {
     Box
} from '@chakra-ui/react';

// let time =  new Date().toLocaleString();
const time = moment().format("hh:mm A")

class Clock extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               // time: new Date().toLocaleString()
               time: moment().format("hh:mm A")
          };
     }
     componentDidMount() {
          this.intervalID = setInterval(
               () => this.tick(),
               1000
          );
     }
     componentWillUnmount() {
          clearInterval(this.intervalID);
     }
     tick() {
          this.setState({
               // time: new Date().toLocaleString()
               time: moment().format("hh:mm A")
          });
     }
     render(){
          return (
               <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="75px"
                    color="#000"
                    width="250px"
                    backgroundColor="#fcfcfc"
                    borderRadius="20.75px"
                    margin="0 auto"
               >
                    {this.state.time}
               </Box>
          )
     }
}

export default Clock;
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import {gray, purple} from '../utils/colors'

export default class FloatingLabelInput extends React.Component {
    state = {
      isFocused: false,
    };
  
    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => {
      if(!this.props.value) {
        this.setState({ isFocused: false });
      }      
    } 
  
    render() {
      const { label, ...props } = this.props;
      const { isFocused } = this.state;
      const labelStyle = {
        position: 'absolute',
        left: 0,
        top: !isFocused ? 18 : 0,
        fontSize: !isFocused ? 20 : 14,
        color: !isFocused ? gray : purple,
      };
      return (
        <View style={{ paddingTop: 18 }}>
          <Text style={labelStyle}>
            {label}
          </Text>
          <TextInput
            {...props}
            style={{ height: 26, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </View>
      );
    }
  }
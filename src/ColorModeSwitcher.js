import React from 'react';
import { useColorMode, useColorModeValue, IconButton, Text } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Text>
      Change Theme
      <IconButton
        size="md"
        fontSize="md"
        aria-label={`Switch to ${text} mode`}
        variant="ghost"
        color="current"
        marginLeft="1"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        {...props}
      />
    </Text>
  );
};

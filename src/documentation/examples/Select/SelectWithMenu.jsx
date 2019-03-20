import React from 'react';
import Select from '@bufferapp/ui/Select';
import { Person, People, Gear, ArrowLeft } from '@bufferapp/ui/Icon';
import { NavBarMenu } from '@bufferapp/ui/NavBar';

/** With Custom Component */
export default function ExampleSelectMenu() {
  return (
    <Select
      customButton={onButtonClick => (
        <NavBarMenu
          user={{
            name: 'Courtney Seiter',
            email: 'courtney@buffer.com',
          }}
          onClick={onButtonClick}
        />
      )}
      items={[
        {
          id: '1',
          title: 'Account',
          icon: <Person color="gray" />,
          onItemClick: () => console.info('Account Clicked'),
        },
        {
          id: '2',
          title: 'Organization',
          icon: <People color="gray" />,
          onItemClick: () => console.info('Organization Clicked'),
        },
        {
          id: '3',
          title: 'Settings',
          icon: <Gear color="gray" />,
          onItemClick: () => console.info('Settings Clicked'),
        },
        {
          id: '3',
          title: 'Logout',
          icon: <ArrowLeft color="gray" />,
          hasDivider: true,
          onItemClick: () => console.info('Logout Clicked'),
        },
      ]}
      marginTop="32px"
    />
  );
}

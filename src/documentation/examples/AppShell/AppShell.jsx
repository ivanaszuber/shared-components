import React from 'react';
import AppShell from '@bufferapp/ui/AppShell';

/** AppShell Example */
export default function ExampleAppShell() {
  return (
    <AppShell
      user={{
        email: 'hamstu@gmail.comffffffffddddddddd',
        menuItems: [],
      }}
      sidebar={() => <div>Sidebar</div>}
      content={() => <div>Main content.</div>}
    />
  );
}

import React from 'react';
import Modal from '@bufferapp/ui/Modal';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';


/** Reset focus on dismiss */
export default function ModalTest() {
  const previousFocusRef =  React.createRef();
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative', padding: '16px', boxSizing: 'border-box' }}>
      <Button
        type="primary"
        onClick={() => {}}
        label="Eyes on me!"
        innerRef={previousFocusRef}
      />
      <Modal
        action={{ label: "Don’t Panic!" }}
        previousFocus={previousFocusRef}
      >
        <div>
          <div style={{ width: '100%', padding: '16px', boxSizing: 'border-box' }}>
            <Text type="h3">Curiously enough, the only thing that went through the mind of the bowl of petunias as it fell was Oh no, not again. Many people have speculated that if we knew exactly why the bowl of petunias had thought that we would know a lot more about the nature of the Universe than we do now.</Text>
          </div>
        </div>
      </Modal>
    </div>
  );
}

import React from 'react';
import Form from '@bufferapp/ui/Form';
import FormBlock from '@bufferapp/ui/FormBlock';
import Input from '@bufferapp/ui/Input';
import Button from '@bufferapp/ui/Button';
import Card from '@bufferapp/ui/Card';

/** Simple form inside a Card */
export default function ExampleForm() {
  return (
    <Card>
      <Form
        onSubmit={() => {}}
      >
        <FormBlock withBorder>
          <Input
            label="Some input"
          />
        </FormBlock>
        <FormBlock align="right" inline condensed>
          <Button
            type="text"
            label="Cancel"
          />
          <Button
            type="primary"
            label="Submit"
          />
        </FormBlock>
      </Form>
    </Card>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { Field } from 'formik';

const ItemField = ({ info, shouldShowError = false, remove, push }) => {
  const { id, description, type, label } = info;
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [error, setError] = useState();

  const validateItem = useCallback(() => {
    if (items.length === 0 && shouldShowError && item.length === 0) {
      setError('At least one item');
    } else if (0 < item.length && item.length < 2) {
      setError('Too short');
    } else {
      setError(null);
    }
  }, [item.length, items.length, shouldShowError]);

  useEffect(() => {
    validateItem();
  }, [validateItem]);

  const onChange = ({ target: { value } }) => {
    setItem(value);
  };

  const onRemove = (_, { content }) => {
    const indexToRemove = items.findIndex(i => i === content);
    const newItems = items.filter(i => i !== content);
    setItems(newItems);
    remove(indexToRemove);
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        setItems([...items, item]);
        push(item);
        setItem('');
      }}
    >
      {items.map(i => (
        <Label key={i} content={i} removeIcon='delete' onRemove={onRemove} />
      ))}
      <Field name={`${info.name}[0]`}>
        {({ field }) => (
          <Form.Input
            icon={info.icon}
            id={id}
            label={label}
            type={type}
            placeholder={description}
            onBlur={field.onBlur}
            value={item}
            onChange={onChange}
            error={
              shouldShowError &&
              error && {
                content: error,
                pointing: 'below'
              }
            }
          />
        )}
      </Field>
      <Button type='submit' disabled={item.length === 0 || !!error}>
        Add tag Todo
      </Button>
    </form>
  );
};

export default ItemField;

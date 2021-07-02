import { ChangeEvent, FC } from 'react';

import styles from './Field.module.scss';

import { FieldPropsFromRedux } from '../../containers/components/Field/Field';

const Field: FC<FieldPropsFromRedux> = ({
  id,
  className = '',
  type = 'text',
  onKeyUp,
  changeValue,
  name,
  value,
  onChange,
  defaultValue,
  placeholder,
  children,
  maxLength,
  label,
}) => {
  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    if (changeValue) {
      if (event.target.type === 'file') {
        //@ts-ignore
        const file = { file: event.target.files[0] };

        //@ts-ignore
        return changeValue(file);
      }

      return changeValue(event.target.value);
    }

    if (onChange) return onChange(event);
  };

  let input;
  switch (type) {
    case 'select':
      input = (
        <>
          {label ? <label htmlFor={id}>{label}</label> : null}
          <select
            defaultValue={defaultValue}
            name={name}
            id={id}
            value={value}
            onChange={onChangeHandler}>
            {children}
          </select>
        </>
      );
      break;
    case 'checkbox':
      input = (
        <>
          <input
            name={name}
            checked={value as unknown as boolean}
            value={value}
            type="checkbox"
            id={id}
            onChange={onChangeHandler}
          />
          {label ? <label htmlFor={id}>{label}</label> : null}
        </>
      );
      break;
    case 'textarea':
      input = (
        <>
          {label ? <label htmlFor={id}>{label}</label> : null}
          <textarea
            name={name}
            maxLength={maxLength}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChangeHandler}></textarea>
        </>
      );
      break;
    default:
      input = (
        <>
          <input
            name={name}
            type={type}
            id={id}
            placeholder={placeholder}
            onKeyUp={onKeyUp}
            value={value}
            onChange={onChangeHandler}
          />
          {label ? <label htmlFor={id}>{label}</label> : null}
        </>
      );
  }

  return <div className={[styles.Base, className].join(' ')}>{input}</div>;
};

export default Field;

import React from 'react';
import Select from 'react-select';

export default function SimpleSelect(props: {
    value: [{ value: string, label: string }],
    name: string,
    onChange: () => void,
    onBlur?: () => void,
    options: any,
    className?: string,
    placeholder?: string,
    isDisabled: boolean,
    label: string,
}) {
    return (
        <div>
            {props.label && (
                <label htmlFor={`${props.name}`} className="group-label">
                    {props.label}
                </label>
            )}
            {props.options ? (
                <Select
                    id={props.name}
                    options={props.options}
                    onChange={props.onChange}
                    onBlur={props.onBlur && props.onBlur}
                    defaultValue={props.value}
                    className={props.className && props.className}
                    placeholder={props.placeholder && props.placeholder}
                    isDisabled={props.isDisabled}
                    getValue={value => {
                        console.log(value);
                    }}
                />
            ) : (
                <Select
                    id={props.name}
                    isLoading
                    onChange={props.onChange}
                    onBlur={props.onBlur && props.onBlur}
                    defaultValue={props.value}
                    className={props.className && props.className}
                    placeholder={props.placeholder && props.placeholder}
                    isDisabled={props.isDisabled}
                />
            )}
        </div>
    );
}
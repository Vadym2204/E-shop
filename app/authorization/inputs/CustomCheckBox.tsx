'use client'

import { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface ICustomCheckBoxProps {
    id: string;
    label: string;
    disabled?: boolean;
    register: UseFormRegister<FieldValues>
}

const CustomCheckBox:FC<ICustomCheckBoxProps> = ({id, label, disabled, register}) => {
  return (
    <div className="w-full flex flex-row gap-2 items-center">
        <input 
        type="checkbox" 
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=""
        className="cursor-pointer"
        />
        <label htmlFor={id} className="font-medium cursor-pointers">
            {label}
        </label>
    </div>
  )
}

export default CustomCheckBox
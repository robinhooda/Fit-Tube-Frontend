const Input = ({register, id, type, placeholder, label, error, onClick, onPaste, ...inputProps}) => {
    return (
        <>
            {label && <label className={`block w-full  ${inputProps.labelClass}`}>{ label }</label>}
            {/* <input {...register(id)} id={id} {...inputProps} type={type} onClick={onClick} onPaste={onPaste} className={`${error ? 'border-red-600': 'border-gray-300'} border-2 ${inputProps.width ? inputProps.width :'w-full'} ${inputProps.height ? inputProps.height :'h-12'} px-4 py-3 rounded-lg mt-2 box-border ${inputProps.className}`} placeholder={placeholder} /> */}
            <input id={id} {...inputProps} type={type} onClick={onClick} onPaste={onPaste} className={`${error ? 'border-red-600': 'border-gray-300'} border-2 ${inputProps.width ? inputProps.width :'w-full'} ${inputProps.height ? inputProps.height :'h-12'} px-4 py-3 rounded-lg mt-2 box-border ${inputProps.className}`} placeholder={placeholder} />
            {error && <div className="text-red-600 text-left">{error.message}</div>}
        </>
    )
}

export default Input
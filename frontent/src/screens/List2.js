import { useRef } from "react";



export const List2 = ({ onPress, value, buttonText, onChange }) => {

    const inputRef = useRef()

    const onButtonClick = () => {
        if (buttonText === "+") {
            onPress(inputRef.current.value);
            inputRef.current.value = " "
        } else {
            onPress()
        }

    }
    return (
        <div>

            <input type="text" ref={inputRef} defaultValue={value} onChange={(i) => {
                if (onChange) {
                    onChange(i.target.value)
                }
                // onChange?.(i.target.value)
            }} />
            <button style={{ margin: "8px", aspectRatio: 1, width: "20px" }} onClick={onButtonClick}>{buttonText} </button >
        </div >
    )
}



// export default List2;
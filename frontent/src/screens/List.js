
import { useRef, useImperativeHandle, forwardRef } from "react";


const List = forwardRef((p, ref) => {

    const inputRef = useRef();


    const showValue = () => {
        const data = inputRef.current.value


        console.log("🚀 ~ file: List.js ~ line 13 ~ showValue ~ data", data)



    };


    useImperativeHandle(ref, () => {
        return {
            showValue,
        };
    })

    return (

        <form>
            <label htmlFor="name" >NAME : </label>
            <input type="text" ref={inputRef} />
        </form >

    )
})

export default List;
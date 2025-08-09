import { useState } from "react";
import { List2 } from "./List2";
// import { List3 } from "./List2";

const DemoScreen2 = () => {
    const [inputList, setInputList] = useState([""])

    const addComponent = (value) => {
        setInputList(inputList.concat(value))


    }

    const valueUpdateHandler = (currentIndex, value) => {

        const data = [...inputList]
        data[currentIndex] = value
        setInputList(data);
    }

    // const firstValueHandler = (value) => {
    //     const data = [...inputList]
    //     data.unshift(value);
    //     console.log(data);



    // }
    const deleteComponent = (currentIndex) => {
        setInputList(inputList.filter((_, index) => index !== currentIndex))
    }

    const showValue = () => {
        console.log(inputList)
        // setInputList([value, ...inputList]);
    }
    return (

        <div>

            {/* <List2 onPress={addComponent} but1--tonText={"+"} /> */}


            {inputList.map((i, index) => <List2 key={index} onPress={() => index === 0 ? addComponent(i) : deleteComponent(index)} value={i} buttonText={index === 0 ? "+" : "-"} onChange={(value) => valueUpdateHandler(index, value)} />)}


            <button onClick={showValue} >button </button>

        </div>

    )
}

export default DemoScreen2;

import { useRef, useState } from "react";

import List from "./List";

const InputScreen = () => {
    const valueRef = useRef([])
    console.log("🚀 ~ file: demoScreen.js ~ line 8 ~ DemoScreen ~ valueRef", valueRef)
    const [input, setInput] = useState([
        {
            name: "",
        }
    ]);

    // const [data, setData] = useState(DATA)
    const onPrint = () => {
        valueRef.current.map((p) => p.showValue())
    }
    // console.log("🚀 ~ file: demoScreen.js ~ line 27 ~ onPrint ~ onPrint", valueRef.current.map((p) => p.showValue()))


    return (

        < div >

            {input.map((data, index
            ) => (<List data={data} key={index} onAdd onMinus ref={(data) => valueRef.current[index] = data} />))

            }

            <button onClick={onPrint}>Render Data</button>

        </div >
    )
}

export default InputScreen;

import { useRef } from "react";

import List from "./List";

const DemoScreen = () => {
    const valueRef = useRef([])
    console.log("🚀 ~ file: demoScreen.js ~ line 8 ~ DemoScreen ~ valueRef", valueRef)
    const DATA = [
        {
            name: " ",
            component: 1
        }, {
            name: " ",
            component: 2
        },
        {
            name: " ",
            component: 3
        }
    ]

    // const [data, setData] = useState(DATA)
    const onPrint = () => {
        valueRef.current.map((p) => p.showValue())
    }
    // console.log("🚀 ~ file: demoScreen.js ~ line 27 ~ onPrint ~ onPrint", valueRef.current.map((p) => p.showValue()))


    return (

        < div >

            {DATA.length <= 0 ? (
                <h2>List not Found...</h2>
            ) : DATA.map((data, index
            ) => (<List data={data} key={index} ref={(data) => valueRef.current[index] = data} />))

            }

            <button onClick={onPrint}>Render Data</button>

        </div >
    )
}

export default DemoScreen;
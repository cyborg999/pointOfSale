import { useState  } from "react"
import "./../css/flashmessage.css";

function FlashMessage(props){
    let [cs, setCs ] = useState(props.cs)

    // TODO
    // setTimeout(function(){
    //     setCs("none")
    //     document.getElementById("flash").remove();  
    // }, props.duration)

    return (
        <div className={ cs + " flash"} id="flash">
            <p className={ props.type }>{props.msg}</p>
        </div>
    )
}

export default FlashMessage;
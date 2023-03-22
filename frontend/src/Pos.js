import { useState } from "react";
import Axios from "axios";
import config from "./../config";
import "./css/pos.css";

const url = config.backendUrl;

function Pos(){
    let [ search, setSearch ] = useState("");
    let [ type, setType ] = useState("barcode");

    function handleChange(e){
        let { value, name } = e.target

        setSearch(value)
        setType(name)
        console.log(search,type)
    }

    return (
        <div className="container pos">
            <div className="sec_left">
                <input type="text" name="barcode" value={ search } placeholder="Search by Barcode" onChange={ handleChange } className="form-control"/>
                {/* <input type="text" name="item" value={ search } placeholder="Search by item name" onChange={ handleChange } className="form-control"/> */}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>SRP</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                </table>
           </div>
           <div className="sec_right">
                summary
           </div>
        </div>
    )
}

export default Pos;
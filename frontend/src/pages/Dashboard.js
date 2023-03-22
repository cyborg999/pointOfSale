import { useState } from "react";
import Axios from "axios"
import config from "./../config";
import "./../css/dashboard.css";

const url = config.backendUrl;

function Dashboard(props){
    let user = JSON.parse(localStorage.getItem("user"))
    let [added, setAdded] = useState("init")
    let [data, setData ] = useState({
        name : ""
        , qty : 1
        , srp : 1
        , barcode : ""
        , added_by : user.id
    });

    function handleSubmit(e){
        e.preventDefault();

        Axios.post(url+"/product/add", data)
        .then(res => {
            if(res.data === true){
                setAdded("added")
            } else {
                setAdded("failed")
            }

        })
        .catch(err => {
            setAdded("failed")
        })
    }

    function handleChange(e){
        let { value, name } = e.target

        setData( prev => ({ ...data, [name] : value}))
        console.log(added)
    }

    return (
        <div className="container">
          
            <article>
                <h2>Add Product</h2>
                { added === "added" &&  <p className="success">You have succesfully added this product</p>}
                { added === "failed" &&  <p className="error">Product already exists</p>}
                <form onSubmit={ handleSubmit }>
                    <fieldset>
                        <label>Item Name</label>
                        <input type="text" name="name" value={ data.name } onChange={ handleChange}  required placeholder="Item Name"/>
                    </fieldset>
                    <fieldset>
                        <label>Barcode</label>
                        <input type="text" name="barcode" value={ data.barcode } onChange={ handleChange}  required placeholder="Scan Barcode"/>
                    </fieldset>
                    <fieldset>
                        <label>Quantity</label>
                        <input type="number"  min="1"  onChange={ handleChange}  name="qty" value={ data.qty } required placeholder="Quantity"/>
                    </fieldset>
                    <fieldset>
                        <label>SRP(Sales Retail Price)</label>
                        <input type="number"  min="1"  onChange={ handleChange}  name="srp" value={ data.srp } required placeholder="SRP"/>
                    </fieldset> 
                    <fieldset>
                        <input type="submit" className="btn" value="Add"/>
                    </fieldset>
                </form>

            </article>
        </div>
    )
}

export default Dashboard;
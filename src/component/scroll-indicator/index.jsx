import React, { useEffect, useState } from "react";

const ScrollIndicator = ({url}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchData = async (getUrl) => {
        try{
            setLoading(true)
            const response = await fetch(getUrl)
            const data = await response.json()
            console.log(data);
            

        }catch(e){
            console.log(e);
            setErrorMsg(e.massage)
            
        }
    }

    useEffect(() => {
        fetchData(url)
    },[url])

    console.log("ScrollIndicator component loaded!");
    return(
        <div>
            scroll indicator
        </div>
    )
}

export default ScrollIndicator;
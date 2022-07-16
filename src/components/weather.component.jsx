import React from 'react';
const Weather=(props)=>{
    return(
    <div className="container">
        <h5 className="my-5">{props.city}</h5>
        <div className="cards py-5">
            <h5 className="py-2 display-1">
            <i className={`wi ${props.wIcon}`}></i>
            </h5>
            {props.temp?<h5 className="py-2">
                {props.temp}&deg;
            </h5>:null}
            
        </div>
        {/** Representation of min and max tempture */}
       { minmaxTemp(props.mintemp,props.maxtemp)}
       <h4 className="py-3">{props.description}</h4>
    </div>
    );
};

function minmaxTemp(min,max){
    if(min && max){
    return(
        <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
        </h3>
    );
    }
}


export default Weather ;
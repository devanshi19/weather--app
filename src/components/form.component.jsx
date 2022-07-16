import Reat from 'react';
import '../components/form.style.css';

const Form=(props)=>{
    return(
        <div className="container">
            <div>
                {props.error?error():null}
            </div>
            <form onSubmit={props.loadweather}>
            <div className="row">
                <div className="col-md-3 offset-md-2">
                <input type="text" name="city" className="form-control" autoComplete="off" placeholder="City"/>
                </div>
                <div className="col-md-3">
                <input type="text" name="country" className="form-control" autoComplete="off" placeholder="Country"/>    
                </div>
                <div className="col-md-3">
                <button type="submit" className="btn btn-dark form-control" >Check Weather</button>  
                </div>
            </div>
            </form>
        </div>
    );
};
 function error() 
 {
    
    return(
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter  Valid city and valid country!
        </div>
       // <Alert color="danger"> Please Enter  Valid city and valid country!</Alert>
    );
   
} 
 
 


export default Form;
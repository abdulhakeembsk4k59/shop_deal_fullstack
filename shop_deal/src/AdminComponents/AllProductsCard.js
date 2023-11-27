/* eslint-disable jsx-a11y/alt-text */
// import React from "react";

// const AllProductsCard = (props) =>{
//     return (
//         <div className="card d-flex flex-column justify-content-between" style={{width:"18rem", height:'400px'}}>
//             <h5 className="card-title ">{props.title}</h5>
//             <img src={props.src} className="card-img-top" style={{ height:'50%',width:'80%',marginTop:'1rem',marginLeft:'auto', marginRight:'auto' }} />
//             <div className=" card-body">
//                 <div className="card-text d-flex justify-content-between"><span className="">Rating</span><span className="font-weight-bold" style={{fontWeight:'700'}}>₹{props.price}/-</span></div>
//             </div>
//             <div className="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni, error?</div>
//             <div>
//                 <button className="rounded border-0 outline-0 cursor-pointer" style={{height:'48px',width:'100%'}}>Add to cart</button>
//             </div>
//         </div>
//     )
// }

// export default AllProductsCard;
import React from "react";
// import { MdShoppingCart } from "react-icons/md";
import './AllProductsCard.css'
import StarRating from "./StarRating";

const AllProductsCard = (props) =>{
    return (
        <div className="card d-flex flex-column justify-content-between " style={{width:"17rem", height:'530px'}}>
            <img src={props.src} className="card-img-top" style={{ height:'290px',width:'235px',marginLeft:'auto', marginRight:'auto' }} />
            <h5 className="card-title title " style={{marginTop:'8px'}}>{props.title}</h5>
            <div className="card-text d-flex justify-content-between text" style={{width:'215px',marginTop:'-5px',marginLeft:'auto', marginRight:'auto' }}><span><StarRating rating={props.rating} /></span><span className="font-weight-bold" style={{fontWeight:'700'}}>₹{props.price}/-</span></div>
            <div className="card-text desc text" style={{width:'215px',marginLeft:'auto', marginRight:'auto' }}>{props.description}</div>
            <div style={{width:'215px',marginTop:'0.5rem',marginLeft:'auto', marginRight:'auto' ,marginBottom:'1rem' }}>
                <button className="rounded border-0 outline-0 cursor-pointer zoom-btn bg-warning" style={{height:'48px',width:'100%'}}>Update Product </button>
            </div>
        </div>
    )
}

export default AllProductsCard;
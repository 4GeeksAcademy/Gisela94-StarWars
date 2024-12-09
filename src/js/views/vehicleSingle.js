import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";


import "../../styles/vehicleSingle.css";



const VehicleSingle = () => {
    const { store, actions } = useContext(Context);
    const { vehicleId } = useParams()



    useEffect(() => {

        actions.getVehicleDetail(vehicleId)


    }, [])


    console.log(store.vehicleDetail)

    return (
        <div className="vehicle-single-container">
            {!store.vehicleDetail ? (<h1 className="loading-text">Loading..</h1>) : (

                <div className="vehicle-single-card">
                    <div className="vehicle-single-img-container col-md-6">
                        <img src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicleId}.jpg`}
                            className="vehicle-single-img text-white"
                            onError={(error) => {
                                error.target.onerror = null; 
                                error.target.src = "https://i.etsystatic.com/23313394/r/il/42204a/2316127314/il_fullxfull.2316127314_93m1.jpg"; 
                            }} />
                    </div>
                    <div className="vehicle-single-info col-md-6">
                        <div className="card-body">
                            <h1 className="vehicle-single-name mb-3 ">{store.vehicleDetail.name}</h1>


                            <ul>
                                <li>
                                    <strong> Creation Date: </strong>{store.vehicleDetail.model}
                                </li>
                                <li>
                                    <strong> Vehicle class:</strong> {store.vehicleDetail.vehicle_class}
                                </li>
                                <li>
                                    <strong> Length: </strong> {store.vehicleDetail.length}
                                </li>
                                <li>
                                    <strong> Cost in credits: </strong>{store.vehicleDetail.cost_in_credits}
                                </li>
                                <li>
                                    <strong> Passenger:</strong> {store.vehicleDetail.passengers}
                                </li>
                                <li>
                                    <strong> Crew: </strong> {store.vehicleDetail.crew}
                                </li>
                                <li>
                                    <strong> Cargo capacity:</strong>  {store.vehicleDetail.cargo_capacity}
                                </li>
                                <li>
                                    <strong>  Consumables: </strong> {store.vehicleDetail.consumables}
                                </li>
                                <li>
                                    <strong>  Url: </strong>{store.vehicleDetail.url}
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            )}

        </div>
    )
}

export { VehicleSingle };
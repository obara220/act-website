import React, { useState } from "react";
import { FaInfoCircle, FaComments, FaArrowRight, FaTimes } from "react-icons/fa";
import HeaderContainer from "./HeaderContainer";
import Driver from "../../images/Male.png"
import Map from "../../images/map.png"
import Vehicle from "../../images/vehicle.svg"
import DriverLicense from "../../images/california-license.png";
import './index.css'
import { RealtimeChat } from '../../chat-component/realtime-chat';
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CrewContainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const [safetyCheck, setSafetyCheck] = useState({
        clean: true,
        fluids: true,
        oil: false,
        lights: false,
        wipers: false,
        tires: false,
    });
    const goToChat = () => {
        navigate("/chat");
        // setIsChatOpen(true);
        // return <RealtimeChat roomName="my-chat-room" username="john_doe" />
    }
    const toggleSafetyCheck = (key) => {
        setSafetyCheck((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const safetyArr = [
        { label: "Clean", key: "clean" },
        { label: "Fluids", key: "fluids" },
        { label: "Oil", key: "oil" },
        { label: "Lights", key: "lights" },
        { label: "Wipers", key: "wipers" },
        { label: "Tires", key: "tires" }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-6 w-full pr-6 pl-6">
                {/* Header */}
                <HeaderContainer />
                {/* <RealtimeChat roomName="my-chat-room" username="john_doe" /> */}
                {/* Flight Details */}
                <div className="flex justify-between grid grid-cols-3 gap-4 text-center border-b pb-4 flight-details-container">
                    <div className="col-span-3 col-span-3-layout mb-4">
                        <p className="text-xl font-semibold">Upcoming Flight Details</p>
                    </div>
                    <div className="flex w-50 departure-block">
                        <div className="w-50">
                            <p className="text-gray-500">Flight Number</p>
                            <p className="text-lg font-semibold">2251</p>
                        </div>
                        <div className="departure-custom-card">
                            <p className="text-gray-500">Departure Time</p>
                            <p className="text-lg font-semibold">3.15 PM</p>
                        </div>
                        <div className="w-50">
                            <p className="text-gray-500">Arrival Time</p>
                            <p className="text-lg font-semibold">7.00 PM</p>
                        </div>
                    </div>
                </div>

                {/* Live Driver Update */}
                <div className="driver-content">
                    <div className="text-center driver-container py-6">
                        <p className="text-location">
                            Your driver is on the way and will arrive at your location in
                            approximately <span className="text-blue-600 font-bold">5 minutes</span>.
                        </p>
                    </div>
                </div>

                {/* Driver Info & Map Section */}
                <div className="flex justify-between grid grid-cols-3 gap-6"

                >
                    {/* Driver Info */}
                    <div className="driver-info-content">
                        <div className="bg-gray-200 p-3 rounded-lg flex flex-col items-center mb-4" style={{ height: '249px' }}>
                            <img
                                src={Driver}
                                alt="Driver"
                                className="w-6 h-6 rounded-full mt-3"
                            />
                            <h2 className="font-semibold mt-4" style={{ fontSize: '28px' }}>Joseph Smith</h2>
                            <p className="text-sm text-gray-600 m-0">5+ Years Driving Experience</p>
                        </div>
                        <div onClick={toggleModal} className="bg-gray-200 justify-between  p-4 rounded-lg flex items-center mb-4 more-info-button">
                            <div>
                                <FaInfoCircle />
                            </div>
                            <div>
                                <span>More Info</span>
                            </div>
                            <div>
                                <FaArrowRight />
                            </div>
                            {/* <button className="mt-3 flex items-center space-x-2 text-blue-600">
                            </button> */}
                        </div>
                        <div onClick={goToChat} className="bg-gray-200 flex justify-between p-4 rounded-lg flex items-center cursor-pointer">
                            <div>
                                <FaComments />
                            </div>
                            <div>
                                <span>Chat with Joseph</span>
                            </div>
                            <div>
                                <FaArrowRight />
                            </div>
                            {/* <button className="mt-2 flex items-center space-x-2 text-blue-600">
                            </button> */}
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="col-span-1 col-span-1-layout flex justify-center items-center">
                        {/* <p className="text-gray-700">[ Map Integration ]</p> */}
                        <img src={Map} alt="map" style={{ width: '100%', height: '100%' }} />
                    </div>

                    {/* Ride Details */}
                    <div className="" style={{ width: '30%', border: '1px solid #383E5026', borderRadius: '0.5rem' }}>
                        <div className="p-4 card-border">
                            <div className="mb-3">
                                <p className="text-gray-500 text-sm">Destination</p>
                                <p className="font-semibold text-md">Hilton Los Angeles</p>
                            </div>
                        </div>
                        <div className="p-4 card-border">
                            <div className="mb-3">
                                <p className="text-gray-500 text-sm">Pickup Location</p>
                                <p className="font-semibold text-md">
                                    Terminal 4,
                                </p>
                                <p className="font-semibold text-md">
                                    Passenger Pickup Zone
                                </p>
                            </div>
                        </div>
                        <div className="p-4">
                            <div>
                                <p className="text-gray-500 text-sm">Estimated Drive Time</p>
                                <p className="font-semibold text-md">10 minutes</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal */}
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <div className="modal-header">
                                {/* <h2 className="text-xl font-semibold">Driver & Vehicle Information</h2> */}
                                <button className="modal-close" onClick={toggleModal}>
                                    <FaTimes size={20} />
                                </button>
                            </div>
                            <div className="flex grid justify-between grid-cols-2 gap-4">
                                {/* Driver Information */}
                                <div style={{ width: '48%' }}>
                                    <div className="modal-driver-info">
                                        <div className="modal-driver-info-header">
                                            <p className="text-ssm font-semibold mb-2">Driver Information</p>
                                        </div>
                                        <div className="flex justify-between p-3 border-bottom-line">
                                            <p className="m-0">City</p>
                                            <p className="m-0">FT Walton</p>
                                        </div>
                                        <div className="flex justify-between p-3 border-bottom-line">
                                            <p className="m-0">Code</p>
                                            <p className="m-0"> 0105</p>
                                        </div>
                                        <div className="flex justify-between p-3 border-bottom-line">
                                            <p className="m-0">DOB</p>
                                            <p className="m-0">01/15/1960</p>
                                        </div>
                                        <div className="flex justify-between p-3 border-bottom-line">
                                            <p className="m-0">Hire Date</p>
                                            <p className="m-0">11/7/2012</p>
                                        </div>
                                        <div className="flex justify-between p-3">
                                            <p className="m-0">TSA Cert</p>
                                            <p className="m-0">Yes</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 modal-driver-info">
                                        <div className="modal-driver-info-header">
                                            <h3 className="text-ssm font-semibold mb-2">Safety Check</h3>
                                        </div>
                                        {safetyArr.map((item) => (
                                            <div key={item.key} className="flex justify-between items-center p-3 border-bottom-line">
                                                <p className="m-0">{item.label}</p>
                                                <label className={`custom-checkbox ${safetyCheck[item.key] ? 'checked' : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={safetyCheck[item.key]}
                                                        onChange={() => toggleSafetyCheck(item.key)}
                                                    />
                                                    <span className="checkmark">{safetyCheck[item.key] ? "✔" : "✖"}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Vehicle Information */}
                                <div style={{ width: '48%' }}>
                                    <div className="modal-driver-info">
                                        <div className="modal-driver-info-header">
                                            <p className="text-ssm font-semibold mb-2">Vehicle Information</p>
                                        </div>
                                        <div className="flex justify-center p-4">
                                            <img src={Vehicle} alt="vehicle" style={{ width: '350px' }} />
                                        </div>
                                        <div className="flex justify-center p-4">
                                            <img src={DriverLicense} alt="Driver License" />
                                        </div>
                                        <div className="flex justify-between p-3 border-bottom-line">
                                            <p>Make</p>
                                            <p>KIA</p>
                                        </div>
                                        <div className="flex justify-between p-3 border-bottom-line">
                                            <p>MOdel</p>
                                            <p>SEDONA</p>
                                        </div>
                                        <div className="flex justify-between p-3 border-bottom-line">
                                            <p>VIN</p>
                                            <p>KNDUP13185661</p>
                                        </div>
                                        <div className="flex justify-between p-3 border-bottom-line">
                                            <p>Odometer</p>
                                            <p>116, 158</p>
                                        </div>
                                        <div className="flex justify-between p-3">
                                            <p>Ignition</p>
                                            <p>Off</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* {isChatOpen && (
                    <RealtimeChat roomName="my-chat-room" username="john_doe" />
                )} */}
            </div>
        </div>
    );
}

export default CrewContainer;
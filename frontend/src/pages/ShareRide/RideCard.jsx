import React from 'react'
import { FaStar } from 'react-icons/fa'
import Button from '../../components/Button'
import userIcon from '../../assets/svg/User.svg';

const RideCard = () => {
  return (
    <div>
       <div className="bg-gray-100 rounded-2xl shadow-md p-4 flex flex-col w-full items-center justify-center">
                  <div className="flex items-center gap-4 mb-2">
                    <img src={userIcon} alt="user" className="w-10 h-10 object-contain" />
                    <div>
                      <p className="text-lg font-medium text-gray-800">Michael Smith</p>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <FaStar />
                        <span className="text-sm font-medium text-gray-700">4.3</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Request Ride With You?</p>
                  <div className="flex gap-3">
                    <Button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-gray-400">
                      Accept
                    </Button>
                    <Button className="bg-gray-500 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-gray-400">
                      Cancel
                    </Button>
                  </div>
                </div>
    </div>
  )
}

export default RideCard

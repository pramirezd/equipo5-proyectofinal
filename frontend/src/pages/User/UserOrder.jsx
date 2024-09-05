import React from 'react'
import UserNavBar from './UserNavBar'
import MyOrders from '../Products/MyOrders'

const UserOrder = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <div>
        <p className='text-center text-2xl font-bold'>My Orders</p>
        <div className="w-full flex justify-end mr-[430px]">
          <UserNavBar />
        </div>
        <MyOrders/>
      </div>
    </div>
  )
}

export default UserOrder

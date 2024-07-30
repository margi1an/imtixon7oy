import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAddressCard } from "react-icons/fa6";
import { increaseQuantity, decreaseQuantity, removeFromCart, updateCartItem } from "../app/cartSlice";
import toast from "react-hot-toast";
import { MdDeleteSweep } from "react-icons/md";

const Carts = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [editItem, setEditItem] = useState(null);
  const cartItems = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();

  const handleIncrease = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleRemove = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (confirmed) {
      dispatch(removeFromCart({ id }));
      toast.success("Item removed from cart");
    }
  };

  const handleOpenUpdateModal = (item) => {
    setEditItem({ ...item }); 
    document.getElementById("update_modal").showModal();
  };

  const handleCloseUpdateModal = () => {
    setEditItem(null);
    document.getElementById("update_modal").close();
  };

  const handleUpdate = () => {
    if (editItem) {
      dispatch(updateCartItem({
        id: editItem.id,
        updatedItem: { ...editItem }
      }));
      toast.success("Item updated successfully");
      handleCloseUpdateModal();
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 capitalize">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems?.map((item) => (
          <div
            key={item.id}
            className="shadow-lg rounded-lg p-4 border items-center border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <button onClick={() => handleOpenUpdateModal(item)}>
                  <img
                    src={item.imageURL}
                    alt={item.carName}
                    className="w-20 h-20 object-cover rounded"
                  />
                </button>
                <div className="flex-1">
                  <div className="flex gap-9 items-center">
                    <h2 className="text-xl font-semibold">{item.carName}</h2>
                    <p>{item.comment}</p>
                  </div>
                  <p className="">{item.price} $</p>
                </div>
              </div>
              <div className="flex items-center gap-4 space-x-2">
                <button
                  className="btn rounded-3xl"
                  onClick={() => handleDecrease(item.id)}
                >
                  <h1 className="text-xl">-</h1>
                </button>
                <span className="text-lg">{item.quantity}</span>

                <button
                  className="btn rounded-3xl"
                  onClick={() => handleIncrease(item.id)}
                >
                  <h1 className="text-xl">+</h1>
                </button>

                <button
                  className="btn bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors"
                  onClick={() => handleOpenUpdateModal(item)}
                >
                  <FaAddressCard className="w-6 h-6" />
                </button>
                
                <button
                  className="btn bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
                  onClick={() => handleRemove(item.id)}
                >
                  <MdDeleteSweep className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm">
                Subtotal : {(item.price * item.quantity).toLocaleString()} $
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <h2 className="text-2xl font-bold">
          Total: {calculateTotal().toLocaleString()} $
        </h2>
      </div>

      {/* Update qilish modali */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-4">Update Item</h3>
          {editItem && (
            <div>
              <div className="mb-4">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="text"
                  value={editItem.imageURL}
                  onChange={(e) => setEditItem({ ...editItem, imageURL: e.target.value })}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  value={editItem.carName}
                  onChange={(e) => setEditItem({ ...editItem, carName: e.target.value })}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="label">
                  <span className="label-text">Comment</span>
                </label>
                <input
                  type="text"
                  value={editItem.comment}
                  onChange={(e) => setEditItem({ ...editItem, comment: e.target.value })}
                  className="input input-bordered w-full"
                />
              </div>
              <button className="btn btn-primary w-full" onClick={handleUpdate}>
                Update Item
              </button>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={handleCloseUpdateModal}>
            Close
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default Carts;

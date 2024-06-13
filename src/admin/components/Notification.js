import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import LottieModal from "./LottieModal";
import { toast } from "react-toastify";
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);


  // *********  Get Notification **************
  const getNotifications = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/contact`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNotifications(response.data.groupedContacts);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };


  // ************  delete Notification *****************
  const deleteNotification = async (notificationId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/contact/delete-contact/${notificationId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        getNotifications();
        setDeleteModal(true);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="bg-[#f8f8f8] flex h-[92%] gap-4 p-6">
      <div className="h-[100%] w-[100%] bg-white rounded-xl">
        <div className="flex justify-between items-center  p-6">
          <h1 className="text-[18px] font-semibold">Notifications</h1>
          {/* <button className="bg-[#3a6afd]  p-2 rounded-md mb-2 text-white font-medium">
            Mark all as read{" "}
          </button> */}
        </div>

        <div
          className="overflow-y-auto h-[450px]"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "transparent transparent",
          }}
        >
          {Object.entries(notifications).map(([date, notificationsArray]) => (
            <div key={date} className="h-auto">
              <p className="p-4">{date}</p>
              {notificationsArray.map((notification, index) => (
                <div key={index} className="bg-[#f6f9ff] p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h1 className="text-[18px] h-full font-semibold mb-4 flex w-[80%]">
                      <p className="w-[20%] mr-2">Subject - </p>
                      <p> {notification.subject}</p>
                    </h1>
                    <RiDeleteBin6Line
                      size={"24px"}
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteNotification(notification._id)}
                    />

                    {/* ****** DeleteModal ******* */}

                    {deleteModal && (
                      <LottieModal
                        message="Notification Deleted Successfully !"
                        onClose={() => setDeleteModal(false)}
                      />
                    )}
                  </div>
                  <h1 className="font-[400px] mb-1 flex">
                    <p className="w-[20%]">Name :</p>{" "}
                    {`${notification.firstName} ${notification.lastName}`}
                  </h1>
                  <h1 className="font-[400px] mb-1 flex">
                    <p className="w-[20%]">Email : </p>
                    {notification.email}
                  </h1>
                  <h1 className="font-[400px] mb-1 flex">
                    <p className="w-[20%]">Phone No :</p>{" "}
                    {notification.phoneNumber}
                  </h1>
                  <h1 className="font-[400px] mb-1 flex">
                    <p className="w-[20%]">Message :</p> {notification.message}
                  </h1>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;

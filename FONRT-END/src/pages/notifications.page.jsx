import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { NotificationApi } from '../function/function.upload.API';
import { UserContext } from "../App";
import Loader from '../components/loader.component';
import AnimationWrapper from '../common/page-animation';
import NotificationCard from '../components/notification-card.component';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:4000');

const Notification = () => {
  const { userAuth: { user_id } } = useContext(UserContext);
  const parama = useParams(user_id)
  // console.log(parama.user_id)
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'like'];
  const [loading, setLoading] = useState(true); // Define loading state

  const fetchNotifications = async () => {
    try {
      if (user_id !== undefined) {
        const response = await NotificationApi(user_id);
        setNotifications(response.data);
        setLoading(false); // Set loading to false after data is fetched
      }
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchNotifications();

    socket.on('notification', (data) => {
      console.log('Notification received:', data); // Log notification data
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off('notification');
    };
  }, [user_id]);

  // console.log(notifications)  

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const filteredNotifications = notifications.filter(notification => filter === 'all' || notification.notification_type === filter);

//   console.log(filteredNotifications) 
  return (
    <>
      <h1 className="md:hidden">Recent Notification</h1>
      <div className="my-8 flex gap-6">
        {filters.map((f) => (
          <button
            key={f}
            className={filter === f ? 'py-2 btn-dark' : 'btn-light'}
            onClick={() => handleFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <ul>
        {filteredNotifications.map((notification, index) => (
          <li key={index}>
            {notification.notification_type === 'like' ? '👍' : ''} {notification.message}
          </li>
        ))}
      </ul>

      {/* Check if loading */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Check if notifications available */}
          {notifications.length > 0 ? (
            notifications.map((notification, i) => (
              <AnimationWrapper key={i} transition={{ delay: i * 0.08 }}>
                <NotificationCard data={notification} index={i} notificationState={{notification, setNotifications}} />
              </AnimationWrapper>
            ))
          ) : (
            "No notifications available"
          )}
        </>
      )}
    </>
  );
};

export default Notification;
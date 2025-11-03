import React from "react";

const NotificationPanel = ({notifications}) => {
  return (
    <div className="w-[300px] bg-[#111] border-l border-[#2c2c2c] p-4">
     <div className="text-sm text-gray-300 space-y-3">
      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-gray-500">Aucune notification</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className="bg-[#1a1a1a] p-3 rounded-lg italic border border-[#2c2c2c] hover:border-yellow-600 transition-all"
          >
            {n.text}
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default NotificationPanel;
